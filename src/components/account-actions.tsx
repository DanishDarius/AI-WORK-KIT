"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function signOut() {
    if (pending) return;
    setPending(true);
    await createClient().auth.signOut();
    router.replace("/connexion");
    router.refresh();
  }

  return (
    <button
      className="choice-button mt-6"
      type="button"
      disabled={pending}
      onClick={signOut}
    >
      {pending ? "Déconnexion…" : "Se déconnecter"}
    </button>
  );
}
