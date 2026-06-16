"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Pied de page global (mentions légales, CGV, crédits).
 * Masqué sur les écrans immersifs (onboarding, quiz, marché) où un footer légal
 * déséquilibrerait la mise en page. Centré et équilibré à toutes les largeurs.
 */
const HIDDEN_PREFIXES = ["/onboarding", "/play", "/market", "/temple"];

export function Footer() {
  const pathname = usePathname() || "/";
  if (HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return null;
  }

  return (
    <footer className="mt-auto border-t-2 border-teal-200 bg-white/80 backdrop-blur-sm text-slate-600">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col items-center gap-2 text-center text-xs sm:text-sm">
        <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-medium">
          <Link href="/mentions-legales" className="hover:text-rose-500 hover:underline transition-colors">
            Mentions légales
          </Link>
          <span className="text-slate-300" aria-hidden>•</span>
          <Link href="/cgv" className="hover:text-rose-500 hover:underline transition-colors">
            Conditions générales de vente
          </Link>
        </nav>
        <p className="text-slate-400">
          © 2026 Les mondes du Savoir — projet pédagogique de stage · Kaiden Vialle &amp; Mathys Julliand
        </p>
      </div>
    </footer>
  );
}
