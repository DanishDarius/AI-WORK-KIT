"use client";

import Link from "next/link";
import { useState } from "react";
import { category } from "@/lib/catalogue";
import { api, chemins, type IA, iaLabels, type MetierDetail, tacheHref, useResource } from "@/lib/kit-api";
import { Icon, type IconName } from "./icon";
import { Page } from "./shell";
import { TacheSurMesure } from "./tache-sur-mesure";
import { Bar, Chip, ResourceState } from "./ui";
import { AbonnementCard, ReprendreCard, StatsCard } from "./widgets";

export const iconeCategorie: Record<string, IconName> = {
  Organisation: "calendar",
  Rédaction: "writing",
  Analyse: "analysis",
  Création: "creative",
  "Relation client": "messages",
};

// Décalage horizontal des étapes, pour dessiner un chemin qui serpente.
const DECALAGES = [0, 90, 130, 80, 0, -90, -130, -80];

type Section = { nom: string; taches: MetierDetail["taches"] };

function sections(taches: MetierDetail["taches"]): Section[] {
  const liste: Section[] = [];
  for (const tache of taches) {
    const nom = category(tache.code);
    const existante = liste.find((s) => s.nom === nom);
    if (existante) existante.taches.push(tache);
    else liste.push({ nom, taches: [tache] });
  }
  return liste;
}

function ChoixIA({ slug, actuel, onChange }: { slug: string; actuel: IA | null; onChange: (ia: IA) => void }) {
  const [erreur, setErreur] = useState("");
  async function choisir(ia: IA) {
    const precedent = actuel;
    onChange(ia);
    setErreur("");
    try {
      await api(`/api/metiers/${encodeURIComponent(slug)}/chemin`, { method: "POST", body: JSON.stringify({ chemin: ia }) });
    } catch (e) {
      if (precedent) onChange(precedent);
      setErreur(e instanceof Error ? e.message : "Le choix n’a pas été enregistré.");
    }
  }
  return (
    <section className="card pad-md stack" aria-labelledby="choix-ia">
      <h3 id="choix-ia" className="h3">Votre IA pour ce métier</h3>
      <div className="seg" role="group" aria-label="Choisir votre IA">
        {chemins.map((ia) => (
          <button key={ia} type="button" aria-pressed={actuel === ia} onClick={() => choisir(ia)}>{iaLabels[ia]}</button>
        ))}
      </div>
      <p className="small muted">{erreur || "Les prompts et la mise en place s’adaptent à ce choix."}</p>
    </section>
  );
}

export function Parcours({ slug }: { slug: string }) {
  const { data, error, retry, setData } = useResource<MetierDetail>(`/api/metiers/${encodeURIComponent(slug)}`);

  if (!data)
    return (
      <Page aside={<StatsCard />}>
        <ResourceState error={error} retry={retry} />
      </Page>
    );

  const { metier, taches } = data;
  const faites = taches.filter((t) => t.fait).length;
  const courante = taches.find((t) => !t.fait);
  const secs = sections(taches);
  const sectionCourante = courante ? category(courante.code) : secs[secs.length - 1]?.nom;
  let index = 0;

  return (
    <Page
      aside={
        <>
          <StatsCard />
          <section className="card pad-md stack-sm">
            <div className="row-between">
              <h3 className="h3">{metier.nom}</h3>
              <span className="small muted">{faites} sur {taches.length}</span>
            </div>
            <Bar value={taches.length ? (faites / taches.length) * 100 : 0} label={`${faites} tâches faites sur ${taches.length}`} />
            <p className="small muted">{courante ? "Continuez : chaque tâche prend quelques minutes." : "Toutes les tâches de ce métier sont faites. Bravo !"}</p>
          </section>
          <ChoixIA slug={metier.slug} actuel={data.chemin_choisi} onChange={(ia) => setData((d) => ({ ...d, chemin_choisi: ia }))} />
          <AbonnementCard />
        </>
      }
    >
      <div className="card pad-sm path-head">
        <div className="grow">
          <p className="small muted"><Link className="strong" href="/metiers">{metier.nom}</Link> › {sectionCourante}</p>
          <h1 className="h2">{courante ? "Votre parcours" : "Parcours terminé"}</h1>
        </div>
        <Link className="pill" href="/kit"><Icon name="kit" size={18} /> Mon kit</Link>
        <Link className="pill" href="/metiers">Changer de métier</Link>
      </div>

      <ReprendreCard />

      <div className="journey">
        {secs.map((section, si) => (
          <div key={section.nom}>
            <div className="journey-section">
              <div>
                {section.nom}
                <small>Étape {si + 1} · {section.taches.filter((t) => t.fait).length} sur {section.taches.length}</small>
              </div>
            </div>
            {section.taches.map((tache) => {
              const decalage = DECALAGES[index++ % DECALAGES.length];
              const estCourante = courante?.id === tache.id;
              const etat = tache.fait ? "is-done" : estCourante ? "is-current" : "";
              const href = tacheHref(tache.id, metier.slug);
              return (
                <div key={tache.id} className="journey-step">
                  <div className="journey-item" style={{ "--shift": `${decalage}px` } as React.CSSProperties}>
                    <Link className={`node ${etat}`} href={href} aria-label={`${tache.titre}${tache.fait ? " (faite)" : estCourante ? " (à faire maintenant)" : ""}`}>
                      <Icon name={tache.fait ? "check" : iconeCategorie[section.nom] ?? "list"} size={32} strokeWidth={2.4} />
                    </Link>
                    {estCourante ? (
                      <div className="journey-pop">
                        <div className="chips">
                          <Chip tone="green">À faire maintenant</Chip>
                          {tache.favori && <Chip tone="gold" icon="star">Favori</Chip>}
                        </div>
                        <p className="strong" style={{ fontSize: 17 }}>{tache.titre}</p>
                        <Link className="btn btn-block" href={href}>Commencer</Link>
                      </div>
                    ) : (
                      <p className="journey-label">{tache.titre}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <TacheSurMesure slug={metier.slug} metier={metier.nom} />
    </Page>
  );
}
