"use client";

import Link from "next/link";
import { useState } from "react";

// Confirmation du lien « ne plus recevoir » : le jeton est lu dans l'adresse
// au moment du clic, puis envoyé au serveur. Aucune connexion n'est demandée.
export function DesabonnementForm() {
  const [etat, setEtat] = useState<"" | "envoi" | "fait" | "invalide" | "echec">("");

  async function confirmer() {
    const jeton = new URLSearchParams(window.location.search).get("j") ?? "";
    setEtat("envoi");
    try {
      const reponse = await fetch("/api/desabonnement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jeton }),
      });
      setEtat(reponse.ok ? "fait" : reponse.status === 400 ? "invalide" : "echec");
    } catch {
      setEtat("echec");
    }
  }

  if (etat === "fait")
    return (
      <div className="stack">
        <p role="status" className="strong">C’est fait : vous ne recevrez plus l’e-mail de la semaine.</p>
        <p className="muted small">Vous pouvez le réactiver à tout moment dans l’application : Profil, puis Notifications.</p>
        <Link className="btn btn-secondary btn-plain" href="/">Ouvrir AIW</Link>
      </div>
    );

  return (
    <div className="stack">
      <button type="button" className="btn btn-block" onClick={confirmer} disabled={etat === "envoi"}>
        {etat === "envoi" ? "Enregistrement…" : "Ne plus recevoir l’e-mail de la semaine"}
      </button>
      {etat === "invalide" && <p className="form-error" role="alert">Ce lien n’est pas valable. Ouvrez-le depuis le dernier e-mail reçu, ou réglez vos notifications dans l’application : Profil, puis Notifications.</p>}
      {etat === "echec" && <p className="form-error" role="alert">L’enregistrement a échoué. Réessayez dans un instant.</p>}
      <Link className="link" href="/">Annuler et ouvrir AIW</Link>
    </div>
  );
}
