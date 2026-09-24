---
Guide original : Analyse n'importe quelle action avec Claude
Source : https://www.saadiakaram.ai/guides/claude-stock-analyst
Position réelle dans la bibliothèque au moment du traitement : 94/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé. Ce guide porte sur l'analyse de documents financiers publics à l'aide de l'IA ; les avertissements du contenu source, rappelant qu'il ne s'agit pas d'un conseil financier, ont été intégralement conservés.
---

# Transformer les documents investisseurs d'une entreprise en analyse structurée

*Claude · 5 min de lecture*

Une configuration en cinq étapes pour transformer les documents investisseurs publics d'une entreprise en analyse structurée. Pas d'hallucinations, une méthode cadrée. Ceci n'est pas un conseil financier.

## Ce que c'est, et ce que ce n'est pas

Ceci n'est pas un conseil financier. C'est une méthode pour transformer les documents investisseurs publics d'une entreprise (rapport annuel, présentation, transcriptions d'earnings calls) en analyse structurée, sans invention de chiffres.

## La configuration en cinq étapes

Créer un espace de travail dédié à l'entreprise étudiée. Uploader : le dernier rapport annuel, les deux derniers transcripts de résultats trimestriels, un deck investisseurs. Activer la règle « aucun chiffre sans source dans les documents uploadés ». Poser des questions sur le business, pas sur le cours de l'action. Faire auditer la sortie par un second prompt (voir le guide dédié à l'agent auditeur).

## Le prompt à copier

> **Prompt : analyse cadrée**
>
> Tu es mon analyste actions. Voici les documents officiels que je te fournis : [listez les fichiers]
>
> Règles absolues :
> 1. Tu ne cites AUCUN chiffre absent des documents fournis. Si un chiffre te manque, tu écris « non trouvé dans les sources ».
> 2. Pour chaque affirmation, tu cites la page ou le document source.
> 3. Tu sépares clairement FAITS / INTERPRÉTATIONS / RISQUES.
>
> Livre une analyse en 5 sections :
> 1. Le business en 5 lignes (qui paie, pour quoi, combien).
> 2. Trois forces structurelles, sources à l'appui.
> 3. Trois faiblesses structurelles, sources à l'appui.
> 4. Les 3 chiffres clés à suivre dans le prochain trimestre, et pourquoi.
> 5. Ce que je devrais entendre dans le prochain earnings call qui changerait ma thèse.
>
> Pas de recommandation d'achat ou de vente. Pas de prix cible.

## Avertissement

Aucune analyse produite par une IA ne remplace un conseiller financier diplômé. C'est un outil de structuration de l'information, pas un instrument de prédiction.

## À retenir

L'IA aide à lire deux cents pages en une heure, pas à prédire l'avenir. Refaire l'analyse à chaque trimestre : c'est dans l'écart entre deux versions successives que l'on apprend vraiment à connaître une entreprise.
