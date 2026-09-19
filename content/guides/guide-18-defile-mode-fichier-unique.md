---
Guide original : "Le défilé qui tient dans un fichier"
Source : saadiakaram.ai/guides/fashion-runway-website
Statut : reformulé (texte) — aucune image détectée, mais un fichier .md téléchargeable (le brief technique complet de 263 lignes) est lié en externe et n'a pas été récupéré ; voir ressources-visuelles.md
---

# Un défilé de mode qui tient dans un seul fichier

*Claude · 9 min de lecture*

## Sommaire

- Introduction
- La feuille de route en 5 étapes
- Pourquoi ce projet et pas un autre
- Étape 1 — Générer les mannequins avec un modèle d'image IA
- Étape 2 — Animer, puis alléger
- Étape 3 — Briefer
- Étape 4 — Recetter
- Étape 5 — Publier et décliner
- Le test qui valide
- Questions fréquentes

## Introduction

Un site de mode où les mannequins marchent vers toi en boucle, se figent au survol et ouvrent leur fiche produit au clic. Des mannequins générés par IA, animés en image vers vidéo, le tout dans un seul fichier HTML, zéro framework, zéro tournage. Un brief technique complet de 263 lignes accompagne la méthode, à télécharger en .md.

Un défilé qui tourne en boucle directement dans le navigateur. Les mannequins arrivent du fond à gauche, grandissent progressivement, glissent vers toi, puis sortent à droite. Tu survoles l'écran, tout se fige sauf celui que tu regardes. Tu cliques, il vient se placer au centre et sa fiche produit apparaît. Le tout dans un seul fichier HTML, sans framework, sans librairie externe, sans la moindre requête vers un serveur tiers.

Ce projet se construit en deux heures avec Claude ou n'importe quel agent de code. Pas parce que l'IA serait particulièrement douée en soi, mais parce que le brief est rédigé correctement dès le départ. Voici la méthode complète.

*Note sur les ressources : le guide original propose un fichier .md téléchargeable de 263 lignes contenant les maths de la perspective, les keyframes exactes, le SVG du logo, les données produit et la checklist de recette. Ce fichier n'a pas été récupéré ici (voir `ressources-visuelles.md`) — c'est un document technique à part entière que tu devras reconstruire toi-même ou adapter, pas juste un visuel à remplacer.*

---

## 01 — La feuille de route en 5 étapes

*Deux heures de travail réel. L'ordre compte : chaque étape produit la matière de la suivante.*

| # | Étape | Durée | Ce que tu produis |
|---|-------|-------|---------------------|
| 1 | Générer | 30 min | Créer 5 à 8 mannequins plein pied sur fond blanc avec un modèle d'image IA → un dossier d'images verticales cohérentes |
| 2 | Animer | 25 min | Transformer chaque image en clip de marche, puis l'alléger pour le web → des .mp4 H.264 de moins de 3 Mo |
| 3 | Briefer | 5 min | Donner à l'IA un cahier des charges qui ne laisse rien à l'interprétation → le brief .md collé dans le chat |
| 4 | Recetter | 30 min | Passer la checklist point par point et faire corriger, une chose à la fois → une page qui coche les 9 cases |
| 5 | Publier | 15 min | Mettre en ligne le fichier unique et le brancher sur ton nom → une URL que tu peux envoyer |

---

## 02 — Comprendre : pourquoi ce projet et pas un autre

La plupart des démonstrations IA que l'on croise sont des dashboards. Personne ne les regarde vraiment. Un défilé, si. C'est visuel, ça se comprend en dix secondes, et surtout ça démontre trois choses à la fois : tu sais diriger une IA sur un rendu exigeant, tu sais respecter une contrainte technique difficile, et tu sais livrer un résultat concret.

La contrainte technique difficile ici, c'est la perspective. Faire marcher un personnage vers la caméra n'est pas une simple translation — c'est une courbe : la taille, la position horizontale et la ligne de sol évoluent ensemble, de façon non linéaire. Une IA laissée totalement libre produira un carrousel plat et sans profondeur. Avec des points de contrôle précis dans le brief, elle produit un véritable couloir de perspective.

---

## 03 — Étape 1 : générer les mannequins avec un modèle d'image IA

**Durée :** 30 min
**Tu produis :** 5 à 8 images verticales, plein pied, fond blanc pur
**Le piège à éviter :** un fond gris, une ombre portée ou un sol visible — le cadre de l'image devient perceptible et l'illusion s'effondre.

Aucune caméra, aucun casting, aucun studio nécessaire. Tu génères tes silhouettes avec un modèle d'image IA performant (comme le modèle image de Gemini). La seule chose qui compte réellement : la cohérence entre les différents visuels. Même cadrage, même lumière, même distance, même hauteur de sol. Sinon, le couloir de perspective laisse voir la supercherie.

**Prompt à copier — génération d'image :**
> Photo de mode pleine longueur, format vertical 2:5, fond blanc pur #FBF8F2 sans ombre au sol et sans décor.
>
> Sujet : un mannequin debout, de face, en pleine marche, bras naturels le long du corps.
> Tenue : [décris la pièce, la matière et les chaussures]
>
> Cadrage strict, identique à chaque génération :
> - corps entier visible, pieds compris
> - 8 % d'air au-dessus de la tête, 4 % sous les pieds
> - objectif 85 mm, hauteur de caméra à mi-corps, aucune contre-plongée
> - lumière studio frontale, douce, sans ombre projetée
>
> Rendu photographique, netteté élevée, aucun texte, aucun logo, aucun accessoire de studio dans le cadre.

*Génère la première image, valide le cadrage, puis réutilise-la comme référence pour les suivantes en ne changeant que la tenue. C'est la façon la plus simple de tenir la cohérence sur l'ensemble des visuels. Nomme tes fichiers dans l'ordre (01, 02, 03...), car le brief les classe par ordre alphabétique.*

*Tu ne veux pas générer d'images toi-même ? Le brief prévoit ce cas de figure : sans média, le site se construit quand même, avec des silhouettes en aplat de couleur qui se comportent exactement comme des clips vidéo. Tu les remplaces plus tard, sans toucher au code.*

---

## 04 — Étape 2 : animer, puis alléger

**Durée :** 25 min
**Tu produis :** des .mp4 H.264, yuv420p, faststart, sans piste audio
**Le piège à éviter :** un plan qui zoome ou déplace la caméra. Ce mouvement se cumule avec la perspective du couloir et provoque une sensation désagréable pour l'utilisateur.

Passe chaque image dans un modèle image vers vidéo (Veo, Kling, Runway, au choix) avec une consigne minimale : le mannequin marche vers la caméra, celle-ci ne bouge pas, le fond reste blanc, cinq secondes, boucle propre. Rien de plus. Plus tu demandes d'effets supplémentaires, plus le fond dérive et plus le cadrage devient visible.

**Prompt à copier — image vers vidéo :**
> Anime cette image : le mannequin marche lentement vers la caméra, démarche naturelle, tissu qui suit le mouvement.
>
> Caméra totalement fixe, aucun zoom, aucun travelling, aucun changement de cadrage.
> Fond blanc pur, constant, sans ombre au sol.
> Durée 5 secondes, mouvement en boucle, sans son.

*Ensuite, huit vidéos qui tournent simultanément, ça se paie en performance. Réduis le côté long à 900 px et supprime l'audio avec cette commande :*
```
ffmpeg -i clip.mp4 -c:v libx264 -pix_fmt yuv420p -movflags +faststart -an -vf "scale='if(gt(iw,ih),900,-2)':'if(gt(iw,ih),-2,900)'" clip-web.mp4
```

---

## 05 — Étape 3 : briefer

**Durée :** 5 min
**Tu produis :** le fichier .md collé, plus une consigne de cadrage
**Le piège à éviter :** décrire le rendu attendu avec de simples adjectifs. « Élégant », « fluide », « premium » ne produisent absolument rien de concret pour l'IA.

C'est le vrai cœur de ce guide. Un brief efficace ne décrit pas une ambiance vague, il décrit des chiffres précis et des règles de fermeture claires. Le fichier technique donne les coordonnées exactes du chemin, la formule d'échelle, la durée d'un pas, le comportement au survol, la manière de fermer la fiche produit. Il ne reste presque rien à deviner, donc presque rien à rater.

**Prompt à copier — message de lancement :**
> Tu es développeur front. Construis exactement ce qui est décrit dans le fichier joint, sans rien ajouter et sans rien retirer.
>
> Contraintes non négociables :
> - un seul fichier index.html, CSS et JS en ligne, aucune dépendance externe
> - les vidéos du dossier deviennent les mannequins, dans l'ordre alphabétique
> - respect au chiffre près des tableaux techniques du brief
> - si une vidéo manque, aplat de couleur qui se comporte comme un clip
>
> Avant d'écrire une ligne, liste-moi les 10 points de la checklist finale et dis-moi comment tu comptes valider chacun. Ensuite seulement, écris le fichier.

*Cette dernière phrase change tout : elle force l'agent à définir ses propres critères de réussite avant même de coder. Il triche beaucoup moins de cette façon.*

---

## 06 — Étape 4 : recetter

**Durée :** 30 min
**Tu produis :** une page qui passe la checklist du brief
**Le piège à éviter :** envoyer cinq corrections dans le même message. L'agent n'en traite souvent que deux, et casse au passage une troisième chose qui fonctionnait déjà.

Ouvre la page et vérifie quatre points, dans cet ordre : la boucle se referme-t-elle sans saut visible, la page remplit-elle bien la fenêtre sans bande blanche lors du redimensionnement, le survol fige-t-il correctement tout le couloir, et le retour navigateur ferme-t-il bien la fiche produit. Ce sont les quatre endroits où ça casse le plus souvent.

Et quand ça casse, ne réécris pas tout — isole le problème :

**Prompt à copier — correction ciblée :**
> Un seul problème à corriger, ne touche à rien d'autre :
>
> [décris ce que tu vois, puis ce que tu devrais voir]
>
> Donne-moi d'abord la cause probable en deux phrases. Puis le patch minimal. Ne refactorise pas, ne renomme rien, ne "améliore" rien au passage. Si ta correction touche plus de 15 lignes, arrête-toi et explique-moi pourquoi avant d'écrire.

*Ce plafond de quinze lignes est l'un des meilleurs garde-fous qui existent sur un fichier unique. Sans lui, l'agent a tendance à réécrire toute la page à chaque tour, et tu perds ce qui fonctionnait déjà.*

---

## 07 — Étape 5 : publier et décliner

**Durée :** 15 min
**Tu produis :** une URL, et une deuxième version à ton propre nom
**Le piège à éviter :** s'arrêter à la version démo. C'est joli, mais ça ne vend rien en soi.

Un fichier unique se met en ligne partout en trente secondes. Passe ensuite à la vraie version : le même couloir, mais avec tes propres clips. Cinq extraits de conférence, cinq formats de contenu, cinq offres commerciales. Le clic n'ouvre plus une simple fiche produit, mais une véritable page de vente. Tu viens de te fabriquer un portfolio que personne d'autre ne possède.

**Prompt à copier — déclinaison :**
> Reprends exactement le même moteur (chemin, échelles, survol, fiche centrée, fermeture au retour navigateur) et remplace uniquement la couche contenu :
>
> - domaine : [ton métier]
> - ce que représente chaque silhouette : [ex. une offre, un format, une étude de cas]
> - ce que remplace le panneau gauche : [titre + description]
> - ce que remplace le panneau droit : [ex. durée, format, prix, bouton]
>
> Ne modifie ni la géométrie ni la logique d'animation. Rends-moi la liste des lignes que tu as changées.

---

## Le test qui valide

Ouvre la page sur ton téléphone, en 4G, devant quelqu'un qui ne sait pas ce que tu as fait. S'il attrape spontanément le téléphone pour cliquer sur un mannequin, c'est réussi. S'il te demande comment tu as fait, c'est gagné.

---

## Questions fréquentes

**Il faut savoir coder ?**
Non. Il faut savoir lire une checklist et refuser une sortie approximative. Le brief technique contient déjà toute la partie complexe.

**Et si je n'ai aucune vidéo ?**
Le brief prévoit un mode de repli : des silhouettes en aplat de couleur qui bougent, réagissent au survol et s'ouvrent au clic comme de vraies vidéos. Tu les remplaces plus tard, sans toucher au code.

**Ça marche avec quel outil ?**
N'importe quel agent capable d'écrire un fichier complet : Claude, Cursor, Lovable, Codex. Le résultat dépend avant tout de la qualité du brief, pas de l'outil utilisé.

---

## À retenir

**Un brief précis vaut dix prompts inspirés.**

Ce qui produit ce site, ce n'est pas une phrase magique. C'est un document de 263 lignes qui ne laisse aucune place à l'interprétation. Prends l'habitude : avant de demander quoi que ce soit de sérieux à une IA, rédige d'abord le fichier de spécification complet. Tu passeras vingt minutes de plus au démarrage, mais tu économiseras trois heures d'allers-retours inutiles.
