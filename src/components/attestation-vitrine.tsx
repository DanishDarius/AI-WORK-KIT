"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Icon } from "./icon";

// L'attestation montrée sur la page d'accès : une illustration, pas une vraie
// attestation. Le nom est un exemple, marqué comme tel (règle Q7 : aucun
// client inventé). Trois cartes empilées glissent en place quand le bloc
// arrive à l'écran, puis les quatre coins se dessinent et le sceau apparaît.
//
// Sans JavaScript, ou pour qui a réduit les animations sur son appareil, la
// carte est simplement affichée, sans mouvement : la classe « est-en-attente »
// (qui cache les cartes avant leur entrée) n'est posée que par ce composant.

export function AttestationVitrine() {
  const cadre = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = cadre.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const visible = element.getBoundingClientRect().top < window.innerHeight * 0.85;
    if (visible) {
      element.classList.add("est-jouee");
      return;
    }
    element.classList.add("est-en-attente");
    const observateur = new IntersectionObserver(
      (entrees) => {
        if (entrees.some((e) => e.isIntersecting)) {
          element.classList.remove("est-en-attente");
          element.classList.add("est-jouee");
          observateur.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observateur.observe(element);
    return () => observateur.disconnect();
  }, []);

  return (
    <div ref={cadre} className="vitrine-att" aria-label="Exemple d’attestation de compétences IA, délivrée par AIW" role="img">
      <div className="vitrine-att-pile" aria-hidden="true">
        <div className="vitrine-att-fond" />
        <div className="vitrine-att-milieu" />
        <div className="vitrine-att-carte">
          <span className="vitrine-att-coin is-hg" />
          <span className="vitrine-att-coin is-hd" />
          <span className="vitrine-att-coin is-bg" />
          <span className="vitrine-att-coin is-bd" />
          <span className="vitrine-att-exemple">Exemple</span>

          <div className="vitrine-att-tete">
            <Image src="/brand/atelier/symbol-primary.svg" alt="" width={44} height={44} />
            <p className="vitrine-att-titre">Attestation de compétences IA</p>
          </div>

          <div className="vitrine-att-corps">
            <p className="vitrine-att-petit">Délivrée à</p>
            <p className="vitrine-att-nom">Awa Kossou</p>
            <p className="vitrine-att-petit">pour le métier</p>
            <div className="vitrine-att-metier">
              <span className="vitrine-att-metier-icone"><Icon name="kit" size={20} /></span>
              <span>Commerce et vente en ligne</span>
            </div>
          </div>

          <span className="vitrine-att-sceau"><Icon name="award" size={26} strokeWidth={2.2} /></span>

          <div className="vitrine-att-pied">
            <div>
              <p className="vitrine-att-etiquette">Délivrée le</p>
              <p className="vitrine-att-valeur">oct. 2026</p>
            </div>
            <span className="vitrine-att-linkedin"><Icon name="plus" size={14} strokeWidth={3} /> Ajouter à LinkedIn</span>
          </div>
        </div>
      </div>
    </div>
  );
}
