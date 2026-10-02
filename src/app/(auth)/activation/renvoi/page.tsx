import type { Metadata } from "next";
import { AuthFrame, RenvoiActivationForm } from "@/components/auth";

export const metadata: Metadata = { title: "Recevoir le lien d’activation" };

export default function RenvoiActivation() {
  return (
    <AuthFrame
      kicker="Après votre achat"
      title="Recevoir le lien d’activation"
      intro="Vous avez payé et l’e-mail d’activation n’est pas arrivé, ou son lien ne fonctionne plus ? Entrez l’adresse utilisée lors de l’achat."
    >
      <RenvoiActivationForm />
    </AuthFrame>
  );
}
