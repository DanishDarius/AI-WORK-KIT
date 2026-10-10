import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { creerSupabaseFactice, type Operation, type Reponse } from "../outils/supabase-factice";

// L'attestation par métier, étape B (migrations 0052 et 0053) :
// - S1 et S2 : l'exercice final n'est montré qu'à un abonné qui remplit les
//   conditions (kit installé, 5 tâches faites), et la réponse type du
//   correcteur ne sort jamais ;
// - S7 : types et tailles des fichiers validés, puis revérifiés chez R2 ;
// - S13 : la base décide en une requête (un seul rendu en cours, limite du jour) ;
// - C2 et C4 : 3 requêtes propres au compte au plus, un GET n'écrit rien.

const partage = vi.hoisted(() => ({
  factice: null as ReturnType<typeof import("../outils/supabase-factice").creerSupabaseFactice> | null,
}));
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient: () => partage.factice!.client }));
vi.mock("@/lib/supabase/server", () => ({ createClient: async () => partage.factice!.client }));

const CLIENT = { id: "00000000-0000-4000-8000-000000000001", email: "awa.client@exemple.com" };
const M1 = "10000000-0000-4000-8000-000000000001";
const TACHES = [1, 2, 3, 4, 5, 6].map((n) => `20000000-0000-4000-8000-00000000000${n}`);
const R_CLAUDE = "30000000-0000-4000-8000-000000000001";
const R_CHATGPT = "30000000-0000-4000-8000-000000000002";
const R_PLUS_TARD = "30000000-0000-4000-8000-000000000003";
const RENDU = "40000000-0000-4000-8000-000000000001";
const ENV_R2 = {
  R2_ACCOUNT_ID: "0123456789abcdef0123456789abcdef",
  R2_BUCKET: "aiw-rendus",
  R2_ACCESS_KEY_ID: "cle-de-test",
  R2_SECRET_ACCESS_KEY: "secret-de-test",
};

const etat = {
  abonne: true,
  faites: 5,
  installees: [R_CLAUDE] as string[],
  rpc: { rendu_id: RENDU, etat: "pret", fichiers: [{ cle: `rendus/${CLIENT.id}/${RENDU}/1`, type: "image/jpeg", taille: 300000 }] } as unknown,
  brouillon: { id: RENDU, statut: "brouillon", fichiers: [{ cle: `rendus/${CLIENT.id}/${RENDU}/1`, type: "image/jpeg", taille: 300000 }] } as unknown,
  dernier: null as unknown,
};

function base(op: Operation): Reponse {
  switch (op.table) {
    case "acces_clients":
      return { data: [{ cree_le: "2026-09-01T10:00:00.000Z" }] };
    case "abonnements":
      return { data: etat.abonne ? [{ periode: "mensuel", statut: "actif", fin_le: "2100-01-01T00:00:00.000Z" }] : [] };
    case "metiers":
      return { data: [{ id: M1, slug: "comptabilite", nom: "Comptabilité", description: null, description_local: null, publics: ["salarie"] }] };
    case "taches":
      return { data: TACHES.map((id, i) => ({ id, code: `F0${i + 1}`, titre: `Tâche ${i + 1}`, limite_connue: false, ia_alternative_conseillee: null })) };
    case "metiers_taches":
      return { data: TACHES.map((tache_id) => ({ metier_id: M1, tache_id })) };
    case "exercices_finaux":
      return { data: [{ metier_id: M1, numero: 3, cas: "Vous êtes Mariam.", titre_donnees: "Les données", donnees: ["Journal"], travail: ["Rapprochez"], a_rendre: "Le tableau.", pour_le_correcteur: "RÉPONSE SECRÈTE 475 500", revu_le: "2026-10-10" }] };
    case "kits":
      return { data: { titre: "Kit", presentation: "P", etapes: [{ numero: 1, titre: "Configurer", minutes: 5 }], prerequis: [], limites: [], a_savoir: {}, mots: [], revu_le: null, video_url: null } };
    case "kits_metier":
      return {
        data: [
          { etape_installation: 1, ressources: { id: R_CLAUDE, cle: "config-claude", type: "configuration", titre: "Assistant", description: null, outil: "claude", contenu: null, installation: {}, fichier: null, lien_copie: null, video_url: null, revu_le: null, ressources_taches: [] } },
          { etape_installation: 1, ressources: { id: R_CHATGPT, cle: "config-chatgpt", type: "configuration", titre: "Assistant", description: null, outil: "chatgpt", contenu: null, installation: {}, fichier: null, lien_copie: null, video_url: null, revu_le: null, ressources_taches: [] } },
          { etape_installation: null, ressources: { id: R_PLUS_TARD, cle: "doc", type: "document", titre: "Tableau", description: null, outil: null, contenu: null, installation: {}, fichier: null, lien_copie: null, video_url: null, revu_le: null, ressources_taches: [] } },
        ],
      };
    case "taches_faites":
      return { data: TACHES.slice(0, etat.faites).map((tache_id) => ({ tache_id })) };
    case "progression_kit":
      return { data: etat.installees.map((ressource_id) => ({ ressource_id })) };
    case "rendus_attestation":
      if (op.action === "update") return { data: [{ id: RENDU }] };
      return op.filtres.some(([m]) => m === "maybeSingle") ? { data: etat.brouillon } : op.filtres.some(([, c]) => c === "id") ? { data: etat.brouillon } : { data: etat.dernier ? [etat.dernier] : [] };
    case "preparer_rendu_attestation":
      return { data: [etat.rpc] };
    default:
      return {};
  }
}

function installer() {
  partage.factice = creerSupabaseFactice(base);
  partage.factice.etat.utilisateur = CLIENT;
  return partage.factice;
}

// Une route typée « réponse ou rien » : ici, une absence de réponse est un échec.
function sur(reponse: Response | undefined) {
  if (!reponse) throw new Error("la route n'a renvoyé aucune réponse");
  return reponse;
}

const requete = (body: unknown) => new Request("https://aiw.test/api", { method: "POST", body: JSON.stringify(body) });
const params = { params: Promise.resolve({ slug: "comptabilite" }) };
const COMPTE = ["taches_faites", "progression_kit", "rendus_attestation", "preparer_rendu_attestation"];
const propres = () => partage.factice!.operations.filter((op) => COMPTE.includes(op.table));

beforeEach(() => {
  vi.resetModules();
  vi.unstubAllEnvs();
  for (const [k, v] of Object.entries(ENV_R2)) vi.stubEnv(k, v);
  Object.assign(etat, {
    abonne: true,
    faites: 5,
    installees: [R_CLAUDE],
    rpc: { rendu_id: RENDU, etat: "pret", fichiers: [{ cle: `rendus/${CLIENT.id}/${RENDU}/1`, type: "image/jpeg", taille: 300000 }] },
    brouillon: { id: RENDU, statut: "brouillon", fichiers: [{ cle: `rendus/${CLIENT.id}/${RENDU}/1`, type: "image/jpeg", taille: 300000 }] },
    dernier: null,
  });
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("attestation · conditions", () => {
  it("le kit est installé quand toutes les étapes d'une IA sont cochées ; « plus tard » ne compte pas", async () => {
    const { kitInstalle } = await import("@/lib/attestations");
    const kit = { ressources: [{ id: "a", etape: 1, outil: "claude" }, { id: "b", etape: 1, outil: "chatgpt" }, { id: "c", etape: 2, outil: null }, { id: "d", etape: null, outil: null }] } as never;
    expect(kitInstalle(kit, new Set(["a", "c"]))).toBe(true);
    expect(kitInstalle(kit, new Set(["a"]))).toBe(false);
    expect(kitInstalle(kit, new Set(["d"]))).toBe(false);
    expect(kitInstalle(null, new Set(["a", "c"]))).toBe(false);
  });

  it("les fichiers annoncés sont validés : 1 à 5, image ou PDF, taille bornée", async () => {
    const { fichiersValides } = await import("@/lib/attestations");
    expect(fichiersValides([{ type: "image/jpeg", taille: 1000 }])).toHaveLength(1);
    expect(fichiersValides([])).toBeNull();
    expect(fichiersValides(Array(6).fill({ type: "image/jpeg", taille: 1 }))).toBeNull();
    expect(fichiersValides([{ type: "text/html", taille: 10 }])).toBeNull();
    expect(fichiersValides([{ type: "application/pdf", taille: 21 * 1024 * 1024 }])).toBeNull();
    expect(fichiersValides([{ type: "image/png", taille: 1.5 }])).toBeNull();
  });

  it("l'échéance de correction est à 72 heures, week-ends compris", async () => {
    const { echeanceCorrection } = await import("@/lib/attestations");
    expect(echeanceCorrection("2026-12-04T20:00:00.000Z").toISOString()).toBe("2026-12-07T20:00:00.000Z");
  });
});

describe("S1 S2 C2 C4 · GET /api/attestations/[slug]", () => {
  it("montre l'exercice à un abonné qui remplit les conditions, jamais la réponse type", async () => {
    const factice = installer();
    const { GET } = await import("@/app/api/attestations/[slug]/route");
    const reponse = sur(await GET(new Request("https://aiw.test/api"), params));
    expect(reponse.status).toBe(200);
    const texte = await reponse.text();
    const corps = JSON.parse(texte);
    expect(corps.conditions).toEqual({ abonne: true, kit_installe: true, taches_faites: 5, taches_requises: 5 });
    expect(corps.exercice.cas).toBe("Vous êtes Mariam.");
    expect(texte).not.toContain("RÉPONSE SECRÈTE");
    expect(texte).not.toContain("pour_le_correcteur");
    expect(factice.ecritures()).toEqual([]);
    expect(propres().length).toBeLessThanOrEqual(3);
  });

  it("ne montre pas l'exercice sans abonnement, ni avec 4 tâches, ni sans le kit", async () => {
    for (const cas of [{ abonne: false }, { faites: 4 }, { installees: [R_PLUS_TARD] }]) {
      Object.assign(etat, { abonne: true, faites: 5, installees: [R_CLAUDE] }, cas);
      vi.resetModules();
      installer();
      const { GET } = await import("@/app/api/attestations/[slug]/route");
      const corps = await (sur(await GET(new Request("https://aiw.test/api"), params))).json();
      expect(corps.exercice, JSON.stringify(cas)).toBeNull();
    }
  });

  it("ne montre le commentaire du correcteur que pour un rendu à refaire, et cache un brouillon", async () => {
    etat.dernier = { statut: "a_refaire", fichiers: [{}, {}], commentaire: "Critère 2 : le solde est faux.", cree_le: "2026-12-01T10:00:00Z", rendu_le: "2026-12-01T10:00:00Z", corrige_le: "2026-12-02T10:00:00Z" };
    installer();
    let { GET } = await import("@/app/api/attestations/[slug]/route");
    let corps = await (sur(await GET(new Request("https://aiw.test/api"), params))).json();
    expect(corps.rendu).toMatchObject({ statut: "a_refaire", commentaire: "Critère 2 : le solde est faux.", nb_fichiers: 2 });

    etat.dernier = { statut: "brouillon", fichiers: [], commentaire: null, cree_le: "2026-12-01T10:00:00Z", rendu_le: null, corrige_le: null };
    vi.resetModules();
    installer();
    ({ GET } = await import("@/app/api/attestations/[slug]/route"));
    corps = await (sur(await GET(new Request("https://aiw.test/api"), params))).json();
    expect(corps.rendu).toBeNull();
  });

  it("répond 401 sans session", async () => {
    partage.factice = creerSupabaseFactice(base);
    const { GET } = await import("@/app/api/attestations/[slug]/route");
    expect((sur(await GET(new Request("https://aiw.test/api"), params))).status).toBe(401);
  });
});

describe("S7 S13 C2 · POST /api/attestations/[slug]/fichiers", () => {
  it("donne un lien d'envoi signé par fichier, vers l'espace privé R2, type compris", async () => {
    installer();
    const { POST } = await import("@/app/api/attestations/[slug]/fichiers/route");
    const reponse = sur(await POST(requete({ fichiers: [{ type: "image/jpeg", taille: 300000 }] }), params));
    expect(reponse.status).toBe(200);
    const corps = await reponse.json();
    expect(corps.rendu_id).toBe(RENDU);
    expect(corps.envois[0].url).toMatch(/^https:\/\/0123456789abcdef0123456789abcdef\.eu\.r2\.cloudflarestorage\.com\/aiw-rendus\/rendus\//);
    expect(corps.envois[0].url).toContain("X-Amz-SignedHeaders=content-length%3Bcontent-type%3Bhost");
    expect(propres().length).toBeLessThanOrEqual(3);
    const appel = partage.factice!.operations.find((op) => op.table === "preparer_rendu_attestation");
    expect(appel?.valeurs).toMatchObject({ p_user: CLIENT.id, p_metier: M1, p_limite_jour: 20 });
  });

  it("refuse une liste invalide sans toucher la base", async () => {
    installer();
    const { POST } = await import("@/app/api/attestations/[slug]/fichiers/route");
    expect((sur(await POST(requete({ fichiers: [{ type: "text/html", taille: 10 }] }), params))).status).toBe(400);
    expect(partage.factice!.operations.some((op) => op.table === "preparer_rendu_attestation")).toBe(false);
  });

  it("refuse sans abonnement, sans conditions, et quand R2 n'est pas configuré", async () => {
    etat.abonne = false;
    installer();
    let { POST } = await import("@/app/api/attestations/[slug]/fichiers/route");
    expect((sur(await POST(requete({ fichiers: [{ type: "image/jpeg", taille: 10 }] }), params))).status).toBe(403);

    etat.abonne = true;
    etat.faites = 4;
    vi.resetModules();
    installer();
    ({ POST } = await import("@/app/api/attestations/[slug]/fichiers/route"));
    expect((sur(await POST(requete({ fichiers: [{ type: "image/jpeg", taille: 10 }] }), params))).status).toBe(403);
    expect(partage.factice!.operations.some((op) => op.table === "preparer_rendu_attestation")).toBe(false);

    etat.faites = 5;
    vi.stubEnv("R2_SECRET_ACCESS_KEY", "");
    vi.resetModules();
    installer();
    ({ POST } = await import("@/app/api/attestations/[slug]/fichiers/route"));
    expect((sur(await POST(requete({ fichiers: [{ type: "image/jpeg", taille: 10 }] }), params))).status).toBe(503);
  });

  it("répond 409 quand un rendu attend sa correction, 429 à la limite du jour", async () => {
    etat.rpc = { rendu_id: RENDU, etat: "en_attente", fichiers: null };
    installer();
    let { POST } = await import("@/app/api/attestations/[slug]/fichiers/route");
    expect((sur(await POST(requete({ fichiers: [{ type: "image/jpeg", taille: 10 }] }), params))).status).toBe(409);
    etat.rpc = { rendu_id: RENDU, etat: "limite", fichiers: null };
    vi.resetModules();
    installer();
    ({ POST } = await import("@/app/api/attestations/[slug]/fichiers/route"));
    expect((sur(await POST(requete({ fichiers: [{ type: "image/jpeg", taille: 10 }] }), params))).status).toBe(429);
  });

  it("répond 409 sans lien d'envoi quand l'attestation du métier est déjà obtenue (migration 0054)", async () => {
    etat.rpc = { rendu_id: null, etat: "valide", fichiers: null };
    installer();
    const { POST } = await import("@/app/api/attestations/[slug]/fichiers/route");
    const reponse = sur(await POST(requete({ fichiers: [{ type: "image/jpeg", taille: 10 }] }), params));
    expect(reponse.status).toBe(409);
    expect(JSON.stringify(await reponse.json())).not.toContain("url");
  });
});

describe("S7 S13 C2 · POST /api/attestations/[slug]/rendu", () => {
  function r2(reponses: Record<string, Response>) {
    const appels: { methode: string; url: string }[] = [];
    vi.stubGlobal("fetch", vi.fn(async (url: string, init?: RequestInit) => {
      const methode = init?.method ?? "GET";
      appels.push({ methode, url });
      if (url.startsWith("https://api.resend.com")) return new Response("{}", { status: 200 });
      return reponses[methode] ?? new Response(null, { status: 500 });
    }));
    return appels;
  }
  const corps = { rendu_id: RENDU, nom: "Mariam Koné", verification: "J'ai recalculé le solde et corrigé l'écart du client D." };

  it("vérifie chez R2 que chaque fichier est arrivé, puis envoie le rendu en correction", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_EMAIL_FROM", "AIW <hello@exemple.com>");
    const appels = r2({ HEAD: new Response(null, { status: 200, headers: { "content-length": "250000", "content-type": "image/jpeg" } }) });
    const factice = installer();
    const { POST } = await import("@/app/api/attestations/[slug]/rendu/route");
    const reponse = sur(await POST(requete(corps), params));
    expect(reponse.status).toBe(200);
    const maj = factice.ecritures("rendus_attestation")[0];
    expect(maj.action).toBe("update");
    expect(maj.valeurs).toMatchObject({ statut: "en_attente", nom_attestation: "Mariam Koné" });
    expect(maj.filtres).toContainEqual(["eq", "statut", "brouillon"]);
    expect(appels.some((a) => a.methode === "HEAD")).toBe(true);
    expect(appels.some((a) => a.url.startsWith("https://api.resend.com"))).toBe(true);
    expect(propres().length).toBeLessThanOrEqual(3);
  });

  it("retire un fichier trop lourd ou d'un autre type, et n'envoie rien en correction", async () => {
    const appels = r2({
      HEAD: new Response(null, { status: 200, headers: { "content-length": String(9 * 1024 * 1024), "content-type": "image/jpeg" } }),
      DELETE: new Response(null, { status: 204 }),
    });
    const factice = installer();
    const { POST } = await import("@/app/api/attestations/[slug]/rendu/route");
    expect((sur(await POST(requete(corps), params))).status).toBe(400);
    expect(appels.some((a) => a.methode === "DELETE")).toBe(true);
    expect(factice.ecritures("rendus_attestation")).toEqual([]);
  });

  it("refuse un fichier absent, un rendu déjà envoyé, un nom vide", async () => {
    r2({ HEAD: new Response(null, { status: 404 }) });
    installer();
    let { POST } = await import("@/app/api/attestations/[slug]/rendu/route");
    expect((sur(await POST(requete(corps), params))).status).toBe(400);

    etat.brouillon = { id: RENDU, statut: "en_attente", fichiers: [] };
    vi.resetModules();
    installer();
    ({ POST } = await import("@/app/api/attestations/[slug]/rendu/route"));
    expect((sur(await POST(requete(corps), params))).status).toBe(409);

    vi.resetModules();
    installer();
    ({ POST } = await import("@/app/api/attestations/[slug]/rendu/route"));
    expect((sur(await POST(requete({ ...corps, nom: " " }), params))).status).toBe(400);
  });
});
