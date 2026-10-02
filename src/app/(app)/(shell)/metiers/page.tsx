import type { Metadata } from "next";
import { exigerAccesActif } from "@/lib/acces";
import Metiers from "./ecran";

export const metadata: Metadata = { title: "Métiers" };

// Page serveur : elle vérifie l'accès payé (règle S1), puis rend l'écran.
export default async function Page() {
  await exigerAccesActif();
  return <Metiers />;
}
