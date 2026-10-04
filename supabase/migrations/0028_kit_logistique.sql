-- 0028 : contenu du kit « Logistique / Supply Chain » (4 octobre 2026)
--
-- Ce fichier est fabriqué par un programme à partir du fichier source du kit :
-- les textes en sont copiés tels quels. Il ajoute :
--   - la description localisée du métier « Logistique / Supply Chain », à côté de l'ancienne ;
--   - le rattachement de 17 tâches déjà écrites par un kit précédent (F01, F03, F04, F05, F07, F08, F11, F12, F13, F14, F15, F16, F21, F22, F23, F24, F26) ;
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
update metiers set description_local = $t$Pour toute personne qui fait arriver, stocke et livre des marchandises : chez un distributeur, un transitaire, dans un entrepôt, une boutique en ligne, ou à son compte. Vous travaillez avec Excel ou Google Sheets, WhatsApp et le téléphone : stocks, commandes, expéditions, tournées de livreurs.$t$
  where slug = $t$logistique-supply-chain$t$;

-- 2. Les tâches, leur résultat et leurs étapes
-- 3. Les cas pratiques localisés, à côté des anciens
-- 4. Les modèles à remplir, leurs champs et la note par IA
-- 5. Les ressources
insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-logistique-chatgpt$t$, $t$configuration$t$, $t$Assistant logistique$t$, $t$Vous le complétez une fois avec les informations de votre activité : ensuite, l'IA connaît vos articles, vos fournisseurs, vos délais et vos zones de livraison à chaque conversation.$t$, $t$chatgpt$t$, $t$Vous êtes mon assistant logistique. Vous m'aidez à suivre les stocks, à préparer les commandes, à organiser les livraisons et les tournées, et à écrire aux fournisseurs, aux transporteurs et aux clients.

MON ACTIVITÉ
Ma structure : [type, ville, nombre de personnes]
Mon rôle : [magasinier, responsable logistique, agent de transit, gérant]
Ce que nous stockons ou transportons : [articles, volumes]
Nos fournisseurs : [origine, délai habituel]
Nos livraisons : [zones, moto, camion, transporteur, car]
Mes outils : [Excel, Google Sheets, WhatsApp, appels]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez les fournisseurs, les transporteurs et les clients.
2. Quantités avec leur unité : cartons, sacs, palettes, kg. Montants écrits ainsi : 25 000 FCFA.
3. N'inventez jamais un stock, un délai, une distance, une durée de trajet ou un prix. S'il manque une information, demandez-la.
4. Montrez chaque calcul, pour que je le vérifie.
5. Douane, transit, réglementation : vous ne décidez pas. Renvoyez-moi vers le transitaire agréé ou l'administration.
6. Une prévision n'est pas une certitude : dites ce qui la rend fragile.
7. Textes prêts à coller dans WhatsApp : ni titre, ni astérisque.
8. Ne demandez jamais le nom complet ni le numéro d'une personne.$t$, $j${"chatgpt": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre activité.", "Dans ChatGPT, choisissez un projet, puis Nouveau projet. Donnez-lui le nom « Ma logistique », puis Créer un projet.", "Ouvrez le menu « … » du projet, puis Paramètres du projet. Collez le texte dans le champ Instructions, puis Enregistrer."], "gratuit": "Oui. Les projets sont disponibles sur un compte gratuit, avec 5 fichiers par projet.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Autre possibilité : Paramètres, Personnalisation, Instructions personnalisées. Le texte s'applique alors à toutes vos conversations, dans la limite de 1 500 caractères.", "Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-logistique-claude$t$, $t$configuration$t$, $t$Assistant logistique$t$, $t$Vous le complétez une fois avec les informations de votre activité : ensuite, l'IA connaît vos articles, vos fournisseurs, vos délais et vos zones de livraison à chaque conversation.$t$, $t$claude$t$, $t$Vous êtes mon assistant logistique. Vous m'aidez à suivre les stocks, à préparer les commandes, à organiser les livraisons et les tournées, et à écrire aux fournisseurs, aux transporteurs et aux clients.

MON ACTIVITÉ
Ma structure : [type, ville, nombre de personnes]
Mon rôle : [magasinier, responsable logistique, agent de transit, gérant]
Ce que nous stockons ou transportons : [articles, volumes]
Nos fournisseurs : [origine, délai habituel]
Nos livraisons : [zones, moto, camion, transporteur, car]
Mes outils : [Excel, Google Sheets, WhatsApp, appels]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez les fournisseurs, les transporteurs et les clients.
2. Quantités avec leur unité : cartons, sacs, palettes, kg. Montants écrits ainsi : 25 000 FCFA.
3. N'inventez jamais un stock, un délai, une distance, une durée de trajet ou un prix. S'il manque une information, demandez-la.
4. Montrez chaque calcul, pour que je le vérifie.
5. Douane, transit, réglementation : vous ne décidez pas. Renvoyez-moi vers le transitaire agréé ou l'administration.
6. Une prévision n'est pas une certitude : dites ce qui la rend fragile.
7. Textes prêts à coller dans WhatsApp : ni titre, ni astérisque.
8. Ne demandez jamais le nom complet ni le numéro d'une personne.$t$, $j${"claude": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre activité.", "Dans Claude, ouvrez Projets, puis Nouveau projet. Donnez-lui le nom « Ma logistique », puis Créer un projet.", "Dans le projet, ouvrez Instructions, puis Ajouter. Collez le texte, puis Enregistrer les instructions."], "gratuit": "Oui, dans la limite de 5 projets.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-logistique-gemini$t$, $t$configuration$t$, $t$Assistant logistique$t$, $t$Vous le complétez une fois avec les informations de votre activité : ensuite, l'IA connaît vos articles, vos fournisseurs, vos délais et vos zones de livraison à chaque conversation.$t$, $t$gemini$t$, $t$Vous êtes mon assistant logistique. Vous m'aidez à suivre les stocks, à préparer les commandes, à organiser les livraisons et les tournées, et à écrire aux fournisseurs, aux transporteurs et aux clients.

MON ACTIVITÉ
Ma structure : [type, ville, nombre de personnes]
Mon rôle : [magasinier, responsable logistique, agent de transit, gérant]
Ce que nous stockons ou transportons : [articles, volumes]
Nos fournisseurs : [origine, délai habituel]
Nos livraisons : [zones, moto, camion, transporteur, car]
Mes outils : [Excel, Google Sheets, WhatsApp, appels]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez les fournisseurs, les transporteurs et les clients.
2. Quantités avec leur unité : cartons, sacs, palettes, kg. Montants écrits ainsi : 25 000 FCFA.
3. N'inventez jamais un stock, un délai, une distance, une durée de trajet ou un prix. S'il manque une information, demandez-la.
4. Montrez chaque calcul, pour que je le vérifie.
5. Douane, transit, réglementation : vous ne décidez pas. Renvoyez-moi vers le transitaire agréé ou l'administration.
6. Une prévision n'est pas une certitude : dites ce qui la rend fragile.
7. Textes prêts à coller dans WhatsApp : ni titre, ni astérisque.
8. Ne demandez jamais le nom complet ni le numéro d'une personne.$t$, $j${"gemini": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre activité.", "Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez « Assistant logistique ». Collez le texte dans Instructions, puis Enregistrer."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-suivi-des-livraisons$t$, $t$skill$t$, $t$Suivi des livraisons$t$, $t$Fait le point des livraisons en cours : livré, en route, en retard, et le message à envoyer au client ou au transporteur.$t$, null, $t$---
name: suivi-des-livraisons
description: Fait le point des livraisons en cours : livré, en route, en retard, et le message à envoyer au client ou au transporteur. À utiliser quand l'utilisateur colle sa liste d'expéditions.
---

# Suivi des livraisons

Quand l'utilisateur colle ses expéditions, dites où en est chacune et ce qu'il faut faire maintenant.

## Avant d'écrire
Il vous faut, pour chaque expédition : la destination, le contenu, le transporteur ou le livreur, la date prévue, et la dernière nouvelle reçue. Il vous faut aussi la date du jour. S'il manque une date prévue, demandez-la.

## Ce que vous livrez
1. Un tableau : expédition, destination, date prévue, état (livrée, en route, en retard), jours de retard.
2. Les expéditions en retard, de la plus ancienne à la plus récente, avec ce qu'on sait de la cause.
3. Les livraisons faites sans preuve reçue : bon signé, photo ou message.
4. Pour chaque retard : le message au transporteur ou au livreur, et le message au client, en 4 lignes chacun.
5. La part des livraisons faites à temps, avec le calcul.

## Règles
- Partez seulement des lignes données. Ne supposez pas la cause d'un retard : écrivez « cause à demander ».
- N'annoncez jamais au client une nouvelle date que l'utilisateur n'a pas donnée.
- Messages avec une salutation, sans reproche et sans menace.
- Aucun nom complet, aucun numéro, aucune adresse précise.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Ma logistique »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$suivi-des-livraisons.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-prevision-des-besoins$t$, $t$skill$t$, $t$Prévision des besoins$t$, $t$Calcule la quantité à commander de chaque article à partir des sorties récentes, du stock, du délai et du stock de sécurité.$t$, null, $t$---
name: prevision-des-besoins
description: Calcule la quantité à commander de chaque article à partir des sorties récentes, du stock, du délai et du stock de sécurité. À utiliser avant un réassort ou une commande.
---

# Prévision des besoins

Quand l'utilisateur donne ses sorties et son stock, calculez ce qu'il faut commander et quand.

## Avant d'écrire
Il vous faut, pour chaque article : les sorties des dernières semaines, le stock du jour, le stock de sécurité voulu, le délai de livraison du fournisseur et le conditionnement (carton, sac, palette). Demandez aussi ce qui va changer : fête, saison des pluies, grosse commande. S'il manque un stock ou un délai, demandez-le.

## Ce que vous livrez
1. La moyenne des sorties par semaine et par jour, avec le calcul.
2. Le besoin de la période, puis la quantité à commander : le besoin, plus le stock de sécurité, moins le stock actuel. Arrondissez au conditionnement.
3. Le nombre de jours que couvre le stock actuel, et la date limite pour commander selon le délai.
4. Le budget de la commande, si l'utilisateur donne ses prix d'achat.
5. Ce qui rend la prévision fragile, en 2 lignes.

## Règles
- Utilisez seulement les chiffres de l'utilisateur. Aucune tendance du marché, aucun prix de votre part.
- Montrez chaque calcul. Montants écrits ainsi : 25 000 FCFA.
- Une prévision n'est pas une certitude : rappelez de refaire le calcul chaque semaine.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Ma logistique »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$prevision-des-besoins.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-tournee-de-livraison$t$, $t$skill$t$, $t$Tournée de livraison$t$, $t$Ordonne les arrêts d'une tournée et calcule les heures de passage avec les temps de trajet donnés par l'utilisateur.$t$, null, $t$---
name: tournee-de-livraison
description: Ordonne les arrêts d'une tournée et calcule les heures de passage avec les temps de trajet donnés par l'utilisateur. À utiliser pour préparer une tournée de livraison.
---

# Tournée de livraison

Quand l'utilisateur liste ses arrêts, proposez un ordre de passage et les heures d'arrivée.

## Avant d'écrire
Il vous faut : le point et l'heure de départ, la liste des arrêts (quartier ou ville), le temps de trajet entre les points tel que l'utilisateur le connaît, le temps sur place à chaque arrêt, et les contraintes : heure limite chez un client, marché fermé, pause. S'il manque un temps de trajet, demandez-le. Ne l'estimez pas.

## Ce que vous livrez
1. L'ordre de passage proposé, avec la raison en une ligne.
2. Pour chaque arrêt : l'heure d'arrivée et l'heure de départ, avec le calcul.
3. L'heure de fin de la tournée et sa durée totale.
4. Les arrêts qui ne respectent pas une heure limite, et une solution.
5. Le message à envoyer à chaque client pour annoncer le créneau de passage.

## Règles
- Les temps de trajet sont ceux de l'utilisateur. Vous n'inventez ni distance ni durée.
- Annoncez au client un créneau, pas une heure exacte.
- Gardez une marge : dites-le si la tournée n'en laisse aucune.
- Aucun nom complet, aucun numéro, aucune adresse précise.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Ma logistique »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$tournee-de-livraison.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-message-fournisseur$t$, $t$skill$t$, $t$Message au fournisseur$t$, $t$Rédige un message clair à un fournisseur ou à un transporteur : commande, relance, retard, erreur de livraison, réclamation.$t$, null, $t$---
name: message-fournisseur
description: Rédige un message clair à un fournisseur ou à un transporteur : commande, relance, retard, erreur de livraison, réclamation. À utiliser quand l'utilisateur doit écrire à un partenaire.
---

# Message au fournisseur

Quand l'utilisateur décrit la situation, rédigez le message à envoyer au fournisseur ou au transporteur.

## Avant d'écrire
Il vous faut : à qui le message s'adresse, le canal (WhatsApp ou e-mail), ce qui a été commandé ou expédié (articles, quantités, dates), ce qui pose problème ou ce que l'utilisateur demande, et ce qu'il attend comme réponse et pour quand.

## Ce que vous livrez
1. Le message, avec une salutation : les faits et les dates d'abord, la demande ensuite, la réponse attendue à la fin.
2. La liste des articles et des quantités, une ligne par article, quand il y en a plusieurs.
3. Une version plus courte pour un rappel.
4. Les pièces à joindre : bon de commande, bon de livraison, photo.

## Règles
- Ton ferme et respectueux. Jamais de menace, jamais de fausse urgence.
- Écrivez seulement les faits donnés. N'accusez personne : décrivez ce qui a été constaté.
- Sur WhatsApp : texte simple, sans titre ni astérisque, 8 lignes au plus.
- N'annoncez ni pénalité ni conséquence juridique : ce n'est pas votre rôle.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Ma logistique »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$message-fournisseur.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-suivi-stocks$t$, $t$document$t$, $t$Suivi des stocks$t$, $t$Ce tableau suit le stock de chaque article : vous notez les entrées et les sorties, il calcule le stock actuel et signale les articles à commander, au seuil que vous avez choisi.$t$, null, $t$Dans l'onglet « Articles », une ligne par article : la référence, le nom, l'unité, le stock de départ, votre stock de sécurité et le délai de livraison du fournisseur.
Dans l'onglet « Mouvements », une ligne par entrée ou par sortie : la date, la référence, la quantité et le motif.
Le stock actuel se calcule seul. Il s'affiche en orange au stock de sécurité ou en dessous, en rouge à zéro.
L'onglet « Résumé » compte les articles suivis, les articles à commander et les articles en rupture.
Le tableau compte ce que vous écrivez : il ne remplace pas un inventaire fait devant les rayons.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$suivi-des-stocks.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1WMaXoAIUDzjJPHKZjx_kecCtQu86hpR8qO6q665_mcU/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-suivi-expeditions$t$, $t$document$t$, $t$Suivi des expéditions$t$, $t$Ce tableau suit chaque expédition, du départ à la preuve de livraison : la destination, le transporteur ou le livreur, la date prévue, la date de livraison, les jours de retard et la part des livraisons faites à temps.$t$, null, $t$Une ligne par expédition : le numéro, la date de départ, le destinataire, la destination, le contenu, le transporteur ou le livreur, la date prévue et l'état.
Quand la livraison est faite, vous écrivez sa date. Le nombre de jours de retard se calcule seul, et un retard s'affiche en rouge.
Vous notez si la preuve de livraison est reçue : bon signé, photo ou message du client.
L'onglet « Résumé » compte les expéditions en route, les retards, les livraisons sans preuve et la part des livraisons faites à temps.
Dans ce tableau, écrivez le quartier ou la ville, pas l'adresse précise ni le numéro d'une personne.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$suivi-des-expeditions.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1ft0_phhhzad13L4ymv7cg0zIEjLey8oJY5aRLxlZZk0/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-plan-tournee$t$, $t$document$t$, $t$Plan de tournée$t$, $t$Ce tableau prépare une tournée de livraison : vous écrivez l'heure de départ, les arrêts dans l'ordre, le temps de trajet et le temps sur place, et il calcule l'heure d'arrivée à chaque arrêt et l'heure de fin.$t$, null, $t$Dans l'onglet « Réglages », vous écrivez la date et l'heure de départ de la tournée.
Dans l'onglet « Tournée », une ligne par arrêt, dans l'ordre de passage : le quartier ou le client, ce qu'il faut livrer, le temps de trajet depuis l'arrêt précédent et le temps sur place, en minutes.
L'heure d'arrivée et l'heure de départ de chaque arrêt se calculent seules. Vous cochez ce qui est livré.
L'onglet « Résumé » donne le nombre d'arrêts, le temps de route, le temps sur place, la durée de la tournée et l'heure de fin.
Les temps de trajet sont les vôtres : le tableau ne connaît ni les distances ni les embouteillages.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$plan-de-tournee.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1WOXal-ZxnaY1YsHidbalhffaSG89PnoGi4vtN1T2gxE/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-bon-livraison$t$, $t$document$t$, $t$Bon de livraison$t$, $t$Ce document d'une page accompagne une livraison : l'expéditeur, le destinataire, la liste de ce qui est livré avec les quantités, les réserves du destinataire et les deux signatures. Il se remplit sur le téléphone et s'envoie en PDF, ou s'imprime en deux exemplaires.$t$, null, $t$Il contient : le numéro et la date du bon, l'expéditeur, le destinataire, le lieu de livraison, la liste des articles avec la quantité commandée et la quantité livrée, le nombre de colis, les réserves et les signatures.
Signé par le destinataire, il sert de preuve de livraison. Ce n'est ni une facture ni un document de douane.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$bon-de-livraison.docx$t$, $t$https://docs.google.com/document/d/1vj4xCtRiC4H-0cNJRuQ5C5S0axo5D5m1shq_xZbYa2o/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-reassort-lundi$t$, $t$routine$t$, $t$Réassort de la semaine, le lundi$t$, $t$Chaque lundi, l'IA vous rappelle de préparer le réassort. Elle ne voit pas votre stock : vous collez le stock du jour et les sorties de la semaine, puis elle calcule ce qu'il faut commander et la date limite pour commander.$t$, null, $t$Chaque lundi à 7 h, envoyez-moi ce message : « Bonjour. C'est lundi, préparons le réassort. Collez ici, pour chaque article à surveiller : le stock de ce matin, les sorties de la semaine passée, votre stock de sécurité et le délai du fournisseur. Ajoutez ce qui va changer cette semaine. »

Quand j'aurai collé mes lignes :
1. Listez les articles au stock de sécurité ou en dessous.
2. Calculez la quantité à commander de chaque article : le besoin de la semaine, plus le stock de sécurité, moins le stock actuel. Montrez chaque calcul.
3. Donnez la date limite pour commander, selon le délai du fournisseur.
4. Rédigez le message de commande pour chaque fournisseur.

Règles : utilisez seulement mes chiffres. N'inventez ni prix, ni délai, ni tendance. Si un chiffre manque, demandez-le.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Ma logistique »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Ma logistique ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Ma logistique »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant logistique »."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-livraisons-vendredi$t$, $t$routine$t$, $t$Point des livraisons, le vendredi$t$, $t$Chaque vendredi, l'IA vous rappelle de faire le point des livraisons. Vous collez les expéditions de la semaine, puis elle donne ce qui est livré, ce qui est en retard, et les messages à envoyer.$t$, null, $t$Chaque vendredi à 16 h, envoyez-moi ce message : « Bonjour. C'est vendredi, faisons le point des livraisons. Collez ici les expéditions de la semaine : destination, contenu, date prévue, date de livraison ou dernière nouvelle. Ne mettez ni nom complet ni numéro. »

Quand j'aurai collé mes lignes :
1. Classez les expéditions : livrées à temps, livrées en retard, en route, en retard aujourd'hui.
2. Calculez la part des livraisons faites à temps. Montrez le calcul.
3. Listez les livraisons sans preuve reçue.
4. Rédigez le message à chaque client en retard, et le message au transporteur concerné.

Règles : partez seulement de mes lignes. Ne supposez pas la cause d'un retard. N'annoncez au client aucune date que je n'ai pas donnée.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Ma logistique »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Ma logistique ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Ma logistique »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant logistique »."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

-- 6. Le kit : présentation, étapes d'installation, encadrés « À savoir », mots expliqués
insert into kits (metier_id, titre, presentation, etapes, prerequis, limites, a_savoir, mots, revu_le) select m.id, $t$Logistique / Supply Chain$t$, $t$Tout ce qu'il faut pour suivre un stock, préparer un réassort, organiser une tournée, suivre les expéditions et écrire aux fournisseurs et aux transporteurs, avec une IA gratuite, sur un téléphone Android : une configuration, quatre skills, quatre documents, deux routines et dix-sept tâches.$t$, $j$[{"numero": 1, "titre": "Configurer mon IA avec « Assistant logistique »", "minutes": 5}, {"numero": 2, "titre": "Installer mes 3 premières skills : suivi des livraisons, prévision des besoins, tournée de livraison", "minutes": 10}, {"numero": 3, "titre": "Copier mes documents : suivi des stocks, suivi des expéditions, plan de tournée", "minutes": 5}]$j$::jsonb, $j$["Un téléphone Android avec une connexion, même limitée.", "WhatsApp, pour parler aux fournisseurs, aux transporteurs, aux livreurs et aux clients.", "Un compte Google et les applications gratuites Google Sheets et Google Docs, pour ouvrir les documents.", "Une IA gratuite au choix : ChatGPT, Claude ou Gemini."]$j$::jsonb, $j$["Il ne remplace ni le transitaire agréé ni le commissionnaire en douane. Une IA ne dit ni quel droit payer ni quelle formalité faire.", "Il ne donne aucun conseil douanier, fiscal ou juridique. Pour un tarif, un document ou un délai officiel, adressez-vous à l'administration ou au professionnel compétent.", "Il ne connaît ni l'état des routes, ni les délais du port, ni vos stocks : l'IA calcule avec vos chiffres, elle n'en invente pas.", "Il ne vous demande jamais de coller dans une IA le nom complet, le numéro ou l'adresse précise d'une personne.", "Il ne promet aucun résultat chiffré."]$j$::jsonb, $j${"chatgpt": "OpenAI retire les GPT personnalisés le 11 décembre 2026 et les remplace par les plugins. Ce kit n'utilise donc aucun GPT personnalisé : votre configuration se colle dans un projet, et chaque skill s'ajoute dans la rubrique Plugins, onglet Skills, ou se colle au début de la conversation. Si vous avez déjà vos propres GPT, pensez à les convertir en plugins avant cette date.", "gemini": "Google remplace les Gems par les skills en novembre 2026. Vos Gems seront convertis automatiquement. Les étapes de ce kit seront mises à jour à ce moment-là, et vous serez prévenu dans l'application."}$j$::jsonb, $j$[{"mot": "Configuration", "phrase": "Un texte d'instructions que l'IA garde en mémoire, pour ne pas tout réexpliquer à chaque conversation."}, {"mot": "Projet", "phrase": "Un dossier de conversations qui partagent les mêmes instructions."}, {"mot": "Skill", "phrase": "Une consigne enregistrée que l'IA applique quand le sujet s'y prête."}, {"mot": "Consigne, ou prompt", "phrase": "Le texte que l'on écrit à l'IA pour lui demander un travail."}, {"mot": "Modèle à remplir", "phrase": "Une consigne déjà rédigée, où il ne reste qu'à remplir quelques champs."}, {"mot": "Champ", "phrase": "Une case du formulaire, à remplir avec vos propres informations."}, {"mot": "Routine", "phrase": "Une demande qui revient à jour fixe."}, {"mot": "Tâche planifiée", "phrase": "Une demande que l'IA lance seule, au jour choisi."}, {"mot": "Stock", "phrase": "La quantité de chaque article que vous avez en magasin ou en entrepôt."}, {"mot": "Stock de sécurité", "phrase": "La quantité que l'on garde en réserve pour ne pas tomber en rupture."}, {"mot": "Rupture", "phrase": "Le moment où il ne reste plus d'un article."}, {"mot": "Réassort", "phrase": "La commande passée pour remettre le stock à niveau."}, {"mot": "Approvisionnement", "phrase": "Le fait de commander et de recevoir à temps ce dont on a besoin."}, {"mot": "Délai de livraison", "phrase": "Le nombre de jours entre la commande et l'arrivée de la marchandise."}, {"mot": "Conditionnement", "phrase": "La façon dont un article est vendu : au carton, au sac, à la palette."}, {"mot": "Inventaire", "phrase": "Le comptage de ce qui se trouve vraiment en stock."}, {"mot": "Expédition", "phrase": "Un envoi de marchandises, du départ jusqu'à la remise au destinataire."}, {"mot": "Bon de livraison", "phrase": "Le document qui liste ce qui est livré et que le destinataire signe."}, {"mot": "Preuve de livraison", "phrase": "Ce qui montre que le colis est bien arrivé : bon signé, photo, message du client."}, {"mot": "Tournée", "phrase": "La suite des arrêts d'une même sortie : livraisons, visites, rendez-vous."}, {"mot": "Transitaire", "phrase": "Le professionnel qui fait les formalités de douane et organise le transport pour vous."}, {"mot": "Gem", "phrase": "Un assistant Gemini enregistré avec ses propres instructions, que l'on rouvre d'un geste."}, {"mot": "Plugin", "phrase": "Un ajout que l'on installe dans ChatGPT et qui contient des consignes prêtes à servir ; il remplace le GPT personnalisé."}]$j$::jsonb, '2026-10-04' from metiers m
  where m.slug = $t$logistique-supply-chain$t$
  on conflict (metier_id) do update set titre = excluded.titre, presentation = excluded.presentation, etapes = excluded.etapes, prerequis = excluded.prerequis, limites = excluded.limites, a_savoir = excluded.a_savoir, mots = excluded.mots, revu_le = excluded.revu_le;

-- 7. Les ressources du kit, dans l'ordre, avec leur étape d'installation
insert into kits_metier (metier_id, ressource_id, ordre, etape_installation) select m.id, r.id, v.ordre, v.etape
  from metiers m, ressources r,
  (values
    ($t$config-logistique-chatgpt$t$, 1, 1),
    ($t$config-logistique-claude$t$, 2, 1),
    ($t$config-logistique-gemini$t$, 3, 1),
    ($t$skill-suivi-des-livraisons$t$, 4, 2),
    ($t$skill-prevision-des-besoins$t$, 5, 2),
    ($t$skill-tournee-de-livraison$t$, 6, 2),
    ($t$doc-suivi-stocks$t$, 7, 3),
    ($t$doc-suivi-expeditions$t$, 8, 3),
    ($t$doc-plan-tournee$t$, 9, 3),
    ($t$skill-message-fournisseur$t$, 10, null::integer),
    ($t$doc-bon-livraison$t$, 11, null::integer),
    ($t$routine-reassort-lundi$t$, 12, null::integer),
    ($t$routine-livraisons-vendredi$t$, 13, null::integer)
  ) as v(cle, ordre, etape)
  where m.slug = $t$logistique-supply-chain$t$ and r.cle = v.cle
  on conflict (metier_id, ressource_id) do update set ordre = excluded.ordre, etape_installation = excluded.etape_installation;

-- 8. Quelles ressources servent à quelles tâches
insert into ressources_taches (ressource_id, tache_id) select r.id, t.id
  from ressources r, taches t,
  (values
    ($t$config-logistique-chatgpt$t$, $t$F01$t$),
    ($t$config-logistique-claude$t$, $t$F01$t$),
    ($t$config-logistique-gemini$t$, $t$F01$t$),
    ($t$skill-message-fournisseur$t$, $t$F01$t$),
    ($t$config-logistique-chatgpt$t$, $t$F03$t$),
    ($t$config-logistique-claude$t$, $t$F03$t$),
    ($t$config-logistique-gemini$t$, $t$F03$t$),
    ($t$doc-bon-livraison$t$, $t$F03$t$),
    ($t$config-logistique-chatgpt$t$, $t$F04$t$),
    ($t$config-logistique-claude$t$, $t$F04$t$),
    ($t$config-logistique-gemini$t$, $t$F04$t$),
    ($t$config-logistique-chatgpt$t$, $t$F05$t$),
    ($t$config-logistique-claude$t$, $t$F05$t$),
    ($t$config-logistique-gemini$t$, $t$F05$t$),
    ($t$doc-plan-tournee$t$, $t$F05$t$),
    ($t$config-logistique-chatgpt$t$, $t$F07$t$),
    ($t$config-logistique-claude$t$, $t$F07$t$),
    ($t$config-logistique-gemini$t$, $t$F07$t$),
    ($t$config-logistique-chatgpt$t$, $t$F08$t$),
    ($t$config-logistique-claude$t$, $t$F08$t$),
    ($t$config-logistique-gemini$t$, $t$F08$t$),
    ($t$doc-suivi-stocks$t$, $t$F08$t$),
    ($t$doc-suivi-expeditions$t$, $t$F08$t$),
    ($t$config-logistique-chatgpt$t$, $t$F11$t$),
    ($t$config-logistique-claude$t$, $t$F11$t$),
    ($t$config-logistique-gemini$t$, $t$F11$t$),
    ($t$doc-suivi-expeditions$t$, $t$F11$t$),
    ($t$doc-bon-livraison$t$, $t$F11$t$),
    ($t$config-logistique-chatgpt$t$, $t$F12$t$),
    ($t$config-logistique-claude$t$, $t$F12$t$),
    ($t$config-logistique-gemini$t$, $t$F12$t$),
    ($t$config-logistique-chatgpt$t$, $t$F13$t$),
    ($t$config-logistique-claude$t$, $t$F13$t$),
    ($t$config-logistique-gemini$t$, $t$F13$t$),
    ($t$config-logistique-chatgpt$t$, $t$F14$t$),
    ($t$config-logistique-claude$t$, $t$F14$t$),
    ($t$config-logistique-gemini$t$, $t$F14$t$),
    ($t$skill-message-fournisseur$t$, $t$F14$t$),
    ($t$config-logistique-chatgpt$t$, $t$F15$t$),
    ($t$config-logistique-claude$t$, $t$F15$t$),
    ($t$config-logistique-gemini$t$, $t$F15$t$),
    ($t$config-logistique-chatgpt$t$, $t$F16$t$),
    ($t$config-logistique-claude$t$, $t$F16$t$),
    ($t$config-logistique-gemini$t$, $t$F16$t$),
    ($t$routine-livraisons-vendredi$t$, $t$F16$t$),
    ($t$config-logistique-chatgpt$t$, $t$F21$t$),
    ($t$config-logistique-claude$t$, $t$F21$t$),
    ($t$config-logistique-gemini$t$, $t$F21$t$),
    ($t$config-logistique-chatgpt$t$, $t$F22$t$),
    ($t$config-logistique-claude$t$, $t$F22$t$),
    ($t$config-logistique-gemini$t$, $t$F22$t$),
    ($t$skill-message-fournisseur$t$, $t$F22$t$),
    ($t$skill-suivi-des-livraisons$t$, $t$F22$t$),
    ($t$doc-suivi-expeditions$t$, $t$F22$t$),
    ($t$routine-livraisons-vendredi$t$, $t$F22$t$),
    ($t$config-logistique-chatgpt$t$, $t$F23$t$),
    ($t$config-logistique-claude$t$, $t$F23$t$),
    ($t$config-logistique-gemini$t$, $t$F23$t$),
    ($t$skill-prevision-des-besoins$t$, $t$F23$t$),
    ($t$doc-suivi-stocks$t$, $t$F23$t$),
    ($t$routine-reassort-lundi$t$, $t$F23$t$),
    ($t$config-logistique-chatgpt$t$, $t$F24$t$),
    ($t$config-logistique-claude$t$, $t$F24$t$),
    ($t$config-logistique-gemini$t$, $t$F24$t$),
    ($t$skill-tournee-de-livraison$t$, $t$F24$t$),
    ($t$doc-plan-tournee$t$, $t$F24$t$),
    ($t$config-logistique-chatgpt$t$, $t$F26$t$),
    ($t$config-logistique-claude$t$, $t$F26$t$),
    ($t$config-logistique-gemini$t$, $t$F26$t$)
  ) as v(cle, code)
  where r.cle = v.cle and t.code = v.code
  on conflict (ressource_id, tache_id) do nothing;

-- 9. Contrôle final : si quelque chose manque, tout est annulé.
do $controle$
declare
  n integer;
begin
  if not exists (select 1 from metiers where slug = $t$logistique-supply-chain$t$ and description_local is not null) then
    raise exception 'Métier introuvable : logistique-supply-chain';
  end if;
  -- Chaque tâche du kit, neuve ou déjà écrite, a son modèle et ses deux cas localisés.
  select count(*) into n from taches t where t.code in ($t$F01$t$, $t$F03$t$, $t$F04$t$, $t$F05$t$, $t$F07$t$, $t$F08$t$, $t$F11$t$, $t$F12$t$, $t$F13$t$, $t$F14$t$, $t$F15$t$, $t$F16$t$, $t$F21$t$, $t$F22$t$, $t$F23$t$, $t$F24$t$, $t$F26$t$)
    and exists (select 1 from modeles_prompts mp where mp.tache_id = t.id)
    and (select count(*) from exercices e where e.tache_id = t.id and e.titre_local is not null) = 2;
  if n <> 17 then
    raise exception 'Tâches complètes attendues : 17, trouvées : %', n;
  end if;
  select count(*) into n from kits_metier km join metiers m on m.id = km.metier_id where m.slug = $t$logistique-supply-chain$t$;
  if n <> 13 then
    raise exception 'Ressources du kit attendues : 13, trouvées : %', n;
  end if;
  -- Toutes les tâches du métier sont dans le kit, et aucune autre.
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id join taches t on t.id = mt.tache_id
    where m.slug = $t$logistique-supply-chain$t$ and t.code in ($t$F01$t$, $t$F03$t$, $t$F04$t$, $t$F05$t$, $t$F07$t$, $t$F08$t$, $t$F11$t$, $t$F12$t$, $t$F13$t$, $t$F14$t$, $t$F15$t$, $t$F16$t$, $t$F21$t$, $t$F22$t$, $t$F23$t$, $t$F24$t$, $t$F26$t$);
  if n <> 17 then
    raise exception 'Tâches du métier attendues : 17, trouvées : %', n;
  end if;
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id where m.slug = $t$logistique-supply-chain$t$;
  if n <> 17 then
    raise exception 'Le métier a % tâches, le kit en couvre 17', n;
  end if;
  -- Chaque tâche du métier a au moins une ressource de ce kit.
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id
    where m.slug = $t$logistique-supply-chain$t$ and not exists (
      select 1 from ressources_taches rt join kits_metier km on km.ressource_id = rt.ressource_id
      where rt.tache_id = mt.tache_id and km.metier_id = m.id);
  if n <> 0 then
    raise exception 'Tâches du métier sans ressource du kit : %', n;
  end if;
end
$controle$;

commit;
