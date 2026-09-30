# Construire un vrai système de mémoire pour son assistant IA, en trois couches

*Claude · 5 min de lecture*

Claude ne dispose pas nativement d'une mémoire persistante entre les conversations. Il reste toutefois possible de lui en construire une soi-même, avec un résultat souvent plus puissant que la mémoire automatique proposée par d'autres assistants comme ChatGPT.

## Les trois couches de mémoire

1. Les instructions globales : qui utilise l'assistant, comment cette personne travaille, ce qui s'applique partout. Une couche statique.

2. Les espaces de travail (Projects) : un contexte par domaine (travail, vie personnelle, un projet précis). Chaque conversation ouverte dans cet espace en hérite automatiquement.

3. Le fichier mémoire : un document texte mis à jour manuellement, qui sert de source de vérité unique.

## La règle d'or : un seul fichier source

Mieux vaut ne pas disperser ses informations dans une trentaine d'espaces de travail différents. Un fichier central, du type about-me.md, se colle ou se lie dans chaque espace qui en a besoin.

## La routine de mise à jour

Chaque semaine, quelques minutes suffisent : demander à l'assistant ce qu'il a appris de nouveau au cours de la semaine et qui mériterait d'être ajouté au fichier central. Une validation, un copier-coller, une sauvegarde, et le tour est joué.

> **Prompt : audit mémoire**
>
> Voici mon about-me.md actuel : [colle].
> Voici nos 5 derniers chats : [résume].
>
> 1. Quels nouveaux faits ai-je révélés ?
> 2. Quels faits anciens ne sont plus vrais ?
> 3. Propose une version updated, marque clairement les ajouts/suppressions.

## À retenir

**La mémoire est un actif, pas un simple confort.**

Cinq minutes par semaine suffisent à accumuler des années de contexte utile, un avantage réel par rapport à une utilisation qui repart de zéro à chaque conversation.
