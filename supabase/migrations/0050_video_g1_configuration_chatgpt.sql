-- Vidéo G1 (« Coller la configuration dans ChatGPT ») : déposée chez Bunny Stream le 9 octobre 2026,
-- bibliothèque « AIW » (772541). Elle se branche sur la configuration ChatGPT des 14 kits
-- (Mon kit, étape 1) : le bouton « Voir la vidéo » apparaît sous la configuration.
-- Ne touche qu'à la colonne video_url de ces 14 lignes, que le site en ligne ne lit pas. Rejouable.
begin;

update ressources
set video_url = 'https://player.mediadelivery.net/embed/772541/f1919e20-2638-4087-b24e-c63635b01e57'
where type = 'configuration'
  and outil = 'chatgpt'
  and (video_url is null or video_url = 'https://player.mediadelivery.net/embed/772541/f1919e20-2638-4087-b24e-c63635b01e57');

do $controle$
declare n int; t int;
begin
  select count(*) into t from ressources where type = 'configuration' and outil = 'chatgpt';
  select count(*) into n from ressources
  where type = 'configuration' and outil = 'chatgpt'
    and video_url = 'https://player.mediadelivery.net/embed/772541/f1919e20-2638-4087-b24e-c63635b01e57';
  if t <> 14 or n <> 14 then raise exception 'Vidéo G1 : % configurations ChatGPT sur %, 14 attendues', n, t; end if;
  -- Aucune autre ressource ne porte cette vidéo.
  select count(*) into n from ressources
  where video_url like '%f1919e20-2638-4087-b24e-c63635b01e57%' and not (type = 'configuration' and outil = 'chatgpt');
  if n <> 0 then raise exception 'Vidéo G1 posée sur % autre(s) ressource(s)', n; end if;
end
$controle$;

commit;
