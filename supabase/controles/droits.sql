-- Contrôle des droits en base (LECTURE SEULE, règle B1)
--
-- À lancer dans l'éditeur SQL de Supabase après chaque migration. Le test
-- tests/regles/migrations.test.ts rejoue nos fichiers, mais il ne voit pas les
-- droits que Supabase donne de lui-même à la création d'une table. Seule
-- cette requête montre l'état réel.
--
-- Résultat attendu : AUCUNE ligne. Chaque ligne renvoyée est un défaut.

with tables as (
  select c.oid, c.relname as nom, c.relrowsecurity as rls
  from pg_class c
  join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and c.relkind = 'r'
),
droits as (
  select table_name as nom, grantee as role, privilege_type as droit
  from information_schema.role_table_grants
  where table_schema = 'public' and grantee in ('anon', 'authenticated')
)
select 'RLS désactivée' as defaut, nom as objet, '' as detail
from tables where not rls

union all
select 'droit donné à anon', nom, droit
from droits where role = 'anon'

union all
select 'droit inutile pour un compte connecté', nom, droit
from droits
where role = 'authenticated' and droit in ('TRUNCATE', 'REFERENCES', 'TRIGGER', 'MAINTAIN')

union all
select 'table interne ouverte à un compte connecté', nom, droit
from droits
where role = 'authenticated'
  and nom in ('acces_clients', 'abonnements', 'demandes_plans', 'demandes_contact')

union all
select 'contenu payant modifiable par un compte connecté', nom, droit
from droits
where role = 'authenticated'
  and nom in ('metiers', 'taches', 'metiers_taches', 'exercices', 'prompts', 'glossaire')
  and droit <> 'SELECT'

union all
select 'politique ouverte à tout compte connecté', tablename, policyname
from pg_policies
where schemaname = 'public'
  and (qual = 'true' or qual ilike '%auth.role()%')

union all
select 'table lisible sans politique', t.nom, ''
from tables t
where exists (select 1 from droits d where d.nom = t.nom and d.role = 'authenticated' and d.droit = 'SELECT')
  and not exists (select 1 from pg_policies p where p.schemaname = 'public' and p.tablename = t.nom and p.cmd in ('SELECT', 'ALL'))

union all
select 'fonction exécutable sans session', p.proname, ''
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public' and has_function_privilege('anon', p.oid, 'execute')

union all
select 'droit par défaut pour un rôle public', pg_get_userbyid(d.defaclrole), d.defaclacl::text
from pg_default_acl d
join pg_namespace n on n.oid = d.defaclnamespace
where n.nspname = 'public'
  and d.defaclobjtype = 'r'
  and pg_get_userbyid(d.defaclrole) = 'postgres'
  and d.defaclacl::text ~ '(anon|authenticated)='

order by 1, 2, 3;
