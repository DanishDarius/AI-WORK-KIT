"use client";
import Link from "next/link";
import { IA, iaLabels, useResource } from "@/lib/kit-api";
export { Shell } from "./kit-shell";
export function Badge({ ia }: { ia: IA | null }) {
  return (
    <span className={`badge ${ia ? `badge-${ia}` : "badge-neutral"}`}>
      {ia ? iaLabels[ia] : "IA à choisir"}
    </span>
  );
}
export function Intro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {children && (
        <div className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">
          {children}
        </div>
      )}
    </div>
  );
}
export function ResourceState({
  error,
  retry,
}: {
  error?: string;
  retry: () => void;
}) {
  const needsLogin = error?.includes("session") || error?.includes("connecté");
  return (
    <div className="panel py-12" role={error ? "alert" : "status"}>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="aw-skeleton" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      )}
      {!error && <span className="sr-only">Chargement en cours</span>}
      {error ? (
              needsLogin ? (
                  <Link className="button mt-5" href="/connexion">
            Se connecter
          </Link>
        ) : (
          <button className="button mt-5" onClick={retry}>
            Réessayer
          </button>
        )
      ) : null}
    </div>
  );
}
export function Back({
  href = "/metiers",
  children = "Tous les métiers",
}: {
  href?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link href={href} className="back-link">
      ← {children}
    </Link>
  );
}
// Liste du glossaire IA (table `glossaire`, identique pour tous les métiers).
// Utilisée à la fois sur une fiche métier et sur la page "Comprendre les IA".
export function GlossaireList({
  title = "Les mots de l’IA, expliqués simplement",
  eyebrow = "Glossaire",
}: {
  title?: string;
  eyebrow?: string;
}) {
  const { data, error, retry } =
    useResource<{ terme: string; definition: string }[]>("/api/glossaire");
  return (
    <section className="panel mt-8">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mb-4">{title}</h2>
      {!data ? (
        <ResourceState error={error} retry={retry} />
      ) : data.length ? (
        data.map((item, i) => (
          <details className="glossary-item" key={`${item.terme}-${i}`}>
            <summary>{item.terme}</summary>
            <p className="whitespace-pre-wrap pb-5 text-sm leading-7 text-[var(--muted)]">
              {item.definition}
            </p>
          </details>
        ))
      ) : (
        <p>Le glossaire arrive bientôt.</p>
      )}
    </section>
  );
}
