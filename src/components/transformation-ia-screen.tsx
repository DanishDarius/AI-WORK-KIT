import Image from "next/image";
import Link from "next/link";
import { Icon } from "./kit-icons";
import { TransformationBrief } from "./transformation-brief";

const method = [
  ["Comprendre", "Vos équipes, leurs usages et les obstacles à lever.", "Nous examinons les tâches, les outils et les données avec les personnes concernées. Vous repartez avec une cartographie des usages, des frictions et des contraintes."],
  ["Prioriser", "Un premier projet utile, un responsable et un résultat à mesurer.", "Nous comparons l’impact attendu, la faisabilité et les risques pour choisir un cas d’usage concret qui peut réellement être déployé."],
  ["Construire", "Un assistant, un agent IA ou une automatisation dans vos outils.", "La solution est configurée avec vos règles, vos données autorisées et les validations humaines nécessaires."],
  ["Faire adopter", "Des collaborateurs formés et des résultats suivis.", "L’équipe teste la solution sur ses cas réels, apprend à l’utiliser et suit les indicateurs définis au départ."],
];

const faq = [
  ["Que comprend une stratégie de transformation IA ?", "Elle relie les objectifs de l’entreprise, les tâches prioritaires, les données disponibles, les outils, les règles de sécurité et l’adoption par les équipes."],
  ["Par où commencer si l’équipe utilise déjà ChatGPT ?", "Nous partons des usages existants pour distinguer les habitudes utiles, les risques et les tâches qui justifient un système plus structuré."],
  ["Comment mesure-t-on les résultats ?", "Chaque projet reçoit un indicateur simple : temps gagné, délai réduit, qualité améliorée, volume traité ou taux d’adoption."],
  ["Conseil, formation ou système IA ?", "Le diagnostic permet de choisir. Une équipe peut avoir besoin d’un cadre, d’une montée en compétence ou d’une solution directement intégrée à ses outils."],
  ["Quel calendrier prévoir ?", "Le premier cadrage fixe une priorité et un périmètre réaliste. La durée dépend ensuite des données, des intégrations et du nombre d’utilisateurs."],
];

export function TransformationIaScreen() {
  return (
    <div className="aw-strategy-page">
      <nav className="aw-strategy-bread" aria-label="Fil d’Ariane">
        <Link href="/">Accueil</Link><Icon name="chevron" /><span>Transformation IA</span>
      </nav>

      <section className="aw-strategy-hero" aria-labelledby="strategy-title">
        <div className="aw-strategy-hero-copy">
          <p className="aw-systems-kicker">Stratégie et transformation IA</p>
          <h1 id="strategy-title">Un plan IA clair.<br /><span>Des équipes qui l’utilisent.</span></h1>
          <p>On choisit avec vous le premier projet IA qui rapporte, on le construit, et on forme vos équipes jusqu’à ce qu’elles l’utilisent seules.</p>
          <div className="aw-systems-actions">
            <a className="aw-systems-primary" href="#brief">Parler de votre projet <Icon name="arrow" /></a>
            <a className="aw-systems-secondary" href="#methode">Explorer la méthode <Icon name="down" /></a>
          </div>
          <small>AI WORK KIT · Conseil stratégique et mise en œuvre</small>
        </div>
        <div className="aw-strategy-hero-visual">
          <Image src="/brand/transformation-ia-hero.png" alt="Un chemin lumineux relie plusieurs étapes jusqu’à un impact mesurable." width={1680} height={945} priority sizes="(max-width: 850px) 100vw, 55vw" />
          <span>Stratégie <b>→</b> Systèmes IA <b>→</b> Adoption</span>
        </div>
      </section>

      <section className="aw-strategy-ecosystem" aria-label="Écosystème technologique">
        <p>On travaille avec les outils que vous avez déjà</p>
        <div>{["ChatGPT", "Claude", "Gemini", "Microsoft 365", "Google Workspace", "Notion", "Make", "Zapier"].map((tool) => <span key={tool}>{tool}</span>)}</div>
      </section>

      <section className="aw-strategy-method" id="methode" aria-labelledby="strategy-method-title">
        <div className="aw-strategy-section-heading">
          <p className="aw-systems-kicker">01 / De la stratégie à l’action</p>
          <h2 id="strategy-method-title">Quatre étapes.<br /><span>Un projet qui avance.</span></h2>
          <p>Du diagnostic à l’autonomie de vos équipes, chaque étape produit une décision et un livrable concret.</p>
        </div>
        <div className="aw-strategy-method-grid">
          <div className="aw-strategy-method-list">
            {method.map(([title, summary, detail], index) => (
              <details key={title} open={index === 0}>
                <summary><span>0{index + 1}</span><div><h3>{title}</h3><p>{summary}</p></div><b>+</b></summary>
                <p>{detail}</p>
              </details>
            ))}
          </div>
          <div className="aw-strategy-method-card">
            <span>Le parcours de votre projet</span>
            <strong>01 <small>/ 04</small></strong>
            <div className="aw-strategy-orbit"><Icon name="sparkles" size={38} /></div>
            <p>Comprendre avant de choisir la solution.</p>
            <Link href="/systemes-ia">Découvrir les systèmes IA <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>

      <section className="aw-strategy-brief" id="brief" aria-labelledby="brief-title">
        <div className="aw-strategy-section-heading">
          <p className="aw-systems-kicker">02 / À vous de jouer</p>
          <h2 id="brief-title">Votre premier projet<br /><span>commence ici.</span></h2>
          <p>Décrivez votre idée en 4 étapes. On arrive au premier échange en sachant déjà ce qui compte pour vous.</p>
        </div>
        <TransformationBrief />
      </section>

      <section className="aw-strategy-approach" aria-labelledby="approach-title">
        <div>
          <p className="aw-systems-kicker">03 / L’approche AI WORK KIT</p>
          <h2 id="approach-title">Relier la stratégie,<br /><span>les outils et les équipes.</span></h2>
        </div>
        <div className="aw-strategy-approach-copy">
          <p>Nous partons du travail réel. Chaque recommandation doit pouvoir être testée, mesurée et comprise par les personnes qui l’utiliseront.</p>
          <dl>
            <div><dt>01</dt><dd><strong>Le métier</strong><span>Les tâches et les décisions qui créent de la valeur.</span></dd></div>
            <div><dt>02</dt><dd><strong>La technologie</strong><span>Les modèles, données et intégrations réellement nécessaires.</span></dd></div>
            <div><dt>03</dt><dd><strong>L’adoption</strong><span>Des règles claires et une équipe capable de garder la main.</span></dd></div>
          </dl>
        </div>
      </section>

      <section className="aw-strategy-scope" aria-labelledby="scope-title">
        <p className="aw-systems-kicker">Un cadre adapté à votre organisation</p>
        <h2 id="scope-title">Une approche concrète.<br /><span>Des décisions documentées.</span></h2>
        <p>Audit des usages, priorisation, gouvernance des données, choix des outils, construction et accompagnement au changement.</p>
        <ul><li>Diagnostic partagé</li><li>Priorités mesurables</li><li>Validation humaine</li><li>Transmission complète</li></ul>
        <details><summary>Les modalités d’intervention <span>+</span></summary><p>Le périmètre est défini après le brief : atelier de cadrage, sprint ciblé ou accompagnement de transformation plus large selon les besoins.</p></details>
      </section>

      <section className="aw-strategy-faq" aria-labelledby="faq-title">
        <div className="aw-strategy-section-heading">
          <p className="aw-systems-kicker">04 / Questions pratiques</p>
          <h2 id="faq-title">Vos questions,<br /><span>nos réponses.</span></h2>
        </div>
        <div>{faq.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="aw-strategy-final">
        <p className="aw-systems-kicker">La prochaine étape</p>
        <h2>Donnons une forme<br /><span>à votre projet.</span></h2>
        <p>Dites-nous par quoi vous voulez commencer.</p>
        <a href="#brief">Décrire mon projet <Icon name="arrow" /></a>
      </section>
    </div>
  );
}
