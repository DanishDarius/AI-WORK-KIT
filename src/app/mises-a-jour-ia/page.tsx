import { IaUpdatesScreen } from "@/components/ia-updates-screen";
import { iaUpdates } from "@/lib/ia-updates";

export default function MisesAJourIa() {
  return <IaUpdatesScreen items={iaUpdates} />;
}
