import { beforeEach, describe, expect, it, vi } from "vitest";

// Règle S14 : un lien de nouveau mot de passe vaut une heure. Supabase, lui,
// accepte ses liens 24 heures (durée du lien d'activation) : c'est la route
// /auth/recovery qui refuse un lien plus ancien et ferme la session ouverte.

const partage = vi.hoisted(() => ({
  envoyeLe: null as string | null,
  type: "recovery" as string,
  deconnexions: 0,
  cookies: [] as [nom: string, valeur: string][],
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: async () => ({
    auth: {
      exchangeCodeForSession: async () => ({
        data: {
          session: { user: { id: "u1", ...(partage.envoyeLe ? { recovery_sent_at: partage.envoyeLe } : {}) } },
          redirectType: partage.type,
        },
        error: null,
      }),
      signOut: async () => {
        partage.deconnexions += 1;
        return { error: null };
      },
    },
  }),
}));

vi.mock("next/headers", () => ({
  cookies: async () => ({
    set: (nom: string, valeur: string) => partage.cookies.push([nom, valeur]),
  }),
}));

const MINUTE = 60 * 1000;
const ilYA = (ms: number) => new Date(Date.now() - ms).toISOString();

async function ouvrir() {
  const { GET } = await import("@/app/auth/recovery/route");
  const reponse = await GET(new Request("https://aiw.test/auth/recovery?code=abc"));
  return new URL(reponse.headers.get("location") ?? "");
}

beforeEach(() => {
  vi.resetModules();
  partage.envoyeLe = ilYA(5 * MINUTE);
  partage.type = "recovery";
  partage.deconnexions = 0;
  partage.cookies = [];
});

describe("S14 · durée du lien de mot de passe", () => {
  it("ouvre la page du nouveau mot de passe pour un lien récent", async () => {
    const cible = await ouvrir();
    expect(cible.pathname).toBe("/nouveau-mot-de-passe");
    expect(cible.searchParams.get("lien")).toBeNull();
    expect(partage.cookies).toEqual([["awk-recovery-pending", "u1"]]);
    expect(partage.deconnexions).toBe(0);
  });

  it("accepte encore un lien de 59 minutes", async () => {
    partage.envoyeLe = ilYA(59 * MINUTE);
    expect((await ouvrir()).searchParams.get("lien")).toBeNull();
  });

  it.each([
    ["envoyé il y a 61 minutes", () => ilYA(61 * MINUTE)],
    ["envoyé il y a 23 heures, encore accepté par Supabase", () => ilYA(23 * 60 * MINUTE)],
    ["sans date d'envoi", () => null],
    ["avec une date illisible", () => "hier"],
  ])("refuse un lien %s et ferme la session", async (_cas, envoyeLe) => {
    partage.envoyeLe = envoyeLe();
    const cible = await ouvrir();
    expect(cible.pathname).toBe("/nouveau-mot-de-passe");
    expect(cible.searchParams.get("lien")).toBe("invalide");
    expect(partage.cookies).toEqual([]);
    expect(partage.deconnexions).toBe(1);
  });

  it("refuse un lien récent qui n'est pas un lien de mot de passe", async () => {
    partage.type = "signup";
    const cible = await ouvrir();
    expect(cible.searchParams.get("lien")).toBe("invalide");
    expect(partage.cookies).toEqual([]);
  });

  it("le témoin qui autorise le changement ne dure pas plus d'une heure", async () => {
    const { recoveryCookieOptions } = await import("@/lib/supabase/recovery");
    expect(recoveryCookieOptions.maxAge).toBeLessThanOrEqual(60 * 60);
    expect(recoveryCookieOptions.httpOnly).toBe(true);
  });
});
