"use client";

import { useSyncExternalStore } from "react";

// L'année en cours, pour « © 2026 ». Les pages publiques sont statiques (règle C3) :
// le serveur écrit l'année de la construction, le navigateur lit la sienne,
// donc elle change toute seule chaque 1er janvier.
const sAbonner = () => () => {};
const anneeNavigateur = () => new Date().getFullYear();

export function AnneeCourante({ initiale }: { initiale: number }) {
  const annee = useSyncExternalStore(sAbonner, anneeNavigateur, () => initiale);
  return <>{annee}</>;
}
