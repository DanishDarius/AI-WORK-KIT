-- 0035 : contenu du kit « Montage vidéo » (4 octobre 2026)
--
-- Ce fichier est fabriqué par un programme à partir du fichier source du kit :
-- les textes en sont copiés tels quels. Il ajoute :
--   - la description localisée du métier « Montage vidéo », à côté de l'ancienne ;
--   - le rattachement de 20 tâches déjà écrites par un kit précédent (F01, F03, F04, F05, F09, F12, F13, F14, F16, F18, F26, F34, F35, F36, F37, F38, F39, F40, F41, F42) ;
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
update metiers set description_local = $t$Pour toute personne qui monte des vidéos pour des clients ou pour un média : mariages, publicités, reportages, vidéos courtes pour les réseaux sociaux. Vous travaillez avec CapCut ou un autre logiciel, sur téléphone ou sur ordinateur, WhatsApp et le Mobile Money : rushes, montage, sous-titres, livraisons, devis.$t$
  where slug = $t$montage-video$t$;

-- 2. Les tâches, leur résultat et leurs étapes
-- 3. Les cas pratiques localisés, à côté des anciens
-- 4. Les modèles à remplir, leurs champs et la note par IA
-- 5. Les ressources
insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-montage-video-chatgpt$t$, $t$configuration$t$, $t$Assistant du monteur$t$, $t$Vous le complétez une fois avec les informations de votre activité : ensuite, l'IA connaît ce que vous montez, vos outils, vos clients et vos conditions à chaque conversation.$t$, $t$chatgpt$t$, $t$Vous êtes l'assistant d'un monteur vidéo. Vous m'aidez à préparer mes montages et à les vendre : briefs, plans de montage, scripts, voix off, sous-titres, devis, messages aux clients.

MON ACTIVITÉ
Mon activité : [indépendant, agence, média ; ville]
Ce que je monte : [mariages, publicités, reportages, vidéos courtes]
Mes outils : [CapCut, téléphone, ordinateur]
Mes clients : [particuliers, commerçants, ONG, entreprises]
Mes conditions : [acompte, versions comprises, délai]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez mes clients.
2. Vous préparez le texte : plan, script, sous-titres, minutage, devis. Vous ne montez pas et vous ne créez pas la vidéo : dites-le.
3. Vous n'avez pas vu mes rushes. Partez seulement de ma liste de plans et de mes durées.
4. Montrez chaque calcul de durée, pour que je le vérifie.
5. Ne changez pas le sens de ce qu'une personne a dit. Une personne filmée a donné son accord.
6. Rappelez-moi d'utiliser une musique dont j'ai le droit de me servir.
7. N'inventez ni prix, ni délai. Les prix sont les miens. Montants écrits ainsi : 25 000 FCFA.
8. Messages pour WhatsApp : ni titre, ni astérisque. Ne demandez ni nom complet ni numéro.$t$, $j${"chatgpt": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre activité.", "Dans ChatGPT, choisissez un projet, puis Nouveau projet. Donnez-lui le nom « Mes montages », puis Créer un projet.", "Ouvrez le menu « … » du projet, puis Paramètres du projet. Collez le texte dans le champ Instructions, puis Enregistrer."], "gratuit": "Oui. Les projets sont disponibles sur un compte gratuit, avec 5 fichiers par projet.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Autre possibilité : Paramètres, Personnalisation, Instructions personnalisées. Le texte s'applique alors à toutes vos conversations, dans la limite de 1 500 caractères.", "Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-montage-video-claude$t$, $t$configuration$t$, $t$Assistant du monteur$t$, $t$Vous le complétez une fois avec les informations de votre activité : ensuite, l'IA connaît ce que vous montez, vos outils, vos clients et vos conditions à chaque conversation.$t$, $t$claude$t$, $t$Vous êtes l'assistant d'un monteur vidéo. Vous m'aidez à préparer mes montages et à les vendre : briefs, plans de montage, scripts, voix off, sous-titres, devis, messages aux clients.

MON ACTIVITÉ
Mon activité : [indépendant, agence, média ; ville]
Ce que je monte : [mariages, publicités, reportages, vidéos courtes]
Mes outils : [CapCut, téléphone, ordinateur]
Mes clients : [particuliers, commerçants, ONG, entreprises]
Mes conditions : [acompte, versions comprises, délai]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez mes clients.
2. Vous préparez le texte : plan, script, sous-titres, minutage, devis. Vous ne montez pas et vous ne créez pas la vidéo : dites-le.
3. Vous n'avez pas vu mes rushes. Partez seulement de ma liste de plans et de mes durées.
4. Montrez chaque calcul de durée, pour que je le vérifie.
5. Ne changez pas le sens de ce qu'une personne a dit. Une personne filmée a donné son accord.
6. Rappelez-moi d'utiliser une musique dont j'ai le droit de me servir.
7. N'inventez ni prix, ni délai. Les prix sont les miens. Montants écrits ainsi : 25 000 FCFA.
8. Messages pour WhatsApp : ni titre, ni astérisque. Ne demandez ni nom complet ni numéro.$t$, $j${"claude": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre activité.", "Dans Claude, ouvrez Projets, puis Nouveau projet. Donnez-lui le nom « Mes montages », puis Créer un projet.", "Dans le projet, ouvrez Instructions, puis Ajouter. Collez le texte, puis Enregistrer les instructions."], "gratuit": "Oui, dans la limite de 5 projets.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-montage-video-gemini$t$, $t$configuration$t$, $t$Assistant du monteur$t$, $t$Vous le complétez une fois avec les informations de votre activité : ensuite, l'IA connaît ce que vous montez, vos outils, vos clients et vos conditions à chaque conversation.$t$, $t$gemini$t$, $t$Vous êtes l'assistant d'un monteur vidéo. Vous m'aidez à préparer mes montages et à les vendre : briefs, plans de montage, scripts, voix off, sous-titres, devis, messages aux clients.

MON ACTIVITÉ
Mon activité : [indépendant, agence, média ; ville]
Ce que je monte : [mariages, publicités, reportages, vidéos courtes]
Mes outils : [CapCut, téléphone, ordinateur]
Mes clients : [particuliers, commerçants, ONG, entreprises]
Mes conditions : [acompte, versions comprises, délai]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez mes clients.
2. Vous préparez le texte : plan, script, sous-titres, minutage, devis. Vous ne montez pas et vous ne créez pas la vidéo : dites-le.
3. Vous n'avez pas vu mes rushes. Partez seulement de ma liste de plans et de mes durées.
4. Montrez chaque calcul de durée, pour que je le vérifie.
5. Ne changez pas le sens de ce qu'une personne a dit. Une personne filmée a donné son accord.
6. Rappelez-moi d'utiliser une musique dont j'ai le droit de me servir.
7. N'inventez ni prix, ni délai. Les prix sont les miens. Montants écrits ainsi : 25 000 FCFA.
8. Messages pour WhatsApp : ni titre, ni astérisque. Ne demandez ni nom complet ni numéro.$t$, $j${"gemini": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre activité.", "Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez « Assistant du monteur ». Collez le texte dans Instructions, puis Enregistrer."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-brief-video$t$, $t$skill$t$, $t$Brief vidéo$t$, $t$Transforme la demande d'un client en brief vidéo : objectif, public, durée, formats, contenus fournis, textes, musique, accords, questions à poser.$t$, null, $t$---
name: brief-video
description: Transforme la demande d'un client en brief vidéo : objectif, public, durée, formats, contenus fournis, textes, musique, accords, questions à poser. À utiliser avant de monter ou de tourner.
---

# Brief vidéo

Quand l'utilisateur colle la demande d'un client, rédigez le brief qui servira de référence pendant tout le projet.

## Avant d'écrire
Il vous faut : ce que le client demande, à quoi servira la vidéo, où elle sera vue, la durée voulue, ce que le client fournit (rushes, logo, musique, textes) et la date de livraison. Ce qui manque devient une question au client.

## Ce que vous livrez
1. Le brief en 10 lignes : objectif, public, message, ton.
2. La durée et les formats à livrer : vertical, carré, horizontal.
3. Ce que le client fournit, et ce qui manque encore.
4. Le déroulé souhaité : le début, le milieu, la fin.
5. Les textes à l'écran, les sous-titres et leurs langues, la musique, la voix.
6. Les questions à poser au client avant de commencer : 5 au plus, dont l'accord des personnes filmées et le droit sur la musique.
7. Le message à envoyer au client pour faire valider le brief.

## Règles
- Reprenez les mots du client. Ne devinez ni une date, ni une durée, ni un texte : demandez-les.
- N'annoncez aucun délai que l'utilisateur n'a pas donné.
- Ne promettez pas une vidéo créée par une IA : le brief décrit un montage ou un tournage.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mes montages »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$brief-video.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-plan-de-montage$t$, $t$skill$t$, $t$Plan de montage$t$, $t$Construit le plan de montage d'une vidéo à partir de la liste des plans : ordre, durée gardée, texte à l'écran, addition des durées.$t$, null, $t$---
name: plan-de-montage
description: Construit le plan de montage d'une vidéo à partir de la liste des plans : ordre, durée gardée, texte à l'écran, addition des durées. À utiliser après le dérushage, avant de monter.
---

# Plan de montage

Quand l'utilisateur colle sa liste de plans, proposez un plan de montage qui tient dans la durée visée.

## Avant d'écrire
Il vous faut : ce que l'utilisateur monte, la durée visée, le format, la liste des plans avec leur durée et leur qualité, et l'effet cherché. S'il manque la durée d'un plan, demandez-la.

## Ce que vous livrez
1. Le plan de montage dans l'ordre : plan, durée gardée, rôle dans la vidéo.
2. L'addition des durées, qui ne dépasse pas la durée visée. Montrez le calcul.
3. Les trois premières secondes : ce qu'on voit et ce qu'on lit.
4. Les textes à l'écran, plan par plan, courts.
5. Les plans écartés, et pourquoi.
6. Le plan qui manque, s'il en manque un, et comment s'en passer.

## Règles
- Choisissez seulement parmi les plans donnés. N'inventez ni plan, ni durée.
- Vous n'avez pas vu les rushes : dites-le quand un choix dépend de l'image.
- Un plan flou, tremblé ou mal enregistré ne se garde que s'il est irremplaçable.
- Ne changez pas le sens de ce qu'une personne dit en coupant sa phrase.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mes montages »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$plan-de-montage.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-sous-titres$t$, $t$skill$t$, $t$Sous-titres$t$, $t$Prépare les sous-titres d'une vidéo à partir du texte dit : correction, découpage en lignes courtes, traduction au même découpage.$t$, null, $t$---
name: sous-titres
description: Prépare les sous-titres d'une vidéo à partir du texte dit : correction, découpage en lignes courtes, traduction au même découpage. À utiliser quand le montage est terminé.
---

# Sous-titres

Quand l'utilisateur colle le texte dit dans sa vidéo, préparez des sous-titres faciles à lire sur un téléphone.

## Avant d'écrire
Il vous faut : le texte de ce qui est dit, où la vidéo sera vue, les langues demandées, et les noms ou les chiffres à vérifier. Si l'utilisateur n'a pas le texte, proposez-lui de le dicter ou de le taper passage par passage.

## Ce que vous livrez
1. Le texte corrigé : orthographe, ponctuation, noms et chiffres, sans changer les mots de la personne.
2. Les sous-titres numérotés : une ou deux lignes courtes, une idée par sous-titre.
3. La traduction, si elle est demandée, avec le même nombre de sous-titres.
4. Les passages incertains, signalés, à faire relire.
5. La marche à suivre pour les saisir et les caler à la main dans une application de montage.

## Règles
- Ne résumez pas et n'ajoutez rien : les sous-titres disent ce que la personne dit.
- Ne promettez pas de sous-titres automatiques gratuits : cela dépend de la version de l'application.
- Une traduction se fait relire par une personne qui parle la langue.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mes montages »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$sous-titres.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-script-voix-off$t$, $t$skill$t$, $t$Script de voix off$t$, $t$Écrit la voix off d'une vidéo plan par plan, au nombre de mots qui tient dans chaque plan selon le débit de l'utilisateur.$t$, null, $t$---
name: script-voix-off
description: Écrit la voix off d'une vidéo plan par plan, au nombre de mots qui tient dans chaque plan selon le débit de l'utilisateur. À utiliser quand le montage des images est calé.
---

# Script de voix off

Quand l'utilisateur donne ses plans et leur durée, écrivez une voix off qui tient dans chaque plan.

## Avant d'écrire
Il vous faut : la liste des plans avec leur durée, ce que la voix doit faire comprendre, le public, et le débit de l'utilisateur : le nombre de mots qu'il lit en 10 secondes. S'il ne le connaît pas, demandez-lui de le mesurer.

## Ce que vous livrez
1. Le nombre de mots au plus pour chaque plan, avec le calcul.
2. Le texte de la voix off, plan par plan, avec son nombre de mots.
3. Le total des mots, comparé au total permis.
4. Deux conseils de lecture : où respirer, quel mot appuyer.
5. La version traduite, si elle est demandée, ajustée à la même durée.

## Règles
- Des phrases courtes, faites pour être dites à voix haute.
- Si un texte dépasse, raccourcissez-le : on n'accélère pas la voix.
- N'inventez ni chiffre, ni promesse, ni nom.
- N'imitez jamais la voix d'une personne réelle : la voix est celle de l'utilisateur, ou d'une personne qui a donné son accord.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mes montages »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$script-voix-off.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-suivi-projets-video$t$, $t$document$t$, $t$Suivi des projets vidéo$t$, $t$Ce tableau suit chaque montage : le client, la vidéo à livrer, le montant du devis, ce qui a été reçu, les versions comprises et celles déjà livrées, l'état et l'échéance. Il calcule ce qu'il reste à recevoir et signale les versions en trop.$t$, null, $t$Une ligne par projet : un numéro, le client, la vidéo, le montant du devis, la somme reçue, le nombre de versions comprises et livrées, l'état et l'échéance.
Le reste à recevoir, les versions restantes et les jours restants se calculent seuls.
Quand les versions livrées dépassent celles qui sont comprises, la case s'affiche en rouge : c'est le moment de parler du supplément.
L'onglet « Résumé » compte les projets par état, le total à recevoir, les projets livrés non soldés et les projets en retard.
Désignez le client par un prénom ou une enseigne, sans numéro de téléphone.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$suivi-des-projets-video.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1AbiRK6ok8N3ra4kKFzB4Cph08EkHUE5VJnqr9Gqc3Y0/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-feuille-derushage$t$, $t$document$t$, $t$Feuille de dérushage$t$, $t$Ce tableau liste vos plans après le tournage : ce qu'on voit, la durée, la qualité de l'image et du son, ce que vous gardez et pour combien de secondes. Il additionne les durées et compare le total à la durée que vous visez.$t$, null, $t$Dans l'onglet « Réglages », vous écrivez le projet et la durée visée du montage, en secondes.
Dans l'onglet « Plans », une ligne par plan : le fichier, ce qu'on voit ou entend, la durée, la qualité de l'image et du son, si vous le gardez, la durée gardée et l'ordre dans le montage.
Une durée gardée plus longue que le plan s'affiche en rouge.
L'onglet « Résumé » additionne la durée des rushes et la durée gardée, et donne l'écart avec la durée visée.
Cette liste est aussi ce que vous collez dans une IA pour préparer un plan de montage : elle ne regarde pas vos rushes.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$feuille-de-derushage.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1rKgxbI15tL3ZUagIZVhPq_xQFi1jAeYZ5L2xVX3SPeU/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-devis-montage$t$, $t$document$t$, $t$Devis de montage$t$, $t$Ce tableau prépare un devis de montage : vous écrivez chaque prestation, la quantité et votre prix, il calcule les montants, le total, la remise, l'acompte et le solde. Vous y notez aussi vos conditions : versions comprises, délai, formats livrés.$t$, null, $t$Dans l'onglet « Devis », une ligne par prestation : ce que vous livrez, le détail, la quantité et le prix à l'unité. Le montant se calcule seul.
Dans l'onglet « Récapitulatif », vous écrivez la remise et la part de l'acompte : le net à payer, l'acompte et le solde se calculent seuls.
Vous y notez vos conditions : le nombre de versions comprises, le prix d'une version en plus, le délai et la validité du devis.
Les prix sont les vôtres : le tableau n'en propose aucun.
Ce devis n'est pas une facture officielle et ne calcule aucune taxe.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$devis-de-montage.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1Yl2ncFfcKdoRlNEcvXBdtE4jpYFZfyKAfY-8-tnIURw/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-brief-video$t$, $t$document$t$, $t$Brief vidéo$t$, $t$Ce document de deux pages au plus fixe la commande avant de monter : l'objectif, le public, la durée, les formats, ce que le client fournit, le déroulé, les textes, la musique, les accords et les conditions. Il se remplit sur le téléphone et s'envoie en PDF au client, pour validation.$t$, null, $t$Il contient : le projet, l'objectif, où la vidéo sera vue, la durée et les formats, ce que le client fournit, le déroulé souhaité, les textes à l'écran et les sous-titres, la musique et la voix, les accords des personnes filmées, les conditions et la validation du client.
Validé par le client, il sert de référence quand une nouvelle version est demandée. Ce n'est ni un devis ni un contrat.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$brief-video.docx$t$, $t$https://docs.google.com/document/d/1oTGFgZ_KX5hqFw6wyCSwCWlRhkomieVwYccvHcOBCQ4/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-projets-video-lundi$t$, $t$routine$t$, $t$Projets vidéo, le lundi$t$, $t$Chaque lundi, l'IA vous rappelle de faire le point de vos montages. Elle ne voit pas votre tableau : vous collez vos projets en cours, puis elle donne ce qu'il faut livrer cette semaine, ce qui est bloqué et l'ordre de travail.$t$, null, $t$Chaque lundi à 7 h 30, envoyez-moi ce message : « Bonjour. C'est lundi, faisons le point de vos montages. Collez ici, pour chaque projet : un repère pour le client, la vidéo à livrer, l'échéance, l'état, les versions comprises et celles déjà livrées. »

Quand j'aurai collé mes lignes :
1. Listez les vidéos à livrer cette semaine, jour par jour.
2. Listez les projets bloqués : ce qui manque (rushes, logo, musique, validation), et le message à envoyer au client.
3. Signalez les projets où les versions livrées dépassent celles qui sont comprises.
4. Proposez l'ordre de travail d'aujourd'hui.

Règles : partez seulement de mes lignes. N'inventez ni délai, ni prix. Aucun nom complet.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mes montages »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Mes montages ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mes montages »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant du monteur »."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-livraisons-video-vendredi$t$, $t$routine$t$, $t$Livraisons vidéo, le vendredi$t$, $t$Chaque vendredi, l'IA vous rappelle de faire le point des livraisons et des paiements. Vous collez ce qui a été livré, la réponse du client et ce qui a été reçu, puis elle calcule ce qu'il reste à recevoir et rédige les relances.$t$, null, $t$Chaque vendredi à 16 h, envoyez-moi ce message : « Bonjour. C'est vendredi, faisons le point des livraisons. Collez ici, pour chaque projet : ce qui a été livré cette semaine, la réponse du client, le montant du devis et ce que vous avez reçu. Désignez chaque client par un repère. »

Quand j'aurai collé mes lignes :
1. Listez ce qui a été livré, et ce qui attend une réponse du client.
2. Calculez ce qu'il reste à recevoir pour chaque projet, puis le total. Montrez chaque calcul.
3. Listez les projets livrés et pas encore soldés, du plus ancien au plus récent.
4. Rédigez le message de relance de chacun, pour une validation ou pour un paiement, court et respectueux.

Règles : utilisez seulement mes chiffres. Ni menace, ni pénalité. Aucun nom complet, aucun numéro.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mes montages »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Mes montages ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mes montages »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant du monteur »."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

-- 6. Le kit : présentation, étapes d'installation, encadrés « À savoir », mots expliqués
insert into kits (metier_id, titre, presentation, etapes, prerequis, limites, a_savoir, mots, revu_le) select m.id, $t$Montage vidéo$t$, $t$Tout ce qu'il faut pour cadrer une commande, trier vos rushes, préparer un plan de montage, des sous-titres et une voix off, chiffrer un devis et suivre vos livraisons, avec une IA gratuite, sur un téléphone Android : une configuration, quatre skills, quatre documents, deux routines et vingt tâches.$t$, $j$[{"numero": 1, "titre": "Configurer mon IA avec « Assistant du monteur »", "minutes": 5}, {"numero": 2, "titre": "Installer mes 3 premières skills : brief vidéo, plan de montage, sous-titres", "minutes": 10}, {"numero": 3, "titre": "Copier mes documents : suivi des projets vidéo, feuille de dérushage, devis de montage", "minutes": 5}]$j$::jsonb, $j$["Un téléphone Android avec une connexion, même limitée.", "Votre application de montage : CapCut ou une autre, sur téléphone ou sur ordinateur.", "Un compte Google et les applications gratuites Google Sheets et Google Docs, pour ouvrir les documents.", "Une IA gratuite au choix : ChatGPT, Claude ou Gemini."]$j$::jsonb, $j$["Il ne monte pas à votre place et ne crée pas de vidéo : en octobre 2026, aucune des trois IA ne génère de vidéo avec un compte gratuit. L'IA prépare le plan, le script, les sous-titres et le minutage.", "Il ne regarde pas vos rushes : l'IA travaille à partir de votre liste de plans.", "Il ne promet aucune fonction automatique de votre application de montage : selon votre version, certaines sont payantes. Il donne la méthode à la main.", "Il ne fixe pas vos prix et ne donne aucun conseil fiscal ou juridique. Un devis n'est pas une facture officielle.", "Il ne remplace ni l'accord des personnes filmées ni le droit d'utiliser une musique.", "Il ne vous demande jamais de coller dans une IA le nom complet ou le numéro d'un client."]$j$::jsonb, $j${"chatgpt": "OpenAI retire les GPT personnalisés le 11 décembre 2026 et les remplace par les plugins. Ce kit n'utilise donc aucun GPT personnalisé : votre configuration se colle dans un projet, et chaque skill s'ajoute dans la rubrique Plugins, onglet Skills, ou se colle au début de la conversation. Si vous avez déjà vos propres GPT, pensez à les convertir en plugins avant cette date.", "gemini": "Google remplace les Gems par les skills en novembre 2026. Vos Gems seront convertis automatiquement. Les étapes de ce kit seront mises à jour à ce moment-là, et vous serez prévenu dans l'application."}$j$::jsonb, $j$[{"mot": "Configuration", "phrase": "Un texte d'instructions que l'IA garde en mémoire, pour ne pas tout réexpliquer à chaque conversation."}, {"mot": "Projet", "phrase": "Un dossier de conversations qui partagent les mêmes instructions."}, {"mot": "Skill", "phrase": "Une consigne enregistrée que l'IA applique quand le sujet s'y prête."}, {"mot": "Consigne, ou prompt", "phrase": "Le texte que l'on écrit à l'IA pour lui demander un travail."}, {"mot": "Modèle à remplir", "phrase": "Une consigne déjà rédigée, où il ne reste qu'à remplir quelques champs."}, {"mot": "Champ", "phrase": "Une case du formulaire, à remplir avec vos propres informations."}, {"mot": "Routine", "phrase": "Une demande qui revient à jour fixe."}, {"mot": "Tâche planifiée", "phrase": "Une demande que l'IA lance seule, au jour choisi."}, {"mot": "Rushes", "phrase": "Tout ce qui a été filmé, avant le montage."}, {"mot": "Dérushage", "phrase": "Le tri des rushes : regarder chaque plan, noter ce qu'il vaut, choisir ce que l'on garde."}, {"mot": "Plan", "phrase": "Un morceau de vidéo filmé d'un seul trait."}, {"mot": "Plan de montage", "phrase": "La liste des plans retenus, dans l'ordre, avec la durée gardée de chacun."}, {"mot": "Version", "phrase": "Une vidéo montée, présentée au client ; chaque série de corrections donne une nouvelle version."}, {"mot": "Brief vidéo", "phrase": "Le document qui fixe la commande : l'objectif, la durée, les formats, ce que fournit le client."}, {"mot": "Format", "phrase": "La forme de l'image : verticale comme un téléphone tenu debout, carrée, ou horizontale comme un écran de télévision."}, {"mot": "Recadrage", "phrase": "Le fait de changer ce que l'on garde de l'image, pour l'adapter à un autre format."}, {"mot": "Transcription", "phrase": "Le texte écrit de ce qui est dit dans une vidéo."}, {"mot": "Sous-titres", "phrase": "Le texte qui s'affiche en bas de la vidéo et reprend ce qui est dit."}, {"mot": "Voix off", "phrase": "La voix qui commente la vidéo sans que l'on voie la personne qui parle."}, {"mot": "Débit", "phrase": "Le nombre de mots que l'on dit en un temps donné."}, {"mot": "Séquence", "phrase": "Une courte suite d'images qui montre une seule action."}, {"mot": "Devis", "phrase": "Le document qui annonce le prix et les conditions avant de commencer."}, {"mot": "Acompte", "phrase": "La part du prix payée avant le début du travail."}, {"mot": "Solde", "phrase": "Ce qu'il reste à payer à la livraison."}, {"mot": "Gem", "phrase": "Un assistant Gemini enregistré avec ses propres instructions, que l'on rouvre d'un geste."}, {"mot": "Plugin", "phrase": "Un ajout que l'on installe dans ChatGPT et qui contient des consignes prêtes à servir ; il remplace le GPT personnalisé."}]$j$::jsonb, '2026-10-04' from metiers m
  where m.slug = $t$montage-video$t$
  on conflict (metier_id) do update set titre = excluded.titre, presentation = excluded.presentation, etapes = excluded.etapes, prerequis = excluded.prerequis, limites = excluded.limites, a_savoir = excluded.a_savoir, mots = excluded.mots, revu_le = excluded.revu_le;

-- 7. Les ressources du kit, dans l'ordre, avec leur étape d'installation
insert into kits_metier (metier_id, ressource_id, ordre, etape_installation) select m.id, r.id, v.ordre, v.etape
  from metiers m, ressources r,
  (values
    ($t$config-montage-video-chatgpt$t$, 1, 1),
    ($t$config-montage-video-claude$t$, 2, 1),
    ($t$config-montage-video-gemini$t$, 3, 1),
    ($t$skill-brief-video$t$, 4, 2),
    ($t$skill-plan-de-montage$t$, 5, 2),
    ($t$skill-sous-titres$t$, 6, 2),
    ($t$doc-suivi-projets-video$t$, 7, 3),
    ($t$doc-feuille-derushage$t$, 8, 3),
    ($t$doc-devis-montage$t$, 9, 3),
    ($t$skill-script-voix-off$t$, 10, null::integer),
    ($t$doc-brief-video$t$, 11, null::integer),
    ($t$routine-projets-video-lundi$t$, 12, null::integer),
    ($t$routine-livraisons-video-vendredi$t$, 13, null::integer)
  ) as v(cle, ordre, etape)
  where m.slug = $t$montage-video$t$ and r.cle = v.cle
  on conflict (metier_id, ressource_id) do update set ordre = excluded.ordre, etape_installation = excluded.etape_installation;

-- 8. Quelles ressources servent à quelles tâches
insert into ressources_taches (ressource_id, tache_id) select r.id, t.id
  from ressources r, taches t,
  (values
    ($t$config-montage-video-chatgpt$t$, $t$F01$t$),
    ($t$config-montage-video-claude$t$, $t$F01$t$),
    ($t$config-montage-video-gemini$t$, $t$F01$t$),
    ($t$config-montage-video-chatgpt$t$, $t$F03$t$),
    ($t$config-montage-video-claude$t$, $t$F03$t$),
    ($t$config-montage-video-gemini$t$, $t$F03$t$),
    ($t$skill-brief-video$t$, $t$F03$t$),
    ($t$doc-brief-video$t$, $t$F03$t$),
    ($t$config-montage-video-chatgpt$t$, $t$F04$t$),
    ($t$config-montage-video-claude$t$, $t$F04$t$),
    ($t$config-montage-video-gemini$t$, $t$F04$t$),
    ($t$skill-sous-titres$t$, $t$F04$t$),
    ($t$config-montage-video-chatgpt$t$, $t$F05$t$),
    ($t$config-montage-video-claude$t$, $t$F05$t$),
    ($t$config-montage-video-gemini$t$, $t$F05$t$),
    ($t$doc-suivi-projets-video$t$, $t$F05$t$),
    ($t$config-montage-video-chatgpt$t$, $t$F09$t$),
    ($t$config-montage-video-claude$t$, $t$F09$t$),
    ($t$config-montage-video-gemini$t$, $t$F09$t$),
    ($t$config-montage-video-chatgpt$t$, $t$F12$t$),
    ($t$config-montage-video-claude$t$, $t$F12$t$),
    ($t$config-montage-video-gemini$t$, $t$F12$t$),
    ($t$doc-feuille-derushage$t$, $t$F12$t$),
    ($t$config-montage-video-chatgpt$t$, $t$F13$t$),
    ($t$config-montage-video-claude$t$, $t$F13$t$),
    ($t$config-montage-video-gemini$t$, $t$F13$t$),
    ($t$config-montage-video-chatgpt$t$, $t$F14$t$),
    ($t$config-montage-video-claude$t$, $t$F14$t$),
    ($t$config-montage-video-gemini$t$, $t$F14$t$),
    ($t$skill-sous-titres$t$, $t$F14$t$),
    ($t$config-montage-video-chatgpt$t$, $t$F16$t$),
    ($t$config-montage-video-claude$t$, $t$F16$t$),
    ($t$config-montage-video-gemini$t$, $t$F16$t$),
    ($t$doc-suivi-projets-video$t$, $t$F16$t$),
    ($t$routine-projets-video-lundi$t$, $t$F16$t$),
    ($t$config-montage-video-chatgpt$t$, $t$F18$t$),
    ($t$config-montage-video-claude$t$, $t$F18$t$),
    ($t$config-montage-video-gemini$t$, $t$F18$t$),
    ($t$doc-devis-montage$t$, $t$F18$t$),
    ($t$routine-livraisons-video-vendredi$t$, $t$F18$t$),
    ($t$config-montage-video-chatgpt$t$, $t$F26$t$),
    ($t$config-montage-video-claude$t$, $t$F26$t$),
    ($t$config-montage-video-gemini$t$, $t$F26$t$),
    ($t$config-montage-video-chatgpt$t$, $t$F34$t$),
    ($t$config-montage-video-claude$t$, $t$F34$t$),
    ($t$config-montage-video-gemini$t$, $t$F34$t$),
    ($t$config-montage-video-chatgpt$t$, $t$F35$t$),
    ($t$config-montage-video-claude$t$, $t$F35$t$),
    ($t$config-montage-video-gemini$t$, $t$F35$t$),
    ($t$config-montage-video-chatgpt$t$, $t$F36$t$),
    ($t$config-montage-video-claude$t$, $t$F36$t$),
    ($t$config-montage-video-gemini$t$, $t$F36$t$),
    ($t$skill-plan-de-montage$t$, $t$F36$t$),
    ($t$doc-feuille-derushage$t$, $t$F36$t$),
    ($t$config-montage-video-chatgpt$t$, $t$F37$t$),
    ($t$config-montage-video-claude$t$, $t$F37$t$),
    ($t$config-montage-video-gemini$t$, $t$F37$t$),
    ($t$skill-plan-de-montage$t$, $t$F37$t$),
    ($t$doc-feuille-derushage$t$, $t$F37$t$),
    ($t$config-montage-video-chatgpt$t$, $t$F38$t$),
    ($t$config-montage-video-claude$t$, $t$F38$t$),
    ($t$config-montage-video-gemini$t$, $t$F38$t$),
    ($t$skill-sous-titres$t$, $t$F38$t$),
    ($t$config-montage-video-chatgpt$t$, $t$F39$t$),
    ($t$config-montage-video-claude$t$, $t$F39$t$),
    ($t$config-montage-video-gemini$t$, $t$F39$t$),
    ($t$config-montage-video-chatgpt$t$, $t$F40$t$),
    ($t$config-montage-video-claude$t$, $t$F40$t$),
    ($t$config-montage-video-gemini$t$, $t$F40$t$),
    ($t$skill-brief-video$t$, $t$F40$t$),
    ($t$config-montage-video-chatgpt$t$, $t$F41$t$),
    ($t$config-montage-video-claude$t$, $t$F41$t$),
    ($t$config-montage-video-gemini$t$, $t$F41$t$),
    ($t$skill-script-voix-off$t$, $t$F41$t$),
    ($t$config-montage-video-chatgpt$t$, $t$F42$t$),
    ($t$config-montage-video-claude$t$, $t$F42$t$),
    ($t$config-montage-video-gemini$t$, $t$F42$t$),
    ($t$skill-brief-video$t$, $t$F42$t$)
  ) as v(cle, code)
  where r.cle = v.cle and t.code = v.code
  on conflict (ressource_id, tache_id) do nothing;

-- 9. Contrôle final : si quelque chose manque, tout est annulé.
do $controle$
declare
  n integer;
begin
  if not exists (select 1 from metiers where slug = $t$montage-video$t$ and description_local is not null) then
    raise exception 'Métier introuvable : montage-video';
  end if;
  -- Chaque tâche du kit, neuve ou déjà écrite, a son modèle et ses deux cas localisés.
  select count(*) into n from taches t where t.code in ($t$F01$t$, $t$F03$t$, $t$F04$t$, $t$F05$t$, $t$F09$t$, $t$F12$t$, $t$F13$t$, $t$F14$t$, $t$F16$t$, $t$F18$t$, $t$F26$t$, $t$F34$t$, $t$F35$t$, $t$F36$t$, $t$F37$t$, $t$F38$t$, $t$F39$t$, $t$F40$t$, $t$F41$t$, $t$F42$t$)
    and exists (select 1 from modeles_prompts mp where mp.tache_id = t.id)
    and (select count(*) from exercices e where e.tache_id = t.id and e.titre_local is not null) = 2;
  if n <> 20 then
    raise exception 'Tâches complètes attendues : 20, trouvées : %', n;
  end if;
  select count(*) into n from kits_metier km join metiers m on m.id = km.metier_id where m.slug = $t$montage-video$t$;
  if n <> 13 then
    raise exception 'Ressources du kit attendues : 13, trouvées : %', n;
  end if;
  -- Toutes les tâches du métier sont dans le kit, et aucune autre.
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id join taches t on t.id = mt.tache_id
    where m.slug = $t$montage-video$t$ and t.code in ($t$F01$t$, $t$F03$t$, $t$F04$t$, $t$F05$t$, $t$F09$t$, $t$F12$t$, $t$F13$t$, $t$F14$t$, $t$F16$t$, $t$F18$t$, $t$F26$t$, $t$F34$t$, $t$F35$t$, $t$F36$t$, $t$F37$t$, $t$F38$t$, $t$F39$t$, $t$F40$t$, $t$F41$t$, $t$F42$t$);
  if n <> 20 then
    raise exception 'Tâches du métier attendues : 20, trouvées : %', n;
  end if;
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id where m.slug = $t$montage-video$t$;
  if n <> 20 then
    raise exception 'Le métier a % tâches, le kit en couvre 20', n;
  end if;
  -- Chaque tâche du métier a au moins une ressource de ce kit.
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id
    where m.slug = $t$montage-video$t$ and not exists (
      select 1 from ressources_taches rt join kits_metier km on km.ressource_id = rt.ressource_id
      where rt.tache_id = mt.tache_id and km.metier_id = m.id);
  if n <> 0 then
    raise exception 'Tâches du métier sans ressource du kit : %', n;
  end if;
end
$controle$;

commit;
