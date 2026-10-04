// Le profil du client : valeurs permises, partagées par le navigateur (écran
// « Bienvenue ») et le serveur (route /api/profil, table profils). Aucune
// dépendance : utilisable partout.

export const PUBLICS = ["salarie", "independant", "commercant"] as const;
export type ProfilType = (typeof PUBLICS)[number];

export const APPAREILS = ["telephone", "ordinateur"] as const;
export type Appareil = (typeof APPAREILS)[number];

export const OUTILS = ["chatgpt", "claude", "gemini", "metaai", "copilot", "aucune"] as const;
export type Outil = (typeof OUTILS)[number];

// Les neuf pays de la bible de localisation, puis « autre ».
export const PAYS = [
  { code: "bj", nom: "Bénin" },
  { code: "bf", nom: "Burkina Faso" },
  { code: "cm", nom: "Cameroun" },
  { code: "ci", nom: "Côte d’Ivoire" },
  { code: "ga", nom: "Gabon" },
  { code: "ml", nom: "Mali" },
  { code: "ne", nom: "Niger" },
  { code: "sn", nom: "Sénégal" },
  { code: "tg", nom: "Togo" },
  { code: "autre", nom: "Un autre pays" },
] as const;
export type Pays = (typeof PAYS)[number]["code"];

export type Profil = {
  type: ProfilType | null;
  metier: string | null;
  outils: Outil[];
  appareil: Appareil | null;
  pays: Pays | null;
};

export const PROFIL_VIDE: Profil = { type: null, metier: null, outils: [], appareil: null, pays: null };

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const dans = <T extends string>(liste: readonly T[], valeur: unknown): valeur is T =>
  typeof valeur === "string" && (liste as readonly string[]).includes(valeur);

/**
 * Lit un profil reçu (corps d'une requête, mémoire du navigateur). Une valeur
 * absente ou nulle reste nulle. Une valeur présente mais inconnue rend
 * l'ensemble invalide : la fonction renvoie null (règle S7).
 */
export function lireProfilRecu(valeur: unknown): Profil | null {
  if (!valeur || typeof valeur !== "object" || Array.isArray(valeur)) return null;
  const v = valeur as Record<string, unknown>;
  const vide = (x: unknown) => x === null || x === undefined;

  if (!vide(v.type) && !dans(PUBLICS, v.type)) return null;
  if (!vide(v.appareil) && !dans(APPAREILS, v.appareil)) return null;
  if (!vide(v.pays) && !PAYS.some((p) => p.code === v.pays)) return null;
  if (!vide(v.metier) && !(typeof v.metier === "string" && v.metier.length <= 80 && SLUG.test(v.metier))) return null;
  if (!vide(v.outils) && !(Array.isArray(v.outils) && v.outils.length <= OUTILS.length && v.outils.every((o) => dans(OUTILS, o)))) return null;

  return {
    type: (v.type as ProfilType | undefined) ?? null,
    metier: (v.metier as string | undefined) ?? null,
    // Sans doublon, dans l'ordre reçu.
    outils: [...new Set((v.outils as Outil[] | undefined) ?? [])],
    appareil: (v.appareil as Appareil | undefined) ?? null,
    pays: (v.pays as Pays | undefined) ?? null,
  };
}

/**
 * Rang d'un métier pour un public : 0, le métier écrit pour ce public
 * (commerçant, indépendant) ; 1, un métier qui lui convient ; 2, les autres.
 * Sans public connu, tous les métiers ont le même rang : l'ordre ne change pas.
 */
export function rangPublic(publics: readonly string[] | null | undefined, type: ProfilType | null | undefined) {
  if (!type || !publics?.includes(type)) return 2;
  return type !== "salarie" && publics.length === 1 ? 0 : 1;
}

/** Tri stable : les éléments du public du client d'abord, l'ordre d'origine ensuite. */
export function trierParPublic<T>(liste: readonly T[], rang: (element: T) => number): T[] {
  return liste
    .map((element, index) => ({ element, index, rang: rang(element) }))
    .sort((a, b) => a.rang - b.rang || a.index - b.index)
    .map((x) => x.element);
}
