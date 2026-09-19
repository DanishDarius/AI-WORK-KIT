---
Guide original : La bonne structure pour tes agents IA
Source : https://www.saadiakaram.ai/guides/multi-agent-framework
Position réelle dans la bibliothèque au moment du traitement : 110/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé.
---

# Une architecture en quatre rôles pour organiser ses agents IA

*Multi-outils · 5 min de lecture*

« Système multi-agents » a de quoi impressionner. En réalité, pour une petite structure, il s'agit d'une architecture à quatre rôles qu'une seule personne peut mettre en place. Voici la structure qui fonctionne.

## L'architecture en quatre parties

**L'agent « Récepteur ».** Reçoit la demande (e-mail, message, formulaire), la classe, la route vers le bon spécialiste.

**Les agents « Spécialistes ».** Un agent, un métier. Devis. Support de premier niveau. Recherche. Rédaction. Jamais d'agent généraliste.

**L'agent « Vérificateur ».** Relit ce que produisent les spécialistes avant tout envoi. Bloque les sorties qui sortent du cadre.

**Le superviseur (l'utilisateur).** Consulte le journal d'activité et n'intervient que lorsque le Vérificateur signale un problème.

## Le prompt à copier

> **Prompt — fiche d'un agent Spécialiste**
>
> Tu es l'agent [NOM].
> Périmètre strict : [1 phrase].
> Entrées attendues : [format].
> Sorties attendues : [format].
> Tu n'as PAS le droit de : [3 limites claires].
> En cas de doute, transmets au superviseur avec ce format : « ESCALADE → [raison] → [contexte] ».

## L'erreur qui fait échouer le système

Vouloir un agent qui fait « un peu de tout ». Un agent fourre-tout produit du flou. Un agent au périmètre étroit produit du fiable.

## À retenir

**Commencer avec deux agents, pas sept.**

Récepteur plus un Spécialiste. Une fois que ce duo tourne en autonomie, ajouter le Vérificateur, puis seulement les autres Spécialistes un par un.
