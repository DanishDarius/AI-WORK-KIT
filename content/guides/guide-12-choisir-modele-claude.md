---
Guide original : "Fable, Opus, Sonnet, Haiku : quel modèle Claude pour quelle tâche"
Source : saadiakaram.ai/guides/quel-modele-claude-pour-quelle-tache
Statut : reformulé (texte). Aucun visuel/tableau HTML détecté sur cette page
---

# Haiku, Sonnet, Opus, Fable : bien choisir son modèle Claude selon la tâche

*Claude · 6 min de lecture*

## Sommaire

- Introduction
- Les quatre familles, en une image
- La table de décision : ta tâche, ton modèle
- La méthode pour choisir toi-même
- Le levier que presque personne n'utilise : baisser l'effort
- Ce qui ne change PAS d'un modèle à l'autre
- Ton plan d'action, dès ce soir
- Le fichier complet
- Pour aller plus loin

## Introduction

Quatre familles de modèles cohabitent aujourd'hui chez Claude. La plupart des gens n'en utilisent qu'une seule pour tout, et tombent dans l'une de ces deux erreurs : prendre le plus petit modèle pour une vraie recherche et obtenir un résultat vide, ou prendre le plus gros pour une question de dix secondes et gaspiller des tokens pour rien. Lis ce guide une fois, garde la table de décision sous la main, et arrête de payer un docteur pour corriger une simple faute d'orthographe. Voici la règle à connaître, la table de décision, des prompts pour tester par toi-même, et un réglage que 90 % des utilisateurs ignorent.

---

## 01. Les quatre familles, en une image

Imagine les modèles comme des niveaux d'études. Plus tu montes, plus le modèle encaisse une tâche complexe et va loin sans se tromper. Plus tu descends, plus la réponse est rapide et consomme peu.

- **Haiku (Haiku 4.5) : le collégien.** Rapide, adapté aux gros volumes, tâches simples.
- **Sonnet (Sonnet 5) : le lycéen.** L'équilibre du quotidien : intelligent et rapide à la fois.
- **Opus (Opus 5) : l'étudiant en master.** Raisonnement complexe, code, analyse dense.
- **Fable (Fable 5.1) : le docteur.** Le plus capable, pour le travail agentique long et les applications construites de bout en bout.

---

## 02. La table de décision : ta tâche, ton modèle

Colle-la sur un post-it : c'est à elle seule 80 % de ce guide.

- « Est-ce que ce français est correct ? », « reformule ce message », « résume ce mail » → **Haiku**. Tâche courte et cadrée, réponse immédiate, consommation quasi nulle.
- « C'est quoi cette caméra sur la photo ? », « réponds à ce client », « prépare mon planning de la semaine » → **Sonnet**. Le choix par défaut malin pour le travail quotidien.
- « Aide-moi à faire une vraie recherche sur X », « analyse ce contrat », « construis ce raisonnement financier » → **Opus**. Analyse dense, plusieurs étapes, une erreur coûte cher.
- « Crée-moi une application complète », automatisations et agents qui tournent sur la durée → **Fable**. Travail agentique long : il planifie, agit, et vérifie son propre travail.

**La règle en une phrase :** monte d'un cran quand une erreur te coûterait cher (en temps ou en conséquences), descends d'un cran quand la tâche est courte et sans piège particulier.

---

## 03. La méthode pour choisir toi-même

Personne ne peut décider à ta place quel est le bon modèle pour TES propres tâches. La seule vraie méthode : tester la même tâche sur deux niveaux différents, et comparer les résultats. Lance d'abord la tâche sur le modèle du bas, relance exactement la même sur le modèle du dessus, puis compare. Si la réponse du modèle supérieur est identique, reste sur le modèle inférieur et économise tes tokens.

**Prompt à copier (se faire recommander un modèle) :**
> Voici une tâche que je veux confier à Claude : [décris ta tâche en une phrase]
>
> Classe-la sur cette échelle et dis-moi le modèle à utiliser :
> - Haiku : vérification, reformulation, résumé court
> - Sonnet : question du quotidien, réponse équilibrée
> - Opus : recherche, analyse multi-étapes, code
> - Fable : app complète, agent qui tourne longtemps
>
> Donne-moi le modèle recommandé et une phrase pour justifier.

**Prompt à copier (comparer deux modèles sur la même tâche) :**
> Traite la demande ci-dessous. À la fin, ajoute une ligne : "Cette tâche justifiait-elle un modèle plus puissant ? oui / non, et pourquoi."
>
> Demande : [colle ta tâche réelle ici]

*Lance ce dernier prompt une fois avec Haiku, une fois avec Sonnet. La ligne d'auto-évaluation finale t'indiquera où se situe ton véritable point d'équilibre.*

---

## 04. Le levier que presque personne n'utilise : baisser l'effort

Le vrai secret méconnu : tu peux garder un modèle intelligent tout en consommant nettement moins, sans même changer de modèle. Ce réglage s'appelle l'effort. Il détermine combien de tokens Claude dépense pour te répondre, sur un même modèle donné. Cinq niveaux existent : low, medium, high (le réglage par défaut), xhigh, max.

- **low** : économies importantes, légère baisse de capacité. Idéal pour les tâches simples, vitesse maximale.
- **medium** : bon équilibre, économies modérées. Le réglage adapté au quotidien quand tu veux un résultat solide sans tout dépenser.
- **high** : le réglage par défaut, pleine capacité. Pour le raisonnement complexe, le code, le travail agentique.
- **xhigh** : capacité étendue. Pour le code et les tâches agentiques longues.
- **max** : capacité maximale. Réservé aux problèmes vraiment à la limite des capacités du modèle.

**Point clé à retenir :** régler l'effort sur high revient exactement à ne toucher à rien. Pour réellement économiser, il faut descendre à medium ou low. Un modèle puissant réglé en effort medium te donne un jugement de haut niveau, avec un traitement plus rapide et moins de tokens consommés. L'effort agit sur l'ensemble du processus, y compris les appels d'outils : un effort réglé bas génère littéralement moins d'allers-retours. Dans Claude Code, tape `/effort medium` ; via l'API, ajoute `output_config: { "effort": "medium" }`. Des tests indépendants rapportent souvent 30 à 50 % de tokens en moins sur des charges de travail mixtes, sans perte de qualité perceptible, à mesurer toutefois sur tes propres tâches avant d'en faire ton réglage par défaut.

---

## 05. Ce qui ne change PAS d'un modèle à l'autre

Beaucoup pensent, à tort, que les petits modèles sont limités en termes de fonctionnalités. Ce n'est pas le cas : les quatre familles ont accès aux mêmes connecteurs et aux mêmes skills, que ce soit dans Chat, Cowork ou Code. Une fois qu'un connecteur est autorisé, Claude s'en sert dans l'ensemble de tes conversations, quel que soit le modèle. Ainsi, Haiku peut interagir avec ton Gmail exactement comme le ferait Opus : chercher un fil de discussion, retrouver un email précis, préparer un brouillon en tenant compte de tout l'historique. Le choix du modèle porte donc uniquement sur le niveau d'intelligence requis selon la difficulté de la tâche, jamais sur l'accès aux fonctionnalités, disponibles partout et pour tous.

---

## 06. Ton plan d'action, dès ce soir

1. Reprends tes trois dernières demandes faites à Claude et classe chacune dans une ligne de la table de décision.
2. Pour ta prochaine tâche simple (corriger, résumer, reformuler), utilise Haiku. Ressens la différence de vitesse.
3. Pour ta prochaine grosse tâche, lance-la deux fois avec le prompt de comparaison. Trouve ton propre point d'équilibre.
4. Sur ton modèle habituel, descends l'effort à medium pendant une journée entière. Observe si la qualité tient : le plus souvent, elle tient parfaitement.

*L'objectif n'est pas de chercher le modèle le plus puissant disponible, mais le plus petit modèle capable de faire le travail correctement. C'est ce réflexe qui te rend rapide au quotidien, tout en gardant tes tokens pour les moments où tu as réellement besoin du docteur.*

---

## Le fichier complet

*[Emplacement réservé à ton propre mécanisme d'accès à la fiche complète : lead magnet, formulaire, ou lien selon ta plateforme.]*

---

## Pour aller plus loin

*[Section à adapter selon les autres guides de ta bibliothèque déjà publiés.]*

---

## À retenir

**Ne cherche pas le modèle le plus puissant. Cherche le plus petit qui fait le travail.**

Haiku pour le rapide, Sonnet pour le quotidien, Opus pour le dense, Fable pour l'agentique long. Monte d'un cran quand l'erreur coûte cher, descends d'un cran quand c'est simple, et baisse l'effort à medium pour garder toute l'intelligence du modèle tout en consommant moins.

---

*Sources vérifiées : les modèles Claude (Anthropic) · documentation officielle sur le réglage « Effort ».*
