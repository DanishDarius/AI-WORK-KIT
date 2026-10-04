import { NextResponse } from "next/server";
import { lireCatalogue, metierParSlug } from "@/lib/contenu";
import { lireProfilRecu, type Profil } from "@/lib/profil-commun";
import { erreurServeur } from "@/lib/reponses-api";
import { requireActiveUser } from "@/lib/supabase/active-access";

type Ligne = { public: Profil["type"]; metier_slug: string | null; appareil: Profil["appareil"]; outils: Profil["outils"] | null; pays: Profil["pays"] };

const SANS_CACHE = { headers: { "Cache-Control": "private, no-store" } };

// GET /api/profil : le profil du compte connecté, ou null s'il n'a pas encore
// répondu au questionnaire « Bienvenue ». Une requête base, propre au compte
// (la RLS limite chaque compte à sa ligne).
export async function GET() {
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { supabase, user } = access;

  const { data, error } = await supabase
    .from("profils")
    .select("public, metier_slug, appareil, outils, pays")
    .eq("user_id", user.id)
    .maybeSingle();
  if (error) return erreurServeur("profil", error.message);

  const ligne = data as Ligne | null;
  const profil: Profil | null = ligne
    ? { type: ligne.public ?? null, metier: ligne.metier_slug ?? null, outils: Array.isArray(ligne.outils) ? ligne.outils : [], appareil: ligne.appareil ?? null, pays: ligne.pays ?? null }
    : null;
  return NextResponse.json({ profil }, SANS_CACHE);
}

// PUT /api/profil : enregistre le profil du compte connecté. Body attendu :
// { type, metier, outils, appareil, pays } (chaque valeur peut être nulle).
//
// Règle S7 : chaque valeur est comparée à la liste permise, et le métier doit
// exister dans le catalogue. Règle S13 : une seule ligne par compte (clé
// primaire), que cette route crée ou remplace ; un compte ne peut donc pas
// écrire plus d'une ligne.
export async function PUT(request: Request) {
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { supabase, user } = access;

  const profil = lireProfilRecu(await request.json().catch(() => null));
  if (!profil) {
    return NextResponse.json({ error: "Profil invalide" }, { status: 400 });
  }

  if (profil.metier) {
    let metier;
    try {
      metier = metierParSlug(await lireCatalogue(), profil.metier);
    } catch (erreur) {
      return erreurServeur("profil", erreur);
    }
    if (!metier) {
      return NextResponse.json({ error: "Métier introuvable" }, { status: 404 });
    }
  }

  const { error } = await supabase.from("profils").upsert(
    {
      user_id: user.id,
      public: profil.type,
      metier_slug: profil.metier,
      appareil: profil.appareil,
      outils: profil.outils,
      pays: profil.pays,
      maj_le: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );
  if (error) return erreurServeur("profil", error.message);

  return NextResponse.json({ ok: true, profil }, SANS_CACHE);
}
