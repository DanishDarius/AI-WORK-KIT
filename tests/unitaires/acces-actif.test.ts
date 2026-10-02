import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { creerSupabaseFactice, type Operation, type Reponse } from "../outils/supabase-factice";

// Règles S1 et C2 : l'accès payé est vérifié en base, et une réponse « actif »
// est gardée 60 secondes. Un refus ou une erreur ne sont jamais gardés.

const partage = vi.hoisted(() => ({
  factice: null as ReturnType<typeof import("../outils/supabase-factice").creerSupabaseFactice> | null,
}));

vi.mock("@/lib/supabase/admin", () => ({ createAdminClient: () => partage.factice!.client }));

function installer(repondre?: (op: Operation) => Reponse) {
  partage.factice = creerSupabaseFactice(repondre);
  return partage.factice;
}

const ACTIF: Reponse = { data: [{ cree_le: "2026-09-01T10:00:00.000Z" }] };

beforeEach(() => {
  vi.resetModules();
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-10-03T08:00:00.000Z"));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("C2 · accès payé gardé 60 secondes en mémoire", () => {
  it("compare l'e-mail en minuscules, avec une égalité", async () => {
    const factice = installer(() => ACTIF);
    const { accesActif } = await import("@/lib/acces-actif");
    await accesActif("  Awa.Client@Exemple.com ");
    expect(factice.operations[0].filtres).toContainEqual(["eq", "email", "awa.client@exemple.com"]);
    expect(factice.operations[0].filtres).toContainEqual(["eq", "statut", "actif"]);
  });

  it("ne relit pas la base pour le même compte pendant 60 secondes", async () => {
    const factice = installer(() => ACTIF);
    const { accesActif } = await import("@/lib/acces-actif");
    expect(await accesActif("awa@exemple.com")).toEqual({ actif: true, depuis: "2026-09-01T10:00:00.000Z" });
    vi.advanceTimersByTime(59_000);
    expect((await accesActif("AWA@exemple.com")).actif).toBe(true);
    expect(factice.operations).toHaveLength(1);
  });

  it("relit la base après 60 secondes : un accès retiré se ferme", async () => {
    let reponse: Reponse = ACTIF;
    const factice = installer(() => reponse);
    const { accesActif } = await import("@/lib/acces-actif");
    expect((await accesActif("awa@exemple.com")).actif).toBe(true);
    reponse = { data: [] };
    vi.advanceTimersByTime(60_001);
    expect((await accesActif("awa@exemple.com")).actif).toBe(false);
    expect(factice.operations).toHaveLength(2);
  });

  it("ne garde jamais un refus : un acheteur entre dès que sa ligne existe", async () => {
    let reponse: Reponse = { data: [] };
    const factice = installer(() => reponse);
    const { accesActif } = await import("@/lib/acces-actif");
    expect((await accesActif("awa@exemple.com")).actif).toBe(false);
    reponse = ACTIF;
    expect((await accesActif("awa@exemple.com")).actif).toBe(true);
    expect(factice.operations).toHaveLength(2);
  });

  it("ne laisse pas entrer quand la base ne répond pas, et ne garde pas l'erreur", async () => {
    let reponse: Reponse = { error: { message: "connexion refusée" } };
    installer(() => reponse);
    const { accesActif, AccesInverifiable } = await import("@/lib/acces-actif");
    await expect(accesActif("awa@exemple.com")).rejects.toBeInstanceOf(AccesInverifiable);
    reponse = ACTIF;
    expect((await accesActif("awa@exemple.com")).actif).toBe(true);
  });

  it("ne mélange pas deux comptes", async () => {
    const factice = installer((op) =>
      op.filtres.some(([, colonne, valeur]) => colonne === "email" && valeur === "awa@exemple.com") ? ACTIF : { data: [] },
    );
    const { accesActif } = await import("@/lib/acces-actif");
    expect((await accesActif("awa@exemple.com")).actif).toBe(true);
    expect((await accesActif("autre@exemple.com")).actif).toBe(false);
    expect(factice.operations).toHaveLength(2);
  });
});
