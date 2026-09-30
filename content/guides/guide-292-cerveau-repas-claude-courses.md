# Un Skill Claude pour planifier les repas et générer la liste de courses

*Multi-outils · 5 min de lecture*

Il suffit d'indiquer ce que l'on souhaite manger dans la semaine : Claude construit les recettes correspondantes, calcule les quantités exactes selon le nombre de personnes, et fournit une liste de courses prête à être collée dans un drive ou un panier en ligne. Selon certaines estimations, ce Skill permettrait de récupérer environ deux heures par semaine.

## Le brief de base

> **Prompt : Skill cerveau repas**
>
> Tu es mon chef et mon nutritionniste. Mes contraintes :
>
> - [Nombre de personnes au foyer, âges]
> - [Allergies, régimes : sans gluten, végétarien, etc.]
> - [Budget cible par semaine]
> - [Temps max en cuisine par soir]
> - [Magasin où je fais les courses : marque ou site]
>
> Cette semaine je veux manger :
> - Lundi soir : [exemple : pâtes simples]
> - Mardi soir : [exemple : poisson]
> - Mercredi : [...]
> - ...
>
> Sors :
> 1. 7 recettes adaptées (titre, temps, difficulté, étapes courtes).
> 2. La liste de courses unifiée, classée par rayon, au bon volume.
> 3. Les 3 ingrédients que je peux déjà avoir (à vérifier dans mon placard).
> 4. Une suggestion d'optimisation budget si je dépasse.
>
> Format : liste markdown claire, pas de paragraphes longs.

## Comment le connecter à son drive

Une fois la liste générée, elle peut être copiée directement dans Carrefour Drive, Chronodrive ou Auchan : la plupart de ces services proposent une fonction d'importation de liste. À défaut, saisir les articles un par un ne prend guère plus de cinq minutes. Une automatisation complète via un Plugin Claude reste également possible, mais commencer sans est recommandé.

## Le garde-fou

Les portions calculées par défaut sont volontairement larges. Il convient de les vérifier lors de la première semaine et de les ajuster une fois pour obtenir des quantités adaptées à ses propres besoins.

## Questions fréquentes

**Faut-il préciser les marques ?**

Ce n'est pas obligatoire, mais le faire permet d'obtenir une liste de courses directement validable, sans aucune modification à apporter.

**Cela fonctionne-t-il pour cuisiner en une seule fois le dimanche ?**

Oui : il suffit d'ajouter « je veux tout préparer dimanche en 2h » dans les contraintes. Claude réorganise alors l'ensemble en conséquence.

## À retenir

**Le vrai gain : ne plus avoir à penser aux repas.**

Se demander chaque soir ce que l'on va manger représente une charge mentale disproportionnée. Ce Skill en libère l'esprit : lancé le dimanche soir, il évite d'y repenser pour le reste de la semaine.
