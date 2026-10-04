-- 0022 : contenu du kit « Vente / Commercial » (4 octobre 2026)
--
-- Ce fichier est fabriqué par un programme à partir du fichier source du kit :
-- les textes en sont copiés tels quels. Il ajoute :
--   - la description localisée du métier « Vente / Commercial », à côté de l'ancienne ;
--   - le résultat et les étapes de 19 tâches existantes (F01, F03, F04, F05, F06, F07, F08, F10, F11, F13, F14, F15, F16, F17, F18, F21, F22, F26, F27) ;
--   - 38 cas pratiques localisés, deux par tâche, écrits À CÔTÉ des anciens cas ;
--   - 19 modèles à remplir, leurs champs, leurs exemples et la note par IA ;
--   - 13 ressources : 3 configurations, 4 skills, 4 documents, 2 routines ;
--   - le kit : ses 3 étapes d'installation et le rattachement des ressources.
--
-- À exécuter APRÈS 0021_cas_localises.sql. Les anciens titres, cas et prompts
-- de ces tâches ne sont ni modifiés ni supprimés : le site en ligne continue
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
update metiers set description_local = $t$Pour toute personne qui vend pour une entreprise : chez un grossiste, un distributeur, une agence, une concession ou un opérateur. Vous travaillez avec WhatsApp, le téléphone et un tableau Google Sheets ou Excel.$t$
  where slug = $t$vente-commercial$t$;

-- 2. Les tâches, leur résultat et leurs étapes
update taches set resultat = $t$Vos messages classés par ordre d'urgence, avec pour chacun l'action à faire et une réponse courte prête à envoyer. La méthode vaut pour une boîte e-mail comme pour WhatsApp Business.$t$, etapes = $j$["Ouvrir sa boîte et relever les messages en attente, sans les traiter un par un.", "Résumer chaque message en une ligne, en retirant les noms et les numéros.", "Remplir le modèle et copier la consigne dans son IA.", "Vérifier le classement : vous seul savez ce qui est vraiment urgent.", "Envoyer les réponses courtes, puis noter les actions à faire dans votre agenda."]$j$::jsonb, precisions = $t$Ne collez jamais dans une IA un message qui contient un mot de passe, un code reçu par SMS, une pièce d'identité ou des coordonnées bancaires. Résumez-le en une ligne.$t$
  where code = $t$F01$t$;

update taches set resultat = $t$Un document prêt à envoyer (lettre, note, e-mail, offre), corrigé et mis au bon ton, avec la liste de ce qui a été changé.$t$, etapes = $j$["Rassembler ce que le document doit dire : à qui, pourquoi, les faits et les dates.", "Coller votre brouillon ou vos notes dans le modèle, puis copier la consigne dans son IA.", "Relire le résultat ligne par ligne : chaque date, chaque montant, chaque nom doit être exact.", "Mettre le texte en page dans Google Docs ou Word, puis l'envoyer en PDF."]$j$::jsonb, precisions = null
  where code = $t$F03$t$;

update taches set resultat = $t$Un compte rendu clair à partir de vos notes ou d'un enregistrement : l'essentiel en cinq lignes, les décisions, et la liste des actions avec un responsable et une date.$t$, etapes = $j$["Pendant la réunion ou le rendez-vous, noter ou dicter l'essentiel, même en vrac.", "Coller vos notes dans le modèle, sans nom complet ni numéro, puis copier la consigne dans son IA.", "Vérifier chaque décision et chaque date : l'IA ne sait que ce que vous lui donnez.", "Envoyer le compte rendu aux participants le jour même, sur WhatsApp ou par e-mail.", "Reporter les actions dans votre agenda ou dans votre tableau de suivi."]$j$::jsonb, precisions = $t$Gemini accepte un fichier audio de 10 minutes au plus sur un compte gratuit. Avec ChatGPT ou Claude, dictez vos notes avec le micro du clavier, ou tapez-les. N'enregistrez jamais une personne sans son accord.$t$
  where code = $t$F04$t$;

update taches set resultat = $t$Un planning de vos rendez-vous sans chevauchement, qui regroupe les déplacements, et le message de confirmation à envoyer à chaque personne.$t$, etapes = $j$["Lister les rendez-vous à placer, avec la durée de chacun et les contraintes de chaque personne.", "Noter vos propres créneaux libres et vos temps de trajet.", "Remplir le modèle et copier la consigne dans son IA.", "Vérifier le planning, puis saisir chaque rendez-vous dans l'agenda de votre téléphone, avec un rappel.", "Envoyer les confirmations sur WhatsApp, et rappeler la veille."]$j$::jsonb, precisions = $t$Avec Gemini, sur un compte Google personnel, les applications connectées permettent de lire et de créer des rendez-vous dans Google Agenda. Avec une autre IA, vous saisissez vous-même les rendez-vous dans l'agenda de votre téléphone.$t$
  where code = $t$F05$t$;

update taches set resultat = $t$Vos réponses toutes prêtes aux questions que vos clients posent le plus souvent, courtes et polies, à enregistrer comme réponses rapides dans WhatsApp Business. Une FAQ est la liste des questions fréquentes, avec leur réponse.$t$, etapes = $j$["Relever dans vos conversations les questions qui reviennent le plus.", "Noter pour chacune la réponse exacte : prix, délai, paiement, livraison.", "Remplir le modèle et copier la consigne dans son IA.", "Corriger tout ce qui n'est pas exact, puis enregistrer chaque réponse comme réponse rapide dans WhatsApp Business.", "Revoir la liste chaque mois, ou dès qu'un prix change."]$j$::jsonb, precisions = null
  where code = $t$F06$t$;

update taches set resultat = $t$Une note courte sur votre marché ou vos concurrents, qui sépare ce qui est vérifié de ce qui reste à vérifier, et qui finit par deux ou trois décisions possibles. La veille consiste à suivre régulièrement ce qui change autour de votre activité.$t$, etapes = $j$["Noter ce que vous avez vu ou entendu : prix, nouveautés, publicités, avis de clients.", "Indiquer pour chaque information d'où elle vient : vu vous-même, dit par un client, lu en ligne.", "Remplir le modèle et copier la consigne dans son IA.", "Vérifier vous-même les points signalés comme incertains, avant de décider.", "Refaire la note chaque mois, pour voir ce qui a changé."]$j$::jsonb, precisions = $t$Une IA peut chercher sur internet, même sur un compte gratuit, mais elle peut se tromper sur un prix ou sur une entreprise locale. Partez de ce que vous avez relevé vous-même, et demandez la source de toute information qu'elle ajoute.$t$
  where code = $t$F07$t$;

update taches set resultat = $t$Un rapport court tiré de vos chiffres : les totaux, ce qui monte, ce qui baisse, et deux ou trois décisions possibles. Chaque calcul est montré, pour que vous puissiez le vérifier.$t$, etapes = $j$["Rassembler vos chiffres dans un tableau : une ligne par jour, par semaine ou par produit.", "Retirer les noms et les numéros des clients.", "Remplir le modèle et copier la consigne dans son IA.", "Vérifier les totaux avec votre tableau. En cas d'écart, le tableau fait foi.", "Envoyer le rapport, ou le garder pour votre point de la semaine."]$j$::jsonb, precisions = $t$Pour un petit tableau, collez les lignes dans la consigne : cela marche avec toutes les IA et consomme peu de connexion. Les IA acceptent aussi un fichier Excel ou CSV, avec des limites sur un compte gratuit.$t$
  where code = $t$F08$t$;

update taches set resultat = $t$Un fichier clients propre : les doublons repérés, les fiches à compléter, et chaque contact classé selon l'intérêt qu'il montre. Une base CRM est simplement votre fichier de clients et de prospects, tenu dans un tableau ou dans WhatsApp Business.$t$, etapes = $j$["Recopier vos contacts dans un tableau : une ligne par contact.", "Remplacer chaque nom par un code et retirer les numéros de téléphone.", "Remplir le modèle et copier la consigne dans son IA.", "Vérifier chaque doublon avant de réunir deux fiches : l'IA propose, vous décidez.", "Reporter le classement dans le document « Fichier clients et prospects »."]$j$::jsonb, precisions = $t$Ne collez jamais dans une IA le nom complet, le numéro ou l'adresse d'un client. Un code (C-012), le type de client et les dates suffisent pour ce travail.$t$
  where code = $t$F10$t$;

update taches set resultat = $t$Les informations d'un document (facture, bon de commande, fiche d'inscription) rangées dans un tableau prêt à saisir, avec la liste de ce qui est illisible ou manquant.$t$, etapes = $j$["Photographier le document bien à plat, ou recopier son contenu.", "Retirer ou masquer les données personnelles qui ne servent pas à la saisie.", "Remplir le modèle avec les colonnes de votre tableau, puis copier la consigne dans son IA.", "Comparer chaque ligne avec le document : une IA peut mal lire un chiffre.", "Demander les informations manquantes à la personne concernée, puis saisir."]$j$::jsonb, precisions = $t$Les IA lisent une photo sur un compte gratuit, avec des limites d'usage. Une photo floue donne des erreurs : vérifiez toujours les chiffres. Ne photographiez ni une pièce d'identité, ni un relevé bancaire.$t$
  where code = $t$F11$t$;

update taches set resultat = $t$Un tableau qui compare deux documents point par point (deux devis, deux offres, deux versions d'un contrat), les différences qui comptent vraiment, et une recommandation à vérifier avant de décider.$t$, etapes = $j$["Rassembler les deux documents et repérer les points à comparer : prix, délai, paiement, engagement.", "Recopier ou joindre chaque document, sans le nom des entreprises ni des personnes.", "Remplir le modèle et copier la consigne dans son IA.", "Vérifier chaque chiffre du tableau avec les documents d'origine.", "Poser au fournisseur les questions que la comparaison fait apparaître, puis décider."]$j$::jsonb, precisions = $t$Cette tâche ne remplace pas un avis juridique. Pour un contrat important, faites relire les clauses par un juriste ou par votre responsable.$t$
  where code = $t$F13$t$;

update taches set resultat = $t$Votre message rédigé dans la langue de votre correspondant, avec le bon ton, et la traduction en français de ce qu'il vous écrit. Adapter, c'est traduire le sens et les usages, pas seulement les mots.$t$, etapes = $j$["Préparer le texte à traduire, sans nom complet ni numéro.", "Indiquer à qui il s'adresse et dans quelle langue.", "Remplir le modèle et copier la consigne dans son IA.", "Relire la version française de contrôle : elle doit dire exactement ce que vous vouliez.", "Envoyer, puis coller la réponse reçue dans la même conversation pour la faire traduire."]$j$::jsonb, precisions = $t$Pour un contrat, un document officiel ou un texte médical, la traduction d'une IA ne suffit pas : faites-la relire par une personne qui parle la langue.$t$
  where code = $t$F14$t$;

update taches set resultat = $t$Le plan complet d'une présentation : le titre et le texte de chaque diapositive, ce qu'il faut montrer, et ce que vous dites à l'oral. Un brief est la demande de départ : le sujet, le public, le temps dont vous disposez.$t$, etapes = $j$["Écrire le brief en quelques lignes : le sujet, le public, la durée, ce que vous voulez obtenir.", "Rassembler vos chiffres et vos faits : la présentation ne dira rien d'autre.", "Remplir le modèle et copier la consigne dans son IA.", "Créer les diapositives dans Google Slides, PowerPoint ou Canva, en copiant le texte proposé.", "Répéter une fois à voix haute, montre en main."]$j$::jsonb, precisions = $t$Claude peut créer le fichier PowerPoint sur un compte gratuit, une fois la création de fichiers activée dans ses paramètres. Gemini génère aussi des diapositives. Avec ChatGPT, copiez le texte de chaque diapositive dans votre outil.$t$
  where code = $t$F15$t$;

update taches set resultat = $t$Un plan d'action clair pour un projet : les tâches dans l'ordre, un responsable et une date pour chacune, ce qui bloque le reste, et le point à faire chaque semaine.$t$, etapes = $j$["Écrire en vrac tout ce qu'il y a à faire, sans chercher l'ordre.", "Noter la date finale, les personnes disponibles et les contraintes.", "Remplir le modèle et copier la consigne dans son IA.", "Vérifier que chaque tâche a un responsable et une date réaliste, puis partager le plan.", "Chaque semaine, cocher ce qui est fait et recoller le plan pour le mettre à jour."]$j$::jsonb, precisions = null
  where code = $t$F16$t$;

update taches set resultat = $t$Un premier message adapté à chaque prospect, la relance à envoyer s'il ne répond pas, et le dernier message qui clôt la démarche avec politesse. Un prospect est une personne ou une entreprise qui pourrait devenir cliente.$t$, etapes = $j$["Choisir quelques prospects et noter ce que vous savez de chacun : son activité, son besoin probable.", "Remplir le modèle et copier la consigne dans son IA.", "Adapter chaque message à votre façon de parler, puis l'envoyer à une heure convenable.", "Noter l'envoi dans le document « Fichier clients et prospects », avec la date de la relance.", "Relancer une fois, puis une dernière fois : jamais plus."]$j$::jsonb, precisions = $t$N'écrivez qu'à des personnes dont vous avez obtenu le contact de façon honnête : un client, une recommandation, une carte de visite, une page publique. Un prospect qui dit non ne se relance pas.$t$
  where code = $t$F17$t$;

update taches set resultat = $t$Une proposition commerciale complète : ce que le client demande, une ou deux formules chiffrées, le total, l'acompte, le délai et les conditions, avec le message d'envoi. Une proposition commerciale est un devis accompagné d'une courte explication de l'offre.$t$, etapes = $j$["Reformuler la demande du client en une phrase, et noter ce qu'il veut vraiment obtenir.", "Lister les lignes de chaque formule : désignation, quantité, prix à l'unité.", "Remplir le modèle et copier la consigne dans son IA.", "Vérifier chaque total, puis coller le texte dans le document « Proposition commerciale ».", "Envoyer en PDF, puis noter le devis dans le document « Suivi des devis et des factures »."]$j$::jsonb, precisions = $t$Ce modèle ne produit pas une facture normalisée. Dans plusieurs pays, dont le Bénin, la Côte d'Ivoire, le Niger et le Burkina Faso, la facture officielle passe par un dispositif de l'État. Pour une facture officielle, adressez-vous à votre comptable.$t$
  where code = $t$F18$t$;

update taches set resultat = $t$La liste de vos factures en retard, classées de la plus ancienne à la plus récente, le total qui reste à encaisser, et pour chacune le message de relance du bon niveau. Un impayé est une facture dont la date de paiement est passée.$t$, etapes = $j$["Relever les factures dont l'échéance est passée : le montant, ce qui est déjà payé, le nombre de jours de retard.", "Remplacer chaque nom par un code, puis remplir le modèle.", "Copier la consigne dans son IA, puis vérifier le total avec votre tableau.", "Envoyer chaque relance en privé, à une heure convenable, en ajoutant le prénom.", "Noter la relance dans le document « Suivi des devis et des factures », avec la date promise par le client."]$j$::jsonb, precisions = $t$Ce modèle rédige des relances courtoises. Il ne donne aucun conseil sur un recouvrement en justice : pour une somme importante qui reste impayée, adressez-vous à votre responsable ou à un juriste.$t$
  where code = $t$F21$t$;

update taches set resultat = $t$L'état de vos commandes en cours chez vos fournisseurs, ce qui change (retard, rupture, produit remplacé), ce que cela entraîne pour vous, et les messages à envoyer au fournisseur et à vos clients.$t$, etapes = $j$["Lister vos commandes en cours : le fournisseur, le produit, la quantité, la date promise.", "Noter mot pour mot le message du fournisseur qui annonce un changement.", "Remplir le modèle et copier la consigne dans son IA.", "Vérifier ce que le changement entraîne pour vos propres clients, puis envoyer les messages.", "Mettre à jour votre tableau de suivi, avec la nouvelle date."]$j$::jsonb, precisions = null
  where code = $t$F22$t$;

update taches set resultat = $t$Ce que vos clients disent vraiment : les sujets qui reviennent, classés du plus fréquent au plus rare, les deux points à corriger d'abord, et une réponse prête pour chaque avis négatif.$t$, etapes = $j$["Rassembler les avis reçus : messages WhatsApp, commentaires Facebook, réponses à une enquête.", "Les recopier sans le nom des clients, un avis par ligne.", "Remplir le modèle et copier la consigne dans son IA.", "Vérifier le classement, puis choisir une seule amélioration à faire ce mois-ci.", "Répondre aux avis négatifs en privé d'abord, avec calme."]$j$::jsonb, precisions = null
  where code = $t$F26$t$;

update taches set resultat = $t$Vos clients répartis en quelques groupes simples (les fidèles, ceux qui s'éloignent, les nouveaux, les acheteurs occasionnels), avec le critère de chaque groupe et le message qui lui convient. Un segment est un groupe de clients qui se ressemblent.$t$, etapes = $j$["Sortir de votre fichier, pour chaque client : la date du dernier achat, le nombre d'achats, le total acheté.", "Remplacer chaque nom par un code.", "Remplir le modèle et copier la consigne dans son IA.", "Vérifier que chaque client est dans un seul groupe, et que le critère est clair.", "Reporter le groupe dans le document « Fichier clients et prospects », puis écrire à un groupe à la fois."]$j$::jsonb, precisions = null
  where code = $t$F27$t$;

-- 3. Les cas pratiques localisés, à côté des anciens
update exercices set titre_local = $t$Assistante de direction dans une ONG à Niamey$t$, contexte_local = $t$Vous êtes assistante de direction dans une ONG de santé de 18 personnes. Lundi matin, après trois jours d'atelier hors du bureau, vous trouvez sept e-mails en attente.$t$, donnees_local = $t$- Le bailleur demande le rapport du trimestre avant jeudi, 17 h.
- Un fournisseur de fournitures de bureau envoie sa facture et demande la date du paiement.
- La mairie invite la directrice à une réunion mercredi à 9 h et attend une confirmation.
- Deux candidats envoient leur dossier pour le poste d'animateur. L'annonce est close depuis vendredi.
- Un collègue demande un ordre de mission pour un départ mardi matin.
- Un réseau d'ONG envoie sa lettre d'information, sans rien demander.
- La banque annonce une interruption de son service en ligne samedi.$t$, travail_local = $t$Classez ces sept e-mails en trois groupes (à traiter aujourd'hui, à traiter cette semaine, à classer), puis préparez une réponse courte pour ceux qui en attendent une.$t$, prenom = $t$Mariama$t$, lieu = $t$Niamey, Niger$t$, profil = $t$Structure, 18 personnes$t$, reponse_attendue = null
  where numero = 1 and tache_id in (select id from taches where code = $t$F01$t$);

update exercices set titre_local = $t$Gérante d'un salon de coiffure à Abidjan$t$, contexte_local = $t$Vous gérez seule Yélé Coiffure, un salon à Yopougon. Lundi matin, vous ouvrez WhatsApp Business après un week-end chargé : six conversations vous attendent.$t$, donnees_local = $t$- Akissi, cliente fidèle, a laissé une note vocale samedi : elle ne pourra pas venir mardi à 14 h et demande un autre jour.
- Un numéro inconnu a écrit vendredi soir : « Bonsoir, c'est combien les tresses ? Vous faites dernier prix ? »
- Votre fournisseur de mèches, au marché d'Adjamé, annonce une rupture jusqu'au 20 et propose une autre marque, un peu plus chère.
- Une cliente a envoyé la capture d'écran d'un transfert Wave : c'est l'avance pour une coiffure de mariage prévue samedi.
- Le propriétaire du local rappelle le loyer du mois, 150 000 FCFA, à régler avant le 5.
- Trois personnes ont répondu à votre statut de dimanche pour demander un rendez-vous cette semaine.$t$, travail_local = $t$Classez ces six conversations par ordre d'urgence, puis préparez une réponse courte et polie pour chacune.$t$, prenom = $t$Aya$t$, lieu = $t$Abidjan, Côte d'Ivoire$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F01$t$);

update exercices set titre_local = $t$Assistante administrative chez un transitaire à Douala$t$, contexte_local = $t$Vous êtes assistante administrative chez Akwa Logistique, une entreprise de transit et de transport de 22 personnes. Le directeur vous remet le brouillon d'une lettre aux clients : le magasin change d'horaires pendant des travaux.$t$, donnees_local = $t$- Le brouillon : « chers clients on vous informe que a cause des travaux le magasin sera fermé les après midi a partir du lundi 12 jusqu'a nouvelle ordre, les enlevement se feront que le matin de 7h30 a 12h, merci de votre comprehension et désolé pour le dérangement. »
- Les travaux durent trois semaines, du lundi 12 au vendredi 30 octobre.
- Un enlèvement urgent reste possible l'après-midi, sur rendez-vous pris par téléphone.
- La lettre part par e-mail et s'affiche à l'entrée du magasin.
- Le directeur veut un ton courtois et une lettre d'une demi-page au plus.$t$, travail_local = $t$Rédigez la lettre aux clients, corrigée et complète, puis listez ce que vous avez changé dans le brouillon.$t$, prenom = $t$Ange$t$, lieu = $t$Douala, Cameroun$t$, profil = $t$Structure, 22 personnes$t$, reponse_attendue = null
  where numero = 1 and tache_id in (select id from taches where code = $t$F03$t$);

update exercices set titre_local = $t$Gérante d'un service traiteur à Cotonou$t$, contexte_local = $t$Vous gérez Fifamè Traiteur avec une aide-cuisinière, à Akpakpa. Une entreprise voisine vous demande une offre écrite pour le repas de fin d'année de son personnel. Vous n'avez jamais écrit ce genre de lettre.$t$, donnees_local = $t$- Repas pour 60 personnes, le vendredi 18 décembre à 13 h, dans les locaux de l'entreprise.
- Votre prix : 2 000 FCFA le plat, boisson non comprise.
- La livraison et le service sur place sont offerts à partir de 50 plats.
- Vous demandez une avance de la moitié à la commande, par MTN MoMo ou en espèces.
- La commande doit être confirmée dix jours avant le repas.$t$, travail_local = $t$Rédigez la lettre d'offre, avec le total et l'avance, sur un ton professionnel et chaleureux.$t$, prenom = $t$Prisca$t$, lieu = $t$Cotonou, Bénin$t$, profil = $t$Individuelle, 2 personnes$t$, reponse_attendue = $t$Total 120 000 FCFA, soit 60 plats à 2 000 FCFA ; avance 60 000 FCFA.$t$
  where numero = 2 and tache_id in (select id from taches where code = $t$F03$t$);

update exercices set titre_local = $t$Commerciale dans une boutique de téléphones à Dakar$t$, contexte_local = $t$Vous êtes commerciale chez Sandaga Mobile, une boutique de 8 personnes près du marché Sandaga. Le gérant vous demande le compte rendu de la réunion commerciale du lundi, qui a duré 30 minutes. Vous avez dicté vos notes pendant la réunion.$t$, donnees_local = $t$- « ventes semaine passée 34 téléphones, objectif 40. »
- « modèle à 45 000 FCFA en rupture depuis mercredi, réassort promis vendredi par le fournisseur. »
- « trois revendeurs de Pikine en retard de paiement, Modou les appelle avant mercredi. »
- « tournée chez les revendeurs jeudi matin, Modou et moi. »
- « promo de rentrée sur les coques et les chargeurs : à décider lundi prochain. »
- « le gérant veut un point des impayés chaque vendredi. »$t$, travail_local = $t$Rédigez le compte rendu : l'essentiel en cinq lignes, les décisions prises, puis les actions avec un responsable et une date. Signalez ce qui reste à décider.$t$, prenom = $t$Coumba$t$, lieu = $t$Dakar, Sénégal$t$, profil = $t$Structure, 8 personnes$t$, reponse_attendue = null
  where numero = 1 and tache_id in (select id from taches where code = $t$F04$t$);

update exercices set titre_local = $t$Vendeuse de bazin à Bamako$t$, contexte_local = $t$Vous vendez du bazin dans votre boutique, avec une vendeuse. Une cliente est venue commander des tenues pour le mariage de sa fille. Après son départ, vous dictez vos notes pour ne rien oublier. Vous travaillez avec un tailleur du quartier, qui a besoin de deux semaines.$t$, donnees_local = $t$- « mariage le samedi 28 novembre. »
- « 12 tenues pour la famille, même couleur, bleu ciel si possible. »
- « elle revient jeudi avec les mesures. »
- « elle veut voir trois qualités de bazin avant de choisir. »
- « le tailleur doit avoir le tissu au plus tard le 10 novembre. »
- « elle paie une avance par Orange Money quand elle a choisi. »
- « elle demande un prix pour l'ensemble, je dois lui répondre demain. »$t$, travail_local = $t$Rédigez le résumé du rendez-vous : la demande, ce qui est décidé, ce qui reste à faire avec les dates, puis le message à envoyer demain à la cliente.$t$, prenom = $t$Oumou$t$, lieu = $t$Bamako, Mali$t$, profil = $t$Individuelle, 2 personnes$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F04$t$);

update exercices set titre_local = $t$Secrétaire dans un centre de formation à Lomé$t$, contexte_local = $t$Vous êtes secrétaire dans un centre de formation professionnelle de 15 personnes. La semaine prochaine, le directeur reçoit les candidats à la formation en couture. Vous devez organiser les entretiens.$t$, donnees_local = $t$- 12 candidats à recevoir, 20 minutes par entretien.
- Le directeur est libre mardi de 9 h à 12 h et jeudi de 15 h à 17 h 30.
- Quatre candidates viennent de Kara par le car : elles ne peuvent venir que jeudi.
- Deux candidats travaillent le matin : ils demandent l'après-midi.
- Le directeur veut une pause de 10 minutes après trois entretiens.
- Les convocations partent sur WhatsApp, avec un rappel la veille.$t$, travail_local = $t$Proposez le planning des 12 entretiens, avec l'heure de chacun, puis rédigez le message de convocation.$t$, prenom = $t$Mawuli$t$, lieu = $t$Lomé, Togo$t$, profil = $t$Structure, 15 personnes$t$, reponse_attendue = $t$Une solution possible : 6 entretiens mardi, de 9 h à 11 h 10, et 6 entretiens jeudi, de 15 h à 17 h 10, pauses comprises. Les quatre candidates de Kara et les deux candidats de l'après-midi passent jeudi.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F05$t$);

update exercices set titre_local = $t$Technicien en climatisation à son compte à Libreville$t$, contexte_local = $t$Vous êtes technicien en froid et climatisation, seul, avec une moto. Cette semaine, sept clients attendent votre passage. Vous perdez trop de temps à traverser la ville.$t$, donnees_local = $t$- Trois entretiens de climatiseur au nord de la ville : 1 heure chacun.
- Deux dépannages au centre-ville : 2 heures chacun. L'un des deux clients n'est là que le matin.
- Une installation au sud de la ville : une demi-journée, à faire avant vendredi.
- Un devis à faire chez un client du centre-ville : 30 minutes.
- Vous travaillez du lundi au vendredi, de 8 h à 17 h. Mercredi après-midi, vous êtes pris.
- Il pleut souvent en fin d'après-midi : vous évitez les longs trajets après 16 h.$t$, travail_local = $t$Proposez un planning de la semaine qui regroupe les interventions par zone, puis rédigez le message de confirmation à envoyer à chaque client.$t$, prenom = $t$Yannick$t$, lieu = $t$Libreville, Gabon$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F05$t$);

update exercices set titre_local = $t$Conseillère clientèle chez un distributeur de matériel solaire à Ouagadougou$t$, contexte_local = $t$Vous êtes conseillère clientèle dans une entreprise de 20 personnes qui vend et installe des panneaux solaires. Les mêmes questions arrivent chaque jour sur WhatsApp Business. Le responsable vous demande des réponses types.$t$, donnees_local = $t$- « Vous installez aussi, ou vous vendez seulement ? » L'entreprise vend et installe, à Ouagadougou et dans un rayon de 50 km.
- « Quelle est la garantie ? » Deux ans sur les panneaux, un an sur les batteries, sur présentation de la facture.
- « Je peux payer en plusieurs fois ? » Oui, en trois fois, avec la moitié à la commande.
- « Vous prenez Orange Money ? » Oui, ainsi que Moov Money et les espèces.
- « En combien de temps vous installez ? » Sous cinq jours ouvrés après la commande.
- « Mon installation ne marche plus, que faire ? » Le service après-vente rappelle dans la journée.
- Les prix ne se donnent pas par message : un technicien fait d'abord un devis gratuit sur place.$t$, travail_local = $t$Rédigez les six réponses types, puis la réponse à donner quand un client demande un prix par message.$t$, prenom = $t$Rasmata$t$, lieu = $t$Ouagadougou, Burkina Faso$t$, profil = $t$Structure, 20 personnes$t$, reponse_attendue = null
  where numero = 1 and tache_id in (select id from taches where code = $t$F06$t$);

update exercices set titre_local = $t$Couturière à son compte à Dakar$t$, contexte_local = $t$Vous êtes couturière aux Parcelles Assainies, avec une apprentie. Vous répondez aux mêmes questions dix fois par jour, souvent tard le soir.$t$, donnees_local = $t$- La couture d'une tenue simple, main-d'œuvre seule : 10 000 FCFA. Le tissu est apporté par la cliente.
- Délai habituel : une semaine. Avant la Tabaski et la Korité, deux semaines.
- Avance de la moitié à la commande, par Wave ou en espèces. Le reste à la livraison.
- Livraison à moto dans Dakar : 1 500 FCFA, à la charge de la cliente.
- Une retouche est gratuite dans les sept jours qui suivent la livraison.
- Les questions qui reviennent : le prix, le délai, « vous livrez ? », « je peux payer après ? », « et si ça ne me va pas ? ».$t$, travail_local = $t$Rédigez une réponse type pour chacune des cinq questions, en trois lignes au plus.$t$, prenom = $t$Fatou$t$, lieu = $t$Dakar, Sénégal$t$, profil = $t$Individuelle, 2 personnes$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F06$t$);

update exercices set titre_local = $t$Responsable commercial chez un transitaire à Abidjan$t$, contexte_local = $t$Vous êtes responsable commercial chez Lagune Fret Express, une entreprise de transit de 30 personnes. La direction vous demande chaque mois une note sur trois concurrents. Voici vos notes du mois.$t$, donnees_local = $t$- Concurrent A : annonce sur sa page Facebook un suivi des colis par WhatsApp. Deux clients vous en ont parlé.
- Concurrent A : aurait baissé ses tarifs vers le Burkina Faso. C'est un chauffeur qui le dit, rien d'écrit.
- Concurrent B : a ouvert un second magasin à Yopougon. Vous l'avez vu vous-même.
- Concurrent B : trois avis négatifs sur sa page ce mois-ci, tous sur des retards.
- Concurrent C : recrute deux commerciaux, d'après une annonce en ligne.
- Vos propres clients se plaignent surtout du manque d'information pendant le transport.$t$, travail_local = $t$Rédigez la note de veille d'une demi-page : les faits vérifiés, ce qui reste à vérifier, et deux recommandations pour la direction.$t$, prenom = $t$Seydou$t$, lieu = $t$Abidjan, Côte d'Ivoire$t$, profil = $t$Structure, 30 personnes$t$, reponse_attendue = null
  where numero = 1 and tache_id in (select id from taches where code = $t$F07$t$);

update exercices set titre_local = $t$Vendeuse de cosmétiques à son compte à Cotonou$t$, contexte_local = $t$Vous vendez seule des produits cosmétiques sur WhatsApp, à Akpakpa. Vous pensez ajouter des perruques à votre offre. Avant de commander, vous avez rassemblé quelques informations.$t$, donnees_local = $t$- Trois vendeuses en ligne affichent leurs perruques entre 10 500 et 13 500 FCFA.
- Une amie vous dit que « tout le monde en vend maintenant ». Vous n'avez pas vérifié.
- Deux de vos clientes vous en ont demandé le mois dernier.
- Un grossiste du marché Dantokpa vous a donné un prix de gros, sans l'écrire.
- Vous ne savez pas combien de perruques il faut commander au minimum.
- Vos crèmes se vendent 4 000 FCFA : une perruque coûte environ trois fois plus cher à votre cliente.$t$, travail_local = $t$Rédigez une synthèse pour vous-même : ce qui est vérifié, ce qui est une supposition, et les trois questions à poser avant de commander.$t$, prenom = $t$Sènami$t$, lieu = $t$Cotonou, Bénin$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F07$t$);

update exercices set titre_local = $t$Assistant de gestion chez un traiteur à Dakar$t$, contexte_local = $t$Vous êtes assistant de gestion chez Thiossane Traiteur, 6 personnes, à Grand Yoff. Le gérant vous demande le rapport des livraisons du mois, avant sa réunion avec le chef de cuisine.$t$, donnees_local = $t$- Semaine 1 : 180 plats livrés, 62 livraisons.
- Semaine 2 : 205 plats livrés, 70 livraisons.
- Semaine 3 : 150 plats livrés, 55 livraisons. Deux jours de coupure d'électricité.
- Semaine 4 : 240 plats livrés, 81 livraisons. C'est la semaine de fin de mois.
- Prix moyen d'un plat : 2 500 FCFA. Frais de livraison facturés au client : 2 000 FCFA par livraison.$t$, travail_local = $t$Calculez le total des plats, le chiffre d'affaires des plats par semaine et pour le mois, puis rédigez un rapport de dix lignes : la meilleure semaine, la plus faible, et ce que vous proposez de regarder.$t$, prenom = $t$Ibrahima$t$, lieu = $t$Dakar, Sénégal$t$, profil = $t$Structure, 6 personnes$t$, reponse_attendue = $t$775 plats livrés. Chiffre d'affaires des plats : 450 000, 512 500, 375 000 et 600 000 FCFA, soit 1 937 500 FCFA pour le mois. 268 livraisons, soit 536 000 FCFA de frais de livraison.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F08$t$);

update exercices set titre_local = $t$Gérante d'un petit restaurant à Yaoundé$t$, contexte_local = $t$Vous tenez un restaurant de quartier avec deux employées. Vous notez chaque soir le nombre de repas servis. Vous voulez savoir quels jours renforcer l'équipe. Voici les quatre dernières semaines.$t$, donnees_local = $t$- Lundi : 38, 41, 35, 40 repas.
- Mardi : 42, 39, 44, 43 repas.
- Mercredi : 40, 45, 38, 41 repas.
- Jeudi : 47, 50, 46, 49 repas.
- Vendredi : 66, 71, 64, 75 repas.
- Samedi : 58, 62, 55, 61 repas.
- Le restaurant est fermé le dimanche.$t$, travail_local = $t$Calculez le total et la moyenne de chaque jour, classez les jours du plus chargé au plus calme, puis dites quels jours renforcer l'équipe.$t$, prenom = $t$Aïcha$t$, lieu = $t$Yaoundé, Cameroun$t$, profil = $t$Individuelle, 3 personnes$t$, reponse_attendue = $t$1 190 repas en quatre semaines. Moyennes par jour : vendredi 69, samedi 59, jeudi 48, mardi 42, mercredi 41, lundi 38,5.$t$
  where numero = 2 and tache_id in (select id from taches where code = $t$F08$t$);

update exercices set titre_local = $t$Commercial dans une boutique de téléphones à Cotonou$t$, contexte_local = $t$Vous êtes commercial chez Tokpa Mobile, une boutique de 5 personnes près du marché Dantokpa, qui vend aussi en gros à des revendeurs. Deux listes de revendeurs ont été réunies en une seule. Avant la tournée du mois, vous devez la nettoyer.$t$, donnees_local = $t$- R-01 : boutique de téléphones à Akpakpa, dernier achat en septembre 2026, numéro finissant par 12.
- R-02 : « Boutique tél. Akpakpa », dernier achat en mars 2025, numéro finissant par 12.
- R-03 : revendeur à Porto-Novo, dernier achat en août 2026, numéro finissant par 47.
- R-04 : revendeuse à Parakou, aucun achat, a demandé les prix de gros en juillet 2026.
- R-05 : revendeur à Porto-Novo, dernier achat en août 2026, numéro finissant par 74.
- R-06 : boutique à Abomey-Calavi, dernier achat en janvier 2024, numéro qui ne répond plus.
- R-07 : revendeuse à Parakou, numéro non renseigné, a demandé les prix de gros en juillet 2026.$t$, travail_local = $t$Repérez les doublons sûrs et les doublons à vérifier, dites quelle fiche garder, listez les informations manquantes, puis classez les contacts : à visiter pendant la tournée, à rappeler, à retirer.$t$, prenom = $t$Mahougnon$t$, lieu = $t$Cotonou, Bénin$t$, profil = $t$Structure, 5 personnes$t$, reponse_attendue = null
  where numero = 1 and tache_id in (select id from taches where code = $t$F10$t$);

update exercices set titre_local = $t$Vendeuse de sacs et de bijoux à Lomé$t$, contexte_local = $t$Vous tenez seule Assiyéyé Mode, une boutique de sacs et de bijoux au quartier Bè. Votre WhatsApp Business compte beaucoup de contacts, et vous ne savez plus à qui écrire avant les fêtes. Vous avez noté huit contacts, sans les noms.$t$, donnees_local = $t$- C-01 : a acheté trois fois cette année, la dernière fois il y a deux semaines.
- C-02 : a demandé le prix d'un sac il y a quatre mois, sans suite.
- C-03 : a acheté une fois l'an dernier, réagit souvent à vos statuts.
- C-04 : a versé une avance pour un sac le mois dernier, puis n'a plus répondu.
- C-05 : numéro inconnu, un seul message « c'est combien ? » il y a un an.
- C-06 : revendeuse à Kara, achète par lots, dernier achat il y a deux mois.
- C-07 : a demandé à ne plus recevoir vos messages.
- C-08 : cliente de la diaspora, commande chaque année en décembre pour sa famille.$t$, travail_local = $t$Classez ces huit contacts en trois groupes (à contacter en premier, à relancer avec douceur, à ne pas contacter), en donnant la raison, puis proposez l'étiquette WhatsApp Business de chaque groupe.$t$, prenom = $t$Afi$t$, lieu = $t$Lomé, Togo$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F10$t$);

update exercices set titre_local = $t$Assistant comptable dans un cabinet à Abidjan$t$, contexte_local = $t$Vous êtes assistant chez Plateau Compta Services, un cabinet comptable de 12 personnes. Un client, entrepreneur en bâtiment, vous envoie sur WhatsApp la photo d'une facture de son fournisseur. Vous la recopiez avant la saisie.$t$, donnees_local = $t$- Fournisseur : un dépôt de matériaux de Yopougon. Son numéro de compte contribuable (NCC) est en partie caché par un tampon.
- Facture numéro 2026-0871, du 14 septembre 2026.
- 20 sacs de ciment de 50 kg à 3 800 FCFA le sac, hors taxes.
- TVA à 18 %.
- Le mode de paiement n'est pas indiqué. La date d'échéance est illisible.$t$, travail_local = $t$Préparez la ligne de saisie (fournisseur, numéro, date, montant hors taxes, TVA, montant toutes taxes comprises, échéance), puis listez les informations illisibles ou manquantes à demander au client.$t$, prenom = $t$Kouadio$t$, lieu = $t$Abidjan, Côte d'Ivoire$t$, profil = $t$Structure, 12 personnes$t$, reponse_attendue = $t$Montant hors taxes 76 000 FCFA ; TVA 13 680 FCFA ; montant toutes taxes comprises 89 680 FCFA. À demander : le NCC complet, le mode de paiement et la date d'échéance.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F11$t$);

update exercices set titre_local = $t$Responsable d'un atelier de formation en couture à Niamey$t$, contexte_local = $t$Vous tenez un petit atelier de formation en couture, avec deux formatrices. Trois nouvelles élèves ont rempli leur fiche d'inscription à la main. Vous les recopiez dans votre tableau.$t$, donnees_local = $t$- Fiche 1 : prénom Rakia, née en 2004, quartier indiqué, numéro finissant par 31, niveau « débutante », formation de 6 mois. La personne à prévenir n'est pas renseignée.
- Fiche 2 : prénom Hadiza, année de naissance illisible, numéro finissant par 08, niveau non coché, formation de 6 mois.
- Fiche 3 : prénom Mariama, née en 2001, quartier non indiqué, deux numéros notés dont un barré, niveau « a déjà cousu », durée de la formation non cochée.$t$, travail_local = $t$Préparez le tableau de saisie des trois inscriptions, puis la liste des points à éclaircir avec chaque élève avant de valider son dossier.$t$, prenom = $t$Zeinabou$t$, lieu = $t$Niamey, Niger$t$, profil = $t$Individuelle, 3 personnes$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F11$t$);

update exercices set titre_local = $t$Assistant de direction chez un transitaire à Bamako$t$, contexte_local = $t$Vous êtes assistant de direction chez Djiguiya Transit, une entreprise de 16 personnes. Le prestataire qui entretient les véhicules propose une nouvelle version de son contrat. Le directeur veut savoir ce qui change avant de signer.$t$, donnees_local = $t$- Version actuelle : entretien de 8 véhicules, une visite par mois, dépannage sous 24 heures, contrat d'un an, résiliation avec un préavis d'un mois.
- Nouvelle version : entretien de 8 véhicules, une visite tous les deux mois, dépannage sous 48 heures, contrat de deux ans, résiliation avec un préavis de trois mois.
- Version actuelle : les petites pièces de rechange sont comprises. Nouvelle version : toutes les pièces sont facturées en plus.
- Nouvelle version : le prestataire prête un véhicule pendant une panne de plus de trois jours. La version actuelle ne prévoit rien.
- Le prix de la nouvelle version n'est pas encore communiqué.$t$, travail_local = $t$Listez chaque changement entre les deux versions, classez-les (favorable, défavorable ou neutre pour l'entreprise), puis rédigez les trois questions à poser au prestataire avant de signer.$t$, prenom = $t$Modibo$t$, lieu = $t$Bamako, Mali$t$, profil = $t$Structure, 16 personnes$t$, reponse_attendue = null
  where numero = 1 and tache_id in (select id from taches where code = $t$F13$t$);

update exercices set titre_local = $t$Gérant d'un restaurant à Dakar$t$, contexte_local = $t$Vous tenez un restaurant à la Médina, avec trois employés. Deux grossistes vous proposent leurs conditions. Vous commandez chaque mois 6 sacs de riz de 50 kg et 20 litres d'huile.$t$, donnees_local = $t$- Grossiste A : sac de riz de 50 kg à 13 500 FCFA, huile à 1 000 FCFA le litre, livraison à 2 500 FCFA, paiement comptant à la livraison.
- Grossiste B : sac de riz de 50 kg à 14 500 FCFA, huile à 1 000 FCFA le litre, livraison gratuite, paiement à 15 jours.
- Le grossiste A livre sous 48 heures. Le grossiste B livre le lendemain.
- Le grossiste B demande une commande de 5 sacs au minimum.$t$, travail_local = $t$Comparez les deux offres point par point, calculez le coût d'une commande du mois chez chacun, puis dites laquelle vous retenez et pourquoi.$t$, prenom = $t$Mamadou$t$, lieu = $t$Dakar, Sénégal$t$, profil = $t$Individuelle, 4 personnes$t$, reponse_attendue = $t$Grossiste A : 103 500 FCFA, soit 81 000 + 20 000 + 2 500. Grossiste B : 107 000 FCFA, soit 87 000 + 20 000. Écart : 3 500 FCFA par mois en faveur du grossiste A, qui demande un paiement comptant.$t$
  where numero = 2 and tache_id in (select id from taches where code = $t$F13$t$);

update exercices set titre_local = $t$Assistante de direction dans un hôtel à Libreville$t$, contexte_local = $t$Vous êtes assistante de direction dans un hôtel de 35 personnes. Une entreprise anglophone réserve une salle pour un séminaire. Le directeur vous demande de lui écrire en anglais.$t$, donnees_local = $t$- Le message à traduire : « Bonjour Madame. Nous confirmons la réservation de la salle de conférence pour 40 personnes, du mardi 17 au jeudi 19 novembre, de 8 h 30 à 17 h. Deux pauses-café et le déjeuner sont prévus chaque jour. Merci de nous envoyer la liste des participants et vos besoins en matériel avant le 10 novembre. Cordialement. »
- La cliente écrit en anglais, sur un ton très professionnel.
- Le directeur veut aussi une phrase polie pour demander un acompte, sans citer de montant.$t$, travail_local = $t$Rédigez le message en anglais professionnel, avec la phrase sur l'acompte, puis donnez la version française de contrôle.$t$, prenom = $t$Armelle$t$, lieu = $t$Libreville, Gabon$t$, profil = $t$Structure, 35 personnes$t$, reponse_attendue = null
  where numero = 1 and tache_id in (select id from taches where code = $t$F14$t$);

update exercices set titre_local = $t$Vendeur de pagnes à Lomé$t$, contexte_local = $t$Vous vendez des pagnes au Grand Marché, avec un employé. Une cliente du Ghana vous écrit en anglais sur WhatsApp. Vous comprenez un peu l'anglais, mais vous n'osez pas répondre.$t$, donnees_local = $t$- Son message : « Good evening. I saw your fabrics on Facebook. Do you sell wholesale? I need 30 pieces for a wedding. Can you send to Accra and how long does it take? »
- Vous vendez en gros à partir de 10 pièces.
- Vous envoyez vers Accra par le car : le colis part le lendemain de la commande et se retire à la gare.
- Vous demandez la moitié à la commande. Le prix se donne après le choix des modèles.$t$, travail_local = $t$Traduisez son message en français, puis rédigez votre réponse en anglais simple, avec la version française de contrôle.$t$, prenom = $t$Kodjo$t$, lieu = $t$Lomé, Togo$t$, profil = $t$Individuelle, 2 personnes$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F14$t$);

update exercices set titre_local = $t$Chargé de programme dans une ONG à Bobo-Dioulasso$t$, contexte_local = $t$Vous êtes chargé de programme dans une ONG de 25 personnes qui forme des jeunes aux métiers agricoles. Vendredi, vous présentez le bilan du trimestre à un bailleur. Vous avez dix minutes et six diapositives au plus.$t$, donnees_local = $t$- 120 jeunes inscrits, 104 ont terminé la formation.
- 3 sessions tenues sur 3 prévues, dans deux villages.
- 38 jeunes ont démarré une activité de maraîchage après la formation.
- Une difficulté : la saison des pluies a retardé la deuxième session de trois semaines.
- La demande au bailleur : financer une quatrième session au prochain trimestre.
- Le bailleur lit vite : il veut des chiffres et une demande claire.$t$, travail_local = $t$Préparez le plan des six diapositives : le titre, un texte court, le chiffre à montrer, et ce que vous dites à l'oral pour chacune.$t$, prenom = $t$Adama$t$, lieu = $t$Bobo-Dioulasso, Burkina Faso$t$, profil = $t$Structure, 25 personnes$t$, reponse_attendue = null
  where numero = 1 and tache_id in (select id from taches where code = $t$F15$t$);

update exercices set titre_local = $t$Formateur en bureautique à son compte à Abidjan$t$, contexte_local = $t$Vous êtes formateur en bureautique, seul, à Marcory. Le gérant d'une PME accepte de vous recevoir quinze minutes. Vous voulez lui présenter votre formation sur votre téléphone, en cinq diapositives.$t$, donnees_local = $t$- La formation : « Excel pour la gestion de tous les jours », deux journées, dans les locaux du client.
- Pour qui : les assistantes et les comptables, 8 participants au plus.
- À la fin, les participants savent tenir un tableau de suivi, faire un total, un tri et un graphique simple.
- Vous avez déjà formé le personnel de deux PME d'Abidjan. Vous ne citez pas leur nom.
- Le prix se donne sur devis, selon le nombre de participants.$t$, travail_local = $t$Préparez le plan des cinq diapositives, avec une dernière diapositive qui propose la suite : un devis sous 48 heures.$t$, prenom = $t$Konan$t$, lieu = $t$Abidjan, Côte d'Ivoire$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F15$t$);

update exercices set titre_local = $t$Cheffe de projet dans une entreprise de services à Cotonou$t$, contexte_local = $t$Vous êtes cheffe de projet chez Agbalè Services, une entreprise de 10 personnes. Dans trois semaines, l'entreprise organise une journée portes ouvertes pour ses clients. Le gérant vous confie l'organisation. Voici votre liste en vrac.$t$, donnees_local = $t$- Envoyer les invitations sur WhatsApp et par e-mail, puis relancer une semaine avant.
- Réserver les chaises et les bâches. Le loueur demande une confirmation dix jours avant.
- Faire imprimer une bâche et 100 flyers. L'imprimeur demande cinq jours.
- Préparer la présentation du gérant et la démonstration des services.
- Commander le repas auprès d'un traiteur, pour 50 personnes.
- Prévoir un groupe électrogène : une coupure pour travaux est annoncée dans le quartier cette semaine-là.
- L'équipe : vous, une assistante, un commercial et un technicien.$t$, travail_local = $t$Transformez cette liste en plan d'action sur trois semaines : les tâches dans l'ordre, un responsable et une date pour chacune, et ce qui doit être fait en premier.$t$, prenom = $t$Nadège$t$, lieu = $t$Cotonou, Bénin$t$, profil = $t$Structure, 10 personnes$t$, reponse_attendue = null
  where numero = 1 and tache_id in (select id from taches where code = $t$F16$t$);

update exercices set titre_local = $t$Peintre en bâtiment à son compte à Douala$t$, contexte_local = $t$Vous êtes peintre en bâtiment, avec deux ouvriers. Un commerçant vous confie la remise en état de sa boutique. Il veut rouvrir dans dix jours. C'est la saison des pluies.$t$, donnees_local = $t$- Vider et protéger la boutique : une demi-journée.
- Reboucher et poncer les murs : deux jours. Il faut ensuite un jour de séchage avant de peindre.
- Peindre l'intérieur, en deux couches : trois jours.
- Peindre la façade : un jour, seulement par temps sec.
- Le carreleur du client doit passer une journée, avant la peinture.
- La peinture se commande deux jours à l'avance.$t$, travail_local = $t$Préparez le planning des dix jours, dites ce qui risque de retarder la réouverture, puis rédigez le message qui annonce le planning au client.$t$, prenom = $t$Achille$t$, lieu = $t$Douala, Cameroun$t$, profil = $t$Individuelle, 3 personnes$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F16$t$);

update exercices set titre_local = $t$Commercial dans une agence digitale à Dakar$t$, contexte_local = $t$Vous êtes commercial chez Ndanane Digital, une agence de 7 personnes. Ce mois-ci, vous prospectez trois entreprises de Dakar qui n'ont pas de site, et vous relancez un devis resté sans réponse.$t$, donnees_local = $t$- Prospect 1 : une école privée des Parcelles Assainies. Sa page Facebook est active, les inscriptions se font par téléphone.
- Prospect 2 : un restaurant du Plateau. Il publie ses menus en photo, sans prix ni horaires.
- Prospect 3 : une clinique de Ouakam, recommandée par un de vos clients.
- Vos offres : un site vitrine à 180 000 FCFA ; la gestion d'une page à 140 000 FCFA par mois.
- Le devis à relancer : un site vitrine, envoyé il y a dix jours à une boutique de meubles.$t$, travail_local = $t$Rédigez le premier message pour chacun des trois prospects, puis la relance du devis. Aucun premier message ne cite de prix : chacun propose un court échange.$t$, prenom = $t$Cheikh$t$, lieu = $t$Dakar, Sénégal$t$, profil = $t$Structure, 7 personnes$t$, reponse_attendue = null
  where numero = 1 and tache_id in (select id from taches where code = $t$F17$t$);

update exercices set titre_local = $t$Vendeur de fournitures de bureau à Niamey$t$, contexte_local = $t$Vous vendez des fournitures de bureau, avec un livreur. Vous livrez les écoles, les ONG et les petites entreprises de Niamey. La rentrée approche et vous voulez gagner de nouveaux clients.$t$, donnees_local = $t$- Vous vendez du papier, des cahiers, des stylos, des cartouches d'encre et des classeurs.
- Vous livrez dans la journée.
- Paiement par Airtel Money, en espèces, ou sur facture pour les ONG.
- Votre prospect : la directrice d'une école privée, dont une cliente vous a donné le contact.
- Vous lui avez écrit il y a une semaine, sans réponse.$t$, travail_local = $t$Rédigez le premier message tel qu'il aurait dû être, la relance à envoyer aujourd'hui, et le dernier message à envoyer dans une semaine si elle ne répond pas.$t$, prenom = $t$Abdoulaye$t$, lieu = $t$Niamey, Niger$t$, profil = $t$Individuelle, 2 personnes$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F17$t$);

update exercices set titre_local = $t$Commercial dans une imprimerie à Abidjan$t$, contexte_local = $t$Vous êtes commercial chez Riviera Print, une imprimerie et un studio graphique de 9 personnes, à Cocody. Une école de formation prépare sa journée portes ouvertes et vous demande une proposition, avec deux formules.$t$, donnees_local = $t$- 1 000 flyers au format A5 : 90 000 FCFA les 1 000.
- 500 cartes de visite : 10 000 FCFA les 100.
- Une bâche imprimée de 2 mètres carrés : 10 000 FCFA le mètre carré.
- Formule 1 : les flyers et les cartes de visite. Formule 2 : les flyers, les cartes de visite et la bâche.
- Acompte de 50 % à la commande. Livraison sous 5 jours après l'acompte.
- Paiement par Orange Money, par Wave ou par virement. La proposition est valable 15 jours.$t$, travail_local = $t$Rédigez la proposition avec les deux formules, le total et l'acompte de chacune, puis le message d'envoi.$t$, prenom = $t$Serge$t$, lieu = $t$Abidjan, Côte d'Ivoire$t$, profil = $t$Structure, 9 personnes$t$, reponse_attendue = $t$Formule 1 : 140 000 FCFA, soit 90 000 + 50 000, acompte 70 000 FCFA. Formule 2 : 160 000 FCFA, soit 140 000 + 20 000, acompte 80 000 FCFA.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F18$t$);

update exercices set titre_local = $t$Graphiste à son compte à Cotonou$t$, contexte_local = $t$Vous êtes graphiste à votre compte, à Cadjèhoun. Le gérant d'un nouveau restaurant vous demande un devis pour son identité visuelle, avant l'ouverture.$t$, donnees_local = $t$- Création d'un logo : 20 000 FCFA.
- 2 affiches : 4 500 FCFA l'affiche.
- 4 visuels pour les réseaux sociaux : 4 000 FCFA le visuel.
- Acompte de 50 % à la commande, par MTN MoMo. Le solde se paie à la livraison.
- Délai : 6 jours après l'acompte. Deux séries de modifications sont comprises.
- Le devis est valable 10 jours.$t$, travail_local = $t$Rédigez la proposition : la demande du client, votre offre ligne par ligne, le total, l'acompte, les conditions, puis le message d'envoi.$t$, prenom = $t$Moussa$t$, lieu = $t$Cotonou, Bénin$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = $t$Total 45 000 FCFA, soit 20 000 + 9 000 + 16 000 ; acompte 22 500 FCFA ; reste à payer 22 500 FCFA.$t$
  where numero = 2 and tache_id in (select id from taches where code = $t$F18$t$);

update exercices set titre_local = $t$Commercial chez un grossiste à Cotonou$t$, contexte_local = $t$Vous êtes commercial chez un grossiste en produits alimentaires de 9 personnes, près du marché Dantokpa. Vos revendeurs paient à 15 jours. Vendredi, le gérant vous demande le point des factures en retard.$t$, donnees_local = $t$- F-101 : 20 sacs de riz de 50 kg à 19 000 FCFA, soit 380 000 FCFA. 100 000 FCFA déjà payés par MTN MoMo. Échue depuis 35 jours, 2 relances.
- F-102 : 10 sacs de riz de 50 kg à 19 000 FCFA, soit 190 000 FCFA. Rien de payé. Échue depuis 12 jours, 1 relance.
- F-103 : 30 litres d'huile à 1 650 FCFA et 50 kg de sucre à 600 FCFA, soit 79 500 FCFA. Rien de payé. Échue depuis 5 jours, aucune relance.
- F-104 : 5 sacs de riz de 50 kg à 19 000 FCFA, soit 95 000 FCFA. L'échéance tombe dans 3 jours.$t$, travail_local = $t$Calculez le total en retard, classez les factures de la plus ancienne à la plus récente, puis rédigez la relance qui convient à chacune. Dites quoi faire de la facture F-104.$t$, prenom = $t$Gildas$t$, lieu = $t$Cotonou, Bénin$t$, profil = $t$Structure, 9 personnes$t$, reponse_attendue = $t$Total en retard : 549 500 FCFA, soit 280 000 + 190 000 + 79 500. La facture F-104 n'est pas en retard : elle ne se relance pas.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F21$t$);

update exercices set titre_local = $t$Chargée de communication à son compte à Dakar$t$, contexte_local = $t$Vous gérez seule les pages de petites entreprises, à Ouakam. Trois clients vous doivent de l'argent. Vous n'osez pas réclamer, et la fin du mois approche.$t$, donnees_local = $t$- Client A : gestion de sa page, 85 000 FCFA par mois. Deux mois impayés. Vous l'avez relancé une fois.
- Client B : un logo à 62 500 FCFA. Acompte de 30 000 FCFA reçu par Wave. Le logo est livré depuis 20 jours, aucune relance.
- Client C : 4 visuels à 5 000 FCFA le visuel, livrés il y a 8 jours. Rien de payé, aucune relance.$t$, travail_local = $t$Calculez ce que chaque client vous doit et le total, puis rédigez une relance adaptée à chacun : plus ferme pour le client A, courtoise pour les deux autres.$t$, prenom = $t$Awa$t$, lieu = $t$Dakar, Sénégal$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = $t$Client A : 170 000 FCFA ; client B : 32 500 FCFA ; client C : 20 000 FCFA. Total : 222 500 FCFA.$t$
  where numero = 2 and tache_id in (select id from taches where code = $t$F21$t$);

update exercices set titre_local = $t$Responsable des achats dans une quincaillerie à Lomé$t$, contexte_local = $t$Vous êtes responsable des achats dans une quincaillerie de 12 personnes, à Tokoin. Trois commandes sont en cours. Ce matin, deux fournisseurs vous écrivent sur WhatsApp.$t$, donnees_local = $t$- Commande 1 : 200 sacs de ciment, livraison promise mercredi. Trois clients attendent ce ciment pour jeudi.
- Commande 2 : 40 rouleaux de câble électrique, livraison promise vendredi.
- Commande 3 : 60 pots de peinture blanche, livraison promise lundi prochain.
- Le fournisseur de ciment : « Bonjour. Notre camion est retenu, la livraison est reportée à samedi. Nous pouvons livrer 80 sacs mercredi si vous envoyez votre véhicule. »
- Le fournisseur de peinture : « La référence commandée est en rupture. Nous proposons une autre marque, même contenance. Merci de confirmer. »$t$, travail_local = $t$Faites le point des trois commandes, dites ce que chaque changement entraîne, puis rédigez la réponse à chaque fournisseur et le message aux trois clients qui attendent le ciment.$t$, prenom = $t$Komlan$t$, lieu = $t$Lomé, Togo$t$, profil = $t$Structure, 12 personnes$t$, reponse_attendue = null
  where numero = 1 and tache_id in (select id from taches where code = $t$F22$t$);

update exercices set titre_local = $t$Gérante d'un restaurant à Bamako$t$, contexte_local = $t$Vous tenez un restaurant avec trois employés. Samedi à 13 h, vous servez un repas de baptême de 80 personnes. Vos commandes sont passées, et deux fournisseurs vous écrivent jeudi.$t$, donnees_local = $t$- Riz et huile chez votre grossiste : commande confirmée, livrée vendredi matin.
- 25 poulets : le fournisseur écrit « je n'en ai que 15 pour vendredi, les 10 autres samedi à 10 h ».
- Boissons : le fournisseur écrit « la marque demandée manque, je remplace par une autre, même prix ».
- La cuisson des poulets demande trois heures.$t$, travail_local = $t$Dites quelles commandes posent un problème pour samedi, ce que vous demandez à chaque fournisseur, puis rédigez les deux réponses.$t$, prenom = $t$Kadiatou$t$, lieu = $t$Bamako, Mali$t$, profil = $t$Individuelle, 4 personnes$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F22$t$);

update exercices set titre_local = $t$Responsable commercial d'une pâtisserie à Douala$t$, contexte_local = $t$Vous êtes responsable commercial de Bonapriso Délices, une pâtisserie de 9 personnes. Le mois dernier, vous avez relevé dix avis de clients sur WhatsApp et sur Facebook.$t$, donnees_local = $t$- « Gâteau d'anniversaire magnifique, tout le monde a aimé. »
- « Commande livrée avec une heure de retard, la fête avait commencé. »
- « Très bon, mais le prix a augmenté sans prévenir. »
- « Le livreur ne trouvait pas la maison, il m'a appelée quatre fois. »
- « Service au comptoir très accueillant. »
- « Le message sur le gâteau avait une faute dans le prénom. »
- « Livraison en retard, encore une fois. »
- « Les petits fours sont très bons. »
- « Personne ne répond sur WhatsApp après 18 h. »
- « Gâteau conforme à la photo, merci. »$t$, travail_local = $t$Regroupez ces dix avis par sujet, comptez-les, dites les deux points à corriger en premier, puis rédigez la réponse à l'avis sur le retard et à l'avis sur la faute dans le prénom.$t$, prenom = $t$Brice$t$, lieu = $t$Douala, Cameroun$t$, profil = $t$Structure, 9 personnes$t$, reponse_attendue = null
  where numero = 1 and tache_id in (select id from taches where code = $t$F26$t$);

update exercices set titre_local = $t$Vendeuse de beurre de karité à Ouagadougou$t$, contexte_local = $t$Vous vendez du beurre de karité et des savons, avec deux employées. Après chaque livraison, vous demandez l'avis de la cliente. Voici les huit derniers retours.$t$, donnees_local = $t$- « Le beurre est très bon, je recommande. »
- « Le pot est arrivé ouvert dans le sac. »
- « J'aurais aimé un plus petit format pour essayer. »
- « Livraison rapide, merci. »
- « Le savon sèche un peu la peau. »
- « Pot mal fermé, une partie a coulé. »
- « Très bien, mais je ne savais pas comment le conserver. »
- « Vous devriez faire un lot beurre et savon. »$t$, travail_local = $t$Regroupez ces huit retours par sujet, dites ce qu'il faut corriger en premier, relevez les idées de vos clientes, puis rédigez la réponse aux deux clientes dont le pot était mal fermé.$t$, prenom = $t$Aminata$t$, lieu = $t$Ouagadougou, Burkina Faso$t$, profil = $t$Individuelle, 3 personnes$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F26$t$);

update exercices set titre_local = $t$Commerciale chez un distributeur de cosmétiques à Abidjan$t$, contexte_local = $t$Vous êtes commerciale chez un distributeur de produits cosmétiques de 15 personnes, à Adjamé. Vous suivez dix revendeuses, qui achètent des crèmes à 4 000 FCFA en gros. Avant les fêtes, la direction veut une offre différente selon le profil. Voici leurs achats des six derniers mois.$t$, donnees_local = $t$- R-01 : dernier achat il y a 6 jours, 9 commandes, 720 000 FCFA.
- R-02 : dernier achat il y a 150 jours, 1 commande, 40 000 FCFA.
- R-03 : dernier achat il y a 10 jours, 7 commandes, 560 000 FCFA.
- R-04 : dernier achat il y a 95 jours, 4 commandes, 320 000 FCFA.
- R-05 : dernier achat il y a 20 jours, 1 commande, 400 000 FCFA.
- R-06 : dernier achat il y a 12 jours, 2 commandes, 80 000 FCFA. Sa première commande date du mois dernier.
- R-07 : dernier achat il y a 170 jours, 2 commandes, 60 000 FCFA.
- R-08 : dernier achat il y a 4 jours, 8 commandes, 640 000 FCFA.
- R-09 : dernier achat il y a 110 jours, 5 commandes, 400 000 FCFA.
- R-10 : dernier achat il y a 30 jours, 1 commande, 360 000 FCFA.$t$, travail_local = $t$Répartissez ces dix revendeuses en quatre ou cinq groupes, donnez le critère et le total acheté de chaque groupe, puis proposez une action pour chacun avant les fêtes.$t$, prenom = $t$Mariam$t$, lieu = $t$Abidjan, Côte d'Ivoire$t$, profil = $t$Structure, 15 personnes$t$, reponse_attendue = $t$Total des dix revendeuses : 3 580 000 FCFA. Un classement possible : fidèles (R-01, R-03, R-08) 1 920 000 FCFA ; grosses commandes isolées (R-05, R-10) 760 000 FCFA ; en perte de vitesse (R-04, R-09) 720 000 FCFA ; inactives (R-02, R-07) 100 000 FCFA ; nouvelle (R-06) 80 000 FCFA.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F27$t$);

update exercices set titre_local = $t$Gérante d'une salle de sport à Libreville$t$, contexte_local = $t$Vous tenez une petite salle de sport avec deux coachs. Les abonnements annuels se renouvellent en janvier. Vous voulez savoir à qui parler avant, et comment. Voici six profils d'abonnés.$t$, donnees_local = $t$- A-01 : inscrite depuis 3 ans, vient 4 fois par mois.
- A-02 : inscrit depuis 2 mois, vient 12 fois par mois.
- A-03 : inscrite depuis 4 ans, ne vient presque plus : une fois en deux mois.
- A-04 : inscrit depuis 1 an, vient 8 fois par mois, a amené deux amis.
- A-05 : inscrite depuis 6 mois, venait 10 fois par mois, 2 fois ce mois-ci.
- A-06 : inscrit depuis 2 ans, vient 6 fois par mois, toujours le samedi.$t$, travail_local = $t$Dites quel abonné risque le plus de ne pas renouveler, lequel peut recommander la salle, puis proposez un message adapté à trois groupes : les assidus, ceux qui décrochent, les nouveaux.$t$, prenom = $t$Prisca$t$, lieu = $t$Libreville, Gabon$t$, profil = $t$Individuelle, 3 personnes$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F27$t$);

-- 4. Les modèles à remplir, leurs champs et la note par IA
insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Gestion et tri des e-mails$t$, $t$Rôle : Vous m'aidez à trier mes messages et à y répondre vite, sans rien oublier.

Contexte : Mon activité : {{activite}}. Mes messages en attente, résumés un par un, sans nom ni numéro : {{messages}}. Ce qui compte le plus pour moi en ce moment : {{priorites}}.

Travail demandé :
1. Un classement en trois groupes : à traiter aujourd'hui, à traiter cette semaine, à classer sans réponse.
2. Pour chaque message à traiter : l'action à faire, en une ligne.
3. Une réponse courte pour chaque message qui en attend une, avec une salutation.
4. Les informations qui me manquent pour répondre.

Format : une liste numérotée dans l'ordre d'urgence. Réponses de 3 lignes au plus, prêtes à coller.

Règle : ne promettez rien à ma place : ni date, ni prix, ni paiement. Si un message est ambigu, dites-le au lieu de deviner. Ne demandez aucun nom ni numéro.$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F01$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$gérante d'un salon de coiffure à Abidjan, seule$t$, true, 1),
    ($t$messages$t$, $t$Quels messages attendent une réponse ?$t$, $t$long$t$, null::jsonb, $t$une cliente fidèle annule son rendez-vous de mardi 14 h et demande un autre jour ; un numéro inconnu demande le prix des tresses et le dernier prix ; mon fournisseur de mèches annonce une rupture jusqu'au 20 et propose une autre marque, un peu plus chère ; une cliente a envoyé la capture d'un transfert Wave, avance pour une coiffure de mariage samedi ; le propriétaire rappelle le loyer de 150 000 FCFA, à régler avant le 5 ; trois personnes demandent un rendez-vous cette semaine$t$, true, 2),
    ($t$priorites$t$, $t$Qu'est-ce qui compte le plus pour vous en ce moment ?$t$, $t$texte$t$, null::jsonb, $t$ne pas perdre la coiffure de mariage de samedi et régler le loyer avant le 5$t$, false, 3)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F01$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Rédaction et correction de documents professionnels$t$, $t$Rôle : Vous rédigez et corrigez des documents professionnels en français clair et correct.

Contexte : Mon activité : {{activite}}. Le document à produire : {{document}}. Le destinataire : {{destinataire}}. Mon brouillon ou mes notes : {{brouillon}}. Le ton voulu : {{ton}}.

Travail demandé :
1. Le document complet, corrigé, avec une formule d'appel et une formule de politesse.
2. La liste de ce que vous avez changé ou ajouté, en 5 lignes au plus.
3. Les informations qui manquent, s'il y en a.

Format : texte simple, sans astérisque, prêt à coller dans Google Docs ou Word. Une page au plus. Montants écrits ainsi : 25 000 FCFA.

Règle : gardez tous mes faits, mes dates et mes montants, sans en ajouter. Si un calcul est nécessaire, montrez-le. Si une information manque, laissez un blanc entre crochets et signalez-le.$t$, 2, $t$Une IA peut se tromper dans un calcul. Vérifiez chaque total.$t$, 1, '2026-10-04' from taches t
  where t.code = $t$F03$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$gérante d'un service traiteur à Cotonou$t$, true, 1),
    ($t$document$t$, $t$Quel document voulez-vous ?$t$, $t$texte$t$, null::jsonb, $t$une lettre d'offre pour un repas de fin d'année$t$, true, 2),
    ($t$destinataire$t$, $t$À qui s'adresse-t-il ?$t$, $t$texte$t$, null::jsonb, $t$la direction d'une entreprise voisine$t$, true, 3),
    ($t$brouillon$t$, $t$Quel est votre brouillon, ou quelles sont vos notes ?$t$, $t$long$t$, null::jsonb, $t$repas pour 60 personnes le vendredi 18 décembre à 13 h, dans leurs locaux ; 2 000 FCFA le plat, boisson non comprise ; livraison et service offerts à partir de 50 plats ; avance de la moitié à la commande, par MTN MoMo ou en espèces ; commande à confirmer dix jours avant$t$, true, 4),
    ($t$ton$t$, $t$Quel ton voulez-vous ?$t$, $t$choix$t$, $j$["professionnel et chaleureux", "très formel", "simple et direct"]$j$::jsonb, $t$professionnel et chaleureux$t$, true, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F03$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Transcription et résumé de réunions et interviews$t$, $t$Rôle : Vous transformez des notes de réunion ou de rendez-vous en un compte rendu clair et fidèle.

Contexte : Mon activité : {{activite}}. La réunion ou le rendez-vous : {{reunion}}. Mes notes en vrac, sans nom complet ni numéro : {{notes}}. À qui j'envoie le compte rendu : {{destinataire}}.

Travail demandé :
1. L'essentiel en 5 lignes au plus.
2. Les décisions prises.
3. Les actions à faire : quoi, qui, pour quand.
4. Ce qui reste à décider ou à vérifier.
5. Le message d'envoi, en 3 lignes, avec une salutation.

Format : texte simple, sans astérisque, prêt à coller dans WhatsApp ou dans un e-mail.

Règle : n'ajoutez rien qui ne soit pas dans mes notes. Si une date, un responsable ou un chiffre manque, écrivez « à préciser ». Gardez les chiffres tels que je les ai notés.$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F04$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$vendeuse de bazin à Bamako, avec une vendeuse$t$, true, 1),
    ($t$reunion$t$, $t$De quelle réunion ou de quel rendez-vous s'agit-il ?$t$, $t$texte$t$, null::jsonb, $t$le rendez-vous d'une cliente qui commande des tenues pour le mariage de sa fille$t$, true, 2),
    ($t$notes$t$, $t$Quelles sont vos notes ?$t$, $t$long$t$, null::jsonb, $t$mariage le samedi 28 novembre. 12 tenues pour la famille, même couleur, bleu ciel si possible. elle revient jeudi avec les mesures. elle veut voir trois qualités de bazin avant de choisir. le tailleur doit avoir le tissu au plus tard le 10 novembre. elle paie une avance par Orange Money quand elle a choisi. elle demande un prix pour l'ensemble, je dois lui répondre demain$t$, true, 3),
    ($t$destinataire$t$, $t$À qui envoyez-vous le compte rendu ?$t$, $t$texte$t$, null::jsonb, $t$à moi-même, avec un message pour la cliente$t$, true, 4)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F04$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Planification de rendez-vous et gestion d'agenda$t$, $t$Rôle : Vous m'aidez à organiser mes rendez-vous sans chevauchement et sans trajets inutiles.

Contexte : Mon activité : {{activite}}. Mes créneaux libres : {{disponibilites}}. Les rendez-vous à placer, avec leur durée et leur lieu : {{rendez_vous}}. Les contraintes : {{contraintes}}.

Travail demandé :
1. Un planning jour par jour : heure de début, heure de fin, rendez-vous, lieu.
2. Les rendez-vous regroupés par zone, pour limiter les trajets.
3. Ce qui ne tient pas dans mes créneaux, et ce que vous proposez de déplacer.
4. Un message de confirmation de 3 lignes, à adapter pour chaque personne, avec une salutation.

Format : une liste par jour, puis le message. Heures écrites ainsi : 14 h 30.

Règle : ne placez aucun rendez-vous hors de mes créneaux libres. Respectez chaque contrainte. Si une durée manque, demandez-la. Montrez le calcul des heures par jour.$t$, 2, $t$Une IA peut se tromper dans un calcul. Vérifiez chaque total.$t$, 1, '2026-10-04' from taches t
  where t.code = $t$F05$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$technicien en froid et climatisation à mon compte, à Libreville$t$, true, 1),
    ($t$disponibilites$t$, $t$Quand êtes-vous libre ?$t$, $t$texte$t$, null::jsonb, $t$du lundi au vendredi, de 8 h à 17 h, sauf mercredi après-midi$t$, true, 2),
    ($t$rendez_vous$t$, $t$Quels rendez-vous faut-il placer ?$t$, $t$long$t$, null::jsonb, $t$3 entretiens de climatiseur au nord de la ville, 1 heure chacun ; 2 dépannages au centre-ville, 2 heures chacun ; 1 installation au sud de la ville, une demi-journée ; 1 devis au centre-ville, 30 minutes$t$, true, 3),
    ($t$contraintes$t$, $t$Quelles contraintes faut-il respecter ?$t$, $t$long$t$, null::jsonb, $t$un client du centre-ville n'est là que le matin ; l'installation doit être faite avant vendredi ; pas de long trajet après 16 h, à cause de la pluie$t$, false, 4)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F05$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Service client de premier niveau (FAQ)$t$, $t$Rôle : Vous préparez des réponses types aux questions fréquentes de mes clients.

Contexte : Mon activité : {{activite}}. Les questions qui reviennent le plus : {{questions}}. Mes informations exactes (prix, délais, paiement, livraison, garantie) : {{informations}}. Ce que je ne fais pas ou ne dis pas par message : {{limites}}.

Travail demandé :
1. Une réponse type par question, de 3 lignes au plus, avec une salutation.
2. Un mot-clé court pour chaque réponse, pour l'enregistrer comme réponse rapide.
3. Les questions auxquelles mes informations ne permettent pas de répondre.

Format : texte simple, sans astérisque, prêt à coller dans WhatsApp. Montants écrits ainsi : 25 000 FCFA.

Règle : utilisez seulement mes informations. N'inventez ni prix, ni délai, ni garantie. Si une information manque, écrivez la question à me poser. Restez poli, même pour dire non.$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F06$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$couturière à mon compte à Dakar, avec une apprentie$t$, true, 1),
    ($t$questions$t$, $t$Quelles questions reviennent le plus ?$t$, $t$long$t$, null::jsonb, $t$le prix d'une tenue ; le délai ; « vous livrez ? » ; « je peux payer après ? » ; « et si ça ne me va pas ? »$t$, true, 2),
    ($t$informations$t$, $t$Quelles sont vos informations exactes ?$t$, $t$long$t$, null::jsonb, $t$couture d'une tenue simple, main-d'œuvre seule : 10 000 FCFA, tissu apporté par la cliente ; délai d'une semaine, deux semaines avant la Tabaski et la Korité ; avance de la moitié par Wave ou en espèces, le reste à la livraison ; livraison à moto dans Dakar : 1 500 FCFA, à la charge de la cliente ; une retouche gratuite dans les sept jours$t$, true, 3),
    ($t$limites$t$, $t$Qu'est-ce que vous ne faites pas, ou ne dites pas par message ?$t$, $t$texte$t$, null::jsonb, $t$je ne fais pas de vente à crédit$t$, false, 4)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F06$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Veille sectorielle et recherche d'informations$t$, $t$Rôle : Vous m'aidez à faire le point sur mon marché, en séparant les faits des suppositions.

Contexte : Mon activité : {{activite}}. Le sujet de ma veille : {{sujet}}. Ce que j'ai relevé, avec la source de chaque information : {{informations}}. La décision que je dois prendre : {{decision}}.

Travail demandé :
1. Les faits vérifiés, en liste.
2. Ce qui reste une supposition ou une rumeur, et comment le vérifier.
3. Les informations qui manquent pour décider.
4. Deux ou trois options, avec ce que chacune suppose.

Format : une note d'une demi-page, en texte simple, sans astérisque.

Règle : partez seulement de ce que j'ai relevé. Si vous ajoutez une information, donnez sa source et dites qu'elle est à vérifier. N'inventez aucun prix ni aucun chiffre. Ne citez aucune entreprise par son nom.$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F07$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$vendeuse de produits cosmétiques sur WhatsApp, seule, à Cotonou$t$, true, 1),
    ($t$sujet$t$, $t$Sur quoi porte votre veille ?$t$, $t$texte$t$, null::jsonb, $t$ajouter des perruques à mon offre$t$, true, 2),
    ($t$informations$t$, $t$Qu'avez-vous relevé, et d'où vient chaque information ?$t$, $t$long$t$, null::jsonb, $t$trois vendeuses en ligne affichent leurs perruques entre 10 500 et 13 500 FCFA (vu en ligne) ; une amie dit que tout le monde en vend (non vérifié) ; deux clientes m'en ont demandé le mois dernier ; un grossiste de Dantokpa m'a donné un prix de gros, sans l'écrire ; je ne connais pas la quantité minimale à commander$t$, true, 3),
    ($t$decision$t$, $t$Quelle décision devez-vous prendre ?$t$, $t$texte$t$, null::jsonb, $t$commander ou non un premier lot de perruques$t$, true, 4)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F07$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Analyse de données et création de rapports$t$, $t$Rôle : Vous analysez mes chiffres et vous en tirez un rapport court et vérifiable.

Contexte : Mon activité : {{activite}}. Mes chiffres, sans nom ni numéro de client : {{donnees}}. La question à laquelle le rapport doit répondre : {{question}}. À qui il s'adresse : {{destinataire}}.

Travail demandé :
1. Les totaux et les moyennes utiles, avec chaque calcul montré.
2. Ce qui monte, ce qui baisse, et ce qui sort de l'ordinaire.
3. La réponse à ma question, en 3 lignes.
4. Deux ou trois décisions possibles, sans les prendre à ma place.

Format : un rapport de 10 lignes au plus, puis un petit tableau des totaux. Texte simple, sans astérisque. Montants écrits ainsi : 25 000 FCFA.

Règle : calculez seulement avec mes chiffres. N'inventez aucune donnée. N'expliquez pas une hausse ou une baisse par une cause que je n'ai pas donnée : posez-la comme une question. Si un chiffre semble faux, signalez-le.$t$, 2, $t$Une IA peut se tromper dans un calcul. Vérifiez chaque total.$t$, 1, '2026-10-04' from taches t
  where t.code = $t$F08$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$gérante d'un petit restaurant à Yaoundé, avec deux employées$t$, true, 1),
    ($t$donnees$t$, $t$Quels sont vos chiffres ?$t$, $t$long$t$, null::jsonb, $t$repas servis par jour sur quatre semaines. Lundi : 38, 41, 35, 40. Mardi : 42, 39, 44, 43. Mercredi : 40, 45, 38, 41. Jeudi : 47, 50, 46, 49. Vendredi : 66, 71, 64, 75. Samedi : 58, 62, 55, 61. Fermé le dimanche$t$, true, 2),
    ($t$question$t$, $t$À quelle question le rapport doit-il répondre ?$t$, $t$texte$t$, null::jsonb, $t$quels jours faut-il renforcer l'équipe ?$t$, true, 3),
    ($t$destinataire$t$, $t$À qui s'adresse le rapport ?$t$, $t$texte$t$, null::jsonb, $t$à moi-même$t$, false, 4)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F08$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Nettoyage, enrichissement et qualification de bases CRM$t$, $t$Rôle : Vous m'aidez à nettoyer mon fichier de clients et à classer mes contacts.

Contexte : Mon activité : {{activite}}. Mes contacts, un par un, avec un code à la place du nom et sans numéro : {{contacts}}. Ce que je prépare : {{objectif}}.

Travail demandé :
1. Les doublons sûrs, et les doublons à vérifier, avec la raison.
2. Pour chaque doublon, la fiche à garder et ce qu'il faut y reporter.
3. Les informations qui manquent, contact par contact.
4. Un classement en trois groupes : à contacter en premier, à relancer, à ne pas contacter. Une raison par contact.

Format : une liste par groupe, avec le code de chaque contact. Texte simple, sans astérisque.

Règle : ne réunissez aucune fiche vous-même : proposez, je décide. Un contact qui a demandé à ne plus être contacté va toujours dans le dernier groupe. Ne devinez aucune information manquante. Ne demandez aucun nom ni numéro.$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F10$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$vendeuse de sacs et de bijoux à Lomé, seule$t$, true, 1),
    ($t$contacts$t$, $t$Quels contacts voulez-vous classer ?$t$, $t$long$t$, null::jsonb, $t$C-01 : a acheté trois fois cette année, la dernière fois il y a deux semaines. C-02 : a demandé le prix d'un sac il y a quatre mois, sans suite. C-03 : a acheté une fois l'an dernier, réagit souvent à mes statuts. C-04 : a versé une avance le mois dernier, puis n'a plus répondu. C-05 : numéro inconnu, un seul message il y a un an. C-06 : revendeuse à Kara, achète par lots, dernier achat il y a deux mois. C-07 : a demandé à ne plus recevoir mes messages. C-08 : cliente de la diaspora, commande chaque année en décembre$t$, true, 2),
    ($t$objectif$t$, $t$Que préparez-vous ?$t$, $t$texte$t$, null::jsonb, $t$savoir à qui écrire avant les fêtes de fin d'année$t$, true, 3)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F10$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Extraction d'informations et préparation de la saisie$t$, $t$Rôle : Vous extrayez les informations d'un document et vous les rangez dans un tableau prêt à saisir.

Contexte : Mon activité : {{activite}}. Le type de document : {{document}}. Son contenu, recopié ou joint en photo, sans donnée personnelle inutile : {{contenu}}. Les colonnes de mon tableau : {{colonnes}}.

Travail demandé :
1. Le tableau de saisie, une ligne par document, avec mes colonnes.
2. Chaque calcul montré, quand un montant se calcule.
3. La liste des informations illisibles, manquantes ou douteuses, document par document.
4. La question à poser pour chaque information manquante.

Format : un tableau simple, puis les deux listes. Montants écrits ainsi : 25 000 FCFA.

Règle : ne devinez jamais une information illisible : écrivez « illisible » ou « manquant ». Ne complétez aucun numéro. Recopiez les chiffres tels qu'ils sont écrits, et signalez ceux qui ne tombent pas juste.$t$, 2, $t$Une IA peut se tromper dans un calcul. Vérifiez chaque total.$t$, 1, '2026-10-04' from taches t
  where t.code = $t$F11$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$responsable d'un atelier de formation en couture à Niamey$t$, true, 1),
    ($t$document$t$, $t$De quel type de document s'agit-il ?$t$, $t$texte$t$, null::jsonb, $t$des fiches d'inscription remplies à la main$t$, true, 2),
    ($t$contenu$t$, $t$Que contient le document ?$t$, $t$long$t$, null::jsonb, $t$Fiche 1 : prénom Rakia, née en 2004, quartier indiqué, numéro finissant par 31, niveau débutante, formation de 6 mois, personne à prévenir non renseignée. Fiche 2 : prénom Hadiza, année de naissance illisible, numéro finissant par 08, niveau non coché, formation de 6 mois. Fiche 3 : prénom Mariama, née en 2001, quartier non indiqué, deux numéros dont un barré, niveau « a déjà cousu », durée non cochée$t$, true, 3),
    ($t$colonnes$t$, $t$Quelles sont les colonnes de votre tableau ?$t$, $t$texte$t$, null::jsonb, $t$prénom, année de naissance, quartier, fin du numéro, niveau, durée de la formation, personne à prévenir$t$, true, 4)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F11$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Analyse et comparaison d'un dossier documentaire$t$, $t$Rôle : Vous comparez deux documents point par point, sans prendre parti avant d'avoir tout comparé.

Contexte : Mon activité : {{activite}}. Ce que je compare : {{sujet}}. Le premier document : {{document_a}}. Le second document : {{document_b}}. Ce qui compte le plus pour moi : {{criteres}}.

Travail demandé :
1. Un tableau comparatif, point par point.
2. Le coût total de chaque option quand il se calcule, avec le calcul montré.
3. Les trois différences qui comptent le plus pour moi.
4. Une recommandation en 3 lignes, et les questions à poser avant de décider.

Format : un tableau simple, puis du texte sans astérisque. Montants écrits ainsi : 25 000 FCFA.

Règle : comparez seulement ce qui est écrit dans les deux documents. Si un point figure dans l'un et pas dans l'autre, signalez-le au lieu de le deviner. Ne donnez aucun avis juridique.$t$, 2, $t$Une IA peut se tromper dans un calcul. Vérifiez chaque total.$t$, 1, '2026-10-04' from taches t
  where t.code = $t$F13$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$gérant d'un restaurant à Dakar, avec trois employés$t$, true, 1),
    ($t$sujet$t$, $t$Que comparez-vous ?$t$, $t$texte$t$, null::jsonb, $t$les conditions de deux grossistes pour ma commande du mois : 6 sacs de riz de 50 kg et 20 litres d'huile$t$, true, 2),
    ($t$document_a$t$, $t$Que dit le premier document ?$t$, $t$long$t$, null::jsonb, $t$sac de riz de 50 kg à 13 500 FCFA, huile à 1 000 FCFA le litre, livraison à 2 500 FCFA, paiement comptant à la livraison, livraison sous 48 heures$t$, true, 3),
    ($t$document_b$t$, $t$Que dit le second document ?$t$, $t$long$t$, null::jsonb, $t$sac de riz de 50 kg à 14 500 FCFA, huile à 1 000 FCFA le litre, livraison gratuite, paiement à 15 jours, livraison le lendemain, commande de 5 sacs au minimum$t$, true, 4),
    ($t$criteres$t$, $t$Qu'est-ce qui compte le plus pour vous ?$t$, $t$texte$t$, null::jsonb, $t$le coût total et le délai de paiement$t$, false, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F13$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Traduction et adaptation de documents professionnels$t$, $t$Rôle : Vous traduisez et adaptez des messages professionnels, en gardant le sens et la politesse.

Contexte : Mon activité : {{activite}}. Mon correspondant : {{correspondant}}. Sa langue : {{langue}}. Le message que j'ai reçu de lui : « {{message_recu}} » Ce que je veux lui écrire : {{a_ecrire}}.

Travail demandé :
1. La traduction en français du message reçu. S'il est « (non précisé) », passez au point suivant.
2. Mon message, rédigé dans la langue de mon correspondant et adapté à ses usages.
3. La version française de contrôle de ce que vous avez écrit dans l'autre langue.
4. Les mots ou les tournures à éviter avec ce correspondant, s'il y en a.

Format : texte simple, sans astérisque, prêt à coller. Chaque version sous son titre.

Règle : ne changez ni les dates, ni les quantités, ni les montants. N'ajoutez aucune promesse que je n'ai pas donnée. Si un mot a deux sens possibles, posez-moi la question.$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F14$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$vendeur de pagnes au Grand Marché de Lomé$t$, true, 1),
    ($t$correspondant$t$, $t$Qui est votre correspondant ?$t$, $t$texte$t$, null::jsonb, $t$une cliente du Ghana qui prépare un mariage$t$, true, 2),
    ($t$langue$t$, $t$Dans quelle langue lui écrivez-vous ?$t$, $t$texte$t$, null::jsonb, $t$anglais$t$, true, 3),
    ($t$message_recu$t$, $t$Quel message avez-vous reçu ?$t$, $t$long$t$, null::jsonb, $t$Good evening. I saw your fabrics on Facebook. Do you sell wholesale? I need 30 pieces for a wedding. Can you send to Accra and how long does it take?$t$, false, 4),
    ($t$a_ecrire$t$, $t$Que voulez-vous lui écrire ?$t$, $t$long$t$, null::jsonb, $t$je vends en gros à partir de 10 pièces ; j'envoie vers Accra par le car, le colis part le lendemain de la commande et se retire à la gare ; je demande la moitié à la commande ; le prix se donne après le choix des modèles$t$, true, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F14$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Création de présentations à partir d'un brief$t$, $t$Rôle : Vous préparez le plan d'une présentation courte, claire et honnête.

Contexte : Mon activité : {{activite}}. Le sujet de la présentation : {{sujet}}. Le public : {{public}}. La durée et le nombre de diapositives : {{format}}. Mes faits et mes chiffres : {{contenu}}. Ce que je veux obtenir à la fin : {{objectif}}.

Travail demandé :
1. Le plan, diapositive par diapositive : un titre, 3 lignes de texte au plus, le chiffre ou l'image à montrer.
2. Ce que je dis à l'oral sur chaque diapositive, en 2 phrases.
3. La dernière diapositive : ma demande ou la suite proposée, en une phrase.
4. Les questions que le public risque de poser, avec une réponse courte.

Format : une liste numérotée par diapositive. Texte simple, sans astérisque.

Règle : utilisez seulement mes faits et mes chiffres. Aucun chiffre inventé, aucun nom de client, aucun superlatif. Une idée par diapositive.$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F15$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$formateur en bureautique à mon compte, à Abidjan$t$, true, 1),
    ($t$sujet$t$, $t$Quel est le sujet de la présentation ?$t$, $t$texte$t$, null::jsonb, $t$ma formation « Excel pour la gestion de tous les jours »$t$, true, 2),
    ($t$public$t$, $t$À qui la présentez-vous ?$t$, $t$texte$t$, null::jsonb, $t$le gérant d'une PME$t$, true, 3),
    ($t$format$t$, $t$Combien de temps et de diapositives ?$t$, $t$texte$t$, null::jsonb, $t$15 minutes, 5 diapositives$t$, true, 4),
    ($t$contenu$t$, $t$Quels sont vos faits et vos chiffres ?$t$, $t$long$t$, null::jsonb, $t$deux journées dans les locaux du client ; pour les assistantes et les comptables, 8 participants au plus ; à la fin, ils savent tenir un tableau de suivi, faire un total, un tri et un graphique simple ; j'ai déjà formé le personnel de deux PME d'Abidjan ; prix sur devis, selon le nombre de participants$t$, true, 5),
    ($t$objectif$t$, $t$Que voulez-vous obtenir à la fin ?$t$, $t$texte$t$, null::jsonb, $t$l'accord du gérant pour lui envoyer un devis sous 48 heures$t$, true, 6)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F15$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Organisation de projets et suivi des actions$t$, $t$Rôle : Vous m'aidez à transformer une liste de choses à faire en plan d'action suivi.

Contexte : Mon activité : {{activite}}. Le projet : {{projet}}. La date finale : {{echeance}}. Tout ce qu'il y a à faire, en vrac : {{actions}}. Les personnes disponibles : {{equipe}}. Les contraintes : {{contraintes}}.

Travail demandé :
1. Le plan d'action : les tâches dans l'ordre, avec pour chacune un responsable, une date de début et une date de fin.
2. Les tâches qui en bloquent d'autres, à faire en premier.
3. Les risques de retard, et ce que je peux prévoir pour chacun.
4. Le point à faire chaque semaine, en 3 questions.

Format : un tableau simple (tâche, responsable, début, fin), puis du texte sans astérisque.

Règle : n'ajoutez aucune tâche sans me le dire, et ne changez pas la date finale. Si une durée ou un responsable manque, demandez-le. Si tout ne tient pas dans le délai, dites-le clairement.$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F16$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$peintre en bâtiment à mon compte, à Douala, avec deux ouvriers$t$, true, 1),
    ($t$projet$t$, $t$Quel est le projet ?$t$, $t$texte$t$, null::jsonb, $t$la remise en état d'une boutique$t$, true, 2),
    ($t$echeance$t$, $t$Quelle est la date finale ?$t$, $t$texte$t$, null::jsonb, $t$réouverture dans dix jours$t$, true, 3),
    ($t$actions$t$, $t$Qu'y a-t-il à faire ?$t$, $t$long$t$, null::jsonb, $t$vider et protéger la boutique, une demi-journée ; reboucher et poncer les murs, deux jours, puis un jour de séchage ; peindre l'intérieur en deux couches, trois jours ; peindre la façade, un jour ; passage du carreleur du client, une journée, avant la peinture ; commander la peinture deux jours à l'avance$t$, true, 4),
    ($t$equipe$t$, $t$Qui est disponible ?$t$, $t$texte$t$, null::jsonb, $t$moi et deux ouvriers$t$, true, 5),
    ($t$contraintes$t$, $t$Quelles contraintes faut-il respecter ?$t$, $t$texte$t$, null::jsonb, $t$saison des pluies : la façade se peint seulement par temps sec$t$, false, 6)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F16$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Prospection et relances commerciales personnalisées$t$, $t$Rôle : Vous rédigez des messages de prospection courts, polis et personnels, sans pression.

Contexte : Mon activité : {{activite}}. Ce que je propose : {{offre}}. Mon prospect, sans nom ni numéro : {{prospect}}. Comment j'ai eu son contact : {{origine}}. Où j'en suis avec lui : {{etape}}.

Travail demandé :
1. Un premier message de 4 lignes au plus : une salutation, qui je suis, pourquoi je lui écris à lui, une question simple.
2. Une relance de 3 lignes, à envoyer après une semaine sans réponse.
3. Un dernier message de 2 lignes, qui laisse la porte ouverte.
4. Le meilleur moment pour envoyer chaque message.

Format : texte simple, prêt à coller dans WhatsApp. Écrivez [Prénom] là où je mettrai le prénom. Pour une entreprise, ajoutez une version e-mail avec un objet.

Règle : vouvoyez le prospect. Aucun prix dans le premier message, sauf si je le demande. Aucune fausse urgence, aucune promesse de résultat, aucun client cité. Si mon prospect a déjà dit non, ne rédigez pas de relance et dites-le-moi.$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F17$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$vendeur de fournitures de bureau à Niamey, avec un livreur$t$, true, 1),
    ($t$offre$t$, $t$Que proposez-vous ?$t$, $t$long$t$, null::jsonb, $t$papier, cahiers, stylos, cartouches d'encre et classeurs, livrés dans la journée ; paiement par Airtel Money, en espèces, ou sur facture pour les ONG$t$, true, 2),
    ($t$prospect$t$, $t$Qui est votre prospect ?$t$, $t$texte$t$, null::jsonb, $t$la directrice d'une école privée, avant la rentrée$t$, true, 3),
    ($t$origine$t$, $t$Comment avez-vous eu son contact ?$t$, $t$texte$t$, null::jsonb, $t$une cliente m'a donné son contact$t$, true, 4),
    ($t$etape$t$, $t$Où en êtes-vous avec ce prospect ?$t$, $t$choix$t$, $j$["jamais contacté", "contacté une fois, sans réponse", "relancé une fois, sans réponse"]$j$::jsonb, $t$contacté une fois, sans réponse$t$, true, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F17$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Préparation de devis et propositions commerciales$t$, $t$Rôle : Vous rédigez des propositions commerciales claires, et vous vérifiez chaque calcul.

Contexte : Mon activité : {{activite}}. Le client et sa demande : {{demande}}. Mon offre, ligne par ligne, avec la quantité et le prix : {{offre}}. Les formules à proposer : {{formules}}. Mes conditions (acompte, délai, paiement, validité) : {{conditions}}.

Travail demandé :
1. La demande du client, reformulée en 2 lignes.
2. Chaque formule, ligne par ligne : désignation, quantité, prix à l'unité, total de la ligne.
3. Le total, l'acompte et le reste à payer de chaque formule, avec chaque calcul montré.
4. Les conditions en 4 lignes : délai, paiement, validité, ce qui est compris.
5. Un message de 3 lignes pour envoyer la proposition, avec une salutation.

Format : texte simple, sans astérisque, prêt à coller dans le document « Proposition commerciale ». Montants écrits ainsi : 25 000 FCFA.

Règle : utilisez seulement mes prix. S'il en manque un, demandez-le. Quand un prix vaut pour un lot (les 100, les 1 000), calculez à partir du lot et montrez le calcul. N'ajoutez ni taxe, ni remise, ni frais que je n'ai pas donnés. Cette proposition n'est pas une facture normalisée.$t$, 2, $t$Une IA peut se tromper dans un calcul. Vérifiez chaque total.$t$, 1, '2026-10-04' from taches t
  where t.code = $t$F18$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$graphiste à mon compte, à Cotonou$t$, true, 1),
    ($t$demande$t$, $t$Qui est le client, et que demande-t-il ?$t$, $t$texte$t$, null::jsonb, $t$le gérant d'un nouveau restaurant veut son identité visuelle avant l'ouverture$t$, true, 2),
    ($t$offre$t$, $t$Quelle est votre offre, ligne par ligne ?$t$, $t$long$t$, null::jsonb, $t$1 logo à 20 000 FCFA ; 2 affiches à 4 500 FCFA l'affiche ; 4 visuels pour les réseaux sociaux à 4 000 FCFA le visuel$t$, true, 3),
    ($t$formules$t$, $t$Quelles formules proposez-vous ?$t$, $t$texte$t$, null::jsonb, $t$une seule formule$t$, false, 4),
    ($t$conditions$t$, $t$Quelles sont vos conditions ?$t$, $t$long$t$, null::jsonb, $t$acompte de 50 % à la commande par MTN MoMo, solde à la livraison ; délai de 6 jours après l'acompte ; deux séries de modifications comprises ; devis valable 10 jours$t$, true, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F18$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Suivi des impayés et relances de paiement$t$, $t$Rôle : Vous m'aidez à suivre mes factures en retard et à relancer mes clients avec tact.

Contexte : Mon activité : {{activite}}. Mes factures en retard, une par une, avec un code à la place du nom : {{factures}}. Mes moyens de paiement : {{paiement}}. Le ton voulu : {{ton}}.

Travail demandé :
1. Ce que chaque client doit encore, et le total, avec chaque calcul montré.
2. Les factures classées de la plus ancienne à la plus récente.
3. Pour chaque facture, un message de relance du bon niveau : un rappel courtois s'il n'y a eu aucune relance, une relance qui demande une date après une relance, un dernier message ferme et poli après deux relances.
4. La phrase à noter dans mon suivi quand le client promet une date.

Format : texte simple, prêt à coller dans WhatsApp. Écrivez [Prénom] là où je mettrai le prénom. Montants écrits ainsi : 25 000 FCFA.

Règle : salutation au début, remerciement à la fin, 4 lignes au plus par message. Jamais de menace, de reproche ni d'humiliation. Une facture qui n'est pas encore échue ne se relance pas. N'inventez aucun montant et aucun frais de retard. Aucun conseil juridique.$t$, 2, $t$Une IA peut se tromper dans un calcul. Vérifiez chaque total.$t$, 1, '2026-10-04' from taches t
  where t.code = $t$F21$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$chargée de communication à mon compte, à Dakar$t$, true, 1),
    ($t$factures$t$, $t$Quelles factures sont en retard ?$t$, $t$long$t$, null::jsonb, $t$client A : gestion de page à 85 000 FCFA par mois, deux mois impayés, une relance déjà faite ; client B : logo à 62 500 FCFA, acompte de 30 000 FCFA reçu, livré depuis 20 jours, aucune relance ; client C : 4 visuels à 5 000 FCFA le visuel, livrés il y a 8 jours, rien de payé, aucune relance$t$, true, 2),
    ($t$paiement$t$, $t$Comment vous paie-t-on ?$t$, $t$texte$t$, null::jsonb, $t$Wave ou espèces$t$, true, 3),
    ($t$ton$t$, $t$Quel ton voulez-vous ?$t$, $t$choix$t$, $j$["selon le retard", "toujours courtois", "ferme et poli"]$j$::jsonb, $t$selon le retard$t$, true, 4)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F21$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Suivi des commandes et changements fournisseurs$t$, $t$Rôle : Vous m'aidez à suivre mes commandes chez mes fournisseurs et à réagir à un changement.

Contexte : Mon activité : {{activite}}. Mes commandes en cours : {{commandes}}. Ce que le fournisseur annonce : {{changement}}. Ce que j'ai promis à mes propres clients : {{engagements}}.

Travail demandé :
1. Le point de mes commandes : ce qui arrive à l'heure, ce qui change.
2. Ce que le changement entraîne pour moi et pour mes clients, avec les dates.
3. Les options possibles, et celle que vous proposez.
4. Ma réponse au fournisseur, en 4 lignes, avec une salutation.
5. Le message à mes clients concernés, en 3 lignes.

Format : texte simple, sans astérisque, prêt à coller dans WhatsApp.

Règle : n'acceptez ni un remplacement ni un nouveau prix à ma place : proposez la question à poser. Ne promettez à mes clients aucune date que le fournisseur n'a pas confirmée. Restez poli avec le fournisseur, même en cas de retard.$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F22$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$gérante d'un restaurant à Bamako, avec trois employés$t$, true, 1),
    ($t$commandes$t$, $t$Quelles commandes sont en cours ?$t$, $t$long$t$, null::jsonb, $t$riz et huile chez mon grossiste, livrés vendredi matin ; 25 poulets ; des boissons$t$, true, 2),
    ($t$changement$t$, $t$Qu'annonce le fournisseur ?$t$, $t$long$t$, null::jsonb, $t$poulets : il n'en a que 15 pour vendredi, les 10 autres samedi à 10 h. Boissons : la marque demandée manque, il la remplace par une autre, au même prix$t$, true, 3),
    ($t$engagements$t$, $t$Qu'avez-vous promis à vos clients ?$t$, $t$texte$t$, null::jsonb, $t$un repas de baptême de 80 personnes samedi à 13 h ; la cuisson des poulets demande trois heures$t$, true, 4)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F22$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Analyse des avis et enquêtes de satisfaction$t$, $t$Rôle : Vous analysez les avis de mes clients et vous en tirez des priorités, sans les embellir.

Contexte : Mon activité : {{activite}}. Les avis reçus, un par un, sans nom : {{avis}}. Ce que je peux changer ce mois-ci : {{moyens}}.

Travail demandé :
1. Les avis regroupés par sujet, avec le nombre d'avis par sujet.
2. Ce qui plaît, à garder.
3. Les deux points à corriger en premier, avec une action simple pour chacun.
4. Les idées données par les clients.
5. Une réponse de 3 lignes à chaque avis négatif, avec une salutation.

Format : texte simple, sans astérisque. Les réponses sont prêtes à coller dans WhatsApp.

Règle : comptez les avis tels qu'ils sont, sans en ajouter. Ne minimisez pas un reproche. Dans une réponse, reconnaissez le problème, dites ce qui change, et ne promettez que ce que je peux tenir. Ne demandez aucun nom.$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F26$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$vendeuse de beurre de karité et de savons à Ouagadougou, avec deux employées$t$, true, 1),
    ($t$avis$t$, $t$Quels avis avez-vous reçus ?$t$, $t$long$t$, null::jsonb, $t$le beurre est très bon, je recommande ; le pot est arrivé ouvert dans le sac ; j'aurais aimé un plus petit format pour essayer ; livraison rapide, merci ; le savon sèche un peu la peau ; pot mal fermé, une partie a coulé ; très bien, mais je ne savais pas comment le conserver ; vous devriez faire un lot beurre et savon$t$, true, 2),
    ($t$moyens$t$, $t$Que pouvez-vous changer ce mois-ci ?$t$, $t$texte$t$, null::jsonb, $t$changer la fermeture des pots et ajouter un mot sur la conservation$t$, false, 3)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F26$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Construction de segments de clientèle$t$, $t$Rôle : Vous m'aidez à répartir mes clients en quelques groupes utiles, avec des critères clairs.

Contexte : Mon activité : {{activite}}. Mes clients, un par un, avec un code à la place du nom : {{clients}}. Ce que je prépare : {{objectif}}.

Travail demandé :
1. Quatre ou cinq groupes au plus, avec le critère exact de chacun.
2. La liste des clients de chaque groupe, et le total du groupe quand il se calcule, avec le calcul montré.
3. Une action simple par groupe.
4. Un message de 3 lignes pour chaque groupe, avec une salutation.

Format : une liste par groupe. Texte simple, sans astérisque. Montants écrits ainsi : 25 000 FCFA.

Règle : chaque client va dans un seul groupe. Les critères viennent de mes données : dernier achat, fréquence, montant. N'inventez aucune donnée sur un client. Aucune remise que je n'ai pas proposée.$t$, 2, $t$Une IA peut se tromper dans un calcul. Vérifiez chaque total.$t$, 1, '2026-10-04' from taches t
  where t.code = $t$F27$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$gérante d'une petite salle de sport à Libreville, avec deux coachs$t$, true, 1),
    ($t$clients$t$, $t$Quels clients voulez-vous répartir ?$t$, $t$long$t$, null::jsonb, $t$A-01 : inscrite depuis 3 ans, vient 4 fois par mois. A-02 : inscrit depuis 2 mois, vient 12 fois par mois. A-03 : inscrite depuis 4 ans, vient une fois en deux mois. A-04 : inscrit depuis 1 an, vient 8 fois par mois, a amené deux amis. A-05 : inscrite depuis 6 mois, venait 10 fois par mois, 2 fois ce mois-ci. A-06 : inscrit depuis 2 ans, vient 6 fois par mois, toujours le samedi$t$, true, 2),
    ($t$objectif$t$, $t$Que préparez-vous ?$t$, $t$texte$t$, null::jsonb, $t$le renouvellement des abonnements de janvier$t$, true, 3)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F27$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

-- La note par IA : la même pour les 19 modèles
insert into conseils_ia (modele_id, ia, conseil) select mp.id, v.ia, v.conseil
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$chatgpt$t$, $t$Ouvrez la conversation dans le projet de votre kit, pour que vos instructions s'appliquent. Si la skill de la tâche est installée, ChatGPT s'en sert seul.$t$),
    ($t$claude$t$, $t$Ouvrez la conversation dans le projet de votre kit. Si la skill de la tâche est installée, Claude s'en sert seul.$t$),
    ($t$gemini$t$, $t$Ouvrez le Gem de la tâche quand il y en a un, sinon collez la consigne dans le Gem de votre kit.$t$),
    ($t$meta_ai$t$, $t$Collez d'abord la configuration de votre kit, puis la consigne.$t$),
    ($t$copilot$t$, $t$Collez d'abord la configuration de votre kit, puis la consigne.$t$)
  ) as v(ia, conseil)
  where t.code in ($t$F01$t$, $t$F03$t$, $t$F04$t$, $t$F05$t$, $t$F06$t$, $t$F07$t$, $t$F08$t$, $t$F10$t$, $t$F11$t$, $t$F13$t$, $t$F14$t$, $t$F15$t$, $t$F16$t$, $t$F17$t$, $t$F18$t$, $t$F21$t$, $t$F22$t$, $t$F26$t$, $t$F27$t$)
  on conflict (modele_id, ia) do update set conseil = excluded.conseil;

-- 5. Les ressources
insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-ventes-chatgpt$t$, $t$configuration$t$, $t$Assistant commercial$t$, $t$Vous le complétez une fois avec les informations de votre activité commerciale : ensuite, l'IA connaît vos produits, vos prix et vos conditions de vente à chaque conversation.$t$, $t$chatgpt$t$, $t$Vous êtes mon assistant commercial. Vous m'aidez à trouver des clients, à les relancer, à préparer mes offres et à suivre mes ventes.

MON ACTIVITÉ
Entreprise et poste : [nom de l'entreprise], [mon poste]
Zone de vente : [ville, quartiers ou villes couverts]
Ce que je vends : [produits ou services : prix en FCFA]
Mes clients : [revendeurs, entreprises, particuliers]
Conditions : [comptant ou à crédit, délai de paiement, acompte, livraison]
Paiement : [espèces, Mobile Money, virement]
Objectif du mois : [montant ou nombre de ventes]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez mes clients.
2. Un message à un client commence par « Bonjour » ou « Bonsoir » et reste poli, même pour relancer.
3. Montants écrits ainsi : 25 000 FCFA.
4. Textes prêts à coller dans WhatsApp : ni titre, ni astérisque, peu d'émojis.
5. N'inventez jamais un prix, une remise, un délai, un stock ou un avis. S'il manque une information, posez-moi une seule question.
6. Pour un message, proposez 2 versions : une courte, une plus chaleureuse.
7. Ne demandez jamais le nom complet ni le numéro d'un client.
8. Montrez chaque calcul, pour que je le vérifie.
9. Contrats, impôts, factures officielles : renvoyez-moi vers mon responsable ou mon comptable.$t$, $j${"chatgpt": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre activité commerciale.", "Dans ChatGPT, choisissez un projet, puis Nouveau projet. Donnez-lui le nom « Mes ventes », puis Créer un projet.", "Ouvrez le menu « … » du projet, puis Paramètres du projet. Collez le texte dans le champ Instructions, puis Enregistrer."], "gratuit": "Oui. Les projets sont disponibles sur un compte gratuit, avec 5 fichiers par projet.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Autre possibilité : Paramètres, Personnalisation, Instructions personnalisées. Le texte s'applique alors à toutes vos conversations, dans la limite de 1 500 caractères.", "Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-ventes-claude$t$, $t$configuration$t$, $t$Assistant commercial$t$, $t$Vous le complétez une fois avec les informations de votre activité commerciale : ensuite, l'IA connaît vos produits, vos prix et vos conditions de vente à chaque conversation.$t$, $t$claude$t$, $t$Vous êtes mon assistant commercial. Vous m'aidez à trouver des clients, à les relancer, à préparer mes offres et à suivre mes ventes.

MON ACTIVITÉ
Entreprise et poste : [nom de l'entreprise], [mon poste]
Zone de vente : [ville, quartiers ou villes couverts]
Ce que je vends : [produits ou services : prix en FCFA]
Mes clients : [revendeurs, entreprises, particuliers]
Conditions : [comptant ou à crédit, délai de paiement, acompte, livraison]
Paiement : [espèces, Mobile Money, virement]
Objectif du mois : [montant ou nombre de ventes]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez mes clients.
2. Un message à un client commence par « Bonjour » ou « Bonsoir » et reste poli, même pour relancer.
3. Montants écrits ainsi : 25 000 FCFA.
4. Textes prêts à coller dans WhatsApp : ni titre, ni astérisque, peu d'émojis.
5. N'inventez jamais un prix, une remise, un délai, un stock ou un avis. S'il manque une information, posez-moi une seule question.
6. Pour un message, proposez 2 versions : une courte, une plus chaleureuse.
7. Ne demandez jamais le nom complet ni le numéro d'un client.
8. Montrez chaque calcul, pour que je le vérifie.
9. Contrats, impôts, factures officielles : renvoyez-moi vers mon responsable ou mon comptable.$t$, $j${"claude": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre activité commerciale.", "Dans Claude, ouvrez Projets, puis Nouveau projet. Donnez-lui le nom « Mes ventes », puis Créer un projet.", "Dans le projet, ouvrez Instructions, puis Ajouter. Collez le texte, puis Enregistrer les instructions."], "gratuit": "Oui, dans la limite de 5 projets.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-ventes-gemini$t$, $t$configuration$t$, $t$Assistant commercial$t$, $t$Vous le complétez une fois avec les informations de votre activité commerciale : ensuite, l'IA connaît vos produits, vos prix et vos conditions de vente à chaque conversation.$t$, $t$gemini$t$, $t$Vous êtes mon assistant commercial. Vous m'aidez à trouver des clients, à les relancer, à préparer mes offres et à suivre mes ventes.

MON ACTIVITÉ
Entreprise et poste : [nom de l'entreprise], [mon poste]
Zone de vente : [ville, quartiers ou villes couverts]
Ce que je vends : [produits ou services : prix en FCFA]
Mes clients : [revendeurs, entreprises, particuliers]
Conditions : [comptant ou à crédit, délai de paiement, acompte, livraison]
Paiement : [espèces, Mobile Money, virement]
Objectif du mois : [montant ou nombre de ventes]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez mes clients.
2. Un message à un client commence par « Bonjour » ou « Bonsoir » et reste poli, même pour relancer.
3. Montants écrits ainsi : 25 000 FCFA.
4. Textes prêts à coller dans WhatsApp : ni titre, ni astérisque, peu d'émojis.
5. N'inventez jamais un prix, une remise, un délai, un stock ou un avis. S'il manque une information, posez-moi une seule question.
6. Pour un message, proposez 2 versions : une courte, une plus chaleureuse.
7. Ne demandez jamais le nom complet ni le numéro d'un client.
8. Montrez chaque calcul, pour que je le vérifie.
9. Contrats, impôts, factures officielles : renvoyez-moi vers mon responsable ou mon comptable.$t$, $j${"gemini": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre activité commerciale.", "Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez « Assistant commercial ». Collez le texte dans Instructions, puis Enregistrer."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-message-prospection$t$, $t$skill$t$, $t$Message de prospection$t$, $t$Rédige un premier message de prospection et ses relances, adaptés à un prospect précis.$t$, null, $t$---
name: message-prospection
description: Rédige un premier message de prospection et ses relances, adaptés à un prospect précis. À utiliser quand l'utilisateur veut écrire à un futur client ou relancer un prospect sans réponse.
---

# Message de prospection

Quand l'utilisateur décrit un prospect, rédigez les messages pour entrer en contact avec lui.

## Avant d'écrire
Il vous faut : l'activité de l'utilisateur, ce qu'il propose, ce qu'il sait du prospect, comment il a eu son contact, et où il en est avec lui. Si le prospect a déjà dit non, ne rédigez rien et dites-le. S'il manque l'origine du contact, demandez-la.

## Ce que vous livrez
1. Un premier message de 4 lignes au plus : une salutation, qui écrit, pourquoi à cette personne, une question simple.
2. Une relance de 3 lignes, à envoyer après une semaine sans réponse.
3. Un dernier message de 2 lignes, qui laisse la porte ouverte.
4. Le meilleur moment pour envoyer chaque message.

## Règles
- Vouvoyez le prospect. Texte simple, sans astérisque ni titre, prêt à coller dans WhatsApp.
- Écrivez [Prénom] là où l'utilisateur mettra le prénom. Ne demandez ni nom ni numéro.
- Aucun prix dans le premier message, sauf demande de l'utilisateur.
- Aucune fausse urgence, aucune promesse de résultat, aucun client cité.
- Pour une entreprise, une ONG ou une administration, ajoutez une version e-mail avec un objet.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mes ventes »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$message-prospection.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-proposition-commerciale$t$, $t$skill$t$, $t$Proposition commerciale$t$, $t$Rédige une proposition commerciale claire, avec une ou deux formules, le total, l'acompte et les conditions.$t$, null, $t$---
name: proposition-commerciale
description: Rédige une proposition commerciale claire, avec une ou deux formules, le total, l'acompte et les conditions. À utiliser quand l'utilisateur doit chiffrer une offre pour un client.
---

# Proposition commerciale

Quand l'utilisateur décrit la demande d'un client et son offre, rédigez la proposition.

## Avant d'écrire
Il vous faut : la demande du client, les lignes de l'offre avec la quantité et le prix à l'unité ou au lot, les formules à proposer, l'acompte, le délai, les moyens de paiement et la durée de validité. S'il manque un prix, demandez-le. Ne le devinez jamais.

## Ce que vous livrez
1. La demande du client, reformulée en 2 lignes.
2. Chaque formule, ligne par ligne : désignation, quantité, prix à l'unité, total de la ligne.
3. Le total, l'acompte et le reste à payer de chaque formule. Montrez chaque calcul.
4. Les conditions en 4 lignes : délai, paiement, validité, ce qui est compris.
5. Un message de 3 lignes pour envoyer la proposition, avec une salutation.

## Règles
- Texte simple, sans astérisque ni titre, prêt à coller. Vouvoyez le client.
- Montants écrits ainsi : 25 000 FCFA.
- Un prix donné pour un lot (les 100, les 1 000) se calcule à partir du lot. Montrez le calcul.
- Aucune taxe, aucune remise, aucun frais que l'utilisateur n'a pas donnés.
- Cette proposition n'est pas une facture normalisée. Pour une facture officielle, renvoyez l'utilisateur vers son comptable.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mes ventes »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$proposition-commerciale.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-relance-facture$t$, $t$skill$t$, $t$Relance d'une facture impayée$t$, $t$Rédige la relance d'une facture en retard, du rappel courtois au dernier message, selon le retard.$t$, null, $t$---
name: relance-facture
description: Rédige la relance d'une facture en retard, du rappel courtois au dernier message, selon le retard. À utiliser quand l'utilisateur colle ses factures impayées, sans nom ni numéro.
---

# Relance d'une facture impayée

Quand l'utilisateur colle des factures en retard, préparez le point et les relances.

## Avant d'écrire
Il vous faut, pour chaque facture : un code à la place du nom, le montant, ce qui est déjà payé, le nombre de jours de retard et le nombre de relances déjà faites. S'il manque un montant, demandez-le. Une facture qui n'est pas encore échue ne se relance pas.

## Ce que vous livrez
1. Ce que chaque client doit encore, et le total. Montrez chaque calcul.
2. Les factures classées de la plus ancienne à la plus récente.
3. Un message par facture, du bon niveau : un rappel courtois s'il n'y a eu aucune relance ; une relance qui demande une date après une relance ; un dernier message ferme et poli après deux relances.
4. La phrase à noter dans le suivi quand le client promet une date.

## Règles
- Chaque message commence par une salutation, finit par un remerciement et tient en 4 lignes. Vouvoyez le client.
- Écrivez [Prénom] là où l'utilisateur mettra le prénom.
- Montants écrits ainsi : 25 000 FCFA. Aucun montant inventé, aucun frais de retard.
- Jamais de menace, de reproche ni d'humiliation.
- Aucun conseil juridique sur le recouvrement.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mes ventes »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$relance-facture.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-compte-rendu-rendez-vous$t$, $t$skill$t$, $t$Compte rendu de rendez-vous$t$, $t$Transforme des notes de rendez-vous ou de réunion en compte rendu clair, avec les décisions et les actions.$t$, null, $t$---
name: compte-rendu-rendez-vous
description: Transforme des notes de rendez-vous ou de réunion en compte rendu clair, avec les décisions et les actions. À utiliser quand l'utilisateur colle ou dicte ses notes en vrac.
---

# Compte rendu de rendez-vous

Quand l'utilisateur colle ses notes d'un rendez-vous ou d'une réunion, rédigez le compte rendu.

## Avant d'écrire
Il vous faut : les notes, même en vrac, de quelle rencontre il s'agit, et à qui le compte rendu s'adresse. Si les notes contiennent un nom complet ou un numéro, ne les reprenez pas.

## Ce que vous livrez
1. L'essentiel en 5 lignes au plus.
2. Les décisions prises.
3. Les actions à faire : quoi, qui, pour quand.
4. Ce qui reste à décider ou à vérifier.
5. Le message d'envoi, en 3 lignes, avec une salutation.

## Règles
- Texte simple, sans astérisque ni titre, prêt à coller dans WhatsApp ou dans un e-mail.
- N'ajoutez rien qui ne soit pas dans les notes.
- Si une date, un responsable ou un chiffre manque, écrivez « à préciser ».
- Gardez les chiffres tels qu'ils sont notés.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mes ventes »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$compte-rendu-rendez-vous.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-fichier-clients-prospects$t$, $t$document$t$, $t$Fichier clients et prospects$t$, $t$Ce tableau garde la trace de chaque client et de chaque prospect : son intérêt, le dernier contact et la prochaine action à faire.$t$, null, $t$Une ligne par contact. Dans la colonne Contact, écrivez le prénom, une initiale ou le nom de l'entreprise, jamais le numéro.
Vous notez le type (prospect, client, ancien client), l'intérêt (chaud, tiède, froid), le dernier contact, la prochaine action et sa date.
Le nombre de jours sans contact se calcule seul. Une action dont la date est dépassée passe en rouge.
L'onglet « Résumé » compte vos contacts par type et par intérêt, les actions en retard et les contacts sans nouvelle depuis plus de 30 jours.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$fichier-clients-et-prospects.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1jZd7VhA8LoU0wfgw3XkFOGYCRGQaLfQj6KYr_wm8L4w/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-suivi-devis-factures$t$, $t$document$t$, $t$Suivi des devis et des factures$t$, $t$Ce tableau suit vos devis jusqu'à la réponse du client, puis vos factures jusqu'au paiement. Il calcule seul le reste à payer et le nombre de jours de retard.$t$, null, $t$Dans l'onglet « Devis », une ligne par devis envoyé : la date, le montant, le statut et le nombre de relances.
Dans l'onglet « Factures », une ligne par facture : le montant, ce qui est déjà payé et l'échéance. Le reste à payer et les jours de retard se calculent seuls.
Dans la colonne Client, écrivez un code, un prénom ou une initiale, jamais le numéro.
L'onglet « Résumé » donne les devis en attente, les factures en retard et le total qui reste à encaisser.
Ce tableau n'est pas une comptabilité et ne remplace pas une facture normalisée.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$suivi-des-devis-et-des-factures.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/139VisT6IRIa1j6yRtRZ4-IxiBVSK8jsYfxXp8f83wVA/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-tableau-bord-ventes$t$, $t$document$t$, $t$Tableau de bord des ventes$t$, $t$Ce tableau additionne vos ventes et les compare à votre objectif du mois : ce qui est vendu, ce qu'il reste à vendre, semaine par semaine.$t$, null, $t$Dans l'onglet « Ventes », une ligne par vente : la date, le produit ou le service, la quantité et le prix à l'unité. Le montant se calcule seul.
Dans l'onglet « Mois », vous écrivez le premier jour du mois et votre objectif. Le tableau donne les ventes du mois, le reste à vendre, la part de l'objectif atteinte et le total de chaque semaine.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$tableau-de-bord-des-ventes.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1Mn-NviRJ_JAgbMjOri_OqMceE-NfN7je7h3eegNbzgY/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-proposition-commerciale$t$, $t$document$t$, $t$Proposition commerciale$t$, $t$Ce document de deux pages au plus présente votre offre à un client : sa demande, vos formules chiffrées, vos conditions. Il se remplit sur le téléphone et s'envoie en PDF.$t$, null, $t$Il contient : votre entreprise, le client, la demande, une ou deux formules ligne par ligne, le total, l'acompte, le délai, les conditions et vos coordonnées.
Il porte la mention « Cette proposition n'est pas une facture normalisée ». Pour une facture officielle, adressez-vous à votre comptable.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$proposition-commerciale.docx$t$, $t$https://docs.google.com/document/d/16j31sRys5kO4DrBwl7TPc1HvyUlogDjp5VvZ5-xbYFo/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-semaine-commerciale-lundi$t$, $t$routine$t$, $t$Semaine commerciale du lundi$t$, $t$Chaque lundi, l'IA vous rappelle de préparer votre semaine de vente. Elle ne lit pas seule votre fichier : vous collez les contacts à traiter, sans nom ni numéro, puis elle propose le plan de la semaine.$t$, null, $t$Chaque lundi à 7 h 30, envoyez-moi ce message : « Bonjour. C'est lundi, préparons votre semaine de vente. Collez ici les lignes de votre fichier clients à traiter cette semaine : code, type de contact, dernier contact, prochaine action. Ajoutez votre objectif du mois et vos ventes à ce jour. Ne mettez ni nom ni numéro. »

Quand j'aurai collé mes lignes :
1. Classez les contacts : à appeler d'abord, à relancer, à visiter.
2. Proposez un plan jour par jour, en regroupant les visites par zone.
3. Calculez ce qu'il reste à vendre pour atteindre l'objectif, et montrez le calcul.
4. Rédigez le message d'ouverture pour les 3 contacts prioritaires, avec [Prénom] là où je mettrai le prénom.

Règles : partez seulement des lignes collées. N'ajoutez aucun contact et n'inventez aucun chiffre. Si l'objectif ou les ventes manquent, demandez-les.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mes ventes »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Mes ventes ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mes ventes »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant commercial »."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-point-objectif-vendredi$t$, $t$routine$t$, $t$Point de l'objectif du vendredi$t$, $t$Chaque vendredi, l'IA vous rappelle de faire le point : ventes de la semaine, objectif du mois, devis sans réponse et factures en retard. Vous collez vos lignes, puis elle fait les calculs et prépare les relances.$t$, null, $t$Chaque vendredi à 16 h, envoyez-moi ce message : « Bonjour. C'est vendredi, faisons le point de la semaine. Collez ici vos ventes de la semaine (date, produit, montant), votre objectif du mois, vos devis sans réponse et vos factures en retard. Ne mettez ni nom ni numéro. »

Quand j'aurai collé mes lignes :
1. Donnez le total des ventes de la semaine et le cumul du mois, comparé à l'objectif. Montrez chaque calcul.
2. Listez les devis sans réponse, du plus ancien au plus récent, avec le message de relance de chacun.
3. Listez les factures en retard et le total qui reste à encaisser.
4. Résumez la semaine en 3 lignes, à envoyer à mon responsable.

Règles : salutation au début de chaque message, 4 lignes au plus. Jamais de pression ni de fausse urgence. N'inventez aucun montant. Une facture qui n'est pas échue ne se relance pas.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mes ventes »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Mes ventes ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mes ventes »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant commercial »."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

-- 6. Le kit : présentation, étapes d'installation, encadrés « À savoir », mots expliqués
insert into kits (metier_id, titre, presentation, etapes, prerequis, limites, a_savoir, mots, revu_le) select m.id, $t$Vente / Commercial$t$, $t$Tout ce qu'il faut pour prospecter, relancer, chiffrer une offre, suivre vos clients et tenir votre objectif du mois, avec une IA gratuite, sur un téléphone Android : une configuration, quatre skills, quatre documents, deux routines et dix-neuf tâches.$t$, $j$[{"numero": 1, "titre": "Configurer mon IA avec « Assistant commercial »", "minutes": 5}, {"numero": 2, "titre": "Installer mes 3 premières skills : prospection, proposition commerciale, relance d'une facture", "minutes": 10}, {"numero": 3, "titre": "Copier mes documents : fichier clients et prospects, suivi des devis et des factures, tableau de bord des ventes", "minutes": 5}]$j$::jsonb, $j$["Un téléphone Android avec une connexion, même limitée.", "WhatsApp ou WhatsApp Business, pour écrire à vos clients et à vos prospects.", "Un compte Google et les applications gratuites Google Sheets et Google Docs, pour ouvrir les documents.", "Une IA gratuite au choix : ChatGPT, Claude ou Gemini."]$j$::jsonb, $j$["Il ne donne aucun conseil fiscal ou juridique. Pour une facture officielle, un contrat ou un recouvrement, adressez-vous à votre responsable, à votre comptable ou à un juriste.", "Il ne vous demande jamais de coller dans une IA le nom complet, le numéro ou l'adresse d'un client.", "Il ne fixe ni vos prix ni vos remises : l'IA calcule avec vos chiffres, elle n'en invente pas.", "Il ne promet aucun résultat chiffré."]$j$::jsonb, $j${"chatgpt": "OpenAI retire les GPT personnalisés le 11 décembre 2026 et les remplace par les plugins. Ce kit n'utilise donc aucun GPT personnalisé : votre configuration se colle dans un projet, et chaque skill s'ajoute dans la rubrique Plugins, onglet Skills, ou se colle au début de la conversation. Si vous avez déjà vos propres GPT, pensez à les convertir en plugins avant cette date.", "gemini": "Google remplace les Gems par les skills en novembre 2026. Vos Gems seront convertis automatiquement. Les étapes de ce kit seront mises à jour à ce moment-là, et vous serez prévenu dans l'application."}$j$::jsonb, $j$[{"mot": "Configuration", "phrase": "Un texte d'instructions que l'IA garde en mémoire, pour ne pas tout réexpliquer à chaque conversation."}, {"mot": "Projet", "phrase": "Un dossier de conversations qui partagent les mêmes instructions."}, {"mot": "Skill", "phrase": "Une consigne enregistrée que l'IA applique quand le sujet s'y prête."}, {"mot": "Consigne, ou prompt", "phrase": "Le texte que l'on écrit à l'IA pour lui demander un travail."}, {"mot": "Modèle à remplir", "phrase": "Une consigne déjà rédigée, où il ne reste qu'à remplir quelques champs."}, {"mot": "Champ", "phrase": "Une case du formulaire, à remplir avec vos propres informations."}, {"mot": "Routine", "phrase": "Une demande qui revient à jour fixe."}, {"mot": "Tâche planifiée", "phrase": "Une demande que l'IA lance seule, au jour choisi."}, {"mot": "Prospect", "phrase": "Une personne ou une entreprise qui pourrait devenir cliente."}, {"mot": "Relance", "phrase": "Un nouveau message envoyé à quelqu'un qui n'a pas répondu ou pas payé."}, {"mot": "Fichier clients, ou base CRM", "phrase": "La liste de vos clients et de vos prospects, tenue dans un tableau ou dans WhatsApp Business."}, {"mot": "Segment", "phrase": "Un groupe de clients qui se ressemblent, à qui l'on parle de la même façon."}, {"mot": "Devis", "phrase": "Le prix écrit d'une vente ou d'une prestation, donné au client avant de commencer."}, {"mot": "Proposition commerciale", "phrase": "Un devis accompagné d'une courte explication de l'offre."}, {"mot": "Acompte", "phrase": "La partie du prix que le client paie à la commande."}, {"mot": "Impayé", "phrase": "Une facture dont la date de paiement est passée."}, {"mot": "Échéance", "phrase": "La date à laquelle une facture doit être payée, ou un travail rendu."}, {"mot": "Facture normalisée", "phrase": "La facture officielle, émise par un dispositif de l'État dans plusieurs pays. Les documents du kit ne la remplacent pas."}, {"mot": "FAQ", "phrase": "La liste des questions que vos clients posent le plus souvent, avec leur réponse."}, {"mot": "Réponse rapide", "phrase": "Un message enregistré dans WhatsApp Business, qu'on envoie en tapant un raccourci."}, {"mot": "Veille", "phrase": "Le fait de suivre régulièrement ce qui change autour de votre activité : prix, concurrents, nouveautés."}, {"mot": "Brief", "phrase": "La demande de départ d'un travail : le sujet, le public, le temps dont on dispose."}, {"mot": "Compte rendu", "phrase": "Le résumé écrit d'une réunion ou d'un rendez-vous, avec les décisions et les actions."}, {"mot": "Gem", "phrase": "Un assistant Gemini enregistré avec ses propres instructions, que l'on rouvre d'un geste."}, {"mot": "Plugin", "phrase": "Un ajout que l'on installe dans ChatGPT et qui contient des consignes prêtes à servir ; il remplace le GPT personnalisé."}]$j$::jsonb, '2026-10-04' from metiers m
  where m.slug = $t$vente-commercial$t$
  on conflict (metier_id) do update set titre = excluded.titre, presentation = excluded.presentation, etapes = excluded.etapes, prerequis = excluded.prerequis, limites = excluded.limites, a_savoir = excluded.a_savoir, mots = excluded.mots, revu_le = excluded.revu_le;

-- 7. Les ressources du kit, dans l'ordre, avec leur étape d'installation
insert into kits_metier (metier_id, ressource_id, ordre, etape_installation) select m.id, r.id, v.ordre, v.etape
  from metiers m, ressources r,
  (values
    ($t$config-ventes-chatgpt$t$, 1, 1),
    ($t$config-ventes-claude$t$, 2, 1),
    ($t$config-ventes-gemini$t$, 3, 1),
    ($t$skill-message-prospection$t$, 4, 2),
    ($t$skill-proposition-commerciale$t$, 5, 2),
    ($t$skill-relance-facture$t$, 6, 2),
    ($t$doc-fichier-clients-prospects$t$, 7, 3),
    ($t$doc-suivi-devis-factures$t$, 8, 3),
    ($t$doc-tableau-bord-ventes$t$, 9, 3),
    ($t$skill-compte-rendu-rendez-vous$t$, 10, null::integer),
    ($t$doc-proposition-commerciale$t$, 11, null::integer),
    ($t$routine-semaine-commerciale-lundi$t$, 12, null::integer),
    ($t$routine-point-objectif-vendredi$t$, 13, null::integer)
  ) as v(cle, ordre, etape)
  where m.slug = $t$vente-commercial$t$ and r.cle = v.cle
  on conflict (metier_id, ressource_id) do update set ordre = excluded.ordre, etape_installation = excluded.etape_installation;

-- 8. Quelles ressources servent à quelles tâches
insert into ressources_taches (ressource_id, tache_id) select r.id, t.id
  from ressources r, taches t,
  (values
    ($t$config-ventes-chatgpt$t$, $t$F01$t$),
    ($t$config-ventes-claude$t$, $t$F01$t$),
    ($t$config-ventes-gemini$t$, $t$F01$t$),
    ($t$doc-proposition-commerciale$t$, $t$F03$t$),
    ($t$config-ventes-chatgpt$t$, $t$F03$t$),
    ($t$config-ventes-claude$t$, $t$F03$t$),
    ($t$config-ventes-gemini$t$, $t$F03$t$),
    ($t$skill-compte-rendu-rendez-vous$t$, $t$F04$t$),
    ($t$config-ventes-chatgpt$t$, $t$F04$t$),
    ($t$config-ventes-claude$t$, $t$F04$t$),
    ($t$config-ventes-gemini$t$, $t$F04$t$),
    ($t$doc-fichier-clients-prospects$t$, $t$F05$t$),
    ($t$routine-semaine-commerciale-lundi$t$, $t$F05$t$),
    ($t$config-ventes-chatgpt$t$, $t$F05$t$),
    ($t$config-ventes-claude$t$, $t$F05$t$),
    ($t$config-ventes-gemini$t$, $t$F05$t$),
    ($t$config-ventes-chatgpt$t$, $t$F06$t$),
    ($t$config-ventes-claude$t$, $t$F06$t$),
    ($t$config-ventes-gemini$t$, $t$F06$t$),
    ($t$config-ventes-chatgpt$t$, $t$F07$t$),
    ($t$config-ventes-claude$t$, $t$F07$t$),
    ($t$config-ventes-gemini$t$, $t$F07$t$),
    ($t$doc-tableau-bord-ventes$t$, $t$F08$t$),
    ($t$routine-point-objectif-vendredi$t$, $t$F08$t$),
    ($t$config-ventes-chatgpt$t$, $t$F08$t$),
    ($t$config-ventes-claude$t$, $t$F08$t$),
    ($t$config-ventes-gemini$t$, $t$F08$t$),
    ($t$doc-fichier-clients-prospects$t$, $t$F10$t$),
    ($t$config-ventes-chatgpt$t$, $t$F10$t$),
    ($t$config-ventes-claude$t$, $t$F10$t$),
    ($t$config-ventes-gemini$t$, $t$F10$t$),
    ($t$doc-suivi-devis-factures$t$, $t$F11$t$),
    ($t$doc-fichier-clients-prospects$t$, $t$F11$t$),
    ($t$config-ventes-chatgpt$t$, $t$F11$t$),
    ($t$config-ventes-claude$t$, $t$F11$t$),
    ($t$config-ventes-gemini$t$, $t$F11$t$),
    ($t$config-ventes-chatgpt$t$, $t$F13$t$),
    ($t$config-ventes-claude$t$, $t$F13$t$),
    ($t$config-ventes-gemini$t$, $t$F13$t$),
    ($t$config-ventes-chatgpt$t$, $t$F14$t$),
    ($t$config-ventes-claude$t$, $t$F14$t$),
    ($t$config-ventes-gemini$t$, $t$F14$t$),
    ($t$doc-proposition-commerciale$t$, $t$F15$t$),
    ($t$config-ventes-chatgpt$t$, $t$F15$t$),
    ($t$config-ventes-claude$t$, $t$F15$t$),
    ($t$config-ventes-gemini$t$, $t$F15$t$),
    ($t$routine-semaine-commerciale-lundi$t$, $t$F16$t$),
    ($t$config-ventes-chatgpt$t$, $t$F16$t$),
    ($t$config-ventes-claude$t$, $t$F16$t$),
    ($t$config-ventes-gemini$t$, $t$F16$t$),
    ($t$skill-message-prospection$t$, $t$F17$t$),
    ($t$doc-fichier-clients-prospects$t$, $t$F17$t$),
    ($t$routine-semaine-commerciale-lundi$t$, $t$F17$t$),
    ($t$config-ventes-chatgpt$t$, $t$F17$t$),
    ($t$config-ventes-claude$t$, $t$F17$t$),
    ($t$config-ventes-gemini$t$, $t$F17$t$),
    ($t$skill-proposition-commerciale$t$, $t$F18$t$),
    ($t$doc-proposition-commerciale$t$, $t$F18$t$),
    ($t$doc-suivi-devis-factures$t$, $t$F18$t$),
    ($t$config-ventes-chatgpt$t$, $t$F18$t$),
    ($t$config-ventes-claude$t$, $t$F18$t$),
    ($t$config-ventes-gemini$t$, $t$F18$t$),
    ($t$skill-relance-facture$t$, $t$F21$t$),
    ($t$doc-suivi-devis-factures$t$, $t$F21$t$),
    ($t$routine-point-objectif-vendredi$t$, $t$F21$t$),
    ($t$config-ventes-chatgpt$t$, $t$F21$t$),
    ($t$config-ventes-claude$t$, $t$F21$t$),
    ($t$config-ventes-gemini$t$, $t$F21$t$),
    ($t$config-ventes-chatgpt$t$, $t$F22$t$),
    ($t$config-ventes-claude$t$, $t$F22$t$),
    ($t$config-ventes-gemini$t$, $t$F22$t$),
    ($t$config-ventes-chatgpt$t$, $t$F26$t$),
    ($t$config-ventes-claude$t$, $t$F26$t$),
    ($t$config-ventes-gemini$t$, $t$F26$t$),
    ($t$doc-fichier-clients-prospects$t$, $t$F27$t$),
    ($t$config-ventes-chatgpt$t$, $t$F27$t$),
    ($t$config-ventes-claude$t$, $t$F27$t$),
    ($t$config-ventes-gemini$t$, $t$F27$t$)
  ) as v(cle, code)
  where r.cle = v.cle and t.code = v.code
  on conflict (ressource_id, tache_id) do nothing;

-- 9. Contrôle final : si quelque chose manque, tout est annulé.
do $controle$
declare
  n integer;
begin
  if not exists (select 1 from metiers where slug = $t$vente-commercial$t$ and description_local is not null) then
    raise exception 'Métier introuvable : vente-commercial';
  end if;
  select count(*) into n from (values
    ($t$F01$t$, $t$Gestion et tri des e-mails$t$),
    ($t$F03$t$, $t$Rédaction et correction de documents professionnels$t$),
    ($t$F04$t$, $t$Transcription et résumé de réunions et interviews$t$),
    ($t$F05$t$, $t$Planification de rendez-vous et gestion d'agenda$t$),
    ($t$F06$t$, $t$Service client de premier niveau (FAQ)$t$),
    ($t$F07$t$, $t$Veille sectorielle et recherche d'informations$t$),
    ($t$F08$t$, $t$Analyse de données et création de rapports$t$),
    ($t$F10$t$, $t$Nettoyage, enrichissement et qualification de bases CRM$t$),
    ($t$F11$t$, $t$Extraction d'informations et préparation de la saisie$t$),
    ($t$F13$t$, $t$Analyse et comparaison d'un dossier documentaire$t$),
    ($t$F14$t$, $t$Traduction et adaptation de documents professionnels$t$),
    ($t$F15$t$, $t$Création de présentations à partir d'un brief$t$),
    ($t$F16$t$, $t$Organisation de projets et suivi des actions$t$),
    ($t$F17$t$, $t$Prospection et relances commerciales personnalisées$t$),
    ($t$F18$t$, $t$Préparation de devis et propositions commerciales$t$),
    ($t$F21$t$, $t$Suivi des impayés et relances de paiement$t$),
    ($t$F22$t$, $t$Suivi des commandes et changements fournisseurs$t$),
    ($t$F26$t$, $t$Analyse des avis et enquêtes de satisfaction$t$),
    ($t$F27$t$, $t$Construction de segments de clientèle$t$)
  ) as v(code, titre) join taches t on t.code = v.code and t.titre = v.titre and t.resultat is not null;
  if n <> 19 then
    raise exception 'Tâches attendues : 19, trouvées avec le bon titre : %', n;
  end if;
  select count(*) into n from exercices e join taches t on t.id = e.tache_id
    where t.code in ($t$F01$t$, $t$F03$t$, $t$F04$t$, $t$F05$t$, $t$F06$t$, $t$F07$t$, $t$F08$t$, $t$F10$t$, $t$F11$t$, $t$F13$t$, $t$F14$t$, $t$F15$t$, $t$F16$t$, $t$F17$t$, $t$F18$t$, $t$F21$t$, $t$F22$t$, $t$F26$t$, $t$F27$t$) and e.titre_local is not null and e.prenom is not null;
  if n <> 38 then
    raise exception 'Cas localisés attendus : 38, trouvés : %', n;
  end if;
  select count(*) into n from modeles_prompts mp join taches t on t.id = mp.tache_id where t.code in ($t$F01$t$, $t$F03$t$, $t$F04$t$, $t$F05$t$, $t$F06$t$, $t$F07$t$, $t$F08$t$, $t$F10$t$, $t$F11$t$, $t$F13$t$, $t$F14$t$, $t$F15$t$, $t$F16$t$, $t$F17$t$, $t$F18$t$, $t$F21$t$, $t$F22$t$, $t$F26$t$, $t$F27$t$);
  if n <> 19 then
    raise exception 'Modèles attendus : 19, trouvés : %', n;
  end if;
  select count(*) into n from kits_metier km join metiers m on m.id = km.metier_id where m.slug = $t$vente-commercial$t$;
  if n <> 13 then
    raise exception 'Ressources du kit attendues : 13, trouvées : %', n;
  end if;
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id join taches t on t.id = mt.tache_id
    where m.slug = $t$vente-commercial$t$ and t.code in ($t$F01$t$, $t$F03$t$, $t$F04$t$, $t$F05$t$, $t$F06$t$, $t$F07$t$, $t$F08$t$, $t$F10$t$, $t$F11$t$, $t$F13$t$, $t$F14$t$, $t$F15$t$, $t$F16$t$, $t$F17$t$, $t$F18$t$, $t$F21$t$, $t$F22$t$, $t$F26$t$, $t$F27$t$);
  if n <> 19 then
    raise exception 'Tâches du métier attendues : 19, trouvées : %', n;
  end if;
end
$controle$;

commit;
