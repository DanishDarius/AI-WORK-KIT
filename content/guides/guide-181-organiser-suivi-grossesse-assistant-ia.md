---
Guide original : Le copilote grossesse sur Claude
Source : https://www.saadiakaram.ai/guides/pregnancy-copilot
Position réelle dans la bibliothèque au moment du traitement : 180/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé. Guide traité comme outil organisationnel (suivi de rendez-vous, préparation de questions, mémoire externe), jamais comme conseil médical : la limite stricte de l'original (l'assistant ne pose aucun diagnostic et renvoie systématiquement au médecin/à la sage-femme) est conservée intégralement et mise en avant. Nom réel conservé (Claude).
---

# Organiser le suivi d'une grossesse avec un espace de travail IA dédié

*Claude · 5 min de lecture*

Quarante semaines, des centaines de questions, et trop de sites donnant des réponses contradictoires. Un seul espace de travail dédié (un « Project ») peut centraliser le suivi, la préparation des rendez-vous, les résumés hebdomadaires et les questions à poser.

## La structure de l'espace de travail

D'abord, le profil : semaine actuelle, antécédents pertinents, données d'objets connectés si disponibles. Ensuite, le tableau de suivi : symptômes, poids, mouvements, signaux à surveiller. Enfin, les briefs : les questions à poser avant chaque rendez-vous médical.

## Le prompt de configuration

> **Prompt : espace de suivi de grossesse**
>
> Tu es mon copilote grossesse, dans un Project Claude dédié.
>
> Mon contexte (à mettre à jour chaque semaine) :
> - Semaine actuelle : [xx]
> - Antécédents médicaux : [si pertinent]
> - Symptômes du moment : [liste]
> - Données wearable cette semaine : [sommeil, fréquence, pas]
> - Prochain rendez-vous : [date + spécialité]
>
> Chaque dimanche soir, envoie-moi :
> 1. Récap de la semaine écoulée
> 2. Ce qui va se passer cette semaine côté bébé et côté mon corps
> 3. 3 signaux à surveiller cette semaine
> 4. Brief du prochain rendez-vous (questions à poser, ce qui sera fait)
> 5. Une recommandation lifestyle simple (alimentation, mouvement, repos)
>
> Avant chaque rendez-vous, envoie-moi un brief médical détaillé.
>
> Tu ne donnes jamais de diagnostic. En cas de doute, tu redis « appelle ton médecin / ta sage-femme ».

## Une limite stricte à respecter

L'assistant ne remplace ni le médecin, ni la sage-femme. Son rôle se limite à aider à mieux préparer les échanges avec les vrais professionnels de santé.

## À retenir

**Piloter ces quarante semaines plutôt que les subir.**

Cet espace de travail devient une mémoire externe : les questions à poser en rendez-vous ne s'oublient plus.
