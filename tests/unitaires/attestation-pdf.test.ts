import { writeFileSync } from "node:fs";
import { PDFDocument } from "pdf-lib";
import { describe, expect, it } from "vitest";
import { fabriquerAttestationPdf } from "@/lib/attestation-pdf";
import {
  dateAttestation,
  lienLinkedIn,
  lienVerification,
  NOM_ECRIVABLE,
  numeroValide,
  texteAttestation,
} from "@/lib/attestation-publique";

// L'attestation obtenue, étape D (migration 0055) : son numéro, son PDF, son
// lien LinkedIn et l'adresse de sa page de vérification.

const EXEMPLE = { nom: "Awa Kossou-Dossou", metier: "Comptabilité", numero: "AIW-7F3A-91C2-0B4E", delivreeLe: "2026-10-10T09:30:00Z" };

describe("numéro d'attestation (règle S7)", () => {
  it("accepte le format donné par la base, en majuscules", () => {
    expect(numeroValide("AIW-7F3A-91C2-0B4E")).toBe("AIW-7F3A-91C2-0B4E");
    expect(numeroValide(" aiw-7f3a-91c2-0b4e ")).toBe("AIW-7F3A-91C2-0B4E");
  });

  it.each(["", "AIW-7F3A-91C2", "AIW-7F3A-91C2-0B4G", "AIW-7F3A-91C2-0B4E-0000", "x".repeat(100), "AIW-7F3A-91C2-0B4E%27", null, 12])(
    "refuse %s",
    (valeur) => {
      expect(numeroValide(valeur)).toBeNull();
    },
  );
});

describe("nom écrit sur l'attestation", () => {
  it.each(["Awa Kossou-Dossou", "Éloïse N’Guessan", "Jean-Baptiste O'Neil", "Cœur Ç. Ñ"])("accepte %s", (nom) => {
    expect(NOM_ECRIVABLE.test(nom)).toBe(true);
  });

  it.each(["Awa 2", "Ɛkpɛ", "<b>Awa</b>", "Awa — Kossou", "李"])("refuse %s : les polices ne savent pas l'écrire", (nom) => {
    expect(NOM_ECRIVABLE.test(nom)).toBe(false);
  });
});

describe("textes et liens", () => {
  it("reprend le texte du document validé", () => {
    expect(texteAttestation("Comptabilité")).toBe("Attestation de compétences IA, métier Comptabilité, délivrée par AIW");
    expect(dateAttestation("2026-10-10T23:30:00Z")).toBe("10 octobre 2026");
  });

  it("la page de vérification est sur le site", () => {
    expect(lienVerification("AIW-7F3A-91C2-0B4E")).toBe("https://ai-work-kit.parlonsads.com/attestation/AIW-7F3A-91C2-0B4E");
  });

  it("le lien LinkedIn suit les paramètres publiés par LinkedIn", () => {
    const lien = new URL(lienLinkedIn(EXEMPLE));
    expect(lien.origin + lien.pathname).toBe("https://www.linkedin.com/profile/add");
    expect(Object.fromEntries(lien.searchParams)).toEqual({
      startTask: "CERTIFICATION_NAME",
      name: "Attestation de compétences IA, métier Comptabilité",
      organizationName: "AIW",
      issueYear: "2026",
      issueMonth: "10",
      certUrl: "https://ai-work-kit.parlonsads.com/attestation/AIW-7F3A-91C2-0B4E",
      certId: "AIW-7F3A-91C2-0B4E",
    });
  });
});

describe("PDF de l'attestation", () => {
  it("est un PDF d'une page A4 couchée, avec son titre", async () => {
    const octets = await fabriquerAttestationPdf(EXEMPLE);
    if (process.env.ATTESTATION_PDF_SORTIE) writeFileSync(process.env.ATTESTATION_PDF_SORTIE, octets);
    expect(Buffer.from(octets.slice(0, 5)).toString()).toBe("%PDF-");
    expect(octets.length).toBeLessThan(200_000);
    const relu = await PDFDocument.load(octets);
    expect(relu.getPageCount()).toBe(1);
    const { width, height } = relu.getPage(0).getSize();
    expect(Math.round(width)).toBe(842);
    expect(Math.round(height)).toBe(595);
    expect(relu.getTitle()).toBe("Attestation de compétences IA, métier Comptabilité, délivrée par AIW : Awa Kossou-Dossou");
  });

  it("le même rendu redonne le même fichier", async () => {
    const a = await fabriquerAttestationPdf(EXEMPLE);
    const b = await fabriquerAttestationPdf(EXEMPLE);
    expect(Buffer.from(a).equals(Buffer.from(b))).toBe(true);
  });

  it("un nom très long tient sur la page", async () => {
    const octets = await fabriquerAttestationPdf({ ...EXEMPLE, nom: "Marie-Éléonore ".repeat(8).trim() });
    expect((await PDFDocument.load(octets)).getPageCount()).toBe(1);
  });
});
