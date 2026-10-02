"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@/components/icon";
import { iconeCategorie } from "@/components/parcours";
import { Page } from "@/components/shell";
import { Chip, IconBox, PageHead, ResourceState } from "@/components/ui";
import { AbonnementCard, StatsCard } from "@/components/widgets";
import { category, normalize, useCatalogue, usages } from "@/lib/catalogue";
import { tacheHref } from "@/lib/kit-api";
import { useProfil } from "@/lib/profil";

const PAR_PAGE = 12;

export default function Taches() {
  const { data, error, retry } = useCatalogue();
  const profil = useProfil();
  const [q, setQ] = useState("");
  const [usage, setUsage] = useState("Tout");
  const [metier, setMetier] = useState("tous");
  const [statut, setStatut] = useState<"toutes" | "a-faire" | "faites">("toutes");
  const [limite, setLimite] = useState(PAR_PAGE);

  const liste = useMemo(() => {
    if (!data) return [];
    const recherche = normalize(q.trim());
    return data.taches.filter((t) =>
      (usage === "Tout" || category(t.code) === usage) &&
      (metier === "tous" || t.metiers.some((m) => m.slug === metier)) &&
      (statut === "toutes" || (statut === "faites" ? t.fait : !t.fait)) &&
      (!recherche || normalize(`${t.titre} ${t.code} ${t.metiers.map((m) => m.nom).join(" ")}`).includes(recherche)),
    );
  }, [data, q, usage, metier, statut]);

  return (
    <Page aside={<><StatsCard /><AbonnementCard /></>}>
      <PageHead kicker="Catalogue" title="Toutes les tâches">
        Partez de ce que vous devez faire aujourd’hui. Chaque tâche a son cas concret et son prompt prêt à copier.
      </PageHead>

      <label className="input-icon" htmlFor="recherche-taches">
        <Icon name="search" size={22} />
        <span className="sr-only">Rechercher une tâche</span>
        <input id="recherche-taches" type="search" placeholder="Que voulez-vous faire ? Ex. relancer un client, écrire un devis" value={q} onChange={(e) => { setQ(e.target.value); setLimite(PAR_PAGE); }} />
      </label>

      <div className="row" role="group" aria-label="Filtrer par usage">
        {usages.map((u) => (
          <button key={u} type="button" className="pill" aria-pressed={usage === u} onClick={() => { setUsage(u); setLimite(PAR_PAGE); }}>{u}</button>
        ))}
      </div>

      <div className="row">
        <label className="field" style={{ flexDirection: "row", alignItems: "center" }}>
          <span className="small muted">Métier</span>
          <select className="select" style={{ minHeight: 44, width: "auto" }} value={metier} onChange={(e) => { setMetier(e.target.value); setLimite(PAR_PAGE); }}>
            <option value="tous">Tous les métiers</option>
            {data?.metiers.map((m) => <option key={m.slug} value={m.slug}>{m.nom}</option>)}
          </select>
        </label>
        <div className="seg" role="group" aria-label="Statut" style={{ minWidth: 280 }}>
          <button type="button" aria-pressed={statut === "toutes"} onClick={() => setStatut("toutes")}>Toutes</button>
          <button type="button" aria-pressed={statut === "a-faire"} onClick={() => setStatut("a-faire")}>À faire</button>
          <button type="button" aria-pressed={statut === "faites"} onClick={() => setStatut("faites")}>Faites</button>
        </div>
        {data && <span className="small muted" style={{ marginLeft: "auto" }} role="status">{liste.length} tâche{liste.length > 1 ? "s" : ""}</span>}
      </div>

      {!data ? (
        <ResourceState error={error} retry={retry} />
      ) : liste.length ? (
        <>
          <div className="grid-3">
            {liste.slice(0, limite).map((t) => {
              const cat = category(t.code);
              const slug = t.metiers.find((m) => m.slug === profil?.metier)?.slug ?? t.metiers[0]?.slug ?? "";
              return (
                <Link key={t.id} className="card pad-md card-link" href={tacheHref(t.id, slug)} style={{ minHeight: 190 }}>
                  <div className="row-between">
                    <IconBox name={iconeCategorie[cat] ?? "list"} />
                    {t.fait ? <Chip tone="green" icon="check">Faite</Chip> : t.favori ? <Chip tone="gold" icon="star">Favori</Chip> : null}
                  </div>
                  <span className="strong" style={{ fontSize: 17, lineHeight: 1.3, flexGrow: 1 }}>{t.titre}</span>
                  <span className="row-between tiny muted" style={{ borderTop: "2px solid var(--line)", paddingTop: 10 }}>
                    <span>{cat}</span>
                    <span>{t.metiers.length > 1 ? `${t.metiers.length} métiers` : t.metiers[0]?.nom}</span>
                  </span>
                </Link>
              );
            })}
          </div>
          {limite < liste.length && (
            <div className="row" style={{ justifyContent: "center" }}>
              <button type="button" className="btn btn-secondary" onClick={() => setLimite((l) => l + PAR_PAGE)}>Afficher plus</button>
            </div>
          )}
        </>
      ) : (
        <div className="card empty">
          <h2 className="h3">Aucune tâche ne correspond.</h2>
          <p className="muted">Essayez un autre mot ou retirez un filtre.</p>
          <button type="button" className="btn btn-secondary btn-sm btn-plain" onClick={() => { setQ(""); setUsage("Tout"); setMetier("tous"); setStatut("toutes"); }}>Effacer les filtres</button>
        </div>
      )}
    </Page>
  );
}
