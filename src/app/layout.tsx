import type { Metadata } from "next";
import "./globals.css";

// Police système par défaut ici — le choix typographique final relève de
// l'interface visuelle, prise en charge côté ChatGPT.
export const metadata: Metadata = {
  title: "AI WORK KIT",
  description: "Une seule IA pour tout ton travail.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
