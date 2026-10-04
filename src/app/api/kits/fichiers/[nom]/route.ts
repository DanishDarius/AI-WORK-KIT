import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { requireActiveUser } from "@/lib/supabase/active-access";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/kits/fichiers/[nom] : un fichier d'un kit (document Excel ou Word,
// skill en ZIP). Les fichiers sont dans private/kits : rien n'est servi sans
// session et sans accès payé (règle S2).
//
// Règle S7 : le nom est validé par un motif strict (minuscules, chiffres,
// tirets, une extension connue). Aucun chemin, aucun « .. » ne passe.
const NOM = /^[a-z0-9]+(?:-[a-z0-9]+)*\.(zip|xlsx|docx)$/;
const TYPES: Record<string, string> = {
  zip: "application/zip",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

type RouteContext = { params: Promise<{ nom: string }> };

async function servir(context: RouteContext, enTeteSeul: boolean) {
  const access = await requireActiveUser();
  if ("response" in access) return access.response;

  const { nom } = await context.params;
  const extension = nom.match(NOM)?.[1];
  if (!extension) {
    return NextResponse.json({ error: "Fichier introuvable" }, { status: 404 });
  }

  const chemin = path.join(process.cwd(), "private", "kits", nom);
  let taille: number;
  try {
    const fichier = await stat(chemin);
    if (!fichier.isFile() || fichier.size === 0) throw new Error("fichier absent ou vide");
    taille = fichier.size;
  } catch {
    return NextResponse.json({ error: "Fichier indisponible" }, { status: 404 });
  }

  const headers = new Headers({
    "Content-Type": TYPES[extension],
    "Content-Length": String(taille),
    "Content-Disposition": `attachment; filename="AIW-${nom}"`,
    "Cache-Control": "private, no-store, max-age=0",
    "X-Content-Type-Options": "nosniff",
  });
  if (enTeteSeul) return new Response(null, { status: 200, headers });

  const contenu = await readFile(chemin);
  return new Response(new Uint8Array(contenu), { status: 200, headers });
}

export async function HEAD(_request: Request, context: RouteContext) {
  return servir(context, true);
}

export async function GET(_request: Request, context: RouteContext) {
  return servir(context, false);
}
