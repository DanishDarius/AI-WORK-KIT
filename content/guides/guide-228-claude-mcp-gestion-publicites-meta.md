---
Guide original : Claude peut maintenant gérer tes pubs Meta
Source : https://www.saadiakaram.ai/guides/meta-ads-mcp
Position réelle dans la bibliothèque au moment du traitement : 227/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé. L'accroche annonçait « 5 premiers prompts » alors que seuls 2 prompts (Audit, Création) figurent dans le corps capturé (incohérence de la source), non repris dans le titre reformulé. Noms réels conservés comme faits (Claude, Meta, Business Manager).
---

# Piloter ses campagnes publicitaires Meta depuis Claude grâce à un connecteur MCP

*Claude · 5 min de lecture*

Un connecteur MCP permet désormais à Claude de gérer des campagnes publicitaires Meta directement depuis la conversation. Une fois la connexion établie, il devient possible de créer des campagnes, ajuster les budgets et consulter les performances sans ouvrir de tableau de bord ni naviguer dans Business Manager.

## La configuration du connecteur

1. Installer le connecteur MCP dédié aux publicités Meta dans Claude.
2. Connecter son compte Business Manager avec les permissions appropriées.
3. Commencer par un test en lecture seule avant d'accorder des droits d'édition.
4. Vérifier que les campagnes en cours apparaissent correctement.

## Les prompts de démarrage

> **Prompt : audit des campagnes**
>
> Audite mes campagnes Meta en cours. Identifie :
> 1. Les 3 campagnes qui performent le mieux (ROAS, CTR)
> 2. Les 3 campagnes qui méritent d'être coupées
> 3. Le budget mal alloué
> 4. La meilleure audience actuelle
>
> Donne-moi une action par point.

> **Prompt : création de campagne**
>
> Je veux lancer une campagne [conversion / trafic / notoriété] pour [produit] avec un budget de [montant]/jour.
>
> Public cible : [décrivez]
> Créa principale : [décrivez ou collez un lien]
> Objectif : [chiffre clé]
>
> Rédige le brief complet : nom de campagne, structure ad set, textes, CTA, budget alloué.

## Le garde-fou à respecter

Ne jamais accorder à Claude le droit de dépenser sans validation humaine. Le connecteur sert à la lecture et à la préparation ; la validation finale reste de la responsabilité de l'utilisateur.

## À retenir

**L'IA prépare, l'utilisateur décide, Meta exécute.**

Le connecteur fait gagner du temps sur la préparation et l'analyse. La stratégie et la décision budgétaire finale restent du ressort humain : ne jamais déléguer la dépense elle-même.
