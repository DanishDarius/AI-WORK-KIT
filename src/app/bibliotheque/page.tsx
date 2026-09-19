import type { Metadata } from "next";
import { LibraryScreen } from "@/components/library-screen";
import { getGuideCategories, getGuideSummaries } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Bibliothèque de guides IA | AI WORK KIT",
  description: "Une bibliothèque de guides pratiques pour utiliser l’intelligence artificielle dans votre travail et vos projets.",
};

export default function BibliothequePage() {
  const guides = getGuideSummaries();
  return <LibraryScreen guides={guides} categories={getGuideCategories(guides)} />;
}
