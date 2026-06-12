"use client";

import React from "react";
import { motion } from "framer-motion";
import { AvatarConfig } from "@/context/AppContext";
import { asset } from "@/lib/asset";

// Personnages remplacés par une illustration (fal.ai) au lieu du SVG.
// Les types absents de cette table continuent d'être rendus en SVG.
const AVATAR_IMAGES: Partial<Record<AvatarConfig["type"], string>> = {
  fox: "/images/avatar_fox.png",
  owl: "/images/avatar_owl.png",
  panda: "/images/avatar_panda.png",
  koala: "/images/avatar_koala.png",
};

// Illustrations composites « personnage + accessoire » (fal.ai). Quand un
// accessoire équipé possède une image dédiée pour ce personnage, on l'affiche
// au lieu de la surcouche SVG (qui ne s'aligne pas sur les illustrations).
const AVATAR_ACCESSORY_IMAGES: Partial<Record<AvatarConfig["type"], Record<string, string>>> = {
  koala: {
    "glasses": "/images/koala_glasses.png",
    "bow-tie": "/images/koala_bow-tie.png",
    "headphones": "/images/koala_headphones.png",
    "balloon": "/images/koala_balloon.png",
    "magic-hat": "/images/koala_magic-hat.png",
    "wand": "/images/koala_wand.png",
    "shield": "/images/koala_shield.png",
    "crown": "/images/koala_crown.png",
    "super-cape": "/images/koala_super-cape.png",
    "halo": "/images/koala_halo.png",
    "sage-star": "/images/koala_sage-star.png",
  },
};

interface AvatarRendererProps {
  config: AvatarConfig;
  className?: string;
  size?: number;
  interactive?: boolean;
}

export const AvatarRenderer: React.FC<AvatarRendererProps> = ({
  config,
  className = "",
  size = 120,
  interactive = true,
}) => {
  const { type, color, accessories = [] } = config;

  // Image personnalisée du personnage (remplace le rendu SVG si présente)
  const customImage = AVATAR_IMAGES[type];

  // Image composite « personnage + accessoire » : on prend le dernier accessoire
  // équipé qui dispose d'une illustration dédiée pour ce personnage.
  const accImages = AVATAR_ACCESSORY_IMAGES[type];
  let compositeImage: string | undefined;
  if (accImages) {
    for (let i = accessories.length - 1; i >= 0; i--) {
      if (accImages[accessories[i]]) {
        compositeImage = accImages[accessories[i]];
        break;
      }
    }
  }

  // Image finale à afficher : composite si dispo, sinon l'illustration de base.
  const displayImage = compositeImage ?? customImage;

  // Animation properties are specified directly on the motion.div below

  // Obtenir la couleur hexadécimale selon le choix de l'utilisateur
  const getHexColor = (colName: string) => {
    switch (colName) {
      case "orange": return "#FF7F27";
      case "blue": return "#3F88C5";
      case "pink": return "#FF70A6";
      case "green": return "#70D6FF";
      case "purple": return "#9B5DE5";
      case "yellow": return "#FFD166";
      case "grey": return "#A5A5A5";
      default: return colName.startsWith("#") ? colName : "#FF7F27";
    }
  };

  const primaryColor = getHexColor(color);

  // Rendu de l'animal en SVG
  const renderAnimalSVG = () => {
    switch (type) {
      case "fox":
        return (
          <>
            {/* Queue */}
            <path d="M 75 75 Q 95 65 90 45 Q 80 35 70 55 Z" fill={primaryColor} />
            <path d="M 85 50 Q 90 45 88 40 Q 80 35 80 48 Z" fill="#FFFFFF" />

            {/* Corps */}
            <circle cx="50" cy="70" r="22" fill={primaryColor} />
            <ellipse cx="50" cy="74" rx="14" ry="16" fill="#FFFFFF" />

            {/* Oreilles */}
            <polygon points="32,25 45,45 28,40" fill={primaryColor} />
            <polygon points="35,29 42,42 32,38" fill="#FFC0CB" />
            <polygon points="68,25 55,45 72,40" fill={primaryColor} />
            <polygon points="65,29 58,42 68,38" fill="#FFC0CB" />

            {/* Tête */}
            <ellipse cx="50" cy="45" rx="20" ry="16" fill={primaryColor} />
            <path d="M 32 46 Q 50 56 68 46 Q 50 60 32 46" fill="#FFFFFF" />

            {/* Yeux */}
            <circle cx="42" cy="42" r="3.5" fill="#2C3E50" />
            <circle cx="43" cy="40.5" r="1" fill="#FFFFFF" />
            <circle cx="58" cy="42" r="3.5" fill="#2C3E50" />
            <circle cx="57" cy="40.5" r="1" fill="#FFFFFF" />

            {/* Joues roses */}
            <circle cx="34" cy="47" r="2.5" fill="#FFA3B1" opacity="0.6" />
            <circle cx="66" cy="47" r="2.5" fill="#FFA3B1" opacity="0.6" />

            {/* Nez */}
            <polygon points="48,50 52,50 50,53" fill="#2C3E50" />
          </>
        );

      case "panda":
        return (
          <>
            {/* Corps */}
            <circle cx="50" cy="70" r="22" fill="#F0F0F0" />
            {/* Pattes panda (noires) */}
            <ellipse cx="32" cy="76" rx="6" ry="8" fill="#2C3E50" />
            <ellipse cx="68" cy="76" rx="6" ry="8" fill="#2C3E50" />
            <ellipse cx="36" cy="58" rx="7" ry="5" fill="#2C3E50" />
            <ellipse cx="64" cy="58" rx="7" ry="5" fill="#2C3E50" />

            <ellipse cx="50" cy="72" rx="13" ry="15" fill={primaryColor} opacity="0.2" />

            {/* Oreilles */}
            <circle cx="32" cy="28" r="8" fill="#2C3E50" />
            <circle cx="32" cy="28" r="4" fill="#FFC0CB" />
            <circle cx="68" cy="28" r="8" fill="#2C3E50" />
            <circle cx="68" cy="28" r="4" fill="#FFC0CB" />

            {/* Tête */}
            <circle cx="50" cy="45" r="18" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="1" />

            {/* Taches noires yeux */}
            <ellipse cx="43" cy="44" rx="5" ry="6" fill="#2C3E50" transform="rotate(-10 43 44)" />
            <ellipse cx="57" cy="44" rx="5" ry="6" fill="#2C3E50" transform="rotate(10 57 44)" />

            {/* Yeux */}
            <circle cx="43" cy="43" r="2.5" fill="#FFFFFF" />
            <circle cx="43.5" cy="42.5" r="1" fill="#2C3E50" />
            <circle cx="57" cy="43" r="2.5" fill="#FFFFFF" />
            <circle cx="56.5" cy="42.5" r="1" fill="#2C3E50" />

            {/* Nez & Bouche */}
            <ellipse cx="50" cy="49" rx="2.5" ry="1.5" fill="#2C3E50" />
            <path d="M 48 52 Q 50 54 52 52" fill="none" stroke="#2C3E50" strokeWidth="1" />
          </>
        );

      case "owl":
        return (
          <>
            {/* Ailes */}
            <ellipse cx="30" cy="65" rx="8" ry="16" fill={primaryColor} transform="rotate(10 30 65)" />
            <ellipse cx="70" cy="65" rx="8" ry="16" fill={primaryColor} transform="rotate(-10 70 65)" />

            {/* Corps */}
            <ellipse cx="50" cy="68" rx="20" ry="22" fill={primaryColor} />
            {/* Ventre en couleur contrastée */}
            <ellipse cx="50" cy="72" rx="13" ry="15" fill="#FFF3B0" />
            <path d="M 45 68 L 47 71 L 49 68 M 51 68 L 53 71 L 55 68" stroke={primaryColor} strokeWidth="1.5" fill="none" />

            {/* Plumets d'oreilles */}
            <polygon points="34,26 42,34 32,38" fill={primaryColor} />
            <polygon points="66,26 58,34 68,38" fill={primaryColor} />

            {/* Yeux géants hibou */}
            <circle cx="41" cy="42" r="8" fill="#FFFFFF" />
            <circle cx="41" cy="42" r="4.5" fill="#2C3E50" />
            <circle cx="42.5" cy="40.5" r="1.5" fill="#FFFFFF" />

            <circle cx="59" cy="42" r="8" fill="#FFFFFF" />
            <circle cx="59" cy="42" r="4.5" fill="#2C3E50" />
            <circle cx="57.5" cy="40.5" r="1.5" fill="#FFFFFF" />

            {/* Bec */}
            <polygon points="48,46 52,46 50,52" fill="#E67E22" />

            {/* Pattes */}
            <circle cx="42" cy="90" r="3" fill="#E67E22" />
            <circle cx="58" cy="90" r="3" fill="#E67E22" />
          </>
        );

      case "koala":
        return (
          <>
            {/* Corps */}
            <circle cx="50" cy="70" r="21" fill={primaryColor} />
            <ellipse cx="50" cy="73" rx="12" ry="14" fill="#FFFFFF" />

            {/* Grandes oreilles poilues */}
            <circle cx="30" cy="35" r="11" fill={primaryColor} />
            <circle cx="30" cy="35" r="7" fill="#FFC0CB" />
            <circle cx="70" cy="35" r="11" fill={primaryColor} />
            <circle cx="70" cy="35" r="7" fill="#FFC0CB" />

            {/* Tête */}
            <ellipse cx="50" cy="47" rx="18" ry="15" fill={primaryColor} />

            {/* Yeux */}
            <circle cx="42" cy="45" r="2.5" fill="#2C3E50" />
            <circle cx="43" cy="44" r="0.8" fill="#FFFFFF" />
            <circle cx="58" cy="45" r="2.5" fill="#2C3E50" />
            <circle cx="57" cy="44" r="0.8" fill="#FFFFFF" />

            {/* Grand nez ovale noir typique du koala */}
            <ellipse cx="50" cy="49" rx="4" ry="6" fill="#2C3E50" />

            {/* Joues roses */}
            <circle cx="36" cy="51" r="2" fill="#FFA3B1" opacity="0.6" />
            <circle cx="64" cy="51" r="2" fill="#FFA3B1" opacity="0.6" />
          </>
        );
    }
  };

  // Rendu de l'accessoire superposé au bon endroit
  const renderAccessory = (accId: string) => {
    switch (accId) {
      case "glasses":
        return (
          <g id="accessory-glasses">
            {/* Lunettes rondes style Harry Potter */}
            <circle cx="42" cy="42" r="7" fill="none" stroke="#2C3E50" strokeWidth="2.5" />
            <circle cx="58" cy="42" r="7" fill="none" stroke="#2C3E50" strokeWidth="2.5" />
            <line x1="49" y1="42" x2="51" y2="42" stroke="#2C3E50" strokeWidth="2.5" />
            <line x1="35" y1="41" x2="31" y2="44" stroke="#2C3E50" strokeWidth="1.5" />
            <line x1="65" y1="41" x2="69" y2="44" stroke="#2C3E50" strokeWidth="1.5" />
          </g>
        );

      case "magic-hat":
        return (
          <g id="accessory-magic-hat">
            {/* Chapeau de magicien violet avec des étoiles dorées */}
            <path d="M 28 32 C 32 30 68 30 72 32 L 68 28 L 54 4 C 52 2 48 2 46 4 L 32 28 Z" fill="#6C5CE7" />
            <ellipse cx="50" cy="30" rx="24" ry="4" fill="#5F27CD" />
            {/* Ruban jaune */}
            <path d="M 33 27 C 40 25 60 25 67 27 L 66 29 C 60 27 40 27 34 29 Z" fill="#F1C40F" />
            {/* Étoile sur le chapeau */}
            <polygon points="50,10 52,14 56,14 53,17 54,21 50,19 46,21 47,17 44,14 48,14" fill="#F1C40F" />
          </g>
        );

      case "crown":
        return (
          <g id="accessory-crown">
            {/* Couronne de roi dorée */}
            <polygon points="32,28 36,15 44,22 50,12 56,22 64,15 68,28" fill="#F1C40F" stroke="#D35400" strokeWidth="1" />
            {/* Joyaux */}
            <circle cx="50" cy="12" r="1.5" fill="#E74C3C" />
            <circle cx="36" cy="15" r="1.5" fill="#3498DB" />
            <circle cx="64" cy="15" r="1.5" fill="#3498DB" />
            <circle cx="50" cy="24" r="2" fill="#2ECC71" />
          </g>
        );

      case "super-cape":
        return (
          <g id="accessory-super-cape" transform="translate(0, 50)">
            {/* Cape rouge de super-héros visible en arrière-plan */}
            <path d="M 22 18 L 8 45 Q 50 55 92 45 L 78 18 Q 50 14 22 18 Z" fill="#E74C3C" />
            <path d="M 28 17 Q 50 12 72 17" fill="none" stroke="#C0392B" strokeWidth="2.5" />
          </g>
        );

      case "headphones":
        return (
          <g id="accessory-headphones">
            {/* Casque audio de musique fun */}
            <path d="M 28 42 A 22 22 0 0 1 72 42" fill="none" stroke="#FF5722" strokeWidth="4.5" strokeLinecap="round" />
            {/* Coussinets d'oreilles */}
            <ellipse cx="28" cy="44" rx="4.5" ry="7.5" fill="#333333" />
            <ellipse cx="27" cy="44" rx="3.5" ry="6.5" fill="#FF5722" />
            
            <ellipse cx="72" cy="44" rx="4.5" ry="7.5" fill="#333333" />
            <ellipse cx="73" cy="44" rx="3.5" ry="6.5" fill="#FF5722" />
          </g>
        );

      case "shield":
        return (
          <g id="accessory-shield" transform="translate(8, 55)">
            {/* Bouclier de chevalier */}
            <path d="M 0 0 L 12 -4 L 24 0 L 24 12 C 24 20 12 28 12 28 C 12 28 0 20 0 12 Z" fill="#BDC3C7" stroke="#7F8C8D" strokeWidth="1.5" />
            <path d="M 3 2 L 12 -1 L 21 2 L 21 12 C 21 18 12 24 12 24 C 12 24 3 18 3 12 Z" fill="#E74C3C" />
            <line x1="12" y1="0" x2="12" y2="22" stroke="#BDC3C7" strokeWidth="1.5" />
            <line x1="3" y1="10" x2="21" y2="10" stroke="#BDC3C7" strokeWidth="1.5" />
          </g>
        );

      case "wand":
        return (
          <g id="accessory-wand" transform="translate(68, 48)">
            {/* Baguette magique */}
            <line x1="5" y1="30" x2="18" y2="8" stroke="#8B5A2B" strokeWidth="2.5" strokeLinecap="round" />
            {/* Étoile magique au bout */}
            <polygon points="18,3 20,6 23,6 21,8 22,11 18,9 14,11 15,8 13,6 16,6" fill="#F1C40F" stroke="#F39C12" strokeWidth="0.6" />
            {/* Petites étincelles */}
            <circle cx="24" cy="2" r="0.6" fill="#FFF" />
            <circle cx="11" cy="15" r="0.6" fill="#FFF" />
            <circle cx="23" cy="12" r="0.6" fill="#FFF" />
          </g>
        );

      case "bow-tie":
        return (
          <g id="accessory-bow-tie" transform="translate(50, 56)">
            {/* Nœud papillon chic */}
            <polygon points="-10,-5 -10,5 0,0" fill="#E74C3C" stroke="#C0392B" strokeWidth="0.8" />
            <polygon points="10,-5 10,5 0,0" fill="#E74C3C" stroke="#C0392B" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="3" fill="#C0392B" />
            {/* Pois blancs */}
            <circle cx="-6" cy="-1.5" r="0.8" fill="#FFF" />
            <circle cx="-6" cy="1.5" r="0.8" fill="#FFF" />
            <circle cx="6" cy="-1.5" r="0.8" fill="#FFF" />
            <circle cx="6" cy="1.5" r="0.8" fill="#FFF" />
          </g>
        );

      case "balloon":
        return (
          <g id="accessory-balloon">
            {/* Ballon de baudruche volant */}
            <path d="M 72 72 Q 78 50 75 28" fill="none" stroke="#7F8C8D" strokeWidth="1" strokeDasharray="1,1" />
            <g transform="translate(75, 20)">
              <ellipse cx="0" cy="-10" rx="9" ry="11" fill="#FF7675" />
              {/* Reflet de brillance */}
              <ellipse cx="-3" cy="-13" rx="1.8" ry="3.5" fill="#FFEAA7" opacity="0.6" transform="rotate(-15 -3 -13)" />
              {/* Petit noeud de fermeture */}
              <polygon points="-1.5,0 1.5,0 0,-2.5" fill="#D63031" />
            </g>
          </g>
        );

      case "halo":
        return (
          <g id="accessory-halo">
            {/* Auréole dorée des Sages, flottant au-dessus de la tête */}
            <ellipse cx="50" cy="15" rx="19" ry="5.5" fill="none" stroke="#F1C40F" strokeWidth="3.2" />
            <ellipse cx="50" cy="15" rx="19" ry="5.5" fill="none" stroke="#FFF3B0" strokeWidth="1.1" />
            <circle cx="31" cy="15" r="0.9" fill="#FFFFFF" />
            <circle cx="69" cy="15" r="0.9" fill="#FFFFFF" />
          </g>
        );

      case "sage-star":
        return (
          <g id="accessory-sage-star" transform="translate(50, 14)">
            {/* Étoile du Sage : emblème lumineux au-dessus de la tête */}
            <polygon points="0,-10 2.8,-3.2 10,-3.2 4.2,1.2 6.4,8 0,3.8 -6.4,8 -4.2,1.2 -10,-3.2 -2.8,-3.2" fill="#FBBF24" stroke="#D97706" strokeWidth="0.8" />
            <circle cx="0" cy="-1" r="1.8" fill="#FFF7CC" />
            <circle cx="11" cy="-9" r="0.8" fill="#FFFFFF" />
            <circle cx="-11" cy="-7" r="0.7" fill="#FFFFFF" />
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      animate={interactive ? {
        y: [0, -4, 0],
        scaleY: [1, 0.98, 1],
      } : undefined}
      transition={interactive ? {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      } : undefined}
      whileTap={interactive ? { scale: 0.9, y: -10 } : undefined}
      whileHover={interactive ? { scale: 1.05, rotate: [0, -3, 3, 0] } : undefined}
    >
      {/* Illustration du personnage (avec accessoire intégré si dispo), sinon SVG.
          Sur les avatars-images, on n'affiche PAS la surcouche SVG d'accessoires
          (elle ne s'aligne pas) : l'accessoire est intégré à l'illustration. */}
      {displayImage ? (
        <img
          src={asset(displayImage)}
          alt=""
          className="absolute inset-0 w-full h-full object-contain drop-shadow-md select-none pointer-events-none"
        />
      ) : (
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full drop-shadow-md select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Render Cape first (so it stays in the back) */}
          {accessories.includes("super-cape") && renderAccessory("super-cape")}

          {/* Animal Core Body & Head */}
          {renderAnimalSVG()}

          {/* Render other accessories (on top of the head) */}
          {accessories.filter(a => a !== "super-cape" && a !== "none").map(a => (
            <React.Fragment key={a}>
              {renderAccessory(a)}
            </React.Fragment>
          ))}
        </svg>
      )}
    </motion.div>
  );
};
