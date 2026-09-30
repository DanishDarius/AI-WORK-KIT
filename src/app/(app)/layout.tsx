import { redirect } from "next/navigation";
import { getEtatAcces } from "@/lib/acces";

// Toute la plateforme est fermée : seules les personnes connectées ET dont
// l'accès est actif passent. Les autres arrivent sur la page d'accès.
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { etat } = await getEtatAcces();
  if (etat === "deconnecte") redirect("/acces");
  if (etat === "inactif") redirect("/acces?compte=inactif");
  return children;
}
