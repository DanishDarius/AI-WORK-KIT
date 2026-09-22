"use client";

import { useEffect, useRef, useState } from "react";
import { chemins, iaLabels } from "@/lib/kit-api";
import { IaUpdate, newestFirst } from "@/lib/ia-updates";
import { Icon } from "./kit-icons";
import type { GuideSummary } from "@/lib/guides";
import { GuideShelf } from "./guide-shelf";

function Media({ item }: { item: IaUpdate }) {
  if (!item.media) return null;
  if (item.media.type === "video")
    return (
      <video
        controls
        preload="none"
        poster={item.media.poster}
        aria-label={item.title}
      >
        <source src={item.media.src} />
        {item.media.captions && (
          <track
            kind="captions"
            src={item.media.captions}
            srcLang="fr"
            label="Français"
            default
          />
        )}
      </video>
    );
  // Les médias éditoriaux pourront provenir de domaines encore non définis.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={item.media.src} alt={item.media.alt} loading="lazy" />;
}

function UpdateCard({ item }: { item?: IaUpdate }) {
  if (!item)
    return (
      <div
        className="aw-update-placeholder"
        aria-label="Emplacement de publication vide"
      >
        <div className="aw-update-title-placeholder" aria-hidden="true" />
        <div className="aw-update-media-placeholder" aria-hidden="true">
          <Icon name="layers" size={28} />
        </div>
      </div>
    );
  return (
    <article className="aw-update-card">
      <h3>{item.title}</h3>
      <Media item={item} />
      <time dateTime={item.publishedAt}>
        {new Intl.DateTimeFormat("fr-FR", {
          dateStyle: "long",
          timeZone: "UTC",
        }).format(new Date(item.publishedAt))}
      </time>
      {item.text && <p>{item.text}</p>}
    </article>
  );
}

function UpdatesCarousel({ items }: { items: IaUpdate[] }) {
  const viewport = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const slots: (IaUpdate | undefined)[] = items.length
    ? items
    : Array.from({ length: 5 });
  function syncPlayback() {
    setPlaying(
      Array.from(viewport.current?.querySelectorAll("video") || []).some(
        (video) => !video.paused && !video.ended,
      ),
    );
  }

  function move(direction: number, smooth = true) {
    const el = viewport.current;
    if (!el) return;
    const cards = [...el.children] as HTMLElement[];
    const step =
      cards.length > 1
        ? cards[1].offsetLeft - cards[0].offsetLeft
        : el.clientWidth;
    const end = el.scrollWidth - el.clientWidth;
    const next =
      direction > 0
        ? el.scrollLeft >= end - 2
          ? 0
          : Math.min(end, el.scrollLeft + step)
        : el.scrollLeft <= 2
          ? end
          : Math.max(0, el.scrollLeft - step);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({
      left: next,
      behavior: smooth && !reduced ? "smooth" : "instant",
    });
  }

  useEffect(() => {
    if (paused || hovered || focused || playing || slots.length < 2) return;
    const timer = window.setInterval(() => {
      if (
        !document.hidden &&
        !matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        move(1);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [paused, hovered, focused, playing, slots.length]);

  return (
    <section
      className="panel aw-updates-carousel"
      aria-label="À la une des mises à jour IA"
      aria-roledescription="carrousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
      onPlayCapture={syncPlayback}
      onPauseCapture={syncPlayback}
      onEndedCapture={syncPlayback}
    >
      <div
        className="aw-updates-track"
        ref={viewport}
        tabIndex={0}
        aria-label="Publications à la une"
        onKeyDown={(e) => {
          if (
            e.target === e.currentTarget &&
            (e.key === "ArrowRight" || e.key === "ArrowLeft")
          ) {
            e.preventDefault();
            move(e.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        {slots.map((item, i) => (
          <div
            className="aw-updates-slide"
            key={item?.id || `empty-${i}`}
            role="group"
            aria-label={`${i + 1} sur ${slots.length}`}
          >
            <UpdateCard item={item} />
          </div>
        ))}
      </div>
      <div className="aw-updates-controls">
        <button
          className="aw-btn"
          onClick={() => move(-1)}
          aria-label="Publications précédentes"
        >
          <Icon name="left" />
        </button>
        <button
          className="aw-btn"
          onClick={() => setPaused((v) => !v)}
          aria-pressed={paused}
        >
          {paused ? "Reprendre le défilement" : "Mettre en pause"}
        </button>
        <button
          className="aw-btn"
          onClick={() => move(1)}
          aria-label="Publications suivantes"
        >
          <Icon name="right" />
        </button>
      </div>
    </section>
  );
}

export function IaUpdatesScreen({ items, guides = [] }: { items: IaUpdate[]; guides?: GuideSummary[] }) {
  const sorted = newestFirst(items);
  return (
    <div className="aw-updates-page">
      <section className="panel aw-updates-intro">
        <h1>Mises à jour IA</h1>
        <p>
          Vous trouverez ici les dernières mises à jour sur les différents
          modèles d’IA.
          </p>
      </section>
      <UpdatesCarousel items={sorted.filter((item) => item.featured)} />
      <section
        className="panel aw-updates-columns"
        aria-label="Mises à jour par IA, de la plus récente à la plus ancienne"
      >
        {chemins.map((ia) => {
          const updates = sorted.filter((item) => item.ia === ia);
          return (
            <section
              className="aw-updates-column"
              key={ia}
              aria-labelledby={`updates-${ia}`}
            >
              <h2 id={`updates-${ia}`}>
                <span className={`ia-dot dot-${ia}`} />
                {iaLabels[ia]}
              </h2>
              <div className="aw-updates-feed">
                {updates.length
                  ? updates.map((item) => (
                      <UpdateCard key={item.id} item={item} />
                    ))
                  : Array.from({ length: 3 }, (_, i) => <UpdateCard key={i} />)}
              </div>
            </section>
          );
        })}
      </section>
      <GuideShelf guides={guides} />
    </div>
  );
}
