import { Intro } from "@/components/kit-ui";
import { SetPasswordForm } from "@/components/set-password-form";

export default function NouveauMotDePasse() {
  return (
    <div className="aw-login-page">
      <Intro eyebrow="Sécurité du compte" title="Nouveau mot de passe">
        Choisissez un nouveau mot de passe pour retrouver votre espace.
      </Intro>
      <section className="panel aw-login-panel" aria-label="Nouveau mot de passe">
        <SetPasswordForm mode="recovery" />
      </section>
    </div>
  );
}
