-- 0041 : les actualités des IA passent du code à la base (5 octobre 2026,
-- plan produit, chantier 5)
--
-- Avant : les 9 actualités de la page « Nouveau » étaient écrites dans le
-- code (src/lib/ia-updates.ts). En publier une demandait un nouvel envoi du
-- site.
--
-- Après : elles sont dans la table mises_a_jour_ia, et chacune a sa ligne
-- dans publications. Leur texte est repris tel quel du code, sans réécriture
-- (ce fichier est fabriqué par un script à partir de l'ancien fichier). Elles
-- étaient lisibles par tout client : elles le restent (reserve_abonnes =
-- faux). Leur date de parution dans le fil est la date de l'annonce.
--
-- Droits : aucune table créée, aucun droit modifié. Le site en ligne ne lit
-- pas ces tables (règle B3). Aucune donnée supprimée. Migration rejouable :
-- une actualité déjà présente est remise à l'identique.

begin;

insert into mises_a_jour_ia (slug, ia, genre, titre, annonce_le, resume, impact, action, points, disponibilite, sources, media, revu_le)
values (
  'gemini-3-7-flash', 'gemini', 'Nouveau modèle',
  'Gemini 3.7 Flash relie vos fichiers et vos e-mails.',
  '2026-08-13',
  'Google a mis à jour Gemini avec la version 3.7 Flash. Selon Google, elle raisonne mieux sur les tâches en plusieurs étapes, par exemple rassembler des informations dispersées dans des dizaines de fichiers et d’e-mails pour en faire un seul document.',
  'Une synthèse à partir de nombreuses sources (dossier client, projet, veille) demande moins de reprises.',
  'Rien à changer si vous êtes abonné Pro ou Ultra. Depuis, la version 3.8 Flash l’a remplacée.',
  '["Google cite des usages comme regrouper des fichiers, rédiger des e-mails ou transformer un rapport PDF en présentation interactive.","Déployé dans plus de 160 pays."]'::jsonb,
  'Abonnés Google AI Pro et Ultra, depuis le 13 août 2026.',
  '[{"label":"Google : Gemini 3.7 Flash","url":"https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-3-7-flash/"},{"label":"9to5Google","url":"https://9to5google.com/2026/08/13/gemini-3-7-flash-launch/"}]'::jsonb,
  '{"type":"image","src":"https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-3-7-flash.width-1300.png","alt":"Visuel officiel de Google pour Gemini 3.7 Flash.","credit":"Image : Google"}'::jsonb,
  '2026-10-05'
)
on conflict (slug) do update set
  ia = excluded.ia, genre = excluded.genre, titre = excluded.titre, annonce_le = excluded.annonce_le,
  resume = excluded.resume, impact = excluded.impact, action = excluded.action, points = excluded.points,
  disponibilite = excluded.disponibilite, sources = excluded.sources, media = excluded.media;

insert into publications (type, ref_id, titre, resume, publie_le, reserve_abonnes)
values ('mise_a_jour', 'gemini-3-7-flash', 'Gemini 3.7 Flash relie vos fichiers et vos e-mails.', 'Google a mis à jour Gemini avec la version 3.7 Flash. Selon Google, elle raisonne mieux sur les tâches en plusieurs étapes, par exemple rassembler des informations dispersées dans des dizaines de fichiers et d’e-mails pour en faire un seul document.', '2026-08-13T08:00:00Z', false)
on conflict (type, ref_id) do update set
  titre = excluded.titre, resume = excluded.resume, publie_le = excluded.publie_le, reserve_abonnes = excluded.reserve_abonnes;

insert into mises_a_jour_ia (slug, ia, genre, titre, annonce_le, resume, impact, action, points, disponibilite, sources, media, revu_le)
values (
  'memoire-claude-cowork', 'claude', 'Nouvelle fonction',
  'La mémoire de Claude fonctionne aussi dans Cowork.',
  '2026-08-25',
  'Claude se souvient du contexte de votre travail d’une conversation à l’autre, y compris dans Cowork. Vous pouvez voir et modifier les sujets qu’il retient, et régler ce qu’il ne doit pas mémoriser.',
  'Moins de contexte à réexpliquer : votre métier, vos outils et vos habitudes sont déjà connus.',
  'Ouvrez les réglages de mémoire de Claude pour vérifier ce qui est retenu et retirer ce qui ne doit pas l’être.',
  '["Activée par défaut sur Free, Pro et Max ; désactivée par défaut sur Team et Enterprise.","Un réglage dédié permet d’écarter les sujets sensibles."]'::jsonb,
  'Toutes les offres Claude, depuis le 25 août 2026.',
  '[{"label":"Notes de version de l’app Claude","url":"https://support.claude.com/en/articles/12138966-release-notes"}]'::jsonb,
  '{"type":"image","src":"/actus/memoire-claude.svg","alt":"Des éléments de contexte reliés autour d’une fiche de mémoire.","credit":"Illustration : AI WORK KIT"}'::jsonb,
  '2026-10-05'
)
on conflict (slug) do update set
  ia = excluded.ia, genre = excluded.genre, titre = excluded.titre, annonce_le = excluded.annonce_le,
  resume = excluded.resume, impact = excluded.impact, action = excluded.action, points = excluded.points,
  disponibilite = excluded.disponibilite, sources = excluded.sources, media = excluded.media;

insert into publications (type, ref_id, titre, resume, publie_le, reserve_abonnes)
values ('mise_a_jour', 'memoire-claude-cowork', 'La mémoire de Claude fonctionne aussi dans Cowork.', 'Claude se souvient du contexte de votre travail d’une conversation à l’autre, y compris dans Cowork. Vous pouvez voir et modifier les sujets qu’il retient, et régler ce qu’il ne doit pas mémoriser.', '2026-08-25T08:00:00Z', false)
on conflict (type, ref_id) do update set
  titre = excluded.titre, resume = excluded.resume, publie_le = excluded.publie_le, reserve_abonnes = excluded.reserve_abonnes;

insert into mises_a_jour_ia (slug, ia, genre, titre, annonce_le, resume, impact, action, points, disponibilite, sources, media, revu_le)
values (
  'taches-planifiees-declencheurs', 'chatgpt', 'Nouvelle fonction',
  'Les tâches planifiées de ChatGPT réagissent à vos applications.',
  '2026-08-25',
  'Une tâche planifiée ne tourne plus seulement à heure fixe : elle peut aussi se lancer quand une application connectée change. Vous pouvez également partager une tâche avec un collègue.',
  'Une automatisation peut partir au bon moment, par exemple à l’arrivée d’une information, au lieu d’attendre le lendemain matin.',
  'Reprenez une tâche de l’onglet « Mettre en place » du kit et testez un déclenchement par événement plutôt qu’à heure fixe.',
  '["Fonction réservée aux offres Plus, Pro, Business et Enterprise.","Les tâches partagées évitent que chaque membre de l’équipe refasse la même configuration."]'::jsonb,
  'ChatGPT Plus, Pro, Business et Enterprise, depuis le 25 août 2026.',
  '[{"label":"Notes de version ChatGPT","url":"https://help.openai.com/en/articles/6825453-chatgpt-release-notes"}]'::jsonb,
  '{"type":"image","src":"/actus/taches-planifiees.svg","alt":"Une application envoie un signal qui déclenche une tâche planifiée.","credit":"Illustration : AI WORK KIT"}'::jsonb,
  '2026-10-05'
)
on conflict (slug) do update set
  ia = excluded.ia, genre = excluded.genre, titre = excluded.titre, annonce_le = excluded.annonce_le,
  resume = excluded.resume, impact = excluded.impact, action = excluded.action, points = excluded.points,
  disponibilite = excluded.disponibilite, sources = excluded.sources, media = excluded.media;

insert into publications (type, ref_id, titre, resume, publie_le, reserve_abonnes)
values ('mise_a_jour', 'taches-planifiees-declencheurs', 'Les tâches planifiées de ChatGPT réagissent à vos applications.', 'Une tâche planifiée ne tourne plus seulement à heure fixe : elle peut aussi se lancer quand une application connectée change. Vous pouvez également partager une tâche avec un collègue.', '2026-08-25T08:00:00Z', false)
on conflict (type, ref_id) do update set
  titre = excluded.titre, resume = excluded.resume, publie_le = excluded.publie_le, reserve_abonnes = excluded.reserve_abonnes;

insert into mises_a_jour_ia (slug, ia, genre, titre, annonce_le, resume, impact, action, points, disponibilite, sources, media, revu_le)
values (
  'gemini-3-8-flash', 'gemini', 'Nouveau modèle',
  'Gemini 3.8 Flash va plus loin sur les tâches complexes.',
  '2026-09-02',
  'Trois semaines après la version 3.7, Google sort Gemini 3.8 Flash. Le modèle « travaille plus » sur les demandes difficiles : il enchaîne davantage d’étapes de raisonnement et d’outils avant de répondre. Il arrive aussi dans Google Sheets.',
  'Les analyses chiffrées et les demandes en plusieurs étapes sont plus fiables, directement dans Gemini et dans Google Sheets.',
  'Rien à changer si vous êtes abonné Google AI Pro ou Ultra. Essayez-le dans Sheets sur un tableau que vous analysez chaque semaine.',
  '["Google annonce des gains nets en raisonnement en plusieurs étapes et en analyse professionnelle.","Le modèle prend plus de temps sur les tâches difficiles pour vérifier son travail.","C’est le troisième modèle Flash en six semaines : Google publie désormais ses améliorations par petites étapes rapprochées."]'::jsonb,
  'Abonnés Google AI Pro et Ultra, dans l’app Gemini, le mode IA de la recherche et Google Sheets, depuis le 2 septembre 2026.',
  '[{"label":"Google : Introducing Gemini 3.8 Flash","url":"https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/"},{"label":"9to5Google","url":"https://9to5google.com/2026/09/02/gemini-3-8-flash-launch/"},{"label":"Notes de version de l’API Gemini","url":"https://ai.google.dev/gemini-api/docs/changelog"}]'::jsonb,
  '{"type":"image","src":"https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-3-8_flash__blog__header__16-9__light.width-1300.png","alt":"Visuel officiel de Google pour Gemini 3.8 Flash.","credit":"Image : Google"}'::jsonb,
  '2026-10-05'
)
on conflict (slug) do update set
  ia = excluded.ia, genre = excluded.genre, titre = excluded.titre, annonce_le = excluded.annonce_le,
  resume = excluded.resume, impact = excluded.impact, action = excluded.action, points = excluded.points,
  disponibilite = excluded.disponibilite, sources = excluded.sources, media = excluded.media;

insert into publications (type, ref_id, titre, resume, publie_le, reserve_abonnes)
values ('mise_a_jour', 'gemini-3-8-flash', 'Gemini 3.8 Flash va plus loin sur les tâches complexes.', 'Trois semaines après la version 3.7, Google sort Gemini 3.8 Flash. Le modèle « travaille plus » sur les demandes difficiles : il enchaîne davantage d’étapes de raisonnement et d’outils avant de répondre. Il arrive aussi dans Google Sheets.', '2026-09-02T08:00:00Z', false)
on conflict (type, ref_id) do update set
  titre = excluded.titre, resume = excluded.resume, publie_le = excluded.publie_le, reserve_abonnes = excluded.reserve_abonnes;

insert into mises_a_jour_ia (slug, ia, genre, titre, annonce_le, resume, impact, action, points, disponibilite, sources, media, revu_le)
values (
  'gpt-6-astra', 'chatgpt', 'Nouveau modèle',
  'GPT-6 Astra arrive dans ChatGPT.',
  '2026-09-04',
  'OpenAI présente GPT-6 Astra comme son modèle le plus avancé. Selon OpenAI, il comprend mieux ce que vous voulez, suit mieux les consignes et mène plus souvent à bien les tâches en plusieurs étapes. Il est aussi plus à l’aise pour produire présentations, documents et tableaux.',
  'Les demandes complexes (un dossier à partir de notes, une présentation, une analyse de plusieurs fichiers) aboutissent plus souvent du premier coup.',
  'Avec un abonnement payant, choisissez GPT-6 Astra pour vos tâches longues. Pour une question simple, le modèle habituel suffit et consomme moins de votre quota.',
  '["Selon 9to5Mac, ChatGPT contrôle l’ordinateur presque deux fois plus vite qu’avant.","OpenAI met en avant des progrès en recherche, en programmation et en travail professionnel : diapositives, feuilles de calcul, documents qui respectent les modèles de l’entreprise.","Son utilisation est comptée dans les limites de votre abonnement, avec la possibilité d’acheter des crédits en plus.","Certaines demandes sensibles (cybersécurité avancée) restent réservées à des testeurs agréés."]'::jsonb,
  'ChatGPT Plus, Pro, Business et Enterprise, déployé progressivement depuis le 4 septembre 2026. Pas disponible sur les offres Free et Go.',
  '[{"label":"OpenAI : GPT-6 Astra","url":"https://openai.com/index/gpt-6-astra/"},{"label":"Notes de version ChatGPT","url":"https://help.openai.com/en/articles/6825453-chatgpt-release-notes"},{"label":"9to5Mac","url":"https://9to5mac.com/2026/09/04/openai-releasing-major-upgrade-to-chatgpt-and-codex-with-gpt-6-astra-details-here/"}]'::jsonb,
  '{"type":"youtube","id":"1QNsdr-Qx_I","title":"Introducing GPT-6 Astra (vidéo officielle d’OpenAI)","credit":"Vidéo : OpenAI"}'::jsonb,
  '2026-10-05'
)
on conflict (slug) do update set
  ia = excluded.ia, genre = excluded.genre, titre = excluded.titre, annonce_le = excluded.annonce_le,
  resume = excluded.resume, impact = excluded.impact, action = excluded.action, points = excluded.points,
  disponibilite = excluded.disponibilite, sources = excluded.sources, media = excluded.media;

insert into publications (type, ref_id, titre, resume, publie_le, reserve_abonnes)
values ('mise_a_jour', 'gpt-6-astra', 'GPT-6 Astra arrive dans ChatGPT.', 'OpenAI présente GPT-6 Astra comme son modèle le plus avancé. Selon OpenAI, il comprend mieux ce que vous voulez, suit mieux les consignes et mène plus souvent à bien les tâches en plusieurs étapes. Il est aussi plus à l’aise pour produire présentations, documents et tableaux.', '2026-09-04T08:00:00Z', false)
on conflict (type, ref_id) do update set
  titre = excluded.titre, resume = excluded.resume, publie_le = excluded.publie_le, reserve_abonnes = excluded.reserve_abonnes;

insert into mises_a_jour_ia (slug, ia, genre, titre, annonce_le, resume, impact, action, points, disponibilite, sources, media, revu_le)
values (
  'fin-des-gpt-personnalises', 'chatgpt', 'À savoir',
  'Les GPT personnalisés vont être remplacés par des plugins.',
  '2026-09-11',
  'OpenAI a annoncé le retrait progressif des GPT personnalisés (Custom GPTs). Une migration vers les plugins est prévue, avec un calendrier qui varie selon les comptes.',
  'Un assistant que vous avez construit sous forme de GPT devra passer en plugin. Ne créez plus de nouveau GPT.',
  'Listez les GPT que vous utilisez vraiment et suivez la migration proposée par OpenAI. Pour un nouvel assistant, utilisez un Projet ChatGPT avec vos documents.',
  '["Concerne toutes les offres ChatGPT.","Nos guides de mise en place recommandent déjà les Projets ChatGPT plutôt que les GPT."]'::jsonb,
  'Toutes les offres ChatGPT. Annonce du 11 septembre 2026.',
  '[{"label":"Notes de version ChatGPT","url":"https://help.openai.com/en/articles/6825453-chatgpt-release-notes"}]'::jsonb,
  '{"type":"image","src":"/actus/fin-des-gpt.svg","alt":"Des assistants GPT se transforment en modules de plugins.","credit":"Illustration : AI WORK KIT"}'::jsonb,
  '2026-10-05'
)
on conflict (slug) do update set
  ia = excluded.ia, genre = excluded.genre, titre = excluded.titre, annonce_le = excluded.annonce_le,
  resume = excluded.resume, impact = excluded.impact, action = excluded.action, points = excluded.points,
  disponibilite = excluded.disponibilite, sources = excluded.sources, media = excluded.media;

insert into publications (type, ref_id, titre, resume, publie_le, reserve_abonnes)
values ('mise_a_jour', 'fin-des-gpt-personnalises', 'Les GPT personnalisés vont être remplacés par des plugins.', 'OpenAI a annoncé le retrait progressif des GPT personnalisés (Custom GPTs). Une migration vers les plugins est prévue, avec un calendrier qui varie selon les comptes.', '2026-09-11T08:00:00Z', false)
on conflict (type, ref_id) do update set
  titre = excluded.titre, resume = excluded.resume, publie_le = excluded.publie_le, reserve_abonnes = excluded.reserve_abonnes;

insert into mises_a_jour_ia (slug, ia, genre, titre, annonce_le, resume, impact, action, points, disponibilite, sources, media, revu_le)
values (
  'claude-slides-docs-designs', 'claude', 'Nouvelle fonction',
  'Claude crée présentations, documents et designs dans n’importe quelle conversation.',
  '2026-09-16',
  'Claude peut désormais produire une présentation, un document ou un visuel directement dans la conversation. Le même jour, Cowork, son mode qui agit sur vos fichiers et vos outils, arrive dans chaque conversation pour les abonnés Pro et Max.',
  'Une présentation ou un compte-rendu sort prêt à relire, sans passer par un autre logiciel.',
  'Pour les tâches « Créer une présentation » du kit, demandez directement le résultat sous forme de présentation dans Claude.',
  '["Présentations, documents et designs : toutes les offres (en bêta pour Enterprise).","Cowork dans chaque conversation : offres Pro et Max, déploiement progressif sur le web, l’ordinateur et le mobile."]'::jsonb,
  'Toutes les offres Claude pour les présentations et documents, Pro et Max pour Cowork. Depuis le 16 septembre 2026.',
  '[{"label":"Claude : Cowork and chat are now one Claude","url":"https://claude.com/blog/cowork-is-now-claude"},{"label":"Notes de version de l’app Claude","url":"https://support.claude.com/en/articles/12138966-release-notes"}]'::jsonb,
  '{"type":"youtube","id":"qMUf-jwSpMo","title":"Claude Cowork and chat are now one Claude (vidéo officielle d’Anthropic)","credit":"Vidéo : Anthropic"}'::jsonb,
  '2026-10-05'
)
on conflict (slug) do update set
  ia = excluded.ia, genre = excluded.genre, titre = excluded.titre, annonce_le = excluded.annonce_le,
  resume = excluded.resume, impact = excluded.impact, action = excluded.action, points = excluded.points,
  disponibilite = excluded.disponibilite, sources = excluded.sources, media = excluded.media;

insert into publications (type, ref_id, titre, resume, publie_le, reserve_abonnes)
values ('mise_a_jour', 'claude-slides-docs-designs', 'Claude crée présentations, documents et designs dans n’importe quelle conversation.', 'Claude peut désormais produire une présentation, un document ou un visuel directement dans la conversation. Le même jour, Cowork, son mode qui agit sur vos fichiers et vos outils, arrive dans chaque conversation pour les abonnés Pro et Max.', '2026-09-16T08:00:00Z', false)
on conflict (type, ref_id) do update set
  titre = excluded.titre, resume = excluded.resume, publie_le = excluded.publie_le, reserve_abonnes = excluded.reserve_abonnes;

insert into mises_a_jour_ia (slug, ia, genre, titre, annonce_le, resume, impact, action, points, disponibilite, sources, media, revu_le)
values (
  'chatgpt-dans-word', 'chatgpt', 'Nouvelle fonction',
  'ChatGPT s’installe dans Microsoft Word.',
  '2026-09-17',
  'OpenAI lance ChatGPT pour Word. Vous rédigez et corrigez vos documents avec ChatGPT sans quitter Word, et sans copier-coller entre deux fenêtres.',
  'Les tâches de rédaction et de correction (lettres, comptes-rendus, propositions) se font directement dans votre document.',
  'Installez « ChatGPT for Word » depuis Microsoft Marketplace, puis ouvrez ChatGPT depuis le ruban de Word et connectez-vous. Nos prompts de rédaction se collent tels quels dans le panneau.',
  '["Disponible sur toutes les offres, y compris la version gratuite.","ChatGPT s’ouvre dans un panneau à droite du document : il peut rédiger à partir de notes, résumer, réécrire un passage sélectionné ou réorganiser les titres.","Pour une modification précise, sélectionnez le texte dans Word puis décrivez le changement voulu.","En entreprise, l’administrateur doit autoriser le complément. Il sera activé par défaut à partir du 1er octobre 2026."]'::jsonb,
  'Toutes les offres ChatGPT, depuis le 17 septembre 2026.',
  '[{"label":"Aide OpenAI : ChatGPT for Word","url":"https://help.openai.com/en/articles/20001526-chatgpt-for-word"},{"label":"Notes de version ChatGPT","url":"https://help.openai.com/en/articles/6825453-chatgpt-release-notes"}]'::jsonb,
  '{"type":"image","src":"/actus/chatgpt-word.svg","alt":"Un document ouvert avec l’assistant ChatGPT dans un panneau latéral.","credit":"Illustration : AI WORK KIT"}'::jsonb,
  '2026-10-05'
)
on conflict (slug) do update set
  ia = excluded.ia, genre = excluded.genre, titre = excluded.titre, annonce_le = excluded.annonce_le,
  resume = excluded.resume, impact = excluded.impact, action = excluded.action, points = excluded.points,
  disponibilite = excluded.disponibilite, sources = excluded.sources, media = excluded.media;

insert into publications (type, ref_id, titre, resume, publie_le, reserve_abonnes)
values ('mise_a_jour', 'chatgpt-dans-word', 'ChatGPT s’installe dans Microsoft Word.', 'OpenAI lance ChatGPT pour Word. Vous rédigez et corrigez vos documents avec ChatGPT sans quitter Word, et sans copier-coller entre deux fenêtres.', '2026-09-17T08:00:00Z', false)
on conflict (type, ref_id) do update set
  titre = excluded.titre, resume = excluded.resume, publie_le = excluded.publie_le, reserve_abonnes = excluded.reserve_abonnes;

insert into mises_a_jour_ia (slug, ia, genre, titre, annonce_le, resume, impact, action, points, disponibilite, sources, media, revu_le)
values (
  'claude-opus-5-5', 'claude', 'Nouveau modèle',
  'Claude Opus 5.5 est disponible.',
  '2026-09-22',
  'Anthropic lance Opus 5.5, son modèle le plus puissant. Il atteint presque le niveau de Claude Fable 5.1 tout en coûtant 40 % de moins à faire tourner qu’Opus 5. Ses réponses vont plus vite à l’essentiel, avec moins de jargon.',
  'Des réponses plus directes : l’information importante arrive en premier, même sur une analyse longue.',
  'Rien à changer. Choisissez Opus 5.5 dans le sélecteur de modèle, vos prompts AI WORK KIT fonctionnent tels quels.',
  '["Anthropic le présente comme le modèle le plus performant qu’il ait testé, en tête sur le travail d’analyse, l’utilisation de l’ordinateur et les tâches en plusieurs étapes.","Ses réponses placent l’essentiel au début et utilisent moins de termes techniques.","Il résiste mieux aux instructions cachées dans des pages web ou des documents (injections de prompt).","Claude Sonnet 5.5 et Claude Haiku 5.5 arrivent dans les prochaines semaines."]'::jsonb,
  'Tous les abonnements Claude, depuis le 22 septembre 2026. Aussi via l’API et chez AWS, Google Cloud et Microsoft Azure.',
  '[{"label":"Anthropic : Introducing Claude Opus 5.5","url":"https://www.anthropic.com/claude-opus-5-5"},{"label":"Notes de version de l’app Claude","url":"https://support.claude.com/en/articles/12138966-release-notes"},{"label":"TechCrunch","url":"https://techcrunch.com/2026/09/22/anthropic-releases-opus-5-5-with-lower-prices-and-fable-level-performance/"}]'::jsonb,
  '{"type":"image","src":"https://www-cdn.anthropic.com/images/4zrzovbb/website/f4d37a1d1f582f53f4e89440062b649b6273a093-1200x630.jpg","alt":"Visuel officiel d’Anthropic pour l’annonce de Claude Opus 5.5.","credit":"Image : Anthropic"}'::jsonb,
  '2026-10-05'
)
on conflict (slug) do update set
  ia = excluded.ia, genre = excluded.genre, titre = excluded.titre, annonce_le = excluded.annonce_le,
  resume = excluded.resume, impact = excluded.impact, action = excluded.action, points = excluded.points,
  disponibilite = excluded.disponibilite, sources = excluded.sources, media = excluded.media;

insert into publications (type, ref_id, titre, resume, publie_le, reserve_abonnes)
values ('mise_a_jour', 'claude-opus-5-5', 'Claude Opus 5.5 est disponible.', 'Anthropic lance Opus 5.5, son modèle le plus puissant. Il atteint presque le niveau de Claude Fable 5.1 tout en coûtant 40 % de moins à faire tourner qu’Opus 5. Ses réponses vont plus vite à l’essentiel, avec moins de jargon.', '2026-09-22T08:00:00Z', false)
on conflict (type, ref_id) do update set
  titre = excluded.titre, resume = excluded.resume, publie_le = excluded.publie_le, reserve_abonnes = excluded.reserve_abonnes;

-- Contrôle : chaque actualité a sa publication.
do $$
declare
  n_actus integer;
  n_publiees integer;
begin
  select count(*) into n_actus from mises_a_jour_ia where slug in ('gemini-3-7-flash', 'memoire-claude-cowork', 'taches-planifiees-declencheurs', 'gemini-3-8-flash', 'gpt-6-astra', 'fin-des-gpt-personnalises', 'claude-slides-docs-designs', 'chatgpt-dans-word', 'claude-opus-5-5');
  select count(*) into n_publiees from publications where type = 'mise_a_jour' and ref_id in ('gemini-3-7-flash', 'memoire-claude-cowork', 'taches-planifiees-declencheurs', 'gemini-3-8-flash', 'gpt-6-astra', 'fin-des-gpt-personnalises', 'claude-slides-docs-designs', 'chatgpt-dans-word', 'claude-opus-5-5');
  if n_actus <> 9 or n_publiees <> 9 then
    raise exception 'Actualités attendues : 9. Trouvées : %, publiées : %', n_actus, n_publiees;
  end if;
end $$;

commit;
