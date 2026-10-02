"use client";
import { useEffect } from "react";

// Termine les redirections d'activation et de récupération Supabase lorsque
// la session arrive côté navigateur, sous forme de code PKCE ou de fragment.
// Les modèles d'e-mail de Supabase utilisent le lien {{ .ConfirmationURL }} :
// après vérification, Supabase renvoie vers /activation avec les jetons dans
// l'adresse. La route serveur /auth/confirm couvre en plus les liens en
// token_hash. Les trois formats sont acceptés pour ne pas casser d'anciens liens.
//
// Le composant reste monté sur toutes les pages : un ancien lien, ou un lien
// dont l'adresse de retour n'est pas reconnue, arrive sur l'accueil. En
// contrepartie, il ne charge la bibliothèque Supabase QUE si l'adresse porte
// des jetons : les autres visites, dont la page d'accès, ne la téléchargent pas.
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

    import("@/lib/supabase/client")
      .then(({ createClient }) => {
        const supabase = createClient();
        return code
          ? supabase.auth.exchangeCodeForSession(code)
          : supabase.auth.setSession({ access_token: accessToken!, refresh_token: refreshToken! });
      })
      .then(
        // Recharge la page sans les jetons une fois la session écrite. Sans ce
        // rechargement, les appels API peuvent partir avant la fin de l'échange.
        ({ error }) => window.location.replace(error ? "/connexion?lien=invalide" : cleanUrl),
        () => window.location.replace("/connexion?lien=invalide"),
      );
  }, []);

  return null;
}
