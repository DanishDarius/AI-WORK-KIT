import { NextResponse } from "next/server";
import { requireActiveUser } from "@/lib/supabase/active-access";

type TacheRow = {
  id: string;
  code: string;
  titre: string;
  limite_connue: boolean;
  ia_alternative_conseillee: string | null;
};

// GET /api/catalogue : tout ce dont l'accueil et les pages Tâches / Métiers ont
// besoin, en UNE requête (au lieu de 1 + 12 appels à /api/metiers/[slug]).
// Même contenu que l'assemblage fait auparavant dans le navigateur : métiers
// (avec progression et chemin choisi) et tâches (avec leurs métiers, dans
// l'ordre des métiers puis de la liaison).
export async function GET() {
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { supabase, user } = access;

  const [metiersRes, liaisonsRes, cheminsRes, favorisRes, faitesRes] =
    await Promise.all([
      supabase
        .from("metiers")
        .select("id, slug, nom, description, ordre")
        .order("ordre", { ascending: true }),
      supabase
        .from("metiers_taches")
        .select(
          "metier_id, ordre, taches(id, code, titre, limite_connue, ia_alternative_conseillee)",
        )
        .order("ordre", { ascending: true }),
      supabase
        .from("utilisateurs_chemins")
        .select("metier_id, chemin")
        .eq("user_id", user.id),
      supabase.from("favoris").select("tache_id").eq("user_id", user.id),
      supabase.from("taches_faites").select("tache_id").eq("user_id", user.id),
    ]);

  const erreur = metiersRes.error || liaisonsRes.error;
  if (erreur) return NextResponse.json({ error: erreur.message }, { status: 500 });

  const chemins = new Map(
    (cheminsRes.data ?? []).map((c) => [c.metier_id as string, c.chemin as string]),
  );
  const favoris = new Set((favorisRes.data ?? []).map((f) => f.tache_id));
  const faites = new Set((faitesRes.data ?? []).map((f) => f.tache_id));

  const parMetier = new Map<string, TacheRow[]>();
  for (const l of liaisonsRes.data ?? []) {
    const t = (Array.isArray(l.taches) ? l.taches[0] : l.taches) as TacheRow | null;
    if (!t) continue;
    const liste = parMetier.get(l.metier_id) ?? [];
    liste.push(t);
    parMetier.set(l.metier_id, liste);
  }

  const metiers = [];
  const taches = new Map<
    string,
    TacheRow & {
      ia_par_defaut: string | null;
      fait: boolean;
      favori: boolean;
      metiers: { slug: string; nom: string }[];
    }
  >();

  for (const m of metiersRes.data ?? []) {
    const liste = parMetier.get(m.id) ?? [];
    const chemin = chemins.get(m.id) ?? null;
    metiers.push({
      id: m.id,
      slug: m.slug,
      nom: m.nom,
      description: m.description,
      nb_taches: liste.length,
      taches_faites: liste.filter((t) => faites.has(t.id)).length,
      chemin_choisi: chemin,
    });
    for (const t of liste) {
      const ref = { slug: m.slug, nom: m.nom };
      const existante = taches.get(t.id);
      if (existante) existante.metiers.push(ref);
      else
        taches.set(t.id, {
          id: t.id,
          code: t.code,
          titre: t.titre,
          limite_connue: t.limite_connue,
          ia_alternative_conseillee: t.ia_alternative_conseillee,
          ia_par_defaut: chemin,
          fait: faites.has(t.id),
          favori: favoris.has(t.id),
          metiers: [ref],
        });
    }
  }

  return NextResponse.json({ metiers, taches: [...taches.values()] });
}
