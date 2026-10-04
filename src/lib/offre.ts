// Offre commerciale AIW, partagée entre le serveur et le navigateur.
//
// - Accès AIW : paiement unique (vendu sur la page de vente). Donne la
//   plateforme, les Tâches, les Métiers et les 10 guides listés ci-dessous.
// - Abonnement : mensuel, annuel ou à vie, présenté dans la PWA. Ouvre tous
//   les guides et la « tâche sur mesure » de chaque métier.

// Numéros des guides inclus dans l'accès (sans abonnement).
const GUIDES_INCLUS: readonly number[] = [
  // Les plus recherchés
  292, // Planificateur de repas et de courses
  105, // Comparatif des applications de prise de notes IA
  203, // Quinze mots essentiels du vocabulaire IA
  // Les autres
  18,
  11,
  91,
  148,
  115,
  217,
  239,
];

const inclus = new Set(GUIDES_INCLUS);

export function guideInclus(numero: number) {
  return inclus.has(numero);
}

export const PRIX = {
  acces: 5000,
  mensuel: 5000,
  annuel: 50000,
  a_vie: 95000,
} as const;

export type Formule = "mensuel" | "annuel" | "a_vie";

export const FORMULES: { id: Formule; label: string; prix: number; unite: string; note: string }[] = [
  { id: "mensuel", label: "Mensuel", prix: PRIX.mensuel, unite: "pour un mois", note: "Sans engagement, rien n’est prélevé ensuite" },
  { id: "annuel", label: "Annuel", prix: PRIX.annuel, unite: "pour un an", note: "Deux mois offerts par rapport au mensuel" },
  { id: "a_vie", label: "À vie", prix: PRIX.a_vie, unite: "une seule fois", note: "Moins de deux ans d’abonnement annuel" },
];

export function fcfa(montant: number) {
  // Espace fine insécable comme séparateur de milliers : « 50 000 FCFA ».
  return `${new Intl.NumberFormat("fr-FR").format(montant).replace(/\s/g, " ")} FCFA`;
}

export const SUPPORT_EMAIL = "support@parlonsads.com";

// Liens de paiement Chariow, une page produit par formule (variables Vercel).
// Tant qu'une formule n'a pas son lien, la demande part par email au support.
function mailAbonnement(formule: string) {
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(`Abonnement AIW ${formule}`)}&body=${encodeURIComponent(`Bonjour, je souhaite prendre l’abonnement AIW, formule ${formule}.`)}`;
}

export const LIENS_ABONNEMENT: Record<Formule, string> = {
  mensuel: process.env.NEXT_PUBLIC_SUBSCRIBE_URL_MENSUEL || process.env.NEXT_PUBLIC_SUBSCRIBE_URL || mailAbonnement("mensuelle"),
  annuel: process.env.NEXT_PUBLIC_SUBSCRIBE_URL_ANNUEL || process.env.NEXT_PUBLIC_SUBSCRIBE_URL || mailAbonnement("annuelle"),
  a_vie: process.env.NEXT_PUBLIC_SUBSCRIBE_URL_A_VIE || mailAbonnement("à vie"),
};

// L'abonnement reste fermé aux nouveaux clients tant que son flux de
// nouveautés (tâche de la semaine, packs, kits mis à jour) n'est pas en place.
// Pour l'ouvrir : variable Vercel NEXT_PUBLIC_ABONNEMENT_OUVERT=1.
// Ce que contient l'accès, en chiffres. Ils se comptent en base (tables taches
// et metiers) et se mettent à jour ici quand le contenu change : la page
// d'accès et l'écran d'activation les reprennent.
export const NB_TACHES = 56;
export const NB_METIERS = 14;

// Vidéo de démonstration de la page d'accès : l'identifiant d'une vidéo
// YouTube (11 caractères). Sans lui, ou s'il est mal formé, rien ne s'affiche.
const videoDemo = process.env.NEXT_PUBLIC_VIDEO_DEMO_ID ?? "";
export const VIDEO_DEMO_ID = /^[A-Za-z0-9_-]{11}$/.test(videoDemo) ? videoDemo : null;

export const ABONNEMENT_OUVERT = process.env.NEXT_PUBLIC_ABONNEMENT_OUVERT === "1";
export const LIEN_ETRE_PREVENU = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Ouverture de l’abonnement AIW")}&body=${encodeURIComponent("Bonjour, prévenez-moi dès l’ouverture de l’abonnement AIW.")}`;

// Page de paiement de l'accès (produit Chariow « Accès AIW »).
export const LIEN_ACCES =
  process.env.NEXT_PUBLIC_ACCESS_URL ||
  `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Accès AIW")}&body=${encodeURIComponent("Bonjour, je souhaite obtenir l’accès AIW (5 000 FCFA).")}`;

export type Abonnement = {
  actif: boolean;
  periode: Formule | null;
  statut: "actif" | "resilie" | "expire" | null;
  fin_le: string | null;
};

export const SANS_ABONNEMENT: Abonnement = {
  actif: false,
  periode: null,
  statut: null,
  fin_le: null,
};

export function dateLongue(iso: string | null | undefined) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "UTC" }).format(date);
}
