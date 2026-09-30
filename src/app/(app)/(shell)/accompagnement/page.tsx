import type { Metadata } from "next";
import { Accompagnement } from "./accompagnement";

export const metadata: Metadata = { title: "Accompagnement", description: "Systèmes IA sur mesure et transformation IA d’équipe, par Parlons ADS." };

export default function Page() {
  return <Accompagnement />;
}
