-- Vidéo G1 refaite le 9 octobre 2026 : voix de Jérôme (ElevenLabs), nouveau logo dans l'en-tête,
-- sans pastille « Accéléré » ni mention de l'éditeur. Elle remplace la première version
-- (f1919e20…) sur la configuration ChatGPT des 14 kits. Ne touche qu'à video_url. Rejouable.
begin;

update ressources
set video_url = 'https://player.mediadelivery.net/embed/772541/07a6174b-26f0-49d8-8a76-86e209dbb3fe'
where type = 'configuration'
  and outil = 'chatgpt'
  and video_url in ('https://player.mediadelivery.net/embed/772541/f1919e20-2638-4087-b24e-c63635b01e57',
                    'https://player.mediadelivery.net/embed/772541/07a6174b-26f0-49d8-8a76-86e209dbb3fe');

do $controle$
declare n int;
begin
  select count(*) into n from ressources
  where type = 'configuration' and outil = 'chatgpt'
    and video_url = 'https://player.mediadelivery.net/embed/772541/07a6174b-26f0-49d8-8a76-86e209dbb3fe';
  if n <> 14 then raise exception 'Vidéo G1 : % configurations ChatGPT sur 14', n; end if;
  -- Plus aucune ressource ne porte l'ancienne version, et la nouvelle n'est nulle part ailleurs.
  select count(*) into n from ressources where video_url like '%f1919e20-2638-4087-b24e-c63635b01e57%';
  if n <> 0 then raise exception 'Ancienne vidéo G1 encore sur % ressource(s)', n; end if;
  select count(*) into n from ressources
  where video_url like '%07a6174b-26f0-49d8-8a76-86e209dbb3fe%' and not (type = 'configuration' and outil = 'chatgpt');
  if n <> 0 then raise exception 'Vidéo G1 posée sur % autre(s) ressource(s)', n; end if;
end
$controle$;

commit;
