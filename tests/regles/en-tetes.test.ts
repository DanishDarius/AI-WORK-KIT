import { describe, expect, it } from "vitest";
import { lire } from "../outils/fichiers";

// Règle S9 : les en-têtes de sécurité sont déclarés dans next.config.ts.
// Le test lit la configuration : il ne remplace pas un contrôle sur le site
// déployé (curl -I), à faire après chaque livraison qui touche aux en-têtes.

describe("S9 · en-têtes de sécurité", () => {
  const config = lire("next.config.ts");

  it("next.config.ts déclare une fonction headers()", () => {
    expect(config).toMatch(/async\s+headers\s*\(/);
  });

  it.each([
    ["Content-Security-Policy", /Content-Security-Policy/],
    ["frame-ancestors dans la CSP", /frame-ancestors\s+'none'/],
    ["X-Content-Type-Options: nosniff", /X-Content-Type-Options[\s\S]{0,80}nosniff/],
    ["Referrer-Policy", /Referrer-Policy/],
    ["Permissions-Policy", /Permissions-Policy/],
    ["Strict-Transport-Security", /Strict-Transport-Security/],
  ])("%s est présent", (_nom, motif) => {
    expect(config).toMatch(motif);
  });
});
