---
Guide original : Quoi déléguer à Claude
Source : https://www.saadiakaram.ai/guides/ai-risk-score
Position réelle dans la bibliothèque au moment du traitement : 254/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé (la mention « format tableau » dans le prompt est une instruction de mise en forme demandée à l'IA, pas un tableau HTML réel). Nom réel conservé (Claude).
---

# Une grille en trois axes pour décider ce qui peut être délégué à Claude

*Claude · 5 min de lecture*

Le conseil « automatise tout avec l'IA » circule largement, mais rarement accompagné d'un critère clair pour choisir quoi déléguer réellement. Voici une grille de décision simple en trois axes.

## Le score en trois axes

Pour chaque tâche, noter de 1 à 5 sur trois critères : réversibilité, visibilité de l'erreur, coût d'une mauvaise sortie.

- **Réversibilité** : est-il possible d'annuler l'action ? Un email déjà envoyé : 1 (irréversible). Un simple brouillon : 5 (totalement réversible).
- **Visibilité de l'erreur** : le problème se voit-il immédiatement ? Une faute de frappe : 5. Un chiffre erroné dans un tableau de données : 1.
- **Coût d'une mauvaise sortie** : quel est l'impact d'une erreur ? Une note interne : 5. Un contrat client : 1.

## La règle de lecture du score

Un total supérieur à 12 permet de déléguer à Claude sans supervision lourde. Entre 8 et 12, Claude propose et la validation reste humaine. En dessous de 8, la rédaction reste humaine et Claude n'intervient qu'en relecture, jamais l'inverse.

### Le cas piège

Une réponse à un client dans une situation sensible : réversibilité 1, visibilité 3, coût 2, soit un total de 6. La rédaction doit rester humaine, même si l'outil produit généralement un bon résultat sur ce type de tâche.

## Le prompt d'audit de délégation

> **Prompt : audit délégation**
>
> Voici 10 tâches que je fais cette semaine :
> [liste]
>
> Pour chacune, donne-moi :
> 1. Score réversibilité (1-5)
> 2. Score visibilité d'erreur (1-5)
> 3. Score coût de mauvaise sortie (1-5)
> 4. Total
> 5. Recommandation : DÉLÈGUE / VALIDE / ÉCRIS-TOI
>
> Format tableau. Trie par total décroissant pour que je vois en haut ce qui est safe à déléguer en premier.

## À retenir

**Déléguer par lots réfléchis, pas par envie du moment.**

Refaire cet audit une fois par mois permet de voir évoluer les tâches : ce qui semblait risqué l'année précédente ne l'est plus forcément aujourd'hui.
