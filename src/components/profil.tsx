"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { api, type Favori, tacheHref, useResource } from "@/lib/kit-api";
import { useMoi } from "@/lib/moi";
import { dateLongue, fcfa, FORMULES, PRIX } from "@/lib/offre";
import { useProfil } from "@/lib/profil";
import type { GuideSummary } from "@/lib/guides";
import { ActionsCompte } from "./auth";
import { CommunauteAbonnes, Notifications } from "./compte-abonne";
import { GuidesEnregistres } from "./guides";
import { Icon } from "./icon";
import { Page } from "./shell";
import { Chip, IconBox, ResourceState } from "./ui";
import { StatsCard, useProgression } from "./widgets";

const TYPES = { salarie: "Salarié", independant: "Indépendant", commercant: "Commerçant" } as const;

function Favoris() {
  const { data, error, retry, setData } = useResource<Favori[]>("/api/favoris");
  const enCours = useRef(new Set<string>());
  const [message, setMessage] = useState("");
  async function retirer(item: Favori) {
    if (!data || enCours.current.has(item.tache_id)) return;
    enCours.current.add(item.tache_id);
    const index = data.findIndex((f) => f.tache_id === item.tache_id);
    setData((p) => p.filter((f) => f.tache_id !== item.tache_id));
    setMessage(`« ${item.tache_titre} » retirée des favoris.`);
    try {
      const r = await api<{ ok: boolean; favori: boolean }>(`/api/taches/${encodeURIComponent(item.tache_id)}/favori?metier=${encodeURIComponent(item.metier_slug)}`, { method: "POST", body: JSON.stringify({ favori: false }) });
      if (!r.ok || r.favori) throw new Error();
    } catch {
      setData((p) => {
        if (p.some((f) => f.tache_id === item.tache_id)) return p;
        const copie = [...p];
        copie.splice(Math.min(index, copie.length), 0, item);
        return copie;
      });
      setMessage("Le retrait a échoué : le favori a été rétabli.");
    } finally {
      enCours.current.delete(item.tache_id);
    }
  }
  if (!data) return <ResourceState error={error} retry={retry} />;
  return (
    <>
      <p className={message ? "small muted" : "sr-only"} role="status">{message}</p>
      {data.length ? (
        <div>
          {data.map((f) => (
            <div key={f.tache_id} className="list-row">
              <IconBox name="star" tone="gold" size="sm" />
              <Link href={tacheHref(f.tache_id, f.metier_slug)} className="grow stack-sm" style={{ gap: 2, color: "var(--ink)" }}>
                <span className="title">{f.tache_titre}</span>
                <span className="tiny muted">{f.metier_nom}</span>
              </Link>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => retirer(f)} aria-label={`Retirer « ${f.tache_titre} » des favoris`}>Retirer</button>
            </div>
          ))}
        </div>
      ) : (
        <p className="muted small">Aucun favori pour l’instant. Touchez l’étoile d’une tâche pour la retrouver ici.</p>
      )}
    </>
  );
}

export function ProfilEcran({ guides }: { guides: Pick<GuideSummary, "slug" | "title" | "tool" | "duration">[] }) {
  const moi = useMoi();
  const profil = useProfil();
  const { data: prog } = useProgression();
  const a = moi?.abonnement;
  const formule = FORMULES.find((f) => f.id === a?.periode);
  const initiale = (moi?.email ?? "?").charAt(0).toUpperCase();

  return (
    <Page aside={<StatsCard />}>
      <section className="card row" style={{ gap: 20 }}>
        <span aria-hidden="true" style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--mint)", color: "var(--night)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-title)", fontWeight: 900, fontSize: 32, flex: "none" }}>{initiale}</span>
        <div className="grow stack-sm" style={{ minWidth: 220 }}>
          <h1 className="h2">{moi?.email ?? "Mon profil"}</h1>
          {moi && <p className="small muted">Membre depuis le {dateLongue(moi.membre_depuis)}</p>}
          <div className="chips">
            {profil?.type && <Chip tone="green">{TYPES[profil.type]}</Chip>}
            {a?.actif ? <Chip tone="orange">Abonnement {formule?.label.toLowerCase()}</Chip> : <Chip>Accès AIW</Chip>}
          </div>
        </div>
        <Link className="btn btn-secondary btn-sm btn-plain" href="/bienvenue"><Icon name="settings" size={16} /> Modifier mon profil</Link>
      </section>

      <section id="compte" className="card stack" aria-labelledby="mon-compte">
        <h2 id="mon-compte" className="h2">Mon compte</h2>
        <div className="stack-sm" style={{ gap: 2 }}>
          <span className="small muted">Adresse e-mail de connexion</span>
          <span className="strong" style={{ overflowWrap: "anywhere" }}>{moi?.email ?? "…"}</span>
        </div>
        <ActionsCompte email={moi?.email ?? undefined} />
      </section>

      <div className="grid-3">
        {[
          { icon: "flame" as const, color: "var(--gold)", valeur: prog ? `${prog.serie_jours} j` : "–", label: "Série en cours" },
          { icon: "check" as const, color: "var(--green)", valeur: prog ? `${prog.taches_faites_total}` : "–", label: `Tâches faites sur ${prog?.taches_total ?? "…"}` },
          { icon: "award" as const, color: "var(--orange)", valeur: prog ? `${prog.metiers_termines}` : "–", label: "Métiers terminés" },
        ].map((s) => (
          <div key={s.label} className="card pad-md stack-sm">
            <span style={{ color: s.color }}><Icon name={s.icon} size={26} strokeWidth={2.2} /></span>
            <span className="strong" style={{ fontSize: 28, fontWeight: 900 }}>{s.valeur}</span>
            <span className="small muted">{s.label}</span>
          </div>
        ))}
      </div>

      <section id="offre" className="card stack" aria-labelledby="mon-offre">
        <div className="row-between">
          <h2 id="mon-offre" className="h2">Mon offre</h2>
        </div>
        <div className="grid-2">
          <div className="card pad-md stack-sm" style={{ borderBottomWidth: 2 }}>
            <div className="row-between"><h3 className="h3">Accès AIW</h3><Chip tone="green" icon="check">Actif</Chip></div>
            <p className="small muted">{fcfa(PRIX.acces)}, paiement unique, sans limite de durée.{moi && dateLongue(moi.acces_depuis) ? ` Actif depuis le ${dateLongue(moi.acces_depuis)}.` : ""}</p>
          </div>
          {a?.actif ? (
            <div className="card is-orange pad-md stack-sm" style={{ borderBottomWidth: 2 }}>
              <div className="row-between"><h3 className="h3">Abonnement {formule?.label.toLowerCase()}</h3><Chip tone="orange">Actif</Chip></div>
              <p className="small muted">{a.periode === "a_vie" ? "Sans échéance." : `Actif jusqu’au ${dateLongue(a.fin_le)}. Rien n’est prélevé automatiquement.`}</p>
              {a.periode !== "a_vie" && (
                <Link className="link small" href="/abonnement">Prolonger mon abonnement</Link>
              )}
            </div>
          ) : (
            <div className="card pad-md stack-sm" style={{ borderBottomWidth: 2, borderStyle: "dashed", borderColor: "var(--orange-line)" }}>
              <h3 className="h3">Abonnement</h3>
              <p className="small muted">Guides revendables, sur-mesure et chat. Au mois, à l’année ou à vie.</p>
              <Link className="btn btn-orange btn-sm" href="/abonnement">Voir les formules</Link>
            </div>
          )}
        </div>
      </section>

      <section id="notifications" className="card stack-sm" aria-labelledby="mes-notifications">
        <h2 id="mes-notifications" className="h2">Notifications</h2>
        <Notifications />
      </section>

      <section id="communaute" className="card stack" aria-labelledby="ma-communaute">
        <div className="row-between">
          <h2 id="ma-communaute" className="h2">Communauté des abonnés</h2>
          <Chip tone="orange">Abonnés</Chip>
        </div>
        <CommunauteAbonnes />
      </section>

      <section id="favoris" className="card stack-sm" aria-labelledby="mes-favoris">
        <h2 id="mes-favoris" className="h2">Tâches favorites</h2>
        <Favoris />
      </section>

      <section id="guides" className="card stack-sm" aria-labelledby="mes-guides">
        <h2 id="mes-guides" className="h2">Guides enregistrés</h2>
        <GuidesEnregistres guides={guides} />
      </section>

      <section id="aide" className="card stack" aria-labelledby="aide-titre">
        <h2 id="aide-titre" className="h2">Aide et accompagnement</h2>
        <div className="grid-3">
          {[
            { href: "/aide", icon: "chat" as const, titre: "Aide et support", texte: "Réponse 24 h/24, 7 j/7" },
            { href: "/accompagnement", icon: "bolt" as const, titre: "Systèmes IA", texte: "Un système construit pour vous" },
            { href: "/accompagnement#transformation", icon: "users" as const, titre: "Transformation IA", texte: "Pour toute une équipe" },
          ].map((l) => (
            <Link key={l.titre} href={l.href} className="card pad-md card-link" style={{ borderBottomWidth: 4 }}>
              <span style={{ color: "var(--green)" }}><Icon name={l.icon} size={22} /></span>
              <span className="strong">{l.titre}</span>
              <span className="small muted">{l.texte}</span>
            </Link>
          ))}
        </div>
      </section>
    </Page>
  );
}
