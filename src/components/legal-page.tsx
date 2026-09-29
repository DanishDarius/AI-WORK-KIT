import Link from "next/link";
import type { ReactNode } from "react";

export const LEGAL_UPDATED = "28 septembre 2026";

export const legalPages = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/conditions", label: "Conditions générales" },
  { href: "/confidentialite", label: "Confidentialité et cookies" },
];

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
    <article className="aw-legal">
      <header className="aw-legal-head">
        <p className="aw-legal-kicker">{kicker}</p>
        <h1>{title}</h1>
        <p className="aw-legal-updated">Dernière mise à jour : {LEGAL_UPDATED}</p>
        <div className="aw-legal-intro">{intro}</div>
      </header>

      <div className="aw-legal-layout">
        <aside className="aw-legal-aside">
          <nav aria-label="Sommaire">
            <p>Sommaire</p>
            <ol>
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ol>
          </nav>
          <nav aria-label="Autres documents légaux" className="aw-legal-docs">
            <p>Documents</p>
            <ul>
              {legalPages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} aria-current={p.href === current ? "page" : undefined}>
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <div className="aw-legal-body">{children}</div>
      </div>
    </article>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="aw-legal-section" aria-labelledby={`${id}-titre`}>
      <h2 id={`${id}-titre`}>{title}</h2>
      {children}
    </section>
  );
}
