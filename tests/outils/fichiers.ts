import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

export const RACINE = path.resolve(__dirname, "../..");

/** Chemin absolu à partir de la racine du dépôt. */
export function chemin(...segments: string[]) {
  return path.join(RACINE, ...segments);
}

/** Contenu d'un fichier du dépôt, ou chaîne vide s'il n'existe pas. */
export function lire(relatif: string) {
  try {
    return readFileSync(chemin(relatif), "utf8");
  } catch {
    return "";
  }
}

/** Tous les fichiers d'un dossier (récursif), en chemins relatifs à la racine. */
export function lister(dossier: string, filtre: (fichier: string) => boolean = () => true): string[] {
  const resultat: string[] = [];
  const parcourir = (courant: string) => {
    let entrees: string[];
    try {
      entrees = readdirSync(courant);
    } catch {
      return;
    }
    for (const entree of entrees) {
      const complet = path.join(courant, entree);
      if (statSync(complet).isDirectory()) parcourir(complet);
      else {
        const relatif = path.relative(RACINE, complet).split(path.sep).join("/");
        if (filtre(relatif)) resultat.push(relatif);
      }
    }
  };
  parcourir(chemin(dossier));
  return resultat.sort();
}

/** Fichiers source TypeScript de l'application. */
export function sources() {
  return lister("src", (f) => /\.(ts|tsx)$/.test(f));
}

/** Vrai si le fichier commence par la directive "use client". */
export function estClient(contenu: string) {
  return /^\s*(["'])use client\1/.test(contenu);
}

/** Lignes d'un fichier qui correspondent à un motif, au format « fichier:ligne ». */
export function occurrences(fichier: string, motif: RegExp) {
  return lire(fichier)
    .split("\n")
    .map((ligne, index) => (motif.test(ligne) ? `${fichier}:${index + 1}` : null))
    .filter((v): v is string => v !== null);
}
