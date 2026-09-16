import { ConnexionForm } from "@/components/connexion-form";
import { Intro } from "@/components/kit-ui";

export default function Connexion() {
  return (
    <div className="aw-login-page">
      <Intro eyebrow="Votre accès sécurisé" title="Se connecter">
        Recevez un lien personnel par email pour retrouver votre progression,
        vos favoris et l’ensemble du kit.
      </Intro>
      <section className="panel aw-login-panel" aria-label="Connexion par email">
        <ConnexionForm />
      </section>
    </div>
  );
}
