"use client";

import React from "react";
import { motion } from "framer-motion";
import { AvatarConfig } from "@/context/AppContext";

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
  const { type, color, accessory } = config;

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
  const renderAccessory = () => {
    switch (accessory) {
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
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Render Cape first (so it stays in the back) */}
        {accessory === "super-cape" && renderAccessory()}

        {/* Animal Core Body & Head */}
        {renderAnimalSVG()}

        {/* Render other accessories (on top of the head) */}
        {accessory !== "super-cape" && renderAccessory()}
      </svg>
    </motion.div>
  );
};
