"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string>();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setError(undefined);

    const { error: resetError } = await createClient().auth.resetPasswordForEmail(
      email.trim(),
      { redirectTo: `${window.location.origin}/nouveau-mot-de-passe` },
    );

    setSending(false);
    if (resetError) {
      setError("L’envoi est momentanément impossible. Veuillez réessayer.");
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
          <h2>Vérifiez votre boîte mail</h2>
          <p>
            Si un compte correspond à cette adresse, vous recevrez un lien pour
            choisir un nouveau mot de passe.
          </p>
          <Link className="text-link mt-4 inline-block" href="/connexion">
            Retour à la connexion
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="aw-login-form" onSubmit={submit}>
      <label htmlFor="email-recuperation">Adresse email du compte</label>
      <input
        id="email-recuperation"
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
        {sending ? "Envoi en cours…" : "Recevoir le lien de récupération"}
      </button>
      <Link className="text-link justify-self-center" href="/connexion">
        Retour à la connexion
      </Link>
    </form>
  );
}
