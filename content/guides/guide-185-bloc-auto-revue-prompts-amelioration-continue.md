---
Guide original : Rends chaque prompt Claude plus intelligent
Source : https://www.saadiakaram.ai/guides/claude-prompts-that-improve-themselves
Position réelle dans la bibliothèque au moment du traitement : 184/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé. Nom réel conservé comme fait (Claude).
---

# Un bloc d'auto-révision pour que chaque prompt s'améliore tout seul

*Claude · 5 min de lecture*

Les prompts vieillissent, tout comme les skills construits autour d'eux. Voici un petit bloc de revue à coller en fin de prompt : à chaque exécution, l'assistant indique comment améliorer le prompt lui-même.

## L'idée de départ

Un prompt ne devrait jamais rester figé. Il devrait évoluer avec l'usage qu'on en fait. Le principe consiste à demander à l'assistant de s'auto-critiquer après chaque réponse produite.

## Le bloc à coller en fin de prompt

> **Prompt : auto-révision**
>
> ---
> # REVIEW
>
> Une fois la tâche terminée, à part :
>
> 1. Quels éléments du prompt étaient ambigus ou redondants ?
> 2. Quelle info manquait que je devrais ajouter ?
> 3. Si tu devais réécrire ce prompt pour qu'il marche encore mieux la prochaine fois, donne la V2 prête à copier.
>
> Mets cette section sous le titre « 📈 Amélioration du prompt », à la toute fin, après la vraie sortie.

## Le bénéfice caché

Cette pratique permet d'apprendre à mieux écrire ses prompts en lisant les critiques générées par l'assistant. La compétence progresse presque sans effort supplémentaire.

## Le rythme à adopter

Toutes les cinq utilisations environ, reprendre la version 2 proposée. La tester deux à trois fois. Si elle donne de meilleurs résultats, la conserver. Sinon, garder l'ancienne version.

## À retenir

**Un prompt vivant vaut mieux qu'un prompt parfait.**

Personne n'écrit un prompt parfait du premier coup. Mais il est possible, pour tout le monde, d'en écrire un qui s'améliore de lui-même au fil du temps.
