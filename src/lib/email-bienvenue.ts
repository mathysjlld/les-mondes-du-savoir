// Email de bienvenue envoyé à l'achat de l'abonnement Famille (via Brevo).
// Volontairement non bloquant : si Brevo n'est pas configuré ou répond en
// erreur, on log et on continue — le paiement et le premium ne dépendent
// jamais de l'envoi du mail.
import { SITE_URL } from "./stripe-server";

const EXPEDITEUR = {
  name: "Les mondes du Savoir",
  email: "kaidenvialle@gmail.com",
};

export async function envoyerEmailBienvenue(destinataire: string) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn("BREVO_API_KEY absente — email de bienvenue non envoyé.");
    return;
  }

  const html = `
  <div style="font-family: 'Nunito', Verdana, sans-serif; background:#e9fbf7; padding:32px 16px;">
    <div style="max-width:560px; margin:0 auto; background:#ffffff; border-radius:24px; border:3px solid #ccfbf1; overflow:hidden;">
      <div style="background:linear-gradient(135deg,#14b8a6,#0d9488); padding:32px 24px; text-align:center;">
        <p style="font-size:44px; margin:0;">🌍</p>
        <h1 style="color:#ffffff; font-size:24px; margin:8px 0 0;">Bienvenue dans l'aventure complète&nbsp;!</h1>
      </div>
      <div style="padding:28px 28px 8px; color:#1e293b; font-size:15px; line-height:1.6;">
        <p>Bonjour,</p>
        <p>Votre abonnement <strong>Famille</strong> aux <strong>Mondes du Savoir</strong> est actif. 🎉</p>
        <p>Votre enfant a maintenant accès à&nbsp;:</p>
        <ul style="padding-left:20px;">
          <li>🌍 Les 13 univers, <strong>dont 2 mondes secrets</strong></li>
          <li>🧩 Tous les quizz, sans aucune limite</li>
          <li>🏆 Tous les badges et récompenses à collectionner</li>
          <li>🌳 L'Arbre du Savoir, le Marché et le Temple des Sages</li>
        </ul>
        <p style="text-align:center; margin:28px 0;">
          <a href="${SITE_URL}/dashboard"
             style="display:inline-block; background:#14b8a6; color:#ffffff; font-weight:bold; text-decoration:none; padding:14px 28px; border-radius:16px;">
            Commencer à explorer
          </a>
        </p>
        <p style="font-size:13px; color:#64748b;">
          L'abonnement est <strong>sans engagement</strong> (7&nbsp;€/mois) : vous pouvez le gérer ou le
          résilier à tout moment depuis la page
          <a href="${SITE_URL}/abonnement" style="color:#0d9488;">Mon abonnement</a>.
          Un reçu Stripe vous est envoyé pour chaque paiement.
        </p>
        <p style="font-size:13px; color:#64748b;">Bonne exploration&nbsp;!<br/>— Les mondes du Savoir</p>
      </div>
    </div>
  </div>`;

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: EXPEDITEUR,
        to: [{ email: destinataire }],
        subject: "🌍 Bienvenue ! Votre abonnement Famille est actif",
        htmlContent: html,
      }),
    });
    if (!res.ok) console.error("Envoi Brevo échoué:", res.status, await res.text());
  } catch (e) {
    console.error("Envoi Brevo échoué:", e);
  }
}
