"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { UNIVERSES, Lesson, QuizQuestion } from "@/data/lessons";
import { playSound, speakText, stopSpeaking } from "@/lib/sound";
import { Volume2, VolumeX, ArrowLeft, ArrowRight, Award, CheckCircle2, AlertCircle } from "lucide-react";
import { IllustrationRenderer } from "@/components/UI/IllustrationRenderer";
import confetti from "canvas-confetti";

const formatFrenchPunctuation = (str: string) => {
  return str.replace(/\s+([:!?;])/g, "\u00A0$1");
};

export default function PlayUniverse() {
  const router = useRouter();
  const params = useParams();
  const universeId = params.universe as string;

  const { profile, completeLesson, completeQuiz, addDiamonds } = useApp();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [gameState, setGameState] = useState<"onboarding" | "lesson" | "quiz" | "victory">("lesson");
  
  // États de la leçon
  const [currentCardIdx, setCurrentCardIdx] = useState(0);

  // États du quiz
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answeredState, setAnsweredState] = useState<"idle" | "correct" | "wrong">("idle");
  const [shakingOption, setShakingOption] = useState<string | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [showDiamondFeedback, setShowDiamondFeedback] = useState(false);

  // Barre de vie (Hearts)
  const [health, setHealth] = useState(10); // 10 demi-cœurs = 5 cœurs complets
  const [wrongAttempts, setWrongAttempts] = useState(0); // Erreurs sur la question actuelle
  const [firstTryWrongCurrent, setFirstTryWrongCurrent] = useState(false); // Premier essai de la question actuelle raté
  const [firstTryWrongPrevious, setFirstTryWrongPrevious] = useState(false); // Premier essai de la question précédente raté

  // Réf pour éviter la synthèse vocale en boucle
  const hasSpoken = useRef(false);

  // Charger la leçon correspondante (la première non complétée, ou la dernière si tout est fini)
  useEffect(() => {
    if (profile && universeId) {
      const lessons = UNIVERSES[universeId]?.lessons[profile.ageGroup] || [];
      if (lessons.length > 0) {
        const firstUncompleted = lessons.find(
          l => !profile.completedQuizzes.includes(l.id)
        );
        setLesson(firstUncompleted || lessons[lessons.length - 1]);
      } else {
        router.push("/dashboard");
      }
    }
  }, [profile, universeId, router]);

  // Déclencher la lecture vocale automatique si activée
  useEffect(() => {
    if (!lesson || gameState !== "lesson" || !profile?.readAloudEnabled) {
      stopSpeaking();
      return;
    }

    const currentCard = lesson.cards[currentCardIdx];
    if (currentCard) {
      // Retardateur léger pour laisser la transition de page se faire
      const timer = setTimeout(() => {
        speakText(`${currentCard.title}. ${currentCard.text}`);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentCardIdx, gameState, lesson, profile?.readAloudEnabled]);

  // Arrêter le son si on quitte
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  // Mélanger les options du quiz quand la question change ou que le quiz commence
  useEffect(() => {
    const currentQuestion = lesson?.quiz?.[currentQuestionIdx];
    if (currentQuestion && gameState === "quiz") {
      const optionsCopy = [...currentQuestion.options];
      for (let i = optionsCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionsCopy[i], optionsCopy[j]] = [optionsCopy[j], optionsCopy[i]];
      }
      setShuffledOptions(optionsCopy);
    } else if (gameState !== "quiz") {
      setShuffledOptions([]);
    }
  }, [currentQuestionIdx, lesson, gameState]);

  if (!profile || !lesson) return null;

  const currentCard = lesson.cards[currentCardIdx];
  const currentQuestion = lesson.quiz[currentQuestionIdx];

  const handleNextCard = () => {
    playSound("click");
    stopSpeaking();
    if (currentCardIdx < lesson.cards.length - 1) {
      setCurrentCardIdx(prev => prev + 1);
    } else {
      // Fin des fiches d'apprentissage -> récompense de lecture
      completeLesson(lesson.id);
      setGameState("quiz");
    }
  };

  const handlePrevCard = () => {
    playSound("click");
    stopSpeaking();
    if (currentCardIdx > 0) {
      setCurrentCardIdx(prev => prev - 1);
    }
  };

  // Traiter la réponse au quiz avec gestion des cœurs
  const handleSelectOption = (option: string) => {
    if (answeredState === "correct" || health <= 0) return; // Déjà validé ou Game Over
    setSelectedOption(option);

    if (option === currentQuestion.correctAnswer) {
      // Bonne réponse !
      playSound("correct");
      setAnsweredState("correct");

      // Offrir un diamant si c'est la première fois qu'on répond correctement à une question spéciale
      if (currentQuestion.isSpecial && !profile.completedQuizzes.includes(lesson.id)) {
        addDiamonds(1);
        setShowDiamondFeedback(true);
        setTimeout(() => setShowDiamondFeedback(false), 2000);
      }
      
      // Petit confetti local
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });

      // Passer à la question suivante après 1.5s
      setTimeout(() => {
        // Enregistrer si le premier essai était faux pour cette question
        setFirstTryWrongPrevious(firstTryWrongCurrent);
        setFirstTryWrongCurrent(false);
        setWrongAttempts(0);

        if (currentQuestionIdx < lesson.quiz.length - 1) {
          setCurrentQuestionIdx(prev => prev + 1);
          setSelectedOption(null);
          setAnsweredState("idle");
        } else {
          // Fin du quiz !
          handleQuizVictory();
        }
      }, 1500);
    } else {
      // Mauvaise réponse !
      playSound("incorrect");
      setAnsweredState("wrong");
      setShakingOption(option);
      
      // Gestion de la vie (Cœurs)
      const nextWrongAttempts = wrongAttempts + 1;
      setWrongAttempts(nextWrongAttempts);

      // Règle 1 : deux fois faux sur la même question -> perd un demi-cœur (1 unité de vie)
      if (nextWrongAttempts === 2) {
        setHealth(h => Math.max(0, h - 1));
        setWrongAttempts(0); // Réinitialiser pour cette question
      }

      // Règle 2 : faux au premier essai sur deux questions d'affilée -> perd un demi-cœur
      if (nextWrongAttempts === 1) {
        setFirstTryWrongCurrent(true);
        if (firstTryWrongPrevious) {
          setHealth(h => Math.max(0, h - 1));
        }
      }
      
      // Retirer la secousse après 0.5s
      setTimeout(() => {
        setShakingOption(null);
        setHealth(currentHealth => {
          if (currentHealth > 0) {
            setAnsweredState("idle");
          }
          return currentHealth;
        });
      }, 500);
    }
  };

  const handleQuizVictory = () => {
    // Enregistrer le quiz complété et débloquer le badge si c'est la première fois
    const newBadge = completeQuiz(lesson.id, {
      id: lesson.badgeId,
      name: lesson.badgeName,
      emoji: lesson.badgeEmoji
    });

    setGameState("victory");
    playSound("win");

    // Pluie géante de confettis !
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const colorClasses: Record<string, string> = {
    amber: "bg-amber-400 border-amber-600 hover:bg-amber-500 text-amber-950",
    emerald: "bg-emerald-400 border-emerald-600 hover:bg-emerald-500 text-emerald-950",
    rose: "bg-rose-400 border-rose-600 hover:bg-rose-500 text-rose-950",
    indigo: "bg-indigo-400 border-indigo-600 hover:bg-indigo-500 text-indigo-950",
    orange: "bg-orange-400 border-orange-600 hover:bg-orange-500 text-orange-950",
    cyan: "bg-cyan-400 border-cyan-600 hover:bg-cyan-500 text-cyan-950",
    violet: "bg-violet-400 border-violet-600 hover:bg-violet-500 text-violet-950",
    pink: "bg-pink-400 border-pink-600 hover:bg-pink-500 text-pink-950",
  };

  const btnBg = colorClasses[lesson.themeColor] || "bg-sky-400 border-sky-600";

  return (
    <div className="flex-1 flex flex-col p-3 sm:p-6 max-w-4xl mx-auto w-full gap-4 sm:gap-6">
      
      {/* Top Bar navigation */}
      <header className="w-full flex items-center justify-between glass-card p-2.5 sm:p-4 bg-white/90 gap-2">
        <button
          onClick={() => {
            playSound("click");
            stopSpeaking();
            router.push("/dashboard");
          }}
          className="py-2 px-3 sm:py-2.5 sm:px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1 cursor-pointer transition-all border border-slate-200 shrink-0"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Tableau de bord</span>
          <span className="sm:hidden">Retour</span>
        </button>

        <div className="flex items-center gap-1.5 min-w-0">
          <div className="w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
            <img src={`/images/${universeId}.png`} alt="" className="w-full h-full object-contain" />
          </div>
          <h2 className="font-bold text-sm sm:text-lg text-slate-800 truncate">
            <span>{UNIVERSES[universeId]?.name}</span>
            <span className="hidden md:inline"> — Leçon</span>
          </h2>
        </div>

        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full text-xs font-bold text-amber-700 shrink-0">
          <span>🪙 {profile.coins}</span>
        </div>
      </header>

      {/* Zone principale de jeu */}
      <main className="flex-1 flex items-center justify-center min-h-[380px] sm:min-h-[450px]">
        <AnimatePresence mode="wait">
          
          {/* ÉCRAN 1 : LES FLASHCARDS D'APPRENTISSAGE */}
          {gameState === "lesson" && currentCard && (
            <motion.div
              key="lesson-card"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl bg-white rounded-3xl p-4 min-[380px]:p-6 sm:p-10 border-4 border-sky-200 shadow-xl flex flex-col justify-between items-center text-center gap-4 sm:gap-6 relative overflow-hidden min-h-[360px] min-[380px]:min-h-[390px] sm:min-h-[420px]"
            >
              {/* Bulle d'aide sonore pour écouter la leçon */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                <button
                  onClick={() => {
                    speakText(`${currentCard.title}. ${currentCard.text}`);
                    playSound("click");
                  }}
                  className="p-1.5 px-2 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-full border border-purple-200 text-[10px] sm:text-xs font-bold flex items-center gap-1 cursor-pointer"
                  title="Écouter la leçon"
                >
                  🔊 Lire
                </button>
              </div>

              {/* Progress dots */}
              <div className="flex gap-2">
                {lesson.cards.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2.5 w-2.5 sm:h-3.5 rounded-full transition-all duration-300 ${
                      idx === currentCardIdx ? "w-6 sm:w-8 bg-sky-500" : "w-2.5 sm:w-3.5 bg-slate-100 border border-slate-200"
                    }`}
                  />
                ))}
              </div>

              {/* Illustration de la carte */}
              <motion.div
                animate={currentCard.mediaUrl ? undefined : { y: [0, -6, 0] }}
                transition={currentCard.mediaUrl ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className={`flex items-center justify-center select-none overflow-hidden ${
                  currentCard.mediaUrl
                    ? "w-full max-w-[280px] aspect-video rounded-2xl border-4 border-sky-100 bg-black/5"
                    : "p-2 sm:p-3 bg-sky-50/50 rounded-full border-2 border-dashed border-sky-100 w-28 h-28 min-[380px]:w-36 min-[380px]:h-36 sm:w-44 sm:h-44"
                }`}
              >
                {currentCard.mediaUrl ? (
                  currentCard.mediaType === "video" ? (
                    <video
                      key={currentCard.mediaUrl}
                      src={currentCard.mediaUrl}
                      className="w-full h-full object-cover rounded-xl"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={currentCard.mediaUrl}
                      alt=""
                      className="w-full h-full object-cover rounded-xl"
                    />
                  )
                ) : (
                  <IllustrationRenderer name={currentCard.emoji} size="75%" />
                )}
              </motion.div>

              {/* Textes explicatifs */}
              <div className="flex flex-col gap-2 sm:gap-3">
                <h3 className="text-xl sm:text-3xl font-bold text-slate-800">
                  {formatFrenchPunctuation(currentCard.title)}
                </h3>
                <p className="text-sm sm:text-lg font-medium text-slate-600 leading-relaxed max-w-lg">
                  {formatFrenchPunctuation(currentCard.text).split("**").map((part, index) => 
                    index % 2 === 1 ? (
                      <strong key={index} className="font-bold text-indigo-800">
                        {part}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              </div>

              {/* Barre de navigation bas */}
              <div className="w-full flex justify-between gap-4 mt-2 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100">
                <button
                  onClick={handlePrevCard}
                  disabled={currentCardIdx === 0}
                  className={`py-2 px-4 sm:py-3 sm:px-6 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1 ${
                    currentCardIdx === 0
                      ? "bg-slate-100 text-slate-300 border border-slate-200 cursor-not-allowed"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer border border-slate-200"
                  }`}
                >
                  <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
                  Précédent
                </button>

                <button
                  onClick={handleNextCard}
                  className={`py-2 px-5 sm:py-3 sm:px-8 rounded-2xl text-white text-sm sm:text-base font-black shadow-md border-b-4 transition-all btn-bubble cursor-pointer flex items-center gap-1.5 ${btnBg}`}
                >
                  <span>
                    {currentCardIdx === lesson.cards.length - 1 ? "Valider & Quiz ! 🚀" : "Suivant"}
                  </span>
                  {currentCardIdx < lesson.cards.length - 1 && <ArrowRight size={14} className="sm:w-4 sm:h-4" />}
                </button>
              </div>
            </motion.div>
          )}

          {/* ÉCRAN 2 : LE QUIZ INTERACTIF */}
          {gameState === "quiz" && health > 0 && currentQuestion && (
            <motion.div
              key="quiz-card"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-xl bg-white rounded-3xl p-4 min-[380px]:p-5 sm:p-8 border-4 border-purple-200 shadow-xl flex flex-col justify-between items-center gap-4 sm:gap-6 relative min-h-[360px] min-[380px]:min-h-[390px] sm:min-h-[420px]"
            >
              {/* Info question */}
              <div className="w-full flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                <span>Quiz Défi ⚡</span>
                <span className="text-purple-600">Question {currentQuestionIdx + 1} sur {lesson.quiz.length}</span>
              </div>

              {/* Progress bar du quiz */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-100">
                <div
                  className="bg-purple-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIdx + 1) / lesson.quiz.length) * 100}%` }}
                />
              </div>

              {/* Barre de vie (Cœurs style Minecraft) */}
              <div className="w-full flex justify-center gap-1.5 my-1 bg-rose-50/50 py-1.5 px-3 rounded-2xl border border-rose-100/50">
                {[...Array(5)].map((_, i) => {
                  const heartVal = i * 2;
                  let type: "full" | "half" | "empty" = "empty";
                  if (health >= heartVal + 2) {
                    type = "full";
                  } else if (health === heartVal + 1) {
                    type = "half";
                  }
                  
                  return (
                    <motion.svg
                      key={i}
                      animate={type === "full" && answeredState === "wrong" ? { scale: [1, 1.2, 0.9, 1.1, 1] } : {}}
                      transition={{ duration: 0.5 }}
                      className={`w-6 h-6 ${type === "empty" ? "text-slate-200" : "text-rose-500"} fill-current drop-shadow-sm`}
                      viewBox="0 0 24 24"
                    >
                      {type === "full" && (
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      )}
                      {type === "half" && (
                        <>
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09V18.5l-1.45 1.53z" />
                          <path d="M12 5.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35V5.09z" fill="#E2E8F0" />
                        </>
                      )}
                      {type === "empty" && (
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      )}
                    </motion.svg>
                  );
                })}
              </div>

              {/* Intitulé de la question */}
              <div className="text-center flex flex-col items-center gap-1.5 sm:gap-2 my-2 sm:my-4 w-full">
                {currentQuestion.mediaUrl ? (
                  <div className="w-full max-w-[260px] aspect-video rounded-2xl border-4 border-purple-100 bg-black/5 overflow-hidden mb-2 shadow-inner">
                    {currentQuestion.mediaType === "video" ? (
                      <video
                        key={currentQuestion.mediaUrl}
                        src={currentQuestion.mediaUrl}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={currentQuestion.mediaUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ) : (
                  <span className="text-3xl sm:text-4xl animate-bounce">{lesson.emoji || "🤔"}</span>
                )}
                <h3 className="text-lg sm:text-2xl font-bold text-slate-800 leading-snug px-2 sm:px-4">
                  {formatFrenchPunctuation(currentQuestion.question)}
                </h3>
              </div>

              {/* Boutons d'options */}
              <div className="w-full flex flex-col gap-2.5 sm:gap-3">
                {shuffledOptions.map((option) => {
                  const isSelected = selectedOption === option;
                  const isCorrect = option === currentQuestion.correctAnswer;
                  const isWrong = isSelected && !isCorrect;
                  const isShaking = shakingOption === option;

                  let cardStyle = "border-slate-100 hover:border-slate-300 bg-slate-50 text-slate-700 active:bg-slate-100";
                  
                  if (isSelected) {
                    if (isCorrect) {
                      cardStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-400";
                    } else if (isWrong) {
                      cardStyle = "border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-400";
                    }
                  }

                  return (
                    <motion.button
                      key={option}
                      onClick={() => handleSelectOption(option)}
                      className={`w-full py-3 px-4 sm:py-4 sm:px-6 rounded-xl sm:rounded-2xl border-4 text-center text-sm sm:text-lg font-black transition-all cursor-pointer shadow-sm relative flex items-center justify-center gap-2 ${cardStyle} ${
                        isShaking ? "animate-wiggle" : ""
                      }`}
                      animate={isShaking ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      {formatFrenchPunctuation(option)}
                      {isSelected && isCorrect && <CheckCircle2 size={18} className="text-emerald-600 absolute right-3 sm:right-4 sm:w-5 sm:h-5" />}
                      {isSelected && isWrong && <AlertCircle size={18} className="text-rose-600 absolute right-3 sm:right-4 sm:w-5 sm:h-5" />}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ÉCRAN 2.5 : GAME OVER (PLUS DE VIE) */}
          {gameState === "quiz" && health === 0 && (
            <motion.div
              key="game-over-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 border-4 border-rose-300 shadow-xl flex flex-col justify-center items-center text-center gap-4 sm:gap-6 min-h-[360px]"
            >
              <span className="text-6xl animate-bounce">💔</span>
              <h3 className="text-2xl sm:text-3xl font-black text-rose-950">Oups, plus de cœurs !</h3>
              <p className="text-sm sm:text-base font-bold text-slate-600 leading-relaxed max-w-md">
                Tu as perdu tous tes cœurs sur ce quiz. Pas de panique ! Prends ton temps, relis bien les leçons si besoin, et réessaie pour débloquer ton badge ! 💪🌟
              </p>
              
              <button
                onClick={() => {
                  playSound("click");
                  setHealth(10);
                  setCurrentQuestionIdx(0);
                  setSelectedOption(null);
                  setAnsweredState("idle");
                  setWrongAttempts(0);
                  setFirstTryWrongCurrent(false);
                  setFirstTryWrongPrevious(false);
                  const firstQ = lesson.quiz[0];
                  if (firstQ) {
                    const optionsCopy = [...firstQ.options];
                    for (let i = optionsCopy.length - 1; i > 0; i--) {
                      const j = Math.floor(Math.random() * (i + 1));
                      [optionsCopy[i], optionsCopy[j]] = [optionsCopy[j], optionsCopy[i]];
                    }
                    setShuffledOptions(optionsCopy);
                  }
                }}
                className="py-3 px-8 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white text-base sm:text-lg font-black shadow-md border-b-4 border-rose-700 transition-all cursor-pointer btn-bubble"
              >
                Réessayer le Quiz 🔁
              </button>
            </motion.div>
          )}

          {/* ÉCRAN 3 : VICTOIRE & BADGE DÉBLOQUÉ */}
          {gameState === "victory" && (
            <motion.div
              key="victory-card"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-md bg-white rounded-3xl p-5 sm:p-8 border-4 border-yellow-300 shadow-2xl flex flex-col items-center text-center gap-4 sm:gap-6 relative overflow-hidden"
            >
              {/* Effet paillettes */}
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-yellow-100 rounded-full blur-xl" />
              <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-emerald-100 rounded-full blur-xl" />

              <span className="text-5xl sm:text-6xl animate-bounce">🏆</span>
              <h2 className="text-2xl sm:text-3xl font-black text-indigo-900 leading-none">Félicitations !</h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-500">
                Tu as répondu correctement à toutes les questions ! Tu es un super explorateur.
              </p>

              {/* Badge débloqué */}
              <div className="my-2 sm:my-4 flex flex-col items-center gap-2 bg-gradient-to-br from-amber-50 to-orange-50/50 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 border-amber-200 shadow-inner w-full">
                <span className="text-[10px] sm:text-xs font-black text-amber-700 uppercase tracking-widest">Nouveau badge débloqué !</span>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
                  className="w-16 h-16 min-[380px]:w-20 min-[380px]:h-20 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 border-4 border-white flex items-center justify-center shadow-lg ring-4 ring-amber-400/20"
                >
                  <IllustrationRenderer name={lesson.badgeEmoji} size="60%" animate={false} />
                </motion.div>
                <span className="font-black text-indigo-900 text-base sm:text-lg">{lesson.badgeName}</span>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 capitalize">Univers : {UNIVERSES[universeId]?.name}</span>
              </div>

              {/* Récompenses en chiffres */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
                <div className="bg-emerald-50 rounded-2xl p-2.5 sm:p-3 border border-emerald-100 text-emerald-800">
                  <span className="block text-xl sm:text-2xl font-black">+35 🌟</span>
                  <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-500">Points d'XP</span>
                </div>
                <div className="bg-amber-50 rounded-2xl p-2.5 sm:p-3 border border-amber-100 text-amber-800">
                  <span className="block text-xl sm:text-2xl font-black">+10 🪙</span>
                  <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-500">Pièces d'or</span>
                </div>
              </div>

              <button
                onClick={() => {
                  playSound("click");
                  router.push("/dashboard");
                }}
                className="w-full py-3 sm:py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-base sm:text-lg font-black transition-all shadow-md btn-bubble border-b-4 border-emerald-700 mt-1 sm:mt-2 cursor-pointer"
              >
                Retourner au tableau de bord 🌳
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Pop-up d'obtention de diamant rare */}
      <AnimatePresence>
        {showDiamondFeedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1.2, y: -40 }}
            exit={{ opacity: 0, scale: 0.8, y: -100 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center flex-col gap-2"
          >
            <div className="bg-gradient-to-r from-cyan-400 to-indigo-500 text-white font-black px-6 py-4 rounded-3xl shadow-2xl border-4 border-white flex flex-col items-center gap-2 scale-110">
              <span className="text-6xl animate-bounce">💎</span>
              <span className="text-lg sm:text-xl uppercase tracking-wider">Diamant Rare !</span>
              <span className="text-xs font-semibold text-cyan-100">Super récompense obtenue ! ✨</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
