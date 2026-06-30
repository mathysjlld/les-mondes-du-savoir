// ============================================================================
//  MODÈLE FREEMIUM — UN SEUL ENDROIT décide de ce qui est gratuit vs payant.
// ----------------------------------------------------------------------------
//  Objectif : garder la logique de déverrouillage propre et centralisée pour
//  pouvoir y brancher Stripe plus tard SANS toucher au reste de l'app.
//  Quand le paiement sera branché, il suffira que `estPremium()` renvoie le vrai
//  statut d'abonné (profile.isPremium piloté par le webhook Stripe) — rien d'autre.
// ============================================================================

import type { Lesson } from "@/data/lessons";

// Nombre de leçons (quizz) GRATUITES au début de chaque univers. Le reste est
// premium (réservé à l'abonnement). 👉 Pour ajuster le découpage gratuit/payant
// de TOUTE l'app, il suffit de changer cette seule valeur (ou de poser
// `gratuit: true/false` sur une leçon précise dans src/data/lessons.ts).
export const LECONS_GRATUITES_PAR_UNIVERS = 2;

type ProfilLike = { isPremium?: boolean; isCheatEnabled?: boolean } | null | undefined;

/**
 * L'utilisateur a-t-il un accès premium (abonnement actif) ?
 * PLACEHOLDER : tant que Stripe n'est pas branché, seul le mode test (code 7194)
 * donne l'accès premium. Quand Stripe sera là, renvoyer ici le vrai statut
 * d'abonnement — c'est le SEUL endroit à modifier pour activer le payant.
 */
export function estPremium(profile: ProfilLike): boolean {
  if (!profile) return false;
  return !!profile.isPremium || !!profile.isCheatEnabled;
}

/**
 * Une leçon est-elle GRATUITE ?
 * - Override explicite via `lesson.gratuit` (true/false) s'il est défini.
 * - Sinon, règle par défaut : les premières leçons de l'univers sont gratuites.
 */
export function estGratuite(lesson: Lesson, lessonsDeLUnivers: Lesson[]): boolean {
  if (typeof lesson.gratuit === "boolean") return lesson.gratuit;
  const idx = lessonsDeLUnivers.findIndex((l) => l.id === lesson.id);
  return idx === -1 ? true : idx < LECONS_GRATUITES_PAR_UNIVERS;
}

/**
 * LA leçon est-elle accessible pour ce profil ?
 * 👉 C'est le SEUL test à utiliser partout dans l'app (dashboard, play…).
 */
export function estDebloquee(
  lesson: Lesson,
  lessonsDeLUnivers: Lesson[],
  profile: ProfilLike
): boolean {
  return estGratuite(lesson, lessonsDeLUnivers) || estPremium(profile);
}

/**
 * Un univers contient-il au moins une leçon premium encore verrouillée pour ce
 * profil ? (sert à afficher un repère « Premium » sur la carte de l'univers)
 */
export function aDuContenuPremiumVerrouille(
  lessonsDeLUnivers: Lesson[],
  profile: ProfilLike
): boolean {
  if (estPremium(profile)) return false;
  return lessonsDeLUnivers.some((l) => !estGratuite(l, lessonsDeLUnivers));
}
