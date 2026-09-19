import Image from "next/image";
import Link from "next/link";
import { Icon } from "./kit-icons";

const accompagnement = [
  {
    number: "01",
    title: "Diagnostic",
    text: "Nous chiffrons les tâches qui pèsent, puis nous choisissons le premier système à construire.",
  },
  {
    number: "02",
    title: "Construction",
    text: "Nous configurons un système connecté à vos données et aux outils que votre équipe utilise déjà.",
  },
  {
    number: "03",
    title: "Adoption",
    text: "Votre équipe le teste sur ses cas réels. Les usages et les résultats sont suivis.",
  },
  {
    number: "04",
    title: "Transmission",
    text: "La documentation, les accès et les règles de validation restent dans votre entreprise.",
  },
];

export function SystemesIaScreen() {
  return (
    <div className="aw-systems-page">
      <section className="aw-systems-hero" aria-labelledby="systems-title">
        <div className="aw-systems-hero-copy">
          <p className="aw-systems-kicker">Systèmes IA intégrés</p>
          <h1 id="systems-title">
            Votre système IA.<br />
            <span>Intégré de bout en bout.</span>
          </h1>
          <p className="aw-systems-lead">
            Des agents, des automatisations et des workflows IA configurés
            pour votre entreprise, directement dans les outils que votre équipe
            utilise déjà.
          </p>
          <p className="aw-systems-context">
            <Link href="/transformation-ia">Définir votre stratégie de transformation IA&nbsp;→</Link>
          </p>
          <div className="aw-systems-actions">
            <a className="aw-systems-primary" href="#form">
              Parler de mon besoin <Icon name="arrow" />
            </a>
            <a className="aw-systems-secondary" href="#exemple-systeme">
              Voir un exemple <Icon name="down" />
            </a>
          </div>
        </div>
        <div className="aw-systems-hero-visual">
          <Image
            src="/brand/systemes-ia-hero.png"
            alt="Espace de travail AI WORK KIT présentant un parcours IA personnalisé."
            width={1536}
            height={1024}
            sizes="(max-width: 860px) 100vw, 54vw"
            priority
          />
        </div>
      </section>

      <section className="aw-systems-example" id="exemple-systeme" aria-labelledby="example-title">
        <div className="aw-systems-example-head">
          <h2 id="example-title">
            Une tâche vous ralentit.<br />
            <span>Le système poursuit le travail.</span>
          </h2>
          <div>
            <p className="aw-systems-kicker">Exemple · Suivi commercial</p>
            <p>
              Le système retrouve le contexte, prépare une réponse et attend
              votre accord avant chaque envoi.
            </p>
          </div>
        </div>

        <div className="aw-systems-example-visual">
          <Image
            src="/brand/systeme-suivi-client.png"
            alt="Une demande client est analysée, une réponse est préparée puis soumise à validation."
            width={1792}
            height={896}
            sizes="100vw"
          />
        </div>

        <ol className="aw-systems-example-captions">
          <li><strong>Une demande client.</strong><span>Le message arrive avec son contexte et ses données utiles.</span></li>
          <li><strong>Une réponse préparée.</strong><span>L’IA s’appuie sur les informations fiables de l’entreprise.</span></li>
          <li><strong>Vous gardez la main.</strong><span>Un membre de l’équipe vérifie avant l’envoi.</span></li>
        </ol>
      </section>

      <section className="aw-systems-method" aria-labelledby="method-title">
        <div className="aw-systems-method-intro">
          <h2 id="method-title">
            Construit avec vous.<br />
            <span>Prêt pour votre équipe.</span>
          </h2>
          <p>
            Le système, les accès et toute la documentation restent sous le
            contrôle de votre entreprise.
          </p>
          <div className="aw-systems-method-visual">
            <Image
              src="/brand/systemes-ia-methode.png"
              alt="Guide AI WORK KIT pour construire et transmettre un système IA d’entreprise."
              width={1024}
              height={1536}
              sizes="(max-width: 760px) 100vw, 42vw"
            />
          </div>
        </div>

        <ol className="aw-systems-steps">
          {accompagnement.map((etape) => (
            <li key={etape.number}>
              <span>{etape.number}</span>
              <div>
                <h3>{etape.title}</h3>
                <p>{etape.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="aw-systems-contact" id="form" aria-labelledby="systems-contact-title">
        <div className="aw-systems-contact-copy">
          <h2 id="systems-contact-title">
            On commence<br />
            <span>par votre quotidien.</span>
          </h2>
          <p>
            Dites-nous quelle tâche ou quel processus prend trop de temps dans
            votre entreprise.
          </p>
          <small>Nous étudierons le contexte, les outils concernés et le résultat attendu.</small>
        </div>

        <form className="aw-systems-form" aria-label="Demande d’accompagnement personnalisé">
          <div className="aw-systems-form-grid">
            <label>
              <span>Nom</span>
              <input name="name" autoComplete="name" placeholder="Votre nom" required />
            </label>
            <label>
              <span>Email professionnel</span>
              <input name="email" type="email" autoComplete="email" placeholder="vous@entreprise.com" required />
            </label>
            <label>
              <span>Entreprise</span>
              <input name="company" autoComplete="organization" placeholder="Nom de votre entreprise" />
            </label>
            <label>
              <span>Fonction</span>
              <input name="role" autoComplete="organization-title" placeholder="Votre fonction" />
            </label>
            <label>
              <span>Secteur</span>
              <select name="industry" defaultValue="">
                <option value="" disabled>Sélectionner un secteur</option>
                <option>Communication et marketing</option>
                <option>Conseil et services</option>
                <option>Commerce et e-commerce</option>
                <option>Finance et administration</option>
                <option>Ressources humaines</option>
                <option>Autre</option>
              </select>
            </label>
            <label>
              <span>Taille de l’entreprise</span>
              <select name="company-size" defaultValue="">
                <option value="" disabled>Sélectionner une taille</option>
                <option>Indépendant</option>
                <option>2 à 10 personnes</option>
                <option>11 à 50 personnes</option>
                <option>51 personnes et plus</option>
              </select>
            </label>
          </div>
          <label className="aw-systems-form-wide">
            <span>Votre besoin</span>
            <textarea
              name="need"
              rows={5}
              placeholder="La tâche qui vous prend du temps, ce que vous avez déjà essayé, le résultat attendu…"
              required
            />
          </label>
          <label className="aw-systems-form-wide">
            <span>Budget envisagé</span>
            <select name="budget" defaultValue="">
              <option value="" disabled>Sélectionner un budget</option>
              <option>À définir ensemble</option>
              <option>Moins de 500 €</option>
              <option>500 € à 1 500 €</option>
              <option>Plus de 1 500 €</option>
            </select>
          </label>
          <button type="submit">
            Demander mon accompagnement <Icon name="arrow" />
          </button>
        </form>
      </section>
    </div>
  );
}
