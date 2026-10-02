import { ResourceState } from "@/components/ui";

// État de chargement des pages réservées (règle Q5) : affiché tout de suite
// pendant que le serveur vérifie l'accès et prépare la page.
export default function Chargement() {
  return (
    <main id="contenu" className="auth">
      <div className="auth-main">
        <div style={{ width: "100%", maxWidth: 760 }}>
          <ResourceState />
        </div>
      </div>
    </main>
  );
}
