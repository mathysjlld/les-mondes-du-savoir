"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { UNIVERSES } from "@/data/lessons";
import { asset } from "@/lib/asset";
import { playSound } from "@/lib/sound";

export default function TempleWorld() {
  const router = useRouter();
  const { profile, isLoaded } = useApp();

  useEffect(() => {
    if (isLoaded && !profile) router.push("/");
  }, [isLoaded, profile, router]);

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
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-6 sm:py-8 flex flex-col gap-6">
        {/* En-tête */}
        <header className="flex items-center justify-between gap-2 bg-amber-900/90 text-amber-50 rounded-2xl px-4 py-3 shadow-lg border-b-4 border-amber-950">
          <button
            onClick={() => { playSound("click"); router.push("/dashboard"); }}
            className="shrink-0 px-3 py-2 rounded-xl bg-amber-950/60 hover:bg-amber-950 font-bold text-xs sm:text-sm cursor-pointer transition-colors"
          >
            ← Retour au monde
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
    </main>
  );
}
