import type { Metadata } from "next";
import { Page } from "@/components/shell";
import { SurMesureEcran } from "@/components/sur-mesure";
import { exigerAccesActif } from "@/lib/acces";

export const metadata: Metadata = { title: "Sur mesure" };

export default async function SurMesure({ searchParams }: PageProps<"/sur-mesure">) {
  await exigerAccesActif();
  const params = await searchParams;
  const metier = typeof params.metier === "string" ? params.metier.slice(0, 120) : "";
  const type = params.type === "metier" ? "metier" : "tache";
  return (
    <Page>
      <SurMesureEcran metierInitial={metier} typeInitial={type} />
    </Page>
  );
}
