import { describe, expect, it } from "vitest";
import { cheminInterne, estEmail, estUuid, normaliserEmail, sansAccents } from "@/lib/normaliser";

// Règles S6 et S7 : validation des entrées partagée par le serveur.

describe("normaliserEmail", () => {
  it("retire les espaces et met en minuscules", () => {
    expect(normaliserEmail("  Awa.Client@Exemple.COM ")).toBe("awa.client@exemple.com");
  });
});

describe("sansAccents", () => {
  it("retire les accents et met en minuscules, pour comparer une recherche", () => {
    expect(sansAccents("Rédaction Ça Où Été ÎLE")).toBe("redaction ca ou ete ile");
  });
});

describe("estEmail", () => {
  it.each(["a@b.co", "awa.client+test@exemple.com"])("accepte %s", (v) => {
    expect(estEmail(v)).toBe(true);
  });

  it.each([null, undefined, 12, {}, ["a@b.co"], "", "sans-arobase", "a@b", "a b@c.d", `${"a".repeat(250)}@b.co`])(
    "refuse %j",
    (v) => {
      expect(estEmail(v)).toBe(false);
    },
  );
});

describe("estUuid", () => {
  it("accepte un UUID", () => {
    expect(estUuid("3f2a9c1e-5b7d-4e8a-9c21-7d4e5f6a8b90")).toBe(true);
  });

  it.each([null, 42, "", "abc", "3f2a9c1e5b7d4e8a9c217d4e5f6a8b90", "3f2a9c1e-5b7d-4e8a-9c21-7d4e5f6a8b90; drop table", "../../etc/passwd"])(
    "refuse %j",
    (v) => {
      expect(estUuid(v)).toBe(false);
    },
  );
});

describe("cheminInterne", () => {
  it.each([
    ["/activation", "/activation"],
    ["/taches/12?metier=comptabilite#haut", "/taches/12?metier=comptabilite#haut"],
  ])("garde le chemin interne %s", (entree, attendu) => {
    expect(cheminInterne(entree)).toBe(attendu);
  });

  it.each([null, undefined, "", "@evil.example", "//evil.example", "/\\evil.example", "https://evil.example", "javascript:alert(1)", ".evil.example", "evil.example"])(
    "remplace %j par le repli",
    (entree) => {
      expect(cheminInterne(entree)).toBe("/");
      expect(cheminInterne(entree, "/connexion")).toBe("/connexion");
    },
  );
});
