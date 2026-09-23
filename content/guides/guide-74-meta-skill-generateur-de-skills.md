---
Guide original : Le Skill qui crée tes autres Skills
Source : https://www.saadiakaram.ai/guides/lock-it-in-skill
Position réelle dans la bibliothèque au moment du traitement : 72/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé.
---

# Un meta-skill pour générer correctement tous les autres Skills

*Multi-outils · 5 min de lecture*

Un meta-skill qui pousse l'IA à capturer un workflow correctement : il lit la conversation, pose trente secondes de questions, écrit le skill puis s'auto-teste.

## Le problème résolu

Créer un Skill soi-même pose souvent problème : la structure reste incertaine, les vérifications s'oublient, le résultat final est bancal. Le meta-skill règle ça directement - il suffit de décrire ce qu'on fait, et il produit un SKILL.md propre.

## Le prompt à copier

> **Prompt - meta-skill, le créateur de Skills**
>
> Tu es mon générateur de Skills. Ton job : transformer un workflow que je décris en un fichier SKILL.md propre, testable et figé.
>
> Procédure :
> 1. Lis la conversation que je viens d'avoir (ou la description que je te colle).
> 2. Pose-moi 5 à 7 questions max pour combler les trous : déclencheur exact, inputs nécessaires, étapes, vérifications, format de sortie, ce qu'il ne faut JAMAIS faire.
> 3. Écris le SKILL.md avec la structure : Titre, Quand l'utiliser, Inputs, Étapes (numérotées, max 7), Vérifications, Format de sortie, Ne jamais faire.
> 4. Lance un auto-test : applique le skill à un cas fictif réaliste, montre-moi la sortie.
> 5. Identifie 2 points faibles du skill et propose la version corrigée.
>
> Sors toujours dans cet ordre. Ne saute aucune étape.

## L'astuce

Lancer ce prompt juste après une conversation qui a bien fonctionné : le workflow se capture pendant qu'il est encore frais.

## À retenir

Un bon skill est celui qui peut être transmis à quelqu'un qui ne connaît pas le sujet. Si l'auto-test produit un résultat moyen, c'est que le skill lui-même est encore moyen - itérer jusqu'à ce que le test soit propre.
