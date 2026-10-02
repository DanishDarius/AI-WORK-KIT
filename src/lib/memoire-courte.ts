import "server-only";

// Petite mémoire du serveur, à durée de vie courte et à taille bornée.
//
// Elle évite de reposer à la base, à chaque requête, une question dont la
// réponse vient d'être lue (règle C2). Elle vit dans le serveur qui l'a
// remplie : chaque serveur a la sienne, et elle disparaît avec lui. On n'y
// garde donc que ce qui peut être périmé pendant la durée choisie.
export function creerMemoireCourte<Valeur>(dureeMs: number, tailleMax = 5_000) {
  const entrees = new Map<string, { expire: number; valeur: Valeur }>();
  return {
    lire(cle: string): Valeur | undefined {
      const entree = entrees.get(cle);
      if (!entree) return undefined;
      if (entree.expire > Date.now()) return entree.valeur;
      entrees.delete(cle);
      return undefined;
    },
    garder(cle: string, valeur: Valeur) {
      // Au-delà de la taille maximale, la plus ancienne entrée part.
      if (entrees.size >= tailleMax && !entrees.has(cle)) {
        const premiere = entrees.keys().next().value;
        if (premiere !== undefined) entrees.delete(premiere);
      }
      entrees.set(cle, { expire: Date.now() + dureeMs, valeur });
    },
  };
}
