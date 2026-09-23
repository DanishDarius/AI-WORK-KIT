import { NextResponse } from "next/server";
import { requireActiveUser } from "@/lib/supabase/active-access";

type TacheEmbed = { code: string; titre: string } | { code: string; titre: string }[] | null;
type MetierEmbed = { slug: string; nom: string } | { slug: string; nom: string }[] | null;

function un<T>(valeur: T | T[] | null): T | null {
  if (Array.isArray(valeur)) return valeur[0] ?? null;
  return valeur;
}

// GET /api/favoris : liste des tâches mises en favori par l'utilisateur
// connecté, avec le contexte métier permettant de reconstruire le lien
// /taches/[id]?metier=<slug>. Triées de la plus récente à la plus ancienne.
export async function GET() {
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { supabase, user } = access;

  const { data, error } = await supabase
    .from("favoris")
    .select("tache_id, cree_le, taches(code, titre), metiers(slug, nom)")
    .eq("user_id", user.id)
    .order("cree_le", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const resultat = (data ?? []).map((f) => {
    const tache = un(f.taches as TacheEmbed);
    const metier = un(f.metiers as MetierEmbed);
    return {
      tache_id: f.tache_id,
      tache_code: tache?.code ?? null,
      tache_titre: tache?.titre ?? null,
      metier_slug: metier?.slug ?? null,
      metier_nom: metier?.nom ?? null,
    };
  });

  return NextResponse.json(resultat);
}
