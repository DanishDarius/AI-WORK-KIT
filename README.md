# AI WORK KIT - Application

Backend (base de données, authentification, webhook Chariow, API) mis en place et maintenu par Claude. L'interface visuelle (composants, style, pages) a été construite par ChatGPT en s'appuyant sur les routes API décrites ci-dessous - voir aussi le document `AI-WORK-KIT-architecture-backend-et-contrat-API.md` fourni séparément. Intégration finale, vérification (build + lint) et complément d'authentification (route `/auth/confirm`, middleware de session) faits par Claude.

## Stack

- Next.js (App Router, TypeScript, Tailwind) - hébergé sur Vercel.
- Supabase (Postgres + Auth par email et mot de passe).
- Chariow comme plateforme de vente, connectée via un webhook ("Pulse").

## Structure

```
supabase/migrations/0001_init.sql                        → schéma initial (tables + sécurité RLS)
supabase/migrations/0002_metiers_taches_many_to_many.sql → correction : table de liaison metiers_taches (une tâche appartient à plusieurs métiers)
supabase/migrations/0003_grants.sql                      → GRANT SQL requis par PostgREST (anon/authenticated/service_role) - sans ce fichier, l'API renvoie "permission denied" même avec la clé service_role, malgré des policies RLS correctes
supabase/seed/                                           → contenu réel (métiers, tâches, exercices, prompts, glossaire), déjà chargé en base pour metiers/taches/metiers_taches/glossaire
src/lib/supabase/client.ts          → client Supabase pour le navigateur
src/lib/supabase/server.ts          → client Supabase pour les composants/route serveur (respecte la session)
src/lib/supabase/admin.ts           → client "admin" (clé service_role) - uniquement pour le webhook
src/app/api/metiers/                → GET liste des 12 métiers
src/app/api/metiers/[slug]/         → GET détail d'un métier + tâches + chemin choisi
src/app/api/metiers/[slug]/chemin/  → POST changer le chemin IA choisi
src/app/api/taches/[id]/            → GET détail d'une tâche + exercices + prompts
src/app/api/glossaire/              → GET les 8 termes du glossaire
src/app/api/moi/                    → GET infos de l'utilisateur connecté
src/app/api/webhooks/chariow/       → POST reçoit le Pulse "successful.sale" de Chariow
```

## Variables d'environnement

Voir `env.example` à la racine. À renseigner en local (`.env.local`, jamais commité) et sur Vercel (Project Settings → Environment Variables).

## Mise en place de la base de données

Les migrations dans `supabase/migrations/` sont appliquées dans l'ordre (0001 → 0002 → 0003) depuis l'éditeur SQL du tableau de bord Supabase, ou via la CLI Supabase (`supabase db push`). Les trois sont déjà appliquées sur le projet en production.

## Import du contenu

Le contenu (12 métiers, 42 tâches, 84 exercices, 252 prompts, glossaire) est prêt sous forme de fichiers SQL dans `supabase/seed/`, à coller dans l'éditeur SQL Supabase dans cet ordre :

1. `seed_0003_metiers_taches.sql` - 42 tâches, 12 métiers, 217 associations métier↔tâche. **Déjà chargé.**
2. `seed_0004_exercices.sql` - 84 cas fictifs (2 par tâche). **À charger.**
3. `seed_0005_prompts.sql` - 252 prompts (84 ChatGPT + 84 Claude + 84 Gemini). **À charger.**
4. `seed_0006_glossaire.sql` - 8 termes du glossaire. **Déjà chargé.**

Les fichiers 0004 et 0005 sont volumineux (plusieurs centaines de Ko) : mieux vaut les coller directement (copier-coller du fichier entier) plutôt que de les taper, pour éviter tout risque d'erreur de transcription sur un aussi grand volume de texte.

## État actuel

- [x] Schéma de base de données (migrations 0001-0003, y compris les GRANT PostgREST).
- [x] Authentification par email et mot de passe (via Supabase Auth). Site URL et Redirect URLs configurés sur `https://ai-work-kit.parlonsads.com` (+ ancien domaine Vercel, wildcard preview Vercel et localhost pour le dev, conservés en secours).
- [x] Routes API du contrat (métiers, tâches, glossaire, moi, chemin).
- [x] Webhook Chariow : Pulse "Vente réussie" (successful.sale) configuré côté Chariow, scopé au produit AI WORK KIT (type **Formations**, `prd_rttm8es6`), pointant vers `https://ai-work-kit.parlonsads.com/api/webhooks/chariow`. Vérification de signature HMAC-SHA256 correcte (voir `src/app/api/webhooks/chariow/route.ts`), variables `CHARIOW_WEBHOOK_SECRET` et `CHARIOW_PRODUIT_ID_AI_WORK_KIT` renseignées sur Vercel et redéployées. Testé de bout en bout (signature valide, filtrage produit, anti-doublon, création de compte + email d'invitation) : réponses HTTP 200 confirmées côté Chariow.
- [x] Changement de type de produit Chariow : le produit initial "AI WORK KIT" était créé en type **Fichiers**, incompatible avec la nature du produit (accès à une plateforme web, pas un fichier à télécharger). Chariow ne permettant pas de changer le type d'un produit existant, un nouveau produit "AI WORK KIT" a été créé en type **Formations** (`prd_rttm8es6`, même nom, même catégorie "Éducation & Apprentissage", même tarif 15 000 F CFA / promo 5 000 F CFA, même description). L'ancien produit a été renommé "AI WORK KIT (ancien - Fichiers)" (`prd_a9paq0w0`) et laissé en Brouillon - à supprimer une fois confirmé qu'aucune vente n'y est plus associée. Le Pulse a été recréé pour cibler le nouveau produit (nouveau secret de signature, mis à jour sur Vercel).
- [x] Import du contenu : métiers, tâches, associations, glossaire, exercices et prompts - tout est chargé en base et vérifié (12/42/217/8/84/252 lignes, jointures propres).
- [x] Déploiement sur Vercel : en ligne sur https://ai-work-kit.parlonsads.com (domaine personnalisé branché sur le projet "ai-work-kit", équipe "awk4" ; l'URL `ai-work-kit.vercel.app` reste valable en secours). Déploiement automatique actif dès qu'un commit est poussé sur la branche `main` du dépôt GitHub `DanishDarius/AI-WORK-KIT`.
- [x] Interface visuelle (construite par ChatGPT) : 4 écrans - accueil (`/`), fiche métier (`/metiers/[slug]`), fiche tâche (`/taches/[id]?metier=<slug>`), mon compte (`/mon-compte`). Build de production et lint vérifiés par Claude (voir `FRONTEND.md` pour le détail livré par ChatGPT).
- [x] Activation après achat : le webhook invite le nouvel acheteur vers `/activation`, où il choisit son premier mot de passe. La route `src/app/auth/confirm/route.ts` et `src/components/session-from-hash.tsx` prennent en charge les liens Supabase en `token_hash`, code PKCE ou fragment d'URL.
- [x] Connexion et récupération : `/connexion` utilise email + mot de passe ; `/mot-de-passe-oublie` envoie le lien de récupération et `/nouveau-mot-de-passe` enregistre le nouveau mot de passe. Aucun formulaire public d'inscription n'est exposé.
- [x] Autorisation commerciale : toutes les routes de contenu exigent une session Supabase et au moins une ligne `acces_clients` au statut `actif`. Une révocation bloque donc les données même si une ancienne session existe encore.
- [x] SMTP personnalisé configuré dans Supabase (Authentication → Emails → SMTP Settings), via Brevo : serveur `smtp-relay.brevo.com:587`, expéditeur `noreply@parlonsads.com` ("AI WORK KIT"). Enregistrements DNS d'authentification Brevo (code de vérification + 2 CNAME DKIM) ajoutés chez Hostinger. Limite d'envoi passée de 2 à **30 emails/heure**. Le DMARC existant chez Hostinger (lié au service mail actuel du domaine) a été conservé tel quel plutôt que remplacé par celui de Brevo (un seul enregistrement DMARC valide par domaine) ; le SPF existant n'a pas non plus été touché.

## Prochaines étapes

- **Important** : le nouveau produit "AI WORK KIT" (type Formations, `prd_rttm8es6`) est actuellement en statut **Brouillon** dans Chariow (Produits → AI WORK KIT). Il doit être publié pour que de vrais clients puissent l'acheter et déclencher le Pulse en conditions réelles. Le type de produit Chariow (Formations vs Licences vs Services) est en cours de réexamen séparément.
- Supprimer (ou laisser en Brouillon indéfiniment) l'ancien produit "AI WORK KIT (ancien - Fichiers)" (`prd_a9paq0w0`) une fois qu'aucune vente en cours n'y fait plus référence.
- Vérifier l'authentification du domaine côté Brevo (bouton "Vérifier les enregistrements" / "Authentifier le domaine") une fois la propagation DNS terminée (jusqu'à 48h) - sans quoi Brevo peut appliquer des limites d'envoi ou un moins bon taux de délivrabilité tant que le domaine n'est pas authentifié.
- Personnaliser les modèles Supabase "Invite user" et "Reset password" en français. Ils doivent conserver les variables Supabase requises et rediriger respectivement vers `/activation` et `/nouveau-mot-de-passe`.
- Une fois une vraie vente effectuée, vérifier dans Supabase (table `acces_clients`) que la ligne est créée, que l'email d'invitation part bien via Brevo, et surtout **tester le clic sur le lien reçu de bout en bout** (jusqu'ici seul le build a été vérifié techniquement - la connexion réelle via un vrai email n'a pas encore été testée en conditions réelles).
