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
  const { onboardUser, profile, listAccounts } = useApp();

  const [nickname, setNickname] = useState("");
  const [ageGroup, setAgeGroup] = useState<"facile" | "difficile">("facile");
  const [avatarType, setAvatarType] = useState<AvatarConfig["type"]>("fox");
  const [avatarColor, setAvatarColor] = useState("orange");

  const [step, setStep] = useState(1);
  const [parentCode, setParentCode] = useState("");
  const [parentCodeError, setParentCodeError] = useState(false);

  const [accountCode, setAccountCode] = useState("");
  const [codeHint, setCodeHint] = useState("");
  const [accountError, setAccountError] = useState<string | null>(null);

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

  // Étape 4 : valider le code parental puis passer à l'étape 5 (code de connexion)
  const handleParentNext = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!/^\d{4,}$/.test(parentCode.trim())) {
      playSound("incorrect");
      setParentCodeError(true);
      return;
    }
    playSound("click");
    setStep(5);
  };

  // Étape 5 : valider le code de connexion + l'indice, puis créer le compte
  const handleFinish = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = accountCode.trim();
    if (!/^\d{4}$/.test(code)) {
      playSound("incorrect");
      setAccountError("Le code de connexion doit faire exactement 4 chiffres.");
      return;
    }
    if (!codeHint.trim()) {
      playSound("incorrect");
      setAccountError("Donne un petit indice pour te souvenir de ton code.");
      return;
    }
    if (listAccounts().some((a) => a.accountCode === code)) {
      playSound("incorrect");
      setAccountError("Ce code est déjà utilisé sur cet appareil. Choisis-en un autre.");
      return;
    }

    onboardUser(nickname.trim(), ageGroup, {
      type: avatarType,
      color: avatarColor,
      accessories: [],
    }, parentCode.trim(), code, codeHint.trim());

    // Jouer un son joyeux
    playSound("levelup");

    // Rediriger vers le tableau de bord
    router.push("/dashboard");
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-3 min-[380px]:p-4 sm:p-6 bg-gradient-to-b from-sky-200 to-indigo-100">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-3xl p-4 min-[380px]:p-6 sm:p-8 border-4 border-white shadow-2xl relative overflow-hidden">
        {/* Cercles décoratifs */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-yellow-200/50 rounded-full blur-xl" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-pink-200/50 rounded-full blur-xl" />

        {/* Bouton retour */}
        {step > 1 && (
          <button
            onClick={handlePrevStep}
            className="absolute top-4 left-4 text-slate-500 hover:text-slate-800 text-sm font-bold flex items-center gap-1 transition-all"
          >
            ← Retour
          </button>
        )}

        <div className="text-center mb-4 sm:mb-8">
          <span className="text-4xl">🚀</span>
          <h1 className="text-2xl min-[380px]:text-3xl sm:text-4xl font-bold text-indigo-900 mt-1 sm:mt-2">
            Crée ton Aventurier
          </h1>
          <p className="text-slate-600 font-medium mt-1 text-sm sm:text-base">
            Étape {step} sur 5
          </p>
        </div>

        {/* Étape 1 : Prénom et Niveau */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-4 sm:gap-6"
          >
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label className="text-base sm:text-lg font-bold text-slate-700">
                Comment t'appelles-tu ?
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Entre ton prénom ici..."
                className="w-full px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl border-4 border-sky-100 focus:border-sky-400 bg-white text-base sm:text-lg font-bold text-slate-700 outline-none transition-all shadow-inner placeholder:text-slate-400"
                maxLength={15}
                required
              />
            </div>

            <div className="flex flex-col gap-2 sm:gap-3">
              <label className="text-base sm:text-lg font-bold text-slate-700">
                Choisis ton niveau de difficulté :
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                {[
                  { id: "facile", label: "👶 Facile (Niveau Collège)", desc: "Leçons illustrées & quiz interactifs" },
                  { id: "difficile", label: "🎓 Difficile (Niveau Lycée)", desc: "Défis & cours complets avancés" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      playSound("click");
                      setAgeGroup(item.id as any);
                    }}
                    className={`p-3 rounded-xl border-4 text-left transition-all cursor-pointer flex flex-col justify-between ${
                      ageGroup === item.id
                        ? "border-sky-500 bg-sky-50 shadow-md text-sky-900"
                        : "border-slate-100 hover:border-slate-300 bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span className="font-bold text-sm sm:text-base">{item.label}</span>
                    <span className="text-[10px] sm:text-xs mt-1 sm:mt-2 opacity-80">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleNextStep}
              className="w-full mt-4 sm:mt-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-yellow-400 hover:bg-yellow-500 text-yellow-950 text-lg sm:text-xl font-bold transition-all shadow-lg hover:shadow-xl btn-bubble border-b-4 border-yellow-600"
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
            className="flex flex-col gap-4 sm:gap-6"
          >
            <label className="text-base sm:text-lg font-bold text-slate-700 text-center">
              Choisis ton personnage !
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {AVATAR_TYPES.map((item) => (
                <button
                  key={item.type}
                  onClick={() => {
                    playSound("click");
                    setAvatarType(item.type);
                  }}
                  className={`p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border-4 transition-all flex flex-col items-center gap-1.5 sm:gap-2 cursor-pointer ${
                    avatarType === item.type
                      ? "border-indigo-500 bg-indigo-50/50 shadow-md"
                      : "border-slate-100 hover:border-slate-300 bg-slate-50"
                  }`}
                >
                  <div className="w-14 h-14 min-[380px]:w-16 min-[380px]:h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                    <AvatarRenderer
                      config={{ type: item.type, color: avatarColor, accessories: [] }}
                      size={50}
                      interactive={false}
                    />
                  </div>
                  <span className="font-bold text-sm sm:text-base text-slate-700">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-4 mt-4 sm:mt-6">
              <button
                onClick={handlePrevStep}
                className="w-1/3 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold transition-all text-sm sm:text-base"
              >
                Retour
              </button>
              <button
                onClick={handleNextStep}
                className="w-2/3 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-yellow-400 hover:bg-yellow-500 text-yellow-950 text-base sm:text-xl font-bold transition-all shadow-lg btn-bubble border-b-4 border-yellow-600"
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
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8"
          >
            {/* Colonne Preview */}
            <div className="flex flex-col items-center gap-3 sm:gap-4 bg-sky-50 rounded-2xl p-4 sm:p-6 border-4 border-sky-100 w-full sm:w-1/2">
              <AvatarRenderer
                config={{ type: avatarType, color: avatarColor, accessories: [] }}
                size={100}
                interactive={true}
              />
              <div className="text-center">
                <p className="font-bold text-slate-500 text-[10px] sm:text-xs uppercase tracking-wider">Aventurier</p>
                <h3 className="font-bold text-lg sm:text-xl text-slate-700 capitalize">{nickname}</h3>
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-indigo-100 text-indigo-700 text-[10px] sm:text-xs font-bold rounded-full mt-1.5 sm:mt-2 inline-block">
                  Niveau {ageGroup === "facile" ? "Collège" : "Lycée"}
                </span>
              </div>
            </div>

            {/* Colonne Choix Couleurs */}
            <div className="flex flex-col gap-4 sm:gap-6 w-full sm:w-1/2">
              <div className="flex flex-col gap-2">
                <label className="text-base sm:text-lg font-bold text-slate-700 text-center sm:text-left">
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
                      className={`h-10 sm:h-12 rounded-xl flex items-center justify-center border-4 transition-all relative cursor-pointer ${
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

              <div className="flex flex-col gap-3 mt-2 sm:mt-4">
                <button
                  onClick={handleNextStep}
                  className="w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-lg sm:text-xl font-bold transition-all shadow-lg btn-bubble border-b-4 border-emerald-700"
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
            className="flex flex-col gap-4 sm:gap-6"
          >
            <div className="text-center">
              <span className="text-4xl">🔒</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mt-2">Création du Code Parental</h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 leading-relaxed">
                Crée un code secret à 4 chiffres. Ce code te permettra d'accéder à l'Espace Parents.
              </p>
            </div>

            <form onSubmit={handleParentNext} className="flex flex-col gap-4 max-w-sm mx-auto w-full">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] sm:text-xs font-bold text-slate-600 text-center">
                  Crée ton code secret parent (4 chiffres minimum)
                </label>
                <input
                  type="password"
                  inputMode="numeric"
                  value={parentCode}
                  onChange={(e) => {
                    setParentCode(e.target.value.replace(/\D/g, ""));
                    setParentCodeError(false);
                  }}
                  placeholder="Nouveau code secret parent..."
                  className={`w-full px-4 py-2.5 sm:py-3 rounded-xl border-4 text-center text-lg sm:text-xl font-bold text-slate-700 outline-none transition-all ${
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

              <div className="flex gap-4 mt-2 sm:mt-4 w-full">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="w-1/3 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold transition-all text-sm"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-all shadow-lg btn-bubble border-b-4 border-emerald-700 text-sm sm:text-base"
                >
                  Suivant ➔
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Étape 5 : Code de connexion + indice (pour retrouver son compte) */}
        {step === 5 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-4 sm:gap-6"
          >
            <div className="text-center">
              <span className="text-4xl">🔑</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mt-2">Ton code de connexion</h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 leading-relaxed">
                Choisis un code à 4 chiffres pour retrouver ton compte quand tu te reconnecteras.
                Ajoute un petit indice au cas où tu l&apos;oublierais !
              </p>
            </div>

            <form onSubmit={handleFinish} className="flex flex-col gap-4 max-w-sm mx-auto w-full">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] sm:text-xs font-bold text-slate-600 text-center">
                  Code de connexion (4 chiffres)
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={accountCode}
                  onChange={(e) => {
                    setAccountCode(e.target.value.replace(/\D/g, "").slice(0, 4));
                    setAccountError(null);
                  }}
                  placeholder="Ex : 1234"
                  className={`w-full px-4 py-2.5 sm:py-3 rounded-xl border-4 text-center text-2xl tracking-[0.4em] font-bold text-slate-700 outline-none transition-all ${
                    accountError
                      ? "border-rose-400 bg-rose-50 focus:border-rose-500"
                      : "border-teal-100 focus:border-teal-400 bg-slate-50"
                  }`}
                  autoFocus
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] sm:text-xs font-bold text-slate-600 text-center">
                  Indice pour t&apos;en souvenir
                </label>
                <input
                  type="text"
                  value={codeHint}
                  onChange={(e) => {
                    setCodeHint(e.target.value);
                    setAccountError(null);
                  }}
                  placeholder="Ex : l'année de naissance de mon chien"
                  maxLength={60}
                  className={`w-full px-4 py-2.5 sm:py-3 rounded-xl border-4 text-center text-sm sm:text-base font-bold text-slate-700 outline-none transition-all ${
                    accountError
                      ? "border-rose-400 bg-rose-50 focus:border-rose-500"
                      : "border-teal-100 focus:border-teal-400 bg-slate-50"
                  }`}
                  required
                />
              </div>

              {accountError && (
                <p className="text-xs font-bold text-rose-500 text-center">{accountError} 🧐</p>
              )}

              <div className="flex gap-4 mt-2 sm:mt-4 w-full">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="w-1/3 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold transition-all text-sm"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-all shadow-lg btn-bubble border-b-4 border-emerald-700 text-sm sm:text-base"
                >
                  Prêt pour l&apos;aventure ! 🎉
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}
