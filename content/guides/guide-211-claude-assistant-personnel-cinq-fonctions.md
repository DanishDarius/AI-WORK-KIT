---
Guide original : Claude devient ton assistant personnel
Source : https://www.saadiakaram.ai/guides/claude-personal-assistant
Position réelle dans la bibliothèque au moment du traitement : 210/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé. L'accroche d'introduction de la source mentionnait « 15 nouveaux connecteurs » sans que 15 éléments distincts n'apparaissent dans le corps du guide (seulement 5 fonctions). Incohérence présente dans la source, non reprise dans le titre reformulé. Nom réel conservé (Claude, Gmail, Calendar).
---

# Configurer Claude comme assistant personnel : cinq fonctions à activer

*Claude · 5 min de lecture*

Pas un assistant humain à temps plein, mais une bonne partie de ce qu'un tel assistant apporte, sans le coût associé. Voici comment configurer Claude pour qu'il joue ce rôle au quotidien.

## Les cinq fonctions à activer

1. Le tri du matin : analyse de la messagerie et du calendrier, livrant un brief en cinq points dès le début de journée.

2. La préparation des réunions. Pour chaque rendez-vous, un mini-dossier : qui, contexte, trois questions à poser.

3. Les relances : repérage des e-mails restés sans réponse depuis plus de cinq jours, avec propositions de brouillons.

4. La logistique (réservations, restaurants, déplacements) : les contraintes sont données, trois options sont proposées en retour.

5. La mémoire relationnelle : ce que les gens ont dit lors d'un échange précédent est noté, pour s'en souvenir au contact suivant.

## L'espace de travail « Assistant »

Créer un espace dédié contenant : une présentation personnelle, un calendrier type, des préférences (horaires, restaurants, transport), et les contacts clés. C'est la base sur laquelle tout le reste s'appuie.

## Le prompt de brief matinal

> **Prompt : brief matinal**
>
> Bonjour. Voici ma journée :
> - Calendar : [export]
> - Mails non lus : [résumez top 10]
>
> Livre :
> 1. 3 priorités du jour (les vraies, pas la to-do)
> 2. Pour chaque meeting : 1 phrase de contexte + 1 question clé
> 3. Mails qui exigent une réponse aujourd'hui (avec draft proposé)
> 4. 1 chose à laquelle je ne pense pas et que je devrais voir
>
> Format : court, scannable en 2 minutes.

## À retenir

**Un assistant n'est utile que s'il est sollicité régulièrement.**

Le piège classique consiste à créer l'espace de travail parfait puis à ne jamais l'ouvrir. L'engagement minimal recommandé : un brief matinal par jour pendant deux semaines.
