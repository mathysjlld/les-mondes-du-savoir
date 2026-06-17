import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fixe explicitement la racine du projet : sinon Turbopack détecte plusieurs
  // lockfiles (dont un dans le dossier home) et choisit le mauvais dossier racine.
  turbopack: { root: __dirname },
  // La page de présentation (marketing) est un fichier statique (public/presentation.html)
  // servi à la racine du domaine. Le jeu vit sous /jouer, /dashboard, /play, etc.
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/presentation.html" }],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
