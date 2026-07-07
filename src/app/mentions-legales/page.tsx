import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — Les mondes du Savoir",
  description:
    "Mentions légales de Les mondes du Savoir : éditeur, directeur de la publication, hébergeur, propriété intellectuelle.",
};

export default function MentionsLegalesPage() {
  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-5 py-10 sm:py-14">
      <Link href="/dashboard" className="text-sm font-semibold text-teal-600 hover:underline">
        ← Retour
      </Link>

      <h1 className="mt-4 text-3xl sm:text-4xl font-black text-teal-800">Mentions légales</h1>
      <p className="mt-2 text-sm text-slate-500">Dernière mise à jour : juillet 2026</p>

      <div className="mt-4 rounded-xl bg-sky-50 border border-sky-200 p-4 text-sm text-sky-900">
        Conformément à l&apos;article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans
        l&apos;économie numérique (LCEN), les informations suivantes sont portées à la connaissance des
        utilisateurs du site <strong>lesmondesdusavoir.fr</strong>.
      </div>

      <section className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <div>
          <h2 className="text-xl font-bold text-teal-700">1. Éditeur du site</h2>
          <p className="mt-2">
            Le site et l&apos;application <strong>Les mondes du Savoir</strong> sont édités par&nbsp;:
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>
              Dénomination / exploitant : <strong>Kaïden Zoghlami Vialle, entrepreneur individuel</strong>{" "}
              (service co-créé avec Mathys Julliand)
            </li>
            <li>
              Numéro SIRET : <strong>890&nbsp;831&nbsp;415&nbsp;00025</strong>
            </li>
            <li>TVA : non applicable, article 293&nbsp;B du Code général des impôts</li>
            <li>
              Adresse : 172 rue Charles Germain, 69400 Villefranche-sur-Saône, France
            </li>
            <li>
              Adresse e-mail :{" "}
              <a className="text-teal-600 hover:underline" href="mailto:kaidenvialle@gmail.com">
                kaidenvialle@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">2. Directeur de la publication</h2>
          <p className="mt-2">
            Le directeur de la publication est <strong>Kaïden Zoghlami Vialle</strong>, co-éditeur du service, joignable
            à l&apos;adresse{" "}
            <a className="text-teal-600 hover:underline" href="mailto:kaidenvialle@gmail.com">
              kaidenvialle@gmail.com
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">3. Hébergement</h2>
          <p className="mt-2">
            Le site est déployé et hébergé par&nbsp;:
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>
              <strong>Vercel Inc.</strong> — 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis —{" "}
              <a className="text-teal-600 hover:underline" href="https://vercel.com" target="_blank" rel="noreferrer">
                vercel.com
              </a>
            </li>
          </ul>
          <p className="mt-2">
            Les données de compte et de progression synchronisées dans le cloud (fonction optionnelle) sont
            stockées via&nbsp;:
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>
              <strong>Supabase Inc.</strong> — 970 Toa Payoh North #07-04, Singapour —{" "}
              <a className="text-teal-600 hover:underline" href="https://supabase.com" target="_blank" rel="noreferrer">
                supabase.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">4. Propriété intellectuelle</h2>
          <p className="mt-2">
            L&apos;ensemble des éléments composant Les mondes du Savoir (marque, nom, logo, textes, contenus
            pédagogiques, quiz, illustrations, sons, interface et code source) est protégé par le droit
            d&apos;auteur et le droit des marques. Ces éléments sont la propriété exclusive de l&apos;éditeur ou
            font l&apos;objet d&apos;une autorisation d&apos;usage. Toute reproduction, représentation, modification
            ou exploitation, totale ou partielle, sans l&apos;accord écrit préalable de l&apos;éditeur est
            interdite et constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la
            propriété intellectuelle.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">5. Responsabilité</h2>
          <p className="mt-2">
            L&apos;éditeur s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations
            diffusées, ainsi que la disponibilité du service. Il ne saurait toutefois être tenu responsable des
            erreurs, d&apos;une indisponibilité temporaire, ou de dommages résultant d&apos;une intrusion
            frauduleuse d&apos;un tiers. L&apos;utilisation du service se fait sous la responsabilité de
            l&apos;utilisateur&nbsp;; s&apos;agissant d&apos;un public d&apos;enfants, elle s&apos;effectue sous la
            supervision d&apos;un parent ou d&apos;un adulte responsable.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">6. Liens hypertextes</h2>
          <p className="mt-2">
            Le site peut contenir des liens vers des sites tiers. L&apos;éditeur n&apos;exerce aucun contrôle sur
            ces sites et décline toute responsabilité quant à leur contenu ou à leur politique de protection des
            données.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">7. Données personnelles &amp; cookies</h2>
          <p className="mt-2">
            Le traitement des données personnelles et l&apos;usage éventuel de cookies sont détaillés dans notre{" "}
            <Link href="/politique-confidentialite" className="text-teal-600 hover:underline">
              politique de confidentialité
            </Link>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-teal-700">8. Droit applicable</h2>
          <p className="mt-2">
            Les présentes mentions légales sont régies par le droit français. Pour toute question, vous pouvez
            écrire à{" "}
            <a className="text-teal-600 hover:underline" href="mailto:kaidenvialle@gmail.com">
              kaidenvialle@gmail.com
            </a>
            .
          </p>
        </div>
      </section>

      <div className="mt-10 flex flex-wrap gap-4 text-sm">
        <Link href="/politique-confidentialite" className="text-teal-600 font-semibold hover:underline">
          Politique de confidentialité →
        </Link>
        <Link href="/cgv" className="text-teal-600 font-semibold hover:underline">
          Conditions générales de vente →
        </Link>
      </div>
    </main>
  );
}
