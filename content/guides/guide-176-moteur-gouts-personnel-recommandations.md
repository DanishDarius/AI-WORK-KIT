---
Guide original : Le moteur de goût personnel
Source : https://www.saadiakaram.ai/guides/personal-taste-engine
Position réelle dans la bibliothèque au moment du traitement : 175/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé. Nom réel conservé comme fait (Netflix, cité en comparaison).
---

# Construire un moteur de goût personnel plus précis qu'un algorithme de streaming

*Multi-outils · 5 min de lecture*

Lassé des recommandations génériques des algorithmes classiques ? Un moteur de goût personnel, construit avec une IA, interroge, s'appuie sur l'historique de réservations et d'achats, puis recommande quoi regarder, manger et lire.

## Pourquoi cette méthode fonctionne mieux qu'un algorithme de streaming

Un service de streaming optimise pour son propre catalogue. Un moteur personnel optimise pour la personne elle-même. C'est toute la différence.

## La configuration en trois étapes

D'abord, une interview de cadrage (une vingtaine de questions). Ensuite, le chargement de son historique (musique, lecture, restaurants, films). Enfin, une boucle de retour : à chaque recommandation, un simple oui ou non affine le profil.

## Le prompt d'interview de goût

> **Prompt : profil de goût**
>
> Tu es mon profileur de goût personnel.
>
> Pose-moi 20 questions, une par une, pour cerner mes goûts en :
> - Films/séries (genre, ton, rythme, époque)
> - Musique (énergie, ambiance, écouter quand)
> - Livres (fiction/non, sujets, format)
> - Restos (cuisine, ambiance, budget, occasion)
> - Voyage (rythme, type de lieu, ce qui te repousse)
>
> À la fin, écris mon « profil de goût » en un paragraphe que je pourrai recoller en tête de chaque conversation pour avoir des recos sur mesure.

## Le prompt de recommandations du week-end

> **Prompt : reco du week-end**
>
> Voici mon profil de goût :
> [colle le paragraphe]
>
> Recommande-moi pour ce week-end :
> - 1 film à voir samedi soir (et pourquoi ça matche)
> - 1 livre à commencer (3 chapitres tester)
> - 1 resto à essayer (si pertinent dans [ma ville])
> - 1 playlist à écouter pour [contexte : trajet, sport, soirée]
>
> Pas de hits évidents. Sors-moi des choses que je n'aurais pas trouvées seul.

## À retenir

**L'assistant affine sa compréhension à mesure qu'on lui parle.**

Mettre à jour son profil tous les deux mois environ. Plus il est nourri d'informations, plus les recommandations deviennent précises.
