"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { approvedHomeMarkup } from "./approved-home-markup";

const demos = {
  tache: {
    kicker: "01 / LA BONNE PORTE D’ENTRÉE",
    title: "Vous partez d’une tâche.<br>Pas d’un outil.",
    text: "Dites ce que vous avez à faire. Le kit vous oriente vers un cas d’usage concret, quel que soit votre niveau en IA.",
    points: ["Une intention claire", "Un cas pratique contextualisé", "Le bon prompt au bon moment"],
    visual: `<span class="visual-kicker">CHERCHER DANS LE KIT</span><div class="visual-title">Que voulez-vous faire aujourd’hui ?</div><div class="visual-search">⌕ &nbsp; Préparer un compte rendu <b>↗</b></div><div class="visual-item"><span>✳</span><strong>Résumer une réunion</strong><small>Communication</small></div><div class="visual-item"><span>✳</span><strong>Structurer des décisions</strong><small>Organisation</small></div><div class="visual-item"><span>✳</span><strong>Rédiger un suivi</strong><small>Relation client</small></div>`,
  },
  metier: {
    kicker: "02 / UN CHEMIN ADAPTÉ",
    title: "Votre métier donne<br>le contexte.",
    text: "Le catalogue rassemble les tâches courantes de votre quotidien. Une progression légère vous aide à retrouver ce que vous avez déjà essayé.",
    points: ["Des tâches classées par métier", "Des exemples proches de votre travail", "Une progression visible, sans classement"],
    visual: `<span class="visual-kicker">PARCOURS MÉTIER</span><div class="visual-title">Communication & marketing</div><div class="visual-card"><span class="visual-tag">VOTRE PROGRESSION</span><h4>3 tâches explorées sur 8</h4><div class="visual-progress"><span></span></div></div><div class="visual-item"><span>✓</span><strong>Préparer une campagne</strong><small>Terminée</small></div><div class="visual-item"><span>○</span><strong>Réécrire une publication</strong><small>À découvrir</small></div><div class="visual-item"><span>☆</span><strong>Créer un calendrier éditorial</strong><small>Favori</small></div>`,
  },
  prompt: {
    kicker: "03 / LA PRATIQUE AVANT LA THÉORIE",
    title: "Un cas réel.<br>Un prompt utilisable.",
    text: "Vous comprenez d’abord la situation et le résultat attendu. Le prompt est ensuite prêt à copier et à adapter dans l’IA de votre choix.",
    points: ["Un contexte explicite", "Une consigne personnalisable", "ChatGPT, Claude ou Gemini"],
    visual: `<span class="visual-kicker">CAS PRATIQUE / 02</span><div class="visual-title">Transformer des notes en compte rendu</div><div class="visual-card"><span class="visual-tag">SITUATION</span><h4>Une réunion de suivi vient de finir.</h4><p>Vos notes sont éparses. Il faut partager décisions et prochaines étapes.</p></div><div class="visual-prompt"><b>PROMPT À ADAPTER ↗</b>À partir de mes notes, rédige un compte rendu clair. Distingue les décisions, les actions à mener et les responsables…</div><div class="visual-item"><strong>ChatGPT</strong><strong>Claude</strong><strong>Gemini</strong><small>Copier le prompt ↗</small></div>`,
  },
  progression: {
    kicker: "04 / REVENIR SANS RECOMMENCER",
    title: "Votre pratique reste<br>à portée de main.",
    text: "Le point de reprise, les favoris et quelques repères de progression suffisent pour avancer régulièrement, sans points ni compétition.",
    points: ["Reprise du dernier contenu ouvert", "Favoris accessibles dans le parcours", "Régularité discrète"],
    visual: `<span class="visual-kicker">MA PROGRESSION</span><div class="visual-title">Vous avancez à votre rythme.</div><div class="visual-chart"><div><small>TÂCHES ESSAYÉES</small><br><strong>12</strong> / 42</div><div><small>MÉTIERS EXPLORÉS</small><br><strong>3</strong> / 12</div></div><div class="visual-item"><span>↗</span><strong>Reprendre : préparer un compte rendu</strong></div><div class="visual-item"><span>☆</span><strong>Mes tâches favorites</strong><small>4 enregistrées</small></div><div class="visual-item"><span>● ● ○ ● ○ ○ ○</span><strong>3 jours actifs cette semaine</strong></div>`,
  },
} as const;

type DemoName = keyof typeof demos;

export function HomeExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const get = <T extends Element>(selector: string) => root.querySelector<T>(selector);
    const getAll = <T extends Element>(selector: string) => Array.from(root.querySelectorAll<T>(selector));

    function setDemo(name: DemoName) {
      const demo = demos[name];
      getAll<HTMLButtonElement>("[data-demo]").forEach((button) => {
        button.setAttribute("aria-selected", String(button.dataset.demo === name));
      });
      const kicker = get<HTMLElement>("#demo-kicker");
      const title = get<HTMLElement>("#demo-title");
      const text = get<HTMLElement>("#demo-text");
      const points = get<HTMLElement>("#demo-points");
      const visual = get<HTMLElement>("#demo-visual");
      if (kicker) kicker.textContent = demo.kicker;
      if (title) title.innerHTML = demo.title;
      if (text) text.textContent = demo.text;
      if (points) points.innerHTML = demo.points.map((point) => `<li>${point}</li>`).join("");
      if (visual) visual.innerHTML = demo.visual;
    }

    const search = get<HTMLInputElement>("#task-search");
    const results = get<HTMLElement>("#search-results");
    const suggestions = [
      ["compte rendu", "Préparer un compte rendu de réunion", "Communication"],
      ["email", "Rédiger un e-mail professionnel", "Communication"],
      ["présentation", "Construire une présentation claire", "Création"],
      ["client", "Répondre à une demande client", "Relation client"],
      ["rapport", "Synthétiser un rapport", "Analyse"],
    ];
    function updateSearch() {
      if (!search || !results) return;
      const query = search.value.trim().toLocaleLowerCase("fr");
      if (query.length < 2) {
        results.innerHTML = '<span>Essayez : <button type="button" data-query="compte rendu">compte rendu</button> <button type="button" data-query="email">email</button> <button type="button" data-query="présentation">présentation</button></span>';
        return;
      }
      const matches = suggestions.filter(([term, title]) => `${term} ${title}`.toLocaleLowerCase("fr").includes(query));
      results.innerHTML = matches.length
        ? `<ul>${matches.map(([, title, type]) => `<li>↗ &nbsp; ${title} <small>· ${type}</small></li>`).join("")}</ul>`
        : "Aucun exemple dans cet aperçu. La recherche complète se trouve dans les tâches.";
    }

    let bookingStep = 0;
    let service = "";
    let need = "";
    const bookingContent = get<HTMLElement>("#booking-content");
    function renderBooking() {
      if (!bookingContent) return;
      getAll<HTMLElement>("[data-step]").forEach((item) => {
        const index = Number(item.dataset.step);
        item.classList.toggle("current", index === bookingStep);
        item.classList.toggle("done", index < bookingStep);
      });
      if (bookingStep === 0) bookingContent.innerHTML = `<h4>Quel type d’aide recherchez-vous ?</h4><p>Choisissez le parcours le plus proche de votre situation. Le périmètre sera précisé avec vous.</p><div class="choice-grid"><button type="button" class="choice" data-choice="systemes" aria-pressed="${service === "systemes"}"><span>01 / SYSTÈMES IA</span><strong>Une tâche ou un processus à améliorer</strong><small>Créer une aide concrète dans vos outils.</small></button><button type="button" class="choice" data-choice="transformation" aria-pressed="${service === "transformation"}"><span>02 / TRANSFORMATION IA</span><strong>Un projet à organiser pour l’équipe</strong><small>Définir les priorités et accompagner l’adoption.</small></button></div><div class="booking-actions"><button class="next" type="button" data-next ${service ? "" : "disabled"}>Continuer →</button></div>`;
      if (bookingStep === 1) {
        bookingContent.innerHTML = '<h4>Quel est votre point de départ ?</h4><p>Une ou deux phrases suffisent pour cadrer votre besoin.</p><label class="booking-label" for="booking-need">Votre besoin principal</label><textarea id="booking-need" placeholder="Ex. Notre équipe perd du temps à traiter les demandes clients…"></textarea><div class="booking-actions"><button type="button" data-back>← Retour</button><button type="button" class="next" data-next>Voir le récapitulatif →</button></div>';
        const textarea = bookingContent.querySelector<HTMLTextAreaElement>("textarea");
        if (textarea) textarea.value = need;
      }
      if (bookingStep === 2) {
        bookingContent.innerHTML = `<h4>Un premier échange bien cadré.</h4><p>Retrouvez le parcours correspondant à votre demande.</p><div class="booking-recap"><span>PARCOURS CHOISI</span><strong>${service === "systemes" ? "Systèmes IA" : "Transformation IA"}</strong><span>VOTRE POINT DE DÉPART</span><p id="recap-need"></p></div><div class="booking-actions"><button type="button" data-back>← Modifier</button><a class="next" href="/${service === "systemes" ? "systemes-ia" : "transformation-ia"}">Découvrir ce parcours ↗</a></div>`;
        const recap = bookingContent.querySelector<HTMLElement>("#recap-need");
        if (recap) recap.textContent = need.trim() || "À préciser lors du premier échange.";
      }
    }

    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const demoButton = target.closest<HTMLElement>("[data-demo]");
      if (demoButton?.dataset.demo) setDemo(demoButton.dataset.demo as DemoName);
      const openDemo = target.closest<HTMLElement>("[data-open-demo]");
      if (openDemo?.dataset.openDemo) setDemo(openDemo.dataset.openDemo as DemoName);
      const query = target.closest<HTMLButtonElement>("[data-query]");
      if (query && search) {
        search.value = query.dataset.query ?? "";
        updateSearch();
        search.focus();
      }
      const shelfButton = target.closest<HTMLButtonElement>("[data-shelf-direction]");
      if (shelfButton) get<HTMLElement>("#guide-shelf")?.scrollBy({ left: Number(shelfButton.dataset.shelfDirection) * 305, behavior: "smooth" });
      const choice = target.closest<HTMLButtonElement>("[data-choice]");
      if (choice) { service = choice.dataset.choice ?? ""; renderBooking(); }
      if (target.closest("[data-next]") && bookingContent) {
        if (bookingStep === 1) need = bookingContent.querySelector<HTMLTextAreaElement>("textarea")?.value ?? "";
        if (bookingStep < 2) { bookingStep++; renderBooking(); }
      }
      if (target.closest("[data-back]")) { bookingStep = Math.max(0, bookingStep - 1); renderBooking(); }
      const serviceButton = target.closest<HTMLButtonElement>("[data-service]");
      if (serviceButton) {
        service = serviceButton.dataset.service ?? "";
        bookingStep = 0;
        renderBooking();
        get<HTMLElement>("#reservation")?.scrollIntoView({ behavior: "smooth" });
      }
    }
    function onKeydown(event: KeyboardEvent) {
      if (event.target === search && event.key === "Enter" && search?.value.trim()) {
        event.preventDefault();
        router.push(`/taches?q=${encodeURIComponent(search.value.trim())}`);
      }
    }
    function onInput(event: Event) {
      if (event.target === search) updateSearch();
      if (event.target instanceof HTMLTextAreaElement) need = event.target.value;
    }

    root.addEventListener("click", onClick);
    root.addEventListener("keydown", onKeydown);
    root.addEventListener("input", onInput);
    setDemo("tache");
    renderBooking();
    return () => {
      root.removeEventListener("click", onClick);
      root.removeEventListener("keydown", onKeydown);
      root.removeEventListener("input", onInput);
    };
  }, [router]);

  return <div ref={rootRef} className="aw-maquette" dangerouslySetInnerHTML={{ __html: approvedHomeMarkup }} />;
}
