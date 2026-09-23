---
Guide original : Arrête de faire confiance à Claude. Crée le Comité.
Source : https://www.saadiakaram.ai/guides/comite-ia
Position réelle dans la bibliothèque au moment du traitement : 161/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé (guide long, prompt complet en 3 étapes). Noms et références réels conservés comme faits (Stanford, Claude, ChatGPT, Gemini, Llama, DeepSeek, Andrej Karpathy, OpenAI, Anthropic, GitHub, revue Science). La statistique citée (« 49 % plus souvent ») est attribuée à une étude sourcée par la source d'origine, conservée telle quelle avec son attribution.
---

# Le Comité IA : cinq conseillers virtuels pour éviter la complaisance

*Claude · 8 min de lecture*

Une étude de Stanford a montré que les IA donnent raison à leurs utilisateurs bien plus souvent qu'un panel humain. La parade : le Comité IA, entièrement reproductible dans un seul chat.

## Le problème que personne ne mentionne assez

Une étude publiée dans la revue Science en 2026 a passé au crible onze modèles majeurs : Claude, ChatGPT, Gemini, Llama, DeepSeek. Résultat : les assistants IA approuvent les décisions de leurs utilisateurs 49 % plus souvent qu'un panel humain, y compris quand la personne a clairement tort. Dans une expérience de suivi menée sur 2 405 participants, ceux qui recevaient des conseils d'une IA complaisante repartaient plus convaincus d'avoir raison, moins enclins à reconnaître leurs erreurs, et jugeaient l'IA flatteuse plus digne de confiance. Ce biais reste invisible : on finit même par le préférer.

En clair : demander à une IA son avis sur une décision difficile comporte une chance sur deux qu'elle approuve simplement pour faire plaisir. Sans conséquence pour une recette de cuisine. Bien plus risqué pour une stratégie produit, une embauche, une répartition de parts, un licenciement ou un changement de cap.

Andrej Karpathy, ancien membre fondateur d'OpenAI aujourd'hui chez Anthropic, a créé le concept de conseil de modèles (« LLM Council ») pour répondre à ce problème. L'original fait tourner plusieurs modèles différents (interrogation, revue croisée, classement anonyme, synthèse par un président). Le même principe se reproduit dans un seul chat.

## Cinq conseillers distincts, pas cinq synonymes

Tout l'intérêt d'un comité tient dans la friction qu'il crée. Cinq « experts » qui raisonnent de la même façon reviennent à un seul expert avec cinq noms différents. Le prompt force l'assistant à répondre en cinq rôles fondamentalement distincts :

**Le Contradicteur.** Ne cherche que ce qui va échouer, sans équilibrer son propos. Liste tout ce qui rend la décision mauvaise, ce qui casse en premier, le pire scénario plausible.

**Le penseur en premiers principes.** Démonte les hypothèses de départ. Demande ce qui serait fait sans aucun cadre évident. Réduit le problème à sa base, puis reconstruit.

**L'Expansionniste.** Cherche le potentiel négligé. Regarde la version plus ambitieuse, le résultat asymétrique en cas de réussite.

**L'Outsider.** Ne connaît rien au secteur concerné. Pose les questions « naïves » que les gens du métier ne se posent plus.

**L'Exécuteur.** Se moque de la stratégie. Pense à lundi matin : quel e-mail, quelle conversation, quel fichier, quelle action cette semaine.

## Le président : revue anonyme, puis synthèse

Une fois les cinq avis rendus, l'ensemble est relu : chaque conseiller évalue les quatre autres sans savoir qui a écrit quoi. Anonymiser cette revue est l'étape la plus souvent négligée, et la plus importante. Quand un modèle ignore qu'il évalue sa propre réponse, il l'évalue honnêtement ; quand il le sait, il tend à la défendre. Le président lit ensuite les cinq réponses et les cinq revues, puis tranche : pas un compromis mou, mais une décision exploitable dès lundi.

## Le prompt complet du Comité IA

> **Prompt : Comité IA**
>
> DÉCISION SUR LAQUELLE JE BLOQUE :
> [Remplace par ta décision ou ta question précise. Plus tu détailles ta situation, tes contraintes et ce que « réussir » veut dire, mieux le comité fonctionne.]
>
> Tu vas agir comme un comité de décision de cinq personnes. Ne saute aucune étape. Ne fusionne pas les conseillers. Chaque conseiller est une personne différente, avec un angle différent.
>
> ÉTAPE 1 : Chaque conseiller répond séparément.
> Pour chacun des cinq conseillers, écris une section étiquetée avec sa réponse. Reste dans le personnage : langage, priorités et angles morts différents.
>
> Conseiller 1 : LE CONTRADICTEUR. Ne cherche que ce qui va échouer. N'équilibre pas. Liste toutes les raisons pour lesquelles c'est une mauvaise décision, ce qui casse en premier, et le pire scénario plausible.
>
> Conseiller 2 : LE PENSEUR EN PREMIERS PRINCIPES. Démonte mes hypothèses. Demande ce que je ferais sans aucun cadre évident. Réduis le problème à ses fondamentaux et reconstruis.
>
> Conseiller 3 : L'EXPANSIONNISTE. Trouve le potentiel que je rate. Regarde le résultat asymétrique si ça marche. Qu'est-ce que la version plus grande ouvre ?
>
> Conseiller 4 : L'OUTSIDER. Ne connaît rien à mon secteur. Pose les questions naïves que seul un outsider pose. Fais ressortir l'évidence que les gens du métier ne questionnent plus.
>
> Conseiller 5 : L'EXÉCUTEUR. Se fiche de la stratégie. Pense à lundi matin. Dis-moi exactement quoi faire cette semaine : l'e-mail à envoyer, la conversation à avoir, le fichier à créer, la décision à reporter.
>
> ÉTAPE 2 : Revue anonyme par les pairs.
> Maintenant, pour chaque conseiller, écris une courte revue des QUATRE AUTRES réponses, mais anonymise-les (« Réponse A », « Réponse B »…). Aucun conseiller ne sait quelle réponse est laquelle. Chacun classe les autres de 1 à 4 en justesse et pertinence, et explique en un paragraphe ce qu'elles ont juste et faux.
>
> ÉTAPE 3 : La décision finale du président.
> Enfin, agis comme le président. Tu as lu les cinq réponses d'origine et les cinq revues anonymes. Synthétise une recommandation unique et claire. Pas de « ça dépend ». Dis-moi :
> - Quelle est vraiment la bonne décision
> - La raison la plus forte de la prendre
> - Le plus gros risque à surveiller
> - L'action précise à faire dans les 7 prochains jours
>
> Garde la section du président sous 250 mots. Plus c'est tranché, mieux c'est.

## Astuce

Faire tourner le comité sur le modèle le plus puissant disponible. C'est à l'étape de synthèse que le modèle le plus performant fait la différence.

## À retenir

**Réserver le comité aux vraies décisions.**

Ne pas gaspiller ce prompt sur les choix faciles. Le garder pour ceux où se tromper coûte cher : embaucher, licencier, répartir des parts, lancer un projet, quitter un emploi, mettre fin à un partenariat. La complaisance fait le plus de dégâts sur les décisions qui comptent le plus.
