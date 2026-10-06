import type { Metadata } from "next";
import { ProfilEcran } from "@/components/profil";
import { getGuideSummaries } from "@/lib/guides";
import { exigerAccesActif } from "@/lib/acces";

export const metadata: Metadata = { title: "Profil" };

export default async function Profil() {
  await exigerAccesActif();
  const guides = getGuideSummaries(false).map(({ slug, title, tool, duration }) => ({ slug, title, tool, duration }));
  return <ProfilEcran guides={guides} />;
}
