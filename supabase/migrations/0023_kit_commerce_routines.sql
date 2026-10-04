-- 0023 : kit « Commerce et vente en ligne », précision sur les routines dans
-- ChatGPT gratuit (4 octobre 2026)
--
-- Avant : les deux routines du kit disent que ChatGPT gratuit exécute une
-- tâche planifiée une fois par jour au plus. L'aide d'OpenAI précise que cette
-- exécution se fait sur une plage de la journée, pas à une heure exacte. Les
-- kits suivants le disent déjà.
--
-- Après : la même phrase que dans les autres kits, copiée du programme qui
-- fabrique les kits. Seule la ligne « gratuit » de ChatGPT change, dans deux
-- ressources. Aucune table créée, aucun droit modifié. Migration rejouable.

begin;

update ressources
  set installation = jsonb_set(installation, '{chatgpt,gratuit}', to_jsonb($t$Oui : 3 tâches actives au plus, et une exécution par jour au plus, sur une plage de la journée et non à une heure exacte. Les deux routines du kit tiennent dans cette limite.$t$::text)),
      revu_le = '2026-10-04'
  where cle in ('routine-point-ventes-lundi', 'routine-relance-impayes-vendredi')
    and installation ? 'chatgpt';

do $controle$
declare
  n integer;
begin
  select count(*) into n from ressources
    where cle in ('routine-point-ventes-lundi', 'routine-relance-impayes-vendredi')
      and installation->'chatgpt'->>'gratuit' like '%sur une plage de la journée%';
  if n <> 2 then
    raise exception 'Routines du kit Commerce attendues : 2, trouvées : %', n;
  end if;
end
$controle$;

commit;
