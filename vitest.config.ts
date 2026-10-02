import path from "node:path";
import { defineConfig } from "vitest/config";

// Tests des règles AIW (docs/REGLES-AIW.md) et des points sensibles du
// serveur. Environnement Node : aucun test de rendu de composant ici.
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // « server-only » lève une erreur hors d'un bundle serveur de Next : on
      // le remplace par un module vide pour pouvoir tester le code serveur.
      "server-only": path.resolve(__dirname, "tests/outils/server-only.ts"),
      // Le cache de données de Next n'existe que dans son serveur : dans les
      // tests, la fonction mise en cache est appelée directement.
      "next/cache": path.resolve(__dirname, "tests/outils/next-cache.ts"),
    },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    restoreMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,
  },
});
