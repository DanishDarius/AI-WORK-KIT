import { TacheRoute } from "./tache-route";
import { exigerAccesActif } from "@/lib/acces";

export default async function TachePage({ params, searchParams }: PageProps<"/taches/[id]">) {
  await exigerAccesActif();
  const { id } = await params;
  const { metier } = await searchParams;
  return <TacheRoute id={id} metier={typeof metier === "string" ? metier : ""} />;
}
