import Link from "next/link";
import type { ReactNode } from "react";
import { PublicFooter, PublicTop, legalPages } from "./public";
import { Kicker } from "./ui";

const LEGAL_UPDATED = "3 octobre 2026";

// Mise en page commune aux pages légales : titre, date de mise à jour,
// sommaire cliquable et navigation entre les trois documents.
export function LegalPage({
  current,
  kicker,
  title,
  intro,
  sections,
  children,
}: {
  current: string;
  kicker: string;
  title: string;
  intro: ReactNode;
  sections: { id: string; title: string }[];
  children: ReactNode;
}) {
  return (
    <>
      <PublicTop action={<Link className="btn btn-secondary btn-sm btn-plain" href="/">Retour à AIW</Link>} />
      <main id="contenu" className="wrap section stack-lg">
        <header className="page-head">
          <Kicker>{kicker}</Kicker>
          <h1 className="h1">{title}</h1>
          <p className="small muted">Dernière mise à jour : {LEGAL_UPDATED}</p>
          <div className="lead">{intro}</div>
        </header>
        <div className="legal">
          <aside className="legal-nav">
            <nav aria-label="Sommaire">
              <p className="kicker">Sommaire</p>
              <ol>
                {sections.map((s) => (
                  <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
                ))}
              </ol>
            </nav>
            <nav aria-label="Autres documents légaux">
              <p className="kicker">Documents</p>
              <ul>
                {legalPages.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} aria-current={p.href === current ? "page" : undefined}>{p.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <div className="legal-body">{children}</div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}

export function LegalSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-titre`}>
      <h2 id={`${id}-titre`}>{title}</h2>
      {children}
    </section>
  );
}
