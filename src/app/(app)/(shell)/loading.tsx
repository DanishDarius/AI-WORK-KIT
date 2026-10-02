import { Page } from "@/components/shell";
import { ResourceState } from "@/components/ui";

// État de chargement des écrans du menu (règle Q5) : le menu reste en place,
// seule la zone de contenu montre le squelette.
export default function Chargement() {
  return (
    <Page>
      <ResourceState />
    </Page>
  );
}
