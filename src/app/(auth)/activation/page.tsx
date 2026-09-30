import type { Metadata } from "next";
import { AuthFrame, SetPasswordForm } from "@/components/auth";

export const metadata: Metadata = { title: "Activation du compte" };

export default function Activation() {
  return (
    <AuthFrame kicker="Bienvenue sur AIW" title="Activez votre compte" intro="Votre paiement est confirmé. Choisissez un mot de passe et votre espace est prêt.">
      <SetPasswordForm mode="activation" />
    </AuthFrame>
  );
}
