---
Guide original : Bien dialoguer : Le contexte change tout.
Source : https://www.saadiakaram.ai/guides/fondations-ia-bien-dialoguer
Position réelle dans la bibliothèque au moment du traitement : 40/293. Troisième tome de la série « Fondations » en 5 parties.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). 1 section collapsée dépliée et capturée intégralement.
---

# Bien dialoguer avec une IA : le contexte change tout

*Multi-outils · 8 min de lecture - Fondations, livre 3 sur 5*

Rédiger un brief vérifiable et améliorer une réponse par itérations successives. Un guide pour débutant, avec démonstration, exercice et corrigé.

## Sommaire

- Introduction
- La demande : donne de quoi travailler
- Le contexte : garde les bonnes informations
- La deuxième version : corrige ce qui compte
- Au-delà du texte : adapte le brief au support
- À toi de jouer

## Introduction

Tu vas transformer une demande vague en un brief réellement utilisable. Le prompt est l'entrée que tu donnes à l'IA : une consigne, parfois accompagnée de texte, d'une image ou de son. Aucun vocabulaire magique n'est nécessaire pour bien s'en servir. Prévois environ 25 minutes pour écrire, comparer et corriger.

**À la fin de ce guide, tu sauras :** écrire une demande claire avec les faits utiles et un format vérifiable ; distinguer le contexte d'une conversation et la mémoire d'un produit ; améliorer une réponse avec un retour précis, puis savoir t'arrêter au bon moment.

Aucun prérequis technique n'est nécessaire. Les exemples et les corrigés fonctionnent sans aucun compte IA. Avance à ton rythme ; les exercices ne constituent pas une certification.

## La demande : donne de quoi travailler

« Fais une super invitation » ne précise ni les faits, ni les critères de réussite. L'IA doit alors combler les blancs elle-même, ce qui peut produire un texte agréable mais totalement inutilisable en pratique. Tu peux réduire cette ambiguïté avec quatre éléments clairs.

**Anatomie d'un brief, en quatre couches :**

1. **La tâche.** Rédige une invitation pour les habitants du quartier.
2. **Les faits.** 14 novembre 2026, 10 h-12 h, 12 places, gratuit.
3. **Le format.** Un titre + 70 mots maximum, en français simple.
4. **Les limites.** Aucun fait ajouté ; les informations manquantes listées à part.

**La tâche, en détail :** un verbe, un livrable, un public. « Aide-moi pour mon atelier » laisse trop de décisions implicites à l'IA. Un rôle assigné peut orienter le ton ou le point de vue général, mais « tu es un expert » ne lui donne ni diplôme, ni accès à tes données, ni garantie d'exactitude. Commence toujours par les faits, les contraintes, et le résultat attendu - pas par le rôle.

> **Prompt - l'invitation de notre atelier fictif, à essayer**
>
> **Tâche** : rédige une invitation à un atelier de réparation pour les habitants du quartier.
>
> **Faits à utiliser** : samedi 14 novembre 2026, de 10 h à 12 h, à la Maison des voisins. 12 places. Gratuit. Inscription avant le 10 novembre. L'adresse de rue et le lien d'inscription ne sont pas encore fournis.
>
> **Format** : un titre puis un paragraphe de 70 mots maximum, en français simple et chaleureux.
>
> **Limites** : n'ajoute aucun fait, aucune garantie de réparation ni aucun lien. Après le brouillon, liste séparément les informations à confirmer avant envoi. Ne publie et n'envoie rien.

Si tu utilises un outil IA, colle ce brief dans une conversation neuve. Sinon, écris toi-même une invitation respectant ces contraintes, puis compare-la à un corrigé de référence. L'objectif de cet exercice est de reconnaître une bonne demande, pas de posséder un abonnement particulier.

*(Un résultat conforme possible ressemblerait à : un titre court annonçant l'atelier, un paragraphe de 70 mots maximum reprenant exactement la date, l'horaire, le lieu, le nombre de places et la gratuité, sans inventer d'adresse de rue ni de lien d'inscription, suivi d'une liste séparée des informations encore manquantes à confirmer avant tout envoi réel.)*

## Le contexte : garde les bonnes informations

La fenêtre de contexte limite la quantité d'informations que le modèle peut traiter à la fois dans une conversation. Un long historique n'est donc pas une mémoire parfaite et illimitée. Selon le produit utilisé, certains anciens échanges peuvent être résumés, sélectionnés, ou ne plus être disponibles sous la même forme au fil de la conversation.

La mémoire d'une application est une fonction distincte, avec ses propres réglages à part. Ne pars jamais du principe qu'une nouvelle conversation reprend exactement tout ce que tu avais déjà expliqué ailleurs. Pour une tâche importante, redonne systématiquement un bref état des faits déjà validés.

Organise tes pièces avec méthode : une rubrique « Consigne », une rubrique « Documents », et une rubrique « Résultat attendu ». Fournis le passage réellement pertinent plutôt qu'un dossier entier et énorme. Un exemple de résultat aide pour la forme attendue ; il peut aussi entraîner une imitation indésirable de ses défauts s'il contient lui-même des erreurs.

*(Petit exercice de réflexion : tu passes à un nouveau projet dans une conversation remplie d'anciens tarifs périmés. Quel geste aide le plus ? Trois réponses possibles : ajouter « sois plus intelligent » ; repartir avec un brief clair et la version actuelle des faits ; supposer que le modèle repérera seul ce qui est périmé. La bonne réponse est la deuxième - un modèle ne devine pas quelles informations de l'historique sont devenues obsolètes ; c'est à toi de repartir sur des bases explicitement à jour.)*

## La deuxième version : corrige ce qui compte

Une itération est un nouveau passage de travail à partir du résultat précédent. Compare d'abord la réponse obtenue à ton brief de départ. Choisis précisément ce qui manque ou ce qui est faux, puis donne un retour ciblé sur ce point exact.

**La méthode en trois temps :** observer (« tu as ajouté une adresse absente de mon dossier ») ; corriger (« retire cette adresse et garde la Maison des voisins ») ; recontrôler (vérifie que dates, places et gratuité restent toujours exactes après la correction).

> **Prompt - un retour précis, à réutiliser**
>
> Révise le brouillon précédent.
> À corriger : [nomme un écart observable et la correction souhaitée].
> À préserver : [les faits et formulations déjà validés].
> Donne la version révisée, puis une liste courte des changements.
> N'invente pas d'information manquante.

Tu peux aussi demander au modèle de signaler lui-même ses incohérences. Cette relecture fournit des pistes utiles, mais jamais une preuve indépendante et fiable en elle-même. Vérifie toujours les faits avec les documents ou les personnes réellement concernés. Arrête les révisions dès que les critères utiles sont atteints - multiplier les versions peut aussi introduire de nouvelles erreurs à chaque passage.

## Au-delà du texte : adapte le brief au support

- **Image.** Précise le sujet, la composition, l'éclairage, le format et les éléments à exclure explicitement. Pour un événement fictif, demande une illustration clairement identifiée comme telle, jamais une fausse photo de reportage qui pourrait tromper.
- **Vidéo.** Ajoute l'action, le mouvement de caméra et la durée souhaitée. Commence par une scène simple. Vérifie la continuité, les gestes et le texte affiché, image par image si nécessaire.
- **Audio.** Donne le texte exact, la langue et la prononciation importante à respecter. Utilise une voix autorisée, sans jamais imiter une personne réelle à son insu.

*(Exemple de brief visuel : « Illustration d'une table avec une lampe débranchée et des outils de réparation, sans personnes. Lumière naturelle, fond ivoire, accents corail, format horizontal. Aucun texte ni logo. » Tu peux dessiner cette composition sur papier au préalable pour tester sa clarté avant même de la soumettre à un outil.)*

## À toi de jouer : fais mieux que « fais mieux »

Le brouillon annonce : « Venez dimanche à 9 h, au 18 rue des Fleurs. Réparations garanties, places illimitées ! » Écris toi-même le retour qui permet de le corriger avec les faits réels de notre atelier fictif, sans ajouter de nouvelles informations inventées.

*(Piste de correction : le brouillon contient plusieurs écarts par rapport au brief de départ - un mauvais jour (dimanche au lieu de samedi), une mauvaise heure (9 h au lieu de 10 h-12 h), une adresse inventée qui n'a jamais été fournie, une garantie de réparation qui n'a jamais été annoncée, et un nombre de places illimité alors que le brief en précisait 12. Un bon retour nomme chacun de ces écarts un par un, en renvoyant systématiquement aux faits validés du brief initial, sans supposer ni inventer d'information supplémentaire pour combler les manques.)*

**Avant de poursuivre :** conserve ton brief et ton critère de validation. Tu vas maintenant apprendre à vérifier une réponse au lieu de juger seulement son style.

## Pour vérifier et approfondir

Sources primaires consultées à la mi-septembre 2026. Les exemples pédagogiques de ce guide sont fictifs ; les fonctions des produits cités peuvent évoluer avec le temps.

Ressources citées : documentation officielle sur la clarté et la révision des prompts ; documentation sur le contexte, les exemples et la structure des consignes ; documentation sur les tokens et les limites de contexte d'un modèle de langage.
