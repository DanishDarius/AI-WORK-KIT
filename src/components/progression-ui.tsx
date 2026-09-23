"use client";
import Link from "next/link";
import { useState } from "react";
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
            : "Série en cours"}
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

// Module de progression affiché sur l'accueil : la série de jours et la
// prochaine étape restent visibles sans aller dans "Ma progression".
export function ProgressDock({
  metiers,
}: {
  metiers?: { slug: string; nom: string; nb_taches: number; taches_faites: number }[];
}) {
  const { data } = useResource<Progression>("/api/progression");
  // Lu au premier rendu client : tant que `data` est absent (y compris côté
  // serveur), le module ne s'affiche pas, donc aucun écart d'hydratation.
  const [hidden, setHidden] = useState(() => {
    try {
      return (
        typeof window !== "undefined" &&
        sessionStorage.getItem("aw-dock-hidden") === "1"
      );
    } catch {
      return false;
    }
  });
  if (!data || hidden) return null;
  const next = (metiers || [])
    .filter((m) => m.taches_faites > 0 && m.taches_faites < m.nb_taches)
    .sort(
      (a, b) =>
        a.nb_taches - a.taches_faites - (b.nb_taches - b.taches_faites),
    )[0];
  const left = next ? next.nb_taches - next.taches_faites : 0;
  const href = data.reprise
    ? tacheHref(data.reprise.tache_id, data.reprise.metier_slug)
    : next
      ? `/metiers/${encodeURIComponent(next.slug)}`
      : "/metiers";
  const days = data.serie_jours;
  return (
    <aside className="aw-dock" aria-label="Votre progression">
      <button
        type="button"
        className="aw-dock-close"
        aria-label="Masquer ce module"
        onClick={() => {
          setHidden(true);
          try {
            sessionStorage.setItem("aw-dock-hidden", "1");
          } catch {}
        }}
      >
        ×
      </button>
      <div className="aw-dock-head">
        <span>Votre série</span>
        <strong>
          {days} jour{days > 1 ? "s" : ""}
        </strong>
      </div>
      <ol
        className="aw-dock-days"
        aria-label="Activité des 7 derniers jours, du plus ancien à aujourd'hui"
      >
        {data.jours_actifs_semaine.map((active, i) => (
          <li key={i} className={active ? "is-active" : ""}>
            <span className="sr-only">
              {i === 6 ? "Aujourd'hui" : `Il y a ${6 - i} jour${i < 5 ? "s" : ""}`}
              {active ? " : actif" : " : sans activité"}
            </span>
          </li>
        ))}
      </ol>
      <div className="aw-dock-next">
        {next ? (
          <>
            <p>
              Plus que {left} tâche{left > 1 ? "s" : ""}
            </p>
            <strong>et {next.nom} est terminé.</strong>
            <ProgressBar
              done={next.taches_faites}
              total={next.nb_taches}
              label={`Progression : ${next.nom}`}
            />
          </>
        ) : data.reprise ? (
          <>
            <p>Reprendre là où vous étiez</p>
            <strong>{data.reprise.tache_titre}</strong>
          </>
        ) : (
          <>
            <p>{days ? "Gardez le rythme" : "Lancez votre série"}</p>
            <strong>Une tâche par jour suffit : 10 minutes, un prompt prêt.</strong>
          </>
        )}
      </div>
      <Link className="aw-dock-cta" href={href}>
        {data.reprise ? "Continuer ma tâche" : "Faire ma tâche du jour"}{" "}
        <span aria-hidden="true">→</span>
      </Link>
    </aside>
  );
}
