---
Guide original : Le guide complet de Cowork
Source : https://www.saadiakaram.ai/guides/cowork
Position réelle dans la bibliothèque au moment du traitement : 80/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé.
---

# Maîtriser l'agent en arrière-plan pour les tâches longues

*Multi-outils · 5 min de lecture*

Un mode agent qui travaille sur des fichiers en arrière-plan pendant qu'on fait autre chose. Configuration, logique de fonctionnement, et usages réels.

## Le principe

Ce mode fonctionne comme un agent en arrière-plan : il travaille sur des fichiers pendant que l'utilisateur passe à autre chose, et signale quand le travail est prêt. Bien utilisé, il libère des après-midis entiers.

## Quand l'utiliser

Pour les tâches longues : analyse de cinquante PDF, traitement d'un export CSV volumineux, audit d'un dossier complet. Pour les tâches itératives : « génère vingt versions et garde les trois meilleures ». Pour les tâches en lot : « applique ce traitement à chacun de ces trente fichiers ».

## Le brief qui fonctionne

> **Prompt — brief type**
>
> Tu vas travailler en arrière-plan sur ce job.
>
> Inputs : [liste des fichiers ou liens]
> Objectif : [un seul objectif, en une phrase]
>
> Procédure :
> 1. Pour chaque input, applique [traitement précis].
> 2. Stocke chaque résultat dans un fichier nommé [convention de nommage].
> 3. À la fin, produis un récap : nombre d'items traités, anomalies détectées, items à revoir à la main.
> 4. Ne me préviens qu'à la fin, ou si tu rencontres une décision que je dois trancher.
>
> Critères de qualité : [3 critères clairs]
> À ne pas faire : [2 choses précises]

## L'erreur classique

Donner un objectif vague (« améliore ces docs »). Ce mode agent est puissant quand l'objectif est binaire — réussi ou pas réussi. Sinon, il dérive.

## À retenir

Ce type d'agent libère du temps, à condition que le brief soit propre dès le départ. Bloquer quinze minutes pour rédiger le brief permet souvent de récupérer plusieurs heures derrière.
