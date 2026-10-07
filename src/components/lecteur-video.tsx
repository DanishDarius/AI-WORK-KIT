"use client";

import { useId, useState } from "react";
import { adresseLecteur, lireVideo } from "@/lib/video";
import { Icon } from "./icon";

// Une vidéo d'AIW, lue dans la page. Avant le clic, l'affiche est dessinée
// par l'application : rien ne se charge chez l'hébergeur (page légère, aucune
// donnée envoyée). Au clic, le lecteur de Bunny Stream prend la place de
// l'affiche et la lecture démarre.
export function LecteurVideo({ adresse, titre, legende, lancee = false }: { adresse: string; titre: string; legende?: string; lancee?: boolean }) {
  const id = lireVideo(adresse);
  const [lecture, setLecture] = useState(lancee);
  if (!id) return null;
  return (
    <figure className="lecteur">
      <div className="media">
        {lecture ? (
          <iframe
            src={adresseLecteur(id)}
            title={titre}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            // L'hébergeur n'accepte la lecture que depuis les adresses d'AIW : il lui faut l'origine de la page.
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button type="button" className="lecteur-affiche" onClick={() => setLecture(true)} aria-label={`Lire la vidéo : ${titre}`}>
            <span className="lecteur-bouton" aria-hidden="true"><Icon name="play" size={30} /></span>
            <span className="lecteur-texte">
              <span className="lecteur-kicker">Vidéo</span>
              <span className="lecteur-titre">{titre}</span>
            </span>
          </button>
        )}
      </div>
      {legende && <figcaption className="media-credit">{legende}</figcaption>}
    </figure>
  );
}

// Dans une liste serrée (ressources d'un kit, étapes des premiers pas) : un
// bouton qui déplie le lecteur sous sa ligne. Un seul clic : la vidéo démarre.
export function VideoRepliable({ adresse, titre, libelle = "Voir la vidéo" }: { adresse: string; titre: string; libelle?: string }) {
  const [ouvert, setOuvert] = useState(false);
  const panneau = useId();
  if (!lireVideo(adresse)) return null;
  return (
    <>
      <button type="button" className="btn btn-secondary btn-sm btn-plain" aria-expanded={ouvert} aria-controls={ouvert ? panneau : undefined} onClick={() => setOuvert((o) => !o)}>
        <Icon name={ouvert ? "x" : "video"} size={16} /> {ouvert ? "Fermer la vidéo" : libelle}
      </button>
      {ouvert && (
        <div id={panneau} className="lecteur-panneau">
          <LecteurVideo adresse={adresse} titre={titre} lancee />
        </div>
      )}
    </>
  );
}
