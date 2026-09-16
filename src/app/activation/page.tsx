import { Intro } from "@/components/kit-ui";
import { SetPasswordForm } from "@/components/set-password-form";

export default function Activation() {
  return (
    <div className="aw-login-page">
      <Intro eyebrow="Bienvenue dans AI WORK KIT" title="Activez votre compte">
        Votre achat est validé. Choisissez maintenant votre mot de passe pour
        accéder à la plateforme.
      </Intro>
      <section className="panel aw-login-panel" aria-label="Activation du compte">
        <SetPasswordForm mode="activation" />
      </section>
    </div>
  );
}
