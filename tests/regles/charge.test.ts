import { describe, expect, it } from "vitest";
import { estClient, lire, lister, occurrences, sources } from "../outils/fichiers";

// Règles de charge contrôlées par lecture du code source :
// C1 (contenu commun en cache), C2 (session sans appel réseau),
// C4 (un GET n'écrit jamais), C5 (listes bornées), région des serveurs.

const ROUTES_API = lister("src/app/api", (f) => f.endsWith("/route.ts"));
const SERVEUR = sources().filter((f) => !estClient(lire(f)));

describe("C1 · le contenu commun passe par le cache", () => {
  const TABLES = ["metiers", "taches", "metiers_taches", "exercices", "prompts", "glossaire"];
  const motif = new RegExp(`\\.from\\(\\s*["'](${TABLES.join("|")})["']`);

  it("seul src/lib/contenu.ts interroge les tables de contenu", () => {
    const ailleurs = sources()
      .filter((f) => f !== "src/lib/contenu.ts")
      .flatMap((f) => occurrences(f, motif));
    expect(ailleurs).toEqual([]);
  });

  it("src/lib/contenu.ts met ses lectures en cache et reste côté serveur", () => {
    const contenu = lire("src/lib/contenu.ts");
    expect(contenu).toMatch(/^import "server-only";/);
    expect(contenu.match(/unstable_cache\(/g)?.length).toBe(2);
    expect(contenu).toMatch(/revalidate:\s*DUREE_SECONDES/);
  });
});

describe("C2 · la session se vérifie sans appel réseau", () => {
  // Seuls endroits où l'on interroge le serveur d'authentification.
  const AUTORISES: Record<string, string> = {
    "src/app/auth/recovery/route.ts": "changement de mot de passe : opération sensible sur le compte lui-même",
    "src/components/auth.tsx": "composant client : vérifie le lien reçu par e-mail avant d'afficher le formulaire",
  };

  it("aucun getUser() hors des exceptions", () => {
    const trouves = sources()
      .filter((f) => !(f in AUTORISES))
      .flatMap((f) => occurrences(f, /\.auth\.getUser\s*\(/));
    expect(trouves).toEqual([]);
  });

  it("chaque exception est justifiée et sert encore", () => {
    for (const [fichier, raison] of Object.entries(AUTORISES)) {
      expect(lire(fichier), `exception obsolète : ${fichier}`).toMatch(/\.auth\.getUser\s*\(/);
      expect(raison.length).toBeGreaterThan(10);
    }
  });

  it("le proxy ne crée aucun client pour un visiteur sans cookie de session", () => {
    const proxy = lire("src/lib/supabase/middleware.ts");
    expect(proxy.indexOf("aUnCookieDeSession(request)")).toBeGreaterThan(-1);
    expect(proxy.indexOf("if (!aUnCookieDeSession(request))")).toBeLessThan(proxy.indexOf("createServerClient("));
  });
});

describe("C4 · un GET n'écrit jamais en base", () => {
  it.each(ROUTES_API)("%s", (fichier) => {
    const contenu = lire(fichier);
    const debut = contenu.search(/export\s+async\s+function\s+GET\b/);
    if (debut === -1) return;
    const suite = contenu.slice(debut + 10).search(/export\s+(async\s+)?function\s+(POST|PUT|PATCH|DELETE)\b/);
    const corps = suite === -1 ? contenu.slice(debut) : contenu.slice(debut, debut + 10 + suite);
    expect(corps).not.toMatch(/\.(insert|upsert|update|delete)\s*\(/);
  });
});

describe("C5 · toute liste lue en base est bornée", () => {
  // Une lecture est bornée si elle porte une limite, ne vise qu'une ligne,
  // ou ne demande qu'un compte.
  const BORNE = /\.limit\(|\.maybeSingle\(|\.single\(|head:\s*true/;
  const ECRITURE = /\.(insert|upsert|update|delete)\s*\(/;

  it.each(SERVEUR.filter((f) => /\.from\(/.test(lire(f))))("%s", (fichier) => {
    const morceaux = lire(fichier).split(".from(").slice(1);
    const nonBornees = morceaux
      .map((morceau) => morceau.split(";")[0])
      .filter((requete) => requete.includes(".select(") && !ECRITURE.test(requete) && !BORNE.test(requete))
      .map((requete) => requete.slice(0, 60).replace(/\s+/g, " "));
    expect(nonBornees).toEqual([]);
  });
});

describe("région des serveurs", () => {
  it("les fonctions tournent dans la région de la base (Irlande)", () => {
    const config = JSON.parse(lire("vercel.json") || "{}") as { regions?: string[] };
    expect(config.regions).toEqual(["dub1"]);
  });
});
