"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { oublierCompte, viderCopiesHorsLigne } from "@/lib/hors-ligne";
import { NB_TACHES, PRIX } from "@/lib/offre";
import { oublierProfil } from "@/lib/profil";
import { BoutonPaiement } from "./bouton-paiement";
import { Icon } from "./icon";
import { CheckList, Kicker } from "./ui";

// Cadre commun aux pages de connexion, d'activation et de mot de passe.
export function AuthFrame({
  kicker,
  title,
  intro,
  side = false,
  children,
}: {
  kicker: string;
  title: string;
  intro: ReactNode;
  side?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="auth">
      <header className="auth-top">
        <Link href="/acces" aria-label="AIW, page d’accès">
          <Image src="/brand/atelier/logo-primary.svg" alt="AIW, AI WORK KIT" width={130} height={45} priority />
        </Link>
      </header>
      <main id="contenu" className="auth-main">
        <div className={`auth-card${side ? "" : " is-narrow"}`}>
          <div className="auth-form">
            <Kicker>{kicker}</Kicker>
            <h1 className="h1" style={{ fontSize: 32 }}>{title}</h1>
            <p className="muted">{intro}</p>
            {children}
          </div>
          {side && (
            <div className="auth-side">
              <h2>Pas encore d’accès ?</h2>
              <CheckList items={[{ label: `Les ${NB_TACHES} tâches et leurs consignes` }, { label: "Le kit de votre métier" }, { label: "La mise en place pour votre IA" }, { label: "Le parcours de votre métier" }, { label: "10 guides inclus" }]} />
              <BoutonPaiement className="btn btn-mint btn-block" prix={PRIX.acces} />
              <p className="small" style={{ color: "var(--night-soft)" }}>
                Votre compte est créé dès le paiement confirmé. Vous recevez un e-mail pour choisir votre mot de passe.
              </p>
              <Link className="link" href="/acces" style={{ color: "var(--mint)" }}>Voir ce que contient AIW <Icon name="arrow" size={16} /></Link>
            </div>
          )}
        </div>
      </main>
      <footer className="auth-foot">
        <Link href="/conditions">Conditions</Link>
        <Link href="/confidentialite">Confidentialité</Link>
        <Link href="/mentions-legales">Mentions légales</Link>
      </footer>
    </div>
  );
}

function PasswordInput({ id, value, onChange, autoComplete }: { id: string; value: string; onChange: (v: string) => void; autoComplete: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="password">
      <input id={id} className="input" type={visible ? "text" : "password"} autoComplete={autoComplete} value={value} onChange={(e) => onChange(e.target.value)} required minLength={autoComplete === "new-password" ? 8 : undefined} />
      <button type="button" className="icon-btn is-flat" aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"} aria-pressed={visible} onClick={() => setVisible((v) => !v)}>
        <Icon name={visible ? "eye-off" : "eye"} size={20} />
      </button>
    </div>
  );
}

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
    const { error: authError } = await createClient().auth.signInWithPassword({ email: email.trim(), password });
    setSending(false);
    if (authError) {
      setError("E-mail ou mot de passe incorrect. Vérifiez vos informations, puis réessayez.");
      return;
    }
    router.replace("/");
    router.refresh();
  }

  return (
    <form className="stack" onSubmit={submit}>
      <div className="field">
        <label className="field-label" htmlFor="email-connexion">Adresse e-mail utilisée lors de l’achat</label>
        <input id="email-connexion" className="input" type="email" inputMode="email" autoComplete="email" placeholder="vous@exemple.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="field">
        <div className="field-row">
          <label className="field-label" htmlFor="mot-de-passe-connexion">Mot de passe</label>
          <Link className="small strong" href="/mot-de-passe-oublie">Mot de passe oublié ?</Link>
        </div>
        <PasswordInput id="mot-de-passe-connexion" value={password} onChange={setPassword} autoComplete="current-password" />
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="btn btn-lg btn-block" type="submit" disabled={sending}>{sending ? "Connexion…" : "Se connecter"}</button>
      <p className="form-help">
        Pas encore de compte ? Il se crée automatiquement après votre achat. Vous avez payé et rien reçu ?{" "}
        <Link className="strong" href="/activation/renvoi">Recevoir le lien d’activation</Link>
      </p>
    </form>
  );
}

// Envoi du lien de nouveau mot de passe : un seul endroit, pour le formulaire
// « Mot de passe oublié » et pour le bloc « Mon compte ». Le lien ne s'ouvre
// que dans le navigateur qui l'a demandé, et vaut une heure (/auth/recovery).
async function demanderLienMotDePasse(email: string) {
  const { error } = await createClient().auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/recovery`,
  });
  return !error;
}

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
    const envoye = await demanderLienMotDePasse(email.trim());
    setSending(false);
    if (!envoye) {
      setError("L’envoi a échoué. Réessayez dans un instant.");
      return;
    }
    setSent(true);
  }

  if (sent)
    return (
      <div className="form-ok stack-sm" role="status">
        <p className="strong">Vérifiez votre boîte mail.</p>
        <p>Si cette adresse a un compte, le lien vous attend. Pensez à regarder dans les spams.</p>
        <Link className="link" href="/connexion">Retour à la connexion</Link>
      </div>
    );

  return (
    <form className="stack" onSubmit={submit}>
      <div className="field">
        <label className="field-label" htmlFor="email-recuperation">Adresse e-mail du compte</label>
        <input id="email-recuperation" className="input" type="email" inputMode="email" autoComplete="email" placeholder="vous@exemple.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="btn btn-lg btn-block" type="submit" disabled={sending}>{sending ? "Envoi en cours…" : "Recevoir le lien"}</button>
      <Link className="link" href="/connexion">Retour à la connexion</Link>
    </form>
  );
}

// Renvoi du lien d'activation après un achat. La réponse du serveur est la
// même pour toute adresse : le message ne dit pas si un achat existe.
export function RenvoiActivationForm() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string>();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setError(undefined);
    const response = await fetch("/api/activation/renvoi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim() }),
    }).catch(() => null);
    setSending(false);
    if (!response?.ok) {
      setError(response?.status === 400 ? "Vérifiez l’adresse e-mail, puis réessayez." : "L’envoi a échoué. Réessayez dans un instant.");
      return;
    }
    setSent(true);
  }

  if (sent)
    return (
      <div className="form-ok stack-sm" role="status">
        <p className="strong">Vérifiez votre boîte mail.</p>
        <p>Si un achat attend son activation à cette adresse, un nouveau lien vient de partir. Pensez à regarder dans les spams.</p>
        <p>Rien reçu après quelques minutes ? Vous pouvez refaire une demande toutes les 5 minutes, ou écrire à support@parlonsads.com.</p>
        <p>Compte déjà activé ? <Link className="strong" href="/mot-de-passe-oublie">Choisissez un nouveau mot de passe</Link>.</p>
        <Link className="link" href="/connexion">Retour à la connexion</Link>
      </div>
    );

  return (
    <form className="stack" onSubmit={submit}>
      <div className="field">
        <label className="field-label" htmlFor="email-activation">Adresse e-mail utilisée lors de l’achat</label>
        <input id="email-activation" className="input" type="email" inputMode="email" autoComplete="email" placeholder="vous@exemple.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="btn btn-lg btn-block" type="submit" disabled={sending}>{sending ? "Envoi en cours…" : "Recevoir le lien"}</button>
      <Link className="link" href="/connexion">Retour à la connexion</Link>
    </form>
  );
}

const hasSupabaseConfig = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export function SetPasswordForm({ mode, recoveryPending = false }: { mode: "activation" | "recovery"; recoveryPending?: boolean }) {
  const [sessionState, setSessionState] = useState<"checking" | "ready" | "missing">("checking");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [saving, setSaving] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!hasSupabaseConfig) return;
    if (mode === "recovery" && !recoveryPending) return;
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setSessionState(data.user ? "ready" : "missing"));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setSessionState("ready");
    });
    return () => subscription.unsubscribe();
  }, [mode, recoveryPending]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    if (password.length < 8) return setError("Le mot de passe doit contenir au moins 8 caractères.");
    if (password !== confirmation) return setError("Les deux mots de passe ne correspondent pas.");
    setSaving(true);
    setError(undefined);
    if (mode === "recovery") {
      const response = await fetch("/auth/recovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      }).catch(() => null);
      setSaving(false);
      if (!response?.ok) return setError("L’enregistrement a échoué. Demandez un nouveau lien.");
      setCompleted(true);
      return;
    }
    const { error: updateError } = await createClient().auth.updateUser({ password });
    setSaving(false);
    if (updateError) return setError("L’enregistrement a échoué. Demandez un nouveau lien.");
    window.location.replace("/bienvenue");
  }

  if (!hasSupabaseConfig) return <p role="status">La connexion est momentanément indisponible. Réessayez plus tard.</p>;
  const state = mode === "recovery" && !recoveryPending ? "missing" : sessionState;
  if (state === "checking") return <p role="status" className="muted">Vérification de votre lien…</p>;
  if (completed)
    return (
      <div className="form-ok stack-sm" role="status">
        <p className="strong">Mot de passe enregistré.</p>
        <p>Connectez-vous avec votre nouveau mot de passe.</p>
        <a className="btn btn-sm" href="/connexion">Se connecter</a>
      </div>
    );
  if (state === "missing")
    return (
      <div className="form-error stack-sm" role="alert">
        <p className="strong">Lien invalide ou expiré.</p>
        <p>Ce lien ne fonctionne plus. Demandez-en un nouveau, il arrive en quelques secondes.</p>
        <Link className="btn btn-sm" href={mode === "activation" ? "/activation/renvoi" : "/mot-de-passe-oublie"}>Demander un nouveau lien</Link>
      </div>
    );

  return (
    <form className="stack" onSubmit={submit}>
      <div className="field">
        <label className="field-label" htmlFor="nouveau-mot-de-passe">Nouveau mot de passe</label>
        <PasswordInput id="nouveau-mot-de-passe" value={password} onChange={setPassword} autoComplete="new-password" />
      </div>
      <div className="field">
        <label className="field-label" htmlFor="confirmation-mot-de-passe">Confirmer le mot de passe</label>
        <PasswordInput id="confirmation-mot-de-passe" value={confirmation} onChange={setConfirmation} autoComplete="new-password" />
      </div>
      <p className="form-help">Au moins 8 caractères.</p>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="btn btn-lg btn-block" type="submit" disabled={saving}>
        {saving ? "Enregistrement…" : mode === "activation" ? "Activer mon compte" : "Enregistrer le mot de passe"}
      </button>
    </form>
  );
}

// Bloc « Mon compte » du profil : changer son mot de passe sans se
// déconnecter, et se déconnecter. Supabase n'envoie qu'un e-mail par minute
// à une même adresse : un second clic trop rapide affiche l'échec.
export function ActionsCompte({ email }: { email?: string }) {
  const [etat, setEtat] = useState<"repos" | "envoi" | "envoye" | "echec">("repos");
  const occupe = etat === "envoi" || etat === "envoye";

  async function envoyer() {
    if (!email || occupe) return;
    setEtat("envoi");
    setEtat((await demanderLienMotDePasse(email)) ? "envoye" : "echec");
  }

  return (
    <div className="stack-sm">
      {etat === "envoye" ? (
        <p className="form-ok" role="status">Un lien vient de partir à {email}. Il est valable 1 heure : ouvrez-le sur cet appareil, dans ce navigateur.</p>
      ) : etat === "echec" ? (
        <p className="form-error" role="alert">L’envoi a échoué. Réessayez dans une minute.</p>
      ) : (
        <p className="form-help">Pour changer de mot de passe, vous recevez un lien par e-mail.</p>
      )}
      <div className="row">
        <button type="button" className="btn btn-secondary btn-sm btn-plain" onClick={envoyer} disabled={!email || occupe}>
          <Icon name="lock" size={16} />
          {etat === "envoi" ? "Envoi en cours…" : "Changer mon mot de passe"}
        </button>
        <SignOutButton />
      </div>
    </div>
  );
}

function SignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  async function signOut() {
    if (pending) return;
    setPending(true);
    // Rien de ce compte ne reste dans ce navigateur : ni les copies du mode
    // hors ligne, ni le profil (il est gardé en base).
    await viderCopiesHorsLigne();
    oublierProfil();
    oublierCompte();
    await createClient().auth.signOut();
    router.replace("/acces");
    router.refresh();
  }
  return (
    <button type="button" className="btn btn-secondary btn-sm btn-plain" disabled={pending} onClick={signOut}>
      <Icon name="logout" size={16} />
      {pending ? "Déconnexion…" : "Se déconnecter"}
    </button>
  );
}
