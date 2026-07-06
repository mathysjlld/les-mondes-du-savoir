import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales de vente — Les mondes du Savoir",
  description:
    "Conditions générales de vente de Les mondes du Savoir : offre gratuite et abonnement Famille à 7 €/mois, paiement, résiliation, droit de rétractation.",
};

export default function CgvPage() {
  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-5 py-10 sm:py-14">
      <Link href="/dashboard" className="text-sm font-semibold text-teal-600 hover:underline">
        ← Retour
      </Link>

      <h1 className="mt-4 text-3xl sm:text-4xl font-black text-teal-800">Conditions générales de vente</h1>
      <p className="mt-2 text-sm text-slate-500">Dernière mise à jour : juillet 2026</p>

      <div className="mt-4 rounded-xl bg-teal-50 border border-teal-200 p-4 text-sm text-teal-900">
        Les présentes conditions générales de vente (CGV) régissent l&apos;abonnement payant au service
        <strong> Les mondes du Savoir</strong>. Elles s&apos;appliquent à toute souscription de l&apos;offre
        <strong> Famille</strong>. Le client déclare en avoir pris connaissance et les accepter avant de valider
        sa commande.
      </div>

      <section className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <div>
          <h2 className="text-xl font-bold text-teal-700">Article 1 — Objet</h2>
          <p className="mt-2">
            Les présentes CGV définissent les droits et obligations des parties dans le cadre de la souscription,
            par un consommateur (ci-après le « Client »), à l&apos;abonnement payant donnant accès à
            l&apos;intégralité des contenus de l&apos;application éducative Les mondes du Savoir (ci-après le
            « Service »).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Article 2 — Identité du vendeur</h2>
          <p className="mt-2">
            Le Service est édité et commercialisé par <strong>Kaiden Vialle, entrepreneur
            individuel</strong>, immatriculé sous le numéro <strong>SIRET 890&nbsp;831&nbsp;415&nbsp;00025</strong>{" "}
            (voir les{" "}
            <Link href="/mentions-legales" className="text-teal-600 hover:underline">
              mentions légales
            </Link>
            ). Contact&nbsp;:{" "}
            <a className="text-teal-600 hover:underline" href="mailto:kaidenvialle@gmail.com">
              kaidenvialle@gmail.com
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Article 3 — Le Service et l&apos;offre</h2>
          <p className="mt-2">
            Les mondes du Savoir est proposé selon un modèle « freemium »&nbsp;:
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>
              une <strong>version gratuite</strong> de découverte, donnant accès à une sélection de contenus&nbsp;;
            </li>
            <li>
              un <strong>abonnement Famille</strong> payant, qui débloque l&apos;ensemble des univers, quiz,
              badges et fonctionnalités (Arbre du Savoir, Marché, Temple des Sages), ainsi que la sauvegarde de la
              progression.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Article 4 — Prix</h2>
          <p className="mt-2">
            L&apos;abonnement Famille est proposé au prix de <strong>7&nbsp;€ par mois, toutes taxes comprises
            (TTC)</strong>. Ce prix inclut l&apos;accès à l&apos;ensemble des fonctionnalités de l&apos;offre pour
            un foyer. Le prix applicable est celui affiché au moment de la souscription. L&apos;éditeur se réserve
            le droit de modifier ses tarifs&nbsp;; toute évolution sera communiquée au Client à l&apos;avance et ne
            s&apos;appliquera qu&apos;aux échéances postérieures, le Client restant libre de résilier.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Article 5 — Souscription</h2>
          <p className="mt-2">
            La souscription suppose la création d&apos;un compte par un adulte, la sélection de l&apos;offre,
            l&apos;acceptation des présentes CGV et la validation du paiement. Un e-mail de confirmation
            récapitulant l&apos;abonnement est adressé au Client. La souscription est réservée aux personnes
            majeures disposant de la capacité juridique de contracter.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Article 6 — Paiement</h2>
          <p className="mt-2">
            Le paiement s&apos;effectue en ligne par carte bancaire via notre <strong>prestataire de paiement
            sécurisé (Stripe)</strong>. L&apos;abonnement est prélevé <strong>mensuellement et par avance</strong>,
            à la date anniversaire de la souscription. Les coordonnées bancaires du Client sont traitées
            directement par le prestataire et ne sont pas conservées par l&apos;éditeur.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Article 7 — Durée, reconduction et résiliation</h2>
          <p className="mt-2">
            L&apos;abonnement est conclu pour une durée d&apos;<strong>un mois, reconductible tacitement</strong>
            par périodes successives d&apos;un mois. Conformément aux articles L.215-1 et suivants et L.215-4 du
            Code de la consommation, le Client peut <strong>résilier à tout moment</strong>, sans frais ni
            justification, depuis son espace compte ou par simple demande à{" "}
            <a className="text-teal-600 hover:underline" href="mailto:kaidenvialle@gmail.com">
              kaidenvialle@gmail.com
            </a>
            . La résiliation prend effet à la fin de la période mensuelle en cours&nbsp;; l&apos;accès premium
            reste actif jusqu&apos;à cette échéance et aucun nouveau prélèvement n&apos;intervient ensuite.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Article 8 — Droit de rétractation</h2>
          <p className="mt-2">
            Conformément aux articles L.221-18 et suivants du Code de la consommation, le Client dispose d&apos;un
            délai de <strong>14 jours</strong> à compter de la souscription pour exercer son droit de rétractation,
            sans avoir à se justifier. Toutefois, s&apos;agissant d&apos;un contenu numérique fourni immédiatement,
            <strong> en validant son paiement, le Client demande expressément l&apos;accès immédiat au Service et
            reconnaît renoncer à son droit de rétractation</strong> pour la partie déjà exécutée (article
            L.221-28, 13° du Code de la consommation) — cette information lui est rappelée sur la page de
            paiement avant validation. S&apos;il exerce sa rétractation dans le délai de 14 jours, le Client est
            remboursé au prorata de la période restant à courir. Il peut par ailleurs résilier à tout moment dans
            les conditions de l&apos;article 7. La demande de rétractation s&apos;exerce par e-mail à{" "}
            <a className="text-teal-600 hover:underline" href="mailto:kaidenvialle@gmail.com">
              kaidenvialle@gmail.com
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Article 9 — Monnaies virtuelles du jeu</h2>
          <p className="mt-2">
            Les pièces 🪙, diamants 💎 et cristaux 💠 utilisés dans l&apos;application sont des{" "}
            <strong>monnaies virtuelles sans aucune valeur monétaire réelle</strong>. Elles ne peuvent être ni
            achetées avec de l&apos;argent réel, ni échangées, ni remboursées. Elles servent uniquement à la
            progression dans le jeu et ne constituent pas un moyen de paiement.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Article 10 — Compte et usage par un enfant</h2>
          <p className="mt-2">
            Le Service est utilisé par l&apos;enfant sous la responsabilité et la supervision du parent titulaire
            de l&apos;abonnement. Le Client est responsable de la confidentialité de ses identifiants et de
            l&apos;usage fait de son compte. Un espace parents permet de paramétrer le temps d&apos;écran et les
            réglages du compte.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Article 11 — Disponibilité et responsabilité</h2>
          <p className="mt-2">
            L&apos;éditeur met tout en œuvre pour assurer la continuité et la qualité du Service, sans être tenu à
            une obligation de résultat. Sa responsabilité ne saurait être engagée en cas de force majeure,
            d&apos;interruption pour maintenance, ou d&apos;un dysfonctionnement imputable au matériel, à la
            connexion ou au navigateur du Client.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Article 12 — Données personnelles</h2>
          <p className="mt-2">
            Le traitement des données du Client et de l&apos;enfant est décrit dans notre{" "}
            <Link href="/politique-confidentialite" className="text-teal-600 hover:underline">
              politique de confidentialité
            </Link>
            , conforme au RGPD.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Article 13 — Réclamations</h2>
          <p className="mt-2">
            Toute réclamation peut être adressée à{" "}
            <a className="text-teal-600 hover:underline" href="mailto:kaidenvialle@gmail.com">
              kaidenvialle@gmail.com
            </a>
            . Nous nous engageons à y répondre dans les meilleurs délais.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Article 14 — Médiation de la consommation</h2>
          <p className="mt-2">
            Conformément à l&apos;article L.612-1 du Code de la consommation, le Client a le droit de recourir
            gratuitement à un médiateur de la consommation en vue de la résolution amiable d&apos;un litige,
            après avoir tenté de le résoudre directement avec l&apos;éditeur. Les coordonnées du médiateur
            compétent sont communiquées à tout Client qui en fait la demande à{" "}
            <a className="text-teal-600 hover:underline" href="mailto:kaidenvialle@gmail.com">
              kaidenvialle@gmail.com
            </a>
            . Le Client peut également utiliser la plateforme européenne de règlement en ligne des litiges&nbsp;:{" "}
            <a
              className="text-teal-600 hover:underline"
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noreferrer"
            >
              ec.europa.eu/consumers/odr
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">Article 15 — Droit applicable et litiges</h2>
          <p className="mt-2">
            Les présentes CGV sont soumises au droit français. À défaut de résolution amiable, tout litige relève
            de la compétence des tribunaux français, dans les conditions prévues par le Code de la consommation.
          </p>
        </div>
      </section>

      <div className="mt-10 flex flex-wrap gap-4 text-sm">
        <Link href="/mentions-legales" className="text-teal-600 font-semibold hover:underline">
          ← Mentions légales
        </Link>
        <Link href="/politique-confidentialite" className="text-teal-600 font-semibold hover:underline">
          Politique de confidentialité →
        </Link>
      </div>
    </main>
  );
}
