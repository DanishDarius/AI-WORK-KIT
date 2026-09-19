---
Guide original : Le check à faire avant tout connecteur IA
Source : https://www.saadiakaram.ai/guides/ai-onboarding-check-before-bank-access
Position réelle dans la bibliothèque au moment du traitement : 67/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé.
---

# Le contrôle à faire avant de connecter une IA à un compte sensible

*Multi-outils · 5 min de lecture*

Avant de brancher une IA à un compte sensible, un contrôle s'impose. Le prompt exact et la checklist pour éviter les grosses erreurs.

## Pourquoi ce contrôle

Avant de connecter une IA à une boîte mail, un agenda, ou pire un compte bancaire, ce contrôle limite les dégâts en cas de problème et permet de savoir exactement ce que l'agent peut faire au nom de son propriétaire.

## La checklist en six points

**Permissions :** lecture seule par défaut. Écriture uniquement si vraiment indispensable.

**Périmètre :** limiter à un compte, un dossier ou un projet précis. Jamais « tout ».

**Journaux :** vérifier où l'agent stocke ses actions. Si ces journaux ne sont pas consultables, refuser la connexion.

**Révocation :** savoir précisément où couper l'accès en un clic.

**Garde-fou de montant :** pour un compte bancaire, fixer un plafond par opération.

**Test isolé :** faire tourner le connecteur 48 heures sur un compte secondaire avant de le brancher sur le compte réel.

## Le prompt à copier

> **Prompt — audit du connecteur**
>
> Je m'apprête à connecter l'outil [nom] à mon compte [type de compte].
>
> Voici ce que l'outil dit faire : [colle la doc ou la description]
> Voici les permissions qu'il demande : [colle la liste exacte]
>
> Fais ceci :
> 1. Pour chaque permission, traduis-la en français clair : qu'est-ce que ça donne comme pouvoir concret ?
> 2. Marque chaque permission : NÉCESSAIRE / DOUTEUSE / À REFUSER.
> 3. Donne-moi 3 scénarios concrets de ce qui peut mal tourner avec ces accès.
> 4. Propose 5 garde-fous à mettre en place AVANT d'activer.
> 5. Donne-moi la procédure exacte de révocation en cas de problème.

## La règle d'or

Si un connecteur ne permet pas de révoquer l'accès en un clic depuis le compte, il ne doit pas être branché.

## À retenir

Le bon réflexe n'est pas « ça va aller », c'est « qu'est-ce qui se passe si ça ne va pas ? ». Refaire ce contrôle à chaque nouvel outil : cinq minutes suffisent pour éviter des semaines de galère.
