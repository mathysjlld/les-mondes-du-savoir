@AGENTS.md

# Les mondes du Savoir

Plateforme éducative ludifiée pour enfants (quizz, leçons, progression, récompenses).
**Produit réel destiné à être lancé** — soigne la qualité, l'UX enfant et la robustesse.

> ⚠️ Cette version de Next.js a des changements cassants par rapport à ce que tu connais.
> Avant d'écrire du code Next.js, lis le guide concerné dans `node_modules/next/dist/docs/`
> (voir `AGENTS.md`).

## Stack

- **Next.js 16.2.7** — App Router (`src/app/`)
- **React 19.2.4**
- **TypeScript 5** — alias `@/*` → `./src/*`
- **Tailwind CSS v4** (via `@tailwindcss/postcss`, pas de `tailwind.config`)
- **Framer Motion 12** — animations / transitions de pages
- **canvas-confetti** — effets de victoire
- **lucide-react** — icônes
- **@supabase/supabase-js** — sync cloud **optionnelle** (voir plus bas)

## Lancer le projet

```bash
npm run dev      # développement local (http://localhost:3000)
npm run build    # build de production
npm run start    # serveur de production
npm run lint     # ESLint
```

Déploiement cible : **Vercel / Netlify**.
Un mode export statique existe aussi (`EXPORT=true` + `NEXT_PUBLIC_BASE_PATH` pour GitHub Pages),
mais ce n'est pas le canal de déploiement principal — ne pas le supposer par défaut.

## Conventions

- **Tout en français** : UI, contenu pédagogique, **commentaires de code** et noms quand c'est naturel.
- Composants clients : ajouter `"use client"` (l'app est très interactive, surtout sous `play/`, `market/`, `temple/`).
- Garder l'expérience **adaptée aux enfants** : gros boutons (`.btn-bubble`), feedback sonore/visuel, langage simple.
- Styling : classes Tailwind + classes utilitaires globales définies dans `src/app/globals.css`
  (`.btn-bubble`, `.glass-card`, `.animate-float`). Palette : turquoise (primaire), corail (secondaire).
- Polices : Fredoka (titres), Nunito (corps).
- Chemins d'assets statiques : passer par `asset()` de `src/lib/asset.ts` (préfixe `NEXT_PUBLIC_BASE_PATH`)
  plutôt que des chemins `/images/...` en dur.

## Structure

```
src/
├── app/                      # App Router — une page = un dossier
│   ├── page.tsx              # Landing
│   ├── layout.tsx            # Layout racine (enveloppe avec AppProvider)
│   ├── globals.css           # Tailwind v4 + styles/classes custom
│   ├── login/                # Connexion par code à 4 chiffres
│   ├── onboarding/           # Création de compte (5 étapes)
│   ├── dashboard/            # Hub : Arbre du Savoir, univers, accès marché
│   ├── play/[universe]/      # Moteur leçons + quiz (page.tsx + PlayClient.tsx)
│   ├── market/               # Marché principal (accessoires, compagnons, animaux)
│   ├── temple/               # Le Temple des Sages (monde ultime) + temple/market (Sanctuaire)
│   ├── account/              # Connexion cloud Supabase
│   ├── cgv/  mentions-legales/
├── components/
│   ├── Avatar/AvatarRenderer.tsx        # Avatar SVG (4 types, 6 couleurs, accessoires)
│   ├── KnowledgeTree/KnowledgeTree.tsx  # Arbre du Savoir (10 stades de croissance)
│   ├── UI/IllustrationRenderer.tsx      # Illustrations SVG des univers
│   └── Footer.tsx                        # Masqué sur play/market/temple/onboarding
├── context/AppContext.tsx    # ÉTAT CENTRAL — profil, monnaies, progression, persistance
├── lib/
│   ├── supabase.ts           # Client Supabase (null si non configuré)
│   ├── sound.ts              # Sons Web Audio + synthèse vocale (TTS) française
│   └── asset.ts              # Préfixage des chemins d'assets
└── data/lessons.ts           # CONTENU — 14 univers, leçons facile/difficile, quiz
```

## Logique métier (l'essentiel)

- **État central** : tout passe par `src/context/AppContext.tsx`. Pour modifier le profil, l'XP,
  les monnaies ou la progression, utilise les helpers du contexte — n'écris pas dans `localStorage` directement.
- **Persistance** : `localStorage` clé `explorakids_profile` (profil actif) et `explorakids_accounts`
  (multi-comptes locaux par code à 4 chiffres). L'app est **100 % fonctionnelle hors-ligne**.
- **Contenu** : `src/data/lessons.ts` contient `UNIVERSES` (14 univers). Chaque univers a des leçons
  en deux niveaux (`facile` / `difficile`), avec cartes (flashcards) et quiz. Pour ajouter du contenu,
  c'est ici — respecter les interfaces `Universe` / `Lesson` / `LessonCard` / `QuizQuestion`.
- **Monnaies (3)** : `coins` (pièces, marché), `diamonds` (rares, quiz sans faute), `crystals` (Temple).
  `maxCrystals` retient le pic atteint pour garder le Temple débloqué même après dépense.
- **Déblocage des univers** : par niveau (`unlock: {type:"level"}`) ou par cristaux (`type:"crystals"`).
  Mythologie et Temple sont des mondes **secrets**.
- **Arbre du Savoir** : `treeGrowth` (0–100 %) → 10 stades de croissance affichés par `KnowledgeTree`.

### Supabase (prévu, pas encore actif)

Le code de sync cloud existe mais **n'est pas branché** : `cloudEnabled` est `false` tant que
`NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` ne sont pas définis, et `supabase` vaut alors `null`.
**Toujours garder le chemin localStorage pleinement fonctionnel** et tester `supabase === null` avant usage.
Migration : `supabase/migrations/0001_profiles.sql` (table `profiles` en JSONB, RLS par utilisateur).

### Mode test « 7194 »

Code de triche saisi dans l'Espace Parents : débloque tous les univers (dont Temple/Mythologie),
met pièces/diamants à 99999 et affiche des boutons d'accès rapide. Logique dans
`AppContext.tsx` (`toggleCheatCode`) et UI dans `dashboard/page.tsx`. **Outil de test interne** —
ne pas exposer côté utilisateur final. Resaisir `7194` restaure les vraies valeurs sauvegardées.

## Secrets

`.claude/settings.local.json` contient une clé `FAL_API_KEY` — fichier local, ne pas committer de secrets.
