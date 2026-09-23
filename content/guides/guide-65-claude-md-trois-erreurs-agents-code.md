---
Guide original : Claude Code : 94 % de justesse en 30 s
Source : https://www.saadiakaram.ai/guides/karpathy-claude-code-skills
Position réelle dans la bibliothèque au moment du traitement : 63/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé.
---

# Un CLAUDE.md à la racine du projet pour corriger les trois erreurs classiques des agents de code

*Claude · 5 min de lecture*

Un simple fichier CLAUDE.md corrige trois grosses erreurs récurrentes des agents de code. Il se pose dans le projet, et l'agent le lit directement.

## Le constat

Trois erreurs reviennent en boucle chez les agents de code : ils inventent des fonctions qui n'existent pas, ils sautent les tests, ils réécrivent du code au lieu de le patcher ponctuellement. Un simple CLAUDE.md placé à la racine du projet règle les trois à la fois.

## Le fichier à poser

> **Gabarit - CLAUDE.md**
>
> # Règles du projet pour l'agent de code
>
> ## Avant toute action
> - Liste les fichiers concernés avant d'écrire.
> - Si tu n'es pas sûr d'une API, lis-la dans le code avant de l'appeler.
> - Ne crée jamais un nouveau fichier si une fonction équivalente existe déjà.
>
> ## Style de code
> - Suivre la convention existante du fichier édité.
> - Pas de console.log oubliés.
> - Pas de `any` en TypeScript.
>
> ## Tests
> - Pour chaque correction de bug, ajouter un test qui aurait attrapé le bug.
> - Lancer les tests avant de dire « c'est fait ».
>
> ## Edits
> - Préférer des patches ciblés à des réécritures complètes.
> - Si plus de 80 lignes d'un fichier sont touchées d'un coup, expliquer pourquoi avant.
>
> ## Ce que tu ne fais jamais
> - Pas de TODO laissé dans le code livré.
> - Pas de « ça devrait marcher » sans test.
> - Pas d'invention de nom de fonction.

**Le détail qui change tout :** la section « Ce que tu ne fais jamais ». Sans elle, l'agent continue à reproduire ce qui pose problème. Avec elle, il s'auto-corrige.

## À retenir

Un CLAUDE.md fonctionne comme un onboarding pour un développeur junior - sauf qu'il est relu à chaque nouvelle tâche. Une fois posé, mesurer le nombre d'allers-retours nécessaires sur une semaine permet de voir la différence avant même la fin de la semaine.
