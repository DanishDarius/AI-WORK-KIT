-- Acheteurs qui n'ont pas encore activé leur compte (LECTURE SEULE)
--
-- À lancer dans l'éditeur SQL de Supabase pendant et après un lancement.
-- Chaque ligne est un accès payé dont l'adresse n'a pas de compte activé :
-- l'e-mail d'activation n'est pas parti, n'a pas été reçu, ou n'a pas encore
-- été ouvert. L'acheteur peut redemander son lien sur /activation/renvoi.
--
-- Résultat attendu en temps normal : peu de lignes, toutes récentes.

select
  a.email,
  a.cree_le as achat_le,
  a.activation_demandee_le as dernier_envoi_demande_le,
  case when u.id is null then 'aucun compte créé' else 'compte créé, jamais activé' end as etat
from acces_clients a
left join auth.users u on lower(u.email) = a.email
where a.statut = 'actif'
  and (u.id is null or (u.email_confirmed_at is null and u.last_sign_in_at is null))
order by a.cree_le desc
limit 500;
