import type { Metadata } from "next";
import { exigerAccesActif } from "@/lib/acces";
import MonKit from "./ecran";

export const metadata: Metadata = { title: "Mon kit" };

// Page serveur : elle vérifie l'accès payé (règle S1), puis rend l'écran.
export default async function Page() {
  await exigerAccesActif();
  return <MonKit />;
}
