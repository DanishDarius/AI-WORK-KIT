import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import * as guides from "@/lib/guides";
import { chemin, lire, lister } from "../outils/fichiers";

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

// Règle Q7, guides (décisions des 6 et 7 octobre 2026) : un montant en euros
// ou en dollars porte son montant en FCFA à côté ; chaque guide a son PDF,
// fabriqué avec les polices du site et le slogan écrit dans marque.ts.

/** Les montants écrits sans FCFA, et pourquoi ils le restent. */
const SANS_FCFA: Record<string, string[]> = {
  // Calculs de bourse sur une entreprise fictive : l'unité n'y joue aucun rôle.
  "guide-27": ["50 €", "2 €"],
  "guide-28": ["M€", "12,96 €"],
  // Montant déjà donné en FCFA plus haut dans le même guide.
  "guide-07": ["100 millions de dollars", "100 M$"],
  "guide-37": ["980 €", "950 €"],
  "guide-44": ["100 $"],
  "guide-49": ["80 millions de dollars"],
  "guide-253": ["100€"],
  // Zéro reste zéro.
  "guide-97": ["0 €"],
};
const MONTANT = /\d[\d  ,.]*\s?(?:M€|€|euros?\b|M\$|\$|(?:millions?|milliards?) de dollars|dollars?\b)/g;

describe("Q7 · guides : FCFA à côté des euros et des dollars", () => {
  const fichiers = lister("content/guides", (f) => f.endsWith(".md"));

  it("les 292 guides sont là", () => {
    expect(fichiers).toHaveLength(292);
  });

  it("aucun montant en euros ou en dollars sans son montant en FCFA sur la même ligne", () => {
    const oublis: string[] = [];
    for (const fichier of fichiers) {
      const cle = /guide-\d+/.exec(fichier)?.[0] ?? "";
      const permis = SANS_FCFA[cle] ?? [];
      lire(fichier).split("\n").forEach((ligne, i) => {
        if (ligne.includes("FCFA")) return;
        for (const m of ligne.match(MONTANT) ?? []) {
          if (!permis.some((p) => m.includes(p) || p.includes(m.trim()))) oublis.push(`${fichier}:${i + 1} « ${m.trim()} »`);
        }
      });
    }
    expect(oublis).toEqual([]);
  });

  it("aucun tiret long dans un guide refait ou complété", () => {
    for (const n of ["03", "05", "09", "11"]) {
      const [fichier] = fichiers.filter((f) => f.includes(`/guide-${n}-`));
      expect(lire(fichier), fichier).not.toMatch(/[—–]/);
    }
  });
});

describe("Q7 · guides : PDF aux polices du site, avec le slogan", () => {
  const programme = lire("scripts/build-guide-download.py");
  const pdfs = lister("private/guides/pdf", (f) => f.endsWith(".pdf"));

  it("le programme lit le slogan dans marque.ts et ne le recopie pas", () => {
    expect(programme).toContain('"marque.ts"');
    expect(programme).toMatch(/drawString\(54, 32, slogan\)/);
    expect(programme).not.toContain("au cœur de vos tâches");
    expect(programme).not.toContain("appliquée à votre travail");
  });

  it("le programme n'utilise que des polices du dépôt", () => {
    expect(programme).toContain("Nunito-latin-variable.woff2");
    expect(programme).toContain("VarelaRound-latin-400.woff2");
    expect(programme).not.toMatch(/Windows|Calibri|Outfit|Bricolage|DMMono|\/usr\/share/);
    for (const police of ["guides-symboles.ttf", "guides-mono.ttf", "LICENCE-DejaVu.txt"]) {
      expect(lister("scripts/polices"), police).toContain(`scripts/polices/${police}`);
    }
  });

  it("chaque guide a son PDF, au même numéro et au même nom", () => {
    const attendus = lister("content/guides", (f) => f.endsWith(".md")).map((f) => {
      const [, numero, nom] = /guide-(\d+)-(.+)\.md$/.exec(f) ?? [];
      return `private/guides/pdf/guide-${numero.padStart(3, "0")}-${nom}.pdf`;
    });
    expect(pdfs).toEqual(attendus.sort());
  });

  it("chaque PDF est fabriqué avec Nunito et Varela Round, plus avec les anciennes polices", () => {
    for (const pdf of pdfs) {
      const octets = readFileSync(chemin(pdf)).toString("latin1");
      expect(octets, pdf).toContain("AIWNunito900");
      expect(octets, pdf).toContain("AIWVarela");
      expect(octets, pdf).not.toMatch(/Calibri|DMMono|Bricolage/);
    }
  });
});
