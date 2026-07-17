"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Sparkles, Lock, Tag, CreditCard, Settings } from "lucide-react";
import { loadStripe, type Appearance } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { playSound } from "@/lib/sound";
import { useApp } from "@/context/AppContext";
import { supabase } from "@/lib/supabase";

// Page d'abonnement Famille — paiement Stripe intégré (Payment Element).
// Parcours : compte parent requis → offre (+ code promo éventuel) → carte → /abonnement/merci.
// Le statut premium est activé par le webhook Stripe côté serveur, jamais ici.

const AVANTAGES = [
  { emoji: "🌍", text: "Tous les mondes débloqués (13 univers, dont 2 mondes secrets)" },
  { emoji: "🧩", text: "Tous les quizz, sans limite, dans chaque univers" },
  { emoji: "🏆", text: "Tous les badges et toutes les récompenses à collectionner" },
  { emoji: "🌳", text: "L'aventure complète : Arbre du Savoir, Marché et Temple des Sages" },
  { emoji: "👨‍👩‍👧", text: "Suivi parental et progression sauvegardés" },
];

const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = pk ? loadStripe(pk) : null;

// Champs de carte Stripe aux couleurs de la charte (turquoise + Nunito).
const APPEARANCE: Appearance = {
  variables: {
    colorPrimary: "#14b8a6",
    colorText: "#1e293b",
    colorDanger: "#f43f5e",
    fontFamily: "Nunito, system-ui, sans-serif",
    borderRadius: "14px",
    fontSizeBase: "15px",
  },
  rules: {
    ".Input": { border: "2px solid #ccfbf1", boxShadow: "none" },
    ".Input:focus": { border: "2px solid #14b8a6", boxShadow: "none" },
    ".Label": { fontWeight: "700", color: "#334155" },
  },
};

// Récupère le jeton de session du parent connecté pour appeler nos routes API.
async function tokenSession(): Promise<string | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}

function euros(cents: number): string {
  return (cents / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

// Formulaire de carte : rendu à l'intérieur de <Elements> une fois le clientSecret obtenu.
function FormulairePaiement({ montant }: { montant: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [erreur, setErreur] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const payer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    playSound("click");
    setBusy(true);
    setErreur(null);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/abonnement/merci` },
    });
    // En cas de succès, Stripe redirige vers /abonnement/merci — on n'arrive ici qu'en erreur.
    if (error) setErreur(error.message ?? "Le paiement n'a pas abouti. Vérifie ta carte.");
    setBusy(false);
  };

  return (
    <form onSubmit={payer} className="mt-5 flex flex-col gap-4">
      <PaymentElement options={{ layout: "tabs" }} />
      {erreur && (
        <p className="text-sm font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2">
          {erreur}
        </p>
      )}
      <button
        type="submit"
        disabled={!stripe || busy}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white text-base sm:text-lg font-black shadow-md btn-bubble border-b-4 border-teal-700 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
      >
        <CreditCard size={18} />
        {busy ? "Paiement en cours…" : montant > 0 ? `Payer ${euros(montant)} / mois` : "Activer mon abonnement"}
      </button>
      <p className="text-center text-[11px] text-slate-400 font-medium">
        🔒 Paiement sécurisé par Stripe. Sans engagement, résiliable à tout moment.
      </p>
    </form>
  );
}

export default function AbonnementPage() {
  const router = useRouter();
  const { userEmail, premiumActif, cloudEnabled } = useApp();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [montant, setMontant] = useState(700);
  const [codePromo, setCodePromo] = useState("");
  const [montrerPromo, setMontrerPromo] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Étape 1 → 2 : préparer l'abonnement côté serveur et récupérer le client_secret.
  const commencer = async () => {
    playSound("click");
    setBusy(true);
    setErreur(null);
    try {
      const token = await tokenSession();
      if (!token) {
        setErreur("Connecte-toi d'abord à ton compte parent.");
        return;
      }
      const res = await fetch("/api/stripe/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ code: codePromo.trim() || undefined }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErreur(data.error ?? "Une erreur est survenue. Réessaie dans un instant.");
        return;
      }
      if (data.status === "active") {
        // Rien à payer (promo 100 % ou déjà abonné) : direction la page de succès.
        router.push("/abonnement/merci");
        return;
      }
      setMontant(data.amountDue ?? 700);
      setClientSecret(data.clientSecret);
    } catch {
      setErreur("Une erreur est survenue. Réessaie dans un instant.");
    } finally {
      setBusy(false);
    }
  };

  // Abonné → ouvrir le portail Stripe (factures, carte, résiliation).
  const gererAbonnement = async () => {
    playSound("click");
    setBusy(true);
    setErreur(null);
    try {
      const token = await tokenSession();
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.url) window.location.href = data.url;
      else setErreur(data.error ?? "Impossible d'ouvrir la gestion de l'abonnement.");
    } catch {
      setErreur("Impossible d'ouvrir la gestion de l'abonnement.");
    } finally {
      setBusy(false);
    }
  };

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
            {premiumActif ? "Ton aventure complète est active !" : "Débloque l'aventure complète !"}
          </h1>
          <p className="mt-2 text-sm sm:text-base font-semibold text-white/90 max-w-md mx-auto">
            {premiumActif
              ? "Merci ! Ton enfant explore tous les mondes des Mondes du Savoir, sans aucune limite."
              : "Avec l'abonnement Famille, ton enfant explore tous les mondes des Mondes du Savoir et révise en s'amusant, sans aucune limite."}
          </p>
        </div>

        <div className="p-6 sm:p-8">
          {/* ===== Déjà abonné : gestion ===== */}
          {premiumActif ? (
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl bg-emerald-50 border-2 border-emerald-200 p-4 text-center">
                <span className="text-3xl">🎉</span>
                <p className="mt-1 font-black text-emerald-800">Abonnement Famille actif</p>
                <p className="text-xs font-semibold text-emerald-700/80 mt-1">
                  7 €/mois — sans engagement, résiliable à tout moment.
                </p>
              </div>
              <button
                onClick={gererAbonnement}
                disabled={busy}
                className="w-full py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 text-base font-black shadow-sm btn-bubble border-2 border-slate-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <Settings size={18} /> Gérer mon abonnement (factures, carte, résiliation)
              </button>
              {erreur && <p className="text-center text-sm font-bold text-rose-600">{erreur}</p>}
              <Link
                href="/dashboard"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white text-base font-black shadow-md btn-bubble border-b-4 border-teal-700 text-center"
              >
                Continuer l&apos;aventure →
              </Link>
            </div>
          ) : (
            <>
              {/* ===== Avantages ===== */}
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

              {/* ===== Prix ===== */}
              <div className="mt-6 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-center">
                <span className="block text-xs font-bold uppercase tracking-wide text-amber-700">Offre Famille</span>
                <span className="block mt-1">
                  <span className="text-4xl font-black text-amber-900">7&nbsp;€</span>
                  <span className="text-lg font-black text-amber-900">/mois</span>
                </span>
                <span className="block text-xs font-semibold text-amber-700/80 mt-1">
                  Sans engagement, résiliable à tout moment. Paiement sécurisé par Stripe.
                </span>
              </div>

              {/* ===== Parcours selon l'état ===== */}
              {!cloudEnabled ? (
                <p className="mt-5 text-center text-sm font-bold text-slate-500">
                  L&apos;abonnement arrive très bientôt — la sauvegarde cloud doit d&apos;abord être activée.
                </p>
              ) : !userEmail ? (
                <div className="mt-5 flex flex-col gap-2">
                  <Link
                    href="/account?next=/abonnement"
                    onClick={() => playSound("click")}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-fuchsia-500 hover:from-amber-600 hover:to-fuchsia-600 text-white text-base sm:text-lg font-black shadow-md btn-bubble border-b-4 border-fuchsia-700 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Lock size={18} /> Créer mon compte parent pour m&apos;abonner
                  </Link>
                  <p className="text-center text-[12px] text-slate-400 font-semibold">
                    Le compte parent (gratuit) sauvegarde la progression et permet de gérer l&apos;abonnement.
                    Déjà un compte ?{" "}
                    <Link href="/account?next=/abonnement" className="text-teal-600 hover:underline">Se connecter</Link>
                  </p>
                </div>
              ) : !clientSecret ? (
                <div className="mt-5 flex flex-col gap-3">
                  {/* Code promo optionnel */}
                  {montrerPromo ? (
                    <input
                      value={codePromo}
                      onChange={(e) => setCodePromo(e.target.value.toUpperCase())}
                      placeholder="CODE PROMO"
                      className="w-full px-4 py-3 rounded-2xl border-2 border-teal-100 bg-slate-50 font-black tracking-widest text-center text-slate-700 outline-none focus:border-teal-400 uppercase"
                    />
                  ) : (
                    <button
                      onClick={() => { playSound("click"); setMontrerPromo(true); }}
                      className="flex items-center justify-center gap-1 text-xs font-bold text-teal-600 hover:text-teal-700 cursor-pointer"
                    >
                      <Tag size={13} /> J&apos;ai un code promo
                    </button>
                  )}
                  {erreur && <p className="text-center text-sm font-bold text-rose-600">{erreur}</p>}
                  <button
                    onClick={commencer}
                    disabled={busy}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-fuchsia-500 hover:from-amber-600 hover:to-fuchsia-600 text-white text-base sm:text-lg font-black shadow-md btn-bubble border-b-4 border-fuchsia-700 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    <Lock size={18} /> {busy ? "Préparation…" : "Je veux l'aventure complète"}
                  </button>
                  <p className="text-center text-[11px] text-slate-400 font-medium">
                    Connecté en tant que <strong>{userEmail}</strong>
                  </p>
                </div>
              ) : stripePromise ? (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: APPEARANCE,
                    fonts: [{ cssSrc: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800&display=swap" }],
                  }}
                >
                  <FormulairePaiement montant={montant} />
                </Elements>
              ) : (
                // Clé Stripe publique absente : on affiche un message clair au lieu d'un écran vide.
                <p className="mt-5 text-center text-sm font-bold text-rose-600">
                  Le paiement est momentanément indisponible. Merci de réessayer dans un instant.
                </p>
              )}

              <p className="mt-4 text-center text-[11px] text-slate-400 font-medium">
                En attendant, les premiers quizz de chaque univers restent <strong>gratuits</strong>&nbsp;: continue à jouer&nbsp;!
              </p>
              <p className="mt-2 text-center text-[11px] text-slate-400 font-medium">
                En validant votre paiement, vous acceptez nos{" "}
                <Link href="/cgv" className="text-teal-600 hover:underline">conditions générales de vente</Link>,
                demandez l&apos;accès immédiat au service et renoncez à votre droit de rétractation de 14 jours
                pour la partie déjà exécutée (art. L.221-28 du Code de la consommation).
              </p>
            </>
          )}
        </div>
      </motion.div>
    </main>
  );
}
