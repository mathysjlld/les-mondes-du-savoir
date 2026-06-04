"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { AvatarRenderer } from "@/components/Avatar/AvatarRenderer";
import { playSound } from "@/lib/sound";
import { ArrowLeft, Coins, Sparkles, ShoppingBag } from "lucide-react";

// Tarifs rééquilibrés en fonction de la rareté
const ACCESSORIES_ITEMS = [
  { id: "glasses", name: "Super Lunettes", emoji: "👓", price: 10, desc: "Pour avoir l'air d'un petit génie !", rarity: "Commun" },
  { id: "headphones", name: "Casque Funky", emoji: "🎧", price: 25, desc: "Pour écouter des rythmes entraînants !", rarity: "Rare" },
  { id: "magic-hat", name: "Chapeau de Magicien", emoji: "🎩", price: 50, desc: "Pour faire apparaître des étoiles !", rarity: "Épique" },
  { id: "crown", name: "Couronne Royale", emoji: "👑", price: 100, desc: "Pour gouverner le royaume du savoir !", rarity: "Légendaire" },
  { id: "super-cape", name: "Cape Héroïque", emoji: "🦸‍♂️", price: 180, desc: "Pour s'envoler vers la réussite !", rarity: "Mythique" },
] as const;

// Les compagnons achetables avec les diamants
const PETS_ITEMS = [
  { id: "fox", name: "Renardeau Rusé", emoji: "🦊", price: 3, desc: "Un petit renard très joueur pour t'accompagner !", rarity: "Épique" },
  { id: "cat", name: "Chaton Mignon", emoji: "🐱", price: 5, desc: "Un petit chat tout doux qui ronronne !", rarity: "Légendaire" },
  { id: "koala", name: "Koala Câlin", emoji: "🐨", price: 5, desc: "Un petit koala accroché à sa branche !", rarity: "Légendaire" },
  { id: "dragon", name: "Dragonneau Vert", emoji: "🐲", price: 10, desc: "Un bébé dragon qui crache des paillettes !", rarity: "Mythique" },
] as const;

export default function Market() {
  const router = useRouter();
  const {
    profile,
    buyAccessory,
    buyPet,
    equipAccessory,
    equipPet,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"accessories" | "pets">("accessories");
  const [successAnimItem, setSuccessAnimItem] = useState<string | null>(null);

  // Synthétiseur Web Audio pour la musique cozy du Marché
  useEffect(() => {
    if (typeof window === "undefined" || !profile?.soundEnabled) return;

    let active = true;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    // Mélodie médiévale / féérique douce (Notes de C major / A minor arpeggiated)
    const melody = [
      523.25, 587.33, 659.25, 783.99, // C5, D5, E5, G5
      880.00, 783.99, 659.25, 587.33, // A5, G5, E5, D5
      440.00, 523.25, 587.33, 659.25, // A4, C5, D5, E5
      783.99, 659.25, 523.25, 392.00  // G5, E5, C5, G4
    ];

    let index = 0;
    const playNextNote = () => {
      if (!active) return;
      if (ctx.state === "suspended") ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(melody[index], now);

      // Enveloppe douce
      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.6);

      index = (index + 1) % melody.length;
      setTimeout(playNextNote, 380); // Tempo régulier
    };

    // Lancer la boucle musicale après 500ms
    const startTimeout = setTimeout(playNextNote, 500);

    return () => {
      active = false;
      clearTimeout(startTimeout);
      ctx.close();
    };
  }, [profile?.soundEnabled]);

  if (!profile) return null;

  const handlePurchaseAccessory = (item: typeof ACCESSORIES_ITEMS[number]) => {
    const success = buyAccessory(item.id, item.price);
    if (success) {
      playSound("levelup");
      setSuccessAnimItem(item.id);
      setTimeout(() => setSuccessAnimItem(null), 1500);
    } else {
      playSound("incorrect");
    }
  };

  const handlePurchasePet = (item: typeof PETS_ITEMS[number]) => {
    const success = buyPet(item.id, item.price);
    if (success) {
      playSound("levelup");
      setSuccessAnimItem(item.id);
      setTimeout(() => setSuccessAnimItem(null), 1500);
    } else {
      playSound("incorrect");
    }
  };

  const rarityColors: Record<string, string> = {
    Commun: "text-slate-500 bg-slate-100 border-slate-200",
    Rare: "text-blue-600 bg-blue-50 border-blue-200",
    Épique: "text-purple-600 bg-purple-50 border-purple-200",
    Légendaire: "text-amber-600 bg-amber-50 border-amber-200 animate-pulse",
    Mythique: "text-rose-600 bg-rose-50 border-rose-200 font-extrabold animate-bounce",
  };

  return (
    <div className="flex-1 flex flex-col p-3 sm:p-6 max-w-4xl mx-auto w-full gap-4 sm:gap-6 min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100">
      
      {/* Barre supérieure */}
      <header className="w-full flex items-center justify-between glass-card p-3 sm:p-4 bg-white/95 border-b-4 border-amber-300 shadow-md">
        <button
          onClick={() => {
            playSound("click");
            router.push("/dashboard");
          }}
          className="py-2 px-3 sm:py-2.5 sm:px-4 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs sm:text-sm flex items-center gap-1 cursor-pointer transition-all border-b-4 border-amber-300"
        >
          <ArrowLeft size={16} />
          <span>Tableau de bord</span>
        </button>

        <h2 className="font-black text-base sm:text-2xl text-amber-950 flex items-center gap-1.5 select-none">
          <span>Marché de l'Aventurier 🛒</span>
        </h2>

        {/* Portefeuille (Pièces & Diamants) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-amber-100/80 border-2 border-amber-200 px-3 py-1 rounded-full text-xs font-black text-amber-800 shadow-inner">
            <span>🪙 {profile.coins}</span>
          </div>
          <div className="flex items-center gap-1 bg-cyan-50 border-2 border-cyan-200 px-3 py-1 rounded-full text-xs font-black text-cyan-800 shadow-inner">
            <span>💎 {profile.diamonds}</span>
          </div>
        </div>
      </header>

      {/* Grid principale : Cabine d'essayage à gauche, Échoppes à droite */}
      <main className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-start">
        
        {/* Cabine d'essayage (Gauche) */}
        <section className="md:col-span-4 flex flex-col gap-4">
          <div className="glass-card p-4 sm:p-6 bg-white/95 text-center flex flex-col items-center gap-4 border-b-4 border-indigo-300">
            <span className="text-xs font-black text-indigo-700 uppercase tracking-widest bg-indigo-50 border border-indigo-100 px-3 py-0.5 rounded-full">
              Cabine d'essayage 👕
            </span>

            {/* Zone de preview avec l'avatar et son compagnon */}
            <div className="w-full aspect-square rounded-3xl bg-gradient-to-b from-sky-200 via-sky-100 to-indigo-100 border-4 border-sky-300 flex items-center justify-center relative overflow-hidden shadow-inner max-w-[240px] mx-auto">
              <div className="absolute top-2 left-2 w-8 h-4 bg-white opacity-60 rounded-full blur-[0.5px]" />
              
              {/* Le compagnon équipé à gauche de l'avatar */}
              {profile.activePet && profile.activePet !== "none" && (
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-6 left-4 text-4xl sm:text-5xl select-none z-10 filter drop-shadow-md"
                >
                  {profile.activePet === "fox" && "🦊"}
                  {profile.activePet === "cat" && "🐱"}
                  {profile.activePet === "koala" && "🐨"}
                  {profile.activePet === "dragon" && "🐲"}
                </motion.div>
              )}

              {/* L'avatar principal */}
              <div className="z-0">
                <AvatarRenderer config={profile.avatar} size={110} interactive={true} />
              </div>

              {/* Sol en herbe */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-emerald-400 border-t-2 border-emerald-500" />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <h3 className="font-extrabold text-slate-800 text-lg capitalize">{profile.nickname}</h3>
              <p className="text-xs font-bold text-slate-500 leading-snug">
                Tu es superbe ! Clique sur tes objets débloqués pour les équiper.
              </p>
            </div>

            {/* Boutons de déséquipement rapide */}
            <div className="grid grid-cols-2 gap-2 w-full mt-2">
              <button
                onClick={() => {
                  equipAccessory("none");
                  playSound("click");
                }}
                disabled={profile.avatar.accessory === "none"}
                className="py-2 px-3 text-[10px] sm:text-xs font-black rounded-xl border-2 border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                Retirer Chapeau
              </button>
              <button
                onClick={() => {
                  equipPet("none");
                  playSound("click");
                }}
                disabled={profile.activePet === "none"}
                className="py-2 px-3 text-[10px] sm:text-xs font-black rounded-xl border-2 border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                Retirer Compagnon
              </button>
            </div>
          </div>
        </section>

        {/* Échoppes du marché (Droite) */}
        <section className="md:col-span-8 flex flex-col gap-4">
          <div className="glass-card p-4 sm:p-6 bg-white/95 border-b-4 border-amber-300">
            
            {/* Onglets échoppes */}
            <div className="flex border-b-2 border-slate-100 pb-3 mb-4 gap-2">
              <button
                onClick={() => {
                  playSound("click");
                  setActiveTab("accessories");
                }}
                className={`py-2 px-4 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "accessories"
                    ? "bg-amber-400 text-amber-950 shadow-md scale-105 border-b-4 border-amber-600"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                <ShoppingBag size={14} />
                <span>Accessoires (Or 🪙)</span>
              </button>

              <button
                onClick={() => {
                  playSound("click");
                  setActiveTab("pets");
                }}
                className={`py-2 px-4 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "pets"
                    ? "bg-cyan-500 text-white shadow-md scale-105 border-b-4 border-cyan-700"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                <Sparkles size={14} />
                <span>Compagnons (Diamants 💎)</span>
              </button>
            </div>

            {/* Contenu de l'échoppe active */}
            <div className="flex flex-col gap-3">
              <AnimatePresence mode="wait">
                
                {/* 1. ÉCHOPPE ACCESSOIRES (PIÈCES D'OR) */}
                {activeTab === "accessories" && (
                  <motion.div
                    key="accessories"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col gap-2.5"
                  >
                    {ACCESSORIES_ITEMS.map((item) => {
                      const isUnlocked = profile.unlockedAccessories.includes(item.id);
                      const isEquipped = profile.avatar.accessory === item.id;
                      const canBuy = profile.coins >= item.price;
                      const isWinning = successAnimItem === item.id;

                      return (
                        <div
                          key={item.id}
                          className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border-2 transition-all relative ${
                            isEquipped
                              ? "border-emerald-400 bg-emerald-50/50"
                              : isUnlocked
                              ? "border-indigo-100 bg-indigo-50/20"
                              : "border-amber-200/50 bg-amber-50/10"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-3xl p-1.5 bg-white rounded-xl shadow-md border border-slate-100">
                              {item.emoji}
                            </span>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1.5">
                                <span className="font-extrabold text-sm sm:text-base text-slate-800">{item.name}</span>
                                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full border ${rarityColors[item.rarity]}`}>
                                  {item.rarity}
                                </span>
                              </div>
                              <span className="text-[10px] sm:text-xs text-slate-500 leading-tight">{item.desc}</span>
                            </div>
                          </div>

                          {/* Bouton d'achat / d'équipement */}
                          {isEquipped ? (
                            <span className="text-[10px] sm:text-xs font-black text-emerald-600 px-3 py-1 bg-emerald-100 rounded-full border border-emerald-200">
                              Porté !
                            </span>
                          ) : isUnlocked ? (
                            <button
                              onClick={() => {
                                equipAccessory(item.id);
                                playSound("click");
                              }}
                              className="px-3 py-1.5 text-xs font-black bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl shadow cursor-pointer transition-colors border-b-2 border-indigo-700"
                            >
                              Porter
                            </button>
                          ) : (
                            <button
                              onClick={() => handlePurchaseAccessory(item)}
                              disabled={!canBuy}
                              className={`px-3 py-1.5 rounded-xl text-xs font-black shadow transition-all flex items-center gap-1 cursor-pointer ${
                                canBuy
                                  ? "bg-amber-400 hover:bg-amber-500 text-amber-950 border-b-2 border-amber-600"
                                  : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                              }`}
                            >
                              <span>Acheter {item.price}</span>
                              <Coins size={12} className="text-amber-700" />
                            </button>
                          )}

                          {/* Animation d'achat réussi */}
                          {isWinning && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1.2 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-emerald-400/90 rounded-2xl flex items-center justify-center text-white font-black text-sm gap-1.5 z-10"
                            >
                              <span>✨ Achat Réussi ! ✨</span>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </motion.div>
                )}

                {/* 2. ÉCHOPPE COMPAGNONS (DIAMANTS) */}
                {activeTab === "pets" && (
                  <motion.div
                    key="pets"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col gap-2.5"
                  >
                    {PETS_ITEMS.map((item) => {
                      const isUnlocked = profile.unlockedPets?.includes(item.id);
                      const isEquipped = profile.activePet === item.id;
                      const canBuy = profile.diamonds >= item.price;
                      const isWinning = successAnimItem === item.id;

                      return (
                        <div
                          key={item.id}
                          className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border-2 transition-all relative ${
                            isEquipped
                              ? "border-emerald-400 bg-emerald-50/50"
                              : isUnlocked
                              ? "border-cyan-100 bg-cyan-50/20"
                              : "border-cyan-200/50 bg-cyan-50/5"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-3xl p-1.5 bg-white rounded-xl shadow-md border border-slate-100">
                              {item.emoji}
                            </span>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1.5">
                                <span className="font-extrabold text-sm sm:text-base text-slate-800">{item.name}</span>
                                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full border ${rarityColors[item.rarity]}`}>
                                  {item.rarity}
                                </span>
                              </div>
                              <span className="text-[10px] sm:text-xs text-slate-500 leading-tight">{item.desc}</span>
                            </div>
                          </div>

                          {/* Bouton d'action */}
                          {isEquipped ? (
                            <span className="text-[10px] sm:text-xs font-black text-emerald-600 px-3 py-1 bg-emerald-100 rounded-full border border-emerald-200">
                              Équipé !
                            </span>
                          ) : isUnlocked ? (
                            <button
                              onClick={() => {
                                equipPet(item.id);
                                playSound("click");
                              }}
                              className="px-3 py-1.5 text-xs font-black bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl shadow cursor-pointer transition-colors border-b-2 border-cyan-700"
                            >
                              Suivre
                            </button>
                          ) : (
                            <button
                              onClick={() => handlePurchasePet(item)}
                              disabled={!canBuy}
                              className={`px-3 py-1.5 rounded-xl text-xs font-black shadow transition-all flex items-center gap-1 cursor-pointer ${
                                canBuy
                                  ? "bg-cyan-500 hover:bg-cyan-600 text-white border-b-2 border-cyan-700"
                                  : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                              }`}
                            >
                              <span>Acheter {item.price}</span>
                              <span>💎</span>
                            </button>
                          )}

                          {/* Animation d'achat réussi */}
                          {isWinning && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1.2 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-emerald-400/90 rounded-2xl flex items-center justify-center text-white font-black text-sm gap-1.5 z-10"
                            >
                              <span>✨ Compagnon Débloqué ! ✨</span>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
