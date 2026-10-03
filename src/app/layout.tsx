import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionFromHash } from "@/components/session-from-hash";
import { NOM, SIGLE, SITE, SLOGAN } from "@/lib/marque";

// Système visuel AIW : deux polices arrondies, gratuites (licence OFL),
// servies depuis le site (aucun appel à Google Fonts).
const nunito = localFont({
  src: "../fonts/Nunito-latin-variable.woff2",
  weight: "200 1000",
  display: "swap",
  variable: "--font-nunito",
});

const varela = localFont({
  src: "../fonts/VarelaRound-latin-400.woff2",
  weight: "400",
  display: "swap",
  variable: "--font-varela",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0B6B5E",
};

const DESCRIPTION = `${SLOGAN} : votre IA configurée, des modèles à remplir et des tâches concrètes pour votre métier.`;

// L'image d'un lien partagé (WhatsApp, Facebook) est src/app/opengraph-image.png.
// metadataBase donne son adresse complète, sur le site en ligne.
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  applicationName: SIGLE,
  appleWebApp: { capable: true, title: SIGLE, statusBarStyle: "default" },
  title: { default: `${SIGLE} : ${SLOGAN}`, template: `%s | ${SIGLE}` },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: NOM,
    title: `${SIGLE} : ${SLOGAN}`,
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${nunito.variable} ${varela.variable}`} suppressHydrationWarning>
      <body>
        <SessionFromHash />
        {children}
      </body>
    </html>
  );
}
