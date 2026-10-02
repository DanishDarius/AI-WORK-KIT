import { beforeEach, describe, expect, it, vi } from "vitest";
import { creerSupabaseFactice, type Operation, type Reponse } from "../outils/supabase-factice";

// Règle S1 : requireActiveUser exige une session ET un accès payé actif.
// Règle S2 et route PDF : pas de traversée de chemin, abonnement exigé.

const partage = vi.hoisted(() => ({
  factice: null as ReturnType<typeof import("../outils/supabase-factice").creerSupabaseFactice> | null,
}));

vi.mock("@/lib/supabase/admin", () => ({ createAdminClient: () => partage.factice!.client }));
vi.mock("@/lib/supabase/server", () => ({ createClient: async () => partage.factice!.client }));

function installer(repondre?: (op: Operation) => Reponse) {
  partage.factice = creerSupabaseFactice(repondre);
  return partage.factice;
}

const CLIENT = { id: "00000000-0000-4000-8000-000000000001", email: "awa.client@exemple.com" };
const accesActif = (op: Operation): Reponse => (op.table === "acces_clients" ? { data: [{ cree_le: "2026-09-01T10:00:00.000Z" }] } : {});
const abonnementActif = (op: Operation): Reponse =>
  op.table === "acces_clients"
    ? { data: [{ cree_le: "2026-09-01T10:00:00.000Z" }] }
    : op.table === "abonnements"
      ? { data: [{ periode: "mensuel", statut: "actif", fin_le: "2100-01-01T00:00:00.000Z" }] }
      : {};

beforeEach(() => {
  vi.resetModules();
});

describe("S1 · requireActiveUser", () => {
  it("répond 401 sans session", async () => {
    installer();
    const { requireActiveUser } = await import("@/lib/supabase/active-access");
    const resultat = await requireActiveUser();
    expect(resultat.response?.status).toBe(401);
  });

  it("répond 403 quand le compte n'a pas d'accès actif", async () => {
    const factice = installer(() => ({ data: [] }));
    factice.etat.utilisateur = CLIENT;
    const { requireActiveUser } = await import("@/lib/supabase/active-access");
    const resultat = await requireActiveUser();
    expect(resultat.response?.status).toBe(403);
  });

  it("répond 500 quand la base ne répond pas, sans laisser passer", async () => {
    const factice = installer(() => ({ error: { message: "connexion refusée" } }));
    factice.etat.utilisateur = CLIENT;
    const { requireActiveUser } = await import("@/lib/supabase/active-access");
    const resultat = await requireActiveUser();
    expect(resultat.response?.status).toBe(500);
  });

  it("laisse passer un compte dont l'accès est actif", async () => {
    const factice = installer(accesActif);
    factice.etat.utilisateur = CLIENT;
    const { requireActiveUser } = await import("@/lib/supabase/active-access");
    const resultat = await requireActiveUser();
    expect(resultat.user?.email).toBe(CLIENT.email);
  });
});

describe("route PDF des guides", () => {
  async function demander(slug: string) {
    const { GET } = await import("@/app/api/guides/[slug]/pdf/route");
    const reponse = await GET(new Request(`https://aiw.test/api/guides/${encodeURIComponent(slug)}/pdf`), {
      params: Promise.resolve({ slug }),
    });
    if (!reponse) throw new Error("la route n'a renvoyé aucune réponse");
    return reponse;
  }

  it("répond 401 sans session", async () => {
    installer();
    expect((await demander("guide-001-chatgpt-niveau-expert")).status).toBe(401);
  });

  it("répond 403 sans abonnement", async () => {
    const factice = installer(accesActif);
    factice.etat.utilisateur = CLIENT;
    expect((await demander("guide-001-chatgpt-niveau-expert")).status).toBe(403);
  });

  it.each(["../../../etc/passwd", "guide-001-../../secret", "guide-001-chatgpt/../../x", "GUIDE-001-x", "guide-1-x"])(
    "répond 404 pour le nom de fichier « %s »",
    async (slug) => {
      const factice = installer(abonnementActif);
      factice.etat.utilisateur = CLIENT;
      expect((await demander(slug)).status).toBe(404);
    },
  );

  it("sert le PDF à un abonné, sans mise en cache", async () => {
    const factice = installer(abonnementActif);
    factice.etat.utilisateur = CLIENT;
    const reponse = await demander("guide-001-chatgpt-niveau-expert");
    expect(reponse.status).toBe(200);
    expect(reponse.headers.get("content-type")).toBe("application/pdf");
    expect(reponse.headers.get("cache-control")).toContain("no-store");
  });
});

describe("S2 · route /api/kit (contenu payant de la mise en place)", () => {
  async function demander(requete: string) {
    const { GET } = await import("@/app/api/kit/route");
    const reponse = await GET(new Request(`https://aiw.test/api/kit${requete}`));
    if (!reponse) throw new Error("la route n'a renvoyé aucune réponse");
    return reponse;
  }

  it("répond 401 sans session", async () => {
    installer();
    expect((await demander("?ia=claude&codes=F01")).status).toBe(401);
  });

  it("répond 403 sans accès actif", async () => {
    const factice = installer(() => ({ data: [] }));
    factice.etat.utilisateur = CLIENT;
    expect((await demander("?ia=claude&codes=F01")).status).toBe(403);
  });

  it.each(["?ia=autre&codes=F01", "?ia=claude", "?ia=claude&codes=", "?ia=claude&codes=../x,DROP"])(
    "répond 400 pour une demande invalide : %s",
    async (requete) => {
      const factice = installer(accesActif);
      factice.etat.utilisateur = CLIENT;
      expect((await demander(requete)).status).toBe(400);
    },
  );

  it("sert la mise en place des tâches demandées à un client actif, sans mise en cache partagée", async () => {
    const factice = installer(accesActif);
    factice.etat.utilisateur = CLIENT;
    const reponse = await demander("?ia=claude&codes=F01,F02,F999");
    expect(reponse.status).toBe(200);
    expect(reponse.headers.get("cache-control")).toContain("private");
    const corps = (await reponse.json()) as { mise_en_place: Record<string, { outils: unknown[] }> };
    expect(Object.keys(corps.mise_en_place).sort()).toEqual(["F01", "F02"]);
    expect(Array.isArray(corps.mise_en_place.F01.outils)).toBe(true);
  });
});
