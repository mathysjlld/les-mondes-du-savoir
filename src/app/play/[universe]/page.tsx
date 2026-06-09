import { UNIVERSES } from "@/data/lessons";
import PlayClient from "./PlayClient";

// Requis pour l'export statique : liste tous les univers à pré-générer.
export function generateStaticParams() {
  return Object.keys(UNIVERSES).map((universe) => ({ universe }));
}

export const dynamicParams = false;

export default function Page() {
  return <PlayClient />;
}
