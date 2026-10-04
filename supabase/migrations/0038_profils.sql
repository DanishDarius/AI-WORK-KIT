-- 0038 : le profil du client, enregistré en base (4 octobre 2026, plan
-- produit, chantiers 4 et 6)
--
-- Avant : les réponses de l'écran « Bienvenue » (vous êtes, votre métier, vos
-- IA, votre appareil) restaient dans le navigateur. Sur un autre téléphone,
-- ou après un nettoyage du navigateur, le client repassait le questionnaire.
-- Les métiers s'affichaient dans le même ordre pour tout le monde.
--
-- Après :
-- - une table profils, une ligne par compte : public (salarié, indépendant,
--   commerçant), métier du parcours, appareil, IA déjà utilisées, pays ;
-- - chaque métier dit à quels publics il s'adresse (colonne publics), pour
--   montrer en premier ceux du client.
--
-- Droits (règles S4 et B1) : profils est une table personnelle. Un compte
-- connecté lit, crée et modifie sa propre ligne, jamais celle d'un autre, et
-- ne supprime rien. La colonne publics s'ajoute à metiers, dont les droits ne
-- changent pas. Le site en ligne ne lit ni l'une ni l'autre (règle B3).
--
-- Aucune donnée existante n'est modifiée ni supprimée. Migration rejouable.
-- Tout se fait dans une transaction : en cas d'erreur, rien n'est modifié.

begin;

-- 1. Les publics de chaque métier.
alter table metiers add column if not exists publics text[] not null default '{salarie}';

comment on column metiers.publics is 'Publics du métier : salarie, independant, commercant. Sert à montrer en premier les métiers du client.';

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'metiers_publics_connus') then
    alter table metiers add constraint metiers_publics_connus
      check (publics <@ array['salarie', 'independant', 'commercant']::text[] and cardinality(publics) > 0);
  end if;
end $$;

update metiers set publics = '{salarie}';
update metiers set publics = '{commercant}' where slug = 'commerce-vente-en-ligne';
update metiers set publics = '{independant}' where slug = 'independant-prestataire-de-services';
-- Métiers exercés aussi à son compte (plan, chantier 6 : graphiste, artisan).
update metiers set publics = '{salarie,independant}'
 where slug in ('graphisme', 'montage-video', 'btp-gestion-de-chantier');

-- 2. Le profil : une ligne par compte.
create table if not exists profils (
  user_id uuid primary key references auth.users(id) on delete cascade,
  public text check (public in ('salarie', 'independant', 'commercant')),
  metier_slug text check (metier_slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(metier_slug) <= 80),
  appareil text check (appareil in ('telephone', 'ordinateur')),
  outils text[] not null default '{}'
    check (outils <@ array['chatgpt', 'claude', 'gemini', 'metaai', 'copilot', 'aucune']::text[] and cardinality(outils) <= 6),
  pays text check (pays in ('bj', 'ci', 'sn', 'tg', 'bf', 'ml', 'ne', 'cm', 'ga', 'autre')),
  maj_le timestamptz not null default now()
);

comment on table profils is 'Profil du client (écran Bienvenue). public : salarie, independant, commercant. outils : IA déjà utilisées. pays : code du pays de la bible de localisation, ou autre.';

-- ===================== Sécurité au niveau des lignes =====================

alter table profils enable row level security;

-- ===================== Droits =====================

revoke all on table profils from anon;
revoke all on table profils from authenticated;
grant select, insert, update on table profils to authenticated;
grant select, insert, update, delete on table profils to service_role;

drop policy if exists "profils_select_soi" on profils;
create policy "profils_select_soi" on profils
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "profils_insert_soi" on profils;
create policy "profils_insert_soi" on profils
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "profils_update_soi" on profils;
create policy "profils_update_soi" on profils
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

commit;
