-- 0039 : la vidéo d'accueil d'un kit (4 octobre 2026, plan produit,
-- chantier 4, « Vidéos ciblées »)
--
-- Avant : une ressource d'un kit pouvait porter le lien d'une vidéo
-- (ressources.video_url, migration 0018), et une tâche aussi (taches.video_url,
-- migration 0037). Le kit lui-même n'avait pas d'emplacement pour sa vidéo
-- d'accueil de deux minutes.
--
-- Après : le kit d'un métier peut porter le lien de sa vidéo d'accueil. Tant
-- que le lien est vide, rien ne s'affiche. Une vidéo se branche ensuite par
-- une ligne de SQL, sans toucher au code. Elle est hébergée hors de
-- l'application et ne se charge que lorsque le client appuie sur le bouton.
--
-- Droits : la colonne s'ajoute à la table kits, réservée au serveur
-- (migration 0018) : ses droits ne changent pas. Aucune donnée modifiée ni
-- supprimée. Migration rejouable.

begin;

alter table kits add column if not exists video_url text;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'kits_video_url_https') then
    alter table kits add constraint kits_video_url_https check (video_url ~ '^https://');
  end if;
end $$;

comment on column kits.video_url is 'Lien de la vidéo d''accueil du kit (deux minutes), chargée au clic (facultatif).';

commit;
