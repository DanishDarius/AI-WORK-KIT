-- AI WORK KIT — schéma initial
-- Extensions nécessaires
create extension if not exists "pgcrypto";

-- 1. Métiers
create table if not exists metiers (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nom text not null,
  description text,
  ordre integer not null default 0
);

-- 2. Tâches
create table if not exists taches (
  id uuid primary key default gen_random_uuid(),
  metier_id uuid not null references metiers(id) on delete cascade,
  code text not null,
  titre text not null,
  ordre integer not null default 0,
  limite_connue boolean not null default false,
  ia_alternative_conseillee text
);
create index if not exists idx_taches_metier on taches(metier_id);

-- 3. Exercices (les cas fictifs, 2 par tâche)
create table if not exists exercices (
  id uuid primary key default gen_random_uuid(),
  tache_id uuid not null references taches(id) on delete cascade,
  numero integer not null check (numero in (1,2)),
  titre text not null,
  contexte text not null,
  donnees text,
  travail_a_faire text not null
);
create index if not exists idx_exercices_tache on exercices(tache_id);

-- 4. Prompts (3 par exercice : chatgpt / claude / gemini)
create type ia_type as enum ('chatgpt', 'claude', 'gemini');

create table if not exists prompts (
  id uuid primary key default gen_random_uuid(),
  exercice_id uuid not null references exercices(id) on delete cascade,
  ia ia_type not null,
  contenu text not null,
  unique (exercice_id, ia)
);
create index if not exists idx_prompts_exercice on prompts(exercice_id);

-- 5. Glossaire (identique pour tous les métiers)
create table if not exists glossaire (
  id uuid primary key default gen_random_uuid(),
  terme text not null,
  definition text not null,
  ordre integer not null default 0
);

-- 6. Chemin choisi par utilisateur et par métier (donnée personnelle)
create table if not exists utilisateurs_chemins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  metier_id uuid not null references metiers(id) on delete cascade,
  chemin ia_type,
  maj_le timestamptz not null default now(),
  unique (user_id, metier_id)
);

-- 7. Accès clients (trace des achats Chariow)
create table if not exists acces_clients (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  chariow_sale_id text unique not null,
  statut text not null default 'actif' check (statut in ('actif', 'revoque')),
  cree_le timestamptz not null default now()
);
create index if not exists idx_acces_email on acces_clients(email);

-- ===================== Row Level Security =====================

alter table metiers enable row level security;
alter table taches enable row level security;
alter table exercices enable row level security;
alter table prompts enable row level security;
alter table glossaire enable row level security;
alter table utilisateurs_chemins enable row level security;
alter table acces_clients enable row level security;

-- Contenu du kit : lecture autorisée à tout utilisateur connecté (l'accès à l'appli
-- elle-même est déjà filtré par la création de compte via le webhook Chariow).
create policy "lecture_metiers_connecte" on metiers
  for select using (auth.role() = 'authenticated');

create policy "lecture_taches_connecte" on taches
  for select using (auth.role() = 'authenticated');

create policy "lecture_exercices_connecte" on exercices
  for select using (auth.role() = 'authenticated');

create policy "lecture_prompts_connecte" on prompts
  for select using (auth.role() = 'authenticated');

create policy "lecture_glossaire_connecte" on glossaire
  for select using (auth.role() = 'authenticated');

-- Chemin choisi : chaque utilisateur ne voit et ne modifie que ses propres lignes.
create policy "chemin_select_soi" on utilisateurs_chemins
  for select using (auth.uid() = user_id);

create policy "chemin_insert_soi" on utilisateurs_chemins
  for insert with check (auth.uid() = user_id);

create policy "chemin_update_soi" on utilisateurs_chemins
  for update using (auth.uid() = user_id);

-- Accès clients : table interne, seul le service_role (le serveur) y touche.
-- Aucune policy "select"/"insert" pour les utilisateurs normaux -> accès refusé par défaut.
