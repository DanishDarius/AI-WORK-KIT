import { NextResponse } from "next/server";
import { lireCatalogue, lireKit, metierParSlug } from "@/lib/contenu";
import { erreurServeur } from "@/lib/reponses-api";
import { cheminsChoisis, idsRessourcesInstallees } from "@/lib/suivi";
import { requireActiveUser } from "@/lib/supabase/active-access";

// GET /api/kits/[slug] : le kit d'un métier (ressources, étapes
// d'installation, encadrés) et ce que l'utilisateur a déjà installé.
//
// Règle S2 : ce contenu est payant, il passe par cette route protégée.
// Le contenu vient du cache (règle C1). Restent 2 requêtes base, lancées
// ensemble : IA choisies et ressources installées. Un métier sans kit répond
// « kit: null » sans aucune requête propre au compte.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { supabase, user } = access;

  let catalogue;
  try {
    catalogue = await lireCatalogue();
  } catch (erreur) {
    return erreurServeur("kit", erreur);
  }
  const metier = metierParSlug(catalogue, slug);
  if (!metier) {
    return NextResponse.json({ error: "Métier introuvable" }, { status: 404 });
  }

  let kit;
  try {
    kit = await lireKit(metier.id);
  } catch (erreur) {
    return erreurServeur("kit", erreur);
  }
  const entete = { headers: { "Cache-Control": "private, no-store" } };
  const metierPublic = { slug: metier.slug, nom: metier.nom };
  if (!kit) return NextResponse.json({ metier: metierPublic, kit: null }, entete);

  const [chemins, installees] = await Promise.all([
    cheminsChoisis(supabase, user.id),
    idsRessourcesInstallees(supabase, user.id),
  ]);

  const ressources = kit.ressources.map((r) => ({
    ...r,
    installee: installees.has(r.id),
    // Les tâches qui s'en servent : seulement celles du catalogue.
    taches: r.taches
      .map((id) => catalogue.taches[id])
      .filter(Boolean)
      .map((t) => ({ id: t.id, code: t.code, titre: t.titre })),
  }));

  return NextResponse.json(
    {
      metier: metierPublic,
      chemin_choisi: chemins.get(metier.id) ?? null,
      kit: { ...kit, ressources },
    },
    entete,
  );
}
