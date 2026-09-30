import { Parcours } from "@/components/parcours";

export default async function MetierParcours({ params }: PageProps<"/metiers/[slug]">) {
  const { slug } = await params;
  return <Parcours slug={slug} />;
}
