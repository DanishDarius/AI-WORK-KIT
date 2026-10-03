import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { RECOVERY_COOKIE, lienMotDePasseValable, recoveryCookieOptions } from "@/lib/supabase/recovery";

function passwordPage(origin: string, invalid = false) {
  const url = new URL("/nouveau-mot-de-passe", origin);
  if (invalid) url.searchParams.set("lien", "invalide");
  return NextResponse.redirect(url);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) return passwordPage(url.origin, true);

  const supabase = await createClient();
  const flowId = url.searchParams.get("sb_flow_id");
  const { data, error } = await supabase.auth.exchangeCodeForSession(
    code,
    flowId ? { flowId } : undefined,
  );
  const redirectType = (data as typeof data & { redirectType?: string }).redirectType;
  if (error || !data.session || redirectType !== "recovery") {
    if (data.session) {
      await supabase.auth.signOut({ scope: "local" });
    }
    return passwordPage(url.origin, true);
  }
  // Supabase accepte encore ce lien (ses liens valent 24 heures) : passé une
  // heure, c'est nous qui le refusons et fermons la session qu'il a ouverte.
  if (!lienMotDePasseValable(data.session.user.recovery_sent_at)) {
    await supabase.auth.signOut({ scope: "local" });
    return passwordPage(url.origin, true);
  }

  (await cookies()).set(
    RECOVERY_COOKIE,
    data.session.user.id,
    recoveryCookieOptions,
  );
  return passwordPage(url.origin);
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || cookieStore.get(RECOVERY_COOKIE)?.value !== user.id) {
    return NextResponse.json({ error: "Lien invalide ou expiré." }, { status: 401 });
  }

  const body: unknown = await request.json().catch(() => null);
  const password =
    body && typeof body === "object" && "password" in body
      ? (body as { password: unknown }).password
      : null;
  if (typeof password !== "string" || password.length < 8) {
    return NextResponse.json({ error: "Mot de passe invalide." }, { status: 400 });
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return NextResponse.json({ error: "Échec de l'enregistrement." }, { status: 400 });
  }

  await supabase.auth.signOut({ scope: "local" });
  cookieStore.delete(RECOVERY_COOKIE);
  return NextResponse.json({ ok: true });
}
