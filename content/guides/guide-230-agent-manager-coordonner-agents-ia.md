# Structurer un agent-manager pour coordonner plusieurs agents IA

*Multi-outils · 5 min de lecture*

Dès que trois agents IA ou plus tournent simultanément, il devient impossible de les piloter manuellement un par un. La solution consiste à mettre en place un agent-manager : un rôle de coordination qui répartit le travail, vérifie les sorties et fait remonter ce qui pose problème.

## Le rôle du manager

Il n'exécute rien lui-même. Il distribue les tâches, vérifie les résultats, escalade ce qui doit l'être : l'équivalent d'un chef de projet IA.

## Les trois fonctions clés en pratique

1. **Routage** : selon la nature de la demande, il détermine quel agent doit la traiter (un email va vers l'agent dédié aux mails, un lead vers l'agent CRM, etc.).
2. **Contrôle qualité** : il relit la sortie produite par l'agent et indique si elle est prête à être envoyée ou si elle doit repartir en révision.
3. **Reporting**. Chaque semaine, il produit un rapport : nombre de tâches traitées, répartition par agent, taux d'erreur, points de friction rencontrés.

## Le prompt de mise en place

> **Prompt : agent-manager**
>
> Tu es mon agent-manager. Tu coordonnes 4 agents : [liste + rôles].
>
> Quand je te passe une demande :
> 1. Identifie quel agent doit la traiter
> 2. Reformule la demande pour cet agent
> 3. Récupère sa sortie
> 4. Vérifie : est-ce que ça répond à 100% ? Si non, renvoie en révision.
> 5. Me livre le résultat final + 1 ligne « pourquoi cet agent ».
>
> Chaque vendredi 17h : rapport hebdo.

## À retenir

**Sans manager, les agents multiples tournent au chaos.**

Deux agents restent pilotables à la main. Cinq agents sans coordination génèrent du désordre. Mettre en place un agent-manager est l'investissement qui permet de passer à l'échelle sans perdre le contrôle.
