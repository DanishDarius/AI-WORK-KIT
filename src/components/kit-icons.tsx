import type { ReactNode } from "react";

const paths: Record<string, ReactNode> = {
  arrow: (
    <>
      <path d="M7 17 17 7M7 7h10v10" />
    </>
  ),
  right: <path d="M5 12h14m-6-6 6 6-6 6" />,
  left: <path d="M19 12H5m6-6-6 6 6 6" />,
  down: <path d="M12 5v14m-6-6 6 6 6-6" />,
  chevron: <path d="m9 6 6 6-6 6" />,
  tasks: (
    <>
      <path d="m3 6 2 2 3-3m-5 9 2 2 3-3M12 7h9M12 15h9M12 21h9" />
    </>
  ),
  jobs: (
    <>
      <rect x="3" y="7" width="18" height="14" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12a20 20 0 0 0 18 0M12 10v5" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </>
  ),
  sparkles: (
    <>
      <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3ZM4 2v4M2 4h4" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="7" width="18" height="14" rx="2" />
      <path d="m3 7 17-4 1 4M7 3l3 4m4-6 3 4" />
    </>
  ),
  play: <path d="m9 5 11 7-11 7V5Z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1" />
    </>
  ),
  moon: <path d="M20.8 13A9 9 0 0 1 11 3.2 9 9 0 1 0 20.8 13Z" />,
  copy: (
    <>
      <rect x="8" y="8" width="12" height="13" rx="2" />
      <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 10 5-10 5L2 8l10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5" />
    </>
  ),
  analysis: (
    <>
      <path d="M3 3v18h18M7 14l4-5 4 3 5-7" />
    </>
  ),
  writing: (
    <>
      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M10 14l1-4 8-8 3 3-8 8-4 1Z" />
    </>
  ),
  creative: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="8" cy="9" r="1" />
      <circle cx="12" cy="6" r="1" />
      <circle cx="16" cy="9" r="1" />
      <path d="M20 17h-6a3 3 0 0 1-3-3" />
    </>
  ),
  messages: (
    <>
      <path d="M21 11a2 2 0 0 1-2 2H9l-5 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v6Z" />
      <path d="M8 17v2a2 2 0 0 0 2 2h8l4 2v-7" />
    </>
  ),
};
export function Icon({ name, size = 17 }: { name: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.tasks}
    </svg>
  );
}
