---
Guide original : Le scout d'offres d'emploi
Source : https://www.saadiakaram.ai/guides/job-board-scout
Position réelle dans la bibliothèque au moment du traitement : 186/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé. Le format « tableau » mentionné dans le prompt fait partie d'une instruction de mise en forme du livrable, pas d'un élément HTML réel de la page. Noms réels conservés (Claude, LinkedIn, Welcome, Indeed).
---

# Automatiser sa veille d'offres d'emploi pendant la nuit

*Multi-outils · 5 min de lecture*

Chercher un emploi en faisant défiler LinkedIn au hasard fait perdre du temps. Un scout automatisé travaille pendant la nuit et livre, au réveil, les meilleures offres prêtes à candidature.

## Ce que fait réellement ce scout

Il balaie plusieurs sources (LinkedIn, Welcome, Indeed, sites propres des entreprises ciblées), filtre selon des critères définis, attribue un score à chaque offre, et rédige une lettre adaptée pour les trois meilleures.

## Le prompt à programmer

> **Prompt - scout d'offres**
>
> Tu es mon scout d'offres d'emploi.
>
> À 6h chaque jour ouvré, va chercher les offres publiées dans les 24h dernières qui matchent :
> - Postes : [titres cibles]
> - Secteurs : [liste ou « tous sauf X »]
> - Géo : [zones acceptées + télétravail oui/non]
> - Salaire cible mini : [xx €]
> - Exclusions : [entreprises, secteurs, mots-clés à éviter]
>
> Pour chaque offre, sors :
> 1. Titre + entreprise + lieu + fourchette salaire si dispo
> 2. Un score de match sur 10 (basé sur mon CV ci-dessous)
> 3. Pourquoi je devrais ou pas postuler en 2 lignes
> 4. Le lien direct
>
> Retiens-moi top 5 du jour. Pour le top 3, génère un brouillon de lettre adapté.
>
> Mon CV :
> [colle CV ou résumé]
>
> Format : email court avec le top 5 en tableau et les 3 lettres en pièce jointe / blocs dépliables.

## Le filtre que peu de gens activent

Toujours ajouter une exclusion « agence de placement / cabinet de recrutement » pour ne récupérer que les offres directes.

## À retenir

**Se réveiller, choisir, candidater.**

Ce scout ne remplace pas le jugement humain. Il remplace les heures passées à faire défiler des annonces sans résultat.
