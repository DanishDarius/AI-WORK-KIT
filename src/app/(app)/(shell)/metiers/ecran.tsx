"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@/components/icon";
import { Page } from "@/components/shell";
import { Bar, PageHead, ResourceState } from "@/components/ui";
import { StatsCard } from "@/components/widgets";
import { type Metier, useResource } from "@/lib/kit-api";
import { enregistrerProfil, useProfil } from "@/lib/profil";

export default function Metiers() {
  const router = useRouter();
  const profil = useProfil();
  const { data, error, retry } = useResource<Metier[]>("/api/metiers");

  function choisir(slug: string) {
    enregistrerProfil({ metier: slug });
    router.push("/");
  }

  return (
    <Page aside={<StatsCard />}>
      <PageHead kicker="Métiers" title="Choisissez votre métier">
        Votre parcours suit les tâches de ce métier. Vous pouvez en changer à tout moment.
      </PageHead>
      {!data ? (
        <ResourceState error={error} retry={retry} />
      ) : (
        <div className="grid-2">
          {data.map((m) => {
            const actuel = profil?.metier === m.slug;
            return (
              <button key={m.slug} type="button" className="option" aria-pressed={actuel} onClick={() => choisir(m.slug)} style={{ alignItems: "flex-start" }}>
                <span className="iconbox" aria-hidden="true"><Icon name="path" size={22} /></span>
                <span className="grow stack-sm">
                  <b>{m.nom}</b>
                  <small>{m.taches_faites} tâches faites sur {m.nb_taches}</small>
                  <Bar value={m.nb_taches ? (m.taches_faites / m.nb_taches) * 100 : 0} thin label={`${m.nom} : ${m.taches_faites} sur ${m.nb_taches}`} />
                </span>
              </button>
            );
          })}
        </div>
      )}
    </Page>
  );
}
