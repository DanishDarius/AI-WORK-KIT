---
Guide original : Maîtrise les Skills Claude en 10 min
Source : https://www.saadiakaram.ai/guides/learn-skills
Position réelle dans la bibliothèque au moment du traitement : 62/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). 1 section FAQ collapsée dépliée et capturée intégralement.
---

# Créer son premier Skill Claude en dix minutes : anatomie et gabarit

*Claude · 5 min de lecture*

Créer, installer et utiliser un premier Skill en dix minutes : format SKILL.md, logique de bibliothèque de plugins, et astuces pour éviter les erreurs classiques de débutant.

## Le principe

Un Skill Claude est un workflow figé : décrire une fois ce que l'assistant doit faire, comment, avec quels contrôles, et ne plus jamais avoir à le réexpliquer. Dix minutes suffisent pour construire le premier.

## L'anatomie d'un SKILL.md

Titre (en une ligne, action claire). Quand l'utiliser (déclencheur précis). Inputs attendus (ce qui est collé ou uploadé). Étapes (ce que fait l'assistant, dans l'ordre). Vérifications (les contrôles à effectuer avant de rendre le résultat). Format de sortie (markdown, tableau, JSON…).

## Le gabarit à copier

> **Prompt : Skill, template universel**
>
> # [Nom du Skill : verbe + objet]
>
> ## Quand l'utiliser
> Tu utilises ce skill quand : [déclencheur en une phrase].
>
> ## Inputs
> L'utilisateur fournit :
> - [input 1]
> - [input 2]
>
> ## Étapes
> 1. [action 1, avec critère de réussite]
> 2. [action 2]
> 3. [action 3]
>
> ## Vérifications avant de rendre
> - [check 1]
> - [check 2]
> - [check 3]
>
> ## Format de sortie
> [markdown / tableau / liste / JSON : préciser la structure exacte]

**Erreur de débutant à éviter :** empiler quinze étapes. Un Skill qui fonctionne tient en cinq à sept étapes. Au-delà, il vaut mieux le découper en deux skills distincts.

## À retenir

Un Skill est une recette, pas un manuel. Le bon point de départ : capturer un workflow déjà exécuté deux fois par semaine, le tester trois jours, corriger les vérifications, et c'est réglé.

## Question fréquente

**Combien de Skills au maximum ?** Une dizaine activés simultanément, pas plus. Au-delà, la précision de l'assistant se dégrade.
