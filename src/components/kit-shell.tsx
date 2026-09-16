"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Icon } from "./kit-icons";

const themeKey = "ai-work-kit.preview.theme.v1";
let volatileTheme: string | null = null;
function themeSnapshot() {
  let saved = volatileTheme;
  try {
    saved = localStorage.getItem(themeKey) || saved;
  } catch {}
  return saved === "light" || saved === "dark"
    ? saved
    : matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
}
function subscribeTheme(update: () => void) {
  const media = matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", update);
  window.addEventListener("storage", update);
  window.addEventListener("awk-theme", update);
  return () => {
    media.removeEventListener("change", update);
    window.removeEventListener("storage", update);
    window.removeEventListener("awk-theme", update);
  };
}

export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const theme = useSyncExternalStore(subscribeTheme, themeSnapshot, () => null);
  const [tv, setTv] = useState(false);
  useEffect(() => {
    if (theme) document.documentElement.dataset.theme = theme;
  }, [theme]);
  useEffect(() => {
    if (!tv) return;
    function navigate(event: KeyboardEvent) {
      const active = document.activeElement as HTMLElement | null;
      if (
        event.defaultPrevented ||
        active?.matches('input:not([type="checkbox"]),textarea,select') ||
        event.altKey ||
        event.metaKey ||
        event.ctrlKey
      )
        return;
      if (event.key === "Escape") {
        event.preventDefault();
        router.push(
          document
            .querySelector<HTMLAnchorElement>(".aw-bread a:last-of-type")
            ?.getAttribute("href") || "/",
        );
        return;
      }
      if (
        !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
      )
        return;
      const nodes = [
        ...document.querySelectorAll<HTMLElement>(
          "#awk-studio a[href], #awk-studio button:not(:disabled), #awk-studio input, #awk-studio select, #awk-studio summary",
        ),
      ].filter(
        (n) =>
          n.getClientRects().length &&
          n.getAttribute("aria-disabled") !== "true",
      );
      const box = active?.getBoundingClientRect();
      if (!box || !nodes.includes(active!)) {
        nodes[0]?.focus();
        event.preventDefault();
        return;
      }
      const origin = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
      const horizontal =
        event.key === "ArrowLeft" || event.key === "ArrowRight";
      const positive = event.key === "ArrowRight" || event.key === "ArrowDown";
      const candidate = nodes
        .filter((n) => n !== active)
        .map((node) => {
          const r = node.getBoundingClientRect();
          const dx = r.x + r.width / 2 - origin.x,
            dy = r.y + r.height / 2 - origin.y;
          const along = horizontal ? dx : dy,
            across = horizontal ? dy : dx;
          return {
            node,
            along,
            distance: Math.abs(along) + Math.abs(across) * 3,
          };
        })
        .filter((n) => (positive ? n.along > 8 : n.along < -8))
        .sort((a, b) => a.distance - b.distance)[0];
      if (candidate) {
        event.preventDefault();
        candidate.node.focus();
        candidate.node.scrollIntoView({ block: "nearest" });
      }
    }
    window.addEventListener("keydown", navigate);
    return () => window.removeEventListener("keydown", navigate);
  }, [tv, router]);
  const setTheme = (value: string) => {
    volatileTheme = value;
    try {
      localStorage.setItem(themeKey, value);
    } catch {}
    window.dispatchEvent(new Event("awk-theme"));
  };
  return (
    <div id="awk-studio" data-input={tv ? "tv" : "standard"}>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <header className="aw-top">
        <Link href="/" className="aw-brand" aria-label="AI WORK KIT — Accueil">
          <span className="aw-logo">aw</span>
          <span>
            AI WORK <em>KIT</em>
          </span>
        </Link>
        <nav className="aw-nav" aria-label="Navigation principale">
          {[
            ["/", "Accueil"],
            ["/taches", "Tâches"],
            ["/metiers", "Métiers"],
            ["/comprendre-les-ia", "Comprendre les IA"],
            ["/mises-a-jour-ia", "Mises à jour IA"],
            ["/mon-compte", "Progression"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={
                (href === "/" ? path === href : path.startsWith(href))
                  ? "page"
                  : undefined
              }
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="aw-theme" role="group" aria-label="Apparence">
          <button
            type="button"
            aria-pressed={theme === "light"}
            onClick={() => setTheme("light")}
          >
            <Icon name="sun" />
            Clair
          </button>
          <button
            type="button"
            aria-pressed={theme === "dark"}
            onClick={() => setTheme("dark")}
          >
            <Icon name="moon" />
            Sombre
          </button>
        </div>
        <details className="aw-display">
          <summary>Affichage</summary>
          <label>
            Navigation{" "}
            <select
              value={tv ? "tv" : "standard"}
              onChange={(event) => {
                setTv(event.target.value === "tv");
                event.target.closest("details")?.removeAttribute("open");
              }}
            >
              <option value="standard">Tactile / souris / clavier</option>
              <option value="tv">Télécommande</option>
            </select>
          </label>
        </details>
      </header>
      {tv && (
        <div className="aw-tv-hint">
          Flèches : se déplacer · Entrée : ouvrir · Échap : revenir
        </div>
      )}
      <main id="contenu" className="aw-main">
        {children}
      </main>
      <footer className="aw-bottom">
        <span>AI WORK KIT · Vos outils. Vos tâches. Votre pratique.</span>
        <Link href="/comprendre-les-ia">Comprendre les termes de l’IA ↗</Link>
      </footer>
    </div>
  );
}
