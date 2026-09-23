---
Guide original : Live Artifacts : construis une fois, mis à jour
Source : https://www.saadiakaram.ai/guides/live-artifacts
Position réelle dans la bibliothèque au moment du traitement : 219/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé. Valeurs techniques du prompt (fréquence de rafraîchissement, format HTML autonome) conservées inchangées. Noms réels conservés comme faits (Claude, Google Sheets, Notion, Calendar, Cowork).
---

# Des artifacts qui restent connectés et se mettent à jour tout seuls

*Multi-outils · 5 min de lecture*

Les artifacts Claude deviennent « vivants » : ils restent connectés aux applications sources et se rafraîchissent automatiquement. Un tableau de bord d'indicateurs qui lit une feuille Google Sheets. Un briefing matinal qui suit un agenda en temps réel. Un calendrier de contenu qui reflète un espace Notion. Construits une fois, ils continuent de fonctionner sans intervention.

## Ce qui change avec ces artifacts connectés

Avant : générer un tableau de bord, le capturer en image, l'envoyer, puis le voir devenir obsolète en deux jours. Après : partager simplement un lien, dont les données restent à jour en continu. L'artifact devient une fenêtre vivante sur le système suivi.

## La configuration type

1. Créer un artifact (HTML + JS) dans Claude.
2. Connecter une source de données (Google Sheets, Notion, Calendar).
3. Configurer un rafraîchissement automatique ou une tâche Cowork dédiée.
4. Partager le lien avec l'équipe concernée.

## Le prompt de tableau de bord connecté

> **Prompt : live KPI**
>
> Crée un Artifact HTML qui affiche 4 KPIs depuis cette source de données : [colle le lien ou décris la source].
>
> KPIs :
> 1. [métrique 1]
> 2. [métrique 2]
> 3. [métrique 3]
> 4. [métrique 4]
>
> Contraintes :
> - Rafraîchissement toutes les 30 minutes
> - Design card-based, couleurs sobres
> - Responsive
> - Un seul fichier HTML autonome
>
> Sors le code complet.

## À retenir

**Le meilleur outil est celui qu'on n'a pas à refaire.**

Un artifact obsolète en quarante-huit heures représente du temps perdu. Un artifact connecté en continu devient un outil qu'on peut oublier tout en continuant à s'en servir : la différence entre une astuce ponctuelle et un vrai système.
