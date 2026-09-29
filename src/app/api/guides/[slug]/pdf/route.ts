import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getAbonnement } from "@/lib/abonnement";
import { guideInclus } from "@/lib/offre";
import { requireActiveUser } from "@/lib/supabase/active-access";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ slug: string }> };

async function getPdf(request: Request, context: RouteContext, headOnly: boolean) {
  const access = await requireActiveUser();
  if ("response" in access) return access.response;

  const { slug } = await context.params;
  if (!/^guide-\d{3}-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return NextResponse.json({ error: "Guide introuvable" }, { status: 404 });
  }

  const guideNumber = Number(slug.slice(6, 9));
  if (!guideInclus(guideNumber)) {
    const abonnement = await getAbonnement(access.user.email);
    if (!abonnement.actif) {
      return NextResponse.json({ error: "Abonnement Bibliothèque requis" }, { status: 403 });
    }
  }

  const filename = `${slug}.pdf`;
  const pdfPath = path.join(process.cwd(), "private", "guides", "pdf", filename);
  let size: number;
  try {
    const file = await stat(pdfPath);
    if (!file.isFile() || file.size < 1024) throw new Error("PDF missing or incomplete");
    size = file.size;
  } catch {
    return NextResponse.json({ error: "PDF indisponible" }, { status: 404 });
  }

  const headers = new Headers({
    "Content-Type": "application/pdf",
    "Content-Length": String(size),
    "Content-Disposition": `attachment; filename="AI-WORK-KIT-${filename}"`,
    "Cache-Control": "private, no-store, max-age=0",
    "X-Content-Type-Options": "nosniff",
  });
  if (headOnly) return new Response(null, { status: 200, headers });

  const pdf = await readFile(pdfPath);
  return new Response(new Uint8Array(pdf), { status: 200, headers });
}

export async function HEAD(request: Request, context: RouteContext) {
  return getPdf(request, context, true);
}

export async function GET(request: Request, context: RouteContext) {
  return getPdf(request, context, false);
}
