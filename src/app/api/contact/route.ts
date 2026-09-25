import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
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
// Variables d'environnement (Vercel) : RESEND_API_KEY, CONTACT_EMAIL_FROM
// (adresse d'un domaine vérifié dans Resend), CONTACT_EMAIL_TO (optionnelle).

const MAX_PAR_HEURE = 5;
const MAX_CHAMP = 4000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function texte(valeur: unknown, max = MAX_CHAMP) {
  return typeof valeur === "string" ? valeur.trim().slice(0, max) : "";
}

function echapper(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

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
  if (!EMAIL_RE.test(email))
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
  const { count } = await admin
    .from("demandes_contact")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("cree_le", depuis);
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

  const envoye = await envoyerEmail({
    formulaire,
    nom,
    email,
    entreprise,
    fonction,
    reponses,
    compte: user.email ?? "",
  });

  if (ligne && envoye)
    await admin.from("demandes_contact").update({ email_envoye: true }).eq("id", ligne.id);

  if (erreurInsert && !envoye) {
    console.error("[contact] enregistrement et email en échec", erreurInsert.message);
    return NextResponse.json({ error: "Envoi impossible." }, { status: 500 });
  }
  if (erreurInsert) console.error("[contact] enregistrement en échec", erreurInsert.message);
  if (!envoye) console.error("[contact] email non envoyé, demande enregistrée", ligne?.id);

  return NextResponse.json({ ok: true });
}

async function envoyerEmail(d: {
  formulaire: Formulaire;
  nom: string;
  email: string;
  entreprise: string;
  fonction: string;
  reponses: Record<string, string>;
  compte: string;
}) {
  const cle = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM;
  const to = process.env.CONTACT_EMAIL_TO || "support@parlonsads.com";
  if (!cle || !from) {
    console.error("[contact] RESEND_API_KEY ou CONTACT_EMAIL_FROM manquant");
    return false;
  }

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
<h2 style="margin:0 0 16px">${echapper(titre)}</h2>
<table cellpadding="8" style="border-collapse:collapse;max-width:640px">
${remplies
  .map(
    ([label, v]) =>
      `<tr><td style="vertical-align:top;font-weight:bold;border-bottom:1px solid #eee;white-space:nowrap">${echapper(label)}</td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${echapper(v)}</td></tr>`,
  )
  .join("\n")}
</table>
<p style="color:#666;font-size:13px;margin-top:16px">Répondez directement à cet email pour écrire au prospect.</p>
</div>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cle}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: d.email,
        subject: `${titre} · ${d.nom}${d.entreprise ? ` (${d.entreprise})` : ""}`,
        text,
        html,
      }),
    });
    if (!response.ok) {
      console.error("[contact] Resend", response.status, await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("[contact] Resend injoignable", error);
    return false;
  }
}
