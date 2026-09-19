"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "./kit-icons";

const exploreLinks = [
  { href: "/taches", label: "Tâches", description: "Partez d’un besoin concret", icon: "tasks" },
  { href: "/metiers", label: "Métiers", description: "Explorez votre quotidien professionnel", icon: "jobs" },
  { href: "/comprendre-les-ia", label: "Comprendre les IA", description: "Choisissez le bon outil pour votre travail", icon: "sparkles" },
  { href: "/bibliotheque", label: "Bibliothèque", description: "Consultez tous les guides pratiques", icon: "writing" },
  { href: "/systemes-ia", label: "Systèmes IA", description: "Demandez un parcours adapté à votre travail", icon: "layers" },
  { href: "/mises-a-jour-ia", label: "Mises à jour IA", description: "Suivez les nouveautés qui comptent", icon: "analysis" },
];

const hasSupabaseConfig = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState<boolean | null>(hasSupabaseConfig ? null : false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen && !exploreOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setExploreOpen(false);
        menuButton.current?.focus();
      }
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen, exploreOpen]);

  useEffect(() => {
    if (!hasSupabaseConfig) return;

    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => setAuthenticated(Boolean(data.session)));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(Boolean(session));
    });
    return () => subscription.unsubscribe();
  }, []);

  const accountHref = authenticated === false ? "/connexion" : "/mon-compte";
  const accountLabel = "Ma progression";
  const closeMenus = () => {
    setMenuOpen(false);
    setExploreOpen(false);
  };
  const isCurrent = (href: string) => href === "/" ? path === href : path.startsWith(href);

  return (
    <div id="awk-studio">
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <header className="aw-top">
        <div className="aw-header-inner">
          <Link href="/" className="aw-brand" aria-label="AI WORK KIT — Accueil" onClick={closeMenus}>
            <Image className="aw-brand-symbol" src="/icon.svg" width={38} height={38} alt="" priority />
            <span>AI WORK <em>KIT</em></span>
          </Link>

          <nav className="aw-desktop-nav" aria-label="Navigation principale">
            <Link href="/" aria-current={path === "/" ? "page" : undefined}>Accueil</Link>
            <div className="aw-explore-menu">
              <button
                type="button"
                aria-expanded={exploreOpen}
                aria-controls="menu-explorer"
                onClick={() => setExploreOpen((open) => !open)}
              >
                Explorer <span aria-hidden="true">⌄</span>
              </button>
              <div id="menu-explorer" className="aw-explore-dropdown" data-open={exploreOpen ? "true" : "false"}>
                {exploreLinks.slice(0, 2).map((item) => (
                  <Link key={item.href} href={item.href} onClick={closeMenus}>
                    <Icon name={item.icon} />
                    <span><strong>{item.label}</strong><small>{item.description}</small></span>
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/comprendre-les-ia" aria-current={isCurrent("/comprendre-les-ia") ? "page" : undefined}>Comprendre les IA</Link>
            <Link href="/bibliotheque" aria-current={isCurrent("/bibliotheque") || isCurrent("/guides") ? "page" : undefined}>Guides</Link>
            <Link href="/systemes-ia" aria-current={isCurrent("/systemes-ia") ? "page" : undefined}>Systèmes IA</Link>
            <Link href="/mises-a-jour-ia" aria-current={isCurrent("/mises-a-jour-ia") ? "page" : undefined}>Mises à jour IA</Link>
          </nav>

          <div className="aw-header-actions">
            {authenticated === false && <Link className="aw-login-link" href="/connexion">Se connecter</Link>}
            <Link className="aw-header-cta" href={accountHref}>{accountLabel}</Link>
            <button
              ref={menuButton}
              className="aw-menu-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="navigation-mobile"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span /><span />
            </button>
          </div>
        </div>

        <div className="aw-mobile-panel" id="navigation-mobile" data-open={menuOpen ? "true" : "false"}>
          <p className="aw-menu-heading">Explorer AI WORK KIT <span aria-hidden="true">↗</span></p>
          <nav aria-label="Menu mobile">
            {exploreLinks.map((item) => (
              <Link key={item.href} href={item.href} onClick={closeMenus} aria-current={isCurrent(item.href) ? "page" : undefined}>
                <Icon name={item.icon} />
                <span><strong>{item.label}</strong><small>{item.description}</small></span>
              </Link>
            ))}
          </nav>
          <div className="aw-mobile-secondary">
            <Link href="/" onClick={closeMenus}>Accueil</Link>
            {authenticated === false && <Link href="/connexion" onClick={closeMenus}>Se connecter</Link>}
            <Link href="/mon-compte" onClick={closeMenus}>Ma progression</Link>
          </div>
        </div>
      </header>

      <main id="contenu" className="aw-main">{children}</main>
      <footer className="aw-site-footer">
        <div className="aw-footer-main">
          <div className="aw-footer-brand">
            <Link href="/" className="aw-footer-logo" aria-label="AI WORK KIT — Accueil">
              <Image src="/icon.svg" width={48} height={48} alt="" />
              <span>AI WORK <em>KIT</em></span>
            </Link>
            <p>L’intelligence artificielle appliquée à votre travail, concrètement.</p>
          </div>

          <div className="aw-footer-links">
            <nav className="aw-footer-column" aria-label="Menu du pied de page">
              <h2>Menu</h2>
              <Link href="/">Accueil</Link>
              <Link href="/taches">Tâches</Link>
              <Link href="/metiers">Métiers</Link>
              <Link href="/bibliotheque">Bibliothèque</Link>
              <Link href="/transformation-ia">Transformation IA</Link>
              <Link href="/systemes-ia">Systèmes IA</Link>
              <Link href="/mises-a-jour-ia">Mises à jour IA</Link>
              <Link href="/mon-compte">Ma progression</Link>
            </nav>

            <nav className="aw-footer-column" aria-label="Pages légales">
              <h2>Pages légales</h2>
              <a href="https://boutique.parlonsads.com/mentions-legales">Mentions légales</a>
              <a href="https://boutique.parlonsads.com/confidentialite">Politique de confidentialité</a>
              <a href="https://boutique.parlonsads.com/conditions-de-vente">Conditions de vente</a>
            </nav>
          </div>
        </div>

        <div className="aw-bottom">
          <span>© 2026 AI WORK KIT · Tous droits réservés</span>
          <Link href="/comprendre-les-ia">Comprendre les termes de l’IA ↗</Link>
        </div>
      </footer>
    </div>
  );
}
