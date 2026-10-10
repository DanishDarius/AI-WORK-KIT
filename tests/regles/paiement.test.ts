import { describe, expect, it } from "vitest";
import { lire, lister } from "../outils/fichiers";

// Chariow est débranché de l'application (décision du 10 octobre 2026). Le
// paiement se fera dans AIW, par Moneaa (étape 2). D'ici là :
// - plus aucune route, aucun lien ni aucune variable Chariow dans le code ;
// - aucun bouton d'achat ne mène vers une page de paiement : il affiche
//   « Paiement bientôt disponible » (src/components/bouton-paiement.tsx).

const CODE = lister("src", (f) => /\.(ts|tsx)$/.test(f));

describe("paiement · Chariow débranché", () => {
  it("aucune route de webhook Chariow", () => {
    expect(lister("src/app/api", (f) => f.includes("chariow"))).toEqual([]);
  });

  it.each(CODE)("%s n'utilise ni Chariow ni ses liens de paiement", (fichier) => {
    const contenu = lire(fichier);
    expect(contenu).not.toMatch(/CHARIOW_|x-chariow|NEXT_PUBLIC_ACCESS_URL|NEXT_PUBLIC_SUBSCRIBE_URL|LIEN_ACCES|LIENS_ABONNEMENT/);
    if (fichier !== "src/components/bouton-paiement.tsx") expect(contenu.toLowerCase()).not.toContain("chariow");
  });

  it("le bouton de paiement est désactivé et le dit", () => {
    const bouton = lire("src/components/bouton-paiement.tsx");
    expect(bouton).toMatch(/<button[^>]*disabled/);
    expect(bouton).toContain("Paiement bientôt disponible");
    expect(bouton).not.toMatch(/href=/);
  });
});
