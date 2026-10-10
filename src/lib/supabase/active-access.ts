import "server-only";

import { NextResponse } from "next/server";
import { accesActif } from "@/lib/acces-actif";
import { createClient } from "@/lib/supabase/server";
import { lireSession } from "@/lib/supabase/session";

// Authentification + autorisation commerciale des routes API. Une session
// valide ne suffit pas : l'adresse doit posséder un accès actif (table acces_clients).
//
// Coût (règle C2) : aucun appel au serveur d'authentification, et au plus
// une requête base par minute et par compte pour l'accès.
export async function requireActiveUser() {
  const supabase = await createClient();
  const user = await lireSession(supabase);
  if (!user) {
    return {
      response: NextResponse.json({ error: "Non connecté" }, { status: 401 }),
    };
  }

  let acces;
  try {
    acces = await accesActif(user.email);
  } catch (erreur) {
    console.error("[acces] vérification impossible", erreur);
    return {
      response: NextResponse.json(
        { error: "Impossible de vérifier votre accès" },
        { status: 500 },
      ),
    };
  }

  if (!acces.actif) {
    return {
      response: NextResponse.json(
        { error: "Accès inactif" },
        { status: 403 },
      ),
    };
  }

  return { supabase, user, accesDepuis: acces.depuis };
}
