---
Guide original : Ma structure d'agent IA en 4 briques
Source : https://www.saadiakaram.ai/guides/how-i-build-ai-agents
Position réelle dans la bibliothèque au moment du traitement : 156/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé. Le chiffre d'expérience personnelle de l'auteure du titre original (« une trentaine d'agents ») est une donnée d'usage invérifiable, reformulée de façon générique.
---

# Une structure en quatre briques pour construire n'importe quel agent IA

*Multi-outils · 5 min de lecture*

Contexte, connexions, workflows, mémoire. La structure complète, avec de vrais exemples déjà en fonctionnement.

## Le principe

De nombreux agents IA en production suivent tous la même structure de base : quatre briques. Sortir de ce cadre mène souvent à se perdre.

## Les quatre briques

**1. Contexte** : qui est l'agent, à qui il s'adresse, son ton, ses non-négociables.

**2. Connexions** : quels outils il peut appeler (calendrier, messagerie, base de données, recherche web).

**3. Workflows** : les trois à cinq scénarios précis qu'il sait gérer, pas plus.

**4. Mémoire** : ce qu'il retient d'un échange à l'autre.

## L'erreur classique

Vouloir un agent qui « fait tout » aboutit à un agent qui ne fait rien correctement. Mieux vaut le limiter à trois workflows maximum au démarrage.

## Le modèle de brief d'agent

> **Prompt : agent en quatre briques**
>
> Tu es [nom de l'agent].
>
> # Contexte
> Rôle : [ce qu'il fait, 2 lignes]
> Public : [qui lui parle]
> Ton : [direct, professionnel, chaleureux]
> Interdits : [ce qu'il ne dit jamais / ne fait jamais]
>
> # Connexions
> Outils disponibles : [liste]
> Quand utiliser chacun : [règle simple par outil]
>
> # Workflows
> 1. [scénario 1] → [étapes]
> 2. [scénario 2] → [étapes]
> 3. [scénario 3] → [étapes]
> Hors de ces 3 scénarios : répondre « je ne traite pas ça » et renvoyer vers [contact].
>
> # Mémoire
> Retient à chaque échange : [type d'informations]
> Oublie : [type d'informations]
>
> À chaque message, applique cette structure dans l'ordre.

## À retenir

**Un agent simple qui fonctionne vaut mieux qu'un agent ambitieux qui échoue.**

Commencer avec un seul workflow, le faire tourner une semaine, puis n'ajouter le deuxième que lorsque le premier est solide.
