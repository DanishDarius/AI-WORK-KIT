---
Guide original : Lance-le, point : ma checklist sur 30 jours
Source : https://www.saadiakaram.ai/guides/30-day-launch-checklist
Position réelle dans la bibliothèque au moment du traitement : 240/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé. Guide long à 6 prompts détaillés : prompts reproduits avec leur structure fonctionnelle complète (placeholders, consignes de sortie CSV/markdown) car toute reformulation en modifierait le fonctionnement ; seule la prose environnante a été reformulée. Noms réels conservés comme faits (Claude, Klaviyo, Meta, TikTok, Instagram Reels, YouTube Shorts, Liquid Death, Glossier, Allbirds).
---

# Une checklist sur 30 jours pour lancer un business avec l'IA en renfort

*Multi-outils · 5 min de lecture*

Le meilleur conseil business tient en peu de mots : sortir le produit. Ni dans six mois, ni après vingt maquettes, ni une fois le site jugé parfait. Avec le bon enchaînement d'outils IA et une discipline d'exécution, trente jours suffisent pour passer de rien à une première version réellement en ligne, à condition de travailler comme un opérateur plutôt que comme un collectionneur d'idées.

## Jours 1 à 3 : Valider avec de vraies données

La plupart des lancements échouent au même endroit : le fondateur construit ce qu'il imagine que les gens veulent, pas ce qu'ils réclament déjà activement.

> **Prompt : profil client à partir de données réelles**
>
> Tu es un spécialiste de la recherche client. Je valide une nouvelle idée de business en collectant le vrai langage client là où mes clients cibles se plaignent. Ci-dessous, il y a des données brutes récupérées (avis, commentaires Reddit, posts X, avis Trustpilot) à propos des concurrents dans cet espace.
>
> Mon idée de business (une phrase) : [J'aide QUI à résoudre QUOI pour obtenir QUEL RÉSULTAT]
> Le marché / créneau : [soyez spécifique]
> Concurrents que j'ai analysés : [listez-les]
> Données brutes récupérées (collez 100+ commentaires ci-dessous) :
> ---
> [collez toutes les données ici]
> ---
>
> Fais tout ceci :
>
> 1. SYNTHÉTISE les 5 principaux jobs-to-be-done. Pour chacun, donne-moi la phrase client qui le prouve (mot pour mot depuis les données, entre guillemets).
> 2. SYNTHÉTISE les 5 principales douleurs. Pour chacune, donne-moi la phrase client verbatim qui la prouve.
> 3. FAIS REMONTER les patterns de langage. Quels mots, phrases et métaphores utilisent-ils en boucle ? Liste les 20 phrases principales que je dois intégrer dans mon copy. Ça devient mon swipe file.
> 4. IDENTIFIE les gaps. Qu'est-ce qu'ils n'obtiennent PAS des concurrents existants ? Où sont les plaintes les plus concentrées ? Classe par fréquence.
> 5. ÉCRIS mon document ICP. Formate-le comme un doc d'une page avec : démographie, psychographie, JTBD pour lesquels ils achètent des produits comme le mien, langage utilisé, top 3 douleurs, et à quoi ressemble le succès pour eux.
> 6. ÉCRIS mon brand-voice-doc.md. Inclus : 3 attributs de voix (avec exemples), 5 choses que ma marque DIT, 5 choses qu'elle NE DIT PAS, 10 exemples de headlines dans ma voix, 10 ouvertures de descriptions produit. Ce fichier sera chargé dans mon projet Claude comme contexte permanent pour tout ce que je construirai pendant les 30 prochains jours.
> 7. TERMINE par un verdict GO / KILL. D'après ces données, ce marché est-il un antidouleur (urgent, les gens paient maintenant) ou une vitamine (sympa à avoir, difficile à vendre) ? Sois brutal. Si c'est une vitamine, dis-moi vers quoi pivoter.
>
> Pas de langage corporate. Cite les données. Si les patterns sont faibles, dis-le.

## Jours 4 à 7 : Marque, visuels, voix

> **Prompt : document de voix de marque**
>
> Tu es un stratège de voix de marque qui a construit la voix de plus de 50 marques DTC et business en ligne. Je lance une nouvelle marque et j'ai besoin d'un brand-voice-doc.md que je peux charger dans un projet Claude pour que chaque futur prompt hérite automatiquement de cette voix.
>
> Ma marque : [nom]
> Ce que je vends : [produit ou service]
> Mon ICP (issu de la phase 1) : [collez]
> Le langage client que j'ai récupéré (top 20 phrases) : [collez depuis la phase 1]
> 3 marques que j'admire (et pourquoi) : [ex. Liquid Death pour la rébellion, Glossier pour la chaleur, Allbirds pour le minimalisme calme]
> 3 marques auxquelles je ne veux PAS ressembler : [ex. DTC bro générique, jargon corporate, startup IA survendue]
>
> Génère le brand-voice-doc.md complet, prêt à être sauvegardé en markdown :
>
> \# Brand Voice Document : [brand]
>
> ## 1. Voice Attributes (3)
> Pour chacun : l'attribut, une définition en une ligne, et une phrase exemple « ça sonne comme ».
>
> ## 2. Things This Brand Says (5)
> Phrases, mots ou angles précis que cette marque s'approprie.
>
> ## 3. Things This Brand Never Says (5)
> Mots, phrases ou clichés précis que cette marque refuse.
>
> ## 4. Tone Rules
> - Longueur des phrases (courtes et punchy / longues et fluides / mix)
> - Tics de ponctuation (tirets cadratins ? fragments ? titres en minuscules ?)
> - Niveau de lecture (CM2 / collège / universitaire)
> - Humour (deadpan / chaleureux / aucun)
> - Pronoms (nous / je / axé sur le vous)
>
> ## 5. Example Headlines (10)
> Écris 10 headlines comme si elles devaient apparaître sur la home, les pubs et les pages produit. Chacune doit passer le test : « si je lis ça sur un panneau, ça sonne comme cette marque ».
>
> ## 6. Example Product Description Openers (10)
> Premières lignes de descriptions produit, toutes dans cette voix.
>
> ## 7. Example CTAs (5)
> Libellés de boutons et CTA email cohérents avec cette voix.
>
> ## 8. Vocabulary List
> 20 mots que cette marque utilise + 20 mots qu'elle n'utilise pas.
>
> ## 9. The Sound Test
> Écris un paragraphe dans cette voix expliquant pourquoi j'ai créé cette marque. Utilise-le comme référence de calibration pour tous les futurs textes.
>
> Sois tranché. Choisis la version la plus forte, ne me donne pas un menu d'options.

## Jours 8 à 14 : Boutique en ligne et back-end

> **Prompt : séquences email Klaviyo**
>
> Tu es un stratège senior en email marketing qui a construit des welcome flows pour plus de 100 marques DTC. Écris ma séquence de bienvenue Klaviyo complète, prête à être collée dans l'éditeur Klaviyo.
>
> Ma marque : [nom]
> Produit / offre : [collez]
> Prix : [prix]
> ICP : [collez depuis la phase 1]
> Brand voice doc : [doit être chargé dans votre projet Claude, sinon collez-le ici]
> Offre phare pour les nouveaux inscrits (code de réduction de bienvenue, livraison gratuite, etc.) : [précisez]
>
> Écris la séquence complète de 5 emails. Pour chaque email, donne-moi :
> - Le délai d'envoi (ex. immédiatement, +1 jour, +3 jours)
> - 3 variantes d'objet (angles différents : curiosité, bénéfice, histoire) pour que je puisse faire un A/B test
> - Le preview text (moins de 90 caractères)
> - Le corps complet de l'email dans la voix de la marque (300 à 500 mots)
> - Le label du bouton CTA
> - Une ligne P.S. optionnelle
>
> EMAIL 1 : La bienvenue + l'offre (envoi immédiat)
> EMAIL 2 : L'histoire d'origine (+1 jour, pourquoi cette marque existe)
> EMAIL 3 : Focus best-seller (+2 jours, un produit, le résultat client)
> EMAIL 4 : La pile de preuve sociale (+4 jours, vrais avis + UGC)
> EMAIL 5 : Dernier appel pour le premier achat (+7 jours, urgence + expiration du code)
>
> Ensuite écris aussi :
>
> LE FLOW PANIER ABANDONNÉ (3 emails : 1 heure, 24 heures, 72 heures après abandon). Même structure que ci-dessus.
>
> LE FLOW POST-ACHAT (3 emails : confirmation immédiate, +3 jours guide de soin / d'usage, +14 jours demande d'avis).
>
> Puis termine avec :
> - Le seul email à plus fort levier que je devrais ajouter ensuite si je n'ai le temps que pour un seul
> - Les 3 raisons les plus fréquentes pour lesquelles les welcome flows sous-performent, et comment le mien évite chacune
> - La seule ligne d'objet sur laquelle tu serais prêt à parier pour faire le meilleur taux d'ouverture
>
> Respecte exactement ma voix de marque. Du vrai copy, pas des placeholders. Pas de remplissage corporate. Pas d'emojis sauf si mon voice doc les autorise.

## Jours 15 à 21 : Le moteur de contenu et les publicités

> **Prompt : 30 accroches de contenu organique**
>
> Tu es un stratège vidéo short-form qui a écrit des hooks pour des comptes totalisant plus de 100M de vues. Génère 30 jours de hooks de contenu organique pour ma marque.
>
> Ma marque : [nom]
> ICP (issu de la phase 1) : [collez]
> Brand voice doc : [chargé dans le projet Claude]
> Plateforme prioritaire : [TikTok / Instagram Reels / YouTube Shorts, choisissez-en une comme principale]
> Les douleurs client (issues du doc ICP phase 1) : [collez le top 5]
> Le langage client que j'ai récupéré (top 10 phrases) : [collez]
>
> Génère 30 hooks. Chaque hook doit :
> - Être une seule ligne qui arrête le scroll (idéalement moins de 12 mots)
> - Ouvrir une boucle de curiosité ou provoquer une rupture de pattern
> - Respecter exactement ma voix de marque
> - Être spécifique aux douleurs de mon ICP, pas générique
>
> Répartis les types de hooks parmi les 30 :
> - 10 hooks problème / douleur (en utilisant le langage exact des clients)
> - 5 hooks contrarians / hot takes
> - 5 hooks histoire / personnel
> - 5 hooks liste / curiosité
> - 5 hooks orientés produit « voilà ce que c'est »
>
> Sors le résultat en CSV avec ces colonnes :
> day, hook_type, hook, follow_up_beat, suggested_visual, hashtags
>
> Pour follow_up_beat : une phrase expliquant ce qui se passe après le hook (la tension, la révélation, ou le payoff qui garde l'attention).
>
> Pour suggested_visual : une ligne décrivant ce qui est à l'écran (ex. « gros plan du produit qui tourne sur le plan de travail » ou « face cam avec texte overlay reprenant la douleur dans les mots du client »).
>
> Pour hashtags : 3 à 5 hashtags précis pour la plateforme, pas de générique #fyp.
>
> Après le CSV, donne-moi :
> 1. LES 3 HOOKS les plus susceptibles de devenir viraux (et pourquoi précisément)
> 2. LES 3 TEMPLATES que je peux cloner à partir de ceux-ci pour le contenu du mois prochain
> 3. LE RYTHME DE PUBLICATION auquel je devrais m'engager (et pourquoi)
> 4. LA SEULE MÉTRIQUE que je devrais optimiser en semaine 1 (et pourquoi elle compte plus que les vues)
>
> Sois tranché. Spécifique à ma voix et à mon ICP. Pas de formules de hooks génériques.

## Jours 22 à 27 : Premiers clients et audit publicitaire

> **Prompt : audit Meta Ads**
>
> Tu audites mon compte publicitaire Meta. Utilise le Meta Ads MCP pour récupérer les données en direct. Ne me demande pas de coller des chiffres ou des captures d'écran.
>
> Étape 1 : Confirme le compte.
> Liste mes comptes publicitaires et confirme lequel tu audites. S'il n'y en a qu'un connecté, utilise-le et avance.
>
> Étape 2 : Récupère les données. Sur les 30 et 90 derniers jours, récupère :
> - Les tendances de performance au niveau du compte (dépenses, CPM, CTR, CPC, CPA, ROAS, fréquence)
> - Les découpages par campagne et ensemble de pubs, les meilleurs et pires performeurs par dépense
> - Les 10 meilleures pubs par dépense avec les métriques au niveau créa, plus les signaux de fatigue (CPM en hausse, CTR en baisse, fréquence >3)
> - La qualité du dataset / pixel, la qualité de correspondance des événements, et les erreurs de tracking
> - Les benchmarks secteur pour ma verticale et mon objectif
> - Le score d'opportunité Meta et tous les drapeaux de diagnostic ou alertes d'enchère
>
> Étape 3 : Rédige l'audit. Structure-le comme ceci :
>
> 1. Verdict : Un paragraphe. Ce qui se passe réellement dans ce compte. Sois franc.
> 2. Santé du compte : Pixel, CAPI, qualité de correspondance des événements, problèmes de dataset, trous de tracking.
> 3. Performance : Comment les dépenses évoluent. Ce qui marche, ce qui brûle du budget. Cite les chiffres.
> 4. Créa : Ce qui gagne. Ce qui est fatigué. Les patterns à doubler ou couper.
> 5. Structure & ciblage : Architecture des campagnes, overlap d'audience, config CBO/ABO, problèmes d'allocation budgétaire.
> 6. Benchmarks : Comment je me situe face au secteur sur les métriques qui comptent. Où je suis devant. Où je suis derrière.
> 7. Top 5 actions cette semaine : Actions précises, priorisées par impact. « Tester plus de créas » ne compte pas. Dis-moi exactement quoi tester, dans quel ad set, et pourquoi.
>
> Règles :
> - Cite de vrais chiffres issus des données. Pas d'affirmations vagues.
> - Si des données manquent, sont cassées ou paraissent fausses, signale-le.
> - Pas de hedge corporate. Si quelque chose est cassé, dis-le.
> - Termine par les 5 actions. C'est ça que je ferai demain.

## Jours 28 à 30 : Lancer et bâtir sa propre base de données client

> **Prompt : synthèse hebdomadaire client**
>
> Tu es analyste customer insights pour mon business. Chaque semaine je colle ici le feedback client brut (DMs, transcripts d'appels de vente, avis, tickets support, commentaires de pubs) et tu synthétises ce qu'il faut en faire.
>
> Ma marque : [nom]
> Produit / offre : [collez]
> Semaine analysée : [Semaine du DATE]
> Revenu total cette semaine : [si connu]
> Total de nouveaux clients cette semaine : [si connu]
>
> Les données client brutes de cette semaine (collez tout ci-dessous : DMs, transcripts, avis, commentaires de pubs) :
> ---
> [collez]
> ---
>
> Fais tout ceci :
>
> 1. THÈMES : Fais remonter les 5 principaux thèmes de la semaine. Pour chacun : un résumé en une ligne, les citations clients verbatim qui le prouvent (au moins 2), et le nombre d'occurrences.
> 2. WINS : Ce que les clients adorent. Les 3 aspects du produit ou de l'expérience les plus appréciés, avec citations verbatim.
> 3. PAINS : Ce dont les clients se plaignent. Les 3 douleurs les plus citées, avec citations verbatim. Classe par gravité (ce qui bloque la vente > ce qui agace après achat).
> 4. DEMANDES DE FEATURES / AMÉLIORATIONS : Ce que les clients demandent. Liste-les toutes. Signale celles qui reviennent plus d'une fois.
> 5. MISES À JOUR DE LANGAGE : Les nouvelles formulations ou phrases clients que je devrais ajouter à mon brand-voice-doc.md et à mon copy pub. Liste les 10 meilleures phrases verbatim qui n'étaient pas dans mon swipe file d'origine.
> 6. LES 3 ACTIONS : À partir de tout ce qui précède, les 3 choses que je devrais faire cette semaine, priorisées par impact et NON par effort. Pour chacune : l'action, la preuve client derrière, et ce que je mesurerais pour savoir si ça marche.
> 7. UNE CHOSE À NE PAS FAIRE : Une demande ou un thème client qui paraît séduisant mais que tu penses que je devrais ignorer. Explique pourquoi.
> 8. LA MISE À JOUR COMPOUND : Qu'est-ce qui a changé dans ma compréhension client cette semaine par rapport aux semaines précédentes ? Quels patterns émergent et n'étaient pas visibles avant ? (Ignore si c'est la semaine 1.)
> 9. LA MISE À JOUR COPY : Un élément précis du site, d'une pub ou d'un email que je devrais réécrire cette semaine à partir du langage client. Cite le copy actuel et réécris-le avec les phrases verbatim des clients.
>
> Sors le résultat en markdown pour que je puisse sauvegarder la synthèse directement dans ma base de connaissances. Sois spécifique. Utilise de vraies citations. Pas de hedge corporate.

## À retenir

**Une checklist n'a de valeur que si elle est vraiment suivie.**

Bloquer soixante minutes par jour, sans multiplier les outils inutilement. Chaque phase doit produire un livrable réel : profil client, document de voix, site, emails, contenu, publicité, boucle de feedback. Une question simple en fin de journée permet de vérifier le rythme : qu'est-ce qui est désormais en ligne, actif ou mesurable ? Si la réponse est « rien », le lancement n'a été que simulé.
