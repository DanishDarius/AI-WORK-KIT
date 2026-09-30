import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export const legalPages = [
  { href: "/conditions", label: "Conditions" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/mentions-legales", label: "Mentions légales" },
];

// En-tête des pages publiques (page d'accès et pages légales).
export function PublicTop({ nav, action }: { nav?: { href: string; label: string }[]; action?: ReactNode }) {
  return (
    <header className="public-top">
      <div>
        <Link href="/acces" aria-label="AIW, page d’accès">
          <Image src="/brand/atelier/logo-primary.svg" alt="AIW, AI WORK KIT" width={130} height={45} priority />
        </Link>
        {nav && (
          <nav className="public-nav" aria-label="Sections">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>
        )}
        <span className="grow" />
        {action}
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <Image src="/brand/atelier/logo-reverse.svg" alt="AIW" width={116} height={40} />
        <span className="small">AIW, un produit de Parlons ADS</span>
        <span className="grow" />
        {legalPages.map((page) => (
          <Link key={page.href} href={page.href}>{page.label}</Link>
        ))}
      </div>
    </footer>
  );
}
