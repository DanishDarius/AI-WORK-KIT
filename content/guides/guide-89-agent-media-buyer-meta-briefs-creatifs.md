---
Guide original : L'agent media buyer Meta
Source : https://www.saadiakaram.ai/guides/meta-media-buyer-agent
Position réelle dans la bibliothèque au moment du traitement : 87/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé.
---

# Un agent IA pour piloter la création publicitaire sur Meta

*Multi-outils · 5 min de lecture*

Un agent dédié aux publicités Meta : il surveille le compte, analyse les créations des concurrents, rédige les briefs créatifs et reste en pause par défaut pour la sécurité.

## Un avantage propre à Meta

Un agent dédié aux publicités Meta dispose d'un atout que Google n'offre pas : les données créatives des concurrents sont publiques. Il peut analyser leur bibliothèque publicitaire, repérer les formats qui durent, et produire des briefs créatifs solides chaque semaine.

## Ce qu'il fait

Surveille le compte : coût par acquisition par campagne, plafond de fréquence, chevauchement d'audience. Analyse la bibliothèque publicitaire de cinq concurrents définis. Repère les angles créatifs qui durent (un angle qui tient plus de quatre semaines est un signal de réussite). Rédige trois briefs créatifs avec accroche, corps de texte et appel à l'action. Reste en pause par défaut côté mise en œuvre.

## Le prompt à copier

> **Prompt : brief agent Meta**
>
> Tu es mon media buyer Meta, focus créa.
>
> Contexte :
> - Marque : [...]
> - Pays : [...]
> - Concurrents à scanner dans la bibliothèque publicitaire : [liste de 5]
> - Audience principale : [profil]
> - Offre actuelle : [...]
>
> Chaque semaine, livre :
> 1. Santé du compte : CPA par campagne, frequency cap dépassée OUI/NON, audience overlap > 30 % entre quels adsets.
> 2. Scan concurrence : 5 publicités qui tournent depuis 4+ semaines chez les concurrents. Pour chacune : hook, structure, angle, ce qu'on peut s'inspirer.
> 3. 3 briefs créa pour la semaine prochaine : hook (10 mots max), body, CTA, format vidéo / statique.
> 4. Décisions en attente : ce que je dois trancher, pas plus de 3 par semaine.
>
> Règle absolue : tu NE LANCES JAMAIS une campagne. Tu prépares. Je valide.

## Ce qu'il faut mesurer en priorité

Suivre le taux d'accroche (les trois premières secondes) avant le coût par acquisition. Une accroche ratée plombe le CPA dès le lancement.

## À retenir

Sur Meta, la performance dépend à 80 % de la création publicitaire. Un agent qui aide à itérer dessus vaut largement l'investissement. Produire trois nouvelles créations par semaine pendant trois mois : c'est souvent ce qui fait passer un compte d'un plateau à une vraie montée en puissance.
