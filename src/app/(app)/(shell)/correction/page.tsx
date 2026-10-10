import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Correction } from "@/components/correction";
import { exigerAccesActif } from "@/lib/acces";
import { estCorrecteur } from "@/lib/correction";

export const metadata: Metadata = { title: "Correction", robots: { index: false } };

// Les rendus d'attestation à corriger. Règle S1 : l'accès payé se vérifie
// ici ; puis seul le correcteur (variable CORRECTEUR_EMAILS) voit l'écran.
// Pour tout autre compte, la page n'existe pas.
export default async function PageCorrection() {
  const { email } = await exigerAccesActif();
  if (!estCorrecteur(email)) notFound();
  return <Correction />;
}
