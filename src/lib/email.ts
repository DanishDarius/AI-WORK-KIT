import "server-only";

// Envoi d'un email à l'équipe via l'API Resend.
// Variables : RESEND_API_KEY, CONTACT_EMAIL_FROM, CONTACT_EMAIL_TO (optionnelle).
export async function envoyerEmailEquipe(message: {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  tag: string;
}) {
  const cle = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM;
  const to = process.env.CONTACT_EMAIL_TO || "support@parlonsads.com";
  if (!cle || !from) {
    console.error(`[${message.tag}] RESEND_API_KEY ou CONTACT_EMAIL_FROM manquant`);
    return false;
  }
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${cle}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        ...(message.replyTo ? { reply_to: message.replyTo } : {}),
        subject: message.subject,
        text: message.text,
        html: message.html,
      }),
    });
    if (!response.ok) {
      console.error(`[${message.tag}] Resend`, response.status, await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error(`[${message.tag}] Resend injoignable`, error);
    return false;
  }
}

export function echapperHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Envoi d'e-mails aux clients (e-mail de la semaine, rappels d'échéance), par
// lots, via l'API Resend. Variables : RESEND_API_KEY, puis
// NOTIFICATIONS_EMAIL_FROM ou, à défaut, CONTACT_EMAIL_FROM.
//
// Renvoie, pour chaque message, s'il a été accepté par Resend. Un lot refusé
// marque tous ses messages comme échoués : le journal des envois les
// reprendra au passage suivant.
export type EmailClient = {
  to: string;
  subject: string;
  text: string;
  html: string;
  /** Lien « ne plus recevoir », ajouté dans les en-têtes du message. */
  desabonnement?: string;
};

const TAILLE_LOT = 50;

export function emailsClientsConfigures() {
  return Boolean(process.env.RESEND_API_KEY && (process.env.NOTIFICATIONS_EMAIL_FROM || process.env.CONTACT_EMAIL_FROM));
}

export async function envoyerEmailsClients(messages: EmailClient[], tag: string): Promise<boolean[]> {
  const cle = process.env.RESEND_API_KEY;
  const from = process.env.NOTIFICATIONS_EMAIL_FROM || process.env.CONTACT_EMAIL_FROM;
  if (!cle || !from) {
    console.error(`[${tag}] RESEND_API_KEY ou adresse d'expédition manquante`);
    return messages.map(() => false);
  }
  const resultats: boolean[] = [];
  for (let debut = 0; debut < messages.length; debut += TAILLE_LOT) {
    const lot = messages.slice(debut, debut + TAILLE_LOT);
    let accepte = false;
    try {
      const response = await fetch("https://api.resend.com/emails/batch", {
        method: "POST",
        headers: { Authorization: `Bearer ${cle}`, "Content-Type": "application/json" },
        body: JSON.stringify(
          lot.map((m) => ({
            from,
            to: [m.to],
            subject: m.subject,
            text: m.text,
            html: m.html,
            ...(m.desabonnement ? { headers: { "List-Unsubscribe": `<${m.desabonnement}>` } } : {}),
          })),
        ),
      });
      accepte = response.ok;
      if (!accepte) console.error(`[${tag}] Resend`, response.status, await response.text());
    } catch (error) {
      console.error(`[${tag}] Resend injoignable`, error);
    }
    for (let i = 0; i < lot.length; i += 1) resultats.push(accepte);
  }
  return resultats;
}
