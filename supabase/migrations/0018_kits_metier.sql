-- 0018 : les kits métier (4 octobre 2026, plan produit, chantiers 1 et 3)
--
-- Avant : « Mon kit » rassemblait les outils et les routines écrits dans le
-- code, tâche par tâche. Un kit ne pouvait contenir ni configuration, ni
-- skill, ni document, et une consigne ne pouvait pas se remplir par champs.
--
-- Après : un kit est du contenu en base, rattaché à un métier. Il réunit des
-- ressources (configuration, skill, document, routine), trois étapes
-- d'installation à cocher, et pour chaque tâche un modèle à remplir. Les liens
-- des documents sont des données : ils changeront quand les documents seront
-- copiés dans le Drive de Parlons ADS, sans toucher au code.
--
-- Droits (règles S4 et B1) :
-- - les tables de contenu sont réservées au serveur. L'application les lit
--   avec la clé service, après avoir vérifié l'accès payé, puis les garde en
--   cache (règle C1). Un compte connecté n'y a donc aucun droit ;
-- - progression_kit est une table personnelle : chaque compte ne voit et ne
--   modifie que ses lignes.
--
-- Aucune donnée existante n'est modifiée ni supprimée. Les colonnes ajoutées
-- à taches et à exercices sont vides pour les 42 tâches existantes : rien ne
-- change pour elles. Migration rejouable. Tout se fait dans une transaction :
-- en cas d'erreur, rien n'est modifié.

begin;

-- 1. Tâches et cas pratiques : ce que les tâches d'un kit ont en plus.
alter table taches add column if not exists resultat text;
alter table taches add column if not exists etapes jsonb;
alter table taches add column if not exists precisions text;

comment on column taches.resultat is 'Ce que la tâche produit, en une ou deux phrases.';
comment on column taches.etapes is 'Les étapes de la tâche, dans l''ordre : tableau de textes.';
comment on column taches.precisions is 'Précisions à donner au client avant de commencer (facultatif).';

alter table exercices add column if not exists prenom text;
alter table exercices add column if not exists lieu text;
alter table exercices add column if not exists profil text;
alter table exercices add column if not exists reponse_attendue text;

comment on column exercices.prenom is 'Prénom du personnage du cas, pour la phrase « Voici ce que cela donne pour … ».';
comment on column exercices.lieu is 'Ville et pays du cas.';
comment on column exercices.profil is 'Profil du cas : structure ou activité individuelle, et taille.';
comment on column exercices.reponse_attendue is 'Résultat exact attendu, quand le cas se vérifie par un calcul.';

-- 2. Le kit d'un métier : sa présentation et ses étapes d'installation.
create table if not exists kits (
  metier_id uuid primary key references metiers(id) on delete cascade,
  titre text not null,
  presentation text not null,
  etapes jsonb not null default '[]'::jsonb,
  prerequis jsonb not null default '[]'::jsonb,
  limites jsonb not null default '[]'::jsonb,
  a_savoir jsonb not null default '{}'::jsonb,
  mots jsonb not null default '[]'::jsonb,
  revu_le date
);

comment on table kits is 'Kit d''un métier. etapes : [{numero, titre, minutes}]. a_savoir : texte par outil. mots : [{mot, phrase}].';

-- 3. Les ressources : configuration, skill, document ou routine.
create table if not exists ressources (
  id uuid primary key default gen_random_uuid(),
  cle text unique not null,
  type text not null check (type in ('configuration', 'skill', 'document', 'routine')),
  titre text not null,
  description text,
  outil text check (outil in ('chatgpt', 'claude', 'gemini')),
  contenu text,
  installation jsonb not null default '{}'::jsonb,
  fichier text check (fichier ~ '^[a-z0-9]+(-[a-z0-9]+)*\.(zip|xlsx|docx)$'),
  lien_copie text check (lien_copie ~ '^https://docs\.google\.com/'),
  video_url text check (video_url ~ '^https://'),
  version integer not null default 1,
  revu_le date
);

comment on table ressources is 'Ressource d''un kit. outil : renseigné quand la ressource ne vaut que pour une IA. installation : par outil, {etapes, gratuit, telephone}. fichier : nom du fichier dans private/kits.';

-- 4. Composition d'un kit : ses ressources, leur ordre et leur étape d'installation.
create table if not exists kits_metier (
  metier_id uuid not null references metiers(id) on delete cascade,
  ressource_id uuid not null references ressources(id) on delete cascade,
  ordre integer not null default 0,
  etape_installation integer check (etape_installation between 1 and 9),
  primary key (metier_id, ressource_id)
);
create index if not exists idx_kits_metier_ressource on kits_metier (ressource_id);

-- 5. Quelles ressources servent à quelles tâches.
create table if not exists ressources_taches (
  ressource_id uuid not null references ressources(id) on delete cascade,
  tache_id uuid not null references taches(id) on delete cascade,
  primary key (ressource_id, tache_id)
);
create index if not exists idx_ressources_taches_tache on ressources_taches (tache_id);

-- 6. Le modèle à remplir d'une tâche : une consigne dont les parties
--    variables sont des champs, écrits entre doubles accolades.
create table if not exists modeles_prompts (
  id uuid primary key default gen_random_uuid(),
  tache_id uuid not null unique references taches(id) on delete cascade,
  titre text not null,
  gabarit text not null,
  exemple_cas integer check (exemple_cas in (1, 2)),
  avertissement text,
  version integer not null default 1,
  revu_le date
);

comment on column modeles_prompts.exemple_cas is 'Numéro du cas pratique dont viennent les exemples préremplis.';
comment on column modeles_prompts.avertissement is 'Ligne ajoutée sous la note de chaque IA (facultatif).';

create table if not exists champs_modele (
  modele_id uuid not null references modeles_prompts(id) on delete cascade,
  cle text not null check (cle ~ '^[a-z][a-z0-9_]*$'),
  libelle text not null,
  type text not null default 'texte' check (type in ('texte', 'long', 'choix', 'nombre')),
  options jsonb,
  exemple text,
  requis boolean not null default true,
  ordre integer not null default 0,
  primary key (modele_id, cle)
);

create table if not exists conseils_ia (
  modele_id uuid not null references modeles_prompts(id) on delete cascade,
  ia text not null check (ia in ('chatgpt', 'claude', 'gemini', 'meta_ai', 'copilot')),
  conseil text not null,
  primary key (modele_id, ia)
);

-- 7. Ce que chaque client a installé (donnée personnelle).
create table if not exists progression_kit (
  user_id uuid not null references auth.users(id) on delete cascade,
  ressource_id uuid not null references ressources(id) on delete cascade,
  fait_le timestamptz not null default now(),
  primary key (user_id, ressource_id)
);
create index if not exists idx_progression_kit_ressource on progression_kit (ressource_id);

-- ===================== Sécurité au niveau des lignes =====================

alter table kits enable row level security;
alter table ressources enable row level security;
alter table kits_metier enable row level security;
alter table ressources_taches enable row level security;
alter table modeles_prompts enable row level security;
alter table champs_modele enable row level security;
alter table conseils_ia enable row level security;
alter table progression_kit enable row level security;

-- ===================== Droits =====================

-- Contenu du kit : réservé au serveur. Aucune politique : sans droit et sans
-- politique, ni un visiteur ni un compte connecté ne lit ces tables.
revoke all on table kits from anon;
revoke all on table kits from authenticated;
grant select, insert, update, delete on table kits to service_role;

revoke all on table ressources from anon;
revoke all on table ressources from authenticated;
grant select, insert, update, delete on table ressources to service_role;

revoke all on table kits_metier from anon;
revoke all on table kits_metier from authenticated;
grant select, insert, update, delete on table kits_metier to service_role;

revoke all on table ressources_taches from anon;
revoke all on table ressources_taches from authenticated;
grant select, insert, update, delete on table ressources_taches to service_role;

revoke all on table modeles_prompts from anon;
revoke all on table modeles_prompts from authenticated;
grant select, insert, update, delete on table modeles_prompts to service_role;

revoke all on table champs_modele from anon;
revoke all on table champs_modele from authenticated;
grant select, insert, update, delete on table champs_modele to service_role;

revoke all on table conseils_ia from anon;
revoke all on table conseils_ia from authenticated;
grant select, insert, update, delete on table conseils_ia to service_role;

-- Progression : chaque compte lit, coche et décoche ses propres lignes.
revoke all on table progression_kit from anon;
revoke all on table progression_kit from authenticated;
grant select, insert, update, delete on table progression_kit to authenticated;
grant select, insert, update, delete on table progression_kit to service_role;

drop policy if exists "progression_kit_select_soi" on progression_kit;
create policy "progression_kit_select_soi" on progression_kit
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "progression_kit_insert_soi" on progression_kit;
create policy "progression_kit_insert_soi" on progression_kit
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "progression_kit_update_soi" on progression_kit;
create policy "progression_kit_update_soi" on progression_kit
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "progression_kit_delete_soi" on progression_kit;
create policy "progression_kit_delete_soi" on progression_kit
  for delete to authenticated using ((select auth.uid()) = user_id);

commit;
