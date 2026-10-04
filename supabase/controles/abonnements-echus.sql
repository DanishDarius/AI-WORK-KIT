-- Abonnements arrivés à échéance depuis 45 jours (LECTURE SEULE)
--
-- À lancer dans l'éditeur SQL de Supabase une fois par mois. Chaque ligne est
-- une adresse dont l'abonnement est terminé et qui n'en a pas repris : elle
-- doit être retirée de la communauté WhatsApp des abonnés (plan produit,
-- chantier 8.2). Une adresse qui a renouvelé, ou qui a la formule à vie,
-- n'apparaît pas.
--
-- Résultat attendu : la liste des membres à retirer ce mois-ci, la plus
-- récente échéance en premier. Aucune ligne : personne à retirer.

with dernier as (
  select email, max(fin_le) as fin_le
  from abonnements
  group by email
)
select
  d.email,
  d.fin_le as echu_le,
  (now()::date - d.fin_le::date) as jours_depuis
from dernier d
where d.fin_le < now()
  and d.fin_le > now() - interval '45 days'
order by d.fin_le desc
limit 500;
