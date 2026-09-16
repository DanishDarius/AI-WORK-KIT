# Interface V1 et parcours Niveau 1

L’interface Next.js reprend la version 1 retenue : typographies Inter/Roboto,
thèmes clair et sombre, blocs vidéo, deux entrées Tâches/Métiers, catalogues,
listes métier et espace de pratique à deux colonnes. Les vidéos restent des
emplacements « Vidéo à venir » tant que les fichiers ne sont pas fournis.

Les ajouts sont intégrés à cette structure : reprise conditionnelle, progression,
régularité discrète, favoris et recherche globale. Les pages personnelles sont
accessibles depuis Favoris et Progression dans la navigation.

## Contrat et fonctionnement

- Les liens de tâche conservent leur contexte `?metier=`.
- Les actions faites/favoris sont optimistes, protégées contre les doubles clics
  pendant l’écriture, et restaurent l’état précédent avec un message en cas d’échec.
- La recherche globale démarre après deux caractères, avec un délai de 300 ms et
  annulation des requêtes dépassées ; elle distingue tâches et glossaire.
- Le catalogue transversal utilise les routes métier existantes (quatre lectures
  simultanées maximum), car le contrat ne fournit pas de route de liste des tâches.
- La copie emporte le prompt complet et les données, même quand l’aperçu est réduit.
- Aucun changement des routes API, de Supabase ou du webhook Chariow.

## Vérification du 16 septembre 2026

- Build Next.js de production et TypeScript réussis.
- ESLint réussi sur les pages et composants frontend modifiés.
- Contrôle navigateur en clair/sombre, mobile 390 px, tablette 768 px et bureau
  jusqu’à 1440 px, sans débordement horizontal sur les écrans vérifiés.
- Navigation entre les deux cas, changement d’IA, ouverture des données, expansion
  et copie du prompt ; état conservé après redimensionnement.
- Écriture optimiste avec réponse retardée et retour arrière après échec simulé ;
  progression métier recalculée immédiatement, ajout/retrait de favoris vérifiés.
- Reprise absente sur profil vierge, recherche à un caractère sans requête,
  résultats à deux caractères ou plus avec contexte métier.
- Header compact vérifié : navigation directe sur ordinateur et menu repliable à
  deux traits sur tablette/mobile, avec fermeture au changement de page ou via Échap.
- Connexion email/mot de passe sur `/connexion`, activation initiale après achat,
  récupération du mot de passe et déconnexion depuis la page Progression.

Les vérifications interactives utilisent un compte fictif et un proxy local de
fixtures reprenant le contenu de la V1. Elles ne constituent pas une validation
de bout en bout sur un compte Supabase réel. Les polices Google nécessitent une
connexion initiale ; les polices de secours restent disponibles.
