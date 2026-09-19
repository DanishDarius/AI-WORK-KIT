---
Guide original : "Ton conseil des 100 mentors : le board de fondateurs qui te contredit"
Source : saadiakaram.ai/guides/ton-conseil-des-100-mentors
Statut : reformulé (texte) — voir ressources-visuelles.md pour les éléments non modifiables
---

# Ton board de 100 fondateurs : le comité consultatif qui n'a pas peur de te contredire

*Multi-outils · 9 min de lecture*

## Sommaire

- Introduction
- Ce dont tu as besoin (un seul outil suffit)
- Étape 1 — Rassembler la matière première (l'étape que tout le monde saute, et qui change tout)
- Étape 2 — Le mécanisme qui catégorise ta décision avant de répondre
- Étape 3 — Faire parler ton comité (le prompt à coller)
- Étape 4 — Aller plus loin dans l'échange (les relances qui changent une réunion)
- Étape 5 — La règle anti-invention (à vérifier à chaque réponse)
- Étape 6 — Faire vivre ton comité dans le temps
- Récapitulatif — ta méthode en 6 gestes
- Le fichier complet
- Pour aller plus loin

## Introduction

Imagine pouvoir soumettre une décision à un comité de fondateurs construit sur leurs propres mots : comment ils aborderaient ton problème, sur quoi ils te pousseraient à réfléchir davantage, ce que tu es en train de manquer. Un facilitateur classe d'abord ta décision, avant même de répondre ; viennent ensuite les prompts à utiliser, et une règle stricte pour éviter toute invention.

Une décision de dirigeante, prise seule un soir, soumise à un comité de 100 fondateurs. Pas une citation motivante sortie de nulle part. Un véritable avis construit : comment ces personnes penseraient ton problème, sur quoi elles te challengeraient, ce que tu rates peut-être, ce qu'elles feraient ensuite et pourquoi.

Ce guide construit la méthode étape par étape : quelles sources rassembler, le mécanisme qui identifie le type de décision avant de répondre, les prompts prêts à l'emploi, et la règle qui empêche l'outil d'inventer une phrase que ton mentor n'a jamais prononcée. À la fin, tu disposes d'un comité consultable en 2 minutes chaque fois que tu bloques — bâti sur de la matière réelle, pas sur ce qu'une IA imagine d'un fondateur.

*Temps de mise en place : environ 45 minutes, une seule fois. Ensuite, chaque consultation ne prend que le temps de formuler ta question.*

---

## 01 — Ce dont tu as besoin : un seul outil suffit

Ton comité se construit dans un espace qui ne lit QUE les documents que tu lui fournis. C'est précisément ce qui distingue un vrai mentor d'un simple perroquet.

- **Claude Projects (Anthropic)** — grande fenêtre de contexte, capable de citer tes fichiers par leur nom. Idéal si tu charges beaucoup de transcriptions : il retrouve facilement la bonne citation grâce au nom du fichier.
- **NotebookLM / Gemini Notebook (Google)** — répond exclusivement à partir de tes sources, chaque affirmation étant accompagnée d'une citation cliquable renvoyant au passage exact. Le plus rigoureux des trois côté anti-invention : il ne va jamais chercher sur le web.
- **ChatGPT, via un GPT personnalisé (OpenAI)** — le rôle et les règles se verrouillent dans le champ « Instructions ». L'option la plus simple si tu utilises déjà ChatGPT au quotidien.

*Notre recommandation : commence par NotebookLM pour rassembler la matière première (il t'oblige à sourcer chaque élément), puis passe à Claude Projects ou à un GPT personnalisé pour faire réellement parler ton comité. Les trois options fonctionnent — choisis celle que tu as déjà l'habitude d'ouvrir chaque jour.*

---

## 02 — Étape 1 : rassembler la matière première

*L'étape que tout le monde saute, et qui change pourtant tout.*

Un mentor IA ne vaut que ce que tu lui donnes à lire. L'idée n'est pas de décrire un fondateur, mais de lui fournir ses propres mots. Pour les 5 à 10 dirigeants que tu veux inviter à ta table, rassemble dans un dossier :

- Des transcriptions d'interviews et de podcasts (YouTube propose des sous-titres — colle-les dans un document).
- Des lettres aux actionnaires et essais publics (les lettres annuelles de Bezos chez Amazon, les mémos de Reed Hastings, les billets de Paul Graham publiés sur paulgraham.com).
- Des citations et frameworks documentés, chacun avec sa source.
- Pour chaque personne, une ligne de contexte : quelle entreprise, quel type de décisions elle a réellement prises.

Nomme chaque fichier de façon claire et explicite : `bezos-lettres-actionnaires.txt`, `graham-essais.txt`. Claude et NotebookLM citent leurs sources par nom de fichier — un fichier bien nommé se retrouve facilement, un fichier appelé « doc1 » se perd dans la masse.

**La règle qui protège toute la méthode : sans source écrite pour un mentor donné, il ne rejoint pas le comité. Pas de source, pas de siège.**

---

## 03 — Étape 2 : le mécanisme qui catégorise ta décision avant de répondre

C'est le cœur de la méthode — ce qui la distingue d'un simple « fais parler tel fondateur ». Avant de puiser dans quoi que ce soit, le comité identifie d'abord le type de décision concerné, puis va chercher les avis les plus pertinents sur ce type précis. Colle ceci dans les Instructions de ton GPT, ou dans le prompt système de ton Projet :

**Prompt système — le facilitateur qui classe puis convoque :**
> Tu es le facilitateur de mon comité de mentors.
> Tu ne réponds JAMAIS avec tes connaissances générales.
> Tu réponds UNIQUEMENT à partir des documents chargés, et tu cites la source (nom de fichier ou passage) pour chaque affirmation forte.
> Si un mentor n'a rien dit de documenté sur le sujet, tu l'écris : "Aucune source sur ce point pour [nom]." Tu n'inventes aucune citation.
>
> À CHAQUE question que je te pose, tu commences par classer ma décision :
> 1) CROISSANCE (prix, marché, distribution, levée)
> 2) RECRUTEMENT ET ÉQUIPE (embaucher, structurer, se séparer)
> 3) RISQUE (pari, timing, ce qu'on arrête, ce qu'on protège)
> Tu annonces le type en une ligne, puis tu convoques en priorité les 3 mentors les plus pertinents sur CE type, en justifiant par leurs sources.

---

## 04 — Étape 3 : faire parler ton comité

*Le prompt à coller.*

Prends une décision réelle, formule-la clairement. Colle ta situation, puis ce prompt :

**Prompt à copier — réunir le comité autour de ta décision :**
> Voici ma décision : [décris en 4 à 6 lignes : le contexte, l'enjeu, les options, ce qui te retient].
>
> Réunis mon comité et donne-moi, pour chacun des 3 mentors convoqués :
> 1. Comment il penserait ce problème (sa grille de lecture, sourcée).
> 2. Sur quoi il me challengerait précisément.
> 3. Ce que je suis peut-être en train de rater.
> 4. Ce qu'il ferait ensuite, concrètement, et POURQUOI.
>
> Puis une synthèse : les points où ils sont d'accord, les points où ils s'opposent, et la décision qu'ils te feraient prendre ce soir.
> Format : un mémo de décision, pas un essai.

*Ces quatre questions ne sont pas décoratives : ce sont précisément celles qui transforment un simple avis en véritable aide à la décision — la grille de lecture, le contre-argument, l'angle mort, le prochain geste concret.*

---

## 05 — Étape 4 : aller plus loin dans l'échange

*Les relances qui changent réellement une réunion.*

Une fois la première réponse obtenue, ne t'arrête pas au premier consensus. Colle l'une de ces relances :

**Relance — le désaccord :**
> Qui autour de la table serait en DÉSACCORD avec cette conclusion, et sur quoi exactement ? Donne-moi son argument le plus solide, sourcé.

**Relance — le profil le plus offensif :**
> Que ferait le mentor le plus AGRESSIF du comité ? Le pari le plus rapide, celui qui accepte le plus de risque. Nomme-le et justifie par ses sources.

**Relance — le consensus des 100 :**
> Donne-moi le CONSENSUS des 100 : la décision sur laquelle l'écrasante majorité convergerait, et les 2 ou 3 voix minoritaires qui s'y opposeraient, avec leur raison.

*Le désaccord est bien plus utile que l'accord. Un comité qui te donne systématiquement raison ne sert à rien ; celui qui révèle la faille que tu ne voyais pas peut te faire gagner un trimestre entier.*

---

## 06 — Étape 5 : la règle anti-invention

*À vérifier à chaque réponse.*

Le seul vrai risque de cet outil, c'est qu'il attribue à un fondateur une phrase qu'il n'a jamais prononcée. Trois garde-fous, déjà présents dans tes instructions :

- **Sources exclusives.** L'outil répond à partir de tes fichiers, jamais du web. NotebookLM le garantit par construction (chaque affirmation porte sa citation cliquable). Sur Claude et ChatGPT, c'est la première ligne du prompt système qui impose cette contrainte.
- **Citation par le nom.** Exige « cite le fichier ou le passage » pour toute affirmation forte. Si l'outil ne peut pas citer sa source, il ne doit rien affirmer.
- **L'aveu plutôt que l'invention.** L'instruction « Aucune source sur ce point pour [nom] » vaut bien mieux qu'une belle phrase inventée. Un comité honnête sur ses limites vaut dix fois plus qu'un comité qui comble les trous par du vide.

*Test rapide une fois ton comité monté : demande à un mentor son avis sur un sujet dont tu SAIS qu'il n'a jamais parlé. S'il répond quand même avec assurance, ton ancrage aux sources est cassé — resserre le prompt système. S'il t'indique qu'il n'a pas de source, ton comité est prêt.*

---

## 07 — Étape 6 : faire vivre ton comité dans le temps

- **Conserve tes meilleurs échanges.** Une réunion qui t'a vraiment débloquée devient un modèle : sauvegarde le prompt et réutilise-le tel quel la fois suivante.
- **Fais tourner les sièges.** Ton comité n'est pas figé. Ajoute un mentor quand tu charges de nouvelles sources, retire celui que tu ne consultes jamais.
- **Un mémo par décision.** Termine systématiquement par « résume en mémo de décision ». Au bout d'un mois, tu disposes de l'historique complet de tes décisions et de leur raisonnement — pas juste de conversations éparpillées.

*Un dernier point, par souci d'honnêteté : ce comité est pensé pour les décisions à enjeu faible ou moyen, et pour préparer les décisions plus importantes. Il ne remplace en rien tes vrais mentors et tes vrais pairs — il te permet d'arriver devant eux avec une réflexion déjà largement dégrossie.*

---

## 08 — Récapitulatif : ta méthode en 6 gestes

1. Rassemble 5 à 10 dirigeants, uniquement des sources écrites, fichiers bien nommés.
2. Colle le prompt système qui classe ta décision avant de répondre.
3. Pose ta vraie décision, exige les 4 questions clés.
4. Pousse plus loin : le désaccord, le profil le plus offensif, le consensus des 100.
5. Vérifie l'ancrage aux sources à chaque réponse, exige la citation.
6. Conserve tes meilleurs échanges, fais tourner les sièges, un mémo par décision.

---

## 09 — Le fichier complet

*[Emplacement réservé à ton propre mécanisme d'accès à la méthode complète — lead magnet, formulaire, ou lien selon ta plateforme.]*

---

## 10 — Pour aller plus loin

Pour brancher l'IA directement sur tes propres documents (la logique RAG) et découvrir d'autres compétences qui se monétisent, direction le guide sur les 5 compétences IA qui valent plus qu'un diplôme. Pour choisir le bon modèle Claude selon la tâche, direction le guide dédié aux modèles Claude.

---

## À retenir

**Un comité qui te donne systématiquement raison ne sert à rien. Celui qui te contredit peut te faire gagner un trimestre entier.**

Rassemble les mots authentiques de 5 à 10 fondateurs, construis un facilitateur qui catégorise ta décision avant de répondre, et exige toujours les quatre questions : la grille de lecture, le contre-argument, l'angle mort, le prochain geste. Pas de source, pas de siège, aucune citation inventée. Un mémo par décision, et ton comité t'attend chaque soir.

---

*Sources vérifiées : MIT Sloan Management Review — a personal board of directors with GenAI · FlexOS — build your AI advisory board · NotebookLM (réponses ancrées sur les sources fournies).*
