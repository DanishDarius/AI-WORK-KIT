---
Guide original : "Connecte Claude à TradingView et fais-en ton bot de trading personnalisé"
Source : saadiakaram.ai/guides/brancher-ton-ia-sur-tes-donnees
Statut : reformulé (texte). Aucun visuel/tableau HTML détecté sur cette page
Note importante : contenu à caractère éducatif sur un outil d'analyse technique, explicitement PAS un conseil financier dans l'original. Cette précision est conservée intégralement dans la version reformulée, y compris tous les garde-fous (lecture seule, confirmation humaine, aucun ordre automatique)
---

# Connecter Claude à TradingView : construisez votre propre assistant d'analyse technique

*Claude · 9 min de lecture*

## Sommaire

- Introduction
- Ce que vous allez obtenir
- Ce dont vous avez besoin
- 1. Préparez TradingView Desktop
- 2. Installez le pont MCP, en sécurité
- 3. Connectez le pont à Claude Code
- 4. Vérifiez la connexion sans toucher au graphique
- 5. Définissez votre stratégie avant de scanner
- Faites-en votre assistant d'analyse personnalisé
- Les 5 prompts (les outils de votre assistant)
- Checklist avant de vous y fier
- Le fichier complet
- Pour aller plus loin

## Introduction

Le workflow complet : connecter TradingView à Claude via un pont MCP, puis encoder VOTRE stratégie une seule fois pour en faire un véritable assistant personnalisé qui scanne, classe et prépare vos alertes. Le cœur du système, plus 5 prompts prêts à l'emploi. **Contenu éducatif, et non un conseil financier : la décision finale reste entièrement la vôtre.**

---

## 01. Comprendre : ce que vous allez obtenir

Vous connectez TradingView Desktop à Claude Code via un pont MCP, vous vérifiez la connexion, et vous transformez Claude en assistant d'analyse personnalisé : il inspecte vos graphiques, repère les supports et résistances, scanne votre watchlist, classe vos setups potentiels et prépare vos alertes, selon VOS propres règles, de façon identique à chaque fois. La connexion prend environ 15 minutes. Cet assistant, c'est votre stratégie encodée une bonne fois pour toutes.

*Un point de cadrage essentiel : cet outil n'est pas un bouton magique qui trade seul à votre place et vous rend riche. C'est votre analyste personnel, connecté à vos données en direct, qui applique votre grille d'analyse sans jamais se fatiguer. Claude analyse et prépare ; la décision, et le passage d'ordre, restent entièrement de votre ressort. Ce guide est purement éducatif, ce n'est en aucun cas un conseil financier.*

*Sources techniques : le Model Context Protocol (standard ouvert d'Anthropic, novembre 2024) et une méthode de connexion inspirée d'une ressource gratuite de Miles Deutscher.*

---

## 02. Ce dont vous avez besoin

- L'application TradingView Desktop.
- Claude Code installé et fonctionnel.
- Un pont MCP qui prend explicitement en charge TradingView.
- Les instructions d'installation ou la configuration de ce pont.
- Un graphique et une watchlist TradingView pour effectuer vos tests.

*Pour le pont, réunissez si possible : son nom exact (package ou application), la méthode d'installation, la commande de lancement, les arguments requis, les variables d'environnement (tokens, chemins, ports), et les outils qu'il prend en charge (lecture de graphique, tracés, watchlists, alertes).*

---

## 03. Préparez TradingView Desktop

1. Connectez-vous à votre compte TradingView.
2. Ouvrez un graphique de test.
3. Choisissez le symbole et le timeframe voulus.
4. Chargez la watchlist que Claude devra inspecter.
5. Laissez TradingView ouvert pendant que vous configurez le pont.

*L'application desktop est indispensable : le pont MCP a besoin d'un environnement TradingView local avec lequel communiquer directement.*

---

## 04. Installez le pont MCP, en toute sécurité

Suivez scrupuleusement les instructions du pont TradingView que vous avez choisi. Ne substituez jamais les commandes d'un pont par celles d'un autre : les noms de package, les commandes, les permissions et les formats de configuration varient d'un outil à l'autre. Pour vous faire guider directement par Claude, collez ce prompt :

**Prompt à copier (installation guidée du pont) :**
> Je veux connecter TradingView Desktop à Claude Code via un pont MCP.
>
> Ne devine pas les noms de package, commandes, chemins de fichiers, clés de configuration ni capacités.
>
> D'abord, demande-moi :
> 1. Mon système d'exploitation.
> 2. Le nom exact du pont MCP TradingView.
> 3. Le texte des instructions / de la documentation d'installation du pont.
> 4. La commande de lancement requise, ses arguments et ses variables d'environnement.
> 5. Si TradingView Desktop et Claude Code sont déjà installés.
>
> Après que je fournis ces détails :
> 1. Vérifie les prérequis manquants dans les instructions.
> 2. Donne-moi un plan d'installation ordonné.
> 3. Montre une commande à la fois et explique ce qu'elle fait.
> 4. Demande confirmation avant toute commande qui installe un logiciel, change la configuration, ou utilise des identifiants.
> 5. Aide-moi à ajouter le serveur MCP à Claude Code avec les valeurs exactes des instructions.
> 6. Fournis un test de connexion qui ne modifie pas un graphique ni ne passe d'ordre.
> 7. En cas d'erreur, diagnostique-la depuis le vrai message d'erreur plutôt que de deviner.
>
> N'expose ni ne répète jamais une valeur secrète. Réfère-toi à elles par le nom de variable seulement.

*Pendant l'installation, vérifiez que : le pont démarre sans erreur ; TradingView Desktop est ouvert ; le pont accède à l'interface locale dont il a besoin ; les identifiants/variables requis sont présents ; aucun secret n'est collé dans un prompt ni commité par mégarde.*

---

## 05. Connectez le pont à Claude Code

Ajoutez le pont comme serveur MCP dans Claude Code, avec la commande, les arguments et les variables requises. Commencez par remplir cette fiche neutre :

**Prompt à copier (fiche de configuration) :**
> Nom du serveur MCP :
> Commande de lancement :
> Arguments :
> Répertoire de travail, si requis :
> Noms des variables d'environnement :
> Message de connexion attendu :
> Prérequis TradingView :

Faites ensuite valider cette configuration par Claude avant de l'appliquer :

**Prompt à copier (valider la configuration) :**
> Vérifie cette configuration de serveur MCP proposée pour mon pont TradingView.
>
> Contrôle que la commande, les arguments, les chemins et les noms de variables d'environnement correspondent aux instructions d'installation que je fournis. N'invente aucune valeur manquante. Signale tout ce qui est incomplet ou incohérent avant de suggérer de la sauvegarder ou de la lancer.
>
> Instructions du pont : [COLLEZ LES INSTRUCTIONS DU PONT]
> Configuration proposée : [COLLEZ VOTRE CONFIGURATION]

---

## 06. Vérifiez la connexion sans toucher au graphique

Commencez par un contrôle de capacités en lecture seule :

**Prompt à copier, lister les outils (lecture seule) :**
> Liste les outils MCP actuellement disponibles pour TradingView.
>
> Pour chaque outil, dis-moi :
> 1. Son nom exact.
> 2. Quelles informations il peut lire.
> 3. Ce qu'il peut modifier.
> 4. S'il peut inspecter les watchlists.
> 5. S'il peut créer des tracés ou des alertes.
>
> Ne modifie pas mon graphique, ne crée aucune alerte, n'exécute aucune action de trading.

Puis testez l'accès au graphique actuellement ouvert :

**Prompt à copier, inspecter le graphique (lecture seule) :**
> À l'aide des outils TradingView connectés, inspecte le graphique actuellement ouvert.
>
> Ne rapporte que les informations que les outils peuvent vérifier : le symbole, le timeframe et le contexte de prix visible. Si un élément est indisponible, dis-le. N'infère ni ne fabrique aucune donnée de graphique, et ne modifie pas le graphique.

---

## 07. Définissez votre stratégie avant de scanner

Un scan n'a de valeur que si vos critères sont explicitement définis. Remplissez ce gabarit une seule fois : c'est le cœur de votre assistant personnalisé.

**Gabarit à copier (votre stratégie) :**
> Nom du setup :
> Marchés autorisés :
> Timeframes préférés :
> Condition de tendance :
> Condition d'entrée :
> Règle de support / résistance :
> Condition de volume, si applicable :
> Condition d'invalidation :
> Ratio risque / rendement minimum :
> Conditions qui disqualifient un setup :
> Nombre maximum de résultats :

---

## 08. Faites-en votre assistant d'analyse personnalisé

C'est le cœur de la promesse de ce guide. L'idée n'est pas de reposer vos règles à chaque session : vous voulez un assistant qui les connaît déjà par cœur. Encodez votre stratégie une seule fois, et Claude devient votre analyste personnalisé connecté à TradingView, identique à chaque session.

1. Créez un Projet Claude dédié (ou un fichier d'instructions réutilisable) : « Mon assistant TradingView ».
2. Collez-y les instructions ci-dessous, avec votre stratégie de l'étape 7 à l'emplacement prévu.
3. Ensuite, à chaque session : dites simplement « lance le scan du jour ». L'assistant applique votre grille, sort votre liste classée, marque les niveaux (après votre confirmation) et prépare vos alertes.

**Prompt à copier, les instructions de votre assistant (Projet Claude) :**
> Tu es mon assistant d'analyse personnalisé, branché sur TradingView via le pont MCP. Tu n'es pas un conseiller : tu es un analyste qui applique MA stratégie, à l'identique, à chaque fois. Tu gardes toujours ces règles.
>
> MA STRATÉGIE : [COLLEZ ICI VOTRE GABARIT DE L'ÉTAPE 7, COMPLÉTÉ]
>
> CE QUE TU FAIS, DANS L'ORDRE, QUAND JE DIS "lance le scan du jour" :
> 1. Scanne ma watchlist accessible et évalue chaque symbole contre MA stratégie.
> 2. Rends un tableau classé (symbole, timeframe, statut : prêt / en formation / invalide, niveaux clés, déclencheur, condition d'invalidation, raison d'éviter).
> 3. Sélectionne au maximum le nombre de setups que ma stratégie autorise, les plus solides.
> 4. Pour chacun : le niveau clé, la condition exacte qui le rend actionnable, la condition qui l'invalide, et s'il est prêt ou à surveiller.
> 5. Propose les niveaux à marquer, en APERÇU d'abord ; ne modifie le graphique qu'après ma confirmation. Prépare les alertes en APERÇU ; ne crée rien sans ma confirmation.
>
> RÈGLES ABSOLUES :
> - Lecture seule par défaut. Aucune modification de graphique, aucune alerte, aucun ordre sans ma confirmation explicite.
> - N'utilise QUE des données de graphique vérifiées par les outils. N'invente jamais un prix. Si une donnée est indisponible, dis "non disponible".
> - Chaque setup inclut sa condition d'invalidation. Un setup sans invalidation n'est pas montré.
> - Sépare toujours l'observation vérifiée de l'interprétation.
> - Tu ne passes jamais d'ordre toi-même. Tu prépares, je décide.
>
> Confirme que tu as bien chargé ma stratégie, puis attends que je dise "lance le scan du jour".

*Honnêteté sur l'exécution : cet assistant analyse, classe et prépare vos alertes. Le passage d'ordre réel se fait chez votre courtier et reste entièrement sous votre validation. Pour de l'automatisation de bout en bout, cela se met en place via une alerte TradingView vers un webhook de votre courtier, que VOUS configurez et dont VOUS assumez seul(e) la responsabilité. Claude n'engage jamais votre argent de sa propre initiative.*

---

## 09. Les 5 prompts (les outils de votre assistant)

**Prompt 1. Support et résistance :**
> Analyse le graphique actuellement ouvert dans TradingView et identifie les zones de support et de résistance les plus pertinentes visibles sur le timeframe sélectionné.
>
> Pour chaque zone, donne :
> 1. Le prix ou la zone de prix.
> 2. S'il s'agit d'un support, d'une résistance, ou d'une zone de rôle inversé possible.
> 3. La preuve visible qui la justifie.
> 4. Combien de réactions nettes sont visibles, si l'outil peut le vérifier.
> 5. Quel comportement de prix invaliderait le niveau.
>
> Priorise un petit nombre de zones significatives plutôt que de lister chaque niveau mineur. Utilise uniquement les données de graphique disponibles via les outils connectés. N'invente aucune valeur et ne passe aucun ordre.

**Prompt 2. Scanner la watchlist active :**
> Scanne chaque symbole de ma watchlist TradingView active auquel les outils connectés ont accès.
>
> Évalue chaque symbole avec cette définition de setup : [COLLEZ VOTRE GABARIT DE STRATÉGIE COMPLÉTÉ]
>
> Rends un tableau classé avec : 1. Symbole. 2. Timeframe. 3. Statut du setup : prêt, en formation, ou invalide. 4. Support et résistance pertinents. 5. Déclencheur potentiel. 6. Condition d'invalidation. 7. Raison importante d'éviter le trade.
>
> Ne classe que les symboles appuyés par des données de graphique vérifiées. Si le pont ne peut pas inspecter toute la watchlist, indique quels symboles ont été vérifiés et lesquels non.

**Prompt 3. Liste ciblée du jour (5 maximum) :**
> Passe en revue les symboles accessibles de ma watchlist TradingView et sélectionne au maximum cinq setups qui méritent attention.
>
> Mes critères de trading sont : [COLLEZ VOS CRITÈRES]
>
> Pour chaque setup sélectionné, donne : 1. Pourquoi il qualifie. 2. Le niveau ou la zone clé. 3. La condition exacte qui le rendrait actionnable. 4. La condition qui l'invaliderait. 5. S'il est prêt maintenant ou doit rester en surveillance.
>
> Sépare les observations de graphique vérifiées de l'interprétation. Ne décris pas un setup comme prêt tant que toutes mes conditions ne sont pas présentes.

**Prompt 4. Marquer les niveaux (avec confirmation) :**
> Inspecte le graphique TradingView actuel et propose les supports et résistances les plus importants à marquer.
>
> D'abord, rends un aperçu contenant chaque prix proposé, son libellé et sa raison. Ne modifie pas encore le graphique.
>
> Si les outils MCP connectés supportent les tracés, demande ma confirmation avant d'ajouter quoi que ce soit. Après confirmation, ajoute uniquement les niveaux approuvés. Si les tracés ne sont pas supportés, donne-moi une liste concise que je peux saisir manuellement.

**Prompt 5. Préparer une alerte :**
> Aide-moi à préparer une alerte TradingView pour ce setup :
>
> Symbole : [SYMBOLE]
> Timeframe : [TIMEFRAME]
> Condition de déclenchement : [CONDITION]
> Condition d'invalidation : [CONDITION]
> Message d'alerte : [MESSAGE]
>
> D'abord, vérifie si les outils MCP connectés peuvent créer ou modifier des alertes TradingView. N'affirme pas qu'une alerte existe tant que l'outil ne l'a pas confirmé.
>
> Si la création d'alerte est supportée, montre-moi l'alerte complète proposée et demande confirmation avant de la créer. Sinon, donne-moi les champs et valeurs exacts à saisir manuellement dans TradingView.

*Pour recevoir vos alertes directement sur votre téléphone, configurez votre compte TradingView et vos notifications mobiles en conséquence. Le pont MCP n'aide à créer une alerte que si cette capacité est explicitement prise en charge.*

---

## Checklist avant de vous y fier

- [ ] TradingView Desktop est en cours d'exécution.
- [ ] Le pont MCP est bien connecté à Claude Code.
- [ ] Claude identifie correctement le graphique ouvert sans inventer de données.
- [ ] Vos critères de setup sont écrits explicitement (les instructions de votre assistant).
- [ ] Les scans indiquent clairement quels symboles ont réellement été inspectés.
- [ ] Toute modification du graphique passe systématiquement par votre confirmation.
- [ ] Les alertes sont confirmées directement dans TradingView.
- [ ] Chaque setup proposé inclut une condition d'invalidation claire.
- [ ] Vous relisez vous-même l'analyse avant toute décision de trading.

---

## Le fichier complet

*[Emplacement réservé à votre propre mécanisme d'accès au workflow complet : lead magnet, formulaire, ou lien selon votre plateforme.]*

---

## Pour aller plus loin

*[Section à adapter selon les autres guides de votre bibliothèque déjà publiés.]*

---

## À retenir

**Un assistant d'analyse, c'est votre stratégie encodée. Pas un pilote automatique qui décide à votre place.**

Encodez vos règles une seule fois, lancez le scan quand vous le souhaitez, gardez la décision et le passage d'ordre entièrement pour vous. Lecture seule par défaut, confirmation avant toute action, une condition d'invalidation sur chaque setup proposé. C'est ça, un véritable assistant personnalisé, pas un mirage de trading automatique.

---

*Ce guide est purement éducatif et ne constitue en aucun cas un conseil en investissement. Vérifiez toujours les informations financières auprès de sources fiables et, si besoin, d'un conseiller agréé avant toute décision.*
