"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Parcours } from "@/components/parcours";
import { Page } from "@/components/shell";
import { ResourceState } from "@/components/ui";
import { synchroniserProfil, useProfil } from "@/lib/profil";

// Accueil : le parcours du métier choisi au premier lancement.
export default function Accueil() {
  const router = useRouter();
  const profil = useProfil();
  const metier = profil?.metier;
  const pret = profil !== undefined;

  // Une fois par passage à l'accueil : sans profil dans ce navigateur, on
  // relit celui du compte (autre téléphone, navigateur nettoyé) avant
  // d'envoyer vers le questionnaire ; avec un profil, on s'assure que le
  // serveur l'a reçu.
  useEffect(() => {
    if (!pret) return;
    let actif = true;
    synchroniserProfil().then((p) => {
      if (actif && !p.metier) router.replace("/bienvenue");
    });
    return () => {
      actif = false;
    };
  }, [pret, router]);

  if (!metier)
    return (
      <Page>
        <ResourceState />
      </Page>
    );
  return <Parcours slug={metier} />;
}
