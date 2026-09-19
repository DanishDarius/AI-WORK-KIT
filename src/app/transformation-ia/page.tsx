import type { Metadata } from "next";
import { TransformationIaScreen } from "@/components/transformation-ia-screen";

export const metadata: Metadata = {
  title: "Stratégie de transformation IA | AI WORK KIT",
  description: "De la stratégie au premier système IA adopté par vos équipes.",
};

export default function TransformationIaPage() {
  return <TransformationIaScreen />;
}
