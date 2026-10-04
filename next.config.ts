import type { NextConfig } from "next";

// En-têtes de sécurité (règle S9), posés sur toutes les réponses.
//
// La CSP liste tout ce que la page a le droit de charger. Tout ajout d'un
// service externe (script, police, iframe, API) passe par cette liste.
// - Scripts : le site, plus le chat du support (tawk.to), chargé au clic.
//   « 'unsafe-inline' » reste nécessaire aux scripts que Next insère dans la
//   page ; une CSP à jeton (nonce) rendrait toutes les pages dynamiques.
// - Images et vidéos : tout site en https (visuels officiels des actualités).
// - Connexions : le site et Supabase (session), plus tawk.to.
// - Cadres : YouTube sans cookie et tawk.to. Le site lui-même ne s'affiche
//   dans aucun cadre (frame-ancestors 'none').
const enDev = process.env.NODE_ENV === "development";
const enPreversion = process.env.VERCEL_ENV === "preview";
const supabase = (() => {
  try {
    const hote = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").host;
    return `https://${hote} wss://${hote}`;
  } catch {
    return "https://*.supabase.co wss://*.supabase.co";
  }
})();
// Barre d'outils de Vercel, injectée seulement sur les préversions.
const vercel = enPreversion ? " https://vercel.live" : "";
const tawk = "https://*.tawk.to";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${enDev ? " 'unsafe-eval'" : ""} ${tawk} https://cdn.jsdelivr.net${vercel}`,
  `style-src 'self' 'unsafe-inline' ${tawk} https://fonts.googleapis.com${vercel}`,
  "img-src 'self' data: blob: https:",
  "media-src 'self' blob: https:",
  `font-src 'self' data: ${tawk} https://fonts.gstatic.com${vercel}`,
  `connect-src 'self' ${supabase} ${tawk} wss://*.tawk.to${enPreversion ? " https://vercel.live wss://ws-us3.pusher.com" : ""}${enDev ? " ws:" : ""}`,
  `frame-src https://www.youtube-nocookie.com ${tawk}${vercel}`,
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(enDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const enTetesSecurite = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // N'annonce pas la technologie du serveur.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: enTetesSecurite }];
  },
  outputFileTracingIncludes: {
    "/api/guides/[slug]/pdf": ["./private/guides/pdf/**/*.pdf"],
    "/api/kits/fichiers/[nom]": ["./private/kits/**/*"],
    "/guides/*": ["./content/guides/**/*"],
  },
  // Anciennes adresses de la version précédente, redirigées vers les écrans
  // qui les remplacent.
  async redirects() {
    return [
      { source: "/mon-compte", destination: "/profil", permanent: true },
      { source: "/favoris", destination: "/profil", permanent: true },
      { source: "/mises-a-jour-ia", destination: "/nouveau", permanent: true },
      { source: "/systemes-ia", destination: "/accompagnement", permanent: true },
      { source: "/transformation-ia", destination: "/accompagnement", permanent: true },
      { source: "/comprendre-les-ia", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
