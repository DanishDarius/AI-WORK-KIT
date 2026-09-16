"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function SetPasswordForm({ mode }: { mode: "activation" | "recovery" }) {
  const [sessionState, setSessionState] = useState<
    "checking" | "ready" | "missing"
  >("checking");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [saving, setSaving] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setSessionState(data.user ? "ready" : "missing");
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setSessionState("ready");
    });
    return () => subscription.unsubscribe();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (password !== confirmation) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setSaving(true);
    setError(undefined);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setSaving(false);

    if (updateError) {
      setError("Le mot de passe n’a pas pu être enregistré. Demandez un nouveau lien.");
      return;
    }

    if (mode === "activation") {
      window.location.replace("/");
      return;
    }

    await supabase.auth.signOut();
    setCompleted(true);
  }

  if (sessionState === "checking") {
    return <p role="status">Vérification de votre lien…</p>;
  }

  if (sessionState === "missing") {
    return (
      <div className="aw-login-confirmation" role="alert">
        <div>
          <h2>Lien invalide ou expiré</h2>
          <p>Demandez un nouveau lien pour sécuriser l’accès à votre compte.</p>
          <Link className="button mt-5" href="/mot-de-passe-oublie">
            Demander un nouveau lien
          </Link>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="aw-login-confirmation" role="status">
        <span className="aw-login-check" aria-hidden="true">
          ✓
        </span>
        <div>
          <h2>Mot de passe enregistré</h2>
          <p>Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.</p>
          <Link className="button mt-5" href="/connexion">
            Se connecter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="aw-login-form" onSubmit={submit}>
      <label htmlFor="nouveau-mot-de-passe">Nouveau mot de passe</label>
      <input
        id="nouveau-mot-de-passe"
        name="password"
        type="password"
        autoComplete="new-password"
        minLength={8}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <label htmlFor="confirmation-mot-de-passe">Confirmer le mot de passe</label>
      <input
        id="confirmation-mot-de-passe"
        name="password-confirmation"
        type="password"
        autoComplete="new-password"
        minLength={8}
        value={confirmation}
        onChange={(event) => setConfirmation(event.target.value)}
        required
      />
      <p className="aw-login-help">Utilisez au moins 8 caractères.</p>
      {error && (
        <p className="action-error" role="alert">
          {error}
        </p>
      )}
      <button className="button" type="submit" disabled={saving}>
        {saving
          ? "Enregistrement…"
          : mode === "activation"
            ? "Activer mon compte"
            : "Enregistrer le nouveau mot de passe"}
      </button>
    </form>
  );
}
