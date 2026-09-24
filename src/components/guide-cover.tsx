import Image from "next/image";

type GuideCoverProps = {
  number: number;
  title: string;
  tool: string;
  variant: number;
  featured?: boolean;
  className?: string;
};

export function GuideCover({ number, title, tool, variant, featured = false, className = "" }: GuideCoverProps) {
  return (
    <div className={`aw-guide-book ${featured ? "is-featured" : ""} ${className}`.trim()}>
      <span className="aw-guide-page-block" aria-hidden="true" />
      <span className="aw-guide-page-bottom" aria-hidden="true" />
      <div className={`aw-guide-cover aw-guide-cover-${variant}`} data-tool={tool.toLowerCase()}>
        {number === 1 && (
          <Image
            className="aw-guide-cover-art"
            src="/guides/covers/chatgpt-niveau-expert.png"
            alt=""
            fill
            sizes={featured ? "(max-width: 760px) 82vw, 430px" : "(max-width: 760px) 56vw, 250px"}
            priority={featured}
          />
        )}
        <span className="aw-guide-cover-grid" aria-hidden="true" />
        <span className="aw-guide-cover-orbit" aria-hidden="true" />
        <span className="aw-guide-spine" aria-hidden="true"><b>AIW</b></span>
        <span className="aw-guide-cover-brand">AI WORK KIT</span>
        <span className="aw-guide-cover-index">GUIDE {String(number).padStart(3, "0")}</span>
        <strong>{title}</strong>
        <span className="aw-guide-cover-tool">{tool}</span>
      </div>
    </div>
  );
}
