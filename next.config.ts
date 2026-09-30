import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/guides/[slug]/pdf": ["./private/guides/pdf/**/*.pdf"],
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
