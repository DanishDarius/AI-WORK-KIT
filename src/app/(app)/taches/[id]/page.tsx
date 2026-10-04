import type { Metadata } from "next";
import { TacheRoute } from "./tache-route";
import { exigerAccesActif, getEtatAcces } from "@/lib/acces";
import { lireCatalogue } from "@/lib/contenu";
import { estUuid } from "@/lib/normaliser";

// Titre de l'onglet : le nom de la tâche. Le contenu n'est lu qu'après la
// vérification de l'accès (règle C1), dans le cache du catalogue.
export async function generateMetadata({ params }: PageProps<"/taches/[id]">): Promise<Metadata> {
  const { id } = await params;
  const { etat } = await getEtatAcces();
  if (etat !== "actif" || !estUuid(id)) return { title: "Tâche" };
  try {
    return { title: (await lireCatalogue()).taches[id]?.titre ?? "Tâche" };
  } catch {
    return { title: "Tâche" };
  }
}

export default async function TachePage({ params, searchParams }: PageProps<"/taches/[id]">) {
  await exigerAccesActif();
  const { id } = await params;
  const { metier, fil } = await searchParams;
  return <TacheRoute id={id} metier={typeof metier === "string" ? metier : ""} duFil={fil === "1"} />;
}
