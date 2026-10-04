import { NextResponse } from "next/server";
import { lireCatalogue, lireComplementsTache, lireExercices, metierParSlug, ressourcesPourMetier, tachesDuMetier } from "@/lib/contenu";
import { miseEnPlaceDeLaTache } from "@/lib/mise-en-place";
import { estUuid } from "@/lib/normaliser";
import { erreurServeur } from "@/lib/reponses-api";
import { cheminsChoisis, idsFavoris, idsTachesFaites } from "@/lib/suivi";
import { requireActiveUser } from "@/lib/supabase/active-access";

// GET /api/taches/[id]?metier=<slug> : détail d'une tâche : ses cas pratiques,
// avec pour chacun les 3 prompts (chatgpt / claude / gemini). Une tâche d'un
// kit porte en plus son résultat, ses étapes, son modèle à remplir et les
// ressources du kit qui lui servent : celles du kit du métier d'où l'on vient,
// car une tâche partagée est reliée aux kits de plusieurs métiers.
//
// Le paramètre "metier" (slug) est nécessaire car une tâche peut appartenir
// à plusieurs métiers : il indique de quel métier on vient, pour savoir
// quelle IA (chemin choisi) proposer par défaut sur cette page.
//
// Le contenu vient du cache (règle C1). Restent 3 requêtes base, lancées
// ensemble : IA choisies, tâches faites, favoris. La réponse porte aussi le
// nom du métier et la tâche suivante : la page n'a pas d'autre route à
// appeler pour s'afficher (règle C2). Cette route ne fait QUE lire (règle
// C4) : la consultation s'enregistre par POST /vue.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const metierSlug = new URL(request.url).searchParams.get("metier");

  if (!estUuid(id)) {
    return NextResponse.json({ error: "Tâche introuvable" }, { status: 404 });
  }
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { supabase, user } = access;

  let catalogue;
  try {
    catalogue = await lireCatalogue();
  } catch (erreur) {
    return erreurServeur("tache", erreur);
  }
  const tache = catalogue.taches[id];
  if (!tache) {
    return NextResponse.json({ error: "Tâche introuvable" }, { status: 404 });
  }
  const metier = metierParSlug(catalogue, metierSlug);

  let exercices, complements;
  try {
    [exercices, complements] = await Promise.all([lireExercices(tache.id), lireComplementsTache(tache.id)]);
  } catch (erreur) {
    return erreurServeur("tache", erreur);
  }

  const [chemins, faites, favoris] = await Promise.all([
    cheminsChoisis(supabase, user.id),
    idsTachesFaites(supabase, user.id),
    idsFavoris(supabase, user.id),
  ]);

  // Tâche suivante du parcours : la prochaine pas encore faite, sinon celle
  // qui suit dans l'ordre.
  const parcours = metier ? tachesDuMetier(catalogue, metier.id) : [];
  const position = parcours.findIndex((t) => t.id === tache.id);
  const apres = position >= 0 ? parcours.slice(position + 1) : [];
  const suivante = apres.find((t) => !faites.has(t.id)) ?? apres[0] ?? null;

  return NextResponse.json({
    tache: {
      code: tache.code,
      titre: tache.titre,
      limite_connue: tache.limite_connue,
      ia_alternative_conseillee: tache.ia_alternative_conseillee,
      resultat: tache.resultat,
      etapes: tache.etapes,
      precisions: tache.precisions,
      gratuit_ok: tache.gratuit_ok,
      mobile_ok: tache.mobile_ok,
      outil_gratuit_conseille: tache.outil_gratuit_conseille,
      video_url: tache.video_url,
    },
    ia_par_defaut: (metier && chemins.get(metier.id)) ?? null,
    fait: faites.has(tache.id),
    favori: favoris.has(tache.id),
    metier_nom: metier?.nom ?? null,
    suivante_id: suivante?.id ?? null,
    exercices,
    modele: complements.modele,
    ressources: ressourcesPourMetier(complements.ressources, metier?.id ?? null),
    // Une tâche qui a son modèle à remplir se suffit : son kit remplace
    // l'ancienne mise en place (outils et automatisations écrits dans le code,
    // souvent liés à une offre payante de l'IA).
    mise_en_place: complements.modele ? null : miseEnPlaceDeLaTache(tache.code),
  });
}
