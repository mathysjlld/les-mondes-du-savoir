// Emplacements ("slots") des accessoires : on peut porter UN accessoire par slot,
// donc plusieurs accessoires en même temps de façon logique (ex. bonnet + lunettes
// + cape + nœud pap), mais jamais deux objets du même slot (ex. pas deux couvre-chefs).
export const ACCESSORY_SLOTS: Record<string, string> = {
  // Sur la tête (un seul à la fois)
  "magic-hat": "tete",
  "crown": "tete",
  "headphones": "tete",
  // Sur les yeux
  "glasses": "yeux",
  // Autour du cou
  "bow-tie": "cou",
  // Dans le dos (cape)
  "super-cape": "dos",
  // Dans la main / tenu (un seul)
  "wand": "main",
  "shield": "main",
  "balloon": "main",
  // Aura au-dessus de la tête (un seul)
  "halo": "aura",
  "sage-star": "aura",
};

// Slot d'un accessoire (par défaut : son propre id, donc unique).
export function slotOf(id: string): string {
  return ACCESSORY_SLOTS[id] ?? id;
}

// Libellé lisible du slot (pour l'UI du marché).
export const SLOT_LABELS: Record<string, string> = {
  tete: "Tête",
  yeux: "Yeux",
  cou: "Cou",
  dos: "Cape",
  main: "Main",
  aura: "Aura",
};
