"use client";

import { useEffect, useState } from "react";
import type { Abonnement } from "@/lib/offre";

export type Moi = {
  email: string | null;
  membre_depuis: string;
  acces_depuis: string;
  abonnement: Abonnement;
  /** Publications du fil Nouveau parues depuis la dernière visite (9 au plus). */
  nouveautes?: number;
};

// Une seule requête /api/moi par chargement de page, partagée par tous les
// composants qui ont besoin du compte ou de l'abonnement.
let enCours: Promise<Moi | null> | null = null;
const EVENEMENT_MOI = "aw-moi-maj";

function chargerMoi() {
  if (!enCours) {
    enCours = fetch("/api/moi", { credentials: "same-origin", cache: "no-store" })
      .then((r) => (r.ok ? (r.json() as Promise<Moi>) : null))
      .catch(() => null)
      .then((moi) => {
        // Échec : on retentera au prochain composant monté.
        if (!moi) enCours = null;
        return moi;
      });
  }
  return enCours;
}

// undefined : chargement en cours ; null : indisponible (déconnecté, réseau).
export function useMoi() {
  const [moi, setMoi] = useState<Moi | null | undefined>(undefined);
  useEffect(() => {
    let actif = true;
    const lire = () => {
      chargerMoi().then((valeur) => {
        if (actif) setMoi(valeur);
      });
    };
    lire();
    window.addEventListener(EVENEMENT_MOI, lire);
    return () => {
      actif = false;
      window.removeEventListener(EVENEMENT_MOI, lire);
    };
  }, []);
  return moi;
}

/** Le client vient d'ouvrir le fil : la pastille disparaît tout de suite, sans relire le compte. */
export function oublierNouveautes() {
  if (!enCours) return;
  enCours = enCours.then((moi) => (moi ? { ...moi, nouveautes: 0 } : moi));
  window.dispatchEvent(new Event(EVENEMENT_MOI));
}

// true / false une fois connu, undefined pendant le chargement.
export function useAbonne() {
  const moi = useMoi();
  if (moi === undefined) return undefined;
  return Boolean(moi?.abonnement.actif);
}
