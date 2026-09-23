import { NextResponse } from "next/server";
import { requireActiveUser } from "@/lib/supabase/active-access";

type TacheEmbed = { code: string; titre: string } | { code: string; titre: string }[] | null;
type MetierEmbed = { slug: string; nom: string } | { slug: string; nom: string }[] | null;

function un<T>(valeur: T | T[] | null): T | null {
  if (Array.isArray(valeur)) return valeur[0] ?? null;
  return valeur;
}

function jourISO(date: Date): string {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD en UTC
}

// GET /api/progression - tableau de bord personnel de l'utilisateur connecté :
// avancement global, métiers terminés, dernière tâche consultée ("reprise")
// et série de régularité (jours consécutifs avec au moins une tâche consultée).
export async function GET() {
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { supabase, user } = access;

  const [
    { count: tachesTotal },
    { count: metiersTotal },
    { data: faites },
    { data: liaisons },
    { data: derniere },
    { data: joursActifs },
  ] = await Promise.all([
    supabase.from("taches").select("id", { count: "exact", head: true }),
    supabase.from("metiers").select("id", { count: "exact", head: true }),
    supabase.from("taches_faites").select("tache_id").eq("user_id", user.id),
    supabase.from("metiers_taches").select("metier_id, tache_id"),
    supabase
      .from("derniere_activite")
      .select("tache_id, metiers(slug, nom), taches(code, titre)")
      .eq("user_id", user.id)
      .maybeSingle(),
    supabase.from("activite_journaliere").select("jour").eq("user_id", user.id),
  ]);

  const idsTachesFaites = new Set((faites ?? []).map((f) => f.tache_id));

  // Progression par métier, pour compter les métiers entièrement terminés.
  const parMetier = new Map<string, { total: number; faites: number }>();
  (liaisons ?? []).forEach((l) => {
    const entree = parMetier.get(l.metier_id) ?? { total: 0, faites: 0 };
    entree.total += 1;
    if (idsTachesFaites.has(l.tache_id)) entree.faites += 1;
    parMetier.set(l.metier_id, entree);
  });
  const metiersTermines = Array.from(parMetier.values()).filter(
    (m) => m.total > 0 && m.faites === m.total
  ).length;

  // Reprise : dernière tâche consultée par l'utilisateur.
  let reprise = null;
  if (derniere) {
    const metier = un(derniere.metiers as MetierEmbed);
    const tache = un(derniere.taches as TacheEmbed);
    if (metier && tache) {
      reprise = {
        metier_slug: metier.slug,
        metier_nom: metier.nom,
        tache_id: derniere.tache_id,
        tache_code: tache.code,
        tache_titre: tache.titre,
      };
    }
  }

  // Série de jours consécutifs + activité des 7 derniers jours.
  const joursActivite = new Set((joursActifs ?? []).map((j) => j.jour));
  const aujourdHui = new Date();
  let serieJours = 0;
  const curseur = new Date(aujourdHui);
  // Si rien n'a encore été fait aujourd'hui, on compte la série à partir
  // d'hier - la série ne casse pas tant que la journée en cours n'est pas
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
    taches_faites_total: idsTachesFaites.size,
    taches_total: tachesTotal ?? 0,
    metiers_termines: metiersTermines,
    metiers_total: metiersTotal ?? 0,
    reprise,
    serie_jours: serieJours,
    jours_actifs_semaine: joursActifsSemaine,
  });
}
