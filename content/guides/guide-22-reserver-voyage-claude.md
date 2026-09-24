---
Guide original : "Claude réserve ton voyage"
Source : saadiakaram.ai/guides/claude-reserve-ton-voyage
Statut : reformulé (texte) : aucun visuel/tableau HTML détecté sur cette page
---

# Faire réserver votre voyage par Claude, sans jamais lui confier votre carte bancaire

*Claude · 6 min de lecture*

## Sommaire

- Introduction
- Le problème dont personne ne vous parle
- Les deux méthodes qui fonctionnent réellement
- Les 3 prompts (copier-coller)
- L'astuce de pro
- Quand s'en servir, et quand surtout pas

## Introduction

Le workflow concret : Claude compare les options, remplit toutes les informations, et s'arrête pile avant l'écran de paiement. Deux méthodes vérifiées (les connecteurs Expedia/Booking et Claude for Chrome) accompagnées de 3 prompts prêts à l'emploi.

Sources citées dans le guide original : Expedia dans Claude (connecteur), Booking.com dans Claude, Claude for Chrome (Anthropic, page produit).

Tout le monde explique comment faire planifier un voyage par une IA. Peu de monde explique comment la faire réserver pour de vrai, sans lui donner accès à votre carte bancaire. C'est pourtant exactement là que ça se joue. Voici le workflow réel : Claude compare, remplit tout, avance jusqu'à l'écran de paiement, puis s'arrête. Le seul geste qui vous reste, c'est de payer vous-même. Deux méthodes vérifiées, trois prompts prêts à coller.

---

## 01. Le problème dont personne ne vous parle

Une IA capable de réserver toute seule et de payer à votre place, ce n'est pas un rêve : c'est un risque. Le jour où vous donnez à un agent l'accès à votre moyen de paiement et le droit de cliquer sur « Acheter », vous devenez responsable de chacune de ses erreurs : la mauvaise date, le mauvais aéroport, le billet non remboursable réservé deux fois.

La réalité, c'est que les équipes qui construisent ces agents en sont parfaitement conscientes. Anthropic a conçu son extension Claude for Chrome avec une règle par défaut : Claude redemande systématiquement confirmation avant toute action à conséquence, comme valider un formulaire ou effectuer un achat. Il s'arrête avant le paiement. Ce n'est pas une limitation, c'est le bon réglage. Le vrai geste stratégique n'est pas de tout déléguer, mais de déléguer 95 % du travail tout en gardant le dernier clic pour soi. Vous restez aux commandes sur la seule étape qui engage votre argent.

Retenez cette règle avant même de lire les prompts : Claude s'occupe de la recherche, de la comparaison et de la saisie. Vous, vous vérifiez et vous payez. Jamais l'inverse.

---

## 02. Les deux méthodes qui fonctionnent réellement

**Méthode 1, la plus simple : les connecteurs de voyage, directement dans l'app Claude.** Depuis le 8 mai 2026, Claude se connecte à Expedia : vous décrivez votre voyage en langage naturel (« un aller-retour Paris-Lisbonne mi-octobre, hôtel en bord de mer sous 150 € la nuit ») et Claude vous renvoie de vraies options, avec prix et disponibilités en direct, issus d'Expedia dans la conversation. Pas besoin de compte Expedia ni de carte bancaire pour simplement chercher. Une fois une option choisie, Claude vous fournit le lien pour finaliser la réservation sur le site officiel : votre carte, vous ne la donnez qu'à Expedia, jamais à Claude. Des connecteurs Booking.com et lastminute.com fonctionnent sur le même principe. Précision utile : le connecteur Expedia s'est d'abord ouvert côté États-Unis et se déploie progressivement ailleurs. S'il n'est pas encore disponible chez vous, la méthode 2 ci-dessous ne dépend d'aucune zone géographique.

**Méthode 2, la plus poussée : Claude for Chrome effectue le parcours à votre place.** C'est l'extension navigateur d'Anthropic (en bêta, réservée aux offres payantes Pro, Max, Team, Enterprise, sur Google Chrome). Claude agit directement dans votre navigateur connecté : il ouvre les sites, compare d'un onglet à l'autre, sélectionne selon vos critères, pré-remplit les informations passager, puis s'arrête à l'écran de paiement. Vous relisez, vous confirmez, vous payez vous-même. Le réglage « demander confirmation avant un achat » reste activé en permanence.

---

## 03. Les 3 prompts

**Prompt 1. Le brief de voyage clé en main (à donner au connecteur ou à Claude) :**

Plus vous fournissez de contexte, meilleures seront les 3 options proposées. Collez ce brief dans Claude, avec le connecteur Expedia ou Booking activé.

> Tu es mon agent de voyage. Ne me noie pas sous 40 résultats, donne-moi les 3 meilleures options pour MOI, avec les vrais prix et la source de chaque prix.
>
> Le voyage :
> - Trajet : [Paris → Lisbonne], aller-retour
> - Dates : [flexibles autour du 12-16 octobre, 3 à 4 nuits]
> - Voyageurs : [1 adulte]
> - Budget total cible : [500 € vols + hôtel]
>
> Mes contraintes non négociables :
> - Vol : [pas d'escale de plus de 2h / pas de départ avant 8h / bagage cabine inclus]
> - Hôtel : [bien noté (8+/10), à moins de 20 min à pied du centre, annulation gratuite]
>
> Pour chacune des 3 options, donne-moi :
> 1. Le vol (horaires, compagnie, durée, bagages, prix) + le lien de réservation
> 2. L'hôtel (nom, note, emplacement, politique d'annulation, prix/nuit) + le lien
> 3. Le total chiffré et une phrase expliquant pourquoi cette option plutôt qu'une autre
>
> Cite le prix et sa source pour chaque ligne. Si une information manque, dis-le, ne l'invente pas. Ne réserve rien : je choisis d'abord.

**Prompt 2. Le pilote de réservation « stop avant paiement » (pour Claude for Chrome) :**

Une fois votre option choisie, vous laissez Claude exécuter les étapes, mais vous posez le garde-fou dès la première ligne.

> Objectif : préparer la réservation de l'option [numéro / résumé] que j'ai choisie, et t'arrêter juste avant le paiement.
>
> Marche à suivre :
> 1. Ouvre le site de réservation du lien que je t'ai donné.
> 2. Reconstitue exactement l'offre choisie (mêmes dates, mêmes horaires, même tarif). Si le prix ou la disponibilité a changé depuis, arrête-toi et préviens-moi.
> 3. Remplis les informations passager : [nom complet, date de naissance, e-mail, téléphone]. Sélectionne [bagage cabine / pas d'options payantes ajoutées].
> 4. Avance jusqu'à l'écran récapitulatif, juste avant le paiement.
>
> Règles absolues :
> - Tu ne saisis JAMAIS d'informations de carte bancaire.
> - Tu ne cliques JAMAIS sur « Payer » ni « Confirmer l'achat ».
> - Tu t'arrêtes à l'écran de paiement et tu me montres un récapitulatif : trajet, dates, prix total final, politique d'annulation. J'ai le dernier mot.

**Prompt 3. Le contrôle des 60 secondes avant de payer :**

Le prompt qui vous évite l'erreur coûteuse. Collez le récapitulatif que Claude vous présente, avant de sortir votre carte.

> Voici le récapitulatif de réservation avant paiement :
> [Collez ici tout l'écran : trajet, dates, horaires, prix, conditions.]
>
> Fais-moi la vérification finale en 5 points, sans complaisance :
> 1. LES DATES ET HORAIRES correspondent-ils exactement à ce que j'ai demandé ? Signale tout écart, même d'un jour ou d'un aéroport (ex. Beauvais vs CDG).
> 2. LE PRIX TOTAL final inclut-il taxes et frais ? Y a-t-il une option payante ajoutée que je n'ai pas demandée ?
> 3. LES BAGAGES : ce qui est inclus, ce qui est en supplément.
> 4. L'ANNULATION / MODIFICATION : remboursable ou non ? Jusqu'à quand ?
> 5. LE DRAPEAU ROUGE : la seule chose que je risquerais de regretter après avoir payé.
>
> Sois direct. Si quelque chose cloche, dis-le clairement avant que je valide.

---

## 04. L'astuce de pro

Gardez toujours la recherche et l'exécution séparées. Utilisez la méthode 1 (connecteur, dans l'app) pour chercher et comparer : c'est sans risque, rien ne s'exécute, votre carte n'entre jamais dans Claude. Réservez la méthode 2 (Claude for Chrome) à la seule étape de saisie, avec le prompt 2 qui verrouille l'arrêt avant paiement. Et laissez toujours le réglage « demander confirmation avant un achat » activé. Le confort d'un agent qui remplit tout pour vous ne vaut jamais le risque de lui laisser le clic final.

---

## Quand s'en servir, et quand surtout pas

Idéal pour comparer vols et hôtels, préparer une réservation, gagner l'heure que vous passiez habituellement à ouvrir quinze onglets. À éviter absolument : ne branchez jamais un agent sur votre banque, votre bourse, un portail de santé, ou sur toute action irréversible : Anthropic elle-même déconseille ces usages pendant la période bêta. Et vérifiez toujours vous-même ce qu'aucune IA ne doit décider à votre place : validité du passeport, visa, conditions d'entrée du pays, assurance voyage. L'IA vous fait gagner du temps ; la responsabilité du voyage reste entièrement la vôtre.

---

## À retenir

**Claude peut faire 95 % du travail de réservation. Le dernier clic (celui qui engage votre argent) reste toujours le vôtre.**

Deux méthodes vérifiées (connecteurs de voyage dans l'app, ou Claude for Chrome pour aller jusqu'à l'écran de paiement), trois prompts qui verrouillent chaque étape sensible, et une règle simple à ne jamais lever : aucune IA ne doit saisir vos coordonnées bancaires ni cliquer sur « Payer » à votre place.
