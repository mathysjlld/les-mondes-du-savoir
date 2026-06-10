import Link from "next/link";

/**
 * Pied de page global du site (mentions légales, CGV, crédits).
 * Affiché en bas de toutes les pages via le layout racine.
 */
export function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-teal-200 bg-white/80 backdrop-blur-sm text-slate-600">
      <div className="max-w-5xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        <p className="font-semibold text-teal-700">
          🧭 ExploraKids — projet pédagogique réalisé dans le cadre d&apos;un stage
        </p>
        <nav className="flex items-center gap-4 font-medium">
          <Link href="/mentions-legales" className="hover:text-rose-500 hover:underline transition-colors">
            Mentions légales
          </Link>
          <span className="text-slate-300">•</span>
          <Link href="/cgv" className="hover:text-rose-500 hover:underline transition-colors">
            Conditions générales de vente
          </Link>
        </nav>
        <p className="text-slate-400">
          © {2026} — Kaiden Vialle &amp; Mathys
        </p>
      </div>
    </footer>
  );
}
