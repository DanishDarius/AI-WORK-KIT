import "server-only";

import { unstable_cache } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

// Le contenu commun à tous les clients : métiers, tâches, cas pratiques et
// prompts. Il ne change que lorsqu'une migration de contenu est exécutée.
//
// Règle C1 : il est lu en base une fois, puis gardé en cache côté serveur
// (cache de données de Next, partagé entre les serveurs) pendant 10 minutes.
// Les routes ne relisent plus ces tables à chaque requête : ce fichier est le
// SEUL endroit qui les interroge (test tests/regles/charge.test.ts).
//
// Sécurité : la lecture se fait avec la clé service, donc sans la RLS. Ces
// fonctions ne s'appellent qu'APRÈS requireActiveUser (routes) ou
// exigerAccesActif (pages). Rien d'ici n'est propre à un utilisateur.
//
// Après une migration de contenu, compter 10 minutes au plus avant de voir
// le changement sur le site.
const DUREE_SECONDES = 600;
const ETIQUETTE = "contenu";

export type MetierContenu = {
  id: string;
  slug: string;
  nom: string;
  description: string | null;
};

export type TacheContenu = {
  id: string;
  code: string;
  titre: string;
  limite_connue: boolean;
  ia_alternative_conseillee: string | null;
};

export type CatalogueContenu = {
  /** Les métiers, dans l'ordre d'affichage. */
  metiers: MetierContenu[];
  /** Toutes les tâches, par identifiant. */
  taches: Record<string, TacheContenu>;
  /** Pour chaque métier (identifiant), ses tâches dans l'ordre du parcours. */
  tachesParMetier: Record<string, string[]>;
};

export type ExerciceContenu = {
  titre: string;
  contexte: string | null;
  donnees: string | null;
  travail_a_faire: string | null;
  prompts: { chatgpt: string | null; claude: string | null; gemini: string | null };
};

async function chargerCatalogue(): Promise<CatalogueContenu> {
  const admin = createAdminClient();
  const [metiers, taches, liaisons] = await Promise.all([
    admin.from("metiers").select("id, slug, nom, description").order("ordre", { ascending: true }).limit(200),
    admin.from("taches").select("id, code, titre, limite_connue, ia_alternative_conseillee").limit(2000),
    admin.from("metiers_taches").select("metier_id, tache_id").order("ordre", { ascending: true }).limit(10000),
  ]);
  const erreur = metiers.error || taches.error || liaisons.error;
  // Une erreur n'est jamais mise en cache : la prochaine requête réessaie.
  if (erreur) throw new Error(`Lecture du catalogue impossible : ${erreur.message}`);

  const parId: Record<string, TacheContenu> = {};
  for (const t of (taches.data ?? []) as TacheContenu[]) parId[t.id] = t;

  const tachesParMetier: Record<string, string[]> = {};
  for (const l of (liaisons.data ?? []) as { metier_id: string; tache_id: string }[]) {
    if (!parId[l.tache_id]) continue;
    (tachesParMetier[l.metier_id] ??= []).push(l.tache_id);
  }

  return { metiers: (metiers.data ?? []) as MetierContenu[], taches: parId, tachesParMetier };
}

async function chargerExercices(tacheId: string): Promise<ExerciceContenu[]> {
  const { data, error } = await createAdminClient()
    .from("exercices")
    .select("titre, contexte, donnees, travail_a_faire, prompts(ia, contenu)")
    .eq("tache_id", tacheId)
    .order("numero", { ascending: true })
    .limit(20);
  if (error) throw new Error(`Lecture des cas pratiques impossible : ${error.message}`);

  type Ligne = Omit<ExerciceContenu, "prompts"> & { prompts: { ia: string; contenu: string }[] | null };
  return ((data ?? []) as Ligne[]).map((exo) => {
    const parIa = new Map((exo.prompts ?? []).map((p) => [p.ia, p.contenu]));
    return {
      titre: exo.titre,
      contexte: exo.contexte,
      donnees: exo.donnees,
      travail_a_faire: exo.travail_a_faire,
      prompts: {
        chatgpt: parIa.get("chatgpt") ?? null,
        claude: parIa.get("claude") ?? null,
        gemini: parIa.get("gemini") ?? null,
      },
    };
  });
}

/** Métiers, tâches et parcours : une lecture en base toutes les 10 minutes. */
export const lireCatalogue = unstable_cache(chargerCatalogue, ["contenu-catalogue"], {
  revalidate: DUREE_SECONDES,
  tags: [ETIQUETTE],
});

/**
 * Cas pratiques et prompts d'une tâche. À n'appeler qu'avec l'identifiant
 * d'une tâche présente dans le catalogue : une entrée de cache est créée par
 * identifiant.
 */
export const lireExercices = unstable_cache(chargerExercices, ["contenu-exercices"], {
  revalidate: DUREE_SECONDES,
  tags: [ETIQUETTE],
});

export function metierParSlug(catalogue: CatalogueContenu, slug: string | null | undefined) {
  if (!slug) return null;
  return catalogue.metiers.find((m) => m.slug === slug) ?? null;
}

export function metierParId(catalogue: CatalogueContenu, id: string) {
  return catalogue.metiers.find((m) => m.id === id) ?? null;
}

/** Les tâches d'un métier, dans l'ordre du parcours. */
export function tachesDuMetier(catalogue: CatalogueContenu, metierId: string): TacheContenu[] {
  return (catalogue.tachesParMetier[metierId] ?? []).map((id) => catalogue.taches[id]).filter(Boolean);
}
