import type { Metadata } from "next";
import { SystemesIaScreen } from "@/components/systemes-ia-screen";

export const metadata: Metadata = {
  title: "Systèmes IA sur mesure | AI WORK KIT",
  description:
    "Agents, automatisations et systèmes IA intégrés aux outils et aux processus de votre entreprise.",
};

export default function SystemesIaPage() {
  return <SystemesIaScreen />;
}
