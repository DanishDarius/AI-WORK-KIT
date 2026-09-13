"use client";
import { useResource } from "@/lib/kit-api";
import { Back, Intro, ResourceState } from "@/components/kit-ui";
export default function Compte() {
  const { data, error, retry } = useResource<{
    email: string | null;
    membre_depuis: string;
  }>("/api/moi");
  const date = data ? new Date(data.membre_depuis) : null;
  return (
    <>
      <Back />
      <Intro eyebrow="Votre espace personnel" title="Mon compte">
        Les informations associées à votre accès AI WORK KIT.
      </Intro>
      {!data ? (
        <ResourceState error={error} retry={retry} />
      ) : (
        <section className="panel max-w-2xl">
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
        </section>
      )}
    </>
  );
}
