// Page d'accueil temporaire — l'interface définitive (design ChatGPT) viendra
// remplacer cette page. Sert pour l'instant à vérifier que le déploiement
// fonctionne et que la connexion à Supabase est bien configurée.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
      <h1 className="text-2xl font-bold">🧰 AI WORK KIT</h1>
      <p className="text-zinc-600">
        Backend en place. L&apos;interface visuelle arrive séparément.
      </p>
    </main>
  );
}
