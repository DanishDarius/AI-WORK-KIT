import { CatalogueScreen } from "@/components/catalogue-screen";
import { getGuideSummaries } from "@/lib/guides";

export default function Home() {
  return <CatalogueScreen home guides={getGuideSummaries()} />;
}
