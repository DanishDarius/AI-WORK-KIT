import { NextResponse } from "next/server";
import { lireCatalogue, metierParId } from "@/lib/contenu";
import { erreurServeur } from "@/lib/reponses-api";
import { idsTachesFaites } from "@/lib/suivi";
import { requireActiveUser } from "@/lib/supabase/active-access";

function jourISO(date: Date): string {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD en UTC
}

// La série se compte en jours consécutifs : inutile de lire plus d'un an.
const JOURS_LUS = 400;

// GET /api/progression : tableau de bord personnel de l'utilisateur connecté :
// avancement global, métiers terminés, dernière tâche consultée ("reprise")
// et série de régularité (jours consécutifs avec au moins une tâche consultée).
//
// Le contenu vient du cache (règle C1). Restent 3 requêtes base, lancées
// ensemble : tâches faites, dernière activité, jours d'activité (bornés).
export async function GET() {
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { supabase, user } = access;

  let catalogue;
  try {
    catalogue = await lireCatalogue();
  } catch (erreur) {
    return erreurServeur("progression", erreur);
  }

  const debut = new Date();
  debut.setUTCDate(debut.getUTCDate() - JOURS_LUS);

  const [idsFaites, { data: derniere }, { data: joursActifs }] = await Promise.all([
    idsTachesFaites(supabase, user.id),
    supabase.from("derniere_activite").select("tache_id, metier_id").eq("user_id", user.id).maybeSingle(),
    supabase
      .from("activite_journaliere")
      .select("jour")
      .eq("user_id", user.id)
      .gte("jour", jourISO(debut))
      .limit(JOURS_LUS + 1),
  ]);

  // On ne compte que les tâches qui existent encore dans le catalogue.
  const faites = [...idsFaites].filter((id) => catalogue.taches[id]);
  const ensembleFaites = new Set(faites);

  const metiersTermines = catalogue.metiers.filter((m) => {
    const ids = catalogue.tachesParMetier[m.id] ?? [];
    return ids.length > 0 && ids.every((id) => ensembleFaites.has(id));
  }).length;

  // Reprise : dernière tâche consultée par l'utilisateur.
  let reprise = null;
  const activite = derniere as { tache_id: string; metier_id: string } | null;
  if (activite) {
    const metier = metierParId(catalogue, activite.metier_id);
    const tache = catalogue.taches[activite.tache_id];
    if (metier && tache) {
      reprise = {
        metier_slug: metier.slug,
        metier_nom: metier.nom,
        tache_id: tache.id,
        tache_code: tache.code,
        tache_titre: tache.titre,
      };
    }
  }

  // Série de jours consécutifs + activité des 7 derniers jours.
  const joursActivite = new Set(((joursActifs ?? []) as { jour: string }[]).map((j) => j.jour));
  const aujourdHui = new Date();
  let serieJours = 0;
  const curseur = new Date(aujourdHui);
  // Si rien n'a encore été fait aujourd'hui, on compte la série à partir
  // d'hier : la série ne casse pas tant que la journée en cours n'est pas
  // terminée.
  if (!joursActivite.has(jourISO(curseur))) {
    curseur.setUTCDate(curseur.getUTCDate() - 1);
  }
  while (joursActivite.has(jourISO(curseur))) {
    serieJours += 1;
    curseur.setUTCDate(curseur.getUTCDate() - 1);
  }

  const joursActifsSemaine: boolean[] = [];
  for (let i = 6; i >= 0; i -= 1) {
    const jour = new Date(aujourdHui);
    jour.setUTCDate(jour.getUTCDate() - i);
    joursActifsSemaine.push(joursActivite.has(jourISO(jour)));
  }

  return NextResponse.json({
    taches_faites_total: faites.length,
    taches_total: Object.keys(catalogue.taches).length,
    metiers_termines: metiersTermines,
    metiers_total: catalogue.metiers.length,
    reprise,
    serie_jours: serieJours,
    jours_actifs_semaine: joursActifsSemaine,
  });
}
