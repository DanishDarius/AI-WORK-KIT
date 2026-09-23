---
Guide original : Pourquoi ton Skill Claude ne marche pas
Source : https://www.saadiakaram.ai/guides/fix-your-skills
Position réelle dans la bibliothèque au moment du traitement : 106/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé.
---

# Pourquoi un Skill ne se déclenche pas, et comment le corriger

*Claude · 5 min de lecture*

Le problème n'est souvent pas le Skill lui-même, c'est son déclencheur. Où ça casse, et comment corriger rapidement.

## Le vrai coupable

Quand un Skill ne se déclenche pas, le contenu du Skill lui-même est correct neuf fois sur dix. C'est le déclencheur qui manque de clarté.

## Les trois bugs les plus fréquents

**Description trop vague.** « Aide-moi à écrire » ne permet pas de savoir quand activer le Skill. Mieux vaut être ultra spécifique : « Active-toi quand l'utilisateur demande un post LinkedIn de plus de 200 mots. »

**Conflits entre Skills.** Deux Skills se réveillent sur les mêmes mots-clés. Le plus récent l'emporte, l'autre échoue silencieusement.

**Absence d'exemple de déclenchement.** Sans deux ou trois exemples concrets dans le fichier du Skill, l'assistant hésite et finit par passer à côté.

## Le prompt à copier

> **Prompt - diagnostic de Skill**
>
> Voici mon Skill : [colle SKILL.md].
>
> Audite :
> 1. La description déclenche-t-elle clairement ? Reformule si flou.
> 2. Donne 5 phrases utilisateur qui DEVRAIENT activer ce Skill.
> 3. Donne 3 phrases qui semblent proches mais NE DEVRAIENT PAS l'activer.
> 4. Repère les conflits possibles avec mes autres Skills installés.
>
> Sortie : version corrigée du SKILL.md.

## À retenir

Un Skill, un déclencheur clair. Plus le déclencheur est précis, plus le Skill devient fiable - jamais l'inverse.
