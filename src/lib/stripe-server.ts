// Outils serveur pour l'abonnement Stripe (Offre Famille).
// ⚠️ À n'importer QUE depuis des route handlers (app/api/…) : ce module utilise
// la clé secrète Stripe et la clé service_role Supabase, jamais côté client.
import Stripe from "stripe";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const PRICE_ID = process.env.STRIPE_PRICE_ID as string;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.lesmondesdusavoir.fr";

// Client Supabase « admin » : bypasse la RLS, seul autorisé à écrire dans
// public.abonnements (le statut premium ne doit jamais être modifiable par le client).
export function supabaseAdmin(): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SECRET_KEY as string,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}

// Identifie l'utilisateur à partir du header Authorization: Bearer <access_token>.
export async function userFromRequest(req: Request) {
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token) return null;
  const { data, error } = await supabaseAdmin().auth.getUser(token);
  if (error || !data.user) return null;
  return data.user;
}

// Un statut Stripe qui donne accès au contenu premium.
// `past_due` est inclus VOLONTAIREMENT : au 1er échec de prélèvement, Stripe passe
// l'abonnement en past_due et relance (dunning) pendant plusieurs jours. On garde
// l'accès pendant cette fenêtre pour ne pas couper un client qui a une période payée
// en cours ; si Stripe finit par abandonner, l'abo passe `canceled`/`unpaid` → accès retiré.
export function statutDonneAcces(statut: string): boolean {
  return statut === "active" || statut === "trialing" || statut === "past_due";
}

// Met à jour la ligne d'abonnement d'un utilisateur (source de vérité du premium).
export async function majAbonnement(fields: {
  user_id: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string | null;
  statut: string;
  periode_fin?: string | null;
}) {
  const { error } = await supabaseAdmin()
    .from("abonnements")
    .upsert({
      ...fields,
      is_premium: statutDonneAcces(fields.statut),
      updated_at: new Date().toISOString(),
    });
  // On PROPAGE l'erreur (au lieu de seulement la logger) : c'est la source de vérité
  // du premium. Si l'écriture échoue, le webhook doit renvoyer 500 pour que Stripe
  // REJOUE l'événement — sinon un client paierait sans jamais obtenir son accès.
  if (error) throw new Error(`majAbonnement échouée: ${error.message}`);
}
