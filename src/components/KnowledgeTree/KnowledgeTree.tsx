"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IllustrationRenderer } from "../UI/IllustrationRenderer";
import { asset } from "@/lib/asset";
import { playSound } from "@/lib/sound";

// Animaux de l'Arbre du Savoir : compagnons à débloquer. Chacun a sa position
// sur l'arbre, son animation d'inactivité, et — depuis le chantier « animaux
// vivants + utiles » — devient CLIQUABLE : au clic, il réagit (rebond + son) et
// affiche une bulle (anecdote / encouragement). Le point `bx/by` (en % du cadre
// carré) place la bulle juste au-dessus de l'animal.
type TreeAnimal = {
  id: string;
  img: string;
  x: number; y: number; w: number; h: number;
  bx: number; by: number;
  // "fly" = vole au-dessus de l'arbre (tournoie) ; "ground" = posé au sol.
  // Ainsi aucun animal ne flotte dans le vide, quelle que soit la taille de l'arbre.
  mode: "fly" | "ground";
  // anim = sprite vidéo transparent (WebM) généré par Seedance : les ailes battent.
  // Sinon, PNG figé avec une petite animation CSS.
  anim?: boolean;
  // animation d'inactivité (boucle) — pour les volants, c'est une trajectoire en boucle
  idle: Record<string, number[]>;
  dur: number;
  delay?: number;
  origin: string; // transformOrigin dans le repère de l'image
};

const TREE_ANIMALS: TreeAnimal[] = [
  // VOLANTS — tournoient dans le ciel au-dessus de l'arbre (jamais posés), dans les
  // coins hauts (dégagés du feuillage même sur le grand arbre) et sous la barre.
  { id: "tree-butterfly", img: "tree_butterfly.png", mode: "fly", anim: true, x: 9, y: 14, w: 8, h: 8, bx: 13, by: 14,
    idle: { x: [0, 7, 11, 7, 0, -7, -11, -7, 0], y: [0, -4, -9, -13, -16, -13, -9, -4, 0], rotate: [0, 10, 0, -10, 0, 10, 0, -10, 0] }, dur: 7, origin: "center" },
  { id: "tree-phoenix", img: "tree_phoenix.png", mode: "fly", anim: true, x: 75, y: 11, w: 12, h: 12, bx: 81, by: 11,
    idle: { x: [0, -8, 0, 8, 0], y: [0, -3, -6, -3, 0], rotate: [0, -5, 0, 5, 0], scale: [1, 1.06, 1, 1.06, 1] }, dur: 5.5, origin: "center" },
  // AU SOL — posés sur l'herbe (pieds à ~y=89), répartis de part et d'autre du pot,
  // hors de la zone du bouton « Arroser » (remonté). Chacun a une ombre portée.
  { id: "tree-squirrel", img: "tree_squirrel.png", mode: "ground", x: 7, y: 80, w: 9, h: 9, bx: 11, by: 80,
    idle: { y: [0, -1.2, 0], scaleX: [1, 0.96, 1] }, dur: 2.6, delay: 0.4, origin: "bottom center" },
  { id: "tree-dragon", img: "tree_dragon.png", mode: "ground", anim: true, x: 19, y: 76, w: 13, h: 13, bx: 25, by: 76,
    idle: { rotate: [0, 3, -3, 0], y: [0, -1, 0] }, dur: 5, origin: "bottom center" },
  { id: "tree-owl", img: "tree_owl.png", mode: "ground", anim: true, x: 61, y: 79, w: 10, h: 10, bx: 66, by: 79,
    idle: { scaleY: [1, 1.06, 1], rotate: [0, 1.5, -1.5, 0] }, dur: 4.5, delay: 0.6, origin: "bottom center" },
  { id: "tree-parrot", img: "tree_parrot.png", mode: "ground", anim: true, x: 77, y: 80, w: 9, h: 9, bx: 81, by: 80,
    idle: { rotate: [0, -3, 3, 0], y: [0, -0.8, 0] }, dur: 4, delay: 0.2, origin: "bottom center" },
];

// Anecdotes / encouragements joués au clic (un rôle « compagnon » : ça réagit,
// ça apprend quelque chose et ça motive — sans donner de monnaie, donc pas d'abus).
const ANIMAL_MESSAGES: Record<string, string[]> = {
  "tree-butterfly": [
    "Le savais-tu ? Les papillons goûtent avec leurs pattes ! 🦋",
    "Bats des ailes vers de nouveaux quiz ! ✨",
  ],
  "tree-owl": [
    "Hou hou ! Plus tu fais de quiz, plus tu deviens sage. 🦉",
    "Un sage révise un peu chaque jour… comme toi ! 📚",
  ],
  "tree-squirrel": [
    "Les écureuils cachent leurs noisettes ; toi, tu gardes tes leçons ! 🐿️",
    "Petit à petit, l'écureuil remplit son arbre. Continue ! 🌰",
  ],
  "tree-parrot": [
    "Coco adore quand tu trouves la bonne réponse ! 🦜",
    "Répète après moi : « j'adore apprendre ! » 🎶",
  ],
  "tree-dragon": [
    "Le dragon veille sur ton arbre légendaire ! 🐉",
    "Crache du feu sur les questions difficiles ! 🔥",
  ],
  "tree-phoenix": [
    "Le phénix renaît de ses cendres… comme toi après une erreur ! 🔥",
    "Chaque essai te rend plus fort. Envole-toi ! 🪶",
  ],
};

interface KnowledgeTreeProps {
  xp: number;
  level: number;
  treeGrowth: number;
  unlockedTreeAnimals?: string[];
  wateringCans?: number;
  onUseWateringCan?: () => boolean;
}

export const KnowledgeTree: React.FC<KnowledgeTreeProps> = ({
  xp,
  level,
  treeGrowth,
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
  const [showBarnabe, setShowBarnabe] = React.useState(false); // mascotte vidéo de Barnabé (clip ~4,8 s)
  // Bulle affichée quand on clique un animal de l'arbre (anecdote / encouragement).
  const [animalBubble, setAnimalBubble] = React.useState<{ id: string; msg: string; x: number; y: number } | null>(null);
  const animalBubbleTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleAnimalClick = (a: TreeAnimal) => {
    playSound("click");
    const msgs = ANIMAL_MESSAGES[a.id] || ["Coucou ! 🌳"];
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    if (animalBubbleTimer.current) clearTimeout(animalBubbleTimer.current);
    setAnimalBubble({ id: a.id, msg, x: a.bx, y: a.by });
    animalBubbleTimer.current = setTimeout(() => setAnimalBubble(null), 3500);
  };

  React.useEffect(() => () => { if (animalBubbleTimer.current) clearTimeout(animalBubbleTimer.current); }, []);

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
      setShowBarnabe(true);
      setTimeout(() => setIsWatering(false), 3000);
      setTimeout(() => setGlowing(false), 4000);
      setTimeout(() => setShowBarnabe(false), 4800); // durée du clip de Barnabé
    }
  };

  React.useEffect(() => {
    const imgSrc = asset(`/images/tree_${imgName}.png`);
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

      <svg
        viewBox="0 0 100 100"
        className="w-full h-full select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Décor réaliste (herbe + ciel, profondeur de champ) en fond, à la place
            de la colline cartoon. Les animaux au sol se posent sur l'herbe. */}
        <image
          href={asset("/images/tree_scene_bg.png")}
          x="0" y="0" width="100" height="100"
          preserveAspectRatio="xMidYMid slice"
          className="select-none pointer-events-none"
        />

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
              href={processedSrc || asset(`/images/tree_${imgName}.png`)}
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

        {/* Animaux de l'Arbre débloqués : compagnons VIVANTS (animation d'inactivité)
            et UTILES (cliquables : réagissent au clic/survol et lancent une bulle
            d'anecdote ou d'encouragement). Rendu piloté par TREE_ANIMALS. */}
        {/* Ombres portées au sol des animaux terrestres (statiques : elles ancrent
            l'animal sur l'herbe même quand il sautille). */}
        {TREE_ANIMALS.filter((a) => a.mode === "ground" && unlockedTreeAnimals.includes(a.id)).map((a) => (
          <ellipse
            key={a.id + "-shadow"}
            cx={a.x + a.w / 2}
            cy={a.y + a.h - 0.5}
            rx={a.w * 0.36}
            ry={1.3}
            fill="#1b3a1b"
            opacity={0.22}
          />
        ))}

      </svg>

      {/* Couche des animaux : sprites VIDÉO transparents (WebM générés par Seedance)
          → les ailes battent vraiment. Volants (papillon, phénix) = tournoient dans le
          ciel ; terrestres = posés sur l'herbe. `inset-4` aligne cette couche sur le
          repère du SVG (0–100). Les animaux du coin bas-gauche s'effacent quand
          Barnabé arrose pour ne pas le gêner. */}
      <div className="absolute inset-4 z-[15] pointer-events-none">
        {TREE_ANIMALS.filter((a) => unlockedTreeAnimals.includes(a.id)).map((a) => {
          const cx = a.x + a.w / 2;
          const cy = a.y + a.h / 2;
          const fly = a.mode === "fly";
          const fadeForBarnabe = a.mode === "ground" && cx < 45; // proche de Barnabé (bas-gauche)
          // Trajectoire de tournoiement pour les volants ; terrestres immobiles.
          const flyAnim = a.id === "tree-butterfly"
            ? { x: [0, 10, 14, 10, 0, -10, -14, -10, 0], y: [0, -6, -12, -18, -22, -18, -12, -6, 0] }
            : { x: [0, -9, 0, 9, 0], y: [0, -5, -9, -5, 0] };
          // Sprite vidéo cadré à 2× (l'animal occupe ~50% du carré source), centré sur (cx,cy).
          const side = 2 * Math.max(a.w, a.h);
          const boxStyle = a.anim
            ? { left: `${cx - side / 2}%`, top: `${cy - side / 2}%`, width: `${side}%`, height: `${side}%` }
            : { left: `${a.x}%`, top: `${a.y}%`, width: `${a.w}%`, height: `${a.h}%` };
          return (
            <motion.div
              key={a.id}
              onClick={() => handleAnimalClick(a)}
              className="absolute cursor-pointer pointer-events-auto"
              style={boxStyle}
              animate={{ ...(fly ? flyAnim : {}), opacity: fadeForBarnabe && showBarnabe ? 0 : 1 }}
              transition={{
                x: fly ? { duration: a.dur, repeat: Infinity, ease: "easeInOut" } : undefined,
                y: fly ? { duration: a.dur, repeat: Infinity, ease: "easeInOut" } : undefined,
                opacity: { duration: 0.4 },
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 1.3 }}
            >
              {a.anim ? (
                <video
                  src={asset(`/images/${a.img.replace(".png", ".webm")}`)}
                  poster={asset(`/images/${a.img}`)}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain pointer-events-none select-none drop-shadow-sm"
                />
              ) : (
                <motion.img
                  src={asset(`/images/${a.img}`)}
                  alt=""
                  animate={a.idle}
                  transition={{ duration: a.dur, repeat: Infinity, ease: "easeInOut", delay: a.delay || 0 }}
                  className="w-full h-full object-contain pointer-events-none select-none drop-shadow-sm"
                  style={{ transformOrigin: "bottom center" }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bulle de l'animal cliqué (anecdote / encouragement) — positionnée juste
          au-dessus de l'animal grâce à ses coordonnées bx/by (en % du cadre). */}
      <AnimatePresence>
        {animalBubble && (
          <motion.div
            key={animalBubble.id + animalBubble.msg}
            initial={{ opacity: 0, scale: 0.6, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="absolute z-40 pointer-events-none -translate-x-1/2 -translate-y-full"
            style={{ left: `${animalBubble.x}%`, top: `${animalBubble.y}%` }}
          >
            <div className="relative max-w-[150px] bg-white border-2 border-emerald-300 rounded-2xl px-3 py-1.5 shadow-lg text-[10px] sm:text-xs font-bold text-emerald-800 text-center leading-snug">
              {animalBubble.msg}
              <span className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-emerald-300 rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animation d'arrosage */}
      <AnimatePresence>
        {isWatering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
          >
            {/* L'arrosoir 2D volant a été retiré : c'est Barnabé qui arrose désormais.
                On conserve les gouttelettes et étincelles ci-dessous. */}

            {/* Flux de gouttelettes : l'eau sort du bec de l'arrosoir de Barnabé
                (en bas à gauche) et retombe en arc au pied de l'arbre. */}
            {[...Array(40)].map((_, i) => {
              const delay = 0.7 + (i * 0.05);
              // Bec de l'arrosoir de Barnabé (illustration en bas à gauche),
              // mesuré sur l'image : ~28% / 74% du conteneur carré.
              const startX = 28 + (Math.random() * 4 - 2);
              const startY = 73 + (Math.random() * 3 - 1.5);
              // Point de chute : pied de l'arbre, à droite de Barnabé.
              const targetX = 47 + (Math.random() * 14 - 7);
              const targetY = 81 + (Math.random() * 7 - 3);
              // Arc de versement (droite + descente accélérée).
              const midX = startX + (targetX - startX) * 0.55;
              const midY = startY + (targetY - startY) * 0.4;

              return (
                <motion.div
                  key={`drop-${i}`}
                  initial={{ opacity: 0, scale: 0.1, left: `${startX}%`, top: `${startY}%` }}
                  animate={{
                    opacity: [0, 0.95, 0.95, 0],
                    scale: [0.4, 1.2, 1.2, 0.4],
                    left: [`${startX}%`, `${midX}%`, `${targetX}%`],
                    top: [`${startY}%`, `${midY}%`, `${targetY}%`],
                  }}
                  transition={{
                    duration: 0.85,
                    delay: delay,
                    ease: 'easeIn'
                  }}
                  className="absolute pointer-events-none select-none"
                  style={{ transform: 'translate(-50%, -50%)' }}
                >
                  <div className="w-2.5 h-5.5 bg-gradient-to-b from-cyan-300 via-sky-400 to-blue-600 rounded-full border border-white/40 shadow-[0_0_12px_rgba(56,189,248,0.95)] drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)] transform rotate-[30deg]" />
                </motion.div>
              );
            })}

            {/* Éclaboussures et rides d'eau au pied de l'arbre */}
            {[...Array(4)].map((_, i) => {
              const delay = 0.8 + i * 0.45;
              return (
                <motion.div
                  key={`splash-${i}`}
                  initial={{ opacity: 0, scale: 0.1, left: '47%', top: '82%' }}
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

      {/* Mascotte Barnabé qui arrose (illustration 3D entière, animée en CSS).
          On utilise une image (et non plus le clip vidéo, qui était rogné au bord
          droit : le bras levé de Barnabé était coupé). Léger balancement = il arrose. */}
      <AnimatePresence>
        {showBarnabe && (
          <motion.div
            key="barnabe-arrose"
            initial={{ opacity: 0, x: -40, y: 12, scale: 0.82 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.82 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="absolute bottom-3 left-0.5 z-30 w-[34%] min-w-[96px] max-w-[128px] pointer-events-none select-none"
            style={{ transformOrigin: "30% 95%" }}
          >
            <motion.img
              src={asset("/images/barnabe_arrose.png")}
              alt=""
              className="w-full h-auto drop-shadow-[0_5px_6px_rgba(0,0,0,0.28)]"
              // Balancement doux : il penche l'arrosoir d'avant en arrière en arrosant.
              animate={{ rotate: [0, -3, 1.5, -2, 0], y: [0, -2, 0, -1.5, 0] }}
              transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
              style={{ transformOrigin: "32% 92%" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton arrosoir */}
      {wateringCans > 0 && !isWatering && !showBarnabe && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWatering}
          className="absolute bottom-24 right-3 z-30 bg-gradient-to-br from-teal-400 to-emerald-500 text-white rounded-2xl px-3 py-2 shadow-lg text-xs sm:text-sm font-black flex items-center gap-1.5 cursor-pointer border-2 border-teal-300 hover:shadow-xl transition-shadow"
        >
          <img src={asset("/images/watering_can.png")} alt="Arrosoir" className="w-5 h-5 object-contain filter drop-shadow-sm" />
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
