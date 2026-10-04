-- 0026 : contenu du kit « Comptabilité » (4 octobre 2026)
--
-- Ce fichier est fabriqué par un programme à partir du fichier source du kit :
-- les textes en sont copiés tels quels. Il ajoute :
--   - la description localisée du métier « Comptabilité », à côté de l'ancienne ;
--   - le résultat et les étapes de 2 tâches existantes (F19, F20) ;
--   - 4 cas pratiques localisés, deux par tâche, écrits À CÔTÉ des anciens cas ;
--   - le rattachement de 14 tâches déjà écrites par un kit précédent (F01, F03, F04, F05, F07, F08, F11, F12, F13, F14, F15, F16, F21, F22) ;
--   - 2 modèles à remplir, leurs champs, leurs exemples et la note par IA ;
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
update metiers set description_local = $t$Pour toute personne qui tient des comptes : dans un cabinet, une PME, une ONG, ou à son compte pour de petits commerces. Vous travaillez avec des relevés de banque et de Mobile Money, des pièces reçues sur WhatsApp, Excel ou Google Sheets, et le SYSCOHADA.$t$
  where slug = $t$comptabilite$t$;

-- 2. Les tâches, leur résultat et leurs étapes
update taches set resultat = $t$Chaque opération classée dans une de vos catégories, les lignes à éclaircir mises à part avec la question à poser, et le total de chaque catégorie.$t$, etapes = $j$["Réunir les opérations de la période : relevé de banque, mouvements Mobile Money, cahier de caisse.", "Retirer les numéros de compte, les noms complets et les numéros de téléphone.", "Remplir le modèle avec vos catégories et vos opérations, puis copier la consigne dans son IA.", "Vérifier chaque ligne classée et chaque total, puis poser les questions sur les lignes mises à part.", "Reporter le classement validé dans votre journal ou dans votre logiciel."]$j$::jsonb, precisions = $t$L'IA propose, vous validez. Elle classe dans vos catégories : elle ne connaît ni votre dossier ni les règles de votre pays. Elle ne remplace pas l'expert-comptable et ne donne aucune règle fiscale.$t$
  where code = $t$F19$t$;

update taches set resultat = $t$Les lignes qui se retrouvent des deux côtés, celles qui manquent d'un côté, l'écart entre le relevé et votre journal expliqué ligne par ligne, et les questions à poser.$t$, etapes = $j$["Sortir le relevé de la banque ou du Mobile Money, et vos écritures sur la même période.", "Retirer les numéros de compte, les noms complets et les numéros de téléphone.", "Remplir le modèle et copier la consigne dans son IA.", "Vérifier chaque ligne pointée et chaque total avec vos pièces.", "Corriger votre journal ou demander la pièce manquante, puis garder le rapprochement avec le relevé."]$j$::jsonb, precisions = $t$L'IA rapproche des lignes : elle ne voit ni votre banque ni vos pièces. Un rapprochement n'est juste que si le relevé et le journal sont complets. C'est vous qui validez et qui passez les écritures.$t$
  where code = $t$F20$t$;

-- 3. Les cas pratiques localisés, à côté des anciens
update exercices set titre_local = $t$Comptable dans un cabinet à Cotonou$t$, contexte_local = $t$Vous êtes comptable chez Agbalè Services, un cabinet de 8 personnes, à Cadjèhoun. Vous tenez les comptes de Tokpa Mobile, une boutique de téléphones de Ganhi. La gérante vous envoie sur WhatsApp les opérations de la première semaine d'octobre. Vous les classez dans les catégories du dossier.$t$, donnees_local = $t$- Catégories du dossier : ventes de marchandises, achats de marchandises, loyer, électricité, internet et téléphone, salaires, transport et livraisons.
- 1er octobre, sortie : loyer de la boutique, 150 000 FCFA.
- 2 octobre, entrée : vente d'un téléphone, payée par MTN MoMo, 65 000 FCFA.
- 2 octobre, entrée : vente de deux téléphones, en espèces, 130 000 FCFA.
- 3 octobre, sortie : facture d'électricité de 240 kWh, 30 000 FCFA.
- 3 octobre, sortie : abonnement à la fibre, 25 000 FCFA.
- 5 octobre, sortie : achat de dix téléphones chez le fournisseur, 450 000 FCFA.
- 5 octobre, sortie : salaire de la vendeuse, 75 000 FCFA.
- 6 octobre, sortie : livraison d'un téléphone à moto, 1 500 FCFA.
- 6 octobre, entrée : 40 000 FCFA reçus par MTN MoMo, sans libellé.
- 7 octobre, sortie : 100 000 FCFA envoyés par MTN MoMo, libellé « perso ».$t$, travail_local = $t$Classez chaque opération dans une catégorie du dossier, mettez à part celles qui posent une question, puis donnez le total de chaque catégorie.$t$, prenom = $t$Sènami$t$, lieu = $t$Cotonou, Bénin$t$, profil = $t$Structure, 8 personnes$t$, reponse_attendue = $t$Huit opérations se classent. Ventes de marchandises : 195 000 FCFA. Achats de marchandises : 450 000 FCFA. Loyer : 150 000 FCFA. Électricité : 30 000 FCFA. Internet et téléphone : 25 000 FCFA. Salaires : 75 000 FCFA. Transport et livraisons : 1 500 FCFA. Total des sorties classées : 731 500 FCFA. Deux lignes restent à part : les 40 000 FCFA reçus sans libellé, à demander, et les 100 000 FCFA « perso », une dépense personnelle à signaler, pas une charge de la boutique.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F19$t$);

update exercices set titre_local = $t$Comptable à son compte à Dakar$t$, contexte_local = $t$Vous êtes comptable à votre compte, aux Parcelles Assainies. Vous tenez les comptes de quatre petits commerces. La gérante de Keur Coumba Couture, un atelier de la Médina, vous envoie la capture de ses mouvements Wave de la semaine. Elle a noté un mot à côté de chaque ligne.$t$, donnees_local = $t$- Catégories du dossier : ventes de tenues, couture seule, achats de tissu, loyer, internet et téléphone, livraisons.
- Reçu : 75 000 FCFA, « tenue de mariage, tissu compris ».
- Reçu : 30 000 FCFA, « couture de 3 tenues, tissu fourni par les clientes ».
- Envoyé : 60 000 FCFA, « 3 pagnes wax ».
- Envoyé : 125 000 FCFA, « loyer de l'atelier ».
- Envoyé : 5 000 FCFA, « forfait internet du mois ».
- Envoyé : 2 000 FCFA, « livraison d'une tenue ».
- Envoyé : 20 000 FCFA, « pagne pour ma sœur ».
- Reçu : 82 500 FCFA, sans mot.$t$, travail_local = $t$Classez chaque mouvement dans une catégorie du dossier, mettez à part ceux qui posent une question, puis donnez le total de chaque catégorie.$t$, prenom = $t$Mamadou$t$, lieu = $t$Dakar, Sénégal$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = $t$Six mouvements se classent. Ventes de tenues : 75 000 FCFA. Couture seule : 30 000 FCFA. Achats de tissu : 60 000 FCFA. Loyer : 125 000 FCFA. Internet et téléphone : 5 000 FCFA. Livraisons : 2 000 FCFA. Total des entrées classées : 105 000 FCFA. Total des sorties classées : 192 000 FCFA. Deux lignes restent à part : le pagne pour la sœur, une dépense personnelle à signaler, et les 82 500 FCFA reçus sans mot, à demander.$t$
  where numero = 2 and tache_id in (select id from taches where code = $t$F19$t$);

update exercices set titre_local = $t$Comptable dans une imprimerie à Abidjan$t$, contexte_local = $t$Vous êtes comptable chez Riviera Print, une imprimerie de 12 personnes, à Cocody. Vous rapprochez le relevé de la banque de septembre et votre journal de banque. Le solde au 1er septembre est le même des deux côtés.$t$, donnees_local = $t$- Relevé de la banque, entrées : 180 000 FCFA le 3, 60 000 FCFA le 10, 50 000 FCFA le 15, 87 500 FCFA le 22.
- Relevé de la banque, sorties : loyer 300 000 FCFA le 5, fibre 35 000 FCFA le 12, fibre 35 000 FCFA le 13, électricité 168 000 FCFA le 20, salaire 260 000 FCFA le 28.
- Votre journal, entrées : 2 000 flyers 180 000 FCFA le 3, une bâche de 6 m² 60 000 FCFA le 10, 500 cartes de visite 50 000 FCFA le 15, 1 000 flyers 90 000 FCFA, chèque remis à la banque le 30.
- Votre journal, sorties : loyer 300 000 FCFA le 5, fibre 35 000 FCFA le 12, électricité 186 000 FCFA le 20, salaire du graphiste 260 000 FCFA le 28.
- La facture d'électricité : 1 500 kWh, soit 168 000 FCFA.$t$, travail_local = $t$Pointez les lignes qui se retrouvent des deux côtés, listez celles qui manquent ou qui diffèrent, puis calculez l'écart entre le relevé et le journal et expliquez-le ligne par ligne.$t$, prenom = $t$Akissi$t$, lieu = $t$Abidjan, Côte d'Ivoire$t$, profil = $t$Structure, 12 personnes$t$, reponse_attendue = $t$Six lignes se retrouvent des deux côtés. Mouvements du relevé : 377 500 − 798 000 = −420 500 FCFA. Mouvements du journal : 380 000 − 781 000 = −401 000 FCFA. Le relevé est inférieur au journal de 19 500 FCFA. Quatre explications : le chèque de 90 000 FCFA pas encore crédité, le virement de 87 500 FCFA non enregistré, la fibre prélevée deux fois (35 000 FCFA), et l'électricité saisie pour 186 000 FCFA au lieu de 168 000 FCFA (18 000 FCFA). −90 000 + 87 500 − 35 000 + 18 000 = −19 500.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F20$t$);

update exercices set titre_local = $t$Comptable à son compte à Cotonou$t$, contexte_local = $t$Vous êtes comptable à votre compte, à Akpakpa. Vous suivez les ventes de Sènami Cosmétiques, une boutique de 2 personnes. Samedi soir, vous comparez les paiements reçus par MTN MoMo dans la semaine avec le cahier de ventes de la gérante.$t$, donnees_local = $t$- Cahier, ventes payées par MTN MoMo : lundi 3 crèmes 12 000 FCFA ; mardi 1 perruque 13 500 FCFA ; mercredi 2 crèmes 8 000 FCFA ; jeudi 1 perruque et sa livraison 15 000 FCFA ; vendredi 5 crèmes 20 000 FCFA ; samedi 1 perruque 13 500 FCFA.
- Relevé MTN MoMo, paiements reçus : lundi 12 000 FCFA ; mardi 13 500 FCFA ; mercredi 8 000 FCFA ; jeudi 13 500 FCFA ; vendredi 20 000 FCFA ; vendredi 4 000 FCFA.
- Note de la gérante : jeudi, la cliente a payé la livraison de 1 500 FCFA en espèces au livreur.$t$, travail_local = $t$Pointez les ventes du cahier avec les paiements reçus, calculez le total de chaque côté et l'écart, puis expliquez l'écart ligne par ligne.$t$, prenom = $t$Moussa$t$, lieu = $t$Cotonou, Bénin$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = $t$Quatre ventes se retrouvent telles quelles : lundi, mardi, mercredi et vendredi. Cahier : 82 000 FCFA. Relevé : 71 000 FCFA. Le relevé est inférieur de 11 000 FCFA. Trois explications : la livraison de jeudi payée en espèces (1 500 FCFA), un paiement de 4 000 FCFA reçu vendredi et absent du cahier, et la perruque de samedi (13 500 FCFA), pas encore payée par MTN MoMo. −1 500 + 4 000 − 13 500 = −11 000.$t$
  where numero = 2 and tache_id in (select id from taches where code = $t$F20$t$);

-- 4. Les modèles à remplir, leurs champs et la note par IA
insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Catégorisation des transactions comptables$t$, $t$Rôle : Vous m'aidez à classer des opérations dans mes catégories. Vous proposez, je valide. Vous montrez chaque calcul.

Contexte : Mon activité et le dossier : {{activite}}. Mes catégories ou mes comptes, tels que je les utilise : {{categories}}. Les opérations à classer, sans numéro de compte ni nom complet : {{operations}}.

Travail demandé :
1. Pour chaque opération : la catégorie proposée et, en quelques mots, pourquoi.
2. Les opérations que vous ne pouvez pas classer avec certitude, à part, avec la question à poser pour chacune.
3. Les dépenses qui semblent personnelles, signalées à part.
4. Le total de chaque catégorie, entrées et sorties séparées.
5. Les lignes qui se ressemblent et pourraient être un doublon.

Format : {{presentation}}. Montants écrits ainsi : 25 000 FCFA.

Règle : utilisez seulement mes catégories. N'en créez pas et n'attribuez aucun numéro de compte que je n'ai pas donné. Ne devinez pas : dans le doute, classez la ligne dans « à demander ». Ne donnez aucune règle fiscale.$t$, 2, $t$Une IA peut se tromper dans un calcul. Vérifiez chaque total.$t$, 1, '2026-10-04' from taches t
  where t.code = $t$F19$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité, et de quel dossier s'agit-il ?$t$, $t$texte$t$, null::jsonb, $t$comptable à mon compte, à Dakar ; le dossier est un atelier de couture$t$, true, 1),
    ($t$categories$t$, $t$Quelles sont vos catégories ou vos comptes ?$t$, $t$long$t$, null::jsonb, $t$ventes de tenues ; couture seule ; achats de tissu ; loyer ; internet et téléphone ; livraisons$t$, true, 2),
    ($t$operations$t$, $t$Quelles opérations faut-il classer ?$t$, $t$long$t$, null::jsonb, $t$reçu 75 000 FCFA, tenue de mariage, tissu compris ; reçu 30 000 FCFA, couture de 3 tenues, tissu fourni par les clientes ; envoyé 60 000 FCFA, 3 pagnes wax ; envoyé 125 000 FCFA, loyer de l'atelier ; envoyé 5 000 FCFA, forfait internet du mois ; envoyé 2 000 FCFA, livraison d'une tenue ; envoyé 20 000 FCFA, pagne pour ma sœur ; reçu 82 500 FCFA, sans mot$t$, true, 3),
    ($t$presentation$t$, $t$Comment voulez-vous le résultat ?$t$, $t$choix$t$, $j$["Un tableau", "Une liste par catégorie"]$j$::jsonb, $t$Un tableau$t$, true, 4)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F19$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Rapprochement bancaire et examen des écarts$t$, $t$Rôle : Vous m'aidez à rapprocher un relevé et mon journal, ligne par ligne. Vous montrez chaque calcul.

Contexte : Mon activité et le dossier : {{activite}}. La période : {{periode}}. D'où vient le relevé : {{type_releve}}. Les lignes du relevé, sans numéro de compte ni nom complet : {{releve}}. Ce que j'ai enregistré de mon côté : {{journal}}. Les soldes de départ et de fin, si je les ai : {{soldes}}.

Travail demandé :
1. Les lignes qui se retrouvent des deux côtés, pointées une à une.
2. Les lignes du relevé absentes de mon journal.
3. Les lignes de mon journal absentes du relevé.
4. Les montants qui diffèrent pour une même opération, et les lignes en double.
5. Le total de chaque côté, l'écart, puis l'écart expliqué ligne par ligne. La somme des explications doit donner l'écart.
6. Les questions à poser et les pièces à demander.

Format : un tableau (date, libellé, relevé, journal, constat), puis l'écart expliqué. Montants écrits ainsi : 25 000 FCFA.

Règle : rapprochez seulement les lignes que je donne. Ne supposez pas la cause d'un écart : proposez la question à poser. Ne passez aucune écriture et ne donnez aucune règle fiscale.$t$, 2, $t$Une IA peut se tromper dans un calcul. Vérifiez chaque total.$t$, 1, '2026-10-04' from taches t
  where t.code = $t$F20$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité, et de quel dossier s'agit-il ?$t$, $t$texte$t$, null::jsonb, $t$comptable à mon compte, à Cotonou ; le dossier est une boutique de cosmétiques$t$, true, 1),
    ($t$periode$t$, $t$Quelle période comparez-vous ?$t$, $t$texte$t$, null::jsonb, $t$la semaine du lundi 5 au samedi 10 octobre 2026$t$, true, 2),
    ($t$type_releve$t$, $t$D'où vient le relevé ?$t$, $t$choix$t$, $j$["Banque", "Mobile Money", "Caisse"]$j$::jsonb, $t$Mobile Money$t$, true, 3),
    ($t$releve$t$, $t$Quelles sont les lignes du relevé ?$t$, $t$long$t$, null::jsonb, $t$paiements reçus : lundi 12 000 FCFA ; mardi 13 500 FCFA ; mercredi 8 000 FCFA ; jeudi 13 500 FCFA ; vendredi 20 000 FCFA ; vendredi 4 000 FCFA$t$, true, 4),
    ($t$journal$t$, $t$Qu'avez-vous enregistré de votre côté ?$t$, $t$long$t$, null::jsonb, $t$ventes du cahier payées par Mobile Money : lundi 3 crèmes 12 000 FCFA ; mardi 1 perruque 13 500 FCFA ; mercredi 2 crèmes 8 000 FCFA ; jeudi 1 perruque et sa livraison 15 000 FCFA, la livraison de 1 500 FCFA payée en espèces au livreur ; vendredi 5 crèmes 20 000 FCFA ; samedi 1 perruque 13 500 FCFA$t$, true, 5),
    ($t$soldes$t$, $t$Quels sont les soldes de départ et de fin, si vous les avez ?$t$, $t$texte$t$, null::jsonb, $t$je compare seulement les paiements reçus de la semaine$t$, false, 6)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F20$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

-- La note par IA : la même pour les 2 modèles
insert into conseils_ia (modele_id, ia, conseil) select mp.id, v.ia, v.conseil
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$chatgpt$t$, $t$Ouvrez la conversation dans le projet de votre kit, pour que vos instructions s'appliquent. Si la skill de la tâche est installée, ChatGPT s'en sert seul.$t$),
    ($t$claude$t$, $t$Ouvrez la conversation dans le projet de votre kit. Si la skill de la tâche est installée, Claude s'en sert seul.$t$),
    ($t$gemini$t$, $t$Ouvrez le Gem de la tâche quand il y en a un, sinon collez la consigne dans le Gem de votre kit.$t$),
    ($t$meta_ai$t$, $t$Collez d'abord la configuration de votre kit, puis la consigne.$t$),
    ($t$copilot$t$, $t$Collez d'abord la configuration de votre kit, puis la consigne.$t$)
  ) as v(ia, conseil)
  where t.code in ($t$F19$t$, $t$F20$t$)
  on conflict (modele_id, ia) do update set conseil = excluded.conseil;

-- 5. Les ressources
insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-compta-chatgpt$t$, $t$configuration$t$, $t$Assistant comptable$t$, $t$Vous le complétez une fois avec les informations de votre activité : ensuite, l'IA connaît vos dossiers, vos catégories, vos outils et vos échéances à chaque conversation.$t$, $t$chatgpt$t$, $t$Vous êtes mon assistant comptable. Vous m'aidez à classer des opérations, à rapprocher un relevé et mon journal, à suivre les pièces et les échéances, et à rédiger mes notes et mes demandes.

MON ACTIVITÉ
Mon rôle : [comptable en cabinet, en entreprise, dans une ONG, à mon compte]
Les dossiers que je tiens : [nombre, secteurs, taille]
Mes outils : [Excel, Google Sheets, logiciel de comptabilité]
Mes catégories ou mes comptes : [ceux que j'utilise]
Les moyens de paiement : [banque, Mobile Money, espèces]
Mes échéances : [fin de mois, rapports, déclarations]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez les clients et les fournisseurs.
2. Montants écrits ainsi : 25 000 FCFA.
3. N'inventez jamais un montant, une date, un compte ou une règle. S'il manque une information, demandez-la.
4. Montrez chaque calcul, pour que je le vérifie.
5. Vous proposez, je valide. Vous ne passez aucune écriture et ne certifiez aucun compte.
6. Fiscalité, paie, droit : vous ne décidez pas. Renvoyez-moi vers l'expert-comptable ou l'administration.
7. Dans le doute, classez la ligne dans « à demander » et rédigez la question.
8. Ne demandez jamais un numéro de compte, un nom complet ni un numéro de téléphone.$t$, $j${"chatgpt": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre activité.", "Dans ChatGPT, choisissez un projet, puis Nouveau projet. Donnez-lui le nom « Ma comptabilité », puis Créer un projet.", "Ouvrez le menu « … » du projet, puis Paramètres du projet. Collez le texte dans le champ Instructions, puis Enregistrer."], "gratuit": "Oui. Les projets sont disponibles sur un compte gratuit, avec 5 fichiers par projet.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Autre possibilité : Paramètres, Personnalisation, Instructions personnalisées. Le texte s'applique alors à toutes vos conversations, dans la limite de 1 500 caractères.", "Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-compta-claude$t$, $t$configuration$t$, $t$Assistant comptable$t$, $t$Vous le complétez une fois avec les informations de votre activité : ensuite, l'IA connaît vos dossiers, vos catégories, vos outils et vos échéances à chaque conversation.$t$, $t$claude$t$, $t$Vous êtes mon assistant comptable. Vous m'aidez à classer des opérations, à rapprocher un relevé et mon journal, à suivre les pièces et les échéances, et à rédiger mes notes et mes demandes.

MON ACTIVITÉ
Mon rôle : [comptable en cabinet, en entreprise, dans une ONG, à mon compte]
Les dossiers que je tiens : [nombre, secteurs, taille]
Mes outils : [Excel, Google Sheets, logiciel de comptabilité]
Mes catégories ou mes comptes : [ceux que j'utilise]
Les moyens de paiement : [banque, Mobile Money, espèces]
Mes échéances : [fin de mois, rapports, déclarations]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez les clients et les fournisseurs.
2. Montants écrits ainsi : 25 000 FCFA.
3. N'inventez jamais un montant, une date, un compte ou une règle. S'il manque une information, demandez-la.
4. Montrez chaque calcul, pour que je le vérifie.
5. Vous proposez, je valide. Vous ne passez aucune écriture et ne certifiez aucun compte.
6. Fiscalité, paie, droit : vous ne décidez pas. Renvoyez-moi vers l'expert-comptable ou l'administration.
7. Dans le doute, classez la ligne dans « à demander » et rédigez la question.
8. Ne demandez jamais un numéro de compte, un nom complet ni un numéro de téléphone.$t$, $j${"claude": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre activité.", "Dans Claude, ouvrez Projets, puis Nouveau projet. Donnez-lui le nom « Ma comptabilité », puis Créer un projet.", "Dans le projet, ouvrez Instructions, puis Ajouter. Collez le texte, puis Enregistrer les instructions."], "gratuit": "Oui, dans la limite de 5 projets.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-compta-gemini$t$, $t$configuration$t$, $t$Assistant comptable$t$, $t$Vous le complétez une fois avec les informations de votre activité : ensuite, l'IA connaît vos dossiers, vos catégories, vos outils et vos échéances à chaque conversation.$t$, $t$gemini$t$, $t$Vous êtes mon assistant comptable. Vous m'aidez à classer des opérations, à rapprocher un relevé et mon journal, à suivre les pièces et les échéances, et à rédiger mes notes et mes demandes.

MON ACTIVITÉ
Mon rôle : [comptable en cabinet, en entreprise, dans une ONG, à mon compte]
Les dossiers que je tiens : [nombre, secteurs, taille]
Mes outils : [Excel, Google Sheets, logiciel de comptabilité]
Mes catégories ou mes comptes : [ceux que j'utilise]
Les moyens de paiement : [banque, Mobile Money, espèces]
Mes échéances : [fin de mois, rapports, déclarations]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez les clients et les fournisseurs.
2. Montants écrits ainsi : 25 000 FCFA.
3. N'inventez jamais un montant, une date, un compte ou une règle. S'il manque une information, demandez-la.
4. Montrez chaque calcul, pour que je le vérifie.
5. Vous proposez, je valide. Vous ne passez aucune écriture et ne certifiez aucun compte.
6. Fiscalité, paie, droit : vous ne décidez pas. Renvoyez-moi vers l'expert-comptable ou l'administration.
7. Dans le doute, classez la ligne dans « à demander » et rédigez la question.
8. Ne demandez jamais un numéro de compte, un nom complet ni un numéro de téléphone.$t$, $j${"gemini": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre activité.", "Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez « Assistant comptable ». Collez le texte dans Instructions, puis Enregistrer."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-classement-des-ecritures$t$, $t$skill$t$, $t$Classement des écritures$t$, $t$Classe des opérations dans les catégories ou les comptes de l'utilisateur et isole celles à éclaircir.$t$, null, $t$---
name: classement-des-ecritures
description: Classe des opérations dans les catégories ou les comptes de l'utilisateur et isole celles à éclaircir. À utiliser quand l'utilisateur colle une liste d'opérations à classer.
---

# Classement des écritures

Quand l'utilisateur colle des opérations, classez chacune dans une de ses catégories, et mettez à part celles qui posent une question.

## Avant d'écrire
Il vous faut : la liste des catégories ou des comptes de l'utilisateur, et les opérations, une par ligne, avec la date, le libellé, le montant et le sens (entrée ou sortie). S'il manque la liste des catégories, demandez-la. Ne la construisez pas vous-même.

## Ce que vous livrez
1. Un tableau : date, libellé, montant, catégorie proposée, raison en quelques mots.
2. Les opérations « à demander », à part, avec la question à poser pour chacune.
3. Le total de chaque catégorie, entrées et sorties séparées. Montrez chaque calcul.
4. Les lignes qui se ressemblent et pourraient être un doublon.

## Règles
- Utilisez seulement les catégories de l'utilisateur. N'en créez pas, et n'attribuez aucun numéro de compte qu'il n'a pas donné.
- Un libellé vague ne se devine pas : la ligne va dans « à demander ».
- Une dépense personnelle du gérant se signale, elle ne se classe pas dans une charge.
- Aucune règle fiscale de votre part. Montants écrits ainsi : 25 000 FCFA.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Ma comptabilité »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$classement-des-ecritures.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-rapprochement-bancaire$t$, $t$skill$t$, $t$Rapprochement bancaire$t$, $t$Rapproche un relevé de banque ou de Mobile Money et un journal, ligne par ligne, et explique l'écart.$t$, null, $t$---
name: rapprochement-bancaire
description: Rapproche un relevé de banque ou de Mobile Money et un journal, ligne par ligne, et explique l'écart. À utiliser quand l'utilisateur colle un relevé et ses écritures.
---

# Rapprochement bancaire

Quand l'utilisateur colle un relevé et son journal sur la même période, pointez les lignes et expliquez l'écart.

## Avant d'écrire
Il vous faut : la période, les lignes du relevé, les lignes du journal, et les soldes de départ et de fin si l'utilisateur les a. S'il manque un des deux côtés, demandez-le. Si les périodes ne sont pas les mêmes, dites-le avant de commencer.

## Ce que vous livrez
1. Les lignes qui se retrouvent des deux côtés, pointées une à une.
2. Les lignes du relevé absentes du journal.
3. Les lignes du journal absentes du relevé.
4. Les montants qui diffèrent pour une même opération, et les lignes en double.
5. Le total de chaque côté, l'écart, puis l'écart expliqué ligne par ligne. La somme des explications doit donner l'écart. Montrez chaque calcul.
6. Les questions à poser et les pièces à demander.

## Règles
- Rapprochez seulement les lignes données. N'en ajoutez aucune.
- Ne supposez pas la cause d'un écart : proposez la question à poser.
- Vous ne passez aucune écriture : c'est l'utilisateur qui corrige son journal.
- Montants écrits ainsi : 25 000 FCFA.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Ma comptabilité »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$rapprochement-bancaire.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-relance-pieces-manquantes$t$, $t$skill$t$, $t$Relance des pièces manquantes$t$, $t$Rédige le message qui réclame une pièce manquante : facture, reçu, relevé, capture de paiement.$t$, null, $t$---
name: relance-pieces-manquantes
description: Rédige le message qui réclame une pièce manquante : facture, reçu, relevé, capture de paiement. À utiliser quand une opération n'a pas son justificatif.
---

# Relance des pièces manquantes

Quand l'utilisateur liste des opérations sans pièce, rédigez le message de demande, court et poli.

## Avant d'écrire
Il vous faut : à qui le message s'adresse (un client, un collègue, un fournisseur), par quel canal (WhatsApp ou e-mail), la liste des opérations sans pièce (date, objet, montant), la pièce attendue pour chacune et la date à laquelle il vous la faut. Demandez aussi si c'est la première demande ou un rappel.

## Ce que vous livrez
1. Un message avec une salutation, la liste des pièces attendues, une par ligne, et la date souhaitée.
2. Une version plus courte, pour un rappel.
3. Une phrase qui explique simplement pourquoi la pièce est nécessaire, sans menace.

## Règles
- Ton respectueux. Jamais de pression, jamais de fausse urgence, jamais de sanction annoncée.
- Sur WhatsApp : texte simple, sans titre ni astérisque, 8 lignes au plus.
- N'ajoutez aucune opération et aucun montant qui n'est pas dans la liste.
- Aucun nom complet, aucun numéro de compte dans le message.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Ma comptabilité »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$relance-pieces-manquantes.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-note-de-synthese$t$, $t$skill$t$, $t$Note de synthèse$t$, $t$Rédige la note de synthèse d'une période à partir des chiffres de l'utilisateur : recettes, dépenses, trésorerie, écarts, décisions.$t$, null, $t$---
name: note-de-synthese
description: Rédige la note de synthèse d'une période à partir des chiffres de l'utilisateur : recettes, dépenses, trésorerie, écarts, décisions. À utiliser en fin de mois ou avant un rendez-vous.
---

# Note de synthèse

Quand l'utilisateur colle les chiffres d'une période, rédigez une note claire pour un lecteur qui n'est pas comptable.

## Avant d'écrire
Il vous faut : le dossier et la période, les totaux par catégorie, la trésorerie par moyen de paiement, les écarts et les points à éclaircir, les pièces manquantes, et le lecteur de la note (gérant, client, responsable, bailleur). S'il manque les chiffres de la période précédente, ne faites aucune comparaison.

## Ce que vous livrez
1. Les chiffres du mois en 5 lignes au plus : recettes, dépenses, résultat de la période. Montrez chaque calcul.
2. La trésorerie par moyen de paiement.
3. Ce qui a changé par rapport à la période précédente, si les chiffres sont donnés.
4. Les points à éclaircir et les pièces manquantes.
5. Les décisions attendues du lecteur, avec une date pour chacune.

## Règles
- Écrivez seulement ce que les chiffres montrent. Aucune cause supposée, aucune prévision.
- Mots simples : expliquez un terme comptable la première fois qu'il apparaît.
- Cette note n'est ni un état financier certifié ni une déclaration : ne la présentez jamais ainsi.
- Montants écrits ainsi : 25 000 FCFA. Si un chiffre manque, écrivez « à préciser ».$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Ma comptabilité »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$note-de-synthese.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-journal-operations$t$, $t$document$t$, $t$Journal des opérations$t$, $t$Ce tableau enregistre chaque opération d'un dossier : la date, le libellé, la catégorie, le moyen de paiement, l'entrée ou la sortie, et si la pièce est reçue. La synthèse donne le total de chaque catégorie et le solde de chaque moyen de paiement.$t$, null, $t$Dans l'onglet « Journal », une ligne par opération : la date, le numéro de la pièce, le libellé, la catégorie, le moyen de paiement, puis le montant dans la colonne des entrées ou dans celle des sorties.
Vous notez si la pièce est reçue. Une opération sans pièce s'affiche en orange.
Dans l'onglet « Catégories », vous écrivez vos propres catégories ou vos comptes. La liste du journal les reprend.
L'onglet « Synthèse » donne les entrées et les sorties de chaque catégorie, le solde de la banque, du Mobile Money et de la caisse, et le nombre d'opérations sans pièce.
Ce tableau est un outil de travail : il ne remplace pas votre logiciel de comptabilité ni les livres obligatoires.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$journal-des-operations.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1BEhoM78Sr3OYtDSOBaaMF2XN4khoYerAJ3DfLh_eiVQ/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-rapprochement$t$, $t$document$t$, $t$Rapprochement bancaire et Mobile Money$t$, $t$Ce tableau compare un relevé de banque ou de Mobile Money avec votre journal, sur une même période : vous pointez les lignes qui se retrouvent des deux côtés, et il donne l'écart et ce qui reste à expliquer.$t$, null, $t$Dans l'onglet « Relevé », une ligne par mouvement du relevé. Dans l'onglet « Journal », une ligne par opération que vous avez enregistrée.
Dans chaque onglet, vous notez « Oui » quand la ligne se retrouve de l'autre côté. Une ligne non pointée s'affiche en orange.
L'onglet « Rapprochement » donne, pour chaque côté, le solde de départ, les entrées, les sorties et le solde de fin, puis l'écart entre les deux soldes.
Il additionne aussi les lignes non pointées de chaque côté : quand elles expliquent tout l'écart, la case de contrôle affiche 0.
Dans ce tableau, n'écrivez ni numéro de compte ni nom complet.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$rapprochement-bancaire-et-mobile-money.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1LQ3Q7Ol5N3Y4aKTxgRXUta2wzBEXQdVN9KtWgx08nH8/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-suivi-pieces-echeances$t$, $t$document$t$, $t$Suivi des pièces et des échéances$t$, $t$Ce tableau suit deux listes : les pièces que vous attendez (facture, reçu, relevé, capture de paiement) et vos échéances. Il compte les jours d'attente, les jours restants, et affiche en rouge ce qui est en retard.$t$, null, $t$Dans l'onglet « Pièces », une ligne par pièce attendue : le dossier, l'opération, le montant, la pièce attendue, la date de la demande et l'état. Le nombre de jours d'attente se calcule seul.
Dans l'onglet « Échéances », une ligne par échéance : ce qu'il faut rendre, pour qui, la date limite et l'état. Le nombre de jours restants se calcule seul, et un retard s'affiche en rouge.
L'onglet « Résumé » compte les pièces en attente, le montant des opérations sans pièce, les échéances de la semaine et les échéances en retard.
Le tableau ne dit pas quelles déclarations vous devez faire ni à quelle date : ces règles viennent de l'administration ou de l'expert-comptable.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$suivi-des-pieces-et-des-echeances.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1xNWRjqzvZJqWsYBGK8nUKEtWi9HkTiM8w4SyAYGZepY/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-note-synthese-mois$t$, $t$document$t$, $t$Note de synthèse du mois$t$, $t$Ce document de deux pages au plus résume un mois pour le gérant ou le client : les recettes et les dépenses, la trésorerie, les écarts à expliquer, les pièces manquantes et les décisions à prendre. Il se remplit sur le téléphone et s'envoie en PDF.$t$, null, $t$Il contient : le dossier et le mois, les chiffres du mois, la trésorerie par moyen de paiement, les écarts et les points à éclaircir, les pièces manquantes, les échéances du mois suivant et les décisions attendues.
Il dit seulement ce que vos chiffres montrent. Il n'est ni un état financier certifié ni une déclaration.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$note-de-synthese-du-mois.docx$t$, $t$https://docs.google.com/document/d/1HQ4HeUG2pHqgiozlCXHM1sGgP7pBqW3pV1re6j1pwkw/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-pointage-lundi$t$, $t$routine$t$, $t$Pointage de la semaine, le lundi$t$, $t$Chaque lundi, l'IA vous rappelle de pointer la semaine passée. Elle ne voit ni votre banque ni votre journal : vous collez les mouvements et ce que vous avez enregistré, puis elle donne les lignes pointées, les écarts et les pièces à demander.$t$, null, $t$Chaque lundi à 8 h, envoyez-moi ce message : « Bonjour. C'est lundi, faisons le pointage de la semaine passée. Collez ici les mouvements de la semaine (banque, Mobile Money, caisse), puis ce que vous avez enregistré dans votre journal. Ne mettez ni numéro de compte ni nom complet. »

Quand j'aurai collé mes lignes :
1. Pointez les lignes qui se retrouvent des deux côtés.
2. Listez les lignes qui manquent d'un côté, et les montants qui diffèrent.
3. Donnez le total de chaque côté et l'écart. Montrez chaque calcul.
4. Listez les opérations sans pièce, et rédigez le message de demande de chacune.

Règles : partez seulement des lignes collées. Ne supposez pas la cause d'un écart : proposez une question. Vous ne passez aucune écriture.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Ma comptabilité »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Ma comptabilité ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Ma comptabilité »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant comptable »."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-pieces-echeances-vendredi$t$, $t$routine$t$, $t$Pièces et échéances, le vendredi$t$, $t$Chaque vendredi, l'IA vous rappelle de faire le point des pièces manquantes et des échéances. Vous collez vos deux listes, puis elle les classe par urgence et rédige les messages de demande.$t$, null, $t$Chaque vendredi à 15 h, envoyez-moi ce message : « Bonjour. C'est vendredi, faisons le point des pièces et des échéances. Collez ici la liste des pièces que vous attendez (dossier, opération, date de la demande) et la liste de vos échéances avec leur date limite. Ne mettez ni nom complet ni numéro. »

Quand j'aurai collé mes listes :
1. Classez les pièces attendues, de la plus ancienne à la plus récente, avec le nombre de jours d'attente.
2. Classez les échéances par date limite, et signalez celles de la semaine qui vient et celles qui sont dépassées.
3. Proposez l'ordre de travail de la semaine prochaine, en 5 lignes.
4. Rédigez le message de rappel pour chaque pièce attendue depuis plus de 7 jours.

Règles : partez seulement de mes listes. N'ajoutez aucune échéance et ne donnez aucune date légale : je les tiens de l'administration ou de l'expert-comptable. Salutation au début de chaque message, jamais de pression.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Ma comptabilité »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Ma comptabilité ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Ma comptabilité »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant comptable »."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

-- 6. Le kit : présentation, étapes d'installation, encadrés « À savoir », mots expliqués
insert into kits (metier_id, titre, presentation, etapes, prerequis, limites, a_savoir, mots, revu_le) select m.id, $t$Comptabilité$t$, $t$Tout ce qu'il faut pour classer des opérations, rapprocher un relevé de banque ou de Mobile Money, réclamer les pièces manquantes, suivre les échéances et rédiger la note du mois, avec une IA gratuite, sur un téléphone Android : une configuration, quatre skills, quatre documents, deux routines et seize tâches.$t$, $j$[{"numero": 1, "titre": "Configurer mon IA avec « Assistant comptable »", "minutes": 5}, {"numero": 2, "titre": "Installer mes 3 premières skills : classement des écritures, rapprochement bancaire, relance des pièces manquantes", "minutes": 10}, {"numero": 3, "titre": "Copier mes documents : journal des opérations, rapprochement bancaire et Mobile Money, suivi des pièces et des échéances", "minutes": 5}]$j$::jsonb, $j$["Un téléphone Android avec une connexion, même limitée.", "WhatsApp, pour recevoir les pièces et envoyer vos demandes.", "Un compte Google et les applications gratuites Google Sheets et Google Docs, pour ouvrir les documents.", "Une IA gratuite au choix : ChatGPT, Claude ou Gemini."]$j$::jsonb, $j$["Il ne remplace ni l'expert-comptable ni le commissaire aux comptes. Une IA ne certifie aucun compte et ne passe aucune écriture à votre place.", "Il ne donne aucun conseil fiscal, social ou juridique. Pour une déclaration, un taux ou une facture normalisée, adressez-vous à l'administration ou à l'expert-comptable.", "Il ne choisit pas vos comptes : l'IA classe dans les catégories et les comptes que vous lui donnez.", "Il ne vous demande jamais de coller dans une IA un numéro de compte, un nom complet ou un numéro de téléphone.", "Il ne promet aucun résultat chiffré."]$j$::jsonb, $j${"chatgpt": "OpenAI retire les GPT personnalisés le 11 décembre 2026 et les remplace par les plugins. Ce kit n'utilise donc aucun GPT personnalisé : votre configuration se colle dans un projet, et chaque skill s'ajoute dans la rubrique Plugins, onglet Skills, ou se colle au début de la conversation. Si vous avez déjà vos propres GPT, pensez à les convertir en plugins avant cette date.", "gemini": "Google remplace les Gems par les skills en novembre 2026. Vos Gems seront convertis automatiquement. Les étapes de ce kit seront mises à jour à ce moment-là, et vous serez prévenu dans l'application."}$j$::jsonb, $j$[{"mot": "Configuration", "phrase": "Un texte d'instructions que l'IA garde en mémoire, pour ne pas tout réexpliquer à chaque conversation."}, {"mot": "Projet", "phrase": "Un dossier de conversations qui partagent les mêmes instructions."}, {"mot": "Skill", "phrase": "Une consigne enregistrée que l'IA applique quand le sujet s'y prête."}, {"mot": "Consigne, ou prompt", "phrase": "Le texte que l'on écrit à l'IA pour lui demander un travail."}, {"mot": "Modèle à remplir", "phrase": "Une consigne déjà rédigée, où il ne reste qu'à remplir quelques champs."}, {"mot": "Champ", "phrase": "Une case du formulaire, à remplir avec vos propres informations."}, {"mot": "Routine", "phrase": "Une demande qui revient à jour fixe."}, {"mot": "Tâche planifiée", "phrase": "Une demande que l'IA lance seule, au jour choisi."}, {"mot": "Opération", "phrase": "Un mouvement d'argent : une entrée ou une sortie, avec sa date, son libellé et son montant."}, {"mot": "Pièce", "phrase": "Le document qui prouve une opération : facture, reçu, relevé, capture de paiement."}, {"mot": "Journal", "phrase": "La liste des opérations que vous avez enregistrées, dans l'ordre des dates."}, {"mot": "Relevé", "phrase": "La liste des mouvements d'un compte, fournie par la banque ou par le service de Mobile Money."}, {"mot": "Catégorie, ou compte", "phrase": "La rubrique où l'on range une opération : ventes, achats, loyer, salaires."}, {"mot": "Rapprochement", "phrase": "La comparaison, ligne par ligne, d'un relevé et de votre journal sur la même période."}, {"mot": "Pointer", "phrase": "Marquer une ligne qui se retrouve des deux côtés."}, {"mot": "Écart", "phrase": "La différence entre deux totaux qui devraient être égaux."}, {"mot": "Trésorerie", "phrase": "L'argent disponible à une date : en banque, en Mobile Money et en caisse."}, {"mot": "Échéance", "phrase": "La date limite pour rendre un travail, payer ou déclarer."}, {"mot": "Note de synthèse", "phrase": "Un résumé court d'une période, écrit pour un lecteur qui n'est pas comptable."}, {"mot": "SYSCOHADA", "phrase": "Le plan comptable commun aux pays de la zone OHADA."}, {"mot": "Mobile Money", "phrase": "Le paiement par téléphone : MTN MoMo, Moov Money, Orange Money, Wave et les autres services du pays."}, {"mot": "Gem", "phrase": "Un assistant Gemini enregistré avec ses propres instructions, que l'on rouvre d'un geste."}, {"mot": "Plugin", "phrase": "Un ajout que l'on installe dans ChatGPT et qui contient des consignes prêtes à servir ; il remplace le GPT personnalisé."}]$j$::jsonb, '2026-10-04' from metiers m
  where m.slug = $t$comptabilite$t$
  on conflict (metier_id) do update set titre = excluded.titre, presentation = excluded.presentation, etapes = excluded.etapes, prerequis = excluded.prerequis, limites = excluded.limites, a_savoir = excluded.a_savoir, mots = excluded.mots, revu_le = excluded.revu_le;

-- 7. Les ressources du kit, dans l'ordre, avec leur étape d'installation
insert into kits_metier (metier_id, ressource_id, ordre, etape_installation) select m.id, r.id, v.ordre, v.etape
  from metiers m, ressources r,
  (values
    ($t$config-compta-chatgpt$t$, 1, 1),
    ($t$config-compta-claude$t$, 2, 1),
    ($t$config-compta-gemini$t$, 3, 1),
    ($t$skill-classement-des-ecritures$t$, 4, 2),
    ($t$skill-rapprochement-bancaire$t$, 5, 2),
    ($t$skill-relance-pieces-manquantes$t$, 6, 2),
    ($t$doc-journal-operations$t$, 7, 3),
    ($t$doc-rapprochement$t$, 8, 3),
    ($t$doc-suivi-pieces-echeances$t$, 9, 3),
    ($t$skill-note-de-synthese$t$, 10, null::integer),
    ($t$doc-note-synthese-mois$t$, 11, null::integer),
    ($t$routine-pointage-lundi$t$, 12, null::integer),
    ($t$routine-pieces-echeances-vendredi$t$, 13, null::integer)
  ) as v(cle, ordre, etape)
  where m.slug = $t$comptabilite$t$ and r.cle = v.cle
  on conflict (metier_id, ressource_id) do update set ordre = excluded.ordre, etape_installation = excluded.etape_installation;

-- 8. Quelles ressources servent à quelles tâches
insert into ressources_taches (ressource_id, tache_id) select r.id, t.id
  from ressources r, taches t,
  (values
    ($t$skill-classement-des-ecritures$t$, $t$F19$t$),
    ($t$doc-journal-operations$t$, $t$F19$t$),
    ($t$skill-relance-pieces-manquantes$t$, $t$F19$t$),
    ($t$routine-pointage-lundi$t$, $t$F19$t$),
    ($t$config-compta-chatgpt$t$, $t$F19$t$),
    ($t$config-compta-claude$t$, $t$F19$t$),
    ($t$config-compta-gemini$t$, $t$F19$t$),
    ($t$skill-rapprochement-bancaire$t$, $t$F20$t$),
    ($t$doc-rapprochement$t$, $t$F20$t$),
    ($t$skill-relance-pieces-manquantes$t$, $t$F20$t$),
    ($t$routine-pointage-lundi$t$, $t$F20$t$),
    ($t$config-compta-chatgpt$t$, $t$F20$t$),
    ($t$config-compta-claude$t$, $t$F20$t$),
    ($t$config-compta-gemini$t$, $t$F20$t$),
    ($t$config-compta-chatgpt$t$, $t$F01$t$),
    ($t$config-compta-claude$t$, $t$F01$t$),
    ($t$config-compta-gemini$t$, $t$F01$t$),
    ($t$skill-relance-pieces-manquantes$t$, $t$F01$t$),
    ($t$config-compta-chatgpt$t$, $t$F03$t$),
    ($t$config-compta-claude$t$, $t$F03$t$),
    ($t$config-compta-gemini$t$, $t$F03$t$),
    ($t$skill-note-de-synthese$t$, $t$F03$t$),
    ($t$doc-note-synthese-mois$t$, $t$F03$t$),
    ($t$config-compta-chatgpt$t$, $t$F04$t$),
    ($t$config-compta-claude$t$, $t$F04$t$),
    ($t$config-compta-gemini$t$, $t$F04$t$),
    ($t$skill-note-de-synthese$t$, $t$F04$t$),
    ($t$config-compta-chatgpt$t$, $t$F05$t$),
    ($t$config-compta-claude$t$, $t$F05$t$),
    ($t$config-compta-gemini$t$, $t$F05$t$),
    ($t$doc-suivi-pieces-echeances$t$, $t$F05$t$),
    ($t$routine-pieces-echeances-vendredi$t$, $t$F05$t$),
    ($t$config-compta-chatgpt$t$, $t$F07$t$),
    ($t$config-compta-claude$t$, $t$F07$t$),
    ($t$config-compta-gemini$t$, $t$F07$t$),
    ($t$config-compta-chatgpt$t$, $t$F08$t$),
    ($t$config-compta-claude$t$, $t$F08$t$),
    ($t$config-compta-gemini$t$, $t$F08$t$),
    ($t$skill-note-de-synthese$t$, $t$F08$t$),
    ($t$doc-journal-operations$t$, $t$F08$t$),
    ($t$doc-note-synthese-mois$t$, $t$F08$t$),
    ($t$config-compta-chatgpt$t$, $t$F11$t$),
    ($t$config-compta-claude$t$, $t$F11$t$),
    ($t$config-compta-gemini$t$, $t$F11$t$),
    ($t$skill-classement-des-ecritures$t$, $t$F11$t$),
    ($t$doc-journal-operations$t$, $t$F11$t$),
    ($t$config-compta-chatgpt$t$, $t$F12$t$),
    ($t$config-compta-claude$t$, $t$F12$t$),
    ($t$config-compta-gemini$t$, $t$F12$t$),
    ($t$skill-relance-pieces-manquantes$t$, $t$F12$t$),
    ($t$doc-suivi-pieces-echeances$t$, $t$F12$t$),
    ($t$config-compta-chatgpt$t$, $t$F13$t$),
    ($t$config-compta-claude$t$, $t$F13$t$),
    ($t$config-compta-gemini$t$, $t$F13$t$),
    ($t$doc-suivi-pieces-echeances$t$, $t$F13$t$),
    ($t$config-compta-chatgpt$t$, $t$F14$t$),
    ($t$config-compta-claude$t$, $t$F14$t$),
    ($t$config-compta-gemini$t$, $t$F14$t$),
    ($t$config-compta-chatgpt$t$, $t$F15$t$),
    ($t$config-compta-claude$t$, $t$F15$t$),
    ($t$config-compta-gemini$t$, $t$F15$t$),
    ($t$skill-note-de-synthese$t$, $t$F15$t$),
    ($t$config-compta-chatgpt$t$, $t$F16$t$),
    ($t$config-compta-claude$t$, $t$F16$t$),
    ($t$config-compta-gemini$t$, $t$F16$t$),
    ($t$doc-suivi-pieces-echeances$t$, $t$F16$t$),
    ($t$routine-pieces-echeances-vendredi$t$, $t$F16$t$),
    ($t$config-compta-chatgpt$t$, $t$F21$t$),
    ($t$config-compta-claude$t$, $t$F21$t$),
    ($t$config-compta-gemini$t$, $t$F21$t$),
    ($t$doc-suivi-pieces-echeances$t$, $t$F21$t$),
    ($t$routine-pieces-echeances-vendredi$t$, $t$F21$t$),
    ($t$config-compta-chatgpt$t$, $t$F22$t$),
    ($t$config-compta-claude$t$, $t$F22$t$),
    ($t$config-compta-gemini$t$, $t$F22$t$),
    ($t$doc-suivi-pieces-echeances$t$, $t$F22$t$)
  ) as v(cle, code)
  where r.cle = v.cle and t.code = v.code
  on conflict (ressource_id, tache_id) do nothing;

-- 9. Contrôle final : si quelque chose manque, tout est annulé.
do $controle$
declare
  n integer;
begin
  if not exists (select 1 from metiers where slug = $t$comptabilite$t$ and description_local is not null) then
    raise exception 'Métier introuvable : comptabilite';
  end if;
  select count(*) into n from (values
    ($t$F19$t$, $t$Catégorisation des transactions comptables$t$),
    ($t$F20$t$, $t$Rapprochement bancaire et examen des écarts$t$)
  ) as v(code, titre) join taches t on t.code = v.code and t.titre = v.titre and t.resultat is not null;
  if n <> 2 then
    raise exception 'Tâches attendues : 2, trouvées avec le bon titre : %', n;
  end if;
  select count(*) into n from exercices e join taches t on t.id = e.tache_id
    where t.code in ($t$F19$t$, $t$F20$t$) and e.titre_local is not null and e.prenom is not null;
  if n <> 4 then
    raise exception 'Cas localisés attendus : 4, trouvés : %', n;
  end if;
  -- Chaque tâche du kit, neuve ou déjà écrite, a son modèle et ses deux cas localisés.
  select count(*) into n from taches t where t.code in ($t$F19$t$, $t$F20$t$, $t$F01$t$, $t$F03$t$, $t$F04$t$, $t$F05$t$, $t$F07$t$, $t$F08$t$, $t$F11$t$, $t$F12$t$, $t$F13$t$, $t$F14$t$, $t$F15$t$, $t$F16$t$, $t$F21$t$, $t$F22$t$)
    and exists (select 1 from modeles_prompts mp where mp.tache_id = t.id)
    and (select count(*) from exercices e where e.tache_id = t.id and e.titre_local is not null) = 2;
  if n <> 16 then
    raise exception 'Tâches complètes attendues : 16, trouvées : %', n;
  end if;
  select count(*) into n from kits_metier km join metiers m on m.id = km.metier_id where m.slug = $t$comptabilite$t$;
  if n <> 13 then
    raise exception 'Ressources du kit attendues : 13, trouvées : %', n;
  end if;
  -- Toutes les tâches du métier sont dans le kit, et aucune autre.
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id join taches t on t.id = mt.tache_id
    where m.slug = $t$comptabilite$t$ and t.code in ($t$F19$t$, $t$F20$t$, $t$F01$t$, $t$F03$t$, $t$F04$t$, $t$F05$t$, $t$F07$t$, $t$F08$t$, $t$F11$t$, $t$F12$t$, $t$F13$t$, $t$F14$t$, $t$F15$t$, $t$F16$t$, $t$F21$t$, $t$F22$t$);
  if n <> 16 then
    raise exception 'Tâches du métier attendues : 16, trouvées : %', n;
  end if;
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id where m.slug = $t$comptabilite$t$;
  if n <> 16 then
    raise exception 'Le métier a % tâches, le kit en couvre 16', n;
  end if;
  -- Chaque tâche du métier a au moins une ressource de ce kit.
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id
    where m.slug = $t$comptabilite$t$ and not exists (
      select 1 from ressources_taches rt join kits_metier km on km.ressource_id = rt.ressource_id
      where rt.tache_id = mt.tache_id and km.metier_id = m.id);
  if n <> 0 then
    raise exception 'Tâches du métier sans ressource du kit : %', n;
  end if;
end
$controle$;

commit;
