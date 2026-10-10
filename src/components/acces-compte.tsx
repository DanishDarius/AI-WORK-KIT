"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { estCookieDeSession } from "@/lib/supabase/cookie-session";
import { Icon } from "./icon";

// La page d'accès est statique (règle C3) : elle est la même pour tout le
// monde et ne coûte aucun calcul au serveur. Ce qui dépend du visiteur
// (déjà connecté ? accès actif ?) se décide ici, dans le navigateur.
//
// Un visiteur sans cookie de session ne déclenche aucune requête : c'est le
// cas de presque tout le trafic d'un lancement.
type Etat = "inconnu" | "deconnecte" | "actif" | "inactif";

let enCours: Promise<Etat> | null = null;

function aUnCookieDeSession() {
  return document.cookie.split(";").some((c) => estCookieDeSession(c.trim().split("=")[0]));
}

function chargerEtat(): Promise<Etat> {
  if (!enCours) {
    enCours = aUnCookieDeSession()
      ? fetch("/api/moi", { credentials: "same-origin", cache: "no-store" })
          .then(async (r): Promise<Etat> => {
            // Seul le statut compte, mais la réponse est lue jusqu'au bout pour
            // libérer la connexion.
            await r.text();
            return r.ok ? "actif" : r.status === 403 ? "inactif" : "deconnecte";
          })
          .catch((): Etat => "deconnecte")
      : Promise.resolve<Etat>("deconnecte");
  }
  return enCours;
}

function useEtatCompte() {
  const [etat, setEtat] = useState<Etat>("inconnu");
  useEffect(() => {
    let actif = true;
    chargerEtat().then((valeur) => {
      if (actif) setEtat(valeur);
    });
    return () => {
      actif = false;
    };
  }, []);
  return etat;
}

// Boutons de l’en-tête de la page d’accès : « Mon parcours » pour un client,
// sinon les offres, plus bas sur la même page (le paiement ouvre bientôt).
export function ActionAcces() {
  const etat = useEtatCompte();
  if (etat === "actif") return <Link className="btn btn-sm" href="/">Mon parcours</Link>;
  return (
    <>
      {etat !== "inactif" && <Link className="link hide-sm" href="/connexion">Se connecter</Link>}
      <a className="btn btn-sm" href="#offres">Voir les offres</a>
    </>
  );
}

// Message affiché à un compte connecté qui n'a pas (ou plus) d'accès actif.
export function AvisCompteInactif() {
  const etat = useEtatCompte();
  // L'adresse (« ?compte=inactif ») est lue dans le navigateur : la page
  // reste statique.
  const signale = useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.search).get("compte") === "inactif",
    () => false,
  );
  if (etat === "actif" || (etat !== "inactif" && !signale)) return null;
  return (
    <div className="wrap" style={{ paddingTop: 20 }}>
      <div className="notice" role="status">
        <Icon name="lock" size={20} />
        <div className="stack-sm">
          <p><b>Votre compte n’a pas encore d’accès actif.</b></p>
          <p>
            Obtenez l’accès avec la même adresse e-mail. Vous avez payé et rien reçu ?{" "}
            <Link className="link" href="/activation/renvoi">Recevez un nouveau lien d’activation</Link>, ou écrivez-nous à
            support@parlonsads.com.
          </p>
        </div>
      </div>
    </div>
  );
}

// Lien de connexion du bas de page, masqué pour une personne déjà connectée.
export function LienDejaClient() {
  const etat = useEtatCompte();
  if (etat === "actif" || etat === "inactif") return null;
  return <Link className="link" href="/connexion">Déjà client ? Se connecter</Link>;
}
