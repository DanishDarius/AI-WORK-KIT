import type { Metadata } from "next";
import Link from "next/link";
import { EtapesPremiersPas, type EtapePremiersPas } from "@/components/premiers-pas";
import { Page } from "@/components/shell";
import { PageHead } from "@/components/ui";
import { StatsCard } from "@/components/widgets";
import { exigerAccesActif } from "@/lib/acces";
import { lireFil } from "@/lib/contenu";

export const metadata: Metadata = { title: "Premiers pas en 15 minutes" };

// Le parcours « Premiers pas » (plan produit, chantier 4) : pour un client qui
// n'a jamais utilisé une IA, sur un téléphone. Quatre gestes, 15 minutes.
//
// Les gestes viennent des pages officielles des éditeurs, relevées le
// 4 octobre 2026 (document « AIW : scripts des vidéos », section Premiers
// pas). Le micro décrit est celui du clavier du téléphone : il est le même
// dans toutes les applications et il écrit en français.
const ETAPES: (Omit<EtapePremiersPas, "video"> & { cleVideo?: string })[] = [
  {
    cle: "installer",
    titre: "Installer une IA gratuite",
    minutes: 5,
    cleVideo: "premiers-pas-1",
    intro: "Une IA est une application à qui vous écrivez, comme dans une messagerie. Elle est gratuite. Une seule suffit pour commencer.",
    gestes: [
      "Ouvrez le Play Store et cherchez ChatGPT. Vérifiez le nom de l’éditeur : OpenAI. Il existe des copies, ne prenez que celle-ci. Touchez Installer.",
      "Vous préférez une autre IA ? Gemini est édité par Google, Claude par Anthropic. Les trois conviennent pour votre kit.",
      "Ouvrez l’application et créez votre compte avec votre adresse e-mail. Pour Gemini, c’est votre compte Google.",
    ],
    aSavoir: "Avec un compte gratuit, le nombre de demandes par jour est limité : si l’IA vous demande d’attendre, reprenez plus tard. Gemini demande Android 9 ou plus.",
  },
  {
    cle: "ecrire",
    titre: "Écrire votre première demande",
    minutes: 2,
    intro: "Écrivez comme vous écririez à un collègue : qui vous êtes, ce que vous voulez, sous quelle forme.",
    gestes: [
      "Dans la zone où l’on écrit, tapez par exemple : « Je tiens une boutique à Cotonou. Explique-moi en trois phrases ce que tu peux faire pour m’aider. »",
      "Touchez la flèche pour envoyer, et lisez la réponse.",
      "Répondez-lui, comme dans une conversation : « Plus court », « Donne un exemple », « Écris-le pour WhatsApp ».",
    ],
    aSavoir: "L’IA peut se tromper, surtout sur un chiffre, un prix ou une règle. Relisez toujours avant de vous en servir.",
  },
  {
    cle: "dicter",
    titre: "Dicter au lieu d’écrire",
    minutes: 3,
    cleVideo: "premiers-pas-2",
    intro: "Écrire une longue demande sur un téléphone prend du temps. Vous pouvez la dicter avec le micro de votre clavier.",
    gestes: [
      "Touchez la zone où l’on écrit, puis le micro en haut de votre clavier.",
      "Quand le téléphone affiche « Parlez maintenant », dites votre demande. Pour la ponctuation, dites « point », « virgule » ou « nouvelle ligne ».",
      "Relisez avant d’envoyer : un nom propre ou un montant peut être mal compris. Corrigez, puis envoyez.",
    ],
    aSavoir: "Ce micro est celui de votre clavier : il marche dans toutes vos applications, WhatsApp compris.",
  },
  {
    cle: "photo",
    titre: "Envoyer une photo",
    minutes: 3,
    cleVideo: "premiers-pas-3",
    intro: "L’IA sait lire une photo : une liste écrite à la main, un reçu, un tableau affiché au mur.",
    gestes: [
      "Touchez le signe « + », à côté de la zone où l’on écrit. Prenez la photo, ou choisissez-en une dans votre téléphone.",
      "Prenez une photo nette, bien éclairée, avec toute la page dans le cadre.",
      "Écrivez ce que vous attendez : « Recopie cette liste dans un tableau à deux colonnes : article, prix ». Puis envoyez.",
      "Comparez les chiffres avec votre feuille : l’IA peut mal lire une écriture.",
    ],
    aSavoir: "Avec un compte gratuit, le nombre de photos par jour est limité. N’envoyez jamais la photo d’une pièce d’identité ou d’une carte bancaire.",
  },
];

export default async function PremiersPas() {
  await exigerAccesActif();
  // Les vidéos sont facultatives : sans lien en base, le texte suffit.
  const videos = await lireFil().then((fil) => fil.videos).catch(() => ({} as Record<string, string>));
  const etapes: EtapePremiersPas[] = ETAPES.map(({ cleVideo, ...e }) => ({ ...e, video: (cleVideo && videos[cleVideo]) || null }));

  return (
    <Page aside={<StatsCard />}>
      <PageHead kicker="Pour bien démarrer" title="Premiers pas en 15 minutes">
        Vous n’avez jamais utilisé une IA ? Quatre gestes sur votre téléphone, et vous êtes prêt pour votre première tâche.
      </PageHead>
      <EtapesPremiersPas etapes={etapes} />
      <section className="card is-mint stack-sm">
        <h2 className="h3">Et maintenant ?</h2>
        <p>Votre IA est prête. Installez votre kit, puis ouvrez la première tâche de votre métier : le cas est posé, la consigne est déjà écrite.</p>
        <div className="row">
          <Link className="btn" href="/kit">Installer mon kit</Link>
          <Link className="btn btn-secondary btn-plain" href="/">Voir mon parcours</Link>
        </div>
      </section>
    </Page>
  );
}
