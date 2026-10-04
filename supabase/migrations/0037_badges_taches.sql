-- 0037 : badges des tâches (4 octobre 2026, plan produit, chantier 4)
--
-- Avant : rien ne disait, sur une tâche, si un compte gratuit suffit ni si
-- elle se fait sur un téléphone. Le client le découvrait en lisant les notes.
--
-- Après : chaque tâche porte deux réponses, « un compte gratuit suffit » et
-- « faisable sur téléphone », et, quand une IA gratuite fait mieux le travail
-- que les autres, son nom. L'application en fait des badges et un filtre.
-- Une tâche peut aussi recevoir le lien d'une vidéo (lot suivant).
--
-- D'où viennent les valeurs : des précisions et des notes par IA écrites dans
-- les 14 kits, à partir des pages officielles des outils. Rien n'a été essayé
-- sur un téléphone : « faisable sur téléphone » veut dire que la méthode
-- décrite se fait dans les applications du téléphone, pas qu'elle a été
-- chronométrée.
-- - F42 : créer une vidéo avec une IA demande un abonnement. La tâche prépare
--   le découpage et les consignes, mais le badge dit « payant conseillé ».
-- - F04, F05, F36 à F40 : Gemini lit un enregistrement, une vidéo courte ou
--   l'agenda sur un compte gratuit ; avec les autres, on colle un texte.
-- - F09, F34 : ChatGPT et Gemini créent ou retouchent une image sur un compte
--   gratuit, dans une limite ; Claude rédige seulement la consigne.
-- - F15 : Claude crée le fichier de présentation sur un compte gratuit, et
--   Gemini génère des diapositives.
--
-- Droits : les colonnes s'ajoutent à la table taches, dont les droits ne
-- changent pas (lecture par un compte dont l'accès est actif, migrations 0015
-- et 0016). Le site en ligne ne lit pas ces colonnes : rien ne change pour
-- lui (règle B3). Aucune donnée supprimée. Migration rejouable.

begin;

alter table taches add column if not exists gratuit_ok boolean;
alter table taches add column if not exists mobile_ok boolean;
alter table taches add column if not exists outil_gratuit_conseille text;
alter table taches add column if not exists video_url text;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'taches_video_url_https') then
    alter table taches add constraint taches_video_url_https check (video_url ~ '^https://');
  end if;
end $$;

comment on column taches.gratuit_ok is 'Vrai : un compte gratuit suffit. Faux : un abonnement à une IA est conseillé. Vide : non renseigné, aucun badge.';
comment on column taches.mobile_ok is 'Vrai : la méthode décrite se fait sur un téléphone. Vide : non renseigné, aucun badge.';
comment on column taches.outil_gratuit_conseille is 'Nom de l''IA gratuite qui fait le mieux cette tâche, quand il y en a une (facultatif).';
comment on column taches.video_url is 'Lien de la vidéo de la tâche, chargée au clic (facultatif).';

-- Les 56 tâches des 14 kits se font avec un compte gratuit, sur un téléphone.
update taches set gratuit_ok = true, mobile_ok = true
 where code ~ '^F(0[1-9]|[1-4][0-9]|5[0-6])$';

-- Une exception : la création d'une vidéo par une IA.
update taches set gratuit_ok = false where code = 'F42';

-- L'IA gratuite conseillée, quand les notes des kits en désignent une.
update taches set outil_gratuit_conseille = null
 where code ~ '^F(0[1-9]|[1-4][0-9]|5[0-6])$';
update taches set outil_gratuit_conseille = 'Gemini'
 where code in ('F04', 'F05', 'F36', 'F37', 'F38', 'F39', 'F40');
update taches set outil_gratuit_conseille = 'ChatGPT ou Gemini'
 where code in ('F09', 'F34');
update taches set outil_gratuit_conseille = 'Claude ou Gemini'
 where code = 'F15';

commit;
