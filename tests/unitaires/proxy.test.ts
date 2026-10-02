import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Règle C2 : le proxy ne fait aucun travail pour un visiteur sans session, et
// vérifie la session sur place (sans appel réseau) pour les autres.

const partage = vi.hoisted(() => ({
  creations: 0,
  claims: null as Record<string, unknown> | null,
}));

vi.mock("@supabase/ssr", () => ({
  createServerClient: () => {
    partage.creations += 1;
    return {
      auth: {
        getClaims: async () => ({ data: partage.claims ? { claims: partage.claims } : null, error: null }),
      },
    };
  },
}));

const CLIENT = { sub: "00000000-0000-4000-8000-000000000001", email: "awa@exemple.com", role: "authenticated", is_anonymous: false };
const COOKIE = "sb-projet-auth-token=jeton";

async function passer(chemin: string, cookie?: string) {
  const { updateSession } = await import("@/lib/supabase/middleware");
  return updateSession(new NextRequest(`https://aiw.test${chemin}`, cookie ? { headers: { cookie } } : undefined));
}

const destination = (reponse: Response) => {
  const lieu = reponse.headers.get("location");
  return lieu ? new URL(lieu).pathname : null;
};

beforeEach(() => {
  vi.resetModules();
  partage.creations = 0;
  partage.claims = null;
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://exemple.supabase.co");
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "cle-publique-de-test");
});

describe("C2 · visiteur sans session : aucun travail", () => {
  it("renvoie vers /acces depuis une page réservée, sans créer de client", async () => {
    const reponse = await passer("/kit?x=1");
    expect(destination(reponse)).toBe("/acces");
    expect(new URL(reponse.headers.get("location")!).search).toBe("");
    expect(partage.creations).toBe(0);
  });

  it.each(["/connexion", "/activation", "/activation/renvoi", "/mot-de-passe-oublie", "/auth/confirm"])(
    "laisse passer la page publique %s, sans créer de client",
    async (chemin) => {
      const reponse = await passer(chemin);
      expect(destination(reponse)).toBeNull();
      expect(partage.creations).toBe(0);
    },
  );

  it("laisse les routes API répondre elles-mêmes (401)", async () => {
    const reponse = await passer("/api/moi");
    expect(destination(reponse)).toBeNull();
    expect(partage.creations).toBe(0);
  });
});

describe("C2 · visiteur avec un cookie de session", () => {
  it("laisse passer un compte connecté sur une page réservée", async () => {
    partage.claims = CLIENT;
    const reponse = await passer("/kit", COOKIE);
    expect(destination(reponse)).toBeNull();
    expect(partage.creations).toBe(1);
  });

  it("renvoie vers /acces quand le jeton n'est plus valable", async () => {
    const reponse = await passer("/kit", COOKIE);
    expect(destination(reponse)).toBe("/acces");
  });

  it("renvoie un compte connecté de /connexion vers l'accueil", async () => {
    partage.claims = CLIENT;
    expect(destination(await passer("/connexion", COOKIE))).toBe("/");
  });

  it("garde une récupération de mot de passe sur sa page", async () => {
    partage.claims = CLIENT;
    const cookie = `${COOKIE}; awk-recovery-pending=${CLIENT.sub}`;
    expect(destination(await passer("/kit", cookie))).toBe("/nouveau-mot-de-passe");
    expect((await passer("/api/moi", cookie)).status).toBe(403);
    expect(destination(await passer("/nouveau-mot-de-passe", cookie))).toBeNull();
  });
});
