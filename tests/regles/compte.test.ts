import { describe, expect, it } from "vitest";
import { lire, lister } from "../outils/fichiers";

// Une personne connectée doit pouvoir gérer son compte sans chercher : le
// profil porte un bloc « Mon compte » (adresse e-mail, changer le mot de
// passe, se déconnecter). Et aucune page réservée ne l'envoie vers une page
// que le proxy referme aux comptes connectés (elle reviendrait à l'accueil).

describe("compte · bloc « Mon compte » du profil", () => {
  const profil = lire("src/components/profil.tsx");
  const auth = lire("src/components/auth.tsx");

  it("le profil affiche le bloc, avant les statistiques", () => {
    expect(profil).toMatch(/<section id="compte"/);
    expect(profil).toMatch(/<ActionsCompte /);
    expect(profil.indexOf('id="compte"')).toBeLessThan(profil.indexOf('className="grid-3"'));
  });

  it("le bloc permet de changer son mot de passe et de se déconnecter", () => {
    const bloc = auth.slice(auth.indexOf("export function ActionsCompte"), auth.indexOf("function SignOutButton"));
    expect(bloc).toMatch(/Changer mon mot de passe/);
    expect(bloc).toMatch(/<SignOutButton \/>/);
    expect(bloc).toMatch(/demanderLienMotDePasse/);
  });

  it("le lien de mot de passe se demande à un seul endroit", () => {
    expect(auth.match(/resetPasswordForEmail/g)).toHaveLength(1);
  });
});

describe("compte · liens des pages réservées", () => {
  const proxy = lire("src/lib/supabase/middleware.ts");
  const fermees = [...(proxy.match(/const AUTH_ONLY_PATHS = \[([^\]]+)\]/)?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((m) => m[1]);

  it("le proxy déclare les pages fermées aux comptes connectés", () => {
    expect(fermees).toContain("/connexion");
    expect(fermees).toContain("/mot-de-passe-oublie");
  });

  it.each(lister("src/app/(app)", (f) => f.endsWith(".tsx")))("%s ne pointe vers aucune de ces pages", (fichier) => {
    const source = lire(fichier);
    for (const chemin of fermees) expect(source).not.toContain(`href="${chemin}"`);
  });
});
