import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales de vente — Les mondes du Savoir",
  description: "Conditions générales de vente (modèle pédagogique) du projet Les mondes du Savoir.",
};

export default function CgvPage() {
  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-5 py-10 sm:py-14">
      <Link href="/dashboard" className="text-sm font-semibold text-teal-600 hover:underline">
        ← Retour
      </Link>

      <h1 className="mt-4 text-3xl sm:text-4xl font-black text-teal-800">
        Conditions générales de vente
      </h1>
      <p className="mt-2 text-sm text-slate-500">Dernière mise à jour : juin 2026</p>

      <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
        Les mondes du Savoir est un <strong>projet pédagogique de stage</strong>. L&apos;application est
        <strong> gratuite</strong> et ne donne lieu à aucune vente réelle. Les présentes conditions sont
        fournies à titre d&apos;exemple, dans le cadre de l&apos;exercice, pour préfigurer une éventuelle
        offre commerciale future.
      </div>

      <section className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <div>
          <h2 className="text-xl font-bold text-teal-700">Article 1 — Objet</h2>
          <p className="mt-2">
            Les présentes conditions générales de vente (CGV) encadrent les modalités de mise à disposition
            de l&apos;application éducative Les mondes du Savoir et, le cas échéant, de ses futures offres payantes
            (abonnement « Famille », contenus premium).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Article 2 — Prix</h2>
          <p className="mt-2">
            Dans sa version actuelle, l&apos;accès à Les mondes du Savoir est <strong>entièrement gratuit</strong>.
            Aucun paiement n&apos;est demandé. Les prix d&apos;une éventuelle offre future seraient indiqués
            en euros, toutes taxes comprises (TTC), avant toute souscription.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Article 3 — Monnaies virtuelles du jeu</h2>
          <p className="mt-2">
            Les pièces 🪙, diamants 💎 et cristaux 💠 utilisés dans l&apos;application sont des
            <strong> monnaies virtuelles</strong> sans aucune valeur monétaire réelle. Elles ne peuvent être
            ni achetées, ni échangées, ni remboursées en argent réel. Elles servent uniquement à la
            progression dans le jeu (boutique, accessoires, animaux, mondes à débloquer).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Article 4 — Commande et souscription</h2>
          <p className="mt-2">
            En cas d&apos;offre payante future, la souscription serait confirmée par voie électronique après
            acceptation expresse des présentes CGV et validation du paiement. Un récapitulatif serait
            adressé par courriel.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Article 5 — Droit de rétractation</h2>
          <p className="mt-2">
            Conformément au Code de la consommation, le client disposerait d&apos;un délai de
            <strong> 14 jours</strong> pour exercer son droit de rétractation sur un éventuel abonnement,
            sauf renoncement exprès en cas d&apos;accès immédiat au contenu numérique.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Article 6 — Données et compte</h2>
          <p className="mt-2">
            Le profil et la progression sont enregistrés localement sur l&apos;appareil. Voir les{" "}
            <Link href="/mentions-legales" className="text-teal-600 hover:underline">
              mentions légales
            </Link>{" "}
            pour le détail du traitement des données (RGPD).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Article 7 — Droit applicable</h2>
          <p className="mt-2">
            Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable serait
            recherchée en priorité avant toute action devant les tribunaux compétents.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Article 8 — Contact</h2>
          <p className="mt-2">
            Pour toute question relative à ces conditions :{" "}
            <a className="text-teal-600 hover:underline" href="mailto:kaidenvialle@gmail.com">
              kaidenvialle@gmail.com
            </a>
          </p>
        </div>
      </section>

      <div className="mt-10 text-sm">
        <Link href="/mentions-legales" className="text-teal-600 font-semibold hover:underline">
          ← Voir les mentions légales
        </Link>
      </div>
    </main>
  );
}
