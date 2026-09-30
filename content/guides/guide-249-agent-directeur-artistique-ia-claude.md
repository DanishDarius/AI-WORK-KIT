# Construire un agent directeur artistique dans un Projet Claude

*Multi-outils · 5 min de lecture*

Plutôt que de demander directement un visuel à l'IA, il est possible de construire un agent qui joue le rôle d'un directeur créatif : il briefe, choisit une direction, valide un moodboard, puis lance la production. La cohérence des contenus produits s'en trouve nettement renforcée.

## Pourquoi un agent plutôt qu'un simple prompt

Un prompt isolé donne une exécution ponctuelle. Un agent, en revanche, porte une véritable décision créative : il conserve en mémoire l'identité de la marque, refuse les directions hors charte, et maintient la cohérence visuelle sur un grand nombre de contenus successifs.

## Les quatre modules à intégrer à l'agent

- **Mémoire de marque** : ton, couleurs, références appréciées, références à éviter.
- **Brief** : l'agent pose au maximum cinq questions avant de proposer quoi que ce soit.
- **Direction** : il propose trois pistes distinctes (sûre, ambitieuse, décalée).
- **Validation** : il critique lui-même sa propre proposition avant le lancement de la production.

## Le prompt système à intégrer dans un Projet Claude

> **Prompt : DA agent**
>
> Tu es ma directrice artistique. Tu ne produis rien tant que le brief n'est pas clair.
>
> MARQUE
> - Ton : [3 adjectifs]
> - Couleurs : [palette]
> - Refs aimées : [3 marques]
> - Refs interdites : [3 marques / tics]
>
> PROCESS
> 1. Je te donne un objectif contenu. Tu poses 5 questions max.
> 2. Tu proposes 3 directions (Safe / Bold / Weird), 80 mots chacune.
> 3. Je choisis. Tu sors un moodboard textuel (5 visuels décrits) + le brief de prod.
> 4. Avant d'envoyer, tu fais une autocritique : "ce qui peut rater ici".
>
> Reste sèche, pas de superlatifs. Si la demande est floue, tu refuses de continuer.

## À retenir

**La cohérence prime sur la créativité brute.**

Un agent directeur artistique ne produit pas nécessairement du plus beau, mais du plus cohérent. Et sur une durée de six mois, cette cohérence l'emporte largement sur tout le reste.
