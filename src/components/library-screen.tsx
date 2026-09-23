"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { GuideSummary } from "@/lib/guides";
import { GuideCover } from "./guide-cover";

type SortMode = "recent" | "az" | "short";

export function LibraryScreen({ guides, categories }: { guides: GuideSummary[]; categories: string[] }) {
  const [query, setQuery] = useState("");
  const [tool, setTool] = useState("Tous les outils");
  const [category, setCategory] = useState("Tous les sujets");
  const [sort, setSort] = useState<SortMode>("recent");
  const [visibleCount, setVisibleCount] = useState(24);


  const tools = useMemo(
    () => Array.from(new Set(guides.map((guide) => guide.tool))).sort((a, b) => a.localeCompare(b, "fr")),
    [guides],
  );

  const filteredGuides = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("fr");
    const result = guides.filter((guide) => {
      const matchesQuery = !normalized || `${guide.title} ${guide.excerpt} ${guide.tool}`.toLocaleLowerCase("fr").includes(normalized);
      const matchesTool = tool === "Tous les outils" || guide.tool === tool;
      const matchesCategory = category === "Tous les sujets" || guide.category === category;
      return matchesQuery && matchesTool && matchesCategory;
    });

    return result.sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title, "fr");
      if (sort === "short") return Number.parseInt(a.duration) - Number.parseInt(b.duration);
      return a.number - b.number;
    });
  }, [category, guides, query, sort, tool]);

  const featured = guides[0];
  function resetVisible() {
    setVisibleCount(24);
  }

  return (
    <div className="aw-library-page">
      <section className="aw-library-hero" aria-labelledby="library-title">
        <p className="aw-library-kicker">La bibliothèque</p>
        <h1 id="library-title">Les guides IA.<br /><span>À votre rythme.</span></h1>
        <p>Un sujet par guide. Lu en quelques minutes, appliqué le jour même.</p>
      </section>

<section className="aw-library-tools" aria-label="Rechercher et filtrer les guides">
        <label className="aw-library-search">
          <span>Rechercher un guide</span>
          <span className="aw-library-search-field">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m16 16 5 5" /></svg>
            <input
              type="search"
              value={query}
              onChange={(event) => { setQuery(event.target.value); resetVisible(); }}
              placeholder="Prompt, agent, Claude, LinkedIn..."
            />
          </span>
        </label>
        <div className="aw-library-selects">
          <label><span>Outil</span><select value={tool} onChange={(event) => { setTool(event.target.value); resetVisible(); }}><option>Tous les outils</option>{tools.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><span>Sujet</span><select value={category} onChange={(event) => { setCategory(event.target.value); resetVisible(); }}><option>Tous les sujets</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>
      </section>

      {featured && (
        <section className="aw-library-feature" aria-labelledby="featured-title">
          <div className="aw-library-feature-cover">
            <GuideCover number={featured.number} title={featured.title} tool={featured.tool} variant={featured.coverVariant} featured />
          </div>
          <div className="aw-library-feature-copy">
            <p className="aw-library-kicker">Commencer ici · {featured.tool} · {featured.duration}</p>
            <h2 id="featured-title">{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <Link href={`/guides/${featured.slug}`}>Lire ce guide <span aria-hidden="true">→</span></Link>
          </div>
        </section>
      )}

      <section className="aw-library-explore" aria-labelledby="explore-guides-title">
        <div className="aw-library-section-head aw-library-explore-head">
          <div>
            <p className="aw-library-kicker">Tous les guides</p>
            <h2 id="explore-guides-title">Trouvez le guide qu’il vous faut.</h2>
          </div>
          <p><strong>{filteredGuides.length}</strong> guide{filteredGuides.length > 1 ? "s" : ""}</p>
        </div>
        <div className="aw-library-sort" aria-label="Trier les guides">
          {([['recent', 'Ordre conseillé'], ['az', 'A → Z'], ['short', 'Les plus courts']] as Array<[SortMode, string]>).map(([value, label]) => (
            <button key={value} type="button" aria-pressed={sort === value} onClick={() => setSort(value)}>{label}</button>
          ))}
        </div>

        {filteredGuides.length ? (
          <>
            <div className="aw-guide-grid">
              {filteredGuides.slice(0, visibleCount).map((guide) => (
                <article key={guide.slug} className="aw-guide-card">
                  <Link className="aw-guide-card-cover" href={`/guides/${guide.slug}`}>
                    <GuideCover number={guide.number} title={guide.title} tool={guide.tool} variant={guide.coverVariant} />
                  </Link>
                  <div className="aw-guide-card-copy">
                    <p>{guide.category} · {guide.duration}</p>
                    <h3><Link href={`/guides/${guide.slug}`}>{guide.title}</Link></h3>
                    <span>{guide.tool}</span>
                  </div>
                </article>
              ))}
            </div>
            {visibleCount < filteredGuides.length && (
              <button className="aw-library-more" type="button" onClick={() => setVisibleCount((count) => count + 24)}>
                Afficher plus de guides
              </button>
            )}
          </>
        ) : (
          <div className="aw-library-empty"><strong>Aucun guide ne correspond.</strong><p>Essayez un mot plus simple ou remettez les filtres sur « Tous ».</p></div>
        )}
      </section>

      <section className="aw-library-closing">
        <p className="aw-library-kicker">Passez à l’action</p>
        <h2>Un guide lu, une tâche faite.<br /><span>C’est comme ça qu’on progresse.</span></h2>
        <p>Appliquez ce que vous venez de lire sur une vraie tâche de votre métier, avec un prompt prêt.</p>
        <Link href="/taches">Choisir une tâche <span aria-hidden="true">→</span></Link>
      </section>
    </div>
  );
}
