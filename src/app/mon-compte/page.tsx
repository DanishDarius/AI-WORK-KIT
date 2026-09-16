"use client";
import { Progression, useResource } from "@/lib/kit-api";
import { Back, Intro, ResourceState } from "@/components/kit-ui";
import { ProgressBar, Regularite } from "@/components/progression-ui";
import { FavorisList } from "@/components/favoris-list";
import { SignOutButton } from "@/components/account-actions";
export default function Compte() {
  const progression = useResource<Progression>("/api/progression");
  const { data, error, retry } = useResource<{
    email: string | null;
    membre_depuis: string;
  }>("/api/moi");
  const date = data ? new Date(data.membre_depuis) : null;
  return (
    <>
      <Back />
      <Intro eyebrow="Votre espace personnel" title="Ma progression">
        Retrouvez votre avancement et poursuivez votre pratique à votre rythme.
      </Intro>
      <div className="aw-personal space-y-8">
        {!progression.data ? (
          <ResourceState error={progression.error} retry={progression.retry} />
        ) : (
          <section aria-label="Votre progression globale" className="space-y-4">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="panel metric-panel">
                <p className="metric-value">
                  {progression.data.taches_faites_total}
                  <span className="metric-total">
                    /{progression.data.taches_total}
                  </span>
                </p>
                <h2 className="metric-label">Tâches faites</h2>
                <ProgressBar
                  done={progression.data.taches_faites_total}
                  total={progression.data.taches_total}
                  label="Progression de toutes les tâches"
                />
              </div>
              <div className="panel metric-panel">
                <p className="metric-value">
                  {progression.data.metiers_termines}
                  <span className="metric-total">
                    /{progression.data.metiers_total}
                  </span>
                </p>
                <h2 className="metric-label">Métiers terminés</h2>
              </div>
            </div>
            <Regularite data={progression.data} />
          </section>
        )}
        <FavorisList preview />
        {!data ? (
          <ResourceState error={error} retry={retry} />
        ) : (
          <section className="panel">
            <h2>Informations du compte</h2>
            <dl className="mt-6 divide-y divide-[var(--border)]">
              <div className="py-4">
                <dt className="eyebrow">Adresse email</dt>
                <dd className="break-all">{data.email || "Non renseignée"}</dd>
              </div>
              <div className="py-4">
                <dt className="eyebrow">Membre depuis</dt>
                <dd>
                  {date && !Number.isNaN(date.getTime())
                    ? new Intl.DateTimeFormat("fr-FR", {
                        dateStyle: "long",
                        timeZone: "UTC",
                      }).format(date)
                    : "Non renseigné"}
                </dd>
              </div>
            </dl>
            <SignOutButton />
          </section>
        )}
      </div>
    </>
  );
}
