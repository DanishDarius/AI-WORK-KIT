import { describe, expect, it } from "vitest";
import * as guides from "@/lib/guides";
import { lire, lister } from "../outils/fichiers";

// Règle S2 : sans abonnement, un guide réservé ne livre que son titre. Ni son
// résumé, ni son introduction, ni son premier chapitre ne quittent le serveur.

describe("S2 · guides réservés : titres seulement sans abonnement", () => {
  it("un guide se lit s'il est inclus dans l'accès ou si le client est abonné", () => {
    expect(guides.guideLisible({ inclus: true }, false)).toBe(true);
    expect(guides.guideLisible({ inclus: true }, true)).toBe(true);
    expect(guides.guideLisible({ inclus: false }, true)).toBe(true);
    expect(guides.guideLisible({ inclus: false }, false)).toBe(false);
  });

  it("sans abonnement, la liste donne le titre d'un guide réservé, jamais son résumé", () => {
    const liste = guides.getGuideSummaries(false);
    const reserves = liste.filter((g) => !g.inclus);
    const inclus = liste.filter((g) => g.inclus);
    expect(liste).toHaveLength(292);
    expect(inclus).toHaveLength(10);
    expect(reserves).toHaveLength(282);
    for (const g of reserves) {
      expect(g.title.length, g.slug).toBeGreaterThan(0);
      expect(g.excerpt, g.slug).toBe("");
    }
    for (const g of inclus) expect(g.excerpt.length, g.slug).toBeGreaterThan(0);
  });

  it("un abonné reçoit le résumé de tous les guides", () => {
    for (const g of guides.getGuideSummaries(true)) expect(g.excerpt.length, g.slug).toBeGreaterThan(0);
  });

  it("la liste ne transporte jamais le texte d'un guide", () => {
    for (const abonne of [false, true]) {
      for (const g of guides.getGuideSummaries(abonne)) expect(Object.keys(g)).not.toContain("markdown");
    }
  });

  it("l'ancien aperçu (introduction et premier chapitre) n'existe plus", () => {
    expect(Object.keys(guides)).not.toContain("guidePreview");
    const sources = lister("src", (f) => /\.(ts|tsx|css)$/.test(f));
    for (const fichier of sources) {
      const texte = lire(fichier);
      expect(texte.includes("guidePreview"), fichier).toBe(false);
      expect(texte.includes("preview-wrap"), fichier).toBe(false);
    }
  });

  it("la page d'un guide décide par guideLisible et n'affiche le texte que dans la branche lisible", () => {
    const page = lire("src/app/(app)/(shell)/guides/[slug]/page.tsx");
    expect(page).toContain("const verrouille = !guideLisible(guide, abonnement.actif);");
    // Le texte et le résumé n'apparaissent qu'une fois chacun dans le rendu, hors de la branche verrouillée.
    expect(page.match(/guide\.markdown/g)).toHaveLength(1);
    const verrou = page.slice(page.indexOf("{verrouille ? ("), page.indexOf(") : (", page.indexOf("{verrouille ? (")));
    expect(verrou).toContain("Ce guide est réservé aux abonnés");
    expect(verrou).not.toContain("GuideMarkdown");
    expect(verrou).not.toContain("excerpt");
    expect(page).toContain("{!verrouille && <p className=\"lead\">{guide.excerpt}</p>}");
  });

  it("la bibliothèque lit l'abonnement côté serveur avant de préparer la liste", () => {
    const page = lire("src/app/(app)/(shell)/bibliotheque/page.tsx");
    expect(page).toContain("const abonnement = await getAbonnement(email);");
    expect(page).toContain("getGuideSummaries(abonnement.actif)");
  });
});
