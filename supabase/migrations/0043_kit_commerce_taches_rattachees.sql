-- 0043 : kit « Commerce et vente en ligne », trois tâches déjà écrites
-- rattachées au métier (6 octobre 2026)
--
-- Avant : le métier « Commerce et vente en ligne » n'avait que ses 8 tâches
-- neuves (F43 à F50). Trois tâches écrites pour d'autres métiers servent
-- aussi à un commerçant, et aucune tâche du kit ne traite leur sujet :
--   F06  Service client de premier niveau (FAQ)
--   F09  Génération d'images et de visuels marketing
--   F34  Retouche d'image et modification d'éléments
--
-- Après : ces trois tâches s'affichent aussi dans le parcours du métier,
-- à la suite des 8 premières. Vues depuis ce métier, elles montrent la
-- configuration « Assistant de ma boutique » du kit (une par IA).
--
-- Rien n'est réécrit : ni le titre, ni les étapes, ni les cas, ni le modèle
-- à remplir de ces tâches, ni leur place dans les autres métiers. Les
-- tâches F02, F26 et F28 ne sont pas rattachées : F02 traite le même sujet
-- que F44 ; F26 et F28 attendent une décision.
--
-- Aucune table créée, aucun droit modifié, aucune donnée supprimée.
-- Migration rejouable.

begin;

-- 1. Les trois tâches dans le parcours du métier, après F43 à F50
insert into metiers_taches (metier_id, tache_id, ordre) select m.id, t.id, v.ordre
  from metiers m, taches t,
  (values
    ($t$F06$t$, 9),
    ($t$F09$t$, 10),
    ($t$F34$t$, 11)
  ) as v(code, ordre)
  where m.slug = $t$commerce-vente-en-ligne$t$ and t.code = v.code
  on conflict (metier_id, tache_id) do update set ordre = excluded.ordre;

-- 2. Les ressources du kit qui servent à ces tâches
insert into ressources_taches (ressource_id, tache_id) select r.id, t.id
  from ressources r, taches t,
  (values
    ($t$config-boutique-chatgpt$t$, $t$F06$t$),
    ($t$config-boutique-claude$t$, $t$F06$t$),
    ($t$config-boutique-gemini$t$, $t$F06$t$),
    ($t$config-boutique-chatgpt$t$, $t$F09$t$),
    ($t$config-boutique-claude$t$, $t$F09$t$),
    ($t$config-boutique-gemini$t$, $t$F09$t$),
    ($t$config-boutique-chatgpt$t$, $t$F34$t$),
    ($t$config-boutique-claude$t$, $t$F34$t$),
    ($t$config-boutique-gemini$t$, $t$F34$t$)
  ) as v(cle, code)
  where r.cle = v.cle and t.code = v.code
  on conflict (ressource_id, tache_id) do nothing;

-- 3. Contrôle : la transaction est annulée si un élément manque
do $controle$
declare
  n integer;
begin
  -- Les trois tâches rattachées ont leur modèle et leurs deux cas localisés.
  select count(*) into n from taches t where t.code in ($t$F06$t$, $t$F09$t$, $t$F34$t$)
    and not t.du_fil
    and exists (select 1 from modeles_prompts mp where mp.tache_id = t.id)
    and (select count(*) from exercices e where e.tache_id = t.id and e.titre_local is not null) = 2;
  if n <> 3 then
    raise exception 'Tâches rattachées complètes attendues : 3, trouvées : %', n;
  end if;
  -- Le métier a ses 8 tâches neuves et les 3 tâches rattachées, et aucune autre.
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id join taches t on t.id = mt.tache_id
    where m.slug = $t$commerce-vente-en-ligne$t$
      and t.code in ($t$F43$t$, $t$F44$t$, $t$F45$t$, $t$F46$t$, $t$F47$t$, $t$F48$t$, $t$F49$t$, $t$F50$t$, $t$F06$t$, $t$F09$t$, $t$F34$t$);
  if n <> 11 then
    raise exception 'Tâches du métier attendues : 11, trouvées : %', n;
  end if;
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id where m.slug = $t$commerce-vente-en-ligne$t$;
  if n <> 11 then
    raise exception 'Le métier a % tâches, 11 attendues', n;
  end if;
  -- Chaque tâche du métier a au moins une ressource de ce kit.
  select count(*) into n from metiers_taches mt join metiers m on m.id = mt.metier_id
    where m.slug = $t$commerce-vente-en-ligne$t$ and not exists (
      select 1 from ressources_taches rt join kits_metier km on km.ressource_id = rt.ressource_id
      where rt.tache_id = mt.tache_id and km.metier_id = m.id);
  if n <> 0 then
    raise exception 'Tâches du métier sans ressource du kit : %', n;
  end if;
  -- Le kit garde ses 13 ressources.
  select count(*) into n from kits_metier km join metiers m on m.id = km.metier_id where m.slug = $t$commerce-vente-en-ligne$t$;
  if n <> 13 then
    raise exception 'Ressources du kit attendues : 13, trouvées : %', n;
  end if;
end
$controle$;

commit;
