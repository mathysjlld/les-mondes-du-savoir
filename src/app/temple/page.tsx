"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { UNIVERSES } from "@/data/lessons";
import { playSound } from "@/lib/sound";
import { TempleProgress } from "@/components/Temple/TempleProgress";

export default function TempleWorld() {
  const router = useRouter();
  const { profile, isLoaded } = useApp();
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (isLoaded && !profile) router.push("/jouer");
  }, [isLoaded, profile, router]);

  useEffect(() => {
    playSound("levelup");
    const t = setTimeout(() => setShowIntro(false), 1900);
    return () => clearTimeout(t);
  }, []);

  if (!profile) return null;

  const temple = UNIVERSES["temple"];
  const lessons = temple.lessons[profile.ageGroup] || temple.lessons["facile"] || [];

  return (
    <main className="min-h-screen w-full relative overflow-hidden bg-gradient-to-b from-amber-200 via-yellow-100 to-orange-200 text-stone-800">
      {/* Soleil + colonnes dorées décoratives */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-yellow-300/50 blur-3xl" />
        <div className="absolute top-0 left-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-amber-700/30 to-transparent" />
        <div className="absolute top-0 right-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-amber-700/30 to-transparent" />
        {[12, 30, 70, 88].map((l, i) => (
          <div key={i} className="absolute top-0 bottom-0 w-6 bg-gradient-to-b from-amber-300/25 to-amber-600/10 border-x border-amber-500/20" style={{ left: `${l}%` }} />
        ))}
        {/* Particules dorées flottantes */}
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.span
            key={`p-${i}`}
            className="absolute text-amber-400/70 select-none"
            style={{ left: `${(i * 37) % 100}%`, bottom: "-5%", fontSize: `${10 + (i % 4) * 5}px` }}
            animate={{ y: ["0vh", "-105vh"], opacity: [0, 0.9, 0.9, 0], rotate: [0, 180] }}
            transition={{ duration: 9 + (i % 5) * 2, delay: (i % 8) * 1.1, repeat: Infinity, ease: "linear" }}
          >
            ✦
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-6 sm:py-8 flex flex-col gap-6">
        {/* Fronton de temple grec */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center -mb-2 select-none pointer-events-none"
        >
          <svg viewBox="0 0 240 70" className="w-44 sm:w-60 h-auto drop-shadow">
            <polygon points="120,4 230,40 10,40" fill="#fcd34d" stroke="#b45309" strokeWidth="3" />
            <polygon points="120,12 205,38 35,38" fill="#fef3c7" />
            <rect x="14" y="40" width="212" height="8" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
            {[28, 66, 104, 142, 180, 212].map((x, i) => (
              <rect key={i} x={x} y="48" width="14" height="20" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
            ))}
          </svg>
        </motion.div>

        {/* En-tête */}
        <header className="flex items-center justify-between gap-2 bg-amber-900/90 text-amber-50 rounded-2xl px-4 py-3 shadow-lg border-b-4 border-amber-950">
          <button
            onClick={() => { playSound("click"); router.push("/dashboard"); }}
            className="shrink-0 px-3 py-2 rounded-xl bg-amber-950/60 hover:bg-amber-950 font-bold text-xs sm:text-sm cursor-pointer transition-colors"
          >
            🌳 <span className="hidden min-[420px]:inline">Revenir à l&apos;arbre du savoir</span><span className="min-[420px]:hidden">Arbre</span>
          </button>
          <h1 className="flex-1 min-w-0 truncate text-center font-black text-base sm:text-2xl tracking-wide" style={{ fontFamily: "var(--font-title)" }}>
            🏛️ Le Temple des Sages
          </h1>
          <div className="shrink-0 flex items-center gap-1 bg-fuchsia-100 text-fuchsia-800 px-3 py-1.5 rounded-full font-black text-xs sm:text-sm border border-fuchsia-300">
            💠 {profile.crystals || 0}
          </div>
        </header>

        {/* Accueil du gardien */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 flex items-center gap-3 shadow"
        >
          <span className="text-4xl sm:text-5xl select-none">🦉</span>
          <p className="text-sm sm:text-base font-semibold text-amber-900 leading-relaxed">
            Bienvenue, jeune sage. Ici, on cultive la <strong>sagesse</strong> : grands penseurs, énigmes, proverbes et mystères du monde.
            Maîtrise les épreuves pour gagner des <strong>cristaux 💠</strong> et visite le <strong>Sanctuaire</strong>.
          </p>
        </motion.div>

        {/* Progression du Temple — grandit avec les quiz et les briques */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50/80 border-2 border-amber-300 rounded-3xl p-4 sm:p-6 shadow"
        >
          <TempleProgress />
        </motion.div>

        {/* Bouton Sanctuaire (marché du Temple) */}
        <button
          onClick={() => { playSound("click"); router.push("/temple/market"); }}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-black text-base sm:text-lg shadow-lg border-b-4 border-amber-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          🏛️ Entrer au Sanctuaire des Sages 💠
        </button>

        {/* Épreuves de sagesse */}
        <section>
          <h2 className="font-black text-amber-900 text-lg sm:text-xl mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-title)" }}>
            📜 Les épreuves de sagesse
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {lessons.map((lesson) => {
              const done = profile.completedQuizzes.includes(lesson.id);
              return (
                <button
                  key={lesson.id}
                  onClick={() => { playSound("click"); router.push("/play/temple"); }}
                  className="text-left p-4 rounded-2xl bg-amber-50/95 hover:bg-white border-2 border-amber-300 hover:border-amber-500 shadow transition-all flex items-center gap-3 cursor-pointer group"
                >
                  <span className="text-3xl sm:text-4xl select-none group-hover:scale-110 transition-transform">{lesson.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-amber-900 text-sm sm:text-base leading-tight">{lesson.title}</h3>
                    <span className="text-[11px] font-bold text-amber-700">Badge : {lesson.badgeName} {lesson.badgeEmoji}</span>
                  </div>
                  {done ? (
                    <span className="shrink-0 text-emerald-600 font-black text-xs">✓ Réussi</span>
                  ) : (
                    <span className="shrink-0 text-amber-600 font-black text-lg">▶</span>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* Animation d'entrée dans le monde */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-gradient-to-b from-amber-800 via-amber-600 to-orange-700 text-amber-50 select-none overflow-hidden"
          >
            <motion.div
              className="absolute w-[120vmax] h-[120vmax] rounded-full bg-yellow-300/30 blur-3xl"
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1.4, opacity: [0, 0.8, 0.4] }}
              transition={{ duration: 1.6, ease: "easeOut" }}
            />
            <motion.span
              initial={{ scale: 0.4, rotate: -10, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, delay: 0.1 }}
              className="text-7xl sm:text-8xl drop-shadow-lg z-10"
            >
              🏛️
            </motion.span>
            <motion.h2
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-4 text-2xl sm:text-4xl font-black tracking-wide z-10 text-center px-4"
              style={{ fontFamily: "var(--font-title)" }}
            >
              Le Temple des Sages
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-1 text-sm sm:text-base font-bold text-amber-100 z-10"
            >
              Tu pénètres dans le monde de la sagesse…
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
