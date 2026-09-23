"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/components/kit-icons";

export function ConnexionForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      <div className="aw-password-field">
        <input
          id="mot-de-passe-connexion"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button
          type="button"
          className="aw-password-toggle"
          aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          aria-pressed={showPassword}
          onClick={() => setShowPassword((visible) => !visible)}
        >
          <Icon name={showPassword ? "eye-off" : "eye"} />
        </button>
      </div>
      {error && (
        <p className="aw-login-error" role="alert">
          {error}
        </p>
      )}
      <button className="button" type="submit" disabled={sending}>
        {sending ? "Connexion…" : "Se connecter"}
      </button>
      <p className="aw-login-help">
        Pas encore de compte ? Il se crée automatiquement après votre achat.
        L’inscription ne se fait pas depuis cette page.
      </p>
    </form>
  );
}
