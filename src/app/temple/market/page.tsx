"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { AvatarRenderer } from "@/components/Avatar/AvatarRenderer";
import { playSound } from "@/lib/sound";

type Item = {
  id: string;
  name: string;
  emoji: string;
  price: number;
  desc: string;
  type: "accessory" | "pet" | "treeAnimal";
};

// Objets légendaires du Temple — payés en cristaux 💠 uniquement
const SANCTUARY_ITEMS: Item[] = [
  { id: "halo", name: "Auréole des Sages", emoji: "😇", price: 2, desc: "Une auréole dorée réservée aux maîtres du Temple.", type: "accessory" },
  { id: "sage-star", name: "Étoile du Sage", emoji: "🌟", price: 3, desc: "L'emblème lumineux des plus grands explorateurs.", type: "accessory" },
  { id: "griffon", name: "Griffon Royal", emoji: "🦅", price: 1, desc: "Une créature légendaire mi-aigle mi-lion, compagnon du sage.", type: "pet" },
  { id: "tree-dragon", name: "Dragon Gardien", emoji: "🐉", price: 1, desc: "Un dragon légendaire qui veille sur ton Arbre du Savoir.", type: "treeAnimal" },
  { id: "tree-phoenix", name: "Phénix de Feu", emoji: "🔥", price: 2, desc: "Un phénix éternel qui illumine ton arbre.", type: "treeAnimal" },
];

export default function SanctuaryMarket() {
  const router = useRouter();
  const { profile, isLoaded, buyAccessory, buyPet, buyTreeAnimal, equipAccessory, equipPet } = useApp();

  useEffect(() => {
    if (isLoaded && !profile) router.push("/");
  }, [isLoaded, profile, router]);

  if (!profile) return null;

  const crystals = profile.crystals || 0;

  const isOwned = (item: Item) => {
    if (item.type === "accessory") return (profile.unlockedAccessories || []).includes(item.id);
    if (item.type === "pet") return (profile.unlockedPets || []).includes(item.id);
    return (profile.unlockedTreeAnimals || []).includes(item.id);
  };
  const isEquipped = (item: Item) => {
    if (item.type === "accessory") return (profile.avatar.accessories || []).includes(item.id);
    if (item.type === "pet") return profile.activePet === item.id;
    return (profile.unlockedTreeAnimals || []).includes(item.id); // les animaux d'arbre sont posés une fois achetés
  };

  const handleBuy = (item: Item) => {
    if (crystals < item.price) { playSound("incorrect"); return; }
    let ok = false;
    if (item.type === "accessory") ok = buyAccessory(item.id, item.price, "crystals");
    else if (item.type === "pet") ok = buyPet(item.id, item.price, "crystals");
    else ok = buyTreeAnimal(item.id, item.price, "crystals");
    playSound(ok ? "correct" : "incorrect");
  };
  const handleEquip = (item: Item) => {
    playSound("click");
    if (item.type === "accessory") equipAccessory(item.id);
    else if (item.type === "pet") equipPet(item.id as never);
  };

  return (
    <main className="min-h-screen w-full relative overflow-hidden bg-gradient-to-b from-amber-300 via-yellow-100 to-orange-200 text-stone-800">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-yellow-300/50 blur-3xl" />
        {[8, 26, 74, 92].map((l, i) => (
          <div key={i} className="absolute top-0 bottom-0 w-6 bg-gradient-to-b from-amber-300/25 to-amber-700/10 border-x border-amber-500/20" style={{ left: `${l}%` }} />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.span
            key={`p-${i}`}
            className="absolute text-amber-400/70 select-none"
            style={{ left: `${(i * 43) % 100}%`, bottom: "-5%", fontSize: `${10 + (i % 3) * 5}px` }}
            animate={{ y: ["0vh", "-105vh"], opacity: [0, 0.9, 0.9, 0], rotate: [0, 180] }}
            transition={{ duration: 10 + (i % 4) * 2, delay: (i % 6) * 1.3, repeat: Infinity, ease: "linear" }}
          >
            ✦
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-6 sm:py-8 flex flex-col gap-5">
        {/* En-tête */}
        <header className="flex items-center justify-between gap-2 bg-amber-900/90 text-amber-50 rounded-2xl px-4 py-3 shadow-lg border-b-4 border-amber-950">
          <button
            onClick={() => { playSound("click"); router.push("/temple"); }}
            className="shrink-0 px-3 py-2 rounded-xl bg-amber-950/60 hover:bg-amber-950 font-bold text-xs sm:text-sm cursor-pointer transition-colors"
          >
            ← Temple
          </button>
          <h1 className="flex-1 min-w-0 truncate text-center font-black text-base sm:text-2xl tracking-wide" style={{ fontFamily: "var(--font-title)" }}>
            🏛️ Sanctuaire des Sages
          </h1>
          <div className="shrink-0 flex items-center gap-1 bg-fuchsia-100 text-fuchsia-800 px-3 py-1.5 rounded-full font-black text-xs sm:text-sm border border-fuchsia-300">
            💠 {crystals}
          </div>
        </header>

        {/* Gardien + aperçu avatar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-4 flex items-center gap-3 shadow"
        >
          <span className="text-4xl sm:text-5xl select-none">🧙</span>
          <p className="flex-1 text-sm sm:text-base font-semibold text-amber-900 leading-relaxed">
            <strong>Le Gardien :</strong> « Seuls les cristaux 💠 ouvrent les trésors de ce sanctuaire, jeune sage. »
          </p>
          <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-white/80 rounded-2xl border border-amber-200 flex items-center justify-center">
            <AvatarRenderer config={profile.avatar} size={60} interactive={false} />
          </div>
        </motion.div>

        {/* Objets */}
        <div className="flex flex-col gap-3">
          {SANCTUARY_ITEMS.map((item) => {
            const owned = isOwned(item);
            const equipped = isEquipped(item);
            const canBuy = crystals >= item.price;
            return (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50/95 border-2 border-amber-300 shadow"
              >
                <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-amber-200 to-yellow-300 border border-amber-400 flex items-center justify-center text-2xl sm:text-3xl select-none">
                  {item.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-amber-900 text-sm sm:text-base leading-tight">{item.name}</h3>
                  <p className="text-[11px] sm:text-xs font-semibold text-amber-700 leading-snug">{item.desc}</p>
                </div>
                <div className="shrink-0">
                  {!owned ? (
                    <button
                      onClick={() => handleBuy(item)}
                      disabled={!canBuy}
                      className={`px-3 py-2 rounded-xl font-black text-xs sm:text-sm border-b-4 transition-all flex items-center gap-1 ${
                        canBuy
                          ? "bg-amber-500 hover:bg-amber-600 text-white border-amber-700 cursor-pointer"
                          : "bg-stone-200 text-stone-400 border-stone-300 cursor-not-allowed"
                      }`}
                    >
                      Acheter {item.price} 💠
                    </button>
                  ) : item.type === "treeAnimal" ? (
                    <span className="px-3 py-2 rounded-xl bg-emerald-100 text-emerald-700 font-black text-xs sm:text-sm">🌳 Sur l'arbre</span>
                  ) : equipped ? (
                    <span className="px-3 py-2 rounded-xl bg-emerald-100 text-emerald-700 font-black text-xs sm:text-sm">✓ Équipé</span>
                  ) : (
                    <button
                      onClick={() => handleEquip(item)}
                      className="px-3 py-2 rounded-xl bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-black text-xs sm:text-sm border-b-4 border-fuchsia-700 cursor-pointer transition-all"
                    >
                      Équiper
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-[11px] font-bold text-amber-800/80">
          Gagne des cristaux 💠 en réussissant les épreuves de Mythologie et du Temple sans faute.
        </p>
      </div>
    </main>
  );
}
