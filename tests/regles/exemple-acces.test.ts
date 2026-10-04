import { describe, expect, it } from "vitest";
import { EXEMPLE_RESSOURCE, EXEMPLE_TACHE } from "@/lib/exemple-acces";
import { champsManquants, remplirGabarit } from "@/lib/gabarit";
import { estClient, lire, sources } from "../outils/fichiers";

// L'exemple complet de la page d'accès est le seul contenu payant visible sans
// compte (plan produit, chantier 8.1). Trois garde-fous :
// - règle Q7 : ses textes sont ceux de la migration du kit, mot pour mot ;
// - règle S2 : il ne part pas dans un fichier JavaScript du navigateur, et
//   aucun autre contenu payant ne le rejoint par mégarde ;
// - ses chiffres sont justes.

// Le contenu du kit « Commerce et vente en ligne », tel qu'il est écrit en base.
const MIGRATION = lire("supabase/migrations/0019_kit_commerce.sql").replaceAll("''", "'");

describe("Q7 · l'exemple de la page d'accès reprend le contenu du kit sans le réécrire", () => {
  const textes: [string, string][] = [
    ["le titre de la tâche", EXEMPLE_TACHE.titre],
    ["le résultat de la tâche", EXEMPLE_TACHE.resultat],
    ["le titre du cas", EXEMPLE_TACHE.cas.titre],
    ["le contexte du cas", EXEMPLE_TACHE.cas.contexte],
    ["les données du cas", EXEMPLE_TACHE.cas.donnees],
    ["le travail à faire", EXEMPLE_TACHE.cas.travail],
    ["la réponse attendue", EXEMPLE_TACHE.cas.reponse],
    ["le gabarit de la consigne", EXEMPLE_TACHE.modele.gabarit],
    ["l'avertissement du modèle", EXEMPLE_TACHE.modele.avertissement],
    ["le titre de la ressource", EXEMPLE_RESSOURCE.titre],
    ["la description de la ressource", EXEMPLE_RESSOURCE.description],
    ["le texte de la ressource", EXEMPLE_RESSOURCE.contenu],
    ["la mention du compte gratuit", EXEMPLE_RESSOURCE.gratuit],
    ["la mention du téléphone", EXEMPLE_RESSOURCE.telephone],
    ...EXEMPLE_RESSOURCE.etapes.map((etape, i): [string, string] => [`l'étape d'installation ${i + 1}`, etape]),
    ...EXEMPLE_TACHE.modele.champs.flatMap((c): [string, string][] => [[`le libellé du champ ${c.cle}`, c.libelle], [`l'exemple du champ ${c.cle}`, c.exemple]]),
  ];

  it("lit la migration du kit", () => {
    expect(MIGRATION.length).toBeGreaterThan(10_000);
  });

  it.each(textes)("%s est dans la migration 0019, mot pour mot", (_, texte) => {
    expect(texte.length).toBeGreaterThan(0);
    expect(MIGRATION).toContain(texte);
  });
});

describe("l'exemple de la page d'accès est juste", () => {
  const champs = EXEMPLE_TACHE.modele.champs.map((c) => ({ cle: c.cle, requis: c.requis }));
  const valeurs: Record<string, string> = Object.fromEntries(EXEMPLE_TACHE.modele.champs.map((c) => [c.cle, c.exemple]));
  const consigne = remplirGabarit(EXEMPLE_TACHE.modele.gabarit, champs, valeurs);
  const nombre = (cle: string) => Number(valeurs[cle].replace(/\s/g, ""));

  it("la consigne affichée est entièrement remplie", () => {
    expect(champsManquants(champs, valeurs)).toEqual([]);
    expect(consigne).not.toMatch(/\{\{|\[à remplir\]|\(non précisé\)/);
    for (const c of EXEMPLE_TACHE.modele.champs) expect(consigne).toContain(c.exemple);
  });

  it("la réponse attendue se recalcule à partir des champs", () => {
    const revient = nombre("prix_achat") + nombre("frais");
    const marge = nombre("prix_vente") - revient;
    const plancher = revient + nombre("marge_minimale");
    const fr = (n: number) => new Intl.NumberFormat("fr-FR").format(n).replace(/\s/g, " ");
    expect([revient, marge, plancher]).toEqual([7050, 2950, 9550]);
    expect(EXEMPLE_TACHE.cas.reponse).toContain(`Prix de revient ${fr(revient)} FCFA`);
    expect(EXEMPLE_TACHE.cas.reponse).toContain(`marge ${fr(marge)} FCFA soit ${String((marge / nombre("prix_vente")) * 100).replace(".", ",")} %`);
    expect(EXEMPLE_TACHE.cas.reponse).toContain(`prix plancher ${fr(plancher)} FCFA`);
    // Livraison offerte : 1 000 FCFA de frais en plus par pagne.
    expect(EXEMPLE_TACHE.cas.reponse).toContain(`la marge tombe à ${fr(marge - 1000)} FCFA`);
  });
});

describe("S2 · l'exemple public reste le seul contenu payant visible sans compte", () => {
  it("aucun composant client ne l'importe", () => {
    const fautifs = sources().filter((f) => estClient(lire(f)) && /@\/lib\/exemple-acces/.test(lire(f)));
    expect(fautifs).toEqual([]);
  });

  it("seule la page d'accès s'en sert", () => {
    const lecteurs = sources().filter((f) => /@\/lib\/exemple-acces/.test(lire(f)));
    expect(lecteurs).toEqual(["src/app/(public)/acces/page.tsx"]);
  });

  it("la page d'accès n'affiche ni temps gagné, ni témoignage : rien n'a été mesuré", () => {
    const page = lire("src/app/(public)/acces/page.tsx");
    expect(page).not.toMatch(/gagne[zr]?\s+\d|heures? (gagnée|économisée)|fois plus (vite|rapide)|témoignage|\d+\s*% (de|des) (clients|utilisateurs)/i);
  });
});
