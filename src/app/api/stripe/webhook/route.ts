// Webhook Stripe — SOURCE DE VÉRITÉ du statut premium.
// Stripe nous notifie ici chaque changement d'abonnement (paiement, résiliation,
// échec de prélèvement…) et on répercute dans public.abonnements (Supabase).
import Stripe from "stripe";
import {
  stripe,
  supabaseAdmin,
  majAbonnement,
} from "@/lib/stripe-server";
import { envoyerEmailBienvenue } from "@/lib/email-bienvenue";

// Retrouve l'utilisateur Supabase visé par un événement d'abonnement.
async function userIdPour(sub: Stripe.Subscription): Promise<string | null> {
  if (sub.metadata?.supabase_user_id) return sub.metadata.supabase_user_id;
  const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
  const { data } = await supabaseAdmin()
    .from("abonnements")
    .select("user_id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();
  return (data?.user_id as string) ?? null;
}

function finPeriode(sub: Stripe.Subscription): string | null {
  const ts = sub.items.data[0]?.current_period_end;
  return ts ? new Date(ts * 1000).toISOString() : null;
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  if (!signature) return new Response("Signature manquante", { status: 400 });

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch {
    return new Response("Signature invalide", { status: 400 });
  }

  try {
    switch (event.type) {
      // Création / mise à jour / résiliation : on aligne le statut premium.
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const userId = await userIdPour(sub);
        if (!userId) break;
        const statut = event.type === "customer.subscription.deleted" ? "canceled" : sub.status;
        await majAbonnement({
          user_id: userId,
          stripe_customer_id: typeof sub.customer === "string" ? sub.customer : sub.customer.id,
          stripe_subscription_id: sub.id,
          statut,
          periode_fin: finPeriode(sub),
        });
        break;
      }

      // Premier paiement réussi → email de bienvenue.
      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.billing_reason === "subscription_create") {
          const email =
            invoice.customer_email ||
            (typeof invoice.customer === "string"
              ? ((await stripe.customers.retrieve(invoice.customer)) as Stripe.Customer).email
              : null);
          if (email) await envoyerEmailBienvenue(email);
        }
        break;
      }

      // Prélèvement mensuel refusé : Stripe passe l'abonnement en past_due et
      // relance selon ses règles ; customer.subscription.updated fera la maj.
      case "invoice.payment_failed":
        break;
    }
  } catch (e) {
    // On log mais on répond 200 : Stripe rejouera l'événement en cas de vrai souci
    // et on ne veut pas qu'une erreur d'email bloque la chaîne de paiement.
    console.error("webhook stripe:", event.type, e);
  }

  return Response.json({ received: true });
}
