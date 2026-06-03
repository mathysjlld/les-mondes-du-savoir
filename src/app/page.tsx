"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { playSound } from "@/lib/sound";
import { Sparkles, Gamepad2, Compass, Award } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [hasProfile, setHasProfile] = useState(false);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("explorakids_profile");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.nickname) {
            setHasProfile(true);
            setNickname(parsed.nickname);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleStart = () => {
    playSound("levelup");
    if (hasProfile) {
      router.push("/dashboard");
    } else {
      router.push("/onboarding");
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-indigo-100 p-6 relative overflow-hidden">
      
      {/* Nuages flottants d'arrière-plan */}
      <motion.div
        animate={{ x: [-20, 20, -20] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-[10%] w-24 h-12 bg-white rounded-full opacity-60 blur-[1px]"
      />
      <motion.div
        animate={{ x: [20, -20, 20] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-[15%] w-32 h-16 bg-white rounded-full opacity-50 blur-[1px]"
      />
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-[5%] w-40 h-20 bg-white rounded-full opacity-40 blur-[2px]"
      />

      <div /> {/* Spacer */}

      {/* Main hero panel */}
      <main className="w-full max-w-2xl text-center flex flex-col items-center gap-8 z-10">
        
        {/* Titre animé avec effet rebondissant */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full border border-sky-300 shadow-sm mb-4">
            <Sparkles size={16} className="text-yellow-500 animate-spin" />
            <span className="text-xs font-black text-sky-800 uppercase tracking-widest">Aventure Éducative</span>
          </div>

          <h1 className="text-4xl min-[360px]:text-5xl sm:text-7xl font-black text-indigo-900 drop-shadow-md select-none tracking-tight">
            Explora<span className="text-yellow-500">Kids</span>
          </h1>
          <p className="text-base sm:text-xl font-bold text-slate-700 mt-3 max-w-md leading-relaxed px-4">
            Le site d'exploration où tu apprends en t'amusant et fais grandir ton Arbre du Savoir !
          </p>
        </motion.div>

        {/* Mascotte mignonne / Groupe d'illustrations 3D */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center gap-4 sm:gap-6 py-4 select-none"
        >
          {[
            { src: "/images/animals.png", alt: "Animaux" },
            { src: "/images/space.png", alt: "Espace" },
            { src: "/images/tree_mature.png", alt: "Arbre" },
            { src: "/images/body.png", alt: "Corps Humain" },
            { src: "/images/maths.png", alt: "Maths" }
          ].map((img, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.25, rotate: idx % 2 === 0 ? 12 : -12 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-10 h-10 min-[380px]:w-14 min-[380px]:h-14 sm:w-20 sm:h-20 bg-white/90 rounded-2xl p-1.5 sm:p-2 shadow-lg border border-white flex items-center justify-center cursor-pointer"
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-contain" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bouton d'appel à l'action */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full max-w-sm"
        >
          <button
            onClick={handleStart}
            className="w-full py-5 px-8 rounded-3xl bg-yellow-400 hover:bg-yellow-500 text-yellow-950 text-2xl font-black shadow-2xl transition-all cursor-pointer border-b-8 border-yellow-600 active:border-b-2 active:translate-y-[6px] btn-bubble flex items-center justify-center gap-3"
          >
            <span>{hasProfile ? `Continuer avec ${nickname} ➔` : "Commencer l'aventure ! 🚀"}</span>
          </button>
        </motion.div>
      </main>

      {/* Grid de présentation des fonctionnalités */}
      <section className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 mb-6 z-10">
        
        <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border-2 border-white shadow-md flex items-start gap-3">
          <div className="p-2 bg-emerald-100 rounded-xl text-emerald-700">
            <Compass size={20} />
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold text-slate-800 text-sm">8 Univers à explorer</h4>
            <p className="text-slate-600 text-xs mt-1 leading-relaxed">
              Des animaux sauvages à l'espace, en passant par le corps humain et les mathématiques.
            </p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border-2 border-white shadow-md flex items-start gap-3">
          <div className="p-2 bg-sky-100 rounded-xl text-sky-700">
            <Gamepad2 size={20} />
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold text-slate-800 text-sm">Jeux et Quiz animés</h4>
            <p className="text-slate-600 text-xs mt-1 leading-relaxed">
              Des défis interactifs avec sons, voix-off et animations adaptés selon ton âge.
            </p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border-2 border-white shadow-md flex items-start gap-3">
          <div className="p-2 bg-amber-100 rounded-xl text-amber-700">
            <Award size={20} />
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold text-slate-800 text-sm">Progression et Récompenses</h4>
            <p className="text-slate-600 text-xs mt-1 leading-relaxed">
              Gagne de l'XP pour faire grandir ton arbre et collecte des pièces pour habiller ton avatar !
            </p>
          </div>
        </div>

      </section>

      {/* Footer */}
      <footer className="text-slate-500 font-bold text-xs select-none py-4">
        © 2026 ExploraKids — Développé pour éveiller la curiosité des enfants
      </footer>

    </div>
  );
}
