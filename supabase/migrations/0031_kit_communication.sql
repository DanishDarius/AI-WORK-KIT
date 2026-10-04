-- 0031 : contenu du kit « Communication » (4 octobre 2026)
--
-- Ce fichier est fabriqué par un programme à partir du fichier source du kit :
-- les textes en sont copiés tels quels. Il ajoute :
--   - la description localisée du métier « Communication », à côté de l'ancienne ;
--   - le rattachement de 21 tâches déjà écrites par un kit précédent (F01, F02, F03, F04, F05, F07, F08, F09, F12, F13, F14, F15, F16, F26, F27, F34, F35, F38, F40, F41, F42) ;
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
update metiers set description_local = $t$Pour toute personne qui fait connaître une organisation et parle en son nom : dans une ONG, une association, une mairie, une école, une entreprise, ou à son compte. Vous travaillez avec Facebook, WhatsApp, les radios et la presse locale : annonces, communiqués, événements, rapports d'activité.$t$
  where slug = $t$communication$t$;

-- 2. Les tâches, leur résultat et leurs étapes
-- 3. Les cas pratiques localisés, à côté des anciens
-- 4. Les modèles à remplir, leurs champs et la note par IA
-- 5. Les ressources
insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-communication-chatgpt$t$, $t$configuration$t$, $t$Assistant communication$t$, $t$Vous le complétez une fois avec les informations de votre organisation : ensuite, l'IA connaît vos activités, vos publics, vos canaux, votre ton et la personne qui valide, à chaque conversation.$t$, $t$chatgpt$t$, $t$Vous êtes mon assistant communication. Vous m'aidez à annoncer, informer et rendre compte : publications, communiqués, annonces d'événement, messages aux partenaires, rapports d'activité.

MON ORGANISATION
Ma structure : [type, ville, nombre de personnes]
Mon rôle : [chargé de communication, responsable, consultant]
Ce que nous faisons : [activités, publics]
Nos canaux : [Facebook, WhatsApp, radio, presse, affichage]
Notre ton : [simple, institutionnel, chaleureux]
Qui valide : [fonction de la personne]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez le public, les partenaires et les journalistes.
2. Partez de mes faits. N'inventez ni chiffre, ni date, ni citation, ni témoignage.
3. Une citation se propose, puis la personne citée la valide. Marquez-la « à valider ».
4. Date, heure et lieu écrits de la même façon partout. Montants écrits ainsi : 25 000 FCFA.
5. Aucune fausse urgence, aucun superlatif sans preuve.
6. Face à une critique : des faits, jamais d'attaque. Rien de public sans validation.
7. Textes pour WhatsApp : ni titre, ni astérisque.
8. Laissez entre crochets les noms et les numéros : je les ajoute moi-même. Ne demandez jamais le nom complet ni le numéro d'une personne.$t$, $j${"chatgpt": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre organisation.", "Dans ChatGPT, choisissez un projet, puis Nouveau projet. Donnez-lui le nom « Ma communication », puis Créer un projet.", "Ouvrez le menu « … » du projet, puis Paramètres du projet. Collez le texte dans le champ Instructions, puis Enregistrer."], "gratuit": "Oui. Les projets sont disponibles sur un compte gratuit, avec 5 fichiers par projet.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Autre possibilité : Paramètres, Personnalisation, Instructions personnalisées. Le texte s'applique alors à toutes vos conversations, dans la limite de 1 500 caractères.", "Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-communication-claude$t$, $t$configuration$t$, $t$Assistant communication$t$, $t$Vous le complétez une fois avec les informations de votre organisation : ensuite, l'IA connaît vos activités, vos publics, vos canaux, votre ton et la personne qui valide, à chaque conversation.$t$, $t$claude$t$, $t$Vous êtes mon assistant communication. Vous m'aidez à annoncer, informer et rendre compte : publications, communiqués, annonces d'événement, messages aux partenaires, rapports d'activité.

MON ORGANISATION
Ma structure : [type, ville, nombre de personnes]
Mon rôle : [chargé de communication, responsable, consultant]
Ce que nous faisons : [activités, publics]
Nos canaux : [Facebook, WhatsApp, radio, presse, affichage]
Notre ton : [simple, institutionnel, chaleureux]
Qui valide : [fonction de la personne]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez le public, les partenaires et les journalistes.
2. Partez de mes faits. N'inventez ni chiffre, ni date, ni citation, ni témoignage.
3. Une citation se propose, puis la personne citée la valide. Marquez-la « à valider ».
4. Date, heure et lieu écrits de la même façon partout. Montants écrits ainsi : 25 000 FCFA.
5. Aucune fausse urgence, aucun superlatif sans preuve.
6. Face à une critique : des faits, jamais d'attaque. Rien de public sans validation.
7. Textes pour WhatsApp : ni titre, ni astérisque.
8. Laissez entre crochets les noms et les numéros : je les ajoute moi-même. Ne demandez jamais le nom complet ni le numéro d'une personne.$t$, $j${"claude": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre organisation.", "Dans Claude, ouvrez Projets, puis Nouveau projet. Donnez-lui le nom « Ma communication », puis Créer un projet.", "Dans le projet, ouvrez Instructions, puis Ajouter. Collez le texte, puis Enregistrer les instructions."], "gratuit": "Oui, dans la limite de 5 projets.", "telephone": "Oui. Les noms des menus ont été relevés sur ordinateur : ils peuvent différer un peu sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$config-communication-gemini$t$, $t$configuration$t$, $t$Assistant communication$t$, $t$Vous le complétez une fois avec les informations de votre organisation : ensuite, l'IA connaît vos activités, vos publics, vos canaux, votre ton et la personne qui valide, à chaque conversation.$t$, $t$gemini$t$, $t$Vous êtes mon assistant communication. Vous m'aidez à annoncer, informer et rendre compte : publications, communiqués, annonces d'événement, messages aux partenaires, rapports d'activité.

MON ORGANISATION
Ma structure : [type, ville, nombre de personnes]
Mon rôle : [chargé de communication, responsable, consultant]
Ce que nous faisons : [activités, publics]
Nos canaux : [Facebook, WhatsApp, radio, presse, affichage]
Notre ton : [simple, institutionnel, chaleureux]
Qui valide : [fonction de la personne]

VOS RÈGLES
1. Français simple, phrases courtes. Vouvoyez le public, les partenaires et les journalistes.
2. Partez de mes faits. N'inventez ni chiffre, ni date, ni citation, ni témoignage.
3. Une citation se propose, puis la personne citée la valide. Marquez-la « à valider ».
4. Date, heure et lieu écrits de la même façon partout. Montants écrits ainsi : 25 000 FCFA.
5. Aucune fausse urgence, aucun superlatif sans preuve.
6. Face à une critique : des faits, jamais d'attaque. Rien de public sans validation.
7. Textes pour WhatsApp : ni titre, ni astérisque.
8. Laissez entre crochets les noms et les numéros : je les ajoute moi-même. Ne demandez jamais le nom complet ni le numéro d'une personne.$t$, $j${"gemini": {"etapes": ["Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre organisation.", "Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez « Assistant communication ». Collez le texte dans Instructions, puis Enregistrer."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone.", "notes": ["Avec une autre IA, comme Meta AI dans WhatsApp ou Copilot : collez le texte au début de la conversation, puis posez votre question. Il faut le recoller à chaque nouvelle conversation."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-communique-de-presse$t$, $t$skill$t$, $t$Communiqué de presse$t$, $t$Rédige un communiqué de presse d'une page : titre, chapô, faits, citation à valider, informations pratiques, contact.$t$, null, $t$---
name: communique-de-presse
description: Rédige un communiqué de presse d'une page : titre, chapô, faits, citation à valider, informations pratiques, contact. À utiliser pour annoncer un événement, un résultat ou une décision.
---

# Communiqué de presse

Quand l'utilisateur donne les faits, rédigez un communiqué d'une page, prêt à faire valider.

## Avant d'écrire
Il vous faut : qui annonce, quoi, quand, où, pourquoi et pour qui ; les chiffres vérifiés et leur source ; la fonction de la personne citée et ce qu'elle veut dire ; les informations pratiques ; les médias visés. S'il manque la date, le lieu ou le fait principal, demandez-le.

## Ce que vous livrez
1. Un titre de 12 mots au plus, qui dit le fait.
2. Un chapô de 3 lignes : qui, quoi, quand, où, pourquoi.
3. Deux ou trois paragraphes, du plus important au moins important.
4. Une citation proposée, marquée « à valider par la personne citée ».
5. Les informations pratiques, trois lignes sur l'organisation, et la ligne « Contact presse : [nom, fonction, numéro] ».
6. Le message d'accompagnement pour l'envoi aux journalistes, en 4 lignes.

## Règles
- Écrivez seulement les faits donnés. Aucun chiffre inventé, aucun superlatif sans preuve.
- Une citation ne s'invente pas : vous proposez des mots, la personne citée les valide ou les change.
- Laissez entre crochets les noms et les numéros : l'utilisateur les ajoute lui-même.
- Une page au plus. Rappelez que le communiqué part après l'accord de la direction.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Ma communication »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$communique-de-presse.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-annonce-evenement$t$, $t$skill$t$, $t$Annonce d'événement$t$, $t$Prépare l'annonce d'un événement pour chaque canal : publication, statut WhatsApp, message aux partenaires, annonce radio, rappel.$t$, null, $t$---
name: annonce-evenement
description: Prépare l'annonce d'un événement pour chaque canal : publication, statut WhatsApp, message aux partenaires, annonce radio, rappel. À utiliser quand il faut faire venir du monde.
---

# Annonce d'événement

Quand l'utilisateur décrit son événement, rédigez l'annonce adaptée à chaque canal.

## Avant d'écrire
Il vous faut : le nom de l'événement, la date, l'heure, le lieu, le public attendu, l'entrée (libre, sur inscription, payante et à quel prix), le programme, le contact pour s'informer, et les canaux utilisés. S'il manque la date, l'heure ou le lieu, demandez-le.

## Ce que vous livrez
1. L'annonce principale en 5 lignes : quoi, quand, où, pour qui, comment participer.
2. La version pour un statut WhatsApp, en 3 lignes.
3. Le message aux partenaires et aux invités, au vouvoiement.
4. L'annonce radio, courte, faite pour être lue à voix haute : la date et le lieu y sont dits deux fois.
5. Le rappel à envoyer la veille.
6. Le texte à mettre sur l'affiche ou le visuel : 4 lignes au plus.

## Règles
- La date, l'heure et le lieu s'écrivent de la même façon dans toutes les versions.
- N'annoncez rien que l'utilisateur n'a pas donné : ni invité, ni cadeau, ni nombre de places.
- Aucune fausse urgence. Sur WhatsApp : texte simple, sans titre ni astérisque.
- Aucun nom complet, aucun numéro : laissez « [contact] » à compléter.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Ma communication »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$annonce-evenement.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-reponse-rumeur$t$, $t$skill$t$, $t$Réponse à une rumeur$t$, $t$Aide à répondre à une rumeur ou à une critique publique : le tri du vrai et du faux, s'il faut répondre, et le message à faire valider.$t$, null, $t$---
name: reponse-rumeur
description: Aide à répondre à une rumeur ou à une critique publique : le tri du vrai et du faux, s'il faut répondre, et le message à faire valider. À utiliser quand une information circule sur l'organisation.
---

# Réponse à une rumeur

Quand l'utilisateur décrit ce qui se dit, aidez-le à décider s'il faut répondre, puis à répondre par des faits.

## Avant d'écrire
Il vous faut : ce qui se dit, où et depuis quand ; ce qui est vrai, ce qui est faux, ce qui n'est pas encore vérifié ; ce que l'organisation peut prouver ; qui valide la réponse. S'il manque les faits vérifiés, demandez-les avant de rédiger.

## Ce que vous livrez
1. Le tri : ce qui est vrai, ce qui est faux, ce qui reste à vérifier.
2. Faut-il répondre : oui, non ou attendre, sur quel canal, et pourquoi.
3. Le message de réponse en 6 lignes au plus : le fait, la preuve, ce que fait l'organisation, où poser ses questions.
4. La version courte, pour répondre à un commentaire.
5. Les trois questions probables, avec la réponse à chacune.
6. Ce qu'il ne faut pas dire.

## Règles
- Jamais d'attaque, jamais le nom de la personne qui a lancé ou relayé la rumeur.
- Ne recopiez pas la rumeur mot pour mot : dites le fait exact.
- Ce qui est vrai se reconnaît. Ce qui n'est pas vérifié s'écrit « nous vérifions ».
- Aucune menace, aucun avis juridique. Rien ne part sans la validation de la direction.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Ma communication »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$reponse-rumeur.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$skill-rapport-activite$t$, $t$skill$t$, $t$Rapport d'activité$t$, $t$Transforme des notes et des chiffres en rapport d'activité clair : résumé, actions menées, chiffres avec leur source, difficultés, suite.$t$, null, $t$---
name: rapport-activite
description: Transforme des notes et des chiffres en rapport d'activité clair : résumé, actions menées, chiffres avec leur source, difficultés, suite. À utiliser pour un bilan mensuel ou un bilan d'événement.
---

# Rapport d'activité

Quand l'utilisateur colle ses notes, rédigez un rapport court, fait de faits et de chiffres vérifiables.

## Avant d'écrire
Il vous faut : la période, le destinataire (direction, partenaire, bailleur, public), les actions menées avec leur date, les chiffres relevés et leur source, ce qui a moins bien marché, et la suite prévue. S'il manque la période ou le destinataire, demandez-le.

## Ce que vous livrez
1. Un résumé en 5 lignes.
2. Les actions menées, une ligne par action : date, action, public, résultat.
3. Les chiffres, dans un tableau, chacun avec sa source. Montrez les totaux et les calculs.
4. Ce qui a moins bien marché, et ce qui a été appris.
5. La suite : 3 actions, avec le responsable et la date.
6. Les pièces à joindre : photos, liste de présence, coupures de presse.

## Règles
- Utilisez seulement les chiffres de l'utilisateur. Un chiffre sans source s'écrit « à confirmer ».
- Des faits, pas d'adjectifs flatteurs. Ne cachez pas ce qui a moins bien marché.
- Ne nommez aucun bénéficiaire. Rappelez qu'une photo ou un témoignage demande l'accord de la personne.$t$, $j${"chatgpt": {"etapes": ["Dans ChatGPT, ouvrez la rubrique Plugins, puis l'onglet Skills, puis Ajouter.", "Choisissez « Créer avec l'éditeur » : remplissez le nom, la description et les instructions, puis Créer. Ou choisissez « Importer depuis votre ordinateur », avec le fichier à télécharger.", "ChatGPT s'en sert seul quand le sujet s'y prête.", "Si votre compte ne propose pas ces options : copiez les instructions et collez-les comme premier message d'une conversation de votre projet « Ma communication »."], "gratuit": "Non garanti : les pages d'OpenAI ne disent pas toutes que les skills sont proposées sur un compte gratuit. Le copier-coller fonctionne dans tous les cas.", "telephone": "Le copier-coller : oui. La rubrique Plugins n'a pas encore été essayée sur un téléphone."}, "claude": {"etapes": ["Dans les paramètres de Claude, activez d'abord l'exécution de code et la création de fichiers.", "Ouvrez Personnalisation, puis Compétences, puis Ajouter, puis Créer une compétence. Dans Claude en français, une skill s'appelle une compétence.", "Remplissez le nom, la description et les instructions, puis Créer. Autre chemin : Importer une compétence, avec le fichier à télécharger.", "Claude s'en sert seul quand le sujet s'y prête, et affiche « Compétence chargée »."], "gratuit": "Oui.", "telephone": "Par le navigateur du téléphone. L'import d'un fichier depuis l'application mobile n'a pas encore été essayé."}, "gemini": {"etapes": ["Sur le site gemini.google.com, ouvrez la roue des paramètres, puis Gems, puis Nouveau Gem.", "Dans Nom, écrivez le nom de la skill. Collez les instructions dans Instructions, puis Enregistrer. Il faut un Gem par skill.", "Pour vous en servir : ouvrez le Gem, Démarrer une discussion, puis écrivez votre demande."], "gratuit": "Oui.", "telephone": "L'utilisation : oui. La création se fait sur le site gemini.google.com, ouvert dans le navigateur du téléphone, pas dans l'application. Ce parcours n'a pas encore été essayé sur un téléphone."}}$j$::jsonb, $t$rapport-activite.zip$t$, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-plan-communication$t$, $t$document$t$, $t$Plan de communication$t$, $t$Ce tableau planifie vos actions de communication : pour chaque action, la date, le public, le canal, le responsable, le budget et l'état. Il signale les actions en retard et compare le budget prévu au budget dépensé.$t$, null, $t$Une ligne par action : la date, l'action, l'objectif, le public, le canal, le responsable, le budget prévu, le budget dépensé et l'état.
Le jour de la semaine s'affiche seul à côté de la date.
Une action dont la date est passée et qui n'est pas faite s'affiche en rouge.
L'onglet « Résumé » compte les actions prévues, faites et en retard, donne le budget prévu, le budget dépensé et ce qu'il reste, et compte les actions par canal.
Le tableau ne publie rien et n'envoie rien : il vous aide à tenir votre plan.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$plan-de-communication.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1Q6ABlJJ7ElfeLeNMZnT-HC4Sk4DPirCru_8dphf49Z8/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-fichier-presse$t$, $t$document$t$, $t$Fichier presse et partenaires$t$, $t$Ce tableau garde la liste de vos contacts utiles : médias, journalistes, partenaires, institutions. Pour chacun : le sujet suivi, le canal préféré, la date du dernier contact et la prochaine action. Il signale les contacts restés sans nouvelle depuis plus de 90 jours.$t$, null, $t$Une ligne par contact : l'organisation ou le média, le type, la personne et sa fonction, le sujet suivi, le canal préféré, la date du dernier contact et la prochaine action.
Le nombre de jours depuis le dernier contact se calcule seul. Au-delà de 90 jours, la case s'affiche en orange.
L'onglet « Résumé » compte les contacts par type et les contacts à relancer.
Les numéros de téléphone restent dans votre téléphone : le tableau n'en a pas besoin.
Ne collez jamais ce fichier dans une IA : donnez seulement le type de média et le sujet.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$fichier-presse-et-partenaires.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1mVQj6P-3dG57_l71b11QMoZnKujqmdV9DP-loFMMlVs/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-suivi-retombees$t$, $t$document$t$, $t$Suivi des retombées$t$, $t$Ce tableau note ce qui se dit de votre organisation : un passage à la radio, un article, une publication, un commentaire qui revient. Pour chaque retombée : le support, le ton, et si une réponse est nécessaire. Il signale les retombées qui attendent une réponse.$t$, null, $t$Une ligne par retombée : la date, le support, le type, l'action concernée, le résumé en une ligne, le ton, et la réponse à donner.
Une retombée qui demande une réponse et n'en a pas reçu s'affiche en orange.
L'onglet « Résumé » compte les retombées par ton et par type, et celles qui attendent une réponse.
Le tableau ne mesure pas l'audience : il compte ce que vous avez relevé vous-même.
Écrivez le résumé sans le nom de la personne qui a commenté.
L'onglet « Mode d'emploi » rappelle comment remplir le tableau.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$suivi-des-retombees.xlsx$t$, $t$https://docs.google.com/spreadsheets/d/1V8uDzKTNtanCHsVjirGyIp1QOH2I5Rwurt-HOcBnAmk/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$doc-communique-presse$t$, $t$document$t$, $t$Communiqué de presse$t$, $t$Ce document d'une page donne la forme d'un communiqué de presse : le titre, le chapô, les faits, une citation validée, les informations pratiques, la présentation de l'organisation et le contact presse. Il se remplit sur le téléphone et s'envoie en PDF.$t$, null, $t$Il contient : la date et le lieu, le titre, le chapô qui dit qui, quoi, quand, où et pourquoi, deux ou trois paragraphes de faits, une citation, les informations pratiques, quelques lignes sur l'organisation et le contact presse.
Une citation y figure seulement si la personne citée l'a validée. Le communiqué part après l'accord de la direction.$t$, $j${"tous": {"etapes": ["Touchez « Faire une copie » : le document s'ouvre dans votre compte Google, déjà copié. Il vous appartient : vos chiffres ne sont vus que par vous.", "Si « Faire une copie » n'est pas proposé, touchez « Télécharger » : vous recevez un fichier à ouvrir dans Google Sheets, Google Docs, Excel ou Word."], "gratuit": "Oui : Google Sheets et Google Docs sont gratuits.", "telephone": "Oui."}}$j$::jsonb, $t$communique-de-presse.docx$t$, $t$https://docs.google.com/document/d/1th7hZU5NsWwyerWIJfosZegC3ReExF9ffzTQdPDt14g/copy$t$, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-actions-communication-lundi$t$, $t$routine$t$, $t$Actions de communication, le lundi$t$, $t$Chaque lundi, l'IA vous rappelle de préparer les actions de communication de la semaine. Elle ne voit pas votre plan : vous collez les actions prévues, puis elle dit ce qui reste à produire, ce qui est en retard et les validations à demander.$t$, null, $t$Chaque lundi à 7 h 30, envoyez-moi ce message : « Bonjour. C'est lundi, préparons les actions de communication de la semaine. Collez ici les actions de votre plan : date, action, public, canal, responsable, état. Ajoutez les événements et les annonces à venir. »

Quand j'aurai collé mes lignes :
1. Classez les actions : à faire cette semaine, en retard, à préparer pour la semaine suivante.
2. Pour chaque action de la semaine : ce qui reste à produire (texte, visuel, validation), et pour quand.
3. Rédigez le premier jet des deux annonces les plus proches.
4. Listez les validations à demander, et à qui.

Règles : partez seulement de mes lignes. N'inventez ni date, ni chiffre, ni citation. Si une information manque, demandez-la.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Ma communication »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Ma communication ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Ma communication »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant communication »."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

insert into ressources (cle, type, titre, description, outil, contenu, installation, fichier, lien_copie, version, revu_le) values ($t$routine-retombees-vendredi$t$, $t$routine$t$, $t$Revue des retombées, le vendredi$t$, $t$Chaque vendredi, l'IA vous rappelle de faire la revue des retombées. Vous collez ce qui a été dit ou publié sur votre organisation, puis elle classe, dit ce qui revient et propose les réponses à faire valider.$t$, null, $t$Chaque vendredi à 16 h, envoyez-moi ce message : « Bonjour. C'est vendredi, faisons la revue des retombées. Collez ici ce qui a été dit ou publié sur votre organisation cette semaine : la date, le support, le résumé en une ligne. Ajoutez les questions et les commentaires qui reviennent, sans le nom de leurs auteurs. »

Quand j'aurai collé mes lignes :
1. Classez chaque retombée : favorable, neutre ou défavorable.
2. Dites ce qui revient : les sujets, les questions, les reproches.
3. Listez ce qui demande une réponse, et proposez chaque réponse en 4 lignes, à faire valider.
4. Proposez une action pour la semaine prochaine.

Règles : partez seulement de mes lignes. Ne supposez pas l'audience d'un média. Ne nommez aucune personne. Une réponse publique part seulement après validation.$t$, $j${"chatgpt": {"etapes": ["Collez le texte de la routine dans une conversation : ChatGPT crée la tâche planifiée.", "Vous la retrouvez dans la rubrique Planifié, où vous pouvez la suspendre."], "gratuit": "Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Ma communication »."]}, "claude": {"etapes": ["Sur un compte gratuit, Claude ne programme pas de tâche : suivez la méthode manuelle ci-dessous.", "Sur un compte payant : collez le texte de la routine dans votre projet « Ma communication ». Claude crée la tâche dans Tâches planifiées."], "gratuit": "Non : les tâches planifiées sont réservées aux offres payantes. La méthode manuelle donne le même résultat.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre projet « Ma communication »."]}, "gemini": {"etapes": ["Collez le texte de la routine dans une conversation : Gemini confirme la programmation.", "Vous la retrouvez dans la roue des paramètres, Actions programmées, où vous pouvez la mettre en pause."], "gratuit": "Oui aujourd'hui : 10 actions actives au plus. Google peut retirer cette fonction des comptes gratuits.", "telephone": "Oui.", "notes": ["Méthode manuelle, pour tous : créez dans l'agenda de votre téléphone un rappel qui se répète chaque semaine. Au moment du rappel, collez le texte de la routine dans votre Gem « Assistant communication »."]}}$j$::jsonb, null, null, 1, '2026-10-04')
  on conflict (cle) do update set type = excluded.type, titre = excluded.titre, description = excluded.description, outil = excluded.outil, contenu = excluded.contenu, installation = excluded.installation, fichier = excluded.fichier, lien_copie = excluded.lien_copie, version = excluded.version, revu_le = excluded.revu_le;

-- 6. Le kit : présentation, étapes d'installation, encadrés « À savoir », mots expliqués
insert into kits (metier_id, titre, presentation, etapes, prerequis, limites, a_savoir, mots, revu_le) select m.id, $t$Communication$t$, $t$Tout ce qu'il faut pour planifier vos actions de communication, annoncer un événement, écrire un communiqué, suivre ce qui se dit de votre organisation et rendre compte, avec une IA gratuite, sur un téléphone Android : une configuration, quatre skills, quatre documents, deux routines et vingt et une tâches.$t$, $j$[{"numero": 1, "titre": "Configurer mon IA avec « Assistant communication »", "minutes": 5}, {"numero": 2, "titre": "Installer mes 3 premières skills : communiqué de presse, annonce d'événement, rapport d'activité", "minutes": 10}, {"numero": 3, "titre": "Copier mes documents : plan de communication, fichier presse et partenaires, suivi des retombées", "minutes": 5}]$j$::jsonb, $j$["Un téléphone Android avec une connexion, même limitée.", "Les pages et les comptes de votre organisation : page Facebook, WhatsApp, selon ce que vous utilisez.", "Un compte Google et les applications gratuites Google Sheets et Google Docs, pour ouvrir les documents.", "Une IA gratuite au choix : ChatGPT, Claude ou Gemini. Pour créer une image avec l'IA : ChatGPT ou Gemini."]$j$::jsonb, $j$["Il ne remplace pas la validation de votre direction : un communiqué, une citation ou une réponse publique part seulement après accord.", "Il n'invente ni citation, ni chiffre, ni témoignage, et ne vous aide pas à en écrire.", "Il ne donne aucun conseil juridique. Pour une rumeur grave ou une atteinte à la réputation, adressez-vous à un professionnel du droit.", "Il ne mesure pas l'audience d'une radio, d'un journal ou d'une page : il compte ce que vous relevez vous-même.", "Il ne crée pas vos vidéos à votre place : en octobre 2026, aucune des trois IA ne génère de vidéo avec un compte gratuit.", "Il ne vous demande jamais de coller dans une IA le nom complet ou le numéro d'une personne."]$j$::jsonb, $j${"chatgpt": "OpenAI retire les GPT personnalisés le 11 décembre 2026 et les remplace par les plugins. Ce kit n'utilise donc aucun GPT personnalisé : votre configuration se colle dans un projet, et chaque skill s'ajoute dans la rubrique Plugins, onglet Skills, ou se colle au début de la conversation. Si vous avez déjà vos propres GPT, pensez à les convertir en plugins avant cette date.", "gemini": "Google remplace les Gems par les skills en novembre 2026. Vos Gems seront convertis automatiquement. Les étapes de ce kit seront mises à jour à ce moment-là, et vous serez prévenu dans l'application."}$j$::jsonb, $j$[{"mot": "Configuration", "phrase": "Un texte d'instructions que l'IA garde en mémoire, pour ne pas tout réexpliquer à chaque conversation."}, {"mot": "Projet", "phrase": "Un dossier de conversations qui partagent les mêmes instructions."}, {"mot": "Skill", "phrase": "Une consigne enregistrée que l'IA applique quand le sujet s'y prête."}, {"mot": "Consigne, ou prompt", "phrase": "Le texte que l'on écrit à l'IA pour lui demander un travail."}, {"mot": "Modèle à remplir", "phrase": "Une consigne déjà rédigée, où il ne reste qu'à remplir quelques champs."}, {"mot": "Champ", "phrase": "Une case du formulaire, à remplir avec vos propres informations."}, {"mot": "Routine", "phrase": "Une demande qui revient à jour fixe."}, {"mot": "Tâche planifiée", "phrase": "Une demande que l'IA lance seule, au jour choisi."}, {"mot": "Plan de communication", "phrase": "Le tableau qui dit ce que vous annoncez, à qui, par quel canal et quel jour."}, {"mot": "Public", "phrase": "Les personnes à qui s'adresse un message : habitants, parents, clients, partenaires, journalistes."}, {"mot": "Canal", "phrase": "Le moyen par lequel le message arrive : Facebook, WhatsApp, radio, presse, affichage."}, {"mot": "Communiqué de presse", "phrase": "Un texte d'une page envoyé aux journalistes pour annoncer un fait."}, {"mot": "Chapô", "phrase": "Les quelques lignes placées sous le titre, qui résument l'essentiel."}, {"mot": "Citation", "phrase": "Les mots d'une personne, repris entre guillemets avec son accord."}, {"mot": "Contact presse", "phrase": "La personne que les journalistes peuvent joindre pour en savoir plus."}, {"mot": "Retombée", "phrase": "Ce qui est dit ou publié sur votre organisation après une action : article, passage à la radio, publication, commentaire."}, {"mot": "Ton", "phrase": "La couleur d'une retombée : favorable, neutre ou défavorable."}, {"mot": "Rumeur", "phrase": "Une information qui circule sans avoir été vérifiée."}, {"mot": "Validation", "phrase": "L'accord de la personne responsable, avant qu'un texte soit rendu public."}, {"mot": "Rapport d'activité", "phrase": "Le document qui dit ce qui a été fait sur une période, avec les chiffres et la suite prévue."}, {"mot": "Brief", "phrase": "La description courte et précise de ce que l'on attend d'un visuel ou d'une vidéo."}, {"mot": "Visuel", "phrase": "Une image préparée pour être publiée : photo retouchée, affiche, flyer."}, {"mot": "Sous-titres", "phrase": "Le texte qui s'affiche en bas de la vidéo et reprend ce qui est dit."}, {"mot": "Voix off", "phrase": "La voix qui commente la vidéo sans que l'on voie la personne qui parle."}, {"mot": "Gem", "phrase": "Un assistant Gemini enregistré avec ses propres instructions, que l'on rouvre d'un geste."}, {"mot": "Plugin", "phrase": "Un ajout que l'on installe dans ChatGPT et qui contient des consignes prêtes à servir ; il remplace le GPT personnalisé."}]$j$::jsonb, '2026-10-04' from metiers m
  where m.slug = $t$communication$t$
  on conflict (metier_id) do update set titre = excluded.titre, presentation = excluded.presentation, etapes = excluded.etapes, prerequis = excluded.prerequis, limites = excluded.limites, a_savoir = excluded.a_savoir, mots = excluded.mots, revu_le = excluded.revu_le;

-- 7. Les ressources du kit, dans l'ordre, avec leur étape d'installation
insert into kits_metier (metier_id, ressource_id, ordre, etape_installation) select m.id, r.id, v.ordre, v.etape
  from metiers m, ressources r,
  (values
    ($t$config-communication-chatgpt$t$, 1, 1),
    ($t$config-communication-claude$t$, 2, 1),
    ($t$config-communication-gemini$t$, 3, 1),
    ($t$skill-communique-de-presse$t$, 4, 2),
    ($t$skill-annonce-evenement$t$, 5, 2),
    ($t$skill-rapport-activite$t$, 6, 2),
    ($t$doc-plan-communication$t$, 7, 3),
    ($t$doc-fichier-presse$t$, 8, 3),
    ($t$doc-suivi-retombees$t$, 9, 3),
    ($t$skill-reponse-rumeur$t$, 10, null::integer),
    ($t$doc-communique-presse$t$, 11, null::integer),
    ($t$routine-actions-communication-lundi$t$, 12, null::integer),
    ($t$routine-retombees-vendredi$t$, 13, null::integer)
  ) as v(cle, ordre, etape)
  where m.slug = $t$communication$t$ and r.cle = v.cle
  on conflict (metier_id, ressource_id) do update set ordre = excluded.ordre, etape_installation = excluded.etape_installation;

-- 8. Quelles ressources servent à quelles tâches
insert into ressources_taches (ressource_id, tache_id) select r.id, t.id
  from ressources r, taches t,
  (values
    ($t$config-communication-chatgpt$t$, $t$F01$t$),
    ($t$config-communication-claude$t$, $t$F01$t$),
    ($t$config-communication-gemini$t$, $t$F01$t$),
    ($t$config-communication-chatgpt$t$, $t$F02$t$),
    ($t$config-communication-claude$t$, $t$F02$t$),
    ($t$config-communication-gemini$t$, $t$F02$t$),
    ($t$skill-annonce-evenement$t$, $t$F02$t$),
    ($t$doc-plan-communication$t$, $t$F02$t$),
    ($t$routine-actions-communication-lundi$t$, $t$F02$t$),
    ($t$config-communication-chatgpt$t$, $t$F03$t$),
    ($t$config-communication-claude$t$, $t$F03$t$),
    ($t$config-communication-gemini$t$, $t$F03$t$),
    ($t$skill-communique-de-presse$t$, $t$F03$t$),
    ($t$doc-communique-presse$t$, $t$F03$t$),
    ($t$config-communication-chatgpt$t$, $t$F04$t$),
    ($t$config-communication-claude$t$, $t$F04$t$),
    ($t$config-communication-gemini$t$, $t$F04$t$),
    ($t$config-communication-chatgpt$t$, $t$F05$t$),
    ($t$config-communication-claude$t$, $t$F05$t$),
    ($t$config-communication-gemini$t$, $t$F05$t$),
    ($t$doc-plan-communication$t$, $t$F05$t$),
    ($t$config-communication-chatgpt$t$, $t$F07$t$),
    ($t$config-communication-claude$t$, $t$F07$t$),
    ($t$config-communication-gemini$t$, $t$F07$t$),
    ($t$doc-suivi-retombees$t$, $t$F07$t$),
    ($t$routine-retombees-vendredi$t$, $t$F07$t$),
    ($t$config-communication-chatgpt$t$, $t$F08$t$),
    ($t$config-communication-claude$t$, $t$F08$t$),
    ($t$config-communication-gemini$t$, $t$F08$t$),
    ($t$skill-rapport-activite$t$, $t$F08$t$),
    ($t$doc-suivi-retombees$t$, $t$F08$t$),
    ($t$config-communication-chatgpt$t$, $t$F09$t$),
    ($t$config-communication-claude$t$, $t$F09$t$),
    ($t$config-communication-gemini$t$, $t$F09$t$),
    ($t$skill-annonce-evenement$t$, $t$F09$t$),
    ($t$config-communication-chatgpt$t$, $t$F12$t$),
    ($t$config-communication-claude$t$, $t$F12$t$),
    ($t$config-communication-gemini$t$, $t$F12$t$),
    ($t$config-communication-chatgpt$t$, $t$F13$t$),
    ($t$config-communication-claude$t$, $t$F13$t$),
    ($t$config-communication-gemini$t$, $t$F13$t$),
    ($t$skill-rapport-activite$t$, $t$F13$t$),
    ($t$config-communication-chatgpt$t$, $t$F14$t$),
    ($t$config-communication-claude$t$, $t$F14$t$),
    ($t$config-communication-gemini$t$, $t$F14$t$),
    ($t$skill-communique-de-presse$t$, $t$F14$t$),
    ($t$config-communication-chatgpt$t$, $t$F15$t$),
    ($t$config-communication-claude$t$, $t$F15$t$),
    ($t$config-communication-gemini$t$, $t$F15$t$),
    ($t$skill-rapport-activite$t$, $t$F15$t$),
    ($t$config-communication-chatgpt$t$, $t$F16$t$),
    ($t$config-communication-claude$t$, $t$F16$t$),
    ($t$config-communication-gemini$t$, $t$F16$t$),
    ($t$doc-plan-communication$t$, $t$F16$t$),
    ($t$routine-actions-communication-lundi$t$, $t$F16$t$),
    ($t$config-communication-chatgpt$t$, $t$F26$t$),
    ($t$config-communication-claude$t$, $t$F26$t$),
    ($t$config-communication-gemini$t$, $t$F26$t$),
    ($t$skill-reponse-rumeur$t$, $t$F26$t$),
    ($t$doc-suivi-retombees$t$, $t$F26$t$),
    ($t$config-communication-chatgpt$t$, $t$F27$t$),
    ($t$config-communication-claude$t$, $t$F27$t$),
    ($t$config-communication-gemini$t$, $t$F27$t$),
    ($t$doc-fichier-presse$t$, $t$F27$t$),
    ($t$config-communication-chatgpt$t$, $t$F34$t$),
    ($t$config-communication-claude$t$, $t$F34$t$),
    ($t$config-communication-gemini$t$, $t$F34$t$),
    ($t$config-communication-chatgpt$t$, $t$F35$t$),
    ($t$config-communication-claude$t$, $t$F35$t$),
    ($t$config-communication-gemini$t$, $t$F35$t$),
    ($t$config-communication-chatgpt$t$, $t$F38$t$),
    ($t$config-communication-claude$t$, $t$F38$t$),
    ($t$config-communication-gemini$t$, $t$F38$t$),
    ($t$config-communication-chatgpt$t$, $t$F40$t$),
    ($t$config-communication-claude$t$, $t$F40$t$),
    ($t$config-communication-gemini$t$, $t$F40$t$),
    ($t$config-communication-chatgpt$t$, $t$F41$t$),
    ($t$config-communication-claude$t$, $t$F41$t$),
    ($t$config-communication-gemini$t$, $t$F41$t$),
    ($t$config-communication-chatgpt$t$, $t$F42$t$),
    ($t$config-communication-claude$t$, $t$F42$t$),
    ($t$config-communication-gemini$t$, $t$F42$t$)
  ) as v(cle, code)
  where r.cle = v.cle and t.code = v.code
  on conflict (ressource_id, tache_id) do nothing;

-- 9. Contrôle final : si quelque chose manque, tout est annulé.
do $controle$
declare
  n integer;
begin
  if not exists (select 1 from metiers where slug = $t$communication$t$ and description_local is not null) then
    raise exception 'Métier introuvable : communication';
  end if;
  -- Chaque tâche du kit, neuve ou déjà écrite, a son modèle et ses deux cas localisés.
  select count(*) into n from taches t where t.code in ($t$F01$t$, $t$F02$t$, $t$F03$t$, $t$F04$t$, $t$F05$t$, $t$F07$t$, $t$F08$t$, $t$F09$t$, $t$F12$t$, $t$F13$t$, $t$F14$t$, $t$F15$t$, $t$F16$t$, $t$F26$t$, $t$F27$t$, $t$F34$t$, $t$F35$t$, $t$F38$t$, $t$F40$t$, $t$F41$t$, $t$F42$t$)
    and exists (select 1 from modeles_prompts mp where mp.tache_id = t.id)
    and (select count(*) from exercices e where e.tache_id = t.id and e.titre_local is not null) = 2;
  if n <> 21 then
    raise exception 'Tâches complètes attendues : 21, trouvées : %', n;
  end if;
  select count(*) into n from kits_metier km join metiers m on m.id = km.metier_id where m.slug = $t$communication$t$;
  if n <> 13 then
    raise exception 'Ressources du kit attendues : 13, trouvées : %', n;
  end if;
  -- Toutes les tâches du métier sont dans le kit, et aucune autre.
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id join taches t on t.id = mt.tache_id
    where m.slug = $t$communication$t$ and t.code in ($t$F01$t$, $t$F02$t$, $t$F03$t$, $t$F04$t$, $t$F05$t$, $t$F07$t$, $t$F08$t$, $t$F09$t$, $t$F12$t$, $t$F13$t$, $t$F14$t$, $t$F15$t$, $t$F16$t$, $t$F26$t$, $t$F27$t$, $t$F34$t$, $t$F35$t$, $t$F38$t$, $t$F40$t$, $t$F41$t$, $t$F42$t$);
  if n <> 21 then
    raise exception 'Tâches du métier attendues : 21, trouvées : %', n;
  end if;
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id where m.slug = $t$communication$t$;
  if n <> 21 then
    raise exception 'Le métier a % tâches, le kit en couvre 21', n;
  end if;
  -- Chaque tâche du métier a au moins une ressource de ce kit.
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id
    where m.slug = $t$communication$t$ and not exists (
      select 1 from ressources_taches rt join kits_metier km on km.ressource_id = rt.ressource_id
      where rt.tache_id = mt.tache_id and km.metier_id = m.id);
  if n <> 0 then
    raise exception 'Tâches du métier sans ressource du kit : %', n;
  end if;
end
$controle$;

commit;
