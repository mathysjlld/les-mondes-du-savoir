import type { Metadata } from "next";
import { LANDING_HTML } from "./landing-content";

export const metadata: Metadata = {
  title: "Les mondes du Savoir : apprendre en s'amusant",
  description:
    "Les mondes du Savoir : une application éducative et ludique qui transforme l'apprentissage en aventure. 13 univers, des quiz, des badges, un arbre de connaissances et bien plus !",
};

/**
 * Page d'accueil : la page de présentation (landing) du site.
 * Le contenu est du HTML/CSS statique autonome (repris de la version GitHub Pages),
 * rendu tel quel. Le bouton « Lancer le jeu » mène vers la route /jouer.
 */
export default function Home() {
  return <div dangerouslySetInnerHTML={{ __html: LANDING_HTML }} />;
}
