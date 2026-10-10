"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { Icon } from "./icon";

// Page d'accès : la configuration « Assistant de ma boutique » du kit Commerce
// (l'exemple public de la page, src/lib/exemple-acces.ts) installée dans les
// trois IA. Les images sont de vraies captures d'écran de ChatGPT, Claude et
// Gemini, prises le 10 octobre 2026 dans la version web, recadrées sur la
// partie utile (public/accueil/ia/). Quand un écran change, on refait sa
// capture et on la remplace ici, avec la même légende si l'étape ne change pas.
//
// Chaque onglet dure DUREE_ONGLET, puis le suivant s'ouvre, en boucle. Un
// point (le doigt) va toucher le bouton de chaque étape. Le défilement
// s'arrête au survol, au toucher, au clavier, quand le bloc sort de l'écran,
// quand l'onglet du navigateur est caché, et pour qui a réduit les animations
// sur son appareil (règle d'accessibilité : un contenu qui défile seul peut
// être mis en pause). Un bouton le met en pause ou le relance.

const DUREE_ONGLET = 9000;
// Rapprochement de la capture vers le bouton à toucher : plus fort sur un
// petit écran, où la capture entière serait illisible.
const ZOOM = { telephone: 1.75, tablette: 1.4, ordinateur: 1.12 };
// Centre du zoom, choisi pour que le bouton touché arrive entre 22 % et 78 %
// de la capture, donc entier à l'écran, sans laisser de bord vide (centre
// gardé entre 0 et 100 %).
const borne = (x: number, min: number, max: number) => Math.min(max, Math.max(min, x));
const centre = (p: number, z: number) => (z === 1 ? p : borne((borne(p, 22, 78) - z * p) / (1 - z), 0, 100));
const PAS = 100;

type Scene = { image: string; largeur: number; hauteur: number; doigt: [number, number] | null; legende: string };
type IA = { id: string; nom: string; adresse: string; couleur: string; scenes: Scene[] };

const IAS: IA[] = [
  {
    id: "chatgpt",
    nom: "ChatGPT",
    adresse: "chatgpt.com",
    couleur: "#10a37f",
    scenes: [
      { image: "chatgpt-1.webp", largeur: 512, hauteur: 280, doigt: [84.8, 88.2], legende: "Créez un projet «\u00a0Ma boutique\u00a0»" },
      { image: "chatgpt-2.webp", largeur: 670, hauteur: 200, doigt: [84.3, 41], legende: "Ouvrez les paramètres du projet" },
      { image: "chatgpt-3.webp", largeur: 512, hauteur: 433, doigt: [86.7, 92.4], legende: "Collez la configuration du kit, puis enregistrez" },
      { image: "chatgpt-4.webp", largeur: 800, hauteur: 235, doigt: null, legende: "ChatGPT écrit avec les règles de votre boutique" },
    ],
  },
  {
    id: "claude",
    nom: "Claude",
    adresse: "claude.ai",
    couleur: "#d97757",
    scenes: [
      { image: "claude-1.webp", largeur: 520, hauteur: 432, doigt: [83.1, 91], legende: "Créez un projet «\u00a0Ma boutique\u00a0»" },
      { image: "claude-2.webp", largeur: 940, hauteur: 320, doigt: [95.1, 41.9], legende: "Ouvrez les instructions du projet" },
      { image: "claude-3.webp", largeur: 720, hauteur: 481, doigt: [80.8, 91.7], legende: "Collez la configuration du kit, puis enregistrez" },
      { image: "claude-4.webp", largeur: 860, hauteur: 335, doigt: null, legende: "Claude écrit avec les règles de votre boutique" },
    ],
  },
  {
    id: "gemini",
    nom: "Gemini",
    adresse: "gemini.google.com",
    couleur: "#4285f4",
    scenes: [
      { image: "gemini-1.webp", largeur: 800, hauteur: 410, doigt: [35.2, 37.3], legende: "Créez un Gem «\u00a0Ma boutique\u00a0»" },
      { image: "gemini-2.webp", largeur: 950, hauteur: 410, doigt: [91.5, 9], legende: "Collez la configuration du kit, puis enregistrez" },
      { image: "gemini-3.webp", largeur: 512, hauteur: 326, doigt: [74.4, 86.2], legende: "Démarrez une discussion avec votre Gem" },
      { image: "gemini-4.webp", largeur: 750, hauteur: 250, doigt: null, legende: "Gemini écrit avec les règles de votre boutique" },
    ],
  },
];

export function KitDansIA() {
  // L'onglet ouvert et le temps passé dessus, dans un seul état : le passage
  // à l'onglet suivant se décide dans la même mise à jour.
  const [{ onglet, ecoule }, setEtat] = useState({ onglet: 0, ecoule: 0 });
  const [arret, setArret] = useState(false); // pause demandée par le bouton
  const [survol, setSurvol] = useState(false); // survol, toucher ou clavier dans le bloc
  const [visible, setVisible] = useState(true);
  const [reduit, setReduit] = useState(false);
  const [zoom, setZoom] = useState(ZOOM.ordinateur);
  const cadre = useRef<HTMLDivElement>(null);

  // Animations réduites sur l'appareil, et bloc hors de l'écran.
  useEffect(() => {
    const requete = window.matchMedia("(prefers-reduced-motion: reduce)");
    const telephone = window.matchMedia("(max-width: 560px)");
    const tablette = window.matchMedia("(max-width: 860px)");
    const lire = () => {
      setReduit(requete.matches);
      setZoom(telephone.matches ? ZOOM.telephone : tablette.matches ? ZOOM.tablette : ZOOM.ordinateur);
    };
    lire();
    for (const r of [requete, telephone, tablette]) r.addEventListener("change", lire);
    const element = cadre.current;
    const observateur = element && "IntersectionObserver" in window
      ? new IntersectionObserver((e) => setVisible(e.some((x) => x.isIntersecting)), { threshold: 0.25 })
      : null;
    if (element && observateur) observateur.observe(element);
    return () => {
      for (const r of [requete, telephone, tablette]) r.removeEventListener("change", lire);
      observateur?.disconnect();
    };
  }, []);

  const enPause = arret || survol || !visible || reduit;

  useEffect(() => {
    if (enPause) return;
    const minuterie = window.setInterval(() => {
      if (document.hidden) return;
      setEtat((e) => (e.ecoule + PAS < DUREE_ONGLET ? { ...e, ecoule: e.ecoule + PAS } : { onglet: (e.onglet + 1) % IAS.length, ecoule: 0 }));
    }, PAS);
    return () => window.clearInterval(minuterie);
  }, [enPause]);

  const ia = IAS[onglet];
  const dureeScene = DUREE_ONGLET / ia.scenes.length;
  const numero = Math.min(ia.scenes.length - 1, Math.floor(ecoule / dureeScene));
  const scene = ia.scenes[numero];
  const dansScene = (ecoule - numero * dureeScene) / dureeScene; // de 0 à 1

  const choisir = (index: number) => setEtat({ onglet: index, ecoule: 0 });
  const etape = (index: number) => setEtat({ onglet, ecoule: index * dureeScene + 1 });
  // Le doigt part du bas de la capture, puis va toucher le bouton de l'étape,
  // pendant que la capture s'en rapproche (le doigt suit le zoom).
  const arrive = dansScene > 0.12;
  const origine: [number, number] = scene.doigt ? [centre(scene.doigt[0], zoom), centre(scene.doigt[1], zoom)] : [0, 35];
  const echelle = arrive ? zoom : 1;
  const doigt = scene.doigt ? scene.doigt.map((p, i) => origine[i] + echelle * (p - origine[i])) : null;

  return (
    <div
      ref={cadre}
      className="kit-ia"
      onMouseEnter={() => setSurvol(true)}
      onMouseLeave={() => setSurvol(false)}
      onFocus={() => setSurvol(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setSurvol(false); }}
      onTouchStart={() => setSurvol(true)}
      onTouchEnd={() => setSurvol(false)}
    >
      <div className="kit-ia-onglets" role="tablist" aria-label="Choisir une IA">
        {IAS.map((x, i) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            id={`kit-ia-onglet-${x.id}`}
            aria-selected={i === onglet}
            aria-controls="kit-ia-panneau"
            className={`kit-ia-onglet${i === onglet ? " is-actif" : ""}`}
            style={{ "--ia": x.couleur } as CSSProperties}
            onClick={() => choisir(i)}
          >
            <span className="kit-ia-pastille" aria-hidden="true" />
            {x.nom}
            {i === onglet && <span className="kit-ia-progression" aria-hidden="true" style={{ transform: `scaleX(${ecoule / DUREE_ONGLET})` }} />}
          </button>
        ))}
      </div>

      <div id="kit-ia-panneau" role="tabpanel" aria-labelledby={`kit-ia-onglet-${ia.id}`} className="kit-ia-fenetre">
        <div className="kit-ia-barre" aria-hidden="true">
          <span className="kit-ia-points"><i /><i /><i /></span>
          <span className="kit-ia-adresse">{ia.adresse}</span>
        </div>
        <div className="kit-ia-scene">
          <div className="kit-ia-image" style={{ aspectRatio: `${scene.largeur} / ${scene.hauteur}`, "--ratio": scene.largeur / scene.hauteur } as CSSProperties}>
            {/* La capture se rapproche du bouton à toucher. Elle repart de sa
                taille normale à chaque étape (clé : l'image de l'étape). */}
            <div
              key={scene.image}
              className="kit-ia-zoom"
              style={{ transformOrigin: `${origine[0]}% ${origine[1]}%`, transform: `scale(${echelle})` }}
            >
              <Image
                src={`/accueil/ia/${scene.image}`}
                alt={`${ia.nom}, étape ${numero + 1} : ${scene.legende}`}
                width={scene.largeur}
                height={scene.hauteur}
                sizes="(max-width: 860px) 92vw, 640px"
                className="kit-ia-capture"
              />
            </div>
            {doigt && (
              <span
                className={`kit-ia-doigt${dansScene > 0.45 ? " is-touche" : ""}`}
                aria-hidden="true"
                style={{ left: `${arrive ? doigt[0] : 50}%`, top: `${arrive ? doigt[1] : 115}%`, opacity: arrive ? 1 : 0 }}
              />
            )}
          </div>
        </div>
        <div className="kit-ia-pied">
          <div className="kit-ia-etapes">
            {ia.scenes.map((s, i) => (
              <button key={s.image} type="button" className={`kit-ia-etape${i === numero ? " is-actif" : ""}`} onClick={() => etape(i)} aria-label={`Étape ${i + 1} : ${s.legende}`} aria-current={i === numero ? "step" : undefined} />
            ))}
          </div>
          <p className="kit-ia-legende"><b>Étape {numero + 1} sur {ia.scenes.length}.</b> {scene.legende}.</p>
          <button type="button" className="kit-ia-pause" onClick={() => setArret((a) => !a)} aria-label={arret ? "Relancer le défilement" : "Mettre le défilement en pause"}>
            {arret ? <Icon name="play" size={16} /> : <span className="kit-ia-barres" aria-hidden="true" />}
          </button>
        </div>
      </div>
    </div>
  );
}
