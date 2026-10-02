import { beforeEach, describe, expect, it, vi } from "vitest";
import { creerSupabaseFactice, type Operation, type Reponse } from "../outils/supabase-factice";

// Règles C6 et S13 : l'acheteur peut redemander son lien d'activation. La
// route est publique : elle ne dit pas qui est client, et n'envoie qu'un
// e-mail toutes les 5 minutes par adresse.

const partage = vi.hoisted(() => ({
  factice: null as ReturnType<typeof import("../outils/supabase-factice").creerSupabaseFactice> | null,
  apres: [] as Promise<unknown>[],
}));

vi.mock("@/lib/supabase/admin", () => ({ createAdminClient: () => partage.factice!.client }));
// « after » lance le travail une fois la réponse partie : ici on le lance
// tout de suite et on l'attend avant de vérifier.
vi.mock("next/server", async (original) => ({
  ...(await original<typeof import("next/server")>()),
  after: (travail: () => Promise<unknown>) => {
    partage.apres.push(travail());
  },
}));

function installer(repondre?: (op: Operation) => Reponse) {
  partage.factice = creerSupabaseFactice(repondre);
  return partage.factice;
}

async function demander(corps: unknown) {
  const { POST } = await import("@/app/api/activation/renvoi/route");
  const reponse = await POST(
    new Request("https://aiw.test/api/activation/renvoi", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: typeof corps === "string" ? corps : JSON.stringify(corps),
    }),
  );
  await Promise.all(partage.apres);
  return reponse;
}

const ilYA = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString();

// Une ligne d'accès actif, et une prise de créneau qui réussit.
const acces = (activation_demandee_le: string | null) => (op: Operation): Reponse =>
  op.table !== "acces_clients"
    ? {}
    : op.action === "select"
      ? { data: [{ id: "acces-1", activation_demandee_le }] }
      : { data: [{ id: "acces-1" }] };

beforeEach(() => {
  vi.resetModules();
  partage.apres = [];
});

describe("C6 · renvoi du lien d'activation", () => {
  it("renvoie le lien à un acheteur dont le premier envoi n'est jamais parti", async () => {
    const factice = installer(acces(null));
    const reponse = await demander({ email: " Awa.Client@Exemple.com " });
    expect(reponse.status).toBe(200);
    expect(factice.invitations).toEqual(["awa.client@exemple.com"]);
    const prise = factice.ecritures("acces_clients");
    expect(prise).toHaveLength(1);
    expect(prise[0].action).toBe("update");
    // Écriture conditionnelle : la ligne n'est prise que si elle n'a pas bougé.
    expect(prise[0].filtres).toContainEqual(["eq", "id", "acces-1"]);
    expect(prise[0].filtres).toContainEqual(["is", "activation_demandee_le", null]);
  });

  it("renvoie le lien quand le dernier envoi date de plus de 5 minutes", async () => {
    const dernier = ilYA(6);
    const factice = installer(acces(dernier));
    await demander({ email: "awa@exemple.com" });
    expect(factice.invitations).toEqual(["awa@exemple.com"]);
    expect(factice.ecritures("acces_clients")[0].filtres).toContainEqual(["eq", "activation_demandee_le", dernier]);
  });

  it("répond de la même façon quand l'e-mail ne part pas", async () => {
    const factice = installer(acces(null));
    factice.etat.erreurInvitation = { message: "email rate limit exceeded" };
    const reponse = await demander({ email: "awa@exemple.com" });
    expect(reponse.status).toBe(200);
    expect(await reponse.json()).toEqual({ ok: true });
  });
});

describe("S13 · un envoi toutes les 5 minutes par adresse", () => {
  it("n'envoie rien si un envoi a été demandé il y a moins de 5 minutes", async () => {
    const factice = installer(acces(ilYA(2)));
    const reponse = await demander({ email: "awa@exemple.com" });
    expect(reponse.status).toBe(200);
    expect(factice.invitations).toEqual([]);
    expect(factice.ecritures()).toEqual([]);
  });

  it("n'envoie rien si le créneau a été pris par une autre requête", async () => {
    const factice = installer((op) =>
      op.table === "acces_clients" && op.action === "select" ? { data: [{ id: "acces-1", activation_demandee_le: null }] } : { data: [] },
    );
    await demander({ email: "awa@exemple.com" });
    expect(factice.invitations).toEqual([]);
  });

  it("n'envoie rien si le créneau ne peut pas être enregistré", async () => {
    const factice = installer((op) =>
      op.table === "acces_clients" && op.action === "select"
        ? { data: [{ id: "acces-1", activation_demandee_le: null }] }
        : { error: { message: "base indisponible" } },
    );
    const reponse = await demander({ email: "awa@exemple.com" });
    expect(reponse.status).toBe(200);
    expect(factice.invitations).toEqual([]);
  });
});

describe("la route ne dit pas qui est client", () => {
  it("répond 200 sans rien envoyer pour une adresse sans achat", async () => {
    const factice = installer(() => ({ data: [] }));
    const reponse = await demander({ email: "inconnu@exemple.com" });
    expect(reponse.status).toBe(200);
    expect(await reponse.json()).toEqual({ ok: true });
    expect(factice.invitations).toEqual([]);
    expect(factice.ecritures()).toEqual([]);
  });

  it("ne cherche que les accès actifs de l'adresse, en minuscules", async () => {
    const factice = installer(() => ({ data: [] }));
    await demander({ email: "Inconnu@Exemple.com" });
    expect(factice.operations[0].filtres).toContainEqual(["eq", "email", "inconnu@exemple.com"]);
    expect(factice.operations[0].filtres).toContainEqual(["eq", "statut", "actif"]);
  });

  it.each([{}, { email: "" }, { email: "pas-une-adresse" }, { email: { piege: true } }, "pas du json"])(
    "répond 400 sans toucher la base pour une demande invalide : %j",
    async (corps) => {
      const factice = installer();
      expect((await demander(corps)).status).toBe(400);
      expect(factice.operations).toEqual([]);
    },
  );

  it("ne renvoie pas le détail d'une erreur de la base", async () => {
    installer(() => ({ error: { message: 'relation "acces_clients" does not exist' } }));
    const reponse = await demander({ email: "awa@exemple.com" });
    expect(reponse.status).toBe(500);
    expect(await reponse.text()).not.toContain("acces_clients");
  });
});
