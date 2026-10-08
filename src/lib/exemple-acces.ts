// L'exemple complet de la page d'accès (plan produit, chantier 8.1) : une
// tâche du kit « Commerce et vente en ligne », du cas au résultat, et une
// ressource du kit affichée en entier.
//
// Ce contenu fait partie de ce qui est vendu. Il est rendu public exprès, pour
// que le visiteur voie ce qu'il achète avant de payer : c'est le seul contenu
// payant visible sans compte. Ne rien y ajouter sans décision.
//
// Les textes sont copiés tels quels de la base (migration 0019), jamais
// réécrits à la main (règle Q7). Le test exemple-acces.test.ts vérifie qu'ils
// sont identiques à ceux de la migration.

export const EXEMPLE_TACHE = {
  titre: "Calculer son prix de vente et sa marge",
  resultat: "Le prix de revient, la marge et le prix plancher d'un article, avec chaque calcul expliqué. Le prix de revient est ce que l'article coûte vraiment, achat et frais compris. La marge est ce qui reste au vendeur une fois l'article et ses frais payés.",
  cas: {
    titre: "Gérante adjointe d'une boutique de pagnes à Cotonou",
    lieu: "Cotonou, Bénin",
    contexte: "Vous êtes gérante adjointe de Maison Adjoké, une boutique de 7 personnes à Ganhi. Un nouveau lot de pagnes vient d'arriver et la gérante vous demande de vérifier le prix avant la mise en vente.",
    donnees: "- Lot de 10 pagnes wax de 6 yards, achetés 7 000 FCFA pièce.\n- Transport du lot depuis le marché Dantokpa : 500 FCFA en zem (le taxi-moto, au Bénin).\n- Prix de vente prévu : 10 000 FCFA le pagne.\n- La gérante veut garder au moins 2 500 FCFA de marge par pagne.\n- Une vendeuse propose d'offrir la livraison, qui coûte 1 000 FCFA.",
    travail: "Calculez le prix de revient, la marge en FCFA et en pourcentage, et le prix plancher. Dites ensuite si la boutique peut offrir la livraison sans passer sous la marge voulue.",
    reponse: "Prix de revient 7 050 FCFA, marge 2 950 FCFA soit 29,5 %, prix plancher 9 550 FCFA ; avec la livraison offerte, la marge tombe à 1 950 FCFA, sous les 2 500 FCFA voulus.",
  },
  modele: {
    gabarit: "Rôle : Vous aidez un commerçant à calculer son prix de vente et sa marge, et vous expliquez chaque calcul en mots simples.\n\nContexte : Article : {{article}}. Prix d'achat à l'unité : {{prix_achat}} FCFA. Frais par article (transport, emballage, livraison offerte, frais de retrait) : {{frais}} FCFA. Prix de vente prévu : {{prix_vente}} FCFA. Marge minimale que je veux garder : {{marge_minimale}} FCFA.\n\nTravail demandé :\n1. Le prix de revient : prix d'achat plus frais.\n2. La marge en FCFA, et en pourcentage du prix de vente.\n3. Le prix plancher : prix de revient plus marge minimale.\n4. Un avis en 2 phrases : mon prix de vente tient-il, et sinon que changer ?\n\nFormat : un petit tableau, puis l'avis. Montrez chaque calcul.\n\nRègle : utilisez seulement mes chiffres. S'il en manque un, demandez-le. Ne proposez aucun prix « du marché » que je ne vous ai pas donné.",
    avertissement: "Une IA peut se tromper dans un calcul. Vérifiez avec votre tableau.",
    champs: [
      { cle: "article", libelle: "Quel article ?", exemple: "un pagne wax de 6 yards", requis: true },
      { cle: "prix_achat", libelle: "Combien l'achetez-vous, à l'unité ?", exemple: "7 000", requis: true },
      { cle: "frais", libelle: "Quels frais avez-vous par article ?", exemple: "50", requis: true },
      { cle: "prix_vente", libelle: "À combien pensez-vous le vendre ?", exemple: "10 000", requis: true },
      { cle: "marge_minimale", libelle: "Combien voulez-vous garder au minimum ?", exemple: "2 500", requis: true },
    ],
  },
} as const;

export const EXEMPLE_RESSOURCE = {
  titre: "Assistant de ma boutique",
  description: "Vous le complétez une fois avec les informations de votre boutique : ensuite, l'IA connaît votre boutique à chaque conversation.",
  contenu: "Vous êtes l'assistant de ma boutique. Vous m'aidez à vendre, à répondre aux clients et à tenir mes comptes.\n\nMA BOUTIQUE\nNom et activité : [nom], [ce que je vends]\nLieu : [quartier, ville, pays]\nMes clients : [qui achète chez moi]\nMes prix : de [prix le plus bas] à [prix le plus haut] FCFA\nPaiement : [espèces, Mobile Money accepté, avance demandée ou non]\nLivraison : [zones, frais, délai]\nHoraires : [jours et heures]\n\nVOS RÈGLES\n1. Français simple, phrases courtes. Vouvoyez mes clients.\n2. Un message à un client commence par « Bonjour » ou « Bonsoir » et reste poli, même pour refuser.\n3. Montants écrits ainsi : 25 000 FCFA.\n4. Textes prêts à coller dans WhatsApp : ni titre, ni astérisque, peu d'émojis.\n5. N'inventez jamais un prix, une promotion, un stock, un délai ou un avis. S'il manque une information, posez-moi une seule question.\n6. Pour un message, proposez 2 versions : une courte, une plus chaleureuse.\n7. Ne demandez jamais le nom complet ni le numéro d'un client.\n8. Impôts, factures officielles, droit : renvoyez-moi vers mon comptable ou l'administration.",
  etapes: [
    "Copiez le texte, puis remplacez ce qui est entre crochets par les informations de votre boutique.",
    "Dans ChatGPT, touchez Projets, puis le + en haut à droite. Donnez au projet le nom « Ma boutique », puis touchez Créer un projet.",
    "Dans le projet, touchez les trois points en haut à droite, puis Modifier les instructions. Collez le texte, puis touchez la coche en haut à droite.",
  ],
  gratuit: "Oui. Les projets sont disponibles sur un compte gratuit, avec 5 fichiers par projet.",
  telephone: "Oui. Les étapes ci-dessus ont été relevées sur un téléphone. Sur iPhone, les menus peuvent différer un peu.",
} as const;
