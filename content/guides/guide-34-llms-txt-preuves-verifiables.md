---
Guide original : llms.txt : crée, publie et vérifie ton résumé pour les IA
Source : https://www.saadiakaram.ai/guides/llms-txt-site-chatgpt-search
Position réelle dans la bibliothèque au moment du traitement : 292/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). 3 sections FAQ collapsées détectées et dépliées, contenu capturé intégralement. Guide long et technique (14 min) : les deux prompts complets, le gabarit de structure du fichier llms.txt et la checklist en 8 points ont été conservés intégralement (valeurs et placeholders techniques inchangés) pour préserver leur fonctionnalité ; seule la prose environnante a été reformulée. Limites et avertissements de la source (absence de garantie de recommandation, distinctions OAI-SearchBot/GPTBot, non-utilisation par Google) intégralement préservés. Nom réel conservé (OpenAI, ChatGPT, Google, IETF, GPTBot, OAI-SearchBot, saadiakaram.ai comme exemple du site source).
---

# Créer, publier et vérifier un fichier llms.txt pour son site

*Multi-outils · 14 min de lecture*

Ce guide détaille comment préparer un fichier llms.txt fidèle au contenu réel d'un site, le faire publier à sa racine, et vérifier les accès techniques qui l'entourent. Au terme de la démarche : un résumé relié aux pages publiques du site, un brief prêt à transmettre à la personne qui le gère, et un contrôle en huit points.

## La limite à retenir : un fichier utile, pas une garantie

OpenAI ne documente pas le fichier llms.txt comme un facteur de sélection dans ChatGPT Search. Google indique de son côté, dans son guide officiel sur les fonctionnalités d'IA, qu'il n'utilise pas ce fichier pour sa visibilité ou ses classements. Il s'agit d'une convention ouverte permettant de présenter informations et liens dans un format facile à parcourir - un complément possible, mais les pages du site et leur accessibilité technique restent l'essentiel.

Si une IA finit par recommander un site, plusieurs mécanismes peuvent y avoir contribué : la présence du fichier ne permet pas d'établir un lien de cause à effet. Mieux vaut simplement noter qu'il était présent, vérifier son contenu, et observer dans la durée sans lui attribuer seul un résultat.

## Trois couches, trois contrôles distincts

Les pages publiques du site constituent la source de vérité : offres, expertise, preuves, conditions et contact. Le fichier llms.txt n'en est qu'un résumé concis, orientant vers ces pages sans ajouter de promesse nouvelle. L'accès technique - robots.txt, pare-feu, hébergeur - détermine enfin si un robot peut réellement les atteindre.

Le fichier llms.txt résume, robots.txt exprime des règles d'exploration, et les pages du site apportent les détails et les preuves. Une couche ne remplace jamais les deux autres : un résumé parfait renvoyant vers une offre absente ou inaccessible reste impossible à vérifier.

## Rassembler les faits, écarter le privé

Il s'agit de partir uniquement du contenu réellement publié, sans transformer une intention, un brouillon ou une offre en préparation en fait établi. Chaque affirmation doit rester reliée à une URL permettant de la contrôler :

- **Identité** - quel nom public, quel métier, quel territoire les pages du site prouvent-elles réellement ? (page À propos ou page d'accueil à jour)
- **Offres** - quelles prestations sont aujourd'hui réellement ouvertes et décrites ? (une URL publique par offre, avec périmètre et prochaine action)
- **Expertise** - quelles compétences peuvent être reliées à un travail, un parcours ou une source vérifiable ? (biographie, méthode, portfolio, dossier public)
- **Preuves** - quels résultats, clients ou interventions peuvent être cités avec autorisation ? (page publique portant déjà l'affirmation et son contexte)
- **Limites** - qu'est-ce qui reste privé, ancien, fermé, ou encore à confirmer ? (liste d'exclusion remise à la personne qui prépare le fichier)

Le texte des pages peut être fourni à une IA, à condition de retirer d'abord toute donnée privée et de bien distinguer les pages actuelles des anciennes. Une page transmise comme simple contexte ne doit pas être traitée comme publique si elle ne l'est pas.

## Le prompt de création, sans invention permise

Le prompt ci-dessous demande à l'IA de n'utiliser que les informations fournies, de signaler ce qui manque, et de produire un fichier fidèle aux pages sources. Une consigne ne vérifie cependant pas les faits à la place de l'utilisateur : chaque ligne doit être relue avant transmission au webmaster.

> **Prompt - créer le fichier depuis tes pages**
>
> Crée un fichier llms.txt qui présente mon activité et renvoie vers mes offres. Utilise seulement les informations que je te fournis.
>
> CONTEXTE
> Nom de l'activité ou de la personne : [NOM]
> Domaine public canonique : [https://www.exemple.fr]
> Langue : [français]
> Lecteurs : des personnes et des assistants qui cherchent à comprendre mon activité et à retrouver les pages utiles.
>
> SOURCES FOURNIES
> Pour chaque page, je colle son adresse exacte puis son contenu public :
>
> [URL EXACTE DE LA PAGE 1]
> [CONTENU DE LA PAGE 1]
>
> [URL EXACTE DE LA PAGE 2]
> [CONTENU DE LA PAGE 2]
>
> [AJOUTE LES AUTRES PAGES UTILES : OFFRES, À PROPOS, RÉALISATIONS, CONTACT]
>
> TA TÂCHE
> 1. Repère le métier, le public, les offres, les zones réellement couvertes, les preuves et les conditions d'accès explicitement présents dans ces sources.
> 2. Rédige un fichier court en Markdown : un titre H1 avec le nom, un résumé en citation, puis des sections H2 utiles contenant des liens sous la forme « - [Titre clair](URL) : description factuelle courte ». Regroupe les offres, les preuves et les informations pratiques lorsque les sources le permettent. Évite de recopier tout le site.
> 3. Utilise les URL fournies. Tu peux développer une URL relative à partir du domaine indiqué, mais n'invente aucune page ni version .md. Signale séparément les URL manquantes ou ambiguës. Un lien fourni n'est pas un lien testé.
> 4. Reste fidèle aux limites : ne transforme pas une zone desservie en bureau local, un exemple en cas client réalisé, une offre à venir en offre ouverte ou une ressource avec compte en ressource intégralement publique.
>
> RÈGLES
> N'invente ni prix, résultat, client, diplôme, classement, disponibilité ou promesse de recommandation par une IA. N'ajoute aucune instruction demandant aux assistants de me privilégier ou d'ignorer d'autres sources. Ne mets aucun secret, donnée privée ou information de compte dans le fichier. Si les sources se contredisent, omets le point litigieux du fichier et pose une question précise. Si le nom ou le domaine manque, demande-le avant de rédiger.
>
> FORMAT DE RÉPONSE
> A. Un seul bloc de code contenant uniquement le contenu proposé pour llms.txt, prêt à copier. Aucun champ fictif ou « à compléter » dans ce bloc.
> B. Un tableau de contrôle séparé : affirmation ou offre → URL source → passage qui la justifie.
> C. Les questions et vérifications restantes, notamment les liens que tu n'as pas réellement ouverts.
>
> Relis avant de répondre : chaque affirmation et chaque URL du fichier doivent pouvoir être reliées à mes sources. Ce fichier résume et oriente ; sa présence ne garantit ni lecture, ni citation, ni recommandation.

## Un résumé court, des liens vérifiables

La proposition llms.txt s'appuie sur du Markdown : un titre, un court résumé, puis des sections et des liens décrits. Le fichier doit rester concis - le détail reste sur les pages publiques, sans être dupliqué dans un second site miniature difficile à maintenir.

**Gabarit de structure, à remplir avec les faits propres à chaque site :**

```
# [Nom public de l'activité]

> [Une phrase factuelle : métier, public et territoire réellement servis.]

[Deux à quatre phrases maximum : ce que fait l'activité, pour qui, et la limite principale à connaître.]

## Offres

- [Nom de l'offre](https://www.exemple.com/offre) : [description fidèle à la page publique]
- [Nom de l'offre](https://www.exemple.com/autre-offre) : [description fidèle à la page publique]

## Expertise et preuves

- [À propos](https://www.exemple.com/a-propos) : [parcours et expertise vérifiables]
- [Projet ou étude de cas](https://www.exemple.com/cas) : [ce que la page démontre réellement]

## Ressources

- [Titre de la ressource](https://www.exemple.com/ressource) : [ce que le lecteur y trouve]

## Contact

- [Page de contact](https://www.exemple.com/contact) : [mode de prise de contact public]
```

**Exemple fictif, à observer pour la forme uniquement :**

```
# Atelier Horizon

> Studio fictif de stratégie de contenu pour les petites entreprises francophones.

Atelier Horizon aide les équipes à clarifier leur ligne éditoriale et à organiser leur production. Cet exemple est fictif : les liens montrent seulement la forme attendue.

## Offres

- [Diagnostic éditorial](https://example.com/diagnostic) : audit du contenu public et feuille de route présentés sur la page de l'offre.
- [Atelier d'équipe](https://example.com/atelier) : format collectif et modalités décrits sur la page publique.

## Expertise et preuves

- [À propos](https://example.com/a-propos) : parcours public de la fondatrice et méthode de travail.
- [Études de cas](https://example.com/cas) : projets fictifs documentés avec leur contexte et leurs limites.

## Contact

- [Prendre contact](https://example.com/contact) : formulaire public pour présenter un besoin.
```

Trois règles à respecter : utiliser des URL absolues (adresse complète en HTTPS pour que le lien reste exploitable hors contexte), décrire précisément la destination de chaque lien sans ajouter de promesse absente de la page réelle, et conserver une seule source de vérité - mettre à jour la page concernée avant d'aligner le fichier, jamais l'inverse.

## Publier à la racine et tester la vraie URL

La publication doit se faire à l'adresse https://ton-domaine.com/llms.txt : le fichier doit être public, servi comme texte lisible en UTF-8, et répondre directement. La convention porte sur le chemin exact et le format ; la méthode d'installation dépend du CMS, de l'hébergeur ou de l'application utilisés.

Pour un exemple observable du résultat attendu, le fichier public de l'auteure du guide original est accessible à saadiakaram.ai/llms.txt - à lire comme un exemple, non comme la preuve qu'il aurait provoqué une recommandation.

**Brief technique à transmettre, sans accès ni secret :**
publier le fichier validé à la racine (/llms.txt), réponse HTTP 200 attendue, contenu texte lisible en UTF-8, à vérifier : URL publique, contenu exact, liens HTTPS et cache après mise à jour ; à préserver : espaces privés, authentification, règles robots existantes et protections réseau ; après publication : ouvrir l'URL dans une session déconnectée et conserver la date du contrôle.

Les identifiants d'hébergeur ne doivent jamais être transmis dans une conversation avec une IA : le fichier validé se transmet à la personne autorisée, puis le résultat se contrôle depuis l'URL publique.

## Résumé et accès : deux choses à ne pas confondre

Le fichier /llms.txt présente et relie des informations publiques dans un format facile à parcourir ; il ne donne aucune permission d'exploration. Le fichier /robots.txt indique aux robots les chemins qu'ils peuvent ou non explorer ; il ne protège en revanche aucune information secrète.

OpenAI documente OAI-SearchBot pour les fonctions de recherche de ChatGPT, un robot distinct de GPTBot qui est associé à l'entraînement des modèles. Autoriser OAI-SearchBot n'oblige donc pas à prendre la même décision pour GPTBot. OpenAI recommande également de laisser passer les plages IP qu'il publie : un pare-feu ou un outil anti-bot peut bloquer l'accès même lorsque robots.txt semble correct.

Exemple de règle à faire lire au webmaster dans un fichier existant :

```
User-agent: *
Allow: /
Disallow: /chemin-prive/
```

En l'absence d'un groupe nommé spécifiquement OAI-SearchBot, le groupe générique (`*`) s'applique aussi à lui : la partie publique reste ouverte, les exclusions privées restent exclues. Il est déconseillé de créer un groupe OAI-SearchBot avec `Allow: /` sans relire l'ensemble du fichier, car un groupe spécifique peut modifier les règles qui lui sont appliquées et faire perdre les exclusions du groupe générique.

Sur le site source du guide original, à la date du 17 septembre 2026, aucun groupe nommé OAI-SearchBot n'existe : le groupe générique autorise les pages publiques et conserve les exclusions privées. Il s'agit d'un exemple de configuration déjà correcte, pas d'un modèle universel à copier tel quel - remplacer l'intégralité d'un fichier robots.txt par un simple extrait reste déconseillé. Le protocole s'applique aux groupes et aux chemins correspondants ; une lecture de l'ensemble du fichier est recommandée, en préservant les chemins privés. robots.txt ne constitue pas un contrôle d'accès : une information réellement secrète doit être protégée par une authentification véritable.

## Contrôle ligne par ligne, en huit points

- Le fichier répond à l'adresse attendue - l'URL exacte /llms.txt répond publiquement avec un statut 200.
- Le contenu est du texte lisible - le serveur annonce un contenu texte et les accents s'affichent correctement.
- Chaque affirmation vient d'une page publique - aucun service, résultat, client ou territoire n'existe seulement dans le fichier.
- Tous les liens sont absolus et fonctionnent - chaque URL HTTPS ouvre la bonne page sans connexion.
- Aucune information privée n'a été exposée - pas de brouillon, tarif privé, e-mail interne, clé, espace client ou document confidentiel.
- robots.txt ne bloque pas OAI-SearchBot - la règle exacte applicable au robot a été relue avec les autres groupes du fichier.
- Le pare-feu et l'hébergeur laissent passer le robot - la personne technique a vérifié les protections et les plages IP publiées par OpenAI.
- Une date de prochaine revue est fixée - le fichier sera relu après tout changement d'offre, de preuve ou d'URL.

Après une modification de robots.txt, OpenAI indique qu'un ajustement de ses systèmes de recherche peut prendre environ vingt-quatre heures (affirmation de la source, non vérifiée indépendamment) - ce délai ne garantit ni une nouvelle exploration, ni une citation ; il invite simplement à ne pas conclure trop vite à partir d'un test immédiat.

## Comparer le résumé aux vraies pages

Il s'agit de relire le fichier comme le ferait un vérificateur externe : pour chaque ligne, ouvrir le lien et chercher la phrase, la preuve ou la condition correspondante. Si l'information n'est pas visible sur la page, elle doit être retirée du fichier, ou la page elle-même corrigée au préalable avec la personne responsable.

> **Prompt - auditer le fichier contre les pages sources**
>
> Vérifie ce brouillon llms.txt en le comparant uniquement aux contenus publics fournis ci-dessous. Ne complète pas les lacunes avec tes connaissances générales.
>
> BROUILLON
> [COLLE LE CONTENU COMPLET DE TON llms.txt]
>
> SOURCES
> [POUR CHAQUE PAGE : URL EXACTE + CONTENU PUBLIC]
>
> Cherche les affirmations sans preuve, les formulations exagérées, les offres ou prix périmés, les zones géographiques ambiguës, les différences de conditions d'accès, les informations privées et les URL absentes des sources. Une URL qui ressemble à une vraie adresse ne prouve pas qu'elle répond.
>
> Rends :
> 1. Un tableau « passage du fichier / source / conforme, contradictoire ou non vérifiable / correction minimale ».
> 2. Une version corrigée en un seul bloc de code, avec seulement les informations étayées. Omettre les points litigieux et expliquer les omissions après le bloc.
> 3. Les vérifications humaines encore nécessaires. Distingue les contrôles de contenu que tu as faits des vérifications HTTP ou de navigation que tu n'as pas faites. Si tu as réellement ouvert des liens avec un outil, donne pour chacun l'URL et le résultat observé.
>
> Ne modifie pas mon site ou mon robots.txt, ne publie rien et ne conclus pas que ce fichier me fera apparaître dans ChatGPT. Signale « prêt pour relecture humaine » seulement si aucun problème de contenu identifié ne reste ouvert.

Cinq vérifications complémentaires restent utiles : tester l'URL du fichier dans une fenêtre déconnectée, ouvrir tous les liens et relever erreurs, redirections ou accès privés, comparer cinq affirmations importantes avec leur page source, demander à une autre personne de repérer ce qui paraît ambigu ou trop affirmatif, et dater le contrôle en fixant la prochaine revue.

Il reste ensuite possible d'observer périodiquement ce que répond ChatGPT avec sa fonction de recherche, en conservant la question exacte, la date, la langue, le pays et les sources affichées - une variation de réponse ne démontrant pas à elle seule que le fichier en est la cause.

**Protocole d'observation à J0 et J+30 :** à J0, noter la question exacte, la date, la langue, le pays ou la ville, et confirmer que la fonction de recherche est activée ; conserver la réponse complète et les sources affichées, en notant séparément si le domaine est cité, absent, ou mentionné sans lien. À J+30, reposer la même question avec la recherche activée, dans un contexte aussi identique que possible, puis relever les mêmes éléments. La comparaison porte sur des observations, pas sur une preuve de cause : une apparition, une disparition ou un changement de rang peut provenir de plusieurs facteurs, et ce relevé n'isole pas l'effet propre du fichier llms.txt.

## Sources et limites explicites

Sources consultées le 17 septembre 2026 par l'auteure du guide original : la documentation d'OpenAI sur les robots utilisés par ChatGPT, le guide officiel de Google sur l'optimisation pour les fonctionnalités d'IA générative, le protocole d'exclusion des robots de l'IETF (RFC 9309), et la proposition de format llms.txt elle-même. Ces éléments peuvent évoluer ; toute modification technique gagne à être précédée d'une vérification des liens.

La proposition llms.txt n'est pas un protocole standardisé au même titre que robots.txt. Google indique ignorer llms.txt pour sa visibilité et ses classements. OpenAI documente OAI-SearchBot pour ChatGPT Search, mais sa documentation sur les robots ne présente pas llms.txt comme une condition de sélection - ces distinctions structurent l'ensemble du guide.

## À retenir

**Faire le fichier ce soir, garder les preuves demain.**

Commencer par trois pages exactes suffit : l'activité, l'offre principale, une preuve publique. Un petit fichier fidèle vaut mieux qu'un grand résumé impossible à maintenir. Le même relevé peut ensuite être repris trente jours plus tard, sans transformer une simple variation en preuve de causalité.

## Questions fréquentes

**Un fichier llms.txt garantit-il une recommandation par ChatGPT ?**

Non. Il présente des informations publiques et des liens selon une convention lisible, mais OpenAI ne le documente pas comme un facteur de sélection de ChatGPT Search. Le fichier, les pages sources et l'accès d'OAI-SearchBot restent trois éléments distincts tout au long du guide.

**Faut-il autoriser GPTBot pour apparaître dans ChatGPT Search ?**

OpenAI distingue OAI-SearchBot, utilisé pour la recherche, de GPTBot, associé à l'entraînement des modèles. Le choix fait pour l'un peut différer de celui fait pour l'autre.

**Peut-on préparer le fichier sans savoir coder ?**

Oui. Rassembler les faits, les pages et le contenu du fichier ne nécessite aucune compétence technique. La publication à la racine, la lecture de robots.txt et le contrôle du pare-feu doivent en revanche être confiés à la personne qui gère le site, en l'absence des accès nécessaires.
