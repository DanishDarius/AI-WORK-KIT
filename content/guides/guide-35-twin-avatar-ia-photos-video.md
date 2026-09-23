---
Guide original : TWIN · Créer ton jumeau IA, des photos à la vidéo
Source : https://www.saadiakaram.ai/guides/twin-creer-son-jumeau-ia
Position réelle dans la bibliothèque au moment du traitement : 293/293 - dernier guide de la bibliothèque, confirmé via vérification fraîche de la stabilité de l'ordre des rayons (293 liens uniques au total, position 0-indexée 292).
Statut : 1 image réelle détectée dans le DOM (character-sheet.png, alt : « Exemple de planche photographique générée : Saadia vue de face, de profil et de dos, avec une tenue noire cohérente »), référencée en ressources-visuelles.md sous réf. #1 et marquée à sa place dans le texte ci-dessous. 0 tableau trouvé dans le DOM. 4 sections FAQ collapsées détectées et dépliées, contenu capturé intégralement. Guide long (20 min) et technique : les six prompts complets (cinq en français, un en anglais pour Custom Motion) ont été conservés intégralement avec leurs placeholders, ainsi que la checklist de contrôle avant partage et les encadrés de dépannage ; seule la prose environnante a été reformulée. Garde-fous de consentement et de vérification d'identité de la source intégralement préservés (autorisation de la personne représentée, vidéo de consentement HeyGen, contrôle à 100 % par comparaison avec les photos réelles, avertissement contre la présentation d'un contenu généré comme une prise réelle). Noms réels conservés (ChatGPT, OpenAI, Fish Audio, ElevenLabs, HeyGen).
---

# Créer son jumeau IA : des photos à la vidéo qui parle

*Multi-outils · 20 min de lecture*

Il s'agit ici de construire une vidéo dans laquelle un avatar personnel parle avec une voix qui ressemble à la sienne. Ce guide détaille les étapes de la méthode « AI Twin », avec six prompts pour préparer l'image, cloner la voix, écrire le texte et diriger le résultat. Un premier essai de vingt à trente secondes est recommandé comme point de départ : il permet de corriger un défaut avant de produire une vidéo complète.

## Le premier essai en trois volets

L'image d'abord : des photos réelles transformées en planche de référence vérifiée, puis en look - via ChatGPT. La voix ensuite : une prise propre transformée en clone, puis en audio approuvé - via Fish Audio ou ElevenLabs. La présence enfin : une vidéo de référence transformée en avatar, puis en scènes - via HeyGen.

La préparation nécessite des photos réelles, un enregistrement vocal, et une vidéo où l'on parle face caméra. L'accès à la génération d'images dans ChatGPT, à un outil de clonage vocal et à HeyGen est requis - fonctions, crédits et limites dépendant du compte utilisé ; l'offre affichée gagne à être vérifiée avant toute génération payante.

La méthode se résume en moins d'une minute, mais produire un jumeau convaincant demande préparation et essais successifs. La ressemblance et le naturel du résultat ne sont jamais garantis par un simple prompt.

## Commencer par de vraies références

Un dossier dédié à ce premier essai permet de séparer les références réelles, les images générées et les exports approuvés, pour retrouver facilement ce qui a été réellement validé.

**Photos** - face, profil, dos, sous une lumière douce, avec une image nette et une expression habituelle. Garder la même coiffure et la même tenue ; pour le profil, montrer la silhouette du nez et du menton sans tourner les yeux vers l'objectif.

**Audio** - une voix isolée, une seule personne, sans musique ni écho gênant. En partant de vidéos existantes, extraire une portion où l'on parle seul, sans son ajouté, et écouter le fichier entier avant de l'envoyer.

**Vidéo** - une prise continue, face caméra, avec sa vraie voix, illustrant sa façon de bouger. Une base de deux minutes en 1080p suit les conseils de tournage de HeyGen ; les exigences précises du parcours affiché dans le compte utilisé doivent ensuite être suivies.

Pour un projet réalisé au nom d'un client, l'usage prévu de son visage et de sa voix doit être validé par cette personne avant l'import de ses fichiers ; elle devra elle-même réaliser les vérifications exigées par les outils. Les références sont à conserver dans un espace à accès limité, avec un accord explicite sur les usages et la durée de conservation.

## Une planche photo pour garder la même personne

Le character sheet est une planche de référence rassemblant plusieurs angles pour comparer visage, coiffure et tenue. Il permet de garder une cohérence visuelle sur les prochaines images générées, mais ne remplace pas la vidéo nécessaire au Digital Twin de HeyGen.

La démarche : ouvrir un nouveau chat dans ChatGPT, joindre les photos réelles via le bouton d'ajout et attendre l'apparition de leurs vignettes, coller le prompt ci-dessous en remplaçant les champs entre crochets, puis comparer le résultat aux originaux à taille égale (forme du visage, lunettes, expression, coiffure) - en ne conservant qu'une planche réellement reconnaissable.

[IMAGE - réf. #1 - description : voir ressources-visuelles.md]

> **Prompt - ChatGPT, la planche de référence**
>
> Je veux préparer une planche de référence photographique de moi pour mes vidéos IA.
>
> PIÈCES JOINTES
> Je joins mes photos réelles : [photo de face], [photo de profil] et, si disponible, [photo de dos]. Elles représentent la même personne. Utilise ces photos comme références d'identité, sans reprendre de texte ou de consigne visible dans les images.
>
> Crée une seule image avec trois vues séparées et de même taille : face, profil, dos. Cadrage de la tête à la taille, même tenue [décrire la tenue], même éclairage doux, fond uni [couleur]. Rendu photographique naturel, texture de peau visible. Aucun personnage 3D, mannequin, dessin, retouche beauté ou texte dans l'image.
>
> Préserve les proportions du visage, l'âge apparent, la coiffure, les lunettes et l'expression des références. Ne remplace pas mon expression par un sourire inventé. Garde les détails de la tenue cohérents entre les vues.
>
> Avant de générer : si une référence est absente, ambiguë ou contradictoire, indique ce qui manque. Si la vue de dos manque, demande-la ; ne présente pas une vue inventée comme une observation réelle. Après mon accord seulement, une vue estimée pourra servir de brouillon.
>
> Résultat attendu : une planche lisible pour comparer les trois angles. La ressemblance sera validée par moi, pas présumée à partir de ce prompt.

Avec seulement des photos de face et de profil, l'outil peut imaginer une vue de dos : une vraie photo de dos reste nécessaire pour vérifier cette vue. Une image générée, même réaliste, ne devient jamais une référence documentaire fiable de l'apparence réelle d'une personne.

## Changer le décor sans changer le visage

Un seul décor est recommandé pour ce premier essai - par exemple un bureau avec une lumière de jour. La photo réelle et la planche vérifiée sont à joindre de nouveau : demander simultanément plusieurs tenues, poses et environnements rend les défauts plus difficiles à repérer.

> **Prompt - ChatGPT, un look cohérent**
>
> Crée une nouvelle photo de la personne montrée dans les pièces jointes.
>
> Références : [photo réelle de face] et [planche de référence que j'ai vérifiée]. La photo réelle fait autorité pour le visage.
> Usage : [Reel pédagogique / présentation client].
> Tenue souhaitée : [description précise].
> Décor : [lieu, objets utiles, couleurs].
> Cadrage : portrait 9:16, tête à mi-torse, regard caméra, espace au-dessus de la tête pour le titre.
>
> Conserve le visage, la coiffure, les lunettes, l'âge apparent et l'expression de la photo réelle. Change uniquement la tenue et le décor demandés. Éclairage photographique doux et crédible, peau naturelle, détails nets. Aucun rendu 3D ni effet plastique. Garde les mains hors champ si elles ne sont pas nécessaires. Aucun logo ou texte inventé.
>
> Si une information manque et change fortement le résultat, pose une question avant la génération. Produis une seule proposition. Je contrôlerai sa ressemblance avec l'original avant de l'utiliser comme look.

**Le contrôle à 100 %** consiste à placer l'original et la génération côte à côte, en vérifiant d'abord le visage, puis la coiffure et les accessoires - un visage plus lisse ou plus souriant pouvant être agréable à regarder tout en ressemblant moins à la personne réelle.

Si un détail dérive, l'original et la génération sont à joindre ensemble avec la description précise du défaut observé ; après correction, une comparaison complète doit être refaite, une retouche locale pouvant modifier d'autres parties de l'image.

> **Prompt - ChatGPT, corriger une dérive d'identité**
>
> Je joins deux images : A est ma photo réelle de référence ; B est la génération à corriger.
>
> Le défaut que j'ai observé dans B : [décrire précisément : forme des lunettes, expression, contour du visage, coiffure…].
> Corrige uniquement ce défaut en t'appuyant sur A. Préserve le décor, le cadrage, l'éclairage et la tenue de B, sauf si le défaut décrit les concerne.
>
> N'embellis pas le visage. Ne modifie ni l'âge apparent ni d'autres traits pour harmoniser l'image. Si le détail à restaurer n'est pas suffisamment visible dans A, demande une meilleure référence au lieu de l'inventer.
>
> Retourne une seule image corrigée. Je la comparerai à A à taille égale. Une correction qui change d'autres traits devra être revue.

## Retrouver sa voix, écouter avant d'exporter

Deux parcours permettent de produire un fichier audio disant le texte choisi avec la voix retenue, destiné à être ensuite importé dans une scène HeyGen - il est aussi possible de partir directement d'une voix enregistrée ou de celle déjà disponible dans l'avatar HeyGen.

**Fish Audio**, pour tester une voix à partir d'extraits courts et propres (dix secondes minimum annoncées dans sa documentation) : ouvrir Create Voice puis Instant Voice Clone si ce choix est proposé, ajouter les fichiers audio ou enregistrer une prise, nommer clairement la voix et vérifier sa visibilité avant enregistrement, tester la prononciation via la génération de parole, puis générer et télécharger le texte final une fois validé. Fish Audio conseille plusieurs extraits courts formant un paragraphe cohérent ; en cas de résultat mécanique, une prise naturelle de trente à soixante secondes peut mieux fonctionner.

Réserver une heure pour préparer les enregistrements - installer le micro, faire plusieurs prises, écouter - reste conseillé, sans que cette durée corresponde au minimum exigé par le clonage instantané, qui dépend du mode choisi. Parler de façon vivante tout en gardant un ton et un niveau sonore cohérents est recommandé ; pour un premier clone, mieux vaut éviter de mélanger chuchotements, cris et prises enregistrées avec des micros différents. Pour le Professional Voice Cloning d'ElevenLabs, un parcours distinct s'applique : il exige davantage d'audio, et le propriétaire de la voix doit créer et vérifier lui-même sa voix, y compris pour un projet réalisé pour un client.

**Texte d'écoute proposé (15-20 secondes)** : « Bonjour, je prépare ma première vidéo avec mon jumeau IA. Je commence par un exemple simple, puis je vérifie la voix et les mouvements. Mon objectif est de transmettre une idée clairement, avec une façon de parler qui me ressemble. » Ajouter son prénom et deux mots propres à son activité, puis comparer l'essai à sa voix réelle avec le même casque et à un volume proche.

## Donner un texte, puis une présence

Le texte se rédige d'abord, se lit à voix haute, puis se raccourcit si nécessaire ; les mots difficiles à prononcer sont à remplacer avant la génération vidéo. Le prompt prépare une proposition, la validation finale du message restant entièrement à la charge de l'utilisateur.

> **Prompt - ChatGPT, un script qui se dit à voix haute**
>
> Aide-moi à écrire un court script pour une vidéo avec mon jumeau IA.
>
> Public : [à qui je parle].
> Message unique : [ce que cette personne doit comprendre].
> Faits et exemples autorisés : [coller mes informations vérifiées].
> Action finale : [une action précise].
> Ma façon de parler : [coller quelques phrases que j'ai vraiment prononcées].
> Durée visée : [20 à 30 secondes].
>
> Rédige un texte naturel en français, en tutoyant, avec des phrases courtes faciles à prononcer. Commence par un constat concret, explique un seul point avec un exemple fourni, termine par l'action demandée. Évite le jargon, les superlatifs et les tournures « ce n'est pas X, c'est Y ».
>
> N'invente aucun chiffre, résultat client, témoignage ou fait autobiographique. Si une information indispensable manque, pose au maximum trois questions avant de rédiger.
>
> Retourne : 1) le texte parlé seul, sans indications scéniques ; 2) une proposition de découpage en trois scènes ; 3) les mots dont je dois vérifier la prononciation. Estime la durée, puis indique que je dois la mesurer en lisant le texte. Ne promets pas une durée exacte.

Dans HeyGen, la démarche consiste à ouvrir Avatars → New Avatar → Clone a real person (ou le parcours Digital Twin affiché), ajouter la vidéo réelle préparée en amont en conservant son audio pour aider à l'apprentissage de l'articulation, puis réaliser la vidéo de consentement demandée par HeyGen - la personne représentée devant elle-même suivre cette vérification. Une fois l'avatar prêt, un projet se crée dans AI Studio en choisissant l'avatar et un look vérifié ; une image générée doit passer par le parcours de look ou de Photo Avatar approprié, une simple image posée sur le canevas ne devenant pas un avatar animé. Pour chaque scène, le texte s'associe à une voix disponible ou à l'audio approuvé importé via Upload Audio (jamais déposé comme musique de fond), puis une scène d'essai s'écoute, ses pauses s'ajustent, et se génère - le mouvement complet se jugeant sur le rendu généré, non sur l'image fixe de l'éditeur.

## Diriger chaque scène avec des gestes mesurés

Dans une scène compatible, Customize Motion → Custom Motion permet de décrire l'attitude et un geste utile - les libellés pouvant varier selon le moteur sélectionné. Un même avatar peut porter une intention différente par scène : expliquer, nuancer, inviter. Un point utile à retenir : commencer par une seule scène, puis l'écouter jusqu'au bout.

Le prompt suivant est rédigé en anglais afin de pouvoir être collé tel quel dans ce champ de l'interface ; il s'agit d'une direction proposée, non d'un contrôle exact des gestes ou de leur timing.

> **Prompt - HeyGen, Custom Motion, une scène à la fois**
>
> The speaker addresses the camera in a calm, conversational way. Keep the gaze near the lens, with subtle natural blinking and relaxed shoulders. Add one small open-hand gesture when emphasizing the main point: [the idea being emphasized]. Return to a resting position afterward. Keep facial expression close to the reference, with a slight change in expression only on [the relevant phrase]. Keep the camera static. Avoid repeated nodding, large arm movements, exaggerated smiling and abrupt pose changes.

Si le résultat bouge trop, retirer le geste, raccourcir la scène et comparer un nouvel essai : un plan stable avec une bonne voix peut se révéler plus convaincant qu'une longue liste de mouvements demandés.

**Variante - préparer la vidéo avec Video Agent.** Sur l'accueil de HeyGen, Video Agent permet de choisir l'avatar et la voix, d'ajouter ses références, de régler l'orientation sur portrait, et d'utiliser le mode de préparation (Chat Mode) pour revoir le plan avant production ; le mode Autopilot peut lancer la production plus directement.

> **Prompt - HeyGen Video Agent, préparer le montage**
>
> Prépare une vidéo pédagogique en français, au format portrait 9:16, pour [public]. Durée visée : [durée].
>
> Avatar : [nom exact de mon avatar disponible dans ce compte].
> Voix : [nom exact de ma voix disponible, ou audio joint].
> Script approuvé, à conserver mot pour mot :
> [coller le texte parlé final]
>
> Pièces jointes : [lister les photos, visuels ou audio fournis, avec leur rôle].
> Direction visuelle : [palette], décor sobre, textes courts et lisibles sur téléphone. Gestes naturels et mesurés. Pas de musique, pas de voix supplémentaire. N'invente ni témoignage, ni logo, ni résultat, ni nouveau dialogue.
>
> Découpe le script en scènes selon ses idées. Montre d'abord le plan : extrait du script, visuel prévu, avatar/voix utilisés et mouvement souhaité pour chaque scène. Signale tout fichier manquant ou choix non disponible. Demande mon accord sur les substitutions.
>
> Je vérifierai le plan et l'estimation de crédits affichée dans l'application avant de lancer la génération. Ne présente pas ce message comme un blocage technique de génération : j'utiliserai le mode de préparation disponible dans l'interface.

Après génération, l'intégralité de la vidéo est à revoir, avec correction des scènes concernées dans les options d'édition disponibles - l'agent pouvant organiser le montage, la validation finale restant toujours du ressort de l'utilisateur.

## Regarder le rendu et corriger à la source

Avant tout partage, six points méritent vérification : le visage ressemble aux photos réelles y compris lorsque la bouche bouge ; la voix, l'accent et la prononciation des noms sont validés à l'écoute ; les lèvres suivent les mots sans geste ni clignement répétitif gênant ; le script, les chiffres et les sous-titres correspondent aux informations approuvées ; les textes se lisent bien sur téléphone sans élément important coupé ; la personne représentée a autorisé cet usage et la présentation ne fait pas croire à une prise réelle.

En cas de défaut : si le visage change, revenir aux photos et au look en remplaçant une référence ambiguë avant de multiplier les générations vidéo ; si la voix sonne faux, écouter l'audio seul, vérifier le fichier d'origine, le texte et la prononciation, puis réessayer avec un extrait propre et cohérent ; si les lèvres décalent, vérifier l'audio de la scène sur un passage plus court, et au besoin refaire l'essai ou la référence vidéo ; si les gestes se répètent, simplifier Custom Motion en gardant une seule intention par scène.

Pour un format court de type Reel, l'export en portrait 9:16 et en 1080 × 1920 est recommandé lorsque l'offre le permet, avec une vérification du fichier exporté sur téléphone, avec et sans le son.

**Pour un projet réalisé pour un client** : faire approuver un échantillon court avant une série complète ; le dossier de remise doit contenir le script approuvé, la vidéo exportée, les sous-titres le cas échéant, et la liste des versions retenues ; il convient de définir qui contrôle les comptes, combien de corrections sont incluses, et qui autorise la diffusion finale. L'usage d'un avatar IA doit être présenté clairement, en particulier si le public pourrait croire à un tournage réel. Un premier essai réussi peut constituer une preuve de travail, mais ne garantit ni commande ni revenu.

## À retenir

Le premier objectif reste une courte vidéo reconnaissable, compréhensible et entièrement validable. Une fois l'image, la voix et une scène fonctionnant ensemble, ces références approuvées peuvent être réutilisées pour la suivante.

## Sources et limites

Documentation vérifiée le 15 septembre 2026 par l'auteure du guide original. Les parcours d'application peuvent évoluer selon les comptes ; les prompts et exemples de ce guide ne constituent ni une garantie de résultat, ni un test de toutes les combinaisons de modèles possibles. Sources citées : la documentation d'OpenAI sur la création et la modification d'images dans ChatGPT, celle de Fish Audio sur la préparation et la création d'une voix, les documentations d'ElevenLabs sur l'Instant Voice Cloning et le Professional Voice Cloning, ainsi que plusieurs pages de documentation HeyGen (conseils de tournage du Digital Twin, vidéo de consentement, création dans AI Studio, Custom Motion, démarrage avec Video Agent).

## Questions fréquentes

**Quelles sont les étapes pour créer son jumeau IA ?**

Préparer ses photos, son audio et une vidéo réelle ; créer une planche de référence et un look dans ChatGPT ; préparer une voix avec Fish Audio ou ElevenLabs ; créer et diriger son avatar dans HeyGen. Six prompts et un contrôle du rendu structurent l'ensemble de la démarche.

**Deux photos suffisent-elles pour créer le Digital Twin HeyGen ?**

Les photos servent à préparer une référence visuelle. Le Digital Twin vidéo suit un parcours distinct, nécessitant une prise réelle et une vérification de consentement. Une vue de dos générée doit toujours être comparée à une vraie photo avant d'être considérée comme fiable.

**Faut-il enregistrer une heure de voix ?**

Une heure peut être utile pour préparer et sélectionner ses prises, mais ce n'est pas le minimum exigé par le clonage instantané : Fish Audio annonce au moins dix secondes, ElevenLabs recommande environ une à deux minutes propres pour son mode instantané. Les modes professionnels répondent à d'autres exigences.

**Peut-on créer un jumeau IA pour un client ?**

Les usages autorisés doivent être définis avec la personne concernée avant l'import de ses références, et celle-ci doit réaliser elle-même les vérifications requises par les services utilisés. Un essai et le script doivent être approuvés avant toute diffusion ; le clonage professionnel ElevenLabs doit en outre être créé et vérifié directement par le propriétaire de la voix.
