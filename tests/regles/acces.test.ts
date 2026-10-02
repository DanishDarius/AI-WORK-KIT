import { describe, expect, it } from "vitest";
import { estClient, lire, lister } from "../outils/fichiers";

// Règle S1 : l'accès payé se vérifie côté serveur dans chaque page réservée
// et dans chaque route API réservée. Le layout et le proxy ne suffisent pas.

const PAGES_RESERVEES = lister("src/app/(app)", (f) => f.endsWith("/page.tsx"));

// Routes API qui ne passent pas par l'accès payé, avec la raison.
const ROUTES_HORS_ACCES: Record<string, string> = {
  "src/app/api/webhooks/chariow/route.ts": "appelée par Chariow, protégée par signature (règle S5)",
  "src/app/api/activation/renvoi/route.ts":
    "publique par nature : l'acheteur n'a pas encore de compte. Réponse identique pour toute adresse, un envoi par 5 minutes (règles S13 et C6)",
};

const ROUTES_API = lister("src/app/api", (f) => f.endsWith("/route.ts"));

describe("S1 · accès payé vérifié dans chaque page réservée", () => {
  it("trouve des pages réservées à contrôler", () => {
    expect(PAGES_RESERVEES.length).toBeGreaterThan(10);
  });

  it.each(PAGES_RESERVEES)("%s est une page serveur qui appelle exigerAccesActif()", (fichier) => {
    const contenu = lire(fichier);
    expect(estClient(contenu), "une page réservée ne doit pas être un composant client").toBe(false);
    expect(contenu, "appel à exigerAccesActif() manquant").toMatch(/\bexigerAccesActif\s*\(/);
  });
});

describe("S1 · accès payé vérifié dans chaque route API réservée", () => {
  it("trouve des routes API à contrôler", () => {
    expect(ROUTES_API.length).toBeGreaterThan(10);
  });

  it.each(ROUTES_API.filter((f) => !(f in ROUTES_HORS_ACCES)))("%s appelle requireActiveUser()", (fichier) => {
    expect(lire(fichier), "appel à requireActiveUser() manquant").toMatch(/\brequireActiveUser\s*\(/);
  });

  it("chaque exception est justifiée et existe encore", () => {
    for (const [fichier, raison] of Object.entries(ROUTES_HORS_ACCES)) {
      expect(ROUTES_API, `exception obsolète : ${fichier}`).toContain(fichier);
      expect(raison.length).toBeGreaterThan(10);
    }
  });
});
