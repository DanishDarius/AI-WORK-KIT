---
Guide original : 3 Artifacts Claude qui ont viré mes apps fitness
Source : https://www.saadiakaram.ai/guides/fitness-artifacts
Position réelle dans la bibliothèque au moment du traitement : 191/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé. Contenu de bien-être général (suivi d'entraînement, calcul de macronutriments) - pas de donnée médicale personnelle, traité normalement. Valeurs techniques du prompt (localStorage, vanilla JS, seuils numériques) conservées inchangées pour ne pas casser le fonctionnement du prompt. Nom réel conservé (Claude).
---

# Trois artifacts qui remplacent des applications de fitness payantes

*Claude · 5 min de lecture*

Trois applications de fitness supprimées d'un téléphone, remplacées par trois artifacts générés avec Claude : entièrement personnalisés, gratuits et modifiables à volonté. Voici ce qu'ils font et le prompt pour les recréer.

## Artifact 1 - Le suivi d'entraînement minimaliste

Une seule page. Les exercices choisis, les séries, la charge de la séance précédente affichée. Aucune notification, aucun coach virtuel, aucune publicité.

## Artifact 2 - Le calculateur de macronutriments honnête

Pas de promesse de « régime miracle ». On entre poids, taille, objectif (perte, maintien, prise) et niveau d'activité. L'outil calcule les calories et macronutriments, et indique honnêtement sa marge d'erreur (environ ± 15 %).

## Artifact 3 - Le plan de semaine adaptatif

On indique le nombre de jours disponibles cette semaine, le sommeil moyen et le niveau d'énergie ressenti. L'outil génère un plan qui s'ajuste en conséquence (par exemple trois séances au lieu de cinq en cas de fatigue).

## Le prompt pour générer les trois artifacts d'un coup

> **Prompt - fitness artifacts**
>
> Construis-moi 3 Artifacts HTML autonomes (un fichier chacun, vanilla JS, localStorage pour sauver).
>
> 1. TRACKER D'ENTRAÎNEMENT
> - Mes exos : [liste]
> - Affiche : séries x reps x charge, avec la dernière séance en gris
> - 1 clic = +1 série loggée, 1 long press = éditer
> - Aucune fioriture
>
> 2. CALCULATEUR DE MACROS
> - Inputs : âge, sexe, poids, taille, activité (1-5), objectif (cut/maintain/bulk)
> - Output : kcal, P/G/L en grammes, fourchette honnête
> - Avertit si l'objectif est trop agressif (>1% poids/semaine)
>
> 3. PLAN SEMAINE ADAPTATIF
> - Inputs : jours dispos, sommeil moyen, énergie 1-10
> - Output : plan jour par jour avec exos + intensité
> - Règle : si énergie < 5, remplace une séance dure par mobilité
>
> Sors les 3 fichiers, prêts à ouvrir.

## À retenir

**Des outils pensés pour soi, pas pour des millions d'utilisateurs.**

C'est là un vrai luxe en 2026. Un artifact bien conçu peut surpasser une application vendue à un abonnement mensuel.
