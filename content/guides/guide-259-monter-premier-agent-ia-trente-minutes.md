---
Guide original : Monte ton premier agent IA
Source : https://www.saadiakaram.ai/guides/first-ai-agent
Position réelle dans la bibliothèque au moment du traitement : 258/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé. Accroche mentionnant trois niveaux d'agents (Cowork, Claude Code, OpenClaw), non développés dans le corps capturé qui porte uniquement sur la construction d'un agent via un Projet Claude (incohérence source, non reprise dans le titre). Noms réels conservés (Claude, Cowork, Claude Code, OpenClaw).
---

# Construire son premier agent IA en trente minutes, sans coder

*Multi-outils · 5 min de lecture*

Les agents IA font beaucoup parler d'eux, mais peu d'explications concrètes existent sur la façon d'en construire un premier. Aucun code ni framework complexe n'est nécessaire : un Projet Claude, trois fichiers et un prompt système suffisent pour obtenir un premier agent fonctionnel en une demi-heure.

## Choisir la première tâche sans se tromper

Les critères à respecter : la tâche revient au moins trois fois par semaine, elle prend plus de vingt minutes, son résultat est de nature textuelle ou structurée, et une erreur sur cette tâche n'a pas de conséquence grave. Des exemples qui fonctionnent bien : le tri d'une boîte mail, le retravail de contenu, la qualification de leads, ou la rédaction d'un premier brouillon de devis.

## L'anatomie d'un agent en trois couches

- **Mémoire** - le contexte qui ne change pas (la voix, l'offre, les types de clients habituels), sous forme d'un fichier texte.
- **Instructions** - le rôle, les étapes à suivre, les contraintes, formulés comme un prompt système.
- **Exemples** - trois cas avant/après. C'est cet élément qui rend l'agent réellement performant, davantage que le prompt lui-même.

## Le prompt système à adapter

> **Prompt - premier agent**
>
> Tu es [rôle précis], spécialisé dans [tâche unique].
>
> CE QUE TU FAIS, ÉTAPE PAR ÉTAPE :
> 1. [étape]
> 2. [étape]
> 3. [étape]
>
> CONTRAINTES :
> - Ton : voir fichier "voix.md"
> - Format : voir fichier "format.md"
> - Tu ne fais JAMAIS : [liste]
>
> INPUTS QUE J'ENVERRAI :
> [décris]
>
> AVANT DE RÉPONDRE :
> - Si une info clé manque, pose-moi UNE question
> - Sinon, livre. Pas d'intro, pas de "voici"
>
> EXEMPLES :
> [colle 3 paires input → output idéal]

## À retenir

**Itérer cinq fois, pas cinquante.**

Lancer l'agent, l'utiliser réellement cinq fois, noter ce qui ne fonctionne pas, puis corriger. La qualité vient de l'usage réel plutôt que d'une planification exhaustive avant le premier essai.
