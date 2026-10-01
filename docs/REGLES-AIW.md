# Règles AIW

Ces règles s'appliquent à tout code, toute structure et toute action sur AIW, jusqu'à ce que la plateforme soit prête, puis après. Elles viennent de l'audit du 2 octobre 2026 : chaque règle ferme un défaut réellement trouvé dans le code.

Avant chaque livraison : `npm run verif` passe, puis la revue manuelle de la fin de ce fichier est faite. Une règle marquée « test » est contrôlée automatiquement (dossier `tests/`). Une règle marquée « revue » ne peut pas l'être : elle se vérifie à la main.

## Sécurité

| Règle | Énoncé | Contrôle |
| --- | --- | --- |
| S1 | L'accès payé se vérifie côté serveur dans chaque page réservée (`exigerAccesActif`) et dans chaque route API réservée (`requireActiveUser`). Le layout et le proxy ne suffisent pas. | tests `acces.test.ts`, `acces-api.test.ts` |
| S2 | Aucun contenu payant dans un composant client ni dans `public/`. Il arrive par un rendu serveur ou par une route protégée. | test `contenu-client.test.ts` |
| S3 | La clé service ne vit que dans des fichiers marqués `server-only`. Aucune variable `NEXT_PUBLIC_` ne porte un secret. | test `cle-service.test.ts` |
| S4 | Chaque table a la RLS activée, des droits explicites pour `service_role`, et aucun droit par défaut pour `anon` ou `authenticated`. Aucune politique n'ouvre le contenu payant à tout compte connecté. | test `migrations.test.ts` |
| S5 | Le webhook de paiement refuse la requête quand le secret est absent, vérifie la signature à temps constant, valide l'événement, le produit et l'e-mail, et reste idempotent. | test `webhook.test.ts` |
| S6 | Aucune redirection vers une valeur fournie par l'utilisateur sans validation : chemin interne qui commence par `/` et pas par `//`. | test `auth-confirm.test.ts` |
| S7 | Toute entrée utilisateur est validée et bornée côté serveur. Un identifiant est validé avant usage. Aucune entrée brute dans un filtre `.or()` ou `ilike`. | test `code.test.ts`, revue |
| S8 | Le client reçoit un message d'erreur générique. Le détail technique va dans les logs. | test `code.test.ts` |
| S9 | Les en-têtes de sécurité sont en place : CSP, `frame-ancestors`, `Referrer-Policy`, `X-Content-Type-Options`, `Permissions-Policy`. | test `en-tetes.test.ts` |
| S10 | Une variable de sécurité absente bloque la fonction (jamais « optionnelle »). Aucun secret dans le dépôt. Claude ne saisit ni clé ni mot de passe. | revue |
| S11 | `npm audit --omit=dev --audit-level=high` ne signale rien. Les correctifs de sécurité des dépendances sont appliqués. | `npm run verif` |
| S12 | Pas de `dangerouslySetInnerHTML`. Les liens externes portent `rel="noreferrer"`. | test `code.test.ts` |
| S13 | Toute route qui écrit en base ou envoie un e-mail a une limite par compte, et la limite ne dépend pas d'une écriture qui peut échouer. | revue |

## Charge

| Règle | Énoncé | Contrôle |
| --- | --- | --- |
| C1 | Le contenu commun à tous les clients (catalogue, métiers, tâches, glossaire, guides) est mis en cache côté serveur. Il n'est pas relu en base à chaque requête. | revue |
| C2 | Un affichage de page fait au plus 2 appels Auth et 8 requêtes base. Pas de boucle de requêtes, pas d'appel en double. | revue |
| C3 | Les pages publiques sont statiques. | test `pages.test.ts` |
| C4 | Un GET n'écrit jamais en base. | revue |
| C5 | Toute liste lue en base est bornée (`limit`) ou paginée. | revue |
| C6 | Le parcours d'achat ne casse pas sous la charge : un accès payé n'est jamais retiré parce qu'un e-mail échoue, et l'envoi peut être repris. | test `webhook.test.ts` |
| C7 | Chaque colonne filtrée a un index. Un e-mail se compare en minuscules avec une égalité, jamais avec `ilike`. | test `code.test.ts` |

## Qualité

| Règle | Énoncé | Contrôle |
| --- | --- | --- |
| Q1 | `npm run verif` passe avant chaque livraison : lint, types, tests, audit, build. | `npm run verif`, GitHub |
| Q2 | Une correction ou une règle nouvelle arrive avec son test. | revue |
| Q3 | TypeScript strict : pas de `any`, pas de `@ts-ignore`. | test `code.test.ts` |
| Q4 | Une fonction utilitaire existe à un seul endroit. Pas de code mort. | revue |
| Q5 | Chaque groupe de pages a sa page d'erreur et son état de chargement. | test `pages.test.ts` |
| Q6 | Avant d'utiliser une API de Next, lire sa page dans `node_modules/next/dist/docs/`. | revue |
| Q7 | Textes en français, au vouvoiement, sans tiret long, sans le nom du fondateur, sans témoignage ni chiffre inventé. Tout contenu local suit la bible de localisation. | revue |

## Base de données

| Règle | Énoncé | Contrôle |
| --- | --- | --- |
| B1 | Toute modification passe par un fichier de migration numéroté et rejouable, qui porte dans le même fichier la RLS, les droits et les index. | test `migrations.test.ts`, revue |
| B2 | En production, Claude montre le SQL et ne l'exécute qu'après accord. Claude ne supprime pas de données. | revue |

## Livraison

| Règle | Énoncé | Contrôle |
| --- | --- | --- |
| L1 | Le travail se fait sur `frontend/nouvelle-interface`. Aucune fusion dans `main` sans le mot « Valide ». | revue |
| L2 | Chaque message de livraison dit ce qui a été vérifié, ce qui ne l'a pas été, et les tests encore en échec. | revue |

## Revue manuelle avant livraison

1. `npm run verif` : noter le résultat et les tests en échec.
2. Relire le diff avec les règles « revue » ci-dessus : S7, S10, S13, C1, C2, C4, C5, Q2, Q4, Q6, Q7, B1, B2.
3. Compter les requêtes de chaque page ou route modifiée (règle C2).
4. Si une table, une variable d'environnement ou un réglage externe change, mettre à jour la liste ci-dessous et `env.example`.
5. Écrire le message de livraison (règle L2).

## Réglages hors du code, à vérifier avant le lancement

- Supabase : inscription publique désactivée ; limite d'e-mails par heure relevée ; longueur minimale du mot de passe ; liste des URL de redirection ; sauvegardes ; offre adaptée au trafic.
- Vercel : chaque secret présent dans tous les environnements qui en ont besoin ; protection des préversions ; offre adaptée à un usage commercial.
- Chariow : les quatre produits rattachés au Pulse ; secret de signature renseigné.
- GitHub : dépôt privé (il contient les guides et les PDF).
