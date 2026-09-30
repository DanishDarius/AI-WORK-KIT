import type { ReactNode } from "react";
import { Icon, type IconName } from "./icon";

// Briques visuelles partagées. Elles n'ont pas d'état : les écrans les
// composent. Voir globals.css pour les classes correspondantes.

type Tone = "green" | "orange" | "blue" | "gold" | "night" | "line";

export function Chip({ tone = "line", icon, children }: { tone?: Tone; icon?: IconName; children: ReactNode }) {
  return (
    <span className={`chip${tone === "line" ? "" : ` chip-${tone}`}`}>
      {icon && <Icon name={icon} size={13} strokeWidth={2.4} />}
      {children}
    </span>
  );
}

export function Bar({ value, tone, thin, label }: { value: number; tone?: "gold" | "orange"; thin?: boolean; label?: string }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div
      className={`bar${thin ? " is-thin" : ""}${tone ? ` is-${tone}` : ""}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      aria-label={label}
    >
      <span style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Kicker({ children, light }: { children: ReactNode; light?: boolean }) {
  return <p className={`kicker${light ? " is-light" : ""}`}>{children}</p>;
}

export function IconBox({ name, tone, size }: { name: IconName; tone?: "orange" | "blue" | "gold" | "plain"; size?: "sm" | "lg" }) {
  const iconSize = size === "lg" ? 26 : size === "sm" ? 19 : 22;
  return (
    <span className={`iconbox${tone ? ` is-${tone}` : ""}${size ? ` is-${size}` : ""}`} aria-hidden="true">
      <Icon name={name} size={iconSize} />
    </span>
  );
}

export function CheckList({ items, tone }: { items: { label: ReactNode; off?: boolean }[]; tone?: "orange" }) {
  return (
    <ul className={`checklist${tone ? ` is-${tone}` : ""}`}>
      {items.map((item, index) => (
        <li key={index} className={item.off ? "is-off" : undefined}>
          <span aria-hidden="true"><Icon name={item.off ? "x" : "check"} size={13} strokeWidth={3} /></span>
          <span>{item.label}{item.off && <span className="sr-only"> (non inclus)</span>}</span>
        </li>
      ))}
    </ul>
  );
}

export function PageHead({ kicker, title, children }: { kicker?: string; title: ReactNode; children?: ReactNode }) {
  return (
    <header className="page-head">
      {kicker && <Kicker>{kicker}</Kicker>}
      <h1 className="h1">{title}</h1>
      {children && <p className="lead">{children}</p>}
    </header>
  );
}

// État d'une ressource chargée côté client : squelette, erreur ou vide.
export function ResourceState({ error, retry }: { error?: string; retry?: () => void }) {
  if (!error)
    return (
      <div className="skeleton" role="status" aria-label="Chargement en cours">
        <span /><span /><span />
      </div>
    );
  const session = /connect|session/i.test(error);
  return (
    <div className="card pad-md empty" role="alert">
      <p>{error}</p>
      {session ? (
        <a className="btn btn-sm" href="/connexion">Se connecter</a>
      ) : retry ? (
        <button type="button" className="btn btn-secondary btn-sm btn-plain" onClick={retry}>Réessayer</button>
      ) : null}
    </div>
  );
}
