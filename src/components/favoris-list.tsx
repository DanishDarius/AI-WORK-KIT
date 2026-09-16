"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { api, Favori, tacheHref, useResource } from "@/lib/kit-api";
import { ResourceState } from "./kit-ui";
import { FavoriButton } from "./tache-actions";

export function FavorisList({ preview = false }: { preview?: boolean }) {
  const { data, error, retry, setData } = useResource<Favori[]>("/api/favoris");
  const pending = useRef(new Set<string>());
  const [message, setMessage] = useState("");
  const [failed, setFailed] = useState(false);
  async function remove(item: Favori) {
    if (!data || pending.current.has(item.tache_id)) return;
    pending.current.add(item.tache_id);
    const index = data.findIndex((f) => f.tache_id === item.tache_id);
    setData((previous) => previous.filter((f) => f.tache_id !== item.tache_id));
    setFailed(false);
    setMessage(`« ${item.tache_titre} » retirée des favoris.`);
    try {
      const result = await api<{ ok: boolean; favori: boolean }>(
        `/api/taches/${encodeURIComponent(item.tache_id)}/favori?metier=${encodeURIComponent(item.metier_slug)}`,
        {
          method: "POST",
          body: JSON.stringify({ favori: false }),
        },
      );
      if (!result.ok || result.favori)
        throw new Error("Le retrait n’a pas été confirmé. Réessayez.");
    } catch (error) {
      setData((previous) => {
        if (previous.some((f) => f.tache_id === item.tache_id)) return previous;
        const restored = [...previous];
        restored.splice(Math.min(index, restored.length), 0, item);
        return restored;
      });
      setFailed(true);
      setMessage(
        `${error instanceof Error ? error.message : "Retrait impossible."} Le favori a été rétabli.`,
      );
    } finally {
      pending.current.delete(item.tache_id);
    }
  }
  return (
    <section aria-label="Mes favoris">
      {preview && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2>Mes favoris</h2>
          <Link href="/favoris" className="text-link">
            Voir tous mes favoris <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
      <p
        className={
          message
            ? `mb-4 text-sm ${failed ? "action-error" : "text-[var(--muted)]"}`
            : "sr-only"
        }
        role={failed ? "alert" : "status"}
      >
        {message}
      </p>
      {!data ? (
        <ResourceState error={error} retry={retry} />
      ) : data.length ? (
        <ul className="grid gap-3">
          {(preview ? data.slice(0, 3) : data).map((item) => (
            <li key={item.tache_id} className="panel favorite-row">
              <Link
                className="favorite-link"
                href={tacheHref(item.tache_id, item.metier_slug)}
              >
                <span className="font-semibold">{item.tache_titre}</span>
                <span className="mt-1 block text-sm text-[var(--muted)]">
                  {item.metier_nom}
                </span>
              </Link>
              <FavoriButton
                favori
                titre={item.tache_titre}
                onClick={() => remove(item)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="panel">
          <h3>Gardez vos tâches utiles à portée de main</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Touchez l’étoile d’une tâche pour la retrouver ici.
          </p>
          <Link href="/metiers" className="text-link mt-4 inline-block">
            Explorer mes métiers <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
    </section>
  );
}
