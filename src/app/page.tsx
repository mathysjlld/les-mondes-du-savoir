"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { playSound } from "@/lib/sound";
import { asset } from "@/lib/asset";
import { useApp } from "@/context/AppContext";
import { Sparkles, Gamepad2, Compass, Award } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { profile, listAccounts } = useApp();
  const [accountCount, setAccountCount] = useState(0);

  const hasProfile = !!profile;
  const nickname = profile?.nickname || "";

  useEffect(() => {
    setAccountCount(listAccounts().length);
  }, [listAccounts, profile]);

  const handleStart = () => {
    playSound("levelup");
    if (hasProfile) {
      router.push("/dashboard");
    } else if (accountCount > 0) {
      router.push("/login");
    } else {
      router.push("/onboarding");
    }
  };

  const ctaLabel = hasProfile
    ? `Continuer avec ${nickname} ➔`
    : accountCount > 0
    ? "Se connecter 🔑"
    : "Commencer l'aventure ! 🚀";

  return (
    <div className="flex-1 flex flex-col items-center justify-between min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-indigo-100 p-4 sm:p-6 relative overflow-hidden">
      
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
      <main className="w-full max-w-2xl text-center flex flex-col items-center gap-6 sm:gap-8 z-10">
        
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

          <h1 className="text-4xl min-[360px]:text-5xl sm:text-6xl font-black text-indigo-900 drop-shadow-md select-none tracking-tight">
            Les mondes du <span className="text-yellow-500">Savoir</span>
          </h1>
          <p className="text-base sm:text-xl font-bold text-slate-700 mt-3 max-w-md leading-relaxed px-4 text-balance">
            Le site d&apos;exploration où tu apprends en t&apos;amusant et fais grandir ton Arbre du Savoir&nbsp;!
          </p>
        </motion.div>

        {/* Illustration héro : l'Arbre du Savoir et les mascottes */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 90, delay: 0.15 }}
          className="w-full max-w-2xl px-2"
        >
          <motion.img
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            src={asset("/images/home_arbre.png")}
            alt="Les mascottes des Mondes du Savoir autour de l'Arbre du Savoir"
            className="w-full h-auto rounded-3xl border-4 border-white shadow-2xl select-none"
          />
        </motion.div>

        {/* Mascotte mignonne / Groupe d'illustrations 3D */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center gap-3 sm:gap-6 py-2 sm:py-4 select-none"
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
              <img src={asset(img.src)} alt={img.alt} className="w-full h-full object-contain" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bouton d'appel à l'action */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full max-w-sm px-4 sm:px-0"
        >
          <button
            onClick={handleStart}
            className="w-full py-4 px-6 min-[380px]:py-5 min-[380px]:px-8 rounded-3xl bg-yellow-400 hover:bg-yellow-500 text-yellow-950 text-xl min-[380px]:text-2xl font-black shadow-2xl transition-all cursor-pointer border-b-8 border-yellow-600 active:border-b-2 active:translate-y-[6px] btn-bubble flex items-center justify-center gap-3"
          >
            <span>{ctaLabel}</span>
          </button>
          {!hasProfile && accountCount > 0 && (
            <button
              onClick={() => { playSound("click"); router.push("/onboarding"); }}
              className="w-full mt-3 text-sm font-bold text-indigo-700 hover:underline cursor-pointer"
            >
              + Créer un nouveau compte
            </button>
          )}
        </motion.div>
      </main>

      {/* Grid de présentation des fonctionnalités */}
      <section className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-12 mb-6 z-10">
        
        <div className="bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border-2 border-white shadow-md flex items-start gap-3">
          <div className="p-2 bg-emerald-100 rounded-xl text-emerald-700">
            <Compass size={20} />
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold text-slate-800 text-sm">12 Univers à explorer</h4>
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

    </div>
  );
}
