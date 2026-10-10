import "server-only";

import { echapperHtml } from "@/lib/email";
import { SIGLE, SITE } from "@/lib/marque";

// Les deux e-mails envoyés par l'application aux clients : l'e-mail de la
// semaine (abonnés) et le rappel d'échéance (abonnements au mois ou à
// l'année). Mêmes règles que le reste (Q7) : français, vouvoiement, pas de
// tiret long, aucune promesse chiffrée. Aucune image : le message reste léger
// et ne dépend d'aucun fichier.

export type LigneEmail = { libelle: string; titre: string; lien: string };

const dateLongue = (iso: string) => new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "UTC" }).format(new Date(iso));

function habiller(titre: string, corps: string, pied: string) {
  return `<!doctype html><html lang="fr"><body style="margin:0;background:#f6f8f7;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;color:#17211f;line-height:1.55">
<div style="max-width:560px;margin:0 auto;padding:24px 16px">
<p style="margin:0 0 16px;font-weight:900;font-size:18px;color:#0b6b5e">${SIGLE}</p>
<div style="background:#ffffff;border:2px solid #e2e8e5;border-radius:18px;padding:24px">
<h1 style="margin:0 0 14px;font-size:22px;line-height:1.3">${echapperHtml(titre)}</h1>
${corps}
</div>
<p style="margin:16px 4px 0;font-size:13px;color:#56615e">${pied}</p>
</div></body></html>`;
}

const bouton = (lien: string, texte: string) =>
  `<p style="margin:18px 0 0"><a href="${echapperHtml(lien)}" style="display:inline-block;padding:12px 18px;border-radius:14px;background:#0b6b5e;color:#ffffff;font-weight:700;text-decoration:none">${echapperHtml(texte)}</a></p>`;

/** L'e-mail de la semaine : ce qui est paru dans le fil Nouveau ces sept derniers jours. */
export function emailDeLaSemaine({ lignes, lienDesabonnement }: { lignes: LigneEmail[]; lienDesabonnement: string }) {
  const premiere = lignes[0];
  const subject = premiere ? `${premiere.libelle} : ${premiere.titre}` : `Nouveau cette semaine sur ${SIGLE}`;
  const intro = "Voici ce qui est paru cette semaine dans votre fil Nouveau.";
  const text = [
    "Bonjour,",
    "",
    intro,
    "",
    ...lignes.flatMap((l) => [`${l.libelle} : ${l.titre}`, l.lien, ""]),
    `Tout le fil : ${SITE}/nouveau`,
    "",
    `Vous recevez ce message parce que vous êtes abonné à ${SIGLE}.`,
    `Pour ne plus recevoir l'e-mail de la semaine : ${lienDesabonnement}`,
  ].join("\n");
  const corps = `<p style="margin:0 0 14px">Bonjour,</p><p style="margin:0 0 14px">${echapperHtml(intro)}</p>
${lignes
  .map(
    (l) =>
      `<p style="margin:0 0 12px;padding:12px 14px;border:2px solid #e2e8e5;border-radius:14px"><span style="display:block;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#0b6b5e">${echapperHtml(l.libelle)}</span><a href="${echapperHtml(l.lien)}" style="color:#17211f;font-weight:700;text-decoration:none">${echapperHtml(l.titre)}</a></p>`,
  )
  .join("\n")}
${bouton(`${SITE}/nouveau`, "Ouvrir le fil Nouveau")}`;
  const pied = `Vous recevez ce message parce que vous êtes abonné à ${SIGLE}. <a href="${echapperHtml(lienDesabonnement)}" style="color:#56615e">Ne plus recevoir l’e-mail de la semaine</a>.`;
  return { subject, text, html: habiller("Nouveau cette semaine", corps, pied) };
}

/** Le rappel d'échéance : 5 jours avant la fin de l'abonnement, puis le jour même. */
export function emailRappelEcheance({ jours, finLe, formule }: { jours: 5 | 0; finLe: string; formule: "mensuel" | "annuel" }) {
  const date = dateLongue(finLe);
  const nom = formule === "annuel" ? "annuel" : "mensuel";
  const titre = jours === 0 ? "Votre abonnement se termine aujourd’hui" : "Votre abonnement se termine dans 5 jours";
  const phrases = [
    jours === 0
      ? `Votre abonnement ${nom} à ${SIGLE} se termine aujourd’hui, le ${date}.`
      : `Votre abonnement ${nom} à ${SIGLE} se termine le ${date}.`,
    "Rien n’est prélevé automatiquement : pour continuer, il suffit de reprendre une formule depuis la page Abonnement.",
    "Sans renouvellement, vous gardez votre accès, vos kits, vos tâches et vos 10 guides inclus. La tâche de la semaine, les packs, les mises à jour des IA, le sur-mesure, le téléchargement des guides et le chat se referment.",
  ];
  const lien = `${SITE}/abonnement`;
  const text = ["Bonjour,", "", ...phrases.flatMap((p) => [p, ""]), `Reprendre une formule : ${lien}`, "", `Ce message concerne votre compte ${SIGLE}. Vous pouvez couper ces rappels dans Profil, Notifications.`].join("\n");
  const corps = `<p style="margin:0 0 14px">Bonjour,</p>${phrases.map((p) => `<p style="margin:0 0 14px">${echapperHtml(p)}</p>`).join("")}${bouton(lien, "Voir les formules")}`;
  const pied = `Ce message concerne votre compte ${SIGLE}. Vous pouvez couper ces rappels dans Profil, Notifications.`;
  return { subject: `${SIGLE} : ${titre.charAt(0).toLowerCase()}${titre.slice(1)}`, text, html: habiller(titre, corps, pied) };
}

/** La décision du correcteur sur l'exercice final d'une attestation (étape C). */
export function emailDecisionAttestation({
  decision,
  metier,
  slug,
  points,
  commentaire,
}: {
  decision: "valide" | "a_refaire";
  metier: string;
  slug: string;
  points: number;
  commentaire: string;
}) {
  const lien = `${SITE}/metiers/${encodeURIComponent(slug)}/attestation`;
  const titre = decision === "valide" ? "Votre exercice final est validé" : "Votre exercice final est à refaire";
  const phrases =
    decision === "valide"
      ? [
          `Votre rendu de l’exercice final, métier ${metier}, est validé : ${points} points sur 10.`,
          "Votre attestation à votre nom vous attend dans votre compte, sur la page Attestation du métier.",
        ]
      : [
          `Votre rendu de l’exercice final, métier ${metier}, n’est pas encore validé : ${points} points sur 10. Il en faut 7, sans 0 au critère des faits et des chiffres.`,
          "Corrigez ce qui est signalé, puis rendez à nouveau votre travail depuis la page Attestation du métier.",
        ];
  const mot = commentaire ? `Le mot du correcteur : ${commentaire}` : "";
  const bouton1 = decision === "valide" ? "Voir mon attestation" : "Reprendre l’exercice";
  const text = ["Bonjour,", "", phrases[0], "", ...(mot ? [mot, ""] : []), phrases[1], "", `${bouton1} : ${lien}`, "", `Ce message concerne votre compte ${SIGLE}.`].join("\n");
  const corps = `<p style="margin:0 0 14px">Bonjour,</p><p style="margin:0 0 14px">${echapperHtml(phrases[0])}</p>${
    mot
      ? `<p style="margin:0 0 14px;padding:12px 14px;border:2px solid #e2e8e5;border-radius:14px"><b>Le mot du correcteur.</b> ${echapperHtml(commentaire).replace(/\n/g, "<br>")}</p>`
      : ""
  }<p style="margin:0 0 14px">${echapperHtml(phrases[1])}</p>${bouton(lien, bouton1)}`;
  return {
    subject: `${SIGLE} : ${titre.charAt(0).toLowerCase()}${titre.slice(1)}`,
    text,
    html: habiller(titre, corps, `Ce message concerne votre compte ${SIGLE}.`),
  };
}
