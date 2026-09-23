import { ConnexionForm } from "@/components/connexion-form";
import { Intro } from "@/components/kit-ui";

export default function Connexion() {
  return (
    <div className="aw-login-page">
      <Intro eyebrow="Espace membre" title="Connectez-vous">
        Entrez l’email de votre achat et le mot de passe choisi à
        l’activation.
      </Intro>
      <section className="panel aw-login-panel" aria-label="Connexion par email">
        <ConnexionForm />
      </section>
    </div>
  );
}
