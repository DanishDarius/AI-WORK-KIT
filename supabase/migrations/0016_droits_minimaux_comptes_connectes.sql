-- 0016 : un compte connecté n'a que les droits dont l'application se sert
-- (2 octobre 2026, contrôle en base après la migration 0015, règles S4 et B1)
--
-- Constat : Supabase donne par défaut TRUNCATE, REFERENCES, TRIGGER et
-- MAINTAIN aux rôles anon et authenticated sur chaque table créée. Ces droits
-- ne viennent d'aucune de nos migrations : le rejeu des fichiers ne les voyait
-- pas, seul le contrôle en base (supabase/controles/droits.sql) les montre.
-- TRUNCATE n'est pas joignable par l'API de données, mais il n'a rien à faire
-- là : la RLS ne s'applique pas à TRUNCATE.
--
-- Après : sur chaque table, le rôle authenticated est remis à zéro puis reçoit
-- exactement ce que l'application utilise. Les futures tables ne reçoivent
-- plus rien par défaut pour anon ni authenticated.
--
-- Aucune donnée n'est lue, modifiée ni supprimée. Sans effet pour un client.
-- Migration rejouable. Tout se fait dans une transaction : en cas d'erreur,
-- rien n'est modifié.

begin;

-- 1. Contenu payant : lecture seule (la politique « accès actif » de la
--    migration 0015 décide ensuite qui lit).
revoke all on table metiers from authenticated;
grant select on table metiers to authenticated;

revoke all on table taches from authenticated;
grant select on table taches to authenticated;

revoke all on table metiers_taches from authenticated;
grant select on table metiers_taches to authenticated;

revoke all on table exercices from authenticated;
grant select on table exercices to authenticated;

revoke all on table prompts from authenticated;
grant select on table prompts to authenticated;

revoke all on table glossaire from authenticated;
grant select on table glossaire to authenticated;

-- 2. Tables personnelles : les mêmes droits qu'avant, sans TRUNCATE,
--    REFERENCES, TRIGGER ni MAINTAIN. La RLS limite chaque compte à ses lignes.
revoke all on table utilisateurs_chemins from authenticated;
grant select, insert, update on table utilisateurs_chemins to authenticated;

revoke all on table taches_faites from authenticated;
grant select, insert, update, delete on table taches_faites to authenticated;

revoke all on table favoris from authenticated;
grant select, insert, update, delete on table favoris to authenticated;

revoke all on table derniere_activite from authenticated;
grant select, insert, update on table derniere_activite to authenticated;

revoke all on table activite_journaliere from authenticated;
grant select, insert on table activite_journaliere to authenticated;

-- 3. Les futures tables ne reçoivent plus aucun droit par défaut pour les
--    rôles publics : chaque migration donne ses droits explicitement (B1).
alter default privileges in schema public revoke all on tables from anon, authenticated;

commit;
