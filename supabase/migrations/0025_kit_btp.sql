-- 0025 : contenu du kit « BTP / Gestion de chantier » (4 octobre 2026)
--
-- Ce fichier est fabriqué par un programme à partir du fichier source du kit :
-- les textes en sont copiés tels quels. Il ajoute :
--   - la description localisée du métier « BTP / Gestion de chantier », à côté de l'ancienne ;
--   - le résultat et les étapes de 6 tâches existantes (F12, F23, F24, F31, F32, F33) ;
--   - 12 cas pratiques localisés, deux par tâche, écrits À CÔTÉ des anciens cas ;
--   - le rattachement de 13 tâches déjà écrites par un kit précédent (F01, F03, F04, F05, F07, F08, F11, F13, F14, F15, F16, F18, F22) ;
--   - 6 modèles à remplir, leurs champs, leurs exemples et la note par IA ;
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
update metiers set description_local = $t$Pour toute personne qui prépare, dirige ou suit un chantier : dans une entreprise de construction, un bureau d'études, à son compte, ou comme propriétaire qui fait construire, parfois depuis l'étranger. Vous travaillez avec des photos sur WhatsApp, un devis quantitatif et un tableau Google Sheets ou Excel.$t$
  where slug = $t$btp-gestion-de-chantier$t$;

-- 2. Les tâches, leur résultat et leurs étapes
update taches set resultat = $t$Un plan de classement simple, une règle pour nommer vos fichiers, chaque document rangé à sa place, et un index pour retrouver un document en quelques secondes.$t$, etapes = $j$["Lister ses documents tels qu'ils sont : le nom actuel ou une ligne de description, sans les ouvrir un par un.", "Retirer de la liste les noms de personnes, les numéros et les montants sensibles.", "Remplir le modèle et copier la consigne dans son IA.", "Créer les dossiers proposés sur son téléphone, son ordinateur ou Google Drive, puis renommer les fichiers.", "Garder l'index dans un tableau, et y ajouter une ligne à chaque nouveau document."]$j$::jsonb, precisions = $t$L'IA ne range rien à votre place : elle propose les dossiers et les noms, vous déplacez les fichiers. Ne lui envoyez pas une pièce d'identité, un relevé bancaire ou un contrat entier pour le classer : son nom ou une ligne de description suffit.$t$
  where code = $t$F12$t$;

update taches set resultat = $t$La quantité à commander de chaque article pour la période qui vient, le budget à prévoir et la date limite pour commander, avec chaque calcul montré.$t$, etapes = $j$["Relever ce qui a été vendu ou utilisé ces dernières semaines, article par article.", "Noter le stock du jour, le délai de livraison et ce qui va changer : une fête, une grosse commande, la saison des pluies.", "Remplir le modèle et copier la consigne dans son IA.", "Vérifier chaque calcul, puis corriger avec ce que vous savez du terrain.", "Passer la commande avant la date limite, et noter la livraison attendue dans votre tableau de suivi."]$j$::jsonb, precisions = $t$Une prévision n'est pas une certitude. L'IA prolonge vos chiffres : elle ne connaît ni votre marché ni vos clients. Gardez un stock de sécurité, et refaites le calcul chaque semaine.$t$
  where code = $t$F23$t$;

update taches set resultat = $t$L'ordre de vos visites ou de vos livraisons, regroupées par quartier, l'heure de passage prévue à chaque arrêt, et le message qui annonce votre passage.$t$, etapes = $j$["Lister les arrêts de la journée : le quartier, ce qu'il y a à faire, l'heure imposée s'il y en a une.", "Noter votre point de départ, votre heure de départ, le temps passé à chaque arrêt et vos temps de trajet habituels.", "Remplir le modèle et copier la consigne dans son IA.", "Corriger l'ordre avec votre connaissance de la ville : marché, route barrée, pluie, heures de pointe.", "Annoncer à chaque client l'heure prévue, avec une marge."]$j$::jsonb, precisions = $t$Une IA ne voit ni les embouteillages ni l'état des routes du jour : les temps de trajet viennent de vous. Avec Gemini, sur un compte personnel où l'activité est conservée, l'IA peut s'appuyer sur Google Maps ; cette fonction varie selon le pays. Ne donnez jamais l'adresse exacte d'un client : le quartier suffit.$t$
  where code = $t$F24$t$;

update taches set resultat = $t$La liste des éléments du plan, pièce par pièce, le total de chaque élément, et les points à vérifier sur le plan lui-même.$t$, etapes = $j$["Photographier le plan bien à plat, en pleine lumière, ou le décrire pièce par pièce.", "Dire ce qu'il faut compter : portes, fenêtres, prises, poteaux, points d'eau.", "Remplir le modèle et copier la consigne dans son IA, avec la photo si votre IA l'accepte.", "Recompter vous-même une pièce au moins, pour contrôler le relevé.", "Reporter les quantités vérifiées dans votre devis."]$j$::jsonb, precisions = $t$Une IA peut mal lire un plan photographié : un symbole flou, une cote illisible, une pièce oubliée. Son comptage est un premier relevé, pas un métré : il se vérifie sur le plan, et ne remplace pas le travail d'un métreur, d'un architecte ou d'un ingénieur. Les IA lisent une photo sur un compte gratuit, avec des limites d'usage.$t$
  where code = $t$F31$t$;

update taches set resultat = $t$Le point d'avancement du chantier, lot par lot : ce qui est fait, ce qui est en retard et de combien, ce qui est prévu ensuite, avec le compte rendu prêt à envoyer au propriétaire.$t$, etapes = $j$["Faire le tour du chantier et noter ce qui est fait, lot par lot. Prendre les photos, toujours du même endroit.", "Reprendre le planning : ce qui devait être fini à cette date.", "Remplir le modèle et copier la consigne dans son IA.", "Relire le compte rendu : il ne doit rien dire que vous n'avez pas vu.", "Envoyer le compte rendu et les photos, puis noter la date de l'envoi."]$j$::jsonb, precisions = $t$Une photo montre ce qui se voit, pas la qualité de ce qui est fait. L'IA ne juge ni la solidité d'un ouvrage ni la conformité d'un travail : pour cela, il faut l'ingénieur ou le bureau de contrôle. Ne photographiez pas un ouvrier de près sans son accord.$t$
  where code = $t$F32$t$;

update taches set resultat = $t$Vos points de risque classés du plus urgent au moins urgent, avec pour chacun ce qui peut arriver, l'action à faire, qui s'en charge et pour quand.$t$, etapes = $j$["Faire le tour du chantier et noter tout ce qui inquiète : sécurité, pluie, livraisons, argent, voisinage.", "Noter, pour chaque point, ce qui est déjà en place.", "Remplir le modèle et copier la consigne dans son IA.", "Relire le classement : vous connaissez le terrain, corrigez l'ordre s'il le faut.", "Traiter le premier point le jour même, puis lire la liste à l'équipe."]$j$::jsonb, precisions = $t$Ce classement aide à décider par où commencer. Il ne remplace ni les règles de sécurité de votre pays, ni l'avis d'un ingénieur ou d'un responsable sécurité. Un danger immédiat pour une personne ne se classe pas : on arrête le travail et on le traite tout de suite.$t$
  where code = $t$F33$t$;

-- 3. Les cas pratiques localisés, à côté des anciens
update exercices set titre_local = $t$Assistante dans un bureau d'études à Lomé$t$, contexte_local = $t$Vous êtes assistante dans un bureau d'études de 12 personnes, à Tokoin. Le dossier partagé du bureau contient plus de 300 fichiers en vrac. Votre responsable vous demande un classement avant vendredi. Vous relevez un échantillon de douze fichiers.$t$, donnees_local = $t$- « plan RDC v3 final.pdf »
- « plan RDC v3 final (2).pdf »
- « devis menuiserie.xlsx »
- « IMG_20260912_084512.jpg » : une photo du chantier de l'école d'Agoè.
- « CR réunion 14-09.docx »
- « facture ciment sept.pdf »
- « contrat école Agoè signé.pdf »
- « Scan0007.pdf » : un bon de livraison de fer.
- « planning villa Adidogomé.xlsx »
- « courrier mairie.docx »
- « offre technique ONG.docx »
- « photo réception dalle.jpg »$t$, travail_local = $t$Proposez un plan de classement par projet, une règle pour nommer les fichiers, puis le nouveau nom et le dossier de chacun des douze fichiers. Signalez les doublons et les fichiers dont le nom ne dit pas le projet.$t$, prenom = $t$Akouvi$t$, lieu = $t$Lomé, Togo$t$, profil = $t$Structure, 12 personnes$t$, reponse_attendue = $t$Un doublon à signaler : les deux fichiers « plan RDC v3 final ». Trois projets apparaissent : l'école d'Agoè, la villa d'Adidogomé et l'offre pour l'ONG. Plusieurs fichiers ne disent pas leur projet : il faut le demander, pas le deviner.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F12$t$);

update exercices set titre_local = $t$Photographe à son compte à Dakar$t$, contexte_local = $t$Vous êtes photographe à votre compte, aux Parcelles Assainies. Vous travaillez surtout pour des mariages. Tout est sur votre téléphone, et vous perdez du temps à chercher un devis ou la preuve d'un paiement.$t$, donnees_local = $t$- Une quarantaine de captures d'écran de paiements Wave, mêlées à vos photos personnelles.
- Des devis en PDF envoyés par WhatsApp, tous nommés « devis.pdf ».
- Les photos de six mariages, dans le seul dossier « Appareil photo ».
- Trois contrats signés, photographiés.
- Les factures d'achat de votre matériel.
- Des modèles de poses envoyés par des clientes.$t$, travail_local = $t$Proposez un classement simple, sur le téléphone et sur Google Drive, une règle pour nommer les fichiers, et la liste des documents à garder pour chaque mariage.$t$, prenom = $t$Khady$t$, lieu = $t$Dakar, Sénégal$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F12$t$);

update exercices set titre_local = $t$Responsable des achats dans une quincaillerie de gros à Abidjan$t$, contexte_local = $t$Vous êtes responsable des achats dans une quincaillerie de gros de 15 personnes, à Adjamé. Ce lundi, vous préparez la commande de ciment des deux prochaines semaines. Le magasin ouvre six jours par semaine.$t$, donnees_local = $t$- Ventes de ciment des quatre dernières semaines : 420, 460, 440 et 480 sacs.
- Stock ce lundi matin : 300 sacs.
- La saison des pluies se termine et les chantiers reprennent : vous prévoyez 10 % de ventes en plus.
- Vous voulez garder 100 sacs de sécurité à la fin des deux semaines.
- Prix d'achat : 3 600 FCFA le sac. Le fournisseur livre 3 jours après la commande.$t$, travail_local = $t$Calculez la moyenne des ventes par semaine, le besoin des deux prochaines semaines, la quantité à commander et le budget. Dites combien de jours de vente couvre le stock actuel, au rythme moyen, et le jour limite pour commander.$t$, prenom = $t$Affoué$t$, lieu = $t$Abidjan, Côte d'Ivoire$t$, profil = $t$Structure, 15 personnes$t$, reponse_attendue = $t$Moyenne : 450 sacs par semaine, soit 75 sacs par jour. Besoin de deux semaines avec 10 % en plus : 990 sacs. À commander : 990 + 100 − 300 = 790 sacs. Budget : 2 844 000 FCFA. Le stock couvre 4 jours de vente et la livraison prend 3 jours : la commande part mardi au plus tard.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F23$t$);

update exercices set titre_local = $t$Gérante d'un service traiteur à Cotonou$t$, contexte_local = $t$Vous gérez Fifamè Traiteur, un service traiteur de 3 personnes, à Akpakpa. Trois commandes sont confirmées pour décembre. Vous préparez vos achats de riz et d'huile.$t$, donnees_local = $t$- Un mariage de 300 couverts le 12, un baptême de 100 couverts le 19, une fête d'entreprise de 200 couverts le 23.
- Votre repère en cuisine : 1 kg de riz pour 8 couverts, 1 litre d'huile pour 40 couverts.
- En stock : 15 kg de riz et 3 litres d'huile.
- Prix relevés au marché Dantokpa : le sac de riz de 50 kg à 19 000 FCFA, le sac de 25 kg à 12 000 FCFA, le litre d'huile à 1 650 FCFA.
- Vous achetez le riz par sacs entiers.$t$, travail_local = $t$Calculez ce qu'il faut acheter en riz et en huile pour les trois commandes, puis le budget.$t$, prenom = $t$Rachidatou$t$, lieu = $t$Cotonou, Bénin$t$, profil = $t$Individuelle, 3 personnes$t$, reponse_attendue = $t$600 couverts. Riz : 75 kg, moins 15 kg en stock, soit 60 kg à acheter : un sac de 50 kg et un sac de 25 kg, 31 000 FCFA. Huile : 15 litres, moins 3 en stock, soit 12 litres, 19 800 FCFA. Budget : 50 800 FCFA.$t$
  where numero = 2 and tache_id in (select id from taches where code = $t$F23$t$);

update exercices set titre_local = $t$Responsable des livraisons chez un distributeur à Ouagadougou$t$, contexte_local = $t$Vous êtes responsable des livraisons dans une entreprise de distribution de 20 personnes. Demain matin, un seul véhicule doit faire sept livraisons et rentrer au dépôt avant 13 h.$t$, donnees_local = $t$- Départ du dépôt, à Gounghin, à 7 h 30.
- Sept livraisons : deux à Pissy, deux à Tampouy, une à Dassasgho, deux à Ouaga 2000.
- Le client de Dassasgho ne reçoit qu'entre 9 h et 10 h.
- Comptez 20 minutes par livraison et 25 minutes de trajet entre deux quartiers, dépôt compris.
- Deux livraisons dans le même quartier : 10 minutes de trajet entre les deux.$t$, travail_local = $t$Proposez l'ordre des arrêts et l'heure de passage prévue à chacun. Dites si le retour au dépôt avant 13 h est tenu.$t$, prenom = $t$Issouf$t$, lieu = $t$Ouagadougou, Burkina Faso$t$, profil = $t$Structure, 20 personnes$t$, reponse_attendue = $t$Un ordre possible : Pissy, Dassasgho à 9 h 10, Ouaga 2000, Tampouy. Livraisons : 140 minutes. Trajets : 155 minutes. Total : 4 h 55. Retour au dépôt vers 12 h 25, avant 13 h.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F24$t$);

update exercices set titre_local = $t$Livreur à moto à son compte à Cotonou$t$, contexte_local = $t$Vous êtes livreur à moto, à votre compte. Vous partez de Gbégamey. Ce matin, quatre vendeuses en ligne vous ont confié six colis.$t$, donnees_local = $t$- Départ à 8 h.
- Six colis : deux à Akpakpa, un à Cadjèhoun, deux à Fidjrossè, un à Agla.
- La cliente de Cadjèhoun part au travail à 9 h : elle doit être livrée avant.
- Comptez 10 minutes par livraison et 20 minutes de trajet entre deux quartiers.
- Deux livraisons dans le même quartier : 5 minutes de trajet entre les deux.
- Frais de livraison : 1 000 FCFA par colis, 1 500 FCFA pour Akpakpa.$t$, travail_local = $t$Proposez l'ordre des livraisons et l'heure de passage à chacune. Donnez l'heure de fin de la tournée et le total des frais encaissés.$t$, prenom = $t$Bignon$t$, lieu = $t$Cotonou, Bénin$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = $t$Un ordre possible : Cadjèhoun à 8 h 20, Fidjrossè, Agla, Akpakpa. Livraisons : 60 minutes. Trajets : 90 minutes. Fin de la tournée vers 10 h 30. Frais encaissés : 7 000 FCFA, soit 4 000 + 3 000.$t$
  where numero = 2 and tache_id in (select id from taches where code = $t$F24$t$);

update exercices set titre_local = $t$Métreur dans une entreprise de construction à Dakar$t$, contexte_local = $t$Vous êtes métreur dans une entreprise de construction de 20 personnes. Vous préparez le chiffrage du rez-de-chaussée d'un immeuble de bureaux, à Ouakam. Vous relevez le plan pièce par pièce.$t$, donnees_local = $t$- Hall d'entrée : 1 porte double, 2 fenêtres, 4 prises.
- Bureau 1 : 1 porte, 2 fenêtres, 6 prises.
- Bureau 2 : 1 porte, 1 fenêtre, 6 prises.
- Bureau 3 : 1 porte, 2 fenêtres, 6 prises.
- Salle de réunion : 1 porte, 3 fenêtres, 8 prises.
- Sanitaires : 2 portes, 1 fenêtre, 1 prise, 3 points d'eau.
- Le dossier d'exécution prévoit 120 sacs de ciment pour ce niveau. Prix relevé : 3 550 FCFA le sac.$t$, travail_local = $t$Dressez le tableau des quantités par pièce, puis le total de chaque élément et le coût du ciment.$t$, prenom = $t$Ousmane$t$, lieu = $t$Dakar, Sénégal$t$, profil = $t$Structure, 20 personnes$t$, reponse_attendue = $t$1 porte double et 6 portes simples ; 11 fenêtres ; 31 prises ; 3 points d'eau. Ciment : 426 000 FCFA.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F31$t$);

update exercices set titre_local = $t$Maçon à son compte à Cotonou$t$, contexte_local = $t$Vous êtes maçon à votre compte, à Agla, avec deux apprentis. Un client vous envoie sur WhatsApp la photo du plan de sa maison. La photo est un peu floue. Vous notez ce que vous lisez.$t$, donnees_local = $t$- Salon : 1 porte d'entrée, 3 fenêtres.
- Chambre 1 : 1 porte, 2 fenêtres.
- Chambre 2 : 1 porte, 1 fenêtre.
- Chambre 3 : 1 porte, 1 fenêtre. Un pli du papier cache une partie de la pièce.
- Cuisine : 1 porte, 1 fenêtre.
- Douche et toilettes : 2 portes, 2 petites fenêtres.
- Le client a prévu 40 sacs de ciment pour commencer. Prix relevé : 5 500 FCFA le sac.$t$, travail_local = $t$Dressez le tableau des portes et des fenêtres par pièce, puis les totaux. Dites ce qu'il faut vérifier auprès du client, et calculez le coût des 40 sacs.$t$, prenom = $t$Mahougnon$t$, lieu = $t$Cotonou, Bénin$t$, profil = $t$Individuelle, 3 personnes$t$, reponse_attendue = $t$7 portes, dont la porte d'entrée ; 8 fenêtres et 2 petites fenêtres. La chambre 3 est à vérifier auprès du client. Ciment : 220 000 FCFA.$t$
  where numero = 2 and tache_id in (select id from taches where code = $t$F31$t$);

update exercices set titre_local = $t$Conductrice de travaux dans une entreprise de construction à Bamako$t$, contexte_local = $t$Vous êtes conductrice de travaux dans une entreprise de 25 personnes. Vous suivez la construction d'une école de six classes. Le chantier doit durer 16 semaines. Nous sommes à la fin de la semaine 8.$t$, donnees_local = $t$- Fondations : prévues pour la fin de la semaine 3, finies en semaine 3.
- Murs : prévus finis à la fin de la semaine 7. Ils sont montés à 80 %.
- Dalle : elle devait commencer en semaine 8. Elle n'a pas commencé.
- La pluie a arrêté le chantier 6 jours en août.
- La livraison de fer attendue lundi est arrivée jeudi.
- Effectif prévu : 14 ouvriers. Présents en moyenne : 11.$t$, travail_local = $t$Rédigez le point d'avancement lot par lot, le retard estimé, ses causes, et ce qu'il faut décider pour le rattraper.$t$, prenom = $t$Djénéba$t$, lieu = $t$Bamako, Mali$t$, profil = $t$Structure, 25 personnes$t$, reponse_attendue = $t$Les fondations sont à l'heure. Les murs ont plus d'une semaine de retard : prévus finis en semaine 7, ils sont à 80 % à la fin de la semaine 8. La dalle n'a pas commencé. Trois causes sont données : la pluie, la livraison de fer, l'effectif.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F32$t$);

update exercices set titre_local = $t$Chef de chantier à son compte à Abidjan$t$, contexte_local = $t$Vous dirigez, avec trois ouvriers, la construction d'une villa à Yopougon. Le propriétaire vit à l'étranger. Chaque samedi, il attend un compte rendu sur WhatsApp, avec des photos.$t$, donnees_local = $t$- Cette semaine : le chaînage du rez-de-chaussée est coulé, les murs de l'étage sont montés à moitié.
- Le planning prévoyait les murs de l'étage terminés ce samedi.
- Trois jours sans ciment : la livraison a tardé.
- Dépenses de la semaine : 50 sacs de ciment à 3 800 FCFA le sac.
- Reçu du propriétaire par Wave ce mois-ci : 600 000 FCFA. Déjà dépensé avant cette semaine : 370 000 FCFA.
- Pour finir les murs, il faut 40 sacs de ciment la semaine prochaine, au même prix.$t$, travail_local = $t$Rédigez le compte rendu du samedi : ce qui est fait, ce qui est en retard, les dépenses de la semaine, ce qu'il reste en caisse, et la somme à demander pour le ciment de la semaine prochaine.$t$, prenom = $t$Désiré$t$, lieu = $t$Abidjan, Côte d'Ivoire$t$, profil = $t$Individuelle, 4 personnes$t$, reponse_attendue = $t$Dépenses de la semaine : 190 000 FCFA, soit 50 × 3 800. Total dépensé : 560 000 FCFA, soit 370 000 + 190 000. Reste en caisse : 40 000 FCFA. Ciment de la semaine prochaine : 152 000 FCFA. À demander au propriétaire : 112 000 FCFA au moins.$t$
  where numero = 2 and tache_id in (select id from taches where code = $t$F32$t$);

update exercices set titre_local = $t$Chef de chantier dans une entreprise de construction à Libreville$t$, contexte_local = $t$Vous êtes chef de chantier dans une entreprise de 30 personnes. Vous construisez un immeuble de trois étages. La saison des pluies commence. Lundi matin, vous relevez sept points.$t$, donnees_local = $t$- L'échafaudage de la façade arrière n'a pas de garde-corps au deuxième étage.
- Quatre ouvriers sur dix-huit travaillent sans casque.
- Une fouille est restée ouverte près du passage des piétons, sans barrière.
- Le stock de ciment est posé à même le sol, sous une bâche trouée.
- Le fer commandé il y a deux semaines n'est toujours pas livré.
- Un voisin se plaint du bruit avant 7 h.
- Le coffrage de la dalle du troisième étage doit être contrôlé par l'ingénieur avant le coulage, prévu jeudi.$t$, travail_local = $t$Classez ces sept points par ordre d'urgence, puis proposez pour chacun une action, un responsable et un délai.$t$, prenom = $t$Ghislain$t$, lieu = $t$Libreville, Gabon$t$, profil = $t$Structure, 30 personnes$t$, reponse_attendue = $t$Les trois points qui touchent à la sécurité des personnes passent en premier : le garde-corps, la fouille ouverte, les casques. Le contrôle du coffrage par l'ingénieur doit être fait avant jeudi.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F33$t$);

update exercices set titre_local = $t$Maçon chef d'équipe à Niamey$t$, contexte_local = $t$Vous dirigez une équipe de quatre personnes, vous compris, sur la maison d'un particulier. Il fait très chaud. En fin de journée, vous notez cinq points.$t$, donnees_local = $t$- L'eau du chantier vient du puits du voisin. Le niveau baisse, et le voisin commence à s'inquiéter.
- L'équipe travaille en plein soleil de 12 h à 15 h.
- Le ciment est stocké dehors, et un orage est annoncé en fin de semaine.
- Le client a deux semaines de retard sur le paiement de la tranche.
- L'échelle en bois a un barreau fendu.$t$, travail_local = $t$Classez ces cinq points, puis proposez pour chacun une action simple, à faire cette semaine.$t$, prenom = $t$Issoufou$t$, lieu = $t$Niamey, Niger$t$, profil = $t$Individuelle, 4 personnes$t$, reponse_attendue = $t$L'échelle au barreau fendu et le travail en plein soleil passent en premier : ce sont les deux points qui touchent à la sécurité des personnes.$t$
  where numero = 2 and tache_id in (select id from taches where code = $t$F33$t$);

-- 4. Les modèles à remplir, leurs champs et la note par IA
insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Classement et indexation de documents$t$, $t$Rôle : Vous m'aidez à ranger mes documents et à les retrouver vite.

Contexte : Mon activité : {{activite}}. Mes documents, tels qu'ils sont aujourd'hui, sans nom de personne ni numéro : {{documents}}. Ce que je cherche le plus souvent : {{recherches}}. Où je les range : {{rangement}}.

Travail demandé :
1. Un plan de classement : 3 à 7 dossiers, avec ce que chacun contient.
2. Une règle pour nommer les fichiers, avec 3 exemples. La date s'écrit en premier, sous la forme 2026-10-05.
3. Pour chaque document de ma liste : son nouveau nom et son dossier.
4. Les doublons et les documents à ne pas garder, signalés à part.
5. Un index en tableau : nom, dossier, date, mot-clé.

Format : texte simple, puis un tableau pour l'index, prêts à coller.

Règle : partez seulement de ma liste. Ne devinez pas le contenu d'un document dont le nom ne dit rien : demandez-le. Ne me demandez d'envoyer aucun document.$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F12$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$photographe à mon compte, à Dakar, surtout pour des mariages$t$, true, 1),
    ($t$documents$t$, $t$Quels documents avez-vous à ranger ?$t$, $t$long$t$, null::jsonb, $t$une quarantaine de captures de paiements Wave mêlées à mes photos personnelles ; des devis en PDF tous nommés « devis.pdf » ; les photos de six mariages dans le seul dossier « Appareil photo » ; trois contrats signés, photographiés ; les factures d'achat de mon matériel ; des modèles de poses envoyés par des clientes$t$, true, 2),
    ($t$recherches$t$, $t$Que cherchez-vous le plus souvent ?$t$, $t$texte$t$, null::jsonb, $t$le devis d'une cliente et la preuve de son paiement$t$, true, 3),
    ($t$rangement$t$, $t$Où rangez-vous vos documents ?$t$, $t$choix$t$, $j$["Téléphone", "Ordinateur", "Téléphone et Google Drive", "Ordinateur et Google Drive", "Papier et téléphone"]$j$::jsonb, $t$Téléphone et Google Drive$t$, true, 4)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F12$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Prévision de la demande et préparation des approvisionnements$t$, $t$Rôle : Vous m'aidez à prévoir mes besoins et à préparer mes commandes. Vous montrez chaque calcul.

Contexte : Mon activité : {{activite}}. Ce que j'ai vendu ou utilisé récemment, ou ce qui est déjà commandé chez moi : {{historique}}. Mon stock aujourd'hui : {{stock}}. Ce qui va changer dans la période qui vient : {{a_venir}}. Mes contraintes (prix d'achat, délai de livraison, conditionnement, stock de sécurité) : {{contraintes}}.

Travail demandé :
1. Le besoin de chaque article pour la période, avec le calcul.
2. La quantité à commander : le besoin, plus le stock de sécurité, moins le stock actuel. Arrondissez au conditionnement.
3. Le budget de la commande, article par article, puis le total.
4. La date limite pour commander, selon le délai de livraison.
5. Ce qui rend cette prévision fragile, en 2 lignes.

Format : un tableau (article, besoin, stock, à commander, prix, montant), puis 3 lignes de conseil. Montants écrits ainsi : 25 000 FCFA.

Règle : utilisez seulement mes chiffres. S'il manque un prix, un stock ou un délai, demandez-le. N'inventez aucune tendance du marché.$t$, 2, $t$Une IA peut se tromper dans un calcul. Vérifiez chaque total.$t$, 1, '2026-10-04' from taches t
  where t.code = $t$F23$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$gérante d'un service traiteur de 3 personnes, à Cotonou$t$, true, 1),
    ($t$historique$t$, $t$Qu'avez-vous vendu, utilisé, ou reçu comme commandes ?$t$, $t$long$t$, null::jsonb, $t$trois commandes confirmées en décembre : un mariage de 300 couverts le 12, un baptême de 100 couverts le 19, une fête d'entreprise de 200 couverts le 23 ; mon repère : 1 kg de riz pour 8 couverts, 1 litre d'huile pour 40 couverts$t$, true, 2),
    ($t$stock$t$, $t$Quel est votre stock aujourd'hui ?$t$, $t$texte$t$, null::jsonb, $t$15 kg de riz et 3 litres d'huile$t$, true, 3),
    ($t$a_venir$t$, $t$Qu'est-ce qui va changer dans la période qui vient ?$t$, $t$texte$t$, null::jsonb, $t$les fêtes de fin d'année : d'autres commandes peuvent arriver$t$, false, 4),
    ($t$contraintes$t$, $t$Quels sont vos prix, vos délais et vos conditionnements ?$t$, $t$long$t$, null::jsonb, $t$sac de riz de 50 kg à 19 000 FCFA, sac de 25 kg à 12 000 FCFA, litre d'huile à 1 650 FCFA ; j'achète le riz par sacs entiers$t$, true, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F23$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Planification d'itinéraires et estimation des délais$t$, $t$Rôle : Vous m'aidez à organiser une tournée et à estimer mes heures de passage. Vous montrez chaque calcul.

Contexte : Mon activité : {{activite}}. Mon départ et mon retour : {{depart}}. Mes arrêts, par quartier, sans adresse ni nom : {{arrets}}. Les heures imposées : {{contraintes}}. Mes durées (temps à chaque arrêt, temps de trajet) : {{durees}}.

Travail demandé :
1. L'ordre des arrêts, regroupés par quartier, en respectant les heures imposées.
2. L'heure d'arrivée et l'heure de départ à chaque arrêt, calculées avec mes durées.
3. L'heure de fin de la tournée, et ce qui ne tient pas dans le temps prévu.
4. Un message court pour annoncer mon passage, avec une heure et une marge de 30 minutes.

Format : un tableau (ordre, quartier, arrivée, départ), puis le message.

Règle : calculez seulement avec mes durées. Ne supposez ni distance ni circulation. Si une durée manque, demandez-la. Rappelez que ces heures sont des estimations.$t$, 2, $t$Une IA peut se tromper dans un calcul. Vérifiez chaque total.$t$, 1, '2026-10-04' from taches t
  where t.code = $t$F24$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$livreur à moto à mon compte, à Cotonou$t$, true, 1),
    ($t$depart$t$, $t$D'où partez-vous, à quelle heure, et quand devez-vous avoir fini ?$t$, $t$texte$t$, null::jsonb, $t$départ de Gbégamey à 8 h, pas d'heure de retour imposée$t$, true, 2),
    ($t$arrets$t$, $t$Quels sont vos arrêts, par quartier ?$t$, $t$long$t$, null::jsonb, $t$six colis : deux à Akpakpa, un à Cadjèhoun, deux à Fidjrossè, un à Agla$t$, true, 3),
    ($t$contraintes$t$, $t$Y a-t-il des heures imposées ?$t$, $t$texte$t$, null::jsonb, $t$la cliente de Cadjèhoun doit être livrée avant 9 h$t$, false, 4),
    ($t$durees$t$, $t$Combien de temps par arrêt et par trajet ?$t$, $t$texte$t$, null::jsonb, $t$10 minutes par livraison ; 20 minutes de trajet entre deux quartiers ; 5 minutes entre deux livraisons du même quartier$t$, true, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F24$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Repérage et comptage d'éléments sur un plan$t$, $t$Rôle : Vous m'aidez à relever et à compter les éléments d'un plan. Vous signalez tout ce qui est incertain.

Contexte : Mon activité : {{activite}}. Le plan, pièce par pièce, ou la photo que je joins : {{plan}}. Ce qu'il faut compter : {{elements}}. Ce qui est flou ou caché sur le plan : {{doutes}}. Les prix à appliquer, si j'en donne : {{prix}}.

Travail demandé :
1. Un tableau : une ligne par pièce, une colonne par élément à compter.
2. Le total de chaque élément, avec l'addition montrée.
3. La liste des points à vérifier sur le plan ou auprès du client.
4. Si j'ai donné des prix : le coût de chaque ligne et le total, avec chaque calcul.

Format : un tableau, puis une liste courte. Montants écrits ainsi : 25 000 FCFA.

Règle : comptez seulement ce qui est écrit ou visible. Ne complétez jamais une pièce illisible : écrivez « à vérifier ». Ne donnez aucun avis sur la structure, les dosages ou la sécurité.$t$, 2, $t$Une IA peut se tromper dans un calcul. Vérifiez chaque total.$t$, 1, '2026-10-04' from taches t
  where t.code = $t$F31$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$maçon à mon compte, à Cotonou, avec deux apprentis$t$, true, 1),
    ($t$plan$t$, $t$Que montre le plan, pièce par pièce ?$t$, $t$long$t$, null::jsonb, $t$salon : 1 porte d'entrée, 3 fenêtres ; chambre 1 : 1 porte, 2 fenêtres ; chambre 2 : 1 porte, 1 fenêtre ; chambre 3 : 1 porte, 1 fenêtre ; cuisine : 1 porte, 1 fenêtre ; douche et toilettes : 2 portes, 2 petites fenêtres$t$, true, 2),
    ($t$elements$t$, $t$Que faut-il compter ?$t$, $t$texte$t$, null::jsonb, $t$les portes et les fenêtres$t$, true, 3),
    ($t$doutes$t$, $t$Qu'est-ce qui est flou ou caché sur le plan ?$t$, $t$texte$t$, null::jsonb, $t$la photo est un peu floue, et un pli du papier cache une partie de la chambre 3$t$, false, 4),
    ($t$prix$t$, $t$Quels prix faut-il appliquer ?$t$, $t$texte$t$, null::jsonb, $t$40 sacs de ciment pour commencer, à 5 500 FCFA le sac$t$, false, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F31$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Suivi de l'avancement visible d'un chantier$t$, $t$Rôle : Vous m'aidez à faire le point d'un chantier et à en rendre compte. Vous ne dites rien que je n'ai pas constaté.

Contexte : Mon rôle : {{activite}}. Le chantier, et à qui je rends compte : {{chantier}}. Ce qui est fait à ce jour, lot par lot : {{fait}}. Ce que le planning prévoyait à cette date : {{prevu}}. Les retards et leurs causes : {{causes}}. Les dépenses et les fonds reçus, si je veux les faire figurer : {{depenses}}.

Travail demandé :
1. Le point lot par lot : prévu, fait, écart.
2. Le retard estimé et ses causes, sans chercher de coupable.
3. Si j'ai donné les chiffres : les dépenses de la période, le total dépensé et ce qu'il reste en caisse. Montrez chaque calcul.
4. Ce qui est prévu ensuite, et ce qu'il faut décider ou payer pour avancer.
5. Le compte rendu final, prêt à envoyer, avec une salutation et la liste des photos à joindre.

Format : texte simple, sans astérisque. Montants écrits ainsi : 25 000 FCFA.

Règle : n'ajoutez aucun travail, aucun pourcentage, aucune dépense que je n'ai pas donnés. Ne jugez ni la qualité ni la solidité d'un ouvrage. Si un chiffre manque, écrivez « à préciser ».$t$, 2, $t$Une IA peut se tromper dans un calcul. Vérifiez chaque total.$t$, 1, '2026-10-04' from taches t
  where t.code = $t$F32$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quel est votre rôle sur le chantier ?$t$, $t$texte$t$, null::jsonb, $t$chef de chantier à mon compte, avec trois ouvriers$t$, true, 1),
    ($t$chantier$t$, $t$Quel est le chantier, et à qui rendez-vous compte ?$t$, $t$texte$t$, null::jsonb, $t$une villa à Yopougon, à Abidjan ; le propriétaire vit à l'étranger et attend un compte rendu chaque samedi sur WhatsApp$t$, true, 2),
    ($t$fait$t$, $t$Qu'est-ce qui est fait à ce jour ?$t$, $t$long$t$, null::jsonb, $t$le chaînage du rez-de-chaussée est coulé ; les murs de l'étage sont montés à moitié$t$, true, 3),
    ($t$prevu$t$, $t$Que prévoyait le planning à cette date ?$t$, $t$texte$t$, null::jsonb, $t$les murs de l'étage terminés ce samedi$t$, true, 4),
    ($t$causes$t$, $t$Quels sont les retards, et pourquoi ?$t$, $t$texte$t$, null::jsonb, $t$trois jours sans ciment, la livraison a tardé$t$, false, 5),
    ($t$depenses$t$, $t$Quelles sont les dépenses et les fonds reçus ?$t$, $t$long$t$, null::jsonb, $t$cette semaine : 50 sacs de ciment à 3 800 FCFA le sac ; reçu du propriétaire ce mois-ci : 600 000 FCFA ; déjà dépensé avant cette semaine : 370 000 FCFA ; il faut 40 sacs de ciment la semaine prochaine, au même prix$t$, false, 6)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F32$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Hiérarchisation des points de risque d'un chantier$t$, $t$Rôle : Vous m'aidez à classer les points de risque d'un chantier et à décider par où commencer.

Contexte : Mon rôle : {{activite}}. Le chantier : {{chantier}}. Les points qui m'inquiètent, un par ligne : {{points}}. Ce qui est déjà en place : {{en_place}}. Mes moyens cette semaine : {{moyens}}.

Travail demandé :
1. Le classement des points, du plus urgent au moins urgent. La sécurité des personnes passe toujours en premier.
2. Pour chaque point : ce qui peut arriver, en une ligne.
3. Pour chaque point : une action simple, qui s'en charge, pour quand.
4. Les points qui demandent l'avis d'un ingénieur ou d'un responsable sécurité, signalés à part.
5. Le message à lire à l'équipe, en 5 lignes.

Format : un tableau (rang, point, risque, action, responsable, délai), puis le message.

Règle : classez seulement mes points, sans en inventer. Ne donnez aucune règle technique ou juridique : pour une norme, un dosage ou une obligation, renvoyez-moi vers le professionnel compétent. Un danger immédiat pour une personne se traite tout de suite : dites-le.$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F33$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quel est votre rôle sur le chantier ?$t$, $t$texte$t$, null::jsonb, $t$maçon chef d'équipe, avec trois ouvriers$t$, true, 1),
    ($t$chantier$t$, $t$Quel est le chantier ?$t$, $t$texte$t$, null::jsonb, $t$la maison d'un particulier, à Niamey ; il fait très chaud$t$, true, 2),
    ($t$points$t$, $t$Quels points vous inquiètent ?$t$, $t$long$t$, null::jsonb, $t$l'eau vient du puits du voisin, le niveau baisse et le voisin s'inquiète ; l'équipe travaille en plein soleil de 12 h à 15 h ; le ciment est stocké dehors et un orage est annoncé en fin de semaine ; le client a deux semaines de retard sur le paiement de la tranche ; l'échelle en bois a un barreau fendu$t$, true, 3),
    ($t$en_place$t$, $t$Qu'est-ce qui est déjà en place ?$t$, $t$texte$t$, null::jsonb, $t$une bâche, pas d'abri pour le ciment ; une seule échelle$t$, false, 4),
    ($t$moyens$t$, $t$Quels sont vos moyens cette semaine ?$t$, $t$texte$t$, null::jsonb, $t$quatre personnes, pas de budget en plus avant le paiement de la tranche$t$, false, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F33$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

-- La note par IA : la même pour les 6 modèles
insert into conseils_ia (modele_id, ia, conseil) select mp.id, v.ia, v.conseil
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$chatgpt$t$, $t$Ouvrez la conversation dans le projet de votre kit, pour que vos instructions s'appliquent. Si la skill de la tâche est installée, ChatGPT s'en sert seul.$t$),
    ($t$claude$t$, $t$Ouvrez la conversation dans le projet de votre kit. Si la skill de la tâche est installée, Claude s'en sert seul.$t$),
    ($t$gemini$t$, $t$Ouvrez le Gem de la tâche quand il y en a un, sinon collez la consigne dans le Gem de votre kit.$t$),
    ($t$meta_ai$t$, $t$Collez d'abord la configuration de votre kit, puis la consigne.$t$),
    ($t$copilot$t$, $t$Collez d'abord la configuration de votre kit, puis la consigne.$t$)
  ) as v(ia, conseil)
  where t.code in ($t$F12$t$, $t$F23$t$, $t$F24$t$, $t$F31$t$, $t$F32$t$, $t$F33$t$)
  on conflict (modele_id, ia) do update set conseil = excluded.conseil;

-- 5. Les ressources
insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-chantier-chatgpt$t$, $t$configuration$t$, $t$Assistant de chantier$t$, $t$Vous le complétez une fois avec les informations de votre chantier : ensuite, l'IA connaît l'ouvrage, l'équipe, vos prix et vos contraintes à chaque conversation.$t$, $t$chatgpt$t$, $t$Vous êtes mon assistant de chantier. Vous m'aidez à chiffrer, à planifier, à commander, à suivre l'avancement et à rendre compte au propriétaire.

MON CHANTIER
Mon rôle : [chef de chantier, conducteur de travaux, artisan, propriétaire]
L'ouvrage : [type d'ouvrage, ville et quartier, étape en cours]
L'équipe : [nombre d'ouvriers, corps de métier]
Le propriétaire : [sur place ou à l'étranger, comment il suit le chantier]
Mes prix : [matériaux et main-d'œuvre, en FCFA]
Paiement : [espèces, Mobile Money, virement, par tranches]
Contraintes : [saison des pluies, accès, eau, électricité]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez le propriétaire et les fournisseurs.
2. Montants écrits ainsi : 25 000 FCFA. Quantités avec leur unité : sacs, barres, m², m³.
3. N'inventez jamais un prix, une quantité, un délai ou un dosage. S'il manque une information, demandez-la.
4. Montrez chaque calcul, pour que je le vérifie.
5. Textes prêts à coller dans WhatsApp : ni titre, ni astérisque.
6. Structure, béton armé, sécurité : vous ne décidez pas. Renvoyez-moi vers l'ingénieur, l'architecte ou le bureau de contrôle.
7. Un compte rendu dit ce qui est fait, ce qui est en retard et ce qu'il faut décider.
8. Ne demandez jamais le nom complet ni le numéro d'une personne.$t$, $j${"chatgpt": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre chantier.", "Dans ChatGPT, choisissez un projet, puis Nouveau projet. Donnez-lui le nom « Mon chantier », puis Créer un projet.", "Ouvrez le menu « … » du projet, puis Paramètres du projet. Collez le texte dans le champ Instructions, puis Enregistrer."], "gratuit": "Oui. Les projets sont disponibles sur un compte gratuit, avec 5 fichiers par projet.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Autre possibilité : Paramètres, Personnalisation, Instructions personnalisées. Le texte s'applique alors à toutes vos conversations, dans la limite de 1 500 caractères.", "Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-chantier-claude$t$, $t$configuration$t$, $t$Assistant de chantier$t$, $t$Vous le complétez une fois avec les informations de votre chantier : ensuite, l'IA connaît l'ouvrage, l'équipe, vos prix et vos contraintes à chaque conversation.$t$, $t$claude$t$, $t$Vous êtes mon assistant de chantier. Vous m'aidez à chiffrer, à planifier, à commander, à suivre l'avancement et à rendre compte au propriétaire.

MON CHANTIER
Mon rôle : [chef de chantier, conducteur de travaux, artisan, propriétaire]
L'ouvrage : [type d'ouvrage, ville et quartier, étape en cours]
L'équipe : [nombre d'ouvriers, corps de métier]
Le propriétaire : [sur place ou à l'étranger, comment il suit le chantier]
Mes prix : [matériaux et main-d'œuvre, en FCFA]
Paiement : [espèces, Mobile Money, virement, par tranches]
Contraintes : [saison des pluies, accès, eau, électricité]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez le propriétaire et les fournisseurs.
2. Montants écrits ainsi : 25 000 FCFA. Quantités avec leur unité : sacs, barres, m², m³.
3. N'inventez jamais un prix, une quantité, un délai ou un dosage. S'il manque une information, demandez-la.
4. Montrez chaque calcul, pour que je le vérifie.
5. Textes prêts à coller dans WhatsApp : ni titre, ni astérisque.
6. Structure, béton armé, sécurité : vous ne décidez pas. Renvoyez-moi vers l'ingénieur, l'architecte ou le bureau de contrôle.
7. Un compte rendu dit ce qui est fait, ce qui est en retard et ce qu'il faut décider.
8. Ne demandez jamais le nom complet ni le numéro d'une personne.$t$, $j${"claude": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre chantier.", "Dans Claude, ouvrez Projets, puis Nouveau projet. Donnez-lui le nom « Mon chantier », puis Créer un projet.", "Dans le projet, ouvrez Instructions, puis Ajouter. Collez le texte, puis Enregistrer les instructions."], "gratuit": "Oui, dans la limite de 5 projets.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-chantier-gemini$t$, $t$configuration$t$, $t$Assistant de chantier$t$, $t$Vous le complétez une fois avec les informations de votre chantier : ensuite, l'IA connaît l'ouvrage, l'équipe, vos prix et vos contraintes à chaque conversation.$t$, $t$gemini$t$, $t$Vous êtes mon assistant de chantier. Vous m'aidez à chiffrer, à planifier, à commander, à suivre l'avancement et à rendre compte au propriétaire.

MON CHANTIER
Mon rôle : [chef de chantier, conducteur de travaux, artisan, propriétaire]
L'ouvrage : [type d'ouvrage, ville et quartier, étape en cours]
L'équipe : [nombre d'ouvriers, corps de métier]
Le propriétaire : [sur place ou à l'étranger, comment il suit le chantier]
Mes prix : [matériaux et main-d'œuvre, en FCFA]
Paiement : [espèces, Mobile Money, virement, par tranches]
Contraintes : [saison des pluies, accès, eau, électricité]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez le propriétaire et les fournisseurs.
2. Montants écrits ainsi : 25 000 FCFA. Quantités avec leur unité : sacs, barres, m², m³.
3. N'inventez jamais un prix, une quantité, un délai ou un dosage. S'il manque une information, demandez-la.
4. Montrez chaque calcul, pour que je le vérifie.
5. Textes prêts à coller dans WhatsApp : ni titre, ni astérisque.
6. Structure, béton armé, sécurité : vous ne décidez pas. Renvoyez-moi vers l'ingénieur, l'architecte ou le bureau de contrôle.
7. Un compte rendu dit ce qui est fait, ce qui est en retard et ce qu'il faut décider.
8. Ne demandez jamais le nom complet ni le numéro d'une personne.$t$, $j${"gemini": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre chantier.", "Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez « Assistant de chantier ». Collez le texte dans Instructions, puis Enregistrer."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-compte-rendu-chantier$t$, $t$skill$t$, $t$Compte rendu de chantier$t$, $t$Rédige le compte rendu d'un chantier pour le propriétaire : travaux faits, retards, dépenses, décisions à prendre.$t$, null, $t$---
name: compte-rendu-chantier
description: Rédige le compte rendu d'un chantier pour le propriétaire : travaux faits, retards, dépenses, décisions à prendre. À utiliser quand l'utilisateur colle ses notes de chantier.
---

# Compte rendu de chantier

Quand l'utilisateur colle ses notes de la semaine, rédigez le compte rendu destiné au propriétaire.

## Avant d'écrire
Il vous faut : l'ouvrage et l'étape en cours, ce qui a été fait, ce que le planning prévoyait, les retards et leurs causes, les dépenses si l'utilisateur veut les faire figurer, et les décisions qu'il attend du propriétaire. S'il manque ce que le planning prévoyait, demandez-le.

## Ce que vous livrez
1. Les travaux faits, lot par lot, en phrases courtes.
2. Les retards : combien de jours, et pourquoi. Sans chercher de coupable.
3. Les dépenses de la période et leur total, si elles sont données. Montrez chaque calcul.
4. Ce qui est prévu ensuite.
5. Les décisions attendues du propriétaire, avec la date limite de chacune.
6. Le message d'envoi sur WhatsApp, en 3 lignes, avec une salutation et la liste des photos à joindre.

## Règles
- Texte simple, sans astérisque ni titre, prêt à coller. Vouvoyez le propriétaire.
- N'ajoutez aucun travail, aucun pourcentage, aucune dépense qui n'est pas dans les notes.
- Ne jugez ni la qualité ni la solidité d'un ouvrage : c'est le rôle de l'ingénieur ou du bureau de contrôle.
- Montants écrits ainsi : 25 000 FCFA. Si un chiffre manque, écrivez « à préciser ».$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mon chantier »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$compte-rendu-chantier.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-devis-quantitatif$t$, $t$skill$t$, $t$Devis quantitatif$t$, $t$Met en forme un devis quantitatif et estimatif, lot par lot, avec les quantités et les prix de l'utilisateur.$t$, null, $t$---
name: devis-quantitatif
description: Met en forme un devis quantitatif et estimatif, lot par lot, avec les quantités et les prix de l'utilisateur. À utiliser pour chiffrer des travaux ou vérifier les totaux d'un devis.
---

# Devis quantitatif

Quand l'utilisateur donne ses quantités et ses prix, mettez le devis en forme et vérifiez chaque total.

## Avant d'écrire
Il vous faut, pour chaque ligne : le lot, la désignation, l'unité, la quantité et le prix à l'unité. Il vous faut aussi la part prévue pour les imprévus, s'il y en a une, et les tranches de paiement. S'il manque une quantité ou un prix, demandez-le. Ne le devinez jamais.

## Ce que vous livrez
1. Le devis lot par lot : désignation, unité, quantité, prix à l'unité, montant de la ligne.
2. Le total de chaque lot, puis le total du devis. Montrez chaque calcul.
3. Les imprévus et les tranches de paiement, calculés à partir des pourcentages donnés.
4. Les lignes qui semblent manquer, sous forme de questions.
5. Un message de 3 lignes pour envoyer le devis, avec une salutation.

## Règles
- Montants écrits ainsi : 25 000 FCFA. Quantités avec leur unité.
- Utilisez seulement les quantités et les prix de l'utilisateur. Aucun prix du marché, aucun ratio, aucun dosage de votre part.
- Vous ne validez ni un métré ni une structure. Pour cela, renvoyez l'utilisateur vers un métreur, un architecte ou un ingénieur.
- Ce devis n'est pas une facture normalisée.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mon chantier »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$devis-quantitatif.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-planning-chantier$t$, $t$skill$t$, $t$Planning de chantier$t$, $t$Ordonne les travaux d'un chantier semaine par semaine, avec les commandes à passer avant chaque étape.$t$, null, $t$---
name: planning-chantier
description: Ordonne les travaux d'un chantier semaine par semaine, avec les commandes à passer avant chaque étape. À utiliser quand l'utilisateur prépare ou recale son planning.
---

# Planning de chantier

Quand l'utilisateur liste ses travaux, proposez un planning clair et les commandes qui vont avec.

## Avant d'écrire
Il vous faut : la liste des travaux dans l'ordre où ils se font, la durée que l'utilisateur prévoit pour chacun, l'effectif, la date de départ, les délais de livraison des matériaux et les contraintes connues : pluie, accès, paiement par tranches. S'il manque une durée, demandez-la.

## Ce que vous livrez
1. Le planning semaine par semaine : les travaux, l'équipe, le matériel.
2. Pour chaque étape : ce qu'il faut commander, et le jour limite pour commander.
3. Les travaux qui ne peuvent pas commencer avant la fin d'un autre.
4. Les semaines à risque : pluie, livraison, paiement, contrôle à faire avant de continuer.
5. Le planning recalé, si l'utilisateur annonce un retard.

## Règles
- Utilisez les durées de l'utilisateur. Ne décidez pas vous-même du temps de séchage, de décoffrage ou de tout délai technique : demandez-le.
- Un contrôle prévu par l'ingénieur ou le bureau de contrôle apparaît dans le planning, avant l'étape qu'il conditionne.
- Tableau simple, prêt à coller dans un tableur ou dans WhatsApp.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mon chantier »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$planning-chantier.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-risques-chantier$t$, $t$skill$t$, $t$Points de risque du chantier$t$, $t$Classe les points de risque d'un chantier du plus urgent au moins urgent, avec une action simple pour chacun.$t$, null, $t$---
name: risques-chantier
description: Classe les points de risque d'un chantier du plus urgent au moins urgent, avec une action simple pour chacun. À utiliser quand l'utilisateur liste ce qui l'inquiète sur son chantier.
---

# Points de risque du chantier

Quand l'utilisateur liste ses inquiétudes, classez-les et proposez une action pour chacune.

## Avant d'écrire
Il vous faut : l'ouvrage et l'étape en cours, la liste des points, un par ligne, ce qui est déjà en place, et les moyens de la semaine. Si un point est trop vague, demandez une précision.

## Ce que vous livrez
1. Le classement, du plus urgent au moins urgent. La sécurité des personnes passe toujours en premier.
2. Pour chaque point : ce qui peut arriver, une action simple, qui s'en charge, pour quand.
3. Les points qui demandent l'avis d'un ingénieur ou d'un responsable sécurité, signalés à part.
4. Un message de 5 lignes à lire à l'équipe.

## Règles
- Classez seulement les points donnés. N'en inventez pas.
- Un danger immédiat pour une personne ne se classe pas : dites d'arrêter le travail et de le traiter tout de suite.
- Aucune norme, aucun dosage, aucune obligation légale de votre part : renvoyez vers le professionnel compétent.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mon chantier »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$risques-chantier.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-devis-quantitatif$t$, $t$document$t$, $t$Devis quantitatif et estimatif$t$, $t$Ce tableau chiffre des travaux lot par lot : chaque ligne a sa quantité et son prix, le montant se calcule seul, et le récapitulatif donne le total de chaque lot et le total du devis.$t$, null, $t$Dans l'onglet « Devis », une ligne par ouvrage ou par fourniture : le lot, la désignation, l'unité, la quantité et le prix à l'unité. Le montant se calcule seul.
L'onglet « Récapitulatif » additionne chaque lot et donne le total. Vous y écrivez la part prévue pour les imprévus et la part de la première tranche : les deux montants se calculent seuls.
Les quantités et les prix sont les vôtres. Le tableau ne valide ni un métré ni un dosage.
Ce devis n'est pas une facture normalisée. Pour une facture officielle, adressez-vous à votre comptable.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$devis-quantitatif-et-estimatif.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1jvF0dZiTTFdeXPeTB5bUJRaXTzZuwclUS9Nrna4JNiQ/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-journal-chantier$t$, $t$document$t$, $t$Journal de chantier$t$, $t$Ce tableau garde la mémoire du chantier, jour après jour : la météo, l'effectif, les travaux faits, les livraisons, les problèmes et les photos envoyées au propriétaire.$t$, null, $t$Une ligne par jour de chantier : la date, la météo, le nombre d'ouvriers présents, les travaux du jour, les livraisons reçues, le problème ou le retard du jour.
Vous notez si les photos ont été envoyées au propriétaire, et la décision que vous attendez de lui.
L'onglet « Résumé » compte les jours travaillés, les jours de pluie, l'effectif moyen, les jours avec un problème et les jours sans photo envoyée.
Dans ce tableau, n'écrivez ni le nom complet ni le numéro d'un ouvrier.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$journal-de-chantier.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1FDZ5PO8PAzQZ_8LJf08uFZcy59he38VsfQWgzJP9m68/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-suivi-depenses-chantier$t$, $t$document$t$, $t$Suivi des dépenses du chantier$t$, $t$Ce tableau suit l'argent du chantier : chaque dépense, ce qui est payé et ce qui reste dû, le budget de chaque lot, les fonds reçus du propriétaire et ce qu'il reste en caisse.$t$, null, $t$Dans l'onglet « Dépenses », une ligne par achat ou par paiement de main-d'œuvre : le lot, la quantité, le prix à l'unité et ce qui est déjà payé. Le montant et le reste à payer se calculent seuls.
Dans l'onglet « Fonds reçus », une ligne par somme reçue du propriétaire, avec la date et le moyen de paiement.
Dans l'onglet « Budget », vous écrivez le budget prévu de chaque lot. Le tableau donne le dépensé, l'écart, le total reçu, le total payé et ce qu'il reste en caisse.
Ce tableau n'est pas une comptabilité. Gardez chaque reçu et chaque capture de paiement.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$suivi-des-depenses-du-chantier.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1m0B3wDN9tGJtqchCFsx2lAOk8bTOJHoNKDM4IVlCvuk/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-compte-rendu-chantier$t$, $t$document$t$, $t$Compte rendu de chantier$t$, $t$Ce document de deux pages au plus rend compte d'une semaine de chantier au propriétaire : les travaux faits, l'avancement par lot, les retards, les dépenses et les décisions attendues. Il se remplit sur le téléphone et s'envoie en PDF.$t$, null, $t$Il contient : le chantier et la semaine, les travaux faits, l'avancement lot par lot, les retards et leurs raisons, les dépenses de la semaine, ce qui est prévu ensuite, les décisions attendues du propriétaire et la liste des photos jointes.
Il dit seulement ce que vous avez constaté. Il ne porte aucun avis sur la solidité d'un ouvrage : c'est le rôle de l'ingénieur ou du bureau de contrôle.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$compte-rendu-de-chantier.docx$t$, $t$https://docs.google.com/document/d/1FtCToR-maIkeoA6s9C6To990G2uB2RWAukSilW8FupA/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-semaine-chantier-lundi$t$, $t$routine$t$, $t$Semaine du chantier, le lundi$t$, $t$Chaque lundi, l'IA vous rappelle de préparer la semaine du chantier. Elle ne connaît pas seule votre chantier : vous collez les travaux prévus, l'effectif et le stock, puis elle propose le plan de la semaine et les commandes à passer.$t$, null, $t$Chaque lundi à 6 h 30, envoyez-moi ce message : « Bonjour. C'est lundi, préparons la semaine du chantier. Collez ici les travaux prévus cette semaine, l'effectif, les matériaux en stock et les livraisons attendues. Ajoutez la météo annoncée si vous la connaissez. »

Quand j'aurai collé mes notes :
1. Proposez le plan jour par jour : travaux, équipe, matériel.
2. Listez les commandes à passer, avec le jour limite pour ne pas arrêter le chantier.
3. Signalez ce qui peut bloquer la semaine : pluie, livraison, paiement, décision du propriétaire, contrôle à faire.
4. Rédigez le message du matin pour l'équipe, en 4 lignes.

Règles : partez seulement de mes notes. N'inventez ni quantité, ni prix, ni délai technique. Si une information manque, demandez-la.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mon chantier »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Mon chantier ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mon chantier »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant de chantier »."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-compte-rendu-chantier-samedi$t$, $t$routine$t$, $t$Compte rendu au propriétaire, le samedi$t$, $t$Chaque samedi, l'IA vous rappelle de préparer le compte rendu pour le propriétaire. Vous collez vos notes du journal de chantier et vos dépenses, puis elle rédige le compte rendu et le message d'envoi.$t$, null, $t$Chaque samedi à 15 h, envoyez-moi ce message : « Bonjour. C'est samedi, préparons le compte rendu de la semaine pour le propriétaire. Collez ici vos notes du journal de chantier : travaux faits, retards, dépenses de la semaine, photos prises, décisions à prendre. »

Quand j'aurai collé mes notes :
1. Rédigez le compte rendu : fait cette semaine, en retard et pourquoi, prévu la semaine prochaine.
2. Donnez le total des dépenses de la semaine, et ce qu'il reste en caisse si j'ai donné les fonds reçus. Montrez chaque calcul.
3. Listez les décisions attendues du propriétaire, avec la date limite de chacune.
4. Rédigez le message d'envoi sur WhatsApp, avec une salutation et la liste des photos à joindre.

Règles : ne dites rien que je n'ai pas noté. Ne jugez pas la qualité d'un ouvrage. N'inventez aucun montant. Si un chiffre manque, écrivez « à préciser ».$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mon chantier »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Mon chantier ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mon chantier »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant de chantier »."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

-- 6. Le kit : présentation, étapes d'installation, encadrés « À savoir », mots expliqués
insert into kits (metier_id, titre, presentation, etapes, prerequis, limites, a_savoir, mots, revu_le) select m.id, $t$BTP / Gestion de chantier$t$, $t$Tout ce qu'il faut pour chiffrer des travaux, commander au bon moment, suivre l'avancement, tenir les dépenses et rendre compte au propriétaire, avec une IA gratuite, sur un téléphone Android : une configuration, quatre skills, quatre documents, deux routines et dix-neuf tâches.$t$, $j$[{"numero": 1, "titre": "Configurer mon IA avec « Assistant de chantier »", "minutes": 5}, {"numero": 2, "titre": "Installer mes 3 premières skills : compte rendu de chantier, devis quantitatif, planning de chantier", "minutes": 10}, {"numero": 3, "titre": "Copier mes documents : devis quantitatif et estimatif, journal de chantier, suivi des dépenses du chantier", "minutes": 5}]$j$::jsonb, $j$["Un téléphone Android avec une connexion, même limitée.", "WhatsApp, pour envoyer les photos et les comptes rendus au propriétaire.", "Un compte Google et les applications gratuites Google Sheets et Google Docs, pour ouvrir les documents.", "Une IA gratuite au choix : ChatGPT, Claude ou Gemini."]$j$::jsonb, $j$["Il ne remplace ni l'ingénieur, ni l'architecte, ni le bureau de contrôle. Une IA ne valide pas une structure, un dosage de béton ou une règle de sécurité.", "Il ne donne aucun conseil juridique ou fiscal. Pour un contrat, un permis ou une facture officielle, adressez-vous au professionnel compétent.", "Il ne fixe ni vos prix ni vos quantités : l'IA calcule avec vos chiffres, elle n'en invente pas.", "Il ne vous demande jamais de coller dans une IA le nom complet, le numéro ou l'adresse d'une personne.", "Il ne promet aucun résultat chiffré."]$j$::jsonb, $j${"chatgpt": "OpenAI retire les GPT personnalisés le 11 décembre 2026 et les remplace par les plugins. Ce kit n'utilise donc aucun GPT personnalisé : votre configuration se colle dans un projet, et chaque skill s'ajoute dans la rubrique Plugins, onglet Skills, ou se colle au début de la conversation. Si vous avez déjà vos propres GPT, pensez à les convertir en plugins avant cette date.", "gemini": "Google remplace les Gems par les skills en novembre 2026. Vos Gems seront convertis automatiquement. Les étapes de ce kit seront mises à jour à ce moment-là, et vous serez prévenu dans l'application."}$j$::jsonb, $j$[{"mot": "Configuration", "phrase": "Un texte d'instructions que l'IA garde en mémoire, pour ne pas tout réexpliquer à chaque conversation."}, {"mot": "Projet", "phrase": "Un dossier de conversations qui partagent les mêmes instructions."}, {"mot": "Skill", "phrase": "Une consigne enregistrée que l'IA applique quand le sujet s'y prête."}, {"mot": "Consigne, ou prompt", "phrase": "Le texte que l'on écrit à l'IA pour lui demander un travail."}, {"mot": "Modèle à remplir", "phrase": "Une consigne déjà rédigée, où il ne reste qu'à remplir quelques champs."}, {"mot": "Champ", "phrase": "Une case du formulaire, à remplir avec vos propres informations."}, {"mot": "Routine", "phrase": "Une demande qui revient à jour fixe."}, {"mot": "Tâche planifiée", "phrase": "Une demande que l'IA lance seule, au jour choisi."}, {"mot": "Lot", "phrase": "Une partie des travaux confiée à un même corps de métier : fondations, murs, toiture, électricité."}, {"mot": "Devis quantitatif et estimatif", "phrase": "Le devis qui liste chaque ouvrage avec sa quantité, son prix à l'unité et son montant."}, {"mot": "Métré", "phrase": "Le relevé des quantités d'un ouvrage, fait à partir des plans ou sur place."}, {"mot": "Planning", "phrase": "Le calendrier des travaux : ce qui se fait, dans quel ordre, et quand."}, {"mot": "Journal de chantier", "phrase": "Le cahier où l'on note chaque jour ce qui s'est passé sur le chantier."}, {"mot": "Compte rendu", "phrase": "Le résumé écrit d'une période ou d'une réunion, avec les décisions et les actions."}, {"mot": "Tranche", "phrase": "Une partie du prix, payée à une étape convenue des travaux."}, {"mot": "Imprévus", "phrase": "La somme gardée en réserve pour les dépenses que le devis n'avait pas prévues."}, {"mot": "Bureau de contrôle", "phrase": "L'organisme qui vérifie qu'un ouvrage respecte les règles de construction."}, {"mot": "Approvisionnement", "phrase": "Le fait de commander et de recevoir à temps ce dont on a besoin."}, {"mot": "Stock de sécurité", "phrase": "La quantité que l'on garde en réserve pour ne pas tomber en rupture."}, {"mot": "Index", "phrase": "La liste de vos documents, avec l'endroit où chacun est rangé."}, {"mot": "Tournée", "phrase": "La suite des arrêts d'une même sortie : livraisons, visites, rendez-vous."}, {"mot": "Gem", "phrase": "Un assistant Gemini enregistré avec ses propres instructions, que l'on rouvre d'un geste."}, {"mot": "Plugin", "phrase": "Un ajout que l'on installe dans ChatGPT et qui contient des consignes prêtes à servir ; il remplace le GPT personnalisé."}]$j$::jsonb, '2026-10-04' from metiers m
  where m.slug = $t$btp-gestion-de-chantier$t$
  on conflict (metier_id) do update set titre = excluded.titre, presentation = excluded.presentation, etapes = excluded.etapes, prerequis = excluded.prerequis, limites = excluded.limites, a_savoir = excluded.a_savoir, mots = excluded.mots, revu_le = excluded.revu_le;

-- 7. Les ressources du kit, dans l'ordre, avec leur étape d'installation
insert into kits_metier (metier_id, ressource_id, ordre, etape_installation) select m.id, r.id, v.ordre, v.etape
  from metiers m, ressources r,
  (values
    ($t$config-chantier-chatgpt$t$, 1, 1),
    ($t$config-chantier-claude$t$, 2, 1),
    ($t$config-chantier-gemini$t$, 3, 1),
    ($t$skill-compte-rendu-chantier$t$, 4, 2),
    ($t$skill-devis-quantitatif$t$, 5, 2),
    ($t$skill-planning-chantier$t$, 6, 2),
    ($t$doc-devis-quantitatif$t$, 7, 3),
    ($t$doc-journal-chantier$t$, 8, 3),
    ($t$doc-suivi-depenses-chantier$t$, 9, 3),
    ($t$skill-risques-chantier$t$, 10, null::integer),
    ($t$doc-compte-rendu-chantier$t$, 11, null::integer),
    ($t$routine-semaine-chantier-lundi$t$, 12, null::integer),
    ($t$routine-compte-rendu-chantier-samedi$t$, 13, null::integer)
  ) as v(cle, ordre, etape)
  where m.slug = $t$btp-gestion-de-chantier$t$ and r.cle = v.cle
  on conflict (metier_id, ressource_id) do update set ordre = excluded.ordre, etape_installation = excluded.etape_installation;

-- 8. Quelles ressources servent à quelles tâches
insert into ressources_taches (ressource_id, tache_id) select r.id, t.id
  from ressources r, taches t,
  (values
    ($t$doc-journal-chantier$t$, $t$F12$t$),
    ($t$config-chantier-chatgpt$t$, $t$F12$t$),
    ($t$config-chantier-claude$t$, $t$F12$t$),
    ($t$config-chantier-gemini$t$, $t$F12$t$),
    ($t$doc-suivi-depenses-chantier$t$, $t$F23$t$),
    ($t$doc-devis-quantitatif$t$, $t$F23$t$),
    ($t$routine-semaine-chantier-lundi$t$, $t$F23$t$),
    ($t$config-chantier-chatgpt$t$, $t$F23$t$),
    ($t$config-chantier-claude$t$, $t$F23$t$),
    ($t$config-chantier-gemini$t$, $t$F23$t$),
    ($t$skill-planning-chantier$t$, $t$F24$t$),
    ($t$config-chantier-chatgpt$t$, $t$F24$t$),
    ($t$config-chantier-claude$t$, $t$F24$t$),
    ($t$config-chantier-gemini$t$, $t$F24$t$),
    ($t$skill-devis-quantitatif$t$, $t$F31$t$),
    ($t$doc-devis-quantitatif$t$, $t$F31$t$),
    ($t$config-chantier-chatgpt$t$, $t$F31$t$),
    ($t$config-chantier-claude$t$, $t$F31$t$),
    ($t$config-chantier-gemini$t$, $t$F31$t$),
    ($t$skill-compte-rendu-chantier$t$, $t$F32$t$),
    ($t$doc-journal-chantier$t$, $t$F32$t$),
    ($t$doc-compte-rendu-chantier$t$, $t$F32$t$),
    ($t$routine-compte-rendu-chantier-samedi$t$, $t$F32$t$),
    ($t$config-chantier-chatgpt$t$, $t$F32$t$),
    ($t$config-chantier-claude$t$, $t$F32$t$),
    ($t$config-chantier-gemini$t$, $t$F32$t$),
    ($t$skill-risques-chantier$t$, $t$F33$t$),
    ($t$doc-journal-chantier$t$, $t$F33$t$),
    ($t$config-chantier-chatgpt$t$, $t$F33$t$),
    ($t$config-chantier-claude$t$, $t$F33$t$),
    ($t$config-chantier-gemini$t$, $t$F33$t$),
    ($t$config-chantier-chatgpt$t$, $t$F01$t$),
    ($t$config-chantier-claude$t$, $t$F01$t$),
    ($t$config-chantier-gemini$t$, $t$F01$t$),
    ($t$config-chantier-chatgpt$t$, $t$F03$t$),
    ($t$config-chantier-claude$t$, $t$F03$t$),
    ($t$config-chantier-gemini$t$, $t$F03$t$),
    ($t$doc-compte-rendu-chantier$t$, $t$F03$t$),
    ($t$config-chantier-chatgpt$t$, $t$F04$t$),
    ($t$config-chantier-claude$t$, $t$F04$t$),
    ($t$config-chantier-gemini$t$, $t$F04$t$),
    ($t$skill-compte-rendu-chantier$t$, $t$F04$t$),
    ($t$doc-compte-rendu-chantier$t$, $t$F04$t$),
    ($t$config-chantier-chatgpt$t$, $t$F05$t$),
    ($t$config-chantier-claude$t$, $t$F05$t$),
    ($t$config-chantier-gemini$t$, $t$F05$t$),
    ($t$skill-planning-chantier$t$, $t$F05$t$),
    ($t$routine-semaine-chantier-lundi$t$, $t$F05$t$),
    ($t$config-chantier-chatgpt$t$, $t$F07$t$),
    ($t$config-chantier-claude$t$, $t$F07$t$),
    ($t$config-chantier-gemini$t$, $t$F07$t$),
    ($t$config-chantier-chatgpt$t$, $t$F08$t$),
    ($t$config-chantier-claude$t$, $t$F08$t$),
    ($t$config-chantier-gemini$t$, $t$F08$t$),
    ($t$doc-suivi-depenses-chantier$t$, $t$F08$t$),
    ($t$config-chantier-chatgpt$t$, $t$F11$t$),
    ($t$config-chantier-claude$t$, $t$F11$t$),
    ($t$config-chantier-gemini$t$, $t$F11$t$),
    ($t$doc-suivi-depenses-chantier$t$, $t$F11$t$),
    ($t$config-chantier-chatgpt$t$, $t$F13$t$),
    ($t$config-chantier-claude$t$, $t$F13$t$),
    ($t$config-chantier-gemini$t$, $t$F13$t$),
    ($t$doc-devis-quantitatif$t$, $t$F13$t$),
    ($t$config-chantier-chatgpt$t$, $t$F14$t$),
    ($t$config-chantier-claude$t$, $t$F14$t$),
    ($t$config-chantier-gemini$t$, $t$F14$t$),
    ($t$config-chantier-chatgpt$t$, $t$F15$t$),
    ($t$config-chantier-claude$t$, $t$F15$t$),
    ($t$config-chantier-gemini$t$, $t$F15$t$),
    ($t$config-chantier-chatgpt$t$, $t$F16$t$),
    ($t$config-chantier-claude$t$, $t$F16$t$),
    ($t$config-chantier-gemini$t$, $t$F16$t$),
    ($t$skill-planning-chantier$t$, $t$F16$t$),
    ($t$doc-journal-chantier$t$, $t$F16$t$),
    ($t$routine-semaine-chantier-lundi$t$, $t$F16$t$),
    ($t$config-chantier-chatgpt$t$, $t$F18$t$),
    ($t$config-chantier-claude$t$, $t$F18$t$),
    ($t$config-chantier-gemini$t$, $t$F18$t$),
    ($t$skill-devis-quantitatif$t$, $t$F18$t$),
    ($t$doc-devis-quantitatif$t$, $t$F18$t$),
    ($t$config-chantier-chatgpt$t$, $t$F22$t$),
    ($t$config-chantier-claude$t$, $t$F22$t$),
    ($t$config-chantier-gemini$t$, $t$F22$t$),
    ($t$doc-suivi-depenses-chantier$t$, $t$F22$t$),
    ($t$routine-semaine-chantier-lundi$t$, $t$F22$t$)
  ) as v(cle, code)
  where r.cle = v.cle and t.code = v.code
  on conflict (ressource_id, tache_id) do nothing;

-- 9. Contrôle final : si quelque chose manque, tout est annulé.
do $controle$
declare
  n integer;
begin
  if not exists (select 1 from metiers where slug = $t$btp-gestion-de-chantier$t$ and description_local is not null) then
    raise exception 'Métier introuvable : btp-gestion-de-chantier';
  end if;
  select count(*) into n from (values
    ($t$F12$t$, $t$Classement et indexation de documents$t$),
    ($t$F23$t$, $t$Prévision de la demande et préparation des approvisionnements$t$),
    ($t$F24$t$, $t$Planification d'itinéraires et estimation des délais$t$),
    ($t$F31$t$, $t$Repérage et comptage d'éléments sur un plan$t$),
    ($t$F32$t$, $t$Suivi de l'avancement visible d'un chantier$t$),
    ($t$F33$t$, $t$Hiérarchisation des points de risque d'un chantier$t$)
  ) as v(code, titre) join taches t on t.code = v.code and t.titre = v.titre and t.resultat is not null;
  if n <> 6 then
    raise exception 'Tâches attendues : 6, trouvées avec le bon titre : %', n;
  end if;
  select count(*) into n from exercices e join taches t on t.id = e.tache_id
    where t.code in ($t$F12$t$, $t$F23$t$, $t$F24$t$, $t$F31$t$, $t$F32$t$, $t$F33$t$) and e.titre_local is not null and e.prenom is not null;
  if n <> 12 then
    raise exception 'Cas localisés attendus : 12, trouvés : %', n;
  end if;
  -- Chaque tâche du kit, neuve ou déjà écrite, a son modèle et ses deux cas localisés.
  select count(*) into n from taches t where t.code in ($t$F12$t$, $t$F23$t$, $t$F24$t$, $t$F31$t$, $t$F32$t$, $t$F33$t$, $t$F01$t$, $t$F03$t$, $t$F04$t$, $t$F05$t$, $t$F07$t$, $t$F08$t$, $t$F11$t$, $t$F13$t$, $t$F14$t$, $t$F15$t$, $t$F16$t$, $t$F18$t$, $t$F22$t$)
    and exists (select 1 from modeles_prompts mp where mp.tache_id = t.id)
    and (select count(*) from exercices e where e.tache_id = t.id and e.titre_local is not null) = 2;
  if n <> 19 then
    raise exception 'Tâches complètes attendues : 19, trouvées : %', n;
  end if;
  select count(*) into n from kits_metier km join metiers m on m.id = km.metier_id where m.slug = $t$btp-gestion-de-chantier$t$;
  if n <> 13 then
    raise exception 'Ressources du kit attendues : 13, trouvées : %', n;
  end if;
  -- Toutes les tâches du métier sont dans le kit, et aucune autre.
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id join taches t on t.id = mt.tache_id
    where m.slug = $t$btp-gestion-de-chantier$t$ and t.code in ($t$F12$t$, $t$F23$t$, $t$F24$t$, $t$F31$t$, $t$F32$t$, $t$F33$t$, $t$F01$t$, $t$F03$t$, $t$F04$t$, $t$F05$t$, $t$F07$t$, $t$F08$t$, $t$F11$t$, $t$F13$t$, $t$F14$t$, $t$F15$t$, $t$F16$t$, $t$F18$t$, $t$F22$t$);
  if n <> 19 then
    raise exception 'Tâches du métier attendues : 19, trouvées : %', n;
  end if;
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id where m.slug = $t$btp-gestion-de-chantier$t$;
  if n <> 19 then
    raise exception 'Le métier a % tâches, le kit en couvre 19', n;
  end if;
  -- Chaque tâche du métier a au moins une ressource de ce kit.
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id
    where m.slug = $t$btp-gestion-de-chantier$t$ and not exists (
      select 1 from ressources_taches rt join kits_metier km on km.ressource_id = rt.ressource_id
      where rt.tache_id = mt.tache_id and km.metier_id = m.id);
  if n <> 0 then
    raise exception 'Tâches du métier sans ressource du kit : %', n;
  end if;
end
$controle$;

commit;
