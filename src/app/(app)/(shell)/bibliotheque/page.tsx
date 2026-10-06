import type { Metadata } from "next";
import { Bibliotheque } from "@/components/guides";
import { Page } from "@/components/shell";
import { PageHead } from "@/components/ui";
import { AbonnementCard, StatsCard } from "@/components/widgets";
import { getAbonnement } from "@/lib/abonnement";
import { getGuideSummaries } from "@/lib/guides";
import { exigerAccesActif } from "@/lib/acces";

export const metadata: Metadata = { title: "Guides" };

export default async function Guides({ searchParams }: PageProps<"/bibliotheque">) {
  const { email } = await exigerAccesActif();
  const { acces } = await searchParams;
  // Sans abonnement, un guide réservé arrive avec son titre, sans résumé.
  const abonnement = await getAbonnement(email);
  const guides = getGuideSummaries(abonnement.actif);
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
