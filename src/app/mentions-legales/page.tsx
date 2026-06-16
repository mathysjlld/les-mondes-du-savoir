import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — Les mondes du Savoir",
  description: "Mentions légales du projet pédagogique Les mondes du Savoir.",
};

export default function MentionsLegalesPage() {
  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-5 py-10 sm:py-14">
      <Link href="/dashboard" className="text-sm font-semibold text-teal-600 hover:underline">
        ← Retour
      </Link>

      <h1 className="mt-4 text-3xl sm:text-4xl font-black text-teal-800">Mentions légales</h1>
      <p className="mt-2 text-sm text-slate-500">Dernière mise à jour : juin 2026</p>

      <section className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <div>
          <h2 className="text-xl font-bold text-teal-700">Éditeur du site</h2>
          <p className="mt-2">
            <strong>Les mondes du Savoir</strong> est un projet pédagogique réalisé dans le cadre d&apos;un stage.
            Il ne constitue pas une société commerciale et n&apos;a pas de but lucratif.
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Développeurs / auteurs : <strong>Kaiden Vialle</strong> et <strong>Mathys Julliand</strong></li>
            <li>Contact : <a className="text-teal-600 hover:underline" href="mailto:kaidenvialle@gmail.com">kaidenvialle@gmail.com</a></li>
            <li>Statut : projet étudiant / de stage (non commercial)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Directeur de la publication</h2>
          <p className="mt-2">
            Kaiden Vialle et Mathys Julliand, en qualité d&apos;auteurs du projet.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Hébergement</h2>
          <p className="mt-2">
            Le site est hébergé par <strong>GitHub Pages</strong> :
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>GitHub, Inc.</li>
            <li>88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis</li>
            <li>
              Site :{" "}
              <a className="text-teal-600 hover:underline" href="https://github.com" target="_blank" rel="noreferrer">
                github.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Propriété intellectuelle</h2>
          <p className="mt-2">
            L&apos;ensemble des contenus présents sur Les mondes du Savoir (textes, quiz, illustrations, logo, code)
            est protégé par le droit d&apos;auteur. Toute reproduction ou réutilisation sans autorisation
            des auteurs est interdite, sauf à des fins pédagogiques ou de démonstration de ce projet de stage.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Données personnelles (RGPD)</h2>
          <p className="mt-2">
            Les mondes du Savoir ne collecte aucune donnée personnelle sur un serveur. Le profil de l&apos;enfant
            (prénom, avatar, progression, pièces) est stocké <strong>uniquement en local</strong> dans le
            navigateur de l&apos;appareil (localStorage) et n&apos;est jamais transmis à un tiers.
            Aucune publicité ni traceur marketing n&apos;est utilisé. Vous pouvez effacer ces données à tout
            moment depuis l&apos;espace parents ou en vidant le cache du navigateur.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Public visé</h2>
          <p className="mt-2">
            Les mondes du Savoir s&apos;adresse aux enfants de 3 à 12 ans, sous la supervision d&apos;un parent ou
            d&apos;un adulte responsable. Un espace parents protégé permet de régler le temps d&apos;écran et
            les paramètres du compte.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Responsabilité</h2>
          <p className="mt-2">
            Ce site étant un projet pédagogique, il est fourni « en l&apos;état », sans garantie de
            disponibilité ni d&apos;absence d&apos;erreurs. Les auteurs ne sauraient être tenus responsables
            d&apos;un éventuel dommage lié à son utilisation.
          </p>
        </div>
      </section>

      <div className="mt-10 text-sm">
        <Link href="/cgv" className="text-teal-600 font-semibold hover:underline">
          Voir aussi : Conditions générales de vente →
        </Link>
      </div>
    </main>
  );
}
