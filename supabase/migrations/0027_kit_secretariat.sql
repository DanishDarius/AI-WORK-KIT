-- 0027 : contenu du kit « Secrétariat / Administration » (4 octobre 2026)
--
-- Ce fichier est fabriqué par un programme à partir du fichier source du kit :
-- les textes en sont copiés tels quels. Il ajoute :
--   - la description localisée du métier « Secrétariat / Administration », à côté de l'ancienne ;
--   - le résultat et les étapes de 1 tâches existantes (F30) ;
--   - 2 cas pratiques localisés, deux par tâche, écrits À CÔTÉ des anciens cas ;
--   - le rattachement de 14 tâches déjà écrites par un kit précédent (F01, F03, F04, F05, F06, F08, F10, F11, F12, F13, F14, F15, F16, F22) ;
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
update metiers set description_local = $t$Pour toute personne qui tient le secrétariat ou l'administration d'une structure : PME, école, clinique, ONG, service public, ou secrétariat public à son compte. Vous travaillez avec Word, Excel, l'e-mail, WhatsApp et le téléphone : courrier, rendez-vous, réunions, classement.$t$
  where slug = $t$secretariat-administration$t$;

-- 2. Les tâches, leur résultat et leurs étapes
update taches set resultat = $t$Un parcours de formation pratique pour une personne précise : un objectif par semaine, les séances, un exercice sur une vraie situation, et un moyen simple de vérifier ce qui est acquis.$t$, etapes = $j$["Décrire la personne à former sans donner son nom : son poste, ce qu'elle sait déjà faire, ce qu'elle doit savoir faire.", "Noter le temps disponible et les moyens : téléphone ou ordinateur, connexion, qui peut l'accompagner.", "Remplir le modèle et copier la consigne dans son IA.", "Relire le parcours : garder ce qui correspond à votre façon de travailler, retirer le reste.", "Faire le point à la fin de chaque semaine, puis ajuster la suite."]$j$::jsonb, precisions = $t$L'IA ne connaît ni vos procédures ni vos outils : donnez-les. Un parcours pratique n'est pas un diplôme et ne remplace pas une formation certifiante. Ne donnez ni le nom ni une appréciation personnelle de la personne à former.$t$
  where code = $t$F30$t$;

-- 3. Les cas pratiques localisés, à côté des anciens
update exercices set titre_local = $t$Assistante de direction dans une école privée à Lomé$t$, contexte_local = $t$Vous êtes assistante de direction dans un établissement scolaire privé de 25 personnes, à Bè. Une secrétaire vient d'être recrutée et commence lundi. Votre directrice vous demande de la former en quatre semaines, sans arrêter votre propre travail.$t$, donnees_local = $t$- Elle sait déjà : saisir un courrier dans Word, utiliser WhatsApp, accueillir les visiteurs.
- Elle ne sait pas encore : tenir le registre du courrier, classer les dossiers des élèves, préparer une attestation de scolarité, tenir la liste des élèves dans Excel, rédiger un compte rendu de réunion.
- Temps disponible : une heure par jour avec vous, de 7 h 30 à 8 h 30, du lundi au vendredi.
- Moyens : un ordinateur partagé au secrétariat, son téléphone Android, une connexion limitée.
- Les inscriptions reprennent dans cinq semaines : le secrétariat sera alors très chargé.$t$, travail_local = $t$Construisez le parcours des quatre semaines : l'objectif de chaque semaine, les exercices sur de vrais documents de l'école, et ce que la secrétaire doit savoir faire seule à la fin de chaque semaine.$t$, prenom = $t$Essi$t$, lieu = $t$Lomé, Togo$t$, profil = $t$Structure, 25 personnes$t$, reponse_attendue = $t$Le parcours tient en 20 heures : une heure par jour, cinq jours, quatre semaines. Il commence par ce qui sert dès le premier jour, le registre du courrier et le classement des dossiers. L'attestation, la liste dans Excel et le compte rendu viennent ensuite. Chaque semaine se termine par un travail que la secrétaire fait seule. Si tout ne tient pas dans le temps donné, le parcours le dit et propose ce qui peut attendre la fin des inscriptions.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F30$t$);

update exercices set titre_local = $t$Gérant d'un secrétariat public à Ouagadougou$t$, contexte_local = $t$Vous gérez Wend-Panga Services, un secrétariat public de 2 personnes, à Gounghin : saisie, impression, photocopie, demandes en ligne. Des clients vous demandent des tableaux Excel et des CV mis en page, et vous refusez ces travaux faute de savoir les faire. Vous décidez de vous former vous-même, le soir.$t$, donnees_local = $t$- Vous savez déjà : saisir et mettre en page un texte simple dans Word, scanner, imprimer, envoyer un fichier par WhatsApp.
- Vous voulez savoir : faire un tableau Excel avec des totaux, mettre en page un CV d'une page, préparer un envoi de lettres en nombre, convertir et alléger un PDF.
- Temps disponible : 30 minutes par soir, cinq soirs par semaine, pendant six semaines.
- Moyens : l'ordinateur de la boutique, votre téléphone Android, une connexion payée au volume, des coupures d'électricité certains soirs.
- Vous apprenez mieux en refaisant un vrai travail de client qu'en lisant.$t$, travail_local = $t$Construisez votre parcours de six semaines : un seul objectif par semaine, un exercice tiré d'une vraie demande de client, et un moyen simple de vérifier que c'est acquis. Prévoyez quoi faire les soirs sans électricité.$t$, prenom = $t$Salif$t$, lieu = $t$Ouagadougou, Burkina Faso$t$, profil = $t$Individuelle, 2 personnes$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F30$t$);

-- 4. Les modèles à remplir, leurs champs et la note par IA
insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Parcours de formation personnalisés$t$, $t$Rôle : Vous m'aidez à construire un parcours de formation pratique, pour une personne précise.

Contexte : La personne à former et son poste, sans son nom : {{personne}}. Ce qu'elle sait déjà faire : {{acquis}}. Ce qu'elle doit savoir faire à la fin : {{objectifs}}. Le temps disponible : {{temps}}. Les moyens et les contraintes : {{moyens}}.

Travail demandé :
1. Le parcours semaine par semaine : un objectif par semaine, du plus utile tout de suite au moins urgent.
2. Pour chaque semaine : les séances, un exercice pratique sur un vrai document ou une vraie situation, et ce que la personne doit savoir faire seule à la fin.
3. Un moyen simple de vérifier chaque acquis, sans note ni classement.
4. Ce qui ne tient pas dans le temps disponible, dit clairement, avec ce qui peut attendre.
5. Le point de fin de semaine, en 3 questions.

Format : un tableau (semaine, objectif, séances, exercice, vérification), puis 5 lignes de conseils. Texte simple, prêt à coller.

Règle : partez seulement de ce que je décris. Ne supposez ni un outil, ni une connexion, ni un temps que je n'ai pas donnés. Ne promettez ni diplôme ni niveau : c'est un parcours pratique.$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F30$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$personne$t$, $t$Qui faut-il former, et à quel poste ?$t$, $t$texte$t$, null::jsonb, $t$moi-même, gérant d'un secrétariat public de 2 personnes, à Ouagadougou$t$, true, 1),
    ($t$acquis$t$, $t$Que sait-elle déjà faire ?$t$, $t$long$t$, null::jsonb, $t$saisir et mettre en page un texte simple dans Word, scanner, imprimer, envoyer un fichier par WhatsApp$t$, true, 2),
    ($t$objectifs$t$, $t$Que doit-elle savoir faire à la fin ?$t$, $t$long$t$, null::jsonb, $t$faire un tableau Excel avec des totaux ; mettre en page un CV d'une page ; préparer un envoi de lettres en nombre ; convertir et alléger un PDF$t$, true, 3),
    ($t$temps$t$, $t$De combien de temps dispose-t-elle ?$t$, $t$texte$t$, null::jsonb, $t$30 minutes par soir, cinq soirs par semaine, pendant six semaines$t$, true, 4),
    ($t$moyens$t$, $t$Quels sont les moyens et les contraintes ?$t$, $t$long$t$, null::jsonb, $t$l'ordinateur de la boutique, mon téléphone Android, une connexion payée au volume, des coupures d'électricité certains soirs ; j'apprends mieux en refaisant un vrai travail de client$t$, true, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F30$t$
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
  where t.code in ($t$F30$t$)
  on conflict (modele_id, ia) do update set conseil = excluded.conseil;

-- 5. Les ressources
insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-secretariat-chatgpt$t$, $t$configuration$t$, $t$Assistant administratif$t$, $t$Vous le complétez une fois avec les informations de votre poste : ensuite, l'IA connaît votre structure, vos interlocuteurs, vos formules et vos règles de présentation à chaque conversation.$t$, $t$chatgpt$t$, $t$Vous êtes mon assistant administratif. Vous m'aidez à rédiger des courriers, des comptes rendus et des ordres de mission, à suivre le courrier et les rendez-vous, et à classer les documents.

MON POSTE
Ma structure : [type, ville, nombre de personnes]
Mon rôle : [secrétaire, assistante de direction, agent administratif]
Je travaille pour : [fonction de mon responsable, services]
Nos interlocuteurs : [clients, parents, usagers, administrations, partenaires]
Mes outils : [Word, Excel, e-mail, WhatsApp, registre papier]
Nos usages : [en-tête, numérotation des références, formules de politesse]

VOS RÈGLES
1. Français soigné, phrases courtes, vouvoiement. Ton respectueux.
2. Courrier administratif, dans l'ordre : en-tête, lieu et date, destinataire, objet, référence, texte, formule de politesse, signature, pièces jointes.
3. N'inventez jamais une référence, une date, un nom, un service ou une règle. S'il manque une information, demandez-la.
4. Dates en toutes lettres : le 5 octobre 2026. Heures ainsi : 9 h 30.
5. Vous préparez, mon responsable relit et signe.
6. Aucun conseil juridique : renvoyez-moi vers mon responsable.
7. Sur WhatsApp : texte simple, sans titre ni astérisque.
8. Ne demandez jamais le nom complet ni le numéro d'une personne.$t$, $j${"chatgpt": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre poste.", "Dans ChatGPT, choisissez un projet, puis Nouveau projet. Donnez-lui le nom « Mon secrétariat », puis Créer un projet.", "Ouvrez le menu « … » du projet, puis Paramètres du projet. Collez le texte dans le champ Instructions, puis Enregistrer."], "gratuit": "Oui. Les projets sont disponibles sur un compte gratuit, avec 5 fichiers par projet.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Autre possibilité : Paramètres, Personnalisation, Instructions personnalisées. Le texte s'applique alors à toutes vos conversations, dans la limite de 1 500 caractères.", "Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-secretariat-claude$t$, $t$configuration$t$, $t$Assistant administratif$t$, $t$Vous le complétez une fois avec les informations de votre poste : ensuite, l'IA connaît votre structure, vos interlocuteurs, vos formules et vos règles de présentation à chaque conversation.$t$, $t$claude$t$, $t$Vous êtes mon assistant administratif. Vous m'aidez à rédiger des courriers, des comptes rendus et des ordres de mission, à suivre le courrier et les rendez-vous, et à classer les documents.

MON POSTE
Ma structure : [type, ville, nombre de personnes]
Mon rôle : [secrétaire, assistante de direction, agent administratif]
Je travaille pour : [fonction de mon responsable, services]
Nos interlocuteurs : [clients, parents, usagers, administrations, partenaires]
Mes outils : [Word, Excel, e-mail, WhatsApp, registre papier]
Nos usages : [en-tête, numérotation des références, formules de politesse]

VOS RÈGLES
1. Français soigné, phrases courtes, vouvoiement. Ton respectueux.
2. Courrier administratif, dans l'ordre : en-tête, lieu et date, destinataire, objet, référence, texte, formule de politesse, signature, pièces jointes.
3. N'inventez jamais une référence, une date, un nom, un service ou une règle. S'il manque une information, demandez-la.
4. Dates en toutes lettres : le 5 octobre 2026. Heures ainsi : 9 h 30.
5. Vous préparez, mon responsable relit et signe.
6. Aucun conseil juridique : renvoyez-moi vers mon responsable.
7. Sur WhatsApp : texte simple, sans titre ni astérisque.
8. Ne demandez jamais le nom complet ni le numéro d'une personne.$t$, $j${"claude": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre poste.", "Dans Claude, ouvrez Projets, puis Nouveau projet. Donnez-lui le nom « Mon secrétariat », puis Créer un projet.", "Dans le projet, ouvrez Instructions, puis Ajouter. Collez le texte, puis Enregistrer les instructions."], "gratuit": "Oui, dans la limite de 5 projets.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-secretariat-gemini$t$, $t$configuration$t$, $t$Assistant administratif$t$, $t$Vous le complétez une fois avec les informations de votre poste : ensuite, l'IA connaît votre structure, vos interlocuteurs, vos formules et vos règles de présentation à chaque conversation.$t$, $t$gemini$t$, $t$Vous êtes mon assistant administratif. Vous m'aidez à rédiger des courriers, des comptes rendus et des ordres de mission, à suivre le courrier et les rendez-vous, et à classer les documents.

MON POSTE
Ma structure : [type, ville, nombre de personnes]
Mon rôle : [secrétaire, assistante de direction, agent administratif]
Je travaille pour : [fonction de mon responsable, services]
Nos interlocuteurs : [clients, parents, usagers, administrations, partenaires]
Mes outils : [Word, Excel, e-mail, WhatsApp, registre papier]
Nos usages : [en-tête, numérotation des références, formules de politesse]

VOS RÈGLES
1. Français soigné, phrases courtes, vouvoiement. Ton respectueux.
2. Courrier administratif, dans l'ordre : en-tête, lieu et date, destinataire, objet, référence, texte, formule de politesse, signature, pièces jointes.
3. N'inventez jamais une référence, une date, un nom, un service ou une règle. S'il manque une information, demandez-la.
4. Dates en toutes lettres : le 5 octobre 2026. Heures ainsi : 9 h 30.
5. Vous préparez, mon responsable relit et signe.
6. Aucun conseil juridique : renvoyez-moi vers mon responsable.
7. Sur WhatsApp : texte simple, sans titre ni astérisque.
8. Ne demandez jamais le nom complet ni le numéro d'une personne.$t$, $j${"gemini": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre poste.", "Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez « Assistant administratif ». Collez le texte dans Instructions, puis Enregistrer."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-courrier-administratif$t$, $t$skill$t$, $t$Courrier administratif$t$, $t$Rédige un courrier administratif complet et bien présenté : demande, réponse, transmission, invitation, attestation.$t$, null, $t$---
name: courrier-administratif
description: Rédige un courrier administratif complet et bien présenté : demande, réponse, transmission, invitation, attestation. À utiliser quand l'utilisateur doit écrire à une administration ou à un partenaire.
---

# Courrier administratif

Quand l'utilisateur décrit le courrier à écrire, rédigez-le en entier, dans la présentation administrative.

## Avant d'écrire
Il vous faut : qui écrit (la structure et la fonction du signataire), à qui (la fonction et l'organisme du destinataire), l'objet, la référence du courrier auquel on répond s'il y en a une, ce qu'on demande ou ce qu'on annonce, les pièces jointes et la date. S'il manque le destinataire ou l'objet, demandez-le.

## Ce que vous livrez
1. Le courrier complet, dans l'ordre : lieu et date, destinataire, objet, référence, formule d'appel, texte, formule de politesse, fonction du signataire, pièces jointes.
2. Un objet en une ligne, qui dit de quoi il s'agit.
3. Un texte en trois temps : le rappel du contexte, la demande ou l'information, ce qu'on attend et pour quand.
4. Une version courte pour l'e-mail ou le message qui accompagne le courrier.

## Règles
- Ton respectueux et direct. Aucune formule familière, aucune menace, aucune promesse que l'utilisateur n'a pas donnée.
- La formule d'appel et la formule de politesse s'accordent avec la fonction du destinataire. Si vous ne la connaissez pas, demandez-la.
- Laissez entre crochets ce que vous ne savez pas : [référence], [date]. N'inventez rien.
- Le courrier part après relecture et signature : rappelez-le en une ligne.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mon secrétariat »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$courrier-administratif.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-compte-rendu-de-reunion$t$, $t$skill$t$, $t$Compte rendu de réunion$t$, $t$Rédige le compte rendu d'une réunion à partir des notes de l'utilisateur : présents, points traités, décisions, actions avec responsable et date.$t$, null, $t$---
name: compte-rendu-de-reunion
description: Rédige le compte rendu d'une réunion à partir des notes de l'utilisateur : présents, points traités, décisions, actions avec responsable et date. À utiliser après une réunion.
---

# Compte rendu de réunion

Quand l'utilisateur colle ses notes, rédigez un compte rendu clair, fidèle et court.

## Avant d'écrire
Il vous faut : la date et l'objet de la réunion, les présents et les absents (par fonction), l'ordre du jour, les notes prises, et à qui le compte rendu sera envoyé. Si une décision n'est pas claire dans les notes, posez la question au lieu de trancher.

## Ce que vous livrez
1. L'en-tête : objet, date, lieu, présents, absents excusés.
2. Pour chaque point de l'ordre du jour : ce qui a été dit en 2 lignes, puis la décision.
3. Le tableau des actions : quoi, qui (la fonction), pour quand.
4. Les points reportés à la prochaine réunion, et sa date si elle est fixée.
5. Le message d'envoi, en 3 lignes.

## Règles
- Écrivez seulement ce qui est dans les notes. N'attribuez à personne une parole ou une décision qui n'y figure pas.
- Ton neutre : ni jugement, ni commentaire.
- Les personnes sont désignées par leur fonction, sauf si l'utilisateur donne les noms et demande de les garder.
- Une action sans responsable ou sans date est signalée : « à préciser ».$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mon secrétariat »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$compte-rendu-de-reunion.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-ordre-de-mission$t$, $t$skill$t$, $t$Ordre de mission$t$, $t$Prépare un ordre de mission complet à partir des informations de l'utilisateur : qui part, où, quand, pourquoi, avec quel moyen de transport.$t$, null, $t$---
name: ordre-de-mission
description: Prépare un ordre de mission complet à partir des informations de l'utilisateur : qui part, où, quand, pourquoi, avec quel moyen de transport. À utiliser avant un déplacement professionnel.
---

# Ordre de mission

Quand l'utilisateur décrit un déplacement, préparez l'ordre de mission, prêt à être relu et signé.

## Avant d'écrire
Il vous faut : la structure, la fonction de la personne qui part, la destination, l'objet de la mission, les dates de départ et de retour, le moyen de transport, qui prend en charge les frais, et la fonction du signataire. S'il manque une date ou la destination, demandez-la.

## Ce que vous livrez
1. L'ordre de mission, dans l'ordre : numéro ou référence, personne en mission, destination, objet, dates, moyen de transport, prise en charge des frais, lieu et date, fonction du signataire.
2. La liste des pièces à joindre ou à rapporter : invitation, programme, justificatifs de dépenses.
3. Un message court pour prévenir la personne ou la structure qui reçoit la mission.

## Règles
- N'inventez aucun montant de frais, aucun barème, aucune indemnité : écrivez « selon les règles de la structure » si l'utilisateur ne donne pas de chiffre.
- Laissez entre crochets ce que vous ne savez pas : [numéro], [immatriculation du véhicule].
- L'ordre de mission n'est valable qu'une fois signé par la personne habilitée : rappelez-le en une ligne.
- Dates en toutes lettres.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mon secrétariat »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$ordre-de-mission.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-plan-de-classement$t$, $t$skill$t$, $t$Plan de classement$t$, $t$Propose un plan de classement simple, une règle pour nommer les fichiers et le dossier de chaque document.$t$, null, $t$---
name: plan-de-classement
description: Propose un plan de classement simple, une règle pour nommer les fichiers et le dossier de chaque document. À utiliser quand l'utilisateur veut ranger des documents papier ou numériques.
---

# Plan de classement

Quand l'utilisateur liste ses documents, proposez des dossiers clairs et dites où ranger chaque document.

## Avant d'écrire
Il vous faut : l'activité de la structure, la liste des documents tels qu'ils sont (le nom actuel ou une ligne de description), ce qu'on cherche le plus souvent, et où les documents sont rangés aujourd'hui. Ne demandez pas le contenu d'un document : son nom suffit.

## Ce que vous livrez
1. Le plan : 3 à 9 dossiers, un code court pour chacun, et ce que chacun contient.
2. Une règle pour nommer les fichiers, avec 3 exemples. La date s'écrit en premier, sous la forme 2026-10-05.
3. Pour chaque document de la liste : son code, son dossier, son nouveau nom.
4. Les doublons et les documents dont le nom ne dit rien, signalés à part.
5. Les lignes à copier dans l'index : date, nom, code, mot-clé.

## Règles
- Partez seulement de la liste donnée. Ne devinez pas le contenu d'un document.
- Aucune durée légale de conservation de votre part : dites à l'utilisateur de la demander à son responsable.
- Ne demandez l'envoi d'aucun document : ni pièce d'identité, ni dossier du personnel, ni relevé.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mon secrétariat »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$plan-de-classement.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-registre-courrier$t$, $t$document$t$, $t$Registre du courrier$t$, $t$Ce tableau enregistre le courrier qui arrive et le courrier qui part : la date, l'objet, à qui il est transmis, la réponse attendue et sa date limite. Il compte les jours restants et affiche en rouge une réponse en retard.$t$, null, $t$Dans l'onglet « Arrivée », une ligne par courrier reçu, sur papier, par e-mail ou par WhatsApp : la date, l'expéditeur, l'objet, le service à qui vous le transmettez, la date limite de réponse et l'état.
Le nombre de jours restants se calcule seul : orange à 3 jours ou moins, rouge quand la date est dépassée.
Dans l'onglet « Départ », une ligne par courrier envoyé : la date, le destinataire, l'objet, la référence, le mode d'envoi et l'accusé de réception.
L'onglet « Résumé » compte les courriers à traiter, les réponses en retard et les envois sans accusé de réception.
Dans ce tableau, écrivez le service ou la fonction d'une personne, pas son nom complet ni son numéro.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$registre-du-courrier.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1q6ja1u0vptOvx_wk4BXyYdZ4yh9nJ8phDwOyo1FxQLg/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-suivi-rdv-reunions$t$, $t$document$t$, $t$Suivi des rendez-vous et des réunions$t$, $t$Ce tableau suit les rendez-vous de votre responsable et les réunions de la structure : ce qui est confirmé, ce qui est reporté, les comptes rendus envoyés et les actions qui restent à faire.$t$, null, $t$Dans l'onglet « Rendez-vous », une ligne par rendez-vous : la date, l'heure, avec qui, l'objet, le lieu ou le canal, s'il est confirmé, et la suite à donner.
Un rendez-vous prévu et pas encore confirmé s'affiche en orange.
Dans l'onglet « Réunions », une ligne par réunion : la date, l'objet, si le compte rendu est envoyé, le nombre d'actions décidées et le nombre d'actions faites. Le reste se calcule seul.
L'onglet « Résumé » compte les rendez-vous à confirmer, les rendez-vous reportés, les réunions sans compte rendu et les actions qui restent.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$suivi-des-rendez-vous-et-des-reunions.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1AhvnuAQak5pB1BH3zsq1QWr3_aETMiQ-v1jObLouEzA/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-plan-classement$t$, $t$document$t$, $t$Plan de classement$t$, $t$Ce tableau décrit vos dossiers, avec un code pour chacun, et tient l'index de vos documents : où chacun est rangé, sur papier ou sur l'ordinateur, pour le retrouver en quelques secondes.$t$, null, $t$Dans l'onglet « Plan », une ligne par dossier : son code, son nom, ce qu'on y range, où il se trouve et la durée de conservation décidée par votre responsable.
Dans l'onglet « Index », une ligne par document : la date, le nom du fichier ou de la pièce, le code du dossier, un mot-clé et l'emplacement précis.
La liste des codes de l'index reprend ceux de votre plan. Un document sans code s'affiche en orange.
L'onglet « Résumé » compte les dossiers, les documents indexés et les documents sans code.
Le tableau ne fixe aucune durée légale de conservation : demandez-la à votre responsable.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$plan-de-classement.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1d978MA8WG1k26DnoMjx_k39EAOfIgH7ibXVaxL0xmD4/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-courrier-administratif$t$, $t$document$t$, $t$Courrier administratif$t$, $t$Ce document d'une page donne la présentation d'un courrier administratif : l'en-tête, le lieu et la date, le destinataire, l'objet, la référence, le texte, la formule de politesse, la signature et les pièces jointes. Il se remplit sur le téléphone et s'envoie en PDF.$t$, null, $t$Il contient chaque partie du courrier, dans l'ordre, avec un texte gris à remplacer par le vôtre.
Il ne part qu'après la relecture et la signature de la personne habilitée.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$courrier-administratif.docx$t$, $t$https://docs.google.com/document/d/1xczmhrrQfUAdOML1thC-S7AcaeSz54P8bA165f8v9dc/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-agenda-lundi$t$, $t$routine$t$, $t$Agenda de la semaine, le lundi$t$, $t$Chaque lundi, l'IA vous rappelle de préparer l'agenda de la semaine. Elle ne voit pas votre agenda : vous collez les rendez-vous, les réunions et les échéances, puis elle signale les chevauchements et rédige les messages de confirmation.$t$, null, $t$Chaque lundi à 7 h 30, envoyez-moi ce message : « Bonjour. C'est lundi, préparons l'agenda de la semaine. Collez ici les rendez-vous, les réunions et les échéances de la semaine, avec le jour, l'heure et le lieu. Mettez la fonction des personnes, pas leur nom complet. »

Quand j'aurai collé ma liste :
1. Rangez la semaine jour par jour, dans l'ordre des heures.
2. Signalez les chevauchements, les rendez-vous trop rapprochés et les jours trop chargés.
3. Listez ce qu'il faut préparer pour chaque rendez-vous ou réunion : document, salle, convocation.
4. Rédigez le message de confirmation de chaque rendez-vous, en 3 lignes.

Règles : partez seulement de ma liste. N'ajoutez aucun rendez-vous et ne déplacez rien sans me le proposer d'abord. Salutation au début de chaque message.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mon secrétariat »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Mon secrétariat ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mon secrétariat »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant administratif »."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-courrier-jeudi$t$, $t$routine$t$, $t$Courrier en attente, le jeudi$t$, $t$Chaque jeudi, l'IA vous rappelle de faire le point du courrier en attente. Vous collez les lignes de votre registre qui attendent une réponse, puis elle les classe par urgence et prépare les projets de réponse.$t$, null, $t$Chaque jeudi à 15 h, envoyez-moi ce message : « Bonjour. C'est jeudi, faisons le point du courrier en attente. Collez ici les lignes de votre registre qui attendent une réponse : date de réception, expéditeur (l'organisme ou la fonction), objet, date limite. »

Quand j'aurai collé mes lignes :
1. Classez les courriers par date limite, et signalez ceux qui sont en retard ou à rendre dans les 3 jours.
2. Dites, pour chacun, ce qui manque pour répondre : une information, une décision, une signature.
3. Préparez le projet de réponse des deux plus urgents.
4. Rédigez le message de rappel pour le service qui doit fournir un élément.

Règles : partez seulement de mes lignes. N'inventez aucune référence ni aucune date. Un projet de réponse n'engage pas la structure : il part après relecture et signature.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mon secrétariat »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Mon secrétariat ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mon secrétariat »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant administratif »."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

-- 6. Le kit : présentation, étapes d'installation, encadrés « À savoir », mots expliqués
insert into kits (metier_id, titre, presentation, etapes, prerequis, limites, a_savoir, mots, revu_le) select m.id, $t$Secrétariat / Administration$t$, $t$Tout ce qu'il faut pour rédiger un courrier administratif, préparer un compte rendu de réunion ou un ordre de mission, tenir le registre du courrier, suivre les rendez-vous et classer les documents, avec une IA gratuite, sur un téléphone Android : une configuration, quatre skills, quatre documents, deux routines et quinze tâches.$t$, $j$[{"numero": 1, "titre": "Configurer mon IA avec « Assistant administratif »", "minutes": 5}, {"numero": 2, "titre": "Installer mes 3 premières skills : courrier administratif, compte rendu de réunion, ordre de mission", "minutes": 10}, {"numero": 3, "titre": "Copier mes documents : registre du courrier, suivi des rendez-vous et des réunions, plan de classement", "minutes": 5}]$j$::jsonb, $j$["Un téléphone Android avec une connexion, même limitée.", "WhatsApp et une adresse e-mail, pour recevoir et envoyer les messages de votre structure.", "Un compte Google et les applications gratuites Google Sheets et Google Docs, pour ouvrir les documents.", "Une IA gratuite au choix : ChatGPT, Claude ou Gemini."]$j$::jsonb, $j$["Il ne signe rien à votre place. Un courrier, un ordre de mission ou une attestation part seulement après la relecture et la signature de la personne habilitée.", "Il ne donne aucun conseil juridique. Pour un contrat, une décision ou un délai légal, adressez-vous au responsable ou au professionnel compétent.", "Il n'invente ni référence, ni date, ni nom de service : l'IA écrit avec ce que vous lui donnez.", "Il ne vous demande jamais de coller dans une IA le nom complet, le numéro ou l'adresse d'une personne, ni un document confidentiel entier.", "Il ne promet aucun résultat chiffré."]$j$::jsonb, $j${"chatgpt": "OpenAI retire les GPT personnalisés le 11 décembre 2026 et les remplace par les plugins. Ce kit n'utilise donc aucun GPT personnalisé : votre configuration se colle dans un projet, et chaque skill s'ajoute dans la rubrique Plugins, onglet Skills, ou se colle au début de la conversation. Si vous avez déjà vos propres GPT, pensez à les convertir en plugins avant cette date.", "gemini": "Google remplace les Gems par les skills en novembre 2026. Vos Gems seront convertis automatiquement. Les étapes de ce kit seront mises à jour à ce moment-là, et vous serez prévenu dans l'application."}$j$::jsonb, $j$[{"mot": "Configuration", "phrase": "Un texte d'instructions que l'IA garde en mémoire, pour ne pas tout réexpliquer à chaque conversation."}, {"mot": "Projet", "phrase": "Un dossier de conversations qui partagent les mêmes instructions."}, {"mot": "Skill", "phrase": "Une consigne enregistrée que l'IA applique quand le sujet s'y prête."}, {"mot": "Consigne, ou prompt", "phrase": "Le texte que l'on écrit à l'IA pour lui demander un travail."}, {"mot": "Modèle à remplir", "phrase": "Une consigne déjà rédigée, où il ne reste qu'à remplir quelques champs."}, {"mot": "Champ", "phrase": "Une case du formulaire, à remplir avec vos propres informations."}, {"mot": "Routine", "phrase": "Une demande qui revient à jour fixe."}, {"mot": "Tâche planifiée", "phrase": "Une demande que l'IA lance seule, au jour choisi."}, {"mot": "Courrier administratif", "phrase": "Une lettre officielle, écrite dans une présentation fixe : objet, référence, texte, formule de politesse, signature."}, {"mot": "Objet", "phrase": "La ligne qui dit, en quelques mots, de quoi parle un courrier."}, {"mot": "Référence", "phrase": "Le numéro donné à un courrier pour le retrouver et le citer dans une réponse."}, {"mot": "Registre du courrier", "phrase": "Le cahier ou le tableau où l'on note chaque courrier reçu et chaque courrier envoyé."}, {"mot": "Accusé de réception", "phrase": "La preuve que le destinataire a bien reçu un courrier."}, {"mot": "Signataire", "phrase": "La personne habilitée à signer un document au nom de la structure."}, {"mot": "Ordre de mission", "phrase": "Le document signé qui autorise un déplacement professionnel et en fixe l'objet, le lieu et les dates."}, {"mot": "Ordre du jour", "phrase": "La liste des points à traiter pendant une réunion."}, {"mot": "Compte rendu", "phrase": "Le résumé écrit d'une réunion, avec les décisions et les actions."}, {"mot": "Plan de classement", "phrase": "La liste de vos dossiers, avec ce que chacun contient."}, {"mot": "Index", "phrase": "La liste de vos documents, avec l'endroit où chacun est rangé."}, {"mot": "Parcours de formation", "phrase": "La suite des étapes prévues pour apprendre un travail, semaine après semaine."}, {"mot": "Gem", "phrase": "Un assistant Gemini enregistré avec ses propres instructions, que l'on rouvre d'un geste."}, {"mot": "Plugin", "phrase": "Un ajout que l'on installe dans ChatGPT et qui contient des consignes prêtes à servir ; il remplace le GPT personnalisé."}]$j$::jsonb, '2026-10-04' from metiers m
  where m.slug = $t$secretariat-administration$t$
  on conflict (metier_id) do update set titre = excluded.titre, presentation = excluded.presentation, etapes = excluded.etapes, prerequis = excluded.prerequis, limites = excluded.limites, a_savoir = excluded.a_savoir, mots = excluded.mots, revu_le = excluded.revu_le;

-- 7. Les ressources du kit, dans l'ordre, avec leur étape d'installation
insert into kits_metier (metier_id, ressource_id, ordre, etape_installation) select m.id, r.id, v.ordre, v.etape
  from metiers m, ressources r,
  (values
    ($t$config-secretariat-chatgpt$t$, 1, 1),
    ($t$config-secretariat-claude$t$, 2, 1),
    ($t$config-secretariat-gemini$t$, 3, 1),
    ($t$skill-courrier-administratif$t$, 4, 2),
    ($t$skill-compte-rendu-de-reunion$t$, 5, 2),
    ($t$skill-ordre-de-mission$t$, 6, 2),
    ($t$doc-registre-courrier$t$, 7, 3),
    ($t$doc-suivi-rdv-reunions$t$, 8, 3),
    ($t$doc-plan-classement$t$, 9, 3),
    ($t$skill-plan-de-classement$t$, 10, null::integer),
    ($t$doc-courrier-administratif$t$, 11, null::integer),
    ($t$routine-agenda-lundi$t$, 12, null::integer),
    ($t$routine-courrier-jeudi$t$, 13, null::integer)
  ) as v(cle, ordre, etape)
  where m.slug = $t$secretariat-administration$t$ and r.cle = v.cle
  on conflict (metier_id, ressource_id) do update set ordre = excluded.ordre, etape_installation = excluded.etape_installation;

-- 8. Quelles ressources servent à quelles tâches
insert into ressources_taches (ressource_id, tache_id) select r.id, t.id
  from ressources r, taches t,
  (values
    ($t$doc-suivi-rdv-reunions$t$, $t$F30$t$),
    ($t$config-secretariat-chatgpt$t$, $t$F30$t$),
    ($t$config-secretariat-claude$t$, $t$F30$t$),
    ($t$config-secretariat-gemini$t$, $t$F30$t$),
    ($t$config-secretariat-chatgpt$t$, $t$F01$t$),
    ($t$config-secretariat-claude$t$, $t$F01$t$),
    ($t$config-secretariat-gemini$t$, $t$F01$t$),
    ($t$skill-courrier-administratif$t$, $t$F01$t$),
    ($t$doc-registre-courrier$t$, $t$F01$t$),
    ($t$routine-courrier-jeudi$t$, $t$F01$t$),
    ($t$config-secretariat-chatgpt$t$, $t$F03$t$),
    ($t$config-secretariat-claude$t$, $t$F03$t$),
    ($t$config-secretariat-gemini$t$, $t$F03$t$),
    ($t$skill-courrier-administratif$t$, $t$F03$t$),
    ($t$skill-ordre-de-mission$t$, $t$F03$t$),
    ($t$doc-courrier-administratif$t$, $t$F03$t$),
    ($t$config-secretariat-chatgpt$t$, $t$F04$t$),
    ($t$config-secretariat-claude$t$, $t$F04$t$),
    ($t$config-secretariat-gemini$t$, $t$F04$t$),
    ($t$skill-compte-rendu-de-reunion$t$, $t$F04$t$),
    ($t$doc-suivi-rdv-reunions$t$, $t$F04$t$),
    ($t$config-secretariat-chatgpt$t$, $t$F05$t$),
    ($t$config-secretariat-claude$t$, $t$F05$t$),
    ($t$config-secretariat-gemini$t$, $t$F05$t$),
    ($t$doc-suivi-rdv-reunions$t$, $t$F05$t$),
    ($t$routine-agenda-lundi$t$, $t$F05$t$),
    ($t$config-secretariat-chatgpt$t$, $t$F06$t$),
    ($t$config-secretariat-claude$t$, $t$F06$t$),
    ($t$config-secretariat-gemini$t$, $t$F06$t$),
    ($t$config-secretariat-chatgpt$t$, $t$F08$t$),
    ($t$config-secretariat-claude$t$, $t$F08$t$),
    ($t$config-secretariat-gemini$t$, $t$F08$t$),
    ($t$doc-registre-courrier$t$, $t$F08$t$),
    ($t$config-secretariat-chatgpt$t$, $t$F10$t$),
    ($t$config-secretariat-claude$t$, $t$F10$t$),
    ($t$config-secretariat-gemini$t$, $t$F10$t$),
    ($t$config-secretariat-chatgpt$t$, $t$F11$t$),
    ($t$config-secretariat-claude$t$, $t$F11$t$),
    ($t$config-secretariat-gemini$t$, $t$F11$t$),
    ($t$doc-registre-courrier$t$, $t$F11$t$),
    ($t$config-secretariat-chatgpt$t$, $t$F12$t$),
    ($t$config-secretariat-claude$t$, $t$F12$t$),
    ($t$config-secretariat-gemini$t$, $t$F12$t$),
    ($t$skill-plan-de-classement$t$, $t$F12$t$),
    ($t$doc-plan-classement$t$, $t$F12$t$),
    ($t$config-secretariat-chatgpt$t$, $t$F13$t$),
    ($t$config-secretariat-claude$t$, $t$F13$t$),
    ($t$config-secretariat-gemini$t$, $t$F13$t$),
    ($t$doc-plan-classement$t$, $t$F13$t$),
    ($t$config-secretariat-chatgpt$t$, $t$F14$t$),
    ($t$config-secretariat-claude$t$, $t$F14$t$),
    ($t$config-secretariat-gemini$t$, $t$F14$t$),
    ($t$skill-courrier-administratif$t$, $t$F14$t$),
    ($t$config-secretariat-chatgpt$t$, $t$F15$t$),
    ($t$config-secretariat-claude$t$, $t$F15$t$),
    ($t$config-secretariat-gemini$t$, $t$F15$t$),
    ($t$config-secretariat-chatgpt$t$, $t$F16$t$),
    ($t$config-secretariat-claude$t$, $t$F16$t$),
    ($t$config-secretariat-gemini$t$, $t$F16$t$),
    ($t$doc-suivi-rdv-reunions$t$, $t$F16$t$),
    ($t$routine-agenda-lundi$t$, $t$F16$t$),
    ($t$routine-courrier-jeudi$t$, $t$F16$t$),
    ($t$config-secretariat-chatgpt$t$, $t$F22$t$),
    ($t$config-secretariat-claude$t$, $t$F22$t$),
    ($t$config-secretariat-gemini$t$, $t$F22$t$)
  ) as v(cle, code)
  where r.cle = v.cle and t.code = v.code
  on conflict (ressource_id, tache_id) do nothing;

-- 9. Contrôle final : si quelque chose manque, tout est annulé.
do $controle$
declare
  n integer;
begin
  if not exists (select 1 from metiers where slug = $t$secretariat-administration$t$ and description_local is not null) then
    raise exception 'Métier introuvable : secretariat-administration';
  end if;
  select count(*) into n from (values
    ($t$F30$t$, $t$Parcours de formation personnalisés$t$)
  ) as v(code, titre) join taches t on t.code = v.code and t.titre = v.titre and t.resultat is not null;
  if n <> 1 then
    raise exception 'Tâches attendues : 1, trouvées avec le bon titre : %', n;
  end if;
  select count(*) into n from exercices e join taches t on t.id = e.tache_id
    where t.code in ($t$F30$t$) and e.titre_local is not null and e.prenom is not null;
  if n <> 2 then
    raise exception 'Cas localisés attendus : 2, trouvés : %', n;
  end if;
  -- Chaque tâche du kit, neuve ou déjà écrite, a son modèle et ses deux cas localisés.
  select count(*) into n from taches t where t.code in ($t$F30$t$, $t$F01$t$, $t$F03$t$, $t$F04$t$, $t$F05$t$, $t$F06$t$, $t$F08$t$, $t$F10$t$, $t$F11$t$, $t$F12$t$, $t$F13$t$, $t$F14$t$, $t$F15$t$, $t$F16$t$, $t$F22$t$)
    and exists (select 1 from modeles_prompts mp where mp.tache_id = t.id)
    and (select count(*) from exercices e where e.tache_id = t.id and e.titre_local is not null) = 2;
  if n <> 15 then
    raise exception 'Tâches complètes attendues : 15, trouvées : %', n;
  end if;
  select count(*) into n from kits_metier km join metiers m on m.id = km.metier_id where m.slug = $t$secretariat-administration$t$;
  if n <> 13 then
    raise exception 'Ressources du kit attendues : 13, trouvées : %', n;
  end if;
  -- Toutes les tâches du métier sont dans le kit, et aucune autre.
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id join taches t on t.id = mt.tache_id
    where m.slug = $t$secretariat-administration$t$ and t.code in ($t$F30$t$, $t$F01$t$, $t$F03$t$, $t$F04$t$, $t$F05$t$, $t$F06$t$, $t$F08$t$, $t$F10$t$, $t$F11$t$, $t$F12$t$, $t$F13$t$, $t$F14$t$, $t$F15$t$, $t$F16$t$, $t$F22$t$);
  if n <> 15 then
    raise exception 'Tâches du métier attendues : 15, trouvées : %', n;
  end if;
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id where m.slug = $t$secretariat-administration$t$;
  if n <> 15 then
    raise exception 'Le métier a % tâches, le kit en couvre 15', n;
  end if;
  -- Chaque tâche du métier a au moins une ressource de ce kit.
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id
    where m.slug = $t$secretariat-administration$t$ and not exists (
      select 1 from ressources_taches rt join kits_metier km on km.ressource_id = rt.ressource_id
      where rt.tache_id = mt.tache_id and km.metier_id = m.id);
  if n <> 0 then
    raise exception 'Tâches du métier sans ressource du kit : %', n;
  end if;
end
$controle$;

commit;
