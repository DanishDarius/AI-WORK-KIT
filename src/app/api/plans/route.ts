import { NextResponse } from "next/server";
import { getAbonnement } from "@/lib/abonnement";
import { lireCatalogue, metierParSlug } from "@/lib/contenu";
import { echapperHtml, envoyerEmailEquipe } from "@/lib/email";
import { texteBorne } from "@/lib/normaliser";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireActiveUser } from "@/lib/supabase/active-access";

// Demandes sur mesure (réservées à l'abonnement).
// GET  /api/plans               : toutes les demandes de la personne.
// GET  /api/plans?metier=slug   : ses demandes de tâche pour ce métier.
// POST /api/plans               : nouvelle demande, enregistrée puis envoyée
//                                 par email à l'équipe, qui la prépare.
// Deux types : « tache » (8 par mois, livrée en 30 min à 2 h) et « metier »
// (un kit complet, 2 par mois, livré en 8 h à 24 h).

const IAS = ["chatgpt", "claude", "gemini"] as const;
const IA_LABELS: Record<string, string> = { chatgpt: "ChatGPT", claude: "Claude", gemini: "Gemini" };
const LIMITES = { tache: 8, metier: 2 } as const;
const DELAIS = { tache: "30 min à 2 h", metier: "8 h à 24 h" } as const;
type TypeDemande = keyof typeof LIMITES;

export type PlanSurMesure = {
  id: string;
  type: TypeDemande;
  metier_nom: string;
  description: string;
  ias: string[];
  statut: "recue" | "en_cours" | "livre";
  plan: string | null;
  cree_le: string;
  livre_le: string | null;
};

const COLONNES = "id, type, metier_nom, description, ias, statut, plan, cree_le, livre_le";

async function verifierAbonne() {
  const access = await requireActiveUser();
  if ("response" in access) return access;
  const abonnement = await getAbonnement(access.user.email);
  if (!abonnement.actif)
    return {
      response: NextResponse.json(
        { error: "Le sur-mesure est inclus dans l’abonnement." },
        { status: 403 },
      ),
    };
  return access;
}

export async function GET(request: Request) {
  const access = await verifierAbonne();
  if ("response" in access) return access.response;
  const metier = new URL(request.url).searchParams.get("metier");

  // Une seule requête (règle C2) : les demandes du compte, les plus récentes
  // d'abord. Le quota du mois (10 demandes au plus) et le filtre par métier
  // se calculent sur cette liste.
  const { data, error } = await createAdminClient()
    .from("demandes_plans")
    .select(`${COLONNES}, metier_slug`)
    .eq("user_id", access.user.id)
    .order("cree_le", { ascending: false })
    .limit(200);
  if (error) return NextResponse.json({ error: "Chargement impossible." }, { status: 500 });

  const lignes = (data ?? []) as unknown as (PlanSurMesure & { metier_slug: string })[];
  const plans = lignes
    .filter((p) => !metier || (p.metier_slug === metier && p.type === "tache"))
    .slice(0, 50)
    .map((p) => ({
      id: p.id,
      type: p.type,
      metier_nom: p.metier_nom,
      description: p.description,
      ias: p.ias,
      statut: p.statut,
      plan: p.statut === "livre" ? p.plan : null,
      cree_le: p.cree_le,
      livre_le: p.livre_le,
    }));

  const debutMois = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1)).toISOString();
  const utilise = { tache: 0, metier: 0 };
  for (const d of lignes) if (d.cree_le >= debutMois && (d.type === "tache" || d.type === "metier")) utilise[d.type] += 1;
  return NextResponse.json(
    { plans, restant: { tache: Math.max(0, LIMITES.tache - utilise.tache), metier: Math.max(0, LIMITES.metier - utilise.metier) } },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}

export async function POST(request: Request) {
  const access = await verifierAbonne();
  if ("response" in access) return access.response;
  const { user } = access;

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Demande illisible." }, { status: 400 });
  if (typeof body.site === "string" && body.site.trim()) return NextResponse.json({ ok: true });

  const type: TypeDemande = body.type === "metier" ? "metier" : "tache";
  const ias = Array.isArray(body.ias) ? IAS.filter((ia) => (body.ias as unknown[]).includes(ia)) : [];
  if (!ias.length) return NextResponse.json({ error: "Choisissez au moins une IA." }, { status: 400 });

  let metierSlug = "sur-mesure";
  let metierNom = "";
  let details: Record<string, string> = {};
  let description = "";

  if (type === "tache") {
    const slug = texteBorne(body.metier, 120);
    const libre = texteBorne(body.metier_libre, 120);
    const tache = texteBorne(body.tache, 3000);
    const donnees = texteBorne(body.donnees, 2000);
    const resultat = texteBorne(body.resultat, 1000);
    if (slug && slug !== "autre") {
      let metier;
      try {
        metier = metierParSlug(await lireCatalogue(), slug);
      } catch (erreur) {
        console.error("[plans] catalogue illisible", erreur);
        return NextResponse.json({ error: "Envoi impossible. Réessayez dans un instant." }, { status: 500 });
      }
      if (!metier) return NextResponse.json({ error: "Métier introuvable." }, { status: 404 });
      metierSlug = metier.slug;
      metierNom = metier.nom;
    } else if (libre.length >= 3) {
      metierNom = libre;
    } else {
      return NextResponse.json({ error: "Indiquez votre métier." }, { status: 400 });
    }
    if (tache.length < 30)
      return NextResponse.json({ error: "Décrivez la tâche en quelques phrases : ce que vous faites et dans quel contexte." }, { status: 400 });
    if (resultat.length < 10) return NextResponse.json({ error: "Dites quel résultat vous attendez." }, { status: 400 });
    details = { tache, donnees, resultat };
    description = [`Tâche : ${tache}`, donnees && `Données et documents : ${donnees}`, `Résultat attendu : ${resultat}`].filter(Boolean).join("\n\n");
  } else {
    const intitule = texteBorne(body.intitule, 120);
    const pays = texteBorne(body.pays, 80);
    const clients = texteBorne(body.clients, 1000);
    const taches = texteBorne(body.taches, 3000);
    const outils = texteBorne(body.outils, 1000);
    if (intitule.length < 3) return NextResponse.json({ error: "Indiquez l’intitulé de votre métier." }, { status: 400 });
    if (pays.length < 2) return NextResponse.json({ error: "Indiquez votre pays." }, { status: 400 });
    if (clients.length < 10) return NextResponse.json({ error: "Dites pour qui vous travaillez." }, { status: 400 });
    if (taches.length < 30) return NextResponse.json({ error: "Listez les tâches qui vous prennent le plus de temps." }, { status: 400 });
    metierNom = intitule;
    details = { intitule, pays, clients, taches, outils };
    description = [`Métier : ${intitule} (${pays})`, `Clients : ${clients}`, `Tâches les plus longues : ${taches}`, outils && `Outils : ${outils}`].filter(Boolean).join("\n\n");
  }

  const admin = createAdminClient();
  const debutMois = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1)).toISOString();
  const { count, error: erreurCompte } = await admin
    .from("demandes_plans")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("type", type)
    .gte("cree_le", debutMois);
  // Règle S13 : si le quota ne peut pas être vérifié, on n'enregistre rien.
  if (erreurCompte) {
    console.error("[plans] quota non vérifiable", erreurCompte.message);
    return NextResponse.json({ error: "Envoi impossible. Réessayez dans un instant." }, { status: 500 });
  }
  if ((count ?? 0) >= LIMITES[type])
    return NextResponse.json(
      { error: type === "tache" ? "Vous avez utilisé vos 8 tâches sur mesure de ce mois. Elles reviennent le 1er du mois prochain." : "Vous avez utilisé vos 2 métiers sur mesure de ce mois. Ils reviennent le 1er du mois prochain." },
      { status: 429 },
    );

  const { data: ligne, error } = await admin
    .from("demandes_plans")
    .insert({
      user_id: user.id,
      email: user.email,
      type,
      metier_slug: metierSlug,
      metier_nom: metierNom,
      description,
      details,
      ias,
    })
    .select(COLONNES)
    .single();
  if (error || !ligne) {
    console.error("[plans] enregistrement en échec", error?.message);
    return NextResponse.json({ error: "Envoi impossible. Réessayez dans un instant." }, { status: 500 });
  }

  const iasTexte = ias.map((ia) => IA_LABELS[ia]).join(", ");
  const titre = `${type === "tache" ? "Tâche sur mesure" : "Métier sur mesure"} · ${metierNom} · à livrer en ${DELAIS[type]}`;
  const envoye = await envoyerEmailEquipe({
    tag: "plans",
    replyTo: user.email,
    subject: `${titre} · ${user.email}`,
    text: [
      titre,
      "",
      `Compte : ${user.email}`,
      `Plan pour : ${iasTexte}`,
      "",
      "Demande :",
      description,
      "",
      `Pour livrer : Supabase > demandes_plans > ligne ${ligne.id} : remplir « plan » (markdown), passer « statut » à livre et renseigner « livre_le ».`,
    ].join("\n"),
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#111">
<h2 style="margin:0 0 16px">${echapperHtml(titre)}</h2>
<p><strong>Compte :</strong> ${echapperHtml(user.email)}<br><strong>Plan pour :</strong> ${echapperHtml(iasTexte)}</p>
<p style="white-space:pre-wrap;border-left:3px solid #0b6b5e;padding-left:12px">${echapperHtml(description)}</p>
<p style="color:#666;font-size:13px">Pour livrer : Supabase &gt; demandes_plans &gt; ligne ${ligne.id} : remplir « plan » (markdown), passer « statut » à livre et renseigner « livre_le ».</p>
</div>`,
  });
  if (envoye) await admin.from("demandes_plans").update({ email_envoye: true }).eq("id", ligne.id);

  return NextResponse.json({ plan: ligne });
}
