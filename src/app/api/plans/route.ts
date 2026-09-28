import { NextResponse } from "next/server";
import { getAbonnement } from "@/lib/abonnement";
import { echapperHtml, envoyerEmailEquipe } from "@/lib/email";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireActiveUser } from "@/lib/supabase/active-access";

// Tâche sur mesure (réservée à l'abonnement Bibliothèque).
// GET  /api/plans?metier=slug : les demandes de la personne pour ce métier.
// POST /api/plans             : nouvelle demande, enregistrée puis envoyée
//                               par email à l'équipe, qui rédige le plan.

const IAS = ["chatgpt", "claude", "gemini"] as const;
const IA_LABELS: Record<string, string> = { chatgpt: "ChatGPT", claude: "Claude", gemini: "Gemini" };
const MAX_PAR_JOUR = 5;
const MIN_DESCRIPTION = 30;
const MAX_DESCRIPTION = 3000;

export type PlanSurMesure = {
  id: string;
  description: string;
  ias: string[];
  statut: "recue" | "en_cours" | "livre";
  plan: string | null;
  cree_le: string;
  livre_le: string | null;
};

async function verifierAbonne() {
  const access = await requireActiveUser();
  if ("response" in access) return access;
  const abonnement = await getAbonnement(access.user.email);
  if (!abonnement.actif)
    return {
      response: NextResponse.json(
        { error: "La tâche sur mesure est incluse dans l’abonnement Bibliothèque." },
        { status: 403 },
      ),
    };
  return access;
}

export async function GET(request: Request) {
  const access = await verifierAbonne();
  if ("response" in access) return access.response;
  const metier = new URL(request.url).searchParams.get("metier") ?? "";

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("demandes_plans")
    .select("id, description, ias, statut, plan, cree_le, livre_le")
    .eq("user_id", access.user.id)
    .eq("metier_slug", metier)
    .order("cree_le", { ascending: false })
    .limit(30);
  if (error) return NextResponse.json({ error: "Chargement impossible." }, { status: 500 });

  const plans = (data ?? []).map((p) => ({ ...p, plan: p.statut === "livre" ? p.plan : null }));
  return NextResponse.json({ plans }, { headers: { "Cache-Control": "private, no-store" } });
}

export async function POST(request: Request) {
  const access = await verifierAbonne();
  if ("response" in access) return access.response;
  const { supabase, user } = access;

  const body = (await request.json().catch(() => null)) as {
    metier?: unknown;
    description?: unknown;
    ias?: unknown;
    site?: unknown;
  } | null;
  if (!body) return NextResponse.json({ error: "Demande illisible." }, { status: 400 });
  if (typeof body.site === "string" && body.site.trim()) return NextResponse.json({ ok: true });

  const slug = typeof body.metier === "string" ? body.metier.slice(0, 120) : "";
  const description = typeof body.description === "string" ? body.description.trim().slice(0, MAX_DESCRIPTION) : "";
  const ias = Array.isArray(body.ias) ? IAS.filter((ia) => (body.ias as unknown[]).includes(ia)) : [];

  if (description.length < MIN_DESCRIPTION)
    return NextResponse.json(
      { error: "Décrivez votre tâche en quelques phrases : ce que vous faites, avec quoi, et le résultat attendu." },
      { status: 400 },
    );
  if (!ias.length) return NextResponse.json({ error: "Choisissez au moins une IA." }, { status: 400 });

  const { data: metier } = await supabase.from("metiers").select("slug, nom").eq("slug", slug).maybeSingle();
  if (!metier) return NextResponse.json({ error: "Métier introuvable." }, { status: 404 });

  const admin = createAdminClient();
  const depuis = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count } = await admin
    .from("demandes_plans")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("cree_le", depuis);
  if ((count ?? 0) >= MAX_PAR_JOUR)
    return NextResponse.json(
      { error: "Vous avez déjà envoyé 5 demandes aujourd’hui. Réessayez demain." },
      { status: 429 },
    );

  const { data: ligne, error } = await admin
    .from("demandes_plans")
    .insert({
      user_id: user.id,
      email: user.email,
      metier_slug: metier.slug,
      metier_nom: metier.nom,
      description,
      ias,
    })
    .select("id, description, ias, statut, plan, cree_le, livre_le")
    .single();
  if (error || !ligne) {
    console.error("[plans] enregistrement en échec", error?.message);
    return NextResponse.json({ error: "Envoi impossible. Réessayez dans un instant." }, { status: 500 });
  }

  const iasTexte = ias.map((ia) => IA_LABELS[ia]).join(", ");
  const titre = `Tâche sur mesure · ${metier.nom}`;
  const envoye = await envoyerEmailEquipe({
    tag: "plans",
    replyTo: user.email ?? undefined,
    subject: `${titre} · ${user.email}`,
    text: [
      titre,
      "",
      `Compte : ${user.email}`,
      `Plan pour : ${iasTexte}`,
      "",
      "Tâche décrite :",
      description,
      "",
      `Pour livrer : Supabase > demandes_plans > ligne ${ligne.id} : remplir « plan » (markdown), passer « statut » à livre et renseigner « livre_le ».`,
    ].join("\n"),
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#111">
<h2 style="margin:0 0 16px">${echapperHtml(titre)}</h2>
<p><strong>Compte :</strong> ${echapperHtml(user.email ?? "")}<br><strong>Plan pour :</strong> ${echapperHtml(iasTexte)}</p>
<p style="white-space:pre-wrap;border-left:3px solid #0b6b5e;padding-left:12px">${echapperHtml(description)}</p>
<p style="color:#666;font-size:13px">Pour livrer : Supabase &gt; demandes_plans &gt; ligne ${ligne.id} : remplir « plan » (markdown), passer « statut » à livre et renseigner « livre_le ».</p>
</div>`,
  });
  if (envoye) await admin.from("demandes_plans").update({ email_envoye: true }).eq("id", ligne.id);

  return NextResponse.json({ plan: ligne });
}
