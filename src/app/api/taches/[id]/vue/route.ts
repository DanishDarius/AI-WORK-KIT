import { NextResponse } from "next/server";
import { lireCatalogue, metierParSlug } from "@/lib/contenu";
import { estUuid } from "@/lib/normaliser";
import { erreurServeur } from "@/lib/reponses-api";
import { requireActiveUser } from "@/lib/supabase/active-access";

// POST /api/taches/[id]/vue?metier=<slug> : enregistre qu'une tâche vient
// d'être ouverte. Sert à « Reprendre où vous en étiez » et à la série de
// régularité.
//
// Règle C4 : cette écriture se faisait dans le GET de la tâche ; un GET ne
// doit jamais écrire. La page l'appelle une fois, après l'affichage.
//
// Règle S13 : deux écritures bornées par nature. derniere_activite garde une
// seule ligne par compte (écrasée), activite_journaliere une ligne par compte
// et par jour (les doublons sont ignorés). Rien ne grossit avec les appels.
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const metierSlug = new URL(request.url).searchParams.get("metier");
  if (!estUuid(id)) {
    return NextResponse.json({ error: "Tâche introuvable" }, { status: 404 });
  }
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { supabase, user } = access;

  let catalogue;
  try {
    catalogue = await lireCatalogue();
  } catch (erreur) {
    return erreurServeur("vue", erreur);
  }
  const metier = metierParSlug(catalogue, metierSlug);
  if (!catalogue.taches[id] || !metier) {
    return NextResponse.json({ error: "Tâche ou métier introuvable" }, { status: 404 });
  }

  const maintenant = new Date();
  const [activite, jour] = await Promise.all([
    supabase.from("derniere_activite").upsert(
      { user_id: user.id, metier_id: metier.id, tache_id: id, maj_le: maintenant.toISOString() },
      { onConflict: "user_id" },
    ),
    supabase
      .from("activite_journaliere")
      .upsert(
        { user_id: user.id, jour: maintenant.toISOString().slice(0, 10) },
        { onConflict: "user_id,jour", ignoreDuplicates: true },
      ),
  ]);
  const erreur = activite.error || jour.error;
  if (erreur) return erreurServeur("vue", erreur.message);

  return NextResponse.json({ ok: true });
}
