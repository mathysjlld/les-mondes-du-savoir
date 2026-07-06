// Ouvre le portail client Stripe (gérer sa carte, ses factures, résilier).
// Renvoie l'URL de session vers laquelle rediriger le parent connecté.
import {
  stripe,
  userFromRequest,
  supabaseAdmin,
  SITE_URL,
} from "@/lib/stripe-server";

export async function POST(req: Request) {
  const user = await userFromRequest(req);
  if (!user) {
    return Response.json({ error: "Connecte-toi d'abord à ton compte parent." }, { status: 401 });
  }

  const { data } = await supabaseAdmin()
    .from("abonnements")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!data?.stripe_customer_id) {
    return Response.json({ error: "Aucun abonnement trouvé pour ce compte." }, { status: 404 });
  }

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: data.stripe_customer_id,
      configuration: process.env.STRIPE_PORTAL_CONFIG_ID,
      return_url: `${SITE_URL}/abonnement`,
    });
    return Response.json({ url: session.url });
  } catch (e) {
    console.error("portal:", e);
    return Response.json({ error: "Impossible d'ouvrir la gestion de l'abonnement." }, { status: 500 });
  }
}
