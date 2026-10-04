import { beforeEach, describe, expect, it, vi } from "vitest";
import { creerSupabaseFactice, type Operation, type Reponse } from "../outils/supabase-factice";
import { emailDeLaSemaine, emailRappelEcheance } from "@/lib/emails-abonnes";
import { abonnementsEnCours, rappelsDuJour, semaineIso } from "@/lib/planifie";

// Le travail de chaque matin (plan produit, chantier 5) : e-mail de la semaine
// et rappels d'échéance. Ce qui compte : un même e-mail ne part jamais deux
// fois, un client qui a dit non ne reçoit rien, et la route ne fait rien sans
// son secret.

const partage = vi.hoisted(() => ({
  factice: null as ReturnType<typeof import("../outils/supabase-factice").creerSupabaseFactice> | null,
}));
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient: () => partage.factice!.client }));

const LUNDI = new Date("2026-10-12T06:00:00Z");
const jour = (iso: string) => `${iso}T12:00:00Z`;

describe("la semaine d'une date", () => {
  it.each([
    ["2026-10-05", "2026-W41"],
    ["2026-10-11", "2026-W41"],
    ["2026-10-12", "2026-W42"],
    ["2026-12-31", "2026-W53"],
    ["2027-01-01", "2026-W53"],
    ["2027-01-04", "2027-W01"],
    ["2024-12-30", "2025-W01"],
  ])("%s est dans la semaine %s", (date, attendu) => {
    expect(semaineIso(new Date(`${date}T06:00:00Z`))).toBe(attendu);
  });
});

describe("les rappels d'échéance du jour", () => {
  const lignes = [
    { email: "j5@exemple.com", periode: "mensuel" as const, statut: "actif", fin_le: jour("2026-10-17") },
    { email: "j0@exemple.com", periode: "annuel" as const, statut: "actif", fin_le: jour("2026-10-12") },
    { email: "j3@exemple.com", periode: "mensuel" as const, statut: "actif", fin_le: jour("2026-10-15") },
    { email: "avie@exemple.com", periode: "a_vie" as const, statut: "actif", fin_le: jour("2026-10-17") },
    { email: "expire@exemple.com", periode: "mensuel" as const, statut: "expire", fin_le: jour("2026-10-17") },
    // A déjà renouvelé : son abonnement le plus lointain ne se termine pas dans 5 jours.
    { email: "renouvele@exemple.com", periode: "mensuel" as const, statut: "actif", fin_le: jour("2026-10-17") },
    { email: "renouvele@exemple.com", periode: "mensuel" as const, statut: "actif", fin_le: jour("2026-11-17") },
  ];

  it("retient 5 jours avant et le jour même, pour les formules au mois et à l'année", () => {
    expect(rappelsDuJour(lignes, LUNDI).map((r) => [r.email, r.jours, r.formule])).toEqual([
      ["j5@exemple.com", 5, "mensuel"],
      ["j0@exemple.com", 0, "annuel"],
    ]);
  });

  it("ne relance ni la formule à vie, ni un abonnement expiré, ni un client qui a déjà renouvelé", () => {
    const emails = rappelsDuJour(lignes, LUNDI).map((r) => r.email);
    expect(emails).not.toContain("avie@exemple.com");
    expect(emails).not.toContain("expire@exemple.com");
    expect(emails).not.toContain("renouvele@exemple.com");
  });

  it("garde par adresse l'abonnement le plus lointain", () => {
    expect(abonnementsEnCours(lignes, LUNDI.getTime()).get("renouvele@exemple.com")?.fin_le).toBe(jour("2026-11-17"));
  });
});

describe("les e-mails envoyés aux clients (règle Q7)", () => {
  const semaine = emailDeLaSemaine({
    lignes: [{ libelle: "Tâche de la semaine", titre: "Répondre à un avis <négatif>", lien: "https://ai-work-kit.parlonsads.com/nouveau" }],
    lienDesabonnement: "https://ai-work-kit.parlonsads.com/desabonnement?j=60000000-0000-4000-8000-000000000001",
  });
  const rappels = [emailRappelEcheance({ jours: 5, finLe: jour("2026-10-17"), formule: "mensuel" }), emailRappelEcheance({ jours: 0, finLe: jour("2026-10-12"), formule: "annuel" })];

  it.each([["semaine", semaine], ["rappel J-5", rappels[0]], ["rappel du jour", rappels[1]]])("%s : vouvoiement, pas de tiret long, pas de nom du fondateur", (_, email) => {
    for (const texte of [email.subject, email.text, email.html.replace(/<[^>]+>/g, " ")]) {
      expect(texte).not.toMatch(/[—–]/);
      expect(texte).not.toMatch(/(?<!\p{L})(tu|ton|ta|tes|toi)(?!\p{L})/iu);
      expect(texte).not.toMatch(/nassoutode|darius/i);
    }
    expect(email.text).toMatch(/Bonjour,/);
  });

  it("l'e-mail de la semaine porte le lien pour ne plus le recevoir, et échappe les titres", () => {
    expect(semaine.text).toContain("/desabonnement?j=60000000-0000-4000-8000-000000000001");
    expect(semaine.html).toContain("/desabonnement?j=60000000-0000-4000-8000-000000000001");
    expect(semaine.html).toContain("Répondre à un avis &lt;négatif&gt;");
    expect(semaine.html).not.toContain("<négatif>");
    expect(semaine.subject).toBe("Tâche de la semaine : Répondre à un avis <négatif>");
  });

  it("le rappel dit la date, que rien n'est prélevé, et ce que le client garde", () => {
    expect(rappels[0].text).toContain("17 octobre 2026");
    expect(rappels[0].text).toMatch(/Rien n’est prélevé automatiquement/);
    expect(rappels[0].text).toMatch(/vous gardez votre accès/);
    expect(rappels[1].subject).toMatch(/se termine aujourd’hui/);
  });

  it("aucun e-mail ne promet un temps gagné ni un résultat chiffré", () => {
    for (const email of [semaine, ...rappels]) expect(email.text).not.toMatch(/gagne[zr]?\s+\d|fois plus|\d+\s*%/i);
  });
});

// ===== Le travail complet, avec une fausse base et un faux Resend =====

type Journal = { type: string; periode: string; email: string; etat: string };
const monde = {
  abonnements: [] as { email: string; periode: string; statut: string; fin_le: string }[],
  refus: [] as { email: string; email_semaine: boolean; rappels_echeance: boolean }[],
  journal: [] as Journal[],
  publications: [] as { id: string; type: string; ref_id: string; titre: string; resume: string | null; publie_le: string; reserve_abonnes: boolean }[],
  resendOk: true,
  envois: [] as { to: string[]; subject: string; headers?: Record<string, string> }[],
};

function base(op: Operation): Reponse {
  const filtre = (colonne: string) => op.filtres.find(([, c]) => c === colonne)?.[2];
  switch (op.table) {
    case "abonnements":
      return { data: monde.abonnements };
    case "preferences_notifications":
      if (op.action === "upsert") return { data: null };
      // Lecture des refus (filtre « or ») ou des jetons (filtre « in »).
      return op.filtres.some(([m]) => m === "in")
        ? { data: (filtre("email") as string[]).map((email) => ({ email, jeton: `jeton-de-${email}` })) }
        : { data: monde.refus };
    case "envois_notifications":
      if (op.action === "upsert") {
        for (const ligne of op.valeurs as Journal[]) {
          monde.journal = monde.journal.filter((l) => !(l.type === ligne.type && l.periode === ligne.periode && l.email === ligne.email));
          monde.journal.push({ type: ligne.type, periode: ligne.periode, email: ligne.email, etat: ligne.etat });
        }
        return { data: null };
      }
      if (op.action === "update") {
        const emails = filtre("email") as string[];
        for (const l of monde.journal) if (l.type === filtre("type") && l.periode === filtre("periode") && emails.includes(l.email)) l.etat = "echec";
        return { data: null };
      }
      return { data: monde.journal.filter((l) => l.type === filtre("type") && l.periode === filtre("periode") && l.etat === "envoye").map((l) => ({ email: l.email })) };
    case "publications":
      return { data: monde.publications };
    default:
      return { data: [] };
  }
}

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv("RESEND_API_KEY", "cle-de-test");
  vi.stubEnv("CONTACT_EMAIL_FROM", "AIW <contact@exemple.com>");
  monde.abonnements = [
    { email: "abonne@exemple.com", periode: "a_vie", statut: "actif", fin_le: jour("2099-01-01") },
    { email: "refus@exemple.com", periode: "annuel", statut: "actif", fin_le: jour("2027-06-01") },
    { email: "j5@exemple.com", periode: "mensuel", statut: "actif", fin_le: jour("2026-10-17") },
  ];
  monde.refus = [{ email: "refus@exemple.com", email_semaine: false, rappels_echeance: true }];
  monde.journal = [];
  monde.publications = [{ id: "p1", type: "tache", ref_id: "t1", titre: "Répondre à un avis négatif", resume: null, publie_le: "2026-10-12T05:00:00Z", reserve_abonnes: true }];
  monde.resendOk = true;
  monde.envois = [];
  partage.factice = creerSupabaseFactice(base);
  vi.stubGlobal("fetch", async (_url: string, init: { body: string }) => {
    const lot = JSON.parse(init.body) as typeof monde.envois;
    if (monde.resendOk) monde.envois.push(...lot);
    return new Response(monde.resendOk ? "{}" : "refus", { status: monde.resendOk ? 200 : 500 });
  });
});

const destinataires = () => monde.envois.map((e) => `${e.to[0]} · ${e.subject}`).sort();

describe("le travail quotidien", () => {
  it("envoie l'e-mail de la semaine aux abonnés qui ne l'ont pas refusé, et le rappel à qui arrive à échéance", async () => {
    const { travailQuotidien } = await import("@/lib/planifie");
    const bilan = await travailQuotidien(LUNDI);
    expect(bilan).toMatchObject({ etat: "fait", semaine: "2026-W42", email_semaine: { envoyes: 2, echecs: 0 }, rappels: { envoyes: 1, echecs: 0 } });
    expect(destinataires()).toEqual([
      "abonne@exemple.com · Tâche de la semaine : Répondre à un avis négatif",
      "j5@exemple.com · AIW : votre abonnement se termine dans 5 jours",
      "j5@exemple.com · Tâche de la semaine : Répondre à un avis négatif",
    ]);
    expect(monde.envois.some((e) => e.to[0] === "refus@exemple.com")).toBe(false);
    // Le lien « ne plus recevoir » de chacun porte son propre jeton.
    const semaine = monde.envois.find((e) => e.to[0] === "abonne@exemple.com");
    expect(semaine?.headers?.["List-Unsubscribe"]).toBe("<https://ai-work-kit.parlonsads.com/desabonnement?j=jeton-de-abonne@exemple.com>");
  });

  it("relancé le même jour, ne renvoie aucun e-mail", async () => {
    const { travailQuotidien } = await import("@/lib/planifie");
    await travailQuotidien(LUNDI);
    const premiers = monde.envois.length;
    const bilan = await travailQuotidien(LUNDI);
    expect(monde.envois.length).toBe(premiers);
    expect(bilan).toMatchObject({ email_semaine: { envoyes: 0 }, rappels: { envoyes: 0 } });
  });

  it("un envoi refusé par Resend est marqué en échec, puis repris au passage suivant", async () => {
    const { travailQuotidien } = await import("@/lib/planifie");
    monde.resendOk = false;
    const rate = await travailQuotidien(LUNDI);
    expect(rate).toMatchObject({ email_semaine: { envoyes: 0, echecs: 2 }, rappels: { envoyes: 0, echecs: 1 } });
    expect(monde.journal.every((l) => l.etat === "echec")).toBe(true);
    monde.resendOk = true;
    const repris = await travailQuotidien(LUNDI);
    expect(repris).toMatchObject({ email_semaine: { envoyes: 2, echecs: 0 }, rappels: { envoyes: 1, echecs: 0 } });
    expect(monde.journal.every((l) => l.etat === "envoye")).toBe(true);
  });

  it("n'envoie pas d'e-mail de la semaine quand rien n'est paru depuis sept jours", async () => {
    monde.publications = [{ id: "p0", type: "tache", ref_id: "t0", titre: "Ancienne tâche", resume: null, publie_le: "2026-09-01T05:00:00Z", reserve_abonnes: true }];
    const { travailQuotidien } = await import("@/lib/planifie");
    const bilan = await travailQuotidien(LUNDI);
    expect(bilan).toMatchObject({ publications: 0, email_semaine: { envoyes: 0 } });
    expect(destinataires()).toEqual(["j5@exemple.com · AIW : votre abonnement se termine dans 5 jours"]);
  });

  it("n'annonce jamais une publication à paraître", async () => {
    monde.publications.push({ id: "p2", type: "pack", ref_id: "fetes", titre: "Pack à paraître", resume: null, publie_le: "2026-11-02T05:00:00Z", reserve_abonnes: true });
    const { travailQuotidien } = await import("@/lib/planifie");
    await travailQuotidien(LUNDI);
    const corps = JSON.stringify(monde.envois);
    expect(corps).not.toContain("Pack à paraître");
  });

  it("respecte le refus des rappels d'échéance", async () => {
    monde.refus.push({ email: "j5@exemple.com", email_semaine: true, rappels_echeance: false });
    const { travailQuotidien } = await import("@/lib/planifie");
    await travailQuotidien(LUNDI);
    expect(monde.envois.some((e) => /se termine/.test(e.subject))).toBe(false);
  });

  it("sans clé d'envoi, ne lit ni n'écrit rien", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const { travailQuotidien } = await import("@/lib/planifie");
    expect(await travailQuotidien(LUNDI)).toEqual({ etat: "non-configure" });
    expect(partage.factice!.operations).toEqual([]);
  });
});

describe("GET /api/planifie/quotidien", () => {
  const appeler = async (autorisation?: string) => {
    const { GET } = await import("@/app/api/planifie/quotidien/route");
    return GET(new Request("https://aiw.test/api/planifie/quotidien", { headers: autorisation ? { authorization: autorisation } : {} }));
  };

  it("sans secret configuré, répond 503 et ne fait rien (règle S10)", async () => {
    vi.stubEnv("CRON_SECRET", "");
    expect((await appeler("Bearer nimporte")).status).toBe(503);
    expect(partage.factice!.operations).toEqual([]);
    expect(monde.envois).toEqual([]);
  });

  it("avec un mauvais secret ou sans en-tête, répond 401 et ne fait rien", async () => {
    vi.stubEnv("CRON_SECRET", "secret-de-test");
    expect((await appeler()).status).toBe(401);
    expect((await appeler("Bearer autre-secret")).status).toBe(401);
    expect((await appeler("secret-de-test")).status).toBe(401);
    expect(partage.factice!.operations).toEqual([]);
    expect(monde.envois).toEqual([]);
  });

  it("avec le bon secret, lance le travail", async () => {
    vi.stubEnv("CRON_SECRET", "secret-de-test");
    const reponse = await appeler("Bearer secret-de-test");
    expect(reponse.status).toBe(200);
    expect(await reponse.json()).toMatchObject({ etat: "fait" });
  });
});
