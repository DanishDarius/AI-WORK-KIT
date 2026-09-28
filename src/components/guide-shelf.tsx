"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { GuideSummary } from "@/lib/guides";
import { useAbonne } from "@/lib/moi";
import { GuideCover } from "./guide-cover";

export function GuideShelf({ guides, kicker = "Sélection AI WORK KIT", title = "12 guides pour aller plus loin." }: { guides: GuideSummary[]; kicker?: string; title?: string }) {
  const shelf = useRef<HTMLDivElement>(null);
  const dragState = useRef({ startX: 0, startScroll: 0, moved: false });
  const [isDragging, setIsDragging] = useState(false);
  const nonAbonne = useAbonne() === false;

function handleShelfPointerDown(event: React.PointerEvent<HTMLDivElement>) {
  const shelfEl = shelf.current;
  if (!shelfEl) return;
  dragState.current = { startX: event.clientX, startScroll: shelfEl.scrollLeft, moved: false };
  setIsDragging(true);
  shelfEl.setPointerCapture(event.pointerId);
}
  function handleShelfPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const shelfEl = shelf.current;
    if (!shelfEl || !isDragging) return;
    const delta = event.clientX - dragState.current.startX;
    if (Math.abs(delta) > 4) dragState.current.moved = true;
    shelfEl.scrollLeft = dragState.current.startScroll - delta;
  }
  function handleShelfPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    shelf.current?.releasePointerCapture(event.pointerId);
    setIsDragging(false);
  }
  function handleShelfLinkClick(event: React.MouseEvent) {
    if (dragState.current.moved) {
      event.preventDefault();
    }
  }

function scrollShelf(direction: -1 | 1) {
  shelf.current?.scrollBy({ left: direction * Math.min(620, window.innerWidth * 0.72), behavior: "smooth" });
}

// Sans abonnement, les guides inclus dans l'accès passent en premier.
const shelfGuides = (nonAbonne ? [...guides.filter((g) => g.inclus), ...guides.filter((g) => !g.inclus)] : guides).slice(0, 12);
  if (!shelfGuides.length) return null;

return (
  <section className="aw-guide-shelf-section" aria-labelledby="shelf-title">
  <div className="aw-library-section-head">
  <div>
  <p className="aw-library-kicker">{kicker}</p>
  <h2 id="shelf-title">{title}</h2>
  </div>
  <div className="aw-shelf-controls" aria-label="Navigation de l’étagère">
  <button type="button" onClick={() => scrollShelf(-1)} aria-label="Guides précédents">←</button>
  <button type="button" onClick={() => scrollShelf(1)} aria-label="Guides suivants">→</button>
  </div>
  </div>
  <div className={`aw-guide-shelf${isDragging ? " is-dragging" : ""}`} ref={shelf} onPointerDown={handleShelfPointerDown} onPointerMove={handleShelfPointerMove} onPointerUp={handleShelfPointerUp} onPointerLeave={handleShelfPointerUp}>
    {shelfGuides.map((guide) => (
    <Link key={guide.slug} className="aw-shelf-item" href={`/guides/${guide.slug}`} aria-label={`Lire le guide : ${guide.title}${nonAbonne && !guide.inclus ? " (Premium, aperçu gratuit)" : ""}`} onClick={handleShelfLinkClick}>
    <GuideCover number={guide.number} title={guide.title} tool={guide.tool} variant={guide.coverVariant} />
    {nonAbonne && (
      <span className={`aw-shelf-access${guide.inclus ? " is-included" : ""}`} aria-hidden="true">
        {guide.inclus ? (
          <svg viewBox="0 0 24 24"><path d="m5 12 5 5L20 7" /></svg>
        ) : (
          <svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
        )}
        {guide.inclus ? "Inclus" : "Premium"}
      </span>
    )}
    </Link>
    ))}
  </div>
  <p className="aw-shelf-note">Glissez pour parcourir. Cliquez sur un guide pour le lire.</p>
  </section>
  );
}
