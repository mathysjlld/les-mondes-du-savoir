import type { NextConfig } from "next";

// Export statique activé uniquement pour le build de déploiement (EXPORT=true),
// afin que `next dev` continue de fonctionner normalement en local.
const isExport = process.env.EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Fixe explicitement la racine du projet : sinon Turbopack détecte plusieurs
  // lockfiles (dont un dans le dossier home) et choisit le mauvais dossier racine.
  turbopack: { root: __dirname },
  ...(isExport
    ? {
        output: "export",
        basePath,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
