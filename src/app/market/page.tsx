"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { AvatarRenderer } from "@/components/Avatar/AvatarRenderer";
import { playSound } from "@/lib/sound";
import { ArrowLeft, Coins, Sparkles, ShoppingBag, Landmark } from "lucide-react";

// Tarifs rééquilibrés en fonction de la rareté
const ACCESSORIES_ITEMS = [
  { id: "glasses", name: "Super Lunettes", emoji: "👓", price: 10, desc: "Pour avoir l'air d'un petit génie !", rarity: "Commun" },
  { id: "bow-tie", name: "Nœud Papillon Funky", emoji: "🎀", price: 15, desc: "Un style très élégant pour briller !", rarity: "Commun" },
  { id: "headphones", name: "Casque Funky", emoji: "🎧", price: 25, desc: "Pour écouter des rythmes entraînants !", rarity: "Rare" },
  { id: "balloon", name: "Ballon Volant", emoji: "🎈", price: 35, desc: "Un ballon magique qui flotte toujours !", rarity: "Rare" },
  { id: "magic-hat", name: "Chapeau de Magicien", emoji: "🎩", price: 50, desc: "Pour faire apparaître des étoiles !", rarity: "Épique" },
  { id: "wand", name: "Baguette Magique", emoji: "🪄", price: 60, desc: "Pour lancer des sorts magiques !", rarity: "Épique" },
  { id: "shield", name: "Bouclier de Chevalier", emoji: "🛡️", price: 75, desc: "Pour te protéger durant tes aventures !", rarity: "Légendaire" },
  { id: "crown", name: "Couronne Royale", emoji: "👑", price: 100, desc: "Pour régner sur le royaume du savoir !", rarity: "Légendaire" },
  { id: "super-cape", name: "Cape Héroïque", emoji: "🦸‍♂️", price: 180, desc: "Pour s'envoler vers la réussite !", rarity: "Mythique" },
] as const;

// Les compagnons achetables avec les diamants (s'affichent à côté de l'avatar)
const PETS_ITEMS = [
  { id: "fox", name: "Renardeau Rusé", emoji: "🦊", price: 3, desc: "Un petit renard joueur à tes côtés !", rarity: "Épique" },
  { id: "cat", name: "Chaton Mignon", emoji: "🐱", price: 5, desc: "Un petit chat tout doux qui ronronne !", rarity: "Légendaire" },
  { id: "koala", name: "Koala Câlin", emoji: "🐨", price: 5, desc: "Un koala farceur qui adore les câlins !", rarity: "Légendaire" },
  { id: "panda", name: "Panda Gourmand", emoji: "🐼", price: 6, desc: "Un panda farceur joueur et rigolo !", rarity: "Épique" },
  { id: "unicorn", name: "Licorne Féérique", emoji: "🦄", price: 8, desc: "Une licorne magique avec une corne brillante !", rarity: "Légendaire" },
  { id: "dragon", name: "Dragonneau Vert", emoji: "🐲", price: 10, desc: "Un bébé dragon crachant des paillettes !", rarity: "Mythique" },
  { id: "lion", name: "Lionceau Courageux", emoji: "🦁", price: 12, desc: "Un petit lionceau fort et audacieux !", rarity: "Mythique" },
] as const;

// Les animaux d'arbre (se posent dans l'arbre du savoir au dashboard)
const TREE_ANIMALS_ITEMS = [
  { id: "tree-butterfly", name: "Papillon Monarque", emoji: "🦋", price: 2, desc: "Un papillon rare volant de branche en branche !", rarity: "Rare" },
  { id: "tree-squirrel", name: "Écureuil Espiègle", emoji: "🐿️", price: 3, desc: "Un petit écureuil grimpant sur le tronc !", rarity: "Épique" },
  { id: "tree-owl", name: "Chouette Dorée", emoji: "🦉", price: 4, desc: "Une chouette nichant dans le creux des branches !", rarity: "Légendaire" },
  { id: "tree-parrot", name: "Perroquet Arc-en-ciel", emoji: "🦜", price: 5, desc: "Un perroquet bavard perché au sommet !", rarity: "Mythique" },
] as const;

export default function Market() {
  const router = useRouter();
  const {
    profile,
    buyAccessory,
    buyPet,
    buyTreeAnimal,
    equipAccessory,
    equipPet,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"accessories" | "pets" | "treeAnimals">("accessories");
  const [successAnimItem, setSuccessAnimItem] = useState<string | null>(null);
  
  // Barnabé le marchand dialogue
  const [dialogue, setDialogue] = useState("Bienvenue dans mon échoppe de l'aventurier ! Que veux-tu échanger aujourd'hui ? 🎒");

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
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.6);

      index = (index + 1) % melody.length;
      setTimeout(playNextNote, 380); // Tempo régulier
    };

    const startTimeout = setTimeout(playNextNote, 500);

    return () => {
      active = false;
      clearTimeout(startTimeout);
      ctx.close();
    };
  }, [profile?.soundEnabled]);

  if (!profile) return null;

  // Récupérer le tableau des animaux d'arbre débloqués en toute sécurité
  const unlockedTreeAnimals = profile.unlockedTreeAnimals || [];

  const handlePurchaseAccessory = (item: typeof ACCESSORIES_ITEMS[number]) => {
    const success = buyAccessory(item.id, item.price);
    if (success) {
      playSound("levelup");
      setSuccessAnimItem(item.id);
      setDialogue(`Merveilleux ! Ces ${item.name} sont maintenant à toi. Prends-en bien soin ! ✨`);
      setTimeout(() => {
        setSuccessAnimItem(null);
        setDialogue(`Bienvenue dans mon échoppe de l'aventurier ! Que veux-tu échanger aujourd'hui ? 🎒`);
      }, 2500);
    } else {
      playSound("incorrect");
      setDialogue(`Oh, il te manque un peu d'or pour t'acheter cela... Va lire des leçons ! 🪙`);
    }
  };

  const handlePurchasePet = (item: typeof PETS_ITEMS[number]) => {
    const success = buyPet(item.id, item.price);
    if (success) {
      playSound("levelup");
      setSuccessAnimItem(item.id);
      setDialogue(`Oh, quelle joie ! Ce mignon compagnon ${item.name} va te suivre partout ! 🦊❤️`);
      setTimeout(() => {
        setSuccessAnimItem(null);
        setDialogue(`Bienvenue dans mon échoppe de l'aventurier ! Que veux-tu échanger aujourd'hui ? 🎒`);
      }, 2500);
    } else {
      playSound("incorrect");
      setDialogue(`Oups, les compagnons coûtent des diamants rares ! Finis des quiz sans faute pour en gagner ! 💎`);
    }
  };

  const handlePurchaseTreeAnimal = (item: typeof TREE_ANIMALS_ITEMS[number]) => {
    const success = buyTreeAnimal(item.id, item.price);
    if (success) {
      playSound("levelup");
      setSuccessAnimItem(item.id);
      setDialogue(`Parfait ! Ce bel animal ${item.name} habite désormais sur ton Arbre du Savoir ! 🌳🐦`);
      setTimeout(() => {
        setSuccessAnimItem(null);
        setDialogue(`Bienvenue dans mon échoppe de l'aventurier ! Que veux-tu échanger aujourd'hui ? 🎒`);
      }, 2500);
    } else {
      playSound("incorrect");
      setDialogue(`Oh, il te manque des diamants... Les animaux rares adorent les brillants ! 💎`);
    }
  };

  // Modifier le dialogue quand l'enfant survole un objet
  const handleHoverItem = (item: { name: string; id: string }, type: "acc" | "pet" | "tree") => {
    if (type === "acc") {
      switch (item.id) {
        case "glasses": setDialogue("Ces lunettes appartenaient à un hibou philosophe... Elles te donneront l'air très savant ! 👓"); break;
        case "bow-tie": setDialogue("Un joli nœud papillon rouge et élégant pour faire la fête au village des explorateurs ! 🎀"); break;
        case "headphones": setDialogue("Ce casque joue des rythmes entraînants et t'aide à te concentrer pendant tes leçons ! 🎧"); break;
        case "balloon": setDialogue("Un ballon magique rempli d'air chaud qui flotte doucement au-dessus de ta tête ! 🎈"); break;
        case "magic-hat": setDialogue("Le chapeau d'un vieux sorcier... attention, des étoiles dorées s'en échappent parfois ! 🎩"); break;
        case "wand": setDialogue("Une authentique baguette magique en bois de chêne. Réponds juste et dis Abracadabra ! 🪄"); break;
        case "shield": setDialogue("Un bouclier de chevalier légendaire pour parer toutes les questions difficiles ! 🛡️"); break;
        case "crown": setDialogue("La couronne en or massif réservée aux rois et reines du quiz d'ExploraKids. 👑"); break;
        case "super-cape": setDialogue("La cape rouge des super-héros. Elle vole derrière toi quand tu cours ! 🦸‍♂️"); break;
        default: setDialogue(`Les ${item.name} sont parfaits pour un jeune aventurier comme toi !`);
      }
    } else if (type === "pet") {
      switch (item.id) {
        case "fox": setDialogue("Ce renardeau adore courir dans les feuilles. Il jouera avec toi à chaque cours ! 🦊"); break;
        case "cat": setDialogue("Un petit chaton si doux ! Il ronronne doucement quand tu réponds correctement. 🐱"); break;
        case "koala": setDialogue("Un koala tout calme accroché à ton épaule. Ne le réveille pas quand il dort ! 🐨"); break;
        case "panda": setDialogue("Un petit bébé panda qui adore les roulades et grignoter du bambou ! 🐼"); break;
        case "unicorn": setDialogue("Une licorne magique avec une crinière arc-en-ciel qui brille dans le noir ! 🦄"); break;
        case "dragon": setDialogue("Un bébé dragon domestique. Pas d'inquiétude, il ne crache que des paillettes de joie ! 🐲"); break;
        case "lion": setDialogue("Un bébé lionceau très courageux pour rugir de fierté à chaque niveau passé ! 🦁"); break;
      }
    } else {
      switch (item.id) {
        case "tree-butterfly": setDialogue("Un rare papillon Monarque aux ailes scintillantes qui viendra se poser sur l'arbre. 🦋"); break;
        case "tree-squirrel": setDialogue("Un écureuil marron espiègle qui court le long du tronc pour cacher ses noisettes. 🐿️"); break;
        case "tree-owl": setDialogue("Une chouette dorée qui veille sagement sur tes badges au creux des branches. 🦉"); break;
        case "tree-parrot": setDialogue("Un perroquet multicolore chantant des chansons exotiques perché au sommet ! 🦜"); break;
      }
    }
  };

  const rarityColors: Record<string, string> = {
    Commun: "text-stone-300 bg-stone-900/60 border-stone-800",
    Rare: "text-blue-300 bg-blue-950/60 border-blue-900",
    Épique: "text-purple-300 bg-purple-950/60 border-purple-900",
    Légendaire: "text-amber-300 bg-amber-950/60 border-amber-900 animate-pulse",
    Mythique: "text-rose-300 bg-rose-950/60 border-rose-900 font-extrabold animate-bounce",
  };

  return (
    <div className="flex-1 flex flex-col p-3 sm:p-6 max-w-4xl mx-auto w-full gap-4 sm:gap-6 min-h-screen bg-gradient-to-b from-stone-900 via-amber-950 to-stone-900 text-stone-100">
      
      {/* Barre supérieure style taverne */}
      <header className="w-full flex items-center justify-between glass-card p-3 sm:p-4 bg-amber-900/10 border-b-4 border-amber-800 shadow-md">
        <button
          onClick={() => {
            playSound("click");
            router.push("/dashboard");
          }}
          className="py-2 px-3 sm:py-2.5 sm:px-4 rounded-2xl bg-amber-950 hover:bg-amber-900 text-amber-100 font-bold text-xs sm:text-sm flex items-center gap-1 cursor-pointer transition-all border-b-4 border-amber-800"
        >
          <ArrowLeft size={16} />
          <span>Retour</span>
        </button>

        <h2 className="font-black text-base sm:text-2xl text-amber-100 flex items-center gap-1.5 select-none">
          <span>Échoppe Médiévale 🏰</span>
        </h2>

        {/* Portefeuille */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-amber-950 border-2 border-amber-800 px-3 py-1 rounded-full text-xs font-black text-amber-200 shadow-inner">
            <span>🪙 {profile.coins}</span>
          </div>
          <div className="flex items-center gap-1 bg-cyan-950 border-2 border-cyan-800 px-3 py-1 rounded-full text-xs font-black text-cyan-200 shadow-inner">
            <span>💎 {profile.diamonds}</span>
          </div>
        </div>
      </header>

      {/* Grid principale */}
      <main className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-start">
        
        {/* Colonne gauche (Commerçant & Cabine) */}
        <section className="md:col-span-4 flex flex-col gap-4">
          
          {/* Barnabé l'Ours Marchand */}
          <div className="flex flex-col gap-3 bg-amber-900/10 border-4 border-amber-800/40 p-4 rounded-3xl relative">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0] 
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-5xl sm:text-6xl shrink-0 select-none filter drop-shadow-md"
              >
                🐻
              </motion.div>
              
              <div className="bg-amber-950 border border-amber-800 text-stone-100 p-3 rounded-2xl rounded-tl-none text-xs sm:text-sm font-bold relative shadow-md leading-relaxed flex-1">
                {/* Flèche bulle */}
                <div className="absolute top-[8px] left-[-8px] w-0 h-0 border-t-6 border-t-transparent border-r-8 border-r-amber-950 border-b-6 border-b-transparent" />
                <span className="text-amber-300 font-black block text-[9px] uppercase tracking-wider mb-0.5">Barnabé :</span>
                {dialogue}
              </div>
            </div>
          </div>

          {/* Cabine d'essayage */}
          <div className="glass-card p-4 sm:p-5 bg-amber-950/20 text-center flex flex-col items-center gap-4 border-4 border-amber-800/40">
            <span className="text-xs font-black text-amber-200 uppercase tracking-widest bg-amber-950 border border-amber-850 px-3 py-0.5 rounded-full">
              Cabine d'essayage 👕
            </span>

            {/* Zone de preview avec l'avatar et son compagnon */}
            <div className="w-full aspect-square rounded-3xl bg-gradient-to-b from-stone-900 via-amber-950 to-stone-900 border-4 border-amber-800 flex items-center justify-center relative overflow-hidden shadow-inner max-w-[200px] mx-auto">
              {/* Le compagnon équipé à gauche de l'avatar */}
              {profile.activePet && profile.activePet !== "none" && (
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-5 left-2 text-4xl select-none z-10 filter drop-shadow-md"
                >
                  {profile.activePet === "fox" && "🦊"}
                  {profile.activePet === "cat" && "🐱"}
                  {profile.activePet === "koala" && "🐨"}
                  {profile.activePet === "panda" && "🐼"}
                  {profile.activePet === "unicorn" && "🦄"}
                  {profile.activePet === "dragon" && "🐲"}
                  {profile.activePet === "lion" && "🦁"}
                </motion.div>
              )}

              {/* L'avatar principal */}
              <div className="z-0">
                <AvatarRenderer config={profile.avatar} size={100} interactive={true} />
              </div>

              {/* Sol en herbe sombre */}
              <div className="absolute bottom-0 left-0 right-0 h-7 bg-emerald-950 border-t-2 border-emerald-900" />
            </div>

            <div className="flex flex-col gap-1 w-full text-center">
              <h3 className="font-extrabold text-amber-100 text-base capitalize">{profile.nickname}</h3>
              <p className="text-[10px] font-bold text-stone-400 leading-snug">
                Clique sur tes objets débloqués pour les équiper !
              </p>
            </div>

            {/* Boutons de déséquipement rapide */}
            <div className="grid grid-cols-2 gap-2 w-full mt-1">
              <button
                onClick={() => {
                  equipAccessory("none");
                  playSound("click");
                  setDialogue("Hop ! Te voilà débarrassé de ton accessoire. 👍");
                }}
                disabled={profile.avatar.accessory === "none"}
                className="py-1.5 px-2 text-[9px] font-black rounded-xl border border-amber-800 bg-amber-950 hover:bg-amber-900 text-amber-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                Retirer Chapeau
              </button>
              <button
                onClick={() => {
                  equipPet("none");
                  playSound("click");
                  setDialogue("Ton compagnon est allé se reposer au chaud. 💤");
                }}
                disabled={profile.activePet === "none"}
                className="py-1.5 px-2 text-[9px] font-black rounded-xl border border-amber-800 bg-amber-950 hover:bg-amber-900 text-amber-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                Retirer Compagnon
              </button>
            </div>
          </div>
        </section>

        {/* Colonne droite (Shelves des boutiques) */}
        <section className="md:col-span-8 flex flex-col gap-4">
          <div className="glass-card p-4 sm:p-5 bg-stone-900/60 border-4 border-amber-800/40">
            
            {/* Onglets boutiques médiévales */}
            <div className="flex border-b border-amber-900/30 pb-3 mb-4 gap-2 overflow-x-auto">
              <button
                onClick={() => {
                  playSound("click");
                  setActiveTab("accessories");
                  setDialogue("Voici mes équipements spéciaux pour ton avatar. L'or 🪙 fait l'affaire ici !");
                }}
                className={`py-2 px-3.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                  activeTab === "accessories"
                    ? "bg-amber-600 text-amber-950 shadow-md scale-105 border-b-4 border-amber-800"
                    : "bg-amber-950/40 border border-amber-900/20 text-stone-400 hover:text-stone-200 hover:bg-amber-950/60"
                }`}
              >
                <ShoppingBag size={13} />
                <span>Équipements (Or 🪙)</span>
              </button>

              <button
                onClick={() => {
                  playSound("click");
                  setActiveTab("pets");
                  setDialogue("Les compagnons mignons ! Ils demandent des diamants rares 💎, la monnaie des grands explorateurs !");
                }}
                className={`py-2 px-3.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                  activeTab === "pets"
                    ? "bg-cyan-600 text-cyan-950 shadow-md scale-105 border-b-4 border-cyan-800"
                    : "bg-amber-950/40 border border-amber-900/20 text-stone-400 hover:text-stone-200 hover:bg-amber-950/60"
                }`}
              >
                <Sparkles size={13} />
                <span>Compagnons (Diamants 💎)</span>
              </button>

              <button
                onClick={() => {
                  playSound("click");
                  setActiveTab("treeAnimals");
                  setDialogue("Tu veux décorer ton arbre ? Ces animaux magiques 🦋🐿️ viendront s'installer de façon permanente sur ton Arbre du Savoir !");
                }}
                className={`py-2 px-3.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                  activeTab === "treeAnimals"
                    ? "bg-emerald-600 text-emerald-950 shadow-md scale-105 border-b-4 border-emerald-800"
                    : "bg-amber-950/40 border border-amber-900/20 text-stone-400 hover:text-stone-200 hover:bg-amber-950/60"
                }`}
              >
                <Landmark size={13} />
                <span>Animaux d'Arbre (Diamants 💎)</span>
              </button>
            </div>

            {/* Contenu actif style étagère en bois */}
            <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto pr-1">
              <AnimatePresence mode="wait">
                
                {/* 1. SHOP ÉQUIPEMENTS */}
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
                          onMouseEnter={() => handleHoverItem(item, "acc")}
                          className={`flex items-center justify-between p-2.5 rounded-2xl border-2 transition-all relative ${
                            isEquipped
                              ? "border-emerald-700 bg-emerald-950/30"
                              : isUnlocked
                              ? "border-amber-800/40 bg-amber-950/15"
                              : "border-stone-800 bg-stone-950/10"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl p-2 bg-amber-950/60 rounded-xl shadow-md border border-amber-800/40 select-none">
                              {item.emoji}
                            </span>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1.5">
                                <span className="font-extrabold text-xs sm:text-sm text-stone-200">{item.name}</span>
                                <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full border ${rarityColors[item.rarity]}`}>
                                  {item.rarity}
                                </span>
                              </div>
                              <span className="text-[9px] sm:text-xs text-stone-400 leading-tight mt-0.5">{item.desc}</span>
                            </div>
                          </div>

                          {isEquipped ? (
                            <span className="text-[9px] font-black text-emerald-400 px-2.5 py-1 bg-emerald-950/80 rounded-full border border-emerald-800">
                              Porté !
                            </span>
                          ) : isUnlocked ? (
                            <button
                              onClick={() => {
                                equipAccessory(item.id);
                                playSound("click");
                                setDialogue(`Parfait ! Tu portes fièrement ton ${item.name} ! ✨`);
                              }}
                              className="px-2.5 py-1.5 text-[10px] font-black bg-amber-700 hover:bg-amber-600 text-stone-100 rounded-xl shadow cursor-pointer transition-colors border-b-2 border-amber-900"
                            >
                              Porter
                            </button>
                          ) : (
                            <button
                              onClick={() => handlePurchaseAccessory(item)}
                              disabled={!canBuy}
                              className={`px-2.5 py-1.5 rounded-xl text-[10px] font-black shadow transition-all flex items-center gap-1 cursor-pointer ${
                                canBuy
                                  ? "bg-amber-500 hover:bg-amber-400 text-amber-950 border-b-2 border-amber-700"
                                  : "bg-stone-800 text-stone-500 cursor-not-allowed shadow-none"
                              }`}
                            >
                              <span>Acheter {item.price}</span>
                              <Coins size={11} className="text-amber-800" />
                            </button>
                          )}

                          {isWinning && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1.1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-emerald-600/90 rounded-2xl flex items-center justify-center text-white font-black text-xs gap-1.5 z-10"
                            >
                              <span>✨ Achat Réussi ! ✨</span>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </motion.div>
                )}

                {/* 2. SHOP COMPAGNONS */}
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
                          onMouseEnter={() => handleHoverItem(item, "pet")}
                          className={`flex items-center justify-between p-2.5 rounded-2xl border-2 transition-all relative ${
                            isEquipped
                              ? "border-emerald-700 bg-emerald-950/30"
                              : isUnlocked
                              ? "border-cyan-800/40 bg-cyan-950/15"
                              : "border-stone-800 bg-stone-950/10"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl p-2 bg-amber-950/60 rounded-xl shadow-md border border-amber-800/40 select-none">
                              {item.emoji}
                            </span>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1.5">
                                <span className="font-extrabold text-xs sm:text-sm text-stone-200">{item.name}</span>
                                <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full border ${rarityColors[item.rarity]}`}>
                                  {item.rarity}
                                </span>
                              </div>
                              <span className="text-[9px] sm:text-xs text-stone-400 leading-tight mt-0.5">{item.desc}</span>
                            </div>
                          </div>

                          {isEquipped ? (
                            <span className="text-[9px] font-black text-emerald-400 px-2.5 py-1 bg-emerald-950/80 rounded-full border border-emerald-800">
                              Équipé !
                            </span>
                          ) : isUnlocked ? (
                            <button
                              onClick={() => {
                                equipPet(item.id);
                                playSound("click");
                                setDialogue(`Tu es accompagné de ton mignon ${item.name} ! ❤️`);
                              }}
                              className="px-2.5 py-1.5 text-[10px] font-black bg-cyan-600 hover:bg-cyan-500 text-stone-100 rounded-xl shadow cursor-pointer transition-colors border-b-2 border-cyan-800"
                            >
                              Suivre
                            </button>
                          ) : (
                            <button
                              onClick={() => handlePurchasePet(item)}
                              disabled={!canBuy}
                              className={`px-2.5 py-1.5 rounded-xl text-[10px] font-black shadow transition-all flex items-center gap-1 cursor-pointer ${
                                canBuy
                                  ? "bg-cyan-500 hover:bg-cyan-400 text-cyan-950 border-b-2 border-cyan-700"
                                  : "bg-stone-800 text-stone-500 cursor-not-allowed shadow-none"
                              }`}
                            >
                              <span>Acheter {item.price} 💎</span>
                            </button>
                          )}

                          {isWinning && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1.1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-emerald-600/90 rounded-2xl flex items-center justify-center text-white font-black text-xs gap-1.5 z-10"
                            >
                              <span>✨ Compagnon Adopté ! ✨</span>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </motion.div>
                )}

                {/* 3. SHOP ANIMAUX DE L'ARBRE */}
                {activeTab === "treeAnimals" && (
                  <motion.div
                    key="treeAnimals"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col gap-2.5"
                  >
                    {TREE_ANIMALS_ITEMS.map((item) => {
                      const isUnlocked = unlockedTreeAnimals.includes(item.id);
                      const canBuy = profile.diamonds >= item.price;
                      const isWinning = successAnimItem === item.id;

                      return (
                        <div
                          key={item.id}
                          onMouseEnter={() => handleHoverItem(item, "tree")}
                          className={`flex items-center justify-between p-2.5 rounded-2xl border-2 transition-all relative ${
                            isUnlocked
                              ? "border-emerald-800/40 bg-emerald-950/15"
                              : "border-stone-800 bg-stone-950/10"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl p-2 bg-amber-950/60 rounded-xl shadow-md border border-amber-800/40 select-none">
                              {item.emoji}
                            </span>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1.5">
                                <span className="font-extrabold text-xs sm:text-sm text-stone-200">{item.name}</span>
                                <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full border ${rarityColors[item.rarity]}`}>
                                  {item.rarity}
                                </span>
                              </div>
                              <span className="text-[9px] sm:text-xs text-stone-400 leading-tight mt-0.5">{item.desc}</span>
                            </div>
                          </div>

                          {isUnlocked ? (
                            <span className="text-[9px] font-black text-emerald-400 px-2.5 py-1 bg-emerald-950/80 rounded-full border border-emerald-800">
                              Débloqué ! 🌳
                            </span>
                          ) : (
                            <button
                              onClick={() => handlePurchaseTreeAnimal(item)}
                              disabled={!canBuy}
                              className={`px-2.5 py-1.5 rounded-xl text-[10px] font-black shadow transition-all flex items-center gap-1 cursor-pointer ${
                                canBuy
                                  ? "bg-emerald-600 hover:bg-emerald-500 text-stone-100 border-b-2 border-emerald-800"
                                  : "bg-stone-800 text-stone-500 cursor-not-allowed shadow-none"
                              }`}
                            >
                              <span>Débloquer {item.price} 💎</span>
                            </button>
                          )}

                          {isWinning && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1.1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-emerald-600/90 rounded-2xl flex items-center justify-center text-white font-black text-xs gap-1.5 z-10"
                            >
                              <span>✨ Installé dans l'Arbre ! ✨</span>
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
