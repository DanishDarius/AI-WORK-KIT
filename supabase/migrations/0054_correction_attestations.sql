-- 0054 : les attestations par métier, étape C (10 octobre 2026, document
-- « AIW : attestations par métier, grille et exercices finaux », étapes C et D
-- validées le 10 octobre 2026)
--
-- Avant : un rendu passait « en_attente », sans écran pour le corriger. Rien
-- n'empêchait, côté base, un nouveau rendu après une attestation obtenue.
--
-- Après :
-- - purge_le : date à laquelle les fichiers et le texte d'un rendu ont été
--   effacés. Décision du 10 octobre 2026 : le rendu est gardé jusqu'à 2 mois
--   après l'obtention de l'attestation. Le travail planifié du matin efface
--   alors les fichiers chez Cloudflare R2, la liste des fichiers et le texte
--   de vérification ; il garde le nom, le métier, la date, la note et le
--   commentaire, qui servent à l'attestation ;
-- - un seul rendu « valide » par compte et par métier (index unique partiel) ;
-- - preparer_rendu_attestation refuse un nouveau rendu quand l'attestation du
--   métier est déjà obtenue (état « valide »).
--
-- Droits (règles S4 et B1) : inchangés, la table reste réservée au serveur.
-- Aucune donnée existante n'est modifiée ni supprimée. Migration rejouable.

begin;

-- 1. La date de purge du rendu.
alter table rendus_attestation add column if not exists purge_le timestamptz;
comment on column rendus_attestation.purge_le is 'Date à laquelle les fichiers (chez Cloudflare R2) et le texte du rendu ont été effacés : 2 mois après l''attestation.';

-- 2. Une seule attestation par compte et par métier.
create unique index if not exists idx_rendus_attestation_un_valide
  on rendus_attestation (user_id, metier_id) where statut = 'valide';

-- 3. Les rendus à purger, lus chaque matin (règle C7).
create index if not exists idx_rendus_attestation_a_purger
  on rendus_attestation (corrige_le) where statut = 'valide' and purge_le is null;

-- Les dernières décisions, lues par l'écran de correction (règle C7).
create index if not exists idx_rendus_attestation_decisions
  on rendus_attestation (corrige_le desc) where statut in ('valide', 'a_refaire');

-- 4. Préparer l'envoi des fichiers : même fonction que la migration 0052,
-- avec le refus après une attestation obtenue.
create or replace function public.preparer_rendu_attestation(
  p_user uuid, p_metier uuid, p_fichiers jsonb, p_limite_jour integer
)
returns table (rendu_id uuid, etat text, fichiers jsonb)
language plpgsql
security invoker
set search_path = ''
as $$
#variable_conflict use_column
declare
  v_id uuid;
  v_statut text;
  v_jour date;
  v_envois integer;
  v_fichiers jsonb;
begin
  if jsonb_typeof(p_fichiers) <> 'array' or jsonb_array_length(p_fichiers) not between 1 and 5 then
    raise exception 'liste de fichiers invalide';
  end if;

  select r.id, r.statut, r.envois_jour, r.envois into v_id, v_statut, v_jour, v_envois
  from public.rendus_attestation r
  where r.user_id = p_user and r.metier_id = p_metier and r.statut in ('brouillon', 'en_attente')
  for update;

  if v_statut = 'en_attente' then
    return query select v_id, 'en_attente'::text, null::jsonb;
    return;
  end if;
  -- Une attestation déjà obtenue pour ce métier : plus de nouveau rendu.
  if exists (
    select 1 from public.rendus_attestation r
    where r.user_id = p_user and r.metier_id = p_metier and r.statut = 'valide'
  ) then
    return query select null::uuid, 'valide'::text, null::jsonb;
    return;
  end if;
  if v_statut = 'brouillon' and v_jour = current_date and v_envois >= p_limite_jour then
    return query select v_id, 'limite'::text, null::jsonb;
    return;
  end if;

  v_id := coalesce(v_id, gen_random_uuid());
  select jsonb_agg(f.element || jsonb_build_object('cle', format('rendus/%s/%s/%s', p_user, v_id, f.n)) order by f.n)
  into v_fichiers
  from jsonb_array_elements(p_fichiers) with ordinality as f(element, n);

  if v_statut = 'brouillon' then
    update public.rendus_attestation r
    set fichiers = v_fichiers,
        envois = case when r.envois_jour = current_date then r.envois + 1 else 1 end,
        envois_jour = current_date
    where r.id = v_id;
  else
    begin
      insert into public.rendus_attestation (id, user_id, metier_id, fichiers, envois, envois_jour)
      values (v_id, p_user, p_metier, v_fichiers, 1, current_date);
    exception when unique_violation then
      -- Deux demandes en même temps : la seconde s'arrête.
      return query select null::uuid, 'occupe'::text, null::jsonb;
      return;
    end;
  end if;

  return query select v_id, 'pret'::text, v_fichiers;
end;
$$;

revoke all on function public.preparer_rendu_attestation(uuid, uuid, jsonb, integer) from public;
revoke all on function public.preparer_rendu_attestation(uuid, uuid, jsonb, integer) from anon;
revoke all on function public.preparer_rendu_attestation(uuid, uuid, jsonb, integer) from authenticated;
grant execute on function public.preparer_rendu_attestation(uuid, uuid, jsonb, integer) to service_role;

commit;
