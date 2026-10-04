import { beforeEach, describe, expect, it, vi } from "vitest";
import { lireProfilRecu, PROFIL_VIDE, rangPublic, trierParPublic } from "@/lib/profil-commun";
import { creerSupabaseFactice, type Operation, type Reponse } from "../outils/supabase-factice";

// Le profil du client (chantiers 4 et 6) : valeurs permises, tri des métiers
// par public, et route /api/profil. Règles S7 (entrées validées), S13 (une
// ligne par compte), C2 (une requête propre au compte), C4 (un GET n'écrit pas).

describe("profil · valeurs reçues", () => {
  it("accepte un profil complet et retire les doublons", () => {
    expect(lireProfilRecu({ type: "commercant", metier: "commerce-vente-en-ligne", outils: ["gemini", "gemini", "metaai"], appareil: "telephone", pays: "bj" })).toEqual({
      type: "commercant", metier: "commerce-vente-en-ligne", outils: ["gemini", "metaai"], appareil: "telephone", pays: "bj",
    });
  });

  it("garde nulle une valeur absente (profil d'une ancienne version, sans pays)", () => {
    expect(lireProfilRecu({ type: "salarie", metier: "comptabilite", outils: [], appareil: null })).toEqual({ ...PROFIL_VIDE, type: "salarie", metier: "comptabilite" });
    expect(lireProfilRecu({})).toEqual(PROFIL_VIDE);
  });

  it.each([
    ["un public inconnu", { type: "patron" }],
    ["un appareil inconnu", { appareil: "tablette" }],
    ["un pays inconnu", { pays: "fr" }],
    ["une IA inconnue", { outils: ["chatgpt", "autre-ia"] }],
    ["des outils qui ne sont pas une liste", { outils: "chatgpt" }],
    ["trop d'outils", { outils: ["chatgpt", "claude", "gemini", "metaai", "copilot", "aucune", "chatgpt"] }],
    ["un métier qui n'est pas un identifiant", { metier: "../../etc/passwd" }],
    ["un métier trop long", { metier: "a".repeat(81) }],
    ["un métier qui n'est pas un texte", { metier: 12 }],
  ])("refuse %s", (_nom, valeur) => {
    expect(lireProfilRecu(valeur)).toBeNull();
  });

  it.each([null, undefined, "texte", 3, ["liste"]])("refuse ce qui n'est pas un objet : %s", (valeur) => {
    expect(lireProfilRecu(valeur)).toBeNull();
  });
});

describe("profil · métiers montrés en premier", () => {
  const metiers = [
    { slug: "vente-commercial", publics: ["salarie"] },
    { slug: "btp-gestion-de-chantier", publics: ["salarie", "independant"] },
    { slug: "graphisme", publics: ["salarie", "independant"] },
    { slug: "commerce-vente-en-ligne", publics: ["commercant"] },
    { slug: "independant-prestataire-de-services", publics: ["independant"] },
  ];
  const ordre = (type: Parameters<typeof rangPublic>[1]) => trierParPublic(metiers, (m) => rangPublic(m.publics, type)).map((m) => m.slug);

  it("un commerçant voit d'abord son métier, puis les autres dans leur ordre", () => {
    expect(ordre("commercant")).toEqual(["commerce-vente-en-ligne", "vente-commercial", "btp-gestion-de-chantier", "graphisme", "independant-prestataire-de-services"]);
  });

  it("un indépendant voit d'abord le métier écrit pour lui, puis ceux qui s'exercent à son compte", () => {
    expect(ordre("independant")).toEqual(["independant-prestataire-de-services", "btp-gestion-de-chantier", "graphisme", "vente-commercial", "commerce-vente-en-ligne"]);
  });

  it("un salarié voit d'abord les métiers salariés, dans leur ordre", () => {
    expect(ordre("salarie")).toEqual(["vente-commercial", "btp-gestion-de-chantier", "graphisme", "commerce-vente-en-ligne", "independant-prestataire-de-services"]);
  });

  it("sans public connu, l'ordre ne change pas", () => {
    expect(ordre(null)).toEqual(metiers.map((m) => m.slug));
    expect(ordre(undefined)).toEqual(metiers.map((m) => m.slug));
  });
});

const partage = vi.hoisted(() => ({
  factice: null as ReturnType<typeof import("../outils/supabase-factice").creerSupabaseFactice> | null,
}));

vi.mock("@/lib/supabase/admin", () => ({ createAdminClient: () => partage.factice!.client }));
vi.mock("@/lib/supabase/server", () => ({ createClient: async () => partage.factice!.client }));

const CLIENT = { id: "00000000-0000-4000-8000-000000000001", email: "awa.client@exemple.com" };
const ligne = { existe: true };

function base(op: Operation): Reponse {
  switch (op.table) {
    case "acces_clients":
      return { data: [{ cree_le: "2026-09-01T10:00:00.000Z" }] };
    case "metiers":
      return { data: [{ id: "10000000-0000-4000-8000-000000000001", slug: "commerce-vente-en-ligne", nom: "Commerce et vente en ligne", description: null, description_local: null, publics: ["commercant"] }] };
    case "taches":
    case "metiers_taches":
      return { data: [] };
    case "profils":
      if (op.action !== "select") return { data: null };
      return { data: ligne.existe ? { public: "commercant", metier_slug: "commerce-vente-en-ligne", appareil: "telephone", outils: ["gemini"], pays: "bj" } : null };
    default:
      return {};
  }
}

function installer(connecte = true) {
  partage.factice = creerSupabaseFactice(base);
  if (connecte) partage.factice.etat.utilisateur = CLIENT;
  return partage.factice;
}

// Une route typée « réponse ou rien » : ici, une absence de réponse est un échec.
function sur(reponse: Response | undefined) {
  if (!reponse) throw new Error("la route n'a renvoyé aucune réponse");
  return reponse;
}

const get = async () => {
  const { GET } = await import("@/app/api/profil/route");
  return sur(await GET());
};

const put = async (corps: unknown) => {
  const { PUT } = await import("@/app/api/profil/route");
  return sur(await PUT(new Request("https://aiw.test/api/profil", { method: "PUT", body: typeof corps === "string" ? corps : JSON.stringify(corps) })));
};

beforeEach(() => {
  vi.resetModules();
  ligne.existe = true;
});

describe("S7 S13 C2 C4 · /api/profil", () => {
  it("GET rend le profil du compte, avec une seule requête propre au compte, sans rien écrire", async () => {
    const factice = installer();
    const reponse = await get();
    expect(reponse.status).toBe(200);
    expect(reponse.headers.get("Cache-Control")).toContain("no-store");
    expect(await reponse.json()).toEqual({ profil: { type: "commercant", metier: "commerce-vente-en-ligne", outils: ["gemini"], appareil: "telephone", pays: "bj" } });
    const lectures = factice.operations.filter((op) => op.table === "profils");
    expect(lectures).toHaveLength(1);
    expect(lectures[0].filtres).toContainEqual(["eq", "user_id", CLIENT.id]);
    expect(factice.ecritures()).toEqual([]);
  });

  it("GET rend null quand le compte n'a pas encore répondu au questionnaire", async () => {
    ligne.existe = false;
    installer();
    expect(await (await get()).json()).toEqual({ profil: null });
  });

  it("PUT enregistre une seule ligne, pour le compte connecté et pour lui seul", async () => {
    const factice = installer();
    const reponse = await put({ type: "commercant", metier: "commerce-vente-en-ligne", outils: ["gemini"], appareil: "telephone", pays: "bj", user_id: "autre-compte" });
    expect(reponse.status).toBe(200);
    const ecritures = factice.ecritures();
    expect(ecritures.map((op) => [op.table, op.action])).toEqual([["profils", "upsert"]]);
    expect(ecritures[0].valeurs).toMatchObject({ user_id: CLIENT.id, public: "commercant", metier_slug: "commerce-vente-en-ligne", appareil: "telephone", outils: ["gemini"], pays: "bj" });
  });

  it("PUT refuse un profil invalide, sans rien écrire", async () => {
    const factice = installer();
    expect((await put({ type: "patron" })).status).toBe(400);
    expect((await put("pas du json")).status).toBe(400);
    expect((await put(null)).status).toBe(400);
    expect(factice.ecritures()).toEqual([]);
  });

  it("PUT refuse un métier qui n'existe pas dans le catalogue", async () => {
    const factice = installer();
    expect((await put({ type: "salarie", metier: "metier-invente" })).status).toBe(404);
    expect(factice.ecritures()).toEqual([]);
  });

  it("sans session : 401, rien n'est lu ni écrit dans les profils", async () => {
    const factice = installer(false);
    expect((await get()).status).toBe(401);
    expect((await put({ type: "salarie" })).status).toBe(401);
    expect(factice.operations.filter((op) => op.table === "profils")).toEqual([]);
  });
});
