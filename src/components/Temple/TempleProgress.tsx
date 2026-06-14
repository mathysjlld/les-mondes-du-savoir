"use client";

import React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { asset } from "@/lib/asset";

// 5 stades du Temple selon la croissance (0 à 100%)
function stageFor(growth: number): number {
  if (growth >= 85) return 5;
  if (growth >= 60) return 4;
  if (growth >= 35) return 3;
  if (growth >= 12) return 2;
  return 1;
}

const STAGE_LABEL: Record<number, string> = {
  1: "Fondations",
  2: "Petit temple",
  3: "Temple grandissant",
  4: "Grand temple",
  5: "Temple d'Or des Sages",
};

export function TempleProgress() {
  const { profile, useBrick } = useApp();
  if (!profile) return null;

  const growth = Math.min(100, Math.max(0, profile.templeGrowth || 0));
  const bricks = profile.templeBricks || 0;
  const stage = stageFor(growth);
  const isMax = growth >= 100;

  const handleUseBrick = () => {
    if (bricks > 0) useBrick();
  };

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* Le Temple qui grandit */}
      <div className="relative w-full max-w-md aspect-square flex items-end justify-center">
        {/* halo lumineux qui s'intensifie avec la croissance */}
        <div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle at 50% 60%, rgba(251,191,36,0.45), transparent 70%)", opacity: 0.3 + growth / 200 }}
        />
        <motion.img
          key={stage}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, y: [0, -4, 0] }}
          transition={{ scale: { type: "spring", stiffness: 90 }, opacity: { duration: 0.4 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
          src={asset(`/images/temple_stage_${stage}.png`)}
          alt={`Temple — ${STAGE_LABEL[stage]}`}
          className="relative z-10 w-[88%] h-[88%] object-contain drop-shadow-2xl select-none"
        />
      </div>

      {/* Étiquette du stade */}
      <div className="text-center">
        <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-amber-700/80">Stade {stage}/5</p>
        <h3 className="text-lg sm:text-xl font-black text-amber-900" style={{ fontFamily: "var(--font-title)" }}>{STAGE_LABEL[stage]}</h3>
      </div>

      {/* Barre de croissance */}
      <div className="w-full max-w-sm">
        <div className="flex justify-between text-[10px] sm:text-xs font-bold text-amber-800 mb-1">
          <span>Croissance du Temple</span>
          <span>{Math.round(growth)}%</span>
        </div>
        <div className="h-3 w-full rounded-full bg-amber-200/70 overflow-hidden border border-amber-300">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-500"
            initial={false}
            animate={{ width: `${growth}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Briques + bouton */}
      <div className="w-full max-w-sm flex items-center justify-between gap-3 bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-2.5 sm:p-3 shadow">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0">
            <img src={asset("/images/brick.png")} alt="Brique" className="w-full h-full object-contain drop-shadow-sm" />
          </div>
          <div className="leading-tight">
            <p className="font-black text-amber-900 text-sm sm:text-base">{bricks} brique{bricks > 1 ? "s" : ""}</p>
            <p className="text-[10px] sm:text-[11px] text-amber-700 font-semibold">Gagne-en avec 5 bonnes réponses d&apos;affilée au Temple</p>
          </div>
        </div>
        <button
          onClick={handleUseBrick}
          disabled={bricks <= 0 || isMax}
          className={`shrink-0 px-3 py-2 rounded-xl font-black text-xs sm:text-sm border-b-4 transition-all ${
            bricks > 0 && !isMax
              ? "bg-amber-500 hover:bg-amber-600 text-white border-amber-700 cursor-pointer"
              : "bg-stone-200 text-stone-400 border-stone-300 cursor-not-allowed"
          }`}
        >
          {isMax ? "Temple complet ✨" : "Poser une brique"}
        </button>
      </div>
    </div>
  );
}
