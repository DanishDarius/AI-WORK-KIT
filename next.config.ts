import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Les guides sont lus sur disque au moment de la requête (page rendue à la
  // demande selon l'abonnement) : les fichiers doivent suivre la fonction.
  outputFileTracingIncludes: {
    "/guides/*": ["./content/guides/**/*"],
  },
};

export default nextConfig;
