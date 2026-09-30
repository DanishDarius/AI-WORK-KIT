import type { Metadata } from "next";
import { ProfilEcran } from "@/components/profil";
import { getGuideSummaries } from "@/lib/guides";

export const metadata: Metadata = { title: "Profil" };

export default function Profil() {
  const guides = getGuideSummaries().map(({ slug, title, tool, duration }) => ({ slug, title, tool, duration }));
  return <ProfilEcran guides={guides} />;
}
