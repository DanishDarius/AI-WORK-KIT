import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { travailQuotidien } from "@/lib/planifie";

// GET /api/planifie/quotidien : le travail de chaque matin (e-mail de la
// semaine, rappels d'échéance). Appelée par le planificateur de Vercel
// (vercel.json), une fois par jour.
//
// Ce n'est pas une route de client : elle ne passe pas par l'accès payé.
// Elle est protégée par un secret (variable CRON_SECRET), que Vercel envoie
// dans l'en-tête Authorization. Sans secret configuré, elle ne fait rien et
// répond 503 (règle S10 : une variable de sécurité absente bloque la
// fonction).
//
// Exception écrite à la règle C4 (« un GET n'écrit jamais ») : le
// planificateur de Vercel n'appelle qu'en GET. La route inscrit les envois au
// journal ; elle est idempotente (relancée le même jour, elle ne renvoie
// aucun e-mail) et bornée (200 e-mails par passage).
export const maxDuration = 60;

function autorise(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return null;
  const recu = Buffer.from(request.headers.get("authorization") ?? "");
  const attendu = Buffer.from(`Bearer ${secret}`);
  return recu.length === attendu.length && timingSafeEqual(recu, attendu);
}

export async function GET(request: Request) {
  const ok = autorise(request);
  if (ok === null) return NextResponse.json({ error: "Planificateur non configuré" }, { status: 503 });
  if (!ok) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  try {
    const bilan = await travailQuotidien();
    console.log("[planifie]", JSON.stringify(bilan));
    return NextResponse.json(bilan, { headers: { "Cache-Control": "no-store" } });
  } catch (erreur) {
    console.error("[planifie]", erreur instanceof Error ? erreur.message : erreur);
    return NextResponse.json({ error: "Le travail planifié a échoué" }, { status: 500 });
  }
}
