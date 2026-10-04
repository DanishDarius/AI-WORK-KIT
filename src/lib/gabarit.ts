// Modèle à remplir : une consigne dont les parties variables sont des
// champs, écrits {{ainsi}} dans le gabarit. Aucune dépendance : utilisable
// dans le navigateur et dans les tests.

export const A_REMPLIR = "[à remplir]";
export const NON_PRECISE = "(non précisé)";

type Champ = { cle: string; requis: boolean };

/** La consigne, avec chaque {{champ}} remplacé par la réponse donnée. */
export function remplirGabarit(gabarit: string, champs: Champ[], valeurs: Record<string, string>) {
  const parCle = new Map(champs.map((c) => [c.cle, c]));
  return gabarit.replace(/\{\{(\w+)\}\}/g, (_, cle: string) => {
    const valeur = (valeurs[cle] ?? "").trim();
    if (valeur) return valeur;
    return parCle.get(cle)?.requis === false ? NON_PRECISE : A_REMPLIR;
  });
}

/** Les champs obligatoires encore vides. */
export function champsManquants<C extends Champ>(champs: C[], valeurs: Record<string, string>) {
  return champs.filter((c) => c.requis && !(valeurs[c.cle] ?? "").trim());
}
