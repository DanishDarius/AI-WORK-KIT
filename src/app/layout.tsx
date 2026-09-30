import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionFromHash } from "@/components/session-from-hash";

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

export const metadata: Metadata = {
  applicationName: "AIW",
  appleWebApp: { capable: true, title: "AIW", statusBarStyle: "default" },
  title: { default: "AIW, l’IA au travail", template: "%s | AIW" },
  description: "L’IA au travail, prête à l’emploi : votre IA configurée, des modèles à remplir et des tâches concrètes pour votre métier.",
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
