"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import type { GuideSummary } from "@/lib/guides";
import {
  lireGuidesEnregistres,
  retirerGuideEnregistre,
  subscribeSavedGuides,
} from "./guide-actions";

type GuideLien = Pick<GuideSummary, "slug" | "title" | "tool" | "duration">;

// Guides enregistrés avec le bouton "Enregistrer" d'un guide. La liste vit
// dans le navigateur (localStorage) : elle est propre à cet appareil.
export function SavedGuides({ guides }: { guides: GuideLien[] }) {
  const brut = useSyncExternalStore(
    subscribeSavedGuides,
    lireGuidesEnregistres,
    () => null,
  );
  if (brut === null) return null;
  let slugs: string[] = [];
  try {
    slugs = JSON.parse(brut) as string[];
  } catch {
    slugs = [];
  }
  const parSlug = new Map(guides.map((g) => [g.slug, g]));
  // Du plus récemment enregistré au plus ancien.
  const liste = [...slugs]
    .reverse()
    .map((slug) => parSlug.get(slug))
    .filter((g): g is GuideLien => Boolean(g));

  return (
    <section className="aw-saved-guides" aria-labelledby="guides-enregistres">
      <h2 id="guides-enregistres">Guides enregistrés</h2>
      {liste.length ? (
        <ul className="grid gap-3">
          {liste.map((g) => (
            <li key={g.slug} className="panel favorite-row">
              <Link className="favorite-link" href={`/guides/${g.slug}`}>
                <span className="font-semibold">{g.title}</span>
                <span className="mt-1 block text-sm text-[var(--muted)]">
                  {g.tool} · {g.duration}
                </span>
              </Link>
              <button
                type="button"
                className="aw-saved-remove"
                onClick={() => retirerGuideEnregistre(g.slug)}
                aria-label={`Retirer « ${g.title} » des guides enregistrés`}
              >
                Retirer
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="panel aw-saved-empty">
          <p>
            Aucun guide enregistré. Sur un guide, cliquez sur « Enregistrer »
            pour le retrouver ici.
          </p>
          <Link className="text-link" href="/bibliotheque">
            Parcourir la bibliothèque <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
    </section>
  );
}
