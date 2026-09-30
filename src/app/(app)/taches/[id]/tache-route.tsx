"use client";

import Link from "next/link";
import { TacheEcran } from "@/components/tache";
import { useProfil } from "@/lib/profil";

// La tâche s'affiche dans le contexte d'un métier (progression, favoris,
// tâche suivante). Sans métier dans l'adresse, on prend celui du profil.
export function TacheRoute({ id, metier }: { id: string; metier: string }) {
  const profil = useProfil();
  const slug = metier || profil?.metier || "";
  if (!metier && profil === undefined) return null;
  if (!slug)
    return (
      <main id="contenu" className="auth">
        <div className="auth-main">
          <div className="card stack" style={{ maxWidth: 520 }}>
            <h1 className="h2">Ouvrez cette tâche depuis votre métier.</h1>
            <p className="muted">Choisissez d’abord votre métier : la tâche s’affichera avec votre progression.</p>
            <Link className="btn" href="/metiers">Choisir mon métier</Link>
          </div>
        </div>
      </main>
    );
  return <TacheEcran id={id} metier={slug} />;
}
