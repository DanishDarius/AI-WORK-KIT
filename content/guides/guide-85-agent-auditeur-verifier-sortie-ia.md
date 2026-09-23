---
Guide original : Ne crois jamais Claude sans faire ça
Source : https://www.saadiakaram.ai/guides/audit-agent
Position réelle dans la bibliothèque au moment du traitement : 83/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé.
---

# Faire auditer la sortie d'une IA par une seconde IA

*Claude · 5 min de lecture*

Faire auditer la sortie d'un premier agent par un second agent : la parade la plus simple contre des réponses propres en apparence, mais fausses sur le fond.

## Le principe

Une IA peut se montrer convaincante même quand elle a tort. La parade la plus simple consiste à confier à un second agent la seule tâche d'auditer la sortie du premier. Cela ne supprime pas les erreurs, mais en réduit fortement le nombre.

## Le pattern

Un premier agent produit le résultat (rapport, analyse, plan, code). Un second agent audite ce résultat avec une grille fixe. La validation finale revient à l'humain, qui accepte ou renvoie au premier agent avec le rapport d'audit.

## Le prompt à copier

> **Prompt - agent auditeur**
>
> Tu es un auditeur sceptique. Voici une sortie produite par un autre assistant IA :
>
> [colle la sortie complète]
>
> Voici le contexte de la tâche initiale :
> [décris brièvement]
>
> Audite avec cette grille, et ne saute aucun point :
> 1. Faits : chaque affirmation factuelle est-elle vérifiable ? Marque-les EN ROUGE si la source manque.
> 2. Logique : la conclusion suit-elle vraiment des arguments ? Repère les sauts logiques.
> 3. Hypothèses : quelles hypothèses non dites soutiennent la réponse ? Liste-les.
> 4. Risques : qu'est-ce qui pourrait mal tourner si on suit ce conseil tel quel ?
> 5. Manques : qu'est-ce qui devrait être là et n'y est pas ?
>
> Note finale : FIABLE / À RETRAVAILLER / À REJETER, avec 2 lignes de justification.
>
> Pas de « globalement bien ». Tranche.

## Quand l'appliquer

Systématiquement pour : décisions financières, juridiques, médicales, RH. En option pour : brouillons d'e-mails, idées créatives, brainstorm.

## À retenir

Une IA seule a tendance à flatter. Deux IA en désaccord apprennent réellement quelque chose. Faire tourner l'auditeur dans une conversation séparée : dans la même conversation, il devient indulgent.
