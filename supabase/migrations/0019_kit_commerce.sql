-- 0019 : contenu du kit « Commerce et vente en ligne » (4 octobre 2026)
--
-- Ce fichier est fabriqué à partir du document du kit validé le 3 octobre
-- 2026 (révision 132) : les textes en sont copiés tels quels. Il ajoute :
--   - le métier « Commerce et vente en ligne » ;
--   - 8 tâches (F43 à F50), avec leur résultat et leurs étapes ;
--   - 16 cas pratiques, deux par tâche ;
--   - 8 modèles à remplir, leurs champs, leurs exemples et la note par IA ;
--   - 13 ressources : 3 configurations, 4 skills, 4 documents, 2 routines ;
--   - le kit : ses 3 étapes d'installation et le rattachement des ressources.
--
-- À exécuter APRÈS 0018_kits_metier.sql. Aucune donnée existante n'est
-- modifiée ni supprimée : les 42 tâches et les 12 métiers en place ne
-- changent pas. Migration rejouable : une seconde exécution remet les mêmes
-- textes, sans doublon. Tout se fait dans une transaction : en cas d'erreur,
-- rien n'est modifié.
--
-- Les liens « Faire une copie » pointent pour le moment vers le Drive de
-- travail. Ils seront remplacés ici, par une nouvelle migration, quand les
-- documents seront copiés dans le Drive de Parlons ADS.

begin;

-- 1. Le métier
insert into metiers (slug, nom, description, ordre) values ($t$commerce-vente-en-ligne$t$, $t$Commerce et vente en ligne$t$, $t$Pour toute personne qui vend des articles : en boutique, au marché, ou en ligne sur WhatsApp, Facebook et TikTok.$t$, 13)
  on conflict (slug) do update set nom = excluded.nom, description = excluded.description;

-- 2. Les tâches, leur résultat et leurs étapes
insert into taches (code, titre, limite_connue) select $t$F43$t$, $t$Rédiger des fiches produits et un catalogue WhatsApp Business$t$, false
  where not exists (select 1 from taches where code = $t$F43$t$);
update taches set titre = $t$Rédiger des fiches produits et un catalogue WhatsApp Business$t$, resultat = $t$Pour chaque article, un nom, une description, un code et un message d'envoi, prêts à coller dans le catalogue. Le catalogue est la vitrine intégrée à WhatsApp Business : il accepte jusqu'à 500 articles et 10 photos par article.$t$, etapes = $j$["Choisir un article et remplir les 5 champs du modèle.", "Copier la consigne dans son IA.", "Relire le prix, les détails et les promesses, puis corriger ce qui est faux.", "Dans WhatsApp Business, ouvrir Outils professionnels, puis Catalogue, et ajouter l'article : photos, nom, prix, description, code.", "Envoyer la fiche à un client depuis la conversation."]$j$::jsonb, precisions = null
  where code = $t$F43$t$;
insert into metiers_taches (metier_id, tache_id, ordre) select m.id, t.id, 1 from metiers m, taches t
  where m.slug = $t$commerce-vente-en-ligne$t$ and t.code = $t$F43$t$
  on conflict (metier_id, tache_id) do update set ordre = excluded.ordre;

insert into taches (code, titre, limite_connue) select $t$F44$t$, $t$Préparer les statuts WhatsApp et publications de la semaine$t$, false
  where not exists (select 1 from taches where code = $t$F44$t$);
update taches set titre = $t$Préparer les statuts WhatsApp et publications de la semaine$t$, resultat = $t$Un programme de 7 jours, avec un statut WhatsApp par jour et trois publications Facebook. Un statut est une publication que vos contacts voient pendant 24 heures dans WhatsApp.$t$, etapes = $j$["Noter les articles à mettre en avant, l'actualité de la semaine et les photos disponibles.", "Remplir le modèle et copier la consigne dans son IA.", "Retirer tout ce qui n'est pas vrai : une promotion, un stock, un délai.", "Prendre les photos demandées en une seule fois.", "Publier un statut par jour, et noter dans le cahier combien de clients ont répondu."]$j$::jsonb, precisions = null
  where code = $t$F44$t$;
insert into metiers_taches (metier_id, tache_id, ordre) select m.id, t.id, 2 from metiers m, taches t
  where m.slug = $t$commerce-vente-en-ligne$t$ and t.code = $t$F44$t$
  on conflict (metier_id, tache_id) do update set ordre = excluded.ordre;

insert into taches (code, titre, limite_connue) select $t$F45$t$, $t$Répondre aux clients qui négocient, sans perdre la vente$t$, false
  where not exists (select 1 from taches where code = $t$F45$t$);
update taches set titre = $t$Répondre aux clients qui négocient, sans perdre la vente$t$, resultat = $t$Trois réponses prêtes à envoyer, dont aucune ne descend sous le prix plancher. Le prix plancher est le prix le plus bas que le vendeur accepte, calculé à l'avance.$t$, etapes = $j$["Calculer son prix plancher avec le document « Prix et marge ».", "Remplir le modèle avec le message du client, sans son nom.", "Choisir une des trois réponses et l'adapter à sa façon de parler.", "Enregistrer les meilleures réponses comme réponses rapides dans WhatsApp Business, qui en garde 50 au plus."]$j$::jsonb, precisions = null
  where code = $t$F45$t$;
insert into metiers_taches (metier_id, tache_id, ordre) select m.id, t.id, 3 from metiers m, taches t
  where m.slug = $t$commerce-vente-en-ligne$t$ and t.code = $t$F45$t$
  on conflict (metier_id, tache_id) do update set ordre = excluded.ordre;

insert into taches (code, titre, limite_connue) select $t$F46$t$, $t$Relancer poliment un client qui n'a pas payé par Mobile Money$t$, false
  where not exists (select 1 from taches where code = $t$F46$t$);
update taches set titre = $t$Relancer poliment un client qui n'a pas payé par Mobile Money$t$, resultat = $t$Le message de relance qui convient parmi trois niveaux (rappel courtois, relance précise, dernière relance avec paiement en deux fois), sans donnée personnelle du client.$t$, etapes = $j$["Retrouver la commande dans le tableau de suivi : reste à payer, date promise, relances déjà faites. Dans WhatsApp Business, une étiquette « Paiement en attente » posée sur la conversation aide à la retrouver ; une étiquette est une marque de couleur qui classe une conversation.", "Vérifier dans l'application de Mobile Money que le paiement n'est pas déjà arrivé.", "Remplir le modèle, sans nom ni numéro.", "Envoyer le message en privé, puis noter la relance dans le tableau.", "Au paiement, vérifier le solde dans l'application et non sur la seule capture d'écran, puis passer la commande en « Soldé »."]$j$::jsonb, precisions = null
  where code = $t$F46$t$;
insert into metiers_taches (metier_id, tache_id, ordre) select m.id, t.id, 4 from metiers m, taches t
  where m.slug = $t$commerce-vente-en-ligne$t$ and t.code = $t$F46$t$
  on conflict (metier_id, tache_id) do update set ordre = excluded.ordre;

insert into taches (code, titre, limite_connue) select $t$F47$t$, $t$Calculer son prix de vente et sa marge$t$, false
  where not exists (select 1 from taches where code = $t$F47$t$);
update taches set titre = $t$Calculer son prix de vente et sa marge$t$, resultat = $t$Le prix de revient, la marge et le prix plancher d'un article, avec chaque calcul expliqué. Le prix de revient est ce que l'article coûte vraiment, achat et frais compris. La marge est ce qui reste au vendeur une fois l'article et ses frais payés.$t$, etapes = $j$["Noter le prix d'achat et les frais : transport, emballage, livraison offerte, frais de retrait.", "Remplir le modèle et copier la consigne dans son IA.", "Saisir les mêmes chiffres dans le document « Prix et marge » et comparer. En cas d'écart, le tableau fait foi.", "Retenir le prix plancher : il sert dans la tâche F45."]$j$::jsonb, precisions = null
  where code = $t$F47$t$;
insert into metiers_taches (metier_id, tache_id, ordre) select m.id, t.id, 5 from metiers m, taches t
  where m.slug = $t$commerce-vente-en-ligne$t$ and t.code = $t$F47$t$
  on conflict (metier_id, tache_id) do update set ordre = excluded.ordre;

insert into taches (code, titre, limite_connue) select $t$F48$t$, $t$Tenir un cahier de caisse simple sur Google Sheets$t$, false
  where not exists (select 1 from taches where code = $t$F48$t$);
update taches set titre = $t$Tenir un cahier de caisse simple sur Google Sheets$t$, resultat = $t$Les opérations du jour rangées ligne par ligne dans le cahier de caisse, et deux soldes vérifiés, espèces et Mobile Money.$t$, etapes = $j$["Faire une copie du document « Cahier de caisse » et saisir le solde de départ.", "Le soir, écrire ou dicter les opérations du jour dans le modèle, comme elles viennent.", "Copier les lignes rangées par l'IA et les coller dans le cahier. Si le collage ne passe pas sur votre téléphone, saisissez directement dans le cahier et gardez l'IA pour le point du lundi.", "Faire le contrôle du soir : compter les espèces, ouvrir l'application de Mobile Money, comparer aux deux soldes.", "Le lundi, lancer la routine « Point des ventes du lundi »."]$j$::jsonb, precisions = null
  where code = $t$F48$t$;
insert into metiers_taches (metier_id, tache_id, ordre) select m.id, t.id, 6 from metiers m, taches t
  where m.slug = $t$commerce-vente-en-ligne$t$ and t.code = $t$F48$t$
  on conflict (metier_id, tache_id) do update set ordre = excluded.ordre;

insert into taches (code, titre, limite_connue) select $t$F49$t$, $t$Écrire une publicité Facebook pour un petit budget$t$, false
  where not exists (select 1 from taches where code = $t$F49$t$);
update taches set titre = $t$Écrire une publicité Facebook pour un petit budget$t$, resultat = $t$Trois versions d'une publicité qui invite à écrire sur WhatsApp, et le message d'accueil que le client reçoit en arrivant. Ce type de publicité s'affiche sur Facebook et Instagram et ouvre une conversation WhatsApp quand on touche le bouton.$t$, etapes = $j$["Choisir un seul article ou une seule offre, et une photo nette.", "Remplir le modèle pour obtenir trois versions du texte.", "Créer la publicité depuis sa page Facebook, avec l'objectif de recevoir des messages sur WhatsApp, sa ville comme zone, un budget par jour et une durée. Meta recommande au moins 7 jours.", "Lancer deux versions qui se partagent le budget du jour, puis garder celle qui amène le plus de messages.", "Répondre vite aux messages, et noter dans le cahier les ventes venues de la publicité."]$j$::jsonb, precisions = $t$Le paiement à Meta se fait par carte Visa ou Mastercard, y compris prépayée ; les moyens proposés dépendent du pays et s'affichent dans le compte publicitaire. Le budget des cas, 3 000 FCFA par jour, est le minimum recommandé par l'équipe d'AIW ; ce n'est pas un tarif de Meta. Sans carte, la publicité payante n'est pas possible : les textes servent alors de publications ordinaires sur la page.$t$
  where code = $t$F49$t$;
insert into metiers_taches (metier_id, tache_id, ordre) select m.id, t.id, 7 from metiers m, taches t
  where m.slug = $t$commerce-vente-en-ligne$t$ and t.code = $t$F49$t$
  on conflict (metier_id, tache_id) do update set ordre = excluded.ordre;

insert into taches (code, titre, limite_connue) select $t$F50$t$, $t$Transformer les avis clients en messages de confiance$t$, false
  where not exists (select 1 from taches where code = $t$F50$t$);
update taches set titre = $t$Transformer les avis clients en messages de confiance$t$, resultat = $t$De vrais avis de clients, remis au propre sans en changer le sens, en trois formats (statut WhatsApp, publication Facebook, réponse à un client qui hésite), et le message qui demande l'accord du client.$t$, etapes = $j$["Rassembler les vrais messages de clients satisfaits.", "Demander à chaque client son accord pour la publication. Le modèle rédige ce message quand l'accord est « pas encore ».", "Remplir le modèle avec l'avis mot pour mot, sans nom ni numéro.", "Vérifier que l'IA n'a ajouté aucun compliment.", "Publier avec le prénom seul ou une formule comme « une cliente de Douala »."]$j$::jsonb, precisions = null
  where code = $t$F50$t$;
insert into metiers_taches (metier_id, tache_id, ordre) select m.id, t.id, 8 from metiers m, taches t
  where m.slug = $t$commerce-vente-en-ligne$t$ and t.code = $t$F50$t$
  on conflict (metier_id, tache_id) do update set ordre = excluded.ordre;

-- 3. Les cas pratiques : deux par tâche
insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 1, '', '', '' from taches t
  where t.code = $t$F43$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 1);
update exercices set titre = $t$Chargée des ventes en ligne d'une marque de cosmétiques à Cotonou$t$, contexte = $t$Vous êtes chargée des ventes en ligne de Sènami Cosmétiques, 6 personnes, avec deux boutiques à Cadjèhoun et à Akpakpa. La gérante veut les articles les plus vendus dans le catalogue WhatsApp Business avant la fin du mois.$t$, donnees = $t$- Crème hydratante au karité, pot de 250 ml : 4 000 FCFA.
- Lait corporel, flacon de 500 ml : 3 500 FCFA.
- Huile pour cheveux, flacon de 100 ml : 2 750 FCFA.
- Livraison à moto dans Cotonou : 1 000 FCFA.
- Paiement : espèces en boutique, MTN MoMo, Moov Money ou Celtiis Cash.$t$, travail_a_faire = $t$Rédigez la fiche des trois articles, puis le message d'envoi de chacune. Signalez les informations qui manquent au lieu de les inventer.$t$, prenom = $t$Prisca$t$, lieu = $t$Cotonou, Bénin$t$, profil = $t$Structure, 6 personnes$t$, reponse_attendue = null
  where numero = 1 and tache_id in (select id from taches where code = $t$F43$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 2, '', '', '' from taches t
  where t.code = $t$F43$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 2);
update exercices set titre = $t$Vendeuse de perruques sur WhatsApp à Abidjan$t$, contexte = $t$Vous vendez seule des perruques depuis votre domicile, à Yopougon. Vos clientes vous écrivent après avoir vu vos statuts et posent chaque fois les mêmes questions. Vous voulez un catalogue qui réponde à votre place.$t$, donnees = $t$- Perruque lisse mi-longue, noire : 19 500 FCFA.
- Perruque bouclée courte, châtain : 15 500 FCFA.
- Livraison à moto dans Abidjan : 1 500 FCFA, le lendemain de la commande.
- Paiement : Wave ou Orange Money, avec la moitié en avance à la commande.$t$, travail_a_faire = $t$Rédigez la fiche des deux perruques, puis une réponse rapide à la question « C'est combien ? ». Une réponse rapide est un message enregistré dans WhatsApp Business, qu'on envoie en tapant un raccourci.$t$, prenom = $t$Aya$t$, lieu = $t$Abidjan, Côte d'Ivoire$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F43$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 1, '', '', '' from taches t
  where t.code = $t$F44$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 1);
update exercices set titre = $t$Chargé de la page d'une boutique de bazin à Bamako$t$, contexte = $t$Vous êtes chargé de la page Facebook et du compte WhatsApp Business de Bamako Bazin Prestige, une boutique de 12 personnes. La semaine prochaine, de nouveaux coloris arrivent, et c'est la fin du mois, quand les salaires tombent.$t$, donnees = $t$- Les nouveaux coloris sont en boutique à partir de mardi.
- La boutique est fermée le dimanche.
- Photos disponibles : la boutique, les rouleaux de bazin, une tenue cousue.
- Une cliente a envoyé un message de remerciement et accepte qu'il soit publié, sans son nom.
- Paiement : espèces ou Orange Money. Aucune promotion n'est prévue.$t$, travail_a_faire = $t$Préparez le programme des 7 jours, avec trois publications Facebook. N'annoncez ni prix ni réduction.$t$, prenom = $t$Oumar$t$, lieu = $t$Bamako, Mali$t$, profil = $t$Structure, 12 personnes$t$, reponse_attendue = null
  where numero = 1 and tache_id in (select id from taches where code = $t$F44$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 2, '', '', '' from taches t
  where t.code = $t$F44$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 2);
update exercices set titre = $t$Gérante d'une petite boutique de sacs à Lomé$t$, contexte = $t$Vous tenez seule Assiyéyé Mode, une boutique de sacs et de bijoux au quartier Bè. Vous publiez des statuts quand vous y pensez : trois le même jour, puis rien pendant une semaine.$t$, donnees = $t$- Cinq nouveaux sacs sont arrivés cette semaine.
- Les fêtes de fin d'année approchent.
- Vous livrez dans Lomé par oléyia (le taxi-moto, au Togo).
- Paiement : espèces, Mixx by Yas ou Flooz.
- Vous avez des photos de trois sacs sur cinq.$t$, travail_a_faire = $t$Préparez un statut par jour pendant 7 jours, et la liste des photos qui vous manquent.$t$, prenom = $t$Afi$t$, lieu = $t$Lomé, Togo$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F44$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 1, '', '', '' from taches t
  where t.code = $t$F45$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 1);
update exercices set titre = $t$Vendeur dans une boutique de téléphones à Dakar$t$, contexte = $t$Vous êtes vendeur chez Sandaga Mobile, une boutique de 8 personnes près du marché Sandaga. Un client vous écrit sur WhatsApp Business après avoir vu le catalogue.$t$, donnees = $t$- Téléphone Android affiché à 65 000 FCFA.
- Message du client : « Bonsoir. Le téléphone à 65 000 F, je le prends à 50 000. C'est mon dernier prix. »
- Le responsable vous autorise à descendre jusqu'à 60 000 FCFA.
- Vous pouvez offrir une coque et un verre de protection.
- Paiement : espèces en boutique, Wave ou Orange Money.$t$, travail_a_faire = $t$Préparez les trois réponses. Aucune ne passe sous 60 000 FCFA.$t$, prenom = $t$Modou$t$, lieu = $t$Dakar, Sénégal$t$, profil = $t$Structure, 8 personnes$t$, reponse_attendue = null
  where numero = 1 and tache_id in (select id from taches where code = $t$F45$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 2, '', '', '' from taches t
  where t.code = $t$F45$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 2);
update exercices set titre = $t$Vendeuse de sacs à main à Cotonou$t$, contexte = $t$Vous tenez, avec une vendeuse, une petite boutique de sacs au marché Missebo et vous vendez aussi sur WhatsApp. Une cliente s'intéresse à un sac noir.$t$, donnees = $t$- Sac affiché à 10 000 FCFA.
- Il vous revient à 7 000 FCFA : 6 500 FCFA à l'achat et 500 FCFA de transport.
- Votre prix plancher est de 8 500 FCFA. À la place d'une baisse, vous pouvez offrir un porte-clés.
- Message de la cliente : « Bonjour. C'est combien le dernier prix du sac noir ? À 7 000 je prends deux. »
- Livraison par zem (le taxi-moto, au Bénin) : 1 000 FCFA. Paiement par MTN MoMo.$t$, travail_a_faire = $t$Préparez les trois réponses, en tenant compte du fait qu'elle veut deux sacs.$t$, prenom = $t$Nadège$t$, lieu = $t$Cotonou, Bénin$t$, profil = $t$Individuelle, 2 personnes$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F45$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 1, '', '', '' from taches t
  where t.code = $t$F46$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 1);
update exercices set titre = $t$Responsable des commandes chez un traiteur à Dakar$t$, contexte = $t$Vous êtes responsable des commandes chez Thiossane Traiteur, 6 personnes, à Grand Yoff. Une entreprise a commandé des plats pour un séminaire et n'a pas réglé le solde.$t$, donnees = $t$- Commande : 40 plats à 2 500 FCFA, soit 100 000 FCFA.
- Avance reçue par Wave à la commande : 50 000 FCFA.
- Reste à payer : 50 000 FCFA, promis à la livraison, il y a dix jours.
- Une relance a déjà été envoyée, sans réponse.
- Votre contact est l'assistante de direction de l'entreprise.$t$, travail_a_faire = $t$Rédigez la relance précise, puis préparez la dernière relance, qui propose deux paiements de 25 000 FCFA.$t$, prenom = $t$Ibrahima$t$, lieu = $t$Dakar, Sénégal$t$, profil = $t$Structure, 6 personnes$t$, reponse_attendue = null
  where numero = 1 and tache_id in (select id from taches where code = $t$F46$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 2, '', '', '' from taches t
  where t.code = $t$F46$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 2);
update exercices set titre = $t$Vendeuse de cosmétiques sur WhatsApp à Abidjan$t$, contexte = $t$Vous vendez seule des produits cosmétiques depuis Marcory. Une cliente fidèle a pris trois crèmes en vente à crédit, c'est-à-dire payées en partie plus tard.$t$, donnees = $t$- Trois crèmes à 6 000 FCFA, soit 18 000 FCFA.
- Payé le jour même par Orange Money : 8 000 FCFA.
- Reste à payer : 10 000 FCFA, promis pour la fin du mois, passée depuis cinq jours.
- Aucune relance envoyée.
- Elle achète chez vous depuis longtemps et vous tenez à la garder.$t$, travail_a_faire = $t$Rédigez le rappel courtois, et la phrase qui demande la capture d'écran après le paiement.$t$, prenom = $t$Mariam$t$, lieu = $t$Abidjan, Côte d'Ivoire$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F46$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 1, '', '', '' from taches t
  where t.code = $t$F47$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 1);
update exercices set titre = $t$Gérante adjointe d'une boutique de pagnes à Cotonou$t$, contexte = $t$Vous êtes gérante adjointe de Maison Adjoké, une boutique de 7 personnes à Ganhi. Un nouveau lot de pagnes vient d'arriver et la gérante vous demande de vérifier le prix avant la mise en vente.$t$, donnees = $t$- Lot de 10 pagnes wax de 6 yards, achetés 7 000 FCFA pièce.
- Transport du lot depuis le marché Dantokpa : 500 FCFA en zem (le taxi-moto, au Bénin).
- Prix de vente prévu : 10 000 FCFA le pagne.
- La gérante veut garder au moins 2 500 FCFA de marge par pagne.
- Une vendeuse propose d'offrir la livraison, qui coûte 1 000 FCFA.$t$, travail_a_faire = $t$Calculez le prix de revient, la marge en FCFA et en pourcentage, et le prix plancher. Dites ensuite si la boutique peut offrir la livraison sans passer sous la marge voulue.$t$, prenom = $t$Rachidatou$t$, lieu = $t$Cotonou, Bénin$t$, profil = $t$Structure, 7 personnes$t$, reponse_attendue = $t$Prix de revient 7 050 FCFA, marge 2 950 FCFA soit 29,5 %, prix plancher 9 550 FCFA ; avec la livraison offerte, la marge tombe à 1 950 FCFA, sous les 2 500 FCFA voulus.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F47$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 2, '', '', '' from taches t
  where t.code = $t$F47$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 2);
update exercices set titre = $t$Vendeur de chaussures à Dakar$t$, contexte = $t$Vous vendez seul des chaussures à Colobane et sur WhatsApp. Vous pensez gagner 4 000 FCFA par paire, mais à la fin du mois il vous reste moins que prévu.$t$, donnees = $t$- Paire achetée 8 000 FCFA et revendue 12 000 FCFA.
- Vous offrez la livraison à moto : 1 500 FCFA par paire.
- Les clients paient par Wave. Vous n'avez jamais compté ce que vous coûtent les retraits.$t$, travail_a_faire = $t$Calculez ce que vous gagnez vraiment sur une paire, puis proposez trois façons de retrouver votre marge sans perdre vos clients. Dites aussi quel chiffre manque pour un calcul complet.$t$, prenom = $t$Cheikh$t$, lieu = $t$Dakar, Sénégal$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = $t$Prix de revient 9 500 FCFA, marge réelle 2 500 FCFA au lieu de 4 000 FCFA, soit environ 21 %, avant les frais de retrait, que le cas ne donne pas.$t$
  where numero = 2 and tache_id in (select id from taches where code = $t$F47$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 1, '', '', '' from taches t
  where t.code = $t$F48$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 1);
update exercices set titre = $t$Responsable d'une boutique de téléphones à Cotonou$t$, contexte = $t$Vous êtes responsable de boutique chez Tokpa Mobile, 5 personnes, près du marché Dantokpa. Le patron veut un cahier de caisse à jour chaque soir.$t$, donnees = $t$- Solde de départ : 20 000 FCFA en espèces, 35 000 FCFA sur MTN MoMo.
- Vente d'un téléphone Android : 55 000 FCFA en espèces.
- Vente d'un téléphone Android : 48 000 FCFA par MTN MoMo.
- Avance d'un client sur une commande : 20 000 FCFA par MTN MoMo.
- Zem (le taxi-moto, au Bénin) pour aller chercher un colis : 300 FCFA en espèces.
- Livraison d'un téléphone à moto : 1 500 FCFA en espèces.
- Forfait internet de la boutique : 500 FCFA par MTN MoMo.
- Le soir, vous comptez 73 000 FCFA dans la caisse.$t$, travail_a_faire = $t$Rangez les six opérations, calculez les deux soldes attendus, puis dites quoi noter pour l'écart constaté dans la caisse.$t$, prenom = $t$Gildas$t$, lieu = $t$Cotonou, Bénin$t$, profil = $t$Structure, 5 personnes$t$, reponse_attendue = $t$73 200 FCFA attendus en espèces et 102 500 FCFA sur MTN MoMo ; il manque 200 FCFA dans la caisse, à noter sur une ligne « Écart de caisse ».$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F48$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 2, '', '', '' from taches t
  where t.code = $t$F48$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 2);
update exercices set titre = $t$Vendeur de pagnes au marché d'Adjamé, à Abidjan$t$, contexte = $t$Vous vendez seul des pagnes au marché d'Adjamé. Jusqu'ici vous notiez tout dans un cahier papier, et vous ne savez jamais ce que la journée a vraiment rapporté.$t$, donnees = $t$- Solde de départ : 15 000 FCFA en espèces, 40 000 FCFA sur Wave.
- Deux pagnes vendus 21 500 FCFA chacun, en espèces.
- Un pagne vendu 14 000 FCFA par Wave.
- Avance de 10 000 FCFA reçue par Wave sur un pagne à 21 500 FCFA.
- Taxi collectif : 300 FCFA en espèces.
- Livraison à moto : 2 000 FCFA en espèces.
- Forfait internet : 1 000 FCFA en espèces.
- Vous avez pris 5 000 FCFA dans la caisse pour la maison.$t$, travail_a_faire = $t$Rangez les opérations dans les bonnes catégories, y compris l'avance et l'argent pris pour la maison, puis calculez les deux soldes attendus.$t$, prenom = $t$Konan$t$, lieu = $t$Abidjan, Côte d'Ivoire$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = $t$49 700 FCFA attendus en espèces et 64 000 FCFA sur Wave.$t$
  where numero = 2 and tache_id in (select id from taches where code = $t$F48$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 1, '', '', '' from taches t
  where t.code = $t$F49$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 1);
update exercices set titre = $t$Chargée de communication d'un atelier de couture à Dakar$t$, contexte = $t$Vous êtes chargée de communication chez Keur Coumba Couture, un atelier-boutique de 5 personnes à la Médina. La patronne veut plus de commandes avant les fêtes de fin d'année.$t$, donnees = $t$- Offre : couture d'une tenue sur mesure, 10 000 FCFA de main-d'œuvre, tissu non compris.
- Délai : 5 jours. L'atelier prend les commandes jusqu'au 15 décembre.
- Avance à la commande par Wave ou Orange Money.
- Zone : Dakar. Budget : 3 000 FCFA par jour pendant 7 jours, soit 21 000 FCFA.
- Photos : trois tenues cousues à l'atelier.$t$, travail_a_faire = $t$Rédigez les trois versions, le message d'accueil WhatsApp, et dites laquelle tester en premier.$t$, prenom = $t$Aïssatou$t$, lieu = $t$Dakar, Sénégal$t$, profil = $t$Structure, 5 personnes$t$, reponse_attendue = null
  where numero = 1 and tache_id in (select id from taches where code = $t$F49$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 2, '', '', '' from taches t
  where t.code = $t$F49$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 2);
update exercices set titre = $t$Vendeur de chaussures sur Facebook et WhatsApp à Abidjan$t$, contexte = $t$Vous vendez seul des chaussures depuis Abobo. Vos statuts ne touchent que vos contacts, et vous voulez de nouveaux clients.$t$, donnees = $t$- Paire de chaussures pour homme à 15 000 FCFA, pointures 40 à 45. Vos clients : surtout des hommes de 20 à 40 ans.
- Livraison à moto dans Abidjan : 1 500 FCFA. Paiement à la livraison, en espèces ou par Wave.
- Budget : 3 000 FCFA par jour pendant 7 jours, soit 21 000 FCFA.
- Une photo nette de la paire, sur fond clair.$t$, travail_a_faire = $t$Rédigez les trois versions. Chacune dit le prix, la livraison et comment commander. Ajoutez la réponse rapide à envoyer quand un client écrit « Je veux commander ».$t$, prenom = $t$Serge$t$, lieu = $t$Abidjan, Côte d'Ivoire$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F49$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 1, '', '', '' from taches t
  where t.code = $t$F50$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 1);
update exercices set titre = $t$Responsable commercial d'une pâtisserie à Douala$t$, contexte = $t$Vous êtes responsable commercial de Bonapriso Délices, une pâtisserie de 9 personnes. Vous avez reçu trois messages sur WhatsApp Business après des commandes de gâteaux.$t$, donnees = $t$- « Bonsoir, le gâteau était très bon, tout le monde a apprécié. Merci pour la livraison à l'heure. »
- « Merci beaucoup, ma fille était contente de son gâteau d'anniversaire. »
- « Bien reçu. Le gâteau était joli mais un peu trop sucré pour moi. »
- Les deux premières clientes ont donné leur accord. Vous n'avez rien demandé à la troisième.$t$, travail_a_faire = $t$Mettez en forme les deux avis autorisés, dans les trois formats. Dites ensuite quoi répondre, en privé, à la troisième cliente.$t$, prenom = $t$Brice$t$, lieu = $t$Douala, Cameroun$t$, profil = $t$Structure, 9 personnes$t$, reponse_attendue = null
  where numero = 1 and tache_id in (select id from taches where code = $t$F50$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 2, '', '', '' from taches t
  where t.code = $t$F50$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 2);
update exercices set titre = $t$Patronne d'un atelier de pagnes tissés à Ouagadougou$t$, contexte = $t$Vous tenez Faso Dan Fani Création Kadi, un atelier-boutique de 3 personnes. Une cliente qui vit à l'étranger a commandé trois pagnes pour sa sœur, livrés à Bobo-Dioulasso par une compagnie de transport.$t$, donnees = $t$- Son message : « Bonjour. Ma sœur a bien reçu le colis. Les pagnes sont encore plus beaux que sur les photos. Merci pour le sérieux. »
- Elle accepte la publication, avec son prénom seulement.
- C'est votre seul avis écrit. Vous êtes tentée d'en rédiger deux autres vous-même.$t$, travail_a_faire = $t$Mettez cet avis en forme dans les trois formats. Rédigez ensuite le message qui demande un avis à vos cinq dernières clientes, plutôt que d'en inventer.$t$, prenom = $t$Salimata$t$, lieu = $t$Ouagadougou, Burkina Faso$t$, profil = $t$Individuelle, 3 personnes$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F50$t$);

-- 4. Les modèles à remplir, leurs champs et la note par IA
insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Rédiger des fiches produits et un catalogue WhatsApp Business$t$, $t$Rôle : Vous rédigez des fiches produits pour le catalogue WhatsApp Business d'une boutique.

Contexte : Je vends {{article}}. Détails : {{details}}. Prix : {{prix}} FCFA. Livraison et paiement : {{livraison_paiement}}. Mes clients : {{clients}}.

Travail demandé :
1. Un nom d'article de 60 caractères au plus.
2. Une description de 5 à 7 lignes courtes : à quoi sert l'article, ses détails, la livraison, le paiement, comment commander.
3. Un code d'article court.
4. Un message de 2 à 3 lignes pour envoyer la fiche à un client, avec une salutation.

Format : texte simple, sans astérisque, prêt à coller dans WhatsApp Business.

Règle : n'inventez aucune caractéristique, aucun avis et aucune promotion. S'il vous manque une information, posez-moi une question avant d'écrire.$t$, 1, null, 1, '2026-10-03' from taches t
  where t.code = $t$F43$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$article$t$, $t$Quel article vendez-vous ?$t$, $t$texte$t$, null::jsonb, $t$une crème hydratante au karité$t$, true, 1),
    ($t$details$t$, $t$Quels sont ses détails ?$t$, $t$texte$t$, null::jsonb, $t$pot de 250 ml, pour le corps$t$, true, 2),
    ($t$prix$t$, $t$Quel est son prix ?$t$, $t$nombre$t$, null::jsonb, $t$4 000$t$, true, 3),
    ($t$livraison_paiement$t$, $t$Comment livrez-vous et comment vous paie-t-on ?$t$, $t$texte$t$, null::jsonb, $t$livraison à moto dans Cotonou à 1 000 FCFA, paiement en espèces ou par MTN MoMo$t$, true, 4),
    ($t$clients$t$, $t$Qui achète cet article ?$t$, $t$texte$t$, null::jsonb, $t$des femmes de 20 à 45 ans, à Cotonou$t$, true, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F43$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Préparer les statuts WhatsApp et publications de la semaine$t$, $t$Rôle : Vous préparez les publications d'une boutique pour une semaine.

Contexte : Ma boutique : {{boutique}}. Articles à mettre en avant : {{articles}}. Actualité de la semaine : {{actualite}}. Offre en cours : {{offre}}. Photos et vidéos dont je dispose : {{photos}}.

Travail demandé : Préparez un programme du lundi au dimanche. Pour chaque jour, donnez le type de publication (produit, coulisses, avis d'un client, conseil, offre ou question), le texte du statut WhatsApp en 2 lignes au plus et la photo à prendre. Pour 3 jours, ajoutez une version Facebook de 3 à 4 lignes.

Format : une liste, jour par jour, prête à copier.

Règle : une seule idée par statut. N'inventez ni promotion, ni stock, ni avis de client. Si l'offre en cours est « aucune », ne proposez aucune réduction.$t$, 2, null, 1, '2026-10-03' from taches t
  where t.code = $t$F44$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$boutique$t$, $t$Que vendez-vous et où ?$t$, $t$texte$t$, null::jsonb, $t$une boutique de sacs et de bijoux à Lomé, quartier Bè$t$, true, 1),
    ($t$articles$t$, $t$Quels articles voulez-vous montrer ?$t$, $t$texte$t$, null::jsonb, $t$cinq nouveaux sacs à main$t$, true, 2),
    ($t$actualite$t$, $t$Que se passe-t-il cette semaine ?$t$, $t$texte$t$, null::jsonb, $t$les fêtes de fin d'année approchent$t$, true, 3),
    ($t$offre$t$, $t$Avez-vous une offre en cours ?$t$, $t$texte$t$, null::jsonb, $t$aucune$t$, true, 4),
    ($t$photos$t$, $t$De quelles photos disposez-vous ?$t$, $t$texte$t$, null::jsonb, $t$les photos de trois sacs$t$, false, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F44$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Répondre aux clients qui négocient, sans perdre la vente$t$, $t$Rôle : Vous aidez un vendeur à répondre à un client qui négocie, avec politesse et sans perdre d'argent.

Contexte : Article : {{article}}. Prix affiché : {{prix_affiche}} FCFA. Mon prix plancher, sous lequel je ne descends jamais : {{prix_plancher}} FCFA. Ce que je peux offrir à la place d'une baisse : {{avantages}}. Message du client : « {{message_client}} »

Travail demandé : Rédigez trois réponses au choix.
1. Tenir le prix, en disant ce qui le justifie.
2. Garder le prix et ajouter un avantage.
3. Proposer un dernier prix, entre le prix affiché et le prix plancher, lié à une condition.

Format : trois messages de 3 lignes au plus, prêts à coller dans WhatsApp. Chacun commence par une salutation et finit par une question qui fait avancer la vente.

Règle : ne proposez jamais un prix sous le prix plancher. N'inventez ni urgence ni rupture de stock.$t$, 2, null, 1, '2026-10-03' from taches t
  where t.code = $t$F45$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$article$t$, $t$De quel article s'agit-il ?$t$, $t$texte$t$, null::jsonb, $t$un sac à main noir$t$, true, 1),
    ($t$prix_affiche$t$, $t$Quel est le prix affiché ?$t$, $t$nombre$t$, null::jsonb, $t$10 000$t$, true, 2),
    ($t$prix_plancher$t$, $t$Sous quel prix ne descendez-vous jamais ?$t$, $t$nombre$t$, null::jsonb, $t$8 500$t$, true, 3),
    ($t$avantages$t$, $t$Que pouvez-vous offrir à la place d'une baisse ?$t$, $t$texte$t$, null::jsonb, $t$un porte-clés offert$t$, true, 4),
    ($t$message_client$t$, $t$Qu'a écrit le client ?$t$, $t$long$t$, null::jsonb, $t$Bonjour. C'est combien le dernier prix du sac noir ? À 7 000 je prends deux.$t$, true, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F45$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Relancer poliment un client qui n'a pas payé par Mobile Money$t$, $t$Rôle : Vous rédigez des messages de relance polis pour un vendeur qui attend un paiement.

Contexte : J'ai vendu {{vente}}. Il reste à payer {{reste}} FCFA. Le paiement était prévu {{date_promise}}. Moyen de paiement : {{moyen}}. Relances déjà envoyées : {{relances}}. Ma relation avec ce client : {{relation}}.

Travail demandé : Rédigez le message de relance adapté.
- Aucune relance envoyée : un rappel courtois, qui suppose un oubli.
- Une relance envoyée : une relance précise, qui demande une date de paiement.
- Deux relances ou plus : une dernière relance, ferme et respectueuse, qui propose de payer en deux fois.

Format : un message de 4 lignes au plus, prêt à coller dans WhatsApp. Écrivez [Prénom] à la place du prénom du client.

Règle : vouvoyez le client. Salutation au début, remerciement à la fin. Jamais de menace ni de reproche. Rappelez le montant et le moyen de paiement, et demandez la capture d'écran après le paiement.$t$, 2, null, 1, '2026-10-03' from taches t
  where t.code = $t$F46$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$vente$t$, $t$Qu'avez-vous vendu ?$t$, $t$texte$t$, null::jsonb, $t$trois crèmes$t$, true, 1),
    ($t$reste$t$, $t$Combien reste-t-il à payer ?$t$, $t$nombre$t$, null::jsonb, $t$10 000$t$, true, 2),
    ($t$date_promise$t$, $t$Quand le paiement était-il prévu ?$t$, $t$texte$t$, null::jsonb, $t$à la fin du mois, il y a cinq jours$t$, true, 3),
    ($t$moyen$t$, $t$Par quel moyen le client paie-t-il ?$t$, $t$texte$t$, null::jsonb, $t$Orange Money$t$, true, 4),
    ($t$relances$t$, $t$Combien de relances avez-vous déjà envoyées ?$t$, $t$texte$t$, null::jsonb, $t$aucune$t$, true, 5),
    ($t$relation$t$, $t$Quelle est votre relation avec ce client ?$t$, $t$texte$t$, null::jsonb, $t$une cliente fidèle, que je veux garder$t$, false, 6)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F46$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Calculer son prix de vente et sa marge$t$, $t$Rôle : Vous aidez un commerçant à calculer son prix de vente et sa marge, et vous expliquez chaque calcul en mots simples.

Contexte : Article : {{article}}. Prix d'achat à l'unité : {{prix_achat}} FCFA. Frais par article (transport, emballage, livraison offerte, frais de retrait) : {{frais}} FCFA. Prix de vente prévu : {{prix_vente}} FCFA. Marge minimale que je veux garder : {{marge_minimale}} FCFA.

Travail demandé :
1. Le prix de revient : prix d'achat plus frais.
2. La marge en FCFA, et en pourcentage du prix de vente.
3. Le prix plancher : prix de revient plus marge minimale.
4. Un avis en 2 phrases : mon prix de vente tient-il, et sinon que changer ?

Format : un petit tableau, puis l'avis. Montrez chaque calcul.

Règle : utilisez seulement mes chiffres. S'il en manque un, demandez-le. Ne proposez aucun prix « du marché » que je ne vous ai pas donné.$t$, 1, $t$Une IA peut se tromper dans un calcul. Vérifiez avec votre tableau.$t$, 1, '2026-10-03' from taches t
  where t.code = $t$F47$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$article$t$, $t$Quel article ?$t$, $t$texte$t$, null::jsonb, $t$un pagne wax de 6 yards$t$, true, 1),
    ($t$prix_achat$t$, $t$Combien l'achetez-vous, à l'unité ?$t$, $t$nombre$t$, null::jsonb, $t$7 000$t$, true, 2),
    ($t$frais$t$, $t$Quels frais avez-vous par article ?$t$, $t$nombre$t$, null::jsonb, $t$50$t$, true, 3),
    ($t$prix_vente$t$, $t$À combien pensez-vous le vendre ?$t$, $t$nombre$t$, null::jsonb, $t$10 000$t$, true, 4),
    ($t$marge_minimale$t$, $t$Combien voulez-vous garder au minimum ?$t$, $t$nombre$t$, null::jsonb, $t$2 500$t$, true, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F47$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Tenir un cahier de caisse simple sur Google Sheets$t$, $t$Rôle : Vous aidez un commerçant à tenir son cahier de caisse. Vous rangez ses opérations, vous n'en inventez aucune.

Contexte : Date : {{date}}. Solde de départ en espèces : {{solde_especes}} FCFA. Solde de départ en Mobile Money : {{solde_mobile_money}} FCFA. Mes opérations de la journée, comme elles viennent : {{operations}}

Travail demandé :
1. Rangez chaque opération sur une ligne : date, libellé, catégorie, entrée, sortie, moyen (Espèces ou Mobile Money).
2. Catégories possibles : Vente, Avance reçue, Achat de marchandise, Transport et livraison, Loyer, Connexion et crédit téléphonique, Salaire, Pris pour la maison, Dépôt ou retrait de Mobile Money, Écart de caisse, Autre.
3. Calculez le solde attendu en espèces et le solde attendu en Mobile Money, en montrant le calcul.
4. Signalez toute opération floue : montant manquant, moyen de paiement non précisé.

Format : un tableau à six colonnes, que je pourrai copier dans Google Sheets, puis les deux soldes.

Règle : n'ajoutez aucune opération. Si un montant manque, demandez-le. Quand j'écris une quantité et un prix, le prix est celui d'un seul article : multipliez, et montrez le calcul.$t$, 2, $t$Une IA peut se tromper dans un calcul. Vérifiez avec votre tableau.$t$, 1, '2026-10-03' from taches t
  where t.code = $t$F48$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$date$t$, $t$Quel jour ?$t$, $t$texte$t$, null::jsonb, $t$lundi 5 octobre 2026$t$, true, 1),
    ($t$solde_especes$t$, $t$Combien aviez-vous en caisse ce matin ?$t$, $t$nombre$t$, null::jsonb, $t$15 000$t$, true, 2),
    ($t$solde_mobile_money$t$, $t$Combien aviez-vous sur votre compte Mobile Money ce matin ?$t$, $t$nombre$t$, null::jsonb, $t$40 000$t$, true, 3),
    ($t$operations$t$, $t$Qu'avez-vous reçu et dépensé aujourd'hui ?$t$, $t$long$t$, null::jsonb, $t$2 pagnes à 21 500 FCFA l'un en espèces, 1 pagne à 14 000 FCFA par Wave, avance de 10 000 FCFA reçue par Wave, taxi 300 FCFA en espèces, livraison 2 000 FCFA en espèces, forfait internet 1 000 FCFA en espèces, 5 000 FCFA pris dans la caisse pour la maison$t$, true, 4)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F48$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Écrire une publicité Facebook pour un petit budget$t$, $t$Rôle : Vous rédigez des publicités Facebook pour une petite boutique qui veut recevoir des messages sur WhatsApp.

Contexte : Je fais la publicité de {{produit}}. Prix : {{prix}} FCFA. Ce qui la rend intéressante : {{atouts}}. Mes clients : {{clients}}. Livraison et paiement : {{livraison_paiement}}. Budget : {{budget}}.

Travail demandé :
1. Trois versions de la publicité. Pour chacune : un texte principal de 3 lignes au plus, dont la première phrase dit l'essentiel, et un titre de 30 caractères au plus.
2. Le message d'accueil que le client verra en ouvrant WhatsApp.
3. La version à tester en premier, et pourquoi, en une phrase.

Format : texte simple, prêt à coller. Chaque version finit par une invitation à écrire sur WhatsApp.

Règle : n'inventez ni réduction, ni stock limité, ni avis. Pas de promesse de résultat, pas de comparaison avant et après, pas de phrase qui pointe un défaut du lecteur.$t$, 2, null, 1, '2026-10-03' from taches t
  where t.code = $t$F49$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$produit$t$, $t$De quoi faites-vous la publicité ?$t$, $t$texte$t$, null::jsonb, $t$une paire de chaussures pour homme$t$, true, 1),
    ($t$prix$t$, $t$À quel prix ?$t$, $t$nombre$t$, null::jsonb, $t$15 000$t$, true, 2),
    ($t$atouts$t$, $t$Qu'est-ce qui la rend intéressante ?$t$, $t$texte$t$, null::jsonb, $t$pointures 40 à 45, paiement à la livraison$t$, true, 3),
    ($t$clients$t$, $t$Qui voulez-vous toucher ?$t$, $t$texte$t$, null::jsonb, $t$des hommes de 20 à 40 ans, à Abidjan$t$, true, 4),
    ($t$livraison_paiement$t$, $t$Comment livrez-vous et comment vous paie-t-on ?$t$, $t$texte$t$, null::jsonb, $t$livraison à moto à 1 500 FCFA, paiement à la livraison en espèces ou par Wave$t$, true, 5),
    ($t$budget$t$, $t$Quel budget prévoyez-vous ?$t$, $t$texte$t$, null::jsonb, $t$3 000 FCFA par jour pendant 7 jours$t$, true, 6)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F49$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Transformer les avis clients en messages de confiance$t$, $t$Rôle : Vous aidez une boutique à mettre en valeur de vrais avis de clients, sans rien inventer.

Contexte : Ma boutique : {{boutique}}. Avis reçu, mot pour mot : « {{avis}} » Le client a donné son accord pour la publication : {{accord}}. Comment je peux le citer : {{signature}}.

Travail demandé :
1. Corrigez l'orthographe de l'avis sans en changer le sens ni ajouter de compliment.
2. Donnez trois formats : un statut WhatsApp de 2 lignes, une publication Facebook de 3 à 4 lignes, et une réponse à un client qui hésite.
3. Si l'accord est « non » ou « pas encore », ne rédigez aucune publication : écrivez seulement le message qui demande l'accord au client.

Format : texte simple, prêt à coller. L'avis reste entre guillemets.

Règle : n'inventez aucun avis, aucune note, aucun chiffre. N'écrivez ni nom complet ni numéro.$t$, 1, null, 1, '2026-10-03' from taches t
  where t.code = $t$F50$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$boutique$t$, $t$Que vendez-vous et où ?$t$, $t$texte$t$, null::jsonb, $t$une pâtisserie à Douala$t$, true, 1),
    ($t$avis$t$, $t$Qu'a écrit le client, mot pour mot ?$t$, $t$long$t$, null::jsonb, $t$Bonsoir, le gâteau était très bon, tout le monde a apprécié. Merci pour la livraison à l'heure.$t$, true, 2),
    ($t$accord$t$, $t$Le client est-il d'accord pour la publication ?$t$, $t$choix$t$, $j$["oui", "pas encore", "non"]$j$::jsonb, $t$oui$t$, true, 3),
    ($t$signature$t$, $t$Comment pouvez-vous le citer ?$t$, $t$texte$t$, null::jsonb, $t$une cliente de Douala$t$, true, 4)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F50$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

-- La note par IA : la même pour les 8 modèles
insert into conseils_ia (modele_id, ia, conseil) select mp.id, v.ia, v.conseil
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$chatgpt$t$, $t$Ouvrez la conversation dans votre projet « Ma boutique », pour que vos instructions s'appliquent. Si la skill de la tâche est installée, ChatGPT s'en sert seul.$t$),
    ($t$claude$t$, $t$Ouvrez la conversation dans votre projet « Ma boutique ». Si la skill est installée, Claude s'en sert seul.$t$),
    ($t$gemini$t$, $t$Ouvrez le Gem de la tâche quand il y en a un, sinon collez la consigne dans le Gem « Assistant de ma boutique ».$t$),
    ($t$meta_ai$t$, $t$Collez d'abord « Assistant de ma boutique », puis la consigne.$t$),
    ($t$copilot$t$, $t$Collez d'abord « Assistant de ma boutique », puis la consigne.$t$)
  ) as v(ia, conseil)
  where t.code in ($t$F43$t$, $t$F44$t$, $t$F45$t$, $t$F46$t$, $t$F47$t$, $t$F48$t$, $t$F49$t$, $t$F50$t$)
  on conflict (modele_id, ia) do update set conseil = excluded.conseil;

-- 5. Les ressources
insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-boutique-chatgpt$t$, $t$configuration$t$, $t$Assistant de ma boutique$t$, $t$Vous le complétez une fois avec les informations de votre boutique : ensuite, l'IA connaît votre boutique à chaque conversation.$t$, $t$chatgpt$t$, $t$Vous êtes l'assistant de ma boutique. Vous m'aidez à vendre, à répondre aux clients et à tenir mes comptes.

MA BOUTIQUE
Nom et activité : [nom], [ce que je vends]
Lieu : [quartier, ville, pays]
Mes clients : [qui achète chez moi]
Mes prix : de [prix le plus bas] à [prix le plus haut] FCFA
Paiement : [espèces, Mobile Money accepté, avance demandée ou non]
Livraison : [zones, frais, délai]
Horaires : [jours et heures]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez mes clients.
2. Un message à un client commence par « Bonjour » ou « Bonsoir » et reste poli, même pour refuser.
3. Montants écrits ainsi : 25 000 FCFA.
4. Textes prêts à coller dans WhatsApp : ni titre, ni astérisque, peu d'émojis.
5. N'inventez jamais un prix, une promotion, un stock, un délai ou un avis. S'il manque une information, posez-moi une seule question.
6. Pour un message, proposez 2 versions : une courte, une plus chaleureuse.
7. Ne demandez jamais le nom complet ni le numéro d'un client.
8. Impôts, factures officielles, droit : renvoyez-moi vers mon comptable ou l'administration.$t$, $j${"chatgpt": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre boutique.", "Dans ChatGPT, choisissez un projet, puis Nouveau projet. Donnez-lui le nom « Ma boutique », puis Créer un projet.", "Ouvrez le menu « … » du projet, puis Paramètres du projet. Collez le texte dans le champ Instructions, puis Enregistrer."], "gratuit": "Oui. Les projets sont disponibles sur un compte gratuit, avec 5 fichiers par projet.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Autre possibilité : Paramètres, Personnalisation, Instructions personnalisées. Le texte s'applique alors à toutes vos conversations, dans la limite de 1 500 caractères.", "Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-03')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-boutique-claude$t$, $t$configuration$t$, $t$Assistant de ma boutique$t$, $t$Vous le complétez une fois avec les informations de votre boutique : ensuite, l'IA connaît votre boutique à chaque conversation.$t$, $t$claude$t$, $t$Vous êtes l'assistant de ma boutique. Vous m'aidez à vendre, à répondre aux clients et à tenir mes comptes.

MA BOUTIQUE
Nom et activité : [nom], [ce que je vends]
Lieu : [quartier, ville, pays]
Mes clients : [qui achète chez moi]
Mes prix : de [prix le plus bas] à [prix le plus haut] FCFA
Paiement : [espèces, Mobile Money accepté, avance demandée ou non]
Livraison : [zones, frais, délai]
Horaires : [jours et heures]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez mes clients.
2. Un message à un client commence par « Bonjour » ou « Bonsoir » et reste poli, même pour refuser.
3. Montants écrits ainsi : 25 000 FCFA.
4. Textes prêts à coller dans WhatsApp : ni titre, ni astérisque, peu d'émojis.
5. N'inventez jamais un prix, une promotion, un stock, un délai ou un avis. S'il manque une information, posez-moi une seule question.
6. Pour un message, proposez 2 versions : une courte, une plus chaleureuse.
7. Ne demandez jamais le nom complet ni le numéro d'un client.
8. Impôts, factures officielles, droit : renvoyez-moi vers mon comptable ou l'administration.$t$, $j${"claude": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre boutique.", "Dans Claude, ouvrez Projets, puis Nouveau projet. Donnez-lui le nom « Ma boutique », puis Créer un projet.", "Dans le projet, ouvrez Instructions, puis Ajouter. Collez le texte, puis Enregistrer les instructions."], "gratuit": "Oui, dans la limite de 5 projets.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-03')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-boutique-gemini$t$, $t$configuration$t$, $t$Assistant de ma boutique$t$, $t$Vous le complétez une fois avec les informations de votre boutique : ensuite, l'IA connaît votre boutique à chaque conversation.$t$, $t$gemini$t$, $t$Vous êtes l'assistant de ma boutique. Vous m'aidez à vendre, à répondre aux clients et à tenir mes comptes.

MA BOUTIQUE
Nom et activité : [nom], [ce que je vends]
Lieu : [quartier, ville, pays]
Mes clients : [qui achète chez moi]
Mes prix : de [prix le plus bas] à [prix le plus haut] FCFA
Paiement : [espèces, Mobile Money accepté, avance demandée ou non]
Livraison : [zones, frais, délai]
Horaires : [jours et heures]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez mes clients.
2. Un message à un client commence par « Bonjour » ou « Bonsoir » et reste poli, même pour refuser.
3. Montants écrits ainsi : 25 000 FCFA.
4. Textes prêts à coller dans WhatsApp : ni titre, ni astérisque, peu d'émojis.
5. N'inventez jamais un prix, une promotion, un stock, un délai ou un avis. S'il manque une information, posez-moi une seule question.
6. Pour un message, proposez 2 versions : une courte, une plus chaleureuse.
7. Ne demandez jamais le nom complet ni le numéro d'un client.
8. Impôts, factures officielles, droit : renvoyez-moi vers mon comptable ou l'administration.$t$, $j${"gemini": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre boutique.", "Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez « Assistant de ma boutique ». Collez le texte dans Instructions, puis Enregistrer."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-03')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-fiches-produits$t$, $t$skill$t$, $t$Rédacteur de fiches produits$t$, $t$Rédige des fiches produits pour le catalogue WhatsApp Business d'une boutique.$t$, null, $t$---
name: fiches-produits
description: Rédige des fiches produits pour le catalogue WhatsApp Business d'une boutique. À utiliser dès que l'utilisateur décrit un article à vendre ou demande une description de produit.
---

# Rédacteur de fiches produits

Quand l'utilisateur décrit un article à vendre, rédigez sa fiche pour le catalogue WhatsApp Business.

## Avant d'écrire
Vérifiez que vous avez : ce qu'est l'article, ses détails (matière, taille, couleur, contenance), son prix en FCFA, la livraison et le paiement. S'il manque le prix ou un détail utile, posez une seule question.

## Ce que vous livrez
1. Nom de l'article : 60 caractères au plus. Le type d'article d'abord, puis le détail qui le distingue.
2. Description : 5 à 7 lignes courtes. Ligne 1 : à quoi sert l'article et pour qui. Ensuite : les détails, l'entretien ou le mode d'emploi s'il y en a un, la livraison, le paiement, comment commander.
3. Code de l'article : une proposition courte, par exemple SAC-014.
4. Message d'envoi : 2 à 3 lignes pour partager la fiche à un client, avec une salutation.

## Règles
- Texte simple, sans astérisque ni titre, prêt à coller. Vouvoyez le client.
- Montants écrits ainsi : 12 500 FCFA.
- Aucune caractéristique, aucun avis, aucune promotion inventés.
- Aucune promesse de résultat pour un produit de beauté ou de santé.
- Plusieurs articles : traitez-les un par un, dans l'ordre donné.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Ma boutique »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$fiches-produits.zip$t$, null, 1, '2026-10-03')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-reponses-negociation$t$, $t$skill$t$, $t$Réponses aux négociations$t$, $t$Prépare trois réponses polies à un client qui négocie un prix sur WhatsApp, sans descendre sous le prix plancher du vendeur.$t$, null, $t$---
name: reponses-negociation
description: Prépare trois réponses polies à un client qui négocie un prix sur WhatsApp, sans descendre sous le prix plancher du vendeur. À utiliser quand un client demande une réduction ou le dernier prix.
---

# Réponses aux négociations

Quand l'utilisateur colle le message d'un client qui négocie, préparez trois réponses au choix.

## Avant d'écrire
Il vous faut : l'article, le prix affiché, le prix plancher (le prix sous lequel le vendeur ne descend pas) et ce que le vendeur peut offrir à la place d'une baisse (livraison, petit cadeau, remise à partir de 2 articles). Si le prix plancher manque, demandez-le. Ne le devinez jamais.

## Les trois réponses
1. Tenir le prix : remerciez, puis dites en une phrase ce qui justifie le prix.
2. Donner sans baisser : le prix reste le même, avec un avantage (livraison offerte, cadeau, lot).
3. Dernier prix : un prix situé entre le prix affiché et le prix plancher, lié à une condition (paiement aujourd'hui, retrait en boutique, achat de 2 articles).

## Règles
- Chaque réponse commence par une salutation et tient en 3 lignes. Vouvoyez le client.
- Jamais de prix sous le prix plancher.
- Jamais de fausse urgence ni de faux stock.
- Chaque réponse finit par une question simple qui fait avancer la vente, par exemple : « Je vous le réserve ? »
- Si le client propose moins que le prix plancher : refus poli, et un article moins cher seulement si le vendeur en a cité un.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Ma boutique »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$reponses-negociation.zip$t$, null, 1, '2026-10-03')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-relance-paiement$t$, $t$skill$t$, $t$Relance de paiement$t$, $t$Rédige des relances polies, en trois niveaux, pour un client qui n'a pas fini de payer.$t$, null, $t$---
name: relance-paiement
description: Rédige des relances polies, en trois niveaux, pour un client qui n'a pas fini de payer. À utiliser quand l'utilisateur parle d'un impayé, d'un reste à payer ou d'une vente à crédit.
---

# Relance de paiement

Quand l'utilisateur décrit un paiement en retard, rédigez le message de relance adapté.

## Avant d'écrire
Il vous faut : ce qui a été vendu, le montant qui reste à payer, la date convenue, le moyen de paiement accepté et le nombre de relances déjà envoyées. S'il manque le montant ou la date, posez une seule question.

## Les trois niveaux
1. Rappel courtois (premier message) : on suppose un oubli. Montant, moyen de paiement, remerciement.
2. Relance précise (après une semaine sans réponse) : rappel de la date convenue, demande d'une date de paiement.
3. Dernière relance (après deux relances) : ton ferme et respectueux, proposition de payer en deux fois avec deux dates.

## Règles
- Salutation au début, remerciement à la fin. 4 lignes au plus. Vouvoyez le client.
- Jamais de menace, jamais d'humiliation, jamais de message dans un groupe ou en statut.
- Rappelez toujours le montant en FCFA et le moyen de paiement.
- Demandez la capture d'écran ou le SMS de confirmation après le paiement.
- N'écrivez ni nom complet ni numéro : mettez [Prénom] à la place.
- Aucun conseil juridique.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Ma boutique »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$relance-paiement.zip$t$, null, 1, '2026-10-03')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-statuts-de-la-semaine$t$, $t$skill$t$, $t$Statuts de la semaine$t$, $t$Prépare 7 jours de statuts WhatsApp et de publications Facebook pour une boutique, à partir des produits et de l'actualité de la semaine.$t$, null, $t$---
name: statuts-de-la-semaine
description: Prépare 7 jours de statuts WhatsApp et de publications Facebook pour une boutique, à partir des produits et de l'actualité de la semaine. À utiliser pour planifier les publications.
---

# Statuts de la semaine

Quand l'utilisateur veut préparer ses publications, proposez un programme de 7 jours.

## Avant d'écrire
Il vous faut : les articles à mettre en avant, l'offre de la semaine s'il y en a une vraie, l'événement de la semaine (fin du mois, rentrée, fête) et les photos dont le vendeur dispose.

## Ce que vous livrez
Un programme du lundi au dimanche. Pour chaque jour :
- le type de publication : produit, coulisses, avis d'un client, conseil, offre ou question ;
- le texte du statut WhatsApp : 2 lignes au plus ;
- la photo ou la courte vidéo à prendre ;
- pour 3 jours sur 7, une version Facebook de 3 à 4 lignes.

## Règles
- Une seule idée par statut, et une action simple à la fin, par exemple : « Écrivez-moi INFO ». Vouvoyez le lecteur.
- Pas plus de 2 jours de suite sur le même type de publication.
- Un avis de client seulement s'il est vrai et si le client a donné son accord.
- Aucune promotion, aucun stock, aucun chiffre inventés.
- Privilégiez la photo à la longue vidéo : elle consomme moins de connexion.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Ma boutique »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$statuts-de-la-semaine.zip$t$, null, 1, '2026-10-03')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-cahier-de-caisse$t$, $t$document$t$, $t$Cahier de caisse$t$, $t$Le cahier de caisse note chaque entrée et chaque sortie d'argent, et sépare les espèces du Mobile Money.$t$, null, $t$La première ligne porte le solde de départ, c'est-à-dire l'argent présent au moment où vous commencez le cahier.
Un second onglet, « Mois », additionne seul les entrées, les sorties, le résultat et le total de chaque catégorie.
Le contrôle du soir tient en deux gestes : compter les espèces et les comparer au solde espèces, puis comparer le solde Mobile Money à celui de l'application de l'opérateur. Un écart se note sur une ligne « Écart de caisse ».
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$cahier-de-caisse.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/14UaHmXKO96d9i16nDcti9lshNw6sxKQDDfMYN2caguU/copy$t$, 1, '2026-10-03')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-prix-et-marge$t$, $t$document$t$, $t$Prix et marge$t$, $t$Ce tableau donne, article par article, ce que l'article coûte vraiment, ce qu'il rapporte et le prix sous lequel il ne faut pas descendre.$t$, null, $t$Vous saisissez le prix d'achat, les frais par article, le prix de vente et la marge minimale voulue. Le tableau calcule seul le prix de revient, la marge en FCFA et en %, et le prix plancher.
Un second onglet, « Frais du lot », répartit les frais d'un achat groupé : vous saisissez le total des frais et le nombre d'articles, le tableau donne les frais par article.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$prix-et-marge.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1UDDZhBiY0Lg3X9axhnLSRIeYYSUDxNPjAsoYJoPUEp8/copy$t$, 1, '2026-10-03')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-suivi-commandes-paiements$t$, $t$document$t$, $t$Suivi des commandes et des paiements$t$, $t$Ce tableau dit en un coup d'œil qui a commandé quoi, ce qui est livré et ce qui reste à payer. Il sert de base à la relance du vendredi.$t$, null, $t$Dans la colonne Client, écrivez le prénom ou une initiale, jamais le numéro.
Notez aussi le code de la commande dans le nom du contact WhatsApp, pour retrouver la conversation.
Le reste à payer se calcule seul : total moins avance.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$suivi-des-commandes-et-des-paiements.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/13Fa4c2zKIWy54KJH5a2sV0DZP0B0JgVbLENBKDQbuI4/copy$t$, 1, '2026-10-03')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-bon-de-commande-recu$t$, $t$document$t$, $t$Bon de commande et reçu$t$, $t$Ce document d'une page se remplit sur le téléphone et s'envoie en PDF sur WhatsApp.$t$, null, $t$Il contient : le nom de la boutique, le quartier et la ville, la date, le code de la commande, les articles avec quantité, prix unitaire et total, l'avance reçue, le reste à payer, le moyen de paiement, le lieu et les frais de livraison.
Le document porte la mention « Ce reçu n'est pas une facture normalisée ». Dans plusieurs pays, dont le Bénin, la Côte d'Ivoire, le Niger et le Burkina Faso, la facture officielle passe par un dispositif de l'État : ce reçu ne la remplace pas. Pour une facture officielle, adressez-vous à votre comptable.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$bon-de-commande-et-recu.docx$t$, $t$https://docs.google.com/document/d/1l_Gv23uQ6ELQxI3ljXnuPmfPIZLKv-CWuOTv7Kyk1xk/copy$t$, 1, '2026-10-03')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-point-ventes-lundi$t$, $t$routine$t$, $t$Point des ventes du lundi$t$, $t$Chaque lundi, l'IA vous rappelle de faire le point des ventes. Elle ne lit pas seule votre cahier de caisse : vous collez vos lignes, puis elle fait l'analyse. Les totaux qui font foi restent ceux de votre tableau.$t$, null, $t$Chaque lundi à 8 h, envoyez-moi ce message : « Bonjour. C'est lundi, faisons le point des ventes. Collez ici les lignes de la semaine de votre cahier de caisse : date, libellé, catégorie, entrée, sortie, moyen. »

Quand j'aurai collé mes lignes, répondez en 12 lignes au plus :
1. Total des entrées, total des sorties et résultat de la semaine, en FCFA.
2. Part des espèces et part du Mobile Money dans les entrées.
3. Les 3 libellés qui ont rapporté le plus.
4. Les sorties inhabituelles ou en hausse.
5. Deux actions simples pour la semaine qui commence.

Règles : calculez seulement à partir des lignes collées. Si une ligne est illisible ou incomplète, signalez-la au lieu de deviner. N'inventez aucun chiffre.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Ma boutique »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Ma boutique ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Ma boutique »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant de ma boutique »."]}}$j$::jsonb, null, null, 1, '2026-10-03')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-relance-impayes-vendredi$t$, $t$routine$t$, $t$Relance des impayés du vendredi$t$, $t$Chaque vendredi, l'IA vous rappelle de voir les paiements en attente. Vous collez les commandes non soldées de votre tableau de suivi, sans nom ni numéro, puis elle rédige les relances.$t$, null, $t$Chaque vendredi à 10 h, envoyez-moi ce message : « Bonjour. C'est vendredi, voyons les paiements en attente. Collez ici les commandes non soldées de votre tableau de suivi : code, article, reste à payer, date promise, relances déjà faites. Ne mettez ni nom ni numéro. »

Quand j'aurai collé mes lignes :
1. Classez les commandes de la plus ancienne à la plus récente.
2. Donnez le total qui reste à encaisser, en FCFA.
3. Pour chaque commande, rédigez le message de relance du bon niveau : rappel courtois s'il n'y a eu aucune relance, relance précise après une relance, dernière relance avec paiement en deux fois après deux relances.
4. Écrivez [Prénom] là où je mettrai le prénom du client.

Règles : salutation au début, remerciement à la fin, 4 lignes au plus par message. Jamais de menace. N'inventez aucun montant.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Ma boutique »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Ma boutique ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Ma boutique »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant de ma boutique »."]}}$j$::jsonb, null, null, 1, '2026-10-03')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

-- 6. Le kit : présentation, étapes d'installation, encadrés « À savoir », mots expliqués
insert into kits (metier_id, titre, presentation, etapes, prerequis, limites, a_savoir, mots, revu_le) select m.id, $t$Commerce et vente en ligne$t$, $t$Tout ce qu'il faut pour vendre, répondre à vos clients et tenir vos comptes avec une IA gratuite, sur un téléphone Android : une configuration, quatre skills, quatre documents, deux routines et huit tâches.$t$, $j$[{"numero": 1, "titre": "Configurer mon IA avec « Assistant de ma boutique »", "minutes": 5}, {"numero": 2, "titre": "Installer mes 3 premières skills : fiches produits, négociations, relance de paiement", "minutes": 10}, {"numero": 3, "titre": "Copier mes documents : cahier de caisse, prix et marge, suivi des commandes", "minutes": 5}]$j$::jsonb, $j$["Un téléphone Android avec une connexion, même limitée.", "WhatsApp Business, l'application gratuite de WhatsApp pour les vendeurs.", "Un compte Google et les applications gratuites Google Sheets et Google Docs, pour ouvrir les documents.", "Une IA gratuite au choix : ChatGPT, Claude ou Gemini."]$j$::jsonb, $j$["Il ne donne aucun conseil fiscal ou juridique. Pour une facture officielle ou un impôt, adressez-vous à votre comptable ou à votre administration.", "Il ne vous demande jamais de coller dans une IA le nom complet, le numéro ou l'adresse d'un client.", "Il ne promet aucun résultat chiffré."]$j$::jsonb, $j${"chatgpt": "OpenAI retire les GPT personnalisés le 11 décembre 2026 et les remplace par les plugins. Ce kit n'utilise donc aucun GPT personnalisé : votre configuration se colle dans un projet, et chaque skill s'ajoute dans la rubrique Plugins, onglet Skills, ou se colle au début de la conversation. Si vous avez déjà vos propres GPT, pensez à les convertir en plugins avant cette date.", "gemini": "Google remplace les Gems par les skills en novembre 2026. Vos Gems seront convertis automatiquement. Les étapes de ce kit seront mises à jour à ce moment-là, et vous serez prévenu dans l'application."}$j$::jsonb, $j$[{"mot": "Configuration", "phrase": "Un texte d'instructions que l'IA garde en mémoire, pour ne pas tout réexpliquer à chaque conversation."}, {"mot": "Instructions personnalisées", "phrase": "Le réglage de ChatGPT où l'on écrit ce que l'IA doit savoir et respecter dans toutes les conversations."}, {"mot": "Projet", "phrase": "Un dossier de conversations qui partagent les mêmes instructions."}, {"mot": "Skill", "phrase": "Une consigne enregistrée que l'IA applique quand le sujet s'y prête."}, {"mot": "Consigne, ou prompt", "phrase": "Le texte que l'on écrit à l'IA pour lui demander un travail."}, {"mot": "Modèle à remplir", "phrase": "Une consigne déjà rédigée, où il ne reste qu'à remplir quelques champs."}, {"mot": "Champ", "phrase": "Une case du formulaire, à remplir avec vos propres informations."}, {"mot": "Routine", "phrase": "Une demande qui revient à jour fixe."}, {"mot": "Tâche planifiée", "phrase": "Une demande que l'IA lance seule, au jour et à l'heure choisis."}, {"mot": "Catalogue", "phrase": "La vitrine intégrée à WhatsApp Business, où chaque article a sa photo, son prix et sa description."}, {"mot": "Fiche produit", "phrase": "Le nom, le prix et la description d'un article, tels que le client les lit."}, {"mot": "Statut", "phrase": "Une publication que vos contacts voient pendant 24 heures dans WhatsApp."}, {"mot": "Réponse rapide", "phrase": "Un message enregistré dans WhatsApp Business, qu'on envoie en tapant un raccourci."}, {"mot": "Étiquette", "phrase": "Une marque de couleur posée sur une conversation WhatsApp Business pour la classer : nouveau client, commande en cours, paiement en attente."}, {"mot": "Prix de revient", "phrase": "Ce que l'article coûte vraiment, achat et frais compris."}, {"mot": "Marge", "phrase": "Ce qui reste au vendeur une fois l'article et ses frais payés."}, {"mot": "Prix plancher", "phrase": "Le prix le plus bas que le vendeur accepte, calculé à l'avance. À ne pas confondre avec le « dernier prix » que demande un client qui négocie."}, {"mot": "Solde", "phrase": "L'argent disponible à un moment donné, en caisse ou sur le compte Mobile Money."}, {"mot": "Avance", "phrase": "La partie du prix que le client paie à la commande."}, {"mot": "Vente à crédit", "phrase": "Une vente payée en partie ou en totalité plus tard, à ne pas confondre avec le crédit téléphonique."}, {"mot": "Budget par jour", "phrase": "La somme la plus haute que la publicité peut dépenser en une journée."}, {"mot": "Message d'accueil", "phrase": "Le premier message que le client reçoit en ouvrant la conversation."}, {"mot": "Gem", "phrase": "Un assistant Gemini enregistré avec ses propres instructions, que l'on rouvre d'un geste."}, {"mot": "Plugin", "phrase": "Un ajout que l'on installe dans ChatGPT et qui contient des consignes prêtes à servir ; il remplace le GPT personnalisé."}]$j$::jsonb, '2026-10-03' from metiers m
  where m.slug = $t$commerce-vente-en-ligne$t$
  on conflict (metier_id) do update set titre = excluded.titre, presentation = excluded.presentation, etapes = excluded.etapes, prerequis = excluded.prerequis, limites = excluded.limites, a_savoir = excluded.a_savoir, mots = excluded.mots, revu_le = excluded.revu_le;

-- 7. Les ressources du kit, dans l'ordre, avec leur étape d'installation
insert into kits_metier (metier_id, ressource_id, ordre, etape_installation) select m.id, r.id, v.ordre, v.etape
  from metiers m, ressources r,
  (values
    ($t$config-boutique-chatgpt$t$, 1, 1),
    ($t$config-boutique-claude$t$, 2, 1),
    ($t$config-boutique-gemini$t$, 3, 1),
    ($t$skill-fiches-produits$t$, 4, 2),
    ($t$skill-reponses-negociation$t$, 5, 2),
    ($t$skill-relance-paiement$t$, 6, 2),
    ($t$doc-cahier-de-caisse$t$, 7, 3),
    ($t$doc-prix-et-marge$t$, 8, 3),
    ($t$doc-suivi-commandes-paiements$t$, 9, 3),
    ($t$skill-statuts-de-la-semaine$t$, 10, null::integer),
    ($t$doc-bon-de-commande-recu$t$, 11, null::integer),
    ($t$routine-point-ventes-lundi$t$, 12, null::integer),
    ($t$routine-relance-impayes-vendredi$t$, 13, null::integer)
  ) as v(cle, ordre, etape)
  where m.slug = $t$commerce-vente-en-ligne$t$ and r.cle = v.cle
  on conflict (metier_id, ressource_id) do update set ordre = excluded.ordre, etape_installation = excluded.etape_installation;

-- 8. Quelles ressources servent à quelles tâches
insert into ressources_taches (ressource_id, tache_id) select r.id, t.id
  from ressources r, taches t,
  (values
    ($t$skill-fiches-produits$t$, $t$F43$t$),
    ($t$config-boutique-chatgpt$t$, $t$F43$t$),
    ($t$config-boutique-claude$t$, $t$F43$t$),
    ($t$config-boutique-gemini$t$, $t$F43$t$),
    ($t$skill-statuts-de-la-semaine$t$, $t$F44$t$),
    ($t$config-boutique-chatgpt$t$, $t$F44$t$),
    ($t$config-boutique-claude$t$, $t$F44$t$),
    ($t$config-boutique-gemini$t$, $t$F44$t$),
    ($t$skill-reponses-negociation$t$, $t$F45$t$),
    ($t$doc-prix-et-marge$t$, $t$F45$t$),
    ($t$config-boutique-chatgpt$t$, $t$F45$t$),
    ($t$config-boutique-claude$t$, $t$F45$t$),
    ($t$config-boutique-gemini$t$, $t$F45$t$),
    ($t$skill-relance-paiement$t$, $t$F46$t$),
    ($t$doc-suivi-commandes-paiements$t$, $t$F46$t$),
    ($t$doc-bon-de-commande-recu$t$, $t$F46$t$),
    ($t$routine-relance-impayes-vendredi$t$, $t$F46$t$),
    ($t$config-boutique-chatgpt$t$, $t$F46$t$),
    ($t$config-boutique-claude$t$, $t$F46$t$),
    ($t$config-boutique-gemini$t$, $t$F46$t$),
    ($t$doc-prix-et-marge$t$, $t$F47$t$),
    ($t$config-boutique-chatgpt$t$, $t$F47$t$),
    ($t$config-boutique-claude$t$, $t$F47$t$),
    ($t$config-boutique-gemini$t$, $t$F47$t$),
    ($t$doc-cahier-de-caisse$t$, $t$F48$t$),
    ($t$doc-bon-de-commande-recu$t$, $t$F48$t$),
    ($t$routine-point-ventes-lundi$t$, $t$F48$t$),
    ($t$config-boutique-chatgpt$t$, $t$F48$t$),
    ($t$config-boutique-claude$t$, $t$F48$t$),
    ($t$config-boutique-gemini$t$, $t$F48$t$),
    ($t$config-boutique-chatgpt$t$, $t$F49$t$),
    ($t$config-boutique-claude$t$, $t$F49$t$),
    ($t$config-boutique-gemini$t$, $t$F49$t$),
    ($t$config-boutique-chatgpt$t$, $t$F50$t$),
    ($t$config-boutique-claude$t$, $t$F50$t$),
    ($t$config-boutique-gemini$t$, $t$F50$t$)
  ) as v(cle, code)
  where r.cle = v.cle and t.code = v.code
  on conflict (ressource_id, tache_id) do nothing;

commit;
