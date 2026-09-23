---
Guide original : Claude peut te construire des outils
Source : https://www.saadiakaram.ai/guides/tool-prompts
Position réelle dans la bibliothèque au moment du traitement : 250/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). 2 sections FAQ collapsées détectées et dépliées, contenu capturé intégralement. Noms réels conservés (Claude, GitHub Pages, Vercel).
---

# Cinq prompts pour transformer Claude en fabricant d'outils sur mesure

*Claude · 5 min de lecture*

Claude peut construire de véritables petits outils utilisables (sous forme d'Artifact ou de mini-application) et pas seulement produire des analyses ou des résumés. La plupart des utilisateurs s'arrêtent à la conversation classique, alors qu'il est possible d'aller nettement plus loin avec cinq prompts bien construits.

## Pourquoi les démonstrations génériques ne servent à rien

Les démonstrations habituelles (calculatrice de pourboire, liste de tâches) restent visuellement convaincantes mais peu utiles au quotidien. L'intérêt réel se trouve dans des outils qui résolvent un besoin précis d'un métier donné : un calculateur de marge selon la TVA, un générateur de devis, un planificateur de contenu, ou un suivi d'habitudes très personnalisé.

## Les cinq prompts à utiliser

> **Prompt 1 : le diagnostic**
>
> Liste 5 micro-tâches que je fais à la main chaque semaine et qui prennent moins de 10 minutes chacune, mais que je répète. Pour chacune, dis-moi si un Artifact HTML interactif pourrait la remplacer en un clic, et pourquoi.
>
> Mon contexte : [ton métier, tes outils actuels]

> **Prompt 2 : le brief outil**
>
> Construis-moi un Artifact HTML / JS interactif qui fait exactement ceci :
>
> - Entrée : [décris les champs]
> - Calcul : [décris la logique]
> - Sortie : [décris le format]
>
> Contraintes : minimal, lisible sur mobile, sans dépendance externe. Stocke les données en localStorage. Donne-moi le code complet en un seul fichier.

> **Prompt 3 : le test à blanc**
>
> Avant de me sortir l'Artifact, simule 3 cas d'usage avec des données réalistes. Montre-moi les sorties attendues. Si une logique cloche, corrige le brief avant de coder.

> **Prompt 4 : l'itération**
>
> Voici comment je viens d'utiliser ton outil. Voici ce qui m'a manqué : [décris]. Corrige et ressors une v2, en gardant tout ce qui marchait déjà.

> **Prompt 5 : le partage**
>
> Refais l'outil en version « partageable » : ajoute un titre, un mode d'emploi de 3 lignes en haut, et un bouton « réinitialiser ». Le but : que je puisse le donner à un collègue qui n'a jamais vu Claude.

## Le garde-fou

Un outil réellement utile est un outil rouvert la semaine suivante. S'il n'est jamais rouvert, c'est qu'il était esthétiquement réussi mais pas réellement utile ; dans ce cas, mieux vaut recommencer le diagnostic.

## Questions fréquentes

**Faut-il savoir coder ?**

Non. Claude s'occupe du code, l'utilisateur fournit le brief. Savoir lire un minimum de HTML aide toutefois à corriger plus rapidement.

**Où ces outils sont-ils hébergés ?**

Dans le panneau Artifact de Claude. Le code peut aussi être exporté et hébergé gratuitement sur GitHub Pages ou Vercel.

## À retenir

**Construire un outil par semaine pendant quatre semaines.**

Une grande partie des processus internes d'un métier peut se transformer en mini-application. Avec le temps, l'entourage professionnel commence à demander des outils plutôt que de simples conseils.
