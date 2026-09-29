import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./signature.css";
import "./atelier.css";
import "./approved-home.css";
import "./responsive-experience.css";
import "./approved-interior.css";
import { Shell } from "@/components/kit-ui";
import { SessionFromHash } from "@/components/session-from-hash";

const plusJakartaSans = localFont({
  src: [
    { path: "../fonts/PlusJakartaSans-variable.ttf", weight: "200 800", style: "normal" },
    { path: "../fonts/PlusJakartaSans-Italic-variable.ttf", weight: "200 800", style: "italic" },
  ],
  display: "swap",
  variable: "--font-plus-jakarta",
});

const bricolageGrotesque = localFont({
  src: "../fonts/BricolageGrotesque-variable.ttf",
  weight: "200 800",
  display: "swap",
  variable: "--font-bricolage",
});

const outfit = localFont({
  src: "../fonts/Outfit-variable.ttf",
  weight: "100 900",
  display: "swap",
  variable: "--font-outfit",
});

const geist = localFont({
  src: [
    { path: "../fonts/Geist-variable.ttf", weight: "100 900", style: "normal" },
    { path: "../fonts/Geist-Italic-variable.ttf", weight: "100 900", style: "italic" },
  ],
  display: "swap",
  variable: "--font-geist",
});

const dmMono = localFont({
  src: [
    { path: "../fonts/DMMono-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/DMMono-Medium.ttf", weight: "500", style: "normal" },
  ],
  display: "swap",
  variable: "--font-dm-mono",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0B6B5E",
};
export const metadata: Metadata = {
  applicationName: "AI WORK KIT",
  appleWebApp: { capable: true, title: "AIW", statusBarStyle: "default" },
  title: "AI WORK KIT",
  description: "Choisissez une tâche, copiez le prompt, gagnez du temps. L’IA appliquée à votre métier.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${plusJakartaSans.variable} ${bricolageGrotesque.variable} ${outfit.variable} ${geist.variable} ${dmMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <SessionFromHash />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
