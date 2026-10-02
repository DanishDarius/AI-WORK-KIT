import { exigerAccesActif } from "@/lib/acces";
import Accueil from "./ecran";

// Page serveur : elle vérifie l'accès payé (règle S1), puis rend l'écran.
export default async function Page() {
  await exigerAccesActif();
  return <Accueil />;
}
