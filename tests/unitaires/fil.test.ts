import { beforeEach, describe, expect, it, vi } from "vitest";
import { creerSupabaseFactice, type Operation, type Reponse } from "../outils/supabase-factice";
import type { FilContenu, TacheContenu } from "@/lib/contenu";
import { accesPublication, elementsDuFil, nouveautesDepuis, publicationsParues, sessionsPourAbonne, tacheDuFil } from "@/lib/fil";

// Le fil « Nouveau » (plan produit, chantier 5). Trois règles sont testées ici :
// 1. rien ne se voit avant sa date de parution ;
// 2. une publication réservée se montre en titre seul à un client sans abonnement ;
// 3. une tâche du fil ne s'ouvre que par une publication parue, et, réservée,
//    que pour un abonné.

const MAINTENANT = Date.parse("2026-10-12T09:00:00Z");
const T_SEMAINE = "40000000-0000-4000-8000-000000000001";
const T_FUTURE = "40000000-0000-4000-8000-000000000002";
const T_PACK = "40000000-0000-4000-8000-000000000003";
const T_ORPHELINE = "40000000-0000-4000-8000-000000000004";

const tache = (id: string, code: string, titre: string): TacheContenu => ({
  id, code, titre, limite_connue: false, ia_alternative_conseillee: null, resultat: "Résultat", etapes: ["Étape"], precisions: null,
  gratuit_ok: true, mobile_ok: true, outil_gratuit_conseille: null, video_url: null,
});

function fil(): FilContenu {
  return {
    publications: [
      { id: "p1", type: "tache", ref_id: T_SEMAINE, titre: "Répondre à un avis négatif", resume: "Une réponse calme, en public.", publie_le: "2026-10-12T05:00:00Z", reserve_abonnes: true },
      { id: "p2", type: "tache", ref_id: T_FUTURE, titre: "Tâche de la semaine prochaine", resume: "Pas encore parue.", publie_le: "2026-10-19T05:00:00Z", reserve_abonnes: true },
      { id: "p3", type: "pack", ref_id: "fetes", titre: "Préparer les fêtes", resume: "Cinq tâches.", publie_le: "2026-10-10T05:00:00Z", reserve_abonnes: true },
      { id: "p4", type: "mise_a_jour", ref_id: "ancienne", titre: "Une actualité ouverte à tous", resume: "Résumé libre.", publie_le: "2026-09-22T08:00:00Z", reserve_abonnes: false },
      { id: "p5", type: "mise_a_jour", ref_id: "reservee", titre: "Une actualité du jeudi", resume: "Résumé réservé.", publie_le: "2026-10-08T05:00:00Z", reserve_abonnes: true },
      { id: "p6", type: "mise_a_jour", ref_id: "disparue", titre: "Actualité sans contenu", resume: null, publie_le: "2026-10-01T05:00:00Z", reserve_abonnes: false },
    ],
    misesAJour: {
      ancienne: { slug: "ancienne", ia: "claude", genre: "Nouveau modèle", titre: "Une actualité ouverte à tous", annonce_le: "2026-09-22", resume: "Résumé libre.", impact: "Impact", action: "Rien", points: [], disponibilite: "Tous", sources: [], media: null },
      reservee: { slug: "reservee", ia: "gemini", genre: "À savoir", titre: "Une actualité du jeudi", annonce_le: "2026-09-30", resume: "Résumé réservé.", impact: "Impact", action: "Rien", points: [], disponibilite: "Tous", sources: [], media: null },
    },
    packs: { fetes: { slug: "fetes", titre: "Préparer les fêtes", description: "Cinq tâches liées.", pour_qui: "Commerçants", taches: [T_PACK] } },
    taches: {
      [T_SEMAINE]: tache(T_SEMAINE, "F57", "Répondre à un avis négatif"),
      [T_FUTURE]: tache(T_FUTURE, "F58", "Tâche de la semaine prochaine"),
      [T_PACK]: tache(T_PACK, "F61", "Prévoir son stock des fêtes"),
      [T_ORPHELINE]: tache(T_ORPHELINE, "F99", "Tâche sans publication"),
    },
    sessions: [
      { debut_le: "2026-11-05T18:00:00Z", titre: "Session de novembre", lien: "https://meet.exemple.test/novembre", replay_url: null },
      { debut_le: "2026-10-01T18:00:00Z", titre: "Session d'octobre", lien: "https://meet.exemple.test/octobre", replay_url: "https://youtu.be/replay" },
    ],
    videos: {},
  };
}

describe("le fil Nouveau · ce qui est paru", () => {
  it("ne montre rien avant sa date de parution, et range du plus récent au plus ancien", () => {
    const ids = publicationsParues(fil(), MAINTENANT).map((p) => p.id);
    expect(ids).toEqual(["p1", "p3", "p5", "p6", "p4"]);
    expect(ids).not.toContain("p2");
  });

  it("une date illisible ne fait jamais paraître une publication", () => {
    const f = fil();
    f.publications[0].publie_le = "bientôt";
    expect(publicationsParues(f, MAINTENANT).map((p) => p.id)).not.toContain("p1");
  });
});

describe("le fil Nouveau · ce que voit un client", () => {
  it("un abonné ouvre tout ce qui est paru", () => {
    const elements = elementsDuFil(fil(), true, MAINTENANT);
    const parId = Object.fromEntries(elements.map((e) => [e.id, e]));
    expect(parId.p1).toMatchObject({ ouvert: true, href: `/taches/${T_SEMAINE}?fil=1`, resume: "Une réponse calme, en public.", ref: T_SEMAINE });
    expect(parId.p3).toMatchObject({ ouvert: true, href: "/packs/fetes" });
    expect(parId.p5).toMatchObject({ ouvert: true, href: "/mises-a-jour-ia/reservee" });
  });

  it("un client sans abonnement voit le titre seul de ce qui est réservé : ni résumé, ni lien, ni référence", () => {
    const elements = elementsDuFil(fil(), false, MAINTENANT);
    const parId = Object.fromEntries(elements.map((e) => [e.id, e]));
    for (const id of ["p1", "p3", "p5"]) {
      expect(parId[id]).toMatchObject({ reserve: true, ouvert: false, href: null, resume: null, ref: null });
      expect(parId[id].titre.length).toBeGreaterThan(0);
    }
    // Ce qui n'est pas réservé reste ouvert à tous.
    expect(parId.p4).toMatchObject({ reserve: false, ouvert: true, href: "/mises-a-jour-ia/ancienne", resume: "Résumé libre." });
  });

  it("une publication dont le contenu n'existe pas ne s'ouvre pour personne", () => {
    for (const abonne of [true, false]) {
      const p6 = elementsDuFil(fil(), abonne, MAINTENANT).find((e) => e.id === "p6");
      expect(p6).toMatchObject({ ouvert: false, href: null });
    }
  });

  it("rien de ce qui est à paraître ne sort, même pour un abonné", () => {
    const sortie = JSON.stringify(elementsDuFil(fil(), true, MAINTENANT));
    expect(sortie).not.toContain("Tâche de la semaine prochaine");
    expect(sortie).not.toContain(T_FUTURE);
  });
});

describe("le fil Nouveau · une actualité ou un pack", () => {
  it.each([
    ["mise_a_jour", "ancienne", false, "ouverte"],
    ["mise_a_jour", "reservee", false, "reservee"],
    ["mise_a_jour", "reservee", true, "ouverte"],
    ["mise_a_jour", "inconnue", true, "absente"],
    ["pack", "fetes", false, "reservee"],
    ["pack", "fetes", true, "ouverte"],
  ] as const)("%s %s, abonné : %s → %s", (type, ref, abonne, attendu) => {
    expect(accesPublication(fil(), type, ref, abonne, MAINTENANT)).toBe(attendu);
  });

  it("un pack daté dans le futur est absent pour tout le monde", () => {
    const f = fil();
    f.publications[2].publie_le = "2026-11-02T05:00:00Z";
    expect(accesPublication(f, "pack", "fetes", true, MAINTENANT)).toBe("absente");
  });
});

describe("le fil Nouveau · une tâche du fil", () => {
  it("la tâche de la semaine s'ouvre pour un abonné, et revient au fil", () => {
    expect(tacheDuFil(fil(), T_SEMAINE, true, MAINTENANT)).toMatchObject({ acces: "ouverte", origine: { libelle: "Tâche de la semaine", retour: "/nouveau" } });
  });

  it("elle est réservée pour un client sans abonnement", () => {
    expect(tacheDuFil(fil(), T_SEMAINE, false, MAINTENANT)?.acces).toBe("reservee");
  });

  it("une tâche à paraître est absente, même pour un abonné", () => {
    expect(tacheDuFil(fil(), T_FUTURE, true, MAINTENANT)?.acces).toBe("absente");
  });

  it("la tâche d'un pack paru s'ouvre par ce pack, et revient à sa page", () => {
    expect(tacheDuFil(fil(), T_PACK, true, MAINTENANT)).toMatchObject({ acces: "ouverte", origine: { libelle: "Pack : Préparer les fêtes", retour: "/packs/fetes" } });
    expect(tacheDuFil(fil(), T_PACK, false, MAINTENANT)?.acces).toBe("reservee");
  });

  it("une tâche du fil sans publication n'est ouverte à personne", () => {
    expect(tacheDuFil(fil(), T_ORPHELINE, true, MAINTENANT)?.acces).toBe("absente");
  });

  it("une tâche qui n'est pas du fil n'est pas trouvée ici", () => {
    expect(tacheDuFil(fil(), "50000000-0000-4000-8000-000000000001", true, MAINTENANT)).toBeNull();
  });
});

describe("le fil Nouveau · la pastille de la cloche", () => {
  it("compte ce qui est paru depuis la dernière visite", () => {
    expect(nouveautesDepuis(fil(), "2026-10-09T00:00:00Z", MAINTENANT)).toBe(2); // p1, p3
    expect(nouveautesDepuis(fil(), "2026-10-12T08:00:00Z", MAINTENANT)).toBe(0);
  });

  it("sans visite connue, compte les 14 derniers jours", () => {
    expect(nouveautesDepuis(fil(), null, MAINTENANT)).toBe(4); // p1, p3, p5, p6
  });

  it("ne compte jamais ce qui est à paraître, et plafonne à 9", () => {
    const f = fil();
    f.publications = Array.from({ length: 30 }, (_, i) => ({ id: `n${i}`, type: "mise_a_jour" as const, ref_id: `a${i}`, titre: `Actualité ${i}`, resume: null, publie_le: "2026-10-11T05:00:00Z", reserve_abonnes: true }));
    expect(nouveautesDepuis(f, null, MAINTENANT)).toBe(9);
    f.publications.forEach((p) => (p.publie_le = "2026-12-01T05:00:00Z"));
    expect(nouveautesDepuis(f, null, MAINTENANT)).toBe(0);
  });
});

describe("le fil Nouveau · les sessions en direct", () => {
  it("donne la prochaine session et les replays disponibles", () => {
    const { prochaine, replays } = sessionsPourAbonne(fil(), MAINTENANT);
    expect(prochaine?.titre).toBe("Session de novembre");
    expect(replays.map((r) => r.titre)).toEqual(["Session d'octobre"]);
  });
});

// ===== Les routes =====

const partage = vi.hoisted(() => ({
  factice: null as ReturnType<typeof import("../outils/supabase-factice").creerSupabaseFactice> | null,
}));

vi.mock("@/lib/supabase/admin", () => ({ createAdminClient: () => partage.factice!.client }));
vi.mock("@/lib/supabase/server", () => ({ createClient: async () => partage.factice!.client }));

const CLIENT = { id: "00000000-0000-4000-8000-000000000001", email: "awa.client@exemple.com" };
const etat = { abonne: false, lienSecret: "https://chat.whatsapp.com/INVITATION" };
const PASSE = "2026-01-05T05:00:00Z";
const FUTUR = "2099-01-05T05:00:00Z";

function base(op: Operation): Reponse {
  const filtre = (colonne: string) => op.filtres.find(([, c]) => c === colonne)?.[2];
  switch (op.table) {
    case "acces_clients":
      return { data: [{ cree_le: "2026-09-01T10:00:00.000Z" }] };
    case "abonnements":
      return { data: etat.abonne ? [{ periode: "mensuel", statut: "actif", fin_le: FUTUR }] : [] };
    case "metiers":
    case "metiers_taches":
      return { data: [] };
    case "taches":
      // Le catalogue ne lit que les tâches des parcours, le fil que les siennes.
      return filtre("du_fil") === true
        ? { data: [tache(T_SEMAINE, "F57", "Répondre à un avis négatif"), tache(T_FUTURE, "F58", "Tâche de la semaine prochaine")] }
        : { data: [] };
    case "publications":
      return {
        data: [
          { id: "p1", type: "tache", ref_id: T_SEMAINE, titre: "Répondre à un avis négatif", resume: "Résumé", publie_le: PASSE, reserve_abonnes: true },
          { id: "p2", type: "tache", ref_id: T_FUTURE, titre: "Tâche de la semaine prochaine", resume: "Résumé", publie_le: FUTUR, reserve_abonnes: true },
        ],
      };
    case "sessions_live":
      return { data: [{ debut_le: FUTUR, titre: "Session en direct", lien: "https://meet.exemple.test/session", replay_url: null }] };
    case "exercices":
      return { data: [{ titre: "Cas", contexte: "Contexte", donnees: null, travail_a_faire: "Travail", titre_local: null, contexte_local: null, donnees_local: null, travail_local: null, prenom: "Awa", lieu: "Lomé, Togo", profil: null, reponse_attendue: null, prompts: [] }] };
    case "modeles_prompts":
      return { data: { titre: "Modèle", gabarit: "Bonjour {{nom}}", exemple_cas: 1, avertissement: null, revu_le: null, champs_modele: [{ cle: "nom", libelle: "Nom ?", type: "texte", options: null, exemple: "Awa", requis: true, ordre: 1 }], conseils_ia: [] } };
    case "taches_faites":
      return { data: [] };
    default:
      return { data: [] };
  }
}

function installer(abonne: boolean) {
  etat.abonne = abonne;
  partage.factice = creerSupabaseFactice(base);
  partage.factice.etat.utilisateur = CLIENT;
  return partage.factice;
}

// Une route typée « réponse ou rien » : ici, une absence de réponse est un échec.
function sur(reponse: Response | undefined) {
  if (!reponse) throw new Error("la route n'a renvoyé aucune réponse");
  return reponse;
}

async function demanderTache(id: string) {
  const { GET } = await import("@/app/api/taches/[id]/route");
  const reponse = await GET(new Request(`https://aiw.test/api/taches/${id}`), { params: Promise.resolve({ id }) });
  if (!reponse) throw new Error("aucune réponse");
  return reponse;
}

beforeEach(() => {
  vi.resetModules();
});

describe("GET /api/taches/[id] · une tâche du fil", () => {
  it("s'ouvre pour un abonné, sans métier, sans favori ni tâche suivante, et sans rien écrire", async () => {
    const factice = installer(true);
    const reponse = await demanderTache(T_SEMAINE);
    expect(reponse.status).toBe(200);
    const corps = await reponse.json();
    expect(corps).toMatchObject({ tache: { code: "F57" }, fil: { libelle: "Tâche de la semaine", retour: "/nouveau" }, metier_nom: null, suivante_id: null, favori: false, ressources: [], mise_en_place: null });
    expect(corps.modele?.gabarit).toBe("Bonjour {{nom}}");
    expect(factice.ecritures()).toEqual([]);
    // Deux requêtes propres au compte au plus : l'abonnement et les tâches faites.
    expect(factice.operations.filter((op) => ["taches_faites", "favoris", "utilisateurs_chemins"].includes(op.table)).length).toBeLessThanOrEqual(1);
  });

  it("répond 402 à un client sans abonnement, sans cas, sans modèle, sans lire le contenu de la tâche", async () => {
    const factice = installer(false);
    const reponse = await demanderTache(T_SEMAINE);
    // 402 et non 403 : un 403 fait vider les copies du mode hors ligne.
    expect(reponse.status).toBe(402);
    const texte = await reponse.text();
    expect(texte).not.toContain("Bonjour {{nom}}");
    expect(texte).not.toContain("Contexte");
    expect(factice.operations.map((op) => op.table)).not.toContain("exercices");
    expect(factice.operations.map((op) => op.table)).not.toContain("modeles_prompts");
  });

  it("répond 404 pour une tâche à paraître, même à un abonné", async () => {
    installer(true);
    const reponse = await demanderTache(T_FUTURE);
    expect(reponse.status).toBe(404);
    expect(await reponse.text()).not.toContain("Tâche de la semaine prochaine");
  });
});

describe("GET /api/nouveau", () => {
  it("donne à un client sans abonnement le titre seul de ce qui est réservé, et rien de ce qui est à paraître", async () => {
    const factice = installer(false);
    const { GET } = await import("@/app/api/nouveau/route");
    const corps = await sur(await GET()).json();
    expect(corps.abonne).toBe(false);
    expect(corps.elements).toHaveLength(1);
    expect(corps.elements[0]).toMatchObject({ titre: "Répondre à un avis négatif", ouvert: false, href: null, resume: null });
    expect(JSON.stringify(corps)).not.toContain("prochaine");
    expect(factice.ecritures()).toEqual([]);
  });
});

describe("GET /api/communaute", () => {
  it("ne donne aucun lien à un client sans abonnement", async () => {
    vi.stubEnv("COMMUNAUTE_WHATSAPP_URL", etat.lienSecret);
    installer(false);
    const { GET } = await import("@/app/api/communaute/route");
    const reponse = sur(await GET());
    const texte = await reponse.text();
    expect(JSON.parse(texte)).toMatchObject({ abonne: false, lien: null, session: { titre: "Session en direct", lien: null }, replays: [] });
    expect(texte).not.toContain("whatsapp");
    expect(texte).not.toContain("meet.exemple.test");
    expect(reponse.headers.get("Cache-Control")).toBe("private, no-store");
  });

  it("donne le lien de la communauté et celui de la session à un abonné actif", async () => {
    vi.stubEnv("COMMUNAUTE_WHATSAPP_URL", etat.lienSecret);
    installer(true);
    const { GET } = await import("@/app/api/communaute/route");
    const corps = await sur(await GET()).json();
    expect(corps).toMatchObject({ abonne: true, lien: etat.lienSecret, session: { lien: "https://meet.exemple.test/session" } });
  });

  it("écarte un lien qui n'est pas une invitation WhatsApp", async () => {
    vi.stubEnv("COMMUNAUTE_WHATSAPP_URL", "https://exemple.test/piege");
    installer(true);
    const { GET } = await import("@/app/api/communaute/route");
    expect((await sur(await GET()).json()).lien).toBeNull();
  });

  it("le lien de la communauté n'est jamais une variable publique, ni écrit dans le code", async () => {
    const { lire, sources } = await import("../outils/fichiers");
    const fichiers = sources().filter((f) => /COMMUNAUTE_WHATSAPP_URL/.test(lire(f)));
    expect(fichiers).toEqual(["src/app/api/communaute/route.ts"]);
    expect(sources().some((f) => /NEXT_PUBLIC_COMMUNAUTE|chat\.whatsapp\.com\/[A-Za-z0-9]{6,}/.test(lire(f)))).toBe(false);
  });
});

describe("POST /api/nouveau/vu et les préférences", () => {
  it("la visite du fil écrit une seule ligne, celle du compte connecté", async () => {
    const factice = installer(false);
    const { POST } = await import("@/app/api/nouveau/vu/route");
    expect(sur(await POST()).status).toBe(200);
    const ecritures = factice.ecritures("preferences_notifications");
    expect(ecritures).toHaveLength(1);
    expect(ecritures[0].valeurs).toMatchObject({ email: CLIENT.email });
  });

  it("PUT /api/notifications n'accepte que deux booléens", async () => {
    const factice = installer(false);
    const { PUT } = await import("@/app/api/notifications/route");
    const envoyer = (corps: unknown) => PUT(new Request("https://aiw.test/api/notifications", { method: "PUT", body: JSON.stringify(corps) }));
    expect(sur(await envoyer({ email_semaine: "non" })).status).toBe(400);
    expect(sur(await envoyer({ email: "autre@exemple.com", jeton: "x" })).status).toBe(400);
    expect(factice.ecritures()).toEqual([]);
    expect(sur(await envoyer({ email_semaine: false, email: "autre@exemple.com", fil_vu_le: "2020-01-01" })).status).toBe(200);
    const ecritures = factice.ecritures("preferences_notifications");
    expect(ecritures).toHaveLength(1);
    // L'adresse vient de la session, jamais du corps de la requête.
    expect(ecritures[0].valeurs).toMatchObject({ email: CLIENT.email, email_semaine: false });
    expect(ecritures[0].valeurs).not.toHaveProperty("fil_vu_le");
    expect(ecritures[0].valeurs).not.toHaveProperty("jeton");
  });

  it("POST /api/desabonnement refuse un jeton mal formé et ne crée jamais de ligne", async () => {
    const factice = installer(false);
    factice.etat.utilisateur = null; // sans connexion
    const { POST } = await import("@/app/api/desabonnement/route");
    const envoyer = (corps: unknown) => POST(new Request("https://aiw.test/api/desabonnement", { method: "POST", body: JSON.stringify(corps) }));
    expect((await envoyer({ jeton: "pas-un-jeton" })).status).toBe(400);
    expect((await envoyer({})).status).toBe(400);
    expect(factice.ecritures()).toEqual([]);
    expect((await envoyer({ jeton: "60000000-0000-4000-8000-000000000001" })).status).toBe(200);
    const ecritures = factice.ecritures();
    expect(ecritures.map((op) => [op.table, op.action])).toEqual([["preferences_notifications", "update"]]);
    expect(ecritures[0].valeurs).toMatchObject({ email_semaine: false });
    expect(ecritures[0].filtres).toContainEqual(["eq", "jeton", "60000000-0000-4000-8000-000000000001"]);
  });
});
