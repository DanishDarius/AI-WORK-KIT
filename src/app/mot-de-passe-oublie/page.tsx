import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { Intro } from "@/components/kit-ui";

export default function MotDePasseOublie() {
  return (
    <div className="aw-login-page">
      <Intro eyebrow="Accès au compte" title="Mot de passe oublié ?">
        Entrez l’email de votre achat. Vous recevrez un lien pour en choisir un
        nouveau.
      </Intro>
      <section className="panel aw-login-panel" aria-label="Récupération du mot de passe">
        <ForgotPasswordForm />
      </section>
    </div>
  );
}
