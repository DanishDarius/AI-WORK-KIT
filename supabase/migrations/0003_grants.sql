-- Correction : les tables créées via le SQL Editor n'héritent pas
-- automatiquement des GRANT nécessaires aux rôles PostgREST (anon,
-- authenticated, service_role). RLS seule ne suffit pas : sans GRANT au
-- niveau table, PostgREST renvoie "permission denied" même pour service_role
-- (qui bypass RLS mais pas les GRANT SQL standards).

grant usage on schema public to anon, authenticated, service_role;

grant select on public.metiers to anon, authenticated, service_role;
grant select on public.taches to anon, authenticated, service_role;
grant select on public.metiers_taches to anon, authenticated, service_role;
grant select on public.exercices to anon, authenticated, service_role;
grant select on public.prompts to anon, authenticated, service_role;
grant select on public.glossaire to anon, authenticated, service_role;

grant select, insert, update on public.utilisateurs_chemins to authenticated, service_role;

grant select, insert, update, delete on public.acces_clients to service_role;

-- Pour les futures tables créées par migration (bonnes pratiques) :
alter default privileges in schema public grant select on tables to anon, authenticated, service_role;
