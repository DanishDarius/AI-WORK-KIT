import { beforeEach, describe, expect, it, vi } from "vitest";
import { creerSupabaseFactice, type Operation, type Reponse } from "../outils/supabase-factice";

// Formulaires de contact (Systèmes IA, Transformation IA) : règles S1 (accès),
// S7 (entrées validées), S8 (erreurs génériques) et S13 (limite par compte,
// rien n'est envoyé si la demande n'est pas enregistrée).

const partage = vi.hoisted(() => ({
  factice: null as ReturnType<typeof import("../outils/supabase-factice").creerSupabaseFactice> | null,
}));

vi.mock("@/lib/supabase/admin", () => ({ createAdminClient: () => partage.factice!.client }));
vi.mock("@/lib/supabase/server", () => ({ createClient: async () => partage.factice!.client }));

const CLIENT = { id: "00000000-0000-4000-8000-000000000001", email: "awa.client@exemple.com" };

// Accès actif, aucune demande récente, enregistrement réussi.
const normal = (op: Operation): Reponse =>
  op.table === "acces_clients"
    ? { data: [{ cree_le: "2026-09-01T10:00:00.000Z" }] }
    : op.action === "insert"
      ? { data: { id: "demande-1" } }
      : { count: 0 };

function installer(repondre: (op: Operation) => Reponse = normal, connecte = true) {
  partage.factice = creerSupabaseFactice(repondre);
  if (connecte) partage.factice.etat.utilisateur = CLIENT;
  return partage.factice;
}

const demande = (surcharge: Record<string, unknown> = {}) => ({
  formulaire: "systemes-ia",
  nom: "Awa Koné",
  email: "awa@boutique.example",
  entreprise: "Boutique <Awa>",
  reponses: { besoin: "Automatiser les relances de paiement." },
  ...surcharge,
});

let envois: { url: string; corps: Record<string, unknown> }[] = [];
let reponseResend = () => new Response("{}", { status: 200 });

async function poster(corps: unknown) {
  const { POST } = await import("@/app/api/contact/route");
  const reponse = await POST(
    new Request("https://aiw.test/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: typeof corps === "string" ? corps : JSON.stringify(corps),
    }),
  );
  if (!reponse) throw new Error("la route n'a renvoyé aucune réponse");
  return reponse;
}

beforeEach(() => {
  vi.resetModules();
  envois = [];
  reponseResend = () => new Response("{}", { status: 200 });
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init?: RequestInit) => {
      envois.push({ url: String(url), corps: JSON.parse(String(init?.body ?? "{}")) });
      return reponseResend();
    }),
  );
  vi.stubEnv("RESEND_API_KEY", "cle-de-test");
  vi.stubEnv("CONTACT_EMAIL_FROM", "AIW <hello@parlonsads.com>");
  vi.stubEnv("CONTACT_EMAIL_TO", "equipe@exemple.com");
});

describe("S1 · accès exigé", () => {
  it("répond 401 sans session, sans rien enregistrer ni envoyer", async () => {
    const factice = installer(normal, false);
    expect((await poster(demande())).status).toBe(401);
    expect(factice.ecritures()).toEqual([]);
    expect(envois).toEqual([]);
  });

  it("répond 403 sans accès actif", async () => {
    installer(() => ({ data: [] }));
    expect((await poster(demande())).status).toBe(403);
    expect(envois).toEqual([]);
  });
});

describe("S7 · demande validée côté serveur", () => {
  it.each([
    ["corps illisible", "pas du json"],
    ["formulaire inconnu", demande({ formulaire: "autre" })],
    ["nom manquant", demande({ nom: "  " })],
    ["e-mail invalide", demande({ email: "pas-une-adresse" })],
    ["besoin manquant", demande({ reponses: {} })],
  ])("répond 400 : %s", async (_cas, corps) => {
    const factice = installer();
    expect((await poster(corps)).status).toBe(400);
    expect(factice.ecritures()).toEqual([]);
    expect(envois).toEqual([]);
  });

  it("répond OK à un robot (champ piège rempli) sans rien enregistrer ni envoyer", async () => {
    const factice = installer();
    const reponse = await poster(demande({ site: "https://spam.example" }));
    expect(reponse.status).toBe(200);
    expect(factice.ecritures()).toEqual([]);
    expect(envois).toEqual([]);
  });
});

describe("S13 · limite par compte", () => {
  it("refuse au-delà de 5 demandes par heure", async () => {
    const factice = installer((op) => (op.table === "acces_clients" ? normal(op) : { count: 5 }));
    expect((await poster(demande())).status).toBe(429);
    expect(factice.ecritures()).toEqual([]);
    expect(envois).toEqual([]);
  });

  it("n'enregistre et n'envoie rien quand la limite ne peut pas être vérifiée", async () => {
    const factice = installer((op) => (op.table === "acces_clients" ? normal(op) : { error: { message: "base indisponible" } }));
    const reponse = await poster(demande());
    expect(reponse.status).toBe(500);
    expect(await reponse.text()).not.toContain("base indisponible");
    expect(factice.ecritures()).toEqual([]);
    expect(envois).toEqual([]);
  });

  it("n'envoie aucun e-mail quand la demande n'a pas pu être enregistrée", async () => {
    installer((op) => (op.action === "insert" ? { error: { message: "insertion refusée" } } : normal(op)));
    const reponse = await poster(demande());
    expect(reponse.status).toBe(500);
    expect(await reponse.text()).not.toContain("insertion refusée");
    expect(envois).toEqual([]);
  });
});

describe("demande valide", () => {
  it("enregistre la demande pour le compte connecté, puis prévient l'équipe par Resend", async () => {
    const factice = installer();
    const reponse = await poster(demande());
    expect(reponse.status).toBe(200);

    const creation = factice.ecritures("demandes_contact").find((op) => op.action === "insert");
    expect(creation?.valeurs).toMatchObject({ user_id: CLIENT.id, formulaire: "systemes-ia", nom: "Awa Koné", email: "awa@boutique.example" });

    expect(envois).toHaveLength(1);
    expect(envois[0].url).toBe("https://api.resend.com/emails");
    expect(envois[0].corps).toMatchObject({ from: "AIW <hello@parlonsads.com>", to: ["equipe@exemple.com"], reply_to: "awa@boutique.example" });
    // Ce que l'utilisateur a saisi est échappé dans l'e-mail.
    expect(String(envois[0].corps.html)).toContain("Boutique &lt;Awa&gt;");
    expect(String(envois[0].corps.html)).not.toContain("Boutique <Awa>");

    expect(factice.ecritures("demandes_contact").find((op) => op.action === "update")?.valeurs).toEqual({ email_envoye: true });
  });

  it("garde la demande et répond OK même si l'e-mail ne part pas", async () => {
    const factice = installer();
    reponseResend = () => new Response("limite atteinte", { status: 429 });
    const reponse = await poster(demande());
    expect(reponse.status).toBe(200);
    expect(factice.ecritures("demandes_contact").filter((op) => op.action === "insert")).toHaveLength(1);
    expect(factice.ecritures("demandes_contact").filter((op) => op.action === "update")).toEqual([]);
  });
});
