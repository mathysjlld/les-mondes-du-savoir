"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useApp, AvatarConfig } from "@/context/AppContext";
import { AvatarRenderer } from "@/components/Avatar/AvatarRenderer";
import { playSound } from "@/lib/sound";

const AVATAR_TYPES: { type: AvatarConfig["type"]; emoji: string; label: string }[] = [
  { type: "fox", emoji: "🦊", label: "Renard" },
  { type: "panda", emoji: "🐼", label: "Panda" },
  { type: "owl", emoji: "🦉", label: "Hibou" },
  { type: "koala", emoji: "🐨", label: "Koala" },
];

const COLORS = [
  { name: "orange", hex: "#FF7F27", label: "Orange" },
  { name: "blue", hex: "#3F88C5", label: "Bleu" },
  { name: "pink", hex: "#FF70A6", label: "Rose" },
  { name: "green", hex: "#70D6FF", label: "Vert" },
  { name: "purple", hex: "#9B5DE5", label: "Violet" },
  { name: "yellow", hex: "#FFD166", label: "Jaune" },
];

export default function Onboarding() {
  const router = useRouter();
  const { onboardUser, profile } = useApp();

  const [nickname, setNickname] = useState("");
  const [ageGroup, setAgeGroup] = useState<"3-5" | "6-8" | "9-12">("6-8");
  const [avatarType, setAvatarType] = useState<AvatarConfig["type"]>("fox");
  const [avatarColor, setAvatarColor] = useState("orange");

  const [step, setStep] = useState(1);
  const [parentCode, setParentCode] = useState("");
  const [parentCodeError, setParentCodeError] = useState(false);

  const handleNextStep = () => {
    playSound("click");
    if (step === 1 && !nickname.trim()) {
      alert("Écris ton prénom pour commencer l'aventure ! 😊");
      return;
    }
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    playSound("click");
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleFinish = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (parentCode.trim().length < 4) {
      playSound("incorrect");
      setParentCodeError(true);
      return;
    }

    onboardUser(nickname.trim(), ageGroup, {
      type: avatarType,
      color: avatarColor,
      accessory: "none",
    }, parentCode.trim());
    
    // Jouer un son joyeux
    playSound("levelup");
    
    // Rediriger vers le tableau de bord
    router.push("/dashboard");
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-sky-200 to-indigo-100">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-3xl p-8 border-4 border-white shadow-2xl relative overflow-hidden">
        {/* Cercles décoratifs */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-yellow-200/50 rounded-full blur-xl" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-pink-200/50 rounded-full blur-xl" />

        {/* Bouton retour */}
        {step > 1 && (
          <button
            onClick={handlePrevStep}
            className="absolute top-6 left-6 text-slate-500 hover:text-slate-800 text-sm font-bold flex items-center gap-1 transition-all"
          >
            ← Retour
          </button>
        )}

        <div className="text-center mb-8">
          <span className="text-4xl">🚀</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-indigo-900 mt-2">
            Crée ton Aventurier
          </h1>
          <p className="text-slate-600 font-medium mt-1">
            Étape {step} sur 4
          </p>
        </div>

        {/* Étape 1 : Prénom et Niveau */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <label className="text-lg font-bold text-slate-700">
                Comment t'appelles-tu ?
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Entre ton prénom ici..."
                className="w-full px-6 py-4 rounded-2xl border-4 border-sky-100 focus:border-sky-400 bg-white text-lg font-bold text-slate-700 outline-none transition-all shadow-inner placeholder:text-slate-400"
                maxLength={15}
                required
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-lg font-bold text-slate-700">
                Choisis ton niveau de difficulté :
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: "3-5", label: "👶 Facile (3-5 ans)", desc: "Leçons en sons & images" },
                  { id: "6-8", label: "👦 Moyen (6-8 ans)", desc: "Jeux & devinettes simples" },
                  { id: "9-12", label: "🧑 Difficile (9-12 ans)", desc: "Défis & cours complets" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      playSound("click");
                      setAgeGroup(item.id as any);
                    }}
                    className={`p-4 rounded-2xl border-4 text-left transition-all cursor-pointer flex flex-col justify-between ${
                      ageGroup === item.id
                        ? "border-sky-500 bg-sky-50 shadow-md text-sky-900"
                        : "border-slate-100 hover:border-slate-300 bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span className="font-bold text-base">{item.label}</span>
                    <span className="text-xs mt-2 opacity-80">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleNextStep}
              className="w-full mt-6 py-4 rounded-2xl bg-yellow-400 hover:bg-yellow-500 text-yellow-950 text-xl font-bold transition-all shadow-lg hover:shadow-xl btn-bubble border-b-4 border-yellow-600"
            >
              Continuer ! ➔
            </button>
          </motion.div>
        )}

        {/* Étape 2 : Choix du Compagnon */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6"
          >
            <label className="text-lg font-bold text-slate-700 text-center">
              Choisis ton compagnon de voyage !
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {AVATAR_TYPES.map((item) => (
                <button
                  key={item.type}
                  onClick={() => {
                    playSound("click");
                    setAvatarType(item.type);
                  }}
                  className={`p-4 rounded-2xl border-4 transition-all flex flex-col items-center gap-2 cursor-pointer ${
                    avatarType === item.type
                      ? "border-indigo-500 bg-indigo-50/50 shadow-md"
                      : "border-slate-100 hover:border-slate-300 bg-slate-50"
                  }`}
                >
                  <div className="w-20 h-20 flex items-center justify-center">
                    <AvatarRenderer
                      config={{ type: item.type, color: avatarColor, accessory: "none" }}
                      size={70}
                      interactive={false}
                    />
                  </div>
                  <span className="font-bold text-slate-700">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handlePrevStep}
                className="w-1/3 py-4 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold transition-all"
              >
                Retour
              </button>
              <button
                onClick={handleNextStep}
                className="w-2/3 py-4 rounded-2xl bg-yellow-400 hover:bg-yellow-500 text-yellow-950 text-xl font-bold transition-all shadow-lg btn-bubble border-b-4 border-yellow-600"
              >
                Suivant ➔
              </button>
            </div>
          </motion.div>
        )}

        {/* Étape 3 : Choix de la Couleur & Preview Finale */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col sm:flex-row items-center gap-8"
          >
            {/* Colonne Preview */}
            <div className="flex flex-col items-center gap-4 bg-sky-50 rounded-2xl p-6 border-4 border-sky-100 w-full sm:w-1/2">
              <AvatarRenderer
                config={{ type: avatarType, color: avatarColor, accessory: "none" }}
                size={140}
                interactive={true}
              />
              <div className="text-center">
                <p className="font-bold text-slate-500 text-xs uppercase tracking-wider">Aventurier</p>
                <h3 className="font-bold text-xl text-slate-700 capitalize">{nickname}</h3>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full mt-2 inline-block">
                  Niveau {ageGroup === "3-5" ? "Facile" : ageGroup === "6-8" ? "Moyen" : "Difficile"}
                </span>
              </div>
            </div>

            {/* Colonne Choix Couleurs */}
            <div className="flex flex-col gap-6 w-full sm:w-1/2">
              <div className="flex flex-col gap-2">
                <label className="text-lg font-bold text-slate-700">
                  Choisis sa couleur !
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        playSound("click");
                        setAvatarColor(c.name);
                      }}
                      className={`h-12 rounded-xl flex items-center justify-center border-4 transition-all relative cursor-pointer ${
                        avatarColor === c.name ? "border-slate-800 scale-105" : "border-transparent"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.label}
                    >
                      {avatarColor === c.name && (
                        <span className="text-white text-xs font-bold drop-shadow">✨</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <button
                  onClick={handleNextStep}
                  className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xl font-bold transition-all shadow-lg btn-bubble border-b-4 border-emerald-700"
                >
                  Continuer ➔
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Étape 4 : Validation du Code Parental */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="text-center">
              <span className="text-4xl">🔒</span>
              <h2 className="text-2xl font-bold text-slate-800 mt-2">Création du Code Parental</h2>
              <p className="text-sm font-semibold text-slate-500 mt-1 leading-relaxed">
                Crée un code secret à 4 chiffres. Ce code te permettra d'accéder à l'Espace Parents.
              </p>
            </div>

            <form onSubmit={handleFinish} className="flex flex-col gap-4 max-w-sm mx-auto w-full">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-600 text-center">
                  Crée ton code secret parent (4 chiffres minimum)
                </label>
                <input
                  type="password"
                  value={parentCode}
                  onChange={(e) => {
                    setParentCode(e.target.value);
                    setParentCodeError(false);
                  }}
                  placeholder="Nouveau code secret parent..."
                  className={`w-full px-4 py-3 rounded-xl border-4 text-center text-xl font-bold text-slate-700 outline-none transition-all ${
                    parentCodeError
                      ? "border-rose-400 bg-rose-50 focus:border-rose-500"
                      : "border-indigo-100 focus:border-indigo-400 bg-slate-50"
                  }`}
                  autoFocus
                  required
                />
              </div>

              {parentCodeError && (
                <p className="text-xs font-bold text-rose-500 text-center">
                  Oups, le code doit contenir au moins 4 chiffres ! 🧐
                </p>
              )}

              <div className="flex gap-4 mt-4 w-full">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="w-1/3 py-3 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold transition-all"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-all shadow-lg btn-bubble border-b-4 border-emerald-700"
                >
                  Prêt pour l'aventure ! 🎉
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}
