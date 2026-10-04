-- 0034 : contenu du kit « Graphisme » (4 octobre 2026)
--
-- Ce fichier est fabriqué par un programme à partir du fichier source du kit :
-- les textes en sont copiés tels quels. Il ajoute :
--   - la description localisée du métier « Graphisme », à côté de l'ancienne ;
--   - le rattachement de 17 tâches déjà écrites par un kit précédent (F01, F03, F04, F05, F07, F09, F12, F13, F14, F15, F16, F18, F26, F34, F35, F40, F42) ;
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
update metiers set description_local = $t$Pour toute personne qui crée des visuels pour des clients : graphiste indépendant, en agence ou dans une imprimerie. Vous travaillez avec Canva, Photoshop ou votre téléphone, WhatsApp et le Mobile Money : logos, affiches, flyers, bâches, visuels pour les réseaux sociaux, devis et acomptes.$t$
  where slug = $t$graphisme$t$;

-- 2. Les tâches, leur résultat et leurs étapes
-- 3. Les cas pratiques localisés, à côté des anciens
-- 4. Les modèles à remplir, leurs champs et la note par IA
-- 5. Les ressources
insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-graphisme-chatgpt$t$, $t$configuration$t$, $t$Assistant du graphiste$t$, $t$Vous le complétez une fois avec les informations de votre activité : ensuite, l'IA connaît ce que vous créez, vos outils, vos clients et vos conditions à chaque conversation.$t$, $t$chatgpt$t$, $t$Vous êtes l'assistant d'un graphiste. Vous m'aidez à préparer mon travail et à le vendre : briefs, pistes créatives, textes d'affiche, devis, réponses aux demandes de modification, messages aux clients et aux imprimeurs.

MON STUDIO
Mon activité : [indépendant, agence, imprimerie ; ville]
Ce que je crée : [logos, affiches, flyers, bâches, visuels pour les réseaux sociaux]
Mes outils : [Canva, Photoshop, téléphone]
Mes clients : [commerçants, ONG, églises, entreprises]
Mes conditions : [acompte, modifications comprises, délai]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez mes clients.
2. Vous préparez le texte : brief, consigne, devis, message. Dites-le quand vous ne pouvez pas créer l'image vous-même.
3. N'imitez ni un logo, ni une marque, ni le style d'un artiste. Aucun visage d'une personne réelle sans son accord.
4. N'inventez ni prix, ni délai, ni promesse. Les prix sont les miens. Montants écrits ainsi : 25 000 FCFA.
5. Montrez chaque calcul.
6. Un texte d'affiche se relit : date, lieu, prix, contact. Signalez ce qui manque.
7. Face à un client difficile : ton calme, rappel de ce qui a été convenu, jamais de reproche.
8. Messages pour WhatsApp : ni titre, ni astérisque. Ne demandez ni nom complet ni numéro.$t$, $j${"chatgpt": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre activité.", "Dans ChatGPT, choisissez un projet, puis Nouveau projet. Donnez-lui le nom « Mon studio », puis Créer un projet.", "Ouvrez le menu « … » du projet, puis Paramètres du projet. Collez le texte dans le champ Instructions, puis Enregistrer."], "gratuit": "Oui. Les projets sont disponibles sur un compte gratuit, avec 5 fichiers par projet.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Autre possibilité : Paramètres, Personnalisation, Instructions personnalisées. Le texte s'applique alors à toutes vos conversations, dans la limite de 1 500 caractères.", "Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-graphisme-claude$t$, $t$configuration$t$, $t$Assistant du graphiste$t$, $t$Vous le complétez une fois avec les informations de votre activité : ensuite, l'IA connaît ce que vous créez, vos outils, vos clients et vos conditions à chaque conversation.$t$, $t$claude$t$, $t$Vous êtes l'assistant d'un graphiste. Vous m'aidez à préparer mon travail et à le vendre : briefs, pistes créatives, textes d'affiche, devis, réponses aux demandes de modification, messages aux clients et aux imprimeurs.

MON STUDIO
Mon activité : [indépendant, agence, imprimerie ; ville]
Ce que je crée : [logos, affiches, flyers, bâches, visuels pour les réseaux sociaux]
Mes outils : [Canva, Photoshop, téléphone]
Mes clients : [commerçants, ONG, églises, entreprises]
Mes conditions : [acompte, modifications comprises, délai]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez mes clients.
2. Vous préparez le texte : brief, consigne, devis, message. Dites-le quand vous ne pouvez pas créer l'image vous-même.
3. N'imitez ni un logo, ni une marque, ni le style d'un artiste. Aucun visage d'une personne réelle sans son accord.
4. N'inventez ni prix, ni délai, ni promesse. Les prix sont les miens. Montants écrits ainsi : 25 000 FCFA.
5. Montrez chaque calcul.
6. Un texte d'affiche se relit : date, lieu, prix, contact. Signalez ce qui manque.
7. Face à un client difficile : ton calme, rappel de ce qui a été convenu, jamais de reproche.
8. Messages pour WhatsApp : ni titre, ni astérisque. Ne demandez ni nom complet ni numéro.$t$, $j${"claude": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre activité.", "Dans Claude, ouvrez Projets, puis Nouveau projet. Donnez-lui le nom « Mon studio », puis Créer un projet.", "Dans le projet, ouvrez Instructions, puis Ajouter. Collez le texte, puis Enregistrer les instructions."], "gratuit": "Oui, dans la limite de 5 projets.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-graphisme-gemini$t$, $t$configuration$t$, $t$Assistant du graphiste$t$, $t$Vous le complétez une fois avec les informations de votre activité : ensuite, l'IA connaît ce que vous créez, vos outils, vos clients et vos conditions à chaque conversation.$t$, $t$gemini$t$, $t$Vous êtes l'assistant d'un graphiste. Vous m'aidez à préparer mon travail et à le vendre : briefs, pistes créatives, textes d'affiche, devis, réponses aux demandes de modification, messages aux clients et aux imprimeurs.

MON STUDIO
Mon activité : [indépendant, agence, imprimerie ; ville]
Ce que je crée : [logos, affiches, flyers, bâches, visuels pour les réseaux sociaux]
Mes outils : [Canva, Photoshop, téléphone]
Mes clients : [commerçants, ONG, églises, entreprises]
Mes conditions : [acompte, modifications comprises, délai]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez mes clients.
2. Vous préparez le texte : brief, consigne, devis, message. Dites-le quand vous ne pouvez pas créer l'image vous-même.
3. N'imitez ni un logo, ni une marque, ni le style d'un artiste. Aucun visage d'une personne réelle sans son accord.
4. N'inventez ni prix, ni délai, ni promesse. Les prix sont les miens. Montants écrits ainsi : 25 000 FCFA.
5. Montrez chaque calcul.
6. Un texte d'affiche se relit : date, lieu, prix, contact. Signalez ce qui manque.
7. Face à un client difficile : ton calme, rappel de ce qui a été convenu, jamais de reproche.
8. Messages pour WhatsApp : ni titre, ni astérisque. Ne demandez ni nom complet ni numéro.$t$, $j${"gemini": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre activité.", "Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez « Assistant du graphiste ». Collez le texte dans Instructions, puis Enregistrer."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-brief-creatif$t$, $t$skill$t$, $t$Brief créatif$t$, $t$Transforme la demande d'un client en brief créatif : objectif, public, message, textes exacts, formats, contraintes, questions à poser.$t$, null, $t$---
name: brief-creatif
description: Transforme la demande d'un client en brief créatif : objectif, public, message, textes exacts, formats, contraintes, questions à poser. À utiliser avant de commencer une création.
---

# Brief créatif

Quand l'utilisateur colle la demande d'un client, rédigez le brief qui servira de référence pendant tout le projet.

## Avant d'écrire
Il vous faut : ce que le client demande, à quoi servira le visuel, qui le verra, les textes à y mettre, les supports (statut WhatsApp, affiche, bâche), les couleurs et le logo, et la date de livraison. Ce qui manque devient une question au client.

## Ce que vous livrez
1. Le brief en 10 lignes : objectif, public, message, ton.
2. Les textes exacts à mettre sur le visuel : titre, date, lieu, prix, contact. Signalez ceux qui manquent.
3. Les formats et les fichiers à livrer.
4. Les contraintes : couleurs, logo, éléments obligatoires, ce que le client ne veut pas.
5. Les questions à poser au client avant de commencer : 5 au plus.
6. Le message à envoyer au client pour faire valider le brief.

## Règles
- Reprenez les mots du client. Un slogan que vous proposez se marque « proposition ».
- Ne devinez ni une date, ni un prix, ni un lieu : demandez-les.
- N'annoncez aucun délai que l'utilisateur n'a pas donné.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mon studio »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$brief-creatif.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-pistes-creatives$t$, $t$skill$t$, $t$Pistes créatives$t$, $t$Propose trois pistes créatives différentes à partir d'un brief : idée, composition, couleurs avec leur code, type de police, consigne d'image.$t$, null, $t$---
name: pistes-creatives
description: Propose trois pistes créatives différentes à partir d'un brief : idée, composition, couleurs avec leur code, type de police, consigne d'image. À utiliser pour démarrer une création.
---

# Pistes créatives

Quand l'utilisateur colle un brief, proposez trois directions vraiment différentes.

## Avant d'écrire
Il vous faut : le brief, le support (téléphone, impression, bâche), les couleurs et le logo à respecter, et l'outil de l'utilisateur. Si le brief ne dit pas ce qui doit se voir en premier, demandez-le.

## Ce que vous livrez
1. Trois pistes, chacune avec un nom court et son idée en une phrase.
2. Pour chaque piste : la composition, c'est-à-dire ce qui est en haut, au centre et en bas, et ce qui se voit en premier.
3. Une palette de 3 ou 4 couleurs, chacune avec son code à six caractères, et la vérification que le texte se lit sur le fond.
4. Le type de police : droite ou à empattements, grasse ou fine, manuscrite.
5. La consigne prête à coller pour créer une image d'essai, sans texte dans l'image.
6. La piste que vous recommandez pour ce support, et pourquoi.

## Règles
- Gardez les couleurs et le logo du client. N'imitez ni une marque, ni un artiste.
- Une image créée par une IA est un essai : le texte se compose dans l'outil de mise en page.
- Rappelez de vérifier les couleurs à l'écran et sur une épreuve avant d'imprimer.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mon studio »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$pistes-creatives.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-retours-client$t$, $t$skill$t$, $t$Retours du client$t$, $t$Trie les retours d'un client sur une création : ce qui est compris, ce qui est en plus, la liste des corrections et le message de réponse.$t$, null, $t$---
name: retours-client
description: Trie les retours d'un client sur une création : ce qui est compris, ce qui est en plus, la liste des corrections et le message de réponse. À utiliser quand un client demande des modifications.
---

# Retours du client

Quand l'utilisateur colle les retours d'un client, triez-les et préparez sa réponse.

## Avant d'écrire
Il vous faut : les retours du client, ce que le brief ou le devis prévoyait, le nombre de modifications comprises et celles déjà faites, et le prix d'une modification en plus si l'utilisateur en a un. Ne demandez pas le nom du client.

## Ce que vous livrez
1. La liste des demandes, une par ligne, écrites clairement.
2. Pour chacune : une correction d'erreur, une modification comprise, une modification en plus, ou une demande à préciser.
3. Le décompte : modifications comprises, déjà faites, restantes. Montrez le calcul.
4. Les demandes qui se contredisent, avec la question à poser.
5. Le message au client : ce qui sera fait, pour quand, et ce qui est en supplément.
6. La liste de travail, dans l'ordre.

## Règles
- Une erreur du graphiste, comme une date fausse ou une faute, se corrige sans compter comme une modification.
- Le prix d'un supplément est celui de l'utilisateur. S'il n'en a pas donné, demandez-le.
- Ton calme et respectueux : rappelez ce qui a été convenu, sans reproche.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mon studio »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$retours-client.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-devis-creation-graphique$t$, $t$skill$t$, $t$Devis de création graphique$t$, $t$Prépare un devis de création graphique avec les prix de l'utilisateur : prestations, total, acompte, modifications comprises, délai, fichiers livrés.$t$, null, $t$---
name: devis-creation-graphique
description: Prépare un devis de création graphique avec les prix de l'utilisateur : prestations, total, acompte, modifications comprises, délai, fichiers livrés. À utiliser pour répondre à une demande de prix.
---

# Devis de création graphique

Quand l'utilisateur décrit une commande, préparez le devis et le message qui l'accompagne.

## Avant d'écrire
Il vous faut : ce que le client demande, les prix de l'utilisateur pour chaque prestation, la part de l'acompte, le nombre de modifications comprises, le délai et les fichiers livrés. S'il manque un prix, demandez-le : n'en proposez pas.

## Ce que vous livrez
1. Les lignes du devis : prestation, détail, quantité, prix à l'unité, montant.
2. Le total, la remise s'il y en a une, l'acompte et le solde. Montrez chaque calcul.
3. Les conditions : modifications comprises, prix d'une modification en plus, délai après l'acompte, fichiers livrés, validité du devis.
4. Ce qui n'est pas compris : l'impression, l'achat d'images, les fichiers sources.
5. Le message d'accompagnement, en 5 lignes.

## Règles
- Les prix sont ceux de l'utilisateur. Vous ne citez aucun prix du marché.
- Vous ne calculez aucune taxe. Pour une facture officielle, renvoyez vers le comptable.
- Aucune fausse urgence. Montants écrits ainsi : 25 000 FCFA.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mon studio »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$devis-creation-graphique.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-suivi-projets-graphisme$t$, $t$document$t$, $t$Suivi des projets et des modifications$t$, $t$Ce tableau suit chaque projet : le client, ce qu'il faut livrer, le montant du devis, l'acompte reçu, les modifications comprises et celles déjà faites, l'état et l'échéance. Il calcule ce qu'il reste à recevoir et signale les modifications en trop.$t$, null, $t$Une ligne par projet : un numéro, le client, le projet, le montant du devis, l'acompte reçu, le nombre de modifications comprises et faites, l'état et l'échéance.
Le reste à recevoir, les modifications restantes et les jours restants se calculent seuls.
Quand les modifications faites dépassent celles qui sont comprises, la case s'affiche en rouge : c'est le moment de parler du supplément.
L'onglet « Résumé » compte les projets par état, le total à recevoir, les projets livrés non soldés et les projets en retard.
Désignez le client par un prénom ou une enseigne, sans numéro de téléphone.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$suivi-des-projets-et-des-modifications.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/11svZQ1Oxtqp5UlBUPhRfUQFjABSK6GZd9kJGfs6eQ3E/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-devis-creation-graphique$t$, $t$document$t$, $t$Devis de création graphique$t$, $t$Ce tableau prépare un devis : vous écrivez chaque prestation, la quantité et votre prix, il calcule les montants, le total, la remise, l'acompte et le solde. Vous y notez aussi vos conditions : modifications comprises, délai, fichiers livrés.$t$, null, $t$Dans l'onglet « Devis », une ligne par prestation : ce que vous créez, le détail, la quantité et le prix à l'unité. Le montant se calcule seul.
Dans l'onglet « Récapitulatif », vous écrivez la remise et la part de l'acompte : le net à payer, l'acompte et le solde se calculent seuls.
Vous y notez vos conditions : le nombre de modifications comprises, le prix d'une modification en plus, le délai et la validité du devis.
Les prix sont les vôtres : le tableau n'en propose aucun.
Ce devis n'est pas une facture officielle et ne calcule aucune taxe.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$devis-de-creation-graphique.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1Bv1xhBKwxxrfYMgH6toMfF07brtwA0OXScDGlY_5MUE/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-grille-tarifaire$t$, $t$document$t$, $t$Grille tarifaire$t$, $t$Ce tableau vous aide à fixer vos prix : vous écrivez le revenu que vous visez, vos charges et vos jours de travail, il calcule le coût d'une heure. Pour chaque prestation, il donne le prix en dessous duquel vous travaillez à perte.$t$, null, $t$Dans l'onglet « Réglages », vous écrivez le revenu mensuel que vous visez, vos charges du mois, vos jours facturables et vos heures par jour. Le coût d'une journée et d'une heure se calcule seul.
Dans l'onglet « Prestations », une ligne par prestation : le temps que vous y passez, vos frais, et le prix que vous affichez.
Le prix plancher se calcule seul : votre temps, plus vos frais. Un prix affiché sous le plancher s'affiche en rouge.
L'onglet « Résumé » compte vos prestations et celles qui sont vendues sous leur prix plancher.
Tous les chiffres sont les vôtres : le tableau ne connaît pas les prix du marché.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$grille-tarifaire.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1NoBNBp9uPYEL4jzn9ZZaqLRf59KAQ0hHseUjIhlM8F4/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-brief-creatif$t$, $t$document$t$, $t$Brief créatif$t$, $t$Ce document de deux pages au plus fixe la commande avant de créer : le client, l'objectif, le public, le message, les textes exacts, les formats à livrer, les contraintes, le délai et les conditions. Il se remplit sur le téléphone et s'envoie en PDF au client, pour validation.$t$, null, $t$Il contient : le projet, l'objectif, le public, le message, les textes exacts à mettre sur le visuel, les formats et les fichiers à livrer, les couleurs et le logo, ce que le client ne veut pas, le délai, le nombre de modifications comprises et la validation du client.
Validé par le client, il sert de référence quand une modification est demandée. Ce n'est ni un devis ni un contrat.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$brief-creatif.docx$t$, $t$https://docs.google.com/document/d/1PdT8RL5HahjLetdcuWh4QzlPngvC3bywRCju_081hpU/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-projets-graphisme-lundi$t$, $t$routine$t$, $t$Projets de création, le lundi$t$, $t$Chaque lundi, l'IA vous rappelle de faire le point de vos projets. Elle ne voit pas votre tableau : vous collez vos projets en cours, puis elle donne ce qu'il faut livrer cette semaine, ce qui est bloqué et l'ordre de travail.$t$, null, $t$Chaque lundi à 7 h 30, envoyez-moi ce message : « Bonjour. C'est lundi, faisons le point de vos projets. Collez ici, pour chaque projet : un repère pour le client, ce qu'il faut livrer, l'échéance, l'état, les modifications comprises et celles déjà faites. »

Quand j'aurai collé mes lignes :
1. Listez les projets à livrer cette semaine, jour par jour.
2. Listez les projets bloqués : ce qui manque, et le message à envoyer au client.
3. Signalez les projets où les modifications faites dépassent celles qui sont comprises.
4. Proposez l'ordre de travail d'aujourd'hui.

Règles : partez seulement de mes lignes. N'inventez ni délai, ni prix. Aucun nom complet.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mon studio »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Mon studio ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mon studio »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant du graphiste »."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-acomptes-soldes-jeudi$t$, $t$routine$t$, $t$Acomptes et soldes, le jeudi$t$, $t$Chaque jeudi, l'IA vous rappelle de faire le point des paiements. Vous collez le devis, l'acompte reçu et la date de livraison de chaque projet, puis elle calcule ce qu'il reste à recevoir et rédige les relances.$t$, null, $t$Chaque jeudi à 16 h, envoyez-moi ce message : « Bonjour. C'est jeudi, faisons le point des paiements. Collez ici, pour chaque projet : le montant du devis, l'acompte reçu, la date de livraison et l'état. Désignez chaque client par un repère. »

Quand j'aurai collé mes lignes :
1. Calculez ce qu'il reste à recevoir pour chaque projet, puis le total. Montrez chaque calcul.
2. Listez les projets commencés sans acompte.
3. Listez les projets livrés et pas encore soldés, du plus ancien au plus récent.
4. Rédigez le message de relance de chacun, court et respectueux.

Règles : utilisez seulement mes chiffres. Ni menace, ni pénalité. Aucun nom complet, aucun numéro.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mon studio »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Mon studio ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mon studio »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant du graphiste »."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

-- 6. Le kit : présentation, étapes d'installation, encadrés « À savoir », mots expliqués
insert into kits (metier_id, titre, presentation, etapes, prerequis, limites, a_savoir, mots, revu_le) select m.id, $t$Graphisme$t$, $t$Tout ce qu'il faut pour cadrer une demande, proposer des pistes, chiffrer un devis, suivre les modifications et les acomptes, avec une IA gratuite, sur un téléphone Android : une configuration, quatre skills, quatre documents, deux routines et dix-sept tâches.$t$, $j$[{"numero": 1, "titre": "Configurer mon IA avec « Assistant du graphiste »", "minutes": 5}, {"numero": 2, "titre": "Installer mes 3 premières skills : brief créatif, pistes créatives, retours du client", "minutes": 10}, {"numero": 3, "titre": "Copier mes documents : suivi des projets et des modifications, devis de création graphique, grille tarifaire", "minutes": 5}]$j$::jsonb, $j$["Un téléphone Android avec une connexion, même limitée.", "Votre outil de création : Canva, Photoshop ou un autre, sur téléphone ou sur ordinateur.", "Un compte Google et les applications gratuites Google Sheets et Google Docs, pour ouvrir les documents.", "Une IA gratuite au choix : ChatGPT, Claude ou Gemini. Pour créer une image d'essai avec l'IA : ChatGPT ou Gemini."]$j$::jsonb, $j$["Il ne remplace ni votre œil ni votre outil de création : l'IA prépare le brief, les pistes et les textes, c'est vous qui composez.", "Il n'imite ni un logo, ni une marque, ni le style d'un artiste, et n'utilise pas le visage d'une personne sans son accord.", "Il ne fixe pas vos prix : les tableaux calculent avec vos chiffres.", "Il ne donne aucun conseil fiscal ou juridique. Un devis n'est pas une facture officielle : pour une facture ou une taxe, adressez-vous à votre comptable.", "Il ne garantit pas le rendu à l'impression : demandez une épreuve à l'imprimeur avant un tirage.", "Il ne crée pas de vidéo à votre place : en octobre 2026, aucune des trois IA ne génère de vidéo avec un compte gratuit.", "Il ne vous demande jamais de coller dans une IA le nom complet ou le numéro d'un client."]$j$::jsonb, $j${"chatgpt": "OpenAI retire les GPT personnalisés le 11 décembre 2026 et les remplace par les plugins. Ce kit n'utilise donc aucun GPT personnalisé : votre configuration se colle dans un projet, et chaque skill s'ajoute dans la rubrique Plugins, onglet Skills, ou se colle au début de la conversation. Si vous avez déjà vos propres GPT, pensez à les convertir en plugins avant cette date.", "gemini": "Google remplace les Gems par les skills en novembre 2026. Vos Gems seront convertis automatiquement. Les étapes de ce kit seront mises à jour à ce moment-là, et vous serez prévenu dans l'application."}$j$::jsonb, $j$[{"mot": "Configuration", "phrase": "Un texte d'instructions que l'IA garde en mémoire, pour ne pas tout réexpliquer à chaque conversation."}, {"mot": "Projet", "phrase": "Un dossier de conversations qui partagent les mêmes instructions."}, {"mot": "Skill", "phrase": "Une consigne enregistrée que l'IA applique quand le sujet s'y prête."}, {"mot": "Consigne, ou prompt", "phrase": "Le texte que l'on écrit à l'IA pour lui demander un travail."}, {"mot": "Modèle à remplir", "phrase": "Une consigne déjà rédigée, où il ne reste qu'à remplir quelques champs."}, {"mot": "Champ", "phrase": "Une case du formulaire, à remplir avec vos propres informations."}, {"mot": "Routine", "phrase": "Une demande qui revient à jour fixe."}, {"mot": "Tâche planifiée", "phrase": "Une demande que l'IA lance seule, au jour choisi."}, {"mot": "Brief créatif", "phrase": "Le document qui fixe la commande : l'objectif, le public, les textes, les formats, le délai."}, {"mot": "Piste créative", "phrase": "Une direction possible pour une création : une idée, une composition, des couleurs."}, {"mot": "Composition", "phrase": "La façon dont les éléments sont placés dans l'image."}, {"mot": "Palette", "phrase": "Le petit groupe de couleurs utilisé dans un visuel."}, {"mot": "Code couleur", "phrase": "Les six caractères qui désignent une couleur précise, pour la retrouver dans n'importe quel outil."}, {"mot": "Police", "phrase": "Le dessin des lettres d'un texte."}, {"mot": "Format", "phrase": "La forme et la taille du visuel : vertical, carré, horizontal, A4, A3."}, {"mot": "Épreuve", "phrase": "Un tirage d'essai, pour vérifier les couleurs avant d'imprimer en nombre."}, {"mot": "Fichier source", "phrase": "Le fichier de travail, encore modifiable, à ne pas confondre avec l'image livrée."}, {"mot": "Modification", "phrase": "Un changement demandé par le client sur une création déjà présentée."}, {"mot": "Devis", "phrase": "Le document qui annonce le prix et les conditions avant de commencer."}, {"mot": "Acompte", "phrase": "La part du prix payée avant le début du travail."}, {"mot": "Solde", "phrase": "Ce qu'il reste à payer à la livraison."}, {"mot": "Prix plancher", "phrase": "Le prix en dessous duquel vous travaillez à perte."}, {"mot": "Gem", "phrase": "Un assistant Gemini enregistré avec ses propres instructions, que l'on rouvre d'un geste."}, {"mot": "Plugin", "phrase": "Un ajout que l'on installe dans ChatGPT et qui contient des consignes prêtes à servir ; il remplace le GPT personnalisé."}]$j$::jsonb, '2026-10-04' from metiers m
  where m.slug = $t$graphisme$t$
  on conflict (metier_id) do update set titre = excluded.titre, presentation = excluded.presentation, etapes = excluded.etapes, prerequis = excluded.prerequis, limites = excluded.limites, a_savoir = excluded.a_savoir, mots = excluded.mots, revu_le = excluded.revu_le;

-- 7. Les ressources du kit, dans l'ordre, avec leur étape d'installation
insert into kits_metier (metier_id, ressource_id, ordre, etape_installation) select m.id, r.id, v.ordre, v.etape
  from metiers m, ressources r,
  (values
    ($t$config-graphisme-chatgpt$t$, 1, 1),
    ($t$config-graphisme-claude$t$, 2, 1),
    ($t$config-graphisme-gemini$t$, 3, 1),
    ($t$skill-brief-creatif$t$, 4, 2),
    ($t$skill-pistes-creatives$t$, 5, 2),
    ($t$skill-retours-client$t$, 6, 2),
    ($t$doc-suivi-projets-graphisme$t$, 7, 3),
    ($t$doc-devis-creation-graphique$t$, 8, 3),
    ($t$doc-grille-tarifaire$t$, 9, 3),
    ($t$skill-devis-creation-graphique$t$, 10, null::integer),
    ($t$doc-brief-creatif$t$, 11, null::integer),
    ($t$routine-projets-graphisme-lundi$t$, 12, null::integer),
    ($t$routine-acomptes-soldes-jeudi$t$, 13, null::integer)
  ) as v(cle, ordre, etape)
  where m.slug = $t$graphisme$t$ and r.cle = v.cle
  on conflict (metier_id, ressource_id) do update set ordre = excluded.ordre, etape_installation = excluded.etape_installation;

-- 8. Quelles ressources servent à quelles tâches
insert into ressources_taches (ressource_id, tache_id) select r.id, t.id
  from ressources r, taches t,
  (values
    ($t$config-graphisme-chatgpt$t$, $t$F01$t$),
    ($t$config-graphisme-claude$t$, $t$F01$t$),
    ($t$config-graphisme-gemini$t$, $t$F01$t$),
    ($t$config-graphisme-chatgpt$t$, $t$F03$t$),
    ($t$config-graphisme-claude$t$, $t$F03$t$),
    ($t$config-graphisme-gemini$t$, $t$F03$t$),
    ($t$skill-brief-creatif$t$, $t$F03$t$),
    ($t$doc-brief-creatif$t$, $t$F03$t$),
    ($t$config-graphisme-chatgpt$t$, $t$F04$t$),
    ($t$config-graphisme-claude$t$, $t$F04$t$),
    ($t$config-graphisme-gemini$t$, $t$F04$t$),
    ($t$skill-brief-creatif$t$, $t$F04$t$),
    ($t$config-graphisme-chatgpt$t$, $t$F05$t$),
    ($t$config-graphisme-claude$t$, $t$F05$t$),
    ($t$config-graphisme-gemini$t$, $t$F05$t$),
    ($t$doc-suivi-projets-graphisme$t$, $t$F05$t$),
    ($t$config-graphisme-chatgpt$t$, $t$F07$t$),
    ($t$config-graphisme-claude$t$, $t$F07$t$),
    ($t$config-graphisme-gemini$t$, $t$F07$t$),
    ($t$skill-pistes-creatives$t$, $t$F07$t$),
    ($t$config-graphisme-chatgpt$t$, $t$F09$t$),
    ($t$config-graphisme-claude$t$, $t$F09$t$),
    ($t$config-graphisme-gemini$t$, $t$F09$t$),
    ($t$skill-pistes-creatives$t$, $t$F09$t$),
    ($t$skill-brief-creatif$t$, $t$F09$t$),
    ($t$doc-brief-creatif$t$, $t$F09$t$),
    ($t$config-graphisme-chatgpt$t$, $t$F12$t$),
    ($t$config-graphisme-claude$t$, $t$F12$t$),
    ($t$config-graphisme-gemini$t$, $t$F12$t$),
    ($t$config-graphisme-chatgpt$t$, $t$F13$t$),
    ($t$config-graphisme-claude$t$, $t$F13$t$),
    ($t$config-graphisme-gemini$t$, $t$F13$t$),
    ($t$config-graphisme-chatgpt$t$, $t$F14$t$),
    ($t$config-graphisme-claude$t$, $t$F14$t$),
    ($t$config-graphisme-gemini$t$, $t$F14$t$),
    ($t$config-graphisme-chatgpt$t$, $t$F15$t$),
    ($t$config-graphisme-claude$t$, $t$F15$t$),
    ($t$config-graphisme-gemini$t$, $t$F15$t$),
    ($t$skill-pistes-creatives$t$, $t$F15$t$),
    ($t$config-graphisme-chatgpt$t$, $t$F16$t$),
    ($t$config-graphisme-claude$t$, $t$F16$t$),
    ($t$config-graphisme-gemini$t$, $t$F16$t$),
    ($t$doc-suivi-projets-graphisme$t$, $t$F16$t$),
    ($t$routine-projets-graphisme-lundi$t$, $t$F16$t$),
    ($t$config-graphisme-chatgpt$t$, $t$F18$t$),
    ($t$config-graphisme-claude$t$, $t$F18$t$),
    ($t$config-graphisme-gemini$t$, $t$F18$t$),
    ($t$skill-devis-creation-graphique$t$, $t$F18$t$),
    ($t$doc-devis-creation-graphique$t$, $t$F18$t$),
    ($t$doc-grille-tarifaire$t$, $t$F18$t$),
    ($t$routine-acomptes-soldes-jeudi$t$, $t$F18$t$),
    ($t$config-graphisme-chatgpt$t$, $t$F26$t$),
    ($t$config-graphisme-claude$t$, $t$F26$t$),
    ($t$config-graphisme-gemini$t$, $t$F26$t$),
    ($t$skill-retours-client$t$, $t$F26$t$),
    ($t$config-graphisme-chatgpt$t$, $t$F34$t$),
    ($t$config-graphisme-claude$t$, $t$F34$t$),
    ($t$config-graphisme-gemini$t$, $t$F34$t$),
    ($t$skill-retours-client$t$, $t$F34$t$),
    ($t$doc-suivi-projets-graphisme$t$, $t$F34$t$),
    ($t$config-graphisme-chatgpt$t$, $t$F35$t$),
    ($t$config-graphisme-claude$t$, $t$F35$t$),
    ($t$config-graphisme-gemini$t$, $t$F35$t$),
    ($t$skill-pistes-creatives$t$, $t$F35$t$),
    ($t$config-graphisme-chatgpt$t$, $t$F40$t$),
    ($t$config-graphisme-claude$t$, $t$F40$t$),
    ($t$config-graphisme-gemini$t$, $t$F40$t$),
    ($t$config-graphisme-chatgpt$t$, $t$F42$t$),
    ($t$config-graphisme-claude$t$, $t$F42$t$),
    ($t$config-graphisme-gemini$t$, $t$F42$t$)
  ) as v(cle, code)
  where r.cle = v.cle and t.code = v.code
  on conflict (ressource_id, tache_id) do nothing;

-- 9. Contrôle final : si quelque chose manque, tout est annulé.
do $controle$
declare
  n integer;
begin
  if not exists (select 1 from metiers where slug = $t$graphisme$t$ and description_local is not null) then
    raise exception 'Métier introuvable : graphisme';
  end if;
  -- Chaque tâche du kit, neuve ou déjà écrite, a son modèle et ses deux cas localisés.
  select count(*) into n from taches t where t.code in ($t$F01$t$, $t$F03$t$, $t$F04$t$, $t$F05$t$, $t$F07$t$, $t$F09$t$, $t$F12$t$, $t$F13$t$, $t$F14$t$, $t$F15$t$, $t$F16$t$, $t$F18$t$, $t$F26$t$, $t$F34$t$, $t$F35$t$, $t$F40$t$, $t$F42$t$)
    and exists (select 1 from modeles_prompts mp where mp.tache_id = t.id)
    and (select count(*) from exercices e where e.tache_id = t.id and e.titre_local is not null) = 2;
  if n <> 17 then
    raise exception 'Tâches complètes attendues : 17, trouvées : %', n;
  end if;
  select count(*) into n from kits_metier km join metiers m on m.id = km.metier_id where m.slug = $t$graphisme$t$;
  if n <> 13 then
    raise exception 'Ressources du kit attendues : 13, trouvées : %', n;
  end if;
  -- Toutes les tâches du métier sont dans le kit, et aucune autre.
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id join taches t on t.id = mt.tache_id
    where m.slug = $t$graphisme$t$ and t.code in ($t$F01$t$, $t$F03$t$, $t$F04$t$, $t$F05$t$, $t$F07$t$, $t$F09$t$, $t$F12$t$, $t$F13$t$, $t$F14$t$, $t$F15$t$, $t$F16$t$, $t$F18$t$, $t$F26$t$, $t$F34$t$, $t$F35$t$, $t$F40$t$, $t$F42$t$);
  if n <> 17 then
    raise exception 'Tâches du métier attendues : 17, trouvées : %', n;
  end if;
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id where m.slug = $t$graphisme$t$;
  if n <> 17 then
    raise exception 'Le métier a % tâches, le kit en couvre 17', n;
  end if;
  -- Chaque tâche du métier a au moins une ressource de ce kit.
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id
    where m.slug = $t$graphisme$t$ and not exists (
      select 1 from ressources_taches rt join kits_metier km on km.ressource_id = rt.ressource_id
      where rt.tache_id = mt.tache_id and km.metier_id = m.id);
  if n <> 0 then
    raise exception 'Tâches du métier sans ressource du kit : %', n;
  end if;
end
$controle$;

commit;
