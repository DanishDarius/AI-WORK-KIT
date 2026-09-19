---
Guide original : La matrice de décision
Source : https://www.saadiakaram.ai/guides/decision-matrix
Position réelle dans la bibliothèque au moment du traitement : 273/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé. Guide à 3 prompts, reproduits avec leur structure fonctionnelle complète. Réutilise le concept d'« avocat du diable » du guide 273 dans une étape dédiée — reformulation propre, sans reprise verbatim du guide 273. Nom réel conservé (Claude).
---

# Construire une matrice de décision pondérée pour trancher entre deux options

*Multi-outils · 7 min de lecture*

Hésiter entre deux emplois, deux villes ou deux accords pendant plusieurs semaines est fréquent. Une matrice de décision permet de trancher en une vingtaine de minutes, données à l'appui, en limitant l'effet des biais personnels.

## Pourquoi le blocage persiste

Le blocage vient souvent d'une comparaison d'éléments incomparables entre eux, comme le salaire face à l'ambiance de travail. Tant que les critères ne sont pas pondérés les uns par rapport aux autres, le choix final tend à privilégier ce qui rassure plutôt que ce qui est réellement le plus pertinent.

## Les quatre étapes

1. Lister cinq à sept critères qui comptent réellement — pas une quinzaine.
2. Pondérer chaque critère sur 100 (la somme des poids devant atteindre 100).
3. Noter chaque option sur chaque critère, de 0 à 10.
4. Calculer le résultat et le lire sans le contourner.

## Le prompt de construction de la matrice

> **Prompt — matrice de décision**
>
> Tu es un coach de décision. Tu ne valides pas mon avis, tu m'aides à voir clair.
>
> DÉCISION : [décris en 3 lignes]
> OPTIONS : [Option A, Option B, (Option C)]
>
> ÉTAPE 1 : Pose-moi 5 questions pour identifier les vrais critères (pas les apparents).
> ÉTAPE 2 : Une fois mes réponses reçues, propose 5-7 critères et leur pondération sur 100. Justifie.
> ÉTAPE 3 : Demande-moi de noter chaque option sur chaque critère (0-10).
> ÉTAPE 4 : Calcule. Donne le gagnant ET l'écart. Si l'écart est < 10 %, dis-moi quel critère pourrait basculer le résultat.
> ÉTAPE 5 : Dis-moi quel biais a pesé sur mes notes.

## Transformer la matrice en outil interactif

Un tableau statique fonctionne, mais une version où les pondérations se déplacent et où le classement change en temps réel permet de tester différents scénarios et de mieux comprendre ce qui fait réellement basculer la décision.

> **Prompt — matrice interactive**
>
> Transforme ma matrice de décision en outil interactif.
>
> CONTEXTE : [décision + options + critères + pondérations + scores]
>
> CRÉE UN ARTIFACT / PAGE HTML INTERACTIVE avec :
> - Un tableau avec les options en colonnes et les critères en lignes.
> - Des curseurs pour modifier le poids de chaque critère (0-100, total ajusté dynamiquement).
> - Des champs pour modifier les notes (0-10) de chaque option sur chaque critère.
> - Un score total automatique par option, mis à jour en temps réel.
> - Un graphique visuel (barres ou radar) qui montre le classement.
> - Une zone "seuil de bascule" : quel poids minimal sur quel critère ferait changer le gagnant ?
>
> CONTRAINTES :
> - Pas de code externe à installer.
> - Design épuré, couleurs sobres.
> - Export possible en Markdown ou copie du tableau final.

## Mettre le résultat gagnant à l'épreuve

Une fois la matrice tranchée, il reste utile de soumettre le résultat obtenu à un examen critique avant de s'y engager définitivement. Le meilleur choix selon les critères retenus n'est pas nécessairement le bon choix si ces critères eux-mêmes sont biaisés.

> **Prompt — mise à l'épreuve du résultat**
>
> Tu es l'avocat du diable. Tu ne défends pas mes intérêts. Tu démontes le choix que ma matrice de décision a désigné comme gagnant.
>
> RÉSULTAT DE LA MATRICE :
> - Décision : [décision]
> - Gagnant : [option gagnante]
> - Score total : [score]
> - Écart avec le deuxième : [écart]
> - Critères et pondérations : [liste]
>
> MISSION : Attaque ce résultat sur 5 axes, sans complaisance :
> 1. Critères oubliés : qu'est-ce que ma matrice n'a pas mesuré et qui pourrait tout changer ?
> 2. Poids biaisés : quelle pondération, si elle était plus juste, ferait perdre le gagnant ?
> 3. Données fragiles : sur quels scores mon jugement était le plus incertain ?
> 4. Effet de contexte : dans quel scénario réaliste le gagnant devient un perdant ?
> 5. Coût du renoncement : qu'est-ce que je sacrifie en écartant la deuxième option ?
>
> TERMINE PAR : une seule question que je refuse de me poser et qui pourrait invalider toute la matrice.

## À retenir

**Un malaise face au résultat de la matrice est en soi une information.**

Lorsque le calcul désigne une option alors que l'instinct penche vers une autre, cette seconde option mérite d'être reconsidérée sérieusement. La matrice ne fait pas que trancher : elle révèle aussi ce que l'intuition savait déjà.
