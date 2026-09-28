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
