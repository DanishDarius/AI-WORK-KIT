-- 0045 : kit « Commerce et vente en ligne », fusion des tâches sur les avis
-- et sur la publicité (7 octobre 2026)
--
-- Décision : dans le kit Commerce seulement, F50 reprend le travail de F26
-- (lire ses avis) et F49 celui de F28 (lire les résultats de sa publicité).
-- Une seule tâche sur les avis, une seule sur la publicité. Les textes
-- viennent du document validé le 7 octobre 2026, « AIW : kit Commerce,
-- fusion des tâches avis et publicité ».
--
-- F50 : nouveau titre, résultat, étapes, précisions et consigne. Le
-- formulaire passe de 4 à 5 champs : la ligne « accord » est réécrite sur
-- place et devient « avis_autorises », une ligne « moyens » s'ajoute.
-- Cas 1 : les dix avis de la pâtisserie remplacent les trois messages.
-- Cas 2 : deux retours de clientes s'ajoutent à l'avis existant.
--
-- F49 : nouveau titre, résultat, étapes, précisions, consigne et
-- avertissement sur les calculs. Le formulaire passe de 6 à 7 champs : une
-- ligne « resultats », facultative, s'ajoute. Cas 1 : inchangé. Cas 2 : il
-- devient la lecture des résultats, avec une réponse attendue chiffrée.
--
-- Ce qui ne change pas : F26 et F28, les autres métiers, les 11 tâches du
-- métier Commerce, les ressources rattachées, les personnages, les villes
-- et les prix des cas. F49 et F50 sont nées avec le kit Commerce
-- (migration 0019) : elles n'ont ni cas localisé à côté, ni ancien prompt.
-- Le site en ligne lit la même base : il affiche les mêmes textes.
--
-- Aucune table créée, aucun droit modifié, aucune ligne supprimée.
-- Migration rejouable.

begin;

-- 1. F50 : lire ses avis, puis publier les vrais avis positifs
update taches
   set titre = $t$Lire ses avis clients et en faire des messages de confiance$t$,
       resultat = $t$Ce que vos clients disent vraiment : les sujets qui reviennent, les deux points à corriger d'abord et une réponse prête pour chaque avis négatif. Puis vos vrais avis positifs, remis au propre sans en changer le sens, en trois formats (statut WhatsApp, publication Facebook, réponse à un client qui hésite), et le message qui demande l'accord du client.$t$,
       etapes = $j$["Rassembler tous les avis reçus, les bons comme les mauvais : messages WhatsApp, commentaires Facebook.", "Les recopier mot pour mot, sans nom ni numéro, un avis par ligne.", "Noter les avis positifs dont le client a donné son accord pour la publication.", "Remplir le modèle et copier la consigne dans son IA.", "Vérifier le classement, choisir une seule amélioration pour le mois, et répondre aux avis négatifs en privé d'abord.", "Vérifier que l'IA n'a ajouté aucun compliment, puis publier avec le prénom seul ou une formule comme « une cliente de Douala »."]$j$::jsonb,
       precisions = $t$Un avis ne se publie qu'avec l'accord du client : sans accord, le modèle rédige seulement le message qui le demande. N'écrivez jamais un avis vous-même : un faux avis trompe vos clients.$t$
 where code = $t$F50$t$;

update modeles_prompts mp
   set titre = $t$Lire ses avis clients et en faire des messages de confiance$t$,
       gabarit = $t$Rôle : Vous m'aidez à lire les avis de mes clients, puis à mettre en valeur les vrais avis positifs, sans rien inventer et sans les embellir.

Contexte : Ma boutique : {{boutique}}. Les avis reçus, mot pour mot, un par ligne, sans nom : {{avis}}. Ce que je peux changer ce mois-ci : {{moyens}}. Les avis que je peux publier, avec l'accord du client : {{avis_autorises}}. Comment je peux citer ces clients : {{signature}}.

Travail demandé :
1. Les avis regroupés par sujet, avec le nombre d'avis par sujet.
2. Les deux points à corriger en premier, avec une action simple pour chacun.
3. Une réponse de 3 lignes à chaque avis négatif, avec une salutation, à envoyer en privé.
4. Pour chaque avis que je peux publier : l'orthographe corrigée sans changer le sens, puis trois formats : un statut WhatsApp de 2 lignes, une publication Facebook de 3 à 4 lignes, et une réponse à un client qui hésite.
5. Pour les autres avis positifs : le message qui demande au client son accord pour la publication.

Format : texte simple, sans astérisque, prêt à coller. Un avis publié reste entre guillemets.

Règle : comptez les avis tels qu'ils sont, sans en ajouter. Ne minimisez pas un reproche. N'inventez aucun avis, aucune note, aucun chiffre, et n'ajoutez aucun compliment. N'écrivez ni nom complet ni numéro. Dans une réponse à un avis négatif, reconnaissez le problème, dites ce qui change, et ne promettez que ce que je peux tenir. Si aucun avis n'est autorisé, ne rédigez aucune publication.$t$,
       exemple_cas = 1,
       avertissement = null,
       version = 2,
       revu_le = '2026-10-07'
  from taches t
 where t.id = mp.tache_id and t.code = $t$F50$t$;

-- La ligne « accord » est réécrite sur place : elle devient « avis_autorises »
-- (rien n'est supprimé). Au second passage, elle n'existe plus : rien ne bouge.
update champs_modele c
   set cle = $t$avis_autorises$t$
  from modeles_prompts mp, taches t
 where c.modele_id = mp.id and t.id = mp.tache_id and t.code = $t$F50$t$
   and c.cle = $t$accord$t$
   and not exists (select 1 from champs_modele x where x.modele_id = c.modele_id and x.cle = $t$avis_autorises$t$);

insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$boutique$t$, $t$Que vendez-vous et où ?$t$, $t$texte$t$, null::jsonb, $t$une pâtisserie à Douala$t$, true, 1),
    ($t$avis$t$, $t$Quels avis avez-vous reçus, mot pour mot ?$t$, $t$long$t$, null::jsonb, $t$Gâteau d'anniversaire magnifique, tout le monde a aimé.
Commande livrée avec une heure de retard, la fête avait commencé.
Très bon, mais le prix a augmenté sans prévenir.
Le livreur ne trouvait pas la maison, il m'a appelée quatre fois.
Service au comptoir très accueillant.
Le message sur le gâteau avait une faute dans le prénom.
Livraison en retard, encore une fois.
Les petits fours sont très bons.
Personne ne répond sur WhatsApp après 18 h.
Gâteau conforme à la photo, merci.$t$, true, 2),
    ($t$moyens$t$, $t$Que pouvez-vous changer ce mois-ci ?$t$, $t$texte$t$, null::jsonb, $t$l'heure de départ des livraisons et la relecture de chaque inscription$t$, false, 3),
    ($t$avis_autorises$t$, $t$Quels avis pouvez-vous publier, avec l'accord du client ?$t$, $t$long$t$, null::jsonb, $t$Gâteau d'anniversaire magnifique, tout le monde a aimé. Gâteau conforme à la photo, merci.$t$, false, 4),
    ($t$signature$t$, $t$Comment pouvez-vous citer ces clients ?$t$, $t$texte$t$, null::jsonb, $t$une cliente de Douala$t$, false, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F50$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

update exercices
   set titre = $t$Responsable commercial d'une pâtisserie à Douala$t$,
       contexte = $t$Vous êtes responsable commercial de Bonapriso Délices, une pâtisserie de 9 personnes. Le mois dernier, vous avez relevé dix avis de clients sur WhatsApp et sur Facebook.$t$,
       donnees = $t$1. « Gâteau d'anniversaire magnifique, tout le monde a aimé. »
2. « Commande livrée avec une heure de retard, la fête avait commencé. »
3. « Très bon, mais le prix a augmenté sans prévenir. »
4. « Le livreur ne trouvait pas la maison, il m'a appelée quatre fois. »
5. « Service au comptoir très accueillant. »
6. « Le message sur le gâteau avait une faute dans le prénom. »
7. « Livraison en retard, encore une fois. »
8. « Les petits fours sont très bons. »
9. « Personne ne répond sur WhatsApp après 18 h. »
10. « Gâteau conforme à la photo, merci. »
Les clientes des avis 1 et 10 ont donné leur accord pour la publication. Vous n'avez rien demandé aux autres.$t$,
       travail_a_faire = $t$Regroupez ces dix avis par sujet et comptez-les. Dites les deux points à corriger en premier. Rédigez la réponse à l'avis sur le retard et à l'avis sur la faute dans le prénom. Mettez ensuite en forme les deux avis autorisés, dans les trois formats, et rédigez le message qui demande leur accord aux deux autres clients satisfaits.$t$,
       reponse_attendue = null
 where numero = 1 and tache_id in (select id from taches where code = $t$F50$t$);

update exercices
   set titre = $t$Patronne d'un atelier de pagnes tissés à Ouagadougou$t$,
       contexte = $t$Vous tenez Faso Dan Fani Création Kadi, un atelier-boutique de 3 personnes. Ce mois-ci, trois clientes vous ont écrit après leur commande.$t$,
       donnees = $t$- « Bonjour. Ma sœur a bien reçu le colis. Les pagnes sont encore plus beaux que sur les photos. Merci pour le sérieux. » Cette cliente vit à l'étranger. Ses trois pagnes ont été livrés à Bobo-Dioulasso par une compagnie de transport. Elle accepte la publication, avec son prénom seulement.
- « Le colis est arrivé trois jours après la date annoncée. »
- « Très beaux pagnes. J'aurais aimé voir plus de photos avant de payer. »
- Vous n'avez rien demandé aux deux dernières clientes. Vous êtes tentée de rédiger deux avis vous-même pour en avoir plus.$t$,
       travail_a_faire = $t$Regroupez ces trois retours et dites ce qu'il faut corriger en premier. Rédigez la réponse à la cliente dont le colis est arrivé en retard. Mettez l'avis autorisé en forme dans les trois formats. Rédigez enfin le message qui demande un avis à vos cinq dernières clientes, plutôt que d'en inventer.$t$,
       reponse_attendue = null
 where numero = 2 and tache_id in (select id from taches where code = $t$F50$t$);

-- 2. F49 : écrire sa publicité, puis lire ses résultats
update taches
   set titre = $t$Écrire sa publicité Facebook, puis lire ses résultats$t$,
       resultat = $t$Trois versions d'une publicité qui invite à écrire sur WhatsApp, et le message d'accueil que le client reçoit en arrivant. Puis, après une semaine, la lecture de vos résultats : le coût par message et par vente, ce qu'il faut garder, modifier ou arrêter, et le seul réglage à tester ensuite. Ce type de publicité s'affiche sur Facebook et Instagram et ouvre une conversation WhatsApp quand on touche le bouton.$t$,
       etapes = $j$["Choisir un seul article ou une seule offre, et une photo nette.", "Remplir le modèle sans la partie « résultats », pour obtenir trois versions du texte.", "Créer la publicité depuis sa page Facebook, avec l'objectif de recevoir des messages sur WhatsApp, sa ville comme zone, un budget par jour et une durée. Meta recommande au moins 7 jours.", "Lancer deux versions qui se partagent le budget du jour, répondre vite aux messages, et noter dans le cahier les ventes venues de la publicité.", "Après 7 jours, relever le budget dépensé, les messages reçus et les ventes, puis remplir de nouveau le modèle, cette fois avec les résultats.", "Vérifier chaque calcul, changer un seul réglage, relancer la publicité, et comparer après la même durée."]$j$::jsonb,
       precisions = $t$Le paiement à Meta se fait par carte Visa ou Mastercard, y compris prépayée ; les moyens proposés dépendent du pays et s'affichent dans le compte publicitaire. Le budget des cas, 3 000 FCFA par jour, est le minimum recommandé par l'équipe d'AIW ; ce n'est pas un tarif de Meta. Sans carte, la publicité payante n'est pas possible : les textes servent alors de publications ordinaires sur la page. L'IA ne voit pas votre gestionnaire de publicités : elle calcule avec les chiffres que vous donnez, et ne promet aucun résultat. Avec très peu de ventes, une conclusion reste fragile : laissez tourner avant de trancher. Changez un seul réglage à la fois, sinon vous ne saurez pas ce qui a marché.$t$
 where code = $t$F49$t$;

update modeles_prompts mp
   set titre = $t$Écrire sa publicité Facebook, puis lire ses résultats$t$,
       gabarit = $t$Rôle : Vous rédigez des publicités Facebook pour une petite boutique qui veut recevoir des messages sur WhatsApp, puis vous m'aidez à lire leurs résultats. Vous montrez chaque calcul.

Contexte : Je fais la publicité de {{produit}}. Prix : {{prix}} FCFA. Ce qui la rend intéressante : {{atouts}}. Mes clients : {{clients}}. Livraison et paiement : {{livraison_paiement}}. Budget : {{budget}}. Résultats et réglages de ma publicité, si elle a déjà tourné : {{resultats}}.

Travail demandé :
Si les résultats ne sont pas précisés :
1. Trois versions de la publicité. Pour chacune : un texte principal de 3 lignes au plus, dont la première phrase dit l'essentiel, et un titre de 30 caractères au plus.
2. Le message d'accueil que le client verra en ouvrant WhatsApp.
3. La version à tester en premier, et pourquoi, en une phrase.
Si les résultats sont donnés :
1. Le coût par message, le coût par vente et le montant des ventes.
2. Les réglages qui ne correspondent pas à mon activité : zone, âge, public, texte, prix affiché.
3. Ce qu'il faut garder, modifier ou arrêter, et un seul changement à tester en premier.
4. Le nouveau texte de la publicité, seulement si c'est le texte qu'il faut changer.

Format : texte simple, prêt à coller. Chaque version finit par une invitation à écrire sur WhatsApp. Les calculs se présentent dans un tableau, montants écrits ainsi : 25 000 FCFA.

Règle : n'inventez ni réduction, ni stock limité, ni avis. Pas de promesse de résultat, pas de comparaison avant et après, pas de phrase qui pointe un défaut du lecteur. Pour les calculs, utilisez seulement mes chiffres et ne citez aucune moyenne du marché. Avec moins de cinq ventes, dites que la conclusion reste fragile.$t$,
       exemple_cas = 2,
       avertissement = $t$Une IA peut se tromper dans un calcul. Vérifiez chaque total.$t$,
       version = 2,
       revu_le = '2026-10-07'
  from taches t
 where t.id = mp.tache_id and t.code = $t$F49$t$;

insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$produit$t$, $t$De quoi faites-vous la publicité ?$t$, $t$texte$t$, null::jsonb, $t$une paire de chaussures pour homme$t$, true, 1),
    ($t$prix$t$, $t$À quel prix ?$t$, $t$nombre$t$, null::jsonb, $t$15 000$t$, true, 2),
    ($t$atouts$t$, $t$Qu'est-ce qui la rend intéressante ?$t$, $t$texte$t$, null::jsonb, $t$pointures 40 à 45, paiement à la livraison$t$, true, 3),
    ($t$clients$t$, $t$Qui voulez-vous toucher ?$t$, $t$texte$t$, null::jsonb, $t$des hommes de 20 à 40 ans, à Abidjan$t$, true, 4),
    ($t$livraison_paiement$t$, $t$Comment livrez-vous et comment vous paie-t-on ?$t$, $t$texte$t$, null::jsonb, $t$livraison à moto à 1 500 FCFA, paiement à la livraison en espèces ou par Wave$t$, true, 5),
    ($t$budget$t$, $t$Quel budget prévoyez-vous ?$t$, $t$texte$t$, null::jsonb, $t$3 000 FCFA par jour pendant 7 jours$t$, true, 6),
    ($t$resultats$t$, $t$Votre publicité a déjà tourné ? Donnez ses chiffres et ses réglages.$t$, $t$long$t$, null::jsonb, $t$7 jours, 21 000 FCFA dépensés, 70 messages reçus, 7 ventes ; zone réglée sur toute la Côte d'Ivoire ; 30 messages venaient de villes où je ne livre pas$t$, false, 7)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F49$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;

-- Le cas 1 de F49 ne change pas. Le cas 2 devient la lecture des résultats.
update exercices
   set titre = $t$Vendeur de chaussures sur Facebook et WhatsApp à Abidjan$t$,
       contexte = $t$Vous vendez seul des chaussures depuis Abobo. Votre première publicité vient de tourner 7 jours. Avant de la relancer, vous voulez savoir ce qu'elle a rapporté et quoi changer.$t$,
       donnees = $t$- Paire de chaussures pour homme à 15 000 FCFA, pointures 40 à 45. Vos clients : surtout des hommes de 20 à 40 ans.
- Livraison à moto dans Abidjan seulement : 1 500 FCFA. Paiement à la livraison, en espèces ou par Wave.
- Budget dépensé : 3 000 FCFA par jour pendant 7 jours, soit 21 000 FCFA.
- Résultats : 70 messages reçus, 7 ventes.
- Réglage de la zone : toute la Côte d'Ivoire. Sur les 70 messages, 30 venaient de villes où vous ne livrez pas.$t$,
       travail_a_faire = $t$Calculez le coût par message, le coût par vente et le montant des ventes. Dites quel réglage changer en premier, et pourquoi. Dites ce que vous comparerez après la relance.$t$,
       reponse_attendue = $t$Coût par message : 21 000 ÷ 70 = 300 FCFA. Coût par vente : 21 000 ÷ 7 = 3 000 FCFA. Montant des ventes : 7 × 15 000 = 105 000 FCFA. Messages venus de villes non livrées : 30 × 300 = 9 000 FCFA, dépensés pour des clients que vous ne pouvez pas livrer. Le réglage à changer en premier : la zone, ramenée à Abidjan. Le texte, la photo et le budget restent les mêmes. Après 7 jours de plus : comparer le nombre de messages, le coût par vente et le nombre de ventes.$t$
 where numero = 2 and tache_id in (select id from taches where code = $t$F49$t$);

-- Contrôle : la transaction est annulée si le résultat n'est pas celui attendu
do $controle$
declare
  n integer;
  cles text;
begin
  -- Les deux tâches portent leur nouveau titre, dans la tâche et dans le modèle
  select count(*) into n from taches t join modeles_prompts mp on mp.tache_id = t.id
    where (t.code = $t$F50$t$ and t.titre = $t$Lire ses avis clients et en faire des messages de confiance$t$ and mp.titre = t.titre
           and mp.avertissement is null and mp.exemple_cas = 1 and jsonb_array_length(t.etapes) = 6)
       or (t.code = $t$F49$t$ and t.titre = $t$Écrire sa publicité Facebook, puis lire ses résultats$t$ and mp.titre = t.titre
           and mp.avertissement is not null and mp.exemple_cas = 2 and jsonb_array_length(t.etapes) = 6);
  if n <> 2 then
    raise exception 'Tâches F49 et F50 fusionnées attendues : 2, trouvé : %', n;
  end if;

  -- Les champs du formulaire, dans l'ordre : ni plus, ni moins
  select string_agg(c.cle, ',' order by c.ordre) into cles from champs_modele c
    join modeles_prompts mp on mp.id = c.modele_id join taches t on t.id = mp.tache_id
    where t.code = $t$F50$t$;
  if cles is distinct from $t$boutique,avis,moyens,avis_autorises,signature$t$ then
    raise exception 'Champs de F50 : %', cles;
  end if;
  select string_agg(c.cle, ',' order by c.ordre) into cles from champs_modele c
    join modeles_prompts mp on mp.id = c.modele_id join taches t on t.id = mp.tache_id
    where t.code = $t$F49$t$;
  if cles is distinct from $t$produit,prix,atouts,clients,livraison_paiement,budget,resultats$t$ then
    raise exception 'Champs de F49 : %', cles;
  end if;

  -- Chaque champ de la consigne existe dans le formulaire, et l'inverse
  select count(*) into n from modeles_prompts mp join taches t on t.id = mp.tache_id
    where t.code in ($t$F49$t$, $t$F50$t$)
      and (select count(*) from champs_modele c where c.modele_id = mp.id
             and mp.gabarit like '%' || '{{' || c.cle || '}}' || '%')
          = (select count(*) from champs_modele c where c.modele_id = mp.id)
      and (select count(*) from regexp_matches(mp.gabarit, '\{\{\w+\}\}', 'g'))
          = (select count(*) from champs_modele c where c.modele_id = mp.id);
  if n <> 2 then
    raise exception 'Consigne et formulaire accordés attendus : 2, trouvé : %', n;
  end if;

  -- Les quatre cas : deux par tâche, le cas 2 de F49 a sa réponse chiffrée
  select count(*) into n from exercices e join taches t on t.id = e.tache_id
    where (t.code = $t$F50$t$ and e.numero = 1 and e.donnees like $t$1. « Gâteau d'anniversaire magnifique%$t$
           and e.donnees like $t$%10. « Gâteau conforme à la photo, merci. »%$t$)
       or (t.code = $t$F50$t$ and e.numero = 2 and e.donnees like $t$%trois jours après la date annoncée%$t$)
       or (t.code = $t$F49$t$ and e.numero = 1 and e.reponse_attendue is null
           and e.titre = $t$Chargée de communication d'un atelier de couture à Dakar$t$)
       or (t.code = $t$F49$t$ and e.numero = 2 and e.donnees like $t$%70 messages reçus, 7 ventes%$t$
           and e.reponse_attendue like $t$%21 000 ÷ 70 = 300 FCFA%$t$
           and e.reponse_attendue like $t$%7 × 15 000 = 105 000 FCFA%$t$);
  if n <> 4 then
    raise exception 'Cas de F49 et F50 attendus : 4, trouvé : %', n;
  end if;
  select count(*) into n from exercices e join taches t on t.id = e.tache_id
    where t.code in ($t$F49$t$, $t$F50$t$);
  if n <> 4 then
    raise exception 'F49 et F50 ont % cas au lieu de 4', n;
  end if;

  -- Le métier Commerce garde ses 11 tâches ; F26 et F28 n'y entrent pas
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id
    where m.slug = $t$commerce-vente-en-ligne$t$;
  if n <> 11 then
    raise exception 'Le métier Commerce a % tâches au lieu de 11', n;
  end if;
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id
    join taches t on t.id = mt.tache_id
    where m.slug = $t$commerce-vente-en-ligne$t$ and t.code in ($t$F26$t$, $t$F28$t$);
  if n <> 0 then
    raise exception 'F26 ou F28 rattachée au métier Commerce : %', n;
  end if;
end
$controle$;

commit;
