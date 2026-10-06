# Votre board de 100 fondateurs : le comité consultatif qui n'a pas peur de vous contredire

*Multi-outils · 9 min de lecture*

## Sommaire

- Introduction
- Ce dont vous avez besoin (un seul outil suffit)
- Étape 1 : Rassembler la matière première (l'étape que tout le monde saute, et qui change tout)
- Étape 2 : Le mécanisme qui catégorise votre décision avant de répondre
- Étape 3 : Faire parler votre comité (le prompt à coller)
- Étape 4 : Aller plus loin dans l'échange (les relances qui changent une réunion)
- Étape 5 : La règle anti-invention (à vérifier à chaque réponse)
- Étape 6 : Faire vivre votre comité dans le temps
- Récapitulatif : votre méthode en 6 gestes

## Introduction

Quand on dirige seul une activité, les décisions difficiles se prennent sans personne en face. Baisser un prix, embaucher, s'associer, arrêter un produit : on tranche à l'intuition, puis on doute.

Ce guide vous fait construire un comité consultatif. Il ne s'agit pas de personnes en chair et en os, mais des textes qu'ont publiés des fondateurs que vous respectez. Une IA les lit, retrouve ce qu'ils ont écrit sur une décision comme la vôtre, et vous montre où ils ne sont pas d'accord entre eux.

Le mot important est « publiés ». Votre comité ne dit jamais ce qu'un fondateur « penserait ». Il vous montre ce que cette personne a écrit, et dans quel texte. C'est ce qui le rend utile, et c'est ce qui l'empêche d'inventer.

Cent fondateurs, c'est la cible. Dix suffisent pour commencer.

---

## Ce dont vous avez besoin (un seul outil suffit)

Il vous faut un assistant qui accepte vos fichiers et qui répond à partir d'eux. Trois possibilités :

- un **projet** dans ChatGPT ;
- un **projet** dans Claude ;
- un **carnet** dans NotebookLM, l'outil de Google conçu pour répondre à partir de vos documents.

Les trois ont une offre gratuite. Le nombre de fichiers y est limité : commencez avec cinq textes, vous verrez vite si la méthode vous sert.

Vous n'avez besoin d'aucune compétence technique. Vous aurez besoin d'une heure pour rassembler les textes, et c'est l'heure la plus rentable du guide.

---

## Étape 1 : Rassembler la matière première (l'étape que tout le monde saute, et qui change tout)

Sans vos textes, l'IA répond avec ce qu'elle croit savoir de chaque fondateur. Elle mélange, elle arrondit, et parfois elle invente une citation. Avec vos textes, elle ne peut citer que ce que vous lui avez donné.

**Ce qu'il faut chercher :**

- des lettres annuelles écrites par un fondateur à ses actionnaires ou à ses équipes ;
- des entretiens longs, publiés dans la presse ou transcrits d'une émission ;
- des essais et des billets publiés par le fondateur lui-même ;
- des discours et des conférences, sous forme de transcription ;
- vos notes de lecture sur les livres que vous possédez.

**Comment choisir :**

- **Des gens qui ont vécu votre problème.** Un fondateur d'usine ne vous apprend pas la même chose qu'un fondateur de boutique en ligne. Prenez les deux si votre décision touche aux deux.
- **Des gens de votre terrain.** Ajoutez des fondateurs de votre pays et de votre région. Leurs contraintes sont les vôtres : le paiement, la livraison, le recrutement, le coût du crédit.
- **Des gens qui ne sont pas d'accord.** Un comité qui pense comme vous ne sert à rien. Cherchez exprès un fondateur prudent et un fondateur qui prend des risques.

**Comment ranger :**

Un fichier par texte. Nommez chaque fichier de la même façon : le nom du fondateur, l'année, le type de texte. Par exemple : « Nom du fondateur, 2019, lettre annuelle ». Ce nom est ce que l'IA citera dans ses réponses : plus il est précis, plus vous retrouverez vite le passage.

N'utilisez que des textes que vous avez le droit de consulter, et gardez ce comité pour votre usage personnel.

---

## Étape 2 : Le mécanisme qui catégorise votre décision avant de répondre

Une question vague reçoit une réponse vague. Avant de consulter le comité, l'IA doit dire de quel type de décision il s'agit. C'est ce classement qui lui fait choisir les bons textes.

Voici sept catégories qui couvrent presque tout :

| Catégorie | La question derrière |
| --- | --- |
| Prix | Combien je vends, et à qui je refuse de vendre |
| Produit | Ce que j'ajoute, ce que j'arrête |
| Embauche | Qui je prends, quand, et pour faire quoi |
| Trésorerie | Ce que je dépense maintenant, ce que je garde |
| Associés | Avec qui je partage, et à quelles conditions |
| Clients | Qui je sers en premier, qui je laisse partir |
| Rythme | Ce que j'accélère, ce que je ralentis |

L'IA vous annonce la catégorie et vous la laisse corriger. Si vous n'êtes pas d'accord avec son classement, c'est déjà une information : vous ne posiez peut-être pas la bonne question.

---

## Étape 3 : Faire parler votre comité (le prompt à coller)

Collez ce texte dans les instructions de votre projet, ou au début de la conversation.

> Tu es le secrétaire de mon comité consultatif. Le comité est fait uniquement des textes que j'ai ajoutés à ce projet.
>
> Quand je te soumets une décision, tu procèdes dans cet ordre :
> 1. Reformule ma décision en une phrase, puis classe-la dans une catégorie : prix, produit, embauche, trésorerie, associés, clients ou rythme. Attends ma confirmation.
> 2. Choisis dans mes fichiers les 3 à 5 textes qui parlent le plus de cette catégorie.
> 3. Pour chacun, résume en 3 lignes ce que l'auteur a écrit sur le sujet. Donne le nom du fichier et recopie une phrase exacte du texte, entre guillemets.
> 4. Montre où ces auteurs ne sont pas d'accord entre eux, et sur quoi précisément.
> 5. Termine par la question la plus gênante que ce comité me poserait.
>
> Règles :
> - Tu n'utilises que mes fichiers. Tu n'ajoutes rien de ce que tu sais par ailleurs sur ces personnes.
> - Tu n'écris jamais ce qu'un auteur « penserait » ou « dirait ». Tu écris ce qu'il a écrit.
> - Si mes fichiers ne disent rien sur le sujet, tu l'écris : « Rien dans vos documents sur ce point. »
> - Tu ne me donnes pas ton avis et tu ne tranches pas à ma place.

Posez ensuite votre décision avec ses chiffres : ce que vous vendez, à combien, ce qu'il vous reste en caisse, ce que vous hésitez à faire et pour quand. Plus la situation est précise, plus les textes choisis seront les bons.

---

## Étape 4 : Aller plus loin dans l'échange (les relances qui changent une réunion)

La première réponse est un tour de table. Les relances font le vrai travail.

**Chercher le désaccord**

> Parmi les textes cités, lequel s'oppose le plus à ce que je m'apprête à faire ? Recopie le passage et explique en quoi ma situation ressemble à celle qu'il décrit.

**Vérifier que la situation est comparable**

> Pour chaque texte cité, dis-moi dans quelle situation l'auteur se trouvait quand il l'a écrit : taille de l'entreprise, argent disponible, marché. En quoi ma situation est-elle différente ?

**Faire parler celui qui s'est trompé**

> Y a-t-il dans mes fichiers un auteur qui raconte s'être trompé sur une décision de ce type ? Recopie ce qu'il dit de son erreur et de ce qu'il ferait autrement.

**Obtenir les conditions, pas un verdict**

> Sans me dire quoi faire, liste les conditions que ces textes posent pour que cette décision soit bonne. Pour chacune, demande-moi si elle est remplie chez moi.

**Sortir avec une trace**

> Résume cette réunion en 10 lignes : ma décision, les 3 arguments les plus forts dans chaque sens avec leur fichier, et les 2 choses que je dois vérifier avant de trancher.

---

## Étape 5 : La règle anti-invention (à vérifier à chaque réponse)

Une IA peut fabriquer une citation qui sonne juste. Attribuer à une personne réelle une phrase qu'elle n'a pas écrite est une faute, même en privé : vous finiriez par décider sur la foi d'un conseil que personne n'a donné.

À chaque réponse, vérifiez trois choses :

- **Chaque affirmation porte un nom de fichier.** Pas de fichier, pas d'argument.
- **La phrase entre guillemets existe.** Ouvrez le fichier et cherchez-la. Dix secondes par citation.
- **Le sens est respecté.** Lisez les deux phrases autour. Une citation coupée peut dire le contraire du texte.

Si une citation est introuvable, répondez :

> Je ne trouve pas cette phrase dans le fichier que tu cites. Recopie le passage exact avec les deux phrases qui l'entourent, ou retire cet argument.

Dans NotebookLM, chaque réponse renvoie au passage d'origine : un clic suffit pour vérifier. Dans un projet ChatGPT ou Claude, la vérification se fait à la main, en ouvrant le fichier.

Une seconde règle protège les autres : ne publiez jamais une réponse de votre comité comme si le fondateur l'avait dite. Ce que vous pouvez citer en public, c'est le texte d'origine, avec sa référence.

---

## Étape 6 : Faire vivre votre comité dans le temps

Un comité sert s'il vous connaît et s'il se renouvelle.

- **Ajoutez un texte par semaine.** Un entretien lu, un fichier de plus. En un an, vous avez dépassé cinquante voix.
- **Tenez un journal de décisions.** Créez un fichier « Mes décisions » : la date, la décision, ce que le comité a soulevé, ce que vous avez choisi et pourquoi. Ajoutez-le au projet.
- **Revenez trois mois plus tard.** Écrivez ce qui s'est passé. Demandez au comité : « Voici la décision du 12 mars et son résultat. Quel texte avait vu juste, lequel s'était trompé ? »
- **Retirez les textes qui ne servent jamais.** Si un fichier n'est cité dans aucune réunion en six mois, il encombre.
- **Changez de fauteuil.** Avant une grosse décision, ajoutez exprès deux textes d'auteurs dont vous vous méfiez.

Le comité éclaire, il ne décide pas. Une décision qui engage votre argent, vos salariés ou la loi mérite aussi l'avis d'une vraie personne : un comptable, un juriste, un confrère.

---

## Récapitulatif : votre méthode en 6 gestes

1. **Rassembler** cinq à dix textes publiés par des fondateurs, un fichier par texte, bien nommé.
2. **Classer** la décision dans une catégorie avant toute réponse.
3. **Faire parler** le comité avec le prompt de l'étape 3, chiffres à l'appui.
4. **Relancer** pour trouver le désaccord, l'erreur racontée et les conditions.
5. **Vérifier** chaque citation dans son fichier.
6. **Noter** la décision, puis y revenir trois mois plus tard.
