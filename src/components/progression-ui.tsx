"use client";
import Link from "next/link";
import { Progression, tacheHref, useResource } from "@/lib/kit-api";

export function ProgressBar({
  done,
  total,
  label = "Progression",
}: {
  done: number;
  total: number;
  label?: string;
}) {
  const value = total > 0 ? Math.min(total, Math.max(0, done)) : 0;
  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={total || 1}
      aria-valuenow={value}
      aria-valuetext={`${done} sur ${total} tâches faites`}
    >
      <span style={{ width: `${total > 0 ? (value / total) * 100 : 0}%` }} />
    </div>
  );
}

export function Regularite({
  data,
  compact = false,
}: {
  data: Progression;
  compact?: boolean;
}) {
  return (
    <div className={`regularite ${compact ? "" : "panel"}`}>
      <div>
        {compact ? (
          <p className="text-sm font-semibold">À votre rythme</p>
        ) : (
          <p className="metric-value">
            {data.serie_jours} jour{data.serie_jours > 1 ? "s" : ""}
          </p>
        )}
        <p className="mt-1 text-sm text-[var(--muted)]">
          {compact
            ? data.serie_jours
              ? `${data.serie_jours} jour${data.serie_jours > 1 ? "s" : ""} de pratique d’affilée`
              : "Chaque visite est un pas de plus."
            : "Série actuelle"}
        </p>
      </div>
      <div>
        <ol
          className="activity-dots"
          aria-label="Activité des 7 derniers jours, du plus ancien à aujourd’hui"
        >
          {data.jours_actifs_semaine.map((active, i) => {
            const label = `${i === 6 ? "Aujourd’hui" : `Il y a ${6 - i} jour${i < 5 ? "s" : ""}`} : ${active ? "actif" : "sans activité"}`;
            return (
              <li key={i} className={active ? "is-active" : ""} title={label}>
                <span className="sr-only">{label}</span>
              </li>
            );
          })}
        </ol>
        <p className="mt-2 text-xs text-[var(--muted)]">Ces 7 derniers jours</p>
      </div>
    </div>
  );
}

export function HomeProgression() {
  const { data, error, retry } = useResource<Progression>("/api/progression");
  if (!data)
    return error ? (
      <div className="mb-7 text-sm text-[var(--muted)]" role="status">
        <p>Votre reprise et votre régularité ne sont pas disponibles.</p>
        {error.includes("session") || error.includes("connecté") ? (
          <Link className="text-link mt-2 inline-block" href="/connexion">
            Se connecter
          </Link>
        ) : (
          <button className="text-link mt-2" onClick={retry}>
            Réessayer
          </button>
        )}
      </div>
    ) : null;
  return (
    <div className="aw-home-progress">
      {data.reprise && (
        <section className="panel resume-panel" aria-labelledby="reprise-title">
          <div className="min-w-0">
            <p className="eyebrow" id="reprise-title">
              Reprendre où vous en étiez
            </p>
            <h2>{data.reprise.tache_titre}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {data.reprise.metier_nom}
            </p>
          </div>
          <Link
            className="button shrink-0"
            href={tacheHref(data.reprise.tache_id, data.reprise.metier_slug)}
          >
            Continuer <span aria-hidden="true">→</span>
          </Link>
        </section>
      )}
      <Regularite data={data} compact />
    </div>
  );
}
