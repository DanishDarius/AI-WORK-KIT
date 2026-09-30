import { TacheRoute } from "./tache-route";

export default async function TachePage({ params, searchParams }: PageProps<"/taches/[id]">) {
  const { id } = await params;
  const { metier } = await searchParams;
  return <TacheRoute id={id} metier={typeof metier === "string" ? metier : ""} />;
}
