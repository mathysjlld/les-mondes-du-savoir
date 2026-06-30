"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Sparkles, Lock } from "lucide-react";
import { playSound } from "@/lib/sound";

// Page PLACEHOLDER de l'abonnement (chantier freemium).
// ⚠️ Aucun paiement n'est branché ici : c'est volontaire. Le branchement Stripe
// (vraie page de paiement, abonnement mensuel, conditions) est géré séparément.
// Le bouton ci-dessous ne fait QUE confirmer l'intérêt — il ne débite rien.

const AVANTAGES = [
  { emoji: "🌍", text: "Tous les mondes débloqués (14 univers + les mondes secrets)" },
  { emoji: "🧩", text: "Tous les quizz, sans limite, dans chaque univers" },
  { emoji: "🏆", text: "Tous les badges et toutes les récompenses à collectionner" },
  { emoji: "🌳", text: "L'aventure complète : Arbre du Savoir, Marché et Temple des Sages" },
  { emoji: "👨‍👩‍👧", text: "Suivi parental et progression sauvegardés" },
];

export default function AbonnementPage() {
  const router = useRouter();
  const [merci, setMerci] = useState(false);

  return (
    <main className="flex-1 max-w-2xl mx-auto w-full px-5 py-8 sm:py-12">
      <button
        onClick={() => { playSound("click"); router.back(); }}
        className="flex items-center gap-1 text-sm font-bold text-teal-600 hover:text-teal-700 cursor-pointer"
      >
        <ArrowLeft size={16} /> Retour
      </button>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-5 rounded-3xl border-4 border-amber-200 bg-white shadow-xl overflow-hidden"
      >
        {/* En-tête */}
        <div className="relative bg-gradient-to-br from-amber-400 via-orange-400 to-fuchsia-500 text-white p-6 sm:p-8 text-center overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
          <motion.div
            animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center"
          >
            <Sparkles size={32} className="text-white" />
          </motion.div>
          <h1 className="text-2xl sm:text-3xl font-black leading-tight" style={{ fontFamily: "var(--font-title)" }}>
            Débloque l&apos;aventure complète&nbsp;!
          </h1>
          <p className="mt-2 text-sm sm:text-base font-semibold text-white/90 max-w-md mx-auto">
            Avec l&apos;abonnement <strong>Famille</strong>, ton enfant explore tous les mondes des
            Mondes du Savoir et révise en s&apos;amusant, sans aucune limite.
          </p>
        </div>

        {/* Avantages */}
        <div className="p-6 sm:p-8">
          <ul className="flex flex-col gap-3">
            {AVANTAGES.map((a) => (
              <li key={a.text} className="flex items-start gap-3">
                <span className="shrink-0 w-7 h-7 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <Check size={16} className="text-emerald-600" />
                </span>
                <span className="text-sm sm:text-base font-semibold text-slate-700 leading-snug">
                  <span className="mr-1">{a.emoji}</span>{a.text}
                </span>
              </li>
            ))}
          </ul>

          {/* Prix (placeholder — l'offre définitive arrive avec le paiement) */}
          <div className="mt-6 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-center">
            <span className="block text-xs font-bold uppercase tracking-wide text-amber-700">Offre Famille</span>
            <span className="block text-3xl font-black text-amber-900 mt-1">Bientôt disponible</span>
            <span className="block text-xs font-semibold text-amber-700/80 mt-1">
              Le paiement sécurisé arrive très prochainement. Le prix te sera indiqué clairement avant toute souscription.
            </span>
          </div>

          {/* CTA (ne débite rien : placeholder en attendant Stripe) */}
          {!merci ? (
            <button
              onClick={() => { playSound("correct"); setMerci(true); }}
              className="mt-5 w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-fuchsia-500 hover:from-amber-600 hover:to-fuchsia-600 text-white text-base sm:text-lg font-black shadow-md btn-bubble border-b-4 border-fuchsia-700 cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock size={18} /> Je veux l&apos;aventure complète
            </button>
          ) : (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-5 w-full py-4 px-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-emerald-800 text-center font-bold text-sm sm:text-base"
            >
              Merci&nbsp;! 🎉 L&apos;offre d&apos;abonnement sera disponible très bientôt — on te préviendra dès son ouverture.
            </motion.div>
          )}

          <p className="mt-4 text-center text-[11px] text-slate-400 font-medium">
            En attendant, les premiers quizz de chaque univers restent <strong>gratuits</strong>&nbsp;: continue à jouer&nbsp;!
          </p>
        </div>
      </motion.div>
    </main>
  );
}
