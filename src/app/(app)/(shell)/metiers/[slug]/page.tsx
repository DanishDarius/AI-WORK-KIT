import { Parcours } from "@/components/parcours";
import { exigerAccesActif } from "@/lib/acces";

export default async function MetierParcours({ params }: PageProps<"/metiers/[slug]">) {
  await exigerAccesActif();
  const { slug } = await params;
  return <Parcours slug={slug} />;
}
