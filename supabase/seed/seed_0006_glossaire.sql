-- Seed: glossaire (8 termes, identiques pour tous les métiers)
-- Généré à partir de restructuration-chemins-glossaire-AI-WORK-KIT.md

insert into glossaire (terme, definition, ordre) values ($g$Prompt$g$, $g$Le message complet que tu envoies à l'IA. C'est simplement ta demande, écrite en langage naturel.$g$, 1);
insert into glossaire (terme, definition, ordre) values ($g$Rôle$g$, $g$Qui tu demandes à l'IA d'incarner pour cette tâche. Exemple : "Tu es un assistant comptable" oriente ses réponses différemment que "Tu es un community manager".$g$, 2);
insert into glossaire (terme, definition, ordre) values ($g$Contexte$g$, $g$Les informations de fond dont l'IA a besoin pour comprendre ta situation avant de répondre : qui tu es, dans quelle entreprise, quelle situation précise.$g$, 3);
insert into glossaire (terme, definition, ordre) values ($g$Entrée$g$, $g$Ce que tu donnes concrètement à l'IA pour qu'elle travaille : un texte à corriger, une liste de chiffres, un email à trier, une transcription à résumer.$g$, 4);
insert into glossaire (terme, definition, ordre) values ($g$Instruction$g$, $g$L'action précise que tu demandes à l'IA d'exécuter. Plus elle est claire et détaillée, plus le résultat est fiable.$g$, 5);
insert into glossaire (terme, definition, ordre) values ($g$Format de sortie$g$, $g$La forme que tu veux pour le résultat : un tableau, une liste, un email complet, un texte de 100 mots maximum, en français informel ou soutenu.$g$, 6);
insert into glossaire (terme, definition, ordre) values ($g$Raisonnement (étapes de raisonnement)$g$, $g$Quand tu demandes à l'IA de réfléchir étape par étape avant de donner sa réponse finale, plutôt que de répondre d'un bloc. Utile sur les tâches qui demandent d'analyser ou de comparer plusieurs éléments.$g$, 7);
insert into glossaire (terme, definition, ordre) values ($g$Sortie$g$, $g$Le résultat final que l'IA te renvoie, dans le format que tu as demandé.$g$, 8);
