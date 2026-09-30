import type { Metadata } from "next";
import { AbonnementEcran } from "./abonnement";

export const metadata: Metadata = { title: "Abonnement" };

export default function Abonnement() {
  return <AbonnementEcran />;
}
