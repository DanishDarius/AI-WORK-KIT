-- 0052 : les attestations par métier, étape B (10 octobre 2026, plan
-- produit, chantier 8.3 ; document « AIW : attestations par métier, grille et
-- exercices finaux »)
--
-- Avant : rien. Un abonné ne pouvait pas faire reconnaître ce qu'il sait faire.
--
-- Après :
-- - exercices_finaux : l'exercice final de chaque métier (le cas, les données,
--   le travail, ce qu'il faut rendre, la réponse type pour le correcteur). Son
--   contenu arrive par la migration 0053, fabriquée à partir du document validé ;
-- - rendus_attestation : ce que l'abonné rend. Un rendu passe de « brouillon »
--   (les fichiers sont en cours d'envoi chez Cloudflare R2) à « en_attente »
--   (envoyé, à corriger sous 72 heures), puis « a_refaire » ou « valide »
--   (étape C). Les fichiers eux-mêmes sont chez Cloudflare R2, dans un espace
--   privé : la table ne garde que leur clé, leur type et leur taille.
--
-- Un abonné n'a qu'un rendu en cours à la fois par métier (brouillon ou en
-- attente) : un index unique partiel l'impose. Les nouveaux essais ne sont
-- pas limités.
--
-- Droits (règles S4 et B1) : les deux tables sont réservées au serveur. Un
-- compte connecté n'y a aucun droit, même en lecture : c'est le serveur qui
-- vérifie l'abonnement, les conditions et ne montre la réponse type à personne.
--
-- Aucune donnée existante n'est modifiée ni supprimée. Migration rejouable.

begin;

-- 1. L'exercice final de chaque métier (contenu payant, lu par le serveur).
create table if not exists exercices_finaux (
  metier_id uuid primary key references metiers(id) on delete cascade,
  numero integer not null check (numero between 1 and 99),
  cas text not null check (char_length(cas) between 1 and 2000),
  titre_donnees text not null default 'Les données' check (char_length(titre_donnees) between 1 and 120),
  donnees jsonb not null default '[]'::jsonb check (jsonb_typeof(donnees) = 'array'),
  travail jsonb not null default '[]'::jsonb check (jsonb_typeof(travail) = 'array'),
  a_rendre text not null check (char_length(a_rendre) between 1 and 1000),
  pour_le_correcteur text not null check (char_length(pour_le_correcteur) between 1 and 3000),
  revu_le date
);

comment on table exercices_finaux is 'Exercice final de chaque métier, pour l''attestation. pour_le_correcteur : réponse type, jamais montrée à l''abonné.';

-- 2. Les rendus des abonnés (données personnelles, écrites par le serveur).
create table if not exists rendus_attestation (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  metier_id uuid not null references metiers(id) on delete cascade,
  statut text not null default 'brouillon' check (statut in ('brouillon', 'en_attente', 'a_refaire', 'valide')),
  fichiers jsonb not null default '[]'::jsonb check (jsonb_typeof(fichiers) = 'array' and jsonb_array_length(fichiers) <= 5),
  nom_attestation text check (char_length(nom_attestation) <= 120),
  verification text check (char_length(verification) <= 1500),
  -- Liens d'envoi demandés aujourd'hui (limite par compte, règle S13).
  envois_jour date not null default current_date,
  envois integer not null default 0 check (envois >= 0),
  -- Étape C : la grille (5 notes de 0 à 2) et le commentaire du correcteur.
  notes jsonb,
  commentaire text check (char_length(commentaire) <= 3000),
  cree_le timestamptz not null default now(),
  rendu_le timestamptz,
  corrige_le timestamptz
);

comment on table rendus_attestation is 'Rendus de l''exercice final. fichiers : clé chez Cloudflare R2, type et taille de chaque fichier. Un seul rendu en cours (brouillon ou en_attente) par compte et par métier.';

create unique index if not exists idx_rendus_attestation_un_en_cours
  on rendus_attestation (user_id, metier_id) where statut in ('brouillon', 'en_attente');
create index if not exists idx_rendus_attestation_compte
  on rendus_attestation (user_id, metier_id, cree_le desc);
create index if not exists idx_rendus_attestation_a_corriger
  on rendus_attestation (rendu_le) where statut = 'en_attente';
create index if not exists idx_rendus_attestation_metier
  on rendus_attestation (metier_id);

-- 3. Préparer l'envoi des fichiers d'un rendu, en une seule requête et sans
-- course possible (règles C2 et S13). La fonction :
-- - refuse si un rendu attend déjà sa correction (« en_attente ») ;
-- - reprend le brouillon en cours, ou en crée un ;
-- - compte les demandes de liens du jour et s'arrête à p_limite_jour ;
-- - fixe elle-même la clé de chaque fichier chez Cloudflare R2 :
--   rendus/<compte>/<rendu>/<n°>.
-- Seul le serveur l'appelle (clé service) : aucun droit pour anon ni pour un
-- compte connecté.
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

-- 4. Sécurité au niveau des lignes : aucune politique, donc aucune lecture
-- directe. Seul le serveur (clé service) passe.
alter table exercices_finaux enable row level security;
alter table rendus_attestation enable row level security;

revoke all on table exercices_finaux from anon;
revoke all on table exercices_finaux from authenticated;
revoke all on table rendus_attestation from anon;
revoke all on table rendus_attestation from authenticated;

grant select, insert, update, delete on table exercices_finaux to service_role;
grant select, insert, update, delete on table rendus_attestation to service_role;

commit;
