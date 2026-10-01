-- 0014 : droits des tables de l'offre (1er octobre 2026)
--
-- Les tables abonnements et demandes_plans ont été créées (migration 0011)
-- sans droit d'écriture pour la clé service : l'enregistrement d'un
-- abonnement payé (webhook Chariow) et d'une demande sur mesure échouait
-- avec « permission denied ». On donne à la clé service les droits de
-- lecture et d'écriture, et on retire tout droit aux rôles publics : ces
-- tables ne sont lues et écrites que côté serveur.
-- Migration idempotente : peut être rejouée sans effet.

grant select, insert, update, delete on table abonnements to service_role;
grant select, insert, update, delete on table demandes_plans to service_role;

revoke all on table abonnements from anon, authenticated;
revoke all on table demandes_plans from anon, authenticated;
