import { beforeEach, describe, expect, it, vi } from "vitest";
import { lire } from "../outils/fichiers";

// Mode hors ligne (plan produit, chantier 4) : le service worker public/sw.js.
// Le fichier est chargé tel qu'il sera servi, avec un faux navigateur : fausses
// réserves, faux réseau. On vérifie ce qu'il garde, ce qu'il ne garde jamais
// (redirections, erreurs, pages publiques, écritures) et ce qu'il vide.

const ORIGINE = "https://aiw.test";
const CODE = lire("public/sw.js");

type FauxCache = Map<string, Response>;
type Ecouteur = (event: FauxEvenement) => void;
type FauxEvenement = {
  request?: FausseRequete;
  data?: unknown;
  respondWith: (r: Promise<Response>) => void;
  waitUntil: (p: Promise<unknown>) => void;
};
type FausseRequete = { method: string; url: string; mode: string; headers: Headers };

function requete(chemin: string, options: { method?: string; mode?: string; headers?: Record<string, string> } = {}): FausseRequete {
  return { method: options.method ?? "GET", url: chemin.startsWith("http") ? chemin : `${ORIGINE}${chemin}`, mode: options.mode ?? "cors", headers: new Headers(options.headers) };
}

function reponse(corps: string, options: { status?: number; type?: string; redirected?: boolean; contentType?: string } = {}) {
  const r = new Response(corps, { status: options.status ?? 200, headers: { "content-type": options.contentType ?? "text/html; charset=utf-8" } });
  Object.defineProperty(r, "type", { value: options.type ?? "basic" });
  Object.defineProperty(r, "redirected", { value: options.redirected ?? false });
  return r;
}

function installer(options: { saveData?: boolean } = {}) {
  const reserves = new Map<string, FauxCache>();
  const ecouteurs = new Map<string, Ecouteur>();
  const reseau = vi.fn<(r: FausseRequete | string, init?: unknown) => Promise<Response>>();

  const caches = {
    open: async (nom: string) => {
      if (!reserves.has(nom)) reserves.set(nom, new Map());
      const cache = reserves.get(nom)!;
      return {
        match: async (adresse: string) => cache.get(adresse)?.clone(),
        put: async (adresse: string, r: Response) => void cache.set(adresse, r),
        delete: async (adresse: string) => cache.delete(adresse),
        keys: async () => [...cache.keys()],
      };
    },
    keys: async () => [...reserves.keys()],
    delete: async (nom: string) => reserves.delete(nom),
  };
  const self = {
    addEventListener: (type: string, ecouteur: Ecouteur) => void ecouteurs.set(type, ecouteur),
    location: { origin: ORIGINE },
    navigator: { connection: { saveData: options.saveData ?? false } },
    skipWaiting: vi.fn(),
    clients: { claim: vi.fn(async () => undefined) },
  };

  const interne = new Function("self", "caches", "fetch", `${CODE}\nreturn { decider, adresseDocument, CACHE_STATIQUE, CACHE_PAGES, CACHE_DONNEES, MAX_PAGES };`)(self, caches, reseau) as {
    decider: (r: FausseRequete, origine: string) => string;
    adresseDocument: (adresse: string) => string;
    CACHE_STATIQUE: string;
    CACHE_PAGES: string;
    CACHE_DONNEES: string;
    MAX_PAGES: number;
  };

  // Déclenche un événement et attend tout ce que le service worker a lancé.
  async function declencher(type: string, donnees: Partial<FauxEvenement>) {
    let rendu: Promise<Response> | undefined;
    const attentes: Promise<unknown>[] = [];
    ecouteurs.get(type)!({
      ...donnees,
      respondWith: (r) => void (rendu = r),
      waitUntil: (p) => void attentes.push(p),
    });
    const resultat = rendu ? await rendu.then((r) => ({ reponse: r }), (erreur: unknown) => ({ erreur })) : {};
    await Promise.all(attentes);
    return resultat as { reponse?: Response; erreur?: unknown };
  }

  const recuperer = (r: FausseRequete) => declencher("fetch", { request: r });
  const gardees = (nom: string) => [...(reserves.get(nom)?.keys() ?? [])];
  return { interne, reseau, reserves, recuperer, declencher, gardees, self };
}

beforeEach(() => {
  vi.useRealTimers();
});

describe("hors ligne · ce que le service worker fait d'une requête", () => {
  const { interne } = installer();
  const decider = (r: FausseRequete) => interne.decider(r, ORIGINE);

  it.each([
    ["un fichier du site", requete("/_next/static/chunks/app.js"), "statique"],
    ["le logo", requete("/brand/atelier/symbol-primary.svg"), "marque"],
    ["le catalogue", requete("/api/catalogue"), "donnees"],
    ["une tâche", requete("/api/taches/20000000-0000-4000-8000-000000000001?metier=comptabilite"), "donnees"],
    ["un kit", requete("/api/kits/comptabilite"), "donnees"],
    ["le profil", requete("/api/profil"), "donnees"],
    ["une page réservée", requete("/kit?metier=comptabilite", { mode: "navigate" }), "page"],
    ["l'accueil", requete("/", { mode: "navigate" }), "page"],
    ["un guide", requete("/guides/mon-guide", { mode: "navigate" }), "page"],
    ["une visite dans l'application", requete("/taches?_rsc=abc", { headers: { rsc: "1" } }), "visite"],
    ["la page d'accès", requete("/acces", { mode: "navigate" }), "sortie"],
    ["la page de connexion", requete("/connexion", { mode: "navigate" }), "sortie"],
  ])("%s", (_nom, r, attendu) => {
    expect(decider(r)).toBe(attendu);
  });

  it.each([
    ["une écriture", requete("/api/taches/20000000-0000-4000-8000-000000000001/faite", { method: "POST" })],
    ["une écriture du profil", requete("/api/profil", { method: "PUT" })],
    ["un fichier de kit à télécharger", requete("/api/kits/fichiers/cahier-de-caisse.xlsx")],
    ["le PDF d'un guide", requete("/api/guides/mon-guide/pdf")],
    ["le webhook de paiement", requete("/api/webhooks/chariow")],
    ["une page légale", requete("/conditions", { mode: "navigate" })],
    ["l'activation du compte", requete("/activation", { mode: "navigate" })],
    ["le retour d'un lien reçu par e-mail", requete("/auth/confirm?token_hash=x", { mode: "navigate" })],
    ["un préchargement de lien", requete("/taches?_rsc=abc", { headers: { rsc: "1", "next-router-prefetch": "1" } })],
    ["un préchargement par segment", requete("/taches?_rsc=abc", { headers: { rsc: "1", "next-router-segment-prefetch": "/_tree" } })],
    ["une visite d'une page publique", requete("/conditions?_rsc=abc", { headers: { rsc: "1" } })],
    ["un autre site", requete("https://i.ytimg.com/vi/x/maxresdefault.jpg")],
    ["une image optimisée", requete("/_next/image?url=x")],
  ])("laisse passer sans rien garder : %s", (_nom, r) => {
    expect(decider(r)).toBe("reseau");
  });

  it("retire le paramètre technique de Next de l'adresse d'un document", () => {
    expect(interne.adresseDocument(`${ORIGINE}/kit?metier=comptabilite&_rsc=1a2b3`)).toBe(`${ORIGINE}/kit?metier=comptabilite`);
  });
});

describe("hors ligne · fichiers du site", () => {
  it("un fichier de /_next/static vient de la réserve dès la seconde demande", async () => {
    const sw = installer();
    sw.reseau.mockResolvedValue(reponse("code", { contentType: "application/javascript" }));
    const r = requete("/_next/static/chunks/app.js");
    expect(await (await sw.recuperer(r)).reponse!.text()).toBe("code");
    expect(await (await sw.recuperer(r)).reponse!.text()).toBe("code");
    expect(sw.reseau).toHaveBeenCalledTimes(1);
  });

  it("le logo est relu sur le réseau, et vient de la réserve sans connexion", async () => {
    const sw = installer();
    const r = requete("/brand/atelier/symbol-primary.svg");
    sw.reseau.mockResolvedValueOnce(reponse("logo", { contentType: "image/svg+xml" }));
    await sw.recuperer(r);
    sw.reseau.mockRejectedValueOnce(new TypeError("réseau coupé"));
    expect(await (await sw.recuperer(r)).reponse!.text()).toBe("logo");
    expect(sw.reseau).toHaveBeenCalledTimes(2);
  });
});

describe("hors ligne · lectures de l'API", () => {
  const tache = requete("/api/taches/20000000-0000-4000-8000-000000000001?metier=comptabilite");

  it("le réseau d'abord ; sans connexion, la dernière réponse gardée", async () => {
    const sw = installer();
    sw.reseau.mockResolvedValueOnce(reponse('{"v":1}', { contentType: "application/json" }));
    expect(await (await sw.recuperer(tache)).reponse!.json()).toEqual({ v: 1 });
    sw.reseau.mockResolvedValueOnce(reponse('{"v":2}', { contentType: "application/json" }));
    expect(await (await sw.recuperer(tache)).reponse!.json()).toEqual({ v: 2 });
    sw.reseau.mockRejectedValueOnce(new TypeError("réseau coupé"));
    expect(await (await sw.recuperer(tache)).reponse!.json()).toEqual({ v: 2 });
  });

  it("sans connexion et sans copie : l'échec remonte à la page, qui l'affiche", async () => {
    const sw = installer();
    sw.reseau.mockRejectedValueOnce(new TypeError("réseau coupé"));
    expect((await sw.recuperer(tache)).erreur).toBeInstanceOf(TypeError);
  });

  it("une erreur du serveur n'est jamais gardée", async () => {
    const sw = installer();
    sw.reseau.mockResolvedValueOnce(reponse('{"error":"x"}', { status: 500, contentType: "application/json" }));
    await sw.recuperer(tache);
    expect(sw.gardees(sw.interne.CACHE_DONNEES)).toEqual([]);
  });

  it.each([401, 403])("une réponse %i (session expirée, accès retiré) vide toutes les copies privées", async (statut) => {
    const sw = installer();
    sw.reseau.mockResolvedValueOnce(reponse('{"v":1}', { contentType: "application/json" }));
    await sw.recuperer(tache);
    sw.reseau.mockResolvedValueOnce(reponse("<html>kit</html>"));
    await sw.recuperer(requete("/kit", { mode: "navigate" }));
    expect(sw.gardees(sw.interne.CACHE_DONNEES)).toHaveLength(1);
    expect(sw.gardees(sw.interne.CACHE_PAGES)).toHaveLength(1);

    sw.reseau.mockResolvedValueOnce(reponse('{"error":"x"}', { status: statut, contentType: "application/json" }));
    expect((await sw.recuperer(requete("/api/moi"))).reponse!.status).toBe(statut);
    expect(sw.gardees(sw.interne.CACHE_DONNEES)).toEqual([]);
    expect(sw.gardees(sw.interne.CACHE_PAGES)).toEqual([]);
  });
});

describe("hors ligne · pages réservées", () => {
  const kit = requete("/kit?metier=comptabilite", { mode: "navigate" });

  it("une page rendue est gardée, et s'ouvre sans connexion", async () => {
    const sw = installer();
    sw.reseau.mockResolvedValueOnce(reponse("<html>kit</html>"));
    expect(await (await sw.recuperer(kit)).reponse!.text()).toBe("<html>kit</html>");
    sw.reseau.mockRejectedValueOnce(new TypeError("réseau coupé"));
    const horsLigne = (await sw.recuperer(kit)).reponse!;
    expect(horsLigne.status).toBe(200);
    expect(await horsLigne.text()).toBe("<html>kit</html>");
  });

  it("une redirection n'est jamais gardée (page d'accès à la place de la page demandée)", async () => {
    const sw = installer();
    sw.reseau.mockResolvedValueOnce(reponse("", { type: "opaqueredirect" }));
    await sw.recuperer(kit);
    sw.reseau.mockResolvedValueOnce(reponse("<html>accès</html>", { redirected: true }));
    await sw.recuperer(kit);
    sw.reseau.mockResolvedValueOnce(reponse("<html>erreur</html>", { status: 500 }));
    await sw.recuperer(kit);
    sw.reseau.mockResolvedValueOnce(reponse('{"x":1}', { contentType: "application/json" }));
    await sw.recuperer(kit);
    expect(sw.gardees(sw.interne.CACHE_PAGES)).toEqual([]);
  });

  it("sans connexion et sans copie : une page d'explication, en français, sans rien d'autre", async () => {
    const sw = installer();
    sw.reseau.mockRejectedValueOnce(new TypeError("réseau coupé"));
    const r = (await sw.recuperer(kit)).reponse!;
    expect(r.status).toBe(503);
    expect(r.headers.get("Cache-Control")).toBe("no-store");
    const texte = await r.text();
    expect(texte).toContain('lang="fr"');
    expect(texte).toContain("Vous êtes hors connexion.");
    expect(texte).not.toMatch(/https?:\/\//);
  });

  it("avec une copie, un réseau trop lent ne fait pas attendre plus de 6 secondes", async () => {
    vi.useFakeTimers();
    const sw = installer();
    sw.reseau.mockResolvedValueOnce(reponse("<html>ancienne</html>"));
    await sw.recuperer(kit);

    // Le réseau répond après 30 secondes : la copie est servie à 6 secondes,
    // puis la réponse fraîche remplace la copie.
    sw.reseau.mockImplementationOnce(() => new Promise((ok) => setTimeout(() => ok(reponse("<html>fraîche</html>")), 30_000)));
    const enCours = sw.recuperer(kit);
    await vi.advanceTimersByTimeAsync(6_000);
    await vi.advanceTimersByTimeAsync(30_000);
    expect(await (await enCours).reponse!.text()).toBe("<html>ancienne</html>");
    sw.reseau.mockRejectedValueOnce(new TypeError("réseau coupé"));
    expect(await (await sw.recuperer(kit)).reponse!.text()).toBe("<html>fraîche</html>");
  });

  it("la réserve des pages est bornée : les plus anciennes partent", async () => {
    const sw = installer();
    for (let i = 0; i < sw.interne.MAX_PAGES + 5; i += 1) {
      sw.reseau.mockResolvedValueOnce(reponse(`<html>${i}</html>`));
      await sw.recuperer(requete(`/guides/guide-${i}`, { mode: "navigate" }));
    }
    const gardees = sw.gardees(sw.interne.CACHE_PAGES);
    expect(gardees).toHaveLength(sw.interne.MAX_PAGES);
    expect(gardees).not.toContain(`${ORIGINE}/guides/guide-0`);
    expect(gardees).toContain(`${ORIGINE}/guides/guide-${sw.interne.MAX_PAGES + 4}`);
  });
});

describe("hors ligne · pages visitées dans l'application", () => {
  const visite = requete("/guides/mon-guide?_rsc=1a2b3", { headers: { rsc: "1" } });

  it("le document de la page est gardé une fois, sans répondre à la place du réseau", async () => {
    const sw = installer();
    sw.reseau.mockResolvedValueOnce(reponse("<html>guide</html>"));
    const resultat = await sw.recuperer(visite);
    expect(resultat.reponse, "la navigation elle-même reste au réseau").toBeUndefined();
    expect(sw.reseau).toHaveBeenCalledTimes(1);
    expect(sw.reseau.mock.calls[0][0]).toBe(`${ORIGINE}/guides/mon-guide`);
    expect(sw.gardees(sw.interne.CACHE_PAGES)).toEqual([`${ORIGINE}/guides/mon-guide`]);

    // Seconde visite : la copie existe, aucune requête de plus.
    await sw.recuperer(visite);
    expect(sw.reseau).toHaveBeenCalledTimes(1);

    // Et le guide s'ouvre sans connexion.
    sw.reseau.mockRejectedValueOnce(new TypeError("réseau coupé"));
    expect(await (await sw.recuperer(requete("/guides/mon-guide", { mode: "navigate" }))).reponse!.text()).toBe("<html>guide</html>");
  });

  it("rien n'est gardé quand le client économise ses données", async () => {
    const sw = installer({ saveData: true });
    await sw.recuperer(visite);
    expect(sw.reseau).not.toHaveBeenCalled();
  });

  it("une redirection ou un échec ne laisse aucune copie, et aucune erreur", async () => {
    const sw = installer();
    sw.reseau.mockResolvedValueOnce(reponse("<html>accès</html>", { redirected: true }));
    await sw.recuperer(visite);
    sw.reseau.mockRejectedValueOnce(new TypeError("réseau coupé"));
    await sw.recuperer(visite);
    expect(sw.gardees(sw.interne.CACHE_PAGES)).toEqual([]);
  });
});

describe("hors ligne · ce qui vide les copies", () => {
  async function avecCopies() {
    const sw = installer();
    sw.reseau.mockResolvedValueOnce(reponse("<html>kit</html>"));
    await sw.recuperer(requete("/kit", { mode: "navigate" }));
    sw.reseau.mockResolvedValueOnce(reponse('{"v":1}', { contentType: "application/json" }));
    await sw.recuperer(requete("/api/catalogue"));
    sw.reseau.mockResolvedValueOnce(reponse("code", { contentType: "application/javascript" }));
    await sw.recuperer(requete("/_next/static/chunks/app.js"));
    return sw;
  }

  it("l'arrivée sur la page d'accès vide les copies privées, pas les fichiers du site", async () => {
    const sw = await avecCopies();
    const resultat = await sw.recuperer(requete("/acces", { mode: "navigate" }));
    expect(resultat.reponse, "la page d'accès n'est pas servie d'ici").toBeUndefined();
    expect(sw.gardees(sw.interne.CACHE_PAGES)).toEqual([]);
    expect(sw.gardees(sw.interne.CACHE_DONNEES)).toEqual([]);
    expect(sw.gardees(sw.interne.CACHE_STATIQUE)).toHaveLength(1);
  });

  it("le message « vider » de l'application (déconnexion, autre compte) fait de même", async () => {
    const sw = await avecCopies();
    await sw.declencher("message", { data: { type: "vider" } });
    expect(sw.gardees(sw.interne.CACHE_PAGES)).toEqual([]);
    expect(sw.gardees(sw.interne.CACHE_DONNEES)).toEqual([]);
  });

  it("une nouvelle version retire les réserves de l'ancienne, et seulement les siennes", async () => {
    const sw = await avecCopies();
    sw.reserves.set("aiw-pages-v0", new Map());
    sw.reserves.set("autre-outil", new Map());
    await sw.declencher("activate", {});
    expect([...sw.reserves.keys()].sort()).toEqual(["aiw-donnees-v1", "aiw-pages-v1", "aiw-statique-v1", "autre-outil"]);
    expect(sw.self.clients.claim).toHaveBeenCalled();
  });
});

describe("hors ligne · le reste de l'application", () => {
  it("la page vide les mêmes réserves que le service worker", async () => {
    const { RESERVES_PRIVEES } = await import("@/lib/hors-ligne");
    const { interne } = installer();
    for (const nom of [interne.CACHE_PAGES, interne.CACHE_DONNEES]) {
      expect(RESERVES_PRIVEES.some((p) => nom.startsWith(p)), nom).toBe(true);
    }
    expect(RESERVES_PRIVEES.some((p) => interne.CACHE_STATIQUE.startsWith(p))).toBe(false);
  });

  it("le proxy laisse passer le service worker sans le rediriger, et garde les pages réservées", () => {
    const motif = lire("proxy.ts").match(/"(\/\(\(\?!.*)",/)?.[1].replace(/\\\\/g, "\\");
    expect(motif).toBeTruthy();
    const filtre = new RegExp(`^${motif}$`);
    expect(filtre.test("/sw.js")).toBe(false);
    expect(filtre.test("/kit")).toBe(true);
    expect(filtre.test("/api/profil")).toBe(true);
    expect(filtre.test("/fichier-sw.js.html")).toBe(true);
  });

  it("le service worker n'est jamais gardé en mémoire et ne peut joindre que le site", () => {
    const config = lire("next.config.ts");
    const bloc = config.slice(config.indexOf('source: "/sw.js"'));
    expect(bloc).toMatch(/Cache-Control[\s\S]{0,40}no-cache, no-store, must-revalidate/);
    expect(bloc).toMatch(/Content-Security-Policy[\s\S]{0,40}default-src 'self'/);
  });

  it("le service worker ne s'installe que depuis les pages réservées, en production", () => {
    const composant = lire("src/components/hors-ligne.tsx");
    expect(composant).toMatch(/process\.env\.NODE_ENV !== "production"/);
    expect(composant).toMatch(/serviceWorker\.register\("\/sw\.js"/);
    expect(lire("src/app/(app)/layout.tsx")).toMatch(/<HorsLigne \/>/);
    expect(lire("src/app/layout.tsx")).not.toMatch(/HorsLigne/);
  });

  it("la déconnexion vide les copies et le profil de ce navigateur", () => {
    const auth = lire("src/components/auth.tsx");
    const bloc = auth.slice(auth.indexOf("function SignOutButton"));
    expect(bloc.indexOf("viderCopiesHorsLigne()")).toBeGreaterThan(-1);
    expect(bloc.indexOf("viderCopiesHorsLigne()")).toBeLessThan(bloc.indexOf("auth.signOut()"));
    expect(bloc).toMatch(/oublierProfil\(\)/);
  });

  it("les textes du service worker suivent les règles d'écriture (règle Q7)", () => {
    expect(CODE).not.toMatch(/[—–]/);
    expect(CODE).not.toMatch(/(?<!\p{L})(tu|ton|tes|toi)(?!\p{L})/iu);
  });
});
