-- 0032 : contenu du kit « Ressources humaines » (4 octobre 2026)
--
-- Ce fichier est fabriqué par un programme à partir du fichier source du kit :
-- les textes en sont copiés tels quels. Il ajoute :
--   - la description localisée du métier « Ressources humaines », à côté de l'ancienne ;
--   - le résultat et les étapes de 1 tâches existantes (F29) ;
--   - 2 cas pratiques localisés, deux par tâche, écrits À CÔTÉ des anciens cas ;
--   - le rattachement de 15 tâches déjà écrites par un kit précédent (F01, F03, F04, F05, F06, F07, F08, F11, F12, F13, F14, F15, F16, F26, F30) ;
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
update metiers set description_local = $t$Pour toute personne qui recrute, accueille, forme et suit une équipe : dans une PME, une ONG, une école, un commerce, ou comme gérant qui fait tout lui-même. Vous travaillez avec Excel ou Google Sheets, WhatsApp et l'e-mail : annonces, candidatures, entretiens, absences, formations.$t$
  where slug = $t$ressources-humaines$t$;

-- 2. Les tâches, leur résultat et leurs étapes
update taches set resultat = $t$La grille avec laquelle vous lirez chaque candidature : les critères tirés du poste, le barème, le tableau à remplir et les questions d'entretien. La décision reste la vôtre.$t$, etapes = $j$["Décrire le poste : les tâches, ce qu'il faut savoir faire dès le premier jour, ce qui peut s'apprendre ensuite.", "Compter les candidatures et donner à chacune une lettre ou un numéro, écrit sur le dossier.", "Remplir le modèle et copier la consigne dans son IA.", "Lire vous-même chaque dossier avec la grille, et noter ce que vous constatez.", "Recevoir les personnes retenues, répondre à toutes les autres, et garder la grille remplie."]$j$::jsonb, precisions = $t$L'IA prépare la grille : elle ne lit pas les dossiers et ne choisit personne. Ne collez jamais dans une IA un CV, un nom, un numéro ou une photo. Un critère porte sur ce que le poste demande, jamais sur l'âge, le sexe, l'origine, la religion, la situation de famille ou la santé. Pour une règle du droit du travail, adressez-vous à l'inspection du travail.$t$
  where code = $t$F29$t$;

-- 3. Les cas pratiques localisés, à côté des anciens
update exercices set titre_local = $t$Chargée des ressources humaines dans une entreprise de logistique à Douala$t$, contexte_local = $t$Vous êtes chargée des ressources humaines chez Akwa Logistique, une entreprise de 30 personnes, à Douala. Vous recrutez un magasinier. L'annonce est parue il y a dix jours : 46 candidatures sont arrivées, par e-mail et sur papier. Le responsable du dépôt veut recevoir cinq personnes vendredi.$t$, donnees_local = $t$- Le poste : réceptionner les livraisons, ranger, préparer les commandes, tenir le stock dans un tableau Excel.
- À savoir faire dès le premier jour : lire et remplir un bon de livraison, compter et contrôler une livraison, être présent à 6 h 30.
- Peut s'apprendre ensuite : le tableau Excel, la conduite du chariot.
- Les dossiers se ressemblent peu : certains ont un CV de trois pages, d'autres une lettre écrite à la main.
- Le responsable du dépôt dit qu'il préfère « un jeune homme costaud ».$t$, travail_local = $t$Construisez la grille : les critères tirés du poste, ce que vous regardez dans chaque dossier, le barème. Dites comment vous passez de 46 dossiers à 5 entretiens, et ce que vous répondez au responsable du dépôt.$t$, prenom = $t$Ange$t$, lieu = $t$Douala, Cameroun$t$, profil = $t$Structure, 30 personnes$t$, reponse_attendue = $t$La grille reprend ce que le poste demande : lire et remplir un bon de livraison, contrôler une livraison, être présent à 6 h 30, avoir déjà rangé un stock ou préparé des commandes. Excel et le chariot s'apprennent : ils ne servent pas à écarter un dossier. Chaque dossier reçoit un numéro, puis est lu avec la même grille. Les cinq dossiers qui remplissent le mieux les critères indispensables sont reçus. « Jeune homme costaud » n'est pas un critère : ni l'âge ni le sexe ne disent si une personne sait faire le travail. Si le poste demande de porter des charges, le critère s'écrit ainsi et vaut pour tout le monde. Les 41 autres personnes reçoivent une réponse.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F29$t$);

update exercices set titre_local = $t$Gérant d'une boulangerie à Niamey$t$, contexte_local = $t$Vous gérez une boulangerie de 4 personnes, à Niamey. Vous cherchez une personne pour tenir le comptoir. Vous avez mis une affiche sur la porte et un message dans vos statuts WhatsApp : 12 personnes se sont présentées en une semaine, la plupart sans CV.$t$, donnees_local = $t$- Le poste : servir les clients de 6 h à 13 h, encaisser en espèces et par Mobile Money, tenir le comptoir propre.
- À savoir faire dès le premier jour : rendre la monnaie sans erreur, être à l'heure à 6 h, parler aux clients avec politesse.
- Peut s'apprendre ensuite : les prix, l'encaissement par Mobile Money.
- Vous avez noté dans un cahier, pour chaque personne : ce qu'elle a déjà fait et quand elle est disponible.
- Deux personnes vous sont recommandées par des proches.
- Vous voulez recevoir trois personnes, pour un essai d'une matinée.$t$, travail_local = $t$Construisez une grille simple, qui tient sur une page, pour comparer les 12 personnes sur les mêmes critères. Préparez l'essai pratique et trois questions. Dites comment répondre aux personnes que vous ne retenez pas.$t$, prenom = $t$Mahamadou$t$, lieu = $t$Niamey, Niger$t$, profil = $t$Individuelle, 4 personnes$t$, reponse_attendue = null
  where numero = 2 and tache_id in (select id from taches where code = $t$F29$t$);

-- 4. Les modèles à remplir, leurs champs et la note par IA
insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Préparation de l'examen des candidatures$t$, $t$Rôle : Vous m'aidez à préparer l'examen de candidatures. Vous préparez la grille : je lis les dossiers et je décide.

Contexte : Le poste et ses tâches : {{poste}}. Ce qu'il faut savoir faire dès le premier jour : {{indispensable}}. Ce qui peut s'apprendre ensuite : {{apprendre}}. Les candidatures reçues, sans aucun nom : {{candidatures}}. Le nombre de personnes à recevoir : {{recevoir}}.

Travail demandé :
1. La grille : 4 à 6 critères tirés du poste. Pour chacun : ce que je regarde dans le dossier, et ce que valent les notes 0, 1 et 2.
2. Les critères indispensables, à part des critères utiles.
3. Le tableau à remplir : une ligne par candidature, désignée par une lettre ou un numéro, une colonne par critère, un total.
4. Un court essai pratique et trois questions d'entretien, liés aux critères indispensables.
5. Le message aux personnes retenues et le message aux personnes non retenues, courts et respectueux.

Format : la grille, puis le tableau vide, puis l'essai, les questions et les deux messages. Texte simple.

Règle : ne classez et n'écartez aucune personne : vous n'avez pas les dossiers. Aucun critère sur l'âge, le sexe, l'origine, la religion, la situation de famille ou la santé. Si j'en propose un, dites-le et proposez le critère lié au poste. Ne demandez ni nom, ni CV, ni photo.$t$, 2, null, 1, '2026-10-04' from taches t
  where t.code = $t$F29$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$poste$t$, $t$Quel est le poste, et quelles sont ses tâches ?$t$, $t$long$t$, null::jsonb, $t$tenir le comptoir d'une boulangerie, de 6 h à 13 h : servir les clients, encaisser en espèces et par Mobile Money, tenir le comptoir propre$t$, true, 1),
    ($t$indispensable$t$, $t$Que faut-il savoir faire dès le premier jour ?$t$, $t$long$t$, null::jsonb, $t$rendre la monnaie sans erreur ; être à l'heure à 6 h ; parler aux clients avec politesse$t$, true, 2),
    ($t$apprendre$t$, $t$Qu'est-ce qui peut s'apprendre ensuite ?$t$, $t$texte$t$, null::jsonb, $t$les prix ; l'encaissement par Mobile Money$t$, false, 3),
    ($t$candidatures$t$, $t$Quelles candidatures avez-vous reçues ? Sans aucun nom$t$, $t$long$t$, null::jsonb, $t$12 personnes, la plupart sans CV ; j'ai noté pour chacune ce qu'elle a déjà fait et quand elle est disponible ; deux sont recommandées par des proches$t$, true, 4),
    ($t$recevoir$t$, $t$Combien de personnes voulez-vous recevoir ?$t$, $t$texte$t$, null::jsonb, $t$3 personnes, pour un essai d'une matinée$t$, true, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F29$t$
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
  where t.code in ($t$F29$t$)
  on conflict (modele_id, ia) do update set conseil = excluded.conseil;

-- 5. Les ressources
insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-ressources-humaines-chatgpt$t$, $t$configuration$t$, $t$Assistant RH$t$, $t$Vous le complétez une fois avec les informations de votre organisation : ensuite, l'IA connaît vos postes, vos horaires, vos règles internes et vos outils à chaque conversation.$t$, $t$chatgpt$t$, $t$Vous êtes mon assistant RH. Vous m'aidez à recruter, accueillir, former et suivre l'équipe : fiches de poste, annonces, grilles d'examen, messages aux candidats, plannings d'absence, plans de formation.

MON ORGANISATION
Ma structure : [type, ville, nombre de personnes]
Mon rôle : [gérant, chargé des ressources humaines, assistant]
Nos postes : [les principaux métiers]
Nos horaires et nos règles internes : [l'essentiel]
Mes outils : [Excel, Google Sheets, WhatsApp, e-mail]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez les candidats et les salariés.
2. Un critère porte sur le travail à faire. Jamais sur l'âge, le sexe, l'origine, la religion, la situation de famille ou la santé. Si j'en propose un, dites-le.
3. Vous préparez, je décide. Ne classez, ne retenez et n'écartez aucune personne.
4. Ne demandez ni nom, ni CV, ni photo, ni numéro. Je désigne chaque personne par une lettre ou par son poste.
5. Droit du travail, contrat, paie, sanction, rupture : vous ne décidez pas. Renvoyez-moi vers l'inspection du travail.
6. N'inventez ni salaire, ni règle, ni chiffre. S'il manque une information, demandez-la.
7. Messages respectueux, même pour un refus. Sur WhatsApp : ni titre, ni astérisque.
8. Montrez chaque calcul.$t$, $j${"chatgpt": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre organisation.", "Dans ChatGPT, choisissez un projet, puis Nouveau projet. Donnez-lui le nom « Mes ressources humaines », puis Créer un projet.", "Ouvrez le menu « … » du projet, puis Paramètres du projet. Collez le texte dans le champ Instructions, puis Enregistrer."], "gratuit": "Oui. Les projets sont disponibles sur un compte gratuit, avec 5 fichiers par projet.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Autre possibilité : Paramètres, Personnalisation, Instructions personnalisées. Le texte s'applique alors à toutes vos conversations, dans la limite de 1 500 caractères.", "Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-ressources-humaines-claude$t$, $t$configuration$t$, $t$Assistant RH$t$, $t$Vous le complétez une fois avec les informations de votre organisation : ensuite, l'IA connaît vos postes, vos horaires, vos règles internes et vos outils à chaque conversation.$t$, $t$claude$t$, $t$Vous êtes mon assistant RH. Vous m'aidez à recruter, accueillir, former et suivre l'équipe : fiches de poste, annonces, grilles d'examen, messages aux candidats, plannings d'absence, plans de formation.

MON ORGANISATION
Ma structure : [type, ville, nombre de personnes]
Mon rôle : [gérant, chargé des ressources humaines, assistant]
Nos postes : [les principaux métiers]
Nos horaires et nos règles internes : [l'essentiel]
Mes outils : [Excel, Google Sheets, WhatsApp, e-mail]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez les candidats et les salariés.
2. Un critère porte sur le travail à faire. Jamais sur l'âge, le sexe, l'origine, la religion, la situation de famille ou la santé. Si j'en propose un, dites-le.
3. Vous préparez, je décide. Ne classez, ne retenez et n'écartez aucune personne.
4. Ne demandez ni nom, ni CV, ni photo, ni numéro. Je désigne chaque personne par une lettre ou par son poste.
5. Droit du travail, contrat, paie, sanction, rupture : vous ne décidez pas. Renvoyez-moi vers l'inspection du travail.
6. N'inventez ni salaire, ni règle, ni chiffre. S'il manque une information, demandez-la.
7. Messages respectueux, même pour un refus. Sur WhatsApp : ni titre, ni astérisque.
8. Montrez chaque calcul.$t$, $j${"claude": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre organisation.", "Dans Claude, ouvrez Projets, puis Nouveau projet. Donnez-lui le nom « Mes ressources humaines », puis Créer un projet.", "Dans le projet, ouvrez Instructions, puis Ajouter. Collez le texte, puis Enregistrer les instructions."], "gratuit": "Oui, dans la limite de 5 projets.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-ressources-humaines-gemini$t$, $t$configuration$t$, $t$Assistant RH$t$, $t$Vous le complétez une fois avec les informations de votre organisation : ensuite, l'IA connaît vos postes, vos horaires, vos règles internes et vos outils à chaque conversation.$t$, $t$gemini$t$, $t$Vous êtes mon assistant RH. Vous m'aidez à recruter, accueillir, former et suivre l'équipe : fiches de poste, annonces, grilles d'examen, messages aux candidats, plannings d'absence, plans de formation.

MON ORGANISATION
Ma structure : [type, ville, nombre de personnes]
Mon rôle : [gérant, chargé des ressources humaines, assistant]
Nos postes : [les principaux métiers]
Nos horaires et nos règles internes : [l'essentiel]
Mes outils : [Excel, Google Sheets, WhatsApp, e-mail]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez les candidats et les salariés.
2. Un critère porte sur le travail à faire. Jamais sur l'âge, le sexe, l'origine, la religion, la situation de famille ou la santé. Si j'en propose un, dites-le.
3. Vous préparez, je décide. Ne classez, ne retenez et n'écartez aucune personne.
4. Ne demandez ni nom, ni CV, ni photo, ni numéro. Je désigne chaque personne par une lettre ou par son poste.
5. Droit du travail, contrat, paie, sanction, rupture : vous ne décidez pas. Renvoyez-moi vers l'inspection du travail.
6. N'inventez ni salaire, ni règle, ni chiffre. S'il manque une information, demandez-la.
7. Messages respectueux, même pour un refus. Sur WhatsApp : ni titre, ni astérisque.
8. Montrez chaque calcul.$t$, $j${"gemini": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre organisation.", "Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez « Assistant RH ». Collez le texte dans Instructions, puis Enregistrer."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-fiche-de-poste$t$, $t$skill$t$, $t$Fiche de poste$t$, $t$Rédige une fiche de poste à partir des tâches réelles : missions, ce qu'il faut savoir faire, conditions, puis l'annonce qui en découle.$t$, null, $t$---
name: fiche-de-poste
description: Rédige une fiche de poste à partir des tâches réelles : missions, ce qu'il faut savoir faire, conditions, puis l'annonce qui en découle. À utiliser avant un recrutement ou pour clarifier un poste.
---

# Fiche de poste

Quand l'utilisateur décrit un poste, rédigez la fiche, puis l'annonce.

## Avant d'écrire
Il vous faut : l'intitulé du poste, ce que la personne fera dans une journée, à qui elle rend compte, le lieu et les horaires, ce qu'il faut savoir faire dès le premier jour et ce qui peut s'apprendre. Le type de contrat et la rémunération sont donnés par l'utilisateur : sinon, laissez-les entre crochets.

## Ce que vous livrez
1. L'intitulé et la raison d'être du poste, en une phrase.
2. Quatre à six missions, chacune avec un verbe d'action et un exemple concret.
3. Ce qu'il faut savoir faire dès le premier jour, à part de ce qui s'apprendra dans le poste.
4. Les conditions : lieu, horaires, rattachement, et entre crochets ce qui n'a pas été donné.
5. L'annonce en 8 lignes, pour WhatsApp ou Facebook : le poste, les missions, ce qu'il faut savoir faire, comment postuler et jusqu'à quand.
6. Les critères sans lien avec le poste relevés dans les notes de l'utilisateur, avec le critère juste à écrire à la place.

## Règles
- Décrivez un travail, pas une personne. Aucun critère d'âge, de sexe, d'origine, de religion, de situation de famille ou de santé.
- N'inventez ni salaire, ni avantage, ni diplôme exigé.
- Contrat, période d'essai, durée du travail : vous ne décidez pas. Renvoyez vers l'inspection du travail.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mes ressources humaines »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$fiche-de-poste.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-grille-candidatures$t$, $t$skill$t$, $t$Grille des candidatures$t$, $t$Prépare la grille d'examen des candidatures : critères tirés du poste, barème de 0 à 2, tableau à remplir, questions d'entretien.$t$, null, $t$---
name: grille-candidatures
description: Prépare la grille d'examen des candidatures : critères tirés du poste, barème de 0 à 2, tableau à remplir, questions d'entretien. À utiliser avant de lire les dossiers. Ne classe aucun candidat.
---

# Grille des candidatures

Quand l'utilisateur décrit le poste, préparez la grille avec laquelle il lira lui-même chaque dossier.

## Avant d'écrire
Il vous faut : le poste et ses tâches, ce qu'il faut savoir faire dès le premier jour, ce qui peut s'apprendre, le nombre de candidatures et le nombre de personnes à recevoir. Ne demandez ni CV, ni nom, ni photo.

## Ce que vous livrez
1. Quatre à six critères tirés du poste. Pour chacun : ce qu'on regarde dans le dossier, et ce que valent les notes 0, 1 et 2.
2. Les critères indispensables, à part des critères utiles.
3. Le tableau à remplir : une ligne par candidature, désignée par une lettre ou un numéro, une colonne par critère, un total.
4. Un court essai pratique et trois questions d'entretien, liés aux critères indispensables.
5. Le message aux personnes retenues pour un entretien, et le message aux personnes non retenues.

## Règles
- Vous préparez la grille. Vous ne classez, ne retenez et n'écartez personne : l'utilisateur lit les dossiers et décide.
- Aucun critère d'âge, de sexe, d'origine, de religion, de situation de famille ou de santé. Si l'utilisateur en propose un, dites-le et proposez le critère lié au poste.
- La même grille pour toutes les candidatures. Un message de refus reste court, respectueux, sans reproche.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mes ressources humaines »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$grille-candidatures.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-accueil-nouvel-arrivant$t$, $t$skill$t$, $t$Accueil d'un nouvel arrivant$t$, $t$Prépare l'accueil d'une nouvelle personne : ce qu'il faut préparer avant, le premier jour, la première semaine, le message de bienvenue et les points de suivi.$t$, null, $t$---
name: accueil-nouvel-arrivant
description: Prépare l'accueil d'une nouvelle personne : ce qu'il faut préparer avant, le premier jour, la première semaine, le message de bienvenue et les points de suivi. À utiliser avant une arrivée.
---

# Accueil d'un nouvel arrivant

Quand l'utilisateur annonce une arrivée, préparez un accueil simple, heure par heure le premier jour.

## Avant d'écrire
Il vous faut : le poste, la date et l'heure d'arrivée, qui accueille, les outils et le matériel du poste, les règles à connaître dès le premier jour, et ce que la personne doit savoir faire seule à la fin de la première semaine. Ne demandez pas le nom de la personne.

## Ce que vous livrez
1. La liste de ce qu'il faut préparer avant l'arrivée : poste de travail, matériel, accès, documents.
2. Le programme du premier jour, heure par heure.
3. Le programme de la première semaine : un objectif par jour.
4. Le message de bienvenue à envoyer la veille, en 5 lignes.
5. Les points de suivi : fin du premier jour, fin de la première semaine, fin du premier mois, avec trois questions à chaque fois.

## Règles
- Partez de ce que l'utilisateur décrit. N'inventez ni règle interne, ni horaire, ni avantage.
- Peu de choses le premier jour : l'essentiel d'abord.
- Les documents d'embauche à remettre dépendent de la loi du pays : rappelez de vérifier auprès de l'inspection du travail.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mes ressources humaines »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$accueil-nouvel-arrivant.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-plan-de-formation$t$, $t$skill$t$, $t$Plan de formation$t$, $t$Construit un plan de formation à partir des besoins relevés : priorités, formation interne ou externe, calendrier, budget, vérification des acquis.$t$, null, $t$---
name: plan-de-formation
description: Construit un plan de formation à partir des besoins relevés : priorités, formation interne ou externe, calendrier, budget, vérification des acquis. À utiliser une fois par an ou par trimestre.
---

# Plan de formation

Quand l'utilisateur liste les besoins de son équipe, construisez un plan réaliste, classé par priorité.

## Avant d'écrire
Il vous faut : les besoins, poste par poste, sans nom ; ce que chaque besoin doit permettre de faire ; qui peut former en interne ; le budget et le temps disponibles ; les périodes chargées à éviter. Les coûts sont ceux que donne l'utilisateur.

## Ce que vous livrez
1. Les besoins classés par priorité, avec la raison en une ligne.
2. Pour chaque formation : l'objectif, qui la suit, qui la donne, la durée, la période.
3. Le calendrier du trimestre ou de l'année, qui évite les périodes chargées.
4. Le budget : la somme des coûts donnés, comparée au budget. Montrez le calcul.
5. Pour chaque formation : un moyen simple de vérifier, dans le travail, ce qui est acquis.
6. Ce qui ne tient ni dans le budget ni dans le temps, et ce qui peut attendre.

## Règles
- Utilisez seulement les coûts de l'utilisateur. N'inventez ni prix, ni organisme, ni financement.
- Un objectif se dit par ce que la personne saura faire, pas par un thème.
- Ne promettez ni diplôme ni niveau. Ne portez aucun jugement sur une personne.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Mes ressources humaines »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$plan-de-formation.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-suivi-candidatures$t$, $t$document$t$, $t$Suivi des candidatures$t$, $t$Ce tableau suit chaque candidature, de la réception à la réponse : le poste, la date, l'étape, la note de votre grille, et si une réponse a été envoyée. Il signale les candidatures restées sans réponse depuis plus de 15 jours.$t$, null, $t$Une ligne par candidature : un repère, le poste, la date de réception, la source, les critères indispensables, la note de votre grille, l'étape et la réponse envoyée.
Le repère est une lettre ou un numéro, le même que celui écrit sur le dossier : le tableau ne contient aucun nom.
Le nombre de jours sans réponse se calcule seul. Au-delà de 15 jours, la case s'affiche en orange.
L'onglet « Résumé » compte les candidatures par étape, celles qui attendent une réponse et celles qui attendent depuis plus de 15 jours.
La note vient de votre lecture du dossier : le tableau ne classe et ne choisit personne.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$suivi-des-candidatures.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1eLbL9j52pbujGw-84TJUI8PngcQ-UkGa-_2DC3GldqM/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-suivi-conges$t$, $t$document$t$, $t$Suivi des congés et des absences$t$, $t$Ce tableau note les congés et les absences de l'équipe : qui, du quel jour au quel jour, de quel type. Il compte les jours, dit qui est absent aujourd'hui et calcule ce qu'il reste à chacun sur le nombre de jours que vous avez fixé.$t$, null, $t$Dans l'onglet « Soldes », une ligne par personne : son prénom ou son matricule, et le nombre de jours de congé de l'année que vous avez fixé.
Dans l'onglet « Absences », une ligne par congé ou par absence : la personne, le type, le premier et le dernier jour, et l'état de la demande.
Le nombre de jours se calcule seul, du premier au dernier jour compris. Les jours de congé accordés ou pris se retirent du solde de la personne.
L'onglet « Résumé » compte les personnes absentes aujourd'hui, les absences des 30 prochains jours et les demandes en attente.
Le tableau compte les jours du calendrier. La règle de décompte des congés dépend de votre pays : vérifiez-la auprès de l'inspection du travail.
N'écrivez jamais la nature d'une maladie. L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$suivi-des-conges-et-des-absences.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/12OoUuHq2gTseqKs6hharz-a5MWXYIK1UYIavwKypLPY/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-suivi-formations$t$, $t$document$t$, $t$Suivi des formations$t$, $t$Ce tableau suit les formations de l'équipe : qui, quelle formation, pour quel objectif, à quelles dates, pour combien d'heures et à quel coût. Il additionne les heures et les coûts, et signale les formations terminées dont les acquis n'ont pas été vérifiés.$t$, null, $t$Une ligne par formation et par personne : le prénom ou le poste, la formation, l'objectif, le formateur, les dates, la durée en heures, le coût et l'état.
Quand la formation est terminée, vous notez si les acquis ont été vérifiés. Une formation terminée sans vérification s'affiche en orange.
L'onglet « Résumé » compte les formations prévues, en cours et terminées, additionne les heures et les coûts, et compte les vérifications à faire.
Les coûts sont ceux que vous écrivez : le tableau n'en invente pas.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$suivi-des-formations.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1TY4KWZFFqqn0Zb9fCJM5q4JWMvoF-Kef1YDIXQEIojg/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-fiche-de-poste$t$, $t$document$t$, $t$Fiche de poste$t$, $t$Ce document de deux pages au plus décrit un poste : sa raison d'être, ses missions, ce qu'il faut savoir faire dès le premier jour, ce qui s'apprendra ensuite, les moyens et les conditions. Il se remplit sur le téléphone et s'envoie en PDF.$t$, null, $t$Il contient : l'intitulé du poste, à qui la personne rend compte, le lieu et les horaires, la raison d'être du poste, les missions, ce qu'il faut savoir faire, les moyens mis à disposition et les conditions.
Il décrit un travail, pas une personne : aucun critère d'âge, de sexe, d'origine, de religion, de situation de famille ou de santé. Ce n'est pas un contrat de travail.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$fiche-de-poste.docx$t$, $t$https://docs.google.com/document/d/19lTZ9OrmBS1yhvQ9z5csOI6kdtQM0L_WYUq2L4PVQnI/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-candidatures-lundi$t$, $t$routine$t$, $t$Point des recrutements, le lundi$t$, $t$Chaque lundi, l'IA vous rappelle de faire le point des recrutements. Elle ne voit pas vos dossiers : vous collez où en est chaque poste, sans aucun nom, puis elle donne la prochaine étape, les réponses en attente et les entretiens à préparer.$t$, null, $t$Chaque lundi à 7 h 30, envoyez-moi ce message : « Bonjour. C'est lundi, faisons le point des recrutements. Collez ici, pour chaque poste ouvert : le poste, le nombre de candidatures à chaque étape, et les candidatures restées sans réponse. Désignez chaque candidature par son repère, sans aucun nom. »

Quand j'aurai collé mes lignes :
1. Dites, pour chaque poste, où en est le recrutement et quelle est la prochaine étape.
2. Listez les candidatures qui attendent une réponse depuis le plus longtemps.
3. Listez les entretiens à organiser cette semaine, avec ce qu'il faut préparer.
4. Rédigez le message aux personnes non retenues, court et respectueux.

Règles : partez seulement de mes lignes. Ne classez et n'écartez aucune personne. Aucun nom, aucun critère sans lien avec le poste.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mes ressources humaines »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Mes ressources humaines ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mes ressources humaines »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant RH »."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-point-rh-vendredi$t$, $t$routine$t$, $t$Point RH, le vendredi$t$, $t$Chaque vendredi, l'IA vous rappelle de préparer la semaine suivante. Vous collez les absences, les formations et les arrivées prévues, puis elle dit qui est absent jour par jour, ce qu'il faut préparer et les trois actions du lundi.$t$, null, $t$Chaque vendredi à 16 h, envoyez-moi ce message : « Bonjour. C'est vendredi, préparons la semaine prochaine. Collez ici : les congés et les absences prévus, les formations en cours, les arrivées et les départs. Désignez chaque personne par son prénom ou son poste, sans la raison d'une absence pour maladie. »

Quand j'aurai collé mes lignes :
1. Dites qui est absent la semaine prochaine, jour par jour, et quels postes restent sans remplaçant.
2. Listez les formations à préparer, et celles dont il faut vérifier les acquis.
3. Listez ce qu'il faut préparer avant chaque arrivée.
4. Donnez les trois actions à faire lundi.

Règles : partez seulement de mes lignes. Ne commentez jamais la raison d'une absence. Pour une règle de congé ou de contrat, renvoyez-moi vers l'inspection du travail.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mes ressources humaines »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Mes ressources humaines ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Mes ressources humaines »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant RH »."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

-- 6. Le kit : présentation, étapes d'installation, encadrés « À savoir », mots expliqués
insert into kits (metier_id, titre, presentation, etapes, prerequis, limites, a_savoir, mots, revu_le) select m.id, $t$Ressources humaines$t$, $t$Tout ce qu'il faut pour écrire une fiche de poste, préparer l'examen des candidatures, accueillir une nouvelle personne, suivre les absences et organiser les formations, avec une IA gratuite, sur un téléphone Android : une configuration, quatre skills, quatre documents, deux routines et seize tâches.$t$, $j$[{"numero": 1, "titre": "Configurer mon IA avec « Assistant RH »", "minutes": 5}, {"numero": 2, "titre": "Installer mes 3 premières skills : fiche de poste, grille des candidatures, accueil d'un nouvel arrivant", "minutes": 10}, {"numero": 3, "titre": "Copier mes documents : suivi des candidatures, suivi des congés et des absences, suivi des formations", "minutes": 5}]$j$::jsonb, $j$["Un téléphone Android avec une connexion, même limitée.", "WhatsApp et une adresse e-mail, pour recevoir les candidatures et répondre.", "Un compte Google et les applications gratuites Google Sheets et Google Docs, pour ouvrir les documents.", "Une IA gratuite au choix : ChatGPT, Claude ou Gemini."]$j$::jsonb, $j$["Il ne choisit personne à votre place : l'IA prépare la grille et les questions, vous lisez les dossiers et vous décidez.", "Il ne donne aucun conseil juridique. Contrat, paie, congés légaux, sanction, rupture : adressez-vous à l'inspection du travail ou à un professionnel du droit.", "Il ne vous demande jamais de coller dans une IA un CV, un nom, un numéro, une photo ou une information de santé.", "Il n'utilise aucun critère sans lien avec le poste : âge, sexe, origine, religion, situation de famille, santé.", "Il ne calcule ni la paie ni les cotisations.", "Il ne promet aucun résultat chiffré."]$j$::jsonb, $j${"chatgpt": "OpenAI retire les GPT personnalisés le 11 décembre 2026 et les remplace par les plugins. Ce kit n'utilise donc aucun GPT personnalisé : votre configuration se colle dans un projet, et chaque skill s'ajoute dans la rubrique Plugins, onglet Skills, ou se colle au début de la conversation. Si vous avez déjà vos propres GPT, pensez à les convertir en plugins avant cette date.", "gemini": "Google remplace les Gems par les skills en novembre 2026. Vos Gems seront convertis automatiquement. Les étapes de ce kit seront mises à jour à ce moment-là, et vous serez prévenu dans l'application."}$j$::jsonb, $j$[{"mot": "Configuration", "phrase": "Un texte d'instructions que l'IA garde en mémoire, pour ne pas tout réexpliquer à chaque conversation."}, {"mot": "Projet", "phrase": "Un dossier de conversations qui partagent les mêmes instructions."}, {"mot": "Skill", "phrase": "Une consigne enregistrée que l'IA applique quand le sujet s'y prête."}, {"mot": "Consigne, ou prompt", "phrase": "Le texte que l'on écrit à l'IA pour lui demander un travail."}, {"mot": "Modèle à remplir", "phrase": "Une consigne déjà rédigée, où il ne reste qu'à remplir quelques champs."}, {"mot": "Champ", "phrase": "Une case du formulaire, à remplir avec vos propres informations."}, {"mot": "Routine", "phrase": "Une demande qui revient à jour fixe."}, {"mot": "Tâche planifiée", "phrase": "Une demande que l'IA lance seule, au jour choisi."}, {"mot": "Fiche de poste", "phrase": "Le document qui décrit un poste : ses missions, ce qu'il faut savoir faire, les conditions."}, {"mot": "Candidature", "phrase": "La demande d'une personne qui veut le poste : un CV, une lettre, ou une simple visite."}, {"mot": "Critère", "phrase": "Ce que l'on vérifie chez chaque candidat, parce que le poste le demande."}, {"mot": "Grille d'examen", "phrase": "Le tableau des critères, le même pour toutes les candidatures."}, {"mot": "Barème", "phrase": "Ce que vaut chaque note : 0, 1 ou 2."}, {"mot": "Repère", "phrase": "La lettre ou le numéro qui désigne une candidature, à la place du nom."}, {"mot": "Essai pratique", "phrase": "Un court exercice tiré du vrai travail, pour voir ce que la personne sait faire."}, {"mot": "Accueil", "phrase": "Tout ce qui est préparé pour les premiers jours d'une nouvelle personne."}, {"mot": "Plan de formation", "phrase": "La liste des formations prévues, avec les personnes, les dates et le budget."}, {"mot": "Acquis", "phrase": "Ce que la personne sait faire seule après une formation."}, {"mot": "Solde de congés", "phrase": "Le nombre de jours de congé qu'il reste à une personne."}, {"mot": "Gem", "phrase": "Un assistant Gemini enregistré avec ses propres instructions, que l'on rouvre d'un geste."}, {"mot": "Plugin", "phrase": "Un ajout que l'on installe dans ChatGPT et qui contient des consignes prêtes à servir ; il remplace le GPT personnalisé."}]$j$::jsonb, '2026-10-04' from metiers m
  where m.slug = $t$ressources-humaines$t$
  on conflict (metier_id) do update set titre = excluded.titre, presentation = excluded.presentation, etapes = excluded.etapes, prerequis = excluded.prerequis, limites = excluded.limites, a_savoir = excluded.a_savoir, mots = excluded.mots, revu_le = excluded.revu_le;

-- 7. Les ressources du kit, dans l'ordre, avec leur étape d'installation
insert into kits_metier (metier_id, ressource_id, ordre, etape_installation) select m.id, r.id, v.ordre, v.etape
  from metiers m, ressources r,
  (values
    ($t$config-ressources-humaines-chatgpt$t$, 1, 1),
    ($t$config-ressources-humaines-claude$t$, 2, 1),
    ($t$config-ressources-humaines-gemini$t$, 3, 1),
    ($t$skill-fiche-de-poste$t$, 4, 2),
    ($t$skill-grille-candidatures$t$, 5, 2),
    ($t$skill-accueil-nouvel-arrivant$t$, 6, 2),
    ($t$doc-suivi-candidatures$t$, 7, 3),
    ($t$doc-suivi-conges$t$, 8, 3),
    ($t$doc-suivi-formations$t$, 9, 3),
    ($t$skill-plan-de-formation$t$, 10, null::integer),
    ($t$doc-fiche-de-poste$t$, 11, null::integer),
    ($t$routine-candidatures-lundi$t$, 12, null::integer),
    ($t$routine-point-rh-vendredi$t$, 13, null::integer)
  ) as v(cle, ordre, etape)
  where m.slug = $t$ressources-humaines$t$ and r.cle = v.cle
  on conflict (metier_id, ressource_id) do update set ordre = excluded.ordre, etape_installation = excluded.etape_installation;

-- 8. Quelles ressources servent à quelles tâches
insert into ressources_taches (ressource_id, tache_id) select r.id, t.id
  from ressources r, taches t,
  (values
    ($t$skill-grille-candidatures$t$, $t$F29$t$),
    ($t$skill-fiche-de-poste$t$, $t$F29$t$),
    ($t$doc-suivi-candidatures$t$, $t$F29$t$),
    ($t$doc-fiche-de-poste$t$, $t$F29$t$),
    ($t$routine-candidatures-lundi$t$, $t$F29$t$),
    ($t$config-ressources-humaines-chatgpt$t$, $t$F29$t$),
    ($t$config-ressources-humaines-claude$t$, $t$F29$t$),
    ($t$config-ressources-humaines-gemini$t$, $t$F29$t$),
    ($t$config-ressources-humaines-chatgpt$t$, $t$F01$t$),
    ($t$config-ressources-humaines-claude$t$, $t$F01$t$),
    ($t$config-ressources-humaines-gemini$t$, $t$F01$t$),
    ($t$config-ressources-humaines-chatgpt$t$, $t$F03$t$),
    ($t$config-ressources-humaines-claude$t$, $t$F03$t$),
    ($t$config-ressources-humaines-gemini$t$, $t$F03$t$),
    ($t$skill-fiche-de-poste$t$, $t$F03$t$),
    ($t$doc-fiche-de-poste$t$, $t$F03$t$),
    ($t$config-ressources-humaines-chatgpt$t$, $t$F04$t$),
    ($t$config-ressources-humaines-claude$t$, $t$F04$t$),
    ($t$config-ressources-humaines-gemini$t$, $t$F04$t$),
    ($t$config-ressources-humaines-chatgpt$t$, $t$F05$t$),
    ($t$config-ressources-humaines-claude$t$, $t$F05$t$),
    ($t$config-ressources-humaines-gemini$t$, $t$F05$t$),
    ($t$doc-suivi-candidatures$t$, $t$F05$t$),
    ($t$config-ressources-humaines-chatgpt$t$, $t$F06$t$),
    ($t$config-ressources-humaines-claude$t$, $t$F06$t$),
    ($t$config-ressources-humaines-gemini$t$, $t$F06$t$),
    ($t$config-ressources-humaines-chatgpt$t$, $t$F07$t$),
    ($t$config-ressources-humaines-claude$t$, $t$F07$t$),
    ($t$config-ressources-humaines-gemini$t$, $t$F07$t$),
    ($t$config-ressources-humaines-chatgpt$t$, $t$F08$t$),
    ($t$config-ressources-humaines-claude$t$, $t$F08$t$),
    ($t$config-ressources-humaines-gemini$t$, $t$F08$t$),
    ($t$doc-suivi-conges$t$, $t$F08$t$),
    ($t$doc-suivi-formations$t$, $t$F08$t$),
    ($t$routine-point-rh-vendredi$t$, $t$F08$t$),
    ($t$config-ressources-humaines-chatgpt$t$, $t$F11$t$),
    ($t$config-ressources-humaines-claude$t$, $t$F11$t$),
    ($t$config-ressources-humaines-gemini$t$, $t$F11$t$),
    ($t$doc-suivi-candidatures$t$, $t$F11$t$),
    ($t$config-ressources-humaines-chatgpt$t$, $t$F12$t$),
    ($t$config-ressources-humaines-claude$t$, $t$F12$t$),
    ($t$config-ressources-humaines-gemini$t$, $t$F12$t$),
    ($t$config-ressources-humaines-chatgpt$t$, $t$F13$t$),
    ($t$config-ressources-humaines-claude$t$, $t$F13$t$),
    ($t$config-ressources-humaines-gemini$t$, $t$F13$t$),
    ($t$config-ressources-humaines-chatgpt$t$, $t$F14$t$),
    ($t$config-ressources-humaines-claude$t$, $t$F14$t$),
    ($t$config-ressources-humaines-gemini$t$, $t$F14$t$),
    ($t$config-ressources-humaines-chatgpt$t$, $t$F15$t$),
    ($t$config-ressources-humaines-claude$t$, $t$F15$t$),
    ($t$config-ressources-humaines-gemini$t$, $t$F15$t$),
    ($t$skill-plan-de-formation$t$, $t$F15$t$),
    ($t$config-ressources-humaines-chatgpt$t$, $t$F16$t$),
    ($t$config-ressources-humaines-claude$t$, $t$F16$t$),
    ($t$config-ressources-humaines-gemini$t$, $t$F16$t$),
    ($t$skill-accueil-nouvel-arrivant$t$, $t$F16$t$),
    ($t$routine-point-rh-vendredi$t$, $t$F16$t$),
    ($t$config-ressources-humaines-chatgpt$t$, $t$F26$t$),
    ($t$config-ressources-humaines-claude$t$, $t$F26$t$),
    ($t$config-ressources-humaines-gemini$t$, $t$F26$t$),
    ($t$config-ressources-humaines-chatgpt$t$, $t$F30$t$),
    ($t$config-ressources-humaines-claude$t$, $t$F30$t$),
    ($t$config-ressources-humaines-gemini$t$, $t$F30$t$),
    ($t$skill-plan-de-formation$t$, $t$F30$t$),
    ($t$skill-accueil-nouvel-arrivant$t$, $t$F30$t$),
    ($t$doc-suivi-formations$t$, $t$F30$t$)
  ) as v(cle, code)
  where r.cle = v.cle and t.code = v.code
  on conflict (ressource_id, tache_id) do nothing;

-- 9. Contrôle final : si quelque chose manque, tout est annulé.
do $controle$
declare
  n integer;
begin
  if not exists (select 1 from metiers where slug = $t$ressources-humaines$t$ and description_local is not null) then
    raise exception 'Métier introuvable : ressources-humaines';
  end if;
  select count(*) into n from (values
    ($t$F29$t$, $t$Préparation de l'examen des candidatures$t$)
  ) as v(code, titre) join taches t on t.code = v.code and t.titre = v.titre and t.resultat is not null;
  if n <> 1 then
    raise exception 'Tâches attendues : 1, trouvées avec le bon titre : %', n;
  end if;
  select count(*) into n from exercices e join taches t on t.id = e.tache_id
    where t.code in ($t$F29$t$) and e.titre_local is not null and e.prenom is not null;
  if n <> 2 then
    raise exception 'Cas localisés attendus : 2, trouvés : %', n;
  end if;
  -- Chaque tâche du kit, neuve ou déjà écrite, a son modèle et ses deux cas localisés.
  select count(*) into n from taches t where t.code in ($t$F29$t$, $t$F01$t$, $t$F03$t$, $t$F04$t$, $t$F05$t$, $t$F06$t$, $t$F07$t$, $t$F08$t$, $t$F11$t$, $t$F12$t$, $t$F13$t$, $t$F14$t$, $t$F15$t$, $t$F16$t$, $t$F26$t$, $t$F30$t$)
    and exists (select 1 from modeles_prompts mp where mp.tache_id = t.id)
    and (select count(*) from exercices e where e.tache_id = t.id and e.titre_local is not null) = 2;
  if n <> 16 then
    raise exception 'Tâches complètes attendues : 16, trouvées : %', n;
  end if;
  select count(*) into n from kits_metier km join metiers m on m.id = km.metier_id where m.slug = $t$ressources-humaines$t$;
  if n <> 13 then
    raise exception 'Ressources du kit attendues : 13, trouvées : %', n;
  end if;
  -- Toutes les tâches du métier sont dans le kit, et aucune autre.
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id join taches t on t.id = mt.tache_id
    where m.slug = $t$ressources-humaines$t$ and t.code in ($t$F29$t$, $t$F01$t$, $t$F03$t$, $t$F04$t$, $t$F05$t$, $t$F06$t$, $t$F07$t$, $t$F08$t$, $t$F11$t$, $t$F12$t$, $t$F13$t$, $t$F14$t$, $t$F15$t$, $t$F16$t$, $t$F26$t$, $t$F30$t$);
  if n <> 16 then
    raise exception 'Tâches du métier attendues : 16, trouvées : %', n;
  end if;
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id where m.slug = $t$ressources-humaines$t$;
  if n <> 16 then
    raise exception 'Le métier a % tâches, le kit en couvre 16', n;
  end if;
  -- Chaque tâche du métier a au moins une ressource de ce kit.
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id
    where m.slug = $t$ressources-humaines$t$ and not exists (
      select 1 from ressources_taches rt join kits_metier km on km.ressource_id = rt.ressource_id
      where rt.tache_id = mt.tache_id and km.metier_id = m.id);
  if n <> 0 then
    raise exception 'Tâches du métier sans ressource du kit : %', n;
  end if;
end
$controle$;

commit;
