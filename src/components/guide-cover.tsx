type GuideCoverProps = {
  number: number;
  title: string;
  tool: string;
  variant: number;
  featured?: boolean;
  className?: string;
};

function fitCoverText(value: string, limit: number) {
  if (value.length <= limit) return value;
  const wordEnd = value.lastIndexOf(" ", limit - 1);
  return `${value.slice(0, wordEnd > limit / 2 ? wordEnd : limit - 1).trimEnd()}…`;
}

export function GuideCover({ number, title, tool, variant, featured = false, className = "" }: GuideCoverProps) {
  const approvedCovers: Record<number, { title: string; subtitle: string; mark: string; palette: number }> = {
    1: { title: "ChatGPT niveau expert", subtitle: "LES 5 RÉGLAGES CLÉS", mark: "✳", palette: 1 },
    2: { title: "Signature humaine", subtitle: "GARDER SA VOIX AVEC L’IA", mark: "◎", palette: 2 },
    5: { title: "Votre premier projet IA", subtitle: "DE L’IDÉE À L’ESSAI", mark: "↗", palette: 3 },
    12: { title: "Quel modèle Claude ?", subtitle: "CHOISIR SELON LA TÂCHE", mark: "✴", palette: 4 },
  };
  const approved = approvedCovers[number];
  const [firstPart, secondPart] = title.split(/\s+:\s+/, 2);
  const coverTitle = fitCoverText(approved?.title ?? firstPart, 56);
  const subtitle = approved?.subtitle ?? fitCoverText(secondPart || tool, 36);
  const mark = approved?.mark ?? ["✳", "◎", "↗", "✴", "◇", "◉", "▥", "✦"][variant - 1];
  const titleSize = coverTitle.length > 43 ? "is-extra-long" : coverTitle.length > 30 ? "is-long" : "";

  return (
    <span className={`aw-guide-book aw-approved-book aw-approved-book-variant-${variant} ${approved ? `aw-approved-book-${approved.palette}` : ""} ${titleSize} ${featured ? "is-featured" : ""} ${className}`.trim()}>
      <span className="aw-approved-book-pages" aria-hidden="true" />
      <span className="aw-approved-book-spine" aria-hidden="true">AIW</span>
      <span className="aw-approved-book-face">
        <small>AI WORK KIT / GUIDE {String(number).padStart(3, "0")}</small>
        <span className="aw-approved-book-mark" aria-hidden="true">{mark}</span>
        <strong>{coverTitle}</strong>
        <span>{subtitle}</span>
      </span>
    </span>
  );
}
