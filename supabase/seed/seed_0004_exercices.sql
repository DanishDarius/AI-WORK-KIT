-- Seed data for exercices table (generated from exercices-42-taches-v2-tu.md)

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Assistante de direction, cabinet d'architecture Méridia$tt$, $tt$Contexte : Tu es assistant(e) de direction chez Méridia Architecture (8 salariés, Lyon). Tu reviens de deux jours de congé et trouves 11 emails non lus dans la boîte partagée "contact@meridia-archi.fr".$tt$, $tt$Boîte de réception à traiter (copier-coller tel quel) :
```
1. De: j.martel@clientprive.fr - "Relance devis extension maison" - reçu il y a 4 jours
   "Bonjour, je n'ai pas eu de nouvelles concernant le devis pour l'extension de notre maison à Tassin. Pouvez-vous me dire où ça en est ? Merci."

2. De: compta@fournitures-pro.fr - "Facture n°FP-2026-4471 en retard" - reçu il y a 6 jours
   "Nous constatons que la facture FP-2026-4471 d'un montant de 842,50€ TTC est impayée depuis 15 jours. Merci de régulariser sous 8 jours."

3. De: newsletter@archidaily.com - "5 tendances architecture 2026" - reçu il y a 3 jours

4. De: p.rousseau@mairie-tassin.fr - "Dossier permis de construire 2026-0187" - reçu il y a 2 jours
   "Le dossier est incomplet : il manque le formulaire Cerfa 13411 signé et une pièce PC5 mise à jour. Merci de compléter sous 10 jours ouvrés sans quoi le dossier sera classé sans suite."

5. De: recrutement@archi-jobs.fr - "Candidature spontanée - architecte junior" - reçu il y a 5 jours

6. De: s.durand@meridia-archi.fr (interne) - "Réunion équipe vendredi" - reçu il y a 1 jour
   "Peux-tu réserver la salle de réunion pour vendredi 10h ? On doit faire le point sur les 3 chantiers en cours."

7. De: no-reply@edf-entreprises.fr - "Votre facture d'électricité de l'agence" - reçu il y a 3 jours

8. De: m.chen@investisseur-immo.com - "Proposition de partenariat" - reçu il y a 7 jours
   "Bonjour, je gère un fonds d'investissement immobilier et je cherche des architectes partenaires pour nos projets de rénovation. Seriez-vous intéressés par un échange ?"

9. De: t.lefebvre@clientprive.fr - "URGENT - fuite d'eau visible sur chantier" - reçu il y a 1 jour
   "Bonjour, l'entreprise de plomberie a signalé une fuite au niveau de la salle de bain du 2e étage sur le chantier rue des Tilleuls. Merci de rappeler dès que possible."

10. De: greenwashing-solutions@spam-marketing.biz - "Boostez votre visibilité en 24h !!!" - reçu il y a 2 jours

11. De: c.moreau@meridia-archi.fr (interne, associé) - "Point facturation clients de mai" - reçu il y a 4 jours
    "Peux-tu me sortir la liste des factures clients émises en mai et leur statut de paiement avant jeudi ?"
```$tt$, $tt$Travail à faire : Trie ces 11 emails en 4 catégories (urgent à traiter aujourd'hui / à répondre cette semaine / à déléguer et à qui / à archiver ou supprimer), justifie chaque classement en une phrase, et rédige la réponse complète au message le plus urgent.$tt$
from taches t where t.code = 'F01';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Gérant d'un salon de coiffure indépendant$tt$, $tt$Contexte : Tu gères seul(e) "Studio K", un salon de coiffure à Lille. Tu consultes ta boîte mail le lundi matin après un week-end sans connexion.$tt$, $tt$Boîte de réception à traiter :
```
1. De: booking@planity.com - "3 nouvelles réservations ce week-end" - reçu vendredi
   "Vous avez reçu 3 nouvelles réservations via Planity pour la semaine du 8 septembre."

2. De: sophie.leroy92@gmail.com - "Annulation rendez-vous mardi 14h" - reçu samedi
   "Bonjour, je ne pourrai finalement pas venir à mon rendez-vous de mardi 14h, un empêchement professionnel. Merci de me proposer un autre créneau la semaine prochaine si possible."

3. De: fournisseur@loreal-pro.fr - "Rupture de stock temporaire - coloration Majirel 6.3" - reçu vendredi
   "Nous vous informons d'une rupture de stock sur la référence Majirel 6.3 jusqu'au 20 septembre. Vos autres commandes seront livrées normalement."

4. De: urssaf.contact@urssaf.fr - "Échéance de cotisations sociales" - reçu jeudi
   "Votre échéance de cotisations du 3e trimestre est à régler avant le 15 septembre."

5. De: unclient.mecontent@hotmail.fr - "Insatisfait de ma dernière coupe" - reçu dimanche
   "Bonjour, je suis venu vendredi dernier pour une coupe et je ne suis vraiment pas satisfait du résultat, ce n'est pas du tout ce qu'on avait convenu. J'aimerais qu'on en discute."

6. De: proprietaire.local@immo-lille.fr - "Visite technique chaudière obligatoire" - reçu vendredi
   "Le technicien passera vérifier la chaudière du local le mercredi 10 septembre entre 9h et 12h, merci de confirmer votre disponibilité."

7. De: assistante@franchise-coiffure-nationale.fr - "Offre de rachat / intégration réseau" - reçu il y a 8 jours

8. De: newsletter@lecoiffeur-magazine.fr - "Les coupes tendance de la rentrée" - reçu mercredi
```$tt$, $tt$Travail à faire : Identifie les emails qui nécessitent une réponse aujourd'hui, ceux qui peuvent attendre, et rédige la réponse au client mécontent (email n°5) en respectant un ton professionnel et apaisant.$tt$
from taches t where t.code = 'F01';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Cabinet comptable Lefebvre & Associés$tt$, $tt$Contexte : Tu travailles au cabinet et dois envoyer une lettre de mission à un nouveau client. Tu as rédigé, en tant que collaborateur (collaboratrice) junior, un premier jet rapide, à corriger avant envoi.$tt$, $tt$Document à corriger (tel quel, avec ses fautes) :
```
Objet : Lettre de mission comptable

Madame, Monsieur,

Suite a notre entretien du 3 septembre dernier, nous avons le plaisir de vous confirmer 
l'acceptation de notre mission concernant la tenu de votre comptabilité pour l'exercice 
2026.

Notre mission comprendra les prestation suivante :
- La saisie et le contrôle des pièce comptables
- L'établissement des déclaration de TVA mensuel
- La préparation du bilan et du compte de résultats annuel
- Un conseil ponctuel sur les questions fiscal et social

Le montant de nos honoraire est fixé a 3200 euros HT par ans, payable trimestriellement.
Cette lettre de mission prend effet a compté du 1er octobre 2026 et son renouvellement 
se fera par tacite reconduction sauf dénonciation par l'une des partie avec un préavis 
de 3 mois.

Nous restons a votre disposition pour tout complément d'information et vous prions 
d'agréer, Madame, Monsieur, l'expression de nos salutations distingué.

Jean-Marc Lefebvre
Expert Comptable
```$tt$, $tt$Travail à faire : Corrige toutes les fautes d'orthographe, de grammaire et de ponctuation, vérifie la cohérence des accords, et signale si des informations semblent manquantes ou ambiguës pour une lettre de mission (par exemple des mentions légales obligatoires) sans les inventer.$tt$
from taches t where t.code = 'F03';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Association sportive locale$tt$, $tt$Contexte : Tu es président(e) du club "Handball Club Vertois" et dois envoyer un compte-rendu d'assemblée générale à tes 60 adhérents. Le secrétaire a rédigé un brouillon que tu dois corriger.$tt$, $tt$Document à corriger :
```
Compte rendu de l'assemblé générale du 28 août 2026

Étais présent : 22 adhérents sur 60, le quorum étant atteint (1/3 des adhérents requis)

1. Bilan sportif de la saisont
Le président à rappeler les résultats de la saison écoulé : l'équipe sénior 
masculine à terminé 3ème de son championnat, l'équipe féminine à quand a elle 
accédé à la division supérieur. Les jeunes catégorie ont également bien 
performés avec deux titre régionaux.

2. Bilan financier
La trésorière à présenté les compte de l'exercice. Le club dispose d'un solde 
positif de 4 250€, malgré une hausse des coup liés au déplacement.

3. Election du nouveau bureau
Le bureau actuel à été reconduit à l'unanimité des présent pour la saison 
2026-2027.

4. Question diverses
Plusieurs adhérent on évoqué la nécessité de rénover les vestiaire, le sujet 
sera abordé lors du prochain conseil municipal.

Fin de séance a 21h30.
```$tt$, $tt$Travail à faire : Corrige les fautes d'accord (participes passés, pluriels) et d'orthographe, harmonise les temps verbaux, et reformule les phrases mal construites tout en conservant le sens exact du texte original.$tt$
from taches t where t.code = 'F03';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Réunion d'équipe, agence de communication$tt$, $tt$Contexte : Tu travailles à l'agence "Pixel & Sens" (6 salariés) et dois traiter la transcription de la réunion hebdomadaire. Voici un extrait brut de la transcription automatique (non corrigée, avec les défauts habituels d'une transcription).$tt$, $tt$Transcription brute à traiter :
```
[10:02] Amandine : bon du coup on démarre, alors pour le client Voltéa on est censé 
livrer les maquettes vendredi c'est bien ça
[10:02] Karim : oui vendredi mais euh j'ai un souci g'ai pas reçu les visuels produits 
du client donc je peux pas finaliser la page d'accueil
[10:03] Amandine : ok il faut relancer le client alors qui s'en charge
[10:03] Karim : je peux le faire aujourd'hui
[10:04] Léa : moi de mon côté j'ai fini le brief réseaux sociaux pour Voltéa aussi, 
j'ai juste besoin qu'on valide le budget pub avant de le lancer
[10:04] Amandine : combien tu proposes
[10:05] Léa : 800 euros sur le mois pour tester deux campagnes différentes
[10:05] Amandine : ok c'est validé vas y
[10:06] Karim : sinon deuxième sujet le nouveau client, le restaurant là, comment il 
s'appelle déjà
[10:06] Léa : la Table d'Augustin
[10:06] Karim : voilà la Table d'Augustin ils veulent un premier rendez vous la semaine 
prochaine pour le shooting photo
[10:07] Amandine : ok je regarde mon agenda et je les rappelle cet après midi pour 
fixer une date, probablement mardi ou mercredi
[10:08] Léa : et sinon il faut qu'on parle du renouvellement du contrat avec l'imprimeur 
parce que leurs tarifs ont augmenté de 12%
[10:09] Amandine : ah bon c'est beaucoup, on regarde ça ensemble jeudi avec les chiffres, 
Karim tu peux préparer un comparatif avec deux autres imprimeurs d'ici jeudi
[10:09] Karim : ok pas de souci
```$tt$, $tt$Travail à faire : Rédige un compte-rendu structuré de cette réunion avec trois sections claires (points abordés, décisions prises, actions à faire avec responsable et échéance), en nettoyant le langage oral et en corrigeant les incohérences de la transcription.$tt$
from taches t where t.code = 'F04';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Interview d'un artisan pour un article de blog$tt$, $tt$Contexte : Tu es chargé(e) de communication et tu interviewes un boulanger pour un article "portrait" destiné au site web de la ville. Transcription brute de l'enregistrement :$tt$, $tt$```
alors moi j'ai repris la boulangerie de mon père y a maintenant 8 ans, avant ça je 
travaillais dans un restaurant à Lyon comme commis mais bon j'ai toujours voulu faire 
du pain, c'est vraiment une passion depuis que je suis gamin je trainais déjà dans le 
fournil avec mon père le mercredi

la question la plus dure au début ça a été de reprendre la clientèle de mon père sans 
perdre les habitudes du quartier, les gens ils étaient habitués à sa façon de faire le 
pain donc il fallait que j'apporte des nouveautés sans trop bousculer non plus, j'ai 
gardé sa recette de baguette tradition mais j'ai ajouté des pains spéciaux, le pain aux 
graines par exemple ça cartonne, et le pain au levain aussi

alors la partie la plus difficile du métier clairement c'est les horaires, je me lève à 
3h30 du matin tous les jours sauf le lundi qui est mon jour de fermeture, et niveau 
concurrence bah y a deux boulangeries industrielles qui se sont installées dans la zone 
commerciale à côté, ça a fait un peu baisser mon chiffre d'affaire les deux premières 
années mais maintenant ça s'est stabilisé parce que les gens reviennent vers le fait 
maison

pour l'avenir j'aimerais bien ouvrir un deuxième point de vente, peut être dans le 
centre-ville, mais c'est un projet à plus long terme, faut d'abord que je trouve 
quelqu'un de confiance pour gérer ce magasin la parce que je peux pas être aux deux 
en même temps
```$tt$, $tt$Travail à faire : Rédige un résumé structuré de cette interview en 4 à 6 phrases utilisables pour un article web (reprise de l'activité, identité du métier, défis rencontrés, projets futurs), en conservant fidèlement le sens des propos sans en inventer.$tt$
from taches t where t.code = 'F04';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Cabinet dentaire$tt$, $tt$Contexte : Tu es secrétaire médicale du cabinet du Dr Aïcha Benali et dois organiser la semaine du 14 au 18 septembre à partir de plusieurs demandes reçues.$tt$, $tt$Agenda actuel (déjà rempli) :
```
Lundi 14/09 : 9h-12h consultations (complet), 14h-15h réunion cabinet, 
              15h-18h consultations (complet)
Mardi 15/09 : 9h-13h bloc chirurgical (implants, non déplaçable), 
              14h-18h consultations (2 créneaux libres : 16h et 17h30)
Mercredi 16/09 : Cabinet fermé (jour de repos habituel)
Jeudi 17/09 : 9h-12h consultations (1 créneau libre à 11h), 
              14h-18h consultations (complet)
Vendredi 18/09 : 9h-12h consultations (complet), après-midi libre 
                 (formation continue prévue de 14h à 17h, non annulable)
```$tt$, $tt$Travail à faire : Propose un planning révisé de la semaine intégrant ces 4 demandes en respectant les contraintes existantes, en priorisant les cas selon leur urgence réelle, et rédige le message de confirmation à envoyer à Mme Torres.$tt$
from taches t where t.code = 'F05';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Consultant indépendant en informatique$tt$, $tt$Contexte : Tu es consultant IT indépendant. Tu dois organiser tes rendez-vous clients de la semaine tout en gardant du temps pour tes missions en cours.$tt$, $tt$Contraintes connues :
```
- Mission facturée en cours chez le client "GroupeMoteva" : nécessite au moins 
  4h de travail concentré par jour du lundi au jeudi, idéalement le matin.
- Vendredi après-midi : bloqué pour la comptabilité mensuelle (fixe, ne bouge jamais).
- Temps de trajet estimé pour un rendez-vous en présentiel à Paris intra-muros 
  depuis son bureau en banlieue : 45 minutes aller, 45 minutes retour.
```$tt$, $tt$Travail à faire : Construis un planning de la semaine (lundi à vendredi) qui respecte les contraintes de la mission en cours, et indique lequel des deux créneaux proposés par la Librairie du Marais tu recommandes de choisir, avec la justification.$tt$
from taches t where t.code = 'F05';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Responsable marketing, marque de cosmétique bio$tt$, $tt$Contexte : Tu es responsable marketing chez "Botanika", une marque française de cosmétiques bio (crèmes visage, huiles). Ta direction te demande une note de veille mensuelle sur 3 concurrents directs.$tt$, $tt$Notes brutes collectées pendant le mois (à traiter) :
```
Concurrent A "Verdance" : a lancé une gamme "peaux sensibles" en juin, prix 
  positionné 15% en dessous de nos produits équivalents. Vu passer une pub 
  Instagram avec 45k likes. A ouvert un compte TikTok en juillet, 12 vidéos 
  postées, croissance rapide (0 à 8000 abonnés en 6 semaines).

Concurrent B "PureNature" : rien de notable ce mois-ci sur les réseaux, mais 
  a annoncé un partenariat avec une chaîne de pharmacies (200 points de vente) 
  pour la distribution physique à partir de septembre.

Concurrent C "EcoVisage" : a été épinglé par plusieurs consommateurs sur les 
  réseaux pour une accusation de "greenwashing" concernant l'un de ses 
  emballages annoncé recyclable mais qui ne l'est pas dans toutes les 
  communes. Buzz négatif modéré (environ 300 commentaires cumulés sur 
  Instagram et un article sur un site spécialisé beauté).

Contexte marché général noté par Léa : hausse de la demande pour les formats 
  "solides" (shampoings et savons solides) selon les retours de deux 
  distributeurs partenaires. Une tendance déjà repérée en janvier mais qui 
  semble s'accélérer.
```$tt$, $tt$Travail à faire : Rédige une note de veille synthétique (une demi-page maximum) organisée par concurrent, qui identifie les signaux à surveiller de près et propose une recommandation d'action pour Botanika basée uniquement sur les informations fournies, sans inventer de données supplémentaires.$tt$
from taches t where t.code = 'F07';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Artisan menuisier souhaitant se positionner sur un nouveau marché$tt$, $tt$Contexte : Tu es menuisier ébéniste indépendant (Nantes) et envisages de te lancer dans l'agencement de cuisines sur-mesure en complément de ton activité meubles. Tu as demandé à ton neveu, étudiant en marketing, de rassembler des informations avant de te décider.$tt$, $tt$Informations collectées par le neveu (à traiter) :
```
- 4 entreprises d'agencement de cuisine sur-mesure repérées dans un rayon de 
  30 km autour de Nantes : deux sont des franchises nationales (avec showroom), 
  deux sont des artisans indépendants comme Thomas envisage de le devenir.

- Les deux artisans indépendants n'ont pas de site web à jour (dernier post 
  Facebook il y a plus d'un an pour l'un, pas de réseaux sociaux du tout 
  pour l'autre).

- Les deux franchises nationales affichent des délais de livraison de 8 à 
  12 semaines et des avis clients en ligne mitigés (nombreuses plaintes sur 
  les délais non respectés, note moyenne 3,2/5 sur 120 avis pour l'une d'elles).

- Un article professionnel du secteur bois (non daté précisément, retrouvé 
  par le neveu) mentionne une hausse de la demande en agencement sur-mesure 
  "haut de gamme" ces dernières années, portée par la rénovation plutôt que 
  le neuf.

- Le neveu n'a pas réussi à trouver d'information fiable sur les tarifs 
  pratiqués par les artisans indépendants du secteur.
```$tt$, $tt$Travail à faire : Rédige une synthèse pour toi-même qui distingue clairement ce qui est une information vérifiée de ce qui reste une hypothèse ou une donnée manquante, et propose 2 questions précises que tu devrais chercher à faire vérifier avant de te lancer.$tt$
from taches t where t.code = 'F07';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Gérante d'une boutique de vêtements$tt$, $tt$Contexte : Tu gères une boutique de prêt-à-porter "Alto Mode" à Bordeaux. Tu veux comprendre pourquoi ton chiffre d'affaires a baissé au 2e trimestre.$tt$, $tt$Données brutes fournies (export caisse simplifié, par mois) :
```
Janvier  : CA 18 400€ | Nb tickets 612 | Panier moyen 30,07€
Février  : CA 16 900€ | Nb tickets 590 | Panier moyen 28,64€
Mars     : CA 21 300€ | Nb tickets 680 | Panier moyen 31,32€  (soldes d'hiver)
Avril    : CA 14 200€ | Nb tickets 510 | Panier moyen 27,84€
Mai      : CA 12 800€ | Nb tickets 470 | Panier moyen 27,23€
Juin     : CA 13 100€ | Nb tickets 455 | Panier moyen 28,79€

Ta note complémentaire : "Un concurrent (grande enseigne) a ouvert à 
100 mètres de ma boutique fin mars. Aussi, j'ai réduit mes horaires 
d'ouverture le samedi matin depuis avril (ouverture à 10h30 au lieu de 9h30) 
faute de personnel disponible."
```$tt$, $tt$Travail à faire : Analyse ces données pour identifier la tendance sur le trimestre avril-juin comparée au trimestre janvier-mars, formule 2 hypothèses explicatives basées uniquement sur les faits fournis (pas d'invention), et rédige un mini-rapport d'une page avec une recommandation.$tt$
from taches t where t.code = 'F08';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Responsable RH d'une PME industrielle$tt$, $tt$Contexte : Tu travailles au service RH de "Mécatech Industries" (140 salariés) et dois préparer un rapport trimestriel sur l'absentéisme pour le comité de direction.$tt$, $tt$Données brutes (par service, T2 2026) :
```
Service Production (85 salariés) : 412 jours d'absence cumulés au T2, 
  dont 180 jours pour arrêts maladie courts (1 à 3 jours), 150 jours pour 
  arrêts maladie longs (>7 jours, 4 salariés concernés), 82 jours pour 
  accidents du travail (3 déclarations).

Service Logistique (25 salariés) : 95 jours d'absence cumulés, dont 60 jours 
  d'arrêts courts, 35 jours d'arrêts longs (1 salarié).

Service Administratif (20 salariés) : 38 jours d'absence cumulés, 
  essentiellement des arrêts courts.

Service Commercial (10 salariés) : 12 jours d'absence cumulés.

Comparaison T1 2026 (même périmètre) : Production 290 jours, Logistique 
  70 jours, Administratif 40 jours, Commercial 15 jours.
```$tt$, $tt$Travail à faire : Calcule le taux d'absentéisme par service (jours d'absence / (nb salariés × jours ouvrés du trimestre, à estimer à 63 jours ouvrés pour le T2), exprimé en %), identifie le service qui se dégrade le plus entre T1 et T2, et rédige la synthèse à présenter au comité de direction avec un point d'alerte si nécessaire.$tt$
from taches t where t.code = 'F08';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Garage automobile$tt$, $tt$Contexte : Tu gères le garage "Auto Services Moreau". Tu reçois tes factures fournisseurs par email en pièce jointe PDF et dois préparer leur saisie dans ton logiciel de comptabilité.$tt$, $tt$Contenu retranscrit d'une facture reçue (telle qu'elle apparaît, avec quelques éléments difficiles à lire) :
```
PIECES AUTO DISTRIBUTION SUD
12 rue de l'Industrie, 31200 Toulouse
SIRET : 412 XXX 445 00027 (les 3 derniers chiffres du SIRET sont mal 
scannés, illisibles)

FACTURE N° PAD-08842
Date : 22/0[chiffre illisible, probablement 8 ou 3]/2026
Client : Auto Services Moreau
N° commande : CMD-5567

Désignation                          Qté    Prix unit HT    Total HT
Plaquettes de frein avant Bosch       4        28,50€        114,00€
Disques de frein Brembo               2        65,00€        130,00€
Filtre à huile référence FO-2281      6         8,20€         49,20€
Kit distribution Renault Clio IV      1       210,00€        210,00€

Total HT : 503,20€
TVA 20% : 100,64€
Total TTC : 603,84€

Conditions : paiement à 30 jours fin de mois
```$tt$, $tt$Travail à faire : Prépare un tableau de saisie comptable avec les champs (fournisseur, n° facture, date, montant HT, TVA, montant TTC, échéance de paiement), et signale explicitement les deux informations illisibles ou incertaines sur la facture plutôt que de les deviner.$tt$
from taches t where t.code = 'F11';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Association culturelle gérant des adhésions$tt$, $tt$Contexte : Tu es trésorière bénévole de l'association "Les Amis du Théâtre" et dois saisir dans un tableur les bulletins d'adhésion papier reçus par courrier ce mois-ci.$tt$, $tt$Bulletins reçus (retranscription du contenu manuscrit tel que rempli par les adhérents) :
```
Bulletin 1 : Nom "DUBOIS Marie", né(e) le 14/03/1978, adresse "8 rue des 
  Lilas, 44000 Nantes", email "m.dubois78[le reste de l'adresse email est 
  taché par de l'humidité, illisible]", téléphone "06 12 45 XX 89" (deux 
  chiffres surchargés, difficile à distinguer entre 78 et 79), type 
  d'adhésion coché : "Adhésion famille (45€)", moyen de paiement : chèque 
  joint n°1122334.

Bulletin 2 : Nom "TRAN Van", né(e) le 02/11/1990, adresse "22 bis avenue 
  Jean Jaurès, 44000 Nantes", email "van.tran90@gmail.com", téléphone 
  "06 78 90 12 34", type d'adhésion coché : "Adhésion individuelle (25€)", 
  moyen de paiement : virement (référence "VIR-TRAN-0609" indiquée).

Bulletin 3 : Nom "N'GUESSAN Aya", date de naissance non renseignée (case 
  vide), adresse "5 rue de la Paix, 44100 Nantes", email absent, téléphone 
  "07 55 XX XX 21" (illisible sur 4 chiffres), deux cases cochées par 
  erreur pour le type d'adhésion (individuelle ET famille), moyen de 
  paiement : espèces, 25€ joint dans une enveloppe.
```$tt$, $tt$Travail à faire : Prépare le tableau de saisie des 3 adhésions avec toutes les colonnes utiles, et rédige la liste des points à clarifier avec les adhérents concernés avant de valider définitivement leur dossier (sans inventer les informations manquantes ou illisibles).$tt$
from taches t where t.code = 'F11';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Cabinet d'avocat, dossier client$tt$, $tt$Contexte : Tu es assistant(e) juridique du cabinet "Vasseur & Partners" et dois remettre de l'ordre dans le dossier numérique d'un client avant une audience.$tt$, $tt$Liste des fichiers actuels dans le dossier (noms d'origine, en vrac) :
```
- contrat final v2 (1).pdf
- Scan_20260615_142233.pdf
- courrier adverse.docx
- IMG_8842.jpg
- Sans titre.pdf
- facture honoraires sept.pdf
- pièces jointes client (2).zip
- assignation tribunal.pdf
- notes réunion 12 09.docx
- contrat_signé_DEFINITIF_DEFINITIF.pdf
- preuve envoi recommandé.pdf
- Copie de courrier adverse.docx
```$tt$, $tt$Travail à faire : Propose une convention de nommage cohérente pour ce dossier (avec un exemple de format type), renomme chaque fichier identifiable selon cette convention, et signale les 2 fichiers qui nécessitent une vérification humaine avant classement définitif (doublons potentiels ou fichier non identifié).$tt$
from taches t where t.code = 'F12';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Auto-entrepreneur, classement des justificatifs pour la déclaration fiscale$tt$, $tt$Contexte : Tu es graphiste indépendante et dois classer tes justificatifs de dépenses professionnelles de l'année pour ta déclaration fiscale annuelle. Tes fichiers sont actuellement dans un seul dossier "Factures divers".$tt$, $tt$Liste des fichiers présents :
```
- reçu adobe janvier.pdf
- reçu adobe fevrier.pdf
- facture ordinateur portable.pdf
- ticket restaurant 15-03.jpg
- ticket essence.jpg
- reçu adobe mars.pdf
- facture formation photoshop.pdf
- assurance RC pro.pdf
- ticket restaurant 22-03.jpg
- reçu adobe (encore un autre, avril).pdf
- facture imprimante.pdf
- péage autoroute avril.jpg
```$tt$, $tt$Travail à faire : Propose une arborescence de classement par catégorie de dépense (abonnements logiciels, matériel, formation, frais de déplacement/repas, assurances), avec une convention de nommage uniforme incluant la date, et indique dans quelle catégorie ranger chacun des 12 fichiers listés.$tt$
from taches t where t.code = 'F12';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Gérant de restaurant, comparaison de deux devis fournisseurs$tt$, $tt$Contexte : Tu gères le restaurant "Le Comptoir Basque" et dois choisir entre deux devis reçus pour le renouvellement du contrat de ton fournisseur de linge professionnel (nappes, serviettes, tenues de cuisine).$tt$, $tt$Devis A - Fournisseur "Linéa Pro" :
```
Forfait mensuel : 340€ HT
Fréquence de livraison/collecte : 2 fois par semaine (mardi et vendredi)
Inclus : 80 nappes, 200 serviettes, 15 tenues de cuisine
Durée d'engagement : 24 mois
Pénalité de résiliation anticipée : 3 mois de forfait restant dû
Délai de remplacement en cas d'article défectueux : 5 jours ouvrés
```$tt$, $tt$Travail à faire : Construis un tableau comparatif clause par clause des deux devis, identifie les 3 différences qui ont le plus d'impact financier ou opérationnel pour un restaurant, et formule une recommandation argumentée sans ajouter de critères non mentionnés dans les devis.$tt$
from taches t where t.code = 'F13';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Responsable RH, comparaison de deux versions d'un règlement intérieur$tt$, $tt$Contexte : Tu travailles au service RH de "Mécatech Industries" et as reçu de la direction une nouvelle version du règlement intérieur à comparer avec la version actuelle avant présentation au CSE.$tt$, $tt$Version actuelle (extrait, article 8) :
```
Article 8 - Télétravail
Le télétravail est autorisé jusqu'à 2 jours par semaine sur accord du 
manager, pour les postes éligibles. La demande doit être formulée avec un 
préavis de 15 jours. Le matériel informatique nécessaire est fourni par 
l'entreprise. Aucune indemnité de télétravail n'est prévue par le présent 
règlement.
```$tt$, $tt$Travail à faire : Liste précisément chaque changement entre les deux versions (ce qui est ajouté, supprimé ou modifié), classe-les en "favorable au salarié" / "défavorable au salarié" / "neutre", et rédige les 2 points que tu recommanderais de mettre en avant lors de la présentation au CSE.$tt$
from taches t where t.code = 'F13';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - PME exportatrice, traduction d'une fiche produit$tt$, $tt$Contexte : Tu travailles chez "Fromagerie des Alpages" (PME savoyarde), qui exporte désormais vers le Royaume-Uni. Tu dois traduire la fiche produit en anglais pour votre distributeur britannique.$tt$, $tt$Texte source (français) :
```
Tomme des Alpages AOP

Fromage au lait cru de vache, affiné 3 mois minimum en cave naturelle. 
Croûte grise caractéristique, pâte souple à la saveur légèrement noisettée.

Poids : 1,8 kg (meule entière) ou découpe à la demande à partir de 200g.
Conservation : à conserver entre 4°C et 8°C, se conserve 4 semaines après 
ouverture.
Allergènes : lait. Convient aux régimes sans gluten.

Conditionnement : carton de 6 meules, poids total carton environ 10,8 kg.
Prix départ ferme : 14,50€/kg HT.
```$tt$, $tt$Travail à faire : Traduis cette fiche produit en anglais britannique professionnel adapté à un usage commercial (unités converties si pertinent pour le marché UK, ou conservées avec équivalence indiquée), et signale les termes techniques (comme "AOP") qui n'ont pas d'équivalent direct en anglais et nécessitent une explication plutôt qu'une traduction littérale.$tt$
from taches t where t.code = 'F14';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Cabinet de conseil, adaptation d'un email client pour un correspondant international$tt$, $tt$Contexte : Tu es consultant(e) au cabinet "Stratégia Conseil" et dois adapter (pas seulement traduire) un email initialement rédigé en français pour un client allemand, dont le registre de communication professionnelle diffère.$tt$, $tt$Email original en français :
```
Bonjour Klaus,

J'espère que tout va bien de votre côté ! Je voulais vous faire un petit 
point rapide sur l'avancement de notre mission avant notre appel de la 
semaine prochaine.

On a globalement bien avancé sur la partie audit, même si on a pris un 
peu de retard sur le volet RH (environ une semaine). Rien d'inquiétant, on 
devrait rattraper ça sans souci d'ici la fin du mois.

N'hésitez pas si vous avez des questions d'ici notre échange !

Bien à vous,
Antoine
```$tt$, $tt$Travail à faire : Adapte cet email en allemand professionnel (registre plus formel, structure plus directe, sans les tournures de politesse informelles typiquement françaises), en conservant fidèlement toutes les informations factuelles (l'avancement, le retard d'une semaine sur le volet RH). Si tu ne maîtrises pas suffisamment l'allemand pour garantir un résultat fiable, indique clairement les points de vigilance à faire vérifier par un locuteur natif plutôt que de livrer une traduction non certaine.$tt$
from taches t where t.code = 'F14';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Directeur commercial, présentation des résultats trimestriels$tt$, $tt$Contexte : Tu es directeur (directrice) commercial(e) de "Mécatech Industries" et dois présenter les résultats du T2 au comité de direction en 6 slides maximum.$tt$, $tt$Brief et données fournies :
```
Objectif : convaincre la direction d'investir dans un 4e commercial pour 
la région Sud-Est.

Données T2 2026 :
- CA total T2 : 1 240 000€ (vs 1 180 000€ au T2 2025, soit +5%)
- Région Nord (2 commerciaux) : CA 520 000€, +8% vs N-1
- Région Sud-Est (1 commercial) : CA 310 000€, +2% vs N-1
- Région Ouest (2 commerciaux) : CA 410 000€, +6% vs N-1
- Nombre de prospects qualifiés non traités faute de temps commercial, 
  région Sud-Est : 34 (estimation du commercial en poste)
- Coût annuel chargé d'un commercial junior : environ 48 000€
- Panier moyen d'un client région Sud-Est : 12 500€/an
```$tt$, $tt$Travail à faire : Construis le plan détaillé des 6 slides (titre de chaque slide + contenu clé, sans mise en forme graphique), en structurant l'argumentaire autour de l'objectif de convaincre d'investir dans un commercial supplémentaire, et calcule le seuil de rentabilité de ce recrutement à partir des données fournies.$tt$
from taches t where t.code = 'F15';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Responsable formation, présentation d'un nouveau parcours d'intégration$tt$, $tt$Contexte : Tu es responsable formation de l'entreprise "Solaris Énergie" et dois présenter en réunion RH un nouveau parcours d'intégration pour les nouveaux salariés.$tt$, $tt$Brief fourni :
```
Objectif de la présentation : présenter le nouveau parcours en 5 slides 
maximum devant les managers, pour qu'ils comprennent leur rôle dans le 
processus.

Contenu du nouveau parcours (notes de la responsable formation) :
Semaine 1 : accueil administratif (jour 1), visite des locaux et 
présentation des équipes (jour 1-2), formation sécurité obligatoire 
(jour 2), rencontre avec le manager pour définir les objectifs à 30-60-90 
jours (jour 3).
Semaine 2-4 : formation métier avec un référent désigné, point 
hebdomadaire de 15 minutes avec le manager.
Jour 30 : entretien de suivi formalisé avec le manager (grille d'évaluation 
fournie par les RH).
Jour 90 : entretien de fin de période d'essai.

Problème actuel identifié à mentionner : 40% des nouveaux salariés interrogés 
en sortie de période d'essai (sur les 12 derniers mois) déclarent ne pas avoir 
eu de rencontre formalisée avec leur manager avant le 30e jour.
```$tt$, $tt$Travail à faire : Construis le plan détaillé des 5 slides avec le contenu de chacune, en mettant en avant clairement ce qui change par rapport à la situation actuelle (le problème des 40%) et le rôle concret attendu du manager à chaque étape.$tt$
from taches t where t.code = 'F15';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Chef de projet événementiel$tt$, $tt$Contexte : Tu es chef de projet à l'agence "Événements Réunis" et organises un salon professionnel pour un client dans 6 semaines. Voici les notes de suivi prises en réunion de lancement.$tt$, $tt$Notes brutes de réunion (à structurer) :
```
Il faut réserver le lieu (le client a une préférence pour le Palais des 
Congrès mais il faut vérifier la dispo et le budget, c'est Sophie qui gère 
ça normalement mais elle est en congés la semaine prochaine donc peut-être 
Marc peut prendre le relai en attendant). Le traiteur doit être choisi 
avant la fin du mois, on a 3 devis à comparer, c'est Julien qui s'en occupe. 
La communication (invitations, réseaux sociaux) commence dans 2 semaines, 
Amélie doit valider les visuels avec le client avant. Il manque encore la 
liste définitive des intervenants, le client doit nous la faire parvenir, 
on ne peut rien avancer sur le programme tant qu'on ne l'a pas. La 
logistique technique (sonorisation, écrans) doit être commandée au 
prestataire habituel, Marc s'en charge, mais il faut d'abord confirmer le 
nombre de salles définitif qui dépend du lieu choisi. Le budget global 
doit être validé par le client avant le 15, actuellement en attente de 
retour de sa part.
```$tt$, $tt$Travail à faire : Structure ces notes en un tableau de suivi d'actions avec colonnes (action, responsable, échéance, statut, ce qui bloque éventuellement l'action), identifie les 2 dépendances critiques qui pourraient retarder le projet si elles ne sont pas résolues rapidement, et propose l'ordre de priorité des actions pour la semaine à venir.$tt$
from taches t where t.code = 'F16';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Responsable travaux, rénovation d'un local commercial$tt$, $tt$Contexte : Tu es gérant(e) d'une future boutique et dois suivre l'avancement des travaux de rénovation de ton local avant ouverture prévue dans 8 semaines, à partir des échanges avec les différents corps de métier.$tt$, $tt$Informations éparses collectées (par SMS, appels, emails) :
```
- L'électricien a dit qu'il pouvait commencer dans 10 jours, pour une 
  durée de travaux estimée à 5 jours.
- Le plombier doit intervenir avant l'électricien pour les arrivées d'eau, 
  mais n'a pas encore donné de date précise, "il rappelle cette semaine".
- Le peintre ne peut passer qu'après l'électricité et la plomberie 
  terminées, il a annoncé être disponible "à partir de début octobre" 
  sous réserve.
- Le fournisseur de mobilier de vente (comptoir, étagères) a confirmé une 
  livraison sous 4 semaines à compter de la commande, qui n'a pas encore 
  été passée car le plan définitif du magasin n'est pas figé.
- Tu dois toi-même t'occuper de la demande d'enseigne auprès de la 
  mairie, délai d'instruction annoncé de 4 à 6 semaines.
```$tt$, $tt$Travail à faire : Construis un tableau de suivi avec les dépendances entre les différentes tâches (qui doit être fini avant que l'autre commence), identifie le chemin critique (la suite d'actions qui, si elle prend du retard, retarde directement l'ouverture), et signale si l'ouverture dans 8 semaines te semble réaliste au vu des informations données, en justifiant.$tt$
from taches t where t.code = 'F16';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Institut de beauté indépendant$tt$, $tt$Contexte : Tu es gérant(e) de l'institut "Belle Écorce" (Toulouse) et veux planifier ton contenu Instagram pour les 2 prochaines semaines. Tu as listé en vrac ce que tu veux communiquer.$tt$, $tt$Tes notes en vrac (à structurer) :
```
- Nouvelle prestation "soin visage éclat" lancée le 15, il faudrait en parler 
  avant et le jour J
- Anniversaire de l'institut le 22 (5 ans), envie de faire quelque chose de 
  festif, peut-être un jeu concours
- J'ai plein de photos "avant/après" de manucures que je n'ai jamais postées
- Une cliente a laissé un avis Google 5 étoiles super sympa la semaine dernière
- Je veux montrer les coulisses, genre une story où je prépare la salle le matin
- Il y a la fête des mères qui approche (dans 3 semaines), je vends des 
  coffrets cadeaux
- Je n'ai jamais présenté mon équipe (on est 3 avec moi)
```$tt$, $tt$Travail à faire : Construis un calendrier de publication sur 14 jours (jour, format - post/story/reel, thème, accroche courte) qui organise ces idées de façon cohérente, en respectant un rythme réaliste pour une seule personne qui gère aussi l'institut au quotidien (pas plus d'un post élaboré par jour).$tt$
from taches t where t.code = 'F02';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Entreprise B2B de menuiserie industrielle$tt$, $tt$Contexte : Tu es responsable communication de "Structa Bois" (fabricant de charpentes industrielles, clientèle B2B) et dois préparer le contenu LinkedIn du mois, un canal très différent du grand public.$tt$, $tt$Éléments disponibles :
```
- Un chantier récemment terminé : charpente d'un hangar agricole de 2000m², 
  délai de livraison tenu malgré une pénurie de bois annoncée en amont.
- Un salarié fête ses 20 ans dans l'entreprise le mois prochain.
- L'entreprise participe à un salon professionnel du BTP dans 5 semaines 
  (stand B42).
- Une nouvelle certification qualité obtenue (ISO 9001) le mois dernier, 
  pas encore communiquée.
- Le dirigeant a été interviewé par un journal économique régional, 
  l'article sort dans 10 jours.
```$tt$, $tt$Travail à faire : Propose un calendrier de 6 publications LinkedIn sur le mois avec pour chacune le format, l'angle éditorial adapté à une audience B2B professionnelle (pas le même ton que pour du grand public), et la date de publication recommandée en tenant compte des échéances mentionnées (salon, sortie de l'article).$tt$
from taches t where t.code = 'F02';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Boutique en ligne de vêtements pour enfants$tt$, $tt$Contexte : Tu gères "Petits Marmots", une boutique en ligne qui reçoit de plus en plus de questions répétitives par email. Tu souhaites créer une FAQ pour désengorger le support.$tt$, $tt$Historique des 10 derniers emails reçus (à traiter) :
```
1. "Combien de temps pour être livré si je commande aujourd'hui ?"
2. "Je fais quelle taille pour mon fils de 4 ans, il est plutôt grand pour son âge ?"
3. "Le body est déchiré à la couture, comment je fais pour l'échanger ?"
4. "Vous livrez en Belgique ?"
5. "J'ai commandé il y a 2 semaines et toujours rien reçu, c'est normal ?"
6. "C'est quoi votre politique de retour, j'ai 14 jours ou 30 jours ?"
7. "Le pyjama que je veux commander est en rupture, il revient quand ?"
8. "Comment j'annule ma commande, je viens de me tromper de taille"
9. "Vous faites des réductions pour les naissances multiples (jumeaux) ?"
10. "Le paiement a été refusé mais l'argent a été débité de mon compte"
```$tt$, $tt$Travail à faire : Classe ces 10 questions en "peut être répondu par une FAQ automatique" vs "nécessite une intervention humaine au cas par cas" (comme le n°3 défectueux ou le n°10 paiement débité par erreur), et rédige les réponses FAQ pour les questions qui peuvent l'être, sans inventer d'information non fournie (par exemple ne pas inventer une date de réapprovisionnement).$tt$
from taches t where t.code = 'F06';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Salle de sport indépendante$tt$, $tt$Contexte : Tu gères "Fit Zone", une salle de sport de quartier, et veux créer une FAQ pour son site web à partir des questions les plus posées à l'accueil.$tt$, $tt$Questions notées par l'équipe d'accueil sur une semaine :
```
1. "Je peux venir tester une séance avant de m'engager ?"
2. "C'est combien l'abonnement, il y a plusieurs formules ?"
3. "Je peux suspendre mon abonnement si je pars en vacances longtemps ?"
4. "Vous avez un coach pour débuter la musculation ?"
5. "Les cours collectifs sont inclus dans l'abonnement de base ?"
6. "Comment je résilie mon abonnement ?"
7. "Le parking est gratuit ?"
8. "Vous avez des vestiaires avec douches ?"
9. "Je peux amener un ami gratuitement une fois ?"
10. "Quel est l'âge minimum pour s'inscrire seul ?"
```$tt$, $tt$Travail à faire : Rédige la FAQ complète (question reformulée si besoin + réponse) pour ce qui peut être répondu avec les informations disponibles, et signale les questions pour lesquelles il manque une information officielle de l'entreprise pour répondre correctement (sans l'inventer).$tt$
from taches t where t.code = 'F06';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Agence immobilière$tt$, $tt$Contexte : Tu es assistant(e) à l'agence "Clé en Main Immobilier", qui reçoit ses demandes via un formulaire de contact unique sur son site, tous types de demandes confondues. Tu dois les répartir chaque matin entre les 3 agents.$tt$, $tt$Demandes reçues ce matin :
```
1. "Bonjour, je suis locataire d'un appartement géré par votre agence 
   (référence LOC-4482), le chauffe-eau ne fonctionne plus depuis hier 
   soir, c'est urgent."

2. "Je souhaiterais estimer la valeur de ma maison en vue d'une vente, 
   pas pressé, dans les 6 prochains mois."

3. "J'ai visité l'appartement rue Victor Hugo hier avec M. Petit, je 
   voudrais faire une offre au prix affiché."

4. "Question générale : quels sont vos horaires d'ouverture le samedi ?"

5. "Je suis propriétaire bailleur (référence PROP-1190), mon locataire ne 
   paie plus son loyer depuis 2 mois, que dois-je faire ?"

6. "Je cherche un 3 pièces à louer, budget max 850€, dans le centre-ville, 
   pouvez-vous me faire visiter quelque chose cette semaine ?"
```$tt$, $tt$Travail à faire : Classe chacune des 6 demandes par ordre de priorité de traitement (avec justification courte), assigne chacune à l'agent compétent, et identifie la demande qui nécessite une réponse dans l'heure.$tt$
from taches t where t.code = 'F25';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Éditeur de logiciel SaaS pour artisans$tt$, $tt$Contexte : Tu es responsable support chez "ArtiSoft" (logiciel de devis/factures pour artisans), qui reçoit ses demandes de support via un chat en ligne. Tu dois répartir les tickets du matin entre ton équipe de 2 personnes (un support technique niveau 1, une personne en charge de la facturation/comptes clients).$tt$, $tt$Tickets reçus :
```
1. "Impossible de me connecter depuis ce matin, message 'erreur serveur 
   500', j'ai un rendez-vous client dans 1h et j'ai besoin d'éditer un 
   devis."

2. "Je voudrais changer de formule d'abonnement, passer de Essentiel à 
   Pro, comment je fais ?"

3. "Ma facture de ce mois est plus élevée que d'habitude, je ne comprends 
   pas pourquoi."

4. "Suggestion : ce serait bien de pouvoir exporter les devis en anglais 
   pour mes clients frontaliers."

5. "Le logo que j'ai uploadé sur mes devis apparaît flou, comment 
   améliorer la qualité ?"

6. "Je n'arrive plus à me connecter, mais quand je regarde bien c'est 
   parce que j'ai oublié mon mot de passe je pense."
```$tt$, $tt$Travail à faire : Classe ces 6 tickets par urgence et par type (bug bloquant / question de facturation / question fonctionnelle / suggestion produit), assigne chacun à la bonne personne de l'équipe, et rédige la réponse immédiate à envoyer pour le ticket n°1 (accusé de réception avec le niveau d'urgence pris en compte).$tt$
from taches t where t.code = 'F25';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Restaurant gastronomique$tt$, $tt$Contexte : Tu gères le restaurant "L'Écrin". Tu as reçu 8 avis Google récents et veux en tirer une synthèse actionnable pour ton équipe.$tt$, $tt$Avis reçus (texte + note sur 5, tels quels) :
```
1. ★★★★★ "Un service impeccable et une cuisine raffinée, le menu 
   dégustation vaut le détour."
2. ★★☆☆☆ "Très déçu, nous avons attendu 25 minutes entre l'entrée et le 
   plat sans explication du personnel."
3. ★★★★★ "Cadre magnifique, personnel très attentionné, on reviendra."
4. ★★★☆☆ "Bonne cuisine mais l'addition est vraiment élevée par rapport 
   à la portion servie."
5. ★★★★☆ "Très bon repas, seul bémol : la salle était bruyante à cause 
   d'une table bruyante à côté, le personnel n'a rien fait pour calmer 
   le jeu."
6. ★★☆☆☆ "Réservé pour 20h, on nous a fait attendre 15 minutes debout 
   au bar sans qu'on nous propose de nous asseoir."
7. ★★★★★ "Meilleur restaurant de la ville, tout simplement parfait."
8. ★★☆☆☆ "Le service est lent, on a dû demander l'addition deux fois 
   avant qu'on nous l'apporte."
```$tt$, $tt$Travail à faire : Calcule la note moyenne, identifie le thème qui revient le plus souvent parmi les avis négatifs (attention à ne pas confondre plusieurs problèmes différents qui se ressemblent), et rédige une synthèse d'une demi-page pour l'équipe avec une recommandation d'action concrète et priorisée.$tt$
from taches t where t.code = 'F26';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Entreprise de déménagement$tt$, $tt$Contexte : Tu travailles chez "Déména Pro", qui envoie systématiquement un questionnaire de satisfaction après chaque prestation. Voici les réponses des 10 derniers clients à la question "Recommanderiez-vous nos services à un proche ? (note de 0 à 10)" et un commentaire libre.$tt$, $tt$Réponses reçues :
```
Client 1 : Note 9 - "Équipe très professionnelle et ponctuelle."
Client 2 : Note 4 - "Un meuble a été abîmé pendant le transport, toujours 
  pas de nouvelles pour le dédommagement 3 semaines après."
Client 3 : Note 10 - "Rien à dire, tout s'est très bien passé."
Client 4 : Note 6 - "Correct mais l'équipe est arrivée avec 1h de retard 
  sans prévenir."
Client 5 : Note 3 - "Devis pas respecté, facture finale 200€ plus chère 
  que prévu sans explication claire."
Client 6 : Note 9 - "Très satisfait, je recommande."
Client 7 : Note 8 - "Bon service dans l'ensemble, juste un peu cher."
Client 8 : Note 2 - "Un carton entier de vaisselle cassé, aucune excuse 
  de l'équipe sur place."
Client 9 : Note 10 - "Parfait du début à la fin."
Client 10 : Note 5 - "Correct mais communication difficile pour fixer 
  la date finale."
```$tt$, $tt$Travail à faire : Calcule le score NPS (% promoteurs [note 9-10] moins % détracteurs [note 0-6], les notes 7-8 étant neutres), identifie les 2 causes de mécontentement qui reviennent le plus souvent chez les détracteurs, et propose une action corrective distincte pour chacune.$tt$
from taches t where t.code = 'F26';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Boutique de vin en ligne$tt$, $tt$Contexte : Tu gères "Cave Numérique" et veux segmenter ta base de 12 clients pour cibler une prochaine campagne promotionnelle différemment selon leur profil.$tt$, $tt$Données clients (extrait CRM) :
```
Client 1 : Dernier achat il y a 5 jours | 8 achats sur 12 mois | Total dépensé 890€
Client 2 : Dernier achat il y a 210 jours | 1 achat sur 12 mois | Total dépensé 45€
Client 3 : Dernier achat il y a 12 jours | 6 achats sur 12 mois | Total dépensé 620€
Client 4 : Dernier achat il y a 340 jours | 2 achats sur 12 mois | Total dépensé 310€
Client 5 : Dernier achat il y a 3 jours | 1 achat sur 12 mois | Total dépensé 1200€
Client 6 : Dernier achat il y a 45 jours | 4 achats sur 12 mois | Total dépensé 210€
Client 7 : Dernier achat il y a 180 jours | 3 achats sur 12 mois | Total dépensé 540€
Client 8 : Dernier achat il y a 8 jours | 9 achats sur 12 mois | Total dépensé 1450€
Client 9 : Dernier achat il y a 400 jours | 1 achat sur 12 mois | Total dépensé 60€
Client 10 : Dernier achat il y a 25 jours | 5 achats sur 12 mois | Total dépensé 380€
Client 11 : Dernier achat il y a 90 jours | 2 achats sur 12 mois | Total dépensé 150€
Client 12 : Dernier achat il y a 15 jours | 7 achats sur 12 mois | Total dépensé 980€
```$tt$, $tt$Travail à faire : Classe ces 12 clients en au moins 4 segments cohérents (par exemple clients fidèles à forte valeur, clients à réactiver, gros acheteurs occasionnels, petits clients inactifs), en expliquant le critère utilisé pour chaque segment, et propose un message ou une offre adaptée à chacun des segments identifiés.$tt$
from taches t where t.code = 'F27';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Salle d'escalade avec abonnements$tt$, $tt$Contexte : Tu gères "Vertical Club" et veux identifier les profils d'adhérents pour adapter ta communication avant le renouvellement des abonnements annuels.$tt$, $tt$Données adhérents (extrait) :
```
Adhérent A : inscrit depuis 3 ans | 4 passages/mois en moyenne | 
  abonnement Premium (accès illimité + casiers)
Adhérent B : inscrit depuis 2 mois | 12 passages/mois en moyenne | 
  abonnement Standard
Adhérent C : inscrit depuis 4 ans | 0,5 passage/mois en moyenne (quasi 
  jamais venu depuis 6 mois) | abonnement Premium
Adhérent D : inscrit depuis 1 an | 8 passages/mois | abonnement Standard, 
  a déjà recommandé 2 amis (parrainage)
Adhérent E : inscrit depuis 5 mois | 1 passage/mois en moyenne | 
  abonnement Standard
Adhérent F : inscrit depuis 6 ans | 6 passages/mois | abonnement Premium, 
  participe à toutes les sorties du club
```$tt$, $tt$Travail à faire : Identifie parmi ces 6 profils celui qui présente le plus grand risque de ne pas renouveler son abonnement (et pourquoi), celui qui pourrait être approché pour devenir "ambassadeur" du club, et propose une action de communication différenciée pour au moins 3 profils distincts.$tt$
from taches t where t.code = 'F27';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Institut de beauté (suite du cas F02)$tt$, $tt$Contexte : Tu es Léna ("Belle Écorce") et as lancé ta première campagne publicitaire Meta il y a 2 semaines pour promouvoir ton nouveau soin visage. Tu constates des résultats décevants et veux comprendre pourquoi avant de continuer à dépenser.$tt$, $tt$Données de la campagne actuelle :
```
Structure actuelle : 1 campagne, 5 ensembles de publicités différents 
  (un par quartier ciblé de la ville), chacun avec un budget quotidien 
  de 4€ (soit 20€/jour au total).

Résultats après 14 jours :
- Budget total dépensé : 280€
- Impressions totales : 18 400
- Clics totaux : 210 (taux de clic 1,14%)
- Prises de rendez-vous générées : 3
- Coût par rendez-vous : environ 93€
- Note : le compte publicitaire affiche toujours le statut "Apprentissage" 
  sur 4 des 5 ensembles de publicités, même après 14 jours.
- Le soin visage vendu coûte 65€, marge estimée à 40€ par soin.
```$tt$, $tt$Travail à faire : Identifie le problème structurel principal de cette campagne à partir des données fournies (nombre d'ensembles de publicités vs budget disponible), calcule si la campagne est rentable en l'état, et propose une restructuration de la campagne (nombre d'ensembles de publicités et répartition du budget) pour sortir de la phase d'apprentissage plus rapidement.$tt$
from taches t where t.code = 'F28';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Boutique en ligne de vêtements pour enfants (suite du cas F06)$tt$, $tt$Contexte : Tu es le fondateur (la fondatrice) de "Petits Marmots" et fais tourner deux campagnes publicitaires en parallèle. Tu veux savoir laquelle continuer à financer.$tt$, $tt$Données des 2 campagnes (30 derniers jours) :
```
Campagne A "Nouveaux visiteurs" - ciblage large, personnes n'ayant jamais 
  acheté :
  Budget dépensé : 620€ | Impressions : 142 000 | Clics : 1 850 | 
  Achats générés : 14 | Panier moyen : 38€ | CA généré : 532€

Campagne B "Reciblage" - ciblage des visiteurs ayant déjà consulté le 
  site sans acheter :
  Budget dépensé : 180€ | Impressions : 22 000 | Clics : 610 | 
  Achats générés : 22 | Panier moyen : 42€ | CA généré : 924€
```$tt$, $tt$Travail à faire : Calcule le retour sur investissement publicitaire (ROAS = CA généré / budget dépensé) de chaque campagne, détermine laquelle est la plus performante et pourquoi selon toi (au vu de la nature du ciblage), et propose une nouvelle répartition du budget total (800€) entre les deux campagnes pour le mois prochain, en justifiant.$tt$
from taches t where t.code = 'F28';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Cabinet de courtage en assurance$tt$, $tt$Contexte : Tu travailles au cabinet "AssurConseil", qui fusionne deux fichiers clients suite au rachat d'un confrère. Tu dois nettoyer la base avant import dans le CRM.$tt$, $tt$Extrait de la base fusionnée (à traiter) :
```
1. DUPONT Jean | jean.dupont@email.fr | 06 12 34 56 78 | dernier contact 
   03/2026
2. Dupont J. | j.dupont@email.fr | 06 12 34 56 78 | dernier contact 08/2024
3. MARTIN Sophie | s.martin@pro-mail.com | 06 98 76 54 32 | dernier 
   contact 07/2026
4. BENALI Karim | k.benali@email.fr | (téléphone manquant) | dernier 
   contact 01/2025
5. Martin Sophie | sophie.martin@pro-mail.com | 06 98 76 54 33 | dernier 
   contact 02/2023 (numéro différent d'un chiffre de la ligne 3)
6. LEFEBVRE Anne | a.lefebvre@email.fr | 07 11 22 33 44 | dernier contact 
   09/2026
7. GARCIA Miguel | (email manquant) | 06 55 44 33 22 | dernier contact 
   06/2026
8. TRAN Linh | linh.tran@email.fr | 06 40 50 60 70 | dernier contact 
   05/2026, mention "client parti à la concurrence en 2025" en note libre
```$tt$, $tt$Travail à faire : Identifie les doublons probables (justifie ton raisonnement pour chaque cas ambigu, notamment les lignes 3 et 5), propose la fiche fusionnée à conserver pour chaque doublon identifié, signale les fiches incomplètes nécessitant un enrichissement, et indique si la fiche n°8 doit rester dans la base active de prospection ou être déplacée dans une liste "clients perdus".$tt$
from taches t where t.code = 'F10';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Organisme de formation professionnelle$tt$, $tt$Contexte : Tu travailles chez "FormaPlus" et veux qualifier ta base de contacts avant une campagne de relance commerciale, en distinguant les prospects chauds des contacts obsolètes.$tt$, $tt$Extrait de la base (à qualifier) :
```
1. Contact inscrit à une newsletter il y a 18 mois, jamais ouvert un seul 
   email depuis, aucune autre interaction connue.
2. Contact ayant demandé un devis pour une formation il y a 3 semaines, 
   pas encore recontacté par un commercial.
3. Ancien client ayant suivi une formation il y a 2 ans, a laissé un avis 
   positif, aucun contact depuis.
4. Contact ayant téléchargé une brochure il y a 2 jours et ouvert les 3 
   derniers emails de la newsletter.
5. Contact dont l'adresse email a généré une erreur "boîte inexistante" 
   lors du dernier envoi.
6. Contact ayant assisté à un webinar gratuit il y a 1 semaine et posé 
   une question en fin de session sur les tarifs.
```$tt$, $tt$Travail à faire : Classe ces 6 contacts en 3 catégories (prospect chaud à contacter en priorité / à nourrir avec du contenu avant contact commercial / à retirer ou vérifier avant toute campagne), en justifiant chaque classement à partir des signaux d'engagement fournis.$tt$
from taches t where t.code = 'F10';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Éditeur de logiciel de gestion pour restaurants$tt$, $tt$Contexte : Tu es commercial(e) chez "RestoGest" (logiciel de caisse et gestion de stock pour restaurants) et dois prospecter 3 restaurants repérés comme prospects potentiels.$tt$, $tt$Informations disponibles sur chaque prospect :
```
Prospect 1 : "Le Bistrot du Coin" - restaurant traditionnel, a ouvert un 
  deuxième établissement il y a 2 mois (information trouvée sur leur page 
  Facebook), utilise actuellement un système de caisse papier d'après un 
  post client mentionnant "l'addition écrite à la main".

Prospect 2 : "Sushi Time" - chaîne de 4 restaurants, a publié une offre 
  d'emploi pour un "responsable des opérations multi-sites" il y a 
  1 semaine sur LinkedIn.

Prospect 3 : "La Table Verte" - restaurant végétarien, a laissé un avis 
  négatif client visible publiquement mentionnant "l'attente à la caisse 
  est trop longue aux heures de pointe".
```$tt$, $tt$Travail à faire : Rédige 3 messages de prospection courts (email ou LinkedIn, à préciser), chacun personnalisé à partir de l'information spécifique disponible sur le prospect concerné, avec un appel à l'action clair et différent selon le contexte de chaque prospect.$tt$
from taches t where t.code = 'F17';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Consultant en optimisation énergétique pour entreprises$tt$, $tt$Contexte : Tu es consultant(e) indépendant(e) et dois relancer 2 prospects avec qui le contact a été établi mais qui n'ont pas répondu depuis un moment.$tt$, $tt$Historique disponible :
```
Prospect A "Menuiserie Vasseur" : a téléchargé un guide gratuit sur les 
  aides à la rénovation énergétique il y a 3 semaines via ton site web, 
  aucune réponse depuis un premier email de suivi envoyé il 
  y a 10 jours.

Prospect B "Cabinet dentaire Dr. Renoux" : a eu un appel téléphonique de 
  15 minutes il y a 2 semaines où le dirigeant a mentionné vouloir 
  "réduire la facture d'électricité qui a augmenté de 30% cette année" 
  mais devait "en discuter avec son associée" avant de donner suite.
```$tt$, $tt$Travail à faire : Rédige les 2 messages de relance, adaptés à chaque situation (l'un n'a eu aucun échange humain direct, l'autre a eu une conversation avec une information précise à reprendre), sans être insistant ni inventer d'argument commercial non vérifié sur les économies réalisables.$tt$
from taches t where t.code = 'F17';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Entreprise de nettoyage professionnel$tt$, $tt$Contexte : Tu travailles chez "NetPro Services" et dois préparer un devis pour un prospect (cabinet d'avocats, 400m² de bureaux) suite à une visite technique.$tt$, $tt$Notes prises lors de la visite (à traiter) :
```
- Surface totale : 400m², répartis en 350m² de bureaux/open space et 
  50m² de sanitaires/cuisine
- Fréquence souhaitée par le client : 3 passages par semaine (lundi, 
  mercredi, vendredi), en dehors des horaires de bureau (à partir de 19h)
- Prestations demandées : dépoussiérage, aspiration/lavage sols, 
  vidage poubelles, nettoyage sanitaires et cuisine, nettoyage vitres 
  intérieures une fois par mois
- Tarif habituel de l'entreprise : 0,35€/m² par passage pour les bureaux, 
  0,60€/m² par passage pour sanitaires/cuisine (taux majoré), 
  forfait vitres intérieures : 180€ par intervention mensuelle
- Le client a mentionné avoir un budget "autour de 900€ par mois", sans 
  engagement ferme sur ce chiffre
- Produits écologiques demandés explicitement par le client (surcoût 
  habituel de l'entreprise : +8% sur le tarif de base)
```$tt$, $tt$Travail à faire : Calcule le montant mensuel du devis à partir des tarifs et de la fréquence indiqués, présente une proposition commerciale structurée (contexte du besoin, détail des prestations, prix par poste, prix total, conditions), et indique si le budget mentionné par le client (900€) est cohérent avec le calcul ou s'il faut le signaler comme un écart à discuter.$tt$
from taches t where t.code = 'F18';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Graphiste indépendante$tt$, $tt$Contexte : Tu es graphiste freelance et dois chiffrer une proposition pour la création d'une identité visuelle complète pour une nouvelle marque de thé.$tt$, $tt$Brief reçu du client (à traiter) :
```
Le client souhaite : un logo (avec 2 propositions de piste avant choix 
final), une charte graphique (couleurs, typographies, déclinaisons), 
un template de packaging pour 3 formats de boîtes, et un template de 
réseaux sociaux (5 visuels type). Le client demande une livraison sous 
3 semaines. Aucun budget n'a été communiqué par le client, qui demande 
"un devis pour voir".

Tes tarifs habituels :
- Logo avec 2 pistes + 2 séries de retouches incluses : 650€
- Charte graphique complète : 450€
- Packaging (par format) : 180€/format
- Templates réseaux sociaux (par visuel) : 45€/visuel
- Majoration délai serré (moins de 4 semaines) : +15% sur le total
```$tt$, $tt$Travail à faire : Calcule le montant total du devis à partir des tarifs fournis et du brief, présente-le sous forme de proposition détaillée poste par poste avec le délai annoncé, et rédige une clause claire sur ce qui est inclus ou non dans les "retouches" pour éviter tout malentendu ultérieur avec le client.$tt$
from taches t where t.code = 'F18';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Auto-entrepreneur, activité de coaching sportif$tt$, $tt$Contexte : Tu es coach sportif indépendant et dois catégoriser tes relevés bancaires du mois pour ta comptabilité.$tt$, $tt$Relevé bancaire du mois (libellés bruts, à catégoriser) :
```
1. VIR SEPA DECATHLON PRO - 340,00€
2. PRLV ASSURANCE RC PRO MAAF - 42,00€
3. VIR RECU CLIENT MARTIN SEANCE COACHING - +80,00€
4. CB ESSENCE TOTAL STATION A6 - 65,00€
5. PRLV ABONNEMENT LOGICIEL FACTURATION - 15,00€
6. VIR RECU CLIENT DUBOIS FORFAIT 10 SEANCES - +450,00€
7. CB ACHAT TAPIS DE YOGA X15 UNITES - 890,00€
8. PRLV URSSAF COTISATIONS - 380,00€
9. CB REPAS RESTAURANT AVEC PROSPECT - 48,00€
10. VIR SEPA SALLE DE SPORT LOCATION CRENEAU - 200,00€
```$tt$, $tt$Travail à faire : Catégorise chaque ligne dans l'une des catégories suivantes (Recette prestation, Achat de petit matériel, Charge d'immobilisation si le montant unitaire dépasse 500€ pièce, Charge d'assurance, Frais de déplacement, Abonnement/logiciel, Charge sociale, Frais de représentation/repas professionnel, Location), en signalant explicitement les lignes ambiguës qui nécessiteraient une confirmation (par exemple si l'achat de tapis de yoga à l'unité dépasse ou non le seuil d'immobilisation selon le prix unitaire réel, ici non précisé).$tt$
from taches t where t.code = 'F19';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Petite entreprise de paysagisme$tt$, $tt$Contexte : Tu gères "Jardins & Sens" et dois catégoriser les transactions du mois avant transmission à ton comptable.$tt$, $tt$Relevé bancaire du mois :
```
1. CB ACHAT TRONCONNEUSE STIHL - 620,00€
2. VIR RECU CLIENT CHANTIER TAILLE HAIES - +1 200,00€
3. PRLV CARBURANT PROFESSIONNEL - 210,00€
4. CB ACHAT PLANTS ET TERREAU PEPINIERE - 340,00€
5. VIR SALAIRE EMPLOYE SAISONNIER - 1 450,00€
6. PRLV CHARGES SOCIALES URSSAF - 610,00€
7. VIR RECU CLIENT ENTRETIEN JARDIN MENSUEL - +380,00€
8. CB REPARATION TONDEUSE AUTO-PORTEE - 280,00€
9. PRLV ASSURANCE VEHICULE UTILITAIRE - 95,00€
10. CB ACHAT GANTS ET EQUIPEMENT SECURITE - 75,00€
```$tt$, $tt$Travail à faire : Catégorise chaque ligne dans un plan comptable adapté à cette activité (Recette chantier, Recette contrat récurrent, Achat matières/fournitures, Achat matériel/immobilisation, Charge de personnel, Charge sociale, Entretien/réparation matériel, Assurance, Équipement de sécurité), et identifie la seule ligne pour laquelle il manque une information pour trancher entre "achat de petit matériel" et "immobilisation à amortir".$tt$
from taches t where t.code = 'F19';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Association de quartier$tt$, $tt$Contexte : Tu es trésorier bénévole de l'association "Vivre à Bellevue" et dois rapprocher le relevé bancaire du mois avec le livre de comptes tenu par l'association.$tt$, $tt$Relevé bancaire (banque) :
```
03/09 : Virement reçu cotisation adhérents +85,00€
05/09 : Prélèvement assurance responsabilité civile -120,00€
08/09 : Frais de tenue de compte -8,50€
12/09 : Virement reçu subvention mairie +500,00€
15/09 : Chèque n°0234 débité -150,00€
22/09 : Virement reçu cotisation adhérents +40,00€
Solde bancaire au 30/09 : 1 346,50€
```$tt$, $tt$Travail à faire : Identifie précisément les écarts entre le relevé bancaire et le livre de comptes (élément présent d'un côté mais pas de l'autre), explique la cause probable de chaque écart, et détermine le solde réel exact de l'association après rapprochement complet.$tt$
from taches t where t.code = 'F20';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Cabinet de kinésithérapie$tt$, $tt$Contexte : Tu es secrétaire du cabinet de kinésithérapie et dois rapprocher le compte professionnel avant la clôture mensuelle.$tt$, $tt$Relevé bancaire :
```
02/09 : Virement CPAM remboursements +2 840,00€
04/09 : Prélèvement loyer local professionnel -900,00€
10/09 : Virement CPAM remboursements +1 950,00€
14/09 : Frais bancaires -12,00€
18/09 : Prélèvement URSSAF -680,00€
20/09 : Virement reçu, libellé "VIR SEPA REF INCONNUE" +310,00€
28/09 : Prélèvement électricité local -85,00€
Solde bancaire fin de mois : 3 423,00€
```$tt$, $tt$Travail à faire : Identifie les 2 écarts entre les deux documents, explique ce que chacun représente probablement, et signale lequel des deux écarts nécessite une action de vérification urgente avant de pouvoir clôturer le mois (indice : un virement reçu ne peut pas être enregistré tant que son origine n'est pas identifiée avec certitude).$tt$
from taches t where t.code = 'F20';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Agence de communication$tt$, $tt$Contexte : Tu travailles à l'agence "Pixel & Sens" (déjà rencontrée en catégorie 1) et dois relancer plusieurs clients pour des factures impayées.$tt$, $tt$Liste des factures en retard :
```
1. Client "Boulangerie Ferrand" - Facture n°2026-0341, montant 850€, 
   échéance dépassée de 5 jours, aucun retard habituel de ce client par 
   le passé.

2. Client "Groupe Immo Est" - Facture n°2026-0298, montant 3 200€, 
   échéance dépassée de 35 jours, une première relance envoyée il y a 
   15 jours est restée sans réponse.

3. Client "Salon Coiffure Ines" - Facture n°2026-0355, montant 420€, 
   échéance dépassée de 2 jours seulement.

4. Client "Menuiserie Vasseur" - Facture n°2026-0210, montant 1 800€, 
   échéance dépassée de 60 jours, deux relances précédentes envoyées 
   sans réponse, le client ne répond plus du tout aux emails ni appels 
   depuis 3 semaines.
```$tt$, $tt$Travail à faire : Détermine le niveau de relance approprié pour chacun des 4 clients (rappel amical / relance ferme / mise en demeure / autre action à envisager), et rédige les messages de relance pour les clients n°1 et n°4, en adaptant le ton à la gravité de chaque situation.$tt$
from taches t where t.code = 'F21';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Entreprise de fournitures de bureau (B2B)$tt$, $tt$Contexte : Tu travailles chez "Bureau Plus", qui livre des entreprises clientes en fournitures. Tu gères un volume important de factures à surveiller.$tt$, $tt$Extrait du tableau de suivi des impayés :
```
1. Client "Cabinet Notarial Reyes" - 2 factures en cours : l'une de 
   180€ payée avec 3 jours de retard (payée depuis), l'autre de 220€ 
   en retard de 10 jours, aucune réponse à la relance automatique 
   envoyée à J+5.

2. Client "École Privée Saint-Marc" - facture de 1 100€ en retard de 
   20 jours, mais ce client a toujours payé avec retard chaque trimestre 
   depuis 3 ans (paiement lié à leur cycle budgétaire scolaire, connu 
   du commercial).

3. Client "Start-up TechFlow" - facture de 650€ en retard de 45 jours, 
   première commande de ce client (client récent, aucun historique), 
   ne répond plus aux emails depuis 2 semaines, numéro de téléphone 
   indisponible.

4. Client "Cabinet Médical Ost" - facture de 95€ en retard de 4 jours, 
   très faible montant.
```$tt$, $tt$Travail à faire : Priorise ces 4 situations par niveau de risque réel (pas seulement par ancienneté du retard), en tenant compte du contexte connu sur chaque client (comme l'historique de paiement de l'École Saint-Marc), et détermine lequel des 4 cas justifierait d'envisager une action plus formelle (mise en demeure ou recouvrement) plutôt qu'une simple relance.$tt$
from taches t where t.code = 'F21';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Atelier de menuiserie$tt$, $tt$Contexte : Tu gères l'atelier "Bois & Matières" et dois faire le point sur tes commandes fournisseurs en cours avant de lancer la production de la semaine.$tt$, $tt$Tableau de suivi (à traiter) :
```
1. Commande CMD-118 chez "Panneaux du Nord" : 40 panneaux de contreplaqué 
   18mm commandés le 20/08, confirmation fournisseur reçue pour 40 
   panneaux livraison prévue le 05/09, livraison reçue le 05/09 : 
   seulement 32 panneaux, bon de livraison mentionne "reliquat à venir 
   sous 10 jours".

2. Commande CMD-119 chez "Quincaillerie Pro" : 200 charnières référence 
   CH-450 commandées le 25/08, confirmation fournisseur reçue pour la 
   référence CH-451 (référence différente de celle commandée, 
   apparemment une erreur), livraison pas encore reçue.

3. Commande CMD-120 chez "Vernis & Finitions" : 15L de vernis mat 
   commandés le 28/08 avec délai annoncé de 5 jours ouvrés, aucune 
   confirmation de commande reçue à ce jour (8 jours écoulés).

4. Commande CMD-121 chez "Panneaux du Nord" (même fournisseur que CMD-118) : 
   20 panneaux MDF commandés le 02/09, confirmation reçue le jour même 
   pour livraison le 10/09, rien à signaler.
```$tt$, $tt$Travail à faire : Identifie pour chaque commande le statut réel (conforme / en attente / à relancer / anomalie à résoudre), rédige les messages à envoyer aux fournisseurs concernés pour les commandes 1, 2 et 3, et signale s'il y a un risque que la production de la semaine soit bloquée par l'une de ces commandes.$tt$
from taches t where t.code = 'F22';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Restaurant, gestion des commandes fournisseurs alimentaires$tt$, $tt$Contexte : Tu es chef du restaurant "La Table Verte" et dois vérifier tes commandes de la semaine avant le service du week-end, moment de forte affluence.$tt$, $tt$Suivi des commandes :
```
1. Fournisseur "Primeurs du Marché" : commande de légumes de saison passée 
   le 03/09 pour livraison le 05/09 (avant le service du week-end), 
   fournisseur a confirmé par SMS "tout est bon", pas de bon de commande 
   écrit formalisé.

2. Fournisseur "Boucherie Grossiste Sud" : commande de 25kg de viande 
   passée le 02/09, confirmation écrite reçue pour livraison le 04/09, 
   tu n'as reçu aucune nouvelle depuis et le fournisseur ne répond 
   pas au téléphone depuis ce matin.

3. Fournisseur habituel de pain "Boulangerie Servant" : commande 
   récurrente automatique tous les jours, aucun souci signalé jusqu'à 
   présent cette semaine.

4. Nouveau fournisseur de fromages "Affineur des Alpes" testé pour la 
   première fois : commande passée le 01/09, livraison reçue le 04/09 
   mais 2 des 6 références commandées manquaient, sans explication 
   du livreur.
```$tt$, $tt$Travail à faire : Détermine quelle commande représente le risque le plus urgent pour le service du week-end (justifie ton choix), rédige le message de relance à envoyer en priorité, et propose une action pour sécuriser les commandes à l'avenir sans bon de commande écrit formalisé (cas n°1).$tt$
from taches t where t.code = 'F22';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Glacier artisanal saisonnier$tt$, $tt$Contexte : Tu gères "Glace & Gourmandise" et dois préparer tes commandes de matières premières pour le mois de juillet à venir.$tt$, $tt$Historique de ventes disponible (en litres de mélange à glace utilisés par mois) :
```
Juillet année précédente : 480 litres
Juin de cette année (mois dernier) : 210 litres
Juillet il y a 2 ans : 510 litres
Août année précédente : 460 litres

Éléments de contexte connus :
- Un festival de musique local aura lieu la 2e semaine de juillet cette 
  année (n'existait pas les années précédentes), attirant environ 8000 
  visiteurs sur 3 jours selon les organisateurs.
- La météo de juillet l'an dernier avait été particulièrement pluvieuse 
  selon ton souvenir (souvenir personnel, non chiffré).
- Tu as ouvert un stand supplémentaire sur la plage cette année, 
  qui n'existait pas l'an dernier.
```$tt$, $tt$Travail à faire : Propose une estimation de la quantité de mélange à glace à commander pour juillet à partir de ces données, en expliquant chaque ajustement que tu appliques par rapport à l'historique brut (festival, nouveau stand, incertitude météo), et indique clairement quelle part de ton estimation relève d'un calcul basé sur des données et quelle part relève d'une hypothèse.$tt$
from taches t where t.code = 'F23';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Fournitures scolaires, librairie-papeterie$tt$, $tt$Contexte : Tu gères la librairie-papeterie "Le Cartable" et dois préparer ta commande pour la rentrée scolaire de septembre.$tt$, $tt$Historique de ventes (nombre de cartables vendus, période rentrée = 15 août au 15 septembre) :
```
Rentrée année précédente : 145 cartables vendus
Rentrée il y a 2 ans : 128 cartables vendus
Rentrée il y a 3 ans : 135 cartables vendus

Éléments de contexte connus :
- Une nouvelle école primaire a ouvert dans le quartier en janvier de 
  cette année (environ 180 élèves), auparavant absente du secteur.
- Un concurrent (grande surface avec rayon papeterie) a fermé son rayon 
  fournitures scolaires en juin de cette année suite à une réorganisation 
  (information confirmée par un article de presse locale).
- Stock actuel en réserve : 20 cartables de l'année précédente non 
  vendus, toujours en bon état.
```$tt$, $tt$Travail à faire : Calcule une estimation du nombre de cartables à commander pour la rentrée à venir, en tenant compte du stock déjà disponible, de la tendance historique et des deux éléments de contexte, et explique le raisonnement complet (pas seulement le chiffre final).$tt$
from taches t where t.code = 'F23';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Traiteur événementiel$tt$, $tt$Contexte : Tu es traiteur événementiel chez "Saveurs & Événements" et dois livrer 4 commandes le même jour et planifier ta tournée.$tt$, $tt$Informations sur les livraisons :
```
1. Livraison "Mariage Petit" - 45 min de préparation sur place requise 
   avant l'heure de service (buffet à dresser), service prévu à 12h30, 
   trajet estimé depuis le laboratoire : 35 minutes.

2. Livraison "Entreprise TechNova" - plateaux repas pour une réunion, 
   à livrer entre 12h et 12h15 impérativement (créneau fixe), trajet 
   estimé : 20 minutes, pas de temps de mise en place requis.

3. Livraison "Anniversaire Famille Roy" - gâteau et pièces montées, 
   fragile, à livrer avant 15h, trajet estimé : 50 minutes (zone 
   excentrée), pas de contrainte d'horaire précis avant 15h.

4. Livraison "Cocktail Cabinet Notarial" - service prévu à 18h30, 
   30 minutes de mise en place requise, trajet estimé : 25 minutes.

Contrainte supplémentaire : ton laboratoire dispose d'un seul 
véhicule et d'une seule équipe de livraison ce jour-là.
```$tt$, $tt$Travail à faire : Construis l'ordre de tournée optimal pour la journée en tenant compte des contraintes horaires fixes, du temps de trajet, du temps de mise en place nécessaire, et d'une marge de sécurité de 15 minutes par trajet pour les aléas, en vérifiant qu'aucune contrainte horaire fixe n'est violée.$tt$
from taches t where t.code = 'F24';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Technicien de maintenance itinérant$tt$, $tt$Contexte : Tu es technicien indépendant en maintenance de chaudières et dois planifier tes interventions de la journée chez 5 clients.$tt$, $tt$Rendez-vous à planifier :
```
1. Client A (zone nord) : intervention estimée 1h, disponible toute la 
   matinée.
2. Client B (zone sud) : intervention estimée 45 min, disponible 
   uniquement entre 8h et 9h30 (départ au travail après).
3. Client C (zone nord, proche du client A) : intervention estimée 
   1h30 (panne complexe signalée), disponible toute la journée.
4. Client D (zone centre) : intervention estimée 30 min (entretien 
   annuel simple), disponible l'après-midi uniquement.
5. Client E (zone sud, proche du client B) : intervention estimée 1h, 
   demande explicitement un rendez-vous en fin de journée (après 17h).

Temps de trajet estimés entre zones : nord-sud 40 minutes, nord-centre 
20 minutes, sud-centre 25 minutes. Tu commences ta journée à 
8h et dois finir au plus tard à 18h.
```$tt$, $tt$Travail à faire : Construis le planning de la journée en respectant la contrainte horaire fixe du client B (8h-9h30), en regroupant les interventions par zone géographique quand c'est possible pour limiter les trajets, et vérifie si les 5 interventions peuvent tenir dans la journée avec les temps de trajet indiqués - si ce n'est pas le cas, indique laquelle il faudrait reporter et pourquoi.$tt$
from taches t where t.code = 'F24';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Électricien, chiffrage d'une rénovation$tt$, $tt$Contexte : Tu es électricien indépendant et dois chiffrer l'installation électrique d'un appartement à partir de la description du client (pas de plan visuel disponible, description textuelle du bien à traiter comme un plan écrit).$tt$, $tt$Description du logement fournie par le client (à traiter comme un plan à compter) :
```
Appartement de 65m², composé de :
- Un salon-séjour de 28m² : le client souhaite 6 points lumineux 
  (dont 2 sur variateur), 8 prises électriques, 1 prise TV/réseau.
- Une cuisine de 10m² : 3 points lumineux, 6 prises dont 2 dédiées 
  aux gros électroménagers (four, plaque induction).
- Une chambre 1 de 14m² : 2 points lumineux, 4 prises, 1 prise 
  spécifique pour climatisation prévue.
- Une chambre 2 de 10m² : 2 points lumineux, 3 prises.
- Une salle de bain de 5m² : 2 points lumineux (dont 1 au-dessus du 
  miroir), 1 prise rasoir spécifique (norme salle de bain).
- Un couloir/entrée de 6m² : 2 points lumineux, 1 prise.
- Le client mentionne aussi vouloir un interrupteur va-et-vient entre 
  le couloir et le salon (comptabilisé dans les points du salon).
```$tt$, $tt$Travail à faire : Établis le décompte total par catégorie (nombre total de points lumineux, nombre total de prises standard, nombre de prises spécifiques/spécialisées) pièce par pièce puis pour l'ensemble du logement, en présentant le résultat sous forme de tableau récapitulatif clair et vérifiable pièce par pièce.$tt$
from taches t where t.code = 'F31';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Peintre en bâtiment, chiffrage de surfaces$tt$, $tt$Contexte : Tu es peintre en bâtiment et dois chiffrer les surfaces à peindre pour un local commercial à partir des mesures prises sur site.$tt$, $tt$Mesures prises (à traiter) :
```
Local commercial rectangulaire : 12m de longueur x 8m de largeur, 
hauteur sous plafond 2,80m.

Ouvertures à déduire du calcul de surface murale :
- 1 porte d'entrée vitrée : 2,20m x 1,20m
- 3 fenêtres : 1,50m x 1,20m chacune
- 1 porte intérieure vers réserve : 2m x 0,90m

Le client souhaite : peinture des murs (2 couches), peinture du plafond 
(1 couche, plafond déjà en bon état), le sol n'est pas concerné.

Ton rendement : 10m² par litre de peinture murs (par couche), 
12m² par litre pour le plafond.
```$tt$, $tt$Travail à faire : Calcule le périmètre du local, la surface murale totale, la surface des ouvertures à déduire, la surface nette à peindre (murs, avec les 2 couches comptées séparément) et la surface de plafond, puis calcule la quantité de peinture nécessaire (en litres) pour chaque surface à partir des rendements indiqués.$tt$
from taches t where t.code = 'F31';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Rénovation d'une maison individuelle$tt$, $tt$Contexte : Tu es maître d'œuvre et tu suis l'avancement d'un chantier de rénovation pour informer le client (propriétaire, absent la semaine) de l'état des travaux.$tt$, $tt$Notes prises lors de la visite hebdomadaire de chantier (à structurer) :
```
Semaine 1 (référence planning) : démolition cloisons prévue terminée, 
évacuation gravats prévue terminée.

Constat visuel semaine 1 : démolition des cloisons du rez-de-chaussée 
terminée à 100%, évacuation des gravats terminée, mais la démolition 
de la cloison de l'étage (initialement prévue cette semaine aussi) n'a 
pas commencé - l'entreprise de démolition a expliqué un retard de 
livraison de leur benne.

Planning initial semaine 2 : passage des gaines électriques et plomberie 
au rez-de-chaussée.

Constat visuel semaine 2 : gaines électriques posées à 100% au 
rez-de-chaussée, plomberie posée à environ 60% (le plombier a signalé 
un délai supplémentaire de 3 jours à cause d'une pièce en rupture chez 
son fournisseur), démolition de la cloison de l'étage enfin réalisée 
cette semaine (avec 1 semaine de retard sur planning initial).
```$tt$, $tt$Travail à faire : Rédige le compte-rendu hebdomadaire à envoyer au client pour la semaine 2, avec un tableau comparant "prévu" vs "réalisé" pour chaque lot de travaux, un statut clair (dans les temps / en retard / terminé), et une estimation de l'impact du retard cumulé sur la date de fin de chantier si rien ne change.$tt$
from taches t where t.code = 'F32';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Construction d'une extension de garage$tt$, $tt$Contexte : Tu es le client (la cliente) et tu suis toi-même l'avancement du chantier réalisé par une entreprise de construction, à partir des points faits chaque vendredi par le chef de chantier.$tt$, $tt$Notes du chef de chantier sur 3 semaines :
```
Vendredi semaine 1 : "Fondations coulées, on attend le séchage avant de 
monter les murs, ça prend normalement 5 à 7 jours selon la météo."

Vendredi semaine 2 : "Montage des murs en parpaings terminé, la charpente 
est prévue pour lundi prochain, le charpentier a confirmé sa venue."

Vendredi semaine 3 : "La charpente a pris du retard, le charpentier a eu 
un empêchement sur un autre chantier, nouvelle date annoncée : dans 
10 jours. La couverture (toiture) ne pourra donc pas commencer comme 
prévu la semaine prochaine."
```$tt$, $tt$Travail à faire : Construis un tableau de suivi synthétique sur les 3 semaines (lot de travaux, statut, écart par rapport au planning initial), identifie le point de blocage actuel du chantier, et rédige les 2 questions précises que tu devrais poser à l'entreprise de construction pour évaluer l'impact réel de ce nouveau retard sur la date de livraison finale.$tt$
from taches t where t.code = 'F32';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Chantier de rénovation de toiture$tt$, $tt$Contexte : Tu es chef de chantier d'une entreprise de couverture et dois établir la liste des points de vigilance avant de démarrer un chantier sur un immeuble ancien en centre-ville.$tt$, $tt$Points de risque identifiés lors de la visite préparatoire (à hiérarchiser) :
```
1. Présence d'amiante suspectée dans les anciennes plaques de sous-toiture 
   (non confirmée, diagnostic à faire), immeuble construit avant 1997.

2. Toiture en forte pente (45°) sans point d'ancrage existant pour les 
   lignes de vie, nécessitera une installation provisoire.

3. Rue étroite en dessous rendant difficile la zone de dépose des 
   matériaux, circulation piétonne dense en journée.

4. Prévisions météo annonçant des orages possibles en fin de semaine 
   sur la période du chantier.

5. Câble électrique aérien basse tension passant à environ 2m de la 
   zone de travail en toiture.

6. Un des ouvriers de l'équipe prévue est en formation la première 
   semaine du chantier, remplacé par un intérimaire moins expérimenté 
   sur ce type de toiture.
```$tt$, $tt$Travail à faire : Évalue chacun des 6 points sur une échelle de probabilité (1 à 5) et de gravité (1 à 5) en justifiant brièvement chaque score, calcule le niveau de risque (probabilité × gravité), classe les 6 points du plus critique au moins critique, et indique lequel doit être traité avant même le démarrage du chantier plutôt que pendant.$tt$
from taches t where t.code = 'F33';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Chantier de terrassement pour une extension$tt$, $tt$Contexte : Tu es conducteur (conductrice) de travaux d'une entreprise de terrassement et prépares la réunion de lancement d'un chantier d'extension de maison avec sous-sol.$tt$, $tt$Éléments identifiés à partir de l'étude de sol et de la visite terrain :
```
1. Présence d'une canalisation de gaz enterrée à proximité de la zone de 
   fouille, exacte localisation non confirmée par le plan des réseaux 
   (plan datant de plus de 20 ans).

2. Terrain en légère pente, risque de ruissellement des eaux de pluie 
   vers la fouille en cas de forte pluie pendant les travaux.

3. Voisin direct ayant déjà manifesté son inquiétude concernant les 
   vibrations du chantier sur les fondations de sa propre maison, mitoyenne.

4. Nature du sol argileuse selon l'étude de sol, nécessitant des 
   précautions particulières de stabilisation des parois de fouille.

5. Accès au chantier par une allée étroite limitant la taille des engins 
   pouvant être utilisés.

6. Période de nidification d'oiseaux protégés susceptible de concerner 
   un arbre proche de la zone de travaux (à vérifier avec la 
   réglementation locale).
```$tt$, $tt$Travail à faire : Évalue chacun des 6 points sur une échelle de probabilité et de gravité, identifie lequel constitue un risque qui doit être levé avant tout démarrage des travaux (et non pendant), et rédige la liste des 3 vérifications ou démarches administratives à effectuer en priorité avant le premier coup de pelle.$tt$
from taches t where t.code = 'F33';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Recrutement d'un(e) assistant(e) comptable, cabinet Lefebvre & Associés$tt$, $tt$Contexte : Tu travailles au cabinet comptable (déjà rencontré en catégorie 1), qui recrute un(e) assistant(e) comptable. Tu as reçu 5 candidatures à présélectionner.$tt$, $tt$Critères du poste définis par le cabinet :
```
Obligatoires : BTS Comptabilité ou équivalent minimum, maîtrise d'un 
logiciel de comptabilité (Sage, Cegid ou équivalent), disponibilité 
immédiate ou sous 1 mois maximum.
Souhaités (non éliminatoires) : expérience en cabinet comptable 
(vs. entreprise), connaissance du secteur associatif ou artisanal.
```$tt$, $tt$Travail à faire : Applique la grille de critères du poste à chacun des 5 candidats, élimine ceux qui ne remplissent pas les critères obligatoires en justifiant pourquoi, classe les candidats restants par ordre de pertinence, et rédige le message de refus à envoyer au candidat C (dont le profil est intéressant mais pas immédiatement disponible).$tt$
from taches t where t.code = 'F29';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Recrutement d'un livreur/chauffeur, entreprise de traiteur événementiel$tt$, $tt$Contexte : Tu travailles chez le traiteur "Saveurs & Événements" (déjà rencontré en catégorie 4), qui recrute un chauffeur-livreur en CDI. Tu as reçu 4 candidatures.$tt$, $tt$Critères du poste :
```
Obligatoires : permis B depuis au moins 2 ans (assurance véhicule 
professionnel l'exige), disponibilité les week-ends (activité 
événementielle), casier judiciaire vierge (mention obligatoire dans 
l'annonce).
Souhaités : expérience en livraison ou logistique, permis remorque (non 
obligatoire mais un plus pour certains événements).
```$tt$, $tt$Travail à faire : Élimine les candidats qui ne remplissent pas les critères obligatoires du poste (justifie chaque élimination), classe les candidats restants en tenant compte des critères souhaités, et identifie le point qui nécessiterait une clarification avant tout entretien pour le candidat 3 (disponibilité les week-ends étant un critère obligatoire du poste).$tt$
from taches t where t.code = 'F29';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Évolution interne, PME industrielle$tt$, $tt$Contexte : Tu travailles au service RH de "Mécatech Industries" (déjà rencontrée en catégorie 1) et dois construire un parcours de formation pour un technicien de production qui souhaite évoluer vers un poste de chef d'équipe.$tt$, $tt$Diagnostic disponible (entretien annuel + évaluation manager) :
```
Points forts identifiés : excellente maîtrise technique des machines de 
  production, très bonne connaissance des procédures qualité, apprécié 
  de ses collègues.

Axes de progression identifiés par le manager : aucune expérience de 
  management d'équipe, difficulté identifiée à l'oral lors des réunions 
  (a du mal à s'exprimer devant un groupe selon le manager), pas de 
  formation aux outils bureautiques de reporting (Excel niveau basique 
  uniquement).

Contraintes : le salarié ne peut pas s'absenter plus de 2 jours 
  consécutifs (poste de production à couvrir), budget formation alloué 
  par les RH pour ce salarié : 1500€ pour l'année, souhait du salarié 
  de prendre le poste de chef d'équipe "d'ici 12 à 18 mois".
```$tt$, $tt$Travail à faire : Construis un parcours de formation sur 12 mois qui répond aux axes de progression identifiés (management, prise de parole, Excel), en respectant la contrainte de disponibilité (pas plus de 2 jours consécutifs) et le budget indiqué, avec au moins un point d'évaluation intermédiaire à mi-parcours pour vérifier la progression.$tt$
from taches t where t.code = 'F30';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Montée en compétence, petite agence de communication$tt$, $tt$Contexte : Tu es responsable de l'agence "Pixel & Sens" (déjà rencontrée en catégorie 1 et 2) et veux faire monter en compétence Karim (actuellement graphiste junior) vers plus d'autonomie sur les projets clients.$tt$, $tt$Ton diagnostic informel (à structurer) :
```
"Karim est très bon techniquement sur les logiciels de design, il 
produit un travail de qualité. Par contre il a du mal à cadrer un 
brief client tout seul, il a besoin qu'on lui reformule ce que veut 
le client avant de commencer. Il n'a jamais géré de relation client en 
direct, c'est toujours moi qui suis en contact avec eux. Il connaît bien 
Photoshop et Illustrator mais pas du tout les bases de la mise en page 
web ou des animations simples, ce qui serait utile vu qu'on a de plus 
en plus de demandes de ce type. On est une petite agence donc pas de gros 
budget formation, mais je peux le libérer une demi-journée par semaine 
pour de la montée en compétence, et j'ai moi-même de l'expérience en 
relation client que je peux lui transmettre en interne."
```$tt$, $tt$Travail à faire : Structure ce diagnostic informel en axes de progression clairs, propose un parcours de montée en compétence sur 6 mois combinant formation externe légère (vu le budget limité) et transmission interne assurée par toi-même, avec une demi-journée par semaine disponible, et un objectif observable à la fin des 6 mois qui permette de vérifier si l'autonomie visée est atteinte.$tt$
from taches t where t.code = 'F30';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Marque de thé artisanal$tt$, $tt$Contexte : Tu es le fondateur (la fondatrice) de "Thé des Cimes" (petite marque de thé en vrac). Tu lances une nouvelle gamme "Infusions d'Automne" et as besoin de visuels pour tes réseaux sociaux, sans budget photographe.$tt$, $tt$Ton brief (à traiter) :
```
"On veut un visuel chaleureux pour Instagram qui donne envie de boire 
notre thé cannelle-orange en automne. Ambiance cosy, plutôt le matin, 
avec une tasse fumante. Nos couleurs de marque sont l'orange brûlé et le 
marron terracotta. Format carré pour Instagram. On veut pas un truc trop 
lisse et parfait genre pub, plutôt naturel, comme une photo qu'on aurait 
prise nous-mêmes chez nous."
```$tt$, $tt$Travail à faire : Rédige un prompt détaillé et structuré pour un générateur d'images IA à partir de ce brief (sujet précis, style, ambiance/éclairage, palette de couleurs, cadrage, format), en traduisant les éléments flous du brief ("chaleureux", "pas trop lisse") en indications visuelles concrètes et exploitables par l'IA.$tt$
from taches t where t.code = 'F09';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Application mobile de méditation$tt$, $tt$Contexte : Tu es responsable marketing de la jeune pousse "Calmly" et as besoin d'un visuel pour illustrer un article de blog sur "les bienfaits de la méditation au travail", destiné à un public de cadres en entreprise.$tt$, $tt$Ton brief :
```
"L'illustration doit parler à des cadres stressés en open space, on veut 
pas d'image cliché de personne assise en tailleur sur un rocher au bord 
de la mer, ça ne correspond pas à notre cible qui médite entre deux 
réunions. On veut quelque chose de plus urbain, contemporain, qui montre 
qu'on peut méditer même dans un contexte professionnel. Palette de 
couleurs de la marque : bleu profond et vert sauge. Style plutôt 
illustration/flat design, pas de photo réaliste. Format paysage pour le 
header du blog."
```$tt$, $tt$Travail à faire : Rédige le prompt détaillé pour l'IA en traduisant le contre-exemple donné ("pas de personne en tailleur sur un rocher") en direction positive précise, en intégrant la palette de couleurs, le style graphique demandé et le format, et propose une variante de prompt alternative si le premier résultat ne correspondait pas.$tt$
from taches t where t.code = 'F09';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Boutique de vêtements en ligne$tt$, $tt$Contexte : Tu gères "Alto Mode" (déjà rencontrée en catégorie 1) et as pris des photos de ta nouvelle collection avec ton téléphone dans la boutique, mais les photos ont des défauts à corriger avant mise en ligne.$tt$, $tt$Description des défauts constatés sur les photos (à traiter, pas d'image réelle disponible, description textuelle des retouches nécessaires) :
```
Photo 1 (robe bleue) : fond de la boutique visible en arrière-plan 
  (étagères, autres vêtements), éclairage jaunâtre dû à la lumière 
  artificielle du magasin qui fausse la couleur réelle du bleu (le 
  vêtement est en réalité bleu marine, la photo le montre plus 
  turquoise/verdâtre).

Photo 2 (pull en laine) : léger pli visible sur le devant du pull qui 
  n'était pas repassé au moment de la photo, une étiquette de prix encore 
  visible sur la manche.

Photo 3 (pantalon) : photo légèrement floue en bas de l'image (mise au 
  point sur le haut du pantalon uniquement), bonne luminosité et 
  couleurs fidèles.
```$tt$, $tt$Travail à faire : Pour chacune des 3 photos, liste précisément les retouches nécessaires et leur ordre de priorité, en distinguant les retouches "obligatoires avant mise en ligne" (comme une couleur non fidèle qui induirait le client en erreur) des retouches "souhaitables mais non bloquantes", et indique laquelle des 3 photos ne devrait pas être mise en ligne sans retouche.$tt$
from taches t where t.code = 'F34';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Agence immobilière$tt$, $tt$Contexte : Tu travailles à l'agence "Clé en Main Immobilier" (déjà rencontrée en catégorie 2) et dois préparer les photos d'un appartement à louer pour l'annonce en ligne.$tt$, $tt$Description des photos prises lors de la visite (à traiter) :
```
Photo 1 (salon) : bonne luminosité générale, mais un carton de 
  déménagement du précédent locataire est resté visible dans un coin de 
  la pièce.

Photo 2 (cuisine) : photo prise avec le ciel très surexposé (blanc) 
  visible par la fenêtre, ce qui "mange" une partie du cadre et rend la 
  luminosité de la pièce difficile à juger pour un futur locataire.

Photo 3 (chambre) : photo légèrement penchée (l'appareil n'était pas 
  droit), les murs ne sont pas verticaux sur l'image.
```$tt$, $tt$Travail à faire : Pour chacune des 3 photos, identifie la retouche nécessaire et précise dans quelle mesure elle relève d'une simple correction technique légitime (comme redresser une photo penchée) ou d'une modification qui devrait rester dans les limites d'une représentation honnête du bien pour ne pas induire en erreur un futur locataire, sujet sensible dans l'immobilier.$tt$
from taches t where t.code = 'F34';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Marque de cosmétique bio$tt$, $tt$Contexte : Tu travailles chez "Botanika" (déjà rencontrée en catégorie 1). Tu as validé un visuel produit pour la crème visage et souhaites le décliner pour 3 autres produits de la gamme, chacun avec une couleur associée différente.$tt$, $tt$Charte couleur de la marque (à respecter strictement) :
```
Crème visage "Éclat" : vert sauge (code #87A96B)
Huile corps "Douceur" : terracotta (code #C97B4A)
Baume lèvres "Nourrissant" : rose poudré (code #D9A5A5)
Sérum "Intense" : bleu nuit (code #2C3E50)

Le visuel original (crème visage) utilise le vert sauge en couleur 
dominante du packaging illustré et en fond de l'image, avec un texte en 
blanc et un léger dégradé du vert sauge vers un ton plus clair.
```$tt$, $tt$Travail à faire : Décris précisément, pour chacun des 3 autres produits, comment adapter le visuel original (quelle couleur remplace quelle couleur, en respectant les codes exacts fournis), en signalant si le texte blanc reste suffisamment lisible sur chacune des nouvelles couleurs de fond ou s'il faut l'ajuster pour rester lisible (contraste).$tt$
from taches t where t.code = 'F35';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Restaurant proposant plusieurs formules de menu$tt$, $tt$Contexte : Tu gères "Le Comptoir Basque" (déjà rencontré en catégorie 1) et veux décliner ton visuel de menu du jour en 3 versions correspondant à tes 3 formules, pour un affichage différencié en vitrine.$tt$, $tt$Contexte fourni :
```
Le visuel de base pour la formule "Entrée + Plat" utilise la couleur 
rouge basque (code #C41E3A) en bandeau de titre.

Les 2 autres formules à créer : "Plat + Dessert" doit utiliser une 
couleur qui évoque la gourmandise du dessert sans sortir de l'identité 
visuelle basque du restaurant (rouge, blanc, vert basque sont les 3 
couleurs de la charte), et "Formule complète" (entrée + plat + dessert), 
la formule la plus chère, doit se distinguer visuellement comme "premium" 
par rapport aux deux autres.
```$tt$, $tt$Travail à faire : Propose les couleurs à utiliser pour les 2 formules manquantes en justifiant le choix par rapport à la charte des 3 couleurs basques disponibles et à la hiérarchie voulue (la formule complète doit visuellement se distinguer comme "supérieure"), et explique comment garder une cohérence graphique entre les 3 visuels malgré leurs couleurs différentes.$tt$
from taches t where t.code = 'F35';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Vidéo témoignage client pour une entreprise de coaching$tt$, $tt$Contexte : Tu es monteur (monteuse) dans une agence vidéo et dois retrouver les meilleurs extraits dans les rushes bruts d'une interview de 25 minutes pour ne garder que 90 secondes utilisables.$tt$, $tt$Notes de dérushage prises pendant le visionnage (à traiter) :
```
00:00-02:30 : présentation générale, la cliente est hésitante, plusieurs 
  hésitations et "euh", pas exploitable tel quel.
02:31-04:15 : elle raconte sa situation avant le coaching ("je me sentais 
  bloquée dans ma carrière"), bonne énergie, phrase claire et concise 
  vers 03:40 : "je n'osais plus prendre de décisions, même les petites."
04:16-08:00 : partie technique sur le déroulé des séances, un peu 
  longue et descriptive, moins émotionnelle.
08:01-11:20 : moment fort vers 09:15, elle raconte un déclic personnel 
  avec une anecdote précise, très authentique, légère émotion visible.
11:21-15:00 : bruit de fond parasite (travaux extérieurs), son 
  inutilisable sur cette portion.
15:01-19:30 : elle parle des résultats concrets obtenus, chiffres 
  précis mentionnés vers 17:40 ("j'ai été augmentée 6 mois après").
19:31-25:00 : conclusion et recommandation, phrase de clôture forte 
  vers 24:10 : "si j'avais su, j'aurais commencé bien plus tôt."
```$tt$, $tt$Travail à faire : Sélectionne les 4 extraits les plus forts pour construire une vidéo de 90 secondes maximum (indique les timecodes précis retenus), justifie chaque choix, et propose l'ordre de montage le plus cohérent narrativement (pas nécessairement l'ordre chronologique de l'interview).$tt$
from taches t where t.code = 'F36';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Vidéo promotionnelle pour un festival local$tt$, $tt$Contexte : Tu es vidéaste et dois sélectionner les meilleurs plans parmi 3 heures de rushes tournés sur 2 jours de festival, pour un teaser de 45 secondes.$tt$, $tt$Journal de dérushage simplifié (à traiter) :
```
Jour 1, matin : plans d'installation du site, peu dynamiques, à écarter.
Jour 1, après-midi : plan large de la foule au premier concert, bonne 
  ambiance visible, léger flou sur les 3 premières secondes du plan.
Jour 1, soir : gros plan sur un musicien en pleine performance, très bon 
  cadrage et lumière, plan de 8 secondes exploitable en entier.
Jour 1, soir (suite) : plan de coucher de soleil sur le site du festival, 
  esthétique, 12 secondes stables.
Jour 2, matin : interview improvisée d'un visiteur enthousiaste ("c'est 
  la meilleure édition depuis que je viens"), son de bonne qualité, 
  6 secondes utilisables.
Jour 2, après-midi : plan aérien (drone) de l'ensemble du site, très 
  large, 15 secondes, léger tremblement sur les 2 dernières secondes.
Jour 2, soir : plan de la foule qui danse au concert de clôture, très 
  bonne énergie, 10 secondes exploitables.
```$tt$, $tt$Travail à faire : Sélectionne les plans à retenir pour un teaser de 45 secondes maximum en indiquant la durée exacte de chaque plan retenu (le total ne doit pas dépasser 45 secondes), propose un ordre de montage qui alterne les ambiances (large/serré, jour/soir) pour un rythme dynamique, et signale les plans à éviter ou à couper malgré leur intérêt à cause d'un défaut technique (flou, tremblement).$tt$
from taches t where t.code = 'F36';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Podcast vidéo d'entreprise$tt$, $tt$Contexte : Une entreprise de conseil enregistre un podcast vidéo mensuel. Tu es le monteur (la monteuse) : tu reçois la transcription brute d'un épisode de 40 minutes et dois produire un premier montage de 15 minutes maximum.$tt$, $tt$Extrait de la transcription brute (segment à traiter) :
```
[12:30] Animateur : Alors, du coup, aujourd'hui on va parler de, enfin, 
je voudrais qu'on parle de la question de l'IA dans les cabinets de 
conseil, parce que c'est un sujet qui, enfin, qui revient beaucoup en 
ce moment
[12:48] Invité : Oui alors c'est vrai que, alors moi ce que j'observe 
chez mes clients c'est que, il y a une vraie fracture entre ceux qui 
ont, enfin qui expérimentent vraiment et ceux qui, voilà, qui en 
parlent mais qui font rien concrètement
[13:15] Invité : et je pense que la différence elle se fait sur un 
point précis : est-ce qu'on a formé les équipes ou pas. Parce qu'on 
peut avoir les meilleurs outils du monde, si personne sait s'en servir 
correctement, ça sert à rien
[13:42] Animateur : c'est intéressant ce que vous dites là, est-ce que 
vous auriez un exemple concret
[13:50] Invité : oui alors, sans donner de nom, j'ai un client, une PME 
industrielle, qui a économisé, alors ils ont chiffré ça, l'équivalent 
d'un mi-temps sur la partie administrative en 6 mois, juste en formant 
correctement 3 personnes
[14:20] Invité : donc voilà, c'est vraiment la formation qui fait la 
différence, plus que l'outil lui-même
[14:35] Animateur : et euh, du coup, pardon je vous coupe, mais est-ce 
que vous pensez que, enfin, est-ce que ça marche pour tous les métiers 
ou il y a des limites
```$tt$, $tt$Travail à faire : Édite ce passage de la transcription en supprimant les hésitations, répétitions et éléments non pertinents (comme le fait d'annoncer le sujet), pour ne garder que le contenu à forte valeur qui serait conservé dans le montage vidéo final, en indiquant les timecodes de début et fin de chaque portion conservée.$tt$
from taches t where t.code = 'F37';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Vidéo de formation interne$tt$, $tt$Contexte : Tu travailles au service formation de "Mécatech Industries" (déjà rencontrée plusieurs fois). Une session a été enregistrée où un expert explique une nouvelle procédure qualité, et tu dois en tirer une vidéo de formation concise de 5 minutes à partir de 20 minutes d'enregistrement brut.$tt$, $tt$Extrait de transcription à traiter :
```
[03:10] Expert : Alors la nouvelle procédure, enfin ce qui change 
vraiment par rapport à avant, c'est qu'on ne valide plus le contrôle 
qualité à la fin de la chaîne mais à 3 points différents
[03:35] Expert : donc le premier point de contrôle c'est après l'étape 
d'assemblage, le deuxième après le test électrique, et le troisième 
avant l'emballage final
[04:02] Expert : et alors pourquoi on a changé ça, c'est parce que, 
enfin les chiffres montrent, sur les 6 derniers mois, que 80% des 
défauts détectés en fin de chaîne auraient pu être détectés bien plus 
tôt, ce qui fait qu'on produit des pièces défectueuses sur plusieurs 
étapes pour rien
[04:40] Expert : euh, du coup, qu'est-ce qu'il faut retenir concrètement 
pour vous sur le terrain, c'est que chaque opérateur à ces 3 postes 
devra désormais remplir la fiche de contrôle, celle en jaune, à chaque 
pièce, et pas seulement un échantillon comme avant
[05:15] Expert : et en cas de défaut détecté, l'alerte doit remonter 
immédiatement au chef d'équipe, on n'attend plus la fin de journée pour 
regrouper les remontées
```$tt$, $tt$Travail à faire : Édite cette transcription pour ne garder que l'essentiel exploitable dans une vidéo de formation courte (le changement, sa justification chiffrée, les 2 actions concrètes attendues des opérateurs), en éliminant les hésitations orales et en indiquant les timecodes conservés.$tt$
from taches t where t.code = 'F37';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Vidéo tutoriel pour une marque de bricolage$tt$, $tt$Contexte : Tu travailles chez "OutilPro" et produis une vidéo tutoriel "comment poser une étagère murale". Tu dois créer les sous-titres en français à partir de la transcription de la voix off.$tt$, $tt$Extrait de transcription brute (à sous-titrer) :
```
"Alors avant de commencer, il est très important de repérer où se 
trouvent les montants de votre cloison, parce que si vous fixez 
directement dans le placo sans tomber sur un montant, votre étagère 
risque de ne pas tenir le poids une fois chargée avec vos objets, 
surtout si vous comptez y poser des livres ou des objets lourds."
```$tt$, $tt$Travail à faire : Découpe cette phrase en sous-titres respectant la limite de 42 caractères par ligne et maximum 2 lignes par sous-titre, en veillant à ce que chaque sous-titre se termine sur une coupure logique du sens (pas au milieu d'un groupe de mots qui doit rester ensemble), et indique le nombre total de sous-titres nécessaires pour cette phrase.$tt$
from taches t where t.code = 'F38';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Traduction de sous-titres pour une vidéo d'entreprise internationale$tt$, $tt$Contexte : Tu travailles chez "Fromagerie des Alpages" (déjà rencontrée en catégorie 1). Vous avez réalisé une vidéo de présentation de votre savoir-faire à destination de votre distributeur britannique, à sous-titrer en anglais.$tt$, $tt$Sous-titres originaux en français (à traduire, en respectant les mêmes contraintes de longueur) :
```
Sous-titre 1 (durée 3 secondes) : "Depuis trois générations, notre 
famille affine ce fromage dans les mêmes caves naturelles."
Sous-titre 2 (durée 2,5 secondes) : "La température et l'humidité y 
sont parfaitement stables toute l'année."
Sous-titre 3 (durée 2 secondes) : "C'est ce secret qui donne à notre 
tomme son goût si particulier."
```$tt$, $tt$Travail à faire : Traduis ces 3 sous-titres en anglais en respectant la limite de 42 caractères par ligne (en adaptant la formulation si la traduction littérale dépasse la limite, ce qui est fréquent de français vers anglais), et vérifie que le temps d'affichage indiqué (en secondes) reste suffisant pour une lecture confortable du texte traduit.$tt$
from taches t where t.code = 'F38';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Podcast enregistré dans des conditions imparfaites$tt$, $tt$Contexte : Tu es podcasteur indépendant et as enregistré un épisode dans ton salon, sans studio. Tu dois préparer le fichier avant publication.$tt$, $tt$Diagnostic des défauts constatés sur l'enregistrement (à traiter) :
```
1. Bruit de fond constant et régulier tout au long de l'enregistrement, 
   identifié comme provenant du réfrigérateur de la cuisine adjacente.

2. Variation de volume notable entre le début (voix assez forte, 
   l'invité était proche du micro) et la fin de l'enregistrement 
   (l'invité s'est légèrement éloigné du micro en gesticulant, voix 
   plus faible sur les 10 dernières minutes).

3. Un bruit ponctuel ("clic" sec) à 2 reprises dans l'enregistrement, 
   correspondant probablement à un objet posé sur la table près du 
   micro.

4. La voix manque légèrement de présence/clarté par rapport à un 
   enregistrement professionnel, un peu "sourde".
```$tt$, $tt$Travail à faire : Établis l'ordre des étapes de traitement à appliquer à cet enregistrement pour corriger ces 4 défauts, en justifiant pourquoi cet ordre est important (par exemple pourquoi il ne faut pas égaliser avant d'avoir retiré le bruit de fond constant), et précise laquelle des 4 opérations ne peut pas être totalement automatisée sans un minimum de vérification humaine (le bruit ponctuel de clic, qui nécessite d'être localisé précisément pour ne pas couper un morceau de parole).$tt$
from taches t where t.code = 'F39';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Message vocal client à intégrer dans une vidéo témoignage$tt$, $tt$Contexte : Tu travailles dans une agence qui a reçu un message vocal WhatsApp d'un client satisfait. Tu souhaites l'intégrer comme témoignage audio dans une vidéo, mais la qualité d'enregistrement est moyenne.$tt$, $tt$Diagnostic du message vocal (à traiter) :
```
1. Message enregistré dans une voiture, bruit de fond de moteur/route 
   constant en arrière-plan.

2. Une portion de 3 secondes au milieu du message où le client est 
   passé sous un tunnel ou une zone de mauvaise réception, voix 
   légèrement hachée/déformée sur ce passage précis.

3. Volume globalement correct et stable sur le reste du message.

4. Le message contient une hésitation ("euh... comment dire") suivie 
   d'un silence de 2 secondes avant que le client reprenne son 
   témoignage, qui pourrait être raccourci pour la vidéo finale.
```$tt$, $tt$Travail à faire : Détermine si les défauts listés sont tous corrigibles par un nettoyage audio classique ou si l'un d'entre eux nécessite une solution différente (par exemple, la portion déformée par la mauvaise réception ne peut pas être "réparée" par un simple nettoyage, contrairement au bruit de fond constant), et propose le traitement approprié pour chacun des 4 points.$tt$
from taches t where t.code = 'F39';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Interview filmée en format horizontal à décliner en vertical$tt$, $tt$Contexte : Tu dois décliner une vidéo d'interview tournée en 16:9 (format large, l'interviewé est assis légèrement décentré à gauche du cadre avec un intervieweur visible à droite) en format vertical 9:16 pour Instagram Reels et TikTok.$tt$, $tt$Description du plan original (à traiter, pas d'image réelle disponible) :
```
Plan large 16:9 : l'interviewé (sujet principal parlant à la caméra) 
occupe environ le tiers gauche du cadre, l'intervieweur (de dos, hors 
sujet, juste présent pour donner un point de repère visuel) occupe le 
tiers droit, un tiers central vide avec une bibliothèque en arrière-plan.

Le format vertical 9:16 ne peut conserver qu'une portion étroite du 
cadre horizontal original (le recadrage vertical "mange" une grande 
partie de la largeur de l'image).
```$tt$, $tt$Travail à faire : Détermine quelle portion du cadre horizontal doit être conservée dans le recadrage vertical pour ne pas perdre l'élément essentiel (le visage de l'interviewé qui parle), explique pourquoi un recadrage centré automatique (qui garderait le tiers central de l'image) serait ici une erreur, et propose une solution si un moment du plan montre les deux personnes interagissant (ce qui ne rentrerait dans aucun recadrage fixe en vertical).$tt$
from taches t where t.code = 'F40';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Vidéo de démonstration produit avec texte à l'écran$tt$, $tt$Contexte : Tu dois décliner une vidéo de démonstration d'un produit de cuisine (mixeur) tournée en 16:9, qui contient du texte incrusté en bas de l'image (sous-titres et légendes explicatives), en format carré 1:1 pour un post Instagram classique.$tt$, $tt$Description du plan original :
```
Plan 16:9 : le mixeur et les mains de la démonstratrice occupent le 
centre et le bas du cadre, du texte explicatif ("Étape 1 : ajoutez les 
fruits") est incrusté tout en bas de l'image, sur toute la largeur du 
cadre horizontal, dans les derniers 15% de hauteur de l'image.

Le recadrage carré 1:1 réduira la largeur totale visible tout en gardant 
la même hauteur proportionnellement plus importante que le recadrage 
vertical.
```$tt$, $tt$Travail à faire : Identifie le risque principal que pose ce recadrage pour le texte incrusté en bas de l'image (largeur du texte par rapport à la nouvelle largeur du cadre carré), et propose 2 solutions possibles pour ce problème (l'une technique sur le recadrage lui-même, l'une alternative qui consisterait à refaire l'incrustation du texte spécifiquement pour le format carré plutôt que de recadrer l'incrustation existante).$tt$
from taches t where t.code = 'F40';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Vidéo de présentation d'entreprise à doubler en anglais$tt$, $tt$Contexte : Tu travailles chez "Structa Bois" (déjà rencontrée en catégorie 2) et as fait doubler votre vidéo de présentation d'entreprise en anglais pour un salon international, mais le premier essai de traduction pose un problème de durée.$tt$, $tt$Texte original en français avec son timing (à traiter) :
```
Segment vidéo de 4 secondes exactement (plan fixe sur le bâtiment de 
l'entreprise) :
Texte français original : "Depuis 1987, Structa Bois conçoit et fabrique 
des charpentes industrielles sur mesure pour toute la France." (durée de 
lecture en français : environ 4 secondes à un débit normal)

Première traduction anglaise proposée (trop longue pour le même segment) :
"Since 1987, Structa Bois has been designing and manufacturing custom 
industrial timber frame structures for construction projects throughout 
France." (durée de lecture estimée : environ 6 secondes, ne rentre pas 
dans le segment de 4 secondes)
```$tt$, $tt$Travail à faire : Reformule la traduction anglaise pour qu'elle tienne dans une durée de lecture d'environ 4 secondes (le même timing que l'original), en conservant les informations essentielles (date de création, activité, zone géographique) mais en acceptant de sacrifier des détails secondaires si nécessaire, et explique quel(s) élément(s) tu as choisi de raccourcir ou supprimer et pourquoi.$tt$
from taches t where t.code = 'F41';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Voix off d'un tutoriel à adapter en espagnol$tt$, $tt$Contexte : Tu travailles chez "OutilPro" (déjà rencontrée en tâche F38) et veux adapter en espagnol la voix off de votre tutoriel "comment poser une étagère murale" pour le marché espagnol.$tt$, $tt$Texte original avec contrainte de timing :
```
Segment de 5 secondes (plan montrant l'action de percer le mur) :
Texte français original : "Percez à l'endroit exact que vous avez repéré, 
en tenant la perceuse bien perpendiculaire au mur." (débit de lecture 
naturel : environ 5 secondes)
```$tt$, $tt$Travail à faire : Propose une traduction en espagnol qui tienne dans un timing équivalent (environ 5 secondes de lecture), en gardant à l'esprit que l'espagnol est généralement 15 à 20% plus long que le français à contenu équivalent, ce qui nécessite d'être particulièrement concis dans le choix des mots, et indique si tu maîtrises suffisamment l'espagnol pour garantir la fluidité naturelle du résultat ou si une vérification par un locuteur natif serait recommandée.$tt$
from taches t where t.code = 'F41';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 1, $tt$Cas fictif 1 - Vidéo explicative sur la gestion du stress au travail$tt$, $tt$Contexte : Tu travailles chez "Calmly" (déjà rencontrée en tâche F09) et prépares une vidéo explicative. Tu as besoin de 3 séquences d'illustration générées par IA pour accompagner une voix off, faute de budget tournage.$tt$, $tt$Passages de la voix off à illustrer (à traiter) :
```
Passage 1 : "Le matin, avant même d'arriver au bureau, notre esprit est 
déjà submergé de notifications." (durée du passage : 4 secondes)

Passage 2 : "Prendre trois minutes pour respirer profondément permet de 
retrouver son calme." (durée du passage : 5 secondes)

Passage 3 : "Une équipe apaisée communique mieux et prend de meilleures 
décisions ensemble." (durée du passage : 4 secondes)
```$tt$, $tt$Travail à faire : Rédige un prompt de génération vidéo pour chacun des 3 passages, en respectant la bonne pratique d'une action simple et brève par séquence (par exemple pour le passage 1, éviter de vouloir montrer "une personne qui se réveille, prend son téléphone, voit plein de notifications, panique, part au travail" en une seule séquence de 4 secondes - trop d'éléments pour un plan aussi court), et identifie lequel des 3 passages sera probablement le plus difficile à illustrer fidèlement avec les outils actuels de génération vidéo par IA.$tt$
from taches t where t.code = 'F42';

insert into exercices (tache_id, numero, titre, contexte, donnees, travail_a_faire)
select t.id, 2, $tt$Cas fictif 2 - Publicité pour une application de recettes de cuisine$tt$, $tt$Contexte : Tu travailles pour l'application "CuisineFacile" et veux une courte publicité de 15 secondes composée uniquement de séquences générées par IA (sans tournage), pour tester le format avant d'investir dans une vraie production.$tt$, $tt$Script de la publicité (à traiter) :
```
Séquence 1 (3 secondes) : ingrédients bruts posés sur un plan de travail 
  (légumes colorés, épices).
Séquence 2 (3 secondes) : des mains qui coupent des légumes rapidement, 
  mouvement fluide.
Séquence 3 (3 secondes) : un plat fini, fumant, présenté joliment dans 
  une assiette.
Séquence 4 (3 secondes) : une personne souriante qui goûte le plat avec 
  plaisir visible sur son visage.
Séquence 5 (3 secondes) : le logo de l'application qui apparaît sur fond 
  neutre.
```$tt$, $tt$Travail à faire : Rédige les prompts de génération vidéo pour chacune des 5 séquences, en étant particulièrement précis sur la séquence 4 (expression faciale et émotion), qui est généralement la plus difficile à obtenir de façon convaincante avec les outils de génération vidéo par IA actuels, et propose une solution de repli si la séquence 4 générée par IA ne semblait pas assez naturelle après plusieurs tentatives (par exemple recourir à un vrai tournage uniquement pour ce plan).$tt$
from taches t where t.code = 'F42';
