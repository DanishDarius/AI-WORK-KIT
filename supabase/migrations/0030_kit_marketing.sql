-- 0030 : contenu du kit « Marketing » (4 octobre 2026)
--
-- Ce fichier est fabriqué par un programme à partir du fichier source du kit :
-- les textes en sont copiés tels quels. Il ajoute :
--   - la description localisée du métier « Marketing », à côté de l'ancienne ;
--   - le résultat et les étapes de 12 tâches existantes (F02, F09, F28, F34, F35, F36, F37, F38, F39, F40, F41, F42) ;
--   - 24 cas pratiques localisés, deux par tâche, écrits À CÔTÉ des anciens cas ;
--   - le rattachement de 14 tâches déjà écrites par un kit précédent (F01, F03, F04, F05, F07, F08, F10, F13, F14, F15, F16, F17, F26, F27) ;
--   - 12 modèles à remplir, leurs champs, leurs exemples et la note par IA ;
--   - 13 ressources : 3 configurations, 4 skills, 4 documents, 2 routines ;
--   - le kit : ses 3 étapes d'installation et le rattachement des ressources.
--
-- À exécuter APRÈS 0021_cas_localises.sql et après les kits précédents. Les
-- anciens titres, cas et prompts des tâches ne sont ni modifiés ni supprimés : le site en ligne continue
-- de les afficher. La nouvelle interface affiche les cas localisés. Migration
-- rejouable : une seconde exécution remet les mêmes textes, sans doublon. Tout
-- se fait dans une transaction : en cas d'erreur, rien n'est modifié. Un
-- contrôle final annule tout si un métier, une tâche ou un cas attendu manque.
--
-- Les liens « Faire une copie » pointent pour le moment vers le Drive de
-- travail. Ils seront remplacés, par une nouvelle migration, quand les
-- documents seront copiés dans le Drive de Parlons ADS.

begin;

-- 1. Le métier
update metiers set description_local = $t$Pour toute personne qui fait connaître et vendre une offre : dans une PME, une agence, une marque locale, ou à son compte. Vous travaillez avec la publicité Facebook, TikTok, les statuts WhatsApp et Canva : contenus de la semaine, campagne à petit budget, visuels, vidéos courtes.$t$
  where slug = $t$marketing$t$;

-- 2. Les tâches, leur résultat et leurs étapes
update taches set resultat = $t$Le calendrier de vos publications pour la période : pour chaque jour, le réseau, le format, le sujet, le texte prêt à publier et le visuel à préparer.$t$, etapes = $j$["Lister ce que vous voulez mettre en avant : offres, prix, nouveautés, dates.", "Noter vos réseaux, le rythme que vous pouvez tenir, et les photos ou les vidéos déjà prêtes.", "Remplir le modèle et copier la consigne dans son IA.", "Relire chaque texte : le prix, les dates, la façon de commander. Retirer ce qui ne vous ressemble pas.", "Préparer les visuels, puis publier ou programmer dans chaque réseau."]$j$::jsonb, precisions = $t$L'IA ne publie rien et ne connaît pas vos offres du moment : donnez-les. Ne la laissez inventer ni témoignage ni chiffre. Choisissez un rythme que vous pouvez tenir : trois publications faites valent mieux que sept abandonnées.$t$
  where code = $t$F02$t$;

update taches set resultat = $t$Le brief de votre visuel, la consigne prête à coller dans une IA qui crée des images, deux variantes, et la liste de ce qu'il faut vérifier sur l'image obtenue.$t$, etapes = $j$["Dire à quoi sert le visuel et où il sera publié : cela fixe le format.", "Décrire le sujet, l'ambiance, les couleurs, et ce qu'il ne faut pas montrer.", "Remplir le modèle et copier la consigne dans son IA.", "Coller la consigne obtenue dans une IA qui crée des images, puis comparer le résultat à votre brief.", "Ajouter le texte et le logo dans votre outil de mise en page, et vérifier que l'image ne trompe pas le client."]$j$::jsonb, precisions = $t$Toutes les IA ne créent pas d'image : certaines rédigent seulement la consigne. Avec un compte gratuit, le nombre d'images est limité. Une IA écrit souvent mal les mots sur une image : ajoutez le texte après. N'utilisez ni le visage ni le logo de quelqu'un sans son accord, et ne montrez pas un produit différent de celui que vous vendez.$t$
  where code = $t$F09$t$;

update taches set resultat = $t$La lecture de vos résultats publicitaires : le coût par message et par vente de chaque publicité, ce qu'il faut garder, modifier ou arrêter, et le seul réglage à tester ensuite.$t$, etapes = $j$["Relever, pour chaque publicité, le budget dépensé, les messages ou les clics reçus, et les ventes réelles.", "Noter vos réglages : la zone, l'âge, le public, la durée, le visuel et le texte.", "Remplir le modèle et copier la consigne dans son IA.", "Vérifier chaque calcul, puis choisir un seul changement à tester.", "Relancer la publicité, et comparer après la même durée."]$j$::jsonb, precisions = $t$L'IA ne voit pas votre gestionnaire de publicités : elle calcule avec les chiffres que vous donnez, et ne promet aucun résultat. Avec très peu de ventes, une conclusion reste fragile : laissez tourner avant de trancher. Changez un seul réglage à la fois, sinon vous ne saurez pas ce qui a marché.$t$
  where code = $t$F28$t$;

update taches set resultat = $t$La liste des retouches à faire sur chaque photo, dans l'ordre, la consigne de retouche prête à coller, et ce qu'il ne faut pas modifier pour ne pas tromper le client.$t$, etapes = $j$["Regarder chaque photo et noter ce qui gêne : la lumière, le fond, le cadrage, un objet en trop.", "Dire à quoi sert la photo : vendre un produit, montrer un lieu, illustrer une publication.", "Remplir le modèle et copier la consigne dans son IA.", "Faire les retouches une à une, dans une IA qui retouche les images ou dans votre outil habituel.", "Comparer avec la photo d'origine : le produit ou le lieu doit rester le même."]$j$::jsonb, precisions = $t$Certaines IA retouchent une image que vous envoyez, d'autres rédigent seulement la consigne. Corriger la lumière, le cadrage ou le fond est une retouche honnête. Changer la couleur d'un produit, agrandir une pièce ou effacer un défaut que le client découvrira ensuite, c'est le tromper. Ne retouchez pas le visage d'une personne sans son accord.$t$
  where code = $t$F34$t$;

update taches set resultat = $t$Trois palettes pour un même visuel, avec le code de chaque couleur, l'endroit où elle s'applique, et la vérification que le texte reste lisible.$t$, etapes = $j$["Décrire le visuel : ce qu'on y voit, ses couleurs actuelles, où se trouve le texte.", "Dire pourquoi vous voulez des variantes : une saison, un événement, un essai, un client qui hésite.", "Remplir le modèle et copier la consigne dans son IA.", "Appliquer chaque palette dans votre outil de mise en page.", "Vérifier sur un téléphone, en plein jour, que le texte se lit, puis garder la variante choisie."]$j$::jsonb, precisions = $t$L'IA propose des codes de couleur : c'est vous qui les appliquez et qui jugez le résultat à l'écran. Une couleur ne se voit pas pareil sur tous les téléphones, ni à l'impression : demandez une épreuve à l'imprimeur avant un tirage. Gardez les couleurs de la marque quand il y en a.$t$
  where code = $t$F35$t$;

update taches set resultat = $t$Les plans à garder, avec la durée gardée de chacun, l'ordre de montage et la durée totale, à partir de la liste de vos rushes.$t$, etapes = $j$["Regarder vos rushes une fois et noter chaque plan : ce qu'on voit, sa durée, sa qualité.", "Dire ce que vous montez : le sujet, la durée visée, où la vidéo sera publiée.", "Remplir le modèle et copier la consigne dans son IA.", "Vérifier l'addition des durées, puis monter les plans retenus dans cet ordre.", "Regarder le résultat en entier, et remplacer un plan s'il casse le rythme."]$j$::jsonb, precisions = $t$L'IA ne regarde pas vos rushes à votre place : elle choisit à partir de votre liste. Plus vos notes sont précises, meilleur est le choix. Certaines IA acceptent une courte vidéo, d'autres aucune : la liste écrite marche partout. Une personne filmée a donné son accord.$t$
  where code = $t$F36$t$;

update taches set resultat = $t$Le texte de votre vidéo réduit à l'essentiel, les passages gardés dans l'ordre, la durée estimée, et la liste des coupes à faire au montage.$t$, etapes = $j$["Obtenir le texte de ce qui est dit : une transcription, vos notes, ou les sous-titres automatiques de votre application.", "Dire la durée visée et le public de la vidéo.", "Remplir le modèle et copier la consigne dans son IA.", "Vérifier que rien d'important n'a disparu et que le sens n'a pas changé.", "Faire les coupes dans votre application de montage, en suivant la liste."]$j$::jsonb, precisions = $t$L'IA coupe dans le texte, pas dans la vidéo : c'est vous qui montez. Elle ne doit rien ajouter à ce que la personne a dit, ni changer le sens d'une phrase. Une transcription automatique contient des erreurs : relisez les noms et les chiffres. La durée dépend du débit de la personne : donnez votre repère.$t$
  where code = $t$F37$t$;

update taches set resultat = $t$Les sous-titres de votre vidéo, corrigés, découpés en lignes courtes et faciles à lire, et leur traduction dans la langue demandée.$t$, etapes = $j$["Obtenir le texte de ce qui est dit : une transcription, vos notes, ou les sous-titres automatiques de votre application.", "Corriger les noms, les chiffres et les mots mal compris.", "Remplir le modèle et copier la consigne dans son IA.", "Saisir ou coller les sous-titres dans votre application de montage, puis les caler sur la voix.", "Faire relire la traduction par une personne qui parle la langue, et vérifier sur un téléphone que tout se lit."]$j$::jsonb, precisions = $t$L'IA découpe et traduit un texte : elle ne cale pas les sous-titres sur l'image, c'est vous qui le faites au montage. Une traduction automatique peut trahir le sens : faites-la relire avant de publier, surtout dans une langue nationale. Des sous-titres courts se lisent mieux sur un petit écran.$t$
  where code = $t$F38$t$;

update taches set resultat = $t$La liste des défauts de votre enregistrement, classés, l'ordre des corrections à faire dans votre application, et les passages à couper ou à réenregistrer.$t$, etapes = $j$["Écouter l'enregistrement une fois au casque et noter ce qui gêne, avec le moment où cela se produit.", "Dire à quoi sert l'enregistrement, et si vous pouvez le refaire.", "Remplir le modèle et copier la consigne dans son IA.", "Faire les corrections dans votre application, dans l'ordre donné, sur une copie de l'enregistrement.", "Réécouter au casque, puis sur le haut-parleur d'un téléphone, et comparer avec l'original."]$j$::jsonb, precisions = $t$L'IA ne nettoie pas le son à votre place : elle classe les défauts et donne l'ordre des corrections, à partir de votre description. Un bruit régulier s'atténue, un bruit qui couvre la voix ne se répare pas : le passage se coupe ou se refait. Gardez toujours l'original. Nettoyer un enregistrement ne permet pas de changer ce qu'une personne a dit.$t$
  where code = $t$F39$t$;

update taches set resultat = $t$Pour chaque format demandé, ce qui reste dans le cadre, plan par plan, l'endroit où placer le texte, et les plans à recadrer à la main ou à garder entiers.$t$, etapes = $j$["Noter le format de la vidéo d'origine et la liste des plans : ce qu'on voit, et où se trouve le sujet dans l'image.", "Dire où la vidéo sera publiée, et dans quels formats.", "Remplir le modèle et copier la consigne dans son IA.", "Recadrer chaque plan dans votre application de montage, en suivant le tableau.", "Regarder chaque version sur un téléphone : rien d'important n'est coupé, et le texte se lit."]$j$::jsonb, precisions = $t$L'IA ne recadre pas la vidéo : elle prépare le plan de recadrage à partir de votre liste. Certaines applications recadrent seules en suivant le sujet : selon votre version, cette fonction peut être payante. Le recadrage à la main marche partout. Un texte ou un logo déjà incrusté dans l'image sera coupé : mieux vaut repartir de la version sans texte, et le replacer dans chaque format.$t$
  where code = $t$F40$t$;

update taches set resultat = $t$Le texte de la voix off, plan par plan, avec le nombre de mots qui tient dans chaque plan, et sa version traduite, ajustée à la même durée.$t$, etapes = $j$["Lister les plans de la vidéo, avec la durée de chacun.", "Mesurer votre débit : lire un texte à voix haute pendant 10 secondes, puis compter les mots.", "Remplir le modèle et copier la consigne dans son IA.", "Lire le texte à voix haute sur la vidéo, et raccourcir ce qui dépasse.", "Faire relire la traduction par une personne qui parle la langue, puis enregistrer chaque version."]$j$::jsonb, precisions = $t$L'IA écrit et traduit le texte : la voix, c'est vous qui l'enregistrez, ou une personne dont c'est la langue. Une traduction est souvent plus longue que l'original : elle se raccourcit pour tenir dans le plan, on n'accélère pas la voix. Dans une langue nationale, faites toujours relire avant d'enregistrer. N'imitez jamais la voix d'une personne réelle sans son accord.$t$
  where code = $t$F41$t$;

update taches set resultat = $t$Le découpage en séquences courtes, une action par séquence, avec pour chacune la consigne prête à coller ou les indications pour la filmer vous-même.$t$, etapes = $j$["Dire à quoi servent les séquences : quelle vidéo elles illustrent, et pour qui.", "Lister les moments à illustrer, avec la durée de chacun.", "Remplir le modèle et copier la consigne dans son IA.", "Créer chaque séquence dans un outil qui crée de la vidéo, ou la filmer au téléphone en suivant les indications.", "Vérifier chaque séquence : rien d'étrange à l'image, rien de faux, aucune personne réelle."]$j$::jsonb, precisions = $t$Créer une vidéo avec une IA demande le plus souvent un abonnement : la même description sert alors de plan de tournage, pour filmer la séquence vous-même. Une séquence créée par une IA ne montre pas la réalité : ne la présentez jamais comme l'image de votre produit, de votre équipe ou d'un événement. Ce qui se vend se filme. Dites à votre public qu'une image a été créée par une IA quand il pourrait la croire vraie.$t$
  where code = $t$F42$t$;

-- 3. Les cas pratiques localisés, à côté des anciens
update exercices set titre_local = $t$Chargée de communication dans une imprimerie à Abidjan$t$, contexte_local = $t$Vous êtes chargée de communication chez Riviera Print, une imprimerie de 12 personnes, à Cocody. Novembre commence : les entreprises préparent leurs cartes, leurs flyers et leurs bâches de fin d'année. Votre gérant veut un plan de publications pour deux semaines.$t$, donnees_local = $t$- Offres à mettre en avant : 100 cartes de visite à 10 000 FCFA ; 1 000 flyers A5 à 90 000 FCFA ; bâche imprimée à 10 000 FCFA le mètre carré.
- Réseaux : la page Facebook de l'imprimerie et les statuts WhatsApp.
- Rythme possible : trois publications Facebook par semaine, un statut WhatsApp par jour ouvré, du lundi au vendredi.
- Déjà prêt : des photos de l'atelier, et les photos de bâches posées chez trois clients qui ont donné leur accord.
- Commandes : par WhatsApp, acompte par Orange Money ou Wave, retrait à l'atelier ou livraison dans Abidjan.$t$, travail_local = $t$Préparez le calendrier des deux semaines : date, réseau, format, sujet. Rédigez les publications Facebook, et proposez les statuts WhatsApp en une ligne chacun.$t$, prenom = $t$Christelle$t$, lieu = $t$Abidjan, Côte d'Ivoire$t$, profil = $t$Structure, 12 personnes$t$, reponse_attendue = $t$Six publications Facebook (trois par semaine pendant deux semaines) et dix statuts WhatsApp (un par jour ouvré). Chaque publication dit une offre, son prix et la façon de commander. Les sujets alternent : une offre, les coulisses de l'atelier, une bâche posée chez un client. Aucun témoignage n'est inventé : seules les photos des trois clients d'accord sont utilisées.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F02$t$);

update exercices set titre_local = $t$Couturier à son compte à Cotonou$t$, contexte_local = $t$Vous tenez l'Atelier Sèmako Couture avec un apprenti, à Akpakpa. Les fêtes de fin d'année approchent. Vous voulez préparer en une fois vos publications des deux prochaines semaines, pour ne plus improviser chaque soir.$t$, donnees_local = $t$- Offres : couture d'une tenue, 10 000 FCFA de main-d'œuvre, tissu apporté par le client ; tenue complète, tissu compris, 55 000 FCFA.
- Délai : 7 jours. Vous prenez les commandes jusqu'au 12 décembre.
- Réseaux : statuts WhatsApp chaque jour, page Facebook deux fois par semaine.
- Déjà prêt : les photos de huit tenues cousues à l'atelier, et une courte vidéo de la coupe d'un pagne.
- Commandes : message WhatsApp, avance par MTN MoMo, essayage à l'atelier.$t$, travail_local = $t$Préparez le calendrier des deux semaines et rédigez les quatre publications Facebook. Proposez les statuts WhatsApp, un par jour, en une ligne chacun.$t$, prenom = $t$Gildas$t$, lieu = $t$Cotonou, Bénin$t$, profil = $t$Individuelle, 2 personnes$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F02$t$);

update exercices set titre_local = $t$Chargée de communication dans une ONG à Yaoundé$t$, contexte_local = $t$Vous êtes chargée de communication dans une ONG de 15 personnes qui forme des jeunes aux métiers du numérique. Les inscriptions à la prochaine session ouvrent dans un mois. Votre directrice vous a donné son brief en une phrase : « une affiche moderne, chaleureuse, pas trop sérieuse ».$t$, donnees_local = $t$- Public : des jeunes de 18 à 25 ans, à Yaoundé.
- Publication : page Facebook et statuts WhatsApp, puis impression en format A3.
- Couleurs de l'ONG : vert foncé et jaune.
- Texte à placer : le nom de la formation, les dates d'inscription, un numéro WhatsApp.
- À éviter : la photo de vraies personnes sans leur accord, un ordinateur seul sur une table.$t$, travail_local = $t$Traduisez « moderne, chaleureuse, pas trop sérieuse » en choix précis (sujet, style, lumière, couleurs, cadrage). Rédigez la consigne pour une IA qui crée des images, puis deux variantes. Dites ce qui sera ajouté après, dans l'outil de mise en page.$t$, prenom = $t$Aïcha$t$, lieu = $t$Yaoundé, Cameroun$t$, profil = $t$Structure, 15 personnes$t$, reponse_attendue = $t$Les mots vagues deviennent des choix précis : par exemple une illustration plutôt qu'une photo, des jeunes qui travaillent ensemble, une lumière de fin de journée, du vert foncé et du jaune. Deux formats sont à prévoir : vertical pour les statuts, A3 pour l'impression. Le nom de la formation, les dates et le numéro s'ajoutent après, dans l'outil de mise en page : on ne demande pas à l'IA de les écrire sur l'image.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F09$t$);

update exercices set titre_local = $t$Vendeuse de sacs en ligne à Dakar$t$, contexte_local = $t$Vous vendez seule des sacs à main sur Facebook et WhatsApp, depuis Grand Yoff. Vous voulez un visuel pour annoncer votre nouvelle collection. Vos photos sont prises sur votre lit : le fond ne met pas les sacs en valeur.$t$, donnees_local = $t$- Produit : un sac à main en cuir marron, vendu 13 500 FCFA.
- Vous avez une photo nette du sac, prise à la lumière du jour.
- Publication : statut WhatsApp et page Facebook, en format vertical.
- Ambiance voulue : simple, élégante, un fond clair.
- Texte à placer : « Nouvelle collection », le prix, « Livraison à Dakar ».
- Le sac montré doit rester exactement celui que vous vendez.$t$, travail_local = $t$Rédigez le brief, puis la consigne pour placer votre vraie photo du sac sur un fond clair et élégant. Proposez deux variantes de fond. Dites ce qu'il faut vérifier avant de publier.$t$, prenom = $t$Awa$t$, lieu = $t$Dakar, Sénégal$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F09$t$);

update exercices set titre_local = $t$Chargée de marketing chez un traiteur à Dakar$t$, contexte_local = $t$Vous êtes chargée de marketing chez Thiossane Traiteur, un service traiteur de 9 personnes, à Dakar. Vous avez fait tourner trois publicités pendant sept jours, avec le même budget pour chacune. Votre gérante vous demande laquelle garder.$t$, donnees_local = $t$- Budget : 1 000 FCFA par jour et par publicité, soit 7 000 FCFA chacune et 21 000 FCFA en tout.
- Publicité A, la photo d'un plat : 35 conversations WhatsApp, 14 commandes d'un plat à 2 500 FCFA.
- Publicité B, une vidéo de la cuisine : 70 conversations WhatsApp, 7 commandes d'un plat à 2 500 FCFA.
- Publicité C, l'offre pour les entreprises : 5 conversations, 1 commande de 40 plats à 2 000 FCFA.$t$, travail_local = $t$Calculez, pour chaque publicité, le coût par conversation, le coût par commande et le montant des ventes. Dites laquelle garder, laquelle revoir, et pour laquelle il est trop tôt pour conclure.$t$, prenom = $t$Aïssatou$t$, lieu = $t$Dakar, Sénégal$t$, profil = $t$Structure, 9 personnes$t$, reponse_attendue = $t$A : 200 FCFA par conversation, 500 FCFA par commande, 35 000 FCFA de ventes. B : 100 FCFA par conversation, 1 000 FCFA par commande, 17 500 FCFA de ventes. C : 1 400 FCFA par conversation, 7 000 FCFA pour sa seule commande, 80 000 FCFA de ventes. Total des ventes : 132 500 FCFA. La B attire deux fois plus de conversations que la A, mais vend deux fois moins : la conversation la moins chère n'est pas la meilleure publicité. La A se garde. La C n'a qu'une commande : il est trop tôt pour conclure.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F28$t$);

update exercices set titre_local = $t$Vendeuse de perruques en ligne à Abidjan$t$, contexte_local = $t$Vous vendez seule des perruques sur Facebook, depuis Yopougon. Vous avez mis une publication en avant pendant une semaine. Les messages sont arrivés, mais peu de ventes : vous voulez comprendre avant de remettre de l'argent.$t$, donnees_local = $t$- Budget : 3 000 FCFA par jour pendant 7 jours, soit 21 000 FCFA.
- Résultats : 60 messages reçus, 6 ventes à 19 500 FCFA.
- Sur les 60 messages, 40 demandaient le prix, puis plus rien.
- Réglages : toute la Côte d'Ivoire, de 18 à 65 ans, hommes et femmes. Le prix n'est pas écrit dans la publicité.
- Vous livrez seulement dans Abidjan, pour 1 500 FCFA.$t$, travail_local = $t$Calculez le coût par message, le coût par vente et le montant des ventes. Dites quels réglages ne correspondent pas à votre activité, et lequel changer en premier.$t$, prenom = $t$Mariam$t$, lieu = $t$Abidjan, Côte d'Ivoire$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = $t$Coût par message : 21 000 ÷ 60 = 350 FCFA. Coût par vente : 21 000 ÷ 6 = 3 500 FCFA. Ventes : 6 × 19 500 = 117 000 FCFA. Trois réglages ne correspondent pas à l'activité : la zone, tout le pays alors que la livraison se fait dans Abidjan ; le public, hommes et femmes ; le prix absent de la publicité, qui explique les 40 demandes sans suite. Un seul changement à la fois : la zone d'abord, par exemple.$t$
  where numero = 2 and tache_id in (select id from taches where code = $t$F28$t$);

update exercices set titre_local = $t$Chargée de communication dans une agence immobilière à Niamey$t$, contexte_local = $t$Vous êtes chargée de communication dans une agence immobilière de 8 personnes. Un agent vous envoie par WhatsApp quatre photos d'une villa à louer. L'annonce part demain sur Facebook.$t$, donnees_local = $t$- Photo 1, la façade : prise de travers, avec un sac de ciment abandonné devant le portail.
- Photo 2, le salon : sombre, prise en contre-jour devant la fenêtre.
- Photo 3, la cuisine : nette, mais une fissure se voit au mur, au-dessus de l'évier.
- Photo 4, la chambre : l'agent demande de « l'élargir un peu pour qu'elle paraisse plus grande ».$t$, travail_local = $t$Pour chaque photo, dites la retouche à faire ou à refuser, et pourquoi. Rédigez la consigne de retouche des photos qui peuvent être corrigées.$t$, prenom = $t$Hadiza$t$, lieu = $t$Niamey, Niger$t$, profil = $t$Structure, 8 personnes$t$, reponse_attendue = $t$Photo 1 : redresser l'image ; le sac de ciment ne fait pas partie de la villa, il peut être effacé, ou la photo refaite. Photo 2 : éclaircir. Photo 3 : la fissure ne s'efface pas, elle fait partie du bien et le locataire la verra. Photo 4 : on ne déforme pas une pièce pour la faire paraître plus grande ; on refait la photo depuis l'angle de la porte.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F34$t$);

update exercices set titre_local = $t$Vendeuse de pagnes en ligne à Lomé$t$, contexte_local = $t$Vous vendez seule des pagnes sur WhatsApp et sur Facebook, sous le nom Assiyéyé Mode, près du Grand Marché. Vous avez photographié trois pagnes ce matin, avec votre téléphone. Des clientes vous ont déjà écrit : « la couleur n'est pas celle de la photo ».$t$, donnees_local = $t$- Photo 1 : le pagne bleu paraît presque violet à l'écran.
- Photo 2 : le pagne est bien éclairé, mais vos pieds et un seau apparaissent en bas de l'image.
- Photo 3 : le pagne est froissé, et la photo est un peu floue.$t$, travail_local = $t$Classez les retouches : celles qui sont obligatoires avant de publier, celles qui sont utiles, et les photos qu'il vaut mieux refaire. Rédigez la consigne de retouche de la photo 2.$t$, prenom = $t$Ama$t$, lieu = $t$Lomé, Togo$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F34$t$);

update exercices set titre_local = $t$Graphiste dans une agence de communication à Libreville$t$, contexte_local = $t$Vous êtes graphiste dans une agence de 6 personnes. Un client, organisateur d'un salon de l'emploi, a validé son affiche. Il demande trois variantes de couleurs pour choisir, sans toucher à la mise en page.$t$, donnees_local = $t$- Affiche actuelle : fond bleu nuit, titre en blanc, bandeau de la date en orange, logo du client en bleu et orange.
- Le logo et ses deux couleurs ne changent pas.
- L'affiche sera imprimée en A2 et publiée sur Facebook.
- Le client veut « une version plus claire, une plus vive, une plus sobre ».$t$, travail_local = $t$Proposez les trois palettes : pour chacune, la couleur du fond, du titre et du bandeau, avec leur code. Vérifiez que le titre reste lisible et que le logo garde ses couleurs.$t$, prenom = $t$Davy$t$, lieu = $t$Libreville, Gabon$t$, profil = $t$Structure, 6 personnes$t$, reponse_attendue = $t$Trois palettes, chacune avec la couleur du fond, du titre et du bandeau, et leur code. Le bleu et l'orange du logo restent dans les trois. Dans la version claire, le titre passe dans une couleur foncée : un titre blanc sur un fond clair ne se lit pas. Une épreuve imprimée est demandée avant le tirage en A2.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F35$t$);

update exercices set titre_local = $t$Graphiste à son compte à Cotonou$t$, contexte_local = $t$Vous êtes graphiste à votre compte, à Fidjrossè. La gérante d'un restaurant vous a commandé un flyer pour son menu du midi. Elle aime la mise en page, mais hésite sur les couleurs : elle veut trois propositions avant ce soir.$t$, donnees_local = $t$- Flyer actuel : fond rouge, photo du plat au centre, prix en jaune, texte en blanc.
- Elle trouve le rouge « trop agressif ».
- Le flyer sera surtout vu en statut WhatsApp, sur un téléphone.
- Le prix doit rester ce qui se voit en premier.$t$, travail_local = $t$Proposez trois palettes qui gardent le prix bien visible. Pour chacune : les couleurs, leur code, et où elles s'appliquent. Dites laquelle vous recommandez pour un statut WhatsApp, et pourquoi.$t$, prenom = $t$Rodrigue$t$, lieu = $t$Cotonou, Bénin$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F35$t$);

update exercices set titre_local = $t$Journaliste reporter d'images dans une télévision en ligne à Ouagadougou$t$, contexte_local = $t$Vous êtes journaliste reporter d'images dans une télévision en ligne de 14 personnes. Vous rentrez d'un reportage sur la rentrée, dans un marché de fournitures scolaires. Votre rédacteur en chef veut un sujet de 60 secondes pour ce soir.$t$, donnees_local = $t$- Plan 1 : vue large du marché, stable, 12 secondes.
- Plan 2 : gros plan sur des cahiers empilés, 6 secondes.
- Plan 3 : interview d'une vendeuse, 40 secondes, dont une phrase forte de 14 secondes sur la hausse des prix.
- Plan 4 : interview d'un parent, 35 secondes, dont 12 secondes claires ; le reste est couvert par un klaxon.
- Plan 5 : des enfants essaient des sacs, 10 secondes, image tremblée.
- Plan 6 : des mains comptent des billets, 5 secondes.
- Plan 7 : la sortie du marché au coucher du soleil, 9 secondes.
- Plan 8 : votre commentaire face à la caméra, 20 secondes, bien enregistré.$t$, travail_local = $t$Choisissez les plans pour un sujet de 60 secondes au plus. Donnez la durée gardée de chaque plan et l'ordre de montage. Dites ce que vous écartez, et pourquoi.$t$, prenom = $t$Wendkuuni$t$, lieu = $t$Ouagadougou, Burkina Faso$t$, profil = $t$Structure, 14 personnes$t$, reponse_attendue = $t$Un montage possible : plan 1 (6 secondes), plan 2 (4), la phrase forte du plan 3 (14), plan 6 (4), les 12 secondes claires du plan 4, 14 secondes du commentaire, plan 7 (6). 6 + 4 + 14 + 4 + 12 + 14 + 6 = 60 secondes. Le plan 5, tremblé, est écarté. Les 23 secondes du plan 4 couvertes par le klaxon ne sont pas utilisables.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F36$t$);

update exercices set titre_local = $t$Monteur de vidéos de mariage à Douala$t$, contexte_local = $t$Vous filmez et montez des mariages avec un assistant, depuis Akwa. Les mariés veulent une bande-annonce de 45 secondes pour WhatsApp et Facebook, avant le film complet.$t$, donnees_local = $t$- Arrivée de la mariée : 25 secondes, belle lumière.
- Échange des alliances : 18 secondes, net.
- Discours du père : 2 minutes, dont une phrase émouvante de 9 secondes.
- Ouverture du bal : 40 secondes, les 10 premières sont les meilleures.
- Décor de la salle : 15 secondes.
- Fou rire des témoins : 7 secondes.
- Sortie de l'église : 12 secondes.$t$, travail_local = $t$Choisissez les plans pour 45 secondes au plus. Donnez la durée gardée de chacun et l'ordre de montage. Le montage alterne les moments calmes et les moments joyeux.$t$, prenom = $t$Serge$t$, lieu = $t$Douala, Cameroun$t$, profil = $t$Individuelle, 2 personnes$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F36$t$);

update exercices set titre_local = $t$Journaliste dans un média en ligne à Bamako$t$, contexte_local = $t$Vous êtes journaliste dans un média en ligne de 10 personnes. Vous avez interviewé la responsable d'une coopérative de maraîchères. L'entretien dure 2 minutes 10. Il vous faut un extrait de 40 secondes pour les réseaux sociaux.$t$, donnees_local = $t$- Segment 1, 20 secondes : elle se présente et remercie longuement.
- Segment 2, 25 secondes : « Cette année, la pluie est arrivée tard. Nous avons perdu une partie des semis, et il a fallu replanter. »
- Segment 3, 30 secondes : des hésitations, elle cherche un chiffre et ne le retrouve pas.
- Segment 4, 15 secondes : « Ce qui nous a sauvées, c'est le puits que nous avons creusé ensemble l'an dernier. »
- Segment 5, 25 secondes : elle parle d'une réunion à venir, sans lien avec le sujet.
- Segment 6, 15 secondes : « Aujourd'hui, nous vendons au marché trois fois par semaine. »$t$, travail_local = $t$Choisissez les segments pour un extrait de 40 secondes au plus, qui se comprend seul. Listez les coupes. Ne changez aucun mot de ce qu'elle dit.$t$, prenom = $t$Modibo$t$, lieu = $t$Bamako, Mali$t$, profil = $t$Structure, 10 personnes$t$, reponse_attendue = $t$Les segments 2 et 4 : 25 + 15 = 40 secondes. Ils racontent un problème, puis sa solution. Avec le segment 6, l'extrait ferait 55 secondes : il se garde pour une seconde vidéo. Les segments 1, 3 et 5 sont coupés. Aucun mot n'est changé : on coupe, on ne réécrit pas ce qu'une personne a dit.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F37$t$);

update exercices set titre_local = $t$Coiffeuse à son compte à Dakar$t$, contexte_local = $t$Vous coiffez à domicile et vous publiez des conseils sur TikTok, depuis Pikine. Vous vous êtes filmée pendant 2 minutes pour expliquer comment entretenir des tresses. C'est trop long : vous voulez une vidéo de 30 secondes.$t$, donnees_local = $t$- La salutation et la présentation : 20 secondes.
- Pourquoi les tresses s'abîment : 25 secondes.
- Le conseil 1, protéger les cheveux la nuit : 15 secondes.
- Une parenthèse sur une cliente : 20 secondes.
- Le conseil 2, hydrater le cuir chevelu deux fois par semaine : 15 secondes.
- Vos tarifs et votre numéro : 25 secondes.
- Votre repère : vous dites environ 25 mots en 10 secondes.$t$, travail_local = $t$Gardez ce qui tient en 30 secondes, proposez la première phrase de la vidéo, et listez les coupes. Dites quoi faire des passages retirés.$t$, prenom = $t$Coumba$t$, lieu = $t$Dakar, Sénégal$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F37$t$);

update exercices set titre_local = $t$Chargée de communication dans une ONG à Cotonou$t$, contexte_local = $t$Vous êtes chargée de communication dans une ONG de 15 personnes, à Cadjèhoun. Vous avez monté le témoignage d'une apprentie couturière : 50 secondes. Le bailleur demande une version sous-titrée en français et en anglais.$t$, donnees_local = $t$- La jeune femme a donné son accord écrit pour la vidéo.
- La transcription automatique contient deux erreurs : le nom du centre de formation est mal écrit, et « six mois » est devenu « dix mois ».
- Elle parle vite : certaines phrases font plus de vingt mots.
- La vidéo sera vue sur téléphone, souvent sans le son.$t$, travail_local = $t$Corrigez la transcription, découpez-la en sous-titres de deux lignes courtes au plus, puis traduisez en anglais en gardant le même découpage. Dites ce qu'il faut faire relire.$t$, prenom = $t$Prisca$t$, lieu = $t$Cotonou, Bénin$t$, profil = $t$Structure, 15 personnes$t$, reponse_attendue = $t$Les deux erreurs se corrigent d'abord : le nom du centre et « six mois ». Les phrases de plus de vingt mots se coupent en plusieurs sous-titres. La traduction anglaise garde le même nombre de sous-titres, pour rester calée sur la voix. Elle est relue par une personne qui parle anglais avant l'envoi au bailleur.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F38$t$);

update exercices set titre_local = $t$Vendeur de téléphones à Niamey$t$, contexte_local = $t$Vous vendez seul des téléphones et des accessoires, et vous publiez de courtes vidéos sur Facebook. Vous avez tourné une vidéo de 30 secondes qui présente trois téléphones. Vous voulez des sous-titres en français, lisibles sur un petit écran.$t$, donnees_local = $t$- Ce que vous dites : « Bonjour à tous. Aujourd'hui je vous présente trois téléphones arrivés cette semaine. Le premier a une grande batterie. Le deuxième fait de belles photos, même le soir. Le troisième est le moins cher des trois, parfait pour un premier téléphone. Écrivez-moi sur WhatsApp pour les prix. »
- Vous parlez sans vous presser.
- Le texte doit se lire d'un coup d'œil.$t$, travail_local = $t$Découpez ce texte en sous-titres courts, d'une ou deux lignes. Proposez aussi le texte de la publication.$t$, prenom = $t$Abdoulaye$t$, lieu = $t$Niamey, Niger$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F38$t$);

update exercices set titre_local = $t$Technicien dans une radio à Lomé$t$, contexte_local = $t$Vous êtes technicien dans une radio de 9 personnes, à Tokoin. Une journaliste vous remet une interview de 8 minutes, enregistrée au téléphone dans un marché. Elle passe à l'antenne demain matin.$t$, donnees_local = $t$- Un groupe électrogène ronfle en fond, du début à la fin.
- L'invité est loin du micro : sa voix est faible. Les questions de la journaliste sont beaucoup plus fortes.
- Le vent souffle dans le micro pendant les 20 premières secondes.
- À la quatrième minute, un téléphone sonne pendant 15 secondes et couvre la réponse de l'invité.
- L'invité a quitté Lomé : il ne peut pas être réenregistré.$t$, travail_local = $t$Classez chaque défaut : il se corrige, il s'atténue seulement, ou il ne se répare pas. Donnez l'ordre des corrections. Dites ce que vous faites du passage couvert par la sonnerie.$t$, prenom = $t$Kodjo$t$, lieu = $t$Lomé, Togo$t$, profil = $t$Structure, 9 personnes$t$, reponse_attendue = $t$On travaille sur une copie. Les 20 premières secondes, gâtées par le vent, se coupent si la première question peut être reprise au micro par la journaliste. Le ronflement du groupe est un bruit régulier : il s'atténue, sans disparaître. Le volume des deux voix s'égalise ensuite, puis le volume général se règle en dernier. Les 15 secondes couvertes par la sonnerie ne se réparent pas : elles se coupent, et la journaliste résume la réponse à l'antenne, sans faire dire à l'invité ce qu'il n'a pas dit.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F39$t$);

update exercices set titre_local = $t$Formateur à son compte à Abidjan$t$, contexte_local = $t$Vous êtes formateur à votre compte, à Cocody. Vous envoyez chaque semaine une leçon audio à votre groupe WhatsApp d'apprenants. Vous avez enregistré la leçon de ce soir avec votre téléphone : 6 minutes.$t$, donnees_local = $t$- La pièce résonne : votre voix a de l'écho.
- Un ventilateur tourne en fond pendant toute la leçon.
- Vous dites souvent « euh », et l'on entend de longues respirations.
- Votre voix baisse à la fin des phrases.
- À 2 minutes 10, un klaxon couvre trois mots.
- Vous pouvez réenregistrer une phrase, mais pas toute la leçon.$t$, travail_local = $t$Dites ce qui se corrige, ce qui s'atténue et ce qu'il vaut mieux réenregistrer. Donnez l'ordre des corrections dans votre application. Proposez trois gestes simples pour que la prochaine leçon soit propre dès la prise.$t$, prenom = $t$Konan$t$, lieu = $t$Abidjan, Côte d'Ivoire$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F39$t$);

update exercices set titre_local = $t$Chargée de communication dans une école de formation à Libreville$t$, contexte_local = $t$Vous êtes chargée de communication dans une école de formation professionnelle de 20 personnes. Un vidéaste vous a livré la vidéo de la remise des attestations : 45 secondes, en format horizontal. La direction veut une version verticale pour les statuts WhatsApp et une version carrée pour Facebook.$t$, donnees_local = $t$- Plan 1 : vue large de la salle, les lauréats occupent toute la largeur de l'image.
- Plan 2 : le directeur parle au pupitre, au centre de l'image.
- Plan 3 : une lauréate reçoit son attestation ; elle est à gauche de l'image, le directeur à droite.
- Plan 4 : le titre « Promotion 2026 » est incrusté en bas, sur toute la largeur.
- Le logo de l'école reste en haut à droite pendant toute la vidéo.$t$, travail_local = $t$Pour la version verticale et pour la version carrée, dites plan par plan ce qui reste dans le cadre, ce qui est perdu, et la solution. Dites ce que vous demandez au vidéaste.$t$, prenom = $t$Ornella$t$, lieu = $t$Libreville, Gabon$t$, profil = $t$Structure, 20 personnes$t$, reponse_attendue = $t$En vertical, on ne garde qu'environ un tiers de la largeur de l'image. Le plan 2 passe sans difficulté : le directeur est au centre. Le plan 1 se recentre sur un groupe de lauréats, ou reste entier, avec une bande au-dessus et une bande au-dessous. Le plan 3 ne peut pas montrer les deux personnes en vertical : on cadre sur la lauréate et l'attestation, ou on garde le plan entier. En carré, les deux personnes tiennent dans le cadre. Le titre et le logo seront coupés : on demande au vidéaste la version sans titre ni logo, et on les replace dans chaque format.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F40$t$);

update exercices set titre_local = $t$Monteuse à son compte à Bamako$t$, contexte_local = $t$Vous êtes monteuse à votre compte. Vous avez monté pour la boutique Bamako Bazin Prestige une vidéo verticale de 30 secondes, filmée au téléphone. La gérante la veut aussi en format carré pour Facebook, et en format horizontal pour l'écran de la boutique.$t$, donnees_local = $t$- Plan 1 : la vendeuse, debout, présente un bazin ; on la voit de la tête aux pieds.
- Plan 2 : gros plan sur le tissu, qui remplit toute l'image.
- Plan 3 : une cliente tourne sur elle-même pour montrer sa tenue.
- Plan 4 : le numéro WhatsApp de la boutique, écrit en bas de l'image.
- Vous avez gardé votre projet de montage : le numéro est un texte que vous pouvez déplacer.$t$, travail_local = $t$Préparez le plan de recadrage pour le format carré et pour le format horizontal. Dites quels plans posent un problème, et la solution pour chacun.$t$, prenom = $t$Kadiatou$t$, lieu = $t$Bamako, Mali$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F40$t$);

update exercices set titre_local = $t$Chargé de communication dans un centre de formation à Dakar$t$, contexte_local = $t$Vous êtes chargé de communication chez Ndanane Digital, un centre de formation de 18 personnes, à Ouakam. La vidéo de présentation du centre est montée : 40 secondes, sans parole. Vous devez écrire la voix off en français, puis une version en wolof.$t$, donnees_local = $t$- Plan 1 : la façade et l'entrée du centre, 6 secondes.
- Plan 2 : une salle de cours, les apprenants devant leurs ordinateurs, 10 secondes.
- Plan 3 : une formatrice explique au tableau, 8 secondes.
- Plan 4 : la remise des attestations, 10 secondes.
- Plan 5 : le logo et le numéro du centre, 6 secondes.
- Votre débit : vous lisez 20 mots en 10 secondes, sans vous presser.$t$, travail_local = $t$Calculez le nombre de mots que la voix off peut contenir, plan par plan et au total. Dites comment vous préparez la version en wolof pour qu'elle tienne dans la même durée.$t$, prenom = $t$Ibrahima$t$, lieu = $t$Dakar, Sénégal$t$, profil = $t$Structure, 18 personnes$t$, reponse_attendue = $t$20 mots en 10 secondes, c'est 2 mots par seconde. Plan 1 : 12 mots au plus. Plan 2 : 20. Plan 3 : 16. Plan 4 : 20. Plan 5 : 12. Soit 12 + 20 + 16 + 20 + 12 = 80 mots pour 40 secondes. La version en wolof suit le même découpage : elle est relue, puis lue à voix haute sur la vidéo par une personne qui parle wolof. Si une phrase dépasse la durée du plan, elle se raccourcit. Le nom du centre et le numéro restent les mêmes dans les deux versions.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F41$t$);

update exercices set titre_local = $t$Gérante d'un atelier de tissage à Ouagadougou$t$, contexte_local = $t$Vous dirigez un atelier de tissage de 3 personnes. Vous avez monté une vidéo de 30 secondes qui montre la fabrication d'un pagne Faso Dan Fani, pour votre page Facebook. Vous voulez une voix off en français, et une version en anglais pour des acheteurs à l'étranger.$t$, donnees_local = $t$- Plan 1 : les fils teints sèchent au soleil, 5 secondes.
- Plan 2 : une tisserande travaille au métier à tisser, 10 secondes.
- Plan 3 : gros plan sur le motif, 5 secondes.
- Plan 4 : le pagne plié, puis porté, 10 secondes.
- Votre débit : vous lisez 22 mots en 10 secondes.
- Ce que la voix doit faire comprendre : chaque pagne est tissé à la main, dans votre atelier.$t$, travail_local = $t$Calculez le nombre de mots au plus pour chaque plan. Écrivez la voix off en français, plan par plan, puis la version en anglais, à la même durée.$t$, prenom = $t$Rasmata$t$, lieu = $t$Ouagadougou, Burkina Faso$t$, profil = $t$Individuelle, 3 personnes$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F41$t$);

update exercices set titre_local = $t$Chef de projet dans une agence de communication à Abidjan$t$, contexte_local = $t$Vous êtes chef de projet dans une agence de 10 personnes, au Plateau. Votre client, Lagune Fret Express, veut une vidéo de 20 secondes pour Facebook. L'agence dispose d'un outil qui crée de courtes séquences vidéo.$t$, donnees_local = $t$- Séquence 1 : un colis est remis à un livreur, 5 secondes.
- Séquence 2 : un livreur à moto roule dans la circulation, 5 secondes.
- Séquence 3 : une cliente reçoit son colis, 5 secondes.
- Séquence 4 : le logo et le numéro de l'entreprise, 5 secondes.
- Le client veut que l'on reconnaisse la tenue de ses livreurs.$t$, travail_local = $t$Dites quelles séquences peuvent être créées par une IA, lesquelles doivent être filmées, et pourquoi. Rédigez la consigne de la séquence qui peut être créée.$t$, prenom = $t$Serge$t$, lieu = $t$Abidjan, Côte d'Ivoire$t$, profil = $t$Structure, 10 personnes$t$, reponse_attendue = $t$Les séquences 1 et 3 montrent le service lui-même, avec la tenue de l'entreprise : une IA inventerait une tenue et des visages qui n'existent pas. Elles se filment, avec un livreur et une cliente qui ont donné leur accord. La séquence 2 peut être créée comme un plan d'ambiance : un livreur à moto vu de dos, casque sur la tête, sans tenue reconnaissable ni logo. La consigne dit une seule action, le cadre, la lumière et la durée. La séquence 4 se monte avec le vrai logo : elle ne se crée pas avec une IA.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F42$t$);

update exercices set titre_local = $t$Graphiste à son compte à Libreville$t$, contexte_local = $t$Vous êtes graphiste à votre compte. Une pâtisserie vous commande une introduction de 15 secondes pour sa page Facebook. Vous n'avez pas d'outil payant : vous avez votre téléphone, et la pâtissière vous ouvre sa boutique demain matin.$t$, donnees_local = $t$- Séquence 1 : la vapeur monte au-dessus d'une tasse de thé.
- Séquence 2 : un gâteau que l'on coupe.
- Séquence 3 : une main pose l'assiette sur la table.
- Chaque séquence dure 5 secondes, en format vertical.
- Les gâteaux sont ceux de la pâtisserie.$t$, travail_local = $t$Préparez les trois séquences : pour chacune, ce qu'on voit, le cadre, la lumière et le mouvement, assez précisément pour la filmer au téléphone. Dites ce qui doit rester vrai.$t$, prenom = $t$Armelle$t$, lieu = $t$Libreville, Gabon$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F42$t$);

-- 4. Les modèles à remplir, leurs champs et la note par IA
insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Création et planification de contenus pour les réseaux sociaux$t$, $t$Rôle : Vous m'aidez à préparer mes publications pour les réseaux sociaux.

Contexte : Mon activité : {{activite}}. Ce que je veux mettre en avant : {{offres}}. Mes réseaux et mon rythme : {{reseaux}}. La période : {{periode}}. Les photos et les vidéos que j'ai déjà : {{materiel}}. Comment le client commande : {{commande}}.

Travail demandé :
1. Le calendrier en tableau : date, réseau, format, sujet, visuel à prévoir.
2. Le texte de chaque publication, prêt à coller, avec l'offre, le prix et la façon de commander.
3. Des sujets variés : l'offre, les coulisses, un conseil utile, une réponse à une question fréquente.
4. Les statuts WhatsApp, en une ligne chacun.
5. La liste des visuels et des vidéos à préparer, avec leur format.

Format : un tableau, puis les textes prêts à coller, sans titre ni astérisque. Montants écrits ainsi : 25 000 FCFA.

Règle : utilisez seulement mes offres, mes prix et mes dates. N'inventez ni témoignage, ni chiffre, ni fausse urgence. Respectez le rythme que j'ai donné.$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F02$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$couturier à mon compte, à Cotonou$t$, true, 1),
    ($t$offres$t$, $t$Que voulez-vous mettre en avant ?$t$, $t$long$t$, null::jsonb, $t$couture d'une tenue, 10 000 FCFA de main-d'œuvre, tissu apporté par le client ; tenue complète, tissu compris, 55 000 FCFA ; délai de 7 jours ; commandes jusqu'au 12 décembre$t$, true, 2),
    ($t$reseaux$t$, $t$Où publiez-vous, et à quel rythme ?$t$, $t$texte$t$, null::jsonb, $t$statuts WhatsApp chaque jour ; page Facebook deux fois par semaine$t$, true, 3),
    ($t$periode$t$, $t$Pour quelle période ?$t$, $t$texte$t$, null::jsonb, $t$les deux prochaines semaines$t$, true, 4),
    ($t$materiel$t$, $t$Quelles photos ou vidéos avez-vous déjà ?$t$, $t$long$t$, null::jsonb, $t$les photos de huit tenues cousues à l'atelier ; une courte vidéo de la coupe d'un pagne$t$, false, 5),
    ($t$commande$t$, $t$Comment le client commande-t-il ?$t$, $t$texte$t$, null::jsonb, $t$message WhatsApp, avance par MTN MoMo, essayage à l'atelier$t$, true, 6)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F02$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Génération d'images et de visuels marketing$t$, $t$Rôle : Vous m'aidez à préparer un visuel : le brief, puis la consigne pour une IA qui crée des images.

Contexte : À quoi sert le visuel et où il sera publié : {{usage}}. Ce qu'on doit voir : {{sujet}}. L'ambiance et les couleurs : {{ambiance}}. Le format : {{format}}. Le texte qui sera placé sur l'image : {{texte}}. Ce qu'il ne faut ni montrer ni modifier : {{interdits}}.

Travail demandé :
1. Le brief en 6 lignes : objectif, sujet, style, couleurs, cadrage et format, texte à placer.
2. La consigne prête à coller dans une IA qui crée des images : une seule phrase, longue et précise.
3. Deux variantes de la consigne, qui changent un seul élément chacune.
4. Ce que je dois vérifier sur l'image obtenue avant de la publier.
5. Ce que j'ajouterai après, dans mon outil de mise en page : texte, prix, logo.

Format : texte simple, la consigne sur une ligne à part, prête à coller.

Règle : dites ce qu'on veut voir, pas ce qu'on ne veut pas. Ne demandez pas à l'IA d'écrire le texte sur l'image. Jamais le visage ou le logo d'une personne ou d'une marque réelle. Un produit en vente reste fidèle à ma photo.$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F09$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$usage$t$, $t$À quoi sert le visuel, et où sera-t-il publié ?$t$, $t$texte$t$, null::jsonb, $t$annoncer ma nouvelle collection de sacs, en statut WhatsApp et sur ma page Facebook$t$, true, 1),
    ($t$sujet$t$, $t$Que doit-on voir sur l'image ?$t$, $t$long$t$, null::jsonb, $t$mon sac à main en cuir marron, à partir de ma vraie photo, posé sur un fond clair et élégant$t$, true, 2),
    ($t$ambiance$t$, $t$Quelle ambiance et quelles couleurs voulez-vous ?$t$, $t$texte$t$, null::jsonb, $t$simple et élégante, fond clair, couleurs douces$t$, true, 3),
    ($t$format$t$, $t$Quel format vous faut-il ?$t$, $t$choix$t$, $j$["Vertical, 9:16", "Carré, 1:1", "Portrait, 4:5", "Horizontal, 16:9"]$j$::jsonb, $t$Vertical, 9:16$t$, true, 4),
    ($t$texte$t$, $t$Quel texte sera placé sur l'image ?$t$, $t$texte$t$, null::jsonb, $t$« Nouvelle collection », 13 500 FCFA, « Livraison à Dakar »$t$, false, 5),
    ($t$interdits$t$, $t$Que ne faut-il ni montrer ni modifier ?$t$, $t$texte$t$, null::jsonb, $t$le sac doit rester exactement celui que je vends : ni sa forme ni sa couleur ne changent$t$, false, 6)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F09$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Optimisation des paramètres publicitaires$t$, $t$Rôle : Vous m'aidez à lire les résultats de mes publicités et à choisir quoi changer. Vous montrez chaque calcul.

Contexte : Ce que je vends, et où : {{activite}}. Les chiffres de chaque publicité : {{resultats}}. Mes réglages actuels : {{reglages}}. Ce que je veux obtenir : {{objectif}}. Le budget que je veux garder : {{budget}}.

Travail demandé :
1. Pour chaque publicité : le coût par message ou par clic, le coût par vente, le montant des ventes.
2. Le classement des publicités, de celle qui vend le mieux à celle qui vend le moins.
3. Les réglages qui ne correspondent pas à mon activité : zone, âge, public, texte, prix affiché.
4. Ce qu'il faut garder, modifier ou arrêter, et ce qui manque de chiffres pour conclure.
5. Un seul changement à tester en premier, et ce que je devrai mesurer.

Format : un tableau des calculs, puis 5 lignes de conseils. Montants écrits ainsi : 25 000 FCFA.

Règle : utilisez seulement mes chiffres. Ne promettez aucun résultat et ne citez aucune moyenne du marché. Avec moins de cinq ventes, dites que la conclusion reste fragile.$t$, 2, $t$Une IA peut se tromper dans un calcul. Vérifiez chaque total.$t$, 1, '2026-10-04' from taches t
  where t.code = $t$F28$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Que vendez-vous, et où ?$t$, $t$texte$t$, null::jsonb, $t$des perruques vendues en ligne depuis Abidjan, 19 500 FCFA la perruque, livraison dans Abidjan seulement$t$, true, 1),
    ($t$resultats$t$, $t$Quels sont les chiffres de chaque publicité ?$t$, $t$long$t$, null::jsonb, $t$une publication mise en avant pendant 7 jours : 21 000 FCFA dépensés, 60 messages reçus, 6 ventes à 19 500 FCFA ; 40 personnes ont demandé le prix puis n'ont plus répondu$t$, true, 2),
    ($t$reglages$t$, $t$Quels sont vos réglages actuels ?$t$, $t$long$t$, null::jsonb, $t$zone : toute la Côte d'Ivoire ; âge : 18 à 65 ans ; hommes et femmes ; le prix n'est pas écrit dans la publicité$t$, true, 3),
    ($t$objectif$t$, $t$Que voulez-vous obtenir ?$t$, $t$choix$t$, $j$["Des messages", "Des ventes", "Des visites en boutique", "Des abonnés"]$j$::jsonb, $t$Des ventes$t$, true, 4),
    ($t$budget$t$, $t$Quel budget voulez-vous garder ?$t$, $t$texte$t$, null::jsonb, $t$3 000 FCFA par jour$t$, false, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F28$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Retouche d'image et modification d'éléments$t$, $t$Rôle : Vous m'aidez à préparer la retouche de mes photos, sans tromper la personne qui les verra.

Contexte : À quoi servent ces photos : {{usage}}. Mes photos, et ce qui gêne sur chacune : {{photos}}. Ce qui doit rester fidèle à la réalité : {{fidele}}. L'outil que j'utiliserai : {{outil}}.

Travail demandé :
1. Pour chaque photo : les retouches à faire, dans l'ordre.
2. Le classement : obligatoire avant de publier, utile, ou photo à refaire.
3. Les modifications à refuser, parce qu'elles tromperaient la personne qui verra la photo.
4. Pour chaque photo à retoucher : la consigne prête à coller, en une phrase précise.
5. Ce que je dois comparer avec la photo d'origine avant de publier.

Format : une liste par photo, puis les consignes, chacune sur une ligne à part.

Règle : partez seulement de ma description. Une retouche corrige la lumière, le cadrage ou le fond : elle ne change ni le produit, ni le lieu, ni une personne. Dans le doute, proposez de refaire la photo.$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F34$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$usage$t$, $t$À quoi servent ces photos ?$t$, $t$texte$t$, null::jsonb, $t$vendre mes pagnes sur WhatsApp et sur Facebook$t$, true, 1),
    ($t$photos$t$, $t$Quelles photos avez-vous, et qu'est-ce qui gêne sur chacune ?$t$, $t$long$t$, null::jsonb, $t$photo 1 : le pagne bleu paraît presque violet ; photo 2 : mes pieds et un seau apparaissent en bas de l'image ; photo 3 : le pagne est froissé et la photo est un peu floue$t$, true, 2),
    ($t$fidele$t$, $t$Qu'est-ce qui doit rester fidèle à la réalité ?$t$, $t$texte$t$, null::jsonb, $t$la couleur et le motif de chaque pagne$t$, true, 3),
    ($t$outil$t$, $t$Avec quoi ferez-vous les retouches ?$t$, $t$choix$t$, $j$["Une IA qui retouche les images", "Mon outil de mise en page", "L'éditeur de photos de mon téléphone"]$j$::jsonb, $t$Une IA qui retouche les images$t$, true, 4)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F34$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Variantes de couleurs d'un visuel$t$, $t$Rôle : Vous m'aidez à proposer des variantes de couleurs pour un visuel, sans changer sa mise en page.

Contexte : Le visuel et ses couleurs actuelles : {{visuel}}. Pourquoi je veux des variantes : {{raison}}. Ce qui ne doit pas changer : {{fixes}}. Où le visuel sera vu : {{support}}.

Travail demandé :
1. Trois palettes, chacune avec un nom court et une intention : plus claire, plus vive, plus sobre, ou ce que je demande.
2. Pour chaque palette : la couleur du fond, du titre, du texte et de l'élément à faire ressortir, avec son code.
3. La vérification du contraste : le texte se lit-il sur le fond ? Corrigez la palette si ce n'est pas le cas.
4. La palette que vous recommandez pour ce support, et pourquoi, en 2 lignes.
5. Ce que je dois contrôler à l'écran ou à l'impression.

Format : un tableau par palette (élément, couleur, code), puis la recommandation.

Règle : ne changez ni la mise en page, ni le logo, ni ce que j'ai dit de garder. Donnez de vrais codes de couleur à six caractères. Rappelez qu'une couleur se vérifie à l'écran et sur une épreuve imprimée.$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F35$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$visuel$t$, $t$Quel est le visuel, et quelles sont ses couleurs actuelles ?$t$, $t$long$t$, null::jsonb, $t$un flyer pour le menu du midi d'un restaurant : fond rouge, photo du plat au centre, prix en jaune, texte en blanc$t$, true, 1),
    ($t$raison$t$, $t$Pourquoi voulez-vous des variantes ?$t$, $t$texte$t$, null::jsonb, $t$la cliente trouve le rouge trop agressif et veut trois propositions$t$, true, 2),
    ($t$fixes$t$, $t$Qu'est-ce qui ne doit pas changer ?$t$, $t$texte$t$, null::jsonb, $t$la mise en page et la photo du plat ; le prix doit rester ce qui se voit en premier$t$, true, 3),
    ($t$support$t$, $t$Où le visuel sera-t-il vu ?$t$, $t$choix$t$, $j$["Sur téléphone", "Imprimé", "Les deux"]$j$::jsonb, $t$Sur téléphone$t$, true, 4)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F35$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Recherche de plans dans les rushes vidéo$t$, $t$Rôle : Vous m'aidez à choisir mes plans et à les mettre dans l'ordre. Vous montrez l'addition des durées.

Contexte : Ce que je monte : {{projet}}. La durée visée : {{duree}}. Mes plans, avec leur durée et leur qualité : {{rushes}}. L'effet que je cherche : {{intention}}.

Travail demandé :
1. Les plans retenus, avec la durée gardée de chacun.
2. L'ordre de montage, avec la raison en une ligne.
3. L'addition des durées, qui ne dépasse pas la durée visée.
4. Les plans écartés, et pourquoi.
5. Le plan qui manque, s'il en manque un, et comment le remplacer.

Format : un tableau (ordre, plan, durée gardée, rôle dans le montage), puis l'addition.

Règle : choisissez seulement parmi mes plans. N'inventez ni plan, ni durée. Un plan flou, tremblé ou mal enregistré ne se garde que s'il est irremplaçable : dites-le.$t$, 2, $t$Une IA peut se tromper dans un calcul. Vérifiez chaque total.$t$, 1, '2026-10-04' from taches t
  where t.code = $t$F36$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$projet$t$, $t$Que montez-vous ?$t$, $t$texte$t$, null::jsonb, $t$la bande-annonce d'un mariage, pour WhatsApp et Facebook$t$, true, 1),
    ($t$duree$t$, $t$Quelle durée visez-vous ?$t$, $t$texte$t$, null::jsonb, $t$45 secondes au plus$t$, true, 2),
    ($t$rushes$t$, $t$Quels plans avez-vous ?$t$, $t$long$t$, null::jsonb, $t$arrivée de la mariée, 25 secondes, belle lumière ; échange des alliances, 18 secondes, net ; discours du père, 2 minutes, dont une phrase émouvante de 9 secondes ; ouverture du bal, 40 secondes, les 10 premières sont les meilleures ; décor de la salle, 15 secondes ; fou rire des témoins, 7 secondes ; sortie de l'église, 12 secondes$t$, true, 3),
    ($t$intention$t$, $t$Quel effet cherchez-vous ?$t$, $t$texte$t$, null::jsonb, $t$alterner les moments calmes et les moments joyeux, et finir sur la sortie de l'église$t$, false, 4)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F36$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Premier montage à partir d'une transcription$t$, $t$Rôle : Vous m'aidez à préparer le montage d'une vidéo à partir de son texte. Vous coupez, vous ne réécrivez pas. Vous montrez l'addition des durées.

Contexte : La vidéo et son public : {{video}}. La durée visée : {{duree}}. Ce que dit la vidéo, passage par passage : {{transcription}}. Mon débit de parole : {{repere}}.

Travail demandé :
1. Les passages gardés, dans l'ordre, avec la durée de chacun.
2. L'addition des durées, qui ne dépasse pas la durée visée.
3. La liste des coupes : chaque passage retiré, et pourquoi.
4. La première phrase de la vidéo, choisie parmi ce qui est dit, pour donner envie de rester.
5. Ce que je peux faire des passages retirés : une autre vidéo, le texte de la publication.

Format : un tableau (ordre, passage, durée, gardé ou coupé), puis l'addition.

Règle : n'ajoutez aucun mot à ce qui est dit et ne changez le sens d'aucune phrase. Si la durée d'un passage manque, demandez-la. Gardez tels quels les noms et les chiffres.$t$, 2, $t$Une IA peut se tromper dans un calcul. Vérifiez chaque total.$t$, 1, '2026-10-04' from taches t
  where t.code = $t$F37$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$video$t$, $t$Quelle est la vidéo, et à qui s'adresse-t-elle ?$t$, $t$texte$t$, null::jsonb, $t$une vidéo de conseils pour entretenir des tresses, pour mes abonnées sur TikTok$t$, true, 1),
    ($t$duree$t$, $t$Quelle durée visez-vous ?$t$, $t$texte$t$, null::jsonb, $t$30 secondes$t$, true, 2),
    ($t$transcription$t$, $t$Que dit la vidéo, passage par passage ?$t$, $t$long$t$, null::jsonb, $t$salutation et présentation, 20 secondes ; pourquoi les tresses s'abîment, 25 secondes ; conseil 1, protéger les cheveux la nuit, 15 secondes ; une parenthèse sur une cliente, 20 secondes ; conseil 2, hydrater le cuir chevelu deux fois par semaine, 15 secondes ; mes tarifs et mon numéro, 25 secondes$t$, true, 3),
    ($t$repere$t$, $t$Quel est votre débit de parole ?$t$, $t$texte$t$, null::jsonb, $t$je dis environ 25 mots en 10 secondes$t$, false, 4)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F37$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Création et traduction de sous-titres$t$, $t$Rôle : Vous m'aidez à préparer les sous-titres d'une vidéo, puis leur traduction.

Contexte : La vidéo, et où elle sera vue : {{video}}. Ce qui est dit : {{texte}}. Les langues demandées : {{langues}}. Les noms et les chiffres à vérifier : {{corrections}}.

Travail demandé :
1. Le texte corrigé : orthographe, ponctuation, noms et chiffres. Sans changer les mots de la personne.
2. Les sous-titres numérotés : une ou deux lignes courtes chacun, une idée par sous-titre.
3. La traduction, si elle est demandée, avec le même nombre de sous-titres et la même numérotation.
4. Les passages où la traduction est incertaine, signalés, à faire relire.
5. Le texte de la publication, en 2 lignes.

Format : une liste numérotée par langue, prête à saisir dans une application de montage.

Règle : ne résumez pas et n'ajoutez rien : les sous-titres disent ce que la personne dit. Coupez une phrase longue à un endroit naturel. Si vous n'êtes pas sûr d'un mot, signalez-le au lieu de le deviner.$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F38$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$video$t$, $t$Quelle est la vidéo, et où sera-t-elle vue ?$t$, $t$texte$t$, null::jsonb, $t$une vidéo de 30 secondes qui présente trois téléphones, publiée sur Facebook et vue sur téléphone$t$, true, 1),
    ($t$texte$t$, $t$Que dit la vidéo ?$t$, $t$long$t$, null::jsonb, $t$Bonjour à tous. Aujourd'hui je vous présente trois téléphones arrivés cette semaine. Le premier a une grande batterie. Le deuxième fait de belles photos, même le soir. Le troisième est le moins cher des trois, parfait pour un premier téléphone. Écrivez-moi sur WhatsApp pour les prix.$t$, true, 2),
    ($t$langues$t$, $t$Dans quelles langues voulez-vous les sous-titres ?$t$, $t$texte$t$, null::jsonb, $t$en français seulement$t$, true, 3),
    ($t$corrections$t$, $t$Quels noms ou quels chiffres faut-il vérifier ?$t$, $t$texte$t$, null::jsonb, $t$aucun nom propre ; ne changez aucun mot$t$, false, 4)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F38$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Nettoyage d'un enregistrement vocal$t$, $t$Rôle : Vous m'aidez à nettoyer un enregistrement vocal, à partir de ma description.

Contexte : L'enregistrement et son usage : {{enregistrement}}. Ce qui gêne à l'écoute : {{defauts}}. L'application que j'utilise : {{outil}}. Ce que je peux réenregistrer : {{refaire}}.

Travail demandé :
1. Le classement de chaque défaut : il se corrige, il s'atténue seulement, ou il ne se répare pas.
2. L'ordre des corrections, étape par étape, avec le nom courant du réglage à chercher dans mon application.
3. Les passages à couper ou à réenregistrer, et pourquoi.
4. Ce que je dois réécouter à la fin, au casque puis sur le haut-parleur d'un téléphone.
5. Trois gestes simples pour que le prochain enregistrement soit propre dès la prise.

Format : un tableau (défaut, classement, correction), puis les étapes numérotées.

Règle : partez seulement de ma description : vous n'avez pas entendu l'enregistrement. Ne promettez pas qu'un défaut disparaîtra. Si vous ne connaissez pas mon application, donnez le nom courant du réglage, sans inventer de menu. Rappelez de travailler sur une copie. Ne proposez jamais de modifier ce qu'une personne a dit.$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F39$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$enregistrement$t$, $t$Quel est l'enregistrement, et à quoi sert-il ?$t$, $t$texte$t$, null::jsonb, $t$une leçon audio de 6 minutes, enregistrée au téléphone, pour mon groupe WhatsApp d'apprenants$t$, true, 1),
    ($t$defauts$t$, $t$Qu'est-ce qui gêne à l'écoute, et à quel moment ?$t$, $t$long$t$, null::jsonb, $t$la pièce résonne ; un ventilateur tourne en fond pendant toute la leçon ; je dis souvent « euh » et l'on entend de longues respirations ; ma voix baisse à la fin des phrases ; à 2 minutes 10, un klaxon couvre trois mots$t$, true, 2),
    ($t$outil$t$, $t$Quelle application utilisez-vous pour le son ?$t$, $t$texte$t$, null::jsonb, $t$l'application de montage de mon téléphone$t$, true, 3),
    ($t$refaire$t$, $t$Que pouvez-vous réenregistrer ?$t$, $t$choix$t$, $j$["Rien", "Une phrase ou deux", "Tout l'enregistrement"]$j$::jsonb, $t$Une phrase ou deux$t$, true, 4)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F39$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Recadrage vidéo pour différents formats$t$, $t$Rôle : Vous m'aidez à préparer le recadrage d'une vidéo dans d'autres formats.

Contexte : La vidéo d'origine et son format : {{video}}. Les plans, et où se trouve le sujet dans l'image : {{plans}}. Les formats demandés : {{formats}}. Les textes et les logos présents à l'image : {{textes}}.

Travail demandé :
1. Pour chaque format demandé et pour chaque plan : ce qui reste dans le cadre, et ce qui est perdu.
2. Le cadrage conseillé : sur quoi centrer, ou garder le plan entier avec des bandes.
3. Les plans qui posent un problème, et la solution pour chacun.
4. L'endroit où replacer chaque texte et chaque logo, loin des bords.
5. Ce que je dois vérifier sur un téléphone avant de publier.

Format : un tableau par format (plan, ce qui reste, ce qui est perdu, cadrage conseillé), puis la liste des vérifications.

Règle : partez seulement de ma liste : vous n'avez pas vu la vidéo. Ne coupez jamais un visage ni un texte. Quand un plan ne tient pas dans un format, dites-le au lieu de forcer le cadrage. Ne dites pas qu'une application recadre seule gratuitement : vous ne connaissez pas ma version.$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F40$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$video$t$, $t$Quelle est la vidéo, et quel est son format d'origine ?$t$, $t$texte$t$, null::jsonb, $t$une vidéo verticale de 30 secondes, filmée au téléphone, pour une boutique de bazin$t$, true, 1),
    ($t$plans$t$, $t$Quels sont les plans, et où se trouve le sujet dans l'image ?$t$, $t$long$t$, null::jsonb, $t$plan 1 : la vendeuse debout présente un bazin, on la voit de la tête aux pieds ; plan 2 : gros plan sur le tissu, qui remplit toute l'image ; plan 3 : une cliente tourne sur elle-même pour montrer sa tenue ; plan 4 : le numéro WhatsApp écrit en bas de l'image$t$, true, 2),
    ($t$formats$t$, $t$Quels formats voulez-vous ?$t$, $t$texte$t$, null::jsonb, $t$carré pour Facebook, horizontal pour l'écran de la boutique$t$, true, 3),
    ($t$textes$t$, $t$Quels textes ou quels logos sont à l'image ?$t$, $t$texte$t$, null::jsonb, $t$le numéro WhatsApp, en bas : c'est un texte que je peux déplacer dans mon projet de montage$t$, false, 4)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F40$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Voix off et doublage traduit$t$, $t$Rôle : Vous m'aidez à écrire la voix off d'une vidéo, puis sa version traduite, à la bonne durée. Vous montrez vos calculs.

Contexte : La vidéo et son public : {{video}}. Les plans et leur durée : {{plans}}. Ce que la voix doit faire comprendre : {{message}}. Mon débit de lecture : {{repere}}. La langue de la version traduite : {{langue}}.

Travail demandé :
1. Le nombre de mots au plus pour chaque plan, calculé avec mon débit. Montrez le calcul.
2. Le texte de la voix off, plan par plan, avec son nombre de mots.
3. La version traduite, plan par plan, ajustée pour tenir dans la même durée.
4. Les passages où la traduction est incertaine, signalés, à faire relire.
5. Le total des mots de chaque version, comparé au total permis.

Format : un tableau par langue (plan, durée, mots au plus, texte, nombre de mots).

Règle : des phrases courtes, faites pour être dites à voix haute. N'inventez ni chiffre, ni promesse, ni nom. Si un texte dépasse, raccourcissez-le. Si vous ne maîtrisez pas bien la langue demandée, dites-le au lieu de traduire à peu près.$t$, 2, $t$Une IA peut se tromper dans un calcul. Vérifiez chaque total.$t$, 1, '2026-10-04' from taches t
  where t.code = $t$F41$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$video$t$, $t$Quelle est la vidéo, et à qui s'adresse-t-elle ?$t$, $t$texte$t$, null::jsonb, $t$une vidéo de 30 secondes sur la fabrication d'un pagne Faso Dan Fani, pour ma page Facebook$t$, true, 1),
    ($t$plans$t$, $t$Quels sont les plans, et combien dure chacun ?$t$, $t$long$t$, null::jsonb, $t$plan 1 : les fils teints sèchent au soleil, 5 secondes ; plan 2 : une tisserande travaille au métier à tisser, 10 secondes ; plan 3 : gros plan sur le motif, 5 secondes ; plan 4 : le pagne plié, puis porté, 10 secondes$t$, true, 2),
    ($t$message$t$, $t$Que doit faire comprendre la voix ?$t$, $t$texte$t$, null::jsonb, $t$chaque pagne est tissé à la main, dans mon atelier$t$, true, 3),
    ($t$repere$t$, $t$Quel est votre débit de lecture ?$t$, $t$texte$t$, null::jsonb, $t$je lis 22 mots en 10 secondes$t$, true, 4),
    ($t$langue$t$, $t$Dans quelle langue voulez-vous la version traduite ?$t$, $t$texte$t$, null::jsonb, $t$en anglais, pour des acheteurs à l'étranger$t$, false, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F41$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Génération de séquences vidéo d'illustration$t$, $t$Rôle : Vous m'aidez à préparer de courtes séquences vidéo d'illustration.

Contexte : La vidéo à illustrer et son public : {{propos}}. Les moments à illustrer : {{sequences}}. Le format : {{format}}. Comment je produirai les séquences : {{moyen}}. Ce qui doit rester vrai : {{vrai}}.

Travail demandé :
1. Le découpage : une séquence par action, avec sa durée.
2. Pour chaque séquence : ce qu'on voit, le cadre, la lumière et le mouvement, en une phrase précise.
3. Les séquences qui ne doivent pas être créées par une IA, parce qu'elles montreraient comme vrai ce qui ne l'est pas.
4. Pour chaque séquence : la consigne prête à coller dans un outil qui crée de la vidéo, ou les indications pour la filmer au téléphone, selon mon moyen.
5. Ce que je dois vérifier sur chaque séquence avant de publier.

Format : un tableau (séquence, durée, description, consigne ou indications), puis la liste des vérifications.

Règle : une seule action par séquence, sans texte dans l'image. Dans une séquence créée par une IA : aucune personne réelle, aucune marque, aucun logo. Ne dites pas qu'un outil crée la vidéo gratuitement : vous ne connaissez pas mon abonnement.$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F42$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$propos$t$, $t$Quelle vidéo voulez-vous illustrer, et pour qui ?$t$, $t$texte$t$, null::jsonb, $t$une introduction de 15 secondes pour la page Facebook d'une pâtisserie$t$, true, 1),
    ($t$sequences$t$, $t$Quels moments voulez-vous illustrer ?$t$, $t$long$t$, null::jsonb, $t$séquence 1 : la vapeur monte au-dessus d'une tasse de thé ; séquence 2 : un gâteau que l'on coupe ; séquence 3 : une main pose l'assiette sur la table ; 5 secondes chacune$t$, true, 2),
    ($t$format$t$, $t$Quel format voulez-vous ?$t$, $t$choix$t$, $j$["Vertical", "Carré", "Horizontal"]$j$::jsonb, $t$Vertical$t$, true, 3),
    ($t$moyen$t$, $t$Comment produirez-vous les séquences ?$t$, $t$choix$t$, $j$["Un outil qui crée de la vidéo", "Mon téléphone", "Je ne sais pas encore"]$j$::jsonb, $t$Mon téléphone$t$, true, 4),
    ($t$vrai$t$, $t$Qu'est-ce qui doit rester vrai ?$t$, $t$texte$t$, null::jsonb, $t$les gâteaux sont ceux de la pâtisserie : ils se filment, ils ne s'inventent pas$t$, true, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F42$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

-- La note par IA : la même pour les 12 modèles
insert into conseils_ia (modele_id, ia, conseil) select mp.id, v.ia, v.conseil
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$chatgpt$t$, $t$Ouvrez la conversation dans le projet de votre kit, pour que vos instructions s'appliquent. Si la skill de la tâche est installée, ChatGPT s'en sert seul.$t$),
    ($t$claude$t$, $t$Ouvrez la conversation dans le projet de votre kit. Si la skill de la tâche est installée, Claude s'en sert seul.$t$),
    ($t$gemini$t$, $t$Ouvrez le Gem de la tâche quand il y en a un, sinon collez la consigne dans le Gem de votre kit.$t$),
    ($t$meta_ai$t$, $t$Collez d'abord la configuration de votre kit, puis la consigne.$t$),
    ($t$copilot$t$, $t$Collez d'abord la configuration de votre kit, puis la consigne.$t$)
  ) as v(ia, conseil)
  where t.code in ($t$F02$t$, $t$F09$t$, $t$F28$t$, $t$F34$t$, $t$F35$t$, $t$F36$t$, $t$F37$t$, $t$F38$t$, $t$F39$t$, $t$F40$t$, $t$F41$t$, $t$F42$t$)
  on conflict (modele_id, ia) do update set conseil = excluded.conseil;

-- F09 : note propre à cette tâche, pour ChatGPT, Claude, Gemini
insert into conseils_ia (modele_id, ia, conseil) select mp.id, v.ia, v.conseil
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$chatgpt$t$, $t$Ouvrez la conversation dans le projet de votre kit. ChatGPT peut créer l'image dans la même conversation : avec un compte gratuit, le nombre d'images est limité.$t$),
    ($t$claude$t$, $t$Claude ne crée ni photo ni illustration. Il rédige le brief et la consigne : collez ensuite la consigne dans ChatGPT, dans Gemini ou dans votre outil de mise en page.$t$),
    ($t$gemini$t$, $t$Ouvrez le Gem de votre kit. Gemini peut créer l'image dans la même conversation : sans abonnement, le nombre d'images est limité et se renouvelle au fil des heures.$t$)
  ) as v(ia, conseil)
  where t.code = $t$F09$t$
  on conflict (modele_id, ia) do update set conseil = excluded.conseil;

-- F34 : note propre à cette tâche, pour ChatGPT, Claude, Gemini
insert into conseils_ia (modele_id, ia, conseil) select mp.id, v.ia, v.conseil
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$chatgpt$t$, $t$Ouvrez la conversation dans le projet de votre kit. ChatGPT peut retoucher une photo que vous envoyez : avec un compte gratuit, le nombre d'images et d'envois de fichiers est limité.$t$),
    ($t$claude$t$, $t$Claude ne retouche pas une image. Il lit la photo que vous envoyez et rédige la liste des retouches et la consigne, à utiliser dans un autre outil.$t$),
    ($t$gemini$t$, $t$Ouvrez le Gem de votre kit. Gemini peut retoucher une photo que vous envoyez, dans une limite. La retouche d'image est réservée aux comptes de 18 ans et plus.$t$)
  ) as v(ia, conseil)
  where t.code = $t$F34$t$
  on conflict (modele_id, ia) do update set conseil = excluded.conseil;

-- F36 : note propre à cette tâche, pour ChatGPT, Claude, Gemini
insert into conseils_ia (modele_id, ia, conseil) select mp.id, v.ia, v.conseil
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$chatgpt$t$, $t$Ouvrez la conversation dans le projet de votre kit. Collez la liste de vos plans : c'est le plus sûr. Avec un compte gratuit, l'envoi de fichiers est limité et la lecture d'une vidéo peut être incomplète.$t$),
    ($t$claude$t$, $t$Ouvrez la conversation dans le projet de votre kit. Claude ne lit ni la vidéo ni le son : collez la liste de vos plans.$t$),
    ($t$gemini$t$, $t$Ouvrez le Gem de votre kit et collez la liste de vos plans. Sans abonnement, Gemini accepte aussi une vidéo de 5 minutes au plus.$t$)
  ) as v(ia, conseil)
  where t.code = $t$F36$t$
  on conflict (modele_id, ia) do update set conseil = excluded.conseil;

-- F37 : note propre à cette tâche, pour ChatGPT, Claude, Gemini
insert into conseils_ia (modele_id, ia, conseil) select mp.id, v.ia, v.conseil
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$chatgpt$t$, $t$Ouvrez la conversation dans le projet de votre kit. Collez le texte de la vidéo : c'est le plus sûr. Avec un compte gratuit, l'envoi de fichiers est limité.$t$),
    ($t$claude$t$, $t$Ouvrez la conversation dans le projet de votre kit. Claude ne lit ni la vidéo ni le son : collez le texte de la vidéo.$t$),
    ($t$gemini$t$, $t$Ouvrez le Gem de votre kit et collez le texte. Sans abonnement, Gemini accepte aussi un enregistrement de 10 minutes au plus ou une vidéo de 5 minutes au plus, et peut en écrire le texte.$t$)
  ) as v(ia, conseil)
  where t.code = $t$F37$t$
  on conflict (modele_id, ia) do update set conseil = excluded.conseil;

-- F38 : note propre à cette tâche, pour ChatGPT, Claude, Gemini
insert into conseils_ia (modele_id, ia, conseil) select mp.id, v.ia, v.conseil
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$chatgpt$t$, $t$Ouvrez la conversation dans le projet de votre kit. Collez le texte de la vidéo : c'est le plus sûr. Avec un compte gratuit, l'envoi de fichiers est limité.$t$),
    ($t$claude$t$, $t$Ouvrez la conversation dans le projet de votre kit. Claude ne lit ni la vidéo ni le son : collez le texte de la vidéo.$t$),
    ($t$gemini$t$, $t$Ouvrez le Gem de votre kit et collez le texte. Sans abonnement, Gemini accepte aussi un enregistrement de 10 minutes au plus ou une vidéo de 5 minutes au plus, et peut en écrire le texte.$t$)
  ) as v(ia, conseil)
  where t.code = $t$F38$t$
  on conflict (modele_id, ia) do update set conseil = excluded.conseil;

-- F39 : note propre à cette tâche, pour ChatGPT, Claude, Gemini
insert into conseils_ia (modele_id, ia, conseil) select mp.id, v.ia, v.conseil
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$chatgpt$t$, $t$Ouvrez la conversation dans le projet de votre kit. Décrivez l'enregistrement par écrit : c'est le plus sûr. Le nettoyage se fait dans votre application.$t$),
    ($t$claude$t$, $t$Ouvrez la conversation dans le projet de votre kit. Claude ne lit pas le son : décrivez l'enregistrement par écrit. Le nettoyage se fait dans votre application.$t$),
    ($t$gemini$t$, $t$Ouvrez le Gem de votre kit et décrivez l'enregistrement. Sans abonnement, Gemini accepte aussi un enregistrement de 10 minutes au plus. Le nettoyage se fait dans votre application.$t$)
  ) as v(ia, conseil)
  where t.code = $t$F39$t$
  on conflict (modele_id, ia) do update set conseil = excluded.conseil;

-- F40 : note propre à cette tâche, pour ChatGPT, Claude, Gemini
insert into conseils_ia (modele_id, ia, conseil) select mp.id, v.ia, v.conseil
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$chatgpt$t$, $t$Ouvrez la conversation dans le projet de votre kit. Collez la liste de vos plans : c'est le plus sûr. Avec un compte gratuit, l'envoi de fichiers est limité et la lecture d'une vidéo peut être incomplète.$t$),
    ($t$claude$t$, $t$Ouvrez la conversation dans le projet de votre kit. Claude ne lit pas la vidéo : collez la liste de vos plans. Il peut lire une capture d'écran d'un plan.$t$),
    ($t$gemini$t$, $t$Ouvrez le Gem de votre kit et collez la liste de vos plans. Sans abonnement, Gemini accepte aussi une vidéo de 5 minutes au plus.$t$)
  ) as v(ia, conseil)
  where t.code = $t$F40$t$
  on conflict (modele_id, ia) do update set conseil = excluded.conseil;

-- F42 : note propre à cette tâche, pour ChatGPT, Claude, Gemini
insert into conseils_ia (modele_id, ia, conseil) select mp.id, v.ia, v.conseil
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$chatgpt$t$, $t$Ouvrez la conversation dans le projet de votre kit. En octobre 2026, ChatGPT ne crée pas de vidéo : il rédige le découpage et les consignes.$t$),
    ($t$claude$t$, $t$Ouvrez la conversation dans le projet de votre kit. Claude ne crée pas de vidéo : il rédige le découpage et les consignes.$t$),
    ($t$gemini$t$, $t$Ouvrez le Gem de votre kit. Gemini rédige le découpage et les consignes. Créer la vidéo dans Gemini demande un abonnement Google AI.$t$)
  ) as v(ia, conseil)
  where t.code = $t$F42$t$
  on conflict (modele_id, ia) do update set conseil = excluded.conseil;

-- 5. Les ressources
insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-marketing-chatgpt$t$, $t$configuration$t$, $t$Assistant marketing$t$, $t$Vous le complétez une fois avec les informations de votre activité : ensuite, l'IA connaît votre offre, vos clients, vos canaux, votre ton et votre budget à chaque conversation.$t$, $t$chatgpt$t$, $t$Vous êtes mon assistant marketing. Vous m'aidez à préparer mes contenus, mes publicités, mes visuels et mes vidéos courtes, et à lire les résultats de mes campagnes.

MON ACTIVITÉ
Mon entreprise ou mon client : [activité, ville]
Mon rôle : [chargé de marketing, community manager, gérant, indépendant]
Ce que nous vendons : [produits ou services, prix]
Nos clients : [qui ils sont, où ils sont]
Nos canaux : [page Facebook, TikTok, statuts WhatsApp, Instagram]
Notre ton et nos couleurs : [ton, couleurs, mots à éviter]
Mon budget publicitaire : [par jour ou par mois, en FCFA]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez les clients.
2. Montants écrits ainsi : 25 000 FCFA.
3. N'inventez jamais un prix, un résultat, un témoignage ou une promesse. S'il manque une information, demandez-la.
4. Pas de fausse urgence, pas de concurrent nommé.
5. Chaque contenu dit l'offre, le prix s'il est donné, et comment commander.
6. Montrez chaque calcul, pour que je le vérifie.
7. Image ou vidéo : rédigez le brief ou la consigne. Dites-le si vous ne pouvez pas la créer vous-même.
8. Textes prêts à coller : ni titre, ni astérisque.
9. Ne demandez jamais le nom complet ni le numéro d'un client.$t$, $j${"chatgpt": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre activité.", "Dans ChatGPT, choisissez un projet, puis Nouveau projet. Donnez-lui le nom « Mon marketing », puis Créer un projet.", "Ouvrez le menu « … » du projet, puis Paramètres du projet. Collez le texte dans le champ Instructions, puis Enregistrer."], "gratuit": "Oui. Les projets sont disponibles sur un compte gratuit, avec 5 fichiers par projet.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Autre possibilité : Paramètres, Personnalisation, Instructions personnalisées. Le texte s'applique alors à toutes vos conversations, dans la limite de 1 500 caractères.", "Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-marketing-claude$t$, $t$configuration$t$, $t$Assistant marketing$t$, $t$Vous le complétez une fois avec les informations de votre activité : ensuite, l'IA connaît votre offre, vos clients, vos canaux, votre ton et votre budget à chaque conversation.$t$, $t$claude$t$, $t$Vous êtes mon assistant marketing. Vous m'aidez à préparer mes contenus, mes publicités, mes visuels et mes vidéos courtes, et à lire les résultats de mes campagnes.

MON ACTIVITÉ
Mon entreprise ou mon client : [activité, ville]
Mon rôle : [chargé de marketing, community manager, gérant, indépendant]
Ce que nous vendons : [produits ou services, prix]
Nos clients : [qui ils sont, où ils sont]
Nos canaux : [page Facebook, TikTok, statuts WhatsApp, Instagram]
Notre ton et nos couleurs : [ton, couleurs, mots à éviter]
Mon budget publicitaire : [par jour ou par mois, en FCFA]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez les clients.
2. Montants écrits ainsi : 25 000 FCFA.
3. N'inventez jamais un prix, un résultat, un témoignage ou une promesse. S'il manque une information, demandez-la.
4. Pas de fausse urgence, pas de concurrent nommé.
5. Chaque contenu dit l'offre, le prix s'il est donné, et comment commander.
6. Montrez chaque calcul, pour que je le vérifie.
7. Image ou vidéo : rédigez le brief ou la consigne. Dites-le si vous ne pouvez pas la créer vous-même.
8. Textes prêts à coller : ni titre, ni astérisque.
9. Ne demandez jamais le nom complet ni le numéro d'un client.$t$, $j${"claude": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre activité.", "Dans Claude, ouvrez Projets, puis Nouveau projet. Donnez-lui le nom « Mon marketing », puis Créer un projet.", "Dans le projet, ouvrez Instructions, puis Ajouter. Collez le texte, puis Enregistrer les instructions."], "gratuit": "Oui, dans la limite de 5 projets.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-marketing-gemini$t$, $t$configuration$t$, $t$Assistant marketing$t$, $t$Vous le complétez une fois avec les informations de votre activité : ensuite, l'IA connaît votre offre, vos clients, vos canaux, votre ton et votre budget à chaque conversation.$t$, $t$gemini$t$, $t$Vous êtes mon assistant marketing. Vous m'aidez à préparer mes contenus, mes publicités, mes visuels et mes vidéos courtes, et à lire les résultats de mes campagnes.

MON ACTIVITÉ
Mon entreprise ou mon client : [activité, ville]
Mon rôle : [chargé de marketing, community manager, gérant, indépendant]
Ce que nous vendons : [produits ou services, prix]
Nos clients : [qui ils sont, où ils sont]
Nos canaux : [page Facebook, TikTok, statuts WhatsApp, Instagram]
Notre ton et nos couleurs : [ton, couleurs, mots à éviter]
Mon budget publicitaire : [par jour ou par mois, en FCFA]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez les clients.
2. Montants écrits ainsi : 25 000 FCFA.
3. N'inventez jamais un prix, un résultat, un témoignage ou une promesse. S'il manque une information, demandez-la.
4. Pas de fausse urgence, pas de concurrent nommé.
5. Chaque contenu dit l'offre, le prix s'il est donné, et comment commander.
6. Montrez chaque calcul, pour que je le vérifie.
7. Image ou vidéo : rédigez le brief ou la consigne. Dites-le si vous ne pouvez pas la créer vous-même.
8. Textes prêts à coller : ni titre, ni astérisque.
9. Ne demandez jamais le nom complet ni le numéro d'un client.$t$, $j${"gemini": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre activité.", "Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez « Assistant marketing ». Collez le texte dans Instructions, puis Enregistrer."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-calendrier-de-contenus$t$, $t$skill$t$, $t$Calendrier de contenus$t$, $t$Prépare le calendrier de contenus d'une période : un sujet, un format et un texte prêt à publier par jour et par réseau.$t$, null, $t$---
name: calendrier-de-contenus
description: Prépare le calendrier de contenus d'une période : un sujet, un format et un texte prêt à publier par jour et par réseau. À utiliser pour planifier les publications de la semaine.
---

# Calendrier de contenus

Quand l'utilisateur décrit ce qu'il veut mettre en avant, préparez son calendrier de publications.

## Avant d'écrire
Il vous faut : l'activité et la ville, les offres à mettre en avant avec leurs prix, les réseaux utilisés, le nombre de publications que l'utilisateur peut tenir par semaine, la période, et ce qu'il a déjà comme photos ou vidéos. S'il manque le rythme possible, demandez-le : mieux vaut trois publications tenues que sept abandonnées.

## Ce que vous livrez
1. Le calendrier en tableau : date, réseau, format, sujet, visuel à prévoir.
2. Le texte de chaque publication, prêt à coller, avec l'offre, le prix s'il est donné et la façon de commander.
3. Des sujets variés : l'offre, les coulisses, un conseil utile, une réponse à une question fréquente.
4. La liste des visuels et des vidéos à préparer, avec leur format.

## Règles
- Utilisez seulement les offres, les prix et les dates de l'utilisateur.
- Aucun témoignage inventé, aucun chiffre de résultat, aucune fausse urgence.
- Une fête ou une date du calendrier commercial ne se cite que si l'utilisateur la donne.
- Texte simple, sans titre ni astérisque. Montants écrits ainsi : 25 000 FCFA.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mon marketing »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$calendrier-de-contenus.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-annonce-publicitaire$t$, $t$skill$t$, $t$Annonce publicitaire$t$, $t$Rédige trois versions d'une publicité pour Facebook, Instagram ou TikTok, avec l'offre, le prix et la façon de commander.$t$, null, $t$---
name: annonce-publicitaire
description: Rédige trois versions d'une publicité pour Facebook, Instagram ou TikTok, avec l'offre, le prix et la façon de commander. À utiliser avant de lancer ou de modifier une publicité.
---

# Annonce publicitaire

Quand l'utilisateur décrit son offre, rédigez trois versions de la publicité, à tester l'une contre l'autre.

## Avant d'écrire
Il vous faut : le produit ou le service, le prix, à qui il s'adresse, la zone de livraison ou de service, la façon de commander, le budget et la durée, et le visuel prévu. S'il manque le prix ou la façon de commander, demandez-les.

## Ce que vous livrez
1. Trois versions, chacune avec un angle différent : le besoin du client, l'offre elle-même, la preuve que l'utilisateur possède vraiment.
2. Pour chaque version : une accroche d'une ligne, un texte de 4 lignes au plus, et l'appel à l'action.
3. Le message d'accueil à envoyer quand un client écrit sur WhatsApp.
4. La version à tester en premier, avec la raison, et ce qu'il faudra mesurer.

## Règles
- Aucun témoignage, aucun chiffre et aucune garantie que l'utilisateur n'a pas donnés.
- Pas de fausse urgence, pas de concurrent nommé, pas de promesse de résultat.
- Le prix et la zone sont dits clairement : cela évite les messages inutiles.
- Montants écrits ainsi : 25 000 FCFA.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mon marketing »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$annonce-publicitaire.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-brief-visuel$t$, $t$skill$t$, $t$Brief de visuel$t$, $t$Rédige le brief ou la consigne d'un visuel : sujet, style, couleurs, cadrage, format, texte à placer.$t$, null, $t$---
name: brief-visuel
description: Rédige le brief ou la consigne d'un visuel : sujet, style, couleurs, cadrage, format, texte à placer. À utiliser avant de créer ou de retoucher une image, avec une IA ou avec Canva.
---

# Brief de visuel

Quand l'utilisateur décrit le visuel qu'il veut, rédigez un brief clair, puis la consigne pour une IA qui crée des images.

## Avant d'écrire
Il vous faut : à quoi sert le visuel et où il sera publié, le sujet principal, l'ambiance voulue, les couleurs de la marque, le texte à placer sur l'image, le format, et ce qu'il ne faut pas montrer. Si une demande est vague (« joli », « moderne »), demandez un exemple ou proposez deux lectures précises.

## Ce que vous livrez
1. Le brief en 6 lignes : objectif, sujet, style, couleurs, cadrage et format, texte à placer.
2. La consigne prête à coller dans une IA qui crée des images, en une seule phrase longue et précise.
3. Deux variantes de la consigne, qui changent un seul élément chacune.
4. Ce qu'il faudra vérifier sur l'image obtenue : mains, texte écrit, produit fidèle, logo.

## Règles
- Vous dites ce qu'on veut voir, pas ce qu'on ne veut pas : une demande négative se traduit en demande précise.
- Le texte à afficher sur l'image s'ajoute de préférence après, dans Canva : une IA écrit souvent mal les mots.
- Jamais le visage ou le logo d'une personne ou d'une marque réelle sans son accord.
- Une photo de produit doit rester fidèle au produit vendu.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mon marketing »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$brief-visuel.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-script-video-courte$t$, $t$skill$t$, $t$Script de vidéo courte$t$, $t$Écrit le script d'une vidéo courte, plan par plan : ce qu'on voit, ce qu'on dit, le texte à l'écran, la durée.$t$, null, $t$---
name: script-video-courte
description: Écrit le script d'une vidéo courte, plan par plan : ce qu'on voit, ce qu'on dit, le texte à l'écran, la durée. À utiliser pour une vidéo TikTok, Reels ou un statut WhatsApp.
---

# Script de vidéo courte

Quand l'utilisateur décrit sa vidéo, écrivez un script simple, tournable avec un téléphone.

## Avant d'écrire
Il vous faut : l'objectif de la vidéo, où elle sera publiée, la durée visée, ce que l'utilisateur peut filmer (lieu, produit, personnes d'accord pour apparaître), et l'offre ou le message. S'il manque la durée, proposez 20 à 30 secondes et demandez son accord.

## Ce que vous livrez
1. Le script en tableau : numéro du plan, ce qu'on voit, ce qu'on dit, le texte à l'écran, la durée.
2. Une première phrase qui donne envie de rester, dite dans les trois premières secondes.
3. La durée totale, avec l'addition des plans.
4. Le texte de la publication et les sous-titres, en lignes courtes.

## Règles
- Des plans simples : une action par plan, filmée au téléphone, en format vertical sauf demande contraire.
- Aucune promesse et aucun chiffre que l'utilisateur n'a pas donnés.
- Une personne filmée ou enregistrée a donné son accord.
- Les durées s'additionnent : montrez le calcul.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mon marketing »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$script-video-courte.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-calendrier-editorial$t$, $t$document$t$, $t$Calendrier éditorial$t$, $t$Ce tableau planifie vos publications : pour chaque jour, le réseau, le format, le sujet, le texte prêt à publier, l'état du visuel et l'état de la publication.$t$, null, $t$Une ligne par publication : la date, le réseau, le format, le sujet, le texte prêt à publier, le visuel à faire ou prêt, et l'état.
Le jour de la semaine s'affiche seul à côté de la date.
Une publication prévue dont le visuel n'est pas prêt s'affiche en orange.
L'onglet « Résumé » compte les publications prévues, publiées, à rédiger, les visuels à faire, et les publications par réseau.
Le tableau ne publie rien : vous publiez vous-même, ou vous programmez dans l'outil de chaque réseau.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$calendrier-editorial.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/14WSMUgPp0p5Dr0DnHCVvSzP-NvtNsa_NAC1wqb_kKIU/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-suivi-campagnes$t$, $t$document$t$, $t$Suivi des campagnes$t$, $t$Ce tableau lit les résultats de vos publicités : vous écrivez le budget dépensé, les messages reçus et les ventes, il calcule le coût par message, le coût par vente et ce que rapporte chaque franc dépensé.$t$, null, $t$Une ligne par publicité ou par campagne : le réseau, les dates, le budget dépensé, les personnes touchées, les messages ou les clics, le nombre de ventes et leur montant.
Le coût par message, le coût par vente et les ventes pour 1 FCFA dépensé se calculent seuls.
Vous notez votre décision : garder, modifier, arrêter ou attendre.
L'onglet « Résumé » donne le total dépensé, le total des ventes, le coût moyen par message et par vente.
Les chiffres viennent de votre gestionnaire de publicités et de vos ventes réelles : le tableau n'en invente pas, et ne compare pas avec d'autres entreprises.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$suivi-des-campagnes.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1zun7c2anx0vuWeu51JsOV9597M8jeIu4LaJGZT_Gd3I/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-suivi-visuels-videos$t$, $t$document$t$, $t$Suivi des visuels et des vidéos$t$, $t$Ce tableau suit chaque visuel et chaque vidéo à produire : le type, le format, le brief, l'outil, la version, l'état et l'échéance. Il compte les jours restants et affiche un retard en rouge.$t$, null, $t$Une ligne par production : le type, la publication ou le client concerné, le format, le brief en une ligne, l'outil utilisé, le numéro de version, l'état et l'échéance.
Le nombre de jours restants se calcule seul : orange à 2 jours ou moins, rouge quand la date est dépassée.
L'onglet « Résumé » compte les productions à faire, en cours, à valider, en retard, et les productions par type.
Notez dans la remarque l'accord reçu quand une personne apparaît à l'image ou prête sa voix.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$suivi-des-visuels-et-des-videos.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1ISqzJnO1qm5LjEyvZIn-2OekbbdHTICCz1PQrI05uDw/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-brief-campagne$t$, $t$document$t$, $t$Brief de campagne$t$, $t$Ce document de deux pages au plus décrit une campagne avant de la lancer : l'objectif, la cible, l'offre, le message, les canaux, le budget, les visuels à produire, le calendrier et la mesure du résultat. Il se remplit sur le téléphone et s'envoie en PDF.$t$, null, $t$Il contient : l'objectif, la cible, l'offre et son prix, le message principal, les preuves que vous avez vraiment, les canaux, le budget et la durée, la liste des visuels et des vidéos, le calendrier, et les chiffres que vous suivrez.
Il n'annonce aucun résultat : il dit ce que vous allez faire et comment vous saurez si cela marche.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$brief-de-campagne.docx$t$, $t$https://docs.google.com/document/d/1CRRSppM76obRfzD5yPpmjjpb3D6LYQXeQebRM9b5T2c/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-contenus-lundi$t$, $t$routine$t$, $t$Contenus de la semaine, le lundi$t$, $t$Chaque lundi, l'IA vous rappelle de préparer les contenus de la semaine. Elle ne connaît pas vos offres du moment : vous collez ce que vous voulez mettre en avant, puis elle propose le calendrier et les textes prêts à publier.$t$, null, $t$Chaque lundi à 7 h 30, envoyez-moi ce message : « Bonjour. C'est lundi, préparons les contenus de la semaine. Collez ici ce que vous voulez mettre en avant : offres, prix, nouveautés, événements. Dites sur quels réseaux vous publiez et combien de fois, et les photos ou vidéos que vous avez déjà. »

Quand j'aurai collé mes notes :
1. Proposez le calendrier de la semaine : jour, réseau, format, sujet.
2. Rédigez le texte de chaque publication, prêt à coller.
3. Listez les visuels et les vidéos à préparer, avec leur format.
4. Proposez les statuts WhatsApp de la semaine, un par jour.

Règles : partez seulement de mes notes. N'inventez ni prix, ni témoignage, ni fausse urgence. Si une information manque, demandez-la.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mon marketing »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Mon marketing ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mon marketing »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant marketing »."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-campagnes-vendredi$t$, $t$routine$t$, $t$Bilan des campagnes, le vendredi$t$, $t$Chaque vendredi, l'IA vous rappelle de faire le bilan de vos publicités. Vous collez les chiffres de la semaine, puis elle calcule le coût par message et par vente, et dit ce qu'il faut garder, modifier ou arrêter.$t$, null, $t$Chaque vendredi à 16 h, envoyez-moi ce message : « Bonjour. C'est vendredi, faisons le bilan de vos publicités. Collez ici, pour chaque publicité : le budget dépensé, les messages ou les clics reçus, le nombre de ventes et leur montant. »

Quand j'aurai collé mes chiffres :
1. Calculez, pour chaque publicité, le coût par message et le coût par vente. Montrez chaque calcul.
2. Classez les publicités, de celle qui vend le mieux à celle qui vend le moins.
3. Dites quoi garder, quoi modifier, quoi arrêter, et ce qui manque de chiffres pour conclure.
4. Proposez un seul changement à tester la semaine prochaine.

Règles : utilisez seulement mes chiffres. Ne promettez aucun résultat. Avec moins de cinq ventes, dites que la conclusion reste fragile.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mon marketing »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Mon marketing ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mon marketing »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant marketing »."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

-- 6. Le kit : présentation, étapes d'installation, encadrés « À savoir », mots expliqués
insert into kits (metier_id, titre, presentation, etapes, prerequis, limites, a_savoir, mots, revu_le) select m.id, $t$Marketing$t$, $t$Tout ce qu'il faut pour planifier vos contenus, écrire une publicité, préparer un visuel ou une vidéo courte et lire les résultats d'une campagne, avec une IA gratuite, sur un téléphone Android : une configuration, quatre skills, quatre documents, deux routines et vingt-six tâches.$t$, $j$[{"numero": 1, "titre": "Configurer mon IA avec « Assistant marketing »", "minutes": 5}, {"numero": 2, "titre": "Installer mes 3 premières skills : calendrier de contenus, annonce publicitaire, brief de visuel", "minutes": 10}, {"numero": 3, "titre": "Copier mes documents : calendrier éditorial, suivi des campagnes, suivi des visuels et des vidéos", "minutes": 5}]$j$::jsonb, $j$["Un téléphone Android avec une connexion, même limitée.", "Vos pages et vos comptes : page Facebook, TikTok, WhatsApp Business, selon ce que vous utilisez.", "Un compte Google et les applications gratuites Google Sheets et Google Docs, pour ouvrir les documents.", "Une IA gratuite au choix : ChatGPT, Claude ou Gemini. Pour créer une image avec l'IA : ChatGPT ou Gemini."]$j$::jsonb, $j$["Il ne promet aucun résultat publicitaire. L'IA lit vos chiffres et propose : c'est vous qui décidez, et c'est le terrain qui tranche.", "Il n'invente ni témoignage, ni chiffre, ni fausse urgence, et ne vous aide pas à en écrire.", "Il ne crée pas vos vidéos à votre place : en octobre 2026, aucune des trois IA ne génère de vidéo avec un compte gratuit. L'IA prépare le script, le découpage et les consignes.", "Il ne remplace pas l'accord des personnes : n'utilisez ni la photo, ni la voix, ni le logo de quelqu'un sans son accord.", "Il ne vous demande jamais de coller dans une IA le nom complet ou le numéro d'un client."]$j$::jsonb, $j${"chatgpt": "OpenAI retire les GPT personnalisés le 11 décembre 2026 et les remplace par les plugins. Ce kit n'utilise donc aucun GPT personnalisé : votre configuration se colle dans un projet, et chaque skill s'ajoute dans la rubrique Plugins, onglet Skills, ou se colle au début de la conversation. Si vous avez déjà vos propres GPT, pensez à les convertir en plugins avant cette date.", "gemini": "Google remplace les Gems par les skills en novembre 2026. Vos Gems seront convertis automatiquement. Les étapes de ce kit seront mises à jour à ce moment-là, et vous serez prévenu dans l'application."}$j$::jsonb, $j$[{"mot": "Configuration", "phrase": "Un texte d'instructions que l'IA garde en mémoire, pour ne pas tout réexpliquer à chaque conversation."}, {"mot": "Projet", "phrase": "Un dossier de conversations qui partagent les mêmes instructions."}, {"mot": "Skill", "phrase": "Une consigne enregistrée que l'IA applique quand le sujet s'y prête."}, {"mot": "Consigne, ou prompt", "phrase": "Le texte que l'on écrit à l'IA pour lui demander un travail."}, {"mot": "Modèle à remplir", "phrase": "Une consigne déjà rédigée, où il ne reste qu'à remplir quelques champs."}, {"mot": "Champ", "phrase": "Une case du formulaire, à remplir avec vos propres informations."}, {"mot": "Routine", "phrase": "Une demande qui revient à jour fixe."}, {"mot": "Tâche planifiée", "phrase": "Une demande que l'IA lance seule, au jour choisi."}, {"mot": "Calendrier éditorial", "phrase": "Le tableau qui dit ce que vous publiez, où et quel jour."}, {"mot": "Publication", "phrase": "Un texte, une image ou une vidéo que vous mettez en ligne sur un réseau social."}, {"mot": "Statut", "phrase": "Une publication qui disparaît au bout de 24 heures, sur WhatsApp."}, {"mot": "Campagne", "phrase": "Une publicité payante, avec un budget, une durée et un public choisis."}, {"mot": "Budget publicitaire", "phrase": "La somme que vous acceptez de dépenser pour une campagne."}, {"mot": "Personnes touchées", "phrase": "Le nombre de personnes qui ont vu votre publicité au moins une fois."}, {"mot": "Coût par message", "phrase": "Le budget dépensé, divisé par le nombre de messages reçus grâce à la publicité."}, {"mot": "Brief", "phrase": "La description courte et précise de ce que l'on attend d'un visuel ou d'une vidéo."}, {"mot": "Visuel", "phrase": "Une image préparée pour être publiée : photo retouchée, affiche, flyer."}, {"mot": "Palette", "phrase": "Le petit groupe de couleurs utilisé dans un visuel."}, {"mot": "Format", "phrase": "La forme de l'image : verticale comme un téléphone tenu debout, carrée, ou horizontale comme un écran de télévision."}, {"mot": "Rushes", "phrase": "Tout ce qui a été filmé, avant le montage."}, {"mot": "Plan", "phrase": "Un morceau de vidéo filmé d'un seul trait."}, {"mot": "Séquence", "phrase": "Une courte suite d'images qui montre une seule action."}, {"mot": "Transcription", "phrase": "Le texte écrit de ce qui est dit dans une vidéo ou un enregistrement."}, {"mot": "Sous-titres", "phrase": "Le texte qui s'affiche en bas de la vidéo et reprend ce qui est dit."}, {"mot": "Voix off", "phrase": "La voix qui commente la vidéo sans que l'on voie la personne qui parle."}, {"mot": "Débit", "phrase": "Le nombre de mots que l'on dit en un temps donné."}, {"mot": "Recadrage", "phrase": "Le fait de changer ce que l'on garde de l'image, pour l'adapter à un autre format."}, {"mot": "Gem", "phrase": "Un assistant Gemini enregistré avec ses propres instructions, que l'on rouvre d'un geste."}, {"mot": "Plugin", "phrase": "Un ajout que l'on installe dans ChatGPT et qui contient des consignes prêtes à servir ; il remplace le GPT personnalisé."}]$j$::jsonb, '2026-10-04' from metiers m
  where m.slug = $t$marketing$t$
  on conflict (metier_id) do update set titre = excluded.titre, presentation = excluded.presentation, etapes = excluded.etapes, prerequis = excluded.prerequis, limites = excluded.limites, a_savoir = excluded.a_savoir, mots = excluded.mots, revu_le = excluded.revu_le;

-- 7. Les ressources du kit, dans l'ordre, avec leur étape d'installation
insert into kits_metier (metier_id, ressource_id, ordre, etape_installation) select m.id, r.id, v.ordre, v.etape
  from metiers m, ressources r,
  (values
    ($t$config-marketing-chatgpt$t$, 1, 1),
    ($t$config-marketing-claude$t$, 2, 1),
    ($t$config-marketing-gemini$t$, 3, 1),
    ($t$skill-calendrier-de-contenus$t$, 4, 2),
    ($t$skill-annonce-publicitaire$t$, 5, 2),
    ($t$skill-brief-visuel$t$, 6, 2),
    ($t$doc-calendrier-editorial$t$, 7, 3),
    ($t$doc-suivi-campagnes$t$, 8, 3),
    ($t$doc-suivi-visuels-videos$t$, 9, 3),
    ($t$skill-script-video-courte$t$, 10, null::integer),
    ($t$doc-brief-campagne$t$, 11, null::integer),
    ($t$routine-contenus-lundi$t$, 12, null::integer),
    ($t$routine-campagnes-vendredi$t$, 13, null::integer)
  ) as v(cle, ordre, etape)
  where m.slug = $t$marketing$t$ and r.cle = v.cle
  on conflict (metier_id, ressource_id) do update set ordre = excluded.ordre, etape_installation = excluded.etape_installation;

-- 8. Quelles ressources servent à quelles tâches
insert into ressources_taches (ressource_id, tache_id) select r.id, t.id
  from ressources r, taches t,
  (values
    ($t$skill-calendrier-de-contenus$t$, $t$F02$t$),
    ($t$doc-calendrier-editorial$t$, $t$F02$t$),
    ($t$routine-contenus-lundi$t$, $t$F02$t$),
    ($t$config-marketing-chatgpt$t$, $t$F02$t$),
    ($t$config-marketing-claude$t$, $t$F02$t$),
    ($t$config-marketing-gemini$t$, $t$F02$t$),
    ($t$skill-brief-visuel$t$, $t$F09$t$),
    ($t$doc-suivi-visuels-videos$t$, $t$F09$t$),
    ($t$doc-brief-campagne$t$, $t$F09$t$),
    ($t$config-marketing-chatgpt$t$, $t$F09$t$),
    ($t$config-marketing-claude$t$, $t$F09$t$),
    ($t$config-marketing-gemini$t$, $t$F09$t$),
    ($t$skill-annonce-publicitaire$t$, $t$F28$t$),
    ($t$doc-suivi-campagnes$t$, $t$F28$t$),
    ($t$routine-campagnes-vendredi$t$, $t$F28$t$),
    ($t$config-marketing-chatgpt$t$, $t$F28$t$),
    ($t$config-marketing-claude$t$, $t$F28$t$),
    ($t$config-marketing-gemini$t$, $t$F28$t$),
    ($t$skill-brief-visuel$t$, $t$F34$t$),
    ($t$doc-suivi-visuels-videos$t$, $t$F34$t$),
    ($t$config-marketing-chatgpt$t$, $t$F34$t$),
    ($t$config-marketing-claude$t$, $t$F34$t$),
    ($t$config-marketing-gemini$t$, $t$F34$t$),
    ($t$skill-brief-visuel$t$, $t$F35$t$),
    ($t$doc-suivi-visuels-videos$t$, $t$F35$t$),
    ($t$config-marketing-chatgpt$t$, $t$F35$t$),
    ($t$config-marketing-claude$t$, $t$F35$t$),
    ($t$config-marketing-gemini$t$, $t$F35$t$),
    ($t$skill-script-video-courte$t$, $t$F36$t$),
    ($t$doc-suivi-visuels-videos$t$, $t$F36$t$),
    ($t$config-marketing-chatgpt$t$, $t$F36$t$),
    ($t$config-marketing-claude$t$, $t$F36$t$),
    ($t$config-marketing-gemini$t$, $t$F36$t$),
    ($t$skill-script-video-courte$t$, $t$F37$t$),
    ($t$doc-suivi-visuels-videos$t$, $t$F37$t$),
    ($t$config-marketing-chatgpt$t$, $t$F37$t$),
    ($t$config-marketing-claude$t$, $t$F37$t$),
    ($t$config-marketing-gemini$t$, $t$F37$t$),
    ($t$skill-script-video-courte$t$, $t$F38$t$),
    ($t$doc-suivi-visuels-videos$t$, $t$F38$t$),
    ($t$config-marketing-chatgpt$t$, $t$F38$t$),
    ($t$config-marketing-claude$t$, $t$F38$t$),
    ($t$config-marketing-gemini$t$, $t$F38$t$),
    ($t$doc-suivi-visuels-videos$t$, $t$F39$t$),
    ($t$config-marketing-chatgpt$t$, $t$F39$t$),
    ($t$config-marketing-claude$t$, $t$F39$t$),
    ($t$config-marketing-gemini$t$, $t$F39$t$),
    ($t$doc-suivi-visuels-videos$t$, $t$F40$t$),
    ($t$doc-calendrier-editorial$t$, $t$F40$t$),
    ($t$config-marketing-chatgpt$t$, $t$F40$t$),
    ($t$config-marketing-claude$t$, $t$F40$t$),
    ($t$config-marketing-gemini$t$, $t$F40$t$),
    ($t$skill-script-video-courte$t$, $t$F41$t$),
    ($t$doc-suivi-visuels-videos$t$, $t$F41$t$),
    ($t$config-marketing-chatgpt$t$, $t$F41$t$),
    ($t$config-marketing-claude$t$, $t$F41$t$),
    ($t$config-marketing-gemini$t$, $t$F41$t$),
    ($t$skill-script-video-courte$t$, $t$F42$t$),
    ($t$skill-brief-visuel$t$, $t$F42$t$),
    ($t$doc-suivi-visuels-videos$t$, $t$F42$t$),
    ($t$config-marketing-chatgpt$t$, $t$F42$t$),
    ($t$config-marketing-claude$t$, $t$F42$t$),
    ($t$config-marketing-gemini$t$, $t$F42$t$),
    ($t$config-marketing-chatgpt$t$, $t$F01$t$),
    ($t$config-marketing-claude$t$, $t$F01$t$),
    ($t$config-marketing-gemini$t$, $t$F01$t$),
    ($t$config-marketing-chatgpt$t$, $t$F03$t$),
    ($t$config-marketing-claude$t$, $t$F03$t$),
    ($t$config-marketing-gemini$t$, $t$F03$t$),
    ($t$doc-brief-campagne$t$, $t$F03$t$),
    ($t$config-marketing-chatgpt$t$, $t$F04$t$),
    ($t$config-marketing-claude$t$, $t$F04$t$),
    ($t$config-marketing-gemini$t$, $t$F04$t$),
    ($t$config-marketing-chatgpt$t$, $t$F05$t$),
    ($t$config-marketing-claude$t$, $t$F05$t$),
    ($t$config-marketing-gemini$t$, $t$F05$t$),
    ($t$doc-calendrier-editorial$t$, $t$F05$t$),
    ($t$config-marketing-chatgpt$t$, $t$F07$t$),
    ($t$config-marketing-claude$t$, $t$F07$t$),
    ($t$config-marketing-gemini$t$, $t$F07$t$),
    ($t$config-marketing-chatgpt$t$, $t$F08$t$),
    ($t$config-marketing-claude$t$, $t$F08$t$),
    ($t$config-marketing-gemini$t$, $t$F08$t$),
    ($t$doc-suivi-campagnes$t$, $t$F08$t$),
    ($t$routine-campagnes-vendredi$t$, $t$F08$t$),
    ($t$config-marketing-chatgpt$t$, $t$F10$t$),
    ($t$config-marketing-claude$t$, $t$F10$t$),
    ($t$config-marketing-gemini$t$, $t$F10$t$),
    ($t$config-marketing-chatgpt$t$, $t$F13$t$),
    ($t$config-marketing-claude$t$, $t$F13$t$),
    ($t$config-marketing-gemini$t$, $t$F13$t$),
    ($t$config-marketing-chatgpt$t$, $t$F14$t$),
    ($t$config-marketing-claude$t$, $t$F14$t$),
    ($t$config-marketing-gemini$t$, $t$F14$t$),
    ($t$config-marketing-chatgpt$t$, $t$F15$t$),
    ($t$config-marketing-claude$t$, $t$F15$t$),
    ($t$config-marketing-gemini$t$, $t$F15$t$),
    ($t$doc-brief-campagne$t$, $t$F15$t$),
    ($t$config-marketing-chatgpt$t$, $t$F16$t$),
    ($t$config-marketing-claude$t$, $t$F16$t$),
    ($t$config-marketing-gemini$t$, $t$F16$t$),
    ($t$doc-calendrier-editorial$t$, $t$F16$t$),
    ($t$routine-contenus-lundi$t$, $t$F16$t$),
    ($t$config-marketing-chatgpt$t$, $t$F17$t$),
    ($t$config-marketing-claude$t$, $t$F17$t$),
    ($t$config-marketing-gemini$t$, $t$F17$t$),
    ($t$skill-annonce-publicitaire$t$, $t$F17$t$),
    ($t$config-marketing-chatgpt$t$, $t$F26$t$),
    ($t$config-marketing-claude$t$, $t$F26$t$),
    ($t$config-marketing-gemini$t$, $t$F26$t$),
    ($t$config-marketing-chatgpt$t$, $t$F27$t$),
    ($t$config-marketing-claude$t$, $t$F27$t$),
    ($t$config-marketing-gemini$t$, $t$F27$t$),
    ($t$skill-annonce-publicitaire$t$, $t$F27$t$),
    ($t$doc-suivi-campagnes$t$, $t$F27$t$)
  ) as v(cle, code)
  where r.cle = v.cle and t.code = v.code
  on conflict (ressource_id, tache_id) do nothing;

-- 9. Contrôle final : si quelque chose manque, tout est annulé.
do $controle$
declare
  n integer;
begin
  if not exists (select 1 from metiers where slug = $t$marketing$t$ and description_local is not null) then
    raise exception 'Métier introuvable : marketing';
  end if;
  select count(*) into n from (values
    ($t$F02$t$, $t$Création et planification de contenus pour les réseaux sociaux$t$),
    ($t$F09$t$, $t$Génération d'images et de visuels marketing$t$),
    ($t$F28$t$, $t$Optimisation des paramètres publicitaires$t$),
    ($t$F34$t$, $t$Retouche d'image et modification d'éléments$t$),
    ($t$F35$t$, $t$Variantes de couleurs d'un visuel$t$),
    ($t$F36$t$, $t$Recherche de plans dans les rushes vidéo$t$),
    ($t$F37$t$, $t$Premier montage à partir d'une transcription$t$),
    ($t$F38$t$, $t$Création et traduction de sous-titres$t$),
    ($t$F39$t$, $t$Nettoyage d'un enregistrement vocal$t$),
    ($t$F40$t$, $t$Recadrage vidéo pour différents formats$t$),
    ($t$F41$t$, $t$Voix off et doublage traduit$t$),
    ($t$F42$t$, $t$Génération de séquences vidéo d'illustration$t$)
  ) as v(code, titre) join taches t on t.code = v.code and t.titre = v.titre and t.resultat is not null;
  if n <> 12 then
    raise exception 'Tâches attendues : 12, trouvées avec le bon titre : %', n;
  end if;
  select count(*) into n from exercices e join taches t on t.id = e.tache_id
    where t.code in ($t$F02$t$, $t$F09$t$, $t$F28$t$, $t$F34$t$, $t$F35$t$, $t$F36$t$, $t$F37$t$, $t$F38$t$, $t$F39$t$, $t$F40$t$, $t$F41$t$, $t$F42$t$) and e.titre_local is not null and e.prenom is not null;
  if n <> 24 then
    raise exception 'Cas localisés attendus : 24, trouvés : %', n;
  end if;
  -- Chaque tâche du kit, neuve ou déjà écrite, a son modèle et ses deux cas localisés.
  select count(*) into n from taches t where t.code in ($t$F02$t$, $t$F09$t$, $t$F28$t$, $t$F34$t$, $t$F35$t$, $t$F36$t$, $t$F37$t$, $t$F38$t$, $t$F39$t$, $t$F40$t$, $t$F41$t$, $t$F42$t$, $t$F01$t$, $t$F03$t$, $t$F04$t$, $t$F05$t$, $t$F07$t$, $t$F08$t$, $t$F10$t$, $t$F13$t$, $t$F14$t$, $t$F15$t$, $t$F16$t$, $t$F17$t$, $t$F26$t$, $t$F27$t$)
    and exists (select 1 from modeles_prompts mp where mp.tache_id = t.id)
    and (select count(*) from exercices e where e.tache_id = t.id and e.titre_local is not null) = 2;
  if n <> 26 then
    raise exception 'Tâches complètes attendues : 26, trouvées : %', n;
  end if;
  select count(*) into n from kits_metier km join metiers m on m.id = km.metier_id where m.slug = $t$marketing$t$;
  if n <> 13 then
    raise exception 'Ressources du kit attendues : 13, trouvées : %', n;
  end if;
  -- Toutes les tâches du métier sont dans le kit, et aucune autre.
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id join taches t on t.id = mt.tache_id
    where m.slug = $t$marketing$t$ and t.code in ($t$F02$t$, $t$F09$t$, $t$F28$t$, $t$F34$t$, $t$F35$t$, $t$F36$t$, $t$F37$t$, $t$F38$t$, $t$F39$t$, $t$F40$t$, $t$F41$t$, $t$F42$t$, $t$F01$t$, $t$F03$t$, $t$F04$t$, $t$F05$t$, $t$F07$t$, $t$F08$t$, $t$F10$t$, $t$F13$t$, $t$F14$t$, $t$F15$t$, $t$F16$t$, $t$F17$t$, $t$F26$t$, $t$F27$t$);
  if n <> 26 then
    raise exception 'Tâches du métier attendues : 26, trouvées : %', n;
  end if;
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id where m.slug = $t$marketing$t$;
  if n <> 26 then
    raise exception 'Le métier a % tâches, le kit en couvre 26', n;
  end if;
  -- Chaque tâche du métier a au moins une ressource de ce kit.
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id
    where m.slug = $t$marketing$t$ and not exists (
      select 1 from ressources_taches rt join kits_metier km on km.ressource_id = rt.ressource_id
      where rt.tache_id = mt.tache_id and km.metier_id = m.id);
  if n <> 0 then
    raise exception 'Tâches du métier sans ressource du kit : %', n;
  end if;
end
$controle$;

commit;
