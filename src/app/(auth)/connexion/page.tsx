import type { Metadata } from "next";
import { AuthFrame, ConnexionForm } from "@/components/auth";

export const metadata: Metadata = { title: "Connexion" };

export default function Connexion() {
  return (
    <AuthFrame kicker="Connexion" title="Bon retour parmi nous." intro="Retrouvez votre parcours là où vous l’avez laissé." side>
      <ConnexionForm />
    </AuthFrame>
  );
}
