-- 0040 : le fil « Nouveau », les notifications et la communauté (5 octobre
-- 2026, plan produit, chantiers 5 et 8.2, phase 4)
--
-- Avant : la page « Nouveau » lisait une liste écrite dans le code
-- (src/lib/ia-updates.ts) : publier demandait un nouvel envoi du site. Rien ne
-- disait à un abonné qu'une nouveauté était sortie, ni que son abonnement
-- arrivait à échéance.
--
-- Après :
-- - publications : ce qui paraît dans le fil (tâche de la semaine, pack,
--   mise à jour des IA, guide, ressource), sa date de parution et s'il est
--   réservé aux abonnés. Une ligne datée dans le futur ne se voit pas encore ;
-- - mises_a_jour_ia : les actualités des IA sortent du code ;
-- - packs et packs_taches : un pack réunit des tâches liées ;
-- - taches.du_fil : une tâche publiée par le fil (tâche de la semaine, tâche
--   d'un pack). Elle n'entre dans aucun parcours de métier ;
-- - preferences_notifications : ce que chaque client veut recevoir, et la
--   date de sa dernière visite du fil (pastille sur la cloche) ;
-- - envois_notifications : le journal des e-mails envoyés, pour ne jamais
--   envoyer deux fois le même ;
-- - sessions_live : les sessions en direct des abonnés et leurs replays ;
-- - videos : le lien des vidéos qui ne tiennent pas à un kit (Premiers pas).
--
-- Droits (règles S4 et B1). Toutes ces tables sont réservées au serveur : un
-- compte connecté n'y a aucun droit, même en lecture. C'est le serveur qui
-- décide, compte par compte, ce qui est montré en entier ou en titre seul.
-- Une tâche du fil est dans la table taches, lisible par tout compte dont
-- l'accès est actif : deux politiques restrictives la retirent de cette
-- lecture directe, avec ses cas pratiques. Elle ne sort donc que par le
-- serveur, qui vérifie l'abonnement.
--
-- Le site en ligne (règle B3) ne lit aucune de ces tables, et les politiques
-- restrictives lui cachent les tâches du fil : rien ne change pour lui.
--
-- Aucune donnée existante n'est modifiée ni supprimée. Migration rejouable.
-- Tout se fait dans une transaction : en cas d'erreur, rien n'est modifié.

begin;

-- ===================== 1. Les tâches du fil =====================

alter table taches add column if not exists du_fil boolean not null default false;

comment on column taches.du_fil is 'Vrai : tâche publiée par le fil Nouveau (tâche de la semaine, tâche d''un pack). Servie par le serveur seulement, hors des parcours de métier.';

-- Une tâche est-elle du fil ? « security definer » : la politique des cas
-- pratiques doit le savoir sans que le compte puisse lire la tâche.
-- « search_path » vide : aucun détournement de nom possible.
create or replace function public.tache_du_fil(p_tache uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((select t.du_fil from public.taches t where t.id = p_tache), false)
$$;

revoke all on function public.tache_du_fil(uuid) from public;
revoke all on function public.tache_du_fil(uuid) from anon;
grant execute on function public.tache_du_fil(uuid) to authenticated, service_role;

-- Politiques restrictives : elles s'ajoutent à la lecture « accès actif » et
-- retirent les tâches du fil de toute lecture directe par un compte connecté.
drop policy if exists "taches_du_fil_par_le_serveur" on taches;
create policy "taches_du_fil_par_le_serveur" on taches
  as restrictive for select to authenticated using (not du_fil);

drop policy if exists "exercices_du_fil_par_le_serveur" on exercices;
create policy "exercices_du_fil_par_le_serveur" on exercices
  as restrictive for select to authenticated using (not public.tache_du_fil(tache_id));

-- ===================== 2. Les mises à jour des IA =====================

create table if not exists mises_a_jour_ia (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) <= 80),
  ia text not null check (ia in ('chatgpt', 'claude', 'gemini')),
  genre text not null,
  titre text not null,
  annonce_le date not null,
  resume text not null,
  impact text not null,
  action text not null,
  points jsonb not null default '[]'::jsonb,
  disponibilite text not null,
  sources jsonb not null default '[]'::jsonb,
  media jsonb,
  revu_le date
);

comment on table mises_a_jour_ia is 'Actualité d''une IA, rédigée à partir de l''annonce officielle. annonce_le : date de l''annonce par l''éditeur. points : liste de phrases. sources : [{label, url}]. media : {type: image|youtube|video, …} ou vide.';

-- ===================== 3. Les packs =====================

create table if not exists packs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) <= 80),
  titre text not null,
  description text not null,
  pour_qui text
);

comment on table packs is 'Pack : quelques tâches liées autour d''un moment de l''année ou d''un besoin. pour_qui : le public visé, en une phrase.';

create table if not exists packs_taches (
  pack_id uuid not null references packs(id) on delete cascade,
  tache_id uuid not null references taches(id) on delete cascade,
  ordre integer not null default 0,
  primary key (pack_id, tache_id)
);
create index if not exists idx_packs_taches_tache on packs_taches (tache_id);

-- ===================== 4. Les publications =====================

create table if not exists publications (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('tache', 'pack', 'mise_a_jour', 'guide', 'ressource')),
  ref_id text not null check (char_length(ref_id) between 1 and 120),
  titre text not null,
  resume text,
  publie_le timestamptz not null,
  reserve_abonnes boolean not null default true,
  unique (type, ref_id)
);
create index if not exists idx_publications_publie_le on publications (publie_le desc);

comment on table publications is 'Le fil Nouveau. type et ref_id désignent ce qui paraît : tache (id de la tâche), pack (slug), mise_a_jour (slug), guide (slug), ressource (clé). publie_le : rien ne se voit avant cette date. reserve_abonnes : un client sans abonnement voit le titre seul.';

-- ===================== 5. Les sessions en direct =====================

create table if not exists sessions_live (
  id uuid primary key default gen_random_uuid(),
  debut_le timestamptz not null,
  titre text not null,
  lien text check (lien ~ '^https://'),
  replay_url text check (replay_url ~ '^https://')
);
create index if not exists idx_sessions_live_debut on sessions_live (debut_le desc);

comment on table sessions_live is 'Sessions en direct des abonnés. lien : pour y assister. replay_url : renseigné après la session.';

-- ===================== 6. Les vidéos hors kit =====================

create table if not exists videos (
  cle text primary key check (cle ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(cle) <= 60),
  url text not null check (url ~ '^https://'),
  titre text
);

comment on table videos is 'Lien d''une vidéo qui ne tient pas à un kit. Clés lues par l''application : premiers-pas-1, premiers-pas-2, premiers-pas-3.';

-- ===================== 7. Les préférences de notification =====================

-- Une ligne par adresse de compte. C'est le serveur qui la lit et l'écrit,
-- pour le compte connecté ou sur présentation du jeton d'un e-mail reçu.
create table if not exists preferences_notifications (
  email text primary key check (email = lower(email) and char_length(email) <= 320),
  jeton uuid not null unique default gen_random_uuid(),
  email_semaine boolean not null default true,
  rappels_echeance boolean not null default true,
  fil_vu_le timestamptz,
  maj_le timestamptz not null default now()
);

comment on table preferences_notifications is 'Ce que le client veut recevoir. jeton : lien « ne plus recevoir » des e-mails, sans connexion. fil_vu_le : dernière visite du fil Nouveau (pastille sur la cloche).';

-- ===================== 8. Le journal des envois =====================

create table if not exists envois_notifications (
  type text not null check (type in ('semaine', 'rappel_j5', 'rappel_j0')),
  periode text not null check (char_length(periode) between 1 and 40),
  email text not null check (email = lower(email) and char_length(email) <= 320),
  etat text not null default 'envoye' check (etat in ('envoye', 'echec')),
  envoye_le timestamptz not null default now(),
  primary key (type, periode, email)
);
create index if not exists idx_envois_notifications_date on envois_notifications (envoye_le desc);

comment on table envois_notifications is 'Journal des e-mails envoyés aux clients. Une ligne par type, période et adresse : un même e-mail ne part jamais deux fois. periode : la semaine (2026-W41) ou la date d''échéance.';

-- ===================== Sécurité au niveau des lignes =====================

alter table mises_a_jour_ia enable row level security;
alter table packs enable row level security;
alter table packs_taches enable row level security;
alter table publications enable row level security;
alter table sessions_live enable row level security;
alter table videos enable row level security;
alter table preferences_notifications enable row level security;
alter table envois_notifications enable row level security;

-- ===================== Droits =====================

-- Supabase donne de lui-même des droits aux rôles publics à la création d'une
-- table : on les remet à zéro, puis on ne donne rien. Aucune politique : sans
-- droit ni politique, un compte connecté ne lit ni n'écrit rien.
revoke all on table mises_a_jour_ia from anon;
revoke all on table mises_a_jour_ia from authenticated;
revoke all on table packs from anon;
revoke all on table packs from authenticated;
revoke all on table packs_taches from anon;
revoke all on table packs_taches from authenticated;
revoke all on table publications from anon;
revoke all on table publications from authenticated;
revoke all on table sessions_live from anon;
revoke all on table sessions_live from authenticated;
revoke all on table videos from anon;
revoke all on table videos from authenticated;
revoke all on table preferences_notifications from anon;
revoke all on table preferences_notifications from authenticated;
revoke all on table envois_notifications from anon;
revoke all on table envois_notifications from authenticated;

grant select, insert, update, delete on table mises_a_jour_ia to service_role;
grant select, insert, update, delete on table packs to service_role;
grant select, insert, update, delete on table packs_taches to service_role;
grant select, insert, update, delete on table publications to service_role;
grant select, insert, update, delete on table sessions_live to service_role;
grant select, insert, update, delete on table videos to service_role;
grant select, insert, update, delete on table preferences_notifications to service_role;
grant select, insert, update, delete on table envois_notifications to service_role;

commit;
