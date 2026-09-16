import { NextResponse } from "next/server";
import { requireActiveUser } from "@/lib/supabase/active-access";

type TacheEmbed = { id: string; code: string; titre: string } | { id: string; code: string; titre: string }[] | null;
type MetierEmbed = { slug: string; nom: string } | { slug: string; nom: string }[] | null;

function un<T>(valeur: T | T[] | null): T | null {
  if (Array.isArray(valeur)) return valeur[0] ?? null;
  return valeur;
}

// GET /api/recherche?q=<terme> — recherche transverse sur les titres de
// tâches (une ligne par métier où la tâche apparaît, pour un lien direct
// /taches/[id]?metier=<slug>) et sur les termes/définitions du glossaire.
// Renvoie des listes vides si le terme fait moins de 2 caractères.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim();

  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { supabase } = access;

  if (q.length < 2) {
    return NextResponse.json({ taches: [], glossaire: [] });
  }

  const motif = `%${q}%`;

  const [{ data: liaisons, error: erreurTaches }, { data: glossaire, error: erreurGlossaire }] =
    await Promise.all([
      supabase
        .from("metiers_taches")
        .select("metiers(slug, nom), taches!inner(id, code, titre)")
        .ilike("taches.titre", motif),
      supabase
        .from("glossaire")
        .select("terme, definition")
        .or(`terme.ilike.${motif},definition.ilike.${motif}`),
    ]);

  if (erreurTaches || erreurGlossaire) {
    return NextResponse.json(
      { error: erreurTaches?.message || erreurGlossaire?.message },
      { status: 500 }
    );
  }

  const taches = (liaisons ?? [])
    .map((l) => {
      const metier = un(l.metiers as MetierEmbed);
      const tache = un(l.taches as TacheEmbed);
      if (!metier || !tache) return null;
      return {
        id: tache.id,
        code: tache.code,
        titre: tache.titre,
        metier_slug: metier.slug,
        metier_nom: metier.nom,
      };
    })
    .filter((t): t is NonNullable<typeof t> => t !== null);

  return NextResponse.json({ taches, glossaire: glossaire ?? [] });
}
