// Offre commerciale AIW, partagée entre le serveur et le navigateur.
//
// - Accès AIW : paiement unique. Donne la plateforme, les Tâches, les Métiers
//   et les 10 guides listés ci-dessous.
// - Abonnement : mensuel, annuel ou à vie, présenté dans la PWA. Ouvre tous
//   les guides et la « tâche sur mesure » de chaque métier.

import { idVideo } from "@/lib/video";

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

// Ce que contient l'accès, en chiffres. Ils se comptent en base (tables taches
// et metiers) et se mettent à jour ici quand le contenu change : la page
// d'accès et l'écran d'activation les reprennent.
export const NB_TACHES = 56;
export const NB_METIERS = 14;

// Vidéo de démonstration de la page d'accès : l'identifiant de la vidéo dans
// la bibliothèque d'AIW chez Bunny Stream (src/lib/video.ts). Sans lui, ou
// s'il est mal formé, rien ne s'affiche.
export const VIDEO_DEMO_ID = idVideo(process.env.NEXT_PUBLIC_VIDEO_DEMO_ID);

// L'abonnement reste fermé aux nouveaux clients tant que son flux de
// nouveautés (tâche de la semaine, packs, kits mis à jour) n'est pas en place.
// Pour l'ouvrir : variable Vercel NEXT_PUBLIC_ABONNEMENT_OUVERT=1.
export const ABONNEMENT_OUVERT = process.env.NEXT_PUBLIC_ABONNEMENT_OUVERT === "1";
export const LIEN_ETRE_PREVENU = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Ouverture de l’abonnement AIW")}&body=${encodeURIComponent("Bonjour, prévenez-moi dès l’ouverture de l’abonnement AIW.")}`;

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
