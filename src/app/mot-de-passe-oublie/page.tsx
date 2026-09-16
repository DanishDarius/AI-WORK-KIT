import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { Intro } from "@/components/kit-ui";

export default function MotDePasseOublie() {
  return (
    <div className="aw-login-page">
      <Intro eyebrow="Récupération du compte" title="Mot de passe oublié ?">
        Indiquez l’adresse email utilisée lors de votre achat. Nous vous
        enverrons un lien sécurisé pour choisir un nouveau mot de passe.
      </Intro>
      <section className="panel aw-login-panel" aria-label="Récupération du mot de passe">
        <ForgotPasswordForm />
      </section>
    </div>
  );
}
