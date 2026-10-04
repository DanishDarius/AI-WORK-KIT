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
  /** Publics du métier : salarie, independant, commercant (migration 0038). */
  publics: string[];
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
  /** Badges (migration 0037). null : non renseigné, aucun badge. */
  gratuit_ok: boolean | null;
  mobile_ok: boolean | null;
  /** Nom de l'IA gratuite qui fait le mieux la tâche, quand il y en a une. */
  outil_gratuit_conseille: string | null;
  /** Lien de la vidéo de la tâche, chargée au clic. */
  video_url: string | null;
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

/** Une ressource liée à une tâche, avec les métiers dont le kit la contient. */
export type RessourceDeTache = RessourceLiee & { metiers: string[] };

export type ComplementsTache = { modele: ModeleContenu | null; ressources: RessourceDeTache[] };

async function chargerCatalogue(): Promise<CatalogueContenu> {
  const admin = createAdminClient();
  const [metiers, taches, liaisons] = await Promise.all([
    admin.from("metiers").select("id, slug, nom, description, description_local, publics").order("ordre", { ascending: true }).limit(200),
    admin.from("taches").select("id, code, titre, limite_connue, ia_alternative_conseillee, resultat, etapes, precisions, gratuit_ok, mobile_ok, outil_gratuit_conseille, video_url").limit(2000),
    admin.from("metiers_taches").select("metier_id, tache_id").order("ordre", { ascending: true }).limit(10000),
  ]);
  const erreur = metiers.error || taches.error || liaisons.error;
  // Une erreur n'est jamais mise en cache : la prochaine requête réessaie.
  if (erreur) throw new Error(`Lecture du catalogue impossible : ${erreur.message}`);

  const parId: Record<string, TacheContenu> = {};
  for (const t of (taches.data ?? []) as TacheContenu[]) {
    parId[t.id] = {
      ...t,
      resultat: t.resultat ?? null,
      etapes: Array.isArray(t.etapes) ? t.etapes : null,
      precisions: t.precisions ?? null,
      // Un badge ne s'affiche que sur une réponse nette : vrai ou faux.
      gratuit_ok: typeof t.gratuit_ok === "boolean" ? t.gratuit_ok : null,
      mobile_ok: typeof t.mobile_ok === "boolean" ? t.mobile_ok : null,
      outil_gratuit_conseille: t.outil_gratuit_conseille ?? null,
      video_url: t.video_url ?? null,
    };
  }

  const tachesParMetier: Record<string, string[]> = {};
  for (const l of (liaisons.data ?? []) as { metier_id: string; tache_id: string }[]) {
    if (!parId[l.tache_id]) continue;
    (tachesParMetier[l.metier_id] ??= []).push(l.tache_id);
  }

  // Un métier dont la description est localisée affiche celle-ci (migration 0021).
  const lignes = (metiers.data ?? []) as (Omit<MetierContenu, "publics"> & { description_local: string | null; publics: unknown })[];
  return {
    metiers: lignes.map((m) => ({
      id: m.id,
      slug: m.slug,
      nom: m.nom,
      description: m.description_local ?? m.description ?? null,
      publics: Array.isArray(m.publics) ? (m.publics as string[]) : [],
    })),
    taches: parId,
    tachesParMetier,
  };
}

async function chargerExercices(tacheId: string): Promise<ExerciceContenu[]> {
  const { data, error } = await createAdminClient()
    .from("exercices")
    .select("titre, contexte, donnees, travail_a_faire, titre_local, contexte_local, donnees_local, travail_local, prenom, lieu, profil, reponse_attendue, prompts(ia, contenu)")
    .eq("tache_id", tacheId)
    .order("numero", { ascending: true })
    .limit(20);
  if (error) throw new Error(`Lecture des cas pratiques impossible : ${error.message}`);

  type Ligne = Omit<ExerciceContenu, "prompts"> & {
    titre_local: string | null;
    contexte_local: string | null;
    donnees_local: string | null;
    travail_local: string | null;
    prompts: { ia: string; contenu: string }[] | null;
  };
  return ((data ?? []) as Ligne[]).map((exo) => {
    const parIa = new Map((exo.prompts ?? []).map((p) => [p.ia, p.contenu]));
    // Les 42 premières tâches gardent leur ancien cas pour le site en ligne :
    // le cas localisé est écrit à côté (migration 0021) et passe avant lui.
    // Un cas localisé est entier : ses données ne se mêlent pas à l'ancien.
    const local = Boolean(exo.titre_local);
    return {
      titre: local ? (exo.titre_local as string) : exo.titre,
      contexte: local ? exo.contexte_local : exo.contexte,
      donnees: local ? exo.donnees_local : exo.donnees,
      travail_a_faire: local ? exo.travail_local : exo.travail_a_faire,
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
    admin.from("ressources_taches").select("ressources(cle, type, titre, outil, kits_metier(metier_id))").eq("tache_id", tacheId).limit(500),
  ]);
  const erreur = modele.error || liens.error;
  if (erreur) throw new Error(`Lecture du modèle impossible : ${erreur.message}`);

  type LigneModele = Omit<ModeleContenu, "champs" | "conseils"> & {
    champs_modele: (ChampContenu & { ordre: number })[] | null;
    conseils_ia: { ia: string; conseil: string }[] | null;
  };
  const m = modele.data as unknown as LigneModele | null;
  type LigneRessource = RessourceLiee & { kits_metier: { metier_id: string }[] | null };
  const ressources = ((liens.data ?? []) as unknown as { ressources: LigneRessource | null }[])
    .map((l) => l.ressources)
    .filter((r): r is LigneRessource => Boolean(r))
    .map((r) => ({
      cle: r.cle,
      type: r.type,
      titre: r.titre,
      outil: r.outil ?? null,
      metiers: (r.kits_metier ?? []).map((k) => k.metier_id),
    }));

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

/**
 * Les ressources d'une tâche à montrer pour un métier. Une tâche partagée par
 * plusieurs métiers est reliée aux ressources de plusieurs kits : on ne
 * montre que celles du kit du métier d'où vient le client. Sans métier connu,
 * on ne montre les ressources que si elles sont toutes du même kit.
 */
export function ressourcesPourMetier(ressources: RessourceDeTache[], metierId: string | null): RessourceLiee[] {
  const garder = (r: RessourceDeTache): RessourceLiee => ({ cle: r.cle, type: r.type, titre: r.titre, outil: r.outil });
  if (metierId) return dansLOrdre(ressources.filter((r) => r.metiers.includes(metierId)).map(garder));
  const kits = new Set(ressources.flatMap((r) => r.metiers));
  return kits.size <= 1 ? dansLOrdre(ressources.map(garder)) : [];
}

// La base rend les liens ressource-tâche sans ordre. L'écran les montre
// toujours dans le même : la configuration, les skills, les documents, les
// routines, puis par titre.
const RANG_TYPE: Record<TypeRessource, number> = { configuration: 0, skill: 1, document: 2, routine: 3 };

function dansLOrdre(liste: RessourceLiee[]): RessourceLiee[] {
  return [...liste].sort(
    (a, b) => RANG_TYPE[a.type] - RANG_TYPE[b.type] || a.titre.localeCompare(b.titre, "fr") || a.cle.localeCompare(b.cle),
  );
}

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
