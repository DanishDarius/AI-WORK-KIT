import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

// Authentification + autorisation commerciale. Une session Supabase valide ne
// suffit pas : l'adresse doit également posséder au moins un accès Chariow actif.
export async function requireActiveUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user?.email) {
    return {
      response: NextResponse.json({ error: "Non connecté" }, { status: 401 }),
    };
  }

  const admin = createAdminClient();
  const { data: accesses, error: accessError } = await admin
    .from("acces_clients")
    .select("id")
    .ilike("email", user.email)
    .eq("statut", "actif")
    .limit(1);

  if (accessError) {
    return {
      response: NextResponse.json(
        { error: "Impossible de vérifier votre accès" },
        { status: 500 },
      ),
    };
  }

  if (!accesses?.length) {
    return {
      response: NextResponse.json(
        { error: "Accès inactif" },
        { status: 403 },
      ),
    };
  }

  return { supabase, user };
}
