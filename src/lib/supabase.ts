// Client Supabase — activé UNIQUEMENT si un projet est connecté via les variables
// d'environnement. Sans elles, cloudEnabled = false et l'app fonctionne comme avant
// (progression en localStorage). Aucun coût, aucune régression.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const cloudEnabled = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = cloudEnabled
  ? createClient(url as string, anonKey as string, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null;
