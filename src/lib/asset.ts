// Préfixe les chemins d'assets statiques (images du dossier public/) pour qu'ils
// fonctionnent aussi quand le site est servi sous un sous-dossier (GitHub Pages).
// En développement, NEXT_PUBLIC_BASE_PATH est vide => les chemins restent "/images/...".
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (path: string) => `${BASE_PATH}${path}`;
