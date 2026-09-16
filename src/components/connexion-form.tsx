"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function ConnexionForm() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string>();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    setSending(true);
    setError(undefined);
    const { error: authError } = await createClient().auth.signInWithOtp({
      email: email.trim(),
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${window.location.origin}/`,
      },
    });
    setSending(false);

    if (authError) {
      setError(
        "Impossible d’envoyer le lien. Vérifiez que cette adresse correspond à votre achat, puis réessayez.",
      );
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <div className="aw-login-confirmation" role="status">
        <span className="aw-login-check" aria-hidden="true">
          ✓
        </span>
        <div>
          <h2>Consultez votre boîte mail</h2>
          <p>
            Un lien de connexion vient d’être envoyé à <strong>{email}</strong>.
            Il vous suffit de l’ouvrir sur cet appareil.
          </p>
          <button
            className="text-link mt-4"
            type="button"
            onClick={() => setSent(false)}
          >
            Utiliser une autre adresse
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="aw-login-form" onSubmit={submit}>
      <label htmlFor="email-connexion">Adresse email utilisée lors de l’achat</label>
      <input
        id="email-connexion"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="vous@exemple.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      {error && (
        <p className="action-error" role="alert">
          {error}
        </p>
      )}
      <button className="button" type="submit" disabled={sending}>
        {sending ? "Envoi en cours…" : "Recevoir mon lien de connexion"}
      </button>
      <p className="aw-login-help">
        Aucun mot de passe n’est nécessaire. Pour protéger le contenu, seuls les
        comptes associés à un achat peuvent recevoir un lien.
      </p>
    </form>
  );
}
