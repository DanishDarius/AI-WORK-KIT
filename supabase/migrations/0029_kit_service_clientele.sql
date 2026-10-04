-- 0029 : contenu du kit « Service clientèle » (4 octobre 2026)
--
-- Ce fichier est fabriqué par un programme à partir du fichier source du kit :
-- les textes en sont copiés tels quels. Il ajoute :
--   - la description localisée du métier « Service clientèle », à côté de l'ancienne ;
--   - le résultat et les étapes de 1 tâches existantes (F25) ;
--   - 2 cas pratiques localisés, deux par tâche, écrits À CÔTÉ des anciens cas ;
--   - le rattachement de 13 tâches déjà écrites par un kit précédent (F01, F03, F04, F05, F06, F08, F10, F11, F12, F13, F14, F16, F26) ;
--   - 1 modèles à remplir, leurs champs, leurs exemples et la note par IA ;
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
update metiers set description_local = $t$Pour toute personne qui répond aux clients : chez un opérateur, dans une microfinance, une boutique en ligne, un service après-vente, ou seule à son compte. Vous travaillez avec WhatsApp Business, le téléphone et Messenger : questions, réclamations, retards de livraison, demandes de remboursement.$t$
  where slug = $t$service-clientele$t$;

-- 2. Les tâches, leur résultat et leurs étapes
update taches set resultat = $t$Chaque demande classée par sujet et par urgence, confiée à la bonne personne, les demandes urgentes en tête, et un accusé de réception prêt pour celles qui attendront.$t$, etapes = $j$["Rassembler les demandes reçues : messages WhatsApp, Messenger, e-mails, appels notés.", "Retirer les noms, les numéros et les références de paiement.", "Remplir le modèle avec vos catégories et les personnes qui traitent, puis copier la consigne dans son IA.", "Vérifier le classement des demandes urgentes, puis transmettre chaque demande à la bonne personne.", "Envoyer l'accusé de réception, et noter chaque demande dans votre tableau de suivi."]$j$::jsonb, precisions = $t$L'IA classe, elle ne répond pas à votre place : relisez chaque message avant de l'envoyer. Elle ne connaît ni vos délais ni vos règles : ne la laissez rien promettre. Ne collez ni nom, ni numéro, ni référence de paiement.$t$
  where code = $t$F25$t$;

-- 3. Les cas pratiques localisés, à côté des anciens
update exercices set titre_local = $t$Téléconseiller dans une boutique en ligne à Dakar$t$, contexte_local = $t$Vous êtes téléconseiller chez Sandaga Mobile, une boutique en ligne de téléphones de 12 personnes, à Dakar. Lundi matin, dix messages reçus pendant le week-end vous attendent sur WhatsApp Business et sur Messenger. Un technicien, un responsable des livraisons, une caissière et le gérant peuvent traiter ce qui ne dépend pas de vous.$t$, donnees_local = $t$- « Bonjour, j'ai payé 65 000 par Wave vendredi pour le téléphone, toujours rien reçu. »
- « C'est combien la livraison à Thiès ? »
- « Le chargeur reçu samedi ne marche pas. Je veux un échange. »
- « Vous avez pris deux fois : deux transferts Wave de 45 000 pour une seule commande. »
- « Le livreur m'a demandé 2 500 alors que vous aviez dit 1 500. »
- « Bonjour, vous recrutez ? »
- « Je veux annuler ma commande de ce matin, je n'ai pas encore payé. »
- « Mon téléphone acheté il y a deux semaines s'éteint tout seul. »
- « Vous avez encore le modèle à 55 000 en noir ? »
- « Troisième message : où est ma commande ? Je vais en parler sur Facebook. »$t$, travail_local = $t$Classez chaque message par sujet et par urgence, dites qui le traite, mettez les urgents en tête, et rédigez l'accusé de réception du message le plus urgent.$t$, prenom = $t$Modou$t$, lieu = $t$Dakar, Sénégal$t$, profil = $t$Structure, 12 personnes$t$, reponse_attendue = $t$Trois messages passent en premier : le paiement pris deux fois (deux transferts de 45 000 FCFA), le client qui a payé 65 000 FCFA et n'a rien reçu, et le client qui écrit pour la troisième fois. Deux messages vont au technicien, trois au responsable des livraisons, un à la caissière. Trois se traitent tout de suite par le téléconseiller : le prix de la livraison, l'annulation et la question sur le modèle. Le message sur le recrutement n'est pas une demande de client : il se transmet au gérant.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F25$t$);

update exercices set titre_local = $t$Réparateur de téléphones à son compte à Bamako$t$, contexte_local = $t$Vous réparez des téléphones, seul, dans un petit atelier de Bamako. Samedi, après une journée chargée, huit messages vous attendent sur WhatsApp. Vous ne pouvez pas tout traiter ce soir : il faut choisir.$t$, donnees_local = $t$- « Bonsoir, mon téléphone est prêt ? Je l'ai déposé mardi. »
- « L'écran que vous avez changé la semaine passée ne s'allume plus. »
- « C'est combien pour changer la batterie de mon téléphone ? »
- « J'ai envoyé l'argent par Orange Money ce matin. Vous pouvez m'envoyer un reçu ? »
- « Je vends des écrans en gros, bon prix. Vous êtes intéressé ? »
- « Vous réparez aussi les tablettes ? »
- « Je peux passer demain à quelle heure ? »
- « Vous m'aviez dit jeudi. On est samedi. Je veux mon téléphone ou mon argent. »$t$, travail_local = $t$Classez chaque message : ce qu'il demande, son urgence, et quand vous y répondez (ce soir, lundi, après vérification à l'atelier). Rédigez la réponse aux deux messages les plus urgents.$t$, prenom = $t$Bakary$t$, lieu = $t$Bamako, Mali$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F25$t$);

-- 4. Les modèles à remplir, leurs champs et la note par IA
insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Tri et orientation des demandes clients$t$, $t$Rôle : Vous m'aidez à trier les demandes que je reçois et à confier chacune à la bonne personne.

Contexte : Mon activité : {{activite}}. Les demandes reçues, sans nom ni numéro : {{demandes}}. Mes catégories : {{categories}}. Qui peut traiter les demandes : {{destinataires}}. Ce qui est urgent pour moi : {{urgence}}.

Travail demandé :
1. Un tableau : la demande en quelques mots, sa catégorie, son urgence (haute, moyenne, basse), qui la traite, et pour quand.
2. Les demandes urgentes en tête, avec la raison.
3. Les demandes de la même personne ou sur le même problème, regroupées.
4. Les demandes qui ne sont pas claires, avec la question à poser.
5. Un accusé de réception de 2 lignes pour les demandes qui ne seront pas traitées aujourd'hui.

Format : un tableau, puis les messages prêts à coller dans WhatsApp, sans titre ni astérisque.

Règle : classez seulement les demandes que je donne. N'inventez ni délai, ni solution, ni promesse : l'accusé de réception dit seulement que la demande est reçue et qui s'en occupe. Dans le doute, classez la demande dans « à préciser ».$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F25$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$réparateur de téléphones à mon compte, à Bamako ; je réponds seul sur WhatsApp$t$, true, 1),
    ($t$demandes$t$, $t$Quelles demandes avez-vous reçues ?$t$, $t$long$t$, null::jsonb, $t$mon téléphone est prêt ? je l'ai déposé mardi ; l'écran changé la semaine passée ne s'allume plus ; c'est combien pour changer la batterie ? ; j'ai payé par Orange Money ce matin, je veux un reçu ; je vends des écrans en gros, vous êtes intéressé ? ; vous réparez aussi les tablettes ? ; je peux passer demain à quelle heure ? ; vous m'aviez dit jeudi, on est samedi, je veux mon téléphone ou mon argent$t$, true, 2),
    ($t$categories$t$, $t$Quelles sont vos catégories ?$t$, $t$long$t$, null::jsonb, $t$suivi d'une réparation ; panne revenue après réparation ; demande de prix ; preuve de paiement ; offre d'un fournisseur ; autre question$t$, true, 3),
    ($t$destinataires$t$, $t$Qui peut traiter les demandes ?$t$, $t$texte$t$, null::jsonb, $t$moi seul : je réponds ce soir, lundi, ou après vérification à l'atelier$t$, true, 4),
    ($t$urgence$t$, $t$Qu'est-ce qui est urgent pour vous ?$t$, $t$texte$t$, null::jsonb, $t$un client mécontent, une panne revenue après réparation, un paiement à confirmer$t$, false, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F25$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

-- La note par IA : la même pour les 1 modèles
insert into conseils_ia (modele_id, ia, conseil) select mp.id, v.ia, v.conseil
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$chatgpt$t$, $t$Ouvrez la conversation dans le projet de votre kit, pour que vos instructions s'appliquent. Si la skill de la tâche est installée, ChatGPT s'en sert seul.$t$),
    ($t$claude$t$, $t$Ouvrez la conversation dans le projet de votre kit. Si la skill de la tâche est installée, Claude s'en sert seul.$t$),
    ($t$gemini$t$, $t$Ouvrez le Gem de la tâche quand il y en a un, sinon collez la consigne dans le Gem de votre kit.$t$),
    ($t$meta_ai$t$, $t$Collez d'abord la configuration de votre kit, puis la consigne.$t$),
    ($t$copilot$t$, $t$Collez d'abord la configuration de votre kit, puis la consigne.$t$)
  ) as v(ia, conseil)
  where t.code in ($t$F25$t$)
  on conflict (modele_id, ia) do update set conseil = excluded.conseil;

-- 5. Les ressources
insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-service-client-chatgpt$t$, $t$configuration$t$, $t$Assistant service client$t$, $t$Vous le complétez une fois avec les informations de votre service : ensuite, l'IA connaît vos produits, vos canaux, vos règles et votre ton à chaque conversation.$t$, $t$chatgpt$t$, $t$Vous êtes mon assistant service client. Vous m'aidez à trier les demandes, à répondre aux clients, à traiter les réclamations et à comprendre ce que disent les avis.

MON SERVICE
Mon entreprise : [activité, ville, nombre de personnes]
Mon rôle : [conseiller, téléconseiller, responsable, gérant]
Ce que nous vendons : [produits ou services]
Nos canaux : [WhatsApp Business, appels, Messenger, e-mail]
Nos règles : [délais, livraison, échange, remboursement]
Qui traite quoi : [livraison, paiement, technique, responsable]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoiement. Une salutation au début de chaque message.
2. Ton calme et respectueux, même si le client est en colère. Jamais de reproche.
3. N'inventez jamais un délai, un prix, une règle ou une solution. S'il manque une information, demandez-la.
4. Ne promettez rien que je n'ai pas décidé : ni remboursement, ni geste, ni date.
5. Une réponse à une réclamation : reconnaître le problème, dire ce qui est fait, dire la suite et pour quand.
6. Textes prêts à coller dans WhatsApp : ni titre, ni astérisque, 6 lignes au plus.
7. Aucun conseil juridique : renvoyez-moi vers mon responsable.
8. Ne demandez jamais le nom complet, le numéro ou la référence de paiement d'un client.$t$, $j${"chatgpt": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre service.", "Dans ChatGPT, choisissez un projet, puis Nouveau projet. Donnez-lui le nom « Mon service client », puis Créer un projet.", "Ouvrez le menu « … » du projet, puis Paramètres du projet. Collez le texte dans le champ Instructions, puis Enregistrer."], "gratuit": "Oui. Les projets sont disponibles sur un compte gratuit, avec 5 fichiers par projet.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Autre possibilité : Paramètres, Personnalisation, Instructions personnalisées. Le texte s'applique alors à toutes vos conversations, dans la limite de 1 500 caractères.", "Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-service-client-claude$t$, $t$configuration$t$, $t$Assistant service client$t$, $t$Vous le complétez une fois avec les informations de votre service : ensuite, l'IA connaît vos produits, vos canaux, vos règles et votre ton à chaque conversation.$t$, $t$claude$t$, $t$Vous êtes mon assistant service client. Vous m'aidez à trier les demandes, à répondre aux clients, à traiter les réclamations et à comprendre ce que disent les avis.

MON SERVICE
Mon entreprise : [activité, ville, nombre de personnes]
Mon rôle : [conseiller, téléconseiller, responsable, gérant]
Ce que nous vendons : [produits ou services]
Nos canaux : [WhatsApp Business, appels, Messenger, e-mail]
Nos règles : [délais, livraison, échange, remboursement]
Qui traite quoi : [livraison, paiement, technique, responsable]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoiement. Une salutation au début de chaque message.
2. Ton calme et respectueux, même si le client est en colère. Jamais de reproche.
3. N'inventez jamais un délai, un prix, une règle ou une solution. S'il manque une information, demandez-la.
4. Ne promettez rien que je n'ai pas décidé : ni remboursement, ni geste, ni date.
5. Une réponse à une réclamation : reconnaître le problème, dire ce qui est fait, dire la suite et pour quand.
6. Textes prêts à coller dans WhatsApp : ni titre, ni astérisque, 6 lignes au plus.
7. Aucun conseil juridique : renvoyez-moi vers mon responsable.
8. Ne demandez jamais le nom complet, le numéro ou la référence de paiement d'un client.$t$, $j${"claude": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre service.", "Dans Claude, ouvrez Projets, puis Nouveau projet. Donnez-lui le nom « Mon service client », puis Créer un projet.", "Dans le projet, ouvrez Instructions, puis Ajouter. Collez le texte, puis Enregistrer les instructions."], "gratuit": "Oui, dans la limite de 5 projets.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-service-client-gemini$t$, $t$configuration$t$, $t$Assistant service client$t$, $t$Vous le complétez une fois avec les informations de votre service : ensuite, l'IA connaît vos produits, vos canaux, vos règles et votre ton à chaque conversation.$t$, $t$gemini$t$, $t$Vous êtes mon assistant service client. Vous m'aidez à trier les demandes, à répondre aux clients, à traiter les réclamations et à comprendre ce que disent les avis.

MON SERVICE
Mon entreprise : [activité, ville, nombre de personnes]
Mon rôle : [conseiller, téléconseiller, responsable, gérant]
Ce que nous vendons : [produits ou services]
Nos canaux : [WhatsApp Business, appels, Messenger, e-mail]
Nos règles : [délais, livraison, échange, remboursement]
Qui traite quoi : [livraison, paiement, technique, responsable]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoiement. Une salutation au début de chaque message.
2. Ton calme et respectueux, même si le client est en colère. Jamais de reproche.
3. N'inventez jamais un délai, un prix, une règle ou une solution. S'il manque une information, demandez-la.
4. Ne promettez rien que je n'ai pas décidé : ni remboursement, ni geste, ni date.
5. Une réponse à une réclamation : reconnaître le problème, dire ce qui est fait, dire la suite et pour quand.
6. Textes prêts à coller dans WhatsApp : ni titre, ni astérisque, 6 lignes au plus.
7. Aucun conseil juridique : renvoyez-moi vers mon responsable.
8. Ne demandez jamais le nom complet, le numéro ou la référence de paiement d'un client.$t$, $j${"gemini": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre service.", "Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez « Assistant service client ». Collez le texte dans Instructions, puis Enregistrer."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-tri-des-demandes$t$, $t$skill$t$, $t$Tri des demandes$t$, $t$Classe les demandes des clients par sujet et par urgence, et dit qui doit traiter chacune.$t$, null, $t$---
name: tri-des-demandes
description: Classe les demandes des clients par sujet et par urgence, et dit qui doit traiter chacune. À utiliser quand l'utilisateur colle une série de messages ou de demandes à trier.
---

# Tri des demandes

Quand l'utilisateur colle des demandes, classez-les et dites qui s'en occupe.

## Avant d'écrire
Il vous faut : les demandes, une par ligne, sans nom ni numéro ; les catégories de l'utilisateur ; les personnes ou les services qui traitent chaque sujet ; ce qu'il considère comme urgent. S'il manque les catégories, proposez-en six au plus et demandez son accord avant de classer.

## Ce que vous livrez
1. Un tableau : la demande en quelques mots, la catégorie, l'urgence (haute, moyenne, basse), qui la traite, pour quand.
2. Les demandes urgentes en tête, avec la raison.
3. Les demandes de la même personne ou sur le même problème, regroupées.
4. Les demandes qui ne sont pas claires, avec la question à poser au client.
5. Un accusé de réception de 2 lignes pour celles qui attendront.

## Règles
- Classez seulement les demandes données. N'en ajoutez pas.
- Un paiement contesté, un client qui relance pour la troisième fois ou une menace d'avis public passent en urgence haute.
- L'accusé de réception dit que la demande est reçue et qui s'en occupe. Il ne promet ni délai ni solution.
- Dans le doute, classez la demande dans « à préciser ».$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mon service client »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$tri-des-demandes.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-reponse-reclamation$t$, $t$skill$t$, $t$Réponse à une réclamation$t$, $t$Rédige la réponse à un client mécontent : retard, erreur, panne, paiement contesté, demande de remboursement.$t$, null, $t$---
name: reponse-reclamation
description: Rédige la réponse à un client mécontent : retard, erreur, panne, paiement contesté, demande de remboursement. À utiliser quand l'utilisateur colle une réclamation et ce qu'il a décidé.
---

# Réponse à une réclamation

Quand l'utilisateur colle une réclamation, rédigez une réponse calme, claire et honnête.

## Avant d'écrire
Il vous faut : ce que dit le client, ce que l'utilisateur a vérifié, ce qu'il a décidé (échange, remboursement, nouvelle livraison, refus expliqué) et pour quand, et le canal. S'il n'a encore rien décidé, rédigez seulement un accusé de réception et listez ce qu'il doit vérifier.

## Ce que vous livrez
1. La réponse, en 6 lignes au plus : une salutation, la reconnaissance du problème, ce qui a été vérifié, la solution, la suite et sa date.
2. Une version plus courte, pour un second message.
3. Si la réponse est un refus : l'explication en une phrase, sans reproche, et ce qui reste possible.
4. La ligne à noter dans le registre des demandes : sujet, décision, date.

## Règles
- Écrivez seulement ce que l'utilisateur a décidé. Aucune promesse de votre part : ni délai, ni remboursement, ni geste.
- Pas d'excuse à répétition : une seule, sincère, puis les faits.
- Ne mettez jamais le client en cause. Décrivez ce qui a été constaté.
- Aucun nom complet, aucun numéro, aucune référence de paiement dans le message.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mon service client »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$reponse-reclamation.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-reponses-types$t$, $t$skill$t$, $t$Rédaction des réponses types$t$, $t$Rédige des réponses courtes et polies aux questions qui reviennent : prix, livraison, paiement, horaires, échange.$t$, null, $t$---
name: reponses-types
description: Rédige des réponses courtes et polies aux questions qui reviennent : prix, livraison, paiement, horaires, échange. À utiliser pour préparer les réponses rapides de WhatsApp Business.
---

# Rédaction des réponses types

Quand l'utilisateur liste les questions qui reviennent, rédigez une réponse prête à coller pour chacune.

## Avant d'écrire
Il vous faut : l'activité, les questions telles que les clients les posent, et pour chacune la vraie réponse de l'utilisateur : prix, délai, zone, horaires, règle d'échange. S'il manque une réponse, ne l'inventez pas : demandez-la.

## Ce que vous livrez
1. Pour chaque question : une réponse de 4 lignes au plus, avec une salutation et une question ou une invitation à la fin.
2. Un mot-clé court pour retrouver la réponse dans les réponses rapides de WhatsApp Business.
3. Les réponses qui contiennent un prix ou un délai, signalées : elles seront à relire quand le prix ou le délai changera.
4. Les questions qui ne peuvent pas avoir de réponse type, parce que chaque cas est différent.

## Règles
- Texte simple, sans titre ni astérisque.
- Montants écrits ainsi : 25 000 FCFA. Utilisez seulement les prix de l'utilisateur.
- Une réponse type ne remplace pas l'écoute : pour une réclamation, renvoyez vers une réponse écrite pour ce client.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mon service client »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$reponses-types.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-synthese-des-avis$t$, $t$skill$t$, $t$Synthèse des avis$t$, $t$Résume les avis et les réclamations d'une période : sujets qui reviennent, points à corriger d'abord, réponses à envoyer.$t$, null, $t$---
name: synthese-des-avis
description: Résume les avis et les réclamations d'une période : sujets qui reviennent, points à corriger d'abord, réponses à envoyer. À utiliser quand l'utilisateur colle des avis de clients.
---

# Synthèse des avis

Quand l'utilisateur colle des avis, dites ce que les clients répètent et ce qu'il faut corriger d'abord.

## Avant d'écrire
Il vous faut : les avis de la période, un par ligne, avec la note s'il y en a une, sans nom ni numéro. Demandez combien d'avis il y a en tout : sous dix avis, dites que la synthèse reste fragile.

## Ce que vous livrez
1. Le nombre d'avis, la note moyenne si elle est donnée, avec le calcul.
2. Les sujets qui reviennent, du plus fréquent au plus rare, avec le nombre d'avis et un exemple cité tel quel.
3. Les deux points à corriger d'abord, et pourquoi.
4. Ce que les clients apprécient, à garder.
5. Une réponse prête pour chaque avis négatif resté sans réponse.

## Règles
- Comptez, ne devinez pas : chaque sujet vient avec son nombre d'avis.
- Ne supposez pas la cause d'un problème. Proposez ce qu'il faut vérifier.
- Citez les avis tels qu'ils sont écrits, sans nom.
- Aucune comparaison avec d'autres entreprises, aucun chiffre que l'utilisateur n'a pas donné.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mon service client »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$synthese-des-avis.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-registre-demandes$t$, $t$document$t$, $t$Registre des demandes$t$, $t$Ce tableau suit chaque demande d'un client, de son arrivée à sa solution : le canal, le sujet, l'urgence, la personne qui la traite et le nombre de jours depuis son arrivée. Une demande qui attend trop s'affiche en rouge.$t$, null, $t$Une ligne par demande : la date, le canal, un repère pour le client, le sujet, la demande en quelques mots, l'urgence, la personne à qui elle est confiée et l'état.
Le nombre de jours depuis l'arrivée se calcule seul. Une demande ouverte depuis plus de 3 jours s'affiche en rouge.
Quand la demande est réglée, vous écrivez la date : le délai de résolution se calcule seul.
L'onglet « Résumé » compte les demandes ouvertes, les demandes urgentes, celles qui attendent depuis plus de 3 jours, le délai moyen de résolution et le nombre de demandes par sujet.
Dans ce tableau, n'écrivez ni le nom complet, ni le numéro, ni la référence de paiement d'un client : un repère suffit.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$registre-des-demandes.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/13TIaKo5Rcb1gZMlwhhra3cc-Oeub3NyttZWPEHs-tMk/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-reponses-types$t$, $t$document$t$, $t$Réponses types$t$, $t$Ce tableau garde vos réponses aux questions qui reviennent, classées par sujet : la question du client, votre réponse prête à coller, le canal, et la date de sa dernière relecture.$t$, null, $t$Une ligne par réponse : le sujet, la question telle que le client la pose, la réponse prête à coller, le canal et la date de la dernière relecture.
Une réponse qui n'a pas été relue depuis plus de 90 jours s'affiche en orange : un prix, un délai ou une règle a peut-être changé.
L'onglet « Résumé » compte les réponses par sujet et les réponses à relire.
Les réponses les plus utilisées se copient dans les réponses rapides de WhatsApp Business.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$reponses-types.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/13myzPIaoePF9bu5lzjO6ijjo6INWZkGw-cfJRcHiaSI/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-suivi-satisfaction$t$, $t$document$t$, $t$Suivi de la satisfaction$t$, $t$Ce tableau rassemble les avis de vos clients : la note, le sujet, l'avis en quelques mots, votre réponse et l'action décidée. Il donne la note moyenne, la part des clients contents et les sujets qui fâchent.$t$, null, $t$Une ligne par avis : la date, le canal, la note sur 5, le sujet, l'avis en quelques mots, si vous avez répondu, et l'action décidée.
Un avis à 1 ou 2 resté sans réponse s'affiche en orange.
L'onglet « Résumé » donne le nombre d'avis, la note moyenne, la part des avis à 4 ou 5, le nombre d'avis à 1 ou 2 et le nombre d'avis négatifs par sujet.
Les notes sont celles que vos clients ont données : le tableau n'en invente pas et ne compare pas avec d'autres entreprises.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$suivi-de-la-satisfaction.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1sTu4ZfBpTRX_t0-gX0zbFXd4nOOI-5qVXjOigvJoz8U/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-fiche-reclamation$t$, $t$document$t$, $t$Fiche de réclamation$t$, $t$Ce document d'une page enregistre une réclamation : ce que le client dit, ce que vous avez vérifié, la solution proposée, la décision et la suite donnée. Il se remplit sur le téléphone et se garde en PDF.$t$, null, $t$Il contient : la date et le canal, le repère du client, l'objet de la réclamation, les faits dans l'ordre, ce qui a été vérifié, la solution proposée, la décision du responsable et le suivi.
Il garde la trace de ce qui a été dit et décidé. Ce n'est ni un procès-verbal ni un document juridique.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$fiche-de-reclamation.docx$t$, $t$https://docs.google.com/document/d/1J8RV2k2H2eUuKXGDHM3oh3D-Kwl72pbTOGQc_sQm_8Q/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-demandes-lundi$t$, $t$routine$t$, $t$Demandes ouvertes, le lundi$t$, $t$Chaque lundi, l'IA vous rappelle de faire le point des demandes ouvertes. Elle ne voit pas vos conversations : vous collez les demandes qui attendent, puis elle les classe par urgence et prépare les messages de relance ou d'excuse.$t$, null, $t$Chaque lundi à 8 h, envoyez-moi ce message : « Bonjour. C'est lundi, faisons le point des demandes ouvertes. Collez ici les demandes qui attendent une réponse ou une solution : date d'arrivée, sujet, en quelques mots, et à qui elle est confiée. Ne mettez ni nom, ni numéro, ni référence de paiement. »

Quand j'aurai collé mes lignes :
1. Classez les demandes de la plus ancienne à la plus récente, avec le nombre de jours d'attente.
2. Signalez les urgentes : paiement contesté, client qui relance, demande ouverte depuis plus de 3 jours.
3. Dites, pour chacune, ce qui manque pour la régler : une vérification, une décision, une réponse d'un collègue.
4. Rédigez le message à envoyer aux clients qui attendent depuis plus de 3 jours.

Règles : partez seulement de mes lignes. Ne promettez au client ni délai ni solution que je n'ai pas donnés. Salutation au début de chaque message.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mon service client »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Mon service client ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mon service client »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant service client »."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-satisfaction-vendredi$t$, $t$routine$t$, $t$Bilan de satisfaction, le vendredi$t$, $t$Chaque vendredi, l'IA vous rappelle de faire le bilan de la satisfaction. Vous collez les avis et les réclamations de la semaine, puis elle donne les sujets qui reviennent et les deux points à corriger d'abord.$t$, null, $t$Chaque vendredi à 16 h, envoyez-moi ce message : « Bonjour. C'est vendredi, faisons le bilan de la satisfaction. Collez ici les avis et les réclamations de la semaine, un par ligne, avec la note s'il y en a une. Ne mettez ni nom ni numéro. »

Quand j'aurai collé mes lignes :
1. Donnez le nombre d'avis, la note moyenne et le nombre d'avis à 1 ou 2. Montrez chaque calcul.
2. Listez les sujets qui reviennent, du plus fréquent au plus rare.
3. Proposez les deux points à corriger d'abord la semaine prochaine.
4. Rédigez une réponse pour chaque avis négatif resté sans réponse.

Règles : comptez, ne devinez pas. Ne supposez pas la cause d'un problème. Sous dix avis, dites que le bilan reste fragile.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mon service client »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Mon service client ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mon service client »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant service client »."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

-- 6. Le kit : présentation, étapes d'installation, encadrés « À savoir », mots expliqués
insert into kits (metier_id, titre, presentation, etapes, prerequis, limites, a_savoir, mots, revu_le) select m.id, $t$Service clientèle$t$, $t$Tout ce qu'il faut pour trier les demandes, répondre à une réclamation, tenir vos réponses types, suivre chaque demande jusqu'à sa solution et écouter ce que disent vos clients, avec une IA gratuite, sur un téléphone Android : une configuration, quatre skills, quatre documents, deux routines et quatorze tâches.$t$, $j$[{"numero": 1, "titre": "Configurer mon IA avec « Assistant service client »", "minutes": 5}, {"numero": 2, "titre": "Installer mes 3 premières skills : tri des demandes, réponse à une réclamation, rédaction des réponses types", "minutes": 10}, {"numero": 3, "titre": "Copier mes documents : registre des demandes, réponses types, suivi de la satisfaction", "minutes": 5}]$j$::jsonb, $j$["Un téléphone Android avec une connexion, même limitée.", "WhatsApp Business, pour répondre aux clients et enregistrer vos réponses rapides.", "Un compte Google et les applications gratuites Google Sheets et Google Docs, pour ouvrir les documents.", "Une IA gratuite au choix : ChatGPT, Claude ou Gemini."]$j$::jsonb, $j$["Il ne répond pas à votre place. L'IA prépare un message : vous le relisez, vous l'adaptez et vous l'envoyez.", "Il ne promet rien au client à votre place : ni délai, ni remboursement, ni geste commercial que vous n'avez pas décidé.", "Il ne donne aucun conseil juridique. Pour un litige ou un droit du client, adressez-vous à votre responsable ou au professionnel compétent.", "Il ne vous demande jamais de coller dans une IA le nom complet, le numéro, la référence de paiement ou la pièce d'identité d'un client.", "Il ne promet aucun résultat chiffré."]$j$::jsonb, $j${"chatgpt": "OpenAI retire les GPT personnalisés le 11 décembre 2026 et les remplace par les plugins. Ce kit n'utilise donc aucun GPT personnalisé : votre configuration se colle dans un projet, et chaque skill s'ajoute dans la rubrique Plugins, onglet Skills, ou se colle au début de la conversation. Si vous avez déjà vos propres GPT, pensez à les convertir en plugins avant cette date.", "gemini": "Google remplace les Gems par les skills en novembre 2026. Vos Gems seront convertis automatiquement. Les étapes de ce kit seront mises à jour à ce moment-là, et vous serez prévenu dans l'application."}$j$::jsonb, $j$[{"mot": "Configuration", "phrase": "Un texte d'instructions que l'IA garde en mémoire, pour ne pas tout réexpliquer à chaque conversation."}, {"mot": "Projet", "phrase": "Un dossier de conversations qui partagent les mêmes instructions."}, {"mot": "Skill", "phrase": "Une consigne enregistrée que l'IA applique quand le sujet s'y prête."}, {"mot": "Consigne, ou prompt", "phrase": "Le texte que l'on écrit à l'IA pour lui demander un travail."}, {"mot": "Modèle à remplir", "phrase": "Une consigne déjà rédigée, où il ne reste qu'à remplir quelques champs."}, {"mot": "Champ", "phrase": "Une case du formulaire, à remplir avec vos propres informations."}, {"mot": "Routine", "phrase": "Une demande qui revient à jour fixe."}, {"mot": "Tâche planifiée", "phrase": "Une demande que l'IA lance seule, au jour choisi."}, {"mot": "Demande", "phrase": "Tout message d'un client qui attend une réponse : question, commande, plainte."}, {"mot": "Réclamation", "phrase": "Le message d'un client mécontent, qui attend une solution."}, {"mot": "Canal", "phrase": "Le moyen par lequel le client vous écrit ou vous appelle : WhatsApp, appel, Messenger, e-mail."}, {"mot": "Accusé de réception", "phrase": "Le court message qui dit au client que sa demande est bien reçue et qui s'en occupe."}, {"mot": "Urgence", "phrase": "Le degré de priorité d'une demande : haute, moyenne ou basse."}, {"mot": "Réponse type", "phrase": "Une réponse déjà rédigée, pour une question qui revient souvent."}, {"mot": "Réponse rapide", "phrase": "Dans WhatsApp Business, une réponse enregistrée que l'on envoie en tapant un mot-clé."}, {"mot": "FAQ", "phrase": "La liste des questions fréquentes, avec leur réponse."}, {"mot": "Délai de résolution", "phrase": "Le nombre de jours entre l'arrivée d'une demande et sa solution."}, {"mot": "Avis", "phrase": "Ce qu'un client dit de vous après un achat ou un service, avec ou sans note."}, {"mot": "Satisfaction", "phrase": "Le degré de contentement de vos clients, mesuré par leurs notes et leurs avis."}, {"mot": "Geste commercial", "phrase": "Ce que l'on offre à un client pour réparer un désagrément : réduction, livraison offerte, échange."}, {"mot": "Gem", "phrase": "Un assistant Gemini enregistré avec ses propres instructions, que l'on rouvre d'un geste."}, {"mot": "Plugin", "phrase": "Un ajout que l'on installe dans ChatGPT et qui contient des consignes prêtes à servir ; il remplace le GPT personnalisé."}]$j$::jsonb, '2026-10-04' from metiers m
  where m.slug = $t$service-clientele$t$
  on conflict (metier_id) do update set titre = excluded.titre, presentation = excluded.presentation, etapes = excluded.etapes, prerequis = excluded.prerequis, limites = excluded.limites, a_savoir = excluded.a_savoir, mots = excluded.mots, revu_le = excluded.revu_le;

-- 7. Les ressources du kit, dans l'ordre, avec leur étape d'installation
insert into kits_metier (metier_id, ressource_id, ordre, etape_installation) select m.id, r.id, v.ordre, v.etape
  from metiers m, ressources r,
  (values
    ($t$config-service-client-chatgpt$t$, 1, 1),
    ($t$config-service-client-claude$t$, 2, 1),
    ($t$config-service-client-gemini$t$, 3, 1),
    ($t$skill-tri-des-demandes$t$, 4, 2),
    ($t$skill-reponse-reclamation$t$, 5, 2),
    ($t$skill-reponses-types$t$, 6, 2),
    ($t$doc-registre-demandes$t$, 7, 3),
    ($t$doc-reponses-types$t$, 8, 3),
    ($t$doc-suivi-satisfaction$t$, 9, 3),
    ($t$skill-synthese-des-avis$t$, 10, null::integer),
    ($t$doc-fiche-reclamation$t$, 11, null::integer),
    ($t$routine-demandes-lundi$t$, 12, null::integer),
    ($t$routine-satisfaction-vendredi$t$, 13, null::integer)
  ) as v(cle, ordre, etape)
  where m.slug = $t$service-clientele$t$ and r.cle = v.cle
  on conflict (metier_id, ressource_id) do update set ordre = excluded.ordre, etape_installation = excluded.etape_installation;

-- 8. Quelles ressources servent à quelles tâches
insert into ressources_taches (ressource_id, tache_id) select r.id, t.id
  from ressources r, taches t,
  (values
    ($t$skill-tri-des-demandes$t$, $t$F25$t$),
    ($t$skill-reponse-reclamation$t$, $t$F25$t$),
    ($t$doc-registre-demandes$t$, $t$F25$t$),
    ($t$doc-fiche-reclamation$t$, $t$F25$t$),
    ($t$routine-demandes-lundi$t$, $t$F25$t$),
    ($t$config-service-client-chatgpt$t$, $t$F25$t$),
    ($t$config-service-client-claude$t$, $t$F25$t$),
    ($t$config-service-client-gemini$t$, $t$F25$t$),
    ($t$config-service-client-chatgpt$t$, $t$F01$t$),
    ($t$config-service-client-claude$t$, $t$F01$t$),
    ($t$config-service-client-gemini$t$, $t$F01$t$),
    ($t$skill-tri-des-demandes$t$, $t$F01$t$),
    ($t$config-service-client-chatgpt$t$, $t$F03$t$),
    ($t$config-service-client-claude$t$, $t$F03$t$),
    ($t$config-service-client-gemini$t$, $t$F03$t$),
    ($t$doc-fiche-reclamation$t$, $t$F03$t$),
    ($t$config-service-client-chatgpt$t$, $t$F04$t$),
    ($t$config-service-client-claude$t$, $t$F04$t$),
    ($t$config-service-client-gemini$t$, $t$F04$t$),
    ($t$config-service-client-chatgpt$t$, $t$F05$t$),
    ($t$config-service-client-claude$t$, $t$F05$t$),
    ($t$config-service-client-gemini$t$, $t$F05$t$),
    ($t$config-service-client-chatgpt$t$, $t$F06$t$),
    ($t$config-service-client-claude$t$, $t$F06$t$),
    ($t$config-service-client-gemini$t$, $t$F06$t$),
    ($t$skill-reponses-types$t$, $t$F06$t$),
    ($t$doc-reponses-types$t$, $t$F06$t$),
    ($t$config-service-client-chatgpt$t$, $t$F08$t$),
    ($t$config-service-client-claude$t$, $t$F08$t$),
    ($t$config-service-client-gemini$t$, $t$F08$t$),
    ($t$doc-registre-demandes$t$, $t$F08$t$),
    ($t$doc-suivi-satisfaction$t$, $t$F08$t$),
    ($t$routine-satisfaction-vendredi$t$, $t$F08$t$),
    ($t$config-service-client-chatgpt$t$, $t$F10$t$),
    ($t$config-service-client-claude$t$, $t$F10$t$),
    ($t$config-service-client-gemini$t$, $t$F10$t$),
    ($t$doc-registre-demandes$t$, $t$F10$t$),
    ($t$config-service-client-chatgpt$t$, $t$F11$t$),
    ($t$config-service-client-claude$t$, $t$F11$t$),
    ($t$config-service-client-gemini$t$, $t$F11$t$),
    ($t$doc-registre-demandes$t$, $t$F11$t$),
    ($t$config-service-client-chatgpt$t$, $t$F12$t$),
    ($t$config-service-client-claude$t$, $t$F12$t$),
    ($t$config-service-client-gemini$t$, $t$F12$t$),
    ($t$config-service-client-chatgpt$t$, $t$F13$t$),
    ($t$config-service-client-claude$t$, $t$F13$t$),
    ($t$config-service-client-gemini$t$, $t$F13$t$),
    ($t$config-service-client-chatgpt$t$, $t$F14$t$),
    ($t$config-service-client-claude$t$, $t$F14$t$),
    ($t$config-service-client-gemini$t$, $t$F14$t$),
    ($t$skill-reponses-types$t$, $t$F14$t$),
    ($t$config-service-client-chatgpt$t$, $t$F16$t$),
    ($t$config-service-client-claude$t$, $t$F16$t$),
    ($t$config-service-client-gemini$t$, $t$F16$t$),
    ($t$routine-demandes-lundi$t$, $t$F16$t$),
    ($t$config-service-client-chatgpt$t$, $t$F26$t$),
    ($t$config-service-client-claude$t$, $t$F26$t$),
    ($t$config-service-client-gemini$t$, $t$F26$t$),
    ($t$skill-synthese-des-avis$t$, $t$F26$t$),
    ($t$doc-suivi-satisfaction$t$, $t$F26$t$),
    ($t$routine-satisfaction-vendredi$t$, $t$F26$t$)
  ) as v(cle, code)
  where r.cle = v.cle and t.code = v.code
  on conflict (ressource_id, tache_id) do nothing;

-- 9. Contrôle final : si quelque chose manque, tout est annulé.
do $controle$
declare
  n integer;
begin
  if not exists (select 1 from metiers where slug = $t$service-clientele$t$ and description_local is not null) then
    raise exception 'Métier introuvable : service-clientele';
  end if;
  select count(*) into n from (values
    ($t$F25$t$, $t$Tri et orientation des demandes clients$t$)
  ) as v(code, titre) join taches t on t.code = v.code and t.titre = v.titre and t.resultat is not null;
  if n <> 1 then
    raise exception 'Tâches attendues : 1, trouvées avec le bon titre : %', n;
  end if;
  select count(*) into n from exercices e join taches t on t.id = e.tache_id
    where t.code in ($t$F25$t$) and e.titre_local is not null and e.prenom is not null;
  if n <> 2 then
    raise exception 'Cas localisés attendus : 2, trouvés : %', n;
  end if;
  -- Chaque tâche du kit, neuve ou déjà écrite, a son modèle et ses deux cas localisés.
  select count(*) into n from taches t where t.code in ($t$F25$t$, $t$F01$t$, $t$F03$t$, $t$F04$t$, $t$F05$t$, $t$F06$t$, $t$F08$t$, $t$F10$t$, $t$F11$t$, $t$F12$t$, $t$F13$t$, $t$F14$t$, $t$F16$t$, $t$F26$t$)
    and exists (select 1 from modeles_prompts mp where mp.tache_id = t.id)
    and (select count(*) from exercices e where e.tache_id = t.id and e.titre_local is not null) = 2;
  if n <> 14 then
    raise exception 'Tâches complètes attendues : 14, trouvées : %', n;
  end if;
  select count(*) into n from kits_metier km join metiers m on m.id = km.metier_id where m.slug = $t$service-clientele$t$;
  if n <> 13 then
    raise exception 'Ressources du kit attendues : 13, trouvées : %', n;
  end if;
  -- Toutes les tâches du métier sont dans le kit, et aucune autre.
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id join taches t on t.id = mt.tache_id
    where m.slug = $t$service-clientele$t$ and t.code in ($t$F25$t$, $t$F01$t$, $t$F03$t$, $t$F04$t$, $t$F05$t$, $t$F06$t$, $t$F08$t$, $t$F10$t$, $t$F11$t$, $t$F12$t$, $t$F13$t$, $t$F14$t$, $t$F16$t$, $t$F26$t$);
  if n <> 14 then
    raise exception 'Tâches du métier attendues : 14, trouvées : %', n;
  end if;
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id where m.slug = $t$service-clientele$t$;
  if n <> 14 then
    raise exception 'Le métier a % tâches, le kit en couvre 14', n;
  end if;
  -- Chaque tâche du métier a au moins une ressource de ce kit.
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id
    where m.slug = $t$service-clientele$t$ and not exists (
      select 1 from ressources_taches rt join kits_metier km on km.ressource_id = rt.ressource_id
      where rt.tache_id = mt.tache_id and km.metier_id = m.id);
  if n <> 0 then
    raise exception 'Tâches du métier sans ressource du kit : %', n;
  end if;
end
$controle$;

commit;
