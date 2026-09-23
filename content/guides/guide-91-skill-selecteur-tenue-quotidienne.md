---
Guide original : Le sélecteur de tenue
Source : https://www.saadiakaram.ai/guides/outfit-picker-skill
Position réelle dans la bibliothèque au moment du traitement : 89/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé.
---

# Un Skill qui prépare la tenue du jour selon la météo et l'agenda

*Multi-outils · 5 min de lecture*

Photographier son dressing, coller le skill, relier son agenda : ensuite, l'IA propose chaque matin la tenue adaptée à la météo et au programme de la journée.

## L'usage qui simplifie les matinées

Un usage simple qui libère du temps le matin. Photographier son dressing une fois, coller le skill, connecter l'agenda. Chaque matin, l'IA propose une tenue adaptée à la météo, à la journée, et à ce qui a déjà été porté dans la semaine.

## Configuration en dix minutes

Photographier chaque catégorie : hauts, bas, robes, chaussures, vestes. Uploader ces photos dans un espace de travail dédié. Coller le skill ci-dessous dans les instructions de cet espace. Connecter l'agenda (Google Calendar via un connecteur). Lancer chaque matin avec « tenue du jour ».

## Le skill à copier

> **Skill : sélecteur de tenue**
>
> # Sélecteur de tenue
>
> ## Quand l'utiliser
> Chaque matin, ou la veille au soir, quand je demande « tenue du jour ».
>
> ## Inputs disponibles
> - Photos de mon dressing (déjà uploadées au projet)
> - Météo du jour (récupère via recherche web ou connecteur)
> - Mon agenda du jour (récupère via connecteur)
> - Historique des tenues portées cette semaine (je te le rappelle si besoin)
>
> ## Procédure
> 1. Lis la météo et l'agenda.
> 2. Identifie le ton de la journée : casual / pro / sport / soirée.
> 3. Évite les pièces portées dans les 4 derniers jours.
> 4. Propose 1 tenue principale + 1 alternative.
>
> ## Format de sortie
> - Tenue principale : [haut + bas + chaussures + accessoire + veste]
> - Pourquoi : 1 phrase
> - Alternative si je trouve la première trop : [...]
>
> ## Ne jamais
> - Proposer une tenue inadaptée à la météo (manteau s'il fait 30°, sandales s'il pleut).
> - Mélanger deux pièces fortes (deux imprimés, deux couleurs saturées).

## À retenir

Le bon outil IA est invisible : la décision cesse d'être un poids mental. Re-uploader son dressing tous les trois mois, sans quoi le skill propose des pièces qui ne sont plus disponibles.
