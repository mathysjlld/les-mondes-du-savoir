"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { PartyPopper } from "lucide-react";
import { useApp } from "@/context/AppContext";

// Page de retour après paiement Stripe. Le webhook active le premium côté
// serveur en quelques secondes : on re-vérifie le statut plusieurs fois pour
// que le parent voie l'accès se débloquer sans avoir à recharger.
export default function MerciPage() {
  const { premiumActif, refreshPremium } = useApp();
  const [tentatives, setTentatives] = useState(0);
  const confettiLance = useRef(false);

  useEffect(() => {
    if (confettiLance.current) return;
    confettiLance.current = true;
    confetti({ particleCount: 120, spread: 75, origin: { y: 0.6 }, colors: ["#14b8a6", "#f59e0b", "#d946ef", "#ff6b6b"] });
  }, []);

  // Re-vérifie le statut premium (webhook asynchrone) : 6 essais espacés de 2 s.
  useEffect(() => {
    if (premiumActif || tentatives >= 6) return;
    const t = setTimeout(async () => {
      await refreshPremium();
      setTentatives((n) => n + 1);
    }, 2000);
    return () => clearTimeout(t);
  }, [premiumActif, tentatives, refreshPremium]);

  return (
    <main className="flex-1 max-w-xl mx-auto w-full px-5 py-12 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full rounded-3xl border-4 border-emerald-200 bg-white shadow-xl overflow-hidden text-center"
      >
        <div className="bg-gradient-to-br from-teal-400 via-emerald-400 to-teal-500 text-white p-8">
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center"
          >
            <PartyPopper size={32} />
          </motion.div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: "var(--font-title)" }}>
            Merci, et bienvenue !
          </h1>
          <p className="mt-2 text-sm sm:text-base font-semibold text-white/90">
            L&apos;abonnement Famille est en route. 🎉
          </p>
        </div>

        <div className="p-6 sm:p-8 flex flex-col gap-4">
          {premiumActif ? (
            <p className="font-bold text-emerald-700 bg-emerald-50 border-2 border-emerald-200 rounded-2xl px-4 py-3">
              ✅ C&apos;est actif ! Tous les mondes sont maintenant débloqués.
            </p>
          ) : tentatives >= 6 ? (
            // Message de secours : le webhook peut mettre un peu plus de temps. On rassure
            // (le paiement est bien pris en compte) au lieu de laisser tourner à l'infini.
            <p className="font-semibold text-amber-700 bg-amber-50 border-2 border-amber-200 rounded-2xl px-4 py-3 text-sm leading-relaxed">
              💛 Ton paiement est bien reçu&nbsp;! L&apos;accès peut mettre une minute à s&apos;activer.
              Recharge la page dans un instant&nbsp;; ton reçu et ton email de bienvenue confirment
              ton abonnement. Rien n&apos;est perdu, tout est enregistré.
            </p>
          ) : (
            <p className="font-semibold text-slate-500 text-sm">
              Ton accès s&apos;active en quelques secondes… Un email de bienvenue et un reçu
              arrivent dans ta boîte mail.
            </p>
          )}
          <Link
            href="/dashboard"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white text-base sm:text-lg font-black shadow-md btn-bubble border-b-4 border-teal-700"
          >
            Explorer tous les mondes →
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
