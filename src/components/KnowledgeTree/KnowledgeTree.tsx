"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IllustrationRenderer } from "../UI/IllustrationRenderer";
import { UNIVERSES } from "@/data/lessons";

interface KnowledgeTreeProps {
  xp: number;
  level: number;
  unlockedBadges: string[];
  unlockedTreeAnimals?: string[];
  wateringCans?: number;
  onUseWateringCan?: () => boolean;
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
  unlockedTreeAnimals = [],
  wateringCans = 0,
  onUseWateringCan,
}) => {
  // Déterminer la phase de croissance de l'arbre (plus lente et plus de niveaux)
  const getGrowthStage = () => {
    if (level <= 2) return "sprout";   // Niv 1 et 2
    if (level <= 4) return "sapling";  // Niv 3 et 4
    if (level <= 6) return "young";    // Niv 5 et 6
    if (level <= 9) return "mature";   // Niv 7, 8 et 9
    return "magic";                    // Niv 10+
  };

  const stage = getGrowthStage();

  // Calculer une échelle continue pour faire grandir l'arbre à chaque niveau (0.75 à 1.15)
  const getTreeScale = () => {
    const baseScale = 0.75;
    const bonus = Math.min(9, level - 1) * 0.04; // +4% de taille à chaque niveau
    return baseScale + bonus;
  };
  const treeScale = getTreeScale();

  const [processedSrc, setProcessedSrc] = React.useState<string | null>(null);
  const [isWatering, setIsWatering] = React.useState(false);
  const [glowing, setGlowing] = React.useState(false);

  // Calcul du pourcentage de croissance dans la phase actuelle
  const getGrowthPercent = () => {
    if (stage === 'sprout') return ((Math.min(level, 2) - 1) / 2) * 100;
    if (stage === 'sapling') return ((level - 3) / 2) * 100;
    if (stage === 'young') return ((level - 5) / 2) * 100;
    if (stage === 'mature') return ((level - 7) / 3) * 100;
    return 100; // magic
  };
  const growthPercent = Math.max(0, Math.min(100, getGrowthPercent()));

  const barColors: Record<string, { gradient: string; track: string }> = {
    sprout: { gradient: 'from-lime-400 to-lime-500', track: 'bg-lime-100' },
    sapling: { gradient: 'from-green-400 to-green-500', track: 'bg-green-100' },
    young: { gradient: 'from-emerald-400 to-emerald-500', track: 'bg-emerald-100' },
    mature: { gradient: 'from-teal-400 to-teal-500', track: 'bg-teal-100' },
    magic: { gradient: 'from-violet-400 to-violet-500', track: 'bg-violet-100' },
  };
  const barGradient = barColors[stage]?.gradient || barColors.sprout.gradient;
  const barTrackColor = barColors[stage]?.track || barColors.sprout.track;

  const handleWatering = () => {
    if (!onUseWateringCan || isWatering) return;
    const success = onUseWateringCan();
    if (success) {
      setIsWatering(true);
      setGlowing(true);
      setTimeout(() => setIsWatering(false), 3000);
      setTimeout(() => setGlowing(false), 4000);
    }
  };

  React.useEffect(() => {
    const imgSrc = `/images/tree_${stage}.png`;
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // Le fond de l'image est un dégradé très clair et peu saturé (ciel bleu, nuages, sol sableux)
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const diff = max - min;
          
          // Si les valeurs de couleur sont élevées (clair) et proches les unes des autres (peu saturé)
          if (r > 150 && g > 150 && b > 130 && diff < 80) {
            // Calculer un score de confiance de fond (0 à 1)
            const rScore = Math.min(1, Math.max(0, (r - 150) / 40));
            const gScore = Math.min(1, Math.max(0, (g - 150) / 40));
            const bScore = Math.min(1, Math.max(0, (b - 130) / 40));
            const diffScore = Math.min(1, Math.max(0, (80 - diff) / 45));
            
            const bgConfidence = rScore * gScore * bScore * diffScore;
            
            if (bgConfidence > 0.8) {
              data[i + 3] = 0; // Rend le pixel entièrement transparent
            } else {
              data[i + 3] = Math.floor(data[i + 3] * (1 - bgConfidence)); // Dégradé doux sur les contours
            }
          }
        }
        ctx.putImageData(imgData, 0, 0);
        setProcessedSrc(canvas.toDataURL("image/png"));
      }
    };
    img.onerror = () => {
      setProcessedSrc(null);
    };
  }, [stage]);

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
    { id: "computer-badge-l10", emoji: "🕹️", x: 18, y: 30, color: "#9B5DE5" }, // Informatique Niv 10
    { id: "survival-badge-l10", emoji: "🧭", x: 82, y: 38, color: "#E67E22" }, // Survie Niv 10
    { id: "ornithology-badge-l10", emoji: "🐦", x: 42, y: 12, color: "#10AC84" }, // Ornithologie Niv 10
    { id: "history-badge-l10", emoji: "🏰", x: 32, y: 18, color: "#E74C3C" }, // Histoire Niv 10
  ];

  return (
    <div className="relative w-full max-w-[340px] aspect-square mx-auto bg-gradient-to-b from-sky-100/50 to-emerald-50/20 rounded-3xl p-4 border-4 border-sky-200/50 shadow-inner flex items-center justify-center overflow-hidden">
      {/* Barre de croissance au-dessus de l'arbre */}
      <div className={`absolute top-2 left-4 right-4 z-10 transition-all duration-700 ${glowing ? 'drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]' : ''}`}>
        <div className="flex items-center justify-between mb-0.5">
          <span className={`text-[9px] sm:text-[10px] font-black tracking-wide uppercase ${glowing ? 'text-emerald-300' : 'text-emerald-700'} transition-colors duration-700`}>
            🌱 Croissance
          </span>
          <span className={`text-[9px] sm:text-[10px] font-bold ${glowing ? 'text-emerald-300' : 'text-emerald-600'} transition-colors duration-700`}>
            {Math.round(growthPercent)}%
          </span>
        </div>
        <div className={`w-full ${barTrackColor} rounded-full h-3 overflow-hidden border ${glowing ? 'border-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'border-emerald-200'} transition-all duration-700`}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${growthPercent}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-full rounded-full bg-gradient-to-r ${barGradient} ${glowing ? 'shadow-[0_0_10px_rgba(16,185,129,0.6)]' : ''} transition-shadow duration-700`}
          />
        </div>
      </div>

      {/* Nuages en arrière-plan */}
      <div className="absolute top-14 left-4 w-12 h-6 bg-white opacity-60 rounded-full blur-[1px] animate-pulse" />
      <div className="absolute top-20 right-6 w-16 h-8 bg-white opacity-50 rounded-full blur-[1px]" style={{ animationDuration: '6s' }} />

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
            style={{
              originX: "50px",
              originY: "85px",
              scale: treeScale,
              filter: glowing ? 'brightness(1.3) drop-shadow(0 0 8px rgba(16,185,129,0.5))' : 'none',
              transition: 'filter 0.7s ease',
            }}
          >
            <image
              href={processedSrc || `/images/tree_${stage}.png`}
              x="12"
              y="10"
              width="76"
              height="76"
              className="select-none pointer-events-none"
              style={processedSrc ? {} : { mixBlendMode: "multiply" }}
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
        {/* Animaux de l'arbre débloqués */}
        {unlockedTreeAnimals.includes("tree-butterfly") && (
          <motion.g
            animate={{ 
              x: [0, 1.5, -1, 0],
              y: [0, -3, 1.5, 0],
              rotate: [0, 8, -8, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="origin-center"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <text x="62" y="44" className="text-[7px] select-none pointer-events-none filter drop-shadow-sm">
              🦋
            </text>
          </motion.g>
        )}

        {unlockedTreeAnimals.includes("tree-owl") && (
          <motion.g
            animate={{ 
              scaleY: [1, 1.08, 1],
              rotate: [0, 1.5, -1.5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="origin-center"
            style={{ transformBox: "fill-box", transformOrigin: "bottom center" }}
          >
            <text x="47" y="34" className="text-[7px] select-none pointer-events-none filter drop-shadow-sm">
              🦉
            </text>
          </motion.g>
        )}

        {unlockedTreeAnimals.includes("tree-squirrel") && (
          <motion.g
            animate={{ 
              y: [0, -1.5, 0],
              scaleX: [1, 0.96, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
            className="origin-center"
            style={{ transformBox: "fill-box", transformOrigin: "bottom center" }}
          >
            <text x="28" y="65" className="text-[7px] select-none pointer-events-none filter drop-shadow-sm">
              🐿️
            </text>
          </motion.g>
        )}

        {unlockedTreeAnimals.includes("tree-parrot") && (
          <motion.g
            animate={{ 
              rotate: [0, -3, 3, 0]
            }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="origin-center"
            style={{ transformBox: "fill-box", transformOrigin: "bottom center" }}
          >
            <text x="74" y="55" className="text-[7px] select-none pointer-events-none filter drop-shadow-sm">
              🦜
            </text>
          </motion.g>
        )}
      </svg>

      {/* Animation d'arrosage */}
      <AnimatePresence>
        {isWatering && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
          >
            {/* Arrosoir animé */}
            <motion.div
              initial={{ x: '100%', rotate: 0 }}
              animate={{ x: '20%', rotate: -30 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute top-[15%] text-5xl sm:text-6xl"
            >
              🚿
            </motion.div>
            {/* Gouttes d'eau */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: '20%', x: `${30 + Math.random() * 40}%` }}
                animate={{ opacity: [0, 1, 1, 0], y: ['20%', '75%'] }}
                transition={{ duration: 1.5, delay: 0.5 + i * 0.15, ease: 'easeIn' }}
                className="absolute text-lg sm:text-xl"
              >
                💧
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Effet d'illumination de l'arbre */}
      {glowing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0.3] }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="absolute inset-0 z-10 rounded-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle at 50% 60%, rgba(16,185,129,0.25) 0%, transparent 70%)' }}
        />
      )}

      {/* Bouton arrosoir */}
      {wateringCans > 0 && !isWatering && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWatering}
          className="absolute bottom-10 right-3 z-30 bg-gradient-to-br from-teal-400 to-emerald-500 text-white rounded-2xl px-3 py-2 shadow-lg text-xs sm:text-sm font-black flex items-center gap-1.5 cursor-pointer border-2 border-teal-300 hover:shadow-xl transition-shadow"
        >
          <span className="text-lg">🚿</span>
          <span>Arroser ({wateringCans})</span>
        </motion.button>
      )}

      {/* Texte indicateur en bas de l'arbre */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/95 px-3 py-1 rounded-full shadow-md text-xs font-bold text-emerald-700 select-none">
        {stage === "sprout" && "🌱 Petite Pousse"}
        {stage === "sapling" && "🌿 Jeune Arbuste"}
        {stage === "young" && "🌳 Arbuste en Croissance"}
        {stage === "mature" && "🍏 Arbre Fruitier Mature"}
        {stage === "magic" && "✨ Arbre Magique Fleuri"}
      </div>
    </div>
  );
};
