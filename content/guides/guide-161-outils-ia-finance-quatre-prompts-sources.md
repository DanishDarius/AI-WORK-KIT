---
Guide original : Semaine IA finance : ce qui vient de tomber
Source : https://www.saadiakaram.ai/guides/finance-ai-week
Position réelle dans la bibliothèque au moment du traitement : 159/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé (guide long, 4 prompts complets). Noms de produits et partenaires de données réels conservés comme faits (Claude for Financial Services, Anthropic, Perplexity Finance, Databricks, Snowflake, LSEG, Moody's, MT Newswires, Excel, PowerPoint, Word, Microsoft 365, Claude Opus 4, SEC/EDGAR, FactSet, S&P Global, Morningstar, Quartr). Contenu financier : tous les avertissements de la source (« pas un conseil en investissement », nécessité de vérifier les chiffres et de consulter un conseiller qualifié) ont été intégralement conservés. Le titre original, ancré dans l'actualité d'une semaine précise, a été généralisé pour rester utilisable dans la durée.
---

# Deux outils IA pour la finance, quatre prompts sourcés à copier

*Multi-outils · 7 min de lecture*

Des offres IA spécialisées finance, les faits sourcés, la part honnête entre usage professionnel et grand public, et quatre prompts prêts à coller.

## Le problème que personne ne mentionne assez

La finance est le secteur où une IA qui se trompe avec assurance coûte le plus cher. Un modèle qui invente un chiffre, une source ou une tendance, et une décision se prend sur du vent. C'est précisément pour cette raison que les outils IA dédiés à la finance tournent tous autour du même principe : la traçabilité. Pas seulement « l'IA donne la réponse », mais « l'IA donne la réponse ET la source, cellule par cellule, dépôt par dépôt ». Sans cela, aucun professionnel ne s'engage, et personne d'autre ne devrait le faire non plus.

Une règle à retenir avant tout prompt : ne jamais faire confiance à un chiffre que l'IA ne rattache pas à une source vérifiable. Les outils présentés ci-dessous sont construits autour de ce principe, et les prompts qui suivent forcent la citation systématique. C'est ce qui distingue s'informer de se raconter une histoire.

## Ce qui existe vraiment : les faits, usage professionnel contre grand public

**Claude for Financial Services (Anthropic).** Une offre pensée pour les institutions : des modèles d'agents prêts à l'emploi pour les tâches les plus lourdes (construire un pitchbook, filtrer des dossiers de conformité, clôturer les comptes en fin de mois, réaliser une revue de valorisation). Chaque agent combine des compétences, des connecteurs de données gouvernés (Databricks, Snowflake, LSEG, Moody's, MT Newswires) et des sous-agents. Point clé : chaque chiffre produit est attribué à sa source, pour qu'un analyste puisse remonter à la donnée avant d'agir. Claude s'intègre aussi dans Excel, PowerPoint et Word via les modules complémentaires Microsoft 365 : dans Excel, il lit, analyse et modifie le tableur en direct, débogue les formules et renvoie aux cellules concernées. Repère de crédibilité : Claude Opus 4 a réussi cinq des sept niveaux d'une compétition de modélisation financière et obtenu un score de 83 % sur des tâches Excel complexes.

Honnêteté : cette offre est conçue pour les banques et les fonds, pas pour un usage individuel. Mais le cœur du système (une IA qui lit et analyse des fichiers en citant chaque chiffre) reste accessible aujourd'hui à tout un chacun, en déposant son propre tableur ou son export bancaire. C'est exactement ce qu'exploite le prompt 4 ci-dessous.

**Perplexity Finance.** Un espace gratuit qui réunit en une seule interface : prix en temps réel, graphiques, historique de résultats, notes d'analystes, une cartographie sectorielle, un outil de filtrage en langage naturel, et un accès direct aux dépôts réglementaires officiels (rapports annuels, trimestriels, événements significatifs, introductions en bourse). Son centre de résultats agrège le calendrier des publications et synthétise un call en direct : transcription, résumé, extraction du chiffre d'affaires et du bénéfice par action en temps réel. Partenaires de données : sources réglementaires officielles, FactSet, S&P Global, Morningstar, LSEG, Quartr, entre autres.

Honnêteté : Perplexity Finance reste accessible à tous, gratuitement, et constitue la meilleure porte d'entrée pour un particulier. Les prompts 1, 2 et 3 s'appuient dessus.

Le duo qui fonctionne : Perplexity Finance pour la donnée fraîche et sourcée, Claude pour le raisonnement et la synthèse. Voici les quatre workflows.

## Les quatre prompts à copier

> **Prompt 1 : le filtre en langage naturel (Perplexity Finance)**
>
> Sur les marchés actions, trouve-moi les sociétés qui cochent TOUTES ces conditions,
> avec la donnée la plus récente et la source pour chaque critère :
> - secteur : [ex. cybersécurité / énergie renouvelable / luxe]
> - capitalisation : [ex. entre 2 et 20 milliards]
> - croissance du chiffre d'affaires : [ex. > 15 % sur le dernier exercice]
> - rentable (résultat net positif sur les 4 derniers trimestres)
> - [ajoutez votre critère : dette faible, dividende, zone géographique...]
>
> Donne-moi un tableau : nom, ticker, capitalisation, croissance, marge nette,
> et une phrase sur ce que fait la société. Cite la source et la date de chaque chiffre.
> Si un critère n'est pas vérifiable, dis-le au lieu de deviner.

> **Prompt 2 : la thèse optimiste et pessimiste d'une action (Claude, données Perplexity)**
>
> Voici des données récentes et sourcées sur l'action [TICKER / nom] :
> [Collez ici : prix, résultats récents, extraits du dernier dépôt réglementaire, notes d'analystes.]
>
> Agis comme deux analystes qui ne sont d'accord sur rien.
>
> 1. L'OPTIMISTE : la thèse d'achat la plus solide. 3 catalyseurs concrets, chiffrés,
> chacun rattaché à un élément fourni.
> 2. LE SCEPTIQUE : la thèse inverse. 3 risques réels, dont au moins un que l'optimiste
> ignore. Ce qui casse en premier.
> 3. LE JUGE : qu'est-ce qui, factuellement, ferait basculer la décision ? Quelles 2
> données surveiller au prochain trimestre ?
>
> Règle absolue : n'utilise QUE les données fournies. Si une information
> manque, écris « non disponible dans les données fournies ». N'invente aucun chiffre.

> **Prompt 3 : décrypter des résultats trimestriels en deux minutes (Claude)**
>
> Voici le compte rendu des résultats trimestriels de [société] :
> [Collez le résumé ou la transcription du centre de résultats.]
>
> Explique-moi ça comme à quelqu'un d'intelligent mais pressé, en 5 blocs courts :
> 1. LE VERDICT : résultats au-dessus ou en dessous des attentes ? Sur le chiffre
> d'affaires ET le bénéfice. Donne l'écart.
> 2. LA GUIDANCE : les prévisions ont-elles monté, baissé ou stagné ?
> 3. LE TON DU MANAGEMENT : qu'est-ce qui a changé dans le discours ?
> 4. LES 3 DRAPEAUX ROUGES : ce qu'un investisseur pressé raterait.
> 5. LA QUESTION À CREUSER avant toute décision.
>
> Si une donnée n'est pas dans le texte, dis « non précisé ». Zéro invention.

> **Prompt 4 : l'audit de son budget personnel (Claude et son propre fichier)**
>
> Je te donne l'export de mes dépenses (fichier joint).
>
> Analyse-le et rends-moi un audit clair :
> 1. RÉPARTITION : classe mes dépenses par catégorie, en montant et en pourcentage.
> 2. LES FUITES : les 5 postes où je dépense plus que je ne le crois, ou en hausse
> sans raison. Chiffre chacun et pointe les lignes concernées.
> 3. LES ABONNEMENTS : liste tout ce qui ressemble à un prélèvement récurrent, avec
> le total annuel. Signale les doublons ou ce qui semble oublié.
> 4. LE PLAN : 3 actions concrètes pour récupérer de la marge le mois prochain,
> avec le montant estimé pour chacune.
> 5. LA PROJECTION : à ce rythme, où j'en suis dans 3 mois ?
>
> Chaque chiffre avancé doit être rattaché à des lignes réelles du fichier.
> Ne devine jamais un montant.

## L'astuce de pro

La consigne qui revient dans les quatre prompts, « cite la source » ou « ne devine jamais », n'est pas une simple politesse : c'est le garde-fou. C'est exactement la fonctionnalité que les institutions financières ont exigée avant d'adopter ces outils. Ce réflexe mérite d'être ajouté à tout prompt qui touche à l'argent, aux chiffres ou à une décision.

## Quand s'en servir, et l'avertissement qui compte

Ces workflows servent à comprendre, comparer et organiser, plus vite et avec des sources. Ils ne remplacent pas un professionnel. Ceci n'est pas un conseil en investissement : une IA, même sourcée, peut se tromper, et les marchés ne se résument pas à un prompt. Il faut toujours vérifier les chiffres à la source avant d'agir, et pour toute décision qui engage de l'argent, s'adresser à un conseiller qualifié. L'IA fait gagner du temps de recherche. La décision reste toujours humaine.

## À retenir

**Sourcé ou rien.**

En finance, un chiffre sans source reste une rumeur. Forcer la citation à chaque prompt, vérifier avant d'agir, et garder la décision entre ses propres mains.
