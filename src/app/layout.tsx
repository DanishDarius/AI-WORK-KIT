import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./signature.css";
import { Shell } from "@/components/kit-ui";
import { SessionFromHash } from "@/components/session-from-hash";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
export const metadata: Metadata = {
  title: "AI WORK KIT",
  description: "Des tâches concrètes et des prompts pour utiliser l’IA dans votre travail.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <SessionFromHash />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
