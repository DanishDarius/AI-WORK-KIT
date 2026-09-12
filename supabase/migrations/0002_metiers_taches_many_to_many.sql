-- Correction de schéma : un métier a plusieurs tâches, ET une tâche est
-- partagée par plusieurs métiers (ex. F01 "Gestion des e-mails" apparaît
-- dans presque tous les métiers). La relation directe taches.metier_id
-- posée dans 0001 était donc incorrecte — on la remplace par une table
-- de liaison.

-- 1. Table de liaison métiers <-> tâches
create table if not exists metiers_taches (
  metier_id uuid not null references metiers(id) on delete cascade,
  tache_id uuid not null references taches(id) on delete cascade,
  ordre integer not null default 0,
  primary key (metier_id, tache_id)
);
create index if not exists idx_metiers_taches_metier on metiers_taches(metier_id);
create index if not exists idx_metiers_taches_tache on metiers_taches(tache_id);

alter table metiers_taches enable row level security;
create policy "lecture_metiers_taches_connecte" on metiers_taches
  for select using (auth.role() = 'authenticated');

-- 2. Retrait de l'ancienne relation directe sur taches (si la table a été
-- créée avec la migration 0001 initiale).
drop index if exists idx_taches_metier;
alter table taches drop column if exists metier_id;
