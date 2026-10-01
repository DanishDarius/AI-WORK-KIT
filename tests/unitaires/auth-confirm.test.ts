import { beforeEach, describe, expect, it, vi } from "vitest";
import { creerSupabaseFactice } from "../outils/supabase-factice";

// Règle S6 : aucune redirection vers une valeur fournie par l'utilisateur
// sans validation. Le paramètre « next » ne peut mener qu'à un chemin interne.

const partage = vi.hoisted(() => ({
  factice: null as ReturnType<typeof import("../outils/supabase-factice").creerSupabaseFactice> | null,
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: async () => partage.factice!.client,
}));

const ORIGINE = "https://aiw.test";

async function destination(next: string | null) {
  const url = new URL(`${ORIGINE}/auth/confirm`);
  url.searchParams.set("token_hash", "jeton");
  url.searchParams.set("type", "invite");
  if (next !== null) url.searchParams.set("next", next);
  const { GET } = await import("@/app/auth/confirm/route");
  const reponse = await GET(new Request(url));
  expect(reponse.status).toBeGreaterThanOrEqual(300);
  expect(reponse.status).toBeLessThan(400);
  return new URL(reponse.headers.get("location") ?? "", ORIGINE);
}

beforeEach(() => {
  vi.resetModules();
  partage.factice = creerSupabaseFactice();
});

describe("S6 · redirection après confirmation", () => {
  it("suit un chemin interne", async () => {
    const cible = await destination("/activation");
    expect(cible.origin).toBe(ORIGINE);
    expect(cible.pathname).toBe("/activation");
  });

  it("va à l'accueil quand next est absent", async () => {
    const cible = await destination(null);
    expect(cible.origin).toBe(ORIGINE);
    expect(cible.pathname).toBe("/");
  });

  it.each(["@evil.example", "//evil.example", "https://evil.example", "/\\evil.example", ".evil.example", "javascript:alert(1)"])(
    "ne quitte jamais le site avec next=%s",
    async (next) => {
      const cible = await destination(next);
      expect(cible.origin).toBe(ORIGINE);
      expect(cible.pathname.startsWith("//")).toBe(false);
      expect(cible.href).not.toContain("evil.example");
    },
  );
});
