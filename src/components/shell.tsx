"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useMoi } from "@/lib/moi";
import { Icon, type IconName } from "./icon";
import { SupportChat } from "./support-chat";

type NavItem = { label: string; href: string; icon: IconName; match: (path: string) => boolean; tab: boolean };

// Navigation principale : 5 onglets sur téléphone, 6 entrées sur ordinateur
// (Nouveau passe par la cloche sur téléphone).
const NAV: NavItem[] = [
  { label: "Parcours", href: "/", icon: "path", match: (p) => p === "/" || p.startsWith("/metiers") || p.startsWith("/bienvenue") || p.startsWith("/premiers-pas"), tab: true },
  { label: "Tâches", href: "/taches", icon: "list", match: (p) => p.startsWith("/taches"), tab: true },
  { label: "Mon kit", href: "/kit", icon: "kit", match: (p) => p.startsWith("/kit"), tab: true },
  { label: "Guides", href: "/bibliotheque", icon: "book", match: (p) => p.startsWith("/bibliotheque") || p.startsWith("/guides"), tab: true },
  { label: "Nouveau", href: "/nouveau", icon: "spark", match: (p) => p.startsWith("/nouveau") || p.startsWith("/mises-a-jour-ia") || p.startsWith("/packs"), tab: false },
  { label: "Profil", href: "/profil", icon: "user", match: (p) => p.startsWith("/profil") || p.startsWith("/abonnement") || p.startsWith("/sur-mesure") || p.startsWith("/aide") || p.startsWith("/accompagnement"), tab: true },
];

// Pastille de la cloche : le nombre de publications du fil Nouveau parues
// depuis la dernière visite (9 au plus). Rien quand il n'y en a pas.
function Pastille({ nombre }: { nombre: number }) {
  if (nombre <= 0) return null;
  return <span className="pastille" aria-hidden="true">{nombre >= 9 ? "9+" : nombre}</span>;
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";
  const nouveautes = useMoi()?.nouveautes ?? 0;
  const annonce = nouveautes > 0 ? `Nouveautés : ${nouveautes >= 9 ? "9 ou plus" : nouveautes} à lire` : "Nouveautés";
  return (
    <div className="app">
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <nav className="rail" aria-label="Navigation principale">
        <Link className="rail-logo" href="/" aria-label="AIW, accueil">
          <Image src="/brand/atelier/symbol-primary.svg" alt="" width={46} height={46} priority />
        </Link>
        {NAV.map((item) => (
          <Link key={item.href} className="rail-link" href={item.href} aria-current={item.match(pathname) ? "page" : undefined} aria-label={item.href === "/nouveau" ? annonce : undefined}>
            <Icon name={item.icon} size={24} strokeWidth={2.2} />
            <span>{item.label}</span>
            {item.href === "/nouveau" && <Pastille nombre={nouveautes} />}
          </Link>
        ))}
        <span className="rail-spacer" />
        <Link className="rail-link" href="/aide" aria-current={pathname.startsWith("/aide") ? "page" : undefined}>
          <Icon name="help" size={22} />
          <span>Aide</span>
        </Link>
      </nav>
      <div className="app-main">
        <header className="mobile-top">
          <Link href="/" aria-label="AIW, accueil">
            <Image src="/brand/atelier/symbol-primary.svg" alt="" width={36} height={36} />
          </Link>
          <span className="grow strong">AIW</span>
          <Link className="icon-btn" href="/nouveau" aria-label={annonce}>
            <Icon name="bell" size={20} />
            <Pastille nombre={nouveautes} />
          </Link>
        </header>
        <main id="contenu">{children}</main>
      </div>
      <nav className="tabbar" aria-label="Navigation">
        {NAV.filter((item) => item.tab).map((item) => (
          <Link key={item.href} className="tab" href={item.href} aria-current={item.match(pathname) ? "page" : undefined}>
            <span><Icon name={item.icon} size={22} strokeWidth={2.2} /></span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <SupportChat />
    </div>
  );
}

// Mise en page d'un écran : colonne principale et, sur ordinateur, colonne
// de droite (progression, abonnement, missions).
export function Page({ children, aside, width }: { children: ReactNode; aside?: ReactNode; width?: "single" | "wide" }) {
  return (
    <div className={`page${aside ? "" : width === "wide" ? " is-wide" : " is-single"}`}>
      <div className="page-main">{children}</div>
      {aside && <aside className="aside" aria-label="Votre progression">{aside}</aside>}
    </div>
  );
}
