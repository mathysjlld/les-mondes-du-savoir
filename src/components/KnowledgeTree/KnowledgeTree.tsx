"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IllustrationRenderer } from "../UI/IllustrationRenderer";
import { UNIVERSES } from "@/data/lessons";

interface KnowledgeTreeProps {
  xp: number;
  level: number;
  treeGrowth: number;
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
  treeGrowth,
  unlockedBadges,
  unlockedTreeAnimals = [],
  wateringCans = 0,
  onUseWateringCan,
}) => {
  // Déterminer la phase de croissance de l'arbre par rapport à treeGrowth (0 à 100)
  const getGrowthStage = () => {
    if (treeGrowth < 8) return "sprout_1";    // 0% à 8%
    if (treeGrowth < 16) return "sprout_2";   // 8% à 16%
    if (treeGrowth < 24) return "sprout_3";   // 16% à 24%
    if (treeGrowth < 34) return "sapling_1";  // 24% à 34%
    if (treeGrowth < 44) return "sapling_2";  // 34% à 44%
    if (treeGrowth < 55) return "young_1";    // 44% à 55%
    if (treeGrowth < 66) return "young_2";    // 55% à 66%
    if (treeGrowth < 78) return "young_3";    // 66% à 78%
    if (treeGrowth < 90) return "mature";     // 78% à 90%
    return "magic";                           // 90%+
  };

  const stage = getGrowthStage();

  const getImageNameForStage = (stg: string) => {
    if (stg.startsWith("sprout")) return "sprout";
    if (stg.startsWith("sapling")) return "sapling";
    if (stg.startsWith("young")) return "young";
    if (stg.startsWith("mature")) return "mature";
    return "magic";
  };
  const imgName = getImageNameForStage(stage);

  // Calculer l'échelle continue pour faire grandir l'arbre de manière progressive
  const getTreeScale = () => {
    const baseScale = 0.7;
    const bonus = Math.min(100, treeGrowth) * 0.004; // +0.4% de taille par 1% de croissance globale
    return baseScale + bonus;
  };
  const treeScale = getTreeScale();

  const [processedSrc, setProcessedSrc] = React.useState<string | null>(null);
  const [isWatering, setIsWatering] = React.useState(false);
  const [glowing, setGlowing] = React.useState(false);

  // Calcul du pourcentage de croissance propre à la phase actuelle (de 0 à 100%)
  const getGrowthPercent = () => {
    if (stage === 'sprout_1') return (treeGrowth / 8) * 100;
    if (stage === 'sprout_2') return ((treeGrowth - 8) / 8) * 100;
    if (stage === 'sprout_3') return ((treeGrowth - 16) / 8) * 100;
    if (stage === 'sapling_1') return ((treeGrowth - 24) / 10) * 100;
    if (stage === 'sapling_2') return ((treeGrowth - 34) / 10) * 100;
    if (stage === 'young_1') return ((treeGrowth - 44) / 11) * 100;
    if (stage === 'young_2') return ((treeGrowth - 55) / 11) * 100;
    if (stage === 'young_3') return ((treeGrowth - 66) / 12) * 100;
    if (stage === 'mature') return ((treeGrowth - 78) / 12) * 100;
    return 100; // magic
  };
  const growthPercent = Math.max(0, Math.min(100, getGrowthPercent()));

  const barColors: Record<string, { gradient: string; track: string }> = {
    sprout_1: { gradient: 'from-lime-400 to-lime-500', track: 'bg-lime-100' },
    sprout_2: { gradient: 'from-lime-500 to-green-400', track: 'bg-lime-100' },
    sprout_3: { gradient: 'from-lime-500 to-green-500', track: 'bg-lime-100' },
    sapling_1: { gradient: 'from-green-400 to-green-500', track: 'bg-green-100' },
    sapling_2: { gradient: 'from-green-500 to-emerald-400', track: 'bg-green-100' },
    young_1: { gradient: 'from-emerald-400 to-emerald-500', track: 'bg-emerald-100' },
    young_2: { gradient: 'from-emerald-500 to-teal-400', track: 'bg-emerald-100' },
    young_3: { gradient: 'from-emerald-500 to-teal-500', track: 'bg-emerald-100' },
    mature: { gradient: 'from-teal-400 to-teal-500', track: 'bg-teal-100' },
    magic: { gradient: 'from-violet-400 to-violet-500', track: 'bg-violet-100' },
  };
  const barGradient = barColors[stage]?.gradient || barColors.sprout_1.gradient;
  const barTrackColor = barColors[stage]?.track || barColors.sprout_1.track;

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
    const imgSrc = `/images/tree_${imgName}.png`;
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
          
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const diff = max - min;
          
          if (r > 150 && g > 150 && b > 130 && diff < 80) {
            const rScore = Math.min(1, Math.max(0, (r - 150) / 40));
            const gScore = Math.min(1, Math.max(0, (g - 150) / 40));
            const bScore = Math.min(1, Math.max(0, (b - 130) / 40));
            const diffScore = Math.min(1, Math.max(0, (80 - diff) / 45));
            
            const bgConfidence = rScore * gScore * bScore * diffScore;
            
            if (bgConfidence > 0.8) {
              data[i + 3] = 0;
            } else {
              data[i + 3] = Math.floor(data[i + 3] * (1 - bgConfidence));
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
  }, [imgName]);



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
            animate={isWatering ? {
              scale: [treeScale, treeScale * 1.06, treeScale * 0.98, treeScale * 1.03, treeScale],
              rotate: [0, -1.5, 1.5, -0.7, 0.7, 0],
              opacity: 1,
            } : {
              scale: treeScale,
              rotate: 0,
              opacity: 1,
            }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{
              scale: isWatering ? { duration: 2.5, ease: "easeInOut" } : { type: "spring", stiffness: 120, damping: 14 },
              rotate: { duration: 2.5, ease: "easeInOut" },
              opacity: { duration: 0.2 }
            }}
            className="origin-bottom"
            style={{
              originX: "50px",
              originY: "85px",
              filter: glowing ? 'brightness(1.6) drop-shadow(0 0 25px rgba(52,211,153,0.95)) drop-shadow(0 0 45px rgba(16,185,129,0.7))' : 'none',
              transition: 'filter 0.7s ease',
            }}
          >
            <image
              href={processedSrc || `/images/tree_${imgName}.png`}
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
            <image
              href="/images/tree_butterfly.png"
              x="58"
              y="38"
              width="10"
              height="10"
              className="select-none pointer-events-none filter drop-shadow-sm"
            />
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
            <image
              href="/images/tree_owl.png"
              x="43"
              y="26"
              width="12"
              height="12"
              className="select-none pointer-events-none filter drop-shadow-sm"
            />
          </motion.g>
        )}

        {unlockedTreeAnimals.includes("tree-squirrel") && (
          <motion.g
            animate={{ 
              y: [0, -1, 0],
              scaleX: [1, 0.97, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
            className="origin-bottom"
            style={{ transformBox: "fill-box", transformOrigin: "bottom center" }}
          >
            <image
              href="/images/tree_squirrel.png"
              x="20"
              y="74"
              width="12"
              height="12"
              className="select-none pointer-events-none filter drop-shadow-sm"
            />
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
            <image
              href="/images/tree_parrot.png"
              x="68"
              y="48"
              width="12"
              height="12"
              className="select-none pointer-events-none filter drop-shadow-sm"
            />
          </motion.g>
        )}
      </svg>

      {/* Animation d'arrosage */}
      <AnimatePresence>
        {isWatering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
          >
            {/* Arrosoir animé */}
            <motion.div
              initial={{ x: 120, y: -20, rotate: 0, scale: 0.8 }}
              animate={{ 
                x: [120, -35, -35, 120], 
                y: [-20, 0, 0, -20], 
                rotate: [0, -35, -35, 0],
                scale: [0.8, 1, 1, 0.8],
              }}
              transition={{ 
                duration: 3.2, 
                times: [0, 0.25, 0.75, 1],
                ease: 'easeInOut' 
              }}
              className="absolute right-0 top-2 w-28 h-28 origin-center"
            >
              <img 
                src="/images/watering_can.png" 
                alt="Arrosoir"
                className="w-full h-full object-contain filter drop-shadow-md"
              />
            </motion.div>

            {/* Flux de gouttelettes d'eau réaliste (plus grosses, visibles et bien positionnées) */}
            {[...Array(40)].map((_, i) => {
              const delay = 0.6 + (i * 0.055);
              const startX = 55 + (Math.random() * 4 - 2); // Aligné sur le bec verseur
              const startY = 20 + (Math.random() * 2 - 1); // Aligné sur le bec verseur
              const targetX = 42 + (Math.random() * 16 - 8);
              const targetY = 78 + (Math.random() * 8 - 4);
              
              return (
                <motion.div
                  key={`drop-${i}`}
                  initial={{ opacity: 0, scale: 0.1, left: `${startX}%`, top: `${startY}%` }}
                  animate={{ 
                    opacity: [0, 0.95, 0.95, 0],
                    scale: [0.4, 1.2, 1.2, 0.4],
                    left: [`${startX}%`, `${startX - 10}%`, `${targetX}%`],
                    top: [`${startY}%`, `${startY + 15}%`, `${targetY}%`],
                  }}
                  transition={{ 
                    duration: 0.75, 
                    delay: delay, 
                    ease: 'easeIn' 
                  }}
                  className="absolute pointer-events-none select-none"
                  style={{ transform: 'translate(-50%, -50%)' }}
                >
                  <div className="w-2.5 h-5.5 bg-gradient-to-b from-cyan-300 via-sky-400 to-blue-600 rounded-full border border-white/40 shadow-[0_0_12px_rgba(56,189,248,0.95)] drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)] transform -rotate-[22deg]" />
                </motion.div>
              );
            })}

            {/* Éclaboussures et rides d'eau au pied de l'arbre */}
            {[...Array(4)].map((_, i) => {
              const delay = 0.8 + i * 0.45;
              return (
                <motion.div
                  key={`splash-${i}`}
                  initial={{ opacity: 0, scale: 0.1, left: '46%', top: '78%' }}
                  animate={{ 
                    opacity: [0, 0.6, 0],
                    scale: [0.1, 1.8, 2.5],
                  }}
                  transition={{ 
                    duration: 1.1, 
                    delay: delay, 
                    ease: 'easeOut'
                  }}
                  className="absolute w-20 h-5 rounded-full border border-sky-300/40 pointer-events-none select-none"
                  style={{ transform: 'translate(-50%, -50%)' }}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Effet d'illumination de l'arbre */}
      {glowing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0, 0.85, 0.6, 0.85, 0],
            scale: [0.9, 1.1, 0.95, 1.05, 1]
          }}
          transition={{ duration: 3.5, ease: 'easeInOut' }}
          className="absolute inset-0 z-10 rounded-3xl pointer-events-none mix-blend-screen"
          style={{ background: 'radial-gradient(circle at 50% 55%, rgba(52,211,153,0.45) 0%, rgba(16,185,129,0.2) 40%, transparent 75%)' }}
        />
      )}

      {/* Particules magiques étincelantes (✨) */}
      {isWatering && (
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => {
            const delay = 0.8 + (Math.random() * 1.8);
            const startX = 35 + (Math.random() * 30); // 35% à 65% (largeur de l'arbre)
            const startY = 60 + (Math.random() * 15); // 60% à 75% (pied de l'arbre)
            const targetX = startX + (Math.random() * 20 - 10);
            const targetY = 15 + (Math.random() * 20); // monte vers les branches (15% à 35%)
            const scale = 0.5 + (Math.random() * 0.7);
            const duration = 1.2 + (Math.random() * 0.8);
            const sparkleType = i % 3 === 0 ? "✨" : i % 3 === 1 ? "⭐" : "🌟";
            
            return (
              <motion.div
                key={`sparkle-${i}`}
                initial={{ opacity: 0, scale: 0.1, left: `${startX}%`, top: `${startY}%`, rotate: 0 }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  scale: [0.1, scale, scale * 1.2, 0.1],
                  left: [`${startX}%`, `${targetX}%`],
                  top: [`${startY}%`, `${targetY}%`],
                  rotate: [0, 180, 360],
                }}
                transition={{ 
                  duration: duration, 
                  delay: delay, 
                  ease: 'easeOut' 
                }}
                className="absolute text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)] font-bold text-sm sm:text-base pointer-events-none select-none"
              >
                {sparkleType}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Bouton arrosoir */}
      {wateringCans > 0 && !isWatering && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWatering}
          className="absolute bottom-10 right-3 z-30 bg-gradient-to-br from-teal-400 to-emerald-500 text-white rounded-2xl px-3 py-2 shadow-lg text-xs sm:text-sm font-black flex items-center gap-1.5 cursor-pointer border-2 border-teal-300 hover:shadow-xl transition-shadow"
        >
          <img src="/images/watering_can.png" alt="Arrosoir" className="w-5 h-5 object-contain filter drop-shadow-sm" />
          <span>Arroser ({wateringCans})</span>
        </motion.button>
      )}

      {/* Texte indicateur en bas de l'arbre */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/95 px-3 py-1 rounded-full shadow-md text-xs font-bold text-emerald-700 select-none">
        {stage === "sprout_1" && "🌱 Graine en Germination"}
        {stage === "sprout_2" && "🌱 Pousse Naissante"}
        {stage === "sprout_3" && "🌿 Jeune Pousse"}
        {stage === "sapling_1" && "☘️ Jeune Arbrisseau"}
        {stage === "sapling_2" && "🌲 Arbrisseau Vigoureux"}
        {stage === "young_1" && "🌳 Petit Arbre en Croissance"}
        {stage === "young_2" && "🌴 Grand Arbre en Croissance"}
        {stage === "young_3" && "🌳 Arbre Robuste"}
        {stage === "mature" && "🍏 Arbre Fruitier Mature"}
        {stage === "magic" && "✨ Arbre Magique Légendaire"}
      </div>
    </div>
  );
};
