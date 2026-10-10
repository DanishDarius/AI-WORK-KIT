import { fcfa } from "@/lib/offre";

// Le bouton d'achat, tant que le paiement n'est pas ouvert. Chariow est
// débranché (décision du 10 octobre 2026) ; le paiement se fera dans AIW,
// par Mobile Money avec Moneaa (étape 2, à venir). D'ici là, le bouton ne
// mène nulle part et le dit.
export function BoutonPaiement({ className = "btn", prix }: { className?: string; prix?: number }) {
  return (
    <button type="button" className={className} disabled>
      {prix ? `Paiement bientôt disponible · ${fcfa(prix)}` : "Paiement bientôt disponible"}
    </button>
  );
}
