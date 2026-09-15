-- AI WORK KIT — Niveau 1 : reprise, progression, favoris, recherche
--
-- Quatre tables, toutes strictement personnelles (un utilisateur ne voit et
-- ne modifie que ses propres lignes) :
--   - taches_faites        : une tâche est "faite" dès qu'une ligne existe.
--   - favoris               : idem pour les favoris (avec le métier d'origine,
--                             pour reconstruire le bon lien /taches/[id]?metier=...).
--   - derniere_activite     : une seule ligne par utilisateur, écrasée à chaque
--                             consultation d'une tâche — alimente "Reprendre où
--                             vous en étiez".
--   - activite_journaliere  : un journal (une ligne par jour où l'utilisateur a
--                             consulté au moins une tâche) — alimente la série
--                             de régularité et les points de la semaine.

create table if not exists taches_faites (
  user_id uuid not null references auth.users(id) on delete cascade,
  tache_id uuid not null references taches(id) on delete cascade,
  fait_le timestamptz not null default now(),
  primary key (user_id, tache_id)
);

create table if not exists favoris (
  user_id uuid not null references auth.users(id) on delete cascade,
  tache_id uuid not null references taches(id) on delete cascade,
  metier_id uuid not null references metiers(id) on delete cascade,
  cree_le timestamptz not null default now(),
  primary key (user_id, tache_id)
);

create table if not exists derniere_activite (
  user_id uuid primary key references auth.users(id) on delete cascade,
  metier_id uuid not null references metiers(id) on delete cascade,
  tache_id uuid not null references taches(id) on delete cascade,
  maj_le timestamptz not null default now()
);

create table if not exists activite_journaliere (
  user_id uuid not null references auth.users(id) on delete cascade,
  jour date not null,
  primary key (user_id, jour)
);

-- ===================== Row Level Security =====================

alter table taches_faites enable row level security;
alter table favoris enable row level security;
alter table derniere_activite enable row level security;
alter table activite_journaliere enable row level security;

create policy "taches_faites_select_soi" on taches_faites
  for select using (auth.uid() = user_id);
create policy "taches_faites_insert_soi" on taches_faites
  for insert with check (auth.uid() = user_id);
create policy "taches_faites_update_soi" on taches_faites
  for update using (auth.uid() = user_id);
create policy "taches_faites_delete_soi" on taches_faites
  for delete using (auth.uid() = user_id);

create policy "favoris_select_soi" on favoris
  for select using (auth.uid() = user_id);
create policy "favoris_insert_soi" on favoris
  for insert with check (auth.uid() = user_id);
create policy "favoris_update_soi" on favoris
  for update using (auth.uid() = user_id);
create policy "favoris_delete_soi" on favoris
  for delete using (auth.uid() = user_id);

create policy "derniere_activite_select_soi" on derniere_activite
  for select using (auth.uid() = user_id);
create policy "derniere_activite_insert_soi" on derniere_activite
  for insert with check (auth.uid() = user_id);
create policy "derniere_activite_update_soi" on derniere_activite
  for update using (auth.uid() = user_id);

create policy "activite_journaliere_select_soi" on activite_journaliere
  for select using (auth.uid() = user_id);
create policy "activite_journaliere_insert_soi" on activite_journaliere
  for insert with check (auth.uid() = user_id);

-- ===================== Grants =====================
-- (0003_grants.sql couvre déjà les tables existantes + les futures tables en
-- lecture seule par défaut ; ces 4 tables ont aussi besoin d'écriture pour
-- les utilisateurs connectés.)

grant select, insert, update, delete on public.taches_faites to authenticated, service_role;
grant select, insert, update, delete on public.favoris to authenticated, service_role;
grant select, insert, update on public.derniere_activite to authenticated, service_role;
grant select, insert on public.activite_journaliere to authenticated, service_role;
