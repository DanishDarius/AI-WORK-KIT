"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "./kit-icons";

const exploreLinks = [
  { href: "/taches", label: "Tâches", description: "Le prompt prêt pour une tâche précise", icon: "tasks" },
  { href: "/metiers", label: "Métiers", description: "Tout ce que l’IA fait dans votre métier", icon: "jobs" },
  { href: "/comprendre-les-ia", label: "Comprendre les IA", description: "ChatGPT, Claude, Gemini : lequel pour quoi", icon: "sparkles" },
  { href: "/bibliotheque", label: "Bibliothèque", description: "Des guides courts, à appliquer tout de suite", icon: "writing" },
  { href: "/systemes-ia", label: "Systèmes IA", description: "Nous automatisons vos tâches pour vous", icon: "layers" },
  { href: "/transformation-ia", label: "Transformation IA", description: "Un plan IA pour toute votre entreprise", icon: "analysis" },
  { href: "/mises-a-jour-ia", label: "Mises à jour IA", description: "Ce qui change chez les IA, chaque semaine", icon: "analysis" },
];

// Pages publiques d'authentification : tant que la personne n'est pas
// connectée, seule une coquille minimale (logo, sans navigation ni pied de
// page vers le reste de l'app) doit s'afficher autour du formulaire.
const authPages = [
  "/connexion",
  "/mot-de-passe-oublie",
  "/nouveau-mot-de-passe",
  "/activation",
];

const hasSupabaseConfig = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState<boolean | null>(hasSupabaseConfig ? null : false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const isAuthPage = authPages.some((page) => path === page || path.startsWith(`${page}/`));

  useEffect(() => {
    if (!menuOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

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
  };
  const isCurrent = (href: string) => href === "/" ? path === href : path.startsWith(href);

  // Coquille minimale pour les pages de connexion / activation / mot de
  // passe : pas de navigation ni de pied de page vers le reste de
  // l'application, uniquement le repère de marque et le formulaire.
  if (isAuthPage) {
    return (
      <div id="awk-studio" className="awk-studio-auth aw-theme-atelier">
        <a className="skip-link" href="#contenu">Aller au contenu</a>
        <header className="aw-top aw-top-auth">
          <div className="aw-header-inner">
            <Link href="/" className="aw-brand" aria-label="Accueil AI WORK KIT">
              <Image className="aw-brand-lockup" src="/brand/atelier/logo-primary.svg" width={145} height={50} alt="AI WORK KIT" priority />
            </Link>
          </div>
        </header>
        <main id="contenu" className="aw-main">{children}</main>
      </div>
    );
  }

  return (
    <div id="awk-studio" className="aw-theme-atelier">
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <header className="aw-top">
        <div className="aw-header-inner">
          <Link href="/" className="aw-brand" aria-label="Accueil AI WORK KIT" onClick={closeMenus}>
            <Image className="aw-brand-lockup" src="/brand/atelier/logo-primary.svg" width={145} height={50} alt="AI WORK KIT" priority />
          </Link>

          <nav className="aw-desktop-nav" aria-label="Navigation principale">
            <Link href="/" aria-current={path === "/" ? "page" : undefined}>Accueil</Link>
            <Link href="/taches" aria-current={isCurrent("/taches") ? "page" : undefined}>Tâches</Link>
            <Link href="/metiers" aria-current={isCurrent("/metiers") ? "page" : undefined}>Métiers</Link>
            <Link href="/comprendre-les-ia" aria-current={isCurrent("/comprendre-les-ia") ? "page" : undefined}>Comprendre les IA</Link>
            <Link href="/bibliotheque" aria-current={isCurrent("/bibliotheque") || isCurrent("/guides") ? "page" : undefined}>Bibliothèque</Link>
            <Link href="/systemes-ia" aria-current={isCurrent("/systemes-ia") ? "page" : undefined}>Systèmes IA</Link>
            <Link href="/transformation-ia" aria-current={isCurrent("/transformation-ia") ? "page" : undefined}>Transformation IA</Link>
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
          <p className="aw-menu-heading">Où voulez-vous aller ?</p>
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
            <Link href="/" className="aw-footer-logo" aria-label="Accueil AI WORK KIT">
              <Image className="aw-brand-lockup" src="/brand/atelier/logo-reverse.svg" width={174} height={60} alt="AI WORK KIT" />
            </Link>
            <p>L’IA appliquée à votre travail. Concrètement, dès aujourd’hui.</p>
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
          <Link href="/comprendre-les-ia">Les mots de l’IA, expliqués simplement ↗</Link>
        </div>
      </footer>
    </div>
  );
}
