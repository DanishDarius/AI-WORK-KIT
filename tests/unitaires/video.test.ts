import { describe, expect, it } from "vitest";
import { adresseLecteur, adresseVideo, BIBLIOTHEQUE_VIDEOS, idVideo, lireVideo, videoValide } from "@/lib/video";
import { lire, lister } from "../outils/fichiers";

// Les vidéos d'AIW se lisent dans la page, par le lecteur de Bunny Stream,
// et seulement celles de la bibliothèque d'AIW (décision du 7 octobre 2026).

const ID = "1a2b3c4d-5e6f-4a1b-8c2d-0123456789ab";
const BASE = `https://player.mediadelivery.net/embed/${BIBLIOTHEQUE_VIDEOS}/${ID}`;

describe("vidéos · adresse d'une vidéo d'AIW", () => {
  it("reconnaît l'adresse du lecteur donnée par Bunny, sous ses formes connues", () => {
    expect(lireVideo(BASE)).toBe(ID);
    expect(lireVideo(`https://player.mediadelivery.net/play/${BIBLIOTHEQUE_VIDEOS}/${ID}`)).toBe(ID);
    expect(lireVideo(`https://iframe.mediadelivery.net/embed/${BIBLIOTHEQUE_VIDEOS}/${ID}`)).toBe(ID);
    expect(lireVideo(`  ${BASE.toUpperCase().replace("HTTPS://PLAYER.MEDIADELIVERY.NET/EMBED", "https://player.mediadelivery.net/embed")}/ `)).toBe(ID);
  });

  it.each([
    ["une autre bibliothèque", `https://player.mediadelivery.net/embed/999999/${ID}`],
    ["un autre hébergeur", "https://youtu.be/dQw4w9WgXcQ"],
    ["un hôte qui imite le lecteur", `https://player.mediadelivery.net.exemple.com/embed/${BIBLIOTHEQUE_VIDEOS}/${ID}`],
    ["une adresse qui n'est pas en https", `http://player.mediadelivery.net/embed/${BIBLIOTHEQUE_VIDEOS}/${ID}`],
    ["des paramètres ajoutés", `${BASE}?autoplay=true`],
    ["un chemin ajouté", `${BASE}/../../autre`],
    ["un identifiant mal formé", `https://player.mediadelivery.net/embed/${BIBLIOTHEQUE_VIDEOS}/pas-un-identifiant`],
    ["du script", "javascript:alert(1)"],
    ["rien", ""],
  ])("écarte %s", (_cas, adresse) => {
    expect(lireVideo(adresse)).toBeNull();
    expect(videoValide(adresse)).toBeNull();
  });

  it("écarte ce qui n'est pas un texte", () => {
    for (const valeur of [null, undefined, 12, {}, []]) expect(videoValide(valeur)).toBeNull();
  });

  it("remet toute adresse reconnue sous une seule forme", () => {
    expect(videoValide(`https://iframe.mediadelivery.net/play/${BIBLIOTHEQUE_VIDEOS}/${ID}/`)).toBe(BASE);
    expect(adresseVideo(ID)).toBe(BASE);
  });

  it("lit un identifiant seul (réglage de la page d'accès)", () => {
    expect(idVideo(ID)).toBe(ID);
    expect(idVideo(` ${ID.toUpperCase()} `)).toBe(ID);
    expect(idVideo("dQw4w9WgXcQ")).toBeNull();
    expect(idVideo(undefined)).toBeNull();
  });

  it("le cadre du lecteur lance la lecture, en français, chez Bunny et nulle part ailleurs", () => {
    const cadre = new URL(adresseLecteur(ID));
    expect(cadre.origin).toBe("https://player.mediadelivery.net");
    expect(cadre.pathname).toBe(`/embed/${BIBLIOTHEQUE_VIDEOS}/${ID}`);
    expect(cadre.searchParams.get("autoplay")).toBe("true");
    expect(cadre.searchParams.get("lang")).toBe("fr");
  });
});

describe("vidéos · dans le code", () => {
  it("le serveur ne laisse passer que des vidéos d'AIW", () => {
    const contenu = lire("src/lib/contenu.ts");
    // Tâche, ressource, kit, installation par outil, vidéos du fil.
    expect(contenu.match(/videoValide\(/g) ?? []).toHaveLength(5);
    expect(contenu).not.toMatch(/video_url: \w+\.video_url \?\? null/);
  });

  it("aucune vidéo d'AIW ne s'ouvre hors de l'application", () => {
    for (const fichier of lister("src", (f) => /\.tsx$/.test(f))) {
      const source = lire(fichier);
      expect(source, fichier).not.toMatch(/href=\{[^}]*video[^}]*\}/i);
      expect(source, fichier).not.toContain("s’ouvre hors de l’application");
    }
  });

  it("le lecteur ne charge rien avant le clic et envoie l'origine de la page à l'hébergeur", () => {
    const lecteur = lire("src/components/lecteur-video.tsx");
    expect(lecteur).toMatch(/lecture \? \(\s*<iframe/);
    expect(lecteur).toContain('referrerPolicy="strict-origin-when-cross-origin"');
    expect(lecteur).not.toMatch(/<img|b-cdn\.net/);
  });

  it("l'affiche ne porte aucun texte : le bouton de lecture, seul, au milieu", () => {
    const lecteur = lire("src/components/lecteur-video.tsx");
    const affiche = /<button type="button" className="lecteur-affiche".*>\n([\s\S]*?)<\/button>/.exec(lecteur);
    expect(affiche).not.toBeNull();
    // Dans le bouton : le rond de lecture et rien d'autre. Le titre reste dit aux lecteurs d'écran.
    expect(affiche![1].trim()).toMatch(/^<span className="lecteur-bouton" aria-hidden="true"><Icon name="play" size=\{\d+\} \/><\/span>$/);
    expect(affiche![0]).toContain("aria-label={`Lire la vidéo : ${titre}`}");
    const styles = lire("src/app/globals.css");
    const regle = /\.lecteur-affiche \{([^}]*)\}/.exec(styles);
    expect(regle![1]).toMatch(/align-items: center/);
    expect(regle![1]).toMatch(/justify-content: center/);
    expect(styles).not.toMatch(/\.lecteur-(texte|kicker|titre)\b/);
  });

  it("le cadre du lecteur est debout, comme l'écran de téléphone que filment les vidéos", () => {
    const styles = lire("src/app/globals.css");
    expect(styles).toMatch(/\.lecteur \.media \{ aspect-ratio: 9 \/ 16; \}/);
    // Une largeur bornée, et un cadre qui tient en entier dans la hauteur de l'écran.
    const regle = /\.lecteur \{([^}]*)\}/.exec(styles);
    expect(regle![1]).toMatch(/width: min\(100%, 300px\);/);
    expect(regle![1]).toMatch(/width: min\(100%, 300px, calc\(72svh \* 9 \/ 16\)\);/);
    // Le cadre commun des autres médias (vidéos des éditeurs dans les actualités) reste couché.
    expect(styles).toMatch(/\.media \{[^}]*aspect-ratio: 16 \/ 9;/);
    // Aucune page n'impose plus sa propre largeur au lecteur.
    for (const fichier of ["src/components/tache.tsx", "src/components/kit-metier.tsx", "src/app/(public)/acces/page.tsx"]) {
      expect(lire(fichier), fichier).not.toMatch(/maxWidth: \d+ \}\}>\s*<LecteurVideo/);
    }
  });

  it.each(["src/components/tache.tsx", "src/components/kit-metier.tsx", "src/components/premiers-pas.tsx", "src/app/(public)/acces/page.tsx"])("%s lit ses vidéos dans la page", (fichier) => {
    expect(lire(fichier)).toMatch(/<(LecteurVideo|VideoRepliable)\b/);
  });

  it("la CSP autorise le lecteur de Bunny, et seulement lui pour les vidéos d'AIW", () => {
    const config = lire("next.config.ts");
    expect(config).toMatch(/frame-src https:\/\/www\.youtube-nocookie\.com https:\/\/player\.mediadelivery\.net /);
    expect(config).not.toMatch(/iframe\.mediadelivery\.net|b-cdn\.net/);
  });
});
