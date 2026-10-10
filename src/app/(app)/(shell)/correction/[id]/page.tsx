import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CorrectionRendu } from "@/components/correction";
import { exigerAccesActif } from "@/lib/acces";
import { estCorrecteur } from "@/lib/correction";

export const metadata: Metadata = { title: "Correction", robots: { index: false } };

// Un rendu d'attestation à corriger. Règle S1 : l'accès payé se vérifie ici ;
// puis seul le correcteur (variable CORRECTEUR_EMAILS) voit l'écran.
export default async function PageCorrectionRendu({ params }: PageProps<"/correction/[id]">) {
  const { email } = await exigerAccesActif();
  if (!estCorrecteur(email)) notFound();
  const { id } = await params;
  return <CorrectionRendu id={id} />;
}
