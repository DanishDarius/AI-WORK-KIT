import { IaUpdatesScreen } from "@/components/ia-updates-screen";
import { iaUpdates } from "@/lib/ia-updates";
import { getGuideSummaries } from "@/lib/guides";

export default function MisesAJourIa() {
    return <IaUpdatesScreen items={iaUpdates} guides={getGuideSummaries()} />;
}
