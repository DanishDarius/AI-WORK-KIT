import { NextResponse } from "next/server";
import { getAbonnement } from "@/lib/abonnement";
import { lireFil } from "@/lib/contenu";
import { sessionsPourAbonne } from "@/lib/fil";
import { erreurServeur } from "@/lib/reponses-api";
import { requireActiveUser } from "@/lib/supabase/active-access";

// Lien d'invitation de la communauté WhatsApp des abonnés. C'est une variable
// du serveur (COMMUNAUTE_WHATSAPP_URL, jamais NEXT_PUBLIC_) : elle n'est dans
// aucune page ni aucun fichier envoyé au navigateur, et ne sort d'ici que
// pour un abonné actif (plan produit, chantier 8.2).
function lienCommunaute() {
  const lien = process.env.COMMUNAUTE_WHATSAPP_URL ?? "";
  return /^https:\/\/(chat\.whatsapp\.com|whatsapp\.com)\//.test(lien) ? lien : null;
}

// GET /api/communaute : pour un abonné actif, le lien de la communauté, la
// prochaine session en direct et les replays. Pour un client sans abonnement :
// le titre et la date de la prochaine session, sans aucun lien.
//
// Les sessions viennent du cache (règle C1). Une requête base propre au
// compte : l'abonnement, gardé 60 secondes. La réponse n'est jamais mise en
// cache : la fin d'un abonnement retire le lien tout de suite.
export async function GET() {
  const access = await requireActiveUser();
  if ("response" in access) return access.response;

  let fil;
  try {
    fil = await lireFil();
  } catch (erreur) {
    return erreurServeur("communaute", erreur);
  }
  const abonnement = await getAbonnement(access.user.email);
  const { prochaine, replays } = sessionsPourAbonne(fil);
  const sansCache = { headers: { "Cache-Control": "private, no-store" } };

  if (!abonnement.actif) {
    return NextResponse.json(
      { abonne: false, lien: null, session: prochaine ? { titre: prochaine.titre, debut_le: prochaine.debut_le, lien: null } : null, replays: [] },
      sansCache,
    );
  }
  return NextResponse.json(
    {
      abonne: true,
      lien: lienCommunaute(),
      session: prochaine ? { titre: prochaine.titre, debut_le: prochaine.debut_le, lien: prochaine.lien } : null,
      replays: replays.map((r) => ({ titre: r.titre, debut_le: r.debut_le, replay_url: r.replay_url })),
    },
    sansCache,
  );
}
