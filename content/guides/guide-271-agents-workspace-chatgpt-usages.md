---
Guide original : Les agents Workspace de ChatGPT
Source : https://www.saadiakaram.ai/guides/chatgpt-workspace-agents
Position réelle dans la bibliothèque au moment du traitement : 270/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé. Noms réels conservés comme faits (ChatGPT, Drive, Gmail, Calendar, Slack).
---

# Les agents Workspace de ChatGPT : ce qu'ils font réellement

*ChatGPT · 5 min de lecture*

ChatGPT propose désormais des agents Workspace connectés à Drive, Gmail, Calendar et Slack, capables d'agir directement sur ces outils. Voici ce que cela change concrètement.

## Ce que ces agents savent vraiment faire

1. **Tri matinal de la boîte mail** — lecture de Gmail, classement, rédaction de brouillons pour les réponses simples.
2. **Préparation du calendrier** — pour chaque réunion du jour : contexte, agenda, trois questions à poser.
3. **Nettoyage du Drive** — rangement, étiquetage et résumé des nouveaux documents.
4. **Suivi de projet** — croisement des données Slack et Drive pour signaler les points de blocage.

## Le garde-fou à respecter

Il est recommandé de faire fonctionner l'agent en mode « brouillon uniquement » pendant deux semaines : il prépare, la validation reste humaine, avant d'envisager une autonomie complète sur l'envoi.

## Le prompt de brief pour l'agent du matin

> **Prompt — brief agent matin**
>
> Tu es mon assistant exécutif.
>
> Chaque matin à 8h, tu fais :
> 1. Tri Gmail : urgent / réponse rapide / à lire / spam. Drafts pour "réponse rapide".
> 2. Pour chaque meeting du jour : 1 paragraphe contexte + 3 questions à poser.
> 3. Repère les deadlines à 48h non traitées.
> 4. Liste en haut : les 3 décisions que JE dois prendre aujourd'hui.
>
> Format : un seul document, scannable en 3 minutes.

## À retenir

**Récupérer une heure par jour, pas davantage.**

Un agent qui fait gagner une heure quotidienne représente déjà l'équivalent d'un mois de productivité sur une année — c'est cet objectif réaliste qu'il faut viser, plutôt qu'un gain miraculeux.
