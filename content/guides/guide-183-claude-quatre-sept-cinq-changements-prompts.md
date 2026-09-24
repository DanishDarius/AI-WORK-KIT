---
Guide original : 5 choses qui ont changé dans Claude 4.7
Source : https://www.saadiakaram.ai/guides/claude-47-prompting-playbook
Position réelle dans la bibliothèque au moment du traitement : 182/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé. Nom réel conservé comme fait (Claude 4.7).
---

# Claude 4.7 : cinq changements à intégrer dans ses prompts

*Claude · 5 min de lecture*

Si les réponses semblent différentes depuis la dernière mise à jour, ce n'est pas une impression. Claude 4.7 réagit différemment aux prompts, et les anciens modèles de formulation fonctionnent moins bien. Voici les cinq changements à connaître.

## Les cinq évolutions à intégrer

1. Le rôle assigné compte moins. « Tu es un expert en X » n'apporte quasiment plus rien à lui seul. Le contexte, en revanche, reste déterminant.

2. La pensée structurée se déclenche facilement. Ajouter « réfléchis étape par étape avant de répondre » améliore nettement la qualité des réponses.

3. Les contraintes négatives fonctionnent enfin correctement. Une instruction du type « n'utilise pas X » est désormais bien respectée.

4. Les exemples l'emportent sur les règles énumérées. Un bon exemple et un contre-exemple valent mieux qu'une dizaine d'instructions listées.

5. La relecture critique de soi-même ne coûte rien à demander. « Relis ta réponse et critique-la avant de me la donner » améliore le résultat final sans effort supplémentaire.

## Le modèle de prompt à jour

> **Prompt : template Claude 4.7**
>
> Contexte
> [Qui vous êtes, ce que vous faites, l'objectif réel]
>
> Ta tâche
> [Une phrase claire, verbe d'action]
>
> Exemple de ce qui est bon
> [collez 1 exemple]
>
> Exemple de ce qui rate
> [collez 1 contre-exemple]
>
> Contraintes
> - [Règle 1]
> - N'utilise pas [...]
>
> Méthode
> Réfléchis étape par étape. Puis donne ta réponse. Puis relis-la et corrige les faiblesses avant de me la livrer.

## À retenir

**Mettre à jour ses modèles de prompts.**

Des prompts datant d'une version antérieure de l'assistant en sous-exploitent les capacités actuelles. Une demi-heure investie pour les refaire suffit généralement à obtenir un net gain de qualité.
