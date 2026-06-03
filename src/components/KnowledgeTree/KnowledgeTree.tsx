"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IllustrationRenderer } from "../UI/IllustrationRenderer";
import { UNIVERSES } from "@/data/lessons";

interface KnowledgeTreeProps {
  xp: number;
  level: number;
  unlockedBadges: string[];
}

interface TreeBadgeFruit {
  id: string;
  emoji: string;
  x: number;
  y: number;
  color: string;
}

export const KnowledgeTree: React.FC<KnowledgeTreeProps> = ({
  xp,
  level,
  unlockedBadges,
}) => {
  // Déterminer la phase de croissance de l'arbre
  // Niveau 1 : Pousse (Sprout)
  // Niveau 2 : Jeune branche (Sapling)
  // Niveau 3 : Arbuste (Young Tree)
  // Niveau 4 : Arbre mature (Mature Tree)
  // Niveau 5+ : Arbre magique fleuri (Magic Tree)
  const getGrowthStage = () => {
    if (level === 1) return "sprout";
    if (level === 2) return "sapling";
    if (level === 3) return "young";
    if (level === 4) return "mature";
    return "magic";
  };

  const stage = getGrowthStage();

  const badgeFruits: TreeBadgeFruit[] = [
    { id: "sound-master", emoji: "🐾", x: 24, y: 36, color: "#FF9F43" }, // Animaux 3-5
    { id: "habitat-explorer", emoji: "🌲", x: 36, y: 24, color: "#10AC84" }, // Animaux 6-8
    { id: "adaptation-scientist", emoji: "🦅", x: 64, y: 30, color: "#FF9F43" }, // Animaux 9-12
    { id: "taxonomist-expert", emoji: "🦕", x: 58, y: 20, color: "#FF9F43" }, // Animaux 9-12 (3ème leçon)
    { id: "season-rookie", emoji: "🌸", x: 20, y: 46, color: "#FF7675" }, // Nature 3-5
    { id: "green-thumb", emoji: "🌱", x: 44, y: 38, color: "#2ECC71" }, // Nature 6-8
    { id: "water-guardian", emoji: "💧", x: 76, y: 46, color: "#54A0FF" }, // Nature 9-12
    { id: "mountaineer-ecologist", emoji: "⛰️", x: 34, y: 46, color: "#10AC84" }, // Nature 9-12 (3ème leçon)
    { id: "body-rookie", emoji: "👟", x: 32, y: 54, color: "#EE5253" }, // Corps 3-5
    { id: "sensory-master", emoji: "👁️", x: 68, y: 56, color: "#EE5253" }, // Corps 6-8
    { id: "digestion-doctor", emoji: "🥼", x: 52, y: 32, color: "#00DEC9" }, // Corps 9-12
    { id: "cardiologist-expert", emoji: "❤️", x: 56, y: 52, color: "#EE5253" }, // Corps 9-12 (3ème leçon)
    { id: "sky-watcher", emoji: "⭐", x: 26, y: 22, color: "#FECA57" }, // Espace 3-5
    { id: "lunar-explorer", emoji: "🌑", x: 48, y: 16, color: "#5F27CD" }, // Espace 6-8
    { id: "space-commander", emoji: "🪐", x: 76, y: 30, color: "#5F27CD" }, // Espace 9-12
    { id: "astronaut-badge", emoji: "🧑‍🚀", x: 70, y: 24, color: "#5F27CD" }, // Espace 9-12 (3ème leçon)
  ];

  return (
    <div className="relative w-full max-w-[340px] aspect-square mx-auto bg-gradient-to-b from-sky-100/50 to-emerald-50/20 rounded-3xl p-4 border-4 border-sky-200/50 shadow-inner flex items-center justify-center overflow-hidden">
      {/* Nuages en arrière-plan */}
      <div className="absolute top-4 left-4 w-12 h-6 bg-white opacity-60 rounded-full blur-[1px] animate-pulse" />
      <div className="absolute top-10 right-6 w-16 h-8 bg-white opacity-50 rounded-full blur-[1px]" style={{ animationDuration: '6s' }} />

      <svg
        viewBox="0 0 100 100"
        className="w-full h-full select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Colline d'herbe au sol */}
        <path d="M -10 90 Q 50 82 110 90 L 110 110 L -10 110 Z" fill="#2ECC71" />
        <path d="M -10 92 Q 50 86 110 92 L 110 110 L -10 110 Z" fill="#27AE60" />

        {/* Fleurs au sol */}
        <circle cx="20" cy="86" r="1.5" fill="#F1C40F" />
        <circle cx="18" cy="86" r="1.2" fill="#E74C3C" />
        <circle cx="22" cy="86" r="1.2" fill="#E74C3C" />
        <circle cx="20" cy="84" r="1.2" fill="#E74C3C" />
        <circle cx="20" cy="88" r="1.2" fill="#E74C3C" />

        <circle cx="82" cy="88" r="1.5" fill="#F1C40F" />
        <circle cx="80" cy="88" r="1.2" fill="#9B5DE5" />
        <circle cx="84" cy="88" r="1.2" fill="#9B5DE5" />
        <circle cx="82" cy="86" r="1.2" fill="#9B5DE5" />
        <circle cx="82" cy="90" r="1.2" fill="#9B5DE5" />

        {/* Rendu dynamique de l'arbre selon le niveau */}
        <AnimatePresence mode="wait">
          <motion.g
            key={stage}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="origin-bottom"
            style={{ originX: "50px", originY: "85px" }}
          >
            <image
              href={`/images/tree_${stage}.png`}
              x="12"
              y="10"
              width="76"
              height="76"
              className="select-none pointer-events-none"
            />
          </motion.g>
        </AnimatePresence>

        {/* Éléments magiques supplémentaires animés pour le stade Magic */}
        {stage === "magic" && (
          <g>
            {/* Papillon magique jaune */}
            <motion.g
              animate={{ y: [0, -3, 0], x: [0, 2, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M 76 22 Q 79 16 81 20 Q 79 24 76 22" fill="#F1C40F" />
              <path d="M 76 22 Q 73 16 71 20 Q 73 24 76 22" fill="#F1C40F" />
              <line x1="76" y1="20" x2="76" y2="24" stroke="#333" strokeWidth="0.8" />
            </motion.g>
            {/* Papillon magique rose */}
            <motion.g
              animate={{ y: [0, 2, 0], x: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <path d="M 24 32 Q 27 26 29 30 Q 27 34 24 32" fill="#FF7675" />
              <path d="M 24 32 Q 21 26 19 30 Q 21 34 24 32" fill="#FF7675" />
              <line x1="24" y1="30" x2="24" y2="34" stroke="#333" strokeWidth="0.8" />
            </motion.g>
          </g>
        )}

        {/* Afficher les Badges-Fruits débloqués */}
        {level >= 4 &&
          badgeFruits.map((fruit) => {
            const isUnlocked = unlockedBadges.includes(fruit.id);
            if (!isUnlocked) return null;

            return (
              <g key={fruit.id}>
                {/* Petit fil de suspension fin */}
                <line
                  x1={fruit.x}
                  y1={fruit.y - 4}
                  x2={fruit.x}
                  y2={fruit.y}
                  stroke="#4A3B32"
                  strokeWidth="0.6"
                />
                {/* Corps du badge suspendu */}
                <motion.g
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.25, rotate: [0, -8, 8, 0] }}
                  transition={{ type: "tween", duration: 0.4 }}
                  className="cursor-pointer"
                  style={{ transformOrigin: `${fruit.x}px ${fruit.y}px` }}
                >
                  {/* Bulbe / Fond du fruit en verre brillant, plus discret */}
                  <circle
                    cx={fruit.x}
                    cy={fruit.y}
                    r="3.5"
                    fill={fruit.color}
                    stroke="#FFF"
                    strokeWidth="0.6"
                    className="drop-shadow-sm"
                  />
                  {/* Illustration vectorielle au centre du fruit, plus petite */}
                  <foreignObject
                    x={fruit.x - 2.25}
                    y={fruit.y - 2.25}
                    width="4.5"
                    height="4.5"
                  >
                    <div className="w-full h-full flex items-center justify-center pointer-events-none select-none">
                      <IllustrationRenderer
                        name={fruit.emoji}
                        size="100%"
                        animate={false}
                      />
                    </div>
                  </foreignObject>
                </motion.g>
              </g>
            );
          })}
      </svg>

      {/* Texte indicateur en bas de l'arbre */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/95 px-3 py-1 rounded-full shadow-md text-xs font-bold text-emerald-700 select-none">
        {stage === "sprout" && "🌱 Petite Pousse"}
        {stage === "sapling" && "🌿 Jeune Arbuste"}
        {stage === "young" && "🌳 Bel Arbuste"}
        {stage === "mature" && "🍏 Bel Arbre Fruitier"}
        {stage === "magic" && "✨ Arbre Magique Fleuri"}
      </div>
    </div>
  );
};
