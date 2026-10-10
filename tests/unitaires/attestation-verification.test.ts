import { beforeEach, describe, expect, it, vi } from "vitest";
import { lire } from "../outils/fichiers";
import { creerSupabaseFactice, type Operation, type Reponse } from "../outils/supabase-factice";

// La page publique /attestation/<numéro> (étape D) : elle ne lit que le nom,
// le métier et la date d'une attestation validée, à partir d'un numéro validé.

const partage = vi.hoisted(() => ({
  factice: null as ReturnType<typeof import("../outils/supabase-factice").creerSupabaseFactice> | null,
}));
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient: () => partage.factice!.client }));

const M1 = "10000000-0000-4000-8000-000000000001";
const etat = { ligne: null as unknown };

function base(op: Operation): Reponse {
  if (op.table === "metiers") return { data: [{ id: M1, slug: "comptabilite", nom: "Comptabilité", description: null, description_local: null, publics: ["salarie"] }] };
  if (op.table === "rendus_attestation") return { data: etat.ligne };
  return { data: [] };
}

beforeEach(() => {
  vi.resetModules();
  etat.ligne = { nom_attestation: "Mariam Koné", metier_id: M1, corrige_le: "2026-10-10T09:30:00.000Z" };
  partage.factice = creerSupabaseFactice(base);
});

describe("étape D · lecture publique d'une attestation", () => {
  it("lit le nom, le métier et la date d'une attestation validée, et rien d'autre", async () => {
    const { lireAttestationPublique } = await import("@/lib/attestation-verification");
    expect(await lireAttestationPublique("AIW-7F3A-91C2-0B4E")).toEqual({
      nom: "Mariam Koné",
      metier: "Comptabilité",
      delivreeLe: "2026-10-10T09:30:00.000Z",
      numero: "AIW-7F3A-91C2-0B4E",
    });
    const lecture = partage.factice!.operations.find((op) => op.table === "rendus_attestation");
    expect(lecture?.filtres).toContainEqual(["eq", "numero", "AIW-7F3A-91C2-0B4E"]);
    expect(lecture?.filtres).toContainEqual(["eq", "statut", "valide"]);
    expect(partage.factice!.ecritures()).toEqual([]);
    // Ni fichiers, ni texte de vérification, ni note, ni commentaire, ni compte.
    const source = lire("src/lib/attestation-verification.ts");
    expect(source).toMatch(/\.select\("nom_attestation, metier_id, corrige_le"\)/);
  });

  it("un numéro inconnu ne montre rien", async () => {
    etat.ligne = null;
    const { lireAttestationPublique } = await import("@/lib/attestation-verification");
    expect(await lireAttestationPublique("AIW-0000-0000-0000")).toBeNull();
  });

  it("la page valide le numéro avant toute requête, et répond « introuvable » sinon", () => {
    const page = lire("src/app/(public)/attestation/[numero]/page.tsx");
    expect(page).toMatch(/const numero = numeroValide\(\(await params\)\.numero\);\s*const attestation = numero \? await lireAttestationPublique\(numero\) : null;\s*if \(!attestation\) notFound\(\);/);
  });
});
