---
Guide original : La hiérarchie de contrôle de Claude
Source : https://www.saadiakaram.ai/guides/claude-control-hierarchy
Position réelle dans la bibliothèque au moment du traitement : 96/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé.
---

# Trois niveaux qui pilotent vraiment le comportement d'une IA

*Claude · 5 min de lecture*

Trois niveaux pilotent réellement le comportement d'un assistant conversationnel. La plupart des gens n'en utilisent qu'un et s'étonnent du résultat.

## Les trois niveaux

L'assistant obéit à trois niveaux, dans cet ordre : le système (défini par l'éditeur du modèle), le projet (les instructions propres à un espace de travail), et la conversation (le message du moment). La grande majorité des utilisateurs ne joue qu'au niveau de la conversation, et s'étonne ensuite que rien ne tienne d'un échange à l'autre.

**Système** : défini par l'éditeur du modèle. Impossible à modifier, mais le connaître évite de s'y opposer inutilement.

**Projet** : les règles globales propres à un contexte donné. C'est là que se joue l'essentiel de la cohérence.

**Conversation** : le message du moment, à réserver aux demandes ponctuelles.

## Comment s'en servir

Identité, ton, contraintes → au niveau Projet. Format de livrable récurrent → au niveau Projet. Demande spécifique du jour → dans la conversation. Style ponctuel (mode dépouillé, mode tuteur) → un style personnalisé activé dans la conversation.

## Le gabarit à copier

> **Prompt : squelette d'instructions de Projet**
>
> # Contexte
> Projet : [nom]
> Objectif final : [...]
> Audience : [...]
> Tonalité : [...]
>
> # Règles
> 1. Tu poses 1 question si quelque chose manque, jamais plus.
> 2. Tu structures tes réponses avec h2 et listes.
> 3. Tu termines chaque livrable par « Ce que je n'ai pas vérifié : ... ».
> 4. Tu cites tes sources.
>
> # À ne JAMAIS faire
> - [3 choses précises qui font perdre du temps]

## À retenir

Le niveau Projet reste le levier le plus sous-exploité. Reconstruire ses espaces de travail permet généralement d'écrire beaucoup moins dans chaque conversation, pour des résultats nettement meilleurs.
