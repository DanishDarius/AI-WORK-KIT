import { ComprendreIaScreen } from "@/components/comprendre-ia-screen";
import { getGuideSummaries } from "@/lib/guides";

export default function ComprendreLesIa() {
  return <ComprendreIaScreen guides={getGuideSummaries()} />;
}
