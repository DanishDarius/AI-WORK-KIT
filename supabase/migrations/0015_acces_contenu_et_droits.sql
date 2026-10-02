-- 0015 : le contenu payant n'est lisible que par un compte dont l'accès est
-- actif (2 octobre 2026, audit de sécurité, règles S4 et C7)
--
-- Avant : les politiques « lecture_*_connecte » ouvraient métiers, tâches,
-- exercices, prompts et glossaire à TOUT compte connecté. Avec la clé publique
-- et une session, on lisait le contenu directement par l'API Supabase, sans
-- passer par l'application : un compte révoqué gardait donc tout.
--
-- Après : ces tables ne sont lisibles que si le compte a une ligne active dans
-- acces_clients. L'application ne change pas de façon de lire : cette
-- migration est sans effet pour un client dont l'accès est actif.
--
-- Migration rejouable : peut être exécutée plusieurs fois sans effet.
-- Tout se fait dans une transaction : en cas d'erreur, rien n'est modifié.

begin;

-- 1. E-mails stockés en minuscules, pour une comparaison par égalité (règle
--    C7 : l'index sert, et « _ » n'est plus un joker comme avec ilike).
update acces_clients set email = lower(trim(email)) where email <> lower(trim(email));
update abonnements set email = lower(trim(email)) where email <> lower(trim(email));

alter table acces_clients drop constraint if exists acces_clients_email_minuscules;
alter table acces_clients add constraint acces_clients_email_minuscules check (email = lower(email));
alter table abonnements drop constraint if exists abonnements_email_minuscules;
alter table abonnements add constraint abonnements_email_minuscules check (email = lower(email));

create index if not exists idx_acces_email_statut on acces_clients (email, statut);
create index if not exists idx_abonnements_email_fin on abonnements (email, fin_le desc);

-- 2. Fonction : le compte connecté a-t-il un accès actif ?
--    « security definer » : elle lit acces_clients, que le compte ne peut pas
--    lire lui-même. « search_path » vide : aucun détournement de nom possible.
create or replace function public.a_un_acces_actif()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.acces_clients a
    where a.email = lower(auth.jwt() ->> 'email')
      and a.statut = 'actif'
  )
$$;

revoke all on function public.a_un_acces_actif() from public;
revoke all on function public.a_un_acces_actif() from anon;
grant execute on function public.a_un_acces_actif() to authenticated, service_role;

-- 3. Politiques de lecture du contenu : accès actif exigé.
--    « (select ...) » : la fonction est évaluée une fois par requête, pas une
--    fois par ligne.
drop policy if exists "lecture_metiers_connecte" on metiers;
drop policy if exists "lecture_metiers_acces_actif" on metiers;
create policy "lecture_metiers_acces_actif" on metiers
  for select to authenticated using ((select public.a_un_acces_actif()));

drop policy if exists "lecture_taches_connecte" on taches;
drop policy if exists "lecture_taches_acces_actif" on taches;
create policy "lecture_taches_acces_actif" on taches
  for select to authenticated using ((select public.a_un_acces_actif()));

drop policy if exists "lecture_metiers_taches_connecte" on metiers_taches;
drop policy if exists "lecture_metiers_taches_acces_actif" on metiers_taches;
create policy "lecture_metiers_taches_acces_actif" on metiers_taches
  for select to authenticated using ((select public.a_un_acces_actif()));

drop policy if exists "lecture_exercices_connecte" on exercices;
drop policy if exists "lecture_exercices_acces_actif" on exercices;
create policy "lecture_exercices_acces_actif" on exercices
  for select to authenticated using ((select public.a_un_acces_actif()));

drop policy if exists "lecture_prompts_connecte" on prompts;
drop policy if exists "lecture_prompts_acces_actif" on prompts;
create policy "lecture_prompts_acces_actif" on prompts
  for select to authenticated using ((select public.a_un_acces_actif()));

drop policy if exists "lecture_glossaire_connecte" on glossaire;
drop policy if exists "lecture_glossaire_acces_actif" on glossaire;
create policy "lecture_glossaire_acces_actif" on glossaire
  for select to authenticated using ((select public.a_un_acces_actif()));

-- 4. Le rôle anon (visiteur sans session) n'a aucun droit sur aucune table.
revoke all on table metiers from anon;
revoke all on table taches from anon;
revoke all on table metiers_taches from anon;
revoke all on table exercices from anon;
revoke all on table prompts from anon;
revoke all on table glossaire from anon;
revoke all on table utilisateurs_chemins from anon;
revoke all on table taches_faites from anon;
revoke all on table favoris from anon;
revoke all on table derniere_activite from anon;
revoke all on table activite_journaliere from anon;

-- 5. Tables internes : seul le serveur (clé service) y touche.
revoke all on table acces_clients from anon, authenticated;
revoke all on table demandes_contact from anon, authenticated;
grant select, insert, update on table demandes_contact to service_role;

-- 6. Les futures tables ne reçoivent plus aucun droit par défaut pour les
--    rôles publics : chaque migration donne ses droits explicitement (B1).
alter default privileges in schema public revoke select on tables from anon, authenticated;

commit;
