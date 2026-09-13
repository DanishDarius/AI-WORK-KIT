"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api, IA, Metier, MetierDetail, useResource } from "@/lib/kit-api";
import { Badge, Intro, ResourceState } from "@/components/kit-ui";
function MetierCard({ metier }: { metier: Metier }) {
  const [choice, setChoice] = useState<{
    value: IA | null;
    loaded: boolean;
    failed?: boolean;
  }>({ value: null, loaded: false });
  useEffect(() => {
    const controller = new AbortController();
    api<MetierDetail>(`/api/metiers/${encodeURIComponent(metier.slug)}`, {
      signal: controller.signal,
    }).then(
      (data) => {
        if (!controller.signal.aborted)
          setChoice({ value: data.chemin_choisi, loaded: true });
      },
      () => {
        if (!controller.signal.aborted)
          setChoice({ value: null, loaded: true, failed: true });
      },
    );
    return () => controller.abort();
  }, [metier.slug]);
  return (
    <Link
      href={`/metiers/${encodeURIComponent(metier.slug)}`}
      className="panel card-link flex h-full flex-col"
    >
      <div className="mb-5 flex items-center justify-between gap-2">
        <span className="eyebrow !mb-0">{metier.nb_taches} tâche{metier.nb_taches > 1 ? "s" : ""}</span>
        <span aria-hidden="true" className="card-arrow">
          ↗
        </span>
      </div>
      <h2>{metier.nom}</h2>
      {metier.description && (
        <p className="mt-3 flex-1 text-sm leading-6 text-[var(--muted)]">
          {metier.description}
        </p>
      )}
      <div className="mt-6">
        {choice.failed ? (
          <span className="text-xs text-[var(--muted)]">
            Consultez votre chemin dans la fiche
          </span>
        ) : choice.loaded ? (
          <Badge ia={choice.value} />
        ) : (
          <span className="text-xs text-[var(--muted)]">
            Chargement du chemin…
          </span>
        )}
      </div>
    </Link>
  );
}
export default function Home() {
  const { data, error, retry } = useResource<Metier[]>("/api/metiers");
  return (
    <>
      <Intro
        eyebrow="Votre espace de travail"
        title="Quel métier pratiquez-vous ?"
      >
        Retrouvez vos tâches professionnelles, choisissez votre IA et passez à
        la pratique avec des prompts prêts à copier.
      </Intro>
      <div className="mb-8 flex flex-wrap gap-x-7 gap-y-2 text-sm text-[var(--navy)]">
        <span>✓ Un chemin IA par métier</span>
        <span>✓ Des cas pour pratiquer</span>
        <span>✓ Des prompts à copier</span>
      </div>
      {!data ? (
        <ResourceState error={error} retry={retry} />
      ) : data.length ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map((m) => (
            <MetierCard key={m.id} metier={m} />
          ))}
        </div>
      ) : (
        <p className="panel">Aucun métier disponible pour le moment.</p>
      )}
    </>
  );
}
