"use client";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { api, Recherche as Resultats, tacheHref } from "@/lib/kit-api";

export function Recherche({
  heading,
  description,
  onQueryChange,
}: {
  heading?: string;
  description?: string;
  onQueryChange?: (query: string) => void;
}) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<{
    q: string;
    data?: Resultats;
    error?: string;
  }>({ q: "" });
  const q = query.trim();
  useEffect(() => {
    if (q.length < 2) return;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      api<Resultats>(`/api/recherche?q=${encodeURIComponent(q)}`, {
        signal: controller.signal,
      }).then(
        (data) => {
          if (!controller.signal.aborted) setState({ q, data });
        },
        (error) => {
          if (!controller.signal.aborted)
            setState({
              q,
              error:
                error instanceof Error
                  ? error.message
                  : "Recherche indisponible.",
            });
        },
      );
    }, 300);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [q, attempt]);
  const result = q === state.q ? state : undefined;
  return (
    <section
      className="search-section mb-8"
      aria-label="Rechercher dans AI WORK KIT"
    >
      <div className={heading ? "aw-sectionhead" : undefined}>
        {heading && (
          <div>
            <h2>{heading}</h2>
            <p>{description}</p>
          </div>
        )}
        <label
          className={heading ? "sr-only" : "mb-3 block text-sm font-semibold"}
          htmlFor={id}
        >
          Une tâche ou un mot à retrouver ?
        </label>
        <div className={heading ? "aw-search" : "search-field"}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m16 16 5 5" />
          </svg>
          <input
            id={id}
            type="search"
            value={query}
            placeholder="Rechercher une tâche, un terme du glossaire…"
            aria-describedby={`${id}-hint`}
            aria-controls={`${id}-results`}
            onChange={(event) => {
              setQuery(event.target.value);
              onQueryChange?.(event.target.value.trim());
              if (event.target.value.trim() !== q) setState({ q: "" });
            }}
          />
        </div>
      </div>
      <p id={`${id}-hint`} className="mt-2 text-xs text-[var(--muted)]">
        Dans tous les métiers et le glossaire · 2 caractères minimum
      </p>
      <div id={`${id}-results`}>
        {q.length >= 2 && (
          <div className="panel mt-4">
            {!result?.data ? (
              <div
                role={result?.error ? "alert" : "status"}
                className="text-sm text-[var(--muted)]"
              >
                {result?.error || "Recherche en cours…"}
                {result?.error && (
                  <button
                    className="text-link mt-3 block"
                    onClick={() => {
                      setState({ q: "" });
                      setAttempt((n) => n + 1);
                    }}
                  >
                    Réessayer
                  </button>
                )}
              </div>
            ) : (
              <>
                <p className="mb-5 text-sm text-[var(--muted)]" role="status">
                  {result.data.taches.length + result.data.glossaire.length ===
                  0
                    ? `Aucun résultat pour « ${q} ». Essayez un autre mot.`
                    : `${result.data.taches.length + result.data.glossaire.length} résultat(s) pour « ${q} »`}
                </p>
                <div className="grid gap-7 md:grid-cols-2">
                  <section aria-labelledby={`${id}-taches`}>
                    <h2 id={`${id}-taches`} className="mb-3">
                      Tâches{" "}
                      <span className="result-count">
                        {result.data.taches.length}
                      </span>
                    </h2>
                    {result.data.taches.length ? (
                      <ul className="result-list">
                        {result.data.taches.map((t) => (
                          <li key={`${t.id}-${t.metier_slug}`}>
                            <Link
                              href={tacheHref(t.id, t.metier_slug)}
                              className="search-result"
                            >
                              <span className="font-semibold">{t.titre}</span>
                              <span className="mt-1 block text-xs text-[var(--muted)]">
                                {t.code} · {t.metier_nom}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-[var(--muted)]">
                        Aucune tâche correspondante.
                      </p>
                    )}
                  </section>
                  <section aria-labelledby={`${id}-glossaire`}>
                    <h2 id={`${id}-glossaire`} className="mb-3">
                      Glossaire{" "}
                      <span className="result-count">
                        {result.data.glossaire.length}
                      </span>
                    </h2>
                    {result.data.glossaire.length ? (
                      result.data.glossaire.map((g) => (
                        <details className="glossary-item" key={g.terme}>
                          <summary>{g.terme}</summary>
                          <p className="pb-4 text-sm leading-7 text-[var(--muted)] whitespace-pre-wrap">
                            {g.definition}
                          </p>
                        </details>
                      ))
                    ) : (
                      <p className="text-sm text-[var(--muted)]">
                        Aucun terme correspondant.
                      </p>
                    )}
                  </section>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
