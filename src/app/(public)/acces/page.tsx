import type { Metadata } from "next";
import { ActionAcces, AvisCompteInactif, LienDejaClient } from "@/components/acces-compte";
import { Icon } from "@/components/icon";
import { PublicFooter, PublicTop } from "@/components/public";
import { Media } from "@/components/media";
import { CheckList, Chip, IconBox, Kicker } from "@/components/ui";
import { EXEMPLE_RESSOURCE, EXEMPLE_TACHE } from "@/lib/exemple-acces";
import { remplirGabarit } from "@/lib/gabarit";
import { SLOGAN, SLOGAN_PARTIES } from "@/lib/marque";
import { fcfa, FORMULES, LIEN_ACCES, NB_METIERS, NB_TACHES, PRIX, VIDEO_DEMO_ID } from "@/lib/offre";

export const metadata: Metadata = {
  title: SLOGAN,
  description: "Pour votre métier : des tâches concrètes, des consignes déjà écrites pour ChatGPT, Claude et Gemini, et un kit prêt à installer. Accès 5 000 FCFA.",
};

const CONTENU = [
  { icon: "list", titre: `${NB_TACHES} tâches de votre quotidien`, texte: "Chacune avec deux cas concrets et une consigne déjà écrite : vous la remplissez avec vos informations, pour ChatGPT, Claude ou Gemini." },
  { icon: "kit", titre: "Un kit par métier", texte: "Une configuration pour votre IA, quatre skills, quatre documents et deux routines. Vous les installez pas à pas, et vous cochez ce qui est fait." },
  { icon: "path", titre: "Un parcours par métier", texte: `${NB_METIERS} métiers. Vous avancez tâche après tâche et vous voyez votre progression.` },
  { icon: "book", titre: "Une bibliothèque de guides", texte: "292 guides pour aller plus loin, dont 10 inclus dans l’accès." },
  { icon: "phone", titre: "Pensé pour le téléphone", texte: "Installable comme une application. Chaque tâche dit si la version gratuite de votre IA suffit et si elle se fait sur un téléphone." },
  { icon: "chat", titre: "Un support qui répond", texte: "Par e-mail avec l’accès. Par chat aussi avec l’abonnement." },
] as const;

const METIERS = ["Commerce et vente en ligne", "Indépendant, prestataire de services", "Vente, commercial", "Comptabilité", "Secrétariat, administration", "Service clientèle", "Marketing", "Communication", "Ressources humaines", "Logistique", "BTP, gestion de chantier", "Journalisme", "Graphisme", "Montage vidéo"];

// La consigne de l'exemple, remplie avec les valeurs du cas (même fonction que dans l'application).
const CONSIGNE_EXEMPLE = remplirGabarit(
  EXEMPLE_TACHE.modele.gabarit,
  EXEMPLE_TACHE.modele.champs.map((c) => ({ cle: c.cle, requis: c.requis })),
  Object.fromEntries(EXEMPLE_TACHE.modele.champs.map((c) => [c.cle, c.exemple])),
);

const FAQ = [
  { q: "Faut-il payer ChatGPT, Claude ou Gemini ?", r: "Non. Les tâches fonctionnent avec les versions gratuites. Quand une version payante apporte un vrai plus, c’est indiqué." },
  { q: "Est-ce que ça marche sur mon téléphone ?", r: "Oui. AIW s’ouvre dans le navigateur et s’installe comme une application sur Android et sur iPhone." },
  { q: "Comment je paie ?", r: "Par Mobile Money ou par carte, sur la page de paiement sécurisée de Chariow. Votre compte est créé dès que le paiement est confirmé : vous recevez un e-mail pour choisir votre mot de passe." },
  { q: "Puis-je être remboursé ?", r: "Non, l’accès n’est pas remboursable. C’est pourquoi tout ce qu’il contient est détaillé sur cette page avant l’achat." },
  { q: "Qu’est-ce qu’un kit ?", r: "Ce que vous installez une fois dans votre IA pour qu’elle connaisse votre travail : une configuration, des skills (des méthodes de travail que l’IA garde en mémoire), des documents prêts à remplir et des routines. Un exemple est affiché en entier sur cette page." },
  { q: "Et l’abonnement ?", r: "Il se prend depuis la plateforme, une fois l’accès obtenu. Il ouvre tous les guides, à télécharger et à revendre, le sur-mesure et le chat du support. Formules au mois, à l’année ou à vie, payées une seule fois, sans prélèvement automatique." },
];

function Phone() {
  const steps: { state: string; icon: "check" | "tag" | "chat" | "lock" }[] = [
    { state: "is-done", icon: "check" },
    { state: "is-current", icon: "chat" },
    { state: "", icon: "tag" },
    { state: "", icon: "lock" },
  ];
  return (
    <div className="phone-mock" aria-hidden="true">
      <div>
        <div style={{ padding: "18px 16px 12px", background: "#fff", borderBottom: "2px solid var(--line)" }}>
          <p className="kicker" style={{ fontSize: 10.5 }}>Organisation</p>
          <p className="strong" style={{ fontSize: 17 }}>Gestion et tri des e-mails</p>
        </div>
        <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 22, paddingTop: 26 }}>
          {steps.map((s, i) => (
            <span key={i} className={`node is-sm ${s.state}`} style={{ transform: `translateX(${[0, 44, -30, 20][i]}px)` }}>
              <Icon name={s.icon === "tag" ? "writing" : s.icon} size={24} strokeWidth={2.4} />
            </span>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-around", padding: "10px 6px 14px", borderTop: "2px solid var(--line)", background: "#fff", color: "var(--muted)" }}>
          <span style={{ color: "var(--green)" }}><Icon name="path" size={22} /></span>
          <Icon name="list" size={22} />
          <Icon name="kit" size={22} />
          <Icon name="user" size={22} />
        </div>
      </div>
    </div>
  );
}

// Page statique (règle C3) : aucune lecture de session ni de cookie ici. Ce
// qui dépend du visiteur est décidé dans le navigateur (acces-compte.tsx).
export default function Acces() {
  return (
    <>
      <PublicTop
        nav={[
          { href: "#contenu", label: "Contenu" },
          { href: "#exemple", label: "Exemple" },
          { href: "#offres", label: "Offres" },
          { href: "#questions", label: "Questions" },
        ]}
        action={<ActionAcces />}
      />
      <main id="contenu-principal">
        <AvisCompteInactif />

        <section className="hero">
          <div className="wrap hero-grid">
            <div className="stack-lg">
              <div className="chips">
                <Chip tone="green">Salariés</Chip>
                <Chip tone="green">Indépendants</Chip>
                <Chip tone="green">Commerçants</Chip>
              </div>
              <h1>{SLOGAN_PARTIES[0]} <em>{SLOGAN_PARTIES[1]}.</em></h1>
              <p className="lead" style={{ fontSize: 19 }}>
                Choisissez une tâche de votre métier. AIW vous donne le cas concret, la consigne
                déjà écrite pour ChatGPT, Claude ou Gemini, et le kit à installer dans votre IA.
                Rien à chercher ailleurs.
              </p>
              <div className="row">
                <a className="btn btn-lg" href={LIEN_ACCES}>Obtenir l’accès · {fcfa(PRIX.acces)}</a>
                <a className="btn btn-secondary btn-lg btn-plain" href="#exemple">Voir un exemple</a>
              </div>
              <div className="row small muted">
                <span className="row" style={{ gap: 6 }}><Icon name="phone" size={16} /> Paiement Mobile Money</span>
                <span className="row" style={{ gap: 6 }}><Icon name="bolt" size={16} /> Accès immédiat</span>
                <span className="row" style={{ gap: 6 }}><Icon name="check" size={16} /> Versions gratuites des IA suffisantes</span>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Phone />
            </div>
          </div>
        </section>

        <section id="contenu" className="wrap section stack-lg">
          <div className="page-head">
            <Kicker>Contenu</Kicker>
            <h2 className="h1">Tout ce qu’il faut, au même endroit.</h2>
          </div>
          <div className="grid-3">
            {CONTENU.map((c) => (
              <article key={c.titre} className="card stack">
                <IconBox name={c.icon} />
                <h3 className="h3">{c.titre}</h3>
                <p className="muted">{c.texte}</p>
              </article>
            ))}
          </div>
          <div className="card stack">
            <h3 className="h3">{NB_METIERS} métiers déjà couverts</h3>
            <div className="chips">
              {METIERS.map((m) => <Chip key={m}>{m}</Chip>)}
            </div>
          </div>
        </section>

        <section id="exemple" className="wrap section stack-lg" style={{ paddingTop: 0 }}>
          <div className="page-head">
            <Kicker>Exemple</Kicker>
            <h2 className="h1">Une tâche, du début à la fin.</h2>
            <p className="lead">
              Voici une vraie tâche d’AIW, telle que vous la trouvez après l’achat : « {EXEMPLE_TACHE.titre} »,
              du kit « Commerce et vente en ligne ». Rien n’est caché : le cas, la consigne, le résultat
              et une ressource du kit sont affichés en entier. Chaque tâche suit ce déroulé.
            </p>
          </div>

          {VIDEO_DEMO_ID && (
            <div style={{ maxWidth: 760 }}>
              <Media media={{ type: "youtube", id: VIDEO_DEMO_ID, title: "Une tâche d’AIW, du début à la fin", credit: "Vidéo : AIW. Elle se charge seulement si vous la lancez." }} />
            </div>
          )}

          <article className="card stack">
            <div className="chips">
              <Chip tone="green">1 · Le cas concret</Chip>
              <Chip>{EXEMPLE_TACHE.cas.lieu}</Chip>
            </div>
            <h3 className="h2">{EXEMPLE_TACHE.cas.titre}</h3>
            <p>{EXEMPLE_TACHE.cas.contexte}</p>
            <div className="stack-sm">
              <span className="field-label">Les données</span>
              <ul className="steps" style={{ listStyle: "disc" }}>
                {EXEMPLE_TACHE.cas.donnees.split("\n").filter(Boolean).map((ligne) => <li key={ligne}>{ligne.replace(/^- /, "")}</li>)}
              </ul>
            </div>
            <div className="stack-sm">
              <span className="field-label">Le travail à faire</span>
              <p>{EXEMPLE_TACHE.cas.travail}</p>
            </div>
          </article>

          <article className="card stack">
            <div className="chips"><Chip tone="green">2 · La consigne déjà écrite</Chip></div>
            <h3 className="h2">Vous remplissez cinq champs, la consigne se complète.</h3>
            <p className="muted">Une consigne, ou prompt, est le texte que l’on écrit à l’IA pour lui demander un travail. Ici, les champs sont remplis avec les chiffres du cas.</p>
            <dl className="grid-2" style={{ margin: 0 }}>
              {EXEMPLE_TACHE.modele.champs.map((c) => (
                <div key={c.cle} className="card pad-sm stack-sm" style={{ gap: 2 }}>
                  <dt className="small muted">{c.libelle}</dt>
                  <dd className="strong" style={{ margin: 0 }}>{c.exemple}</dd>
                </div>
              ))}
            </dl>
            <div className="prompt-panel">
              <header><span className="kicker is-light">La consigne, prête à copier</span></header>
              <pre>{CONSIGNE_EXEMPLE}</pre>
            </div>
          </article>

          <article className="card is-mint stack">
            <div className="chips"><Chip tone="green">3 · Le résultat à vérifier</Chip></div>
            <h3 className="h2">Ce que vous devez obtenir</h3>
            <p>{EXEMPLE_TACHE.resultat}</p>
            <div className="stack-sm">
              <span className="field-label">Pour ce cas</span>
              <p className="strong">{EXEMPLE_TACHE.cas.reponse}</p>
            </div>
            <div className="notice" role="note">
              <span style={{ flex: "none", display: "inline-flex" }}><Icon name="help" size={20} /></span>
              <p>{EXEMPLE_TACHE.modele.avertissement} Le kit contient le document « Prix et marge », qui refait le calcul.</p>
            </div>
          </article>

          <article className="card stack">
            <div className="chips">
              <Chip tone="green">4 · Une ressource du kit, en entier</Chip>
              <Chip>Configuration pour ChatGPT</Chip>
            </div>
            <h3 className="h2">{EXEMPLE_RESSOURCE.titre}</h3>
            <p>{EXEMPLE_RESSOURCE.description}</p>
            <div className="prompt-panel">
              <header><span className="kicker is-light">Le texte à coller dans votre IA</span></header>
              <pre>{EXEMPLE_RESSOURCE.contenu}</pre>
            </div>
            <div className="stack-sm">
              <span className="field-label">Comment l’installer dans ChatGPT</span>
              <ol className="steps">
                {EXEMPLE_RESSOURCE.etapes.map((etape) => <li key={etape}>{etape}</li>)}
              </ol>
              <p className="small"><b>Avec un compte gratuit.</b> {EXEMPLE_RESSOURCE.gratuit}</p>
              <p className="small"><b>Sur téléphone.</b> {EXEMPLE_RESSOURCE.telephone}</p>
            </div>
            <p className="small muted">La même configuration existe pour Claude et pour Gemini. Chaque kit contient aussi quatre skills, quatre documents et deux routines.</p>
          </article>

          <div className="row">
            <a className="btn btn-lg" href={LIEN_ACCES}>Obtenir l’accès · {fcfa(PRIX.acces)}</a>
          </div>
        </section>

        <section id="offres" style={{ background: "var(--paper)", borderBlock: "2px solid var(--line)" }}>
          <div className="wrap section stack-lg">
            <div className="page-head">
              <Kicker>Offres</Kicker>
              <h2 className="h1">Une porte d’entrée, un abonnement pour tout.</h2>
            </div>
            <div className="grid-2">
              <article className="card stack">
                <Chip tone="green">Porte d’entrée</Chip>
                <h3 className="h2">Accès AIW</h3>
                <p><span className="strong" style={{ fontSize: 40, fontWeight: 900 }}>{fcfa(PRIX.acces)}</span> <span className="muted">paiement unique</span></p>
                <CheckList items={[
                  { label: `Les ${NB_TACHES} tâches, avec leurs cas concrets et leurs consignes à remplir` },
                  { label: "Le kit de chaque métier : configuration, skills, documents, routines" },
                  { label: "La mise en place pour ChatGPT, Claude et Gemini" },
                  { label: "Le parcours de votre métier et votre progression" },
                  { label: "10 guides de la bibliothèque" },
                  { label: "Le support par e-mail" },
                ]} />
                <a className="btn btn-lg btn-block" href={LIEN_ACCES}>Obtenir l’accès</a>
              </article>
              <article className="card is-orange stack">
                <Chip tone="orange">Tout AIW</Chip>
                <h3 className="h2">Abonnement</h3>
                <div className="row" style={{ alignItems: "stretch" }}>
                  {FORMULES.map((f) => (
                    <div key={f.id} className="price">
                      <b>{new Intl.NumberFormat("fr-FR").format(f.prix).replace(/\s/g, " ")} <span className="small">FCFA</span></b>
                      <small>{f.unite}</small>
                    </div>
                  ))}
                </div>
                <CheckList tone="orange" items={[
                  { label: "Tout ce que contient l’accès" },
                  { label: "Tous les guides, à télécharger et à revendre" },
                  { label: "La tâche de la semaine, un pack de tâches par mois et les mises à jour des IA" },
                  { label: "8 tâches et 2 métiers sur mesure par mois" },
                  { label: "Le chat du support" },
                ]} />
                <p className="small muted">L’abonnement se prend depuis la plateforme, une fois l’accès obtenu.</p>
              </article>
            </div>
            <p className="small muted">Paiement par Mobile Money ou par carte via Chariow. Aucun remboursement : prenez le temps de lire ce que contient chaque offre.</p>
          </div>
        </section>

        <section id="questions" className="wrap section stack" style={{ maxWidth: 900 }}>
          <Kicker>Questions</Kicker>
          <h2 className="h1" style={{ marginBottom: 8 }}>Questions fréquentes</h2>
          {FAQ.map((f, i) => (
            <details key={f.q} className="faq" open={i === 0}>
              <summary>{f.q}<Icon name="down" size={20} /></summary>
              <p>{f.r}</p>
            </details>
          ))}
          <div className="row" style={{ marginTop: 12 }}>
            <a className="btn btn-lg" href={LIEN_ACCES}>Obtenir l’accès · {fcfa(PRIX.acces)}</a>
            <LienDejaClient />
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
