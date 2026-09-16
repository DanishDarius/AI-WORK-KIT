import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Shell } from "@/components/kit-ui";
import { SessionFromHash } from "@/components/session-from-hash";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
export const metadata: Metadata = {
  title: "AI WORK KIT",
  description: "Une seule IA pour tout ton travail.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('ai-work-kit.preview.theme.v1');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SessionFromHash />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
