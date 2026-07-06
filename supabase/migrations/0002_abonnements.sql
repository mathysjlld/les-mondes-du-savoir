-- Abonnements Stripe — Offre Famille (7 €/mois).
-- Table SÉPARÉE de profiles : profiles.data est un JSONB modifiable par
-- l'utilisateur (RLS update_own), il ne peut donc PAS faire foi pour le premium.
-- Ici, AUCUNE policy d'écriture utilisateur : seul le webhook Stripe (service
-- role, qui bypasse la RLS) écrit dans cette table. Le client la lit seulement.
create table if not exists public.abonnements (
  user_id uuid primary key references auth.users(id) on delete cascade,
  stripe_customer_id text unique,
  stripe_subscription_id text,
  statut text not null default 'aucun',
  is_premium boolean not null default false,
  periode_fin timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.abonnements enable row level security;

drop policy if exists "abonnements_select_own" on public.abonnements;
create policy "abonnements_select_own" on public.abonnements
  for select using (auth.uid() = user_id);

-- Retrouver l'utilisateur depuis les événements Stripe (customer id).
create index if not exists abonnements_stripe_customer_idx
  on public.abonnements (stripe_customer_id);
