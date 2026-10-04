"use client";

import { useSyncExternalStore } from "react";
import { api } from "./kit-api";
import { lireProfilRecu, PROFIL_VIDE, type Profil } from "./profil-commun";

export type { Appareil, Outil, Pays, Profil, ProfilType } from "./profil-commun";

// Profil saisi au premier lancement (écran « Bienvenue »). Il sert à
// personnaliser l'affichage : métier du parcours, public, outils, appareil.
//
// Il vit à deux endroits :
// - dans le navigateur, pour s'afficher tout de suite, sans requête ;
// - en base (table profils), pour suivre le client sur un autre téléphone.
// Le navigateur envoie chaque changement au serveur. Le serveur n'est relu
// que lorsque le navigateur n'a pas de profil (premier lancement ici).
// Le choix de l'IA par métier, lui, est enregistré à part
// (utilisateurs_chemins).

const CLE = "aw-profil";
// Dernier profil que le serveur a confirmé avoir enregistré.
const CLE_ENVOYE = "aw-profil-envoye";
const EVENEMENT = "aw-profil-maj";

function lireBrut(cle = CLE) {
  try {
    return localStorage.getItem(cle) ?? "";
  } catch {
    return "";
  }
}

function ecrire(cle: string, valeur: string) {
  try {
    localStorage.setItem(cle, valeur);
  } catch {
    // Navigation privée : le profil vaut pour la session seulement.
  }
}

function lireProfil(brut = lireBrut()): Profil {
  if (!brut) return PROFIL_VIDE;
  try {
    // Une mémoire abîmée ou d'une ancienne version : on repart d'un profil vide.
    return lireProfilRecu(JSON.parse(brut)) ?? PROFIL_VIDE;
  } catch {
    return PROFIL_VIDE;
  }
}

// Envoie le profil au serveur. Un échec (hors ligne, session expirée) ne gêne
// pas l'écran : l'envoi sera retenté au prochain passage par l'accueil.
let envoiEnCours: Promise<void> | null = null;

function envoyerProfil(profil: Profil) {
  const texte = JSON.stringify(profil);
  const envoi = api<{ ok: boolean }>("/api/profil", { method: "PUT", body: texte }).then(
    () => ecrire(CLE_ENVOYE, texte),
    () => undefined, // Retenté plus tard (synchroniserProfil).
  );
  envoiEnCours = envoi;
  void envoi.finally(() => {
    if (envoiEnCours === envoi) envoiEnCours = null;
  });
  return envoi;
}

export function enregistrerProfil(patch: Partial<Profil>) {
  const suivant = { ...lireProfil(), ...patch };
  ecrire(CLE, JSON.stringify(suivant));
  window.dispatchEvent(new Event(EVENEMENT));
  void envoyerProfil(suivant);
}

/**
 * À appeler à l'accueil. Sans profil dans ce navigateur, relit celui du
 * serveur (nouveau téléphone, navigateur nettoyé). Avec un profil que le
 * serveur n'a pas encore reçu, l'envoie. Renvoie le profil à utiliser.
 */
export async function synchroniserProfil(): Promise<Profil> {
  // Un envoi vient de partir (fin du questionnaire, changement de métier) :
  // on attend sa réponse plutôt que d'en lancer un second.
  if (envoiEnCours) await envoiEnCours;
  const local = lireProfil();
  if (local.metier) {
    if (lireBrut(CLE_ENVOYE) !== JSON.stringify(local)) await envoyerProfil(local);
    return local;
  }
  try {
    const { profil } = await api<{ profil: unknown }>("/api/profil");
    const recu = lireProfilRecu(profil);
    if (recu?.metier) {
      const texte = JSON.stringify(recu);
      ecrire(CLE, texte);
      ecrire(CLE_ENVOYE, texte);
      window.dispatchEvent(new Event(EVENEMENT));
      return recu;
    }
  } catch {
    // Serveur injoignable : on garde ce que le navigateur sait.
  }
  return local;
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
  const brut = useSyncExternalStore(abonner, () => lireBrut(), () => null);
  return brut === null ? undefined : lireProfil(brut);
}
