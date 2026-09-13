"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IA, iaLabels } from "@/lib/kit-api";
export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <header className="site-header">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link href="/" className="brand" aria-label="AI WORK KIT — accueil">
            <span className="brand-mark" aria-hidden="true">
              AI
            </span>{" "}
            WORK KIT
          </Link>
          <nav aria-label="Navigation principale" className="flex gap-2">
            <Link
              href="/"
              className="nav-link"
              aria-current={path === "/" ? "page" : undefined}
            >
              Mes métiers
            </Link>
            <Link
              href="/mon-compte"
              className="nav-link"
              aria-current={path === "/mon-compte" ? "page" : undefined}
            >
              Mon compte
            </Link>
          </nav>
        </div>
      </header>
      <main
        id="contenu"
        className="mx-auto w-full max-w-6xl flex-1 px-5 py-9 sm:px-8 sm:py-12"
      >
        {children}
      </main>
      <footer className="mx-auto flex w-full max-w-6xl flex-wrap justify-between gap-2 px-5 py-8 text-sm text-slate-500 sm:px-8">
        <span>AI WORK KIT</span>
        <span>Vos outils. Vos tâches. Votre pratique.</span>
      </footer>
    </>
  );
}
export function Badge({ ia }: { ia: IA | null }) {
  return (
    <span className={`badge ${ia ? `badge-${ia}` : "badge-neutral"}`}>
      {ia ? iaLabels[ia] : "Chemin à choisir"}
    </span>
  );
}
export function Intro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {children && (
        <div className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">
          {children}
        </div>
      )}
    </div>
  );
}
export function ResourceState({
  error,
  retry,
}: {
  error?: string;
  retry: () => void;
}) {
  return (
    <div className="panel py-12" role={error ? "alert" : "status"}>
      <p>{error || "Chargement de votre espace…"}</p>
      {error ? (
        <button className="button mt-5" onClick={retry}>
          Réessayer
        </button>
      ) : (
        <div className="mt-5 h-2 w-32 animate-pulse rounded bg-slate-200" />
      )}
    </div>
  );
}
export function Back({
  href = "/",
  children = "Tous les métiers",
}: {
  href?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link href={href} className="back-link">
      ← {children}
    </Link>
  );
}
