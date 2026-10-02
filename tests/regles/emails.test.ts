import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { chemin, lire } from "../outils/fichiers";

// Les deux e-mails de compte (activation après l'achat, nouveau mot de passe)
// sont écrits par nous et collés dans Supabase (Authentication, Emails,
// Templates). Le dépôt garde la version de référence : supabase/emails/.
// Ce test lit ces fichiers ; il ne voit pas ce qui est réellement enregistré
// dans Supabase (réglage hors du code, à recopier après chaque changement).

const MODELES = ["invitation", "mot-de-passe"] as const;

describe.each(MODELES)("e-mail de compte · %s", (nom) => {
  const html = lire(`supabase/emails/${nom}.html`);
  const texte = html.replace(/<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ");

  it("porte le lien de Supabase dans le bouton et en clair", () => {
    const liens = html.match(/\{\{ \.ConfirmationURL \}\}/g) ?? [];
    expect(liens.length).toBeGreaterThanOrEqual(3);
    expect(html).toMatch(/<a href="\{\{ \.ConfirmationURL \}\}"/);
  });

  it("n'utilise aucune autre variable de Supabase", () => {
    const variables = new Set(html.match(/\{\{[^}]*\}\}/g) ?? []);
    expect([...variables]).toEqual(["{{ .ConfirmationURL }}"]);
  });

  it("ne charge une image que depuis notre site, et cette image existe", () => {
    const images = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]);
    expect(images.length).toBeGreaterThan(0);
    for (const src of images) {
      expect(src.startsWith("https://ai-work-kit.parlonsads.com/")).toBe(true);
      const fichier = src.replace("https://ai-work-kit.parlonsads.com/", "public/");
      expect(existsSync(chemin(fichier))).toBe(true);
    }
  });

  it("reste lisible sans feuille de style : chaque texte porte sa couleur", () => {
    expect(html).not.toMatch(/<(p|h1|td)(?![^>]*style=)[^>]*>[^<\s]/);
  });

  it("respecte le ton (Q7) : français, vouvoiement, sans tiret long", () => {
    expect(html).toMatch(/<html lang="fr">/);
    expect(texte).not.toMatch(/[—–]/);
    expect(texte).not.toMatch(/\b(tu|ton|ta|tes|toi)\b/i);
    expect(texte).toMatch(/AI WORK KIT, un produit de Parlons ADS/);
  });

  it("annonce la durée du lien réglée dans Supabase (24 heures)", () => {
    expect(texte).toMatch(/valable 24 heures/);
  });
});

describe("e-mails de compte · gabarit commun", () => {
  it("les deux modèles partagent la même mise en page", () => {
    const squelette = (nom: string) =>
      lire(`supabase/emails/${nom}.html`)
        .replace(/>[^<]+</g, "><")
        .replace(/<title>.*?<\/title>/, "")
        .replace(/<p style="margin:0 0 10px;"><\/p>\s*/g, "")
        .replace(/<p style="margin:0 0 10px;"><a[^>]*><\/a><\/p>\s*/g, "");
    expect(squelette("invitation")).toBe(squelette("mot-de-passe"));
  });
});
