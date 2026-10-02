import { after, NextResponse } from "next/server";
import { envoyerActivation } from "@/lib/activation";
import { estEmail, normaliserEmail } from "@/lib/normaliser";
import { erreurServeur } from "@/lib/reponses-api";
import { createAdminClient } from "@/lib/supabase/admin";

// POST /api/activation/renvoi : un acheteur redemande son lien d'activation.
// Body attendu : { "email": "vous@exemple.com" }.
//
// Route PUBLIQUE par nature : l'acheteur n'a pas encore de compte. Garde-fous :
// - La réponse est la même pour toute adresse valide, qu'elle ait un achat ou
//   non : la route ne dit pas qui est client.
// - L'e-mail part APRÈS la réponse : le temps de réponse ne dit rien non plus.
// - Un envoi au plus toutes les 5 minutes par adresse (règle S13). Le créneau
//   est pris en base AVANT l'envoi, par une écriture conditionnelle : deux
//   requêtes simultanées n'envoient qu'un e-mail, et si l'écriture échoue,
//   rien ne part.
// - Rien ne part pour une adresse sans accès payé actif.
const DELAI_MS = 5 * 60 * 1000;

const reponse = () => NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const emailBrut = body && typeof body === "object" && "email" in body ? (body as { email: unknown }).email : null;
  if (!estEmail(emailBrut)) {
    return NextResponse.json({ error: "Indiquez une adresse e-mail valide." }, { status: 400 });
  }
  const email = normaliserEmail(emailBrut);

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("acces_clients")
    .select("id, activation_demandee_le")
    .eq("email", email)
    .eq("statut", "actif")
    .order("cree_le", { ascending: true })
    .limit(1);
  if (error) return erreurServeur("activation", error.message);

  const ligne = (data as { id: string; activation_demandee_le: string | null }[] | null)?.[0];
  if (!ligne) return reponse();

  const precedent = ligne.activation_demandee_le;
  if (precedent && Date.now() - new Date(precedent).getTime() < DELAI_MS) return reponse();

  // Prise du créneau : la ligne n'est modifiée que si personne ne l'a prise
  // entre-temps (comparaison avec la valeur lue).
  const prise = admin
    .from("acces_clients")
    .update({ activation_demandee_le: new Date().toISOString() })
    .eq("id", ligne.id);
  const { data: pris, error: erreurPrise } = await (precedent
    ? prise.eq("activation_demandee_le", precedent)
    : prise.is("activation_demandee_le", null)
  ).select("id");
  if (erreurPrise) {
    console.error("[activation] créneau non pris", erreurPrise.message);
    return reponse();
  }
  if (!(pris as { id: string }[] | null)?.length) return reponse();

  const origine = new URL(request.url).origin;
  after(async () => {
    await envoyerActivation(admin, email, origine);
  });
  return reponse();
}
