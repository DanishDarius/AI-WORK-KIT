"use client";

import { useSyncExternalStore } from "react";
import type { IA } from "./kit-api";

// Profil saisi au premier lancement (écran « Bienvenue »). Il reste dans le
// navigateur : il sert à personnaliser l'affichage (métier du parcours,
// outils, appareil). Le choix de l'IA par métier, lui, est enregistré côté
// serveur (utilisateurs_chemins).
export type ProfilType = "salarie" | "independant" | "commercant";
export type Appareil = "telephone" | "ordinateur";
export type Profil = {
  type: ProfilType | null;
  metier: string | null;
  outils: (IA | "metaai" | "copilot" | "aucune")[];
  appareil: Appareil | null;
};

const CLE = "aw-profil";
const EVENEMENT = "aw-profil-maj";
const PROFIL_VIDE: Profil = { type: null, metier: null, outils: [], appareil: null };

function lireBrut() {
  try {
    return localStorage.getItem(CLE) ?? "";
  } catch {
    return "";
  }
}

function lireProfil(brut = lireBrut()): Profil {
  if (!brut) return PROFIL_VIDE;
  try {
    const valeur = JSON.parse(brut) as Partial<Profil>;
    return { ...PROFIL_VIDE, ...valeur, outils: Array.isArray(valeur.outils) ? valeur.outils : [] };
  } catch {
    return PROFIL_VIDE;
  }
}

export function enregistrerProfil(patch: Partial<Profil>) {
  const suivant = { ...lireProfil(), ...patch };
  try {
    localStorage.setItem(CLE, JSON.stringify(suivant));
  } catch {
    // Navigation privée : le profil vaut pour la session seulement.
  }
  window.dispatchEvent(new Event(EVENEMENT));
}

function abonner(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENEMENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENEMENT, callback);
  };
}

// undefined pendant le rendu serveur, puis le profil enregistré.
export function useProfil(): Profil | undefined {
  const brut = useSyncExternalStore(abonner, lireBrut, () => null);
  return brut === null ? undefined : lireProfil(brut);
}
