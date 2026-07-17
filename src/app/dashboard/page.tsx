"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useApp, AvatarConfig } from "@/context/AppContext";
import { asset } from "@/lib/asset";
import { AvatarRenderer, AVATAR_NAMES, AVATAR_EMOJIS } from "@/components/Avatar/AvatarRenderer";
import { KnowledgeTree } from "@/components/KnowledgeTree/KnowledgeTree";
import { IllustrationRenderer } from "@/components/UI/IllustrationRenderer";
import { UNIVERSES } from "@/data/lessons";
import { aDuContenuPremiumVerrouille } from "@/lib/premium";
import { playSound } from "@/lib/sound";
import {
  Volume2,
  VolumeX,
  Lock,
  Flame,
  Coins,
  Sparkles,
  ShoppingBag,
  Award,
  RefreshCw,
  Clock,
  LogOut,
  Gamepad2,
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const {
    profile,
    isLoaded,
    logout,
    changeAccountCode,
    addCrystals,
    buyAccessory,
    equipAccessory,
    resetProgress,
    getLevel,
    getXpPercent,
    setSoundEnabled,
    setReadAloudEnabled,
    changeAgeGroup,
    updateTimeSpent,
    updateMaxTimeLimit,
    setTimeLimitEnabled,
    useWateringCan,
    toggleCheatCode,
  } = useApp();

  // Modales
  const [showBadges, setShowBadges] = useState(false);
  const [showParentsGate, setShowParentsGate] = useState(false);
  const [showParentsSpace, setShowParentsSpace] = useState(false);

  // Changement du code de connexion (Espace Parents)
  const [showChangeCode, setShowChangeCode] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newHint, setNewHint] = useState("");
  const [codeMsg, setCodeMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  // Barrière parentale
  const [parentAnswer, setParentAnswer] = useState("");
  const [gateError, setGateError] = useState(false);

  // Réglages parents
  const [showTimeLimitAlert, setShowTimeLimitAlert] = useState(false);

  // Rediriger vers l'accueil si pas de profil — seulement une fois le chargement terminé
  // (sinon un accès direct / rafraîchissement sur /dashboard rebondit vers l'accueil).
  useEffect(() => {
    if (isLoaded && !profile) {
      router.push("/");
    }
  }, [isLoaded, profile, router]);

  // Suivi du temps d'écran (toutes les 10 secondes)
  useEffect(() => {
    if (!profile) return;
    const interval = setInterval(() => {
      updateTimeSpent(10);
    }, 10000);

    return () => clearInterval(interval);
  }, [profile, updateTimeSpent]);

  // Alerte de limite de temps
  useEffect(() => {
    if (!profile) return;
    const minutesSpent = profile.timeSpentToday / 60;
    if (profile.timeLimitEnabled !== false && minutesSpent >= profile.maxTimeLimit) {
      setShowTimeLimitAlert(true);
    } else {
      setShowTimeLimitAlert(false);
    }
  }, [profile?.timeSpentToday, profile?.maxTimeLimit, profile?.timeLimitEnabled, profile]);

  if (!profile) return null;

  const currentLevel = getLevel();
  const xpPercent = getXpPercent();
  // Compteurs affichés dans l'en-tête (Pièces + Diamants toujours, Cristaux/Arrosoirs si > 0,
  // Série toujours). Si le total est impair, la grille mobile 2 colonnes laisserait le dernier
  // chip seul à gauche -> on le fait s'étendre sur les 2 colonnes pour rester aligné/centré.
  const visibleStatCount =
    2 + ((profile.crystals || 0) > 0 ? 1 : 0) + ((profile.wateringCans || 0) > 0 ? 1 : 0) + 1;
  // Si le nombre de compteurs est impair, le dernier (Série) s'étend sur les 2 colonnes
  // de la grille mobile pour rester centré. Style inline (la classe Tailwind dynamique
  // n'est pas toujours détectée). Sans effet sur la rangée flex des écrans ≥ sm.
  const streakSpanStyle = visibleStatCount % 2 === 1 ? { gridColumn: "1 / -1" } : undefined;
  // Code triche 7194 : débloque pièces/diamants ET tous les univers (niveaux + cristaux).
  // Réservé au DÉVELOPPEMENT — neutralisé en production (lancement).
  const cheat = !!profile.isCheatEnabled && process.env.NODE_ENV !== "production";

  // Universes
  const activeUniverses = Object.values(UNIVERSES);

  // Générer une question de maths pour la barrière parentale
  const openParentsGate = () => {
    playSound("click");
    setParentAnswer("");
    setGateError(false);
    setShowParentsGate(true);
  };

  const handleVerifyParent = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAnswer = parentAnswer.trim();
    const correctCode = profile.parentCode || "2912";
    
    // Code de triche RÉSERVÉ AU DÉVELOPPEMENT (pieces/diamants/univers illimités).
    // Désactivé en production pour ne pas donner d'accès premium gratuit au lancement.
    if (cleanAnswer === "7194" && process.env.NODE_ENV !== "production") {
      playSound("correct");
      toggleCheatCode();
      setShowParentsGate(false);
      setParentAnswer("");
      return;
    }

    // On respecte le code parent (personnalisé ou, à défaut, le 2912 par défaut).
    // Plus de "master override" universel : un parent qui a choisi son code est le seul à le connaître.
    if (cleanAnswer === correctCode) {
      playSound("correct");
      setShowParentsGate(false);
      setShowParentsSpace(true);
    } else {
      playSound("incorrect");
      setGateError(true);
      setParentAnswer("");
    }
  };

  // Obtenir la progression dans un univers pour la tranche d'âge actuelle
  const getUniverseProgress = (univId: string) => {
    const lessons = UNIVERSES[univId]?.lessons[profile.ageGroup] || [];
    if (lessons.length === 0) return { completed: 0, total: 0 };
    
    let completed = 0;
    lessons.forEach(l => {
      if (profile.completedQuizzes.includes(l.id)) {
        completed++;
      }
    });

    return { completed, total: lessons.length };
  };

  return (
    <div className="flex-1 flex flex-col p-3 sm:p-6 max-w-6xl mx-auto w-full gap-4 sm:gap-6">
      
      {/* Bandeau d'avertissement de triche (dev uniquement — cf. `cheat`) */}
      {cheat && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-black py-2.5 px-4 rounded-2xl shadow-md flex flex-col items-center gap-2 text-xs sm:text-sm border-2 border-amber-300"
        >
          <span className="text-center">⚡ Mode Test Actif : pièces, diamants et tous les univers débloqués (ressaisis 7194 dans la section Parents pour revenir à la normale)</span>
          {/* Accès direct aux nouveaux mondes, sans avoir à gagner les cristaux */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => { playSound("click"); router.push("/temple"); }}
              className="px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-amber-800 font-black text-[11px] sm:text-xs cursor-pointer transition-colors border border-amber-200 shadow"
            >
              🏛️ Entrer dans Le Temple des Sages →
            </button>
            <button
              onClick={() => { playSound("click"); router.push("/play/mythology"); }}
              className="px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-violet-800 font-black text-[11px] sm:text-xs cursor-pointer transition-colors border border-violet-200 shadow"
            >
              🔮 Tester Mythologie (thème secret) →
            </button>
            <button
              onClick={() => { playSound("correct"); addCrystals(5); }}
              className="px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-pink-800 font-black text-[11px] sm:text-xs cursor-pointer transition-colors border border-pink-200 shadow"
            >
              💠 Débloquer le Temple (+5 cristaux)
            </button>
          </div>
        </motion.div>
      )}
      
      {/* 1. Header & Barre de Profil */}
      <header className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 glass-card p-4 sm:p-6 bg-white/90">

        {/* Infos profil gauche */}
        <div className="flex items-center gap-3 sm:gap-4 lg:flex-1 lg:min-w-0">
          {/* Avatar (sans lien marché) + Animal compagnon à côté */}
          <div className="relative shrink-0 flex items-end gap-1.5">
            {/* Avatar principal */}
            <div className="bg-sky-100 p-1 rounded-xl sm:rounded-2xl border-2 border-sky-300">
              <AvatarRenderer config={profile.avatar} size={64} interactive={true} />
            </div>

            {/* Animal compagnon affiché clairement à côté de l'avatar */}
            {profile.activePet && profile.activePet !== "none" && (
              <motion.div
                animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center select-none"
                title={`Compagnon : ${profile.activePet}`}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md">
                  <img src={asset(`/images/pet_${profile.activePet}.png`)} alt={`Compagnon ${profile.activePet}`} className="w-full h-full object-contain select-none" />
                </div>
                <span className="text-[8px] sm:text-[9px] font-black text-indigo-600 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded-full leading-none -mt-0.5 whitespace-nowrap">
                  {profile.activePet === "fox" && "Renardeau"}
                  {profile.activePet === "cat" && "Chaton"}
                  {profile.activePet === "koala" && "Koala"}
                  {profile.activePet === "dragon" && "Dragonneau"}
                  {profile.activePet === "unicorn" && "Licorne"}
                  {profile.activePet === "panda" && "Panda"}
                  {profile.activePet === "lion" && "Lion"}
                  {profile.activePet === "griffon" && "Griffon"}
                </span>
              </motion.div>
            )}
          </div>

          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 capitalize truncate max-w-[120px] min-[380px]:max-w-[150px] sm:max-w-[180px]">
                {profile.nickname}
              </h2>
              <span className="bg-indigo-100 text-indigo-700 text-[10px] sm:text-xs font-black px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full border border-indigo-200 shrink-0">
                Niv. {currentLevel}
              </span>
            </div>

            {/* Prénom du personnage choisi (pour l'attachement de l'enfant) */}
            <span className="text-[11px] sm:text-xs font-bold text-slate-500 mt-0.5">
              avec {AVATAR_EMOJIS[profile.avatar.type]} {AVATAR_NAMES[profile.avatar.type]}
            </span>

            {/* Barre d'XP */}
            <div className="w-full bg-slate-100 rounded-full h-3 sm:h-4 mt-1 sm:mt-2 overflow-hidden border border-slate-200 relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpPercent}%` }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-full rounded-full"
              />
              <span className="absolute inset-0 flex items-center justify-center text-[9px] sm:text-[10px] font-black text-slate-600">
                {xpPercent.toFixed(0)}% XP
              </span>
            </div>
          </div>
        </div>

        {/* Stats centre (Monnaies, Streak) — grille 2 colonnes alignée sur mobile
            (évite que la « Série » tombe seule sous les autres), rangée sur écrans larges */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap lg:flex-nowrap lg:shrink-0 items-stretch sm:items-center justify-center lg:justify-end gap-2 sm:gap-4 md:gap-6 lg:gap-3 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
          <div className="flex items-center justify-center sm:justify-start w-full sm:w-auto gap-2 bg-amber-50 border-2 border-amber-200 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl">
            <Coins className="text-amber-500 w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-xs text-amber-700 font-bold leading-tight">Pièces</span>
              <span className="text-base sm:text-lg font-black text-amber-900 leading-none">{profile.coins}</span>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start w-full sm:w-auto gap-2 bg-purple-50 border-2 border-purple-200 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl">
            <span className="text-xl sm:text-2xl">💎</span>
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-xs text-purple-700 font-bold leading-tight">Diamants</span>
              <span className="text-base sm:text-lg font-black text-purple-900 leading-none">{profile.diamonds}</span>
            </div>
          </div>

          {(profile.crystals || 0) > 0 && (
            <div className="flex items-center justify-center sm:justify-start w-full sm:w-auto gap-2 bg-pink-50 border-2 border-pink-200 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl">
              <span className="text-xl sm:text-2xl">💠</span>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs text-pink-700 font-bold leading-tight">Cristaux</span>
                <span className="text-base sm:text-lg font-black text-pink-900 leading-none">{profile.crystals}</span>
              </div>
            </div>
          )}

          {(profile.wateringCans || 0) > 0 && (
            <div className="flex items-center justify-center sm:justify-start w-full sm:w-auto gap-2 bg-teal-50 border-2 border-teal-200 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl">
              <img src={asset("/images/watering_can.png")} alt="Arrosoir" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs text-teal-700 font-bold leading-tight">Arrosoirs</span>
                <span className="text-base sm:text-lg font-black text-teal-900 leading-none">{profile.wateringCans}</span>
              </div>
            </div>
          )}

          <div style={streakSpanStyle} className="flex items-center justify-center sm:justify-start w-full sm:w-auto gap-2 bg-orange-50 border-2 border-orange-200 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl">
            <Flame className="text-orange-500 w-5 h-5 sm:w-6 sm:h-6" />
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-xs text-orange-700 font-bold leading-tight">Série</span>
              <span className="text-base sm:text-lg font-black text-orange-900 leading-none">{profile.streak} j</span>
            </div>
          </div>
        </div>

        {/* Contrôles et options droites */}
        <div className="flex items-center justify-center sm:justify-end gap-1.5 sm:gap-2 w-full sm:w-auto lg:shrink-0">
          {/* Bouton son */}
          <button
            onClick={() => {
              setSoundEnabled(!profile.soundEnabled);
              playSound("click");
            }}
            className={`p-2.5 sm:p-3 rounded-xl border-2 transition-all cursor-pointer ${
              profile.soundEnabled
                ? "border-sky-300 bg-sky-50 text-sky-700 hover:bg-sky-100"
                : "border-slate-200 bg-slate-50 text-slate-400 hover:bg-slate-100"
            }`}
            title={profile.soundEnabled ? "Couper les bruitages" : "Activer les bruitages"}
          >
            {profile.soundEnabled ? <Volume2 size={16} className="sm:w-5 sm:h-5" /> : <VolumeX size={16} className="sm:w-5 sm:h-5" />}
          </button>

          {/* Bouton lecture vocale automatique */}
          <button
            onClick={() => {
              setReadAloudEnabled(!profile.readAloudEnabled);
              playSound("click");
            }}
            className={`p-2.5 sm:p-3 rounded-xl border-2 text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              profile.readAloudEnabled
                ? "border-purple-300 bg-purple-50 text-purple-700 hover:bg-purple-100"
                : "border-slate-200 bg-slate-50 text-slate-400 hover:bg-slate-100"
            }`}
            title="Lecture audio automatique"
          >
            <span>🗣️</span>
            <span className="hidden sm:inline">
              {profile.readAloudEnabled ? "Voix Activée" : "Voix Muette"}
            </span>
          </button>

          {/* Espace parents */}
          <button
            onClick={openParentsGate}
            className="p-2.5 sm:p-3 rounded-xl border-2 border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Lock size={14} className="sm:w-4 sm:h-4" />
            <span>Parents</span>
          </button>
        </div>
      </header>

      {/* 2. Main Content Grid (Arbre à gauche, Univers à droite) */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 w-full items-start">
        
        {/* Section de l'arbre (Gauche) */}
        <section className="lg:col-span-5 flex flex-col gap-4 items-center">
          <div className="w-full glass-card p-4 sm:p-6 bg-white/90 text-center flex flex-col gap-3 sm:gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg sm:text-xl text-indigo-950 flex items-center gap-1.5 sm:gap-2">
                🌳 Mon Arbre du Savoir
              </h3>
              <span className="text-[10px] sm:text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                Grandit avec ton XP
              </span>
            </div>

            <KnowledgeTree
              xp={profile.xp}
              level={currentLevel}
              treeGrowth={profile.treeGrowth || 0}
              unlockedTreeAnimals={profile.unlockedTreeAnimals || []}
              wateringCans={profile.wateringCans || 0}
              onUseWateringCan={useWateringCan}
            />

            <p className="text-xs sm:text-sm font-medium text-slate-600 px-2 leading-relaxed">
              Fais les leçons et les quiz pour gagner de l'XP ! Plus tu progresses, plus ton arbre grandit ! 🌱
            </p>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-1 sm:mt-2">
              <button
                onClick={() => {
                  playSound("click");
                  setShowBadges(true);
                }}
                className="py-2.5 px-2 min-[380px]:py-3 min-[380px]:px-4 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md btn-bubble border-b-4 border-indigo-700 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer"
              >
                <Award size={14} className="sm:w-4 sm:h-4" />
                <span>Mes Badges ({profile.unlockedBadges.length})</span>
              </button>
              
              <button
                onClick={() => {
                  playSound("click");
                  // On va directement au Marché : l'unique animation d'entrée est la
                  // vidéo POV de la charrette jouée par la page Marché elle-même.
                  router.push("/market");
                }}
                className="py-2.5 px-2 min-[380px]:py-3 min-[380px]:px-4 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs sm:text-sm transition-all shadow-md btn-bubble border-b-4 border-amber-600 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer"
              >
                <ShoppingBag size={14} className="sm:w-4 sm:h-4" />
                <span>Aller au Marché 🛒</span>
              </button>
            </div>
          </div>
        </section>

        {/* Section Univers Pédagogiques (Droite) */}
        <section className="lg:col-span-7 flex flex-col gap-4">
          <div className="glass-card p-4 sm:p-6 bg-white/90">
            <h3 className="font-bold text-lg sm:text-xl text-indigo-950 mb-4 sm:mb-6 flex items-center gap-2">
              🧭 Choisis ton univers d'apprentissage
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {activeUniverses.map((univ) => {
                const { completed, total } = getUniverseProgress(univ.id);
                const isFinished = total > 0 && completed === total;
                // Freemium : l'univers contient-il des quizz premium encore verrouillés ?
                const hasPremiumLocked = aDuContenuPremiumVerrouille(
                  UNIVERSES[univ.id]?.lessons[profile.ageGroup] || [],
                  profile
                );

                // Mondes secrets : déblocage générique (par niveau OU par cristaux)
                if (univ.secret) {
                  const unl = univ.unlock;
                  let locked = false;
                  let label = "Thème secret";
                  let msg = "";
                  if (unl && unl.type === "level") {
                    locked = !cheat && currentLevel < unl.value;
                    label = "Thème secret";
                    msg = `Atteins le niveau ${unl.value} pour découvrir un univers mystère ! (niveau ${currentLevel}/${unl.value})`;
                  } else if (unl && unl.type === "crystals") {
                    const cr = profile.maxCrystals || 0; // pic atteint : reste débloqué même après avoir dépensé des cristaux
                    locked = !cheat && cr < unl.value;
                    label = "Monde légendaire";
                    msg = `Réunis ${unl.value} cristaux 💠 (gagnés en réussissant les quiz du thème secret sans faute) pour ouvrir ce monde ! (${cr}/${unl.value})`;
                  }
                  if (locked) {
                    return (
                      <button
                        key={univ.id}
                        onClick={() => playSound("click")}
                        className="p-4 sm:p-5 rounded-3xl border-4 border-dashed border-violet-300 bg-gradient-to-br from-violet-100 to-purple-100 flex flex-col items-center justify-center text-center cursor-not-allowed relative overflow-hidden min-h-[150px]"
                      >
                        <span className="text-5xl mb-2">🔒</span>
                        <span className="font-black text-violet-900">{label}</span>
                        <span className="text-[11px] font-bold text-violet-600 mt-1 px-2">{msg}</span>
                      </button>
                    );
                  }
                }

                // Univers de base : verrouillé tant que le niveau requis n'est pas atteint
                if (!cheat && !univ.secret && univ.unlock && univ.unlock.type === "level" && currentLevel < univ.unlock.value) {
                  return (
                    <button
                      key={univ.id}
                      onClick={() => playSound("click")}
                      className="p-4 sm:p-5 rounded-3xl border-4 border-dashed border-slate-200 bg-slate-100/70 flex flex-col items-center justify-center text-center cursor-not-allowed relative overflow-hidden min-h-[150px]"
                    >
                      <span className="text-4xl mb-1 grayscale opacity-50">{univ.emoji}</span>
                      <span className="font-black text-slate-500">{univ.name}</span>
                      <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500 mt-1">
                        <span>🔒</span> Débloqué au niveau {univ.unlock.value}
                      </span>
                    </button>
                  );
                }

                // Mapper les couleurs Tailwind
                const colorMap: Record<string, string> = {
                  amber: "from-amber-400/10 to-amber-500/20 hover:border-amber-400 border-amber-100 text-amber-800 focus:ring-amber-300",
                  emerald: "from-emerald-400/10 to-emerald-500/20 hover:border-emerald-400 border-emerald-100 text-emerald-800 focus:ring-emerald-300",
                  rose: "from-rose-400/10 to-rose-500/20 hover:border-rose-400 border-rose-100 text-rose-800 focus:ring-rose-300",
                  indigo: "from-indigo-400/10 to-indigo-500/20 hover:border-indigo-400 border-indigo-100 text-indigo-800 focus:ring-indigo-300",
                  orange: "from-orange-400/10 to-orange-500/20 hover:border-orange-400 border-orange-100 text-orange-800 focus:ring-orange-300",
                  cyan: "from-cyan-400/10 to-cyan-500/20 hover:border-cyan-400 border-cyan-100 text-cyan-800 focus:ring-cyan-300",
                  violet: "from-violet-400/10 to-violet-500/20 hover:border-violet-400 border-violet-100 text-violet-800 focus:ring-violet-300",
                  pink: "from-pink-400/10 to-pink-500/20 hover:border-pink-400 border-pink-100 text-pink-800 focus:ring-pink-300",
                };

                const badgesColors: Record<string, string> = {
                  amber: "bg-amber-400 text-white",
                  emerald: "bg-emerald-500 text-white",
                  rose: "bg-rose-500 text-white",
                  indigo: "bg-indigo-600 text-white",
                  orange: "bg-orange-500 text-white",
                  cyan: "bg-cyan-500 text-white",
                  violet: "bg-violet-500 text-white",
                  pink: "bg-pink-500 text-white",
                };

                // Le monde ultime "Le Temple des Sages" a un look légendaire distinct (or + violet)
                const legendaryStyle = "from-amber-200/40 to-fuchsia-300/40 hover:border-amber-400 border-amber-300 text-fuchsia-900 focus:ring-amber-300 ring-2 ring-amber-300/60 shadow-lg shadow-amber-200/40";
                const currentStyle = univ.id === "temple" ? legendaryStyle : (colorMap[univ.themeColor] || colorMap.amber);
                const badgeColor = badgesColors[univ.themeColor] || "bg-sky-500";

                return (
                  <button
                    key={univ.id}
                    onClick={() => {
                      playSound("click");
                      // Le Temple des Sages est un monde à part : on entre dans son hub dédié
                      router.push(univ.id === "temple" ? "/temple" : `/play/${univ.id}`);
                    }}
                    className={`p-4 sm:p-5 rounded-3xl border-4 bg-gradient-to-br flex flex-col justify-between items-start text-left cursor-pointer transition-all duration-300 relative group overflow-hidden ${currentStyle}`}
                  >
                    {/* Fond d'illustration géant flottant */}
                    <img
                      src={asset(`/images/${univ.id}.png`)}
                      alt=""
                      className="absolute right-2 -bottom-2 w-24 h-24 sm:w-28 sm:h-28 opacity-10 select-none group-hover:scale-110 transition-transform duration-300 pointer-events-none object-contain"
                    />

                    {/* Repère freemium : des quizz premium restent à débloquer dans cet univers */}
                    {hasPremiumLocked && (
                      <span className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 bg-gradient-to-r from-amber-500 to-fuchsia-500 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wide px-2 py-1 rounded-full shadow border border-white/40">
                        🔒 Premium
                      </span>
                    )}

                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:rotate-6 transition-transform flex items-center justify-center overflow-hidden p-1.5 shrink-0 select-none">
                        <img src={asset(`/images/${univ.id}.png`)} alt={univ.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-bold text-base sm:text-lg text-slate-800 leading-tight">
                          {univ.name}
                        </h4>
                        <span className="text-[10px] sm:text-[11px] font-bold text-slate-500">
                          Niveau : {profile.ageGroup === "facile" ? "Moyen" : "Difficile"}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-slate-600 mt-2 mb-3 sm:mt-3 sm:mb-4 leading-relaxed max-w-[240px]">
                      {univ.description}
                    </p>

                    <div className="w-full flex items-center justify-between pt-2 border-t border-slate-200/50">
                      {/* Avancement */}
                      <span className="text-[10px] sm:text-xs font-bold text-slate-700">
                        {completed === total ? "✅ Fini !" : `Progression : ${completed}/${total}`}
                      </span>

                      {/* Pill de quiz */}
                      <span className={`text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full ${badgeColor}`}>
                        {isFinished ? "Badge Acquis" : "Jouer !"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* 4. Modale Galerie des Badges / Étagère à Trophées */}
      <AnimatePresence>
        {showBadges && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg bg-white rounded-3xl p-4 min-[380px]:p-5 sm:p-6 border-4 border-indigo-400 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => {
                  playSound("click");
                  setShowBadges(false);
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-2xl font-black cursor-pointer"
              >
                ✕
              </button>

              <div className="text-center mb-4 sm:mb-6">
                <Award className="text-indigo-500 w-8 h-8 sm:w-10 sm:h-10 mx-auto" />
                <h3 className="font-bold text-xl sm:text-2xl text-indigo-950 mt-1">Mes Badges et Trophées</h3>
                <p className="text-xs font-bold text-slate-500">
                  Débloqués en faisant un sans-faute aux quiz d'apprentissage !
                </p>
                <div className="inline-flex items-center gap-1.5 bg-indigo-50 border-2 border-indigo-200 px-3 py-0.5 sm:py-1 rounded-full mt-2 sm:mt-3">
                  <Award className="text-indigo-500 w-3.5 h-3.5" />
                  <span className="text-xs sm:text-sm font-black text-indigo-900">{profile.unlockedBadges.length} débloqués</span>
                </div>
              </div>

              {/* Étagère en bois 3D style cartoon */}
              <div className="bg-orange-50 border-4 border-orange-200 rounded-3xl p-3.5 min-[380px]:p-4.5 sm:p-6 relative shadow-inner">
                {/* L'étagère de bois en fond */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3.5 min-[380px]:gap-4.5 sm:gap-6 text-center">
                  {activeUniverses.flatMap(univ => {
                    const lessons = univ.lessons[profile.ageGroup] || [];
                    return lessons.map(lesson => {
                      const isUnlocked = profile.unlockedBadges.includes(lesson.badgeId);

                      return (
                        <div key={lesson.badgeId} className="flex flex-col items-center gap-1.5">
                          <motion.div
                            whileHover={isUnlocked ? { scale: 1.1, y: -4 } : {}}
                            className={`w-11 h-11 min-[380px]:w-12 min-[380px]:h-12 sm:w-14 sm:h-14 rounded-full border-2 flex items-center justify-center shadow-md transition-all ${
                              isUnlocked
                                ? "bg-gradient-to-br from-yellow-300 to-amber-500 border-white ring-4 ring-amber-400/30 scale-100"
                                : "bg-slate-200 border-slate-300 opacity-40 grayscale"
                            }`}
                          >
                            <IllustrationRenderer name={lesson.badgeEmoji} size={26} animate={false} />
                          </motion.div>
                          <span className="text-[9px] sm:text-[10px] font-bold text-slate-700 leading-tight max-w-[80px] break-words">
                            {lesson.badgeName}
                          </span>
                          <span className="text-[7px] sm:text-[8px] font-bold text-slate-400 capitalize">
                            {univ.name}
                          </span>
                        </div>
                      );
                    });
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 5. Barrière Parentale (Calcul Mental) */}
      <AnimatePresence>
        {showParentsGate && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm bg-white rounded-3xl p-4 sm:p-6 border-4 border-indigo-400 shadow-2xl relative text-center"
            >
              <button
                onClick={() => {
                  playSound("click");
                  setShowParentsGate(false);
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-2xl font-black cursor-pointer"
              >
                ✕
              </button>

              <Lock className="text-indigo-500 w-8 h-8 sm:w-10 sm:h-10 mx-auto" />
              <h3 className="font-bold text-xl sm:text-2xl text-indigo-950 mt-1">Espace réservé aux adultes</h3>
              <p className="text-xs font-bold text-slate-500 mt-1 leading-relaxed">
                Saisis le code secret parent pour accéder aux réglages :
              </p>

              <form onSubmit={handleVerifyParent} className="flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-6">
                <input
                  type="password"
                  value={parentAnswer}
                  onChange={(e) => setParentAnswer(e.target.value)}
                  placeholder="Code parent..."
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-400 bg-white text-center text-lg sm:text-xl font-bold text-slate-700 outline-none"
                  autoFocus
                  required
                />

                {gateError && (
                  <p className="text-xs font-bold text-rose-500">
                    Oups, code incorrect ! Demande à un parent. 🧐
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 sm:py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
                >
                  Entrer dans l'Espace Parents
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 6. Modale Espace Parents (Suivi des progrès) */}
      <AnimatePresence>
        {showParentsSpace && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg bg-white rounded-3xl p-4 min-[380px]:p-5 sm:p-6 border-4 border-indigo-500 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => {
                  playSound("click");
                  setShowParentsSpace(false);
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-2xl font-black cursor-pointer"
              >
                ✕
              </button>

              <div className="text-center mb-4 sm:mb-6">
                <Lock className="text-indigo-600 w-8 h-8 sm:w-10 sm:h-10 mx-auto" />
                <h3 className="font-bold text-xl sm:text-2xl text-indigo-950 mt-1">Tableau de Bord des Parents</h3>
                <p className="text-xs font-bold text-slate-500">
                  Suivi pédagogique, limites d'écran et réglages du compte.
                </p>
              </div>

              {/* Stats Temps d'écran */}
              <div className="bg-slate-50 rounded-2xl p-3 min-[380px]:p-4 border border-slate-100 flex flex-col gap-3 mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="text-slate-500 w-4.5 h-4.5 sm:w-5 sm:h-5" />
                  <span className="font-bold text-slate-700 text-xs sm:text-sm">Gestion du temps de jeu</span>
                </div>
                
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>Temps passé aujourd'hui :</span>
                  <span className="text-indigo-600 font-extrabold text-sm">
                    {Math.floor(profile.timeSpentToday / 60)} minutes
                  </span>
                </div>

                {/* Interrupteur : activer / désactiver la limite de temps d'écran */}
                <button
                  onClick={() => { playSound("click"); setTimeLimitEnabled(profile.timeLimitEnabled === false); }}
                  className={`mt-1 flex items-center justify-between gap-2 px-3 py-2 rounded-xl border-2 font-bold text-xs cursor-pointer transition-colors ${
                    profile.timeLimitEnabled === false
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : "bg-indigo-50 border-indigo-200 text-indigo-700"
                  }`}
                >
                  <span>{profile.timeLimitEnabled === false ? "Limite de temps : désactivée (accès illimité)" : "Limite de temps : activée"}</span>
                  <span className={`px-2 py-0.5 rounded-full text-white text-[10px] font-black ${profile.timeLimitEnabled === false ? "bg-emerald-500" : "bg-indigo-500"}`}>
                    {profile.timeLimitEnabled === false ? "OFF" : "ON"}
                  </span>
                </button>

                {profile.timeLimitEnabled !== false && (
                  <div className="flex flex-col gap-1.5 mt-1 sm:mt-2">
                    <div className="flex justify-between text-xs font-bold text-slate-500">
                      <span>Limite quotidienne :</span>
                      <span className="font-bold text-indigo-700">{profile.maxTimeLimit} min</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="180"
                      step="5"
                      value={profile.maxTimeLimit}
                      onChange={(e) => updateMaxTimeLimit(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="flex justify-between text-[8px] sm:text-[9px] font-bold text-slate-400">
                      <span>5 min</span>
                      <span>30 m</span>
                      <span>1h (60m)</span>
                      <span>1h30 (90m)</span>
                      <span>2h (120m)</span>
                      <span>3h (180m)</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Ajuster la tranche d'âge / difficulté */}
               <div className="bg-slate-50 rounded-2xl p-3 min-[380px]:p-4 border border-slate-100 flex flex-col gap-2.5 sm:gap-3 mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="text-slate-500 w-4.5 h-4.5 sm:w-5 sm:h-5" />
                  <span className="font-bold text-slate-700 text-xs sm:text-sm">Difficulté / Tranche d'âge</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "facile", label: "🙂 Moyen" },
                    { id: "difficile", label: "🎓 Difficile" }
                  ].map((levelItem) => (
                    <button
                      key={levelItem.id}
                      onClick={() => {
                        changeAgeGroup(levelItem.id as any);
                        playSound("click");
                      }}
                      className={`py-2 px-2.5 sm:py-2.5 sm:px-3 rounded-xl border-2 text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                        profile.ageGroup === levelItem.id
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-slate-200 bg-white hover:border-slate-300 text-slate-600"
                      }`}
                    >
                      {levelItem.label}
                    </button>
                  ))}
                </div>
                <p className="text-[9px] sm:text-[10px] text-slate-400 font-semibold leading-relaxed">
                  Modifier le niveau de difficulté adapte instantanément le niveau et le contenu des leçons et des quiz (le mode Difficile contenant 5 fiches de cours détaillées et des quiz plus complexes), tout en conservant l'avatar, les pièces et l'XP de l'enfant.
                </p>
              </div>

              {/* Synthèse des progrès de l'enfant */}
              <div className="flex flex-col gap-2 sm:gap-3 mb-4 sm:mb-6">
                <h4 className="font-bold text-xs sm:text-sm text-slate-700">Progression globale</h4>
                
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                  <div className="bg-sky-50 rounded-2xl p-2.5 sm:p-3 border border-sky-100">
                    <span className="block text-xl sm:text-2xl font-black text-sky-700">
                      {profile.completedLessons.length}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase">Leçons lues</span>
                  </div>

                  <div className="bg-emerald-50 rounded-2xl p-2.5 sm:p-3 border border-emerald-100">
                    <span className="block text-xl sm:text-2xl font-black text-emerald-700">
                      {profile.completedQuizzes.length}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase">Quiz réussis</span>
                  </div>
                </div>
              </div>

              {/* Recommandations pédagogiques */}
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 text-[11px] sm:text-xs leading-relaxed text-indigo-900 font-semibold flex flex-col gap-1.5 sm:gap-2">
                <span className="font-bold uppercase text-[9px] sm:text-[10px] text-indigo-500 tracking-wider">★ Conseil pédagogique</span>
                <p>
                  {profile.completedQuizzes.length === 0
                    ? `Faites démarrer ${profile.nickname} avec l'univers "Animaux". Le niveau de difficulté sélectionné convient idéalement à son développement actuel.`
                    : `${profile.nickname} progresse vite ! N'hésitez pas à lui lire à voix haute certaines leçons si le mode lecture vocale automatique est désactivé.`
                  }
                </p>
              </div>

              {/* Passer à l'aventure complète (abonnement) — masqué si déjà premium */}
              {!profile.isPremium && (
                <div className="flex flex-col gap-2 pt-3 sm:pt-4 border-t border-slate-100">
                  <button
                    onClick={() => { playSound("click"); router.push("/abonnement"); }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-fuchsia-500 hover:from-amber-600 hover:to-fuchsia-600 text-white font-black text-[11px] sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md border-b-4 border-fuchsia-700"
                  >
                    ✨ Passer à l&apos;aventure complète — 7&nbsp;€/mois
                  </button>
                  <p className="text-center text-[10px] text-slate-400 font-semibold">
                    Tous les mondes, tous les quizz, sans limite. Sans engagement.
                  </p>
                </div>
              )}

              {/* Compte & sauvegarde cloud */}
              <div className="flex flex-col gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-slate-100">
                <button
                  onClick={() => { playSound("click"); router.push("/account"); }}
                  className="w-full py-2.5 sm:py-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold text-[10px] sm:text-xs flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer transition-colors border border-teal-200"
                >
                  ☁️ Mon compte & sauvegarde cloud
                </button>

                {/* Changer le code de connexion */}
                <button
                  onClick={() => {
                    playSound("click");
                    setShowChangeCode((v) => !v);
                    setNewCode("");
                    setNewHint(profile.codeHint || "");
                    setCodeMsg(null);
                  }}
                  className="w-full py-2.5 sm:py-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[10px] sm:text-xs flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer transition-colors border border-indigo-200"
                >
                  🔑 Changer mon code de connexion
                </button>

                {showChangeCode && (
                  <div className="flex flex-col gap-2 rounded-xl bg-slate-50 border border-slate-200 p-3">
                    <label className="text-[10px] sm:text-xs font-bold text-slate-600">Nouveau code (4 chiffres)</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={newCode}
                      onChange={(e) => { setNewCode(e.target.value.replace(/\D/g, "").slice(0, 4)); setCodeMsg(null); }}
                      placeholder="Ex : 1234"
                      className="w-full px-3 py-2 rounded-lg border-2 border-slate-200 focus:border-indigo-400 bg-white text-center text-lg tracking-[0.3em] font-bold text-slate-700 outline-none"
                    />
                    <label className="text-[10px] sm:text-xs font-bold text-slate-600 mt-1">Indice (pour s&apos;en souvenir)</label>
                    <input
                      type="text"
                      value={newHint}
                      onChange={(e) => { setNewHint(e.target.value); setCodeMsg(null); }}
                      placeholder="Ton indice..."
                      maxLength={60}
                      className="w-full px-3 py-2 rounded-lg border-2 border-slate-200 focus:border-indigo-400 bg-white text-sm font-semibold text-slate-700 outline-none"
                    />
                    {codeMsg && (
                      <p className={`text-[11px] font-bold text-center ${codeMsg.type === "ok" ? "text-emerald-600" : "text-rose-500"}`}>
                        {codeMsg.text}
                      </p>
                    )}
                    <button
                      onClick={() => {
                        const { error } = changeAccountCode(newCode, newHint);
                        if (error) {
                          playSound("incorrect");
                          setCodeMsg({ type: "err", text: error });
                        } else {
                          playSound("correct");
                          setCodeMsg({ type: "ok", text: "Code mis à jour ! ✅" });
                          // On garde le panneau ouvert pour que le message de succès soit visible.
                          setNewCode("");
                        }
                      }}
                      className="w-full py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm cursor-pointer transition-colors border-b-4 border-indigo-700"
                    >
                      Enregistrer le nouveau code
                    </button>
                  </div>
                )}
              </div>

              {/* Actions dangereuses */}
              <div className="flex flex-col gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    if (confirm(`Êtes-vous sûr de vouloir réinitialiser toute la progression de ${profile.nickname} ?`)) {
                      resetProgress();
                      playSound("click");
                      setShowParentsSpace(false);
                      router.push("/");
                    }
                  }}
                  className="w-full py-2.5 sm:py-3 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[10px] sm:text-xs flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer transition-colors"
                >
                  <RefreshCw size={12} className="sm:w-3.5 sm:h-3.5" />
                  Réinitialiser le profil de {profile.nickname} (XP = 0)
                </button>

                <button
                  onClick={() => {
                    logout();
                    playSound("click");
                    setShowParentsSpace(false);
                    router.push("/login");
                  }}
                  className="w-full py-2.5 sm:py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] sm:text-xs flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer transition-colors"
                >
                  <LogOut size={12} className="sm:w-3.5 sm:h-3.5" />
                  Se déconnecter (mon compte est gardé)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 7. Alerte de Temps Limite Dépassé */}
      <AnimatePresence>
        {showTimeLimitAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="w-full max-w-sm bg-white rounded-3xl p-6 sm:p-8 border-4 border-rose-400 shadow-2xl text-center flex flex-col gap-3 sm:gap-4"
            >
              <span className="text-5xl sm:text-6xl animate-bounce">⏳</span>
              <h3 className="font-bold text-2xl sm:text-3xl text-rose-950">Temps d'Écran Terminé !</h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed">
                C'est l'heure de faire une pause ! Va faire une petite promenade, dessine ou lis un livre. À bientôt ! ☀️
              </p>
              
              <button
                onClick={openParentsGate}
                className="mt-3 sm:mt-4 py-2.5 sm:py-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-xl font-bold text-[10px] sm:text-xs transition-colors cursor-pointer"
              >
                Ajuster la limite (Adultes uniquement)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
