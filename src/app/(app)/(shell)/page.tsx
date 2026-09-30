"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Parcours } from "@/components/parcours";
import { Page } from "@/components/shell";
import { ResourceState } from "@/components/ui";
import { useProfil } from "@/lib/profil";

// Accueil : le parcours du métier choisi au premier lancement.
export default function Accueil() {
  const router = useRouter();
  const profil = useProfil();
  const metier = profil?.metier;

  useEffect(() => {
    if (profil && !metier) router.replace("/bienvenue");
  }, [profil, metier, router]);

  if (!metier)
    return (
      <Page>
        <ResourceState />
      </Page>
    );
  return <Parcours slug={metier} />;
}
