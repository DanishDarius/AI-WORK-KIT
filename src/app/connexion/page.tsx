import { ConnexionForm } from "@/components/connexion-form";
import { Intro } from "@/components/kit-ui";

export default function Connexion() {
  return (
    <div className="aw-login-page">
      <Intro eyebrow="Votre accès sécurisé" title="Se connecter">
        Utilisez l’adresse email de votre achat et le mot de passe choisi lors
        de l’activation de votre compte.
      </Intro>
      <section className="panel aw-login-panel" aria-label="Connexion par email">
        <ConnexionForm />
      </section>
    </div>
  );
}
