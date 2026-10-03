import type { MetadataRoute } from "next";
import { NOM, SIGLE, SLOGAN } from "@/lib/marque";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: NOM,
    short_name: SIGLE,
    description: `${SLOGAN}.`,
    lang: "fr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F6F8F7",
    theme_color: "#0B6B5E",
    icons: [
      { src: "/brand/atelier/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/brand/atelier/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/brand/atelier/icon-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/brand/atelier/icon-monochrome.png", sizes: "512x512", type: "image/png", purpose: "monochrome" },
    ],
  };
}
