import "server-only";

import type { FilContenu, PublicationContenu, TacheContenu, TypePublication } from "@/lib/contenu";

// Le fil « Nouveau » : ce qui est montré à un client, selon la date et selon
// son abonnement (plan produit, chantier 5).
//
// Trois règles, appliquées ici et nulle part ailleurs :
// 1. une publication ne se voit pas avant sa date de parution ;
// 2. une publication réservée aux abonnés se montre en titre seul à un
//    client sans abonnement : ni résumé, ni lien ;
// 3. une tâche du fil ne s'ouvre que par une publication parue, la sienne ou
//    celle d'un pack qui la contient.
//
// Le fil complet (src/lib/contenu.ts, lireFil) contient aussi ce qui n'est pas
// paru et ce qui est réservé : il ne sort jamais du serveur tel quel.

/** Nombre de publications montrées dans le fil. */
export const TAILLE_FIL = 60;
/** Sans visite connue, la pastille compte les publications de ces derniers jours. */
const JOURS_SANS_VISITE = 14;
/** La pastille n'affiche pas un nombre plus grand. */
const PASTILLE_MAX = 9;

export type ElementFil = {
  id: string;
  type: TypePublication;
  titre: string;
  /** Vide quand la publication est réservée et que le client n'est pas abonné. */
  resume: string | null;
  publie_le: string;
  reserve: boolean;
  /** Le client peut l'ouvrir. */
  ouvert: boolean;
  /** Adresse de la page, quand le client peut l'ouvrir. */
  href: string | null;
  /** Ce qui est publié (slug, identifiant), quand le client peut l'ouvrir. */
  ref: string | null;
};

export const LIBELLE_TYPE: Record<TypePublication, string> = {
  tache: "Tâche de la semaine",
  pack: "Pack",
  mise_a_jour: "Mise à jour des IA",
  guide: "Guide",
  ressource: "Ressource",
};

function parue(p: PublicationContenu, maintenant: number) {
  const date = Date.parse(p.publie_le);
  return Number.isFinite(date) && date <= maintenant;
}

/** Les publications déjà parues, de la plus récente à la plus ancienne. */
export function publicationsParues(fil: FilContenu, maintenant = Date.now()): PublicationContenu[] {
  return fil.publications.filter((p) => parue(p, maintenant)).sort((a, b) => Date.parse(b.publie_le) - Date.parse(a.publie_le));
}

export function hrefTacheDuFil(id: string) {
  return `/taches/${encodeURIComponent(id)}?fil=1`;
}

// Adresse de ce qui est publié. null : la cible n'existe pas (ou plus).
function adresse(fil: FilContenu, p: PublicationContenu): string | null {
  switch (p.type) {
    case "tache":
      return fil.taches[p.ref_id] ? hrefTacheDuFil(p.ref_id) : null;
    case "pack":
      return fil.packs[p.ref_id] ? `/packs/${encodeURIComponent(p.ref_id)}` : null;
    case "mise_a_jour":
      return fil.misesAJour[p.ref_id] ? `/mises-a-jour-ia/${encodeURIComponent(p.ref_id)}` : null;
    case "guide":
      return /^[a-z0-9-]+$/.test(p.ref_id) ? `/guides/${p.ref_id}` : null;
    case "ressource":
      return "/kit";
  }
}

/** Le fil tel qu'un client le voit. */
export function elementsDuFil(fil: FilContenu, abonne: boolean, maintenant = Date.now()): ElementFil[] {
  return publicationsParues(fil, maintenant)
    .slice(0, TAILLE_FIL)
    .map((p) => {
      const href = adresse(fil, p);
      const ouvert = Boolean(href) && (abonne || !p.reserve_abonnes);
      return {
        id: p.id,
        type: p.type,
        titre: p.titre,
        resume: ouvert ? p.resume : null,
        publie_le: p.publie_le,
        reserve: p.reserve_abonnes,
        ouvert,
        href: ouvert ? href : null,
        ref: ouvert ? p.ref_id : null,
      };
    });
}

export type AccesPublication = "ouverte" | "reservee" | "absente";

function accesParPublications(publications: PublicationContenu[], abonne: boolean): AccesPublication {
  if (!publications.length) return "absente";
  return abonne || publications.some((p) => !p.reserve_abonnes) ? "ouverte" : "reservee";
}

/** Une mise à jour des IA ou un pack : paru ? ouvert à ce client ? */
export function accesPublication(fil: FilContenu, type: "mise_a_jour" | "pack", ref: string, abonne: boolean, maintenant = Date.now()): AccesPublication {
  return accesParPublications(
    fil.publications.filter((p) => p.type === type && p.ref_id === ref && parue(p, maintenant)),
    abonne,
  );
}

export type TacheDuFil = {
  tache: TacheContenu;
  acces: AccesPublication;
  /** D'où vient la tâche, pour le titre de l'écran et le bouton de retour. */
  origine: { libelle: string; retour: string };
};

/**
 * Une tâche du fil : parue par sa propre publication, ou par celle d'un pack
 * qui la contient. null : ce n'est pas une tâche du fil.
 */
export function tacheDuFil(fil: FilContenu, id: string, abonne: boolean, maintenant = Date.now()): TacheDuFil | null {
  const tache = fil.taches[id];
  if (!tache) return null;
  const packs = Object.values(fil.packs).filter((pack) => pack.taches.includes(id));
  const slugs = new Set(packs.map((pack) => pack.slug));
  const publications = fil.publications.filter(
    (p) => parue(p, maintenant) && ((p.type === "tache" && p.ref_id === id) || (p.type === "pack" && slugs.has(p.ref_id))),
  );
  const directe = publications.some((p) => p.type === "tache");
  const pack = packs.find((candidat) => publications.some((p) => p.type === "pack" && p.ref_id === candidat.slug));
  return {
    tache,
    acces: accesParPublications(publications, abonne),
    origine: !directe && pack ? { libelle: `Pack : ${pack.titre}`, retour: `/packs/${encodeURIComponent(pack.slug)}` } : { libelle: LIBELLE_TYPE.tache, retour: "/nouveau" },
  };
}

/**
 * Le nombre de publications parues depuis la dernière visite du fil, pour la
 * pastille de la cloche. Sans visite connue : celles des 14 derniers jours.
 */
export function nouveautesDepuis(fil: FilContenu, vuLe: string | null, maintenant = Date.now()): number {
  const visite = vuLe ? Date.parse(vuLe) : NaN;
  const seuil = Number.isFinite(visite) ? visite : maintenant - JOURS_SANS_VISITE * 86_400_000;
  const nombre = publicationsParues(fil, maintenant).filter((p) => Date.parse(p.publie_le) > seuil).length;
  return Math.min(nombre, PASTILLE_MAX);
}

/** La prochaine session en direct, et les replays déjà disponibles. */
export function sessionsPourAbonne(fil: FilContenu, maintenant = Date.now()) {
  const aVenir = fil.sessions
    .filter((s) => Date.parse(s.debut_le) > maintenant - 2 * 3_600_000)
    .sort((a, b) => Date.parse(a.debut_le) - Date.parse(b.debut_le));
  return {
    prochaine: aVenir[0] ?? null,
    replays: fil.sessions.filter((s) => s.replay_url && Date.parse(s.debut_le) <= maintenant).slice(0, 6),
  };
}
