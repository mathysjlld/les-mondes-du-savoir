"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";

function AccountContent() {
  const { cloudEnabled, userEmail, signUp, signIn, signOut } = useApp();
  const router = useRouter();
  const searchParams = useSearchParams();
  // Retour automatique vers la page d'origine (ex. /abonnement) après connexion.
  const next = searchParams.get("next");

  useEffect(() => {
    if (userEmail && next && next.startsWith("/")) router.replace(next);
  }, [userEmail, next, router]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    const action = mode === "signup" ? signUp : signIn;
    const { error } = await action(email.trim(), password);
    setBusy(false);
    if (error) setMessage(error);
    else if (mode === "signup") setMessage("Compte créé ! Vérifie tes e-mails si une confirmation est demandée, puis connecte-toi.");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 bg-gradient-to-br from-teal-50 to-amber-50">
      <Link href="/dashboard" className="text-teal-700 font-bold">← Retour au tableau de bord</Link>

      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-teal-100">
        <h1 className="text-2xl font-black text-teal-900 text-center mb-2">Mon compte</h1>

        {!cloudEnabled ? (
          <p className="text-center text-slate-600 font-medium mt-4">
            La sauvegarde dans le cloud n'est pas encore activée. Ta progression est pour l'instant
            enregistrée sur cet appareil. Connecte un projet pour synchroniser ta progression entre
            tous tes appareils.
          </p>
        ) : userEmail ? (
          <div className="text-center space-y-4 mt-4">
            <p className="text-slate-700 font-bold">Connecté : <span className="text-teal-700">{userEmail}</span></p>
            <p className="text-sm text-slate-500 font-medium">
              ☁️ Ta progression est sauvegardée dans le cloud et synchronisée sur tous tes appareils.
            </p>
            <button
              onClick={() => signOut()}
              className="py-3 px-6 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black border-b-4 border-rose-700 transition-all"
            >
              Se déconnecter
            </button>
          </div>
        ) : (
          <>
            <p className="text-center text-sm text-slate-500 font-medium mb-5">
              Crée un compte (parent) pour sauvegarder la progression et la retrouver sur tous tes appareils.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Adresse e-mail du parent"
                className="w-full px-4 py-3 rounded-2xl border-3 border-teal-100 bg-slate-50 font-bold text-slate-700 outline-none focus:border-teal-400"
              />
              <input
                type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe (6 caractères min.)"
                className="w-full px-4 py-3 rounded-2xl border-3 border-teal-100 bg-slate-50 font-bold text-slate-700 outline-none focus:border-teal-400"
              />
              <button
                type="submit" disabled={busy}
                className="py-3 px-6 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black border-b-4 border-teal-700 transition-all disabled:opacity-60"
              >
                {busy ? "..." : mode === "signup" ? "Créer mon compte" : "Se connecter"}
              </button>
            </form>
            <button
              onClick={() => { setMode(mode === "signup" ? "signin" : "signup"); setMessage(null); }}
              className="w-full text-center text-sm font-bold text-teal-700 mt-4"
            >
              {mode === "signup" ? "J'ai déjà un compte → Se connecter" : "Pas de compte ? → En créer un"}
            </button>
          </>
        )}

        {message && <p className="text-center text-sm font-bold text-amber-700 mt-4">{message}</p>}
      </div>
    </main>
  );
}

export default function AccountPage() {
  // useSearchParams impose une frontière Suspense au niveau de la page.
  return (
    <Suspense>
      <AccountContent />
    </Suspense>
  );
}
