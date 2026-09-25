"use client";

import { useState } from "react";
import type { UpdateMedia } from "@/lib/ia-updates";
import { Icon } from "./kit-icons";

// Bloc visuel d'une actualité : image ou vidéo, toujours au format 16:9 avec
// le crédit en légende. Les vidéos YouTube ne se chargent qu'au clic
// (youtube-nocookie) : la page reste légère et aucun cookie n'est déposé avant.
export function UpdateMediaBlock({
  media,
  priority = false,
}: {
  media: UpdateMedia;
  priority?: boolean;
}) {
  const [playing, setPlaying] = useState(false);

  let content: React.ReactNode;
  if (media.type === "image") {
    content = (
      // Les visuels officiels viennent des domaines des éditeurs.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={media.src}
        alt={media.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    );
  } else if (media.type === "youtube") {
    content = playing ? (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${media.id}?autoplay=1&rel=0`}
        title={media.title}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
    ) : (
      <button
        type="button"
        className="aw-media-play"
        onClick={() => setPlaying(true)}
        aria-label={`Lire la vidéo : ${media.title}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://i.ytimg.com/vi/${media.id}/maxresdefault.jpg`}
          alt=""
          loading={priority ? "eager" : "lazy"}
        />
        <span className="aw-media-play-icon" aria-hidden="true">
          <Icon name="play" size={26} />
        </span>
      </button>
    );
  } else {
    content = (
      <video controls preload="none" poster={media.poster} aria-label={media.title}>
        <source src={media.src} />
        {media.captions && (
          <track kind="captions" src={media.captions} srcLang="fr" label="Français" default />
        )}
      </video>
    );
  }

  return (
    <figure className="aw-media">
      <div className="aw-media-frame">{content}</div>
      <figcaption>{media.credit}</figcaption>
    </figure>
  );
}
