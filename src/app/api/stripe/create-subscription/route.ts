// Crée (ou reprend) l'abonnement Famille pour l'utilisateur connecté et renvoie
// le client_secret à confirmer côté client avec le Payment Element.
// Corps attendu : { code?: string } (code promo optionnel).
import Stripe from "stripe";
import {
  stripe,
  PRICE_ID,
  userFromRequest,
  supabaseAdmin,
  majAbonnement,
  statutDonneAcces,
} from "@/lib/stripe-server";

// Extrait le client_secret d'un abonnement dont la 1re facture attend un paiement.
function clientSecretDe(sub: Stripe.Subscription): string | null {
  const invoice = sub.latest_invoice;
  if (!invoice || typeof invoice === "string") return null;
  return invoice.confirmation_secret?.client_secret ?? null;
}

function finPeriode(sub: Stripe.Subscription): string | null {
  const ts = sub.items.data[0]?.current_period_end;
  return ts ? new Date(ts * 1000).toISOString() : null;
}

export async function POST(req: Request) {
  const user = await userFromRequest(req);
  if (!user) {
    return Response.json({ error: "Connecte-toi d'abord à ton compte parent." }, { status: 401 });
  }

  let code: string | undefined;
  try {
    const body = await req.json();
    code = typeof body?.code === "string" && body.code.trim() ? body.code.trim() : undefined;
  } catch {
    /* corps vide accepté */
  }

  try {
    // 1. Retrouver ou créer le client Stripe rattaché à ce compte.
    const admin = supabaseAdmin();
    const { data: row } = await admin
      .from("abonnements")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .maybeSingle();

    let customerId = row?.stripe_customer_id as string | null;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email ?? undefined,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;
    }

    // 2. Déjà abonné ? On ne crée pas de doublon.
    const existants = await stripe.subscriptions.list({
      customer: customerId,
      status: "all",
      limit: 10,
    });
    const actif = existants.data.find((s) => statutDonneAcces(s.status));
    if (actif) {
      await majAbonnement({
        user_id: user.id,
        stripe_customer_id: customerId,
        stripe_subscription_id: actif.id,
        statut: actif.status,
        periode_fin: finPeriode(actif),
      });
      return Response.json({ status: "active" });
    }

    // 3. Un essai précédent resté incomplet ? On le reprend tel quel (sans code),
    //    sinon on l'annule pour repartir proprement avec le code promo demandé.
    const incomplet = existants.data.find((s) => s.status === "incomplete");
    if (incomplet && !code) {
      const repris = await stripe.subscriptions.retrieve(incomplet.id, {
        expand: ["latest_invoice.confirmation_secret"],
      });
      const secret = clientSecretDe(repris);
      if (secret) {
        const invoice = repris.latest_invoice as Stripe.Invoice;
        return Response.json({ clientSecret: secret, amountDue: invoice.amount_due });
      }
    }
    if (incomplet) await stripe.subscriptions.cancel(incomplet.id).catch(() => {});

    // 4. Code promo éventuel → retrouver le promotion_code actif correspondant.
    let promotionCodeId: string | undefined;
    if (code) {
      const promos = await stripe.promotionCodes.list({ code, active: true, limit: 1 });
      if (!promos.data.length) {
        return Response.json({ error: "Ce code promo n'existe pas ou n'est plus valide." }, { status: 400 });
      }
      promotionCodeId = promos.data[0].id;
    }

    // 5. Créer l'abonnement en attente de paiement (default_incomplete) :
    //    la carte sera saisie côté client via le Payment Element.
    const sub = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: PRICE_ID }],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      metadata: { supabase_user_id: user.id },
      ...(promotionCodeId ? { discounts: [{ promotion_code: promotionCodeId }] } : {}),
      expand: ["latest_invoice.confirmation_secret"],
    });

    await majAbonnement({
      user_id: user.id,
      stripe_customer_id: customerId,
      stripe_subscription_id: sub.id,
      statut: sub.status,
      periode_fin: finPeriode(sub),
    });

    // Facture à 0 € (promo 100 %) : l'abonnement est déjà actif, rien à payer.
    if (statutDonneAcces(sub.status)) {
      return Response.json({ status: "active" });
    }

    const secret = clientSecretDe(sub);
    if (!secret) {
      return Response.json({ error: "Impossible de préparer le paiement. Réessaie dans un instant." }, { status: 500 });
    }
    const invoice = sub.latest_invoice as Stripe.Invoice;
    return Response.json({ clientSecret: secret, amountDue: invoice.amount_due });
  } catch (e) {
    console.error("create-subscription:", e);
    return Response.json({ error: "Le paiement n'a pas pu être préparé. Réessaie dans un instant." }, { status: 500 });
  }
}
