import { NextResponse } from "next/server";
import {
  conditionsRemplies,
  contexteAttestation,
  type FichierRendu,
  fichiersValides,
  LIMITE_ENVOIS_JOUR,
  lireConditions,
} from "@/lib/attestations";
import { configR2, lienEnvoi } from "@/lib/r2";
import { erreurServeur } from "@/lib/reponses-api";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireActiveUser } from "@/lib/supabase/active-access";

// POST /api/attestations/[slug]/fichiers : prépare l'envoi des fichiers d'un
// rendu. Body : { "fichiers": [{ "type": "image/jpeg", "taille": 412345 }, …] }
// (1 à 5 fichiers). Réponse : un lien d'envoi par fichier, valable 15 minutes,
// vers l'espace privé de Cloudflare R2. Le navigateur y envoie chaque fichier
// directement ; la route /rendu vérifie ensuite ce qui est arrivé.
//
// Règle S1 et conditions : abonnement actif, kit installé, 5 tâches faites.
// Règle S7 : types et tailles validés ici, puis revérifiés chez R2.
// Règle S13 : un seul rendu en cours par métier, et au plus
// LIMITE_ENVOIS_JOUR demandes de liens par jour ; la base le décide en une
// seule requête (fonction preparer_rendu_attestation, migration 0052).
// Règle C2 : 3 requêtes propres au compte.
export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const ctx = await contexteAttestation(access, slug);
  if ("response" in ctx) return ctx.response;
  const { supabase, user, metier, kit, taches, abonne } = ctx;

  if (!abonne) return NextResponse.json({ error: "L’attestation est réservée aux abonnés." }, { status: 403 });
  const config = configR2();
  if (!config) return NextResponse.json({ error: "L’envoi des fichiers n’est pas encore ouvert. Réessayez plus tard." }, { status: 503 });

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const fichiers = fichiersValides(body?.fichiers);
  if (!fichiers) {
    return NextResponse.json({ error: "Fichiers refusés : 5 au plus, en image (JPG, PNG, WebP) ou en PDF de 20 Mo au plus." }, { status: 400 });
  }

  const conditions = await lireConditions(supabase, user.id, abonne, kit, taches);
  if (!conditionsRemplies(conditions)) {
    return NextResponse.json({ error: "Installez votre kit et faites 5 tâches du métier avant l’exercice final." }, { status: 403 });
  }

  const { data, error } = await createAdminClient().rpc("preparer_rendu_attestation", {
    p_user: user.id,
    p_metier: metier.id,
    p_fichiers: fichiers,
    p_limite_jour: LIMITE_ENVOIS_JOUR,
  });
  if (error) return erreurServeur("attestation-fichiers", error);
  const resultat = (Array.isArray(data) ? data[0] : data) as { rendu_id: string | null; etat: string; fichiers: FichierRendu[] | null } | undefined;

  if (resultat?.etat === "en_attente") {
    return NextResponse.json({ error: "Votre rendu attend sa correction. Vous pourrez en envoyer un autre après." }, { status: 409 });
  }
  if (resultat?.etat === "limite") {
    return NextResponse.json({ error: "Trop d’envois aujourd’hui. Réessayez demain." }, { status: 429 });
  }
  if (resultat?.etat !== "pret" || !resultat.rendu_id || !resultat.fichiers) {
    return NextResponse.json({ error: "Un autre envoi est en cours. Réessayez dans un instant." }, { status: 409 });
  }

  return NextResponse.json(
    {
      rendu_id: resultat.rendu_id,
      envois: resultat.fichiers.map((f) => ({ url: lienEnvoi(config, f.cle, f.type, f.taille), type: f.type })),
    },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
