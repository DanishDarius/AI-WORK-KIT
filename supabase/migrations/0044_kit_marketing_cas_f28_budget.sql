-- 0044 : tâche F28, cas 1 (Dakar), budget publicitaire remis au repère de
-- l'équipe (6 octobre 2026)
--
-- Avant : le cas donnait « 1 000 FCFA par jour et par publicité ». Le
-- repère de l'équipe du 3 octobre 2026, inscrit dans la bible de
-- localisation, est de 3 000 FCFA par jour au minimum pour une publicité.
-- Les trois autres cas qui citent un budget par jour le respectent déjà.
--
-- Après : 3 000 FCFA par jour et par publicité. Pour que la leçon reste la
-- même, les résultats des publicités A et B sont multipliés par trois, comme
-- le budget : leur coût par conversation et par commande ne change pas.
-- La publicité C garde ses 5 conversations et sa seule commande : c'est ce
-- qui fait dire qu'il est trop tôt pour conclure.
--
-- Seuls deux textes du cas changent : ses données et sa réponse attendue.
-- Le titre, le contexte, le travail demandé, le modèle à remplir et le cas 2
-- ne changent pas. Les colonnes lues par le site en ligne ne changent pas
-- (règle B3).
--
-- Aucune table créée, aucun droit modifié, aucune donnée supprimée.
-- Migration rejouable.

begin;

update exercices e
   set donnees_local = $t$- Budget : 3 000 FCFA par jour et par publicité, soit 21 000 FCFA chacune et 63 000 FCFA en tout.
- Publicité A, la photo d'un plat : 105 conversations WhatsApp, 42 commandes d'un plat à 2 500 FCFA.
- Publicité B, une vidéo de la cuisine : 210 conversations WhatsApp, 21 commandes d'un plat à 2 500 FCFA.
- Publicité C, l'offre pour les entreprises : 5 conversations, 1 commande de 40 plats à 2 000 FCFA.$t$,
       reponse_attendue = $t$A : 200 FCFA par conversation, 500 FCFA par commande, 105 000 FCFA de ventes. B : 100 FCFA par conversation, 1 000 FCFA par commande, 52 500 FCFA de ventes. C : 4 200 FCFA par conversation, 21 000 FCFA pour sa seule commande, 80 000 FCFA de ventes. Total des ventes : 237 500 FCFA. La B attire deux fois plus de conversations que la A, mais vend deux fois moins : la conversation la moins chère n'est pas la meilleure publicité. La A se garde. La C n'a qu'une commande : il est trop tôt pour conclure.$t$
  from taches t
 where t.id = e.tache_id and t.code = $t$F28$t$ and e.numero = 1
   and e.titre_local = $t$Chargée de marketing chez un traiteur à Dakar$t$;

-- Contrôle : la transaction est annulée si le cas n'est pas celui attendu
do $controle$
declare
  n integer;
begin
  select count(*) into n from exercices e join taches t on t.id = e.tache_id
    where t.code = $t$F28$t$ and e.numero = 1
      and e.donnees_local like $t$- Budget : 3 000 FCFA par jour et par publicité, soit 21 000 FCFA chacune et 63 000 FCFA en tout.%$t$
      and e.reponse_attendue like $t$%Total des ventes : 237 500 FCFA.%$t$;
  if n <> 1 then
    raise exception 'Cas 1 de F28 corrigé attendu : 1, trouvé : %', n;
  end if;
  -- Plus aucun cas ne cite un budget publicitaire sous 3 000 FCFA par jour.
  select count(*) into n from exercices e
    where coalesce(e.donnees_local, '') like $t$%1 000 FCFA par jour et par publicité%$t$;
  if n <> 0 then
    raise exception 'Cas avec l''ancien budget : %', n;
  end if;
end
$controle$;

commit;
