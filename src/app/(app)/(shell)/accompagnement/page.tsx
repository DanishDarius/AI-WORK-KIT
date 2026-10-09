import type { Metadata } from "next";
import { Accompagnement } from "./accompagnement";
import { exigerAccesActif } from "@/lib/acces";

export const metadata: Metadata = { title: "Accompagnement", description: "Systèmes IA sur mesure et transformation IA d’équipe." };

export default async function Page() {
  await exigerAccesActif();
  return <Accompagnement />;
}
