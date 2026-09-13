"use client";
import Link from "next/link";
import { useState } from "react";
import {
  api,
  chemins,
  IA,
  iaLabels,
  MetierDetail,
  useResource,
} from "@/lib/kit-api";
import { Back, Badge, Intro, ResourceState } from "./kit-ui";
function Glossaire() {
  const { data, error, retry } =
    useResource<{ terme: string; definition: string }[]>("/api/glossaire");
  return (
    <section className="panel mt-8">
      <p className="eyebrow">Les mots utiles</p>
      <h2 className="mb-4">Le glossaire IA</h2>
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
        <p>Le glossaire n’est pas encore disponible.</p>
      )}
    </section>
  );
}
export function MetierScreen({ slug }: { slug: string }) {
  const endpoint = `/api/metiers/${encodeURIComponent(slug)}`;
  const { data, error, retry, setData } = useResource<MetierDetail>(endpoint);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  async function choose(chemin: IA) {
    if (!data || saving || data.chemin_choisi === chemin) return;
    setSaving(true);
    setMessage("");
    try {
      const result = await api<{ ok: boolean; chemin_choisi: IA }>(
        `${endpoint}/chemin`,
        { method: "POST", body: JSON.stringify({ chemin }) },
      );
      setData({
        ...data,
        chemin_choisi: result.chemin_choisi,
        taches: data.taches.map((t) => ({
          ...t,
          ia_par_defaut: result.chemin_choisi,
        })),
      });
      setMessage(
        `Votre chemin ${iaLabels[result.chemin_choisi]} est enregistré.`,
      );
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Enregistrement impossible.",
      );
    } finally {
      setSaving(false);
    }
  }
  if (!data)
    return (
      <>
        <Back />
        <ResourceState error={error} retry={retry} />
      </>
    );
  return (
    <>
      <Back />
      <Intro eyebrow="Fiche métier" title={data.metier.nom}>
        {data.metier.description}
      </Intro>
      <section className="panel mb-9 border-l-4 border-l-[var(--navy)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Votre chemin IA</p>
            <h2>Avec quelle IA voulez-vous travailler ?</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Ce choix ouvre vos prompts sur cette IA. Vous pouvez le changer à
              tout moment.
            </p>
          </div>
          <Badge ia={data.chemin_choisi} />
        </div>
        <fieldset disabled={saving} className="mt-5 flex flex-wrap gap-3">
          <legend className="sr-only">Choisir votre chemin IA</legend>
          {chemins.map((ia) => (
            <button
              key={ia}
              className="choice-button"
              aria-pressed={data.chemin_choisi === ia}
              onClick={() => choose(ia)}
            >
              <span className={`ia-dot dot-${ia}`} />
              {iaLabels[ia]}
              {data.chemin_choisi === ia && <span aria-hidden="true">✓</span>}
            </button>
          ))}
        </fieldset>
        <p className="mt-3 min-h-5 text-sm text-[var(--muted)]" role="status">
          {saving ? "Enregistrement…" : message}
        </p>
      </section>
      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Passer à la pratique</p>
            <h2>Les tâches de ce métier</h2>
          </div>
          <span className="text-sm text-[var(--muted)]">
            {data.taches.length} tâche{data.taches.length > 1 ? "s" : ""}
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {data.taches.map((t) => (
            <Link
              className="panel card-link"
              key={t.id}
              href={`/taches/${encodeURIComponent(t.id)}?metier=${encodeURIComponent(slug)}`}
            >
              <div className="mb-4 flex items-center justify-between gap-2">
                <span className="eyebrow !mb-0">{t.code}</span>
                <Badge ia={t.ia_par_defaut} />
              </div>
              <h3>{t.titre}</h3>
              {t.limite_connue && (
                <p className="mt-3 text-sm text-amber-800">
                  Limite connue · un point de vigilance à consulter
                </p>
              )}
              <p className="mt-5 text-sm font-semibold text-[var(--navy)]">
                Ouvrir les cas pratiques <span aria-hidden="true">→</span>
              </p>
            </Link>
          ))}
        </div>
        {!data.taches.length && (
          <p className="panel">Aucune tâche disponible pour ce métier.</p>
        )}
      </section>
      <Glossaire />
    </>
  );
}
