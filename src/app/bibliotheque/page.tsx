import type { Metadata } from "next";
import { LibraryScreen } from "@/components/library-screen";
import { getGuideCategories, getGuideSummaries } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Bibliothèque de guides IA | AI WORK KIT",
  description: "Des guides IA courts et concrets : lus en quelques minutes, appliqués le jour même.",
};

// ?acces=inclus ou ?acces=premium : ouvre la liste déjà filtrée.
export default async function BibliothequePage({ searchParams }: { searchParams: Promise<{ acces?: string }> }) {
  const { acces } = await searchParams;
  const guides = getGuideSummaries();
  return (
    <LibraryScreen
      guides={guides}
      categories={getGuideCategories(guides)}
      initialAccess={acces === "inclus" || acces === "premium" ? acces : "tous"}
    />
  );
}
