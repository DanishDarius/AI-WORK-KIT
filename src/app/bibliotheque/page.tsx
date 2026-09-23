import type { Metadata } from "next";
import { LibraryScreen } from "@/components/library-screen";
import { getGuideCategories, getGuideSummaries } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Bibliothèque de guides IA | AI WORK KIT",
  description: "Des guides IA courts et concrets : lus en quelques minutes, appliqués le jour même.",
};

export default function BibliothequePage() {
  const guides = getGuideSummaries();
  return <LibraryScreen guides={guides} categories={getGuideCategories(guides)} />;
}
