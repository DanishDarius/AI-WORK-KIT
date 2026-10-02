"use client";

import { useEffect, useState } from "react";
import type { Abonnement } from "@/lib/offre";

export type Moi = {
  email: string | null;
  membre_depuis: string;
  acces_depuis: string;
  abonnement: Abonnement;
};

// Une seule requête /api/moi par chargement de page, partagée par tous les
// composants qui ont besoin du compte ou de l'abonnement.
let enCours: Promise<Moi | null> | null = null;

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
    chargerMoi().then((valeur) => {
      if (actif) setMoi(valeur);
    });
    return () => {
      actif = false;
    };
  }, []);
  return moi;
}

// true / false une fois connu, undefined pendant le chargement.
export function useAbonne() {
  const moi = useMoi();
  if (moi === undefined) return undefined;
  return Boolean(moi?.abonnement.actif);
}
