---
Guide original : Le site gratuit qui sauve tes UI de la bouillie
Source : https://www.saadiakaram.ai/guides/21st-dev-components
Position réelle dans la bibliothèque au moment du traitement : 199/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé. Noms réels conservés comme faits (21st.dev, Claude, Cursor, Claude Code, React, Tailwind). Valeurs techniques du prompt (placeholder couleur hex) conservées inchangées.
---

# Une bibliothèque de composants gratuite pour des interfaces générées par IA vraiment propres

*Multi-outils · 5 min de lecture*

Les interfaces générées par IA ressemblent souvent à un résultat approximatif. C'est normal : les modèles de langage n'ont pas de goût esthétique propre, mais ils savent très bien recopier proprement quand on leur fournit du bon matériau de départ. 21st.dev propose justement une bibliothèque gratuite de composants d'interface prêts à intégrer.

## Pourquoi cette approche change tout

Plutôt que de demander directement « fais-moi une landing page », il est plus efficace de piocher quatre composants déjà bien conçus (en-tête, tarification, FAQ, pied de page), de les coller, puis de demander à l'assistant de les adapter au produit concerné. Résultat : une interface propre dès le premier essai, sans avoir à reformuler sans cesse des demandes sur le CSS.

## Le workflow en quatre temps

1. Choisir ses composants sur 21st.dev et copier le code correspondant.
2. Ouvrir Claude (ou Cursor) avec le projet concerné.
3. Coller le code et fournir le contexte produit.
4. Demander des micro-ajustements ciblés, jamais une refonte complète.

## Le prompt d'adaptation d'un composant

> **Prompt : adapter un composant**
>
> Voici un composant React/Tailwind que je veux intégrer :
>
> [COLLE LE CODE 21st.dev]
>
> Mon contexte produit :
> - Nom : [nom]
> - Cible : [persona]
> - Promesse en 1 phrase : [promesse]
> - Couleur principale : [hex]
>
> Adapte le composant :
> 1. Remplace tous les textes par du copy réel pour mon produit
> 2. Garde la structure et le style intacts
> 3. Adapte uniquement la couleur principale
> 4. N'ajoute aucune dépendance
>
> Renvoie uniquement le code final, prêt à coller.

## Le piège à éviter

Si l'assistant est laissé libre d'« améliorer le design », il finit souvent par casser la structure du composant. Mieux vaut être précis : « n'ajoute rien, n'enlève rien, remplace juste le texte. »

## À retenir

**Le goût se construit en réutilisant, pas en improvisant à chaque fois.**

Se constituer une bibliothèque personnelle d'une dizaine de composants jugés réussis, et les réutiliser sur l'ensemble de ses projets. C'est de là que vient la cohérence visuelle durable.
