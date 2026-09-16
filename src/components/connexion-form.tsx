"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function ConnexionForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string>();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    setSending(true);
    setError(undefined);
    const { error: authError } = await createClient().auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setSending(false);

    if (authError) {
      setError(
        "Email ou mot de passe incorrect. Vérifiez vos informations, puis réessayez.",
      );
      return;
    }

    router.replace("/");
    router.refresh();
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
      <div className="aw-password-heading">
        <label htmlFor="mot-de-passe-connexion">Mot de passe</label>
        <Link href="/mot-de-passe-oublie">Mot de passe oublié ?</Link>
      </div>
      <input
        id="mot-de-passe-connexion"
        name="password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      {error && (
        <p className="action-error" role="alert">
          {error}
        </p>
      )}
      <button className="button" type="submit" disabled={sending}>
        {sending ? "Connexion…" : "Se connecter"}
      </button>
      <p className="aw-login-help">
        Votre compte est créé après la validation de votre achat. Il n’est pas
        possible de s’inscrire directement depuis cette page.
      </p>
    </form>
  );
}
