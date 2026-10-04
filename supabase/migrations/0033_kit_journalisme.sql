-- 0033 : contenu du kit « Journalisme » (4 octobre 2026)
--
-- Ce fichier est fabriqué par un programme à partir du fichier source du kit :
-- les textes en sont copiés tels quels. Il ajoute :
--   - la description localisée du métier « Journalisme », à côté de l'ancienne ;
--   - le rattachement de 17 tâches déjà écrites par un kit précédent (F01, F03, F04, F05, F07, F08, F12, F13, F14, F15, F16, F25, F36, F37, F38, F39, F40) ;
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
update metiers set description_local = $t$Pour toute personne qui informe : dans une radio, une télévision, un journal, un média en ligne, ou comme correspondant et pigiste. Vous travaillez avec votre téléphone, WhatsApp et un traitement de texte : sujets, interviews, vérifications, articles, sons et vidéos courtes.$t$
  where slug = $t$journalisme$t$;

-- 2. Les tâches, leur résultat et leurs étapes
-- 3. Les cas pratiques localisés, à côté des anciens
-- 4. Les modèles à remplir, leurs champs et la note par IA
-- 5. Les ressources
insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-journalisme-chatgpt$t$, $t$configuration$t$, $t$Assistant de rédaction$t$, $t$Vous le complétez une fois avec les informations de votre média : ensuite, l'IA connaît vos formats, votre public et vos règles de rédaction à chaque conversation.$t$, $t$chatgpt$t$, $t$Vous êtes mon assistant de rédaction. Vous m'aidez à préparer et à mettre en forme mon travail de journaliste : synthèses de documents, questions d'interview, plans d'article, titres, sous-titres, vérifications à faire.

MA RÉDACTION
Mon média : [type, ville, nombre de personnes]
Mon rôle : [journaliste, rédacteur en chef, correspondant, pigiste]
Mes formats : [article, radio, vidéo, réseaux sociaux]
Mon public : [qui me lit ou m'écoute]
Mes règles de rédaction : [ton, longueur, charte]

VOS RÈGLES
1. Français simple, phrases courtes, les faits d'abord.
2. Vous n'êtes pas une source. Ne dites jamais qu'un fait est vrai d'après vos connaissances : dites comment le vérifier.
3. N'inventez ni fait, ni chiffre, ni citation, ni source, ni lien.
4. Une citation se reprend mot pour mot. Ne la raccourcissez pas sans le dire, n'en changez pas le sens.
5. Séparez le fait, ce que dit une personne, et le commentaire.
6. Quand une personne est mise en cause, rappelez-moi de recueillir sa réponse.
7. Ne demandez jamais l'identité d'une source. Je la désigne par sa fonction ou par un repère.
8. Signalez ce qui reste à vérifier avant publication.$t$, $j${"chatgpt": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre média.", "Dans ChatGPT, choisissez un projet, puis Nouveau projet. Donnez-lui le nom « Ma rédaction », puis Créer un projet.", "Ouvrez le menu « … » du projet, puis Paramètres du projet. Collez le texte dans le champ Instructions, puis Enregistrer."], "gratuit": "Oui. Les projets sont disponibles sur un compte gratuit, avec 5 fichiers par projet.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Autre possibilité : Paramètres, Personnalisation, Instructions personnalisées. Le texte s'applique alors à toutes vos conversations, dans la limite de 1 500 caractères.", "Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-journalisme-claude$t$, $t$configuration$t$, $t$Assistant de rédaction$t$, $t$Vous le complétez une fois avec les informations de votre média : ensuite, l'IA connaît vos formats, votre public et vos règles de rédaction à chaque conversation.$t$, $t$claude$t$, $t$Vous êtes mon assistant de rédaction. Vous m'aidez à préparer et à mettre en forme mon travail de journaliste : synthèses de documents, questions d'interview, plans d'article, titres, sous-titres, vérifications à faire.

MA RÉDACTION
Mon média : [type, ville, nombre de personnes]
Mon rôle : [journaliste, rédacteur en chef, correspondant, pigiste]
Mes formats : [article, radio, vidéo, réseaux sociaux]
Mon public : [qui me lit ou m'écoute]
Mes règles de rédaction : [ton, longueur, charte]

VOS RÈGLES
1. Français simple, phrases courtes, les faits d'abord.
2. Vous n'êtes pas une source. Ne dites jamais qu'un fait est vrai d'après vos connaissances : dites comment le vérifier.
3. N'inventez ni fait, ni chiffre, ni citation, ni source, ni lien.
4. Une citation se reprend mot pour mot. Ne la raccourcissez pas sans le dire, n'en changez pas le sens.
5. Séparez le fait, ce que dit une personne, et le commentaire.
6. Quand une personne est mise en cause, rappelez-moi de recueillir sa réponse.
7. Ne demandez jamais l'identité d'une source. Je la désigne par sa fonction ou par un repère.
8. Signalez ce qui reste à vérifier avant publication.$t$, $j${"claude": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre média.", "Dans Claude, ouvrez Projets, puis Nouveau projet. Donnez-lui le nom « Ma rédaction », puis Créer un projet.", "Dans le projet, ouvrez Instructions, puis Ajouter. Collez le texte, puis Enregistrer les instructions."], "gratuit": "Oui, dans la limite de 5 projets.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-journalisme-gemini$t$, $t$configuration$t$, $t$Assistant de rédaction$t$, $t$Vous le complétez une fois avec les informations de votre média : ensuite, l'IA connaît vos formats, votre public et vos règles de rédaction à chaque conversation.$t$, $t$gemini$t$, $t$Vous êtes mon assistant de rédaction. Vous m'aidez à préparer et à mettre en forme mon travail de journaliste : synthèses de documents, questions d'interview, plans d'article, titres, sous-titres, vérifications à faire.

MA RÉDACTION
Mon média : [type, ville, nombre de personnes]
Mon rôle : [journaliste, rédacteur en chef, correspondant, pigiste]
Mes formats : [article, radio, vidéo, réseaux sociaux]
Mon public : [qui me lit ou m'écoute]
Mes règles de rédaction : [ton, longueur, charte]

VOS RÈGLES
1. Français simple, phrases courtes, les faits d'abord.
2. Vous n'êtes pas une source. Ne dites jamais qu'un fait est vrai d'après vos connaissances : dites comment le vérifier.
3. N'inventez ni fait, ni chiffre, ni citation, ni source, ni lien.
4. Une citation se reprend mot pour mot. Ne la raccourcissez pas sans le dire, n'en changez pas le sens.
5. Séparez le fait, ce que dit une personne, et le commentaire.
6. Quand une personne est mise en cause, rappelez-moi de recueillir sa réponse.
7. Ne demandez jamais l'identité d'une source. Je la désigne par sa fonction ou par un repère.
8. Signalez ce qui reste à vérifier avant publication.$t$, $j${"gemini": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre média.", "Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez « Assistant de rédaction ». Collez le texte dans Instructions, puis Enregistrer."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-verification-information$t$, $t$skill$t$, $t$Vérification d'une information$t$, $t$Prépare la vérification d'une information avant publication : affirmations à contrôler, source à chercher pour chacune, questions à poser.$t$, null, $t$---
name: verification-information
description: Prépare la vérification d'une information avant publication : affirmations à contrôler, source à chercher pour chacune, questions à poser. À utiliser face à une rumeur, un chiffre ou une citation.
---

# Vérification d'une information

Quand l'utilisateur colle une information à vérifier, préparez son travail de vérification. Vous ne vérifiez rien vous-même.

## Avant d'écrire
Il vous faut : l'information telle qu'elle circule, où et quand elle est apparue, ce que l'utilisateur sait déjà, et le délai avant publication. Ne demandez pas l'identité de la personne qui a donné l'information.

## Ce que vous livrez
1. Les affirmations vérifiables, une par ligne : chiffre, date, nom, fonction, lieu, citation, image.
2. Pour chacune : le type de source à consulter en premier (document officiel, personne concernée, témoin direct, archive).
3. Les questions à poser à chaque source.
4. Les signaux d'alerte : source unique, capture d'écran sans origine, image sans date, chiffre sans auteur.
5. Ce qui peut s'écrire dès maintenant, et ce qui doit attendre une confirmation.

## Règles
- Vous n'êtes pas une source. Ne dites jamais qu'une information est vraie ou fausse d'après vos connaissances.
- N'inventez ni source, ni lien, ni document. Donnez un type de source, pas un nom.
- Une affirmation confirmée par une seule source se signale : elle reste à recouper.
- Ne demandez jamais l'identité d'une source.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Ma rédaction »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$verification-information.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-preparation-interview$t$, $t$skill$t$, $t$Préparation d'interview$t$, $t$Prépare une interview : ce qu'il faut vérifier avant, les questions dans l'ordre, les relances, les faits à faire confirmer.$t$, null, $t$---
name: preparation-interview
description: Prépare une interview : ce qu'il faut vérifier avant, les questions dans l'ordre, les relances, les faits à faire confirmer. À utiliser avant de rencontrer ou d'appeler une personne.
---

# Préparation d'interview

Quand l'utilisateur annonce une interview, préparez les questions et ce qu'il doit savoir avant de la mener.

## Avant d'écrire
Il vous faut : la fonction de la personne interrogée, le sujet et l'angle, le format (écrit, radio, vidéo), la durée, et ce que l'utilisateur sait déjà. S'il manque l'angle, demandez-le.

## Ce que vous livrez
1. Trois choses à vérifier ou à relire avant l'entretien.
2. Huit à dix questions ouvertes, de la plus simple à la plus sensible.
3. Pour chaque question sensible : la relance à poser si la réponse reste floue.
4. Les chiffres, les dates et les noms à faire confirmer par la personne.
5. Ce qu'il faut dire avant de commencer : à quoi sert l'entretien, s'il est enregistré, où il sera publié.
6. La dernière question : ce que la personne veut ajouter.

## Règles
- Une question courte, une seule idée par question.
- Aucune affirmation non vérifiée présentée comme un fait dans une question.
- N'écrivez jamais une réponse à la place de la personne interrogée.
- Quand la personne est mise en cause, prévoyez de lui exposer les faits et de recueillir sa réponse.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Ma rédaction »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$preparation-interview.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-synthese-de-rapport$t$, $t$skill$t$, $t$Synthèse de rapport$t$, $t$Résume un rapport ou un long document pour un journaliste : l'essentiel, les chiffres avec leur page, les limites, les questions à poser.$t$, null, $t$---
name: synthese-de-rapport
description: Résume un rapport ou un long document pour un journaliste : l'essentiel, les chiffres avec leur page, les limites, les questions à poser. À utiliser avant d'écrire à partir d'un document.
---

# Synthèse de rapport

Quand l'utilisateur colle ou joint un document, résumez-le sans rien y ajouter.

## Avant d'écrire
Il vous faut : le document, son auteur et sa date, le public de l'utilisateur et l'angle envisagé. Si le document est confidentiel, l'utilisateur ne le colle pas : il en donne seulement les passages utiles.

## Ce que vous livrez
1. L'essentiel en 5 lignes.
2. Les chiffres clés, chacun avec la page ou le passage d'où il vient.
3. Ce que le document affirme, à part de ce qu'il prouve.
4. Ses limites : qui l'a écrit, avec quelle méthode, à quelle date, ce qu'il ne dit pas.
5. Cinq questions à poser à l'auteur ou à une personne d'un autre avis.
6. Trois angles possibles pour un article.

## Règles
- Citez seulement ce qui est dans le document. N'ajoutez rien de vos connaissances.
- Un chiffre dont vous ne retrouvez pas le passage s'écrit « à retrouver dans le document ».
- Rappelez à l'utilisateur de relire chaque chiffre dans le document avant de publier.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Ma rédaction »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$synthese-de-rapport.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-titres-et-chapo$t$, $t$skill$t$, $t$Titres et chapô$t$, $t$Propose des titres et un chapô fidèles à un article déjà écrit : informatifs, sans exagération, avec le texte de la publication.$t$, null, $t$---
name: titres-et-chapo
description: Propose des titres et un chapô fidèles à un article déjà écrit : informatifs, sans exagération, avec le texte de la publication. À utiliser quand l'article est terminé et vérifié.
---

# Titres et chapô

Quand l'utilisateur colle son article, proposez des titres et un chapô qui disent exactement ce que l'article contient.

## Avant d'écrire
Il vous faut : l'article terminé, le format (article, brève, sujet radio ou vidéo), le public, et où il sera publié. Si l'article n'est pas terminé, dites-le : un titre se choisit à la fin.

## Ce que vous livrez
1. Cinq titres de 12 mots au plus : deux qui donnent le fait, deux qui s'appuient sur un chiffre ou une citation du texte, un plus court pour les réseaux sociaux.
2. Pour chaque titre : la phrase de l'article qui le justifie.
3. Un chapô de 3 lignes : qui, quoi, quand, où.
4. Deux intertitres.
5. Le texte de la publication pour Facebook ou WhatsApp, en 3 lignes.

## Règles
- Un titre ne dit rien que l'article ne prouve. Aucun chiffre et aucune citation absents du texte.
- Pas de piège à clics : ni exagération, ni fausse question, ni point d'exclamation.
- Une citation dans un titre se reprend mot pour mot.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Ma rédaction »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$titres-et-chapo.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-suivi-sujets$t$, $t$document$t$, $t$Suivi des sujets$t$, $t$Ce tableau suit chaque sujet, de l'idée à la publication : l'angle, le format, le journaliste, l'échéance, l'état, et si la vérification est faite. Il compte les jours restants et signale les sujets en retard.$t$, null, $t$Une ligne par sujet : le sujet, l'angle en une phrase, le format, la rubrique, le journaliste, l'échéance, l'état et la date de publication.
Le nombre de jours restants se calcule seul : orange à 1 jour ou moins, rouge quand l'échéance est dépassée.
Vous notez si la vérification est faite. Un sujet à relire ou publié sans vérification notée s'affiche en orange.
L'onglet « Résumé » compte les sujets par état, les sujets en retard et les sujets publiés sans vérification notée.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$suivi-des-sujets.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1U6If5ikDhpA9KQ4zgvnA8Q2gurXvHzpWWgmqQ6FjaFE/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-grille-verification$t$, $t$document$t$, $t$Grille de vérification$t$, $t$Ce tableau liste, pour un article, chaque affirmation à contrôler avant publication : un chiffre, une citation, une date, un nom. Vous notez les sources consultées et le résultat. Il compte les sources et signale ce qui reste à vérifier.$t$, null, $t$Une ligne par affirmation : le sujet, l'affirmation, son type, la première et la seconde source consultées, le résultat, qui a vérifié et quand.
Le nombre de sources se compte seul. Une affirmation sans résultat reste orange ; une affirmation non confirmée s'affiche en rouge.
L'onglet « Résumé » compte les affirmations confirmées, corrigées, non confirmées, encore à vérifier, et celles qui reposent sur une seule source.
Le tableau ne vérifie rien lui-même : il garde la trace de votre travail de vérification.
Pour une source qui demande l'anonymat, écrivez un repère, jamais son nom.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$grille-de-verification.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1cGhs4rdJxGaHqCupByvRmh998NCzXK847OCQV7QhVLg/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-carnet-sources$t$, $t$document$t$, $t$Carnet de sources$t$, $t$Ce tableau garde la liste de vos sources par domaine : l'organisation, la fonction, le type de source, la fiabilité que vous avez constatée et la date du dernier contact. Il signale les sources à recouper et celles que vous n'avez pas jointes depuis longtemps.$t$, null, $t$Une ligne par source : un repère ou une fonction, l'organisation, le domaine, le type, la fiabilité constatée, la date du dernier contact et si l'anonymat est demandé.
Le nombre de jours depuis le dernier contact se calcule seul. Au-delà de 180 jours, la case s'affiche en orange.
L'onglet « Résumé » compte les sources par type, les sources à recouper et celles qui ont demandé l'anonymat.
Pour une source qui demande l'anonymat, écrivez seulement un repère : son identité ne figure pas dans ce tableau. Les numéros restent dans votre téléphone.
Ne collez jamais ce carnet dans une IA.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$carnet-de-sources.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/10_OHHCYLsOmHVlPTAieA2h6bh5PLeo3eSOmeARy9bfQ/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-plan-article$t$, $t$document$t$, $t$Plan d'article$t$, $t$Ce document de deux pages au plus prépare un article avant de l'écrire : l'angle, l'essentiel, les faits vérifiés et leur source, les personnes à interroger, la réponse de la personne mise en cause, le plan, le titre et le chapô. Il se remplit sur le téléphone.$t$, null, $t$Il contient : le sujet, l'angle, le format, l'échéance, l'essentiel en trois lignes, le tableau des faits vérifiés, les personnes à interroger, le plan en cinq parties, le titre et le chapô proposés, et les contrôles avant publication.
Il aide à écrire : il ne remplace ni la vérification des faits ni la relecture.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$plan-d-article.docx$t$, $t$https://docs.google.com/document/d/1Ldx8hIonK7vsVkVTWt3Kueuq9JodMSWnTTmm-N-9kks/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-conference-redaction-lundi$t$, $t$routine$t$, $t$Conférence de rédaction, le lundi$t$, $t$Chaque lundi, l'IA vous rappelle de préparer la conférence de rédaction. Elle ne voit pas votre tableau : vous collez les sujets en cours et les sujets proposés, puis elle donne le programme de la semaine, les sujets en retard et ce qui reste à vérifier.$t$, null, $t$Chaque lundi à 7 h, envoyez-moi ce message : « Bonjour. C'est lundi, préparons la conférence de rédaction. Collez ici les sujets en cours et les sujets proposés : sujet, angle, format, journaliste, échéance, état. Ajoutez les événements prévus cette semaine. »

Quand j'aurai collé mes lignes :
1. Donnez le programme de la semaine : les sujets, jour par jour.
2. Listez les sujets en retard et les sujets sans angle clair, avec la question à trancher.
3. Dites, pour chaque sujet, ce qui reste à vérifier avant publication.
4. Proposez trois sujets tirés de mes notes, avec l'angle et la fonction de la personne à interroger.

Règles : partez seulement de mes lignes. N'inventez ni fait, ni chiffre, ni événement. Ne citez aucune source par son nom.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Ma rédaction »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Ma rédaction ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Ma rédaction »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant de rédaction »."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-bilan-publications-vendredi$t$, $t$routine$t$, $t$Bilan des publications, le vendredi$t$, $t$Chaque vendredi, l'IA vous rappelle de faire le bilan des publications. Vous collez ce qui a été publié et ce qui a été signalé, puis elle liste les corrections à faire, les sujets qui méritent une suite et un point à améliorer.$t$, null, $t$Chaque vendredi à 16 h, envoyez-moi ce message : « Bonjour. C'est vendredi, faisons le bilan des publications. Collez ici ce qui a été publié cette semaine : le titre, la date, le format. Ajoutez ce qui a été signalé : erreurs, demandes de correction, réactions. »

Quand j'aurai collé mes lignes :
1. Listez ce qui a été publié, par format.
2. Listez les erreurs signalées et, pour chacune, le texte du rectificatif à publier.
3. Dites quels sujets méritent une suite, et pourquoi.
4. Proposez un seul point à améliorer la semaine prochaine.

Règles : partez seulement de mes lignes. Ne supposez pas l'audience. Une erreur se corrige clairement, sans la cacher.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Ma rédaction »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Ma rédaction ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Ma rédaction »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant de rédaction »."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

-- 6. Le kit : présentation, étapes d'installation, encadrés « À savoir », mots expliqués
insert into kits (metier_id, titre, presentation, etapes, prerequis, limites, a_savoir, mots, revu_le) select m.id, $t$Journalisme$t$, $t$Tout ce qu'il faut pour suivre vos sujets, préparer une interview, résumer un rapport, vérifier une information et titrer un article, avec une IA gratuite, sur un téléphone Android : une configuration, quatre skills, quatre documents, deux routines et dix-sept tâches.$t$, $j$[{"numero": 1, "titre": "Configurer mon IA avec « Assistant de rédaction »", "minutes": 5}, {"numero": 2, "titre": "Installer mes 3 premières skills : vérification d'une information, préparation d'interview, synthèse de rapport", "minutes": 10}, {"numero": 3, "titre": "Copier mes documents : suivi des sujets, grille de vérification, carnet de sources", "minutes": 5}]$j$::jsonb, $j$["Un téléphone Android avec une connexion, même limitée.", "WhatsApp et l'enregistreur de votre téléphone, pour vos contacts et vos interviews.", "Un compte Google et les applications gratuites Google Sheets et Google Docs, pour ouvrir les documents.", "Une IA gratuite au choix : ChatGPT, Claude ou Gemini."]$j$::jsonb, $j$["Il n'est pas une source : une IA peut affirmer une chose fausse avec assurance. Chaque fait se vérifie auprès d'une source réelle.", "Il n'invente ni citation, ni témoignage, ni chiffre, et ne vous aide pas à en écrire.", "Il ne vous demande jamais de coller dans une IA l'identité d'une source ou un document confidentiel.", "Il ne remplace ni la relecture, ni la décision de votre rédaction en chef, ni les règles de votre profession.", "Il ne donne aucun conseil juridique. Quand un article met une personne en cause, adressez-vous à votre rédaction en chef ou à un professionnel du droit.", "Il ne crée aucune image et aucune vidéo présentée comme réelle."]$j$::jsonb, $j${"chatgpt": "OpenAI retire les GPT personnalisés le 11 décembre 2026 et les remplace par les plugins. Ce kit n'utilise donc aucun GPT personnalisé : votre configuration se colle dans un projet, et chaque skill s'ajoute dans la rubrique Plugins, onglet Skills, ou se colle au début de la conversation. Si vous avez déjà vos propres GPT, pensez à les convertir en plugins avant cette date.", "gemini": "Google remplace les Gems par les skills en novembre 2026. Vos Gems seront convertis automatiquement. Les étapes de ce kit seront mises à jour à ce moment-là, et vous serez prévenu dans l'application."}$j$::jsonb, $j$[{"mot": "Configuration", "phrase": "Un texte d'instructions que l'IA garde en mémoire, pour ne pas tout réexpliquer à chaque conversation."}, {"mot": "Projet", "phrase": "Un dossier de conversations qui partagent les mêmes instructions."}, {"mot": "Skill", "phrase": "Une consigne enregistrée que l'IA applique quand le sujet s'y prête."}, {"mot": "Consigne, ou prompt", "phrase": "Le texte que l'on écrit à l'IA pour lui demander un travail."}, {"mot": "Modèle à remplir", "phrase": "Une consigne déjà rédigée, où il ne reste qu'à remplir quelques champs."}, {"mot": "Champ", "phrase": "Une case du formulaire, à remplir avec vos propres informations."}, {"mot": "Routine", "phrase": "Une demande qui revient à jour fixe."}, {"mot": "Tâche planifiée", "phrase": "Une demande que l'IA lance seule, au jour choisi."}, {"mot": "Sujet", "phrase": "Ce dont parle un article, un son ou une vidéo."}, {"mot": "Angle", "phrase": "La façon précise d'aborder un sujet : la question à laquelle l'article répond."}, {"mot": "Source", "phrase": "La personne ou le document d'où vient une information."}, {"mot": "Recouper", "phrase": "Vérifier une information auprès d'une seconde source, indépendante de la première."}, {"mot": "Citation", "phrase": "Les mots d'une personne, repris exactement, entre guillemets."}, {"mot": "Chapô", "phrase": "Les quelques lignes placées sous le titre, qui résument l'essentiel."}, {"mot": "Intertitre", "phrase": "Un petit titre placé dans le texte, pour aider la lecture."}, {"mot": "Brève", "phrase": "Une information donnée en quelques lignes."}, {"mot": "Conférence de rédaction", "phrase": "La réunion où l'équipe choisit et répartit les sujets."}, {"mot": "Échéance", "phrase": "La date ou l'heure à laquelle le sujet doit être rendu."}, {"mot": "Rectificatif", "phrase": "Le texte publié pour corriger une erreur."}, {"mot": "Rushes", "phrase": "Tout ce qui a été filmé ou enregistré, avant le montage."}, {"mot": "Transcription", "phrase": "Le texte écrit de ce qui est dit dans un enregistrement."}, {"mot": "Sous-titres", "phrase": "Le texte qui s'affiche en bas de la vidéo et reprend ce qui est dit."}, {"mot": "Gem", "phrase": "Un assistant Gemini enregistré avec ses propres instructions, que l'on rouvre d'un geste."}, {"mot": "Plugin", "phrase": "Un ajout que l'on installe dans ChatGPT et qui contient des consignes prêtes à servir ; il remplace le GPT personnalisé."}]$j$::jsonb, '2026-10-04' from metiers m
  where m.slug = $t$journalisme$t$
  on conflict (metier_id) do update set titre = excluded.titre, presentation = excluded.presentation, etapes = excluded.etapes, prerequis = excluded.prerequis, limites = excluded.limites, a_savoir = excluded.a_savoir, mots = excluded.mots, revu_le = excluded.revu_le;

-- 7. Les ressources du kit, dans l'ordre, avec leur étape d'installation
insert into kits_metier (metier_id, ressource_id, ordre, etape_installation) select m.id, r.id, v.ordre, v.etape
  from metiers m, ressources r,
  (values
    ($t$config-journalisme-chatgpt$t$, 1, 1),
    ($t$config-journalisme-claude$t$, 2, 1),
    ($t$config-journalisme-gemini$t$, 3, 1),
    ($t$skill-verification-information$t$, 4, 2),
    ($t$skill-preparation-interview$t$, 5, 2),
    ($t$skill-synthese-de-rapport$t$, 6, 2),
    ($t$doc-suivi-sujets$t$, 7, 3),
    ($t$doc-grille-verification$t$, 8, 3),
    ($t$doc-carnet-sources$t$, 9, 3),
    ($t$skill-titres-et-chapo$t$, 10, null::integer),
    ($t$doc-plan-article$t$, 11, null::integer),
    ($t$routine-conference-redaction-lundi$t$, 12, null::integer),
    ($t$routine-bilan-publications-vendredi$t$, 13, null::integer)
  ) as v(cle, ordre, etape)
  where m.slug = $t$journalisme$t$ and r.cle = v.cle
  on conflict (metier_id, ressource_id) do update set ordre = excluded.ordre, etape_installation = excluded.etape_installation;

-- 8. Quelles ressources servent à quelles tâches
insert into ressources_taches (ressource_id, tache_id) select r.id, t.id
  from ressources r, taches t,
  (values
    ($t$config-journalisme-chatgpt$t$, $t$F01$t$),
    ($t$config-journalisme-claude$t$, $t$F01$t$),
    ($t$config-journalisme-gemini$t$, $t$F01$t$),
    ($t$config-journalisme-chatgpt$t$, $t$F03$t$),
    ($t$config-journalisme-claude$t$, $t$F03$t$),
    ($t$config-journalisme-gemini$t$, $t$F03$t$),
    ($t$skill-titres-et-chapo$t$, $t$F03$t$),
    ($t$doc-plan-article$t$, $t$F03$t$),
    ($t$config-journalisme-chatgpt$t$, $t$F04$t$),
    ($t$config-journalisme-claude$t$, $t$F04$t$),
    ($t$config-journalisme-gemini$t$, $t$F04$t$),
    ($t$skill-preparation-interview$t$, $t$F04$t$),
    ($t$config-journalisme-chatgpt$t$, $t$F05$t$),
    ($t$config-journalisme-claude$t$, $t$F05$t$),
    ($t$config-journalisme-gemini$t$, $t$F05$t$),
    ($t$doc-suivi-sujets$t$, $t$F05$t$),
    ($t$config-journalisme-chatgpt$t$, $t$F07$t$),
    ($t$config-journalisme-claude$t$, $t$F07$t$),
    ($t$config-journalisme-gemini$t$, $t$F07$t$),
    ($t$skill-verification-information$t$, $t$F07$t$),
    ($t$doc-carnet-sources$t$, $t$F07$t$),
    ($t$config-journalisme-chatgpt$t$, $t$F08$t$),
    ($t$config-journalisme-claude$t$, $t$F08$t$),
    ($t$config-journalisme-gemini$t$, $t$F08$t$),
    ($t$skill-synthese-de-rapport$t$, $t$F08$t$),
    ($t$routine-bilan-publications-vendredi$t$, $t$F08$t$),
    ($t$config-journalisme-chatgpt$t$, $t$F12$t$),
    ($t$config-journalisme-claude$t$, $t$F12$t$),
    ($t$config-journalisme-gemini$t$, $t$F12$t$),
    ($t$config-journalisme-chatgpt$t$, $t$F13$t$),
    ($t$config-journalisme-claude$t$, $t$F13$t$),
    ($t$config-journalisme-gemini$t$, $t$F13$t$),
    ($t$skill-synthese-de-rapport$t$, $t$F13$t$),
    ($t$skill-verification-information$t$, $t$F13$t$),
    ($t$doc-grille-verification$t$, $t$F13$t$),
    ($t$config-journalisme-chatgpt$t$, $t$F14$t$),
    ($t$config-journalisme-claude$t$, $t$F14$t$),
    ($t$config-journalisme-gemini$t$, $t$F14$t$),
    ($t$config-journalisme-chatgpt$t$, $t$F15$t$),
    ($t$config-journalisme-claude$t$, $t$F15$t$),
    ($t$config-journalisme-gemini$t$, $t$F15$t$),
    ($t$config-journalisme-chatgpt$t$, $t$F16$t$),
    ($t$config-journalisme-claude$t$, $t$F16$t$),
    ($t$config-journalisme-gemini$t$, $t$F16$t$),
    ($t$doc-suivi-sujets$t$, $t$F16$t$),
    ($t$routine-conference-redaction-lundi$t$, $t$F16$t$),
    ($t$config-journalisme-chatgpt$t$, $t$F25$t$),
    ($t$config-journalisme-claude$t$, $t$F25$t$),
    ($t$config-journalisme-gemini$t$, $t$F25$t$),
    ($t$doc-suivi-sujets$t$, $t$F25$t$),
    ($t$config-journalisme-chatgpt$t$, $t$F36$t$),
    ($t$config-journalisme-claude$t$, $t$F36$t$),
    ($t$config-journalisme-gemini$t$, $t$F36$t$),
    ($t$config-journalisme-chatgpt$t$, $t$F37$t$),
    ($t$config-journalisme-claude$t$, $t$F37$t$),
    ($t$config-journalisme-gemini$t$, $t$F37$t$),
    ($t$config-journalisme-chatgpt$t$, $t$F38$t$),
    ($t$config-journalisme-claude$t$, $t$F38$t$),
    ($t$config-journalisme-gemini$t$, $t$F38$t$),
    ($t$config-journalisme-chatgpt$t$, $t$F39$t$),
    ($t$config-journalisme-claude$t$, $t$F39$t$),
    ($t$config-journalisme-gemini$t$, $t$F39$t$),
    ($t$config-journalisme-chatgpt$t$, $t$F40$t$),
    ($t$config-journalisme-claude$t$, $t$F40$t$),
    ($t$config-journalisme-gemini$t$, $t$F40$t$)
  ) as v(cle, code)
  where r.cle = v.cle and t.code = v.code
  on conflict (ressource_id, tache_id) do nothing;

-- 9. Contrôle final : si quelque chose manque, tout est annulé.
do $controle$
declare
  n integer;
begin
  if not exists (select 1 from metiers where slug = $t$journalisme$t$ and description_local is not null) then
    raise exception 'Métier introuvable : journalisme';
  end if;
  -- Chaque tâche du kit, neuve ou déjà écrite, a son modèle et ses deux cas localisés.
  select count(*) into n from taches t where t.code in ($t$F01$t$, $t$F03$t$, $t$F04$t$, $t$F05$t$, $t$F07$t$, $t$F08$t$, $t$F12$t$, $t$F13$t$, $t$F14$t$, $t$F15$t$, $t$F16$t$, $t$F25$t$, $t$F36$t$, $t$F37$t$, $t$F38$t$, $t$F39$t$, $t$F40$t$)
    and exists (select 1 from modeles_prompts mp where mp.tache_id = t.id)
    and (select count(*) from exercices e where e.tache_id = t.id and e.titre_local is not null) = 2;
  if n <> 17 then
    raise exception 'Tâches complètes attendues : 17, trouvées : %', n;
  end if;
  select count(*) into n from kits_metier km join metiers m on m.id = km.metier_id where m.slug = $t$journalisme$t$;
  if n <> 13 then
    raise exception 'Ressources du kit attendues : 13, trouvées : %', n;
  end if;
  -- Toutes les tâches du métier sont dans le kit, et aucune autre.
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id join taches t on t.id = mt.tache_id
    where m.slug = $t$journalisme$t$ and t.code in ($t$F01$t$, $t$F03$t$, $t$F04$t$, $t$F05$t$, $t$F07$t$, $t$F08$t$, $t$F12$t$, $t$F13$t$, $t$F14$t$, $t$F15$t$, $t$F16$t$, $t$F25$t$, $t$F36$t$, $t$F37$t$, $t$F38$t$, $t$F39$t$, $t$F40$t$);
  if n <> 17 then
    raise exception 'Tâches du métier attendues : 17, trouvées : %', n;
  end if;
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id where m.slug = $t$journalisme$t$;
  if n <> 17 then
    raise exception 'Le métier a % tâches, le kit en couvre 17', n;
  end if;
  -- Chaque tâche du métier a au moins une ressource de ce kit.
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id
    where m.slug = $t$journalisme$t$ and not exists (
      select 1 from ressources_taches rt join kits_metier km on km.ressource_id = rt.ressource_id
      where rt.tache_id = mt.tache_id and km.metier_id = m.id);
  if n <> 0 then
    raise exception 'Tâches du métier sans ressource du kit : %', n;
  end if;
end
$controle$;

commit;
