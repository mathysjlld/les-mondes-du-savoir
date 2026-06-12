"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { asset } from "@/lib/asset";
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
  { id: "halo", name: "Auréole des Sages", emoji: "😇", price: 2, currency: "crystals", desc: "Une auréole dorée réservée aux maîtres du Temple !", rarity: "Mythique" },
  { id: "sage-star", name: "Étoile du Sage", emoji: "🌟", price: 3, currency: "crystals", desc: "L'emblème lumineux des plus grands explorateurs !", rarity: "Mythique" },
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
  { id: "griffon", name: "Griffon Royal", emoji: "🦅", price: 1, currency: "crystals", desc: "Une créature légendaire du Temple des Sages, mi-aigle mi-lion !", rarity: "Mythique" },
] as const;

// Les animaux d'arbre (se posent dans l'arbre du savoir au dashboard)
const TREE_ANIMALS_ITEMS = [
  { id: "tree-butterfly", name: "Papillon Monarque", emoji: "🦋", price: 2, desc: "Un papillon rare volant de branche en branche !", rarity: "Rare" },
  { id: "tree-squirrel", name: "Écureuil Espiègle", emoji: "🐿️", price: 3, desc: "Un petit écureuil grimpant sur le tronc !", rarity: "Épique" },
  { id: "tree-owl", name: "Chouette Dorée", emoji: "🦉", price: 4, desc: "Une chouette nichant dans le creux des branches !", rarity: "Légendaire" },
  { id: "tree-parrot", name: "Perroquet Arc-en-ciel", emoji: "🦜", price: 5, desc: "Un perroquet bavard perché au sommet !", rarity: "Mythique" },
  { id: "tree-dragon", name: "Dragon Gardien", emoji: "🐉", price: 1, currency: "crystals", desc: "Un dragon légendaire qui veille sur ton Arbre du Savoir !", rarity: "Mythique" },
  { id: "tree-phoenix", name: "Phénix de Feu", emoji: "🔥", price: 2, currency: "crystals", desc: "Un phénix éternel qui illumine ton arbre !", rarity: "Mythique" },
] as const;

function TreePreview({
  stage,
  processedTreeSrc,
  unlockedTreeAnimals,
  activePreviewTreeAnimalId,
}: {
  stage: string;
  processedTreeSrc: string | null;
  unlockedTreeAnimals: string[];
  activePreviewTreeAnimalId: string | null;
}) {
  const treeAnimalsToRender = [
    { id: "tree-butterfly", emoji: "🦋", x: 62, y: 44 },
    { id: "tree-owl", emoji: "🦉", x: 47, y: 34 },
    { id: "tree-squirrel", emoji: "🐿️", x: 28, y: 65 },
    { id: "tree-parrot", emoji: "🦜", x: 74, y: 55 },
  ];

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full select-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Colline d'herbe au sol */}
      <path d="M -10 90 Q 50 82 110 90 L 110 110 L -10 110 Z" fill="#2ECC71" />
      <path d="M -10 92 Q 50 86 110 92 L 110 110 L -10 110 Z" fill="#27AE60" />

      {/* Tree Image */}
      <image
        href={processedTreeSrc || asset(`/images/tree_${stage}.png`)}
        x="12"
        y="10"
        width="76"
        height="76"
        className="select-none pointer-events-none"
        style={processedTreeSrc ? {} : { mixBlendMode: "multiply" }}
      />

      {/* Animals */}
      {treeAnimalsToRender.map((item) => {
        const isUnlocked = unlockedTreeAnimals.includes(item.id);
        const isPreview = item.id === activePreviewTreeAnimalId;
        
        if (!isUnlocked && !isPreview) return null;

        return (
          <motion.g
            key={item.id}
            animate={
              isPreview
                ? { scale: [1, 1.25, 1], rotate: [0, 5, -5, 0] }
                : item.id === "tree-butterfly"
                ? { x: [0, 1.5, -1, 0], y: [0, -2, 1.5, 0], rotate: [0, 8, -8, 0] }
                : item.id === "tree-squirrel"
                ? { y: [0, -1.5, 0] }
                : item.id === "tree-owl"
                ? { scaleY: [1, 1.08, 1], rotate: [0, 1.5, -1.5, 0] }
                : { rotate: [0, -3, 3, 0] } // parrot
            }
            transition={{
              duration: isPreview ? 2 : 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="origin-center"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <text
              x={item.x}
              y={item.y}
              className={`select-none pointer-events-none filter drop-shadow-sm font-sans fill-current`}
              style={{ fontSize: isPreview ? "9px" : "7px" }}
            >
              {item.emoji}
            </text>
            
            {/* Petit indicateur scintillant pour l'aperçu */}
            {isPreview && (
              <circle
                cx={item.x + 3.5}
                cy={item.y - 4.5}
                r="1"
                fill="#F1C40F"
                className="animate-pulse"
              />
            )}
          </motion.g>
        );
      })}
    </svg>
  );
}

export default function Market() {
  const router = useRouter();
  const {
    profile,
    buyAccessory,
    buyPet,
    buyTreeAnimal,
    equipAccessory,
    equipPet,
    getLevel,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"accessories" | "pets" | "treeAnimals">("accessories");
  const [successAnimItem, setSuccessAnimItem] = useState<string | null>(null);
  
  // Barnabé le marchand dialogue
  const [dialogue, setDialogue] = useState("Bienvenue dans mon échoppe de l'aventurier ! Que veux-tu échanger aujourd'hui ? 🎒");

  // États de prévisualisation au survol ou clic (particulièrement utile sur mobile)
  const [hoveredAccessoryId, setHoveredAccessoryId] = useState<string | null>(null);
  const [selectedPreviewAccessoryId, setSelectedPreviewAccessoryId] = useState<string | null>(null);

  const [hoveredPetId, setHoveredPetId] = useState<string | null>(null);
  const [selectedPreviewPetId, setSelectedPreviewPetId] = useState<string | null>(null);

  const [hoveredTreeAnimalId, setHoveredTreeAnimalId] = useState<string | null>(null);
  const [selectedPreviewTreeAnimalId, setSelectedPreviewTreeAnimalId] = useState<string | null>(null);

  // États pour animer le marchand Barnabé
  const [isTalking, setIsTalking] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  // Déclencher le mouvement de la bouche quand Barnabé parle (changement de dialogue)
  useEffect(() => {
    setIsTalking(true);
    const timer = setTimeout(() => {
      setIsTalking(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, [dialogue]);

  // Clignotement périodique des yeux
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Remise à zéro des previews quand on change d'onglet
  useEffect(() => {
    setHoveredAccessoryId(null);
    setSelectedPreviewAccessoryId(null);
    setHoveredPetId(null);
    setSelectedPreviewPetId(null);
    setHoveredTreeAnimalId(null);
    setSelectedPreviewTreeAnimalId(null);
  }, [activeTab]);

  const level = getLevel();
  const getGrowthStage = () => {
    if (level <= 2) return "sprout";   // Niv 1 et 2
    if (level <= 4) return "sapling";  // Niv 3 et 4
    if (level <= 6) return "young";    // Niv 5 et 6
    if (level <= 9) return "mature";   // Niv 7, 8 et 9
    return "magic";                    // Niv 10+
  };
  const stage = getGrowthStage();
  const [processedTreeSrc, setProcessedTreeSrc] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !profile) return;
    const imgSrc = asset(`/images/tree_${stage}.png`);
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const diff = max - min;
          
          if (r > 150 && g > 150 && b > 130 && diff < 80) {
            const rScore = Math.min(1, Math.max(0, (r - 150) / 40));
            const gScore = Math.min(1, Math.max(0, (g - 150) / 40));
            const bScore = Math.min(1, Math.max(0, (b - 130) / 40));
            const diffScore = Math.min(1, Math.max(0, (80 - diff) / 45));
            
            const bgConfidence = rScore * gScore * bScore * diffScore;
            
            if (bgConfidence > 0.8) {
              data[i + 3] = 0;
            } else {
              data[i + 3] = Math.floor(data[i + 3] * (1 - bgConfidence));
            }
          }
        }
        ctx.putImageData(imgData, 0, 0);
        setProcessedTreeSrc(canvas.toDataURL("image/png"));
      }
    };
    img.onerror = () => {
      setProcessedTreeSrc(null);
    };
  }, [stage, profile]);

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

  const unlockedTreeAnimals = profile.unlockedTreeAnimals || [];

  const handlePurchaseAccessory = (item: typeof ACCESSORIES_ITEMS[number]) => {
    const success = buyAccessory(item.id, item.price, (item as { currency?: "coins" | "diamonds" | "crystals" }).currency);
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
    const success = buyPet(item.id, item.price, (item as { currency?: "coins" | "diamonds" | "crystals" }).currency);
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
    const success = buyTreeAnimal(item.id, item.price, (item as { currency?: "coins" | "diamonds" | "crystals" }).currency);
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

  // Modifier le dialogue quand l'enfant survole ou clique sur un objet
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
        case "dragon": setDialogue("Un adorable bébé dragon qui adore le feu et cracher des paillettes ! 🐲"); break;
        case "lion": setDialogue("Un lionceau courageux qui t'accompagnera en poussant des petits rugissements ! 🦁"); break;
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

  // Calcul du rendu de l'avatar avec preview dynamique (hover ou sélection)
  const activePreviewAccessoryId = hoveredAccessoryId || selectedPreviewAccessoryId;
  const activePreviewPetId = hoveredPetId || selectedPreviewPetId;
  const activePreviewTreeAnimalId = hoveredTreeAnimalId || selectedPreviewTreeAnimalId;

  // Un seul accessoire à la fois : l'aperçu montre l'accessoire survolé/sélectionné
  // seul, sinon l'accessoire actuellement équipé (0 ou 1).
  const currentAccessories = profile.avatar.accessories || [];
  const previewAccessories = activePreviewAccessoryId
    ? [activePreviewAccessoryId]
    : [...currentAccessories];

  const previewAvatarConfig = {
    ...profile.avatar,
    accessories: previewAccessories
  };

  const activePetToRender = activePreviewPetId !== null
    ? activePreviewPetId
    : profile.activePet;

  return (
    <div 
      className="flex-1 flex flex-col p-3 sm:p-6 max-w-4xl mx-auto w-full gap-4 sm:gap-6 min-h-screen text-stone-100"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(28, 25, 23, 0.94), rgba(69, 26, 3, 0.89)), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='180' viewBox='0 0 120 180'%3E%3Crect x='0' y='55' width='120' height='6' fill='%235c3a21' opacity='0.25'/%3E%3Crect x='0' y='61' width='120' height='2' fill='%233a2010' opacity='0.4'/%3E%3Crect x='0' y='145' width='120' height='6' fill='%235c3a21' opacity='0.25'/%3E%3Crect x='0' y='151' width='120' height='2' fill='%233a2010' opacity='0.4'/%3E%3Crect x='8' y='0' width='5' height='180' fill='%23422817' opacity='0.2'/%3E%3Crect x='107' y='0' width='5' height='180' fill='%23422817' opacity='0.2'/%3E%3C/svg%3E")`,
        backgroundAttachment: 'fixed'
      }}
    >
      
      {/* Barre supérieure */}
      <header className="w-full flex items-center justify-between gap-2 p-3 sm:p-4 bg-stone-900/90 backdrop-blur-md rounded-2xl border-b-4 border-amber-800 shadow-md">
        <button
          onClick={() => {
            playSound("click");
            router.push("/dashboard");
          }}
          className="shrink-0 py-2 px-3 sm:py-2.5 sm:px-4 rounded-2xl bg-amber-950 hover:bg-amber-900 text-amber-100 font-bold text-xs sm:text-sm flex items-center gap-1 cursor-pointer transition-all border-b-4 border-amber-800"
        >
          <ArrowLeft size={16} />
          <span className="hidden min-[400px]:inline">Retour</span>
        </button>

        <h2 className="flex-1 min-w-0 truncate text-center font-black text-sm sm:text-2xl text-amber-100 select-none">
          <span className="min-[400px]:hidden">Échoppe 🏰</span>
          <span className="hidden min-[400px]:inline">Échoppe Médiévale 🏰</span>
        </h2>

        {/* Portefeuille */}
        <div className="shrink-0 flex items-center gap-1.5 sm:gap-3">
          <div className="flex items-center gap-1 bg-amber-950 border-2 border-amber-800 px-3 py-1 rounded-full text-xs font-black text-amber-200 shadow-inner">
            <span>🪙 {profile.coins}</span>
          </div>
          <div className="flex items-center gap-1 bg-cyan-950 border-2 border-cyan-800 px-3 py-1 rounded-full text-xs font-black text-cyan-200 shadow-inner">
            <span>💎 {profile.diamonds}</span>
          </div>
          {(profile.crystals || 0) > 0 && (
            <div className="flex items-center gap-1 bg-fuchsia-950 border-2 border-fuchsia-800 px-3 py-1 rounded-full text-xs font-black text-fuchsia-200 shadow-inner">
              <span>💠 {profile.crystals}</span>
            </div>
          )}
        </div>
      </header>

      {/* SECTION PREVISUALISATION MOBILE STICKY */}
      <div className="block md:hidden sticky top-[0px] z-30 w-full bg-stone-900/95 backdrop-blur-md border-b-4 border-amber-800 p-2.5 flex flex-col gap-1.5 shadow-lg rounded-2xl mb-2">
        <div className="flex items-center gap-2">
          {/* Marchand Barnabé compact */}
          <div className="flex-1 bg-amber-950/80 border border-amber-800 p-2 rounded-xl flex items-center gap-2 min-w-0">
            <div className="w-10 h-10 shrink-0 select-none">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                <defs>
                  <linearGradient id="bearGradMini" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#A76D3C" />
                    <stop offset="100%" stopColor="#6E3E1A" />
                  </linearGradient>
                  <linearGradient id="snoutGradMini" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFF9E6" />
                    <stop offset="100%" stopColor="#E6DFCE" />
                  </linearGradient>
                </defs>
                <circle cx="30" cy="36" r="8.5" fill="url(#bearGradMini)" />
                <circle cx="30" cy="36" r="5" fill="#FFA3B1" opacity="0.8" />
                <circle cx="70" cy="36" r="8.5" fill="url(#bearGradMini)" />
                <circle cx="70" cy="36" r="5" fill="#FFA3B1" opacity="0.8" />
                <circle cx="50" cy="50" r="20" fill="url(#bearGradMini)" />
                <ellipse cx="42" cy="45" rx="2.5" ry={isBlinking ? 0.2 : 2.5} fill="#2C3E50" />
                <ellipse cx="58" cy="45" rx="2.5" ry={isBlinking ? 0.2 : 2.5} fill="#2C3E50" />
                <ellipse cx="50" cy="54" rx="7.5" ry="5" fill="url(#snoutGradMini)" />
                <polygon points="47,52 53,52 50,54.5" fill="#2C3E50" />
                {isTalking ? (
                  <motion.ellipse
                    cx="50"
                    cy="56.5"
                    rx="2"
                    ry={2}
                    fill="#2C3E50"
                    animate={{ scaleY: [0.2, 1, 0.2] }}
                    transition={{ duration: 0.25, repeat: Infinity, ease: "easeInOut" }}
                    style={{ originX: "50px", originY: "56.5px" }}
                  />
                ) : (
                  <path d="M 47.5 56 Q 50 58 52.5 56" fill="none" stroke="#2C3E50" strokeWidth="1.2" strokeLinecap="round" />
                )}
              </svg>
            </div>
            <div className="text-[10px] leading-tight font-bold text-stone-200 truncate flex-1">
              <span className="text-amber-300 font-extrabold text-[8px] uppercase block">Barnabé :</span>
              <span className="whitespace-normal line-clamp-2">{dialogue}</span>
            </div>
          </div>

          {/* Cabine d'essayage compacte */}
          <div className="w-16 h-16 shrink-0 rounded-xl bg-gradient-to-b from-stone-900 via-amber-950 to-stone-900 border-2 border-amber-800 flex items-center justify-center relative overflow-hidden shadow-inner">
            {activeTab === "treeAnimals" ? (
              <TreePreview
                stage={stage}
                processedTreeSrc={processedTreeSrc}
                unlockedTreeAnimals={unlockedTreeAnimals}
                activePreviewTreeAnimalId={activePreviewTreeAnimalId}
              />
            ) : (
              <>
                {activePetToRender && activePetToRender !== "none" && (
                  <motion.div
                    key={activePetToRender}
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1.5 left-0.5 text-lg select-none z-10 filter drop-shadow-md"
                  >
                    {activePetToRender === "fox" && "🦊"}
                    {activePetToRender === "cat" && "🐱"}
                    {activePetToRender === "koala" && "🐨"}
                    {activePetToRender === "panda" && "🐼"}
                    {activePetToRender === "unicorn" && "🦄"}
                    {activePetToRender === "dragon" && "🐲"}
                    {activePetToRender === "lion" && "🦁"}
                    {activePetToRender === "griffon" && "🦅"}
                  </motion.div>
                )}
                {activePreviewTreeAnimalId && activePreviewTreeAnimalId !== "none" && (
                  <motion.div
                    key={activePreviewTreeAnimalId}
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0.5 right-0.5 text-sm select-none z-10 filter drop-shadow-sm"
                  >
                    {activePreviewTreeAnimalId === "tree-butterfly" && "🦋"}
                    {activePreviewTreeAnimalId === "tree-squirrel" && "🐿️"}
                    {activePreviewTreeAnimalId === "tree-owl" && "🦉"}
                    {activePreviewTreeAnimalId === "tree-parrot" && "🦜"}
                  </motion.div>
                )}
                <div className="z-0 scale-65">
                  <AvatarRenderer config={previewAvatarConfig} size={84} interactive={false} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-emerald-950" />
              </>
            )}
          </div>
        </div>

        {/* Boutons de déséquipement rapide mobile */}
        {activeTab !== "treeAnimals" && (
          <div className="flex gap-2 w-full">
            <button
              onClick={() => {
                equipAccessory("none");
                playSound("click");
                setSelectedPreviewAccessoryId(null);
                setDialogue("Tu as retiré tous tes accessoires. Prêt pour un nouveau style ? 🎩");
              }}
              disabled={currentAccessories.length === 0}
              className="flex-1 py-1 px-1 text-[8px] font-black rounded-lg border border-amber-800 bg-amber-950 hover:bg-amber-900 text-amber-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              Tout retirer
            </button>
            <button
              onClick={() => {
                equipPet("none");
                playSound("click");
                setSelectedPreviewPetId(null);
                setDialogue("Ton compagnon est allé se reposer au chaud. 💤");
              }}
              disabled={profile.activePet === "none"}
              className="flex-1 py-1 px-1 text-[8px] font-black rounded-lg border border-amber-800 bg-amber-950 hover:bg-amber-900 text-amber-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              Pas d'animal
            </button>
          </div>
        )}
      </div>

      {/* Grid principale : Mobile-optimized structure */}
      <main className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-start">
        
        {/* Colonne gauche (Marchand & Cabine) - Cachée sur Mobile (remplacée par le bandeau sticky), visible sur Desktop */}
        <section className="hidden md:flex md:col-span-4 flex-col gap-4 md:sticky md:top-6">
          
          <div className="grid grid-cols-1 gap-3 w-full">
            
            {/* Barnabé l'Ours Marchand réaliste */}
            <div className="flex flex-col gap-2.5 bg-amber-900/10 border-4 border-amber-800 p-3.5 rounded-3xl relative justify-center items-center">
              <div className="flex flex-row min-[420px]:flex-col items-center gap-3 w-full">
                
                {/* Rendu réaliste et animé de Barnabé l'Ours en SVG */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 select-none">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                    <defs>
                      <linearGradient id="bearGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#A76D3C" />
                        <stop offset="100%" stopColor="#6E3E1A" />
                      </linearGradient>
                      <linearGradient id="snoutGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFF9E6" />
                        <stop offset="100%" stopColor="#E6DFCE" />
                      </linearGradient>
                      <linearGradient id="hatGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#962D22" />
                        <stop offset="100%" stopColor="#C0392B" />
                      </linearGradient>
                    </defs>
                    {/* Chapeau de marchand médiéval */}
                    <path d="M 32 28 Q 50 14 68 28 Z" fill="url(#hatGrad)" />
                    <rect x="28" y="25" width="44" height="4" rx="2" fill="#7B241C" />
                    <motion.path 
                      animate={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      d="M 62 23 Q 74 12 72 7 Q 66 14 62 23" 
                      fill="#FFFFFF" 
                    />

                    {/* Oreilles */}
                    <circle cx="30" cy="36" r="8.5" fill="url(#bearGrad)" />
                    <circle cx="30" cy="36" r="5" fill="#FFA3B1" opacity="0.8" />
                    <circle cx="70" cy="36" r="8.5" fill="url(#bearGrad)" />
                    <circle cx="70" cy="36" r="5" fill="#FFA3B1" opacity="0.8" />

                    {/* Tête */}
                    <circle cx="50" cy="50" r="20" fill="url(#bearGrad)" />

                    {/* Yeux qui clignotent */}
                    <ellipse cx="42" cy="45" rx="2.5" ry={isBlinking ? 0.2 : 2.5} fill="#2C3E50" />
                    {!isBlinking && <circle cx="43" cy="43.8" r="0.7" fill="#FFFFFF" />}
                    <ellipse cx="58" cy="45" rx="2.5" ry={isBlinking ? 0.2 : 2.5} fill="#2C3E50" />
                    {!isBlinking && <circle cx="59" cy="43.8" r="0.7" fill="#FFFFFF" />}

                    {/* Joues roses */}
                    <circle cx="35" cy="51" r="2" fill="#FFA3B1" opacity="0.5" />
                    <circle cx="65" cy="51" r="2" fill="#FFA3B1" opacity="0.5" />

                    {/* Museau */}
                    <ellipse cx="50" cy="54" rx="7.5" ry="5" fill="url(#snoutGrad)" />
                    
                    {/* Nez */}
                    <polygon points="47,52 53,52 50,54.5" fill="#2C3E50" />

                    {/* Bouche animée quand parle */}
                    {isTalking ? (
                      <motion.ellipse
                        cx="50"
                        cy="56.5"
                        rx="2.5"
                        ry={2.5}
                        fill="#2C3E50"
                        animate={{ scaleY: [0.2, 1, 0.2] }}
                        transition={{ duration: 0.25, repeat: Infinity, ease: "easeInOut" }}
                        style={{ originX: "50px", originY: "56.5px" }}
                      />
                    ) : (
                      <path d="M 47.5 56 Q 50 58 52.5 56" fill="none" stroke="#2C3E50" strokeWidth="1.2" strokeLinecap="round" />
                    )}

                    {/* Col chemise */}
                    <path d="M 38 70 L 50 82 L 62 70 Z" fill="#FFFFFF" />
                    {/* Veste verte */}
                    <path d="M 30 70 L 36 96 L 64 96 L 70 70 Z" fill="#1E824C" />
                    {/* Boutons dorés */}
                    <circle cx="50" cy="77" r="1.5" fill="#F1C40F" />
                    <circle cx="50" cy="85" r="1.5" fill="#F1C40F" />
                  </svg>
                </div>
                
                {/* Dialogue */}
                <div className="bg-amber-950 border border-amber-800 text-stone-100 p-2.5 rounded-2xl rounded-tl-none text-[11px] sm:text-xs font-bold leading-relaxed flex-1 w-full">
                  <span className="text-amber-300 font-black block text-[8px] uppercase tracking-wider mb-0.5">Barnabé :</span>
                  {dialogue}
                </div>
              </div>
            </div>

            {/* Cabine d'essayage compacte */}
            <div className="p-3 sm:p-4 bg-stone-900/90 backdrop-blur-md text-center flex flex-col items-center gap-2 border-4 border-amber-800/60 rounded-[2rem] justify-center shadow-lg">
              <span className="text-[10px] font-black text-amber-200 uppercase tracking-widest bg-amber-950 border border-amber-900 px-2.5 py-0.5 rounded-full">
                {activeTab === "treeAnimals" ? "Mon Arbre 🌳" : "Essayage 👕"}
              </span>

              {/* Zone de preview avec l'avatar, compagnons et previews */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-b from-stone-900 via-amber-950 to-stone-900 border-4 border-amber-800 flex items-center justify-center relative overflow-hidden shadow-inner mx-auto">
                {activeTab === "treeAnimals" ? (
                  <TreePreview
                    stage={stage}
                    processedTreeSrc={processedTreeSrc}
                    unlockedTreeAnimals={unlockedTreeAnimals}
                    activePreviewTreeAnimalId={activePreviewTreeAnimalId}
                  />
                ) : (
                  <>
                    {/* Compagnon actif ou preview */}
                    {activePetToRender && activePetToRender !== "none" && (
                      <motion.div
                        key={activePetToRender}
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-3 left-1 text-3xl select-none z-10 filter drop-shadow-md"
                      >
                        {activePetToRender === "fox" && "🦊"}
                        {activePetToRender === "cat" && "🐱"}
                        {activePetToRender === "koala" && "🐨"}
                        {activePetToRender === "panda" && "🐼"}
                        {activePetToRender === "unicorn" && "🦄"}
                        {activePetToRender === "dragon" && "🐲"}
                        {activePetToRender === "lion" && "🦁"}
                    {activePetToRender === "griffon" && "🦅"}
                      </motion.div>
                    )}

                    {/* Preview de l'animal d'arbre */}
                    {activePreviewTreeAnimalId && activePreviewTreeAnimalId !== "none" && (
                      <motion.div
                        key={activePreviewTreeAnimalId}
                        animate={{ 
                          x: [0, 1.5, -1.5, 0],
                          y: [0, -3, 1.5, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-2 right-1 text-2xl select-none z-10 filter drop-shadow-sm"
                      >
                        {activePreviewTreeAnimalId === "tree-butterfly" && "🦋"}
                        {activePreviewTreeAnimalId === "tree-squirrel" && "🐿️"}
                        {activePreviewTreeAnimalId === "tree-owl" && "🦉"}
                        {activePreviewTreeAnimalId === "tree-parrot" && "🦜"}
                      </motion.div>
                    )}

                    {/* Avatar avec preview accessories */}
                    <div className="z-0 scale-90 sm:scale-100">
                      <AvatarRenderer config={previewAvatarConfig} size={120} interactive={true} />
                    </div>

                    {/* Sol */}
                    <div className="absolute bottom-0 left-0 right-0 h-5 bg-emerald-950 border-t border-emerald-900" />
                  </>
                )}
              </div>

              {/* Bouton de déséquipement rapide */}
              {activeTab !== "treeAnimals" && (
                <div className="grid grid-cols-2 gap-1.5 w-full mt-1">
                  <button
                    onClick={() => {
                      equipAccessory("none");
                      playSound("click");
                      setSelectedPreviewAccessoryId(null);
                      setDialogue("Tu as retiré tous tes accessoires. Prêt pour un nouveau style ? 🎩");
                    }}
                    disabled={currentAccessories.length === 0}
                    className="py-1 px-1 text-[8px] font-black rounded-lg border border-amber-800 bg-amber-950 hover:bg-amber-900 text-amber-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    Tout retirer
                  </button>
                  <button
                    onClick={() => {
                      equipPet("none");
                      playSound("click");
                      setSelectedPreviewPetId(null);
                      setDialogue("Ton compagnon est allé se reposer au chaud. 💤");
                    }}
                    disabled={profile.activePet === "none"}
                    className="py-1 px-1 text-[8px] font-black rounded-lg border border-amber-800 bg-amber-950 hover:bg-amber-900 text-amber-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    Pas d'animal
                  </button>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* Colonne droite (Shelves des boutiques) - Défile en dessous */}
        <section className="md:col-span-8 flex flex-col gap-4">
          <div className="bg-stone-900/90 backdrop-blur-md p-4 sm:p-5 border-4 border-amber-800/60 rounded-[2rem] shadow-lg">
            
            {/* Onglets boutiques médiévales */}
            <div className="flex border-b border-amber-900/30 pb-3 mb-4 gap-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => {
                  playSound("click");
                  setActiveTab("accessories");
                  setDialogue("Voici mes équipements spéciaux pour ton avatar. L'or 🪙 fait l'affaire ici !");
                }}
                className={`py-2 px-3 sm:px-4 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
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
                className={`py-2 px-3 sm:px-4 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
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
                className={`py-2 px-3 sm:px-4 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
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
                      const isEquipped = currentAccessories.includes(item.id);
                      const accCur = (item as { currency?: string }).currency || "coins";
                      const canBuy = (accCur === "crystals" ? (profile.crystals || 0) : profile.coins) >= item.price;
                      const isWinning = successAnimItem === item.id;
                      const isCurrentlyPreviewed = activePreviewAccessoryId === item.id;

                      return (
                        <div
                          key={item.id}
                          onMouseEnter={() => {
                            setHoveredAccessoryId(item.id);
                            handleHoverItem(item, "acc");
                          }}
                          onMouseLeave={() => {
                            setHoveredAccessoryId(null);
                          }}
                          onClick={() => {
                            setSelectedPreviewAccessoryId(item.id);
                            handleHoverItem(item, "acc");
                          }}
                          className={`flex items-center justify-between p-2.5 rounded-2xl border-2 transition-all relative cursor-pointer ${
                            isEquipped
                              ? "border-emerald-500 bg-emerald-950/35 hover:bg-emerald-950/45"
                              : isCurrentlyPreviewed
                              ? "border-amber-400 bg-amber-950/35 shadow-md shadow-amber-500/25 animate-pulse"
                              : isUnlocked
                              ? "border-stone-700 bg-stone-900/50 hover:border-stone-600 hover:bg-stone-900/70"
                              : "border-stone-800 bg-stone-950/50 hover:border-stone-700 hover:bg-stone-900/40"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl p-2 bg-amber-950/60 rounded-xl shadow-md border border-amber-800/40 select-none">
                              {item.emoji}
                            </span>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1.5">
                                <span className="font-extrabold text-xs sm:text-sm text-amber-100">{item.name}</span>
                                <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full border ${rarityColors[item.rarity]}`}>
                                  {item.rarity}
                                </span>
                              </div>
                              <span className="text-[9px] sm:text-xs text-stone-300 leading-tight mt-0.5">{item.desc}</span>
                            </div>
                          </div>

                          {isCurrentlyPreviewed && !isEquipped && (
                            <span className="absolute top-1 right-2 text-[7px] font-black uppercase bg-amber-500 text-amber-950 px-1.5 py-0.5 rounded-full border border-amber-400 animate-pulse">
                              Aperçu
                            </span>
                          )}

                          {isEquipped ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                equipAccessory(item.id); // Toggle off
                                playSound("click");
                                setDialogue(`Tu as retiré ton ${item.name}. 👍`);
                              }}
                              className="text-[9px] font-black text-emerald-400 px-2.5 py-1.5 bg-emerald-950/80 rounded-xl border border-emerald-800 hover:bg-emerald-900 transition-colors cursor-pointer z-10"
                            >
                              Retirer
                            </button>
                          ) : isUnlocked ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                equipAccessory(item.id); // Toggle on
                                playSound("click");
                                setDialogue(`Génial ! Tu as équipé ton ${item.name} ! ✨`);
                              }}
                              className="px-2.5 py-1.5 text-[10px] font-black bg-amber-700 hover:bg-amber-600 text-stone-100 rounded-xl shadow cursor-pointer transition-colors border-b-2 border-amber-900 z-10"
                            >
                              Porter
                            </button>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePurchaseAccessory(item);
                              }}
                              disabled={!canBuy}
                              className={`px-2.5 py-1.5 rounded-xl text-[10px] font-black shadow transition-all flex items-center gap-1 cursor-pointer z-10 ${
                                canBuy
                                  ? "bg-amber-500 hover:bg-amber-400 text-amber-950 border-b-2 border-amber-700"
                                  : "bg-stone-800 text-stone-500 cursor-not-allowed shadow-none"
                              }`}
                            >
                              <span>Acheter {item.price}</span>
                              {accCur === "crystals" ? <span>💠</span> : <Coins size={11} className="text-amber-800" />}
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
                      const petCur = (item as { currency?: string }).currency || "diamonds";
                      const canBuy = (petCur === "crystals" ? (profile.crystals || 0) : profile.diamonds) >= item.price;
                      const isWinning = successAnimItem === item.id;
                      const isCurrentlyPreviewed = activePreviewPetId === item.id;

                      return (
                        <div
                          key={item.id}
                          onMouseEnter={() => {
                            setHoveredPetId(item.id);
                            handleHoverItem(item, "pet");
                          }}
                          onMouseLeave={() => {
                            setHoveredPetId(null);
                          }}
                          onClick={() => {
                            setSelectedPreviewPetId(item.id);
                            handleHoverItem(item, "pet");
                          }}
                          className={`flex items-center justify-between p-2.5 rounded-2xl border-2 transition-all relative cursor-pointer ${
                            isEquipped
                              ? "border-emerald-500 bg-emerald-950/35 hover:bg-emerald-950/45"
                              : isCurrentlyPreviewed
                              ? "border-cyan-400 bg-cyan-950/35 shadow-md shadow-cyan-500/25 animate-pulse"
                              : isUnlocked
                              ? "border-cyan-800/45 bg-cyan-950/15 hover:border-cyan-700"
                              : "border-stone-800 bg-stone-950/50 hover:border-stone-700 hover:bg-stone-900/40"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl p-2 bg-amber-950/60 rounded-xl shadow-md border border-amber-800/40 select-none">
                              {item.emoji}
                            </span>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1.5">
                                <span className="font-extrabold text-xs sm:text-sm text-amber-100">{item.name}</span>
                                <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full border ${rarityColors[item.rarity]}`}>
                                  {item.rarity}
                                </span>
                              </div>
                              <span className="text-[9px] sm:text-xs text-stone-300 leading-tight mt-0.5">{item.desc}</span>
                            </div>
                          </div>

                          {isCurrentlyPreviewed && !isEquipped && (
                            <span className="absolute top-1 right-2 text-[7px] font-black uppercase bg-cyan-500 text-cyan-950 px-1.5 py-0.5 rounded-full border border-cyan-400 animate-pulse">
                              Aperçu
                            </span>
                          )}

                          {isEquipped ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                equipPet("none"); // Toggle off
                                playSound("click");
                                setDialogue(`Tu as retiré ton compagnon. 🐾`);
                              }}
                              className="text-[9px] font-black text-emerald-400 px-2.5 py-1.5 bg-emerald-950/80 rounded-xl border border-emerald-800 hover:bg-emerald-900 transition-colors cursor-pointer z-10"
                            >
                              Retirer
                            </button>
                          ) : isUnlocked ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                equipPet(item.id); // Toggle on
                                playSound("click");
                                setDialogue(`Tu es accompagné de ton mignon ${item.name} ! ❤️`);
                              }}
                              className="px-2.5 py-1.5 text-[10px] font-black bg-cyan-600 hover:bg-cyan-500 text-stone-100 rounded-xl shadow cursor-pointer transition-colors border-b-2 border-cyan-800 z-10"
                            >
                              Ajouter
                            </button>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePurchasePet(item);
                              }}
                              disabled={!canBuy}
                              className={`px-2.5 py-1.5 rounded-xl text-[10px] font-black shadow transition-all flex items-center gap-1 cursor-pointer z-10 ${
                                canBuy
                                  ? "bg-cyan-500 hover:bg-cyan-400 text-stone-100 border-b-2 border-cyan-700"
                                  : "bg-stone-800 text-stone-500 cursor-not-allowed shadow-none"
                              }`}
                            >
                              <span>Acheter {item.price} {petCur === "crystals" ? "💠" : "💎"}</span>
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
                      const taCur = (item as { currency?: string }).currency || "diamonds";
                      const canBuy = (taCur === "crystals" ? (profile.crystals || 0) : profile.diamonds) >= item.price;
                      const isWinning = successAnimItem === item.id;
                      const isCurrentlyPreviewed = activePreviewTreeAnimalId === item.id;

                      return (
                        <div
                          key={item.id}
                          onMouseEnter={() => {
                            setHoveredTreeAnimalId(item.id);
                            handleHoverItem(item, "tree");
                          }}
                          onMouseLeave={() => {
                            setHoveredTreeAnimalId(null);
                          }}
                          onClick={() => {
                            setSelectedPreviewTreeAnimalId(item.id);
                            handleHoverItem(item, "tree");
                          }}
                          className={`flex items-center justify-between p-2.5 rounded-2xl border-2 transition-all relative cursor-pointer ${
                            isUnlocked
                              ? "border-emerald-800/40 bg-emerald-950/15"
                              : isCurrentlyPreviewed
                              ? "border-emerald-400 bg-emerald-950/35 shadow-md shadow-emerald-500/25 animate-pulse"
                              : "border-stone-800 bg-stone-950/50 hover:border-stone-700 hover:bg-stone-900/40"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl p-2 bg-amber-950/60 rounded-xl shadow-md border border-amber-800/40 select-none">
                              {item.emoji}
                            </span>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1.5">
                                <span className="font-extrabold text-xs sm:text-sm text-amber-100">{item.name}</span>
                                <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full border ${rarityColors[item.rarity]}`}>
                                  {item.rarity}
                                </span>
                              </div>
                              <span className="text-[9px] sm:text-xs text-stone-300 leading-tight mt-0.5">{item.desc}</span>
                            </div>
                          </div>

                          {isCurrentlyPreviewed && !isUnlocked && (
                            <span className="absolute top-1 right-2 text-[7px] font-black uppercase bg-emerald-500 text-emerald-950 px-1.5 py-0.5 rounded-full border border-emerald-400 animate-pulse">
                              Aperçu
                            </span>
                          )}

                          {isUnlocked ? (
                            <span className="text-[9px] font-black text-emerald-400 px-2.5 py-1.5 bg-emerald-950/80 rounded-full border border-emerald-800 select-none">
                              Débloqué ! 🌳
                            </span>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePurchaseTreeAnimal(item);
                              }}
                              disabled={!canBuy}
                              className={`px-2.5 py-1.5 rounded-xl text-[10px] font-black shadow transition-all flex items-center gap-1 cursor-pointer z-10 ${
                                canBuy
                                  ? "bg-emerald-600 hover:bg-emerald-500 text-stone-100 border-b-2 border-emerald-800"
                                  : "bg-stone-800 text-stone-500 cursor-not-allowed shadow-none"
                              }`}
                            >
                              <span>Débloquer {item.price} {taCur === "crystals" ? "💠" : "💎"}</span>
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
