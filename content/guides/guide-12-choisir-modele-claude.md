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
- La table de décision : votre tâche, votre modèle
- La méthode pour choisir vous-même
- Le levier que presque personne n'utilise : baisser l'effort
- Ce qui ne change PAS d'un modèle à l'autre
- Votre plan d'action, dès ce soir
- Le fichier complet
- Pour aller plus loin

## Introduction

Quatre familles de modèles cohabitent aujourd'hui chez Claude. La plupart des gens n'en utilisent qu'une seule pour tout, et tombent dans l'une de ces deux erreurs : prendre le plus petit modèle pour une vraie recherche et obtenir un résultat vide, ou prendre le plus gros pour une question de dix secondes et gaspiller des tokens pour rien. Lisez ce guide une fois, gardez la table de décision sous la main, et arrêtez de payer un docteur pour corriger une simple faute d'orthographe. Voici la règle à connaître, la table de décision, des prompts pour tester par vous-même, et un réglage que 90 % des utilisateurs ignorent.

---

## 01. Les quatre familles, en une image

Imaginez les modèles comme des niveaux d'études. Plus vous montez, plus le modèle encaisse une tâche complexe et va loin sans se tromper. Plus vous descendez, plus la réponse est rapide et consomme peu.

- **Haiku (Haiku 4.5) : le collégien.** Rapide, adapté aux gros volumes, tâches simples.
- **Sonnet (Sonnet 5) : le lycéen.** L'équilibre du quotidien : intelligent et rapide à la fois.
- **Opus (Opus 5) : l'étudiant en master.** Raisonnement complexe, code, analyse dense.
- **Fable (Fable 5.1) : le docteur.** Le plus capable, pour le travail agentique long et les applications construites de bout en bout.

---

## 02. La table de décision : votre tâche, votre modèle

Collez-la sur un post-it : c'est à elle seule 80 % de ce guide.

- « Est-ce que ce français est correct ? », « reformule ce message », « résume ce mail » → **Haiku**. Tâche courte et cadrée, réponse immédiate, consommation quasi nulle.
- « C'est quoi cette caméra sur la photo ? », « réponds à ce client », « prépare mon planning de la semaine » → **Sonnet**. Le choix par défaut malin pour le travail quotidien.
- « Aide-moi à faire une vraie recherche sur X », « analyse ce contrat », « construis ce raisonnement financier » → **Opus**. Analyse dense, plusieurs étapes, une erreur coûte cher.
- « Crée-moi une application complète », automatisations et agents qui tournent sur la durée → **Fable**. Travail agentique long : il planifie, agit, et vérifie son propre travail.

**La règle en une phrase :** montez d'un cran quand une erreur vous coûterait cher (en temps ou en conséquences), descendez d'un cran quand la tâche est courte et sans piège particulier.

---

## 03. La méthode pour choisir vous-même

Personne ne peut décider à votre place quel est le bon modèle pour VOS propres tâches. La seule vraie méthode : tester la même tâche sur deux niveaux différents, et comparer les résultats. Lancez d'abord la tâche sur le modèle du bas, relancez exactement la même sur le modèle du dessus, puis comparez. Si la réponse du modèle supérieur est identique, restez sur le modèle inférieur et économisez vos tokens.

**Prompt à copier (se faire recommander un modèle) :**
> Voici une tâche que je veux confier à Claude : [décrivez votre tâche en une phrase]
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
> Demande : [collez votre tâche réelle ici]

*Lancez ce dernier prompt une fois avec Haiku, une fois avec Sonnet. La ligne d'auto-évaluation finale vous indiquera où se situe votre véritable point d'équilibre.*

---

## 04. Le levier que presque personne n'utilise : baisser l'effort

Le vrai secret méconnu : vous pouvez garder un modèle intelligent tout en consommant nettement moins, sans même changer de modèle. Ce réglage s'appelle l'effort. Il détermine combien de tokens Claude dépense pour vous répondre, sur un même modèle donné. Cinq niveaux existent : low, medium, high (le réglage par défaut), xhigh, max.

- **low** : économies importantes, légère baisse de capacité. Idéal pour les tâches simples, vitesse maximale.
- **medium** : bon équilibre, économies modérées. Le réglage adapté au quotidien quand vous voulez un résultat solide sans tout dépenser.
- **high** : le réglage par défaut, pleine capacité. Pour le raisonnement complexe, le code, le travail agentique.
- **xhigh** : capacité étendue. Pour le code et les tâches agentiques longues.
- **max** : capacité maximale. Réservé aux problèmes vraiment à la limite des capacités du modèle.

**Point clé à retenir :** régler l'effort sur high revient exactement à ne toucher à rien. Pour réellement économiser, il faut descendre à medium ou low. Un modèle puissant réglé en effort medium vous donne un jugement de haut niveau, avec un traitement plus rapide et moins de tokens consommés. L'effort agit sur l'ensemble du processus, y compris les appels d'outils : un effort réglé bas génère littéralement moins d'allers-retours. Dans Claude Code, tapez `/effort medium` ; via l'API, ajoutez `output_config: { "effort": "medium" }`. Des tests indépendants rapportent souvent 30 à 50 % de tokens en moins sur des charges de travail mixtes, sans perte de qualité perceptible, à mesurer toutefois sur vos propres tâches avant d'en faire votre réglage par défaut.

---

## 05. Ce qui ne change PAS d'un modèle à l'autre

Beaucoup pensent, à tort, que les petits modèles sont limités en termes de fonctionnalités. Ce n'est pas le cas : les quatre familles ont accès aux mêmes connecteurs et aux mêmes skills, que ce soit dans Chat, Cowork ou Code. Une fois qu'un connecteur est autorisé, Claude s'en sert dans l'ensemble de vos conversations, quel que soit le modèle. Ainsi, Haiku peut interagir avec votre Gmail exactement comme le ferait Opus : chercher un fil de discussion, retrouver un email précis, préparer un brouillon en tenant compte de tout l'historique. Le choix du modèle porte donc uniquement sur le niveau d'intelligence requis selon la difficulté de la tâche, jamais sur l'accès aux fonctionnalités, disponibles partout et pour tous.

---

## 06. Votre plan d'action, dès ce soir

1. Reprenez vos trois dernières demandes faites à Claude et classez chacune dans une ligne de la table de décision.
2. Pour votre prochaine tâche simple (corriger, résumer, reformuler), utilisez Haiku. Ressentez la différence de vitesse.
3. Pour votre prochaine grosse tâche, lancez-la deux fois avec le prompt de comparaison. Trouvez votre propre point d'équilibre.
4. Sur votre modèle habituel, descendez l'effort à medium pendant une journée entière. Observez si la qualité tient : le plus souvent, elle tient parfaitement.

*L'objectif n'est pas de chercher le modèle le plus puissant disponible, mais le plus petit modèle capable de faire le travail correctement. C'est ce réflexe qui vous rend rapide au quotidien, tout en gardant vos tokens pour les moments où vous avez réellement besoin du docteur.*

---

## Le fichier complet

*[Emplacement réservé à votre propre mécanisme d'accès à la fiche complète : lead magnet, formulaire, ou lien selon votre plateforme.]*

---

## Pour aller plus loin

*[Section à adapter selon les autres guides de votre bibliothèque déjà publiés.]*

---

## À retenir

**Ne cherchez pas le modèle le plus puissant. Cherchez le plus petit qui fait le travail.**

Haiku pour le rapide, Sonnet pour le quotidien, Opus pour le dense, Fable pour l'agentique long. Montez d'un cran quand l'erreur coûte cher, descendez d'un cran quand c'est simple, et baissez l'effort à medium pour garder toute l'intelligence du modèle tout en consommant moins.

---

*Sources vérifiées : les modèles Claude (Anthropic) · documentation officielle sur le réglage « Effort ».*
