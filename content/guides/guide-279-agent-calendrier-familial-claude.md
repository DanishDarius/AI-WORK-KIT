---
Guide original : L'organisateur du calendrier familial
Source : https://www.saadiakaram.ai/guides/family-calendar
Position réelle dans la bibliothèque au moment du traitement : 278/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé. Distinct du guide 275 (reset du dimanche personnel, six blocs individuels) : celui-ci porte spécifiquement sur la coordination familiale multi-agendas, vérifié et confirmé distinct. Nom réel conservé (Claude).
---

# Un agent Claude pour coordonner le calendrier de toute la famille

*Multi-outils · 5 min de lecture*

Réaliser en plein milieu de semaine que personne n'a prévu les courses, qu'un rendez-vous médical approche et qu'un anniversaire arrive dans quelques jours est une situation courante. Un agent dédié au calendrier familial permet d'éviter ce type de désorganisation, pour une mise en place d'une vingtaine de minutes suivie d'un rituel hebdomadaire simple.

## Ce que l'agent fait, et ce qu'il ne fait pas

Il centralise les événements, anticipe la semaine à venir, propose un planning combinant courses, repas et logistique, et signale les conflits d'agenda. En revanche, il ne décide pas à la place des membres de la famille de ce qui compte réellement — cette part reste humaine.

## Le prompt de reset dominical familial

> **Prompt — calendrier famille**
>
> Tu es l'ops manager de notre famille. Direct, pas de blabla.
>
> CONTEXTE FIXE :
> - Adultes : [prénoms + horaires de travail]
> - Enfants : [prénoms + âges + activités fixes]
> - Contraintes récurrentes : [ex : pas de courses le samedi, papa rentre tard le jeudi]
>
> CETTE SEMAINE (du [date] au [date]) :
> - Événements connus : [liste]
> - Rendez-vous médicaux : [liste]
> - Anniversaires / fêtes : [liste]
> - Voyages / absences : [liste]
>
> SORS :
> 1. Vue semaine, jour par jour, avec qui fait quoi
> 2. Liste de courses unique pour la semaine (par rayon)
> 3. Plan repas (7 dîners simples, max 25 min)
> 4. Les 3 conflits potentiels et comment les résoudre
> 5. La seule chose qui peut tout faire dérailler — anticipe-la

## À retenir

**Le rituel du dimanche soir en famille.**

Quinze minutes suffisent pour que l'agent prenne en charge la majeure partie de la charge mentale de planification. Moins une optimisation qu'un véritable soulagement pour la semaine à venir.
