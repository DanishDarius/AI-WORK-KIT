import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { chemin, lire } from "../outils/fichiers";

// Les deux e-mails de compte (activation après l'achat, nouveau mot de passe)
// sont écrits par nous et collés dans Supabase (Authentication, Emails,
// Templates). Le dépôt garde la version de référence : supabase/emails/.
// Ce test lit ces fichiers ; il ne voit pas ce qui est réellement enregistré
// dans Supabase (réglage hors du code, à recopier après chaque changement).

const MODELES = [
  ["invitation", "24 heures"],
  ["mot-de-passe", "1 heure"],
] as const;

describe.each(MODELES)("e-mail de compte · %s", (nom, duree) => {
  const html = lire(`supabase/emails/${nom}.html`);
  const texte = html.replace(/<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ");

  it("porte le lien de Supabase dans le bouton et en clair", () => {
    const liens = html.match(/\{\{ \.ConfirmationURL \}\}/g) ?? [];
    expect(liens.length).toBeGreaterThanOrEqual(3);
    expect(html).toMatch(/<a href="\{\{ \.ConfirmationURL \}\}"/);
  });

  it("n'utilise que le lien et l'adresse parmi les variables de Supabase", () => {
    const variables = new Set(html.match(/\{\{[^}]*\}\}/g) ?? []);
    expect([...variables].sort()).toEqual(["{{ .ConfirmationURL }}", "{{ .Email }}"]);
  });

  it("ne charge une image que depuis notre site, et cette image existe", () => {
    const images = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]);
    expect(images.length).toBeGreaterThan(0);
    for (const src of images) {
      expect(src.startsWith("https://ai-work-kit.parlonsads.com/")).toBe(true);
      // « ?v= » change l'adresse quand l'image change : les messageries gardent l'ancienne en mémoire.
      const fichier = src.replace("https://ai-work-kit.parlonsads.com/", "public/").replace(/\?v=\d+$/, "");
      expect(existsSync(chemin(fichier))).toBe(true);
    }
  });

  it("reste lisible sans feuille de style : chaque texte porte sa couleur", () => {
    for (const balise of html.match(/<(p|h1|a)\b[^>]*>/g) ?? []) expect(balise).toMatch(/style="[^"]*color:/);
  });

  it("garde son fond sombre dans une messagerie qui ignore les styles", () => {
    expect(html.match(/bgcolor="#[0-9a-f]{6}"/g)?.length).toBeGreaterThanOrEqual(5);
  });

  it("respecte le ton (Q7) : français, vouvoiement, sans tiret long", () => {
    expect(html).toMatch(/<html lang="fr">/);
    expect(texte).not.toMatch(/[—–]/);
    expect(texte).not.toMatch(/\b(tu|ton|ta|tes|toi)\b/i);
    expect(texte).toMatch(/AI WORK KIT, un produit de Parlons ADS/);
  });

  it(`annonce la durée réelle du lien : ${duree}`, () => {
    const annonces = texte.match(/valable \d+ heures?/g) ?? [];
    expect(annonces.length).toBeGreaterThan(0);
    for (const annonce of annonces) expect(annonce).toBe(`valable ${duree}`);
  });
});

describe("e-mails de compte · durées annoncées", () => {
  it("l'heure du lien de mot de passe est celle que la route applique", async () => {
    const { DUREE_LIEN_MOT_DE_PASSE_MS } = await import("@/lib/supabase/recovery");
    expect(DUREE_LIEN_MOT_DE_PASSE_MS).toBe(60 * 60 * 1000);
  });
});

describe("e-mails de compte · gabarit commun", () => {
  it("les deux modèles partagent la même mise en page", () => {
    const squelette = (nom: string) =>
      lire(`supabase/emails/${nom}.html`)
        .replace(/>[^<]+</g, "><")
        .replace(/<title>.*?<\/title>/, "");
    expect(squelette("invitation")).toBe(squelette("mot-de-passe"));
  });
});
