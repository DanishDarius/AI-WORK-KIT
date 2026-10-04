import type { Metadata } from "next";
import { AuthFrame } from "@/components/auth";
import { DesabonnementForm } from "@/components/desabonnement";

export const metadata: Metadata = { title: "Ne plus recevoir l’e-mail de la semaine", robots: { index: false } };

// Page ouverte depuis le lien « ne plus recevoir » d'un e-mail, sans
// connexion. Elle est statique : le jeton du lien est lu dans le navigateur,
// et rien n'est modifié tant que la personne n'a pas confirmé.
export default function Desabonnement() {
  return (
    <AuthFrame
      kicker="E-mail de la semaine"
      title="Ne plus recevoir cet e-mail ?"
      intro="Vous ne recevrez plus l’e-mail de la semaine. Votre abonnement et votre accès ne changent pas, et le fil Nouveau reste dans l’application."
    >
      <DesabonnementForm />
    </AuthFrame>
  );
}
