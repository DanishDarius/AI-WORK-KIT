# AI WORK KIT — Application

Backend (base de données, authentification, webhook Chariow, API) mis en place et maintenu par Claude. L'interface visuelle (composants, style, pages) est construite par ChatGPT en s'appuyant sur les routes API décrites ci-dessous — voir aussi le document `AI-WORK-KIT-architecture-backend-et-contrat-API.md` fourni séparément.

## Stack

- Next.js (App Router, TypeScript, Tailwind) — hébergé sur Vercel.
- Supabase (Postgres + Auth par lien magique).
- Chariow comme plateforme de vente, connectée via un webhook ("Pulse").

## Structure

```
supabase/migrations/0001_init.sql   → schéma complet de la base (tables + sécurité RLS)
src/lib/supabase/client.ts          → client Supabase pour le navigateur
src/lib/supabase/server.ts          → client Supabase pour les composants/route serveur (respecte la session)
src/lib/supabase/admin.ts           → client "admin" (clé service_role) — uniquement pour le webhook
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

Le fichier `supabase/migrations/0001_init.sql` contient tout le schéma (tables + règles de sécurité). Il est appliqué directement depuis l'éditeur SQL du tableau de bord Supabase, ou via la CLI Supabase (`supabase db push`).

## Import du contenu

Le contenu (12 métiers, 42 tâches, 84 exercices, 252 prompts, glossaire) existe déjà, rédigé et validé, dans les fichiers Markdown produits pendant la conception du produit. Un script d'import sera ajouté dans une étape suivante pour transformer ce contenu en lignes de base de données — ce n'est pas encore fait dans cette première version du dépôt.

## État actuel (première mise en place)

- [x] Schéma de base de données (migration SQL).
- [x] Authentification par lien magique (via Supabase Auth, à activer dans les réglages du projet Supabase).
- [x] Routes API du contrat (métiers, tâches, glossaire, moi, chemin).
- [x] Webhook Chariow (structure prête, réglage fin du format exact du payload à faire dès qu'on a un exemple réel).
- [ ] Import du contenu réel dans la base de données.
- [ ] Déploiement sur Vercel et connexion au domaine.
- [ ] Interface visuelle (côté ChatGPT).
