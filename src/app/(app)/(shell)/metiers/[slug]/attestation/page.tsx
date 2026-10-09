import type { Metadata } from "next";
import { Attestation } from "@/components/attestation";
import { exigerAccesActif } from "@/lib/acces";

export const metadata: Metadata = { title: "Attestation" };

// L'attestation d'un métier : conditions, exercice final, rendu (règle S1 :
// l'accès payé se vérifie ici ; l'abonnement et les conditions, par la route
// /api/attestations/[slug]).
export default async function AttestationMetier({ params }: PageProps<"/metiers/[slug]/attestation">) {
  await exigerAccesActif();
  const { slug } = await params;
  return <Attestation slug={slug} />;
}
