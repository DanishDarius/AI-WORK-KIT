import "server-only";

import { unstable_cache } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { videoValide } from "@/lib/video";

// Le contenu commun à tous les clients : métiers, tâches, cas pratiques,
// prompts, kits métier, modèles à remplir et exercices finaux. Il ne change que lorsqu'une
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
export type InstallationContenu = {
  etapes?: string[];
  gratuit?: string;
  telephone?: string;
  notes?: string[];
  /** Vidéo du geste dans cet outil (une skill s'installe autrement dans chaque IA). */
  video?: string;
};

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
  /** Lien de la vidéo d'accueil du kit, chargée au clic. */
  video_url: string | null;
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

// ===== Le fil « Nouveau » (migration 0040) =====

export type TypePublication = "tache" | "pack" | "mise_a_jour" | "guide" | "ressource";

export type PublicationContenu = {
  id: string;
  type: TypePublication;
  /** Ce qui paraît : id de la tâche, slug du pack, de la mise à jour ou du guide, clé de la ressource. */
  ref_id: string;
  titre: string;
  resume: string | null;
  /** Date ISO. Avant cette date, la publication ne se voit pas. */
  publie_le: string;
  reserve_abonnes: boolean;
};

/** Image ou vidéo d'une actualité. Les vidéos ne se chargent qu'au clic. */
export type MediaContenu =
  | { type: "image"; src: string; alt: string; credit: string }
  | { type: "youtube"; id: string; title: string; credit: string }
  | { type: "video"; src: string; poster: string; title: string; credit: string; captions?: string };

export type MiseAJourContenu = {
  slug: string;
  ia: "chatgpt" | "claude" | "gemini";
  genre: string;
  titre: string;
  /** Date de l'annonce par l'éditeur (AAAA-MM-JJ). */
  annonce_le: string;
  resume: string;
  impact: string;
  action: string;
  points: string[];
  disponibilite: string;
  sources: { label: string; url: string }[];
  media: MediaContenu | null;
};

export type PackContenu = {
  slug: string;
  titre: string;
  description: string;
  pour_qui: string | null;
  /** Identifiants des tâches du pack, dans l'ordre. */
  taches: string[];
};

export type SessionLiveContenu = { debut_le: string; titre: string; lien: string | null; replay_url: string | null };

export type FilContenu = {
  /** Toutes les publications, de la plus récente à la plus ancienne, y compris celles à paraître. */
  publications: PublicationContenu[];
  misesAJour: Record<string, MiseAJourContenu>;
  packs: Record<string, PackContenu>;
  /** Les tâches du fil (tâche de la semaine, tâches d'un pack), par identifiant. */
  taches: Record<string, TacheContenu>;
  sessions: SessionLiveContenu[];
  /** Lien des vidéos hors kit, par clé. */
  videos: Record<string, string>;
};

const COLONNES_TACHE = "id, code, titre, limite_connue, ia_alternative_conseillee, resultat, etapes, precisions, gratuit_ok, mobile_ok, outil_gratuit_conseille, video_url";

function tachesParId(lignes: unknown): Record<string, TacheContenu> {
  const parId: Record<string, TacheContenu> = {};
  for (const t of (Array.isArray(lignes) ? lignes : []) as TacheContenu[]) {
    parId[t.id] = {
      ...t,
      resultat: t.resultat ?? null,
      etapes: Array.isArray(t.etapes) ? t.etapes : null,
      precisions: t.precisions ?? null,
      // Un badge ne s'affiche que sur une réponse nette : vrai ou faux.
      gratuit_ok: typeof t.gratuit_ok === "boolean" ? t.gratuit_ok : null,
      mobile_ok: typeof t.mobile_ok === "boolean" ? t.mobile_ok : null,
      outil_gratuit_conseille: t.outil_gratuit_conseille ?? null,
      video_url: videoValide(t.video_url),
    };
  }
  return parId;
}

async function chargerCatalogue(): Promise<CatalogueContenu> {
  const admin = createAdminClient();
  const [metiers, taches, liaisons] = await Promise.all([
    admin.from("metiers").select("id, slug, nom, description, description_local, publics").order("ordre", { ascending: true }).limit(200),
    // Les tâches du fil Nouveau (du_fil) n'entrent dans aucun parcours : elles se lisent avec le fil.
    admin.from("taches").select(COLONNES_TACHE).eq("du_fil", false).limit(2000),
    admin.from("metiers_taches").select("metier_id, tache_id").order("ordre", { ascending: true }).limit(10000),
  ]);
  const erreur = metiers.error || taches.error || liaisons.error;
  // Une erreur n'est jamais mise en cache : la prochaine requête réessaie.
  if (erreur) throw new Error(`Lecture du catalogue impossible : ${erreur.message}`);

  const parId = tachesParId(taches.data);

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

// L'installation par outil. Une vidéo n'est gardée que si c'est une vidéo d'AIW (src/lib/video.ts).
function installations(valeur: unknown): Record<string, InstallationContenu> {
  const resultat: Record<string, InstallationContenu> = {};
  for (const [outil, brut] of Object.entries(objet<InstallationContenu>(valeur))) {
    if (!brut || typeof brut !== "object") continue;
    const { video, ...reste } = brut;
    const adresse = videoValide(video);
    resultat[outil] = adresse ? { ...reste, video: adresse } : reste;
  }
  return resultat;
}

async function chargerKit(metierId: string): Promise<KitContenu | null> {
  const admin = createAdminClient();
  const [kit, composition] = await Promise.all([
    admin
      .from("kits")
      .select("titre, presentation, etapes, prerequis, limites, a_savoir, mots, revu_le, video_url")
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
      installation: installations(r.installation),
      fichier: r.fichier ?? null,
      lien_copie: r.lien_copie ?? null,
      video_url: videoValide(r.video_url),
      revu_le: r.revu_le ?? null,
      etape: ligne.etape_installation ?? null,
      taches: (r.ressources_taches ?? []).map((l) => l.tache_id),
    });
  }

  const k = kit.data as { titre: string; presentation: string; revu_le: string | null; video_url?: string | null } & Record<string, unknown>;
  return {
    titre: k.titre,
    presentation: k.presentation,
    etapes: tableau<KitContenu["etapes"][number]>(k.etapes),
    prerequis: tableau<string>(k.prerequis),
    limites: tableau<string>(k.limites),
    a_savoir: objet<string>(k.a_savoir),
    mots: tableau<KitContenu["mots"][number]>(k.mots),
    revu_le: k.revu_le ?? null,
    video_url: videoValide(k.video_url),
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

const HTTPS = /^https:\/\//;
const texte = (valeur: unknown) => (typeof valeur === "string" ? valeur : "");

// Le média d'une actualité vient d'un champ JSON : il est relu ici. Un média
// mal formé (lien qui n'est pas en https, identifiant YouTube inattendu) est
// écarté : l'actualité s'affiche alors sans image.
function lireMedia(valeur: unknown): MediaContenu | null {
  if (!valeur || typeof valeur !== "object") return null;
  const m = valeur as Record<string, unknown>;
  const credit = texte(m.credit);
  if (m.type === "image") {
    const src = texte(m.src);
    return HTTPS.test(src) || /^\/actus\/[a-z0-9-]+\.(svg|png|jpg|webp)$/.test(src) ? { type: "image", src, alt: texte(m.alt), credit } : null;
  }
  if (m.type === "youtube") {
    const id = texte(m.id);
    return /^[A-Za-z0-9_-]{11}$/.test(id) ? { type: "youtube", id, title: texte(m.title), credit } : null;
  }
  if (m.type === "video") {
    const src = texte(m.src);
    const poster = texte(m.poster);
    if (!HTTPS.test(src) || !HTTPS.test(poster)) return null;
    const captions = texte(m.captions);
    return { type: "video", src, poster, title: texte(m.title), credit, ...(HTTPS.test(captions) ? { captions } : {}) };
  }
  return null;
}

async function chargerFil(): Promise<FilContenu> {
  const admin = createAdminClient();
  const [publications, misesAJour, packs, liaisons, taches, sessions, videos] = await Promise.all([
    admin.from("publications").select("id, type, ref_id, titre, resume, publie_le, reserve_abonnes").order("publie_le", { ascending: false }).limit(300),
    admin.from("mises_a_jour_ia").select("slug, ia, genre, titre, annonce_le, resume, impact, action, points, disponibilite, sources, media").limit(300),
    admin.from("packs").select("id, slug, titre, description, pour_qui").limit(100),
    admin.from("packs_taches").select("pack_id, tache_id").order("ordre", { ascending: true }).limit(1000),
    admin.from("taches").select(COLONNES_TACHE).eq("du_fil", true).limit(500),
    admin.from("sessions_live").select("debut_le, titre, lien, replay_url").order("debut_le", { ascending: false }).limit(24),
    admin.from("videos").select("cle, url").limit(50),
  ]);
  const erreur = publications.error || misesAJour.error || packs.error || liaisons.error || taches.error || sessions.error || videos.error;
  if (erreur) throw new Error(`Lecture du fil impossible : ${erreur.message}`);

  const tachesFil = tachesParId(taches.data);

  const parPack: Record<string, string[]> = {};
  for (const l of (liaisons.data ?? []) as { pack_id: string; tache_id: string }[]) {
    if (tachesFil[l.tache_id]) (parPack[l.pack_id] ??= []).push(l.tache_id);
  }

  const lesPacks: Record<string, PackContenu> = {};
  for (const p of (packs.data ?? []) as { id: string; slug: string; titre: string; description: string; pour_qui: string | null }[]) {
    lesPacks[p.slug] = { slug: p.slug, titre: p.titre, description: p.description, pour_qui: p.pour_qui ?? null, taches: parPack[p.id] ?? [] };
  }

  const lesMisesAJour: Record<string, MiseAJourContenu> = {};
  for (const m of (misesAJour.data ?? []) as (Omit<MiseAJourContenu, "points" | "sources" | "media"> & { points: unknown; sources: unknown; media: unknown })[]) {
    lesMisesAJour[m.slug] = {
      slug: m.slug,
      ia: m.ia,
      genre: m.genre,
      titre: m.titre,
      annonce_le: m.annonce_le,
      resume: m.resume,
      impact: m.impact,
      action: m.action,
      points: tableau<unknown>(m.points).filter((p): p is string => typeof p === "string"),
      disponibilite: m.disponibilite,
      sources: tableau<{ label?: unknown; url?: unknown }>(m.sources)
        .map((x) => ({ label: texte(x?.label), url: texte(x?.url) }))
        .filter((x) => x.label && HTTPS.test(x.url)),
      media: lireMedia(m.media),
    };
  }

  return {
    publications: ((publications.data ?? []) as PublicationContenu[]).map((p) => ({
      id: p.id,
      type: p.type,
      ref_id: p.ref_id,
      titre: p.titre,
      resume: p.resume ?? null,
      publie_le: p.publie_le,
      reserve_abonnes: p.reserve_abonnes !== false,
    })),
    misesAJour: lesMisesAJour,
    packs: lesPacks,
    taches: tachesFil,
    sessions: ((sessions.data ?? []) as SessionLiveContenu[]).map((x) => ({ debut_le: x.debut_le, titre: x.titre, lien: x.lien ?? null, replay_url: x.replay_url ?? null })),
    videos: Object.fromEntries(((videos.data ?? []) as { cle: string; url: string }[]).flatMap((v) => { const adresse = videoValide(v.url); return adresse ? [[v.cle, adresse]] : []; })),
  };
}

/** L'exercice final d'un métier, pour l'attestation (migrations 0052 et 0053). */
export type ExerciceFinalContenu = {
  numero: number;
  cas: string;
  titre_donnees: string;
  donnees: string[];
  travail: string[];
  a_rendre: string;
  /** Réponse type : réservée au correcteur, jamais envoyée à l'abonné. */
  pour_le_correcteur: string;
  revu_le: string | null;
};

const textes = (valeur: unknown) => tableau<unknown>(valeur).filter((v): v is string => typeof v === "string");

async function chargerExercicesFinaux(): Promise<Record<string, ExerciceFinalContenu>> {
  const { data, error } = await createAdminClient()
    .from("exercices_finaux")
    .select("metier_id, numero, cas, titre_donnees, donnees, travail, a_rendre, pour_le_correcteur, revu_le")
    .limit(200);
  if (error) throw new Error(`Lecture des exercices finaux : ${error.message}`);
  const parMetier: Record<string, ExerciceFinalContenu> = {};
  for (const l of (data ?? []) as (Omit<ExerciceFinalContenu, "donnees" | "travail"> & { metier_id: string; donnees: unknown; travail: unknown })[]) {
    parMetier[l.metier_id] = {
      numero: l.numero,
      cas: l.cas,
      titre_donnees: l.titre_donnees,
      donnees: textes(l.donnees),
      travail: textes(l.travail),
      a_rendre: l.a_rendre,
      pour_le_correcteur: l.pour_le_correcteur,
      revu_le: l.revu_le,
    };
  }
  return parMetier;
}

/**
 * Le fil Nouveau : publications, mises à jour des IA, packs, tâches du fil,
 * sessions en direct et vidéos hors kit. Une lecture en base toutes les
 * 10 minutes : une publication programmée paraît donc avec 10 minutes de
 * retard au plus. Ce cache contient aussi ce qui n'est pas encore paru et ce
 * qui est réservé aux abonnés : src/lib/fil.ts décide de ce qui est montré.
 */
export const lireFil = unstable_cache(chargerFil, ["contenu-fil"], {
  revalidate: DUREE_SECONDES,
  tags: [ETIQUETTE],
});

/** Les exercices finaux des 14 métiers, par identifiant de métier. */
export const lireExercicesFinaux = unstable_cache(chargerExercicesFinaux, ["contenu-exercices-finaux"], {
  revalidate: DUREE_SECONDES,
  tags: [ETIQUETTE],
});

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
