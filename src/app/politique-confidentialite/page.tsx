import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Les mondes du Savoir",
  description:
    "Comment Les mondes du Savoir collecte, utilise et protège les données personnelles (RGPD). Données locales, compte cloud optionnel, droits des utilisateurs.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-5 py-10 sm:py-14">
      <Link href="/dashboard" className="text-sm font-semibold text-teal-600 hover:underline">
        ← Retour
      </Link>

      <h1 className="mt-4 text-3xl sm:text-4xl font-black text-teal-800">Politique de confidentialité</h1>
      <p className="mt-2 text-sm text-slate-500">Dernière mise à jour : juillet 2026</p>

      <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-900">
        Les mondes du Savoir est un service <strong>destiné aux enfants</strong>. Nous accordons une importance
        particulière à la protection de leurs données. Notre principe&nbsp;: <strong>collecter le strict
        minimum</strong>, ne jamais revendre de données et n&apos;utiliser <strong>aucune publicité ciblée ni
        traceur marketing</strong>.
      </div>

      <section className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <div>
          <h2 className="text-xl font-bold text-teal-700">1. Responsable du traitement</h2>
          <p className="mt-2">
            Le responsable du traitement des données est l&apos;éditeur de Les mondes du Savoir (voir les{" "}
            <Link href="/mentions-legales" className="text-teal-600 hover:underline">
              mentions légales
            </Link>
            ). Pour toute question relative à vos données ou à l&apos;exercice de vos droits, contactez&nbsp;:{" "}
            <a className="text-teal-600 hover:underline" href="mailto:kaidenvialle@gmail.com">
              kaidenvialle@gmail.com
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">2. Données que nous traitons</h2>

          <h3 className="mt-3 font-bold text-slate-800">a) Données enregistrées sur votre appareil (par défaut)</h3>
          <p className="mt-1">
            Par défaut, l&apos;application fonctionne <strong>100&nbsp;% en local</strong>. Le profil de jeu est
            stocké uniquement dans le navigateur de l&apos;appareil (localStorage) et <strong>n&apos;est transmis
            à aucun serveur</strong>. Il comprend&nbsp;: le prénom ou pseudonyme de l&apos;enfant, l&apos;avatar
            choisi, la progression (leçons, quiz, badges), les monnaies virtuelles du jeu, les réglages (temps
            d&apos;écran, sons) et un code à 4 chiffres de connexion locale.
          </p>

          <h3 className="mt-3 font-bold text-slate-800">b) Compte cloud (optionnel)</h3>
          <p className="mt-1">
            Si un parent choisit de créer un compte pour sauvegarder et synchroniser la progression entre
            plusieurs appareils, nous traitons&nbsp;: l&apos;<strong>adresse e-mail du parent</strong>, un{" "}
            <strong>mot de passe</strong> (stocké de façon chiffrée/hachée par notre prestataire
            d&apos;authentification, jamais en clair) et le <strong>profil de jeu synchronisé</strong>. Cette
            fonction est facultative&nbsp;: sans compte, aucune de ces données n&apos;est envoyée.
          </p>

          <h3 className="mt-3 font-bold text-slate-800">c) Abonnement &amp; paiement</h3>
          <p className="mt-1">
            En cas de souscription à l&apos;offre payante, le paiement est traité par un{" "}
            <strong>prestataire de paiement sécurisé (Stripe)</strong>. Vos coordonnées bancaires sont saisies
            directement chez ce prestataire et <strong>ne sont ni vues ni stockées par nous</strong>. Nous
            conservons uniquement les informations nécessaires au suivi de l&apos;abonnement et à la facturation
            (statut, dates, montant).
          </p>

          <h3 className="mt-3 font-bold text-slate-800">d) Données techniques</h3>
          <p className="mt-1">
            Nos hébergeurs peuvent générer des journaux techniques (adresse IP, type de navigateur, horodatage)
            à des fins de sécurité et de bon fonctionnement du service. Nous n&apos;utilisons pas ces données à
            des fins publicitaires.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">3. Finalités et bases légales</h2>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Fournir le jeu et sauvegarder la progression — <em>exécution du contrat / intérêt légitime</em>.</li>
            <li>Gérer le compte et l&apos;authentification — <em>exécution du contrat</em>.</li>
            <li>Gérer l&apos;abonnement et la facturation — <em>exécution du contrat et obligation légale</em>.</li>
            <li>Assurer la sécurité et prévenir la fraude — <em>intérêt légitime</em>.</li>
            <li>Répondre à vos demandes — <em>intérêt légitime</em>.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">4. Enfants et consentement parental</h2>
          <p className="mt-2">
            Le service s&apos;adresse à des enfants utilisant l&apos;application <strong>sous la responsabilité
            d&apos;un parent</strong> ou d&apos;un adulte responsable. La création d&apos;un compte cloud et la
            souscription à un abonnement sont réservées à un adulte. Conformément à l&apos;article 8 du RGPD et à
            la loi française, le consentement au traitement des données d&apos;un mineur de moins de 15 ans est
            donné ou autorisé par le titulaire de l&apos;autorité parentale. Nous ne demandons pas de données
            sensibles et n&apos;exigeons de l&apos;enfant qu&apos;un prénom ou un pseudonyme.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">5. Destinataires et sous-traitants</h2>
          <p className="mt-2">
            Vos données ne sont <strong>jamais vendues</strong>. Elles peuvent être traitées par des
            sous-traitants techniques agissant pour notre compte, uniquement dans la mesure nécessaire au
            service&nbsp;:
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li><strong>Vercel</strong> — hébergement du site.</li>
            <li><strong>Supabase</strong> — authentification et base de données (compte cloud)&nbsp;; données hébergées dans l&apos;Union européenne.</li>
            <li><strong>Stripe</strong> — traitement des paiements de l&apos;abonnement.</li>
            <li><strong>Brevo</strong> (société française) — envoi des e-mails de service, comme la confirmation d&apos;abonnement.</li>
          </ul>
          <p className="mt-2">
            Certains de ces prestataires peuvent être situés hors de l&apos;Union européenne. Dans ce cas, les
            transferts sont encadrés par des garanties appropriées (clauses contractuelles types de la Commission
            européenne).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">6. Durée de conservation</h2>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Données locales&nbsp;: conservées sur l&apos;appareil jusqu&apos;à leur effacement par vous.</li>
            <li>Compte cloud&nbsp;: conservé tant que le compte est actif, puis supprimé sur demande ou après une période d&apos;inactivité prolongée.</li>
            <li>Données de facturation&nbsp;: conservées le temps requis par les obligations comptables et fiscales (jusqu&apos;à 10 ans).</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">7. Vos droits</h2>
          <p className="mt-2">
            Conformément au RGPD, vous disposez des droits d&apos;<strong>accès</strong>, de{" "}
            <strong>rectification</strong>, d&apos;<strong>effacement</strong>, de <strong>limitation</strong>,
            d&apos;<strong>opposition</strong> et de <strong>portabilité</strong> de vos données, ainsi que du
            droit de définir des directives relatives à leur sort après votre décès. Pour les exercer, écrivez à{" "}
            <a className="text-teal-600 hover:underline" href="mailto:kaidenvialle@gmail.com">
              kaidenvialle@gmail.com
            </a>
            . Les données stockées localement peuvent en outre être effacées à tout moment depuis l&apos;espace
            parents ou en vidant les données du navigateur.
          </p>
          <p className="mt-2">
            Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de
            la <strong>CNIL</strong> —{" "}
            <a className="text-teal-600 hover:underline" href="https://www.cnil.fr" target="_blank" rel="noreferrer">
              www.cnil.fr
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">8. Cookies et traceurs</h2>
          <p className="mt-2">
            Nous n&apos;utilisons <strong>pas de cookies publicitaires ni de traceurs marketing</strong>. Seuls
            des éléments strictement nécessaires au fonctionnement du service sont utilisés&nbsp;: stockage local
            de votre profil et, si vous vous connectez, un jeton d&apos;authentification permettant de maintenir
            votre session. Ces éléments essentiels ne requièrent pas de consentement préalable.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">9. Sécurité</h2>
          <p className="mt-2">
            Nous mettons en œuvre des mesures techniques et organisationnelles adaptées&nbsp;: chiffrement des
            échanges (HTTPS), mots de passe hachés, cloisonnement des données par utilisateur (règles de sécurité
            au niveau de la base de données). Aucun système n&apos;étant infaillible, nous vous invitons à
            choisir un mot de passe robuste et à ne pas le partager.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">10. Modifications</h2>
          <p className="mt-2">
            La présente politique peut être mise à jour. La date de dernière mise à jour figure en haut de page.
            En cas de changement important, nous en informerons les utilisateurs disposant d&apos;un compte.
          </p>
        </div>
      </section>

      <div className="mt-10 flex flex-wrap gap-4 text-sm">
        <Link href="/mentions-legales" className="text-teal-600 font-semibold hover:underline">
          ← Mentions légales
        </Link>
        <Link href="/cgv" className="text-teal-600 font-semibold hover:underline">
          Conditions générales de vente →
        </Link>
      </div>
    </main>
  );
}
