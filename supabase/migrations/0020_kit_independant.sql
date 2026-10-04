-- 0020 : contenu du kit « Indépendant et prestataire de services » (4 octobre 2026)
--
-- Ce fichier est fabriqué par un programme à partir du fichier source du kit :
-- les textes en sont copiés tels quels. Il ajoute :
--   - le métier « Indépendant et prestataire de services » ;
--   - 6 tâches (F51 à F56), avec leur résultat et leurs étapes ;
--   - 12 cas pratiques, deux par tâche ;
--   - 6 modèles à remplir, leurs champs, leurs exemples et la note par IA ;
--   - 13 ressources : 3 configurations, 4 skills, 4 documents, 2 routines ;
--   - le kit : ses 3 étapes d'installation et le rattachement des ressources.
--
-- À exécuter APRÈS 0018_kits_metier.sql. Aucune donnée existante n'est
-- modifiée ni supprimée. Migration rejouable : une seconde exécution remet
-- les mêmes textes, sans doublon. Tout se fait dans une transaction : en cas
-- d'erreur, rien n'est modifié.
--
-- Les liens « Faire une copie » pointent pour le moment vers le Drive de
-- travail. Ils seront remplacés, par une nouvelle migration, quand les
-- documents seront copiés dans le Drive de Parlons ADS.

begin;

-- 1. Le métier
insert into metiers (slug, nom, description, ordre) values ($t$independant-prestataire-de-services$t$, $t$Indépendant et prestataire de services$t$, $t$Pour toute personne qui vend son savoir-faire : graphiste, consultant, formateur, couturier, photographe, artisan.$t$, 14)
  on conflict (slug) do update set nom = excluded.nom, description = excluded.description;

-- 2. Les tâches, leur résultat et leurs étapes
insert into taches (code, titre, limite_connue) select $t$F51$t$, $t$Rédiger un devis clair et une facture simple$t$, false
  where not exists (select 1 from taches where code = $t$F51$t$);
update taches set titre = $t$Rédiger un devis clair et une facture simple$t$, resultat = $t$Un devis ligne par ligne, avec le total, l'acompte et le reste à payer, et le message qui l'accompagne. Un devis est le prix écrit d'une prestation, donné au client avant de commencer. L'acompte est la partie du prix que le client paie à la commande.$t$, etapes = $j$["Lister les prestations demandées, avec la quantité et votre prix à l'unité.", "Remplir le modèle et copier la consigne dans son IA.", "Saisir les mêmes lignes dans le document « Devis et facture simple » et comparer les totaux. En cas d'écart, le tableau fait foi.", "Envoyer le devis en PDF sur WhatsApp, puis noter la commande dans le tableau de suivi.", "À la fin du travail, ouvrir l'onglet « Facture » du même document et y noter ce qui a été payé."]$j$::jsonb, precisions = $t$Ce modèle ne produit pas une facture normalisée. Dans plusieurs pays, dont le Bénin, la Côte d'Ivoire, le Niger et le Burkina Faso, la facture officielle passe par un dispositif de l'État. Pour une facture officielle, adressez-vous à votre comptable.$t$
  where code = $t$F51$t$;
insert into metiers_taches (metier_id, tache_id, ordre) select m.id, t.id, 1 from metiers m, taches t
  where m.slug = $t$independant-prestataire-de-services$t$ and t.code = $t$F51$t$
  on conflict (metier_id, tache_id) do update set ordre = excluded.ordre;

insert into taches (code, titre, limite_connue) select $t$F52$t$, $t$Présenter son offre en 30 secondes (texte et message vocal)$t$, false
  where not exists (select 1 from taches where code = $t$F52$t$);
update taches set titre = $t$Présenter son offre en 30 secondes (texte et message vocal)$t$, resultat = $t$Votre présentation en trois formats : un texte court pour WhatsApp, le script d'une note vocale de 30 secondes et une phrase pour votre statut. Une note vocale est un message audio que l'on enregistre et que l'on envoie sur WhatsApp.$t$, etapes = $j$["Noter en une ligne ce que vous faites, pour qui, et ce qui vous distingue vraiment.", "Remplir le modèle et copier la consigne dans son IA.", "Retirer tout ce qui n'est pas vrai, puis adapter les mots à votre façon de parler.", "Lire le script à voix haute, montre en main, puis enregistrer la note vocale.", "Enregistrer le texte comme réponse rapide dans WhatsApp Business, pour l'envoyer à chaque nouveau contact."]$j$::jsonb, precisions = null
  where code = $t$F52$t$;
insert into metiers_taches (metier_id, tache_id, ordre) select m.id, t.id, 2 from metiers m, taches t
  where m.slug = $t$independant-prestataire-de-services$t$ and t.code = $t$F52$t$
  on conflict (metier_id, tache_id) do update set ordre = excluded.ordre;

insert into taches (code, titre, limite_connue) select $t$F53$t$, $t$Préparer une réponse à un appel d'offres ou à une demande de prestation$t$, false
  where not exists (select 1 from taches where code = $t$F53$t$);
update taches set titre = $t$Préparer une réponse à un appel d'offres ou à une demande de prestation$t$, resultat = $t$Une réponse complète et ordonnée : ce que le client demande, ce que vous proposez, le délai, le prix, les pièces à joindre et le message d'envoi. Un appel d'offres est une demande écrite d'une entreprise, d'une ONG ou d'une administration, qui compare plusieurs prestataires avant de choisir.$t$, etapes = $j$["Lire la demande en entier et noter la date limite et les pièces demandées.", "Remplir le modèle avec la demande mot pour mot, sans nom ni numéro.", "Répondre d'abord aux points flous que l'IA signale : mieux vaut poser la question au client que deviner.", "Rédiger le prix avec le modèle de la tâche F51.", "Rassembler les pièces, relire, puis envoyer avant la date limite."]$j$::jsonb, precisions = null
  where code = $t$F53$t$;
insert into metiers_taches (metier_id, tache_id, ordre) select m.id, t.id, 3 from metiers m, taches t
  where m.slug = $t$independant-prestataire-de-services$t$ and t.code = $t$F53$t$
  on conflict (metier_id, tache_id) do update set ordre = excluded.ordre;

insert into taches (code, titre, limite_connue) select $t$F54$t$, $t$Planifier sa semaine et ses livraisons$t$, false
  where not exists (select 1 from taches where code = $t$F54$t$);
update taches set titre = $t$Planifier sa semaine et ses livraisons$t$, resultat = $t$Un planning jour par jour, le total des heures de chaque jour, les commandes qui risquent d'être en retard et le message qui prévient le client. Une échéance est la date à laquelle un travail doit être rendu.$t$, etapes = $j$["Lister les commandes en cours, avec l'échéance et la durée estimée de chacune.", "Remplir le modèle et copier la consigne dans son IA.", "Saisir le planning dans le document « Planning de la semaine » et vérifier le total des heures de chaque jour.", "Prévenir tout de suite le client d'une commande qui sera en retard, avec une nouvelle date.", "Le lundi suivant, lancer la routine « Planning du lundi »."]$j$::jsonb, precisions = null
  where code = $t$F54$t$;
insert into metiers_taches (metier_id, tache_id, ordre) select m.id, t.id, 4 from metiers m, taches t
  where m.slug = $t$independant-prestataire-de-services$t$ and t.code = $t$F54$t$
  on conflict (metier_id, tache_id) do update set ordre = excluded.ordre;

insert into taches (code, titre, limite_connue) select $t$F55$t$, $t$Construire un portfolio ou une page de présentation$t$, false
  where not exists (select 1 from taches where code = $t$F55$t$);
update taches set titre = $t$Construire un portfolio ou une page de présentation$t$, resultat = $t$Le texte complet de votre page de présentation : une accroche, qui vous êtes, vos prestations, trois réalisations, les étapes pour travailler avec vous et vos coordonnées. Un portfolio est un choix de vos meilleures réalisations, montré à un futur client.$t$, etapes = $j$["Choisir trois réalisations vraies, avec une photo de chacune, et demander l'accord du client pour la montrer.", "Remplir le modèle et copier la consigne dans son IA.", "Retirer tout ce qui n'est pas vrai, puis coller le texte dans le document « Page de présentation ».", "Ajouter vos photos, enregistrer la page en PDF et l'envoyer sur WhatsApp.", "Mettre la page à jour à chaque nouvelle réalisation qui compte."]$j$::jsonb, precisions = null
  where code = $t$F55$t$;
insert into metiers_taches (metier_id, tache_id, ordre) select m.id, t.id, 5 from metiers m, taches t
  where m.slug = $t$independant-prestataire-de-services$t$ and t.code = $t$F55$t$
  on conflict (metier_id, tache_id) do update set ordre = excluded.ordre;

insert into taches (code, titre, limite_connue) select $t$F56$t$, $t$Gérer un client difficile par écrit$t$, false
  where not exists (select 1 from taches where code = $t$F56$t$);
update taches set titre = $t$Gérer un client difficile par écrit$t$, resultat = $t$Trois réponses au choix à un client mécontent (apaiser, proposer une solution, poser une limite), et la phrase qui confirme par écrit ce qui est décidé.$t$, etapes = $j$["Relire ce qui était convenu : le prix, le délai, le nombre de modifications. Le devis et le tableau de suivi servent à cela.", "Attendre d'être calme avant de répondre : un message écrit sous la colère ne s'efface pas.", "Remplir le modèle avec les faits et le message du client, sans son nom.", "Choisir une des trois réponses, l'adapter à votre façon de parler, puis l'envoyer en privé.", "Noter dans le tableau de suivi ce qui a été décidé, avec la date."]$j$::jsonb, precisions = null
  where code = $t$F56$t$;
insert into metiers_taches (metier_id, tache_id, ordre) select m.id, t.id, 6 from metiers m, taches t
  where m.slug = $t$independant-prestataire-de-services$t$ and t.code = $t$F56$t$
  on conflict (metier_id, tache_id) do update set ordre = excluded.ordre;

-- 3. Les cas pratiques : deux par tâche
insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 1, '', '', '' from taches t
  where t.code = $t$F51$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 1);
update exercices set titre = $t$Assistante commerciale d'une imprimerie à Abidjan$t$, contexte = $t$Vous êtes assistante commerciale chez Riviera Print, une imprimerie et un studio graphique de 9 personnes, à Cocody. Le gérant d'un restaurant vous écrit sur WhatsApp Business : il ouvre dans trois semaines et veut son identité visuelle.$t$, donnees = $t$- Création d'un logo : 80 000 FCFA.
- Impression de 100 cartes de visite : 10 000 FCFA.
- Deux visuels pour les réseaux sociaux : 8 000 FCFA le visuel.
- Acompte demandé à la commande : 50 %. Le solde se paie à la livraison.
- Délai : 7 jours après l'acompte. Paiement par Orange Money, par Wave ou par virement.
- Le devis est valable 15 jours.$t$, travail_a_faire = $t$Rédigez le devis, avec le total, l'acompte et le reste à payer, puis le message d'envoi au gérant.$t$, prenom = $t$Christelle$t$, lieu = $t$Abidjan, Côte d'Ivoire$t$, profil = $t$Structure, 9 personnes$t$, reponse_attendue = $t$Total 106 000 FCFA, soit 80 000 + 10 000 + 16 000 ; acompte 53 000 FCFA ; reste à payer 53 000 FCFA.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F51$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 2, '', '', '' from taches t
  where t.code = $t$F51$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 2);
update exercices set titre = $t$Photographe de mariage à Cotonou$t$, contexte = $t$Vous êtes photographe à votre compte, à Fidjrossè. Une future mariée vous écrit sur WhatsApp : elle veut les photos et la vidéo de son mariage, et une séance photo avant la cérémonie.$t$, donnees = $t$- Photo et vidéo du mariage : 250 000 FCFA.
- Séance photo avant le mariage : 20 000 FCFA.
- Acompte demandé à la réservation : 30 %. Le solde se paie le jour du mariage.
- Livraison des photos et de la vidéo : 15 jours après le mariage.
- Paiement par MTN MoMo ou en espèces. Le devis est valable 10 jours.$t$, travail_a_faire = $t$Rédigez le devis, avec le total, l'acompte et le reste à payer, puis le message d'envoi à la cliente.$t$, prenom = $t$Rodrigue$t$, lieu = $t$Cotonou, Bénin$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = $t$Total 270 000 FCFA ; acompte 81 000 FCFA ; reste à payer 189 000 FCFA.$t$
  where numero = 2 and tache_id in (select id from taches where code = $t$F51$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 1, '', '', '' from taches t
  where t.code = $t$F52$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 1);
update exercices set titre = $t$Chargée de clientèle d'un cabinet de formation à Dakar$t$, contexte = $t$Vous êtes chargée de clientèle chez Jëf Conseil, un cabinet de formation de 6 personnes, au Plateau. Le cabinet lance une formation pour les équipes de vente et vous devez la présenter aux gérants de PME que vous appelez cette semaine.$t$, donnees = $t$- La formation s'appelle « Mieux vendre au téléphone et sur WhatsApp ».
- Elle dure une journée, dans les locaux du client, pour un groupe de 5 à 12 personnes.
- Elle s'adresse aux vendeurs et aux commerciaux des PME.
- Le prix se donne sur devis, selon la taille du groupe.
- On joint le cabinet sur WhatsApp ou par e-mail.$t$, travail_a_faire = $t$Préparez le texte court, le script de la note vocale et la phrase de statut. Ne citez aucun client et aucun chiffre de résultat.$t$, prenom = $t$Khady$t$, lieu = $t$Dakar, Sénégal$t$, profil = $t$Structure, 6 personnes$t$, reponse_attendue = null
  where numero = 1 and tache_id in (select id from taches where code = $t$F52$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 2, '', '', '' from taches t
  where t.code = $t$F52$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 2);
update exercices set titre = $t$Menuisier à Lomé$t$, contexte = $t$Vous êtes menuisier à Agoè, avec un apprenti. Vous fabriquez des meubles sur mesure, et vos clients arrivent presque tous par le bouche-à-oreille. Vous voulez une présentation à envoyer à chaque personne qui vous écrit pour la première fois.$t$, donnees = $t$- Vous fabriquez des lits, des armoires et des tables sur mesure, en bois massif.
- Vous prenez les mesures chez le client et vous livrez dans Lomé.
- Délai habituel : deux semaines après l'avance.
- Paiement par Mixx by Yas, par Flooz ou en espèces, avec une avance à la commande.
- Vous avez les photos d'une armoire à trois portes livrée le mois dernier.$t$, travail_a_faire = $t$Préparez le texte court, le script de la note vocale et la phrase de statut. La réalisation citée doit être celle des photos, sans le nom du client.$t$, prenom = $t$Kossi$t$, lieu = $t$Lomé, Togo$t$, profil = $t$Individuelle, 2 personnes$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F52$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 1, '', '', '' from taches t
  where t.code = $t$F53$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 1);
update exercices set titre = $t$Chargé d'affaires d'une entreprise de services à Ouagadougou$t$, contexte = $t$Vous êtes chargé d'affaires chez Wend-Panga Services, une entreprise d'entretien et de petits travaux de 14 personnes. Une ONG vous envoie par e-mail une demande d'offre pour l'entretien de ses bureaux.$t$, donnees = $t$- La demande porte sur 12 mois, avec trois passages par semaine.
- La réponse doit arriver par e-mail avant vendredi, 12 h.
- Pièces demandées : la présentation de l'entreprise, une offre technique, une offre financière, le RCCM et l'IFU.
- L'offre financière est préparée par le gérant : vous ne citez aucun montant.
- La demande ne dit ni la surface des bureaux, ni les horaires possibles pour les passages.$t$, travail_a_faire = $t$Préparez la réponse sans le prix, la liste des pièces à joindre et l'e-mail d'envoi. Listez aussi les questions à poser à l'ONG avant de chiffrer.$t$, prenom = $t$Issouf$t$, lieu = $t$Ouagadougou, Burkina Faso$t$, profil = $t$Structure, 14 personnes$t$, reponse_attendue = null
  where numero = 1 and tache_id in (select id from taches where code = $t$F53$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 2, '', '', '' from taches t
  where t.code = $t$F53$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 2);
update exercices set titre = $t$Formatrice en bureautique à Niamey$t$, contexte = $t$Vous êtes formatrice à votre compte, à Niamey. Vous formez à Word et à Excel. La directrice d'un collège privé vous écrit sur WhatsApp après avoir eu votre contact par une collègue.$t$, donnees = $t$- Sa demande : « Bonjour Madame. Nous voulons former nos 8 secrétaires et surveillants à Excel avant la rentrée. Envoyez-nous votre proposition et votre prix. »
- Vous proposez deux journées dans les locaux du collège, avec des exercices sur les listes d'élèves et les notes.
- Vous connaissez votre tarif à la journée : il n'est pas donné ici.
- Le collège n'a pas dit combien d'ordinateurs sont disponibles.
- Paiement par Airtel Money ou en espèces, avec un acompte à la réservation.$t$, travail_a_faire = $t$Préparez la réponse à envoyer sur WhatsApp, avec la ligne du prix à remplir, et les questions à poser avant de confirmer.$t$, prenom = $t$Hadiza$t$, lieu = $t$Niamey, Niger$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F53$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 1, '', '', '' from taches t
  where t.code = $t$F54$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 1);
update exercices set titre = $t$Cheffe d'atelier dans un atelier de couture à Cotonou$t$, contexte = $t$Vous êtes cheffe d'atelier chez Atelier Sèmako Couture, 8 personnes, à Gbégamey. Les fêtes de fin d'année approchent et le carnet de commandes est plein. La patronne vous demande le planning de la semaine.$t$, donnees = $t$- L'atelier travaille du lundi au samedi midi, avec 3 couturiers. Un couturier termine une tenue par jour.
- Mardi matin, une coupure d'électricité est annoncée pour travaux : la demi-journée est perdue pour tous.
- À livrer jeudi soir : 4 tenues sur mesure.
- À livrer samedi à midi : 9 tenues pour un mariage.
- 6 retouches d'une heure chacune sont promises pour mercredi.$t$, travail_a_faire = $t$Préparez le planning de la semaine, jour par jour. Dites si tout tient, où se trouve le risque, et quel client prévenir en premier.$t$, prenom = $t$Fifamè$t$, lieu = $t$Cotonou, Bénin$t$, profil = $t$Structure, 8 personnes$t$, reponse_attendue = null
  where numero = 1 and tache_id in (select id from taches where code = $t$F54$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 2, '', '', '' from taches t
  where t.code = $t$F54$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 2);
update exercices set titre = $t$Graphiste à son compte à Libreville$t$, contexte = $t$Vous êtes graphiste à votre compte, à Libreville. Vous travaillez seule, 6 heures par jour, du lundi au vendredi. Cette semaine, tout arrive en même temps.$t$, donnees = $t$- Un devis à envoyer lundi : 1 heure.
- Des modifications sur une bâche déjà livrée, à rendre mardi : 2 heures.
- Un logo pour un salon de coiffure, à rendre mercredi : 6 heures.
- Une affiche pour un événement, à rendre jeudi : 4 heures.
- 6 visuels pour une boutique, à rendre vendredi : 6 heures.
- Le soir, la connexion est trop lente pour envoyer de gros fichiers.$t$, travail_a_faire = $t$Préparez le planning de la semaine, avec le total des heures de chaque jour. Dites à quel moment envoyer les fichiers lourds.$t$, prenom = $t$Ornella$t$, lieu = $t$Libreville, Gabon$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = $t$19 heures de travail prévues pour 30 heures disponibles : la semaine tient, à condition d'envoyer les fichiers lourds dans la journée.$t$
  where numero = 2 and tache_id in (select id from taches where code = $t$F54$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 1, '', '', '' from taches t
  where t.code = $t$F55$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 1);
update exercices set titre = $t$Chargée de communication d'une imprimerie à Douala$t$, contexte = $t$Vous êtes chargée de communication chez Mboa Print, une imprimerie de 11 personnes. Les commerciaux vous demandent une page à envoyer aux entreprises qui organisent un événement.$t$, donnees = $t$- L'imprimerie fait des cartes de visite, des flyers, des bâches et des tee-shirts imprimés.
- Trois réalisations récentes : les bâches d'un salon professionnel, les tee-shirts d'une course à pied, les menus d'un restaurant.
- Les trois clients ont donné leur accord pour les photos, sans leur nom.
- Délai habituel : 3 à 5 jours selon la commande.
- Paiement par MTN MoMo, par Orange Money ou par virement, avec un acompte à la commande.$t$, travail_a_faire = $t$Rédigez la page de présentation. Aucun prix n'y figure : la page renvoie vers un devis.$t$, prenom = $t$Sandrine$t$, lieu = $t$Douala, Cameroun$t$, profil = $t$Structure, 11 personnes$t$, reponse_attendue = null
  where numero = 1 and tache_id in (select id from taches where code = $t$F55$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 2, '', '', '' from taches t
  where t.code = $t$F55$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 2);
update exercices set titre = $t$Monteur vidéo à son compte à Abidjan$t$, contexte = $t$Vous êtes monteur vidéo à votre compte, à Yopougon. Vous montez de courtes vidéos pour des boutiques et des particuliers. Jusqu'ici, vous envoyez vos vidéos une par une à chaque nouveau contact.$t$, donnees = $t$- Montage d'une vidéo courte : à partir de 16 500 FCFA.
- Trois réalisations : la vidéo d'ouverture d'une boutique de chaussures, le résumé d'un mariage, la présentation d'une pâtisserie.
- Délai habituel : 3 jours après réception des images.
- Paiement par Wave ou par Orange Money, avec la moitié en avance.
- Vous envoyez vos vidéos en lien, pour ne pas consommer la connexion du client.$t$, travail_a_faire = $t$Rédigez la page de présentation, avec le prix de départ et les trois réalisations. Ne citez aucun nom de client.$t$, prenom = $t$Désiré$t$, lieu = $t$Abidjan, Côte d'Ivoire$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F55$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 1, '', '', '' from taches t
  where t.code = $t$F56$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 1);
update exercices set titre = $t$Chef de projet dans une agence digitale à Dakar$t$, contexte = $t$Vous êtes chef de projet chez Ndanane Digital, une agence de 7 personnes. Le gérant d'une boutique de meubles a commandé un site vitrine, c'est-à-dire un site qui présente une entreprise sans vendre en ligne. Le site est livré, et le client refuse de payer le solde.$t$, donnees = $t$- Prix du site : 180 000 FCFA. Acompte de 90 000 FCFA reçu par Wave à la commande.
- Reste à payer : 90 000 FCFA, dû à la livraison, il y a huit jours.
- Le devis prévoyait deux séries de modifications. Le client en demande une quatrième : changer toutes les couleurs.
- Son message : « Bonsoir. Je ne paie pas le reste tant que le site n'est pas refait. Ce n'est pas ce que je voulais. »
- L'agence peut offrir une dernière série de modifications, limitée aux couleurs, si le solde est payé avant.$t$, travail_a_faire = $t$Préparez les trois réponses. Aucune ne promet de refaire le site, et chacune rappelle ce que le devis prévoyait.$t$, prenom = $t$Ousmane$t$, lieu = $t$Dakar, Sénégal$t$, profil = $t$Structure, 7 personnes$t$, reponse_attendue = null
  where numero = 1 and tache_id in (select id from taches where code = $t$F56$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 2, '', '', '' from taches t
  where t.code = $t$F56$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 2);
update exercices set titre = $t$Couturière à son compte à Abidjan$t$, contexte = $t$Vous êtes couturière à votre compte, à Abobo. Une cliente vous a confié son pagne pour une tenue. Vous avez deux jours de retard, et elle vous écrit tard le soir.$t$, donnees = $t$- Couture de la tenue, main-d'œuvre : 10 000 FCFA. Avance de 5 000 FCFA reçue par Orange Money.
- La tenue était promise pour samedi. Une coupure d'électricité de deux jours vous a retardée.
- Son message : « Bonsoir. Ça fait deux jours que vous me faites attendre. Rendez-moi mon pagne et mon avance, sinon tout le quartier saura comment vous travaillez. »
- La tenue sera prête demain à 16 h. Vous pouvez offrir la livraison.
- Vous ne voulez pas rendre l'avance : le travail est presque fini.$t$, travail_a_faire = $t$Préparez les trois réponses. Chacune reconnaît le retard, donne l'heure exacte de la livraison et reste polie.$t$, prenom = $t$Affoué$t$, lieu = $t$Abidjan, Côte d'Ivoire$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F56$t$);

-- 4. Les modèles à remplir, leurs champs et la note par IA
insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Rédiger un devis clair et une facture simple$t$, $t$Rôle : Vous rédigez des devis clairs pour un prestataire de services, et vous vérifiez chaque calcul.

Contexte : Mon activité : {{activite}}. Le client : {{client}}. Les prestations, avec la quantité et le prix à l'unité : {{prestations}}. Acompte demandé à la commande : {{acompte}}. Délai de livraison : {{delai}}. Moyens de paiement : {{paiement}}. Durée de validité du devis : {{validite}}.

Travail demandé :
1. Le devis, ligne par ligne : désignation, quantité, prix à l'unité, total de la ligne.
2. Le total, le montant de l'acompte et le reste à payer, en montrant chaque calcul.
3. Les conditions en 3 lignes : délai, paiement, validité.
4. Un message de 3 lignes pour envoyer le devis au client, avec une salutation.

Format : texte simple, sans astérisque, prêt à coller dans WhatsApp ou dans le document « Devis et facture simple ». Montants écrits ainsi : 25 000 FCFA.

Règle : utilisez seulement mes prix. S'il en manque un, demandez-le. Quand j'écris une quantité et un prix, le prix est celui d'une seule unité : multipliez, et montrez le calcul. N'ajoutez ni taxe, ni remise, ni frais que je n'ai pas donnés. Ce devis n'est pas une facture normalisée.$t$, 2, $t$Une IA peut se tromper dans un calcul. Vérifiez avec votre tableau.$t$, 1, '2026-10-04' from taches t
  where t.code = $t$F51$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$photographe à mon compte, à Cotonou$t$, true, 1),
    ($t$client$t$, $t$Qui est le client ?$t$, $t$texte$t$, null::jsonb, $t$une future mariée$t$, true, 2),
    ($t$prestations$t$, $t$Quelles prestations, en quelle quantité et à quel prix à l'unité ?$t$, $t$long$t$, null::jsonb, $t$1 photo et vidéo du mariage à 250 000 FCFA, 1 séance photo avant le mariage à 20 000 FCFA$t$, true, 3),
    ($t$acompte$t$, $t$Quel acompte demandez-vous à la commande ?$t$, $t$texte$t$, null::jsonb, $t$30 %$t$, true, 4),
    ($t$delai$t$, $t$Quel est votre délai de livraison ?$t$, $t$texte$t$, null::jsonb, $t$15 jours après le mariage$t$, true, 5),
    ($t$paiement$t$, $t$Comment vous paie-t-on ?$t$, $t$texte$t$, null::jsonb, $t$MTN MoMo ou espèces$t$, true, 6),
    ($t$validite$t$, $t$Combien de temps le devis est-il valable ?$t$, $t$texte$t$, null::jsonb, $t$10 jours$t$, true, 7)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F51$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Présenter son offre en 30 secondes (texte et message vocal)$t$, $t$Rôle : Vous aidez un prestataire à présenter son offre en 30 secondes, sans exagérer.

Contexte : Ce que je fais : {{metier}}. Pour qui : {{clients}}. Ce qui me distingue : {{atouts}}. Une réalisation que je peux citer : {{realisation}}. Comment me joindre : {{contact}}.

Travail demandé :
1. Un texte de présentation de 4 lignes au plus pour WhatsApp, qui commence par une salutation.
2. Le script d'une note vocale de 30 secondes, soit 70 à 80 mots, écrit comme on parle, avec des phrases courtes.
3. Une phrase de 100 caractères au plus pour mon statut ou ma page.

Format : texte simple, prêt à coller ou à lire à voix haute.

Règle : n'inventez ni client, ni chiffre, ni récompense. Si la réalisation est « (non précisé) », n'en citez aucune. Pas de superlatif comme « le meilleur » ou « numéro 1 ».$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F52$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$metier$t$, $t$Que faites-vous ?$t$, $t$texte$t$, null::jsonb, $t$menuisier, je fabrique des lits, des armoires et des tables sur mesure, en bois massif$t$, true, 1),
    ($t$clients$t$, $t$Pour qui travaillez-vous ?$t$, $t$texte$t$, null::jsonb, $t$des familles et des particuliers, à Lomé$t$, true, 2),
    ($t$atouts$t$, $t$Qu'est-ce qui vous distingue vraiment ?$t$, $t$texte$t$, null::jsonb, $t$je prends les mesures chez le client, je livre dans Lomé en deux semaines$t$, true, 3),
    ($t$realisation$t$, $t$Quelle réalisation vraie pouvez-vous citer ?$t$, $t$texte$t$, null::jsonb, $t$une armoire à trois portes livrée le mois dernier$t$, false, 4),
    ($t$contact$t$, $t$Comment vous joindre ?$t$, $t$texte$t$, null::jsonb, $t$par message sur WhatsApp$t$, true, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F52$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Préparer une réponse à un appel d'offres ou à une demande de prestation$t$, $t$Rôle : Vous aidez un prestataire à répondre à une demande de prestation ou à un appel d'offres, de façon claire et complète.

Contexte : Mon activité : {{activite}}. La demande reçue, mot pour mot : « {{demande}} » Ce que je propose : {{proposition}}. Mon prix : {{prix}}. Date limite de réponse : {{date_limite}}. Pièces demandées : {{pieces}}.

Travail demandé :
1. Ce que le client demande, en 3 lignes, et les points qui restent flous.
2. Ma réponse en 4 parties : ce que j'ai compris, ce que je propose, le délai, le prix et les conditions.
3. La liste des pièces à joindre, et celles qui me manquent.
4. Le message d'envoi : 4 lignes au plus, avec une salutation et une formule de politesse.

Format : texte simple, prêt à coller dans WhatsApp. Ajoutez une version e-mail avec un objet si la demande vient d'une entreprise, d'une ONG ou d'une administration.

Règle : vouvoyez le client. N'inventez ni référence, ni diplôme, ni chiffre. Si mon prix est « à préciser », laissez la ligne du prix à remplir. Ne donnez aucun conseil juridique ou fiscal.$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F53$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$formatrice à mon compte en Word et en Excel, à Niamey$t$, true, 1),
    ($t$demande$t$, $t$Qu'a écrit le client, mot pour mot ?$t$, $t$long$t$, null::jsonb, $t$Bonjour Madame. Nous voulons former nos 8 secrétaires et surveillants à Excel avant la rentrée. Envoyez-nous votre proposition et votre prix.$t$, true, 2),
    ($t$proposition$t$, $t$Que proposez-vous ?$t$, $t$long$t$, null::jsonb, $t$deux journées dans les locaux du collège, avec des exercices sur les listes d'élèves et les notes$t$, true, 3),
    ($t$prix$t$, $t$Quel est votre prix ?$t$, $t$texte$t$, null::jsonb, $t$à préciser$t$, true, 4),
    ($t$date_limite$t$, $t$Quelle est la date limite de réponse ?$t$, $t$texte$t$, null::jsonb, $t$avant la rentrée, le plus tôt possible$t$, true, 5),
    ($t$pieces$t$, $t$Quelles pièces le client demande-t-il ?$t$, $t$texte$t$, null::jsonb, $t$aucune$t$, false, 6)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F53$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Planifier sa semaine et ses livraisons$t$, $t$Rôle : Vous aidez un prestataire à organiser sa semaine pour livrer à temps.

Contexte : Mon activité : {{activite}}. Mes jours et mes heures de travail : {{disponibilites}}. Mes commandes en cours, avec l'échéance et la durée estimée : {{commandes}}. Mes contraintes de la semaine : {{contraintes}}.

Travail demandé :
1. Un planning jour par jour : ce que je fais, pour quelle commande, pendant combien de temps.
2. Le total des heures prévues par jour, comparé à mes heures de travail.
3. Les commandes qui risquent d'être en retard, et ce que je peux déplacer.
4. Pour chaque commande en retard, un message de 3 lignes pour prévenir le client, avec une nouvelle date.

Format : une liste par jour, puis les alertes, puis les messages. Texte simple, prêt à copier.

Règle : n'ajoutez aucune commande et ne changez aucune échéance sans me le dire. Si une durée manque, demandez-la. Placez d'abord ce qui est dû le plus tôt, et montrez le calcul des heures.$t$, 2, $t$Une IA peut se tromper dans un calcul. Vérifiez avec votre tableau.$t$, 1, '2026-10-04' from taches t
  where t.code = $t$F54$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$graphiste à mon compte, à Libreville$t$, true, 1),
    ($t$disponibilites$t$, $t$Quels jours et combien d'heures travaillez-vous ?$t$, $t$texte$t$, null::jsonb, $t$du lundi au vendredi, 6 heures par jour$t$, true, 2),
    ($t$commandes$t$, $t$Quelles commandes avez-vous, pour quand, et pour combien d'heures ?$t$, $t$long$t$, null::jsonb, $t$un devis à envoyer lundi, 1 heure ; des modifications sur une bâche à rendre mardi, 2 heures ; un logo à rendre mercredi, 6 heures ; une affiche à rendre jeudi, 4 heures ; 6 visuels à rendre vendredi, 6 heures$t$, true, 3),
    ($t$contraintes$t$, $t$Quelles contraintes avez-vous cette semaine ?$t$, $t$texte$t$, null::jsonb, $t$le soir, la connexion est trop lente pour envoyer de gros fichiers$t$, false, 4)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F54$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Construire un portfolio ou une page de présentation$t$, $t$Rôle : Vous rédigez la page de présentation d'un prestataire : une page que le client lit en une minute sur son téléphone.

Contexte : Mon activité : {{activite}}. Mes clients : {{clients}}. Mes prestations : {{prestations}}. Trois réalisations vraies : {{realisations}}. Comment commander et payer : {{commander}}. Comment me joindre : {{contact}}.

Travail demandé :
1. Une phrase d'accroche de 12 mots au plus.
2. Une présentation de 3 lignes : qui je suis, pour qui je travaille, ce que le client y gagne.
3. La liste de mes prestations, une ligne chacune.
4. Mes trois réalisations : pour chacune, la demande, ce que j'ai fait et le résultat visible, en 2 lignes.
5. « Comment travailler avec moi », en 3 étapes, puis mes coordonnées.

Format : texte simple, avec le titre de chacune des cinq parties, prêt à coller dans le document « Page de présentation ».

Règle : n'inventez ni client, ni chiffre, ni avis. Ne citez aucun nom de client : écrivez « une boutique de chaussures » plutôt que son nom. Pas de superlatif.$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F55$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$monteur vidéo à mon compte, à Abidjan$t$, true, 1),
    ($t$clients$t$, $t$Pour qui travaillez-vous ?$t$, $t$texte$t$, null::jsonb, $t$des boutiques et des particuliers$t$, true, 2),
    ($t$prestations$t$, $t$Quelles prestations proposez-vous ?$t$, $t$long$t$, null::jsonb, $t$montage d'une vidéo courte, à partir de 16 500 FCFA, livrée en 3 jours$t$, true, 3),
    ($t$realisations$t$, $t$Quelles sont vos trois réalisations ?$t$, $t$long$t$, null::jsonb, $t$la vidéo d'ouverture d'une boutique de chaussures, le résumé d'un mariage, la présentation d'une pâtisserie$t$, true, 4),
    ($t$commander$t$, $t$Comment commande-t-on et comment vous paie-t-on ?$t$, $t$texte$t$, null::jsonb, $t$la moitié en avance par Wave ou par Orange Money, le reste à la livraison$t$, true, 5),
    ($t$contact$t$, $t$Comment vous joindre ?$t$, $t$texte$t$, null::jsonb, $t$par message sur WhatsApp$t$, true, 6)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F55$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Gérer un client difficile par écrit$t$, $t$Rôle : Vous aidez un prestataire à répondre par écrit à un client mécontent, avec calme, sans céder sur ce qui était convenu.

Contexte : Mon activité : {{activite}}. Ce qui s'est passé : {{situation}}. Ce qui était convenu : {{accord}}. Message du client : « {{message_client}} » Ce que je peux proposer : {{solution}}. Ce que je n'accepte pas : {{limite}}.

Travail demandé :
1. Ce qui relève de ma responsabilité et ce qui n'en relève pas, en 3 lignes, d'après les faits donnés.
2. Trois réponses au choix : apaiser et reconnaître ma part ; proposer une solution avec une date ; poser une limite avec respect.
3. La phrase à garder par écrit pour confirmer ce qui est décidé.

Format : trois messages de 4 lignes au plus, prêts à coller dans WhatsApp. Chacun commence par une salutation.

Règle : vouvoyez le client. Jamais de reproche, de menace ni d'ironie. Ne promettez rien que je n'ai pas proposé. Reconnaissez un retard ou une erreur quand les faits le montrent. Aucun conseil juridique.$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F56$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$couturière à mon compte, à Abidjan$t$, true, 1),
    ($t$situation$t$, $t$Que s'est-il passé ?$t$, $t$long$t$, null::jsonb, $t$la tenue était promise pour samedi, une coupure d'électricité de deux jours m'a retardée, elle sera prête demain à 16 h$t$, true, 2),
    ($t$accord$t$, $t$Qu'est-ce qui était convenu ?$t$, $t$texte$t$, null::jsonb, $t$couture d'une tenue à 10 000 FCFA, avance de 5 000 FCFA reçue, livraison samedi$t$, true, 3),
    ($t$message_client$t$, $t$Qu'a écrit le client ?$t$, $t$long$t$, null::jsonb, $t$Bonsoir. Ça fait deux jours que vous me faites attendre. Rendez-moi mon pagne et mon avance, sinon tout le quartier saura comment vous travaillez.$t$, true, 4),
    ($t$solution$t$, $t$Que pouvez-vous proposer ?$t$, $t$texte$t$, null::jsonb, $t$la tenue prête demain à 16 h, avec la livraison offerte$t$, true, 5),
    ($t$limite$t$, $t$Qu'est-ce que vous n'acceptez pas ?$t$, $t$texte$t$, null::jsonb, $t$rendre l'avance, car le travail est presque fini$t$, false, 6)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F56$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

-- La note par IA : la même pour les 6 modèles
insert into conseils_ia (modele_id, ia, conseil) select mp.id, v.ia, v.conseil
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$chatgpt$t$, $t$Ouvrez la conversation dans votre projet « Mon activité », pour que vos instructions s'appliquent. Si la skill de la tâche est installée, ChatGPT s'en sert seul.$t$),
    ($t$claude$t$, $t$Ouvrez la conversation dans votre projet « Mon activité ». Si la skill est installée, Claude s'en sert seul.$t$),
    ($t$gemini$t$, $t$Ouvrez le Gem de la tâche quand il y en a un, sinon collez la consigne dans le Gem « Assistant de mon activité ».$t$),
    ($t$meta_ai$t$, $t$Collez d'abord « Assistant de mon activité », puis la consigne.$t$),
    ($t$copilot$t$, $t$Collez d'abord « Assistant de mon activité », puis la consigne.$t$)
  ) as v(ia, conseil)
  where t.code in ($t$F51$t$, $t$F52$t$, $t$F53$t$, $t$F54$t$, $t$F55$t$, $t$F56$t$)
  on conflict (modele_id, ia) do update set conseil = excluded.conseil;

-- 5. Les ressources
insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-activite-chatgpt$t$, $t$configuration$t$, $t$Assistant de mon activité$t$, $t$Vous le complétez une fois avec les informations de votre activité : ensuite, l'IA connaît vos prestations, vos tarifs et vos délais à chaque conversation.$t$, $t$chatgpt$t$, $t$Vous êtes l'assistant de mon activité. Vous m'aidez à trouver des clients, à rédiger mes devis et mes messages, et à organiser mon travail.

MON ACTIVITÉ
Nom et métier : [nom], [ce que je fais]
Lieu : [quartier, ville, pays]
Mes clients : [particuliers, entreprises, ONG]
Mes prestations et mes tarifs : [prestation : prix en FCFA]
Paiement : [espèces, Mobile Money accepté, acompte demandé ou non]
Délais habituels : [délai par prestation]
Horaires : [jours et heures]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez mes clients.
2. Un message à un client commence par « Bonjour » ou « Bonsoir » et reste poli, même pour refuser.
3. Montants écrits ainsi : 25 000 FCFA.
4. Textes prêts à coller dans WhatsApp : ni titre, ni astérisque, peu d'émojis.
5. N'inventez jamais un prix, un délai, une référence ou un avis. S'il manque une information, posez-moi une seule question.
6. Pour un message, proposez 2 versions : une courte, une plus chaleureuse.
7. Ne demandez jamais le nom complet ni le numéro d'un client.
8. Impôts, factures officielles, contrats, droit : renvoyez-moi vers mon comptable ou l'administration.$t$, $j${"chatgpt": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre activité.", "Dans ChatGPT, choisissez un projet, puis Nouveau projet. Donnez-lui le nom « Mon activité », puis Créer un projet.", "Ouvrez le menu « … » du projet, puis Paramètres du projet. Collez le texte dans le champ Instructions, puis Enregistrer."], "gratuit": "Oui. Les projets sont disponibles sur un compte gratuit, avec 5 fichiers par projet.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Autre possibilité : Paramètres, Personnalisation, Instructions personnalisées. Le texte s'applique alors à toutes vos conversations, dans la limite de 1 500 caractères.", "Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-activite-claude$t$, $t$configuration$t$, $t$Assistant de mon activité$t$, $t$Vous le complétez une fois avec les informations de votre activité : ensuite, l'IA connaît vos prestations, vos tarifs et vos délais à chaque conversation.$t$, $t$claude$t$, $t$Vous êtes l'assistant de mon activité. Vous m'aidez à trouver des clients, à rédiger mes devis et mes messages, et à organiser mon travail.

MON ACTIVITÉ
Nom et métier : [nom], [ce que je fais]
Lieu : [quartier, ville, pays]
Mes clients : [particuliers, entreprises, ONG]
Mes prestations et mes tarifs : [prestation : prix en FCFA]
Paiement : [espèces, Mobile Money accepté, acompte demandé ou non]
Délais habituels : [délai par prestation]
Horaires : [jours et heures]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez mes clients.
2. Un message à un client commence par « Bonjour » ou « Bonsoir » et reste poli, même pour refuser.
3. Montants écrits ainsi : 25 000 FCFA.
4. Textes prêts à coller dans WhatsApp : ni titre, ni astérisque, peu d'émojis.
5. N'inventez jamais un prix, un délai, une référence ou un avis. S'il manque une information, posez-moi une seule question.
6. Pour un message, proposez 2 versions : une courte, une plus chaleureuse.
7. Ne demandez jamais le nom complet ni le numéro d'un client.
8. Impôts, factures officielles, contrats, droit : renvoyez-moi vers mon comptable ou l'administration.$t$, $j${"claude": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre activité.", "Dans Claude, ouvrez Projets, puis Nouveau projet. Donnez-lui le nom « Mon activité », puis Créer un projet.", "Dans le projet, ouvrez Instructions, puis Ajouter. Collez le texte, puis Enregistrer les instructions."], "gratuit": "Oui, dans la limite de 5 projets.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-activite-gemini$t$, $t$configuration$t$, $t$Assistant de mon activité$t$, $t$Vous le complétez une fois avec les informations de votre activité : ensuite, l'IA connaît vos prestations, vos tarifs et vos délais à chaque conversation.$t$, $t$gemini$t$, $t$Vous êtes l'assistant de mon activité. Vous m'aidez à trouver des clients, à rédiger mes devis et mes messages, et à organiser mon travail.

MON ACTIVITÉ
Nom et métier : [nom], [ce que je fais]
Lieu : [quartier, ville, pays]
Mes clients : [particuliers, entreprises, ONG]
Mes prestations et mes tarifs : [prestation : prix en FCFA]
Paiement : [espèces, Mobile Money accepté, acompte demandé ou non]
Délais habituels : [délai par prestation]
Horaires : [jours et heures]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez mes clients.
2. Un message à un client commence par « Bonjour » ou « Bonsoir » et reste poli, même pour refuser.
3. Montants écrits ainsi : 25 000 FCFA.
4. Textes prêts à coller dans WhatsApp : ni titre, ni astérisque, peu d'émojis.
5. N'inventez jamais un prix, un délai, une référence ou un avis. S'il manque une information, posez-moi une seule question.
6. Pour un message, proposez 2 versions : une courte, une plus chaleureuse.
7. Ne demandez jamais le nom complet ni le numéro d'un client.
8. Impôts, factures officielles, contrats, droit : renvoyez-moi vers mon comptable ou l'administration.$t$, $j${"gemini": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre activité.", "Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez « Assistant de mon activité ». Collez le texte dans Instructions, puis Enregistrer."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-devis-clair$t$, $t$skill$t$, $t$Rédacteur de devis$t$, $t$Rédige un devis clair pour un prestataire, avec le total, l'acompte et le reste à payer.$t$, null, $t$---
name: devis-clair
description: Rédige un devis clair pour un prestataire, avec le total, l'acompte et le reste à payer. À utiliser quand l'utilisateur décrit une prestation à chiffrer.
---

# Rédacteur de devis

Quand l'utilisateur décrit une prestation à chiffrer, rédigez son devis.

## Avant d'écrire
Il vous faut : les prestations, la quantité et le prix à l'unité de chacune, l'acompte demandé, le délai, les moyens de paiement et la durée de validité. S'il manque un prix, demandez-le. Ne le devinez jamais.

## Ce que vous livrez
1. Le devis, ligne par ligne : désignation, quantité, prix à l'unité, total de la ligne.
2. Le total, l'acompte et le reste à payer. Montrez chaque calcul.
3. Les conditions en 3 lignes : délai, paiement, validité.
4. Un message de 3 lignes pour envoyer le devis au client, avec une salutation.

## Règles
- Texte simple, sans astérisque ni titre, prêt à coller. Vouvoyez le client.
- Montants écrits ainsi : 25 000 FCFA.
- Une quantité et un prix : le prix est celui d'une seule unité. Multipliez, et montrez le calcul.
- Aucune taxe, aucune remise, aucun frais que l'utilisateur n'a pas donnés.
- Ce devis n'est pas une facture normalisée. Pour une facture officielle, renvoyez l'utilisateur vers son comptable.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mon activité »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$devis-clair.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-presentation-offre$t$, $t$skill$t$, $t$Présentation en 30 secondes$t$, $t$Prépare la présentation d'un prestataire en 30 secondes, en texte et en note vocale.$t$, null, $t$---
name: presentation-offre
description: Prépare la présentation d'un prestataire en 30 secondes, en texte et en note vocale. À utiliser quand l'utilisateur veut se présenter ou présenter son offre à un futur client.
---

# Présentation en 30 secondes

Quand l'utilisateur veut présenter son activité, préparez trois formats courts.

## Avant d'écrire
Il vous faut : ce que fait l'utilisateur, pour qui, ce qui le distingue vraiment, et comment le joindre. Une réalisation vraie est utile, sans nom de client. S'il manque le métier ou le public, posez une seule question.

## Ce que vous livrez
1. Un texte de 4 lignes au plus pour WhatsApp, qui commence par une salutation.
2. Le script d'une note vocale de 30 secondes : 70 à 80 mots, écrits comme on parle, en phrases courtes.
3. Une phrase de 100 caractères au plus pour le statut ou la page.

## Règles
- Vouvoyez le lecteur. Texte simple, sans astérisque ni titre.
- Aucun client, aucun chiffre, aucune récompense inventés.
- Pas de superlatif : ni « le meilleur », ni « numéro 1 ».
- Si l'utilisateur ne donne aucune réalisation, n'en citez aucune.
- Chaque format finit par une invitation simple : « Écrivez-moi pour un devis. »$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mon activité »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$presentation-offre.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-reponse-demande$t$, $t$skill$t$, $t$Réponse à une demande de prestation$t$, $t$Prépare la réponse d'un prestataire à une demande de prestation ou à un appel d'offres.$t$, null, $t$---
name: reponse-demande
description: Prépare la réponse d'un prestataire à une demande de prestation ou à un appel d'offres. À utiliser quand l'utilisateur colle la demande d'une entreprise, d'une ONG ou d'un particulier.
---

# Réponse à une demande de prestation

Quand l'utilisateur colle une demande reçue, préparez sa réponse.

## Avant d'écrire
Il vous faut : la demande mot pour mot, sans nom ni numéro, ce que l'utilisateur propose, son prix ou la mention « à préciser », la date limite et les pièces demandées. Si la demande est floue, listez les points à éclaircir avant de répondre.

## Ce que vous livrez
1. Ce que le client demande, en 3 lignes, et les points qui restent flous.
2. La réponse en 4 parties : ce que j'ai compris, ce que je propose, le délai, le prix et les conditions.
3. La liste des pièces à joindre, et celles qui manquent.
4. Le message d'envoi : 4 lignes au plus, avec une salutation et une formule de politesse.

## Règles
- Vouvoyez le client. Texte simple, prêt à coller.
- Une demande d'entreprise, d'ONG ou d'administration : ajoutez une version e-mail, avec un objet.
- Aucune référence, aucun diplôme, aucun chiffre inventés.
- Si le prix est « à préciser », laissez la ligne du prix à remplir.
- Aucun conseil juridique ou fiscal sur le marché.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mon activité »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$reponse-demande.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-client-difficile$t$, $t$skill$t$, $t$Réponse à un client difficile$t$, $t$Prépare trois réponses écrites à un client mécontent, avec calme et sans céder sur ce qui était convenu.$t$, null, $t$---
name: client-difficile
description: Prépare trois réponses écrites à un client mécontent, avec calme et sans céder sur ce qui était convenu. À utiliser quand l'utilisateur colle un message de reproche ou de menace.
---

# Réponse à un client difficile

Quand l'utilisateur colle le message d'un client mécontent, préparez trois réponses au choix.

## Avant d'écrire
Il vous faut : ce qui s'est passé, avec les dates, ce qui était convenu (prix, délai, nombre de modifications), le message du client sans son nom, et ce que l'utilisateur peut proposer. Si ce qui était convenu manque, demandez-le.

## Ce que vous livrez
1. La part de responsabilité de chacun, en 3 lignes, d'après les faits donnés.
2. Trois réponses : apaiser et reconnaître sa part ; proposer une solution avec une date ; poser une limite avec respect.
3. La phrase à garder par écrit pour confirmer ce qui est décidé.

## Règles
- Chaque réponse commence par une salutation et tient en 4 lignes. Vouvoyez le client.
- Jamais de reproche, de menace ni d'ironie.
- Reconnaissez un retard ou une erreur quand les faits le montrent.
- Ne promettez rien que l'utilisateur n'a pas proposé.
- Aucun conseil juridique.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mon activité »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$client-difficile.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-devis-facture-simple$t$, $t$document$t$, $t$Devis et facture simple$t$, $t$Ce tableau calcule seul le total, l'acompte et le reste à payer d'un devis, puis reprend les mêmes lignes dans une facture simple.$t$, null, $t$Dans l'onglet « Devis », vous saisissez vos lignes : désignation, quantité, prix à l'unité. Le total de chaque ligne et le total du devis se calculent seuls.
Vous saisissez le pourcentage d'acompte : le montant de l'acompte et le reste à payer se calculent seuls.
L'onglet « Facture » reprend seul les lignes du devis. Vous y ajoutez le numéro, la date et ce qui a déjà été payé.
Le document porte la mention « Ce document n'est pas une facture normalisée ». Dans plusieurs pays, dont le Bénin, la Côte d'Ivoire, le Niger et le Burkina Faso, la facture officielle passe par un dispositif de l'État : ce tableau ne la remplace pas. Pour une facture officielle, adressez-vous à votre comptable.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$devis-et-facture-simple.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1CS8_XQQRO_QY8j2Dbx_h7wBysN9qlq746SDXj2ygllk/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-suivi-clients-paiements$t$, $t$document$t$, $t$Suivi des clients et des paiements$t$, $t$Ce tableau dit en un coup d'œil où en est chaque client : devis envoyé, travail en cours, livraison, reste à payer. Il sert de base au suivi du jeudi.$t$, null, $t$Dans la colonne Client, écrivez le prénom ou une initiale, jamais le numéro.
Notez aussi le code de la commande dans le nom du contact WhatsApp, pour retrouver la conversation.
Le reste à payer se calcule seul : montant moins ce qui a déjà été payé.
L'onglet « Résumé » compte les devis en attente, les travaux en cours et ce qui reste à encaisser.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$suivi-des-clients-et-des-paiements.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1Nlo1Y-cmbpbSGSu7UXrRRakqlTUckDSdT-5d19CceME/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-planning-semaine$t$, $t$document$t$, $t$Planning de la semaine$t$, $t$Ce tableau range vos tâches jour par jour et compare les heures prévues à vos heures de travail, pour voir à l'avance le jour qui déborde.$t$, null, $t$Vous saisissez chaque tâche : le jour, la commande, la durée prévue en heures et le jour où le travail doit être rendu. Une tâche placée après ce jour passe en rouge.
L'onglet « Charge » additionne seul les heures de chaque jour et les compare à vos heures de travail. Un jour trop chargé passe en rouge.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$planning-de-la-semaine.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/148__DBAbLCA9Cyfl9kaaePYkdkBbA91GnJF7tsHU6wg/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-page-presentation$t$, $t$document$t$, $t$Page de présentation$t$, $t$Ce document d'une page présente votre activité à un futur client. Il se remplit sur le téléphone et s'envoie en PDF sur WhatsApp.$t$, null, $t$Il contient : votre nom et votre métier, une phrase d'accroche, vos prestations, trois réalisations, les étapes pour travailler avec vous et vos coordonnées.
Ne citez le nom d'un client qu'avec son accord. Sinon, écrivez « une boutique de chaussures » plutôt que son nom.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$page-de-presentation.docx$t$, $t$https://docs.google.com/document/d/183ZPbWKF45GVaVAFOhA4McHaVHVI0xOEjStobHmaAo0/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-planning-lundi$t$, $t$routine$t$, $t$Planning du lundi$t$, $t$Chaque lundi, l'IA vous rappelle de préparer votre semaine. Elle ne lit pas seule votre tableau : vous collez vos commandes en cours, puis elle propose le planning. Les échéances qui font foi restent celles de votre tableau.$t$, null, $t$Chaque lundi à 7 h 30, envoyez-moi ce message : « Bonjour. C'est lundi, préparons votre semaine. Collez ici vos commandes en cours : code, prestation, échéance, durée estimée en heures. Ajoutez vos jours et vos heures de travail. Ne mettez ni nom ni numéro. »

Quand j'aurai collé mes lignes :
1. Rangez les commandes de l'échéance la plus proche à la plus lointaine.
2. Proposez un planning jour par jour, avec la durée de chaque tâche.
3. Donnez le total des heures par jour, comparé à mes heures de travail.
4. Signalez les commandes qui risquent d'être en retard, et ce que je peux déplacer.

Règles : partez seulement des lignes collées. N'ajoutez aucune commande et ne changez aucune échéance. Si une durée manque, demandez-la.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mon activité »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Mon activité ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mon activité »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant de mon activité »."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-suivi-devis-jeudi$t$, $t$routine$t$, $t$Suivi des devis du jeudi$t$, $t$Chaque jeudi, l'IA vous rappelle de relancer les devis restés sans réponse. Vous collez les lignes de votre tableau de suivi, sans nom ni numéro, puis elle rédige les relances.$t$, null, $t$Chaque jeudi à 10 h, envoyez-moi ce message : « Bonjour. C'est jeudi, voyons vos devis sans réponse. Collez ici les lignes de votre tableau de suivi : code, prestation, montant, date d'envoi du devis, relances déjà faites. Ne mettez ni nom ni numéro. »

Quand j'aurai collé mes lignes :
1. Classez les devis du plus ancien au plus récent.
2. Donnez le total des devis en attente, en FCFA.
3. Pour chaque devis, rédigez le message de relance du bon niveau : un rappel courtois s'il n'y a eu aucune relance, une relance qui demande une réponse avant une date après une relance, un dernier message qui annonce la fin de validité du devis après deux relances.
4. Écrivez [Prénom] là où je mettrai le prénom du client.

Règles : salutation au début, remerciement à la fin, 4 lignes au plus par message. Jamais de pression ni de fausse urgence. N'inventez aucun montant.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mon activité »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Mon activité ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mon activité »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant de mon activité »."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

-- 6. Le kit : présentation, étapes d'installation, encadrés « À savoir », mots expliqués
insert into kits (metier_id, titre, presentation, etapes, prerequis, limites, a_savoir, mots, revu_le) select m.id, $t$Indépendant et prestataire de services$t$, $t$Tout ce qu'il faut pour chiffrer une prestation, vous présenter, répondre à une demande, tenir vos délais et garder vos clients, avec une IA gratuite, sur un téléphone Android : une configuration, quatre skills, quatre documents, deux routines et six tâches.$t$, $j$[{"numero": 1, "titre": "Configurer mon IA avec « Assistant de mon activité »", "minutes": 5}, {"numero": 2, "titre": "Installer mes 3 premières skills : devis, présentation, client difficile", "minutes": 10}, {"numero": 3, "titre": "Copier mes documents : devis et facture simple, suivi des clients, planning de la semaine", "minutes": 5}]$j$::jsonb, $j$["Un téléphone Android avec une connexion, même limitée.", "WhatsApp ou WhatsApp Business, pour envoyer vos devis et vos messages.", "Un compte Google et les applications gratuites Google Sheets et Google Docs, pour ouvrir les documents.", "Une IA gratuite au choix : ChatGPT, Claude ou Gemini."]$j$::jsonb, $j$["Il ne donne aucun conseil fiscal ou juridique. Pour une facture officielle, un contrat ou un impôt, adressez-vous à votre comptable ou à votre administration.", "Il ne vous demande jamais de coller dans une IA le nom complet, le numéro ou l'adresse d'un client.", "Il ne fixe pas vos prix à votre place : l'IA calcule avec vos tarifs, elle n'en invente pas.", "Il ne promet aucun résultat chiffré."]$j$::jsonb, $j${"chatgpt": "OpenAI retire les GPT personnalisés le 11 décembre 2026 et les remplace par les plugins. Ce kit n'utilise donc aucun GPT personnalisé : votre configuration se colle dans un projet, et chaque skill s'ajoute dans la rubrique Plugins, onglet Skills, ou se colle au début de la conversation. Si vous avez déjà vos propres GPT, pensez à les convertir en plugins avant cette date.", "gemini": "Google remplace les Gems par les skills en novembre 2026. Vos Gems seront convertis automatiquement. Les étapes de ce kit seront mises à jour à ce moment-là, et vous serez prévenu dans l'application."}$j$::jsonb, $j$[{"mot": "Configuration", "phrase": "Un texte d'instructions que l'IA garde en mémoire, pour ne pas tout réexpliquer à chaque conversation."}, {"mot": "Projet", "phrase": "Un dossier de conversations qui partagent les mêmes instructions."}, {"mot": "Skill", "phrase": "Une consigne enregistrée que l'IA applique quand le sujet s'y prête."}, {"mot": "Consigne, ou prompt", "phrase": "Le texte que l'on écrit à l'IA pour lui demander un travail."}, {"mot": "Modèle à remplir", "phrase": "Une consigne déjà rédigée, où il ne reste qu'à remplir quelques champs."}, {"mot": "Champ", "phrase": "Une case du formulaire, à remplir avec vos propres informations."}, {"mot": "Routine", "phrase": "Une demande qui revient à jour fixe."}, {"mot": "Tâche planifiée", "phrase": "Une demande que l'IA lance seule, au jour choisi."}, {"mot": "Devis", "phrase": "Le prix écrit d'une prestation, donné au client avant de commencer."}, {"mot": "Acompte", "phrase": "La partie du prix que le client paie à la commande."}, {"mot": "Solde", "phrase": "Ce qui reste à payer une fois l'acompte versé."}, {"mot": "Facture normalisée", "phrase": "La facture officielle, émise par un dispositif de l'État dans plusieurs pays. Les documents du kit ne la remplacent pas."}, {"mot": "Appel d'offres", "phrase": "Une demande écrite d'une entreprise, d'une ONG ou d'une administration, qui compare plusieurs prestataires avant de choisir."}, {"mot": "Note vocale", "phrase": "Un message audio que l'on enregistre et que l'on envoie sur WhatsApp."}, {"mot": "Réponse rapide", "phrase": "Un message enregistré dans WhatsApp Business, qu'on envoie en tapant un raccourci."}, {"mot": "Portfolio", "phrase": "Un choix de vos meilleures réalisations, montré à un futur client."}, {"mot": "Échéance", "phrase": "La date à laquelle un travail doit être rendu."}, {"mot": "Site vitrine", "phrase": "Un site qui présente une entreprise sans vendre en ligne."}, {"mot": "Gem", "phrase": "Un assistant Gemini enregistré avec ses propres instructions, que l'on rouvre d'un geste."}, {"mot": "Plugin", "phrase": "Un ajout que l'on installe dans ChatGPT et qui contient des consignes prêtes à servir ; il remplace le GPT personnalisé."}]$j$::jsonb, '2026-10-04' from metiers m
  where m.slug = $t$independant-prestataire-de-services$t$
  on conflict (metier_id) do update set titre = excluded.titre, presentation = excluded.presentation, etapes = excluded.etapes, prerequis = excluded.prerequis, limites = excluded.limites, a_savoir = excluded.a_savoir, mots = excluded.mots, revu_le = excluded.revu_le;

-- 7. Les ressources du kit, dans l'ordre, avec leur étape d'installation
insert into kits_metier (metier_id, ressource_id, ordre, etape_installation) select m.id, r.id, v.ordre, v.etape
  from metiers m, ressources r,
  (values
    ($t$config-activite-chatgpt$t$, 1, 1),
    ($t$config-activite-claude$t$, 2, 1),
    ($t$config-activite-gemini$t$, 3, 1),
    ($t$skill-devis-clair$t$, 4, 2),
    ($t$skill-presentation-offre$t$, 5, 2),
    ($t$skill-client-difficile$t$, 6, 2),
    ($t$doc-devis-facture-simple$t$, 7, 3),
    ($t$doc-suivi-clients-paiements$t$, 8, 3),
    ($t$doc-planning-semaine$t$, 9, 3),
    ($t$skill-reponse-demande$t$, 10, null::integer),
    ($t$doc-page-presentation$t$, 11, null::integer),
    ($t$routine-planning-lundi$t$, 12, null::integer),
    ($t$routine-suivi-devis-jeudi$t$, 13, null::integer)
  ) as v(cle, ordre, etape)
  where m.slug = $t$independant-prestataire-de-services$t$ and r.cle = v.cle
  on conflict (metier_id, ressource_id) do update set ordre = excluded.ordre, etape_installation = excluded.etape_installation;

-- 8. Quelles ressources servent à quelles tâches
insert into ressources_taches (ressource_id, tache_id) select r.id, t.id
  from ressources r, taches t,
  (values
    ($t$skill-devis-clair$t$, $t$F51$t$),
    ($t$doc-devis-facture-simple$t$, $t$F51$t$),
    ($t$doc-suivi-clients-paiements$t$, $t$F51$t$),
    ($t$routine-suivi-devis-jeudi$t$, $t$F51$t$),
    ($t$config-activite-chatgpt$t$, $t$F51$t$),
    ($t$config-activite-claude$t$, $t$F51$t$),
    ($t$config-activite-gemini$t$, $t$F51$t$),
    ($t$skill-presentation-offre$t$, $t$F52$t$),
    ($t$doc-page-presentation$t$, $t$F52$t$),
    ($t$config-activite-chatgpt$t$, $t$F52$t$),
    ($t$config-activite-claude$t$, $t$F52$t$),
    ($t$config-activite-gemini$t$, $t$F52$t$),
    ($t$skill-reponse-demande$t$, $t$F53$t$),
    ($t$doc-devis-facture-simple$t$, $t$F53$t$),
    ($t$config-activite-chatgpt$t$, $t$F53$t$),
    ($t$config-activite-claude$t$, $t$F53$t$),
    ($t$config-activite-gemini$t$, $t$F53$t$),
    ($t$doc-planning-semaine$t$, $t$F54$t$),
    ($t$doc-suivi-clients-paiements$t$, $t$F54$t$),
    ($t$routine-planning-lundi$t$, $t$F54$t$),
    ($t$config-activite-chatgpt$t$, $t$F54$t$),
    ($t$config-activite-claude$t$, $t$F54$t$),
    ($t$config-activite-gemini$t$, $t$F54$t$),
    ($t$doc-page-presentation$t$, $t$F55$t$),
    ($t$skill-presentation-offre$t$, $t$F55$t$),
    ($t$config-activite-chatgpt$t$, $t$F55$t$),
    ($t$config-activite-claude$t$, $t$F55$t$),
    ($t$config-activite-gemini$t$, $t$F55$t$),
    ($t$skill-client-difficile$t$, $t$F56$t$),
    ($t$doc-suivi-clients-paiements$t$, $t$F56$t$),
    ($t$doc-devis-facture-simple$t$, $t$F56$t$),
    ($t$config-activite-chatgpt$t$, $t$F56$t$),
    ($t$config-activite-claude$t$, $t$F56$t$),
    ($t$config-activite-gemini$t$, $t$F56$t$)
  ) as v(cle, code)
  where r.cle = v.cle and t.code = v.code
  on conflict (ressource_id, tache_id) do nothing;

commit;
