import { describe, expect, it } from "vitest";
import { lireSession } from "@/lib/supabase/session";

// Règle C2 : la session se lit dans le jeton vérifié (getClaims), sans appel
// au serveur d'authentification. Seul un compte réel, avec e-mail, compte.

type Claims = Record<string, unknown> | null;

function client(claims: Claims, error: { message: string } | null = null) {
  return {
    auth: { getClaims: async () => ({ data: claims ? { claims } : null, error }) },
  } as unknown as Parameters<typeof lireSession>[0];
}

const VALIDE = { sub: "00000000-0000-4000-8000-000000000001", email: "awa@exemple.com", role: "authenticated", is_anonymous: false };

describe("C2 · lireSession", () => {
  it("renvoie l'identifiant et l'e-mail d'un compte connecté", async () => {
    expect(await lireSession(client(VALIDE))).toEqual({ id: VALIDE.sub, email: VALIDE.email });
  });

  it("refuse l'absence de session", async () => {
    expect(await lireSession(client(null))).toBeNull();
  });

  it("refuse un jeton invalide ou expiré", async () => {
    expect(await lireSession(client(VALIDE, { message: "Invalid JWT signature" }))).toBeNull();
  });

  it("refuse un compte anonyme", async () => {
    expect(await lireSession(client({ ...VALIDE, is_anonymous: true }))).toBeNull();
  });

  it("refuse un jeton qui n'est pas celui d'un compte connecté", async () => {
    expect(await lireSession(client({ ...VALIDE, role: "anon" }))).toBeNull();
    expect(await lireSession(client({ ...VALIDE, role: "service_role" }))).toBeNull();
  });

  it("refuse un jeton sans e-mail ou sans identifiant", async () => {
    expect(await lireSession(client({ ...VALIDE, email: "" }))).toBeNull();
    expect(await lireSession(client({ ...VALIDE, email: undefined }))).toBeNull();
    expect(await lireSession(client({ ...VALIDE, sub: undefined }))).toBeNull();
  });
});
