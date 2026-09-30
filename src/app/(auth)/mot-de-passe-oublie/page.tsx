import type { Metadata } from "next";
import { AuthFrame, ForgotPasswordForm } from "@/components/auth";

export const metadata: Metadata = { title: "Mot de passe oublié" };

export default function MotDePasseOublie() {
  return (
    <AuthFrame kicker="Accès au compte" title="Mot de passe oublié ?" intro="Entrez l’e-mail de votre achat. Vous recevrez un lien pour en choisir un nouveau.">
      <ForgotPasswordForm />
    </AuthFrame>
  );
}
