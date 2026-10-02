# AIW (AI WORK KIT)

AIW est une application web installable (PWA) de formation à l'IA au travail, un produit de Parlons ADS. L'acheteur paie un accès unique, puis suit le parcours de son métier : des tâches concrètes, des cas pratiques et des prompts prêts pour ChatGPT, Claude et Gemini.

- Site en ligne : https://ai-work-kit.parlonsads.com (branche `main`).
- Branche de travail : `frontend/nouvelle-interface`. Aucune fusion dans `main` sans validation.

## Ce que fait chaque service

| Service | Rôle |
| --- | --- |
| Next.js sur Vercel | L'application : pages, routes API, proxy de session. Fonctions à Dublin (`vercel.json`), dans la région de la base. |
| Supabase | Base de données (Postgres, Irlande) et comptes (e-mail et mot de passe). |
| Chariow | Paiement. Un Pulse « vente réussie » appelle `/api/webhooks/chariow`. |
| Resend | Envoi de tous les e-mails : activation et mot de passe (par le SMTP de Supabase), demandes de contact et sur mesure (par l'application). Domaine d'envoi : `parlonsads.com`. |
| tawk.to | Chat du support, réservé aux abonnés. |

## Parcours d'un acheteur

1. Il paie sur Chariow. Le Pulse arrive sur `/api/webhooks/chariow`, qui vérifie la signature et crée une ligne dans `acces_clients`.
2. Supabase lui envoie un e-mail d'activation. Le lien l'amène sur `/activation`, où il choisit son mot de passe. Le modèle de cet e-mail et celui du nouveau mot de passe sont dans `supabase/emails/` ; ils se collent dans Supabase (Authentication, Emails, Templates).
3. Si l'e-mail n'arrive pas, il redemande son lien sur `/activation/renvoi`. L'accès payé n'est jamais retiré pour un e-mail en échec.
4. Chaque page réservée et chaque route API vérifie la session et l'accès actif.

## Organisation du code

```
proxy.ts                      session et redirections avant chaque page réservée
src/app/(public)/             page d'accès et pages légales (statiques)
src/app/(auth)/               connexion, activation, mot de passe
src/app/(app)/                pages réservées aux clients
src/app/api/                  routes API (toutes derrière requireActiveUser, sauf exceptions listées dans tests/regles/acces.test.ts)
src/lib/acces.ts              accès des pages (exigerAccesActif)
src/lib/supabase/active-access.ts   accès des routes API (requireActiveUser)
src/lib/acces-actif.ts        la seule lecture de l'accès payé en base
src/lib/contenu.ts            le contenu commun, lu une fois puis gardé en cache
src/lib/mise-en-place*.ts     contenu payant des kits, servi côté serveur uniquement
content/guides/               les guides (Markdown)
private/guides/pdf/           les PDF des guides, servis par une route protégée
supabase/migrations/          le schéma, dans l'ordre des numéros
supabase/controles/           requêtes de contrôle en lecture seule
tests/regles/                 les règles du projet, lues dans le code
tests/unitaires/              les tests du serveur
docs/REGLES-AIW.md            les règles de sécurité, de charge et de qualité
```

## Variables d'environnement

Voir `env.example`. Elles se renseignent en local dans `.env.local` (jamais envoyé sur GitHub) et dans Vercel (Project Settings, Environment Variables). Aucune clé n'est écrite dans le code.

## Base de données

- Toute modification passe par un fichier numéroté de `supabase/migrations/`, exécuté dans l'éditeur SQL de Supabase.
- Après chaque migration, lancer `supabase/controles/droits.sql` : il ne doit renvoyer aucune ligne.
- Pendant un lancement, `supabase/controles/activations-en-attente.sql` liste les acheteurs qui n'ont pas encore activé leur compte.
- Le contenu commun est gardé 10 minutes en cache : après une migration de contenu, le site peut mettre ce délai à l'afficher.

## Commandes

| Commande | Effet |
| --- | --- |
| `npm run dev` | Lance l'application en local. |
| `npm run verif` | Lint, types, tests, audit des dépendances et build. Doit passer avant chaque livraison. |
| `npm run test` | Lance seulement les tests. |

Les mêmes contrôles tournent sur GitHub à chaque envoi (`.github/workflows/verif.yml`).

## Règles

Les règles de sécurité, de charge et de qualité sont dans `docs/REGLES-AIW.md`. Elles s'appliquent à tout changement, et la plupart sont vérifiées par un test. Les réglages qui vivent hors du code (Supabase, Vercel, Chariow, Resend) sont listés à la fin de ce fichier de règles.
