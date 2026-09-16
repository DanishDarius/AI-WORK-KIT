"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Icon } from "./kit-icons";
import { createClient } from "@/lib/supabase/client";

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
  const theme = useSyncExternalStore(subscribeTheme, themeSnapshot, () => null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (theme) document.documentElement.dataset.theme = theme;
  }, [theme]);
  useEffect(() => {
    if (!menuOpen) return;
    function closeMenu(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    window.addEventListener("keydown", closeMenu);
    return () => window.removeEventListener("keydown", closeMenu);
  }, [menuOpen]);
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setAuthenticated(Boolean(data.session));
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(Boolean(session));
    });
    return () => subscription.unsubscribe();
  }, []);
  const setTheme = (value: string) => {
    volatileTheme = value;
    try {
      localStorage.setItem(themeKey, value);
    } catch {}
    window.dispatchEvent(new Event("awk-theme"));
  };
  const closeMenu = () => setMenuOpen(false);
  return (
    <div id="awk-studio">
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <header className="aw-top">
        <Link
          href="/"
          className="aw-brand"
          aria-label="AI WORK KIT — Accueil"
          onClick={closeMenu}
        >
          <span className="aw-logo">aw</span>
          <span>
            AI WORK <em>KIT</em>
          </span>
        </Link>
        <button
          ref={menuButton}
          className="aw-menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="navigation-principale"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        <div
          className="aw-menu-panel"
          id="navigation-principale"
          data-open={menuOpen ? "true" : "false"}
        >
          <nav className="aw-nav" aria-label="Navigation principale">
            {[
              ["/", "Accueil"],
              ["/taches", "Tâches"],
              ["/metiers", "Métiers"],
              ["/comprendre-les-ia", "Comprendre les IA"],
              ["/mises-a-jour-ia", "Mises à jour IA"],
              authenticated === false
                ? ["/connexion", "Connexion"]
                : ["/mon-compte", "Progression"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
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
          <div className="aw-theme-wrap">
            <span className="aw-theme-label">Apparence</span>
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
          </div>
        </div>
      </header>
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
