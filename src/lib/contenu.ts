import "server-only";

import { unstable_cache } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

// Le contenu commun à tous les clients : métiers, tâches, cas pratiques,
// prompts, kits métier et modèles à remplir. Il ne change que lorsqu'une
// migration de contenu est exécutée.
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
  /** Tâches d'un kit : ce que la tâche produit, ses étapes, ses précisions. */
  resultat: string | null;
  etapes: string[] | null;
  precisions: string | null;
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
  prenom: string | null;
  lieu: string | null;
  profil: string | null;
  reponse_attendue: string | null;
  prompts: { chatgpt: string | null; claude: string | null; gemini: string | null };
};

export type TypeRessource = "configuration" | "skill" | "document" | "routine";

/** Comment installer une ressource dans un outil. */
export type InstallationContenu = { etapes?: string[]; gratuit?: string; telephone?: string; notes?: string[] };

export type RessourceContenu = {
  id: string;
  cle: string;
  type: TypeRessource;
  titre: string;
  description: string | null;
  /** Renseigné quand la ressource ne vaut que pour une IA. */
  outil: string | null;
  contenu: string | null;
  /** Par outil (chatgpt, claude, gemini) ou « tous ». */
  installation: Record<string, InstallationContenu>;
  /** Nom du fichier à télécharger, servi par /api/kits/fichiers/[nom]. */
  fichier: string | null;
  lien_copie: string | null;
  video_url: string | null;
  revu_le: string | null;
  /** Étape d'installation du kit (1, 2, 3) ou null : à installer plus tard. */
  etape: number | null;
  /** Identifiants des tâches qui se servent de la ressource. */
  taches: string[];
};

export type KitContenu = {
  titre: string;
  presentation: string;
  etapes: { numero: number; titre: string; minutes: number | null }[];
  prerequis: string[];
  limites: string[];
  a_savoir: Record<string, string>;
  mots: { mot: string; phrase: string }[];
  revu_le: string | null;
  ressources: RessourceContenu[];
};

export type ChampContenu = {
  cle: string;
  libelle: string;
  type: "texte" | "long" | "choix" | "nombre";
  options: string[] | null;
  exemple: string | null;
  requis: boolean;
};

export type ModeleContenu = {
  titre: string;
  gabarit: string;
  /** Numéro du cas pratique dont viennent les exemples préremplis. */
  exemple_cas: number | null;
  avertissement: string | null;
  revu_le: string | null;
  champs: ChampContenu[];
  /** Note par IA : chatgpt, claude, gemini, meta_ai, copilot. */
  conseils: Record<string, string>;
};

export type RessourceLiee = { cle: string; type: TypeRessource; titre: string; outil: string | null };

export type ComplementsTache = { modele: ModeleContenu | null; ressources: RessourceLiee[] };

async function chargerCatalogue(): Promise<CatalogueContenu> {
  const admin = createAdminClient();
  const [metiers, taches, liaisons] = await Promise.all([
    admin.from("metiers").select("id, slug, nom, description").order("ordre", { ascending: true }).limit(200),
    admin.from("taches").select("id, code, titre, limite_connue, ia_alternative_conseillee, resultat, etapes, precisions").limit(2000),
    admin.from("metiers_taches").select("metier_id, tache_id").order("ordre", { ascending: true }).limit(10000),
  ]);
  const erreur = metiers.error || taches.error || liaisons.error;
  // Une erreur n'est jamais mise en cache : la prochaine requête réessaie.
  if (erreur) throw new Error(`Lecture du catalogue impossible : ${erreur.message}`);

  const parId: Record<string, TacheContenu> = {};
  for (const t of (taches.data ?? []) as TacheContenu[]) {
    parId[t.id] = { ...t, resultat: t.resultat ?? null, etapes: Array.isArray(t.etapes) ? t.etapes : null, precisions: t.precisions ?? null };
  }

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
    .select("titre, contexte, donnees, travail_a_faire, prenom, lieu, profil, reponse_attendue, prompts(ia, contenu)")
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
      prenom: exo.prenom ?? null,
      lieu: exo.lieu ?? null,
      profil: exo.profil ?? null,
      reponse_attendue: exo.reponse_attendue ?? null,
      prompts: {
        chatgpt: parIa.get("chatgpt") ?? null,
        claude: parIa.get("claude") ?? null,
        gemini: parIa.get("gemini") ?? null,
      },
    };
  });
}

const tableau = <T,>(valeur: unknown): T[] => (Array.isArray(valeur) ? (valeur as T[]) : []);
const objet = <T,>(valeur: unknown): Record<string, T> =>
  valeur && typeof valeur === "object" && !Array.isArray(valeur) ? (valeur as Record<string, T>) : {};

async function chargerKit(metierId: string): Promise<KitContenu | null> {
  const admin = createAdminClient();
  const [kit, composition] = await Promise.all([
    admin
      .from("kits")
      .select("titre, presentation, etapes, prerequis, limites, a_savoir, mots, revu_le")
      .eq("metier_id", metierId)
      .maybeSingle(),
    admin
      .from("kits_metier")
      .select(
        "etape_installation, ressources(id, cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, video_url, revu_le, ressources_taches(tache_id))",
      )
      .eq("metier_id", metierId)
      .order("ordre", { ascending: true })
      .limit(100),
  ]);
  const erreur = kit.error || composition.error;
  if (erreur) throw new Error(`Lecture du kit impossible : ${erreur.message}`);
  if (!kit.data) return null;

  type Ligne = {
    etape_installation: number | null;
    ressources: (Omit<RessourceContenu, "etape" | "taches" | "installation"> & {
      installation: unknown;
      ressources_taches: { tache_id: string }[] | null;
    }) | null;
  };
  const ressources: RessourceContenu[] = [];
  for (const ligne of (composition.data ?? []) as unknown as Ligne[]) {
    const r = ligne.ressources;
    if (!r) continue;
    ressources.push({
      id: r.id,
      cle: r.cle,
      type: r.type,
      titre: r.titre,
      description: r.description ?? null,
      outil: r.outil ?? null,
      contenu: r.contenu ?? null,
      installation: objet<InstallationContenu>(r.installation),
      fichier: r.fichier ?? null,
      lien_copie: r.lien_copie ?? null,
      video_url: r.video_url ?? null,
      revu_le: r.revu_le ?? null,
      etape: ligne.etape_installation ?? null,
      taches: (r.ressources_taches ?? []).map((l) => l.tache_id),
    });
  }

  const k = kit.data as { titre: string; presentation: string; revu_le: string | null } & Record<string, unknown>;
  return {
    titre: k.titre,
    presentation: k.presentation,
    etapes: tableau<KitContenu["etapes"][number]>(k.etapes),
    prerequis: tableau<string>(k.prerequis),
    limites: tableau<string>(k.limites),
    a_savoir: objet<string>(k.a_savoir),
    mots: tableau<KitContenu["mots"][number]>(k.mots),
    revu_le: k.revu_le ?? null,
    ressources,
  };
}

async function chargerComplementsTache(tacheId: string): Promise<ComplementsTache> {
  const admin = createAdminClient();
  const [modele, liens] = await Promise.all([
    admin
      .from("modeles_prompts")
      .select(
        "titre, gabarit, exemple_cas, avertissement, revu_le, champs_modele(cle, libelle, type, options, exemple, requis, ordre), conseils_ia(ia, conseil)",
      )
      .eq("tache_id", tacheId)
      .maybeSingle(),
    admin.from("ressources_taches").select("ressources(cle, type, titre, outil)").eq("tache_id", tacheId).limit(50),
  ]);
  const erreur = modele.error || liens.error;
  if (erreur) throw new Error(`Lecture du modèle impossible : ${erreur.message}`);

  type LigneModele = Omit<ModeleContenu, "champs" | "conseils"> & {
    champs_modele: (ChampContenu & { ordre: number })[] | null;
    conseils_ia: { ia: string; conseil: string }[] | null;
  };
  const m = modele.data as unknown as LigneModele | null;
  const ressources = ((liens.data ?? []) as unknown as { ressources: RessourceLiee | null }[])
    .map((l) => l.ressources)
    .filter((r): r is RessourceLiee => Boolean(r))
    .map((r) => ({ cle: r.cle, type: r.type, titre: r.titre, outil: r.outil ?? null }));

  return {
    modele: m
      ? {
          titre: m.titre,
          gabarit: m.gabarit,
          exemple_cas: m.exemple_cas ?? null,
          avertissement: m.avertissement ?? null,
          revu_le: m.revu_le ?? null,
          champs: [...(m.champs_modele ?? [])]
            .sort((a, b) => a.ordre - b.ordre)
            .map((c) => ({
              cle: c.cle,
              libelle: c.libelle,
              type: c.type,
              options: Array.isArray(c.options) ? c.options : null,
              exemple: c.exemple ?? null,
              requis: c.requis !== false,
            })),
          conseils: Object.fromEntries((m.conseils_ia ?? []).map((c) => [c.ia, c.conseil])),
        }
      : null,
    ressources,
  };
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

/**
 * Le kit d'un métier, ou null quand le métier n'en a pas encore. À n'appeler
 * qu'avec l'identifiant d'un métier présent dans le catalogue.
 */
export const lireKit = unstable_cache(chargerKit, ["contenu-kit"], {
  revalidate: DUREE_SECONDES,
  tags: [ETIQUETTE],
});

/**
 * Le modèle à remplir d'une tâche et les ressources du kit qui lui servent.
 * À n'appeler qu'avec l'identifiant d'une tâche présente dans le catalogue.
 */
export const lireComplementsTache = unstable_cache(chargerComplementsTache, ["contenu-complements-tache"], {
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
