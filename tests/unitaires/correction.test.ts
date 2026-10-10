import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { creerSupabaseFactice, type Operation, type Reponse } from "../outils/supabase-factice";

// La correction des attestations, étape C (migration 0054) :
// - S1 et S10 : l'écran n'existe que pour le correcteur (CORRECTEUR_EMAILS),
//   après l'accès payé ; sans la variable, il n'existe pour personne ;
// - S2 : la réponse type ne sort que vers le correcteur ;
// - la grille : 7 points sur 10, sans 0 au critère 2 ; « À refaire » exige un
//   commentaire ;
// - S13 : un rendu ne reçoit qu'une décision ; l'abonné reçoit un e-mail ;
// - la purge : fichiers et texte effacés 2 mois après l'attestation, une fois.

const partage = vi.hoisted(() => ({
  factice: null as ReturnType<typeof import("../outils/supabase-factice").creerSupabaseFactice> | null,
}));
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient: () => partage.factice!.client }));
vi.mock("@/lib/supabase/server", () => ({ createClient: async () => partage.factice!.client }));

const CORRECTEUR = { id: "00000000-0000-4000-8000-0000000000c0", email: "Correcteur@Exemple.com" };
const ABONNE = { id: "00000000-0000-4000-8000-000000000001", email: "awa.client@exemple.com" };
const M1 = "10000000-0000-4000-8000-000000000001";
const RENDU = "40000000-0000-4000-8000-000000000001";
const CLE = `rendus/${ABONNE.id}/${RENDU}/1`;
const ENV = {
  R2_ACCOUNT_ID: "0123456789abcdef0123456789abcdef",
  R2_BUCKET: "aiw-rendus",
  R2_ACCESS_KEY_ID: "cle-de-test",
  R2_SECRET_ACCESS_KEY: "secret-de-test",
  CORRECTEUR_EMAILS: " correcteur@exemple.com , autre@exemple.com",
  RESEND_API_KEY: "re_test",
  NOTIFICATIONS_EMAIL_FROM: "AIW <hello@exemple.com>",
};

const etat = {
  rendu: null as unknown,
  maj: [{ user_id: ABONNE.id, metier_id: M1 }] as unknown[],
  erreurMaj: null as { message: string; code?: string } | null,
  valides: [] as unknown[],
  essais: [] as unknown[],
};

function base(op: Operation): Reponse {
  switch (op.table) {
    case "acces_clients":
      return { data: [{ cree_le: "2026-09-01T10:00:00.000Z" }] };
    case "metiers":
      return { data: [{ id: M1, slug: "independant-prestataire-de-services", nom: "Indépendant et prestataire de services", description: null, description_local: null, publics: ["independant"] }] };
    case "exercices_finaux":
      return { data: [{ metier_id: M1, numero: 13, cas: "Vous êtes Gildas.", titre_donnees: "Les données", donnees: ["Tarifs"], travail: ["Devis"], a_rendre: "Le devis.", pour_le_correcteur: "Devis : 75 000 FCFA", revu_le: "2026-10-10" }] };
    case "rendus_attestation": {
      if (op.action === "update") return etat.erreurMaj ? { error: etat.erreurMaj } : { data: etat.maj };
      if (op.filtres.some(([m, c, v]) => m === "eq" && c === "statut" && v === "valide")) return { data: etat.valides };
      if (op.filtres.some(([m, c, v]) => m === "eq" && c === "statut" && v === "a_refaire") && op.filtres.some(([m]) => m === "in")) return { data: etat.essais };
      if (op.filtres.some(([m, c, v]) => m === "eq" && c === "statut" && v === "a_refaire")) return { count: 2 };
      if (op.filtres.some(([, c]) => c === "id")) return { data: etat.rendu };
      return { data: [] };
    }
    default:
      return { data: [] };
  }
}

function installer(compte = CORRECTEUR) {
  partage.factice = creerSupabaseFactice(base);
  partage.factice.etat.utilisateur = compte;
  partage.factice.etat.comptes[ABONNE.id] = ABONNE.email;
  return partage.factice;
}

function sur(reponse: Response | undefined) {
  if (!reponse) throw new Error("la route n'a renvoyé aucune réponse");
  return reponse;
}

const appels: { url: string; methode: string; corps?: string }[] = [];
const params = { params: Promise.resolve({ id: RENDU }) };
const decider = (body: unknown) => new Request("https://aiw.test/api/correction", { method: "POST", body: JSON.stringify(body) });
const maj = () => partage.factice!.operations.filter((o) => o.table === "rendus_attestation" && o.action === "update");

beforeEach(() => {
  vi.resetModules();
  vi.unstubAllEnvs();
  for (const [k, v] of Object.entries(ENV)) vi.stubEnv(k, v);
  appels.length = 0;
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init?: RequestInit) => {
      appels.push({ url: String(url), methode: init?.method ?? "GET", corps: typeof init?.body === "string" ? init.body : undefined });
      return new Response("[]", { status: 200 });
    }),
  );
  Object.assign(etat, {
    rendu: {
      id: RENDU, user_id: ABONNE.id, metier_id: M1, statut: "en_attente",
      fichiers: [{ cle: CLE, type: "image/jpeg", taille: 30000 }],
      nom_attestation: "Awa K.", verification: "J'ai vérifié le total du devis.", notes: null, commentaire: null,
      rendu_le: "2026-10-10T01:00:00.000Z", corrige_le: null, purge_le: null,
    },
    maj: [{ user_id: ABONNE.id, metier_id: M1 }],
    erreurMaj: null,
    valides: [],
    essais: [],
  });
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("correction · le correcteur et la grille", () => {
  it("reconnaît le correcteur par son adresse, sans tenir compte des majuscules ni des espaces", async () => {
    const { estCorrecteur } = await import("@/lib/correction");
    expect(estCorrecteur("correcteur@exemple.com")).toBe(true);
    expect(estCorrecteur("CORRECTEUR@exemple.com ")).toBe(true);
    expect(estCorrecteur("awa.client@exemple.com")).toBe(false);
    expect(estCorrecteur(null)).toBe(false);
  });

  it("sans CORRECTEUR_EMAILS, personne n'est correcteur (règle S10)", async () => {
    const { estCorrecteur } = await import("@/lib/correction");
    expect(estCorrecteur("correcteur@exemple.com", {})).toBe(false);
    expect(estCorrecteur("correcteur@exemple.com", { CORRECTEUR_EMAILS: " , " })).toBe(false);
  });

  it("valide à 7 points sur 10 au moins, sans 0 au critère 2", async () => {
    const { grilleReussie } = await import("@/lib/correction");
    expect(grilleReussie([2, 1, 2, 1, 1])).toBe(true);
    expect(grilleReussie([2, 1, 1, 1, 1])).toBe(false);
    expect(grilleReussie([2, 0, 2, 2, 2])).toBe(false);
  });

  it("refuse une note hors de 0, 1, 2, ou une grille incomplète", async () => {
    const { notesValides } = await import("@/lib/correction");
    expect(notesValides([2, 2, 2, 2, 2])).toEqual([2, 2, 2, 2, 2]);
    expect(notesValides([2, 2, 2, 2])).toBeNull();
    expect(notesValides([2, 2, 2, 2, 3])).toBeNull();
    expect(notesValides([2, 2, 2, 2, "2"])).toBeNull();
    expect(notesValides(null)).toBeNull();
  });

  it("« À refaire » exige un commentaire qui part à l'abonné", async () => {
    const { erreurDecision } = await import("@/lib/correction");
    expect(erreurDecision("a_refaire", [1, 1, 1, 1, 1], "")).toMatch(/commentaire/);
    expect(erreurDecision("a_refaire", [1, 1, 1, 1, 1], "Le critère 2 : le total du devis est faux.")).toBeNull();
    expect(erreurDecision("valide", [2, 0, 2, 2, 2], "")).toMatch(/critère 2/);
    expect(erreurDecision("autre", [2, 2, 2, 2, 2], "")).toMatch(/Validé/);
  });

  it("la purge vise ce qui a été validé il y a plus de 2 mois", async () => {
    const { limitePurge } = await import("@/lib/correction");
    expect(limitePurge(new Date("2026-12-10T06:00:00.000Z")).toISOString()).toBe("2026-10-10T06:00:00.000Z");
  });
});

describe("S1 S10 · l'écran de correction n'existe que pour le correcteur", () => {
  it("un abonné reçoit 404 sur la liste, sur un rendu et sur une décision, sans rien lire des rendus", async () => {
    installer(ABONNE);
    const liste = await import("@/app/api/correction/route");
    const rendu = await import("@/app/api/correction/[id]/route");
    expect(sur(await liste.GET()).status).toBe(404);
    expect(sur(await rendu.GET(new Request("https://aiw.test"), params)).status).toBe(404);
    expect(sur(await rendu.POST(decider({ decision: "valide", notes: [2, 2, 2, 2, 2] }), params)).status).toBe(404);
    expect(partage.factice!.operations.filter((o) => o.table === "rendus_attestation")).toEqual([]);
  });

  it("sans session, 401", async () => {
    installer();
    partage.factice!.etat.utilisateur = null;
    const liste = await import("@/app/api/correction/route");
    expect(sur(await liste.GET()).status).toBe(401);
  });

  it("le correcteur voit le rendu, ses fichiers par lien signé, la réponse type et la grille, sans rien écrire", async () => {
    installer();
    const { GET } = await import("@/app/api/correction/[id]/route");
    const reponse = sur(await GET(new Request("https://aiw.test"), params));
    expect(reponse.status).toBe(200);
    const corps = await reponse.json();
    expect(corps.exercice.pour_le_correcteur).toBe("Devis : 75 000 FCFA");
    expect(corps.fichiers[0].url).toMatch(/^https:\/\/0123456789abcdef0123456789abcdef\.eu\.r2\.cloudflarestorage\.com\/aiw-rendus\/rendus\/.*X-Amz-Expires=600/);
    expect(corps.grille).toHaveLength(5);
    expect(corps.essais_a_refaire).toBe(2);
    expect(partage.factice!.ecritures()).toEqual([]);
    expect(reponse.headers.get("cache-control")).toContain("no-store");
  });

  it("un identifiant qui n'est pas un UUID : 404 sans toucher la base", async () => {
    installer();
    const { GET } = await import("@/app/api/correction/[id]/route");
    const reponse = sur(await GET(new Request("https://aiw.test"), { params: Promise.resolve({ id: "1 or 1=1" }) }));
    expect(reponse.status).toBe(404);
    expect(partage.factice!.operations.filter((o) => o.table === "rendus_attestation")).toEqual([]);
  });
});

describe("S13 · la décision", () => {
  it("valide un rendu en attente, une fois, et prévient l'abonné par e-mail", async () => {
    installer();
    const { POST } = await import("@/app/api/correction/[id]/route");
    const reponse = sur(await POST(decider({ decision: "valide", notes: [2, 2, 1, 2, 1], commentaire: "" }), params));
    expect(reponse.status).toBe(200);
    expect(await reponse.json()).toMatchObject({ statut: "valide", email_envoye: true });
    const [ecriture] = maj();
    expect(ecriture.valeurs).toMatchObject({ statut: "valide", notes: [2, 2, 1, 2, 1], commentaire: null });
    expect(ecriture.filtres).toContainEqual(["eq", "statut", "en_attente"]);
    const email = appels.find((a) => a.url.includes("api.resend.com"));
    expect(email?.corps).toContain(ABONNE.email);
    expect(email?.corps).toContain("8 points sur 10");
  });

  it("refuse de valider une grille qui n'atteint pas 7 points, sans rien écrire", async () => {
    installer();
    const { POST } = await import("@/app/api/correction/[id]/route");
    const reponse = sur(await POST(decider({ decision: "valide", notes: [2, 1, 1, 1, 1] }), params));
    expect(reponse.status).toBe(400);
    expect(maj()).toEqual([]);
  });

  it("« À refaire » envoie le commentaire à l'abonné", async () => {
    installer();
    const { POST } = await import("@/app/api/correction/[id]/route");
    const commentaire = "Critère 2 : le devis fait 75 000 FCFA, pas 70 000.";
    const reponse = sur(await POST(decider({ decision: "a_refaire", notes: [2, 0, 2, 2, 2], commentaire }), params));
    expect(reponse.status).toBe(200);
    expect(maj()[0].valeurs).toMatchObject({ statut: "a_refaire", commentaire });
    expect(appels.find((a) => a.url.includes("api.resend.com"))?.corps).toContain("75 000 FCFA, pas 70 000");
  });

  it("un rendu déjà corrigé répond 409 et aucun e-mail ne part", async () => {
    installer();
    etat.maj = [];
    const { POST } = await import("@/app/api/correction/[id]/route");
    const reponse = sur(await POST(decider({ decision: "valide", notes: [2, 2, 2, 2, 2] }), params));
    expect(reponse.status).toBe(409);
    expect(appels.filter((a) => a.url.includes("api.resend.com"))).toEqual([]);
  });

  it("un e-mail refusé n'annule pas la décision : il est signalé", async () => {
    installer();
    vi.stubGlobal("fetch", vi.fn(async () => new Response("non", { status: 500 })));
    const { POST } = await import("@/app/api/correction/[id]/route");
    const reponse = sur(await POST(decider({ decision: "valide", notes: [2, 2, 2, 2, 2] }), params));
    expect(reponse.status).toBe(200);
    expect(await reponse.json()).toMatchObject({ email_envoye: false });
  });
});

describe("l'e-mail de décision", () => {
  it("respecte le ton (Q7) et échappe le commentaire", async () => {
    const { emailDecisionAttestation } = await import("@/lib/emails-abonnes");
    for (const decision of ["valide", "a_refaire"] as const) {
      const m = emailDecisionAttestation({ decision, metier: "Comptabilité", slug: "comptabilite", points: 6, commentaire: "<b>Total</b> faux" });
      for (const texte of [m.subject, m.text, m.html]) {
        expect(texte).not.toMatch(/—/);
        expect(texte).not.toMatch(/\btu\b|\bton\b|\btes\b/i);
        expect(texte).not.toContain("Parlons ADS");
      }
      expect(m.html).not.toContain("<b>Total</b>");
      expect(m.html).toContain("https://ai-work-kit.parlonsads.com/metiers/comptabilite/attestation");
    }
  });
});

describe("la purge des rendus, 2 mois après l'attestation", () => {
  const VALIDE = { id: RENDU, user_id: ABONNE.id, metier_id: M1, fichiers: [{ cle: CLE, type: "image/jpeg", taille: 1 }] };
  const ESSAI = { id: "40000000-0000-4000-8000-000000000002", user_id: ABONNE.id, metier_id: M1, fichiers: [{ cle: `rendus/${ABONNE.id}/x/1`, type: "image/jpeg", taille: 1 }] };
  const AUTRE_METIER = { id: "40000000-0000-4000-8000-000000000003", user_id: ABONNE.id, metier_id: "10000000-0000-4000-8000-000000000002", fichiers: [{ cle: "rendus/a/b/1", type: "image/jpeg", taille: 1 }] };

  it("efface chez R2 les fichiers de l'attestation et de ses essais, puis vide le texte, en datant la purge", async () => {
    installer();
    etat.valides = [VALIDE];
    etat.essais = [ESSAI, AUTRE_METIER];
    const { purgerRendus } = await import("@/lib/planifie");
    const bilan = await purgerRendus(new Date("2026-12-20T06:00:00.000Z"));
    expect(bilan).toEqual({ etat: "fait", purges: 2, reportes: 0 });
    const effaces = appels.filter((a) => a.methode === "DELETE").map((a) => new URL(a.url).pathname);
    expect(effaces).toEqual([`/aiw-rendus/${CLE}`, `/aiw-rendus/rendus/${ABONNE.id}/x/1`]);
    const [ecriture] = maj();
    expect(ecriture.valeurs).toMatchObject({ fichiers: [], verification: null, purge_le: "2026-12-20T06:00:00.000Z" });
    expect(ecriture.filtres).toContainEqual(["in", "id", [RENDU, ESSAI.id]]);
    // Le rendu validé n'est relu que s'il date de plus de 2 mois et n'est pas déjà purgé.
    const lecture = partage.factice!.operations.find((o) => o.table === "rendus_attestation" && o.filtres.some(([, , v]) => v === "valide"));
    expect(lecture?.filtres).toContainEqual(["lt", "corrige_le", "2026-10-20T06:00:00.000Z"]);
    expect(lecture?.filtres).toContainEqual(["is", "purge_le", null]);
    expect(lecture?.filtres).toContainEqual(["limit", "50", undefined]);
  });

  it("un fichier qui n'a pas pu être effacé garde son rendu, repris au passage suivant", async () => {
    installer();
    etat.valides = [VALIDE];
    vi.stubGlobal("fetch", vi.fn(async () => new Response("", { status: 500 })));
    const { purgerRendus } = await import("@/lib/planifie");
    expect(await purgerRendus()).toEqual({ etat: "fait", purges: 0, reportes: 1 });
    expect(maj()).toEqual([]);
  });

  it("rien à purger : une seule lecture, aucune écriture ; sans R2, rien du tout", async () => {
    installer();
    const { purgerRendus } = await import("@/lib/planifie");
    expect(await purgerRendus()).toEqual({ etat: "fait", purges: 0, reportes: 0 });
    expect(partage.factice!.operations).toHaveLength(1);
    vi.stubEnv("R2_SECRET_ACCESS_KEY", "");
    installer();
    expect(await purgerRendus()).toEqual({ etat: "non-configure" });
    expect(partage.factice!.operations).toEqual([]);
  });
});
