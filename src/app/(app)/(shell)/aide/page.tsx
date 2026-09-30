import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { Page } from "@/components/shell";
import { BoutonChat } from "@/components/support-chat";
import { IconBox, PageHead } from "@/components/ui";
import { fcfa, PRIX, SUPPORT_EMAIL } from "@/lib/offre";

export const metadata: Metadata = { title: "Aide", description: "Une question sur AIW ? Le support répond 24 h/24, 7 j/7, par chat ou par e-mail." };

const QUESTIONS: [string, React.ReactNode][] = [
  ["Que comprend mon accès AIW ?", <>Votre paiement unique ouvre, sans limite de durée, les tâches de tous les métiers avec leurs cas pratiques et leurs prompts, la mise en place pour votre IA, votre kit, votre parcours et <Link href="/bibliotheque?acces=inclus">10 guides de la bibliothèque</Link>.</>],
  ["Que change l’abonnement ?", <>Il ouvre tous les guides, y compris chaque nouveau guide publié, et la tâche sur mesure dans chaque métier. Il coûte {fcfa(PRIX.mensuel)} par mois, {fcfa(PRIX.annuel)} par an ou {fcfa(PRIX.a_vie)} à vie. <Link href="/abonnement">Voir les formules</Link>.</>],
  ["Comment fonctionne la tâche sur mesure ?", <>En bas de votre parcours, décrivez une tâche qui n’est pas dans la liste. L’équipe vous prépare un plan détaillé, étape par étape, avec un prompt prêt pour les IA choisies. Le plan s’affiche au même endroit dès qu’il est prêt.</>],
  ["Comment changer de métier ou d’IA ?", <>Depuis votre parcours : « Changer de métier » en haut, et « Votre IA pour ce métier » dans la colonne de droite (en bas de page sur téléphone).</>],
  ["Comment résilier mon abonnement ?", <>Depuis votre <Link href="/profil#offre">profil</Link>, section Mon offre, ou en écrivant au support. L’accès reste ouvert jusqu’à la fin de la période déjà payée.</>],
  ["Je n’arrive plus à me connecter.", <>Utilisez <Link href="/mot-de-passe-oublie">Mot de passe oublié</Link> avec l’adresse e-mail de votre achat. Si rien n’arrive, vérifiez vos courriers indésirables puis écrivez-nous.</>],
];

export default function Aide() {
  return (
    <Page width="single">
      <PageHead kicker="Aide et support" title="Comment pouvons-nous vous aider ?" />
      <section className="card row" style={{ gap: 20 }}>
        <IconBox name="chat" size="lg" />
        <div className="grow stack-sm" style={{ minWidth: 220 }}>
          <h2 className="h3">Une question ? On vous répond 24 h/24, 7 j/7.</h2>
          <p className="small muted">Par chat dans l’application, ou par e-mail à {SUPPORT_EMAIL}.</p>
        </div>
        <div className="row">
          <BoutonChat>Ouvrir le chat</BoutonChat>
          <a className="btn btn-secondary btn-plain" href={`mailto:${SUPPORT_EMAIL}`}><Icon name="mail" size={18} /> E-mail</a>
        </div>
      </section>
      <section className="stack" aria-labelledby="faq">
        <h2 id="faq" className="h2">Questions fréquentes</h2>
        {QUESTIONS.map(([q, r], i) => (
          <details key={q} className="faq" open={i === 0}>
            <summary>{q}<Icon name="down" size={20} /></summary>
            <p>{r}</p>
          </details>
        ))}
      </section>
    </Page>
  );
}
