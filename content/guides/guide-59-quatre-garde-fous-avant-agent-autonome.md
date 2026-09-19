---
Guide original : Des garde-fous avant l'autonomie
Source : https://www.saadiakaram.ai/guides/agent-guardrails
Position réelle dans la bibliothèque au moment du traitement : 57/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Guide court, contenu intégralement capturé, aucune troncature détectée.
---

# Quatre garde-fous à poser avant de laisser un agent agir seul

*Multi-outils · 5 min de lecture*

Quatre contraintes à mettre en place avant de laisser quoi que ce soit tourner sans surveillance, apprises à la dure.

## Ce qui change avec un agent qui agit

Un agent capable d'agir n'a rien à voir avec un assistant qui se contente de répondre. Les modes de défaillance deviennent vite coûteux dès que des actions réelles sont en jeu.

## Les quatre garde-fous

**Premier garde-fou :** une limite stricte de dépense et de nombre d'actions par exécution.

**Deuxième :** une liste blanche d'outils autorisés, plutôt qu'une liste noire d'outils interdits.

**Troisième :** un journal en ajout seul (jamais modifiable) de tout ce que l'agent a fait.

**Quatrième, celui que presque tout le monde saute :** un mode simulation, laissé actif pendant une semaine entière. L'agent décrit chaque action qu'il aurait prise, sans en exécuter aucune.

## Ce que révèle la relecture

Relire ce journal en fin de semaine révèle presque toujours au moins une chose qu'on est très content que l'agent n'ait pas faite.
