# Abonnement Stripe — comment ça marche (récap pour Mathys)

*Session du 06/07/2026 — tout est en production et testé de bout en bout.*

## Ce qui existe maintenant

L'abonnement **Famille à 7 €/mois** est branché en réel sur le site. Le parcours complet :

1. Le parent va sur `/abonnement` → il doit être connecté à un compte cloud (sinon CTA vers `/account?next=/abonnement`, qui le ramène au paiement après connexion).
2. Clic sur « Je veux l'aventure complète » → appel à `/api/stripe/create-subscription` → le **Payment Element** Stripe s'affiche dans la page (pas de redirection, stylé à notre charte).
3. Paiement validé → redirection `/abonnement/merci` (confettis) → le **webhook Stripe** écrit dans Supabase → le premium se débloque en quelques secondes.
4. Le parent reçoit un **mail de bienvenue** (Brevo) + peut gérer/résilier via « Gérer mon abonnement » (portail Stripe).

## Les fichiers

| Fichier | Rôle |
|---|---|
| `src/lib/stripe-server.ts` | Clients Stripe + Supabase admin, helpers serveur. **Jamais importé côté client.** |
| `src/app/api/stripe/create-subscription/route.ts` | Crée l'abonnement (`default_incomplete`), gère code promo, doublons, reprise d'un paiement abandonné |
| `src/app/api/stripe/webhook/route.ts` | **Source de vérité du premium.** Reçoit les événements Stripe, met à jour la table `abonnements`, envoie le mail de bienvenue |
| `src/app/api/stripe/portal/route.ts` | Ouvre le portail client Stripe (factures, carte, résiliation) |
| `src/app/abonnement/page.tsx` | Page d'offre + Payment Element + code promo + état abonné |
| `src/app/abonnement/merci/page.tsx` | Retour après paiement, re-vérifie le statut jusqu'à activation |
| `src/lib/email-bienvenue.ts` | Mail de bienvenue via Brevo (non bloquant si échec) |
| `supabase/migrations/0002_abonnements.sql` | Table `abonnements` (appliquée en prod) |

## ⚠️ Les règles à ne pas casser

- **Le premium vit dans la table `abonnements`, PAS dans `profiles.data`.** `profiles.data` est un JSONB que le client peut modifier (RLS update_own) → n'importe qui pourrait y mettre `isPremium: true`. La table `abonnements` n'a **aucune policy d'écriture** : seul le webhook (service role) y écrit. Ne jamais ajouter de policy d'écriture dessus.
- `AppContext` lit `abonnements.is_premium` et le **reflète** dans `profile.isPremium` — c'est pour que `estPremium()` (dans `src/lib/premium.ts`) continue de marcher partout sans rien changer. Pour toute logique de déblocage, passe toujours par `estPremium()` / `estDebloquee()`.
- **Ne recrée pas le webhook Stripe** : son secret (`whsec_...`) n'est visible qu'à la création et il est déjà dans les env vars Vercel. Si tu le supprimes, il faut le recréer ET mettre à jour `STRIPE_WEBHOOK_SECRET` sur Vercel.
- Les secrets sont dans `.env.local` (giténoré) et dans les env vars Vercel (production). **Rien ne doit être commité.** La clé `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` est la seule qui peut apparaître côté client.
- L'API Stripe récente a des pièges : le `client_secret` se lit sur `latest_invoice.confirmation_secret` (plus de `payment_intent` expandable), et `current_period_end` est sur les **items** de la subscription, plus sur la subscription elle-même.

## Variables d'environnement (déjà posées sur Vercel Production)

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY   # clé publique Stripe (live)
STRIPE_SECRET_KEY                    # clé secrète Stripe (live)
STRIPE_WEBHOOK_SECRET                # signature du webhook
STRIPE_PRICE_ID                      # prix 7 €/mois « Offre Famille »
STRIPE_PORTAL_CONFIG_ID              # config du portail client
NEXT_PUBLIC_SUPABASE_URL             # projet yhipxaaamcdcvwdbdjkn
NEXT_PUBLIC_SUPABASE_ANON_KEY        # clé publishable Supabase
SUPABASE_SECRET_KEY                  # clé secrète Supabase (webhook uniquement)
BREVO_API_KEY                        # mail de bienvenue
NEXT_PUBLIC_SITE_URL                 # https://www.lesmondesdusavoir.fr
```

Pour le dev local : demander le `.env.local` à Kaiden (ou `npx vercel env pull`).

## Tester sans débiter personne

- Un code promo interne **`TESTFAMILLE100`** (1er mois offert) existe côté Stripe mais est **désactivé**. Pour tester : le réactiver dans le Dashboard Stripe (Produits → Codes promo), dérouler le parcours, puis annuler l'abonnement depuis le portail et re-désactiver le code.
- Compte de test déjà utilisé : `kaidenvialle+testmondes1@gmail.com` (abonnement annulé).
- Ce qui a été validé en prod le 06/07 : création compte → paiement 0 € → webhook → premium ON → mail délivré → résiliation → premium OFF (8 s), responsive 380/768/1280.

## Ce qui a aussi été fait dans la session

- **Pages légales** mises à jour et déployées : SIRET + nom complet de Kaiden, clause de rétractation alignée sur le parcours réel (mention sous le bouton de paiement), TVA non applicable (293 B CGI), adresse de l'éditeur, Brevo ajouté aux sous-traitants RGPD.
- La sync cloud Supabase (qui existait mais n'était pas branchée) est maintenant **active en production** — c'est le prérequis du paiement (l'abonnement est rattaché au compte parent).
- PRs de la session : #1 (Stripe complet), #2 (CGV/SIRET), #3 (nom + TVA), #4 (adresse + Brevo + résiliation).

## Reste à faire (pas bloquant)

- Activer les **reçus Stripe** : Dashboard → Settings → Emails → « paiements réussis » (case à cocher, pas d'API).
- Adhésion à un **médiateur de la consommation** (obligation légale B2C) → mettre à jour l'article 14 des CGV ensuite.
- À terme : un expéditeur `@lesmondesdusavoir.fr` pour le mail de bienvenue (actuellement `kaidenvialle@gmail.com` via Brevo).
