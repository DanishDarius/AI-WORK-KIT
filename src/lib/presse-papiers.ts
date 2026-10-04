// Copie d'un texte dans le presse-papiers. Renvoie false quand le navigateur
// refuse (page non sécurisée, permission refusée) : l'écran l'annonce alors.
export async function copierTexte(texte: string) {
  try {
    await navigator.clipboard.writeText(texte);
    return true;
  } catch {
    return false;
  }
}
