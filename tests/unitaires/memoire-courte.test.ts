import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { creerMemoireCourte } from "@/lib/memoire-courte";

// La mémoire courte du serveur : durée de vie et taille bornées.

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-10-03T08:00:00.000Z"));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("mémoire courte", () => {
  it("rend une valeur pendant sa durée de vie, puis l'oublie", () => {
    const memoire = creerMemoireCourte<number>(1_000);
    expect(memoire.lire("a")).toBeUndefined();
    memoire.garder("a", 1);
    vi.advanceTimersByTime(999);
    expect(memoire.lire("a")).toBe(1);
    vi.advanceTimersByTime(1);
    expect(memoire.lire("a")).toBeUndefined();
  });

  it("ne dépasse jamais sa taille : la plus ancienne entrée part", () => {
    const memoire = creerMemoireCourte<number>(60_000, 2);
    memoire.garder("a", 1);
    memoire.garder("b", 2);
    memoire.garder("c", 3);
    expect(memoire.lire("a")).toBeUndefined();
    expect(memoire.lire("b")).toBe(2);
    expect(memoire.lire("c")).toBe(3);
  });

  it("remplace une valeur sans rien retirer d'autre", () => {
    const memoire = creerMemoireCourte<number>(60_000, 2);
    memoire.garder("a", 1);
    memoire.garder("b", 2);
    memoire.garder("a", 10);
    expect(memoire.lire("a")).toBe(10);
    expect(memoire.lire("b")).toBe(2);
  });
});
