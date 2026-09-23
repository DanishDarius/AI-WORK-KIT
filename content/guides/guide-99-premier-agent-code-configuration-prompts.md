---
Guide original : Ton premier agent Codex, version débutant
Source : https://www.saadiakaram.ai/guides/codex-agent-setup
Position réelle dans la bibliothèque au moment du traitement : 97/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé.
---

# Configurer un premier agent de code, version débutant

*Multi-outils · 5 min de lecture*

Une configuration de quinze minutes pour lancer un agent de code en local, pilotable à distance, capable de produire un vrai travail. Les trois premiers prompts à essayer, et cinq erreurs à éviter.

## Le principe

Un agent de code installé en local, pilotable à distance depuis un téléphone, prêt en quinze minutes. Le résultat : un agent qui code, débogue et livre des propositions de modification pendant qu'on fait autre chose.

## La configuration

Installer l'agent de code en ligne de commande sur l'ordinateur. Autoriser les permissions disque nécessaires (Documents, Téléchargements). Lier son compte selon la configuration choisie. Activer la connexion mobile via le QR code disponible dans les paramètres. Créer un dossier projet test pour valider l'ensemble.

## Les trois premiers prompts à essayer

> **Prompt 1 : premier diagnostic**
>
> Tu es mon agent de code. Voici le dossier : [chemin].
>
> Procédure :
> 1. Lis l'arborescence.
> 2. Identifie le langage principal, le framework, et les fichiers d'entrée.
> 3. Sors un résumé de 5 lignes : à quoi sert ce projet, comment il tourne, ce qui semble cassé.
> 4. Pose-moi 3 questions avant toute modification.

> **Prompt 2 : premier correctif**
>
> Voici le bug : [description précise + message d'erreur + reproduction].
>
> Règles :
> - Tu modifies UN fichier max.
> - Tu ajoutes un test qui aurait attrapé le bug.
> - Tu n'écris pas de commentaires « TODO ».
> - Tu lances le test avant de me dire « c'est fait ».

> **Prompt 3 : tâche en arrière-plan**
>
> Tu vas tourner pendant 30 minutes en arrière-plan.
>
> Objectif : [...]
> Garde-fou : si tu touches plus de 5 fichiers, tu t'arrêtes et tu me demandes.
> Livrable final : un récap markdown des changements + commande pour les tester.

## Les cinq erreurs à éviter

Donner accès à l'ensemble du disque. Lancer un agent sans branche git dédiée. Ne pas définir de garde-fou de périmètre. Sauter les tests. Croire la sortie sans la relire.

## À retenir

Un agent de code n'est pas un développeur expérimenté : c'est un profil junior très rapide, qui a besoin de règles claires. Commencer par trois tâches courtes par semaine, et augmenter le rythme à mesure que les erreurs diminuent.
