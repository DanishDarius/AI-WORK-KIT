---
Guide original : L'IA n'a pas « un » niveau. Elle en a cinq.
Source : https://www.saadiakaram.ai/guides/5-niveaux-ia
Position réelle dans la bibliothèque au moment du traitement : 172/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé. Guide très long (5 niveaux, 5 prompts complets). Un « tableau » mentionné dans le niveau 4 fait partie du texte d'un prompt (instruction demandant à l'IA de produire un tableau), ce n'est pas un élément HTML `<table>` sur la page. Aucune recréation Markdown nécessaire. Noms réels conservés comme faits (ChatGPT, Claude, Gemini, Mistral, LangGraph, CrewAI, OpenAI Swarm, n8n, Zapier, OpenAI, Anthropic, Google DeepMind, xAI, Peter Thiel). Les champs à remplir dans le prompt du niveau 5 (revenus, épargne, capital) sont des emplacements vides destinés à être complétés par le lecteur. Aucune donnée financière personnelle n'est présente dans le guide lui-même.
---

# Les cinq niveaux de l'IA : des grands modèles de langage à la superintelligence

*Multi-outils · 12 min de lecture*

La grande majorité des utilisateurs ne connaît que le premier de ces cinq niveaux. Voici une carte complète, des LLM à la superintelligence, pour décider où investir son énergie ce trimestre.

## Pourquoi cette carte compte

Ces cinq niveaux ne relèvent pas de la culture générale à ressortir en soirée : ils forment une carte pour décider où mettre son énergie. La plupart des gens s'entraînent encore au niveau 1 (poser des questions à un assistant conversationnel) pendant que la vraie valeur bascule vers les niveaux 2 et 3 : déléguer des objectifs, orchestrer des agents. Résultat : ils développent une compétence qui vaudra moins dans dix-huit mois.

Ce guide donne, pour chaque niveau, une définition claire, l'état réel du marché en 2026, ce que cela change concrètement, et surtout un prompt long et opérationnel par palier. Inutile de maîtriser les cinq : il s'agit de savoir lequel jouer, et de le jouer sérieusement.

## Niveau 1 : Les grands modèles de langage (LLM)

ChatGPT, Claude, Gemini, Mistral : on tape une question, l'assistant répond. C'est le rez-de-chaussée : puissant pour qui sait bien formuler ses demandes, décevant sinon. La grande majorité des utilisateurs restent à ce niveau, et une large part d'entre eux utilisent l'assistant comme une meilleure version d'un moteur de recherche. C'est un usage en dessous du potentiel réel de l'outil.

État du marché : ce niveau est banalisé. Un assistant conversationnel correct coûte moins de 20 € par mois, et chaque grand modèle sait désormais raisonner, lire un PDF, générer une image ou du code. Ce que cela change concrètement : bien formuler ses demandes est devenu une compétence de base, comparable à savoir écrire un e-mail professionnel il y a vingt ans. Ne pas la maîtriser en 2026 revient à travailler dix fois plus pour le même résultat. L'action à mener maintenant : passer en revue ses vingt derniers échanges et réécrire les cinq moins bons en version professionnelle (rôle, contexte, contraintes, format, exemples). Une heure de travail, un bénéfice durable.

> **Prompt (Niveau 1) : maîtriser ses prompts**
>
> Tu es un coach senior en ingénierie de prompt. J'ai collé ci-dessous 10 à 20 de mes derniers prompts (bruts, tels que je les tape au quotidien).
>
> MES PROMPTS :
> """
> [collez ici vos prompts]
> """
>
> TON TRAVAIL :
> 1. Note chaque prompt sur 10 (clarté du rôle, contexte donné, contraintes, format attendu, exemples). Sois honnête, pas gentille.
> 2. Identifie mes 5 patterns les plus pauvres (ex : je ne donne jamais de format, je confonds contexte et question, je demande « sois créatif » sans dire quoi).
> 3. Pour chacun de ces 5 patterns, réécris UN de mes prompts en version pro. Structure attendue à chaque fois :
> - Rôle assigné à l'IA
> - Contexte (qui je suis, pour qui, quel enjeu)
> - Tâche précise
> - Contraintes (longueur, ton, ce qu'il ne faut PAS faire)
> - Format de sortie (avec exemple)
> - 1 exemple de sortie idéale si utile
> 4. Termine par mes 3 règles personnelles à afficher au-dessus de mon écran pour ne plus jamais retomber dans mes patterns pauvres.
>
> Ne me flatte pas. Je veux progresser, pas être rassurée.

## Niveau 2 : L'IA agentique

On ne pose plus une question, on confie un objectif. Pas « écris-moi un e-mail » mais « traite ma boîte mail : réponds à ce qui est simple, escalade le reste, résume-moi le tout en fin de journée ». L'IA enchaîne des étapes, utilise des outils (messagerie, calendrier, navigateur, base de données), et décide. On donne des mains au cerveau.

État du marché : c'est le point où en est le marché en 2026. Les principaux assistants ont tous leur mode agent, les protocoles de connexion aux outils se multiplient, les entreprises déploient. Ce que cela change concrètement : c'est le premier niveau qui devient visible sur le temps disponible (plusieurs heures par semaine récupérées) et sur les résultats. L'action à mener maintenant : choisir UNE tâche récurrente qui prend plus de trois heures par semaine, la transformer en brief d'agent, et la laisser tourner un mois avant d'en ajouter une deuxième.

> **Prompt (Niveau 2) : confier un objectif**
>
> Tu es architecte d'agents IA. Aide-moi à transformer une tâche récurrente en agent autonome que je peux confier à un assistant en mode agent (ou à un outil d'automatisation combiné à un LLM).
>
> MA TÂCHE À DÉLÉGUER :
> - Ce que je fais aujourd'hui : [décrivez précisément, étape par étape]
> - Fréquence : [x fois par semaine]
> - Temps que ça me prend : [x h]
> - Ce qui rate quand c'est mal fait : [décrivez]
>
> CONSTRUIS-MOI :
> 1. L'OBJECTIF (une phrase, mesurable, pas « aide-moi à… »)
> 2. LES OUTILS AUTORISÉS (mail, calendrier, web, fichier X, base Y, liste précise)
> 3. LES GARDE-FOUS (ce que l'agent NE DOIT JAMAIS faire seul : envoyer à un client sans validation, dépenser > X€, toucher au CRM sur les gros comptes…)
> 4. LE CRITÈRE DE SUCCÈS (comment je sais que c'est bien fait : 3 conditions concrètes)
> 5. LE FORMAT DE RENDU (à quoi ressemble la sortie que je reçois chaque jour / semaine)
> 6. LE PROTOCOLE D'ESCALADE (dans quels 3-4 cas exacts l'agent doit s'arrêter et me demander)
> 7. LE PROMPT SYSTÈME COMPLET à coller dans mon agent, prêt à l'emploi
> 8. LES 5 CAS DE TEST à lui faire passer avant de le laisser tourner sans supervision
>
> Sois exigeant. Un agent flou = un agent qui me crée du travail au lieu d'en enlever.

## Niveau 3 : Les systèmes multi-agents

Non plus un agent, mais une équipe. Un chercheur creuse, un rédacteur écrit, un vérificateur challenge, un publicateur diffuse. Ils se passent le relais, se relisent, se corrigent. C'est le passage d'« un assistant » à « une petite structure numérique qui tourne en continu ».

État du marché : c'est la frontière actuelle. Les frameworks d'orchestration sont matures, et les premiers adoptants vendent déjà des systèmes multi-agents à des tarifs élevés. Ce que cela change concrètement : c'est le niveau où l'on passe de « je gagne du temps » à « je vends un système », c'est-à-dire une offre premium, scalable, différenciante. L'action à mener maintenant : concevoir une première équipe de trois agents (pas dix) autour d'un processus déjà maîtrisé manuellement. On automatise ce que l'on sait déjà faire, jamais l'inverse.

> **Prompt (Niveau 3) : sa première équipe d'agents**
>
> Tu es architecte de systèmes multi-agents. Conçois-moi une équipe de 3 agents autour d'UN processus que je maîtrise déjà à la main.
>
> MON PROCESSUS À AUTOMATISER :
> - Nom du processus : [ex : produire un post LinkedIn hebdo + carrousel + newsletter]
> - Étapes actuelles quand je le fais moi-même : [listez 5-10 étapes]
> - Sources d'info que j'utilise : [liste]
> - Ce qui rate le plus souvent : [décrivez]
> - À quoi ressemble un livrable « excellent » : [décrivez]
>
> CONSTRUIS L'ÉQUIPE :
> 1. AGENT A (Chercheur/Collecteur) : rôle exact, sources, prompt système complet, format de sortie qu'il passe à B
> 2. AGENT B (Producteur) : rôle exact, contraintes de style (ma voix), prompt système complet, format de sortie qu'il passe à C
> 3. AGENT C (Vérificateur/Éditeur) : rôle exact, checklist de contrôle (5-8 points), prompt système complet, format final
>
> DÉFINIS AUSSI :
> - Le HANDOFF exact entre A→B et B→C (quelles données passent, dans quel format)
> - La MÉMOIRE partagée (qu'est-ce qui est stocké entre les runs)
> - La BOUCLE DE FEEDBACK (si C rejette, comment ça repart en B avec quelles instructions)
> - Le SEUIL DE VALIDATION HUMAINE (dans quels cas EXACTS je dois intervenir avant publication)
> - Les 3 MÉTRIQUES à suivre pour savoir si le système marche (pas des vanity metrics)
>
> Termine par le schéma texte du flux (A → B → C avec les conditions) et les 3 risques classiques à surveiller la première semaine.

## Niveau 4 : L'intelligence artificielle générale (IAG)

Une IA qui égale la cognition humaine sur la plupart des tâches économiquement utiles (raisonner comme un scientifique, décider comme un dirigeant, créer comme un artiste), non parce qu'elle a été entraînée à chaque tâche spécifiquement, mais parce qu'elle apprend seule à en aborder de nouvelles. Les experts ne s'accordent même pas sur la date d'arrivée, ni sur le fait qu'on ne l'ait pas déjà partiellement atteinte.

État du marché : les principaux laboratoires investissent des dizaines de milliards pour y parvenir avant 2030. Qu'on y croie ou non, l'investissement est bien réel. Ce que cela change concrètement : la question n'est plus « est-ce que ça va arriver ? » mais « si ça arrive en 2028, qu'est-ce qui, dans mon métier, tient encore ? ». L'action à mener maintenant : un audit honnête de son rôle, tâche par tâche, pour se repositionner sur ce que l'IAG ne peut pas remplacer (relation, arbitrage à haute responsabilité, goût, réputation).

> **Prompt (Niveau 4) : stress-tester son métier face à l'IAG**
>
> Tu es analyste future-of-work. On simule une IAG plausible en 2028 : elle raisonne aussi bien qu'un humain médian sur toute tâche cognitive, elle est branchée à internet et aux outils, elle coûte moins qu'un stagiaire à l'heure. Elle a des limites : pas de corps, pas de statut social, pas de responsabilité juridique, pas d'accès natif à mes relations et à ma réputation.
>
> MON RÔLE :
> - Métier / intitulé : [...]
> - Ce pour quoi on me paie vraiment (pas la fiche de poste, la vraie création de valeur) : [...]
> - Mes 10 activités principales sur une semaine typique + % de temps sur chacune : [...]
> - Mes atouts différenciants (relations, marque, savoir-faire rare) : [...]
> - Mon marché (B2B, B2C, secteur, taille clients) : [...]
>
> FAIS-MOI :
> 1. Un TABLEAU de mes 10 activités avec 3 colonnes : (a) automatisable à 100 %, (b) augmentée (je fais 3× plus, 3× plus vite), (c) irremplaçable en 2028 (relation, arbitrage, goût, responsabilité). Justifie chaque case en 1 ligne.
> 2. Le % de mon rôle actuel qui bascule en (a) : soit à disparaître, soit à revendre autrement.
> 3. Les 3 SCÉNARIOS pour moi :
> - Garder mon rôle en montant en gamme (que dois-je arrêter de faire, que dois-je faire à la place ?)
> - Créer une offre nouvelle qui ne pouvait pas exister sans IAG (laquelle, à quel prix, pour qui ?)
> - Pivoter complètement (vers quoi, avec quels 3 atouts que je porte déjà ?)
> 4. Un PLAN 24 MOIS trimestre par trimestre pour le scénario que tu recommandes (avec justification).
> 5. Les 3 SIGNAUX à surveiller cette année pour savoir si le calendrier s'accélère ou ralentit.
>
> Sois lucide, pas rassurante. Je préfère une vérité inconfortable maintenant qu'un plan flatteur à mettre à la poubelle en 2028.

## Niveau 5 : La superintelligence

Une IA qui dépasse massivement l'intelligence humaine, collective, pas individuelle. Elle attaque des problèmes bloqués depuis des siècles (maladies, énergie, physique) et pose des questions qu'on ne sait même pas encore formuler. Ce n'est plus un outil, c'est une force avec laquelle il faut cohabiter.

État du marché : pure spéculation sur le calendrier (cinq ans ? trente ans ? jamais ?), mais les paris capitaux, politiques et énergétiques se prennent dès maintenant. Ce que cela change concrètement : l'enjeu n'est pas technique, il est patrimonial et relationnel : qui possède quoi, qui décide quoi, de quel côté de la table on se trouve le moment venu. L'action à mener maintenant : construire dès aujourd'hui le portefeuille (compétences, capital, relations, réputation, indépendance géographique) qui permet de rester acteur plutôt que spectateur, quel que soit le scénario.

> **Prompt (Niveau 5) : sa position à dix ans**
>
> Tu es stratège long-terme, style investisseur influent croisé avec un family office. On projette 3 scénarios à 10 ans autour de la superintelligence :
>
> - SCÉNARIO A (optimiste) : superintelligence alignée, abondance matérielle, effondrement du coût de la connaissance, mais concentration extrême de la richesse chez ceux qui possèdent les modèles, l'énergie, les données rares et les marques.
> - SCÉNARIO B (médian) : progrès puissant mais chaotique, régulations fortes par blocs (US, UE, Chine, Golfe), IA très intégrée mais pas superintelligente, guerre des talents et des standards.
> - SCÉNARIO C (rupture) : capacités qui dépassent nos systèmes de gouvernance, chocs sociaux et géopolitiques, mobilité et souveraineté personnelles redeviennent des atouts clés.
>
> MOI AUJOURD'HUI :
> - Situation pro : [...]
> - Revenus & sources : [...]
> - Épargne / capital / actifs : [...]
> - Compétences rares que je porte : [...]
> - Réseau (pays, industries, niveau) : [...]
> - Contraintes : famille, géo, engagements : [...]
> - Ce à quoi je ne veux PAS renoncer : [...]
>
> CONSTRUIS-MOI :
> 1. Pour chaque scénario (A, B, C) : les 3 leviers qui protègent ET font croître mon capital / mon influence / ma liberté.
> 2. LE PORTEFEUILLE COMMUN aux 3 scénarios (ce qui gagne quoi qu'il arrive) : compétences (3), types d'actifs (3), relations à cultiver (3 types), formes d'exposition médiatique (2).
> 3. Les 5 CHOSES À ARRÊTER cette année parce qu'elles ne valent rien dans aucun des 3 scénarios.
> 4. Les 3 PARIS ASYMÉTRIQUES à prendre maintenant (petit downside, gros upside si le scénario tombe).
> 5. Un TABLEAU DE BORD ANNUEL : 6 indicateurs à surveiller chaque janvier pour savoir dans quel scénario on glisse et ajuster.
> 6. Une ligne finale, brutale, sur ce que je devrais changer dans les 90 prochains jours.
>
> Pas de langue de bois. Je veux une lecture stratégique, pas une brochure LinkedIn.

## Où se situer vraiment ?

Trois questions honnêtes, soixante secondes, sans tricher :

La dernière fois qu'un assistant a été ouvert, était-ce pour poser une question ou pour confier un objectif ? Une question posée place au niveau 1, sans jugement, mais c'est un fait.

Existe-t-il, dans sa semaine, une seule tâche qu'une IA mène en autonomie de bout en bout pendant qu'on fait autre chose ? Si non, le niveau 2 n'est pas encore franchi.

Est-on capable de dessiner, sur une feuille, un système à trois agents autour d'un de ses processus ? Si oui, on se trouve à la frontière : le niveau 3 devient le terrain de jeu de l'année.

## À retenir

**Le niveau 1 se démode, le niveau 3 se prépare, mais aucun ne se saute.**

La bonne stratégie n'est pas d'attaquer les cinq niveaux en même temps : c'est de trouver celui où l'on est juste en retard d'un cran, et d'y aller vraiment. On ne devient pas architecte multi-agents en restant simple utilisateur d'un chatbot. Chaque palier change la posture, pas seulement l'outil.

Viser un palier de plus ce trimestre. Le prompt du niveau à préparer se trouve ci-dessus. À lancer aujourd'hui, pas la semaine prochaine.
