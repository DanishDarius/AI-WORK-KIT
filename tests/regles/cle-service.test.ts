import { execSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import { estClient, lire, RACINE, sources } from "../outils/fichiers";

// Règle S3 : la clé service ne vit que dans des fichiers marqués
// « server-only ». Aucune variable NEXT_PUBLIC_ ne porte un secret.

const SERVEUR_SEULEMENT = /^import\s+["']server-only["'];?/m;

describe("S3 · clé service confinée au serveur", () => {
  it("src/lib/supabase/admin.ts est marqué server-only", () => {
    expect(lire("src/lib/supabase/admin.ts")).toMatch(SERVEUR_SEULEMENT);
  });

  it("aucun composant client n'importe le client admin", () => {
    const fautifs = sources().filter((f) => {
      const contenu = lire(f);
      return estClient(contenu) && /@\/lib\/supabase\/admin/.test(contenu);
    });
    expect(fautifs).toEqual([]);
  });

  it("SUPABASE_SERVICE_ROLE_KEY n'est lue que dans src/lib/supabase/admin.ts", () => {
    const lecteurs = sources().filter((f) => /SUPABASE_SERVICE_ROLE_KEY/.test(lire(f)));
    expect(lecteurs).toEqual(["src/lib/supabase/admin.ts"]);
  });

  it("aucune variable NEXT_PUBLIC_ ne porte un secret", () => {
    const fichiers = [...sources(), "env.example", "next.config.ts", "proxy.ts"];
    const suspects = new Set<string>();
    for (const f of fichiers) {
      for (const m of lire(f).matchAll(/NEXT_PUBLIC_[A-Z0-9_]+/g)) {
        if (/(SERVICE|SECRET|PRIVATE|PASSWORD|RESEND|WEBHOOK)/.test(m[0])) suspects.add(m[0]);
      }
    }
    expect([...suspects]).toEqual([]);
  });

  it("aucun fichier .env n'est suivi par git", () => {
    const suivis = execSync("git ls-files", { cwd: RACINE, encoding: "utf8" })
      .split("\n")
      .filter((f) => /(^|\/)\.env(\.|$)/.test(f));
    expect(suivis).toEqual([]);
  });
});

describe("Q4 · aucun fichier de build dans le dépôt", () => {
  it("aucun fichier généré (cache TypeScript, dossier .next) n'est suivi par git", () => {
    const suivis = execSync("git ls-files", { cwd: RACINE, encoding: "utf8" })
      .split("\n")
      .filter((f) => /\.tsbuildinfo$|^\.next\//.test(f));
    expect(suivis).toEqual([]);
  });
});
