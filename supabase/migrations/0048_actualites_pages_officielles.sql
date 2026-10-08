-- Actualités des IA : chaque phrase dit ce que disent les pages officielles de l'entreprise, sans déduction
-- (règle de l'utilisateur du 8 octobre 2026). 21 actualités relues le 8 octobre 2026 contre leurs pages officielles ;
-- les sources de presse ne servent plus à aucune phrase et sont retirées. Les publications du fil reprennent le titre
-- et le résumé corrigés. Ne touche qu'aux textes et aux sources de ces actualités. Rejouable.
-- Fabriquée par fab_0048.py.
begin;

update mises_a_jour_ia set
  titre = $t$ChatGPT crée des cartes mémoire pour réviser.$t$,
  resume = $t$Vous pouvez demander à ChatGPT des cartes mémoire sur un sujet, ou lui envoyer vos notes pour qu'il les transforme en cartes. Vous touchez une carte pour la retourner, vous cochez ce que vous savez, et vous revoyez le reste plus tard.$t$,
  impact = $t$Selon OpenAI, vous révisez un sujet que vous voulez apprendre avec des cartes interactives, sur mobile ou sur le web.$t$,
  action = $t$Demandez : « Fais-moi des cartes mémoire sur… », ou envoyez vos notes. Vérifiez les cartes avec vos notes d'origine : OpenAI rappelle que ChatGPT peut se tromper.$t$,
  points = $j$["Une carte se retourne d'un toucher. Vous cochez si vous connaissez la réponse, ou vous la gardez pour plus tard.", "Les cartes peuvent être mélangées.", "Elles s'enregistrent automatiquement dans votre bibliothèque."]$j$::jsonb,
  disponibilite = $t$Sur mobile et sur le web, pour toutes les offres de ChatGPT, depuis le 22 septembre 2026.$t$,
  sources = $j$[{"url": "https://help.openai.com/en/articles/6825453-chatgpt-release-notes", "label": "Notes de version de ChatGPT"}, {"url": "https://help.openai.com/en/articles/20001533-flashcards-in-chatgpt", "label": "OpenAI : les cartes mémoire dans ChatGPT"}]$j$::jsonb,
  revu_le = '2026-10-08'
where slug = $t$chatgpt-cartes-memoire$t$;
update publications set titre = $t$ChatGPT crée des cartes mémoire pour réviser.$t$, resume = $t$Vous pouvez demander à ChatGPT des cartes mémoire sur un sujet, ou lui envoyer vos notes pour qu'il les transforme en cartes. Vous touchez une carte pour la retourner, vous cochez ce que vous savez, et vous revoyez le reste plus tard.$t$
where type = 'mise_a_jour' and ref_id = $t$chatgpt-cartes-memoire$t$;

update mises_a_jour_ia set
  titre = $t$ChatGPT s’installe dans Microsoft Word.$t$,
  resume = $t$OpenAI lance ChatGPT pour Word. Vous rédigez et révisez vos documents avec ChatGPT, dans un panneau latéral ouvert dans Word.$t$,
  impact = $t$Selon OpenAI, vous pouvez rédiger dans Word une note, une proposition ou un rapport à partir de vos notes.$t$,
  action = $t$Dans Microsoft Marketplace, ouvrez la fiche « ChatGPT » et installez-la. Ouvrez ensuite ChatGPT depuis le ruban de Word, puis connectez-vous. Vous pouvez y coller nos prompts de rédaction.$t$,
  points = $j$["Disponible sur toutes les offres, y compris la version gratuite.", "ChatGPT s’ouvre dans un panneau latéral, dans Word : il peut rédiger à partir de notes, résumer un document, réviser un passage sélectionné, réorganiser le contenu et ajuster les titres.", "Pour une modification précise, sélectionnez le texte dans Word puis décrivez le changement voulu.", "En entreprise, l’administrateur de l’espace de travail peut l’activer ou le désactiver. L’administrateur Microsoft 365 doit aussi autoriser le complément. Selon OpenAI, il est activé par défaut à partir du 1er octobre 2026."]$j$::jsonb,
  disponibilite = $t$Toutes les offres ChatGPT, depuis le 17 septembre 2026.$t$,
  sources = $j$[{"url": "https://help.openai.com/en/articles/20001526-chatgpt-for-word", "label": "Aide OpenAI : ChatGPT for Word"}, {"url": "https://help.openai.com/en/articles/6825453-chatgpt-release-notes", "label": "Notes de version ChatGPT"}]$j$::jsonb,
  revu_le = '2026-10-08'
where slug = $t$chatgpt-dans-word$t$;
update publications set titre = $t$ChatGPT s’installe dans Microsoft Word.$t$, resume = $t$OpenAI lance ChatGPT pour Word. Vous rédigez et révisez vos documents avec ChatGPT, dans un panneau latéral ouvert dans Word.$t$
where type = 'mise_a_jour' and ref_id = $t$chatgpt-dans-word$t$;

update mises_a_jour_ia set
  titre = $t$ChatGPT Images 2.5 : des images plus nettes, des retouches plus précises.$t$,
  resume = $t$OpenAI met à jour la création d'images de ChatGPT : des détails plus nets, une création plus rapide et une retouche qui modifie mieux uniquement ce que vous demandez, en gardant le reste de l'image. S'y ajoutent des modèles prêts à l'emploi, comme l'affiche, et le croquis : vous dessinez votre idée, ChatGPT en fait une image.$t$,
  impact = $t$Selon OpenAI, vous pouvez partir d'un modèle, comme l'affiche, et la retouche se limite mieux à ce que vous demandez.$t$,
  action = $t$Ouvrez Images, choisissez un modèle ou décrivez votre visuel. Pour une retouche, dites précisément ce qui doit changer, et rien d'autre.$t$,
  points = $j$["OpenAI annonce un temps de création des images réduit jusqu'à 50 % par rapport à Images 2.0.", "Les modèles (Templates) se personnalisent : affiche, produit dérivé, et d'autres.", "Les limites de création d'images de chaque offre ne changent pas.", "Les modèles ne sont pas encore disponibles en mode Work."]$j$::jsonb,
  disponibilite = $t$En cours de déploiement depuis le 8 septembre 2026, pour toutes les offres, sur ordinateur, mobile et web.$t$,
  sources = $j$[{"url": "https://openai.com/index/introducing-chatgpt-images-2-5/", "label": "OpenAI : ChatGPT Images 2.5"}, {"url": "https://help.openai.com/en/articles/6825453-chatgpt-release-notes", "label": "Notes de version de ChatGPT"}]$j$::jsonb,
  revu_le = '2026-10-08'
where slug = $t$chatgpt-images-2-5$t$;
update publications set titre = $t$ChatGPT Images 2.5 : des images plus nettes, des retouches plus précises.$t$, resume = $t$OpenAI met à jour la création d'images de ChatGPT : des détails plus nets, une création plus rapide et une retouche qui modifie mieux uniquement ce que vous demandez, en gardant le reste de l'image. S'y ajoutent des modèles prêts à l'emploi, comme l'affiche, et le croquis : vous dessinez votre idée, ChatGPT en fait une image.$t$
where type = 'mise_a_jour' and ref_id = $t$chatgpt-images-2-5$t$;

update mises_a_jour_ia set
  titre = $t$ChatGPT réunit ses informations de confidentialité au même endroit.$t$,
  resume = $t$OpenAI ouvre un « Privacy Center » dans ChatGPT : un endroit unique pour comprendre vos options de confidentialité et retrouver les réglages qui les commandent. Il couvre la mémoire, la personnalisation, l'usage de vos données, les applications connectées et la sécurité du compte.$t$,
  impact = $t$Selon OpenAI, vous trouvez au même endroit des explications sur vos options de confidentialité, avec des liens vers les réglages qui les commandent.$t$,
  action = $t$Sur Android : ouvrez Paramètres, puis Privacy center. Sur iPhone : ouvrez Paramètres, puis Privacy Center. Prenez deux minutes pour vérifier la mémoire et l'usage de vos conversations. S'il n'apparaît pas, OpenAI indique qu'il n'est peut-être pas encore disponible pour votre compte ou votre version de l'application.$t$,
  points = $j$["Sur le web : menu du compte, Help, puis Privacy center.", "Les réglages eux-mêmes restent dans les Paramètres de ChatGPT.", "Les options proposées dépendent de votre offre et de votre région."]$j$::jsonb,
  disponibilite = $t$Déploiement en cours pour les comptes Free, Go, Plus, Pro et Business, depuis le 21 septembre 2026. Les offres Enterprise, Edu et Healthcare ne sont pas concernées.$t$,
  sources = $j$[{"url": "https://help.openai.com/en/articles/6825453-chatgpt-release-notes", "label": "Notes de version de ChatGPT"}, {"url": "https://help.openai.com/articles/20001488", "label": "OpenAI : le Privacy Center de ChatGPT"}]$j$::jsonb,
  revu_le = '2026-10-08'
where slug = $t$chatgpt-privacy-center$t$;
update publications set titre = $t$ChatGPT réunit ses informations de confidentialité au même endroit.$t$, resume = $t$OpenAI ouvre un « Privacy Center » dans ChatGPT : un endroit unique pour comprendre vos options de confidentialité et retrouver les réglages qui les commandent. Il couvre la mémoire, la personnalisation, l'usage de vos données, les applications connectées et la sécurité du compte.$t$
where type = 'mise_a_jour' and ref_id = $t$chatgpt-privacy-center$t$;

update mises_a_jour_ia set
  titre = $t$Le mode vocal de ChatGPT utilise vos plugins.$t$,
  resume = $t$Quand vous parlez à ChatGPT, il peut maintenant se servir des plugins et des applications connectées à votre compte, sur le web, sur iOS et sur Android. Vous suivez ses réponses à l'écrit dans la conversation.$t$,
  impact = $t$Selon OpenAI, vous pouvez utiliser vos plugins et vos applications connectées pendant une conversation vocale.$t$,
  action = $t$Ouvrez le mode vocal dans une conversation et faites votre demande. Avec les offres Free et Go, la voix fonctionne dans le chat, avec les plugins de votre offre. Les limites d'usage déjà en place s'appliquent.$t$,
  points = $j$["Le mode vocal prend en charge les plugins sur le web, iOS et Android.", "Les comptes Free et Go utilisent la voix avec les plugins que leur offre prend en charge.", "Les connexions, les autorisations et les limites d'usage déjà en place s'appliquent."]$j$::jsonb,
  disponibilite = $t$Sur le web, iOS et Android, depuis le 23 septembre 2026. Offres Free et Go comprises, avec les plugins de leur offre.$t$,
  sources = $j$[{"url": "https://help.openai.com/en/articles/6825453-chatgpt-release-notes", "label": "Notes de version de ChatGPT"}]$j$::jsonb,
  revu_le = '2026-10-08'
where slug = $t$chatgpt-voix-et-plugins$t$;
update publications set titre = $t$Le mode vocal de ChatGPT utilise vos plugins.$t$, resume = $t$Quand vous parlez à ChatGPT, il peut maintenant se servir des plugins et des applications connectées à votre compte, sur le web, sur iOS et sur Android. Vous suivez ses réponses à l'écrit dans la conversation.$t$
where type = 'mise_a_jour' and ref_id = $t$chatgpt-voix-et-plugins$t$;

update mises_a_jour_ia set
  titre = $t$Anthropic ouvre le Claude Marketplace.$t$,
  resume = $t$Le Claude Marketplace réunit au même endroit les plugins et les connecteurs de Claude, des agents et des produits d'autres sociétés, et des prestataires de services. Plus de 2 000 connecteurs et plugins y sont disponibles au lancement.$t$,
  impact = $t$Un seul endroit pour trouver un connecteur, par exemple pour relier Claude à Google ou à Notion.$t$,
  action = $t$Rien d'obligatoire. Si une tâche vous demande un connecteur, c'est là qu'il se trouve.$t$,
  points = $j$["Plus de 2 000 connecteurs et plugins au lancement, dont ceux d'Atlassian, Google, Microsoft, Notion et Salesforce.", "On y trouve aussi des agents et des produits vendus par d'autres sociétés."]$j$::jsonb,
  disponibilite = $t$En ligne depuis le 23 septembre 2026. L'annonce ne précise pas les offres concernées.$t$,
  sources = $j$[{"url": "https://claude.com/blog/claude-marketplace", "label": "Anthropic : Claude Marketplace"}]$j$::jsonb,
  revu_le = '2026-10-08'
where slug = $t$claude-marketplace$t$;
update publications set titre = $t$Anthropic ouvre le Claude Marketplace.$t$, resume = $t$Le Claude Marketplace réunit au même endroit les plugins et les connecteurs de Claude, des agents et des produits d'autres sociétés, et des prestataires de services. Plus de 2 000 connecteurs et plugins y sont disponibles au lancement.$t$
where type = 'mise_a_jour' and ref_id = $t$claude-marketplace$t$;

update mises_a_jour_ia set
  titre = $t$Claude Opus 5.5 est disponible.$t$,
  resume = $t$Anthropic lance Opus 5.5, le premier modèle de sa nouvelle famille Claude 5.5. Selon Anthropic, il se situe au niveau de Claude Fable 5.1 sur la plupart des tâches, et coûte 40 % de moins à faire tourner qu’Opus 5 sur des usages courants. Ses réponses vont plus vite à l’essentiel, avec moins de jargon.$t$,
  impact = $t$Selon Anthropic, son style en fait un meilleur partenaire de travail sur de longues sessions.$t$,
  action = $t$Si Opus 5.5 apparaît dans votre sélecteur de modèle, vous pouvez le choisir pour vos prompts AI WORK KIT.$t$,
  points = $j$["Selon Anthropic, il arrive en tête en programmation autonome, en utilisation de l’ordinateur et en travail intellectuel.", "Ses réponses placent l’essentiel au début et utilisent moins de termes techniques.", "Face aux injections de prompt, il fait aussi bien ou mieux qu’Opus 5 dans tous les cas testés par Anthropic, dont la navigation web.", "Anthropic annonçait Claude Sonnet 5.5 et Claude Haiku 5.5 pour les semaines suivantes. Sonnet 5.5 est sorti le 28 septembre 2026."]$j$::jsonb,
  disponibilite = $t$Disponible depuis le 22 septembre 2026, sur toutes les plateformes selon Anthropic. Aussi pour les développeurs sur la Claude Platform, et chez AWS, Google Cloud et Microsoft Azure. Anthropic relève aussi les limites d’usage sur cinq heures des offres Pro, Max et Team, et des offres Enterprise facturées au siège.$t$,
  sources = $j$[{"url": "https://www.anthropic.com/claude-opus-5-5", "label": "Anthropic : Introducing Claude Opus 5.5"}, {"url": "https://support.claude.com/en/articles/12138966-release-notes", "label": "Notes de version de l’app Claude"}]$j$::jsonb,
  revu_le = '2026-10-08'
where slug = $t$claude-opus-5-5$t$;
update publications set titre = $t$Claude Opus 5.5 est disponible.$t$, resume = $t$Anthropic lance Opus 5.5, le premier modèle de sa nouvelle famille Claude 5.5. Selon Anthropic, il se situe au niveau de Claude Fable 5.1 sur la plupart des tâches, et coûte 40 % de moins à faire tourner qu’Opus 5 sur des usages courants. Ses réponses vont plus vite à l’essentiel, avec moins de jargon.$t$
where type = 'mise_a_jour' and ref_id = $t$claude-opus-5-5$t$;

update mises_a_jour_ia set
  titre = $t$Claude étoffe son offre pour les petites entreprises.$t$,
  resume = $t$Anthropic ajoute de nouvelles méthodes de travail à « Claude for Small Business », notamment pour répondre aux prospects qui vous contactent et écrire une proposition. Le plugin compte 43 méthodes et 27 nouvelles connexions, dont Shopify, TikTok, Stripe et Zoom.$t$,
  impact = $t$Selon Anthropic, ce plugin est disponible sur toutes les offres payantes de Claude. Il fonctionne dans Claude Cowork, l'application d'ordinateur.$t$,
  action = $t$Votre kit AIW vous aide aussi à prospecter, répondre et proposer, avec une IA gratuite.$t$,
  points = $j$["43 méthodes de travail au total. Selon Anthropic, les nouvelles servent à développer l'activité, par exemple répondre aux prospects qui vous contactent et écrire des propositions.", "27 nouvelles connexions, dont Shopify, Salesforce, TikTok, Zoom, Stripe et Zapier.", "La tournée Claude SMB Tour propose des ateliers gratuits dans 10 villes des États-Unis. 14 partenaires proposent aussi des webinaires gratuits sur leurs connexions."]$j$::jsonb,
  disponibilite = $t$Annoncé le 15 septembre 2026, sur toutes les offres payantes de Claude, dans l'application d'ordinateur Claude Cowork. Anthropic recommande l'offre Team dès que l'entreprise compte plus d'une personne.$t$,
  sources = $j$[{"url": "https://claude.com/blog/claude-for-small-business-launches-new-workflows-integrations-and-training-programs", "label": "Anthropic : Claude for Small Business"}]$j$::jsonb,
  revu_le = '2026-10-08'
where slug = $t$claude-petites-entreprises$t$;
update publications set titre = $t$Claude étoffe son offre pour les petites entreprises.$t$, resume = $t$Anthropic ajoute de nouvelles méthodes de travail à « Claude for Small Business », notamment pour répondre aux prospects qui vous contactent et écrire une proposition. Le plugin compte 43 méthodes et 27 nouvelles connexions, dont Shopify, TikTok, Stripe et Zoom.$t$
where type = 'mise_a_jour' and ref_id = $t$claude-petites-entreprises$t$;

update mises_a_jour_ia set
  titre = $t$Claude repense les projets : plusieurs travaux menés en parallèle.$t$,
  resume = $t$Dans un projet nouvelle version, vous décrivez ce qu'il faut faire : Claude répartit le travail, mène plusieurs fils en parallèle, relit les résultats et assemble le tout. Vous pouvez orienter le travail en cours de route, même depuis votre téléphone.$t$,
  impact = $t$Selon Anthropic, les projets existants des offres Pro et Max continuent de fonctionner comme aujourd'hui. Ils seront mis à niveau quand le déploiement atteindra le chat et Cowork.$t$,
  action = $t$Rien à faire. À l'annonce du 17 septembre 2026, la bêta était ouverte à une sélection d'abonnés Pro et Max.$t$,
  points = $j$["En bêta pour une sélection d'abonnés Pro et Max qui utilisent les sessions cloud de Claude Code et n'ont encore aucun projet sur le web ou l'application d'ordinateur.", "Dans la semaine qui suit l'annonce, l'accès doit s'élargir à d'autres utilisateurs de Claude Code des offres Pro et Max. Viendront ensuite l'ensemble de Claude et les offres Team et Enterprise.", "L'offre gratuite n'est pas citée dans l'annonce."]$j$::jsonb,
  disponibilite = $t$Bêta ouverte le 17 septembre 2026 à une sélection d'abonnés Pro et Max. Une liste d'attente existe pour ces offres.$t$,
  sources = $j$[{"url": "https://claude.com/blog/projects-redesigned", "label": "Anthropic : les projets repensés"}]$j$::jsonb,
  revu_le = '2026-10-08'
where slug = $t$claude-projets-repenses$t$;
update publications set titre = $t$Claude repense les projets : plusieurs travaux menés en parallèle.$t$, resume = $t$Dans un projet nouvelle version, vous décrivez ce qu'il faut faire : Claude répartit le travail, mène plusieurs fils en parallèle, relit les résultats et assemble le tout. Vous pouvez orienter le travail en cours de route, même depuis votre téléphone.$t$
where type = 'mise_a_jour' and ref_id = $t$claude-projets-repenses$t$;

update mises_a_jour_ia set
  titre = $t$Claude crée présentations, documents et designs dans n’importe quelle conversation.$t$,
  resume = $t$Claude peut désormais produire une présentation, un document ou un design directement dans la conversation. Le même jour, Cowork, l’espace de Claude pour les travaux plus importants, commence à arriver dans chaque conversation pour les abonnés Pro et Max.$t$,
  impact = $t$Selon Anthropic, vous pouvez demander une présentation, un document ou un design dans n’importe quelle conversation.$t$,
  action = $t$Pour les tâches « Créer une présentation » du kit, demandez directement le résultat sous forme de présentation dans Claude.$t$,
  points = $j$["Présentations, documents et designs : toutes les offres, y compris gratuite, selon les notes de version de Claude, en bêta pour Enterprise. Le blog d’Anthropic, lui, parle d’une bêta sur les offres payantes.", "Cowork dans chaque conversation : offres Pro et Max, déploiement progressif sur le web, l’ordinateur et le mobile."]$j$::jsonb,
  disponibilite = $t$Selon les notes de version de Claude : toutes les offres pour les présentations, documents et designs, depuis le 16 septembre 2026. Cowork arrive progressivement sur les offres Pro et Max.$t$,
  sources = $j$[{"url": "https://claude.com/blog/cowork-is-now-claude", "label": "Claude : Cowork and chat are now one Claude"}, {"url": "https://support.claude.com/en/articles/12138966-release-notes", "label": "Notes de version de l’app Claude"}]$j$::jsonb,
  revu_le = '2026-10-08'
where slug = $t$claude-slides-docs-designs$t$;
update publications set titre = $t$Claude crée présentations, documents et designs dans n’importe quelle conversation.$t$, resume = $t$Claude peut désormais produire une présentation, un document ou un design directement dans la conversation. Le même jour, Cowork, l’espace de Claude pour les travaux plus importants, commence à arriver dans chaque conversation pour les abonnés Pro et Max.$t$
where type = 'mise_a_jour' and ref_id = $t$claude-slides-docs-designs$t$;

update mises_a_jour_ia set
  titre = $t$Claude Sonnet 5.5 est disponible.$t$,
  resume = $t$Anthropic lance Sonnet 5.5, le deuxième modèle de la famille Claude 5.5. Il produit ses réponses plus de 30 % plus vite que Sonnet 5 et, d'après les tests d'Anthropic, coûte jusqu'à 30 % de moins par tâche. Anthropic le présente comme le plus à l'aise sur les tâches courantes bien cadrées, les documents, les présentations et les tableaux.$t$,
  impact = $t$Selon Anthropic, Sonnet 5.5 produit ses réponses plus de 30 % plus vite que Sonnet 5.$t$,
  action = $t$Rien d'obligatoire.$t$,
  points = $j$["Sonnet 5.5 complète Claude Opus 5.5, qui reste le modèle des travaux complexes.", "Point fort annoncé : les tâches courantes bien cadrées, et des documents, présentations et tableaux soignés.", "La page des tarifs de Claude indique « Sonnet : oui » pour l'offre gratuite. Chaque offre a des limites d'usage."]$j$::jsonb,
  disponibilite = $t$Depuis le 28 septembre 2026, sur toutes les plateformes. L'annonce ne cite aucune offre ; c'est la page des tarifs qui indique « Sonnet : oui » pour l'offre gratuite.$t$,
  sources = $j$[{"url": "https://www.anthropic.com/claude-sonnet-5-5", "label": "Anthropic : Claude Sonnet 5.5"}, {"url": "https://support.claude.com/en/articles/12138966-release-notes", "label": "Notes de version de Claude"}, {"url": "https://claude.com/pricing", "label": "Tarifs de Claude"}]$j$::jsonb,
  revu_le = '2026-10-08'
where slug = $t$claude-sonnet-5-5$t$;
update publications set titre = $t$Claude Sonnet 5.5 est disponible.$t$, resume = $t$Anthropic lance Sonnet 5.5, le deuxième modèle de la famille Claude 5.5. Il produit ses réponses plus de 30 % plus vite que Sonnet 5 et, d'après les tests d'Anthropic, coûte jusqu'à 30 % de moins par tâche. Anthropic le présente comme le plus à l'aise sur les tâches courantes bien cadrées, les documents, les présentations et les tableaux.$t$
where type = 'mise_a_jour' and ref_id = $t$claude-sonnet-5-5$t$;

update mises_a_jour_ia set
  titre = $t$OpenAI prévoit de retirer les GPT personnalisés au profit des plugins.$t$,
  resume = $t$OpenAI a annoncé qu'il prévoit de retirer les GPT personnalisés (Custom GPTs). Une migration vers les plugins est prévue. Le calendrier peut varier selon votre offre et votre espace de travail.$t$,
  impact = $t$Selon OpenAI, vous pouvez continuer à utiliser vos GPT jusqu'à la date de retrait qui vous concerne. OpenAI proposera de les migrer en plugins.$t$,
  action = $t$Listez les GPT que vous utilisez vraiment et suivez la migration proposée par OpenAI. Pour un nouvel assistant, utilisez un Projet ChatGPT avec vos documents.$t$,
  points = $j$["Concerne toutes les offres ChatGPT.", "Les configurations de votre kit AIW utilisent déjà les Projets ChatGPT, pas les GPT."]$j$::jsonb,
  disponibilite = $t$Toutes les offres ChatGPT. Annonce du 11 septembre 2026.$t$,
  sources = $j$[{"url": "https://help.openai.com/en/articles/6825453-chatgpt-release-notes", "label": "Notes de version ChatGPT"}]$j$::jsonb,
  revu_le = '2026-10-08'
where slug = $t$fin-des-gpt-personnalises$t$;
update publications set titre = $t$OpenAI prévoit de retirer les GPT personnalisés au profit des plugins.$t$, resume = $t$OpenAI a annoncé qu'il prévoit de retirer les GPT personnalisés (Custom GPTs). Une migration vers les plugins est prévue. Le calendrier peut varier selon votre offre et votre espace de travail.$t$
where type = 'mise_a_jour' and ref_id = $t$fin-des-gpt-personnalises$t$;

update mises_a_jour_ia set
  titre = $t$Gemini Spark passe à Gemini 3.7 Flash.$t$,
  resume = $t$Google sort Gemini 3.7 Flash. Dans l'app Gemini, c'est Gemini Spark, votre agent personnel qui fonctionne 24 h sur 24, qui l'utilise depuis le 13 août 2026. Selon Google, le modèle met plus d'effort dans la planification en plusieurs étapes et dans l'usage des outils.$t$,
  impact = $t$Selon Google, Gemini Spark passe plus efficacement de l'idée à l'action.$t$,
  action = $t$Rien à changer si vous êtes abonné Google AI Pro ou Ultra.$t$,
  points = $j$["Pour Gemini Spark, Google cite des usages comme regrouper des fichiers, rédiger des e-mails et mettre à jour des documents de suivi.", "Google montre aussi un rapport PDF transformé en récit interactif de données.", "Gemini Spark est proposé aux abonnés Google AI Pro et Ultra dans plus de 160 pays. Selon l'aide de Google, il n'est pas proposé dans l'Espace économique européen, au Nigeria, en Suisse ni au Royaume-Uni."]$j$::jsonb,
  disponibilite = $t$Dans Gemini Spark, pour les abonnés Google AI Pro et Ultra, depuis le 13 août 2026.$t$,
  sources = $j$[{"url": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-3-7-flash/", "label": "Google : Gemini 3.7 Flash"}, {"label": "Aide Google : Gemini Spark", "url": "https://support.google.com/gemini/answer/17094507"}]$j$::jsonb,
  revu_le = '2026-10-08'
where slug = $t$gemini-3-7-flash$t$;
update publications set titre = $t$Gemini Spark passe à Gemini 3.7 Flash.$t$, resume = $t$Google sort Gemini 3.7 Flash. Dans l'app Gemini, c'est Gemini Spark, votre agent personnel qui fonctionne 24 h sur 24, qui l'utilise depuis le 13 août 2026. Selon Google, le modèle met plus d'effort dans la planification en plusieurs étapes et dans l'usage des outils.$t$
where type = 'mise_a_jour' and ref_id = $t$gemini-3-7-flash$t$;

update mises_a_jour_ia set
  titre = $t$Gemini 3.8 Flash va plus loin sur les tâches complexes.$t$,
  resume = $t$Trois semaines après la version 3.7, Google sort Gemini 3.8 Flash. Selon Google, le modèle « travaille plus dur » sur les tâches complexes : il ajoute des étapes de raisonnement et fait appel à des outils à plusieurs reprises. Il arrive aussi dans Google Sheets.$t$,
  impact = $t$Selon Google, le modèle progresse nettement sur le raisonnement en plusieurs étapes, y compris dans les domaines qui demandent une analyse poussée. Vous le trouvez dans l’app Gemini et dans Google Sheets.$t$,
  action = $t$Rien à changer si vous êtes abonné Google AI Pro ou Ultra. Essayez-le dans Sheets sur un tableau que vous analysez chaque semaine.$t$,
  points = $j$["Google annonce des gains nets en raisonnement en plusieurs étapes et en analyse professionnelle.", "Selon Google, c’est sa troisième version Flash en six semaines."]$j$::jsonb,
  disponibilite = $t$Abonnés Google AI Pro et Ultra, dans l’app Gemini, le mode IA de la recherche et Google Sheets, depuis le 2 septembre 2026.$t$,
  sources = $j$[{"url": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/", "label": "Google : Introducing Gemini 3.8 Flash"}, {"url": "https://ai.google.dev/gemini-api/docs/changelog", "label": "Notes de version de l’API Gemini"}]$j$::jsonb,
  revu_le = '2026-10-08'
where slug = $t$gemini-3-8-flash$t$;
update publications set titre = $t$Gemini 3.8 Flash va plus loin sur les tâches complexes.$t$, resume = $t$Trois semaines après la version 3.7, Google sort Gemini 3.8 Flash. Selon Google, le modèle « travaille plus dur » sur les tâches complexes : il ajoute des étapes de raisonnement et fait appel à des outils à plusieurs reprises. Il arrive aussi dans Google Sheets.$t$
where type = 'mise_a_jour' and ref_id = $t$gemini-3-8-flash$t$;

update mises_a_jour_ia set
  titre = $t$Gemini Live passe à un nouveau modèle de conversation.$t$,
  resume = $t$Google lance Gemini 3.8 Live et Gemini 3.8 Live Extended Thinking, ses modèles de conversation à voix haute. La version Extended Thinking arrive dans Gemini Live, pour tout le monde. Selon Google, Gemini 3.8 Live reconnaît 97 langues et passe de l'une à l'autre en cours de conversation.$t$,
  impact = $t$Selon Google, parler avec l'IA devient plus intuitif.$t$,
  action = $t$Ouvrez Gemini Live dans l'application et parlez.$t$,
  points = $j$["Google les présente comme ses modèles de dialogue en direct les plus avancés.", "Pour Gemini 3.8 Live, Google indique que le changement de langue est détecté automatiquement, parmi 97 langues.", "Dans Docs, la fonction est réservée aux abonnés Google AI Pro et Ultra. Dans Gmail et Keep, elle est ouverte à tous les abonnés Google AI."]$j$::jsonb,
  disponibilite = $t$Déploiement dans Gemini Live pour tout le monde, à partir du 15 septembre 2026. L'annonce ne précise ni les limites d'un compte sans abonnement, ni les pays.$t$,
  sources = $j$[{"url": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-gemini-3-8-live-extended-thinking/", "label": "Google : Gemini 3.8 Live et 3.8 Live Extended Thinking"}]$j$::jsonb,
  revu_le = '2026-10-08'
where slug = $t$gemini-3-8-live$t$;
update publications set titre = $t$Gemini Live passe à un nouveau modèle de conversation.$t$, resume = $t$Google lance Gemini 3.8 Live et Gemini 3.8 Live Extended Thinking, ses modèles de conversation à voix haute. La version Extended Thinking arrive dans Gemini Live, pour tout le monde. Selon Google, Gemini 3.8 Live reconnaît 97 langues et passe de l'une à l'autre en cours de conversation.$t$
where type = 'mise_a_jour' and ref_id = $t$gemini-3-8-live$t$;

update mises_a_jour_ia set
  titre = $t$Gemini Live décrit ce que voit la caméra, pour les personnes aveugles ou malvoyantes.$t$,
  resume = $t$Avec « Guided Vision », Gemini Live donne une aide visuelle en temps réel par la caméra : lire de petits caractères, trouver un objet, décrire ce qui vous entoure. Google indique l'avoir développée en étroite collaboration avec la communauté de l'accessibilité.$t$,
  impact = $t$Selon Google, la fonction s'adresse aux personnes aveugles ou malvoyantes, et à toute personne qui veut une aide visuelle intuitive, sur Android 9 et plus.$t$,
  action = $t$Dans l'application Gemini, ouvrez les paramètres de votre profil et activez « Use Guided Vision in Live ».$t$,
  points = $j$["Disponible sur les appareils Android 9 et plus, là où Gemini Live est proposé.", "On peut aussi l'ouvrir par les réglages d'accessibilité d'Android, ou par le menu de TalkBack.", "Google prévient que la fonction peut se tromper : ce n'est ni un dispositif médical, ni une aide à la mobilité, et elle ne remplace pas la canne blanche."]$j$::jsonb,
  disponibilite = $t$Depuis le 1er octobre 2026, sur Android 9 et plus, dans les régions et les langues où Gemini Live existe. L'annonce ne parle ni de prix ni d'abonnement.$t$,
  sources = $j$[{"url": "https://blog.google/innovation-and-ai/products/gemini-app/guided-vision-gemini-live/", "label": "Google : Guided Vision dans Gemini Live"}]$j$::jsonb,
  revu_le = '2026-10-08'
where slug = $t$gemini-guided-vision$t$;
update publications set titre = $t$Gemini Live décrit ce que voit la caméra, pour les personnes aveugles ou malvoyantes.$t$, resume = $t$Avec « Guided Vision », Gemini Live donne une aide visuelle en temps réel par la caméra : lire de petits caractères, trouver un objet, décrire ce qui vous entoure. Google indique l'avoir développée en étroite collaboration avec la communauté de l'accessibilité.$t$
where type = 'mise_a_jour' and ref_id = $t$gemini-guided-vision$t$;

update mises_a_jour_ia set
  titre = $t$Gemini Notebook ajoute de nouveaux formats de quiz et des synthèses pour apprendre.$t$,
  resume = $t$Gemini Notebook, l'outil de Google qui rassemble vos informations en un seul endroit, reçoit de nouveaux outils d'étude : des synthèses interactives et de nouveaux formats de quiz. Google rappelle aussi les courtes vidéos de résumé, dans plus de 80 langues.$t$,
  impact = $t$Selon Google, après un quiz, vous pouvez interroger votre notebook sur vos résultats pour savoir quoi revoir.$t$,
  action = $t$Ajoutez votre document dans Gemini Notebook, puis demandez un quiz ou une synthèse. Comme toujours, vérifiez avec le document d'origine.$t$,
  points = $j$["Nouveaux formats de quiz : réponse courte, sélection multiple, texte à trous, annoncés pour tous les utilisateurs.", "Les synthèses interactives réunissent résumés, quiz et fiches.", "Selon Google, un nouvel enregistreur audio arrive dans l'application mobile. Une partie des nouveautés demande l'anglais comme langue de sortie dans les paramètres.", "La conversation à voix haute avec ses documents arrive d'abord pour les abonnés Google AI Ultra de 18 ans et plus. Google AI Pro et d'autres utilisateurs suivront bientôt."]$j$::jsonb,
  disponibilite = $t$Annoncé le 15 septembre 2026. Les nouveaux formats de quiz et les synthèses interactives arrivent pour tous les utilisateurs dans les semaines qui suivent ; d'autres fonctions sont limitées par la langue ou par l'abonnement.$t$,
  sources = $j$[{"url": "https://blog.google/innovation-and-ai/products/gemini-notebook/new-study-tools-september-2026/", "label": "Google : nouveaux outils d'étude dans Gemini Notebook"}]$j$::jsonb,
  revu_le = '2026-10-08'
where slug = $t$gemini-notebook-outils-d-etude$t$;
update publications set titre = $t$Gemini Notebook ajoute de nouveaux formats de quiz et des synthèses pour apprendre.$t$, resume = $t$Gemini Notebook, l'outil de Google qui rassemble vos informations en un seul endroit, reçoit de nouveaux outils d'étude : des synthèses interactives et de nouveaux formats de quiz. Google rappelle aussi les courtes vidéos de résumé, dans plus de 80 langues.$t$
where type = 'mise_a_jour' and ref_id = $t$gemini-notebook-outils-d-etude$t$;

update mises_a_jour_ia set
  titre = $t$Dans Gemini, les skills vont remplacer les Gems.$t$,
  resume = $t$Google ajoute les « skills » à Gemini : des instructions que vous enregistrez une fois, et que Gemini relance quand votre demande s'y prête. Elles vont remplacer les Gems : Google arrête de prendre en charge les Gems à partir de novembre pour les comptes personnels. Google annonce que vos Gems seront convertis en skills automatiquement.$t$,
  impact = $t$Si votre kit est installé dans Gemini sous forme de Gems, vous n'avez rien à refaire : selon Google, ils seront convertis.$t$,
  action = $t$Rien pour l'instant : gardez vos Gems. Selon Google, Gemini peut vous aider à créer une skill à partir de vos conversations. Nous mettrons à jour les étapes « Gemini » de votre kit AIW au moment de la conversion.$t$,
  points = $j$["Une skill est un jeu d'instructions réutilisable. Gemini peut la lancer seul quand votre demande correspond.", "Fin de prise en charge des Gems : à partir de novembre pour les comptes personnels, mars 2027 pour les clients Workspace professionnels, entreprises et associations, juin 2027 pour Workspace éducation.", "Les Gems existants sont convertis en skills au moment où les Gems disparaissent.", "Réservé pour l'instant aux 18 ans et plus.", "Les Gems de Google Labs ne seront pas convertis en skills."]$j$::jsonb,
  disponibilite = $t$Déploiement mondial dans le chat Gemini depuis le 30 septembre 2026. Pour les comptes Google Workspace, Google l'annonce dans les semaines qui viennent. Google écrit « disponible pour tous les niveaux d'abonnement Google AI ». L'annonce ne dit pas si un compte sans abonnement y a droit.$t$,
  sources = $j$[{"url": "https://blog.google/products-and-platforms/products/gemini/automate-tasks-with-skills/", "label": "Google : automatiser ses tâches avec les skills"}, {"url": "https://gemini.google/release-notes/", "label": "Notes de version de Gemini"}]$j$::jsonb,
  revu_le = '2026-10-08'
where slug = $t$gemini-skills-remplacent-les-gems$t$;
update publications set titre = $t$Dans Gemini, les skills vont remplacer les Gems.$t$, resume = $t$Google ajoute les « skills » à Gemini : des instructions que vous enregistrez une fois, et que Gemini relance quand votre demande s'y prête. Elles vont remplacer les Gems : Google arrête de prendre en charge les Gems à partir de novembre pour les comptes personnels. Google annonce que vos Gems seront convertis en skills automatiquement.$t$
where type = 'mise_a_jour' and ref_id = $t$gemini-skills-remplacent-les-gems$t$;

update mises_a_jour_ia set
  titre = $t$GPT-6 Astra arrive dans ChatGPT.$t$,
  resume = $t$OpenAI présente GPT-6 Astra comme le modèle le plus intelligent et le plus aligné au monde. Selon OpenAI, il comprend nettement mieux ce que vous voulez et mène à bien des tâches en plusieurs étapes. Il produit des documents, des tableaux et des présentations soignés.$t$,
  impact = $t$Les travaux en plusieurs étapes, comme un document, un tableau ou une présentation, sont ceux qu'OpenAI met en avant pour ce modèle.$t$,
  action = $t$Avec ChatGPT Plus, Pro, Business ou Enterprise, choisissez GPT-6 Astra pour un document, un tableau ou une présentation, dès qu'il apparaît dans votre sélecteur de modèle.$t$,
  points = $j$["Selon OpenAI, ses documents, présentations, tableaux et analyses suivent vos modèles.", "Son utilisation est comptée dans les limites de votre abonnement, avec la possibilité d’acheter des crédits en plus.", "Pour l'instant, il refuse certaines tâches de cybersécurité avancées.", "Les offres Pro, Business et Enterprise ont aussi GPT-6 Astra Pro."]$j$::jsonb,
  disponibilite = $t$Annoncé le 3 septembre 2026. OpenAI l'ouvre d'abord à un nombre limité d'organisations, puis, dans les jours qui suivent, à tous les utilisateurs de ChatGPT Plus, Pro, Business et Enterprise. Dans Enterprise, l'administrateur doit l'activer : il est désactivé par défaut.$t$,
  sources = $j$[{"url": "https://openai.com/index/gpt-6-astra/", "label": "OpenAI : GPT-6 Astra"}, {"url": "https://help.openai.com/en/articles/6825453-chatgpt-release-notes", "label": "Notes de version ChatGPT"}]$j$::jsonb,
  revu_le = '2026-10-08'
where slug = $t$gpt-6-astra$t$;
update publications set titre = $t$GPT-6 Astra arrive dans ChatGPT.$t$, resume = $t$OpenAI présente GPT-6 Astra comme le modèle le plus intelligent et le plus aligné au monde. Selon OpenAI, il comprend nettement mieux ce que vous voulez et mène à bien des tâches en plusieurs étapes. Il produit des documents, des tableaux et des présentations soignés.$t$
where type = 'mise_a_jour' and ref_id = $t$gpt-6-astra$t$;

update mises_a_jour_ia set
  titre = $t$La mémoire de Claude fonctionne aussi dans Cowork.$t$,
  resume = $t$La mémoire de Claude fonctionne désormais à la fois dans le chat et dans Cowork, dans le cloud. Vous pouvez voir et modifier les sujets qu’il retient. Les sujets sensibles, comme la santé ou les convictions, restent hors de la mémoire, sauf si vous activez le réglage prévu.$t$,
  impact = $t$Vous retrouvez la mémoire de Claude dans Cowork, et vous pouvez modifier ou supprimer chaque élément retenu.$t$,
  action = $t$Ouvrez les réglages de mémoire de Claude pour vérifier ce qui est retenu et retirer ce qui ne doit pas l’être.$t$,
  points = $j$["Activée par défaut sur Free, Pro et Max ; désactivée par défaut sur Team et Enterprise.", "Les sujets sensibles sont écartés par défaut. Un réglage permet de les inclure."]$j$::jsonb,
  disponibilite = $t$Offres Free, Pro, Max, Team et Enterprise, depuis le 25 août 2026.$t$,
  sources = $j$[{"url": "https://support.claude.com/en/articles/12138966-release-notes", "label": "Notes de version de l’app Claude"}]$j$::jsonb,
  revu_le = '2026-10-08'
where slug = $t$memoire-claude-cowork$t$;
update publications set titre = $t$La mémoire de Claude fonctionne aussi dans Cowork.$t$, resume = $t$La mémoire de Claude fonctionne désormais à la fois dans le chat et dans Cowork, dans le cloud. Vous pouvez voir et modifier les sujets qu’il retient. Les sujets sensibles, comme la santé ou les convictions, restent hors de la mémoire, sauf si vous activez le réglage prévu.$t$
where type = 'mise_a_jour' and ref_id = $t$memoire-claude-cowork$t$;

update mises_a_jour_ia set
  titre = $t$Les tâches planifiées de ChatGPT réagissent à vos applications.$t$,
  resume = $t$Dans ChatGPT Work, une tâche planifiée peut désormais réagir quand quelque chose change dans une application compatible : un nouvel e-mail Gmail, un message dans un canal Slack ou une activité de pull request sur GitHub. Vous pouvez aussi partager une tâche : la personne qui la reçoit peut la relire et l’adapter.$t$,
  impact = $t$Selon OpenAI, une tâche peut réagir à un changement dans une application compatible, par exemple à l’arrivée d’un nouvel e-mail Gmail.$t$,
  action = $t$Si vous êtes sur Plus ou Pro, reprenez une tâche de l’onglet « Mettre en place » du kit et testez un déclenchement par événement.$t$,
  points = $j$["Selon OpenAI, les offres Plus et Pro peuvent créer des tâches déclenchées par un événement. Les offres Free et Go ne peuvent pas en créer.", "Le partage de tâches est ouvert aux offres Free, Go, Plus et Pro.", "La personne qui reçoit une tâche partagée connecte ses propres applications et crée sa propre copie."]$j$::jsonb,
  disponibilite = $t$Déclenchement par événement : ChatGPT Plus et Pro, dans Work sur le web, iOS et Android. Partage : offres Free, Go, Plus et Pro. Depuis le 25 août 2026.$t$,
  sources = $j$[{"url": "https://help.openai.com/en/articles/6825453-chatgpt-release-notes", "label": "Notes de version ChatGPT"}]$j$::jsonb,
  revu_le = '2026-10-08'
where slug = $t$taches-planifiees-declencheurs$t$;
update publications set titre = $t$Les tâches planifiées de ChatGPT réagissent à vos applications.$t$, resume = $t$Dans ChatGPT Work, une tâche planifiée peut désormais réagir quand quelque chose change dans une application compatible : un nouvel e-mail Gmail, un message dans un canal Slack ou une activité de pull request sur GitHub. Vous pouvez aussi partager une tâche : la personne qui la reçoit peut la relire et l’adapter.$t$
where type = 'mise_a_jour' and ref_id = $t$taches-planifiees-declencheurs$t$;

do $controle$
declare n int;
begin
  select count(*) into n from mises_a_jour_ia m join publications p on p.type = 'mise_a_jour' and p.ref_id = m.slug
  where m.revu_le = '2026-10-08' and p.titre = m.titre and p.resume = m.resume and m.slug in ($t$chatgpt-cartes-memoire$t$, $t$chatgpt-dans-word$t$, $t$chatgpt-images-2-5$t$, $t$chatgpt-privacy-center$t$, $t$chatgpt-voix-et-plugins$t$, $t$claude-marketplace$t$, $t$claude-opus-5-5$t$, $t$claude-petites-entreprises$t$, $t$claude-projets-repenses$t$, $t$claude-slides-docs-designs$t$, $t$claude-sonnet-5-5$t$, $t$fin-des-gpt-personnalises$t$, $t$gemini-3-7-flash$t$, $t$gemini-3-8-flash$t$, $t$gemini-3-8-live$t$, $t$gemini-guided-vision$t$, $t$gemini-notebook-outils-d-etude$t$, $t$gemini-skills-remplacent-les-gems$t$, $t$gpt-6-astra$t$, $t$memoire-claude-cowork$t$, $t$taches-planifiees-declencheurs$t$);
  if n <> 21 then raise exception 'Actualités : % sur 21 corrigées', n; end if;
  if exists (select 1 from mises_a_jour_ia, jsonb_array_elements(sources) s where s->>'label' in ('9to5Mac', '9to5Google', 'TechCrunch')) then
    raise exception 'Actualités : une source de presse reste citée';
  end if;
end
$controle$;

commit;
