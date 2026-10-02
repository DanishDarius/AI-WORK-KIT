import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { creerSupabaseFactice, type Operation, type Reponse } from "../outils/supabase-factice";

// Règle C2 : un abonnement en cours est gardé 60 secondes. L'absence
// d'abonnement n'est jamais gardée, et la date de fin est toujours recontrôlée.

const partage = vi.hoisted(() => ({
  factice: null as ReturnType<typeof import("../outils/supabase-factice").creerSupabaseFactice> | null,
}));

vi.mock("@/lib/supabase/admin", () => ({ createAdminClient: () => partage.factice!.client }));

function installer(repondre?: (op: Operation) => Reponse) {
  partage.factice = creerSupabaseFactice(repondre);
  return partage.factice;
}

const ligne = (fin_le: string, statut = "actif") => ({ data: [{ periode: "mensuel", statut, fin_le }] });

beforeEach(() => {
  vi.resetModules();
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-10-03T08:00:00.000Z"));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("C2 · abonnement en cours gardé 60 secondes", () => {
  it("ne relit pas la base pour le même compte pendant 60 secondes", async () => {
    const factice = installer(() => ligne("2026-11-03T08:00:00.000Z"));
    const { getAbonnement } = await import("@/lib/abonnement");
    expect((await getAbonnement("Awa@Exemple.com")).actif).toBe(true);
    vi.advanceTimersByTime(30_000);
    expect((await getAbonnement("awa@exemple.com")).actif).toBe(true);
    expect(factice.operations).toHaveLength(1);
    vi.advanceTimersByTime(31_000);
    await getAbonnement("awa@exemple.com");
    expect(factice.operations).toHaveLength(2);
  });

  it("ferme l'abonnement à sa date de fin, même pendant les 60 secondes", async () => {
    installer(() => ligne("2026-10-03T08:00:20.000Z"));
    const { getAbonnement } = await import("@/lib/abonnement");
    expect((await getAbonnement("awa@exemple.com")).actif).toBe(true);
    vi.advanceTimersByTime(25_000);
    expect(await getAbonnement("awa@exemple.com")).toMatchObject({ actif: false, statut: "expire" });
  });

  it("ne garde jamais l'absence d'abonnement : un achat l'ouvre tout de suite", async () => {
    let reponse: Reponse = { data: [] };
    const factice = installer(() => reponse);
    const { getAbonnement } = await import("@/lib/abonnement");
    expect((await getAbonnement("awa@exemple.com")).actif).toBe(false);
    reponse = ligne("2026-11-03T08:00:00.000Z");
    expect((await getAbonnement("awa@exemple.com")).actif).toBe(true);
    expect(factice.operations).toHaveLength(2);
  });

  it("ne garde pas un abonnement expiré ni une erreur de la base", async () => {
    let reponse: Reponse = ligne("2026-09-01T00:00:00.000Z");
    const factice = installer(() => reponse);
    const { getAbonnement } = await import("@/lib/abonnement");
    expect((await getAbonnement("awa@exemple.com")).actif).toBe(false);
    reponse = { error: { message: "connexion refusée" } };
    expect((await getAbonnement("awa@exemple.com")).actif).toBe(false);
    reponse = ligne("2026-11-03T08:00:00.000Z");
    expect((await getAbonnement("awa@exemple.com")).actif).toBe(true);
    expect(factice.operations).toHaveLength(3);
  });

  it("répond sans abonnement et sans requête quand il n'y a pas d'e-mail", async () => {
    const factice = installer();
    const { getAbonnement } = await import("@/lib/abonnement");
    expect((await getAbonnement(null)).actif).toBe(false);
    expect(factice.operations).toEqual([]);
  });
});
