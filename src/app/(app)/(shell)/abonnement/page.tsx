import type { Metadata } from "next";
import { AbonnementEcran } from "./abonnement";
import { exigerAccesActif } from "@/lib/acces";

export const metadata: Metadata = { title: "Abonnement" };

export default async function Abonnement() {
  await exigerAccesActif();
  return <AbonnementEcran />;
}
