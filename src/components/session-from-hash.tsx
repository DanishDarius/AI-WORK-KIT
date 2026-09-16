"use client";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

// Termine les redirections d'activation et de récupération Supabase lorsque
// la session arrive côté navigateur, sous forme de code PKCE ou de fragment.
// La route serveur /auth/confirm couvre en parallèle les modèles utilisant un
// token_hash. Les trois formats sont acceptés pour ne pas casser d'anciens liens.
export function SessionFromHash() {
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = hashParams.get("access_token");
    const refreshToken = hashParams.get("refresh_token");
    const code = queryParams.get("code");
    if ((!accessToken || !refreshToken) && !code) return;

    queryParams.delete("code");
    queryParams.delete("error");
    queryParams.delete("error_code");
    queryParams.delete("error_description");
    const query = queryParams.toString();
    const cleanUrl = `${window.location.pathname}${query ? `?${query}` : ""}`;
    const supabase = createClient();
    const exchange = code
      ? supabase.auth.exchangeCodeForSession(code)
      : supabase.auth.setSession({
          access_token: accessToken!,
          refresh_token: refreshToken!,
        });

    exchange.then(({ error }) => {
      // Recharge la page sans les jetons une fois la session écrite. Sans ce
      // rechargement, les appels API peuvent partir avant la fin de l'échange.
      window.location.replace(error ? "/connexion?lien=invalide" : cleanUrl);
    });
  }, []);

  return null;
}
