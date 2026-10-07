# Trois tableaux de bord générés à partir de données clients avec Codex

*Multi-outils · 5 min de lecture*

Un fichier CSV client, mais aucun temps pour ouvrir un tableur. Codex, le mode code d'OpenAI, permet de générer un tableau de bord interactif en moins de trois minutes, pas une simple capture d'écran, un vrai livrable cliquable à envoyer directement au client.

## Le déroulé en trois étapes

D'abord, déposer le fichier CSV. Ensuite, préciser ce que le client souhaite voir apparaître. Enfin, Codex écrit le code HTML et JavaScript, l'exécute, et affiche le résultat directement.

## Le prompt qui fonctionne à tous les coups

> **Prompt : dashboard depuis CSV**
>
> Voici un fichier [nom.csv]. Construis un dashboard HTML autonome (un seul fichier, aucune dépendance externe sauf Chart.js via CDN).
>
> Audience : [client / direction / équipe ops]
> 3 questions auxquelles le dashboard doit répondre :
> - [Q1]
> - [Q2]
> - [Q3]
>
> Contraintes :
> - Filtres en haut (date, segment)
> - 4 KPIs cards
> - 3 graphiques (un par question)
> - Couleurs sobres, prêt à présenter
> - Responsive
>
> Sors le fichier complet, prêt à ouvrir dans Chrome.

## Les trois tableaux de bord les plus souvent redemandés

L'acquisition (de la source à la conversion, en passant par le coût d'acquisition client), la cohorte (rétention par mois d'arrivée), et la trésorerie (encaissements comparés au facturé, autonomie financière restante).

## À retenir

**Facturer le résultat, pas le temps passé.**

Trois tableaux de bord représentent trois livrables valorisables entre 500 et 1500 € pièce (environ 330 000 à 980 000 FCFA). Le client ne se soucie pas du temps de fabrication : il paie la lecture qu'il en tire, pas le processus de création.
