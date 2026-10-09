-- 0053 : le contenu des 14 exercices finaux (10 octobre 2026)
--
-- Fabriquée par un programme à partir du document validé « AIW : attestations
-- par métier, grille et exercices finaux » (export Markdown, révision 12) :
-- les textes n'y sont pas réécrits à la main (règle Q7). Une ligne par métier.
-- Ne touche qu'à la table exercices_finaux (migration 0052). Rejouable.

begin;

-- 1. Vente / Commercial
insert into exercices_finaux (metier_id, numero, cas, titre_donnees, donnees, travail, a_rendre, pour_le_correcteur, revu_le)
select id, 1, 'Vous êtes Nadège, commerciale d''un service traiteur à Cotonou (Bénin), structure de 5 personnes. Une entreprise de Ganhi vous demande une proposition. La même entreprise n''a pas réglé une facture.', 'Les données',
  '["Demande : 80 repas le jeudi 10 décembre à 13 h, dans ses locaux.", "Votre prix : 2 000 FCFA le plat, boisson non comprise. Livraison et service offerts à partir de 50 plats.", "Avance de la moitié à la commande, par MTN MoMo ou Moov Money ; le solde à la livraison.", "Facture impayée : 45 repas livrés le vendredi 6 novembre, échéance le vendredi 20 novembre. Nous sommes le mardi 1er décembre."]'::jsonb,
  '["Rédigez la proposition commerciale (skill « Proposition commerciale »).", "Rédigez le message de relance de la facture (skill « Relance d''une facture impayée »).", "Notez les deux lignes dans le « Suivi des devis et des factures »."]'::jsonb,
  'La proposition (PDF ou capture), le message de relance, une capture du suivi.',
  'Total 160 000 FCFA ; avance 80 000 ; solde 80 000 ; livraison et service offerts (80 plats, au-dessus de 50). Facture : 90 000 FCFA, 11 jours de retard. La relance est courtoise : elle rappelle le montant, la date et le moyen de payer, sans pénalité ni menace inventées.',
  date '2026-10-10'
from metiers where slug = 'vente-commercial'
on conflict (metier_id) do update set numero = excluded.numero, cas = excluded.cas, titre_donnees = excluded.titre_donnees,
  donnees = excluded.donnees, travail = excluded.travail, a_rendre = excluded.a_rendre,
  pour_le_correcteur = excluded.pour_le_correcteur, revu_le = excluded.revu_le;

-- 2. BTP / Gestion de chantier
insert into exercices_finaux (metier_id, numero, cas, titre_donnees, donnees, travail, a_rendre, pour_le_correcteur, revu_le)
select id, 2, 'Vous êtes Kodjo, chef de chantier à Lomé (Togo), indépendant. Vous construisez une maison de plain-pied à Agoè. Le propriétaire attend son compte rendu du samedi.', 'Les données',
  '["Fait cette semaine : murs de la façade nord montés ; façade sud montée à 40 %.", "Retard : livraison de ciment reportée de mardi à jeudi ; pluie mercredi après-midi.", "Effectif : 6 ouvriers.", "Décision attendue du propriétaire : la place des fenêtres de la chambre 2.", "Vos inquiétudes : l''échafaudage de la façade sud n''a pas de garde-corps ; il reste du ciment pour 2 jours ; l''argent de la paie des ouvriers, prévu pour samedi, n''est pas arrivé."]'::jsonb,
  '["Rédigez le compte rendu au propriétaire (skill « Compte rendu de chantier »).", "Classez les points de risque (skill « Points de risque du chantier »).", "Écrivez le message de 4 lignes à l''équipe pour lundi."]'::jsonb,
  'Le compte rendu, le classement des risques, le message à l''équipe.',
  'L''échafaudage vient en premier : le travail en hauteur s''arrête jusqu''à la pose d''un garde-corps. Suivent le ciment, puis la paie, puis la décision des fenêtres. Le compte rendu donne les deux causes du retard. Aucun délai technique (séchage, décoffrage) ni montant n''est inventé.',
  date '2026-10-10'
from metiers where slug = 'btp-gestion-de-chantier'
on conflict (metier_id) do update set numero = excluded.numero, cas = excluded.cas, titre_donnees = excluded.titre_donnees,
  donnees = excluded.donnees, travail = excluded.travail, a_rendre = excluded.a_rendre,
  pour_le_correcteur = excluded.pour_le_correcteur, revu_le = excluded.revu_le;

-- 3. Comptabilité
insert into exercices_finaux (metier_id, numero, cas, titre_donnees, donnees, travail, a_rendre, pour_le_correcteur, revu_le)
select id, 3, 'Vous êtes Mariam, comptable d''une PME à Abidjan (Côte d''Ivoire), structure de 10 personnes. Vous rapprochez les encaissements Mobile Money d''octobre.', 'Les données',
  '["Journal : 3 octobre, client A, 45 000 FCFA ; 8 octobre, client B, 120 000 ; 15 octobre, client C, 30 000 ; 22 octobre, client D, 75 000 ; 29 octobre, client E, 60 000.", "Relevé du compte Mobile Money : solde au 1er octobre, 200 000 FCFA ; reçu 45 000 le 3, 120 000 le 8, 30 000 le 15, 25 000 le 18 sans nom, 57 000 le 22 ; frais de retrait de 1 500 le 25."]'::jsonb,
  '["Faites le rapprochement (skill « Rapprochement bancaire ») et listez chaque écart.", "Rédigez la note de synthèse de 5 lignes pour le directeur (skill « Note de synthèse »).", "Rédigez la demande de pièces pour ce qui reste à expliquer (skill « Relance des pièces manquantes »)."]'::jsonb,
  'Le tableau de rapprochement (capture du document « Rapprochement bancaire et Mobile Money »), la note, la demande de pièces.',
  'Encaissements : 330 000 FCFA au journal, 277 000 au relevé. Solde du relevé fin octobre : 475 500. Quatre écarts : client D, 75 000 au journal pour 57 000 reçus (18 000 de différence, à vérifier sur le reçu) ; client E, 60 000 absents du relevé ; 25 000 reçus sans nom, à identifier sans les attribuer au hasard ; 1 500 de frais à enregistrer. Les écarts s''additionnent : 18 000 + 60 000 − 25 000 = 53 000.',
  date '2026-10-10'
from metiers where slug = 'comptabilite'
on conflict (metier_id) do update set numero = excluded.numero, cas = excluded.cas, titre_donnees = excluded.titre_donnees,
  donnees = excluded.donnees, travail = excluded.travail, a_rendre = excluded.a_rendre,
  pour_le_correcteur = excluded.pour_le_correcteur, revu_le = excluded.revu_le;

-- 4. Secrétariat / Administration
insert into exercices_finaux (metier_id, numero, cas, titre_donnees, donnees, travail, a_rendre, pour_le_correcteur, revu_le)
select id, 4, 'Vous êtes Aminata, assistante administrative d''une association de Ouagadougou (Burkina Faso), structure de 15 personnes. Vous avez pris ces notes à la réunion du lundi 7 décembre, à 9 h.', 'Les données',
  '["Présents : le coordonnateur, la comptable, deux animateurs (Issouf et Rasmata).", "Décision 1 : Issouf et Rasmata partent en mission à Bobo-Dioulasso du lundi 14 au mercredi 16 décembre, pour former trois groupements de producteurs.", "Décision 2 : ils voyagent avec le véhicule de l''association. Les frais de mission suivent la grille interne.", "Décision 3 : demander à la mairie de Bobo-Dioulasso une salle pour les trois jours.", "Prochaine réunion : le lundi 4 janvier."]'::jsonb,
  '["Rédigez le compte rendu de réunion (skill « Compte rendu de réunion »).", "Rédigez l''ordre de mission des deux animateurs (skill « Ordre de mission »).", "Rédigez le courrier à la mairie (skill « Courrier administratif ») et notez-le dans le « Registre du courrier »."]'::jsonb,
  'Le compte rendu, l''ordre de mission, le courrier, une capture du registre.',
  'Les dates sont justes partout : mission de 3 jours, du lundi 14 au mercredi 16 décembre. Aucun montant de frais n''est inventé : la case renvoie à la grille interne. Le courrier demande une salle pour ces trois jours, avec objet, formule de politesse et signataire.',
  date '2026-10-10'
from metiers where slug = 'secretariat-administration'
on conflict (metier_id) do update set numero = excluded.numero, cas = excluded.cas, titre_donnees = excluded.titre_donnees,
  donnees = excluded.donnees, travail = excluded.travail, a_rendre = excluded.a_rendre,
  pour_le_correcteur = excluded.pour_le_correcteur, revu_le = excluded.revu_le;

-- 5. Logistique / Supply Chain
insert into exercices_finaux (metier_id, numero, cas, titre_donnees, donnees, travail, a_rendre, pour_le_correcteur, revu_le)
select id, 5, 'Vous êtes Seydou, responsable logistique d''un grossiste en boissons à Abidjan (Côte d''Ivoire). Nous sommes lundi matin ; vous préparez le réassort.', 'Les données',
  '["Eau minérale 1,5 L : 120 cartons en stock, 30 vendus par jour, livrée 3 jours après la commande.", "Jus 1 L : 45 cartons, 10 par jour, livré en 3 jours.", "Boisson gazeuse 33 cl : 200 cartons, 25 par jour, livrée en 2 jours.", "Votre règle : commander quand le stock est au point de commande ou en dessous, soit les ventes par jour × (délai + 2 jours de sécurité). La quantité couvre le délai, 7 jours de ventes et les 2 jours de sécurité, moins le stock."]'::jsonb,
  '["Calculez ce qu''il faut commander (skill « Prévision des besoins »).", "Rédigez le message de commande au fournisseur (skill « Message au fournisseur »).", "Mettez à jour le « Suivi des stocks »."]'::jsonb,
  'Le calcul, le message, une capture du suivi des stocks.',
  'Eau : point de commande 150, stock 120, commander 240 cartons. Jus : point 50, stock 45, commander 75. Boisson gazeuse : point 100, stock 200, pas de commande (8 jours de stock). Le message ne commande que l''eau et le jus.',
  date '2026-10-10'
from metiers where slug = 'logistique-supply-chain'
on conflict (metier_id) do update set numero = excluded.numero, cas = excluded.cas, titre_donnees = excluded.titre_donnees,
  donnees = excluded.donnees, travail = excluded.travail, a_rendre = excluded.a_rendre,
  pour_le_correcteur = excluded.pour_le_correcteur, revu_le = excluded.revu_le;

-- 6. Service clientèle
insert into exercices_finaux (metier_id, numero, cas, titre_donnees, donnees, travail, a_rendre, pour_le_correcteur, revu_le)
select id, 6, 'Vous êtes Afi, conseillère du service client d''une boutique de téléphones en ligne à Lomé (Togo), structure de 7 personnes. Nous sommes le vendredi 4 décembre, à 8 h.', 'Les données',
  '["Règles de la boutique : échange si un défaut est signalé sous 48 heures avec une photo ; remboursement sous 7 jours ouvrés.", "Message 1 : un client livré hier signale un écran fissuré, sans photo.", "Message 2 : une cliente demande où en est son colis.", "Message 3 : un client demande le prix d''un modèle.", "Message 4 : un client attend un remboursement promis le vendredi 20 novembre ; il est fâché.", "Message 5 : une entreprise demande une facture."]'::jsonb,
  '["Triez les demandes par urgence (skill « Tri des demandes »).", "Répondez au message 1 et au message 4 (skill « Réponse à une réclamation »).", "Remplissez la « Fiche de réclamation » du message 1."]'::jsonb,
  'Le tri, les deux réponses, une capture de la fiche.',
  'Les messages 4 et 1 passent en premier. Le remboursement a 10 jours ouvrés, au-delà des 7 promis : excuses, puis une date donnée seulement après vérification, jamais inventée. L''écran est signalé dans les 48 heures : la réponse demande la photo pour lancer l''échange. Ni prix ni délai de livraison inventés pour les messages 2 et 3.',
  date '2026-10-10'
from metiers where slug = 'service-clientele'
on conflict (metier_id) do update set numero = excluded.numero, cas = excluded.cas, titre_donnees = excluded.titre_donnees,
  donnees = excluded.donnees, travail = excluded.travail, a_rendre = excluded.a_rendre,
  pour_le_correcteur = excluded.pour_le_correcteur, revu_le = excluded.revu_le;

-- 7. Marketing
insert into exercices_finaux (metier_id, numero, cas, titre_donnees, donnees, travail, a_rendre, pour_le_correcteur, revu_le)
select id, 7, 'Vous êtes Aya, chargée de marketing d''une imprimerie à Abidjan (Côte d''Ivoire), structure de 12 personnes. Vous préparez la campagne de fin d''année.', 'Les données',
  '["Offres : 100 cartes de visite à 10 000 FCFA ; 1 000 flyers A5 à 90 000 FCFA ; bâche imprimée à 10 000 FCFA le mètre carré.", "Durée : du lundi 30 novembre au dimanche 13 décembre.", "Publicité Facebook : 3 000 FCFA par jour pendant 10 jours.", "Réseaux : la page Facebook et les statuts WhatsApp ; 3 publications par semaine."]'::jsonb,
  '["Remplissez le « Brief de campagne ».", "Faites le calendrier des deux semaines (skill « Calendrier de contenus »).", "Rédigez l''annonce publicitaire : texte, titre, description (skill « Annonce publicitaire »).", "Rédigez le brief d''un visuel (skill « Brief de visuel »)."]'::jsonb,
  'Le brief de campagne, le calendrier, l''annonce, le brief de visuel.',
  'Budget publicitaire : 30 000 FCFA. Le calendrier compte 6 publications. Les prix sont ceux des données, sans promotion, témoignage ni chiffre de résultat inventés.',
  date '2026-10-10'
from metiers where slug = 'marketing'
on conflict (metier_id) do update set numero = excluded.numero, cas = excluded.cas, titre_donnees = excluded.titre_donnees,
  donnees = excluded.donnees, travail = excluded.travail, a_rendre = excluded.a_rendre,
  pour_le_correcteur = excluded.pour_le_correcteur, revu_le = excluded.revu_le;

-- 8. Communication
insert into exercices_finaux (metier_id, numero, cas, titre_donnees, donnees, travail, a_rendre, pour_le_correcteur, revu_le)
select id, 8, 'Vous êtes Ibrahima, chargé de communication d''un centre de formation à Dakar (Sénégal), structure de 20 personnes. Un message faux circule sur WhatsApp au sujet de votre journée portes ouvertes.', 'Les données',
  '["La journée : samedi 12 décembre, de 9 h à 16 h, dans vos locaux de Sacré-Cœur. Entrée gratuite, 4 ateliers, inscription par WhatsApp.", "Le message qui circule : « La journée est annulée. Et maintenant il faut payer 5 000 FCFA. »", "La direction confirme : rien n''est annulé, rien n''est payant."]'::jsonb,
  '["Rédigez le communiqué de presse (skill « Communiqué de presse »).", "Rédigez l''annonce pour Facebook et les statuts WhatsApp (skill « Annonce d''événement »).", "Rédigez la réponse à la rumeur (skill « Réponse à une rumeur »)."]'::jsonb,
  'Le communiqué, l''annonce, la réponse.',
  'La date, l''heure, le lieu et la gratuité sont identiques dans les trois textes. La réponse à la rumeur est courte et factuelle, sans accuser personne. Une citation de la direction est signalée « à faire valider », jamais inventée comme définitive.',
  date '2026-10-10'
from metiers where slug = 'communication'
on conflict (metier_id) do update set numero = excluded.numero, cas = excluded.cas, titre_donnees = excluded.titre_donnees,
  donnees = excluded.donnees, travail = excluded.travail, a_rendre = excluded.a_rendre,
  pour_le_correcteur = excluded.pour_le_correcteur, revu_le = excluded.revu_le;

-- 9. Ressources humaines
insert into exercices_finaux (metier_id, numero, cas, titre_donnees, donnees, travail, a_rendre, pour_le_correcteur, revu_le)
select id, 9, 'Vous êtes Sandrine, assistante RH d''une PME de distribution à Douala (Cameroun), structure de 25 personnes. Vous recrutez un magasinier.', 'Les données',
  '["Critères fixés par la direction : expérience en gestion de stock (0 : aucune ; 1 : moins d''un an ; 2 : un à deux ans ; 3 : plus de deux ans) ; Excel (0 : aucun ; 1 : base ; 2 : bon niveau) ; disponible sous 3 semaines (1 : oui ; 0 : non).", "Brice : 3 ans de magasinier dans une quincaillerie, Excel de base, disponible dans un mois.", "Achille : 6 mois de stage en entrepôt, pas d''Excel, disponible tout de suite.", "Ange : 2 ans en gestion de stock dans un supermarché, bon niveau Excel, disponible dans 2 semaines. Son CV indique qu''elle est mère de deux enfants.", "Serge : 5 ans de vendeur, pas de gestion de stock, Excel de base, disponible tout de suite.", "Le salaire suit la grille de l''entreprise."]'::jsonb,
  '["Rédigez la fiche de poste (skill « Fiche de poste »).", "Notez les quatre candidatures (skill « Grille des candidatures ») et remplissez le « Suivi des candidatures ».", "Rédigez le message d''invitation à un entretien pour la personne la mieux classée."]'::jsonb,
  'La fiche de poste, la grille, une capture du suivi, le message.',
  'Ange 5 points, Brice 4, Achille 2, Serge 2 : Ange est invitée. La situation familiale n''apparaît nulle part dans la grille ni dans l''avis : c''est le piège du cas. Aucun montant de salaire n''est inventé.',
  date '2026-10-10'
from metiers where slug = 'ressources-humaines'
on conflict (metier_id) do update set numero = excluded.numero, cas = excluded.cas, titre_donnees = excluded.titre_donnees,
  donnees = excluded.donnees, travail = excluded.travail, a_rendre = excluded.a_rendre,
  pour_le_correcteur = excluded.pour_le_correcteur, revu_le = excluded.revu_le;

-- 10. Journalisme
insert into exercices_finaux (metier_id, numero, cas, titre_donnees, donnees, travail, a_rendre, pour_le_correcteur, revu_le)
select id, 10, 'Vous êtes Hadiza, journaliste dans une radio de Niamey (Niger), rédaction de 12 personnes. Une information circule avant votre journal de midi.', 'Les données',
  '["Message WhatsApp non signé : « Le marché du quartier ferme un mois à partir de lundi pour des travaux. »", "Un commerçant le répète, mais dit l''avoir « entendu ».", "Le site et la page Facebook de la mairie n''en parlent pas.", "Un agent de la mairie, au téléphone : « Des travaux sont prévus, la date n''est pas fixée. » Il refuse d''être cité par son nom."]'::jsonb,
  '["Remplissez la « Grille de vérification », une ligne par affirmation.", "Dites ce qui peut se dire à l''antenne et pourquoi (skill « Vérification d''une information »).", "Proposez 3 titres et un chapô (skill « Titres et chapô »).", "Préparez 5 questions pour le service technique de la mairie (skill « Préparation d''interview »)."]'::jsonb,
  'La grille, l''avis, les titres et le chapô, les questions.',
  'Seuls les travaux prévus sont confirmés, par une seule source, à recouper. La fermeture d''un mois et le début lundi ne sont pas confirmés : aucun titre ne les affirme. L''agent apparaît sous un repère (« un agent de la mairie »), jamais sous son nom.',
  date '2026-10-10'
from metiers where slug = 'journalisme'
on conflict (metier_id) do update set numero = excluded.numero, cas = excluded.cas, titre_donnees = excluded.titre_donnees,
  donnees = excluded.donnees, travail = excluded.travail, a_rendre = excluded.a_rendre,
  pour_le_correcteur = excluded.pour_le_correcteur, revu_le = excluded.revu_le;

-- 11. Graphisme
insert into exercices_finaux (metier_id, numero, cas, titre_donnees, donnees, travail, a_rendre, pour_le_correcteur, revu_le)
select id, 11, 'Vous êtes Mahougnon, graphiste indépendant à Cotonou (Bénin). Une pâtisserie de Fidjrossè vous écrit.', 'Les données',
  '["Sa demande : un logo et 3 visuels pour décembre, des couleurs chaudes, le tout avant le mardi 8 décembre.", "Vos tarifs : logo 20 000 FCFA ; visuel pour les réseaux 4 000 FCFA. Avance de 50 % à la commande, par MTN MoMo ; solde à la livraison. Délai : 6 jours après l''avance. Deux séries de modifications comprises. Devis valable 10 jours.", "L''avance arrive le mardi 1er décembre.", "Les retours de la cliente sur la première proposition : changer la couleur, agrandir le logo, et ajouter « gratuitement » un quatrième visuel."]'::jsonb,
  '["Remplissez le « Brief créatif » (skill « Brief créatif »).", "Rédigez le devis (skill « Devis de création graphique »).", "Répondez aux retours (skill « Retours du client »)."]'::jsonb,
  'Le brief, le devis, la réponse.',
  'Devis : 32 000 FCFA ; avance 16 000 ; solde 16 000. Livraison le lundi 7 décembre, avant la date demandée. La couleur et la taille du logo forment la première série de modifications, comprise. Le quatrième visuel coûte 4 000 FCFA (total 36 000) : la réponse le dit poliment, sans travail gratuit promis.',
  date '2026-10-10'
from metiers where slug = 'graphisme'
on conflict (metier_id) do update set numero = excluded.numero, cas = excluded.cas, titre_donnees = excluded.titre_donnees,
  donnees = excluded.donnees, travail = excluded.travail, a_rendre = excluded.a_rendre,
  pour_le_correcteur = excluded.pour_le_correcteur, revu_le = excluded.revu_le;

-- 12. Montage vidéo
insert into exercices_finaux (metier_id, numero, cas, titre_donnees, donnees, travail, a_rendre, pour_le_correcteur, revu_le)
select id, 12, 'Vous êtes Fifamè, monteuse vidéo indépendante à Cotonou (Bénin). Un restaurant de Haie Vive veut une vidéo verticale de 30 secondes pour ses statuts WhatsApp et sa page Facebook, qui finit sur l''enseigne et le numéro WhatsApp.', 'Les données (les plans filmés)',
  '["P1 : la façade du restaurant, 8 s, bonne lumière.", "P2 : la cuisinière au travail, 15 s, flou pendant les 4 premières secondes.", "P3 : un poisson braisé servi, 6 s, net.", "P4 : des clients qui rient, 10 s, visages reconnaissables, sans accord écrit.", "P5 : le serveur qui apporte les boissons, 7 s, net.", "P6 : l''enseigne la nuit, 5 s, nette.", "P7 : un plat de riz, 4 s, image tremblée."]'::jsonb,
  '["Remplissez la « Feuille de dérushage » : plans gardés et écartés.", "Faites le plan de montage de 30 secondes (skill « Plan de montage »).", "Écrivez la voix off (skill « Script de voix off ») et les sous-titres (skill « Sous-titres »)."]'::jsonb,
  'La feuille de dérushage, le plan de montage, la voix off, les sous-titres.',
  'P4 est écarté (personnes reconnaissables sans accord), P7 aussi (image tremblée). P2 perd ses 4 premières secondes. Le plan fait exactement 30 secondes et finit sur P6, par exemple P1 5 s, P2 8 s, P3 6 s, P5 6 s, P6 5 s. La voix off se lit en 30 secondes. Le numéro reste un champ à remplir, jamais un numéro inventé.',
  date '2026-10-10'
from metiers where slug = 'montage-video'
on conflict (metier_id) do update set numero = excluded.numero, cas = excluded.cas, titre_donnees = excluded.titre_donnees,
  donnees = excluded.donnees, travail = excluded.travail, a_rendre = excluded.a_rendre,
  pour_le_correcteur = excluded.pour_le_correcteur, revu_le = excluded.revu_le;

-- 13. Commerce et vente en ligne
insert into exercices_finaux (metier_id, numero, cas, titre_donnees, donnees, travail, a_rendre, pour_le_correcteur, revu_le)
select id, 13, 'Vous êtes Khady, vendeuse de sacs en ligne à Dakar (Sénégal), seule dans votre activité. Nous sommes le vendredi 11 décembre.', 'Les données',
  '["Produit : un sac à main en cuir marron, 13 500 FCFA. Livraison dans Dakar : 2 000 FCFA.", "Votre règle : 1 000 FCFA de remise par sac à partir de 2 sacs, pas plus.", "Une cliente propose 20 000 FCFA pour 2 sacs.", "Un client livré le mardi 8 décembre devait payer par Wave à la livraison : 1 sac et la livraison. Rien n''est arrivé."]'::jsonb,
  '["Rédigez la fiche du sac (skill « Rédacteur de fiches produits »).", "Répondez à la négociation (skill « Réponses aux négociations »).", "Rédigez la relance (skill « Relance de paiement ») et notez la commande dans le « Suivi des commandes et des paiements »."]'::jsonb,
  'La fiche, la réponse, la relance, une capture du suivi.',
  'Pour 2 sacs, le prix le plus bas est 25 000 FCFA (27 000 moins 2 000 de remise) : la réponse refuse 20 000 poliment et propose 25 000. Relance : 15 500 FCFA, 3 jours après la livraison. La fiche ne dit rien que les données ne disent pas : ni dimensions, ni stock, ni garantie.',
  date '2026-10-10'
from metiers where slug = 'commerce-vente-en-ligne'
on conflict (metier_id) do update set numero = excluded.numero, cas = excluded.cas, titre_donnees = excluded.titre_donnees,
  donnees = excluded.donnees, travail = excluded.travail, a_rendre = excluded.a_rendre,
  pour_le_correcteur = excluded.pour_le_correcteur, revu_le = excluded.revu_le;

-- 14. Indépendant et prestataire de services
insert into exercices_finaux (metier_id, numero, cas, titre_donnees, donnees, travail, a_rendre, pour_le_correcteur, revu_le)
select id, 14, 'Vous êtes Gildas, couturier à Cotonou (Bénin), seul dans votre atelier. Une cliente vous écrit le jeudi 10 décembre pour un mariage le samedi 19 décembre.', 'Les données',
  '["Sa demande : 2 tenues avec son propre tissu et 1 tenue complète, tissu compris.", "Vos tarifs : couture d''une tenue, 10 000 FCFA de main-d''œuvre, tissu apporté ; tenue complète, tissu compris, 55 000 FCFA. Délai : 7 jours après l''avance. Avance de la moitié par MTN MoMo ; solde à la livraison.", "Après le devis, elle demande 30 % de réduction et une livraison en 4 jours."]'::jsonb,
  '["Répondez à sa demande (skill « Réponse à une demande de prestation »).", "Rédigez le devis (skill « Rédacteur de devis », document « Devis et facture simple »).", "Répondez à sa demande de réduction (skill « Réponse à un client difficile »)."]'::jsonb,
  'La réponse, le devis, la réponse à la réduction.',
  'Devis : 75 000 FCFA ; avance 37 500 ; solde 37 500. Avec l''avance reçue le 10, la livraison est possible le jeudi 17 décembre, avant le mariage. La réponse garde le prix et le délai de 7 jours, avec courtoisie : ni réduction ni délai de 4 jours promis.',
  date '2026-10-10'
from metiers where slug = 'independant-prestataire-de-services'
on conflict (metier_id) do update set numero = excluded.numero, cas = excluded.cas, titre_donnees = excluded.titre_donnees,
  donnees = excluded.donnees, travail = excluded.travail, a_rendre = excluded.a_rendre,
  pour_le_correcteur = excluded.pour_le_correcteur, revu_le = excluded.revu_le;

do $controle$
declare n int;
begin
  select count(*) into n from exercices_finaux;
  if n <> 14 then raise exception 'Exercices finaux : % sur 14', n; end if;
  select count(*) into n from metiers m where not exists (select 1 from exercices_finaux e where e.metier_id = m.id);
  if n <> 0 then raise exception 'Exercices finaux : % métier(s) sans exercice', n; end if;
end
$controle$;

commit;
