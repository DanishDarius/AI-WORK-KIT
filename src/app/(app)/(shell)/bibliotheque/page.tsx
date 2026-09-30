import type { Metadata } from "next";
import { Bibliotheque } from "@/components/guides";
import { Page } from "@/components/shell";
import { PageHead } from "@/components/ui";
import { AbonnementCard, StatsCard } from "@/components/widgets";
import { getGuideSummaries } from "@/lib/guides";

export const metadata: Metadata = { title: "Guides" };

export default async function Guides({ searchParams }: PageProps<"/bibliotheque">) {
  const { acces } = await searchParams;
  const guides = getGuideSummaries();
  const filtre = acces === "inclus" || acces === "premium" ? acces : undefined;
  return (
    <Page aside={<><StatsCard /><AbonnementCard /></>}>
      <PageHead kicker="Bibliothèque" title="Les guides">
        Pour aller plus loin, un sujet à la fois. {guides.filter((g) => g.inclus).length} guides sont inclus dans votre accès, les {guides.filter((g) => !g.inclus).length} autres avec l’abonnement.
      </PageHead>
      <Bibliotheque guides={guides} acces={filtre} />
    </Page>
  );
}
