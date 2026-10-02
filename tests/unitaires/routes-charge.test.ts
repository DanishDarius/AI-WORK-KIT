import { beforeEach, describe, expect, it, vi } from "vitest";
import { creerSupabaseFactice, type Operation, type Reponse } from "../outils/supabase-factice";

// Règles C1, C2, C4 et C5 sur les routes que chaque page appelle :
// - le contenu commun vient de src/lib/contenu.ts (mis en cache en production ;
//   dans les tests le cache est neutralisé, on compte donc les vraies lectures) ;
// - une route ne fait pas plus de 3 requêtes propres au compte ;
// - un GET n'écrit jamais ; les listes sont bornées.

const partage = vi.hoisted(() => ({
  factice: null as ReturnType<typeof import("../outils/supabase-factice").creerSupabaseFactice> | null,
}));

vi.mock("@/lib/supabase/admin", () => ({ createAdminClient: () => partage.factice!.client }));
vi.mock("@/lib/supabase/server", () => ({ createClient: async () => partage.factice!.client }));

const CLIENT = { id: "00000000-0000-4000-8000-000000000001", email: "awa.client@exemple.com" };
const M1 = "10000000-0000-4000-8000-000000000001";
const T1 = "20000000-0000-4000-8000-000000000001";
const T2 = "20000000-0000-4000-8000-000000000002";
const AUJOURDHUI = new Date().toISOString().slice(0, 10);

const TABLES_CONTENU = ["metiers", "taches", "metiers_taches", "exercices", "prompts", "glossaire"];
const TABLES_COMPTE = ["taches_faites", "favoris", "utilisateurs_chemins", "derniere_activite", "activite_journaliere"];

function base(op: Operation): Reponse {
  const filtre = (colonne: string) => op.filtres.find(([, c]) => c === colonne)?.[2];
  switch (op.table) {
    case "acces_clients":
      return { data: [{ cree_le: "2026-09-01T10:00:00.000Z" }] };
    case "metiers":
      return { data: [{ id: M1, slug: "comptabilite", nom: "Comptabilité", description: null }] };
    case "taches":
      return {
        data: [
          { id: T1, code: "F01", titre: "Gestion et tri des e-mails", limite_connue: false, ia_alternative_conseillee: null },
          { id: T2, code: "F02", titre: "Planification de rendez-vous", limite_connue: true, ia_alternative_conseillee: "claude" },
        ],
      };
    case "metiers_taches":
      return { data: [{ metier_id: M1, tache_id: T1 }, { metier_id: M1, tache_id: T2 }] };
    case "exercices":
      return {
        data: [
          { titre: "Cas 1", contexte: "Contexte", donnees: null, travail_a_faire: "À faire", prompts: [{ ia: "claude", contenu: "Prompt Claude" }] },
        ],
      };
    case "taches_faites":
      return filtre("tache_id") ? { data: filtre("tache_id") === T1 ? { tache_id: T1 } : null } : { data: [{ tache_id: T1 }] };
    case "favoris":
      return filtre("tache_id") ? { data: filtre("tache_id") === T2 ? { tache_id: T2 } : null } : { data: [{ tache_id: T2, metier_id: M1 }] };
    case "utilisateurs_chemins":
      return filtre("metier_id") ? { data: { chemin: "claude" } } : { data: [{ metier_id: M1, chemin: "claude" }] };
    case "derniere_activite":
      return { data: { tache_id: T1, metier_id: M1 } };
    case "activite_journaliere":
      return { data: [{ jour: AUJOURDHUI }] };
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

const lectures = (tables: string[]) => partage.factice!.operations.filter((op) => op.action === "select" && tables.includes(op.table));

function verifierBudget() {
  const factice = partage.factice!;
  expect(factice.ecritures(), "un GET n'écrit jamais (règle C4)").toEqual([]);
  expect(lectures(TABLES_COMPTE).length, "3 requêtes propres au compte au plus (règle C2)").toBeLessThanOrEqual(3);
  expect(lectures(["acces_clients"]).length, "une seule vérification de l'accès").toBe(1);
  // Toute liste lue en base est bornée (règle C5).
  for (const op of factice.operations.filter((o) => o.action === "select")) {
    const bornee = op.filtres.some(([methode]) => methode === "limit") || op.filtres.some(([, colonne]) => colonne === "tache_id" || colonne === "metier_id");
    expect(bornee || op.table === "derniere_activite", `${op.table} : lecture non bornée`).toBe(true);
  }
}

beforeEach(() => {
  vi.resetModules();
});

describe("C1 C2 C4 · GET /api/catalogue", () => {
  it("assemble métiers et tâches avec la progression du compte", async () => {
    installer();
    const { GET } = await import("@/app/api/catalogue/route");
    const reponse = sur(await GET());
    expect(reponse.status).toBe(200);
    const corps = await reponse.json();
    expect(corps.metiers).toEqual([
      { id: M1, slug: "comptabilite", nom: "Comptabilité", description: null, nb_taches: 2, taches_faites: 1, chemin_choisi: "claude" },
    ]);
    expect(corps.taches.map((t: { code: string; fait: boolean; favori: boolean }) => [t.code, t.fait, t.favori])).toEqual([
      ["F01", true, false],
      ["F02", false, true],
    ]);
    expect(corps.taches[0].metiers).toEqual([{ slug: "comptabilite", nom: "Comptabilité" }]);
    verifierBudget();
  });

  it("répond 401 sans session, sans lire le contenu", async () => {
    installer(false);
    const { GET } = await import("@/app/api/catalogue/route");
    expect(sur(await GET()).status).toBe(401);
    expect(lectures(TABLES_CONTENU)).toEqual([]);
  });
});

describe("C1 C2 C4 · GET /api/metiers et /api/metiers/[slug]", () => {
  it("liste les métiers avec une seule requête propre au compte", async () => {
    installer();
    const { GET } = await import("@/app/api/metiers/route");
    const corps = await sur(await GET()).json();
    expect(corps).toEqual([{ id: M1, slug: "comptabilite", nom: "Comptabilité", description: null, nb_taches: 2, taches_faites: 1 }]);
    expect(lectures(TABLES_COMPTE)).toHaveLength(1);
    verifierBudget();
  });

  it("donne le parcours d'un métier, dans l'ordre", async () => {
    installer();
    const { GET } = await import("@/app/api/metiers/[slug]/route");
    const reponse = sur(await GET(new Request("https://aiw.test/api/metiers/comptabilite"), { params: Promise.resolve({ slug: "comptabilite" }) }));
    const corps = await reponse.json();
    expect(corps.metier).toEqual({ id: M1, slug: "comptabilite", nom: "Comptabilité", description: null });
    expect(corps.chemin_choisi).toBe("claude");
    expect(corps.taches_faites).toBe(1);
    expect(corps.taches.map((t: { code: string }) => t.code)).toEqual(["F01", "F02"]);
    expect(corps.taches[1]).toMatchObject({ ia_par_defaut: "claude", limite_connue: true, ia_alternative_conseillee: "claude", fait: false, favori: true });
    verifierBudget();
  });

  it("répond 404 pour un métier inconnu", async () => {
    installer();
    const { GET } = await import("@/app/api/metiers/[slug]/route");
    const reponse = sur(await GET(new Request("https://aiw.test/api/metiers/inconnu"), { params: Promise.resolve({ slug: "inconnu" }) }));
    expect(reponse.status).toBe(404);
  });
});

describe("C1 C2 C4 · GET /api/progression", () => {
  it("calcule la progression, la reprise et la série", async () => {
    installer();
    const { GET } = await import("@/app/api/progression/route");
    const corps = await sur(await GET()).json();
    expect(corps).toMatchObject({
      taches_faites_total: 1,
      taches_total: 2,
      metiers_termines: 0,
      metiers_total: 1,
      serie_jours: 1,
      reprise: { metier_slug: "comptabilite", metier_nom: "Comptabilité", tache_id: T1, tache_code: "F01", tache_titre: "Gestion et tri des e-mails" },
    });
    expect(corps.jours_actifs_semaine).toHaveLength(7);
    expect(corps.jours_actifs_semaine[6]).toBe(true);
    verifierBudget();
  });
});

describe("C1 C2 C4 · GET /api/taches/[id]", () => {
  async function demander(id: string, metier = "comptabilite") {
    const { GET } = await import("@/app/api/taches/[id]/route");
    return sur(await GET(new Request(`https://aiw.test/api/taches/${id}?metier=${metier}`), { params: Promise.resolve({ id }) }));
  }

  it("sert la tâche, ses cas et ses prompts sans rien écrire", async () => {
    installer();
    const reponse = await demander(T1);
    expect(reponse.status).toBe(200);
    const corps = await reponse.json();
    expect(corps.tache).toEqual({ code: "F01", titre: "Gestion et tri des e-mails", limite_connue: false, ia_alternative_conseillee: null });
    expect(corps).toMatchObject({ ia_par_defaut: "claude", fait: true, favori: false, metier_nom: "Comptabilité", suivante_id: T2 });
    expect(corps.exercices).toEqual([
      { titre: "Cas 1", contexte: "Contexte", donnees: null, travail_a_faire: "À faire", prompts: { chatgpt: null, claude: "Prompt Claude", gemini: null } },
    ]);
    expect(corps.mise_en_place).toBeTruthy();
    // Les cas et leurs prompts arrivent en UNE lecture, pas une par cas.
    expect(lectures(["exercices", "prompts"])).toHaveLength(1);
    verifierBudget();
  });

  it("n'annonce aucune tâche suivante sur la dernière tâche du parcours", async () => {
    installer();
    const corps = await (await demander(T2)).json();
    expect(corps).toMatchObject({ fait: false, favori: true, suivante_id: null });
  });

  it("sert la tâche sans métier connu, sans IA par défaut ni tâche suivante", async () => {
    installer();
    const corps = await (await demander(T1, "inconnu")).json();
    expect(corps).toMatchObject({ ia_par_defaut: null, metier_nom: null, suivante_id: null });
  });

  it("répond 404 pour un identifiant qui n'est pas un UUID, sans toucher la base", async () => {
    const factice = installer();
    expect((await demander("../../etc")).status).toBe(404);
    expect(factice.operations).toEqual([]);
  });

  it("répond 404 pour une tâche inconnue, sans lire ses cas", async () => {
    installer();
    expect((await demander("20000000-0000-4000-8000-00000000ffff")).status).toBe(404);
    expect(lectures(["exercices"])).toEqual([]);
  });
});

describe("C4 · POST /api/taches/[id]/vue enregistre la consultation", () => {
  async function poster(id: string, metier = "comptabilite") {
    const { POST } = await import("@/app/api/taches/[id]/vue/route");
    return sur(await POST(new Request(`https://aiw.test/api/taches/${id}/vue?metier=${metier}`, { method: "POST" }), { params: Promise.resolve({ id }) }));
  }

  it("écrit la dernière activité et le jour, pour le compte connecté", async () => {
    const factice = installer();
    const reponse = await poster(T1);
    expect(reponse.status).toBe(200);
    const ecritures = factice.ecritures();
    expect(ecritures.map((op) => [op.table, op.action]).sort()).toEqual([
      ["activite_journaliere", "upsert"],
      ["derniere_activite", "upsert"],
    ]);
    expect(ecritures.find((op) => op.table === "derniere_activite")?.valeurs).toMatchObject({ user_id: CLIENT.id, metier_id: M1, tache_id: T1 });
    expect(ecritures.find((op) => op.table === "activite_journaliere")?.valeurs).toEqual({ user_id: CLIENT.id, jour: AUJOURDHUI });
  });

  it("n'écrit rien sans session", async () => {
    const factice = installer(false);
    expect((await poster(T1)).status).toBe(401);
    expect(factice.ecritures()).toEqual([]);
  });

  it("n'écrit rien pour une tâche ou un métier inconnu", async () => {
    const factice = installer();
    expect((await poster("20000000-0000-4000-8000-00000000ffff")).status).toBe(404);
    expect((await poster(T1, "inconnu")).status).toBe(404);
    expect((await poster("pas-un-uuid")).status).toBe(404);
    expect(factice.ecritures()).toEqual([]);
  });
});

describe("C2 · GET /api/moi", () => {
  it("ne fait que deux requêtes : l'accès et l'abonnement", async () => {
    const factice = installer();
    const { GET } = await import("@/app/api/moi/route");
    const corps = await sur(await GET()).json();
    expect(corps).toMatchObject({ email: CLIENT.email, acces_depuis: "2026-09-01T10:00:00.000Z", membre_depuis: "2026-09-01T10:00:00.000Z" });
    expect(factice.operations.map((op) => op.table).sort()).toEqual(["abonnements", "acces_clients"]);
  });
});

describe("C1 · GET /api/favoris", () => {
  it("donne les favoris avec une seule requête propre au compte", async () => {
    installer();
    const { GET } = await import("@/app/api/favoris/route");
    const corps = await sur(await GET()).json();
    expect(corps).toEqual([{ tache_id: T2, tache_code: "F02", tache_titre: "Planification de rendez-vous", metier_slug: "comptabilite", metier_nom: "Comptabilité" }]);
    expect(lectures(TABLES_COMPTE)).toHaveLength(1);
    verifierBudget();
  });
});
