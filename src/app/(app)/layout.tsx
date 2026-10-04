import { HorsLigne } from "@/components/hors-ligne";
import { exigerAccesActif } from "@/lib/acces";

// Toute la plateforme est fermée : seules les personnes connectées ET dont
// l'accès est actif passent. Chaque page refait ce contrôle (règle S1), car
// un layout ne décide pas du rendu des pages qu'il contient.
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  await exigerAccesActif();
  return (
    <>
      <HorsLigne />
      {children}
    </>
  );
}
