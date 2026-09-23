-- Termes avancés pour la page "Comprendre les IA" (Partie 2 : générer,
-- automatiser, agents, connecteurs, MCP). Le glossaire est déjà commun à
-- tous les métiers (table `glossaire`, route /api/glossaire) : on y ajoute
-- ces termes plutôt que de créer une table séparée.
--
-- Insertions protégées (par terme) pour rester rejouable sans dupliquer un
-- terme déjà présent en base : il n'existe pas de contrainte unique sur
-- `terme` aujourd'hui, donc on vérifie explicitement avant chaque insertion.
insert into glossaire (terme, definition, ordre)
select 'Prompt',
  'La demande que tu écris à une IA. Plus elle est précise (qui tu es, ce que tu veux, dans quel format), meilleure est la réponse. C''est exactement ce que contiennent les prompts prêts à l''emploi de chaque exercice.',
  499
where not exists (select 1 from glossaire where terme = 'Prompt');

insert into glossaire (terme, definition, ordre)
select 'Générer',
  'Le mode d''usage le plus simple : tu demandes un résultat, l''IA te le donne directement dans la conversation, tu n''as rien à connecter. C''est le cas de la majorité de tes premiers exercices.',
  500
where not exists (select 1 from glossaire where terme = 'Générer');

insert into glossaire (terme, definition, ordre)
select 'Assister',
  'L''IA t''accompagne pas à pas sur une tâche que tu pilotes toi-même (elle propose, corrige, relance), sans agir seule à ta place ni se connecter à un autre outil.',
  501
where not exists (select 1 from glossaire where terme = 'Assister');

insert into glossaire (terme, definition, ordre)
select 'Automatiser (ou "tâche planifiée")',
  'Demander à l''IA de refaire la même action toute seule, à intervalle régulier, sans que tu aies à le redemander à chaque fois (ex. "trie ma boîte mail chaque matin à 8h"). Ça nécessite en général de connecter l''IA à un outil (boîte mail, agenda...).',
  502
where not exists (select 1 from glossaire where terme = 'Automatiser (ou "tâche planifiée")');

insert into glossaire (terme, definition, ordre)
select 'Agent IA',
  'Une IA à qui tu confies plusieurs étapes d''un coup, qu''elle exécute elle-même de façon autonome (par exemple analyser des heures de vidéo pour retrouver un passage précis), plutôt qu''une simple question-réponse.',
  503
where not exists (select 1 from glossaire where terme = 'Agent IA');

insert into glossaire (terme, definition, ordre)
select 'Connecteur',
  'Une passerelle officielle qui permet à une IA d''accéder directement à un outil que tu utilises déjà (ta boîte Gmail, ton Google Drive, ton agenda) sans que tu aies à copier-coller quoi que ce soit. Gemini en a beaucoup nativement si tu as un compte Google ; ChatGPT et Claude en proposent aussi, parfois avec un peu plus de configuration.',
  504
where not exists (select 1 from glossaire where terme = 'Connecteur');

insert into glossaire (terme, definition, ordre)
select 'MCP (Model Context Protocol)',
  'Une technologie plus poussée qu''un simple connecteur : elle permet de brancher une IA directement à l''intérieur d''un vrai logiciel métier (un CRM comme HubSpot, un logiciel comptable comme QuickBooks, un outil de gestion de projet comme Notion ou Asana) pour qu''elle puisse agir dedans, pas seulement lire des informations. C''est une étape plus technique, à réserver une fois à l''aise avec les bases.',
  505
where not exists (select 1 from glossaire where terme = 'MCP (Model Context Protocol)');

insert into glossaire (terme, definition, ordre)
select 'Hallucination',
  'Le terme employé quand une IA invente une information fausse en la présentant avec assurance, comme si elle était vraie. C''est pour ça qu''il faut toujours vérifier un résultat important (un chiffre, une citation, un fait) avant de l''utiliser tel quel.',
  506
where not exists (select 1 from glossaire where terme = 'Hallucination');

insert into glossaire (terme, definition, ordre)
select 'Contexte (ou "fenêtre de contexte")',
  'Tout ce qu''une IA "voit" et se rappelle pendant une conversation : ton message, les documents que tu as collés, les échanges précédents. Plus le contexte est bien rempli, plus la réponse sera pertinente.',
  507
where not exists (select 1 from glossaire where terme = 'Contexte (ou "fenêtre de contexte")');

insert into glossaire (terme, definition, ordre)
select 'Fictif / Cas fictif',
  'Dans ce produit, un exemple imaginé (personnes, entreprises et données inventées) qui reproduit une vraie situation professionnelle, pour que tu puisses t''entraîner sans utiliser de vraies données sensibles.',
  508
where not exists (select 1 from glossaire where terme = 'Fictif / Cas fictif');
