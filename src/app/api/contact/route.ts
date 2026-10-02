import { NextResponse } from "next/server";
import { echapperHtml, envoyerEmailEquipe } from "@/lib/email";
import { estEmail, texteBorne } from "@/lib/normaliser";
import { erreurServeur } from "@/lib/reponses-api";
import { requireActiveUser } from "@/lib/supabase/active-access";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  champsReponses,
  formulaireLabels,
  type DemandeContact,
  type Formulaire,
} from "@/lib/contact";

// POST /api/contact : reçoit une demande des formulaires "Systèmes IA" et
// "Transformation IA".
// 1. La demande est enregistrée dans la table demandes_contact (jamais perdue).
// 2. Un email est envoyé via Resend à CONTACT_EMAIL_TO (support@parlonsads.com
//    par défaut), avec "Répondre" qui répond directement au prospect.
// L'envoi passe par src/lib/email.ts (variables RESEND_API_KEY,
// CONTACT_EMAIL_FROM, CONTACT_EMAIL_TO).

const MAX_PAR_HEURE = 5;
const MAX_CHAMP = 4000;

const texte = (valeur: unknown, max = MAX_CHAMP) => texteBorne(valeur, max);

export async function POST(request: Request) {
  // Règle S1 : session ET accès payé actif, comme les autres routes.
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { user } = access;

  const body = (await request.json().catch(() => null)) as Partial<DemandeContact> | null;
  if (!body) return NextResponse.json({ error: "Demande illisible." }, { status: 400 });

  // Robot : on répond "OK" sans rien enregistrer ni envoyer.
  if (texte(body.site)) return NextResponse.json({ ok: true });

  const formulaire = body.formulaire as Formulaire;
  if (!(formulaire in formulaireLabels))
    return NextResponse.json({ error: "Formulaire inconnu." }, { status: 400 });

  const nom = texte(body.nom, 200);
  const email = texte(body.email, 200);
  const entreprise = texte(body.entreprise, 200);
  const fonction = texte(body.fonction, 200);
  const reponses: Record<string, string> = {};
  for (const [cle] of champsReponses[formulaire]) {
    const valeur = texte(body.reponses?.[cle]);
    if (valeur) reponses[cle] = valeur;
  }

  if (!nom) return NextResponse.json({ error: "Indiquez votre nom." }, { status: 400 });
  if (!estEmail(email))
    return NextResponse.json({ error: "Indiquez un email valide." }, { status: 400 });
  const obligatoire = formulaire === "systemes-ia" ? "besoin" : "activite";
  if (!reponses[obligatoire])
    return NextResponse.json(
      {
        error:
          formulaire === "systemes-ia"
            ? "Décrivez votre besoin."
            : "Indiquez l'activité que vous souhaitez améliorer.",
      },
      { status: 400 },
    );

  const admin = createAdminClient();

  // Limite anti-abus : quelques demandes par heure et par compte.
  const depuis = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count, error: erreurCompte } = await admin
    .from("demandes_contact")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("cree_le", depuis);
  // Règle S13 : si la limite ne peut pas être vérifiée, on n'envoie rien.
  if (erreurCompte) return erreurServeur("contact", erreurCompte.message, "Envoi impossible.");
  if ((count ?? 0) >= MAX_PAR_HEURE)
    return NextResponse.json({ error: "Trop de demandes." }, { status: 429 });

  const { data: ligne, error: erreurInsert } = await admin
    .from("demandes_contact")
    .insert({
      user_id: user.id,
      formulaire,
      nom,
      email,
      entreprise: entreprise || null,
      fonction: fonction || null,
      reponses,
    })
    .select("id")
    .single();

  // Règle S13 : la limite compte les lignes enregistrées. Sans enregistrement,
  // pas d'e-mail, sinon la limite ne protégerait plus rien.
  if (erreurInsert || !ligne) {
    return erreurServeur("contact", erreurInsert?.message ?? "insertion sans ligne", "Envoi impossible.");
  }

  const envoye = await envoyerEmail({
    formulaire,
    nom,
    email,
    entreprise,
    fonction,
    reponses,
    compte: user.email,
  });

  if (envoye) await admin.from("demandes_contact").update({ email_envoye: true }).eq("id", ligne.id);
  else console.error("[contact] email non envoyé, demande enregistrée", ligne.id);

  return NextResponse.json({ ok: true });
}

function envoyerEmail(d: {
  formulaire: Formulaire;
  nom: string;
  email: string;
  entreprise: string;
  fonction: string;
  reponses: Record<string, string>;
  compte: string;
}) {
  const lignes: [string, string][] = [
    ["Nom", d.nom],
    ["Email", d.email],
    ["Entreprise", d.entreprise],
    ["Fonction", d.fonction],
    ...champsReponses[d.formulaire].map(
      ([cle, label]) => [label, d.reponses[cle] ?? ""] as [string, string],
    ),
    ["Compte AI WORK KIT", d.compte],
  ];
  const remplies = lignes.filter(([, v]) => v);

  const titre = `Nouvelle demande · ${formulaireLabels[d.formulaire]}`;
  const text = [
    titre,
    "",
    ...remplies.map(([label, v]) => `${label} :\n${v}\n`),
    "Répondez directement à cet email pour écrire au prospect.",
  ].join("\n");
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#111">
<h2 style="margin:0 0 16px">${echapperHtml(titre)}</h2>
<table cellpadding="8" style="border-collapse:collapse;max-width:640px">
${remplies
  .map(
    ([label, v]) =>
      `<tr><td style="vertical-align:top;font-weight:bold;border-bottom:1px solid #eee;white-space:nowrap">${echapperHtml(label)}</td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${echapperHtml(v)}</td></tr>`,
  )
  .join("\n")}
</table>
<p style="color:#666;font-size:13px;margin-top:16px">Répondez directement à cet email pour écrire au prospect.</p>
</div>`;

  return envoyerEmailEquipe({
    tag: "contact",
    replyTo: d.email,
    subject: `${titre} · ${d.nom}${d.entreprise ? ` (${d.entreprise})` : ""}`,
    text,
    html,
  });
}
