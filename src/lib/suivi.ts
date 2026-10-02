import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

// Les données propres à un compte : tâches faites, favoris, IA choisie par
// métier. Lues avec la session de l'utilisateur (la RLS limite chaque compte
// à ses lignes). Chaque liste est bornée (règle C5).
const MAX_LIGNES = 2000;

export async function idsTachesFaites(supabase: SupabaseClient, userId: string): Promise<Set<string>> {
  const { data } = await supabase.from("taches_faites").select("tache_id").eq("user_id", userId).limit(MAX_LIGNES);
  return new Set(((data ?? []) as { tache_id: string }[]).map((l) => l.tache_id));
}

export async function idsFavoris(supabase: SupabaseClient, userId: string): Promise<Set<string>> {
  const { data } = await supabase.from("favoris").select("tache_id").eq("user_id", userId).limit(MAX_LIGNES);
  return new Set(((data ?? []) as { tache_id: string }[]).map((l) => l.tache_id));
}

/** IA choisie par l'utilisateur, par identifiant de métier. */
export async function cheminsChoisis(supabase: SupabaseClient, userId: string): Promise<Map<string, string>> {
  const { data } = await supabase
    .from("utilisateurs_chemins")
    .select("metier_id, chemin")
    .eq("user_id", userId)
    .limit(MAX_LIGNES);
  return new Map(((data ?? []) as { metier_id: string; chemin: string }[]).map((l) => [l.metier_id, l.chemin]));
}
