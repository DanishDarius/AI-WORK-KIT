import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "AI WORK KIT",
    short_name: "AIW",
    description: "L’intelligence artificielle appliquée à votre travail, concrètement.",
    lang: "fr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F5F1EA",
    theme_color: "#0B6B5E",
    icons: [
      { src: "/brand/atelier/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/brand/atelier/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/brand/atelier/icon-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/brand/atelier/icon-monochrome.png", sizes: "512x512", type: "image/png", purpose: "monochrome" },
    ],
  };
}
