---
Guide original : 5 dashboards IA cachés dans ta boîte mail
Source : https://www.saadiakaram.ai/guides/claude-email-dashboard
Position réelle dans la bibliothèque au moment du traitement : 165/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). Aucune section collapsée. Contenu intégralement capturé (guide très long, 5 prompts techniques complets). Noms de produits, bibliothèques et services réels conservés tels quels car fonctionnels au prompt (Claude, Gmail, Leaflet.js, Tailwind, Chart.js, Google Fonts, Playfair Display, Cormorant, Inter, Anton, CartoDB, DoorDash, Uber Eats, Grubhub, Postmates, Caviar, Seamless, Instacart, Amazon Fresh, Whole Foods, Walmart Grocery, Gopuff, OpenTable, Resy, Toast, Starbucks, Dunkin', Blue Bottle, Philz, Peet's, UPS, USPS, FedEx, Stripe, Cash App). Les valeurs techniques exactes (couleurs hexadécimales, tailles en pixels, noms de bibliothèques) ont été conservées à l'identique car elles conditionnent le fonctionnement du prompt - seule la prose explicative autour a été reformulée. Contenu portant sur le suivi de dépenses et d'abonnements personnels (catégorie budget courant, pas de données financières sensibles comme revenu ou patrimoine).
---

# Cinq tableaux de bord à construire à partir de sa boîte mail

*Claude · 5 min de lecture*

Une boîte mail est une base de données sous-exploitée. Connectée à l'assistant, elle permet de construire cinq tableaux de bord interactifs utiles en une seule après-midi.

## Le principe

Une boîte mail n'est pas un simple cimetière de reçus : c'est une base de données largement sous-utilisée. En connectant Gmail à l'assistant, il devient possible de générer de vrais tableaux de bord interactifs sous forme d'artefact - pas des tableaux ternes, mais des cartes, des graphiques, des listes exploitables et des boutons copiables. En une après-midi, des années d'e-mails se transforment en outil réellement utilisable.

## Configuration rapide

Ouvrir les réglages de l'assistant. Activer les connecteurs. Connecter Gmail. Utiliser les prompts ci-dessous dans un espace de travail pour pouvoir les relancer à volonté.

**Le point clé :** l'assistant peut lire une boîte mail comme une base de données - croiser des dates, regrouper des trajets, calculer des montants, détecter des tendances. C'est précisément là que cela devient utile.

## Dashboard 1 - La carte des voyages

Une carte du monde interactive apparaît, avec une épingle par voyage, des statistiques globales, un tableau triable et un graphique annuel. Pas seulement esthétique : elle révèle de vrais schémas de déplacement.

> **Prompt - carte de voyage**
>
> Tu as un accès en lecture à mon Gmail. Je veux que tu me construises un magnifique tableau de bord interactif de carte de voyage sous forme d'artefact.
>
> ÉTAPE 1 - EXTRAIRE LES DONNÉES
>
> Cherche dans mon Gmail toutes les confirmations de vol, réservations d'hôtel, réservations de location entre particuliers et reçus de location de voiture des 5 dernières années. Pour chacune, extrais :
> - Ville et pays de destination (avec latitude/longitude si tu peux l'inférer)
> - Date d'arrivée et date de départ
> - Type (vol / hôtel / location entre particuliers / location de voiture)
> - Prestataire (nom de la compagnie aérienne, chaîne hôtelière, etc.)
> - Coût (uniquement s'il est lisible clairement - laisse vide sinon, ne devine PAS)
> - Un niveau de confiance : élevé / moyen / faible
>
> Consolide par VOYAGE. Un voyage = une séquence de réservations avec des dates qui se chevauchent ou se suivent dans la même ville ou région. Chaque voyage reçoit une seule plage de dates, une destination principale et un coût total (somme des coûts extraits clairement).
>
> ÉTAPE 2 - CONSTRUIRE LE TABLEAU DE BORD INTERACTIF EN ARTEFACT
>
> Crée un seul fichier HTML autonome en artefact. Utilise Leaflet.js chargé via CDN pour la carte interactive du monde.
>
> DESIGN :
> - Mode sombre par défaut. Fond #0e0e10, texte #f5f5f5, couleur d'accent #d02e2e (rouge).
> - Typographie : Inter ou sans-serif système. Moderne, beaucoup d'espace blanc, pas de surcharge visuelle.
> - Mise en page (de haut en bas) :
> 1. BANDEAU D'EN-TÊTE - titre « Your Travel Atlas » et sous-titre avec la plage de dates couverte.
> 2. CARTE DU MONDE INTERACTIVE - pleine largeur, 60 % de la hauteur de la fenêtre. Utilise une couche de tuiles sombre et propre (ex. CartoDB dark matter). Place une épingle colorée pour chaque voyage, dimensionnée légèrement selon le coût si connu. Code couleur des épingles par ANNÉE avec une palette séquentielle de 5 couleurs (année la plus récente = rouge accent, la plus ancienne = sarcelle atténuée). Au survol : affiche nom du voyage, dates et prestataire dans une infobulle. Au clic : ouvre un panneau latéral avec les détails complets du voyage, y compris un lien vers l'e-mail de confirmation original dans Gmail quand c'est possible.
> 3. BANDEAU DE STATISTIQUES - quatre grands nombres côte à côte : total des voyages, villes uniques, pays uniques, total dépensé. Police d'affichage 64 px, libellés en capitales sous chaque chiffre.
> 4. TABLEAU TRIABLE DES VOYAGES - chaque voyage avec date, ville, pays, prestataire, coût. Ajoute un champ de recherche avec filtre en direct et des contrôles de tri par colonne. Mets en avant les 3 lignes les plus chères.
> 5. GRAPHIQUE ANNUEL EN BARRES - barres horizontales montrant le nombre de voyages par année, avec les mêmes couleurs que les épingles de la carte.
> - Transitions subtiles de 200 ms quand les filtres changent.
> - Entièrement adapté au mobile - la carte passe en pleine largeur sur téléphone.
>
> SI DES DONNÉES MANQUENT : affiche un état vide honnête et propre au lieu de fausses épingles. Sois transparent sur la confiance - affiche une petite icône à côté des voyages à faible confiance.
>
> Retourne l'artefact dans un seul fichier HTML que je peux enregistrer et ouvrir dans n'importe quel navigateur. Ne résume pas ce que tu as construit en dehors de l'artefact - construis-le simplement.

## Dashboard 2 - La liste d'abonnements à supprimer

Celui-ci pique un peu, et c'est le but. Il donne le total mensuel, le total annuel, le classement des abonnements les plus chers, puis la liste de ceux à résilier avec un e-mail d'annulation prêt à copier.

> **Prompt - liste d'abonnements à supprimer**
>
> Tu as un accès en lecture à mon Gmail. Construis-moi un tableau de bord d'audit des abonnements sous forme d'artefact.
>
> ÉTAPE 1 - EXTRAIRE LES DONNÉES
>
> Cherche dans mon Gmail chaque prélèvement récurrent, renouvellement d'abonnement, avis de facturation automatique ou cotisation des 24 derniers mois. Consolide en abonnements uniques. Pour chaque abonnement, extrais :
> - Nom du prestataire / service
> - Catégorie (divertissement / productivité / fitness / finance / professionnel / utilitaire / actualités_médias / stockage_cloud / autre)
> - Fréquence de facturation (mensuelle / annuelle / trimestrielle / autre)
> - Montant du prélèvement le plus récent
> - Date du prélèvement le plus récent
> - Coût annuel (montant le plus récent × multiplicateur de fréquence)
> - Statut : « actif » si facturé dans les 60 derniers jours, « dormant » si 60-180 jours, « probablement annulé » si plus de 180 jours
> - Un indicateur de confiance - si la certitude qu'il s'agit d'un vrai abonnement est inférieure à 80 %, marque-le « incertain » et exclus-le des totaux (mais affiche-le quand même dans le tableau avec une icône d'avertissement)
>
> ÉTAPE 2 - CONSTRUIRE LE TABLEAU DE BORD EN ARTEFACT
>
> Crée un seul fichier HTML autonome. Utilise Tailwind via CDN pour le style et Chart.js via CDN pour les graphiques.
>
> DESIGN :
> - Mode clair. Fond blanc cassé (#fafaf7), texte noir, une couleur d'accent forte : #d02e2e (rouge).
> - Typographie : une serif propre pour les titres (Playfair Display ou similaire via Google Fonts), une sans-serif propre pour le corps (Inter).
> - Mise en page (de haut en bas) :
> 1. EN-TÊTE - trois grands nombres côte à côte dans des cartes arrondies : « Total mensuel » (somme de tous les équivalents mensuels), « Total annuel » (×12), et « Abonnements » (nombre d'abonnements actifs). Chaque nombre en 64 px, avec un petit libellé au-dessus et un mini indicateur de tendance dessous si déductible.
> 2. GRAPHIQUE EN BARRES CLASSÉES - graphique horizontal de chaque abonnement actif par coût annuel, en ordre décroissant. Utilise le rouge accent. Affiche le montant exact au bout de chaque barre.
> 3. DONUT PAR CATÉGORIE - graphique en anneau des dépenses annuelles par catégorie. Le centre affiche le total. Chaque segment a une palette propre et moderne.
> 4. LA LISTE À SUPPRIMER - une section mise en avant avec le titre fort « Subscriptions To Kill ». Affiche chaque abonnement « dormant » et « probablement annulé » sous forme de carte. Chaque carte contient : nom du prestataire, date du dernier prélèvement, coût annuel, et un bouton d'annulation. Au clic, ouvre une fenêtre avec un e-mail d'annulation prêt à copier-coller (objet et corps) prérempli pour ce prestataire précis. En haut de cette section, affiche le montant total récupérable si tout était annulé.
> 5. TABLEAU COMPLET - tous les abonnements, y compris les incertains. Colonnes : prestataire, catégorie, fréquence, dernier prélèvement, statut, coût annuel. Recherche et filtres par statut.
> - Utilise des cartes arrondies (rayon de bordure 12 px), un espacement généreux, des ombres douces. Donne davantage de poids visuel à la section « à supprimer » qu'au tableau - c'est là que se joue l'action.
> - Entièrement adapté au mobile.
>
> N'inclus PAS les abonnements incertains dans les totaux d'en-tête ni dans le graphique en barres. Seulement les actifs confirmés.
>
> Retourne un unique artefact HTML que je peux enregistrer et ouvrir dans un navigateur. Construis-le directement, sans narration.

## Dashboard 3 - Le bilan annuel des dépenses alimentaires

> **Prompt - bilan des dépenses alimentaires**
>
> Tu as un accès en lecture à mon Gmail. Construis-moi un tableau de bord de dépenses alimentaires façon bilan annuel sous forme d'artefact.
>
> ÉTAPE 1 - EXTRAIRE LES DONNÉES
>
> Cherche dans mon Gmail les reçus des 12 derniers mois dans les catégories suivantes :
> - Livraison de repas (services de livraison à domicile courants)
> - Livraison de courses (services de courses à domicile courants)
> - Reçus de restaurants et frais liés aux réservations
> - Chaînes de café
>
> Exclus les paiements de type abonnement (traités par le tableau de bord abonnements). Compte uniquement les vraies commandes.
>
> Pour chaque commande, extrais : date, prestataire, catégorie (livraison / courses / restaurant / café), total, et ville si visible.
>
> ÉTAPE 2 - CONSTRUIRE LE TABLEAU DE BORD EN ARTEFACT
>
> Crée un seul artefact HTML autonome. Utilise Chart.js via CDN.
>
> DESIGN - esprit « magazine, bilan annuel » :
> - Fond crème (#fffae7), texte noir (#2f2d2d), une couleur d'accent (#d02e2e).
> - Typographie : serif d'affichage pour les chiffres d'en-tête (Playfair Display ou Cormorant via Google Fonts), sans-serif propre pour le corps (Inter).
> - Beaucoup d'espace blanc. Un rythme éditorial - chaque section doit donner l'impression de tourner une page.
> - Mise en page (de haut en bas) :
> 1. EN-TÊTE - un nombre géant : la dépense alimentaire totale des 12 derniers mois, en serif 96 px, centré. En dessous : « sur N commandes, M prestataires uniques ». Puis un petit libellé : « Bilan annuel · [PLAGE DE DATES] ».
> 2. DONUT PAR CATÉGORIE - graphique en anneau qui répartit les dépenses entre livraison, courses, restaurant et café. Le segment principal en rouge accent. Chaque segment affiche montant et pourcentage.
> 3. TENDANCE MENSUELLE - graphique en ligne des dépenses mensuelles sur les 12 derniers mois. Lisse la ligne. Annote les 3 mois les plus chers avec un petit texte sur la cause probable.
> 4. CLASSEMENT DES PRESTATAIRES - top 10 des prestataires par dépense totale, affichés en liste verticale de cartes. Chaque carte : nom du prestataire, icône catégorie, total dépensé, nombre total de commandes, et une mini barre montrant sa part du total alimentaire.
> 5. PLUS GROSSE COMMANDE UNIQUE - une carte dédiée avec la plus grosse dépense alimentaire de l'année (prestataire, date, montant, catégorie), présentée comme un aveu assumé.
> 6. MOYENNE QUOTIDIENNE - petit bloc final : « Cela représente X €/jour. Ou Y €/semaine. Ou Z €/mois. » Dans le même ton éditorial.
> - Apparitions progressives subtiles au défilement sur chaque section.
> - Adapté au mobile.
>
> Ambiance recherchée : proche des bilans annuels visuellement soignés de certaines applications de paiement. Beau, assumé, conçu - surtout pas un tableur, surtout pas un rapport de notes de frais.
>
> Retourne un seul artefact HTML.

## Dashboard 4 - L'argent qui reste dû

> **Prompt - remboursements manqués**
>
> Tu as un accès en lecture à mon Gmail. Construis-moi un tableau de bord « Argent qui m'est dû » sous forme d'artefact.
>
> ÉTAPE 1 - EXTRAIRE ET APPARIER LES DONNÉES
>
> Cherche dans mon Gmail sur les 24 derniers mois :
> - Les étiquettes de retour et confirmations de retour (transporteurs, e-mails de retour spécifiques aux boutiques, accusés de retour de vendeurs en ligne)
> - Les reçus de remboursement et crédits émis par ces mêmes vendeurs
>
> Pour chaque retour trouvé, essaie de le faire correspondre à un reçu de remboursement du même vendeur dans les 30 jours pour un montant similaire (tolérance de ±5 € ou ±10 % si le montant est flou). Marque chaque retour comme :
> - REMBOURSÉ (remboursement correspondant trouvé)
> - EN ATTENTE (retour enregistré mais pas encore remboursé, moins de 14 jours)
> - MANQUÉ (retour enregistré, pas de remboursement, plus de 14 jours - à traiter)
>
> Pour chaque entrée MANQUÉE, récupère : vendeur, description de l'article (si trouvable), date du retour, montant attendu du remboursement, nombre de jours depuis le retour, et un lien vers l'e-mail de commande original si possible.
>
> ÉTAPE 2 - CONSTRUIRE LE TABLEAU DE BORD EN ARTEFACT
>
> Crée un artefact HTML autonome. Utilise Tailwind via CDN.
>
> DESIGN - esprit « signal d'alerte et plan d'action » :
> - Fond clair (#fafaf7), rouge fort (#d02e2e), vert fort pour les remboursements confirmés (#2f7d4a).
> - Mise en page (de haut en bas) :
> 1. EN-TÊTE - un énorme montant rouge (96 px) : le total des retours MANQUÉS et EN ATTENTE. Sous-titre : « sur N retours non appariés. Le plus ancien : [JOURS] jours. »
> 2. VUE PARTAGÉE - deux colonnes :
> GAUCHE (fond teinté vert) : liste des remboursements confirmés. Chaque ligne : petit repère vert, vendeur, date du retour, montant remboursé, date du remboursement. Ton calme, archivistique.
> DROITE (fond teinté rouge) : liste des retours manquants ou en attente. Chaque ligne est une vraie carte d'action avec : vendeur, date du retour, badge du nombre de jours écoulés (rouge si plus de 30 jours), montant attendu du remboursement, et un bouton visible « Envoyer une relance ».
> 3. AU CLIC SUR LE BOUTON : ouvre une fenêtre avec un e-mail prérempli. Objet : statut du remboursement pour le retour concerné. Corps : message poli mais ferme avec les détails du retour, le montant attendu, et une demande de réponse sous 7 jours. Inclure un bouton « Copier ».
> 4. BANDEAU DE STATISTIQUES sous la vue partagée : moyenne de jours depuis le retour pour les remboursements manquants, plus ancien remboursement manquant (vendeur et date), plus gros montant dans la liste manquante.
> 5. BOUTON D'EXPORT en bas : télécharger tous les retours manquants au format tableur pour un suivi ultérieur.
> - Adapté au mobile - les colonnes s'empilent sur téléphone.
>
> Ce tableau de bord est fait pour être utilisé, pas seulement lu. Donne un vrai poids visuel aux boutons d'action. Rends les éléments remboursés visuellement discrets.
>
> Retourne un seul artefact HTML.

## Dashboard 5 - Le suivi des hausses de prix

> **Prompt - historique des prix d'abonnements**
>
> Tu as un accès en lecture à mon Gmail. Construis-moi un tableau de bord d'historique de prix des abonnements sous forme d'artefact.
>
> ÉTAPE 1 - EXTRAIRE LES DONNÉES
>
> En utilisant la même logique que pour le tableau de bord abonnements, identifie chaque abonnement actif. Puis, pour chacun, cherche dans mon Gmail tous les reçus de facturation remontant aussi loin que possible.
>
> Pour chaque abonnement, construis un historique complet des prix :
> - Nom de l'abonnement
> - Premier prix observé et date
> - Chaque prix distinct observé et la plage de dates correspondante
> - Prix actuel (le plus récent) et date
> - Hausse totale en pourcentage du premier prix au prix actuel
> - Nombre de changements de prix détectés
> - Si chaque hausse de prix a été précédée d'un e-mail d'annonce dans les 14 jours précédant la hausse. Sans annonce trouvée, marque la hausse comme « discrète »
> - Date estimée du prochain renouvellement (selon la fréquence de facturation et le dernier prélèvement)
>
> ÉTAPE 2 - CONSTRUIRE LE TABLEAU DE BORD EN ARTEFACT
>
> Crée un artefact HTML autonome. Utilise Chart.js via CDN.
>
> DESIGN - esprit « présentation investisseur et signal d'alerte » :
> - Fond clair blanc cassé (#fafaf7), texte noir, une couleur d'accent rouge forte (#d02e2e).
> - Typographie : sans-serif moderne propre (Inter), avec des chiffres légèrement plus gras. Un style condensé pour la ligne d'en-tête.
> - Mise en page (de haut en bas) :
> 1. EN-TÊTE - une ligne dense, 56 px : « Vos abonnements coûtent X % de plus qu'à l'origine. » En dessous, plus petit : le surcoût mensuel comparé aux prix d'origine, et le total payé en trop sur la durée de vie des abonnements à cause des hausses.
> 2. PLUS FORTES HAUSSES - classement des 5 abonnements avec la plus forte hausse de prix en pourcentage. Chaque ligne : nom de l'abonnement, premier prix et date, prix actuel et date, hausse en pourcentage (en rouge), hausse en montant. Visualisation en barre pour chaque ligne.
> 3. LE GRAPHIQUE NORMALISÉ - un unique graphique multi-lignes avec tout l'historique de prix des abonnements. Toutes les lignes normalisées pour démarrer à 100. Axe vertical : pourcentage du prix d'origine. Cela permet de comparer d'un coup d'œil la pente des hausses.
> 4. HAUSSES DISCRÈTES - section dédiée listant les abonnements dont le prix a augmenté sans e-mail d'annonce correspondant. Ce sont ceux sur lesquels il vaut la peine de réagir. Chaque ligne a un bouton « Contester ».
> 5. SURVEILLANCE DES RENOUVELLEMENTS - liste de tous les abonnements qui se renouvellent dans les 30 prochains jours, triée par date. Pour chacun : prestataire, prochaine date de renouvellement, 3 derniers prix facturés, et si une hausse survient historiquement autour de cette date.
> 6. BOUTON NÉGOCIER - chaque carte d'abonnement a un bouton « Négocier » qui ouvre une fenêtre avec un script d'e-mail ou de chat prérempli, rappelant l'ancienneté du client, l'évolution du prix dans le temps, et demandant soit un retour au tarif précédent, soit une remise de fidélisation, soit prévenant d'une possible résiliation. Inclure un bouton « Copier ».
> - Adapté au mobile.
>
> Fais du graphique la pièce maîtresse visuelle - la plupart des utilisateurs n'ont jamais vu l'évolution de leurs prix d'abonnement représentée dans le temps.
>
> Retourne un seul artefact HTML.

## À retenir

**Ne pas construire les cinq d'un coup.**

Choisir celui qui répond à une vraie question déjà posée : où part l'argent, combien d'abonnements sont payés, les remboursements ont-ils vraiment été reçus. Sauvegarder l'artefact localement, relancer le prompt tous les deux à six mois, et transformer sa boîte mail en véritable système de pilotage. Astuce : commencer par la liste d'abonnements à supprimer ou les remboursements manquants - c'est le retour sur investissement le plus rapide.
