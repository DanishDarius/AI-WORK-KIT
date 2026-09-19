---
Guide original : Ce n'est pas l'IA le problème. C'est ce que tu ne lui dis pas.
Source : https://www.saadiakaram.ai/guides/context-stacking
Position réelle dans la bibliothèque au moment du traitement : 214/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé.
---

# Empiler le contexte avant chaque demande : la méthode en quatre blocs

*Multi-outils · 5 min de lecture*

Demander « écris-moi un post LinkedIn » et obtenir un texte plat mène souvent à conclure que « l'IA, c'est surfait ». En réalité, l'assistant a reçu un brief de deux mots. Une IA fonctionne comme un freelance talentueux mais sans aucun contexte : sans brief, le résultat reste générique. La solution s'appelle le context-stacking — empiler le contexte avant de formuler la demande.

## Empiler quatre blocs avant sa demande

**Bloc 1 — Qui est l'IA (le rôle).** « Tu es une experte en marketing de contenu B2B, 15 ans d'expérience, spécialiste LinkedIn. » Cela oriente le vocabulaire et le niveau de la réponse.

**Bloc 2 — Qui formule la demande, et son objectif.** « Je lance une formation IA en français pour entrepreneurs. Objectif : générer commentaires et inscriptions newsletter. » Sans objectif clair, l'assistant optimise pour le « joli » plutôt que pour l'« efficace ».

**Bloc 3 — Un exemple concret.** Le raccourci le plus puissant : coller un contenu qui a déjà bien fonctionné et demander de s'en inspirer pour le ton et la structure. Un exemple vaut souvent plus que trois paragraphes de consignes.

**Bloc 4 — Le format de sortie attendu.** « 5 variantes d'accroche, en puces, max 15 mots, puis le post complet. » Un format précis rend le résultat directement utilisable.

## Avant et après

Sans contexte : « Écris un post sur l'IA » donne un résultat tiède et interchangeable. Avec les quatre blocs assemblés : un résultat ciblé, dans la bonne voix, calibré sur l'objectif, prêt à publier en une seule passe.

## Le modèle à réutiliser

> **Prompt — template context-stacking**
>
> RÔLE : Tu es [expertise précise].
> MOI : Je suis [qui tu es]. Mon objectif : [résultat visé].
> EXEMPLE : Le ton/format que je veux → [colle un exemple].
> FORMAT : Réponds en [nombre d'options, longueur, structure].
> MA DEMANDE : [ta demande].

## À retenir

**Plus l'enjeu est important, plus le contexte doit être empilé.**

Quelques lignes suffisent pour un brouillon ; tout le contexte disponible se justifie pour une page de vente. Le même outil produit un résultat nettement meilleur selon le soin apporté au contexte fourni.
