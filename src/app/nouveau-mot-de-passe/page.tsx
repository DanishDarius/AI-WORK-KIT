import { Intro } from "@/components/kit-ui";
import { SetPasswordForm } from "@/components/set-password-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { RECOVERY_COOKIE } from "@/lib/supabase/recovery";

export default async function NouveauMotDePasse({
  searchParams,
}: PageProps<"/nouveau-mot-de-passe">) {
  // Les liens envoyés avant cette correction pointent encore ici. Leur code
  // est traité par le même callback serveur que les nouveaux liens.
  const params = await searchParams;
  if (typeof params.code === "string") {
    const callback = new URLSearchParams({ code: params.code });
    if (typeof params.sb_flow_id === "string") {
      callback.set("sb_flow_id", params.sb_flow_id);
    }
    redirect(`/auth/recovery?${callback.toString()}`);
  }

  const recoveryPending = Boolean((await cookies()).get(RECOVERY_COOKIE));
  return (
    <div className="aw-login-page">
      <Intro eyebrow="Sécurité du compte" title="Nouveau mot de passe">
        Choisissez un nouveau mot de passe pour retrouver votre espace.
      </Intro>
      <section className="panel aw-login-panel" aria-label="Nouveau mot de passe">
        <SetPasswordForm mode="recovery" recoveryPending={recoveryPending} />
      </section>
    </div>
  );
}
