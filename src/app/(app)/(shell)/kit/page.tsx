import type { Metadata } from "next";
import { exigerAccesActif } from "@/lib/acces";
import MonKit from "./ecran";

export const metadata: Metadata = { title: "Mon kit" };

// Page serveur : elle vérifie l'accès payé (règle S1), puis rend l'écran.
export default async function Page({ searchParams }: PageProps<"/kit">) {
  await exigerAccesActif();
  const { metier } = await searchParams;
  return <MonKit metier={typeof metier === "string" ? metier : ""} />;
}
