"use client";

import Link from "next/link";
import { useEffect } from "react";
import { api, useResource } from "@/lib/kit-api";
import { oublierNouveautes } from "@/lib/moi";
import { Icon } from "./icon";
import { Chip } from "./ui";

// Types partagés avec le serveur (src/lib/fil.ts), recopiés ici : un composant
// client n'importe pas un module serveur.
export type TypePublication = "tache" | "pack" | "mise_a_jour" | "guide" | "ressource";
export type ElementFil = {
  id: string;
  type: TypePublication;
  titre: string;
  resume: string | null;
  publie_le: string;
  reserve: boolean;
  ouvert: boolean;
  href: string | null;
  ref: string | null;
};

export const LIBELLE_TYPE: Record<TypePublication, string> = {
  tache: "Tâche de la semaine",
  pack: "Pack",
  mise_a_jour: "Mise à jour des IA",
  guide: "Guide",
  ressource: "Ressource",
};

/**
 * Posé sur la page du fil : dit au serveur que le client l'a ouvert, et
 * retire la pastille de la cloche. La page, elle, ne fait que lire (règle C4).
 */
export function MarquerFilVu() {
  useEffect(() => {
    api("/api/nouveau/vu", { method: "POST" })
      .then(() => oublierNouveautes())
      .catch(() => undefined);
  }, []);
  return null;
}

// Accueil : ce qui est paru ces sept derniers jours (deux éléments au plus).
// Rien ne s'affiche quand rien n'est paru.
export function NouveauCetteSemaine() {
  const { data } = useResource<{ abonne: boolean; elements: (ElementFil & { de_la_semaine: boolean })[] }>("/api/nouveau");
  const recents = (data?.elements ?? []).filter((e) => e.de_la_semaine).slice(0, 2);
  if (!recents.length) return null;
  return (
    <section className="card pad-md stack-sm" aria-labelledby="nouveau-semaine">
      <div className="row-between">
        <h2 id="nouveau-semaine" className="h3">Nouveau cette semaine</h2>
        <Link className="link small" href="/nouveau">Tout voir</Link>
      </div>
      {recents.map((e) => {
        const contenu = (
          <>
            <span className="grow stack-sm" style={{ gap: 2, minWidth: 0 }}>
              <span className="tiny muted">{LIBELLE_TYPE[e.type]}</span>
              <span className="strong">{e.titre}</span>
            </span>
            {e.ouvert ? <Icon name="arrow" size={18} /> : <Chip tone="orange" icon="lock">Abonnés</Chip>}
          </>
        );
        return e.ouvert && e.href ? (
          <Link key={e.id} href={e.href} className="list-row" style={{ color: "var(--ink)" }}>{contenu}</Link>
        ) : (
          <div key={e.id} className="list-row">{contenu}</div>
        );
      })}
    </section>
  );
}
