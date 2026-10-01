import { createHmac } from "node:crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { creerSupabaseFactice, type Operation, type Reponse } from "../outils/supabase-factice";

// Règles S5 (webhook de paiement), S8 (messages d'erreur) et C6 (le parcours
// d'achat ne casse pas quand un e-mail échoue).

const SECRET = "whsec_test_secret";
const PRODUIT_ACCES = "prd_acces";
const PRODUIT_MENSUEL = "prd_mensuel";

const partage = vi.hoisted(() => ({
  factice: null as ReturnType<typeof import("../outils/supabase-factice").creerSupabaseFactice> | null,
}));

vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: () => partage.factice!.client,
}));

function installer(repondre?: (op: Operation) => Reponse) {
  partage.factice = creerSupabaseFactice(repondre);
  return partage.factice;
}

const vente = (surcharge: Record<string, unknown> = {}) => ({
  event: "successful.sale",
  sale: { id: "sale_123", status: "completed" },
  product: { id: PRODUIT_ACCES },
  customer: { email: "Awa.Client@Exemple.com" },
  ...surcharge,
});

function signature(corps: string, secret = SECRET) {
  return "sha256=" + createHmac("sha256", secret).update(corps).digest("hex");
}

async function appeler(payload: unknown, options: { signer?: boolean; signatureBrute?: string } = {}) {
  const corps = typeof payload === "string" ? payload : JSON.stringify(payload);
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (options.signatureBrute) headers["x-chariow-signature"] = options.signatureBrute;
  else if (options.signer !== false) headers["x-chariow-signature"] = signature(corps);
  const { POST } = await import("@/app/api/webhooks/chariow/route");
  return POST(new Request("https://aiw.test/api/webhooks/chariow", { method: "POST", headers, body: corps }));
}

beforeEach(() => {
  vi.resetModules();
  // Aucun appel réseau pendant les tests (service d'envoi d'e-mails compris).
  vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 200 })));
  vi.stubEnv("CHARIOW_WEBHOOK_SECRET", SECRET);
  vi.stubEnv("CHARIOW_PRODUIT_ID_AI_WORK_KIT", PRODUIT_ACCES);
  vi.stubEnv("CHARIOW_PRODUIT_ID_ABONNEMENT_MENSUEL", PRODUIT_MENSUEL);
  vi.stubEnv("CHARIOW_PRODUIT_ID_ABONNEMENT_ANNUEL", "prd_annuel");
  vi.stubEnv("CHARIOW_PRODUIT_ID_ABONNEMENT_A_VIE", "prd_a_vie");
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://exemple.supabase.co");
  vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "cle-de-test");
});

describe("S5 · le webhook refuse ce qui n'est pas une vente signée", () => {
  it("refuse la requête quand le secret n'est pas configuré", async () => {
    const factice = installer();
    vi.stubEnv("CHARIOW_WEBHOOK_SECRET", "");
    const reponse = await appeler(vente(), { signer: false });
    expect(reponse.status).toBeGreaterThanOrEqual(500);
    expect(factice.ecritures()).toEqual([]);
    expect(factice.invitations).toEqual([]);
  });

  it("refuse une requête sans signature", async () => {
    const factice = installer();
    const reponse = await appeler(vente(), { signer: false });
    expect(reponse.status).toBe(401);
    expect(factice.operations).toEqual([]);
  });

  it("refuse une signature fausse", async () => {
    const factice = installer();
    const reponse = await appeler(vente(), { signatureBrute: signature("autre corps") });
    expect(reponse.status).toBe(401);
    expect(factice.operations).toEqual([]);
  });

  it("refuse un corps qui n'est pas du JSON", async () => {
    const factice = installer();
    const reponse = await appeler("pas du json");
    expect(reponse.status).toBe(400);
    expect(factice.ecritures()).toEqual([]);
  });

  it("n'ouvre aucun accès pour un autre événement que successful.sale", async () => {
    const factice = installer();
    await appeler(vente({ event: "refunded.sale" }));
    expect(factice.ecritures()).toEqual([]);
    expect(factice.invitations).toEqual([]);
  });

  it("n'ouvre aucun accès sans identifiant de produit", async () => {
    const factice = installer();
    await appeler(vente({ product: {} }));
    expect(factice.ecritures()).toEqual([]);
    expect(factice.invitations).toEqual([]);
  });

  it("n'ouvre aucun accès pour un produit inconnu", async () => {
    const factice = installer();
    const reponse = await appeler(vente({ product: { id: "prd_autre" } }));
    expect(reponse.status).toBe(200);
    expect(factice.ecritures()).toEqual([]);
  });

  it("n'ouvre aucun accès pour une vente non finalisée", async () => {
    const factice = installer();
    await appeler(vente({ sale: { id: "sale_123", status: "pending" } }));
    expect(factice.ecritures()).toEqual([]);
  });

  it("n'ouvre aucun accès si l'e-mail n'est pas une adresse", async () => {
    const factice = installer();
    const reponse = await appeler(vente({ customer: { email: { piege: true } } }));
    expect(reponse.status).toBe(400);
    expect(factice.ecritures()).toEqual([]);
  });
});

describe("S5 · une vente signée ouvre un seul accès", () => {
  it("crée l'accès avec l'e-mail en minuscules et envoie l'activation", async () => {
    const factice = installer();
    const reponse = await appeler(vente());
    expect(reponse.status).toBe(200);
    const creations = factice.ecritures("acces_clients").filter((op) => op.action === "insert");
    expect(creations).toHaveLength(1);
    expect(creations[0].valeurs).toMatchObject({ email: "awa.client@exemple.com", chariow_sale_id: "sale_123", statut: "actif" });
    expect(factice.invitations).toEqual(["awa.client@exemple.com"]);
  });

  it("ne recrée rien quand la vente a déjà été traitée", async () => {
    const factice = installer((op) => (op.table === "acces_clients" && op.action === "select" ? { data: { id: "deja" } } : {}));
    const reponse = await appeler(vente());
    expect(reponse.status).toBe(200);
    expect(factice.ecritures()).toEqual([]);
    expect(factice.invitations).toEqual([]);
  });

  it("enregistre un abonnement pour un produit d'abonnement", async () => {
    const factice = installer();
    const reponse = await appeler(vente({ product: { id: PRODUIT_MENSUEL } }));
    expect(reponse.status).toBe(200);
    const creations = factice.ecritures("abonnements");
    expect(creations).toHaveLength(1);
    expect(creations[0].valeurs).toMatchObject({ email: "awa.client@exemple.com", periode: "mensuel", fournisseur: "chariow", reference_paiement: "sale_123" });
    expect(factice.ecritures("acces_clients")).toEqual([]);
  });
});

describe("C6 · un e-mail qui échoue ne fait pas perdre l'accès payé", () => {
  it("garde la ligne d'accès quand l'envoi de l'activation échoue", async () => {
    const factice = installer();
    factice.etat.erreurInvitation = { message: "email rate limit exceeded" };
    await appeler(vente());
    expect(factice.ecritures("acces_clients").filter((op) => op.action === "insert")).toHaveLength(1);
    expect(factice.ecritures("acces_clients").filter((op) => op.action === "delete")).toEqual([]);
  });
});

describe("S8 · aucun détail technique dans la réponse", () => {
  it("ne renvoie pas le message d'erreur de la base", async () => {
    const message = 'duplicate key value violates unique constraint "acces_clients_chariow_sale_id_key"';
    installer((op) => (op.action === "insert" ? { error: { message } } : {}));
    const reponse = await appeler(vente());
    expect(reponse.status).toBeGreaterThanOrEqual(500);
    expect(await reponse.text()).not.toContain("acces_clients");
  });
});
