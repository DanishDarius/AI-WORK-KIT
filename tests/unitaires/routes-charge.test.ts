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

const R1 = "30000000-0000-4000-8000-000000000001";
const R2 = "30000000-0000-4000-8000-000000000002";

const TABLES_CONTENU = [
  "metiers",
  "taches",
  "metiers_taches",
  "exercices",
  "prompts",
  "glossaire",
  "kits",
  "ressources",
  "kits_metier",
  "ressources_taches",
  "modeles_prompts",
  "champs_modele",
  "conseils_ia",
];
const TABLES_COMPTE = ["taches_faites", "favoris", "utilisateurs_chemins", "derniere_activite", "activite_journaliere", "progression_kit"];

// Le kit du métier de test et le modèle de la tâche T1. « avecKit » permet de
// tester aussi un métier sans kit et une tâche sans modèle.
const kit = { avecKit: true };

// Un autre métier, dont le kit partage la tâche T1 ; « local » ajoute un cas
// localisé et une description localisée (migration 0021).
const M2 = "10000000-0000-4000-8000-000000000002";
const local = { actif: false };

function base(op: Operation): Reponse {
  const filtre = (colonne: string) => op.filtres.find(([, c]) => c === colonne)?.[2];
  switch (op.table) {
    case "acces_clients":
      return { data: [{ cree_le: "2026-09-01T10:00:00.000Z" }] };
    case "metiers":
      return { data: [{ id: M1, slug: "comptabilite", nom: "Comptabilité", description: local.actif ? "Ancienne description" : null, description_local: local.actif ? "Description localisée" : null, publics: ["salarie"] }] };
    case "taches":
      return {
        data: [
          // T1 porte ses badges (migration 0037) ; T2 n'en a qu'un, et une valeur absente.
          { id: T1, code: "F01", titre: "Gestion et tri des e-mails", limite_connue: false, ia_alternative_conseillee: null, gratuit_ok: true, mobile_ok: true, outil_gratuit_conseille: "Gemini", video_url: "https://youtu.be/exemple" },
          { id: T2, code: "F02", titre: "Planification de rendez-vous", limite_connue: true, ia_alternative_conseillee: "claude", gratuit_ok: false },
        ],
      };
    case "metiers_taches":
      return { data: [{ metier_id: M1, tache_id: T1 }, { metier_id: M1, tache_id: T2 }] };
    case "exercices":
      return {
        data: [
          {
            titre: "Cas 1", contexte: "Contexte", donnees: null, travail_a_faire: "À faire",
            ...(local.actif ? { titre_local: "Gérante d'un salon à Abidjan", contexte_local: "Vous gérez un salon à Yopougon.", donnees_local: null, travail_local: "Classez ces messages." } : {}),
            prompts: [{ ia: "claude", contenu: "Prompt Claude" }],
          },
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
    case "kits":
      return kit.avecKit
        ? { data: { titre: "Kit de test", presentation: "Présentation", etapes: [{ numero: 1, titre: "Configurer", minutes: 5 }], prerequis: ["Un téléphone"], limites: [], a_savoir: { chatgpt: "À savoir" }, mots: [], revu_le: "2026-10-03", video_url: "https://youtu.be/accueil" } }
        : { data: null };
    case "kits_metier":
      return {
        data: [
          { etape_installation: 1, ressources: { id: R1, cle: "config-test", type: "configuration", titre: "Assistant", description: null, outil: "claude", contenu: "Texte", installation: { claude: { etapes: ["Coller"], video: "https://youtu.be/geste" }, chatgpt: { etapes: ["Coller"], video: "javascript:alert(1)" } }, fichier: null, lien_copie: null, video_url: null, revu_le: null, ressources_taches: [{ tache_id: T1 }, { tache_id: "20000000-0000-4000-8000-00000000ffff" }] } },
          { etape_installation: null, ressources: { id: R2, cle: "doc-test", type: "document", titre: "Tableau", description: "Un tableau", outil: null, contenu: null, installation: null, fichier: "prix-et-marge.xlsx", lien_copie: "https://docs.google.com/spreadsheets/d/x/copy", video_url: null, revu_le: null, ressources_taches: null } },
        ],
      };
    case "progression_kit":
      return { data: [{ ressource_id: R2 }] };
    case "modeles_prompts":
      return kit.avecKit && filtre("tache_id") === T1
        ? {
            data: {
              titre: "Modèle", gabarit: "Je vends {{article}} à {{prix}} FCFA.", exemple_cas: 1, avertissement: null, revu_le: "2026-10-03",
              champs_modele: [
                { cle: "prix", libelle: "Quel prix ?", type: "nombre", options: null, exemple: "4 000", requis: true, ordre: 2 },
                { cle: "article", libelle: "Quel article ?", type: "texte", options: null, exemple: "une crème", requis: true, ordre: 1 },
              ],
              conseils_ia: [{ ia: "claude", conseil: "Ouvrez votre projet." }],
            },
          }
        : { data: null };
    case "ressources_taches":
      return kit.avecKit && filtre("tache_id") === T1
        ? {
            data: [
              { ressources: { cle: "config-test", type: "configuration", titre: "Assistant", outil: "claude", kits_metier: [{ metier_id: M1 }] } },
              // La même tâche sert au kit d'un autre métier : sa ressource ne doit pas sortir ici.
              { ressources: { cle: "config-autre-metier", type: "configuration", titre: "Assistant d'un autre métier", outil: "claude", kits_metier: [{ metier_id: M2 }] } },
            ],
          }
        : { data: [] };
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
  kit.avecKit = true;
  local.actif = false;
});

describe("C1 C2 C4 · GET /api/catalogue", () => {
  it("assemble métiers et tâches avec la progression du compte", async () => {
    installer();
    const { GET } = await import("@/app/api/catalogue/route");
    const reponse = sur(await GET());
    expect(reponse.status).toBe(200);
    const corps = await reponse.json();
    expect(corps.metiers).toEqual([
      { id: M1, slug: "comptabilite", nom: "Comptabilité", description: null, publics: ["salarie"], nb_taches: 2, taches_faites: 1, chemin_choisi: "claude" },
    ]);
    expect(corps.taches.map((t: { code: string; fait: boolean; favori: boolean }) => [t.code, t.fait, t.favori])).toEqual([
      ["F01", true, false],
      ["F02", false, true],
    ]);
    expect(corps.taches[0].metiers).toEqual([{ slug: "comptabilite", nom: "Comptabilité" }]);
    // Badges : vrai, faux, ou null quand la base ne dit rien (aucun badge affiché).
    expect(corps.taches.map((t: { gratuit_ok: boolean | null; mobile_ok: boolean | null }) => [t.gratuit_ok, t.mobile_ok])).toEqual([
      [true, true],
      [false, null],
    ]);
    // La liste ne transporte ni le lien de la vidéo ni les textes de la tâche.
    expect(Object.keys(corps.taches[0])).not.toEqual(expect.arrayContaining(["video_url", "outil_gratuit_conseille", "resultat"]));
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
  it("affiche la description localisée d'un métier quand elle existe", async () => {
    local.actif = true;
    installer();
    const { GET } = await import("@/app/api/metiers/route");
    const corps = await sur(await GET()).json();
    expect(corps[0].description).toBe("Description localisée");
  });

  it("liste les métiers avec une seule requête propre au compte", async () => {
    installer();
    const { GET } = await import("@/app/api/metiers/route");
    const corps = await sur(await GET()).json();
    expect(corps).toEqual([{ id: M1, slug: "comptabilite", nom: "Comptabilité", description: null, publics: ["salarie"], nb_taches: 2, taches_faites: 1 }]);
    expect(lectures(TABLES_COMPTE)).toHaveLength(1);
    verifierBudget();
  });

  it("donne le parcours d'un métier, dans l'ordre", async () => {
    installer();
    const { GET } = await import("@/app/api/metiers/[slug]/route");
    const reponse = sur(await GET(new Request("https://aiw.test/api/metiers/comptabilite"), { params: Promise.resolve({ slug: "comptabilite" }) }));
    const corps = await reponse.json();
    expect(corps.metier).toEqual({ id: M1, slug: "comptabilite", nom: "Comptabilité", description: null, publics: ["salarie"] });
    expect(corps.chemin_choisi).toBe("claude");
    expect(corps.taches_faites).toBe(1);
    expect(corps.taches.map((t: { code: string }) => t.code)).toEqual(["F01", "F02"]);
    expect(corps.taches[1]).toMatchObject({ ia_par_defaut: "claude", limite_connue: true, ia_alternative_conseillee: "claude", gratuit_ok: false, mobile_ok: null, fait: false, favori: true });
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
    expect(corps.tache).toEqual({
      code: "F01", titre: "Gestion et tri des e-mails", limite_connue: false, ia_alternative_conseillee: null, resultat: null, etapes: null, precisions: null,
      gratuit_ok: true, mobile_ok: true, outil_gratuit_conseille: "Gemini", video_url: "https://youtu.be/exemple",
    });
    expect(corps).toMatchObject({ ia_par_defaut: "claude", fait: true, favori: false, metier_nom: "Comptabilité", suivante_id: T2 });
    expect(corps.exercices).toEqual([
      { titre: "Cas 1", contexte: "Contexte", donnees: null, travail_a_faire: "À faire", prenom: null, lieu: null, profil: null, reponse_attendue: null, prompts: { chatgpt: null, claude: "Prompt Claude", gemini: null } },
    ]);
    // La tâche a un modèle à remplir : l'ancienne mise en place ne sort plus.
    expect(corps.mise_en_place).toBeNull();
    // Les cas et leurs prompts arrivent en UNE lecture, pas une par cas.
    expect(lectures(["exercices", "prompts"])).toHaveLength(1);
    verifierBudget();
  });

  it("sert le modèle à remplir d'une tâche de kit : champs dans l'ordre, note par IA, ressources", async () => {
    installer();
    const corps = await (await demander(T1)).json();
    expect(corps.modele).toMatchObject({ titre: "Modèle", gabarit: "Je vends {{article}} à {{prix}} FCFA.", exemple_cas: 1, conseils: { claude: "Ouvrez votre projet." } });
    expect(corps.modele.champs.map((c: { cle: string }) => c.cle)).toEqual(["article", "prix"]);
    expect(corps.ressources).toEqual([{ cle: "config-test", type: "configuration", titre: "Assistant", outil: "claude" }]);
    // Modèle, champs et notes arrivent en UNE lecture ; les ressources en une autre.
    expect(lectures(["modeles_prompts", "champs_modele", "conseils_ia"])).toHaveLength(1);
    expect(lectures(["ressources_taches", "ressources"])).toHaveLength(1);
    verifierBudget();
  });

  it("ne montre que les ressources du kit du métier d'où l'on vient", async () => {
    installer();
    // Depuis le métier M1 : la ressource du kit de M2 n'apparaît pas.
    const corps = await (await demander(T1)).json();
    expect(corps.ressources.map((r: { cle: string }) => r.cle)).toEqual(["config-test"]);
    // Aucun identifiant de métier ne sort avec une ressource.
    expect(Object.keys(corps.ressources[0]).sort()).toEqual(["cle", "outil", "titre", "type"]);
    // Sans métier connu, et avec des ressources de deux kits : on n'en montre aucune.
    const sansMetier = await (await demander(T1, "metier-inconnu")).json();
    expect(sansMetier.ressources).toEqual([]);
  });

  it("montre les ressources dans un ordre fixe : configuration, skills, documents, routines", async () => {
    const { ressourcesPourMetier } = await import("@/lib/contenu");
    const r = (cle: string, type: "configuration" | "skill" | "document" | "routine", titre: string) => ({ cle, type, titre, outil: null, metiers: ["m"] });
    // La base rend les liens sans ordre : l'écran ne doit pas en dépendre.
    const melange = [
      r("routine-b", "routine", "Point du vendredi"),
      r("doc-a", "document", "Journal"),
      r("config-x-gemini", "configuration", "Assistant"),
      r("skill-b", "skill", "Relance"),
      r("config-x-chatgpt", "configuration", "Assistant"),
      r("skill-a", "skill", "Classement"),
      r("config-x-claude", "configuration", "Assistant"),
    ];
    const attendu = ["config-x-chatgpt", "config-x-claude", "config-x-gemini", "skill-a", "skill-b", "doc-a", "routine-b"];
    expect(ressourcesPourMetier(melange, "m").map((x) => x.cle)).toEqual(attendu);
    expect(ressourcesPourMetier([...melange].reverse(), null).map((x) => x.cle)).toEqual(attendu);
  });

  it("affiche le cas localisé à la place de l'ancien, sans mêler les deux", async () => {
    local.actif = true;
    installer();
    const corps = await (await demander(T1)).json();
    expect(corps.exercices[0]).toMatchObject({
      titre: "Gérante d'un salon à Abidjan",
      contexte: "Vous gérez un salon à Yopougon.",
      donnees: null,
      travail_a_faire: "Classez ces messages.",
    });
    expect(lectures(["exercices", "prompts"])).toHaveLength(1);
  });

  it("sert une tâche sans modèle comme avant : modèle absent, aucune ressource", async () => {
    installer();
    const corps = await (await demander(T2)).json();
    expect(corps.modele).toBeNull();
    expect(corps.ressources).toEqual([]);
    // Sans modèle, l'ancienne mise en place reste servie.
    expect(corps.mise_en_place).toBeTruthy();
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
  it("ne fait que trois requêtes propres au compte : l'accès, l'abonnement et les préférences", async () => {
    const factice = installer();
    const { GET } = await import("@/app/api/moi/route");
    const corps = await sur(await GET()).json();
    expect(corps).toMatchObject({ email: CLIENT.email, acces_depuis: "2026-09-01T10:00:00.000Z", membre_depuis: "2026-09-01T10:00:00.000Z", nouveautes: 0 });
    // Le fil vient du cache (neutralisé dans les tests) : ses tables ne sont pas propres au compte.
    const duFil = ["publications", "mises_a_jour_ia", "packs", "packs_taches", "taches", "sessions_live", "videos"];
    expect(factice.operations.map((op) => op.table).filter((t) => !duFil.includes(t)).sort()).toEqual(["abonnements", "acces_clients", "preferences_notifications"]);
    expect(factice.ecritures(), "un GET n'écrit jamais (règle C4)").toEqual([]);
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

describe("C1 C2 C4 · GET /api/kits/[slug]", () => {
  async function demander(slug = "comptabilite") {
    const { GET } = await import("@/app/api/kits/[slug]/route");
    return sur(await GET(new Request(`https://aiw.test/api/kits/${slug}`), { params: Promise.resolve({ slug }) }));
  }

  it("sert le kit du métier, ce qui est installé et l'IA choisie, avec deux requêtes propres au compte", async () => {
    installer();
    const reponse = await demander();
    expect(reponse.status).toBe(200);
    expect(reponse.headers.get("Cache-Control")).toBe("private, no-store");
    const corps = await reponse.json();
    expect(corps.metier).toEqual({ slug: "comptabilite", nom: "Comptabilité" });
    expect(corps.chemin_choisi).toBe("claude");
    expect(corps.kit).toMatchObject({ titre: "Kit de test", etapes: [{ numero: 1, titre: "Configurer", minutes: 5 }], a_savoir: { chatgpt: "À savoir" }, video_url: "https://youtu.be/accueil" });
    expect(corps.kit.ressources.map((r: { cle: string; etape: number | null; installee: boolean }) => [r.cle, r.etape, r.installee])).toEqual([
      ["config-test", 1, false],
      ["doc-test", null, true],
    ]);
    // Seules les tâches du catalogue sont citées ; une installation absente devient un objet vide.
    expect(corps.kit.ressources[0].taches).toEqual([{ id: T1, code: "F01", titre: "Gestion et tri des e-mails" }]);
    expect(corps.kit.ressources[1]).toMatchObject({ installation: {}, taches: [], fichier: "prix-et-marge.xlsx" });
    // La vidéo d'un geste se range par outil ; un lien qui n'est pas en https est écarté.
    expect(corps.kit.ressources[0].installation).toEqual({ claude: { etapes: ["Coller"], video: "https://youtu.be/geste" }, chatgpt: { etapes: ["Coller"] } });
    expect(lectures(TABLES_COMPTE).map((op) => op.table).sort()).toEqual(["progression_kit", "utilisateurs_chemins"]);
    // Le kit et ses ressources arrivent en deux lectures, pas une par ressource.
    expect(lectures(["kits", "kits_metier", "ressources", "ressources_taches"])).toHaveLength(2);
    verifierBudget();
  });

  it("répond « kit: null » pour un métier sans kit, sans aucune requête propre au compte", async () => {
    installer();
    kit.avecKit = false;
    const corps = await (await demander()).json();
    expect(corps).toEqual({ metier: { slug: "comptabilite", nom: "Comptabilité" }, kit: null });
    expect(lectures(TABLES_COMPTE)).toEqual([]);
    verifierBudget();
  });

  it("répond 404 pour un métier inconnu, sans lire de kit", async () => {
    installer();
    expect((await demander("inconnu")).status).toBe(404);
    expect(lectures(["kits", "kits_metier"])).toEqual([]);
  });

  it("répond 401 sans session, sans lire le contenu", async () => {
    installer(false);
    expect((await demander()).status).toBe(401);
    expect(lectures(TABLES_CONTENU)).toEqual([]);
  });
});

describe("C4 S7 · POST /api/kits/ressources/[id]/installee", () => {
  async function poster(id: string, corps: unknown) {
    const { POST } = await import("@/app/api/kits/ressources/[id]/installee/route");
    return sur(
      await POST(new Request(`https://aiw.test/api/kits/ressources/${id}/installee`, { method: "POST", body: JSON.stringify(corps) }), {
        params: Promise.resolve({ id }),
      }),
    );
  }

  it("coche une ressource pour le compte connecté, et pour lui seul", async () => {
    const factice = installer();
    const reponse = await poster(R1, { fait: true, user_id: "autre-compte" });
    expect(await reponse.json()).toEqual({ ok: true, fait: true });
    const ecritures = factice.ecritures();
    expect(ecritures.map((op) => [op.table, op.action])).toEqual([["progression_kit", "upsert"]]);
    expect(ecritures[0].valeurs).toMatchObject({ user_id: CLIENT.id, ressource_id: R1 });
  });

  it("décoche en supprimant la seule ligne du compte pour cette ressource", async () => {
    const factice = installer();
    expect(await (await poster(R1, { fait: false })).json()).toEqual({ ok: true, fait: false });
    const [ecriture] = factice.ecritures();
    expect([ecriture.table, ecriture.action]).toEqual(["progression_kit", "delete"]);
    expect(ecriture.filtres).toEqual(expect.arrayContaining([["eq", "user_id", CLIENT.id], ["eq", "ressource_id", R1]]));
  });

  it("répond 404 quand la ressource n'existe pas (clé étrangère)", async () => {
    partage.factice = creerSupabaseFactice((op) =>
      op.table === "progression_kit" ? { error: { message: "violates foreign key constraint", code: "23503" } as { message: string } } : base(op),
    );
    partage.factice.etat.utilisateur = CLIENT;
    expect((await poster(R1, { fait: true })).status).toBe(404);
  });

  it("refuse un identifiant qui n'est pas un UUID, sans toucher la base", async () => {
    const factice = installer();
    expect((await poster("../../etc", { fait: true })).status).toBe(404);
    expect(factice.operations).toEqual([]);
  });

  it("refuse un corps sans booléen, sans rien écrire", async () => {
    const factice = installer();
    expect((await poster(R1, { fait: "oui" })).status).toBe(400);
    expect((await poster(R1, null)).status).toBe(400);
    expect(factice.ecritures()).toEqual([]);
  });

  it("n'écrit rien sans session", async () => {
    const factice = installer(false);
    expect((await poster(R1, { fait: true })).status).toBe(401);
    expect(factice.ecritures()).toEqual([]);
  });
});

describe("S2 S7 · GET /api/kits/fichiers/[nom]", () => {
  async function demander(nom: string) {
    const { GET } = await import("@/app/api/kits/fichiers/[nom]/route");
    return sur(await GET(new Request("https://aiw.test/api/kits/fichiers/x"), { params: Promise.resolve({ nom }) }));
  }

  it("sert un fichier du kit en pièce jointe, jamais mis en cache", async () => {
    installer();
    const reponse = await demander("prix-et-marge.xlsx");
    expect(reponse.status).toBe(200);
    expect(reponse.headers.get("Content-Type")).toBe("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    expect(reponse.headers.get("Content-Disposition")).toBe('attachment; filename="AIW-prix-et-marge.xlsx"');
    expect(reponse.headers.get("Cache-Control")).toContain("no-store");
    expect(reponse.headers.get("X-Content-Type-Options")).toBe("nosniff");
    const octets = new Uint8Array(await reponse.arrayBuffer());
    expect(octets.length).toBe(Number(reponse.headers.get("Content-Length")));
    // Un fichier Excel est une archive ZIP : il commence par « PK ».
    expect([octets[0], octets[1]]).toEqual([0x50, 0x4b]);
  });

  it.each(["../guides/pdf/guide-001-x.pdf", "..%2F..%2Fpackage.json", "prix-et-marge.xlsx/..", "Prix-et-marge.xlsx", "prix et marge.xlsx", "prix-et-marge.pdf", ".env", "prix-et-marge.xlsx.zip.exe", ""])(
    "refuse le nom « %s »",
    async (nom) => {
      installer();
      expect((await demander(nom)).status).toBe(404);
    },
  );

  it("répond 404 pour un fichier bien nommé mais absent", async () => {
    installer();
    expect((await demander("fichier-absent.zip")).status).toBe(404);
  });

  it("ne sert rien sans session", async () => {
    installer(false);
    expect((await demander("prix-et-marge.xlsx")).status).toBe(401);
  });
});
