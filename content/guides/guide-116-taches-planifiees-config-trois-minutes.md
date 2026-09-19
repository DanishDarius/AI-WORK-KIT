---
Guide original : Claude Dispatch : config et astuces
Source : https://www.saadiakaram.ai/guides/claude-dispatch
Position réelle dans la bibliothèque au moment du traitement : 114/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé. Le nom de fonctionnalité cité (« tâches planifiées ») est traité comme un fait produit ; description reformulée.
---

# Configurer des tâches planifiées qui tournent en autonomie

*Claude · 5 min de lecture*

Le mode « tâches planifiées » permet de décrire ce qu'on veut voir exécuté, à quelle fréquence, puis de laisser l'assistant tourner seul — y compris pendant la nuit.

## Configuration en trois minutes

Ouvrir le menu des tâches planifiées dans l'assistant. Décrire la tâche en langage naturel ainsi que sa fréquence (« chaque lundi à 7h », « tous les premiers du mois »). Cocher les connecteurs nécessaires (messagerie, stockage de fichiers, etc.). Activer.

## Trois tâches qui valent la peine

Lundi 7h : brief de la semaine (agenda, e-mails non lus prioritaires, échéances).

Vendredi 17h : bilan de la semaine accompagné de trois questions de rétrospective personnelle.

Premier du mois : revue des objectifs trimestriels et état d'avancement.

## Le prompt à copier

> **Prompt — brief automatisé du lundi**
>
> Chaque lundi à 7h.
>
> Sortie sur une page, ton télégraphique :
> 1. Rendez-vous de la semaine — heure, sujet, action attendue
> 2. Top 5 des e-mails non lus à traiter avant midi (expéditeur, sujet, action en un verbe)
> 3. Échéances à 7 jours
> 4. La seule priorité de la semaine
>
> Envoie le résultat par e-mail à 7h05.

## À retenir

**L'assistant qui travaille pendant qu'on dort.**

Le vrai gain n'est pas le temps économisé. C'est de ne plus jamais arriver au lundi sans plan.
