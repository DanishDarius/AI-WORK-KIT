"use client";

import { useState } from "react";
import type { UpdateMedia } from "@/lib/ia-updates";
import { Icon } from "./icon";

// Image ou vidéo d'une actualité, au format 16:9. Les vidéos YouTube ne se
// chargent qu'au clic (youtube-nocookie) : page légère, aucun cookie avant.
export function Media({ media, priority = false }: { media: UpdateMedia; priority?: boolean }) {
  const [lecture, setLecture] = useState(false);
  let contenu: React.ReactNode;
  if (media.type === "image") {
    // eslint-disable-next-line @next/next/no-img-element
    contenu = <img src={media.src} alt={media.alt} loading={priority ? "eager" : "lazy"} decoding="async" />;
  } else if (media.type === "youtube") {
    contenu = lecture ? (
      <iframe src={`https://www.youtube-nocookie.com/embed/${media.id}?autoplay=1&rel=0`} title={media.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
    ) : (
      <button type="button" className="media-play" onClick={() => setLecture(true)} aria-label={`Lire la vidéo : ${media.title}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://i.ytimg.com/vi/${media.id}/maxresdefault.jpg`} alt="" loading={priority ? "eager" : "lazy"} style={{ position: "absolute", inset: 0 }} />
        <span style={{ position: "relative" }}><Icon name="play" size={30} /></span>
      </button>
    );
  } else {
    contenu = (
      <video controls preload="none" poster={media.poster} aria-label={media.title}>
        <source src={media.src} />
        {media.captions && <track kind="captions" src={media.captions} srcLang="fr" label="Français" default />}
      </video>
    );
  }
  return (
    <figure style={{ margin: 0 }}>
      <div className="media">{contenu}</div>
      <figcaption className="media-credit">{media.credit}</figcaption>
    </figure>
  );
}
