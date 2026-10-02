import type { Metadata } from "next";
import { exigerAccesActif } from "@/lib/acces";
import Bienvenue from "./ecran";

export const metadata: Metadata = { title: "Bienvenue" };

// Page serveur : elle vérifie l'accès payé (règle S1), puis rend l'écran.
export default async function Page() {
  await exigerAccesActif();
  return <Bienvenue />;
}
