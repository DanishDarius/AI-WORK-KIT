# Règles AIW

Ces règles s'appliquent à tout code, toute structure et toute action sur AIW, jusqu'à ce que la plateforme soit prête, puis après. Elles viennent de l'audit du 2 octobre 2026 : chaque règle ferme un défaut réellement trouvé dans le code.

Avant chaque livraison : `npm run verif` passe, puis la revue manuelle de la fin de ce fichier est faite. Une règle marquée « test » est contrôlée automatiquement (dossier `tests/`). Une règle marquée « revue » ne peut pas l'être : elle se vérifie à la main.

## Sécurité

| Règle | Énoncé | Contrôle |
| --- | --- | --- |
| S1 | L'accès payé se vérifie côté serveur dans chaque page réservée (`exigerAccesActif`) et dans chaque route API réservée (`requireActiveUser`). Le layout et le proxy ne suffisent pas. Une seule fonction lit l'accès en base (`src/lib/acces-actif.ts`) ; elle garde une réponse « actif » 60 secondes, jamais un refus ni une erreur. Une route publique est une exception écrite et justifiée dans `acces.test.ts`. | tests `acces.test.ts`, `acces-api.test.ts`, `acces-actif.test.ts` |
| S2 | Aucun contenu payant dans un composant client ni dans `public/`. Il arrive par un rendu serveur ou par une route protégée. | test `contenu-client.test.ts` |
| S3 | La clé service ne vit que dans des fichiers marqués `server-only`. Aucune variable `NEXT_PUBLIC_` ne porte un secret. | test `cle-service.test.ts` |
| S4 | Chaque table a la RLS activée, des droits explicites pour `service_role`, et aucun droit pour `anon`. Le contenu payant n'est lisible que par un compte dont l'accès est actif (politique `a_un_acces_actif()`), jamais par tout compte connecté. Les tables internes (accès, abonnements, demandes) sont réservées au serveur. Aucun droit par défaut pour `anon` ou `authenticated`. Un compte connecté n'a que les droits dont l'application se sert : jamais `truncate`, `references` ni `trigger`. | test `migrations.test.ts`, contrôle en base `supabase/controles/droits.sql` |
| S5 | Le webhook de paiement refuse la requête quand le secret est absent, vérifie la signature à temps constant, valide l'événement, le produit et l'e-mail, et reste idempotent. Un événement qui ne nous concerne pas reçoit 200 : Chariow désactive le Pulse après 5 erreurs. | test `webhook.test.ts` |
| S6 | Aucune redirection vers une valeur fournie par l'utilisateur sans validation (`cheminInterne`) : chemin interne qui commence par `/` et pas par `//`. | tests `auth-confirm.test.ts`, `normaliser.test.ts` |
| S7 | Toute entrée utilisateur est validée et bornée côté serveur (`src/lib/normaliser.ts`). Un identifiant est validé avant usage. Aucune entrée brute dans un filtre `.or()` ou `ilike`. | tests `code.test.ts`, `normaliser.test.ts`, revue |
| S8 | Le client reçoit un message d'erreur générique (`erreurServeur`). Le détail technique va dans les logs. | tests `code.test.ts`, `webhook.test.ts` |
| S9 | Les en-têtes de sécurité sont en place : CSP, `frame-ancestors`, `Referrer-Policy`, `X-Content-Type-Options`, `Permissions-Policy`. | test `en-tetes.test.ts` |
| S10 | Une variable de sécurité absente bloque la fonction (jamais « optionnelle »). Aucun secret dans le dépôt. Claude ne saisit ni clé ni mot de passe. | revue |
| S11 | `npm audit --omit=dev --audit-level=high` ne signale rien. Les correctifs de sécurité des dépendances sont appliqués. | `npm run verif` |
| S12 | Pas de `dangerouslySetInnerHTML`. Les liens externes portent `rel="noreferrer"`. | test `code.test.ts` |
| S13 | Toute route qui écrit en base ou envoie un e-mail a une limite par compte, et la limite ne dépend pas d'une écriture qui peut échouer. | revue |

## Charge

| Règle | Énoncé | Contrôle |
| --- | --- | --- |
| C1 | Le contenu commun à tous les clients (métiers, tâches, cas pratiques, prompts, guides) est mis en cache côté serveur. Il n'est pas relu en base à chaque requête. Seul `src/lib/contenu.ts` interroge les tables de contenu (cache de 10 minutes) ; il ne s'appelle qu'après la vérification de l'accès. | tests `charge.test.ts`, `routes-charge.test.ts` |
| C2 | Un affichage de page fait au plus 2 appels Auth et 8 requêtes base. Pas de boucle de requêtes, pas d'appel en double. La session se vérifie sur place (`lireSession`, sans appel réseau) : `getUser()` est réservé aux exceptions listées dans `charge.test.ts`. Une route fait au plus 3 requêtes propres au compte. Côté navigateur, une même lecture est partagée entre les composants (`useResource`). | tests `charge.test.ts`, `routes-charge.test.ts`, `session.test.ts`, `proxy.test.ts`, revue |
| C3 | Les pages publiques sont statiques : ce qui dépend du visiteur se décide dans le navigateur. Le proxy ne s'exécute pas sur elles, et ne fait aucun travail pour un visiteur sans session. | tests `pages.test.ts`, `proxy.test.ts` |
| C4 | Un GET n'écrit jamais en base. | tests `charge.test.ts`, `routes-charge.test.ts` |
| C5 | Toute liste lue en base est bornée (`limit`) ou paginée. La requête s'écrit en une seule chaîne, limite comprise. | test `charge.test.ts` |
| C6 | Le parcours d'achat ne casse pas sous la charge : un accès payé n'est jamais retiré parce qu'un e-mail échoue, une vente enregistrée reçoit toujours 200 (Chariow désactive le Pulse après 5 erreurs), et l'acheteur peut redemander son lien (`/activation/renvoi`). | tests `webhook.test.ts`, `activation-renvoi.test.ts` |
| C7 | Chaque colonne filtrée a un index. Un e-mail se compare en minuscules avec une égalité, jamais avec `ilike`. | test `code.test.ts` |

## Qualité

| Règle | Énoncé | Contrôle |
| --- | --- | --- |
| Q1 | `npm run verif` passe avant chaque livraison : lint, types, tests, audit, build. | `npm run verif`, GitHub |
| Q2 | Une correction ou une règle nouvelle arrive avec son test. | revue |
| Q3 | TypeScript strict : pas de `any`, pas de `@ts-ignore`. | test `code.test.ts` |
| Q4 | Une fonction utilitaire existe à un seul endroit. Pas de code mort. Aucun fichier généré (cache de build) dans le dépôt. | test `cle-service.test.ts`, revue |
| Q5 | Chaque groupe de pages a sa page d'erreur et son état de chargement. | test `pages.test.ts` |
| Q6 | Avant d'utiliser une API de Next, lire sa page dans `node_modules/next/dist/docs/`. | revue |
| Q7 | Textes en français, au vouvoiement, sans tiret long, sans le nom du fondateur, sans témoignage ni chiffre inventé. Tout contenu local suit la bible de localisation. Les e-mails de compte suivent la même règle ; leur version de référence est dans `supabase/emails/`. | test `emails.test.ts`, revue |

## Base de données

| Règle | Énoncé | Contrôle |
| --- | --- | --- |
| B1 | Toute modification passe par un fichier de migration numéroté et rejouable, qui porte dans le même fichier la RLS, les droits et les index. Supabase donne de lui-même des droits aux rôles publics à la création d'une table : la migration les remet à zéro (`revoke all`) avant de donner les siens. Après chaque migration en production, `supabase/controles/droits.sql` (lecture seule) est lancé et ne doit renvoyer aucune ligne. | test `migrations.test.ts`, contrôle en base, revue |
| B2 | En production, Claude montre le SQL et ne l'exécute qu'après accord. Claude ne supprime pas de données. | revue |

## Livraison

| Règle | Énoncé | Contrôle |
| --- | --- | --- |
| L1 | Le travail se fait sur `frontend/nouvelle-interface`. Aucune fusion dans `main` sans le mot « Valide ». | revue |
| L2 | Chaque message de livraison dit ce qui a été vérifié, ce qui ne l'a pas été, et les tests encore en échec. | revue |

## Revue manuelle avant livraison

1. `npm run verif` : noter le résultat et les tests en échec.
2. Relire le diff avec les règles « revue » ci-dessus : S7, S10, S13, C2, Q2, Q4, Q6, Q7, B1, B2.
3. Compter les requêtes de chaque page ou route modifiée (règle C2).
4. Si une table, une variable d'environnement ou un réglage externe change, mettre à jour la liste ci-dessous et `env.example`. Si une migration a été exécutée, lancer `supabase/controles/droits.sql` en base : aucune ligne attendue.
5. Écrire le message de livraison (règle L2).

## Réglages hors du code, à vérifier avant le lancement

- Supabase : inscription publique désactivée ; e-mails envoyés par Resend (SMTP `smtp.resend.com`, expéditeur `hello@parlonsads.com`), limite de Supabase à 500 par heure, offre Resend adaptée au nombre d'achats attendus (un e-mail par achat) ; modèles d'e-mail « Invite user » et « Reset password » identiques aux fichiers de `supabase/emails/` (à recoller après chaque changement de ces fichiers) ; durée des liens (« Email OTP expiration ») égale à celle annoncée dans ces e-mails, 24 heures ; clés de signature asymétriques (ES256), sans quoi `lireSession` refait un appel réseau à chaque requête ; longueur minimale du mot de passe ; liste des URL de redirection ; sauvegardes ; offre adaptée au trafic.
- Vercel : chaque secret présent dans tous les environnements qui en ont besoin (sans `CHARIOW_WEBHOOK_SECRET`, le webhook répond 503) ; protection des préversions ; offre adaptée à un usage commercial ; fonctions dans la région de la base (`vercel.json`, `dub1` pour une base en Irlande).
- Pendant un lancement : lancer `supabase/controles/activations-en-attente.sql` (lecture seule) pour voir les acheteurs qui n'ont pas activé leur compte.
- Après une migration de contenu : le site montre le changement dans les 10 minutes (cache du contenu).
- Après toute livraison qui touche aux en-têtes : ouvrir le site déployé, vérifier que la console du navigateur ne signale aucun blocage CSP, puis tester le chat du support et une vidéo.
- Chariow : les quatre produits rattachés au Pulse ; secret de signature renseigné.
- Resend : un seul service d'envoi pour toute l'application ; domaine `parlonsads.com` vérifié ; boîte `hello@parlonsads.com` relevée (les acheteurs y répondent).
- GitHub : dépôt privé (il contient les guides et les PDF).
