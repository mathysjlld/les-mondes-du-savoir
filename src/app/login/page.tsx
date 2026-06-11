"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApp, AccountSummary } from "@/context/AppContext";
import { AvatarRenderer } from "@/components/Avatar/AvatarRenderer";
import { playSound } from "@/lib/sound";

export default function LoginPage() {
  const router = useRouter();
  const { listAccounts, loginWithCode } = useApp();

  const [accounts, setAccounts] = useState<AccountSummary[]>([]);
  const [selected, setSelected] = useState<AccountSummary | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setAccounts(listAccounts());
  }, [listAccounts]);

  const choose = (acc: AccountSummary) => {
    playSound("click");
    setSelected(acc);
    setCode("");
    setError(null);
    setShowHint(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    if (code.trim() !== selected.accountCode) {
      playSound("incorrect");
      setError("Code incorrect. Réessaie ou regarde ton indice.");
      return;
    }
    const { error: loginError } = loginWithCode(code.trim());
    if (loginError) {
      setError(loginError);
      return;
    }
    playSound("levelup");
    router.push("/dashboard");
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-teal-100 via-sky-100 to-indigo-100">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-8 border-4 border-white shadow-2xl">
        <div className="text-center mb-5">
          <span className="text-4xl">🔑</span>
          <h1 className="text-2xl sm:text-3xl font-black text-teal-900 mt-1">Se reconnecter</h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
            Choisis ton compte et entre ton code à 4 chiffres.
          </p>
        </div>

        {accounts.length === 0 ? (
          <div className="text-center flex flex-col gap-4">
            <p className="text-sm font-semibold text-slate-600">
              Aucun compte enregistré sur cet appareil pour l&apos;instant.
            </p>
            <Link
              href="/onboarding"
              className="py-3 px-6 rounded-2xl bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-black border-b-4 border-yellow-600 transition-all"
            >
              Créer mon compte 🚀
            </Link>
          </div>
        ) : !selected ? (
          <div className="flex flex-col gap-3">
            {accounts.map((acc) => (
              <button
                key={acc.accountCode}
                onClick={() => choose(acc)}
                className="flex items-center gap-3 p-3 rounded-2xl border-3 border-teal-100 bg-slate-50 hover:border-teal-400 hover:bg-teal-50 transition-all text-left cursor-pointer"
              >
                <div className="w-14 h-14 shrink-0 flex items-center justify-center">
                  <AvatarRenderer config={acc.avatar} size={52} interactive={false} />
                </div>
                <span className="font-black text-slate-700 text-lg">{acc.nickname}</span>
                <span className="ml-auto text-teal-500 font-bold">→</span>
              </button>
            ))}
            <Link
              href="/onboarding"
              className="mt-2 text-center text-sm font-bold text-teal-700 hover:underline"
            >
              + Créer un nouveau compte
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center gap-3 justify-center">
              <div className="w-14 h-14 flex items-center justify-center">
                <AvatarRenderer config={selected.avatar} size={52} interactive={false} />
              </div>
              <span className="font-black text-slate-700 text-lg">{selected.nickname}</span>
            </div>

            <input
              type="text"
              inputMode="numeric"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.replace(/\D/g, "").slice(0, 4));
                setError(null);
              }}
              placeholder="• • • •"
              className={`w-full px-4 py-3 rounded-xl border-4 text-center text-2xl tracking-[0.4em] font-bold text-slate-700 outline-none transition-all ${
                error ? "border-rose-400 bg-rose-50 focus:border-rose-500" : "border-teal-100 focus:border-teal-400 bg-slate-50"
              }`}
              autoFocus
              required
            />

            {error && <p className="text-xs font-bold text-rose-500 text-center">{error}</p>}

            <button
              type="submit"
              className="py-3 px-6 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black border-b-4 border-teal-700 transition-all"
            >
              Se connecter
            </button>

            <button
              type="button"
              onClick={() => { playSound("click"); setShowHint(true); }}
              className="text-sm font-bold text-teal-700 hover:underline"
            >
              J&apos;ai oublié mon code 🤔
            </button>

            {showHint && (
              <div className="rounded-2xl bg-amber-50 border-2 border-amber-200 p-3 text-center">
                <p className="text-[11px] font-bold uppercase tracking-wide text-amber-600">Ton indice</p>
                <p className="text-sm font-bold text-amber-800 mt-1">
                  {selected.codeHint || "Aucun indice n'a été enregistré pour ce compte."}
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={() => { playSound("click"); setSelected(null); setError(null); setShowHint(false); }}
              className="text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              ← Choisir un autre compte
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
