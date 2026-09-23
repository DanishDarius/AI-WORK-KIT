---
Guide original : Claude pour petite boîte en 15 minutes
Source : https://www.saadiakaram.ai/guides/claude-small-business
Position réelle dans la bibliothèque au moment du traitement : 102/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé. Note : ce guide décrit des réglages et fonctionnalités spécifiques d'un produit (plugin, menus, options de confidentialité) susceptibles d'évoluer ou de différer de l'interface actuelle, à vérifier directement dans l'outil au moment de l'usage.
---

# Configurer un assistant IA pour une petite entreprise en quinze minutes

*Claude · 5 min de lecture*

La configuration complète d'un module dédié aux petites entreprises : connecteurs, cinq étapes, premier workflow à lancer, et le réglage de confidentialité que presque tout le monde oublie.

## Le principe

Un module dédié aux petites entreprises peut transformer un assistant conversationnel en assistant opérationnel en quinze minutes chrono. Le piège classique : la plupart des utilisateurs installent le module sans jamais activer les bons connecteurs.

## Les cinq étapes de configuration

Activer le module dans les paramètres de l'application. L'installer depuis la marketplace de plugins. Connecter trois outils maximum au départ : messagerie, agenda, stockage de fichiers, pas plus. Cocher l'option « espace de travail privé » dans les réglages, pour éviter que les données personnelles n'alimentent l'entraînement du modèle. Lancer le premier workflow : « audit hebdomadaire de mon activité ».

## Le prompt à copier

> **Prompt : premier workflow petite entreprise**
>
> Tu es mon directeur opérationnel.
>
> Connecte-toi à ma messagerie, mon agenda et mon stockage de fichiers. Sur les 7 derniers jours :
> - Quels clients/prospects ont pris du retard dans le pipe ?
> - Quelles factures attendent un paiement ?
> - Quels rendez-vous n'ont pas eu de compte-rendu ?
> - Qu'est-ce qui doit absolument bouger cette semaine ?
>
> Sortie : 1 tableau, 1 liste de 3 actions pour lundi matin. Pas d'introduction.

## Le réglage de confidentialité à ne pas oublier

Dans les réglages de confidentialité, désactiver l'option qui permet d'utiliser les données personnelles pour améliorer le modèle. Sans cette précaution, le chiffre d'affaires, les e-mails clients et les contrats peuvent nourrir les versions suivantes du modèle.

## À retenir

Trois connecteurs valent mieux que douze. Plus le nombre d'outils connectés augmente, plus l'assistant se disperse. Commencer avec les trois outils de base, et n'ajouter un quatrième que lorsque les trois premiers tournent déjà tout seuls.
