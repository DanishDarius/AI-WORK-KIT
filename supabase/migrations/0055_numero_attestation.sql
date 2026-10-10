-- 0055 : les attestations par métier, étape D (10 octobre 2026, document
-- « AIW : attestations par métier, grille et exercices finaux », étapes C et D
-- validées le 10 octobre 2026)
--
-- Avant : un rendu « valide » n'avait rien qui permette de le retrouver sans
-- connexion.
--
-- Après :
-- - numero : le numéro de l'attestation, par exemple « AIW-7F3A-91C2-0B4E ».
--   12 signes tirés au hasard (48 bits) : impossible à deviner ou à parcourir
--   un par un. Il est écrit sur le PDF et ouvre la page publique
--   /attestation/<numéro> ;
-- - la base le donne elle-même, au moment où un rendu passe « valide »
--   (déclencheur), et il ne change plus ensuite ; un rendu non validé n'en a
--   pas (contrainte) ;
-- - un numéro est unique (index unique, qui sert aussi à la page publique,
--   règle C7) ;
-- - les rendus déjà validés reçoivent leur numéro.
--
-- Droits (règles S4 et B1) : inchangés, la table reste réservée au serveur.
-- La fonction n'est exécutable que par le serveur. Aucune donnée existante
-- n'est supprimée. Migration rejouable.

begin;

-- 1. Le numéro.
alter table rendus_attestation add column if not exists numero text;
comment on column rendus_attestation.numero is 'Numéro de l''attestation (AIW-XXXX-XXXX-XXXX), donné par la base quand le rendu passe « valide ». Il ouvre la page publique /attestation/<numéro>.';

-- 2. Un numéro neuf : 12 chiffres hexadécimaux tirés au hasard (les 12
-- premiers d'un UUID v4, tous aléatoires), en majuscules, par groupes de 4.
create or replace function public.nouveau_numero_attestation()
returns text
language sql
volatile
security invoker
set search_path = ''
as $$
  select 'AIW-' || substr(h, 1, 4) || '-' || substr(h, 5, 4) || '-' || substr(h, 9, 4)
  from (select upper(replace(gen_random_uuid()::text, '-', '')) as h) as tirage;
$$;

revoke all on function public.nouveau_numero_attestation() from public;
revoke all on function public.nouveau_numero_attestation() from anon;
revoke all on function public.nouveau_numero_attestation() from authenticated;
grant execute on function public.nouveau_numero_attestation() to service_role;

-- 3. Les rendus déjà validés reçoivent leur numéro.
update rendus_attestation
set numero = public.nouveau_numero_attestation()
where statut = 'valide' and numero is null;

-- 4. Un numéro est unique, et seul un rendu validé en porte un.
create unique index if not exists idx_rendus_attestation_numero
  on rendus_attestation (numero) where numero is not null;

alter table rendus_attestation drop constraint if exists rendus_attestation_numero_si_valide;
alter table rendus_attestation add constraint rendus_attestation_numero_si_valide
  check ((statut = 'valide') = (numero is not null));

-- 5. La base donne le numéro au passage à « valide », et le garde ensuite.
create or replace function public.numeroter_attestation()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if new.statut = 'valide' then
    if tg_op = 'UPDATE' and old.numero is not null then
      new.numero := old.numero;
    elsif new.numero is null then
      new.numero := public.nouveau_numero_attestation();
    end if;
  end if;
  return new;
end;
$$;

revoke all on function public.numeroter_attestation() from public;
revoke all on function public.numeroter_attestation() from anon;
revoke all on function public.numeroter_attestation() from authenticated;
grant execute on function public.numeroter_attestation() to service_role;

drop trigger if exists rendus_attestation_numero on rendus_attestation;
create trigger rendus_attestation_numero
  before insert or update on rendus_attestation
  for each row execute function public.numeroter_attestation();

commit;
