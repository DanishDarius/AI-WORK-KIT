-- Actualité GPT-6 Astra : date d'annonce au 3 septembre 2026 (notes de version de ChatGPT, page d'OpenAI et article de 9to5Mac, relus le 8 octobre 2026).
-- Ne touche qu'à une actualité et à sa publication. Rejouable.
begin;

update mises_a_jour_ia
set annonce_le = '2026-09-03',
    disponibilite = 'Annoncé le 3 septembre 2026 et ouvert d''abord à un petit nombre d''entreprises. Selon 9to5Mac, les offres Pro et Business l''ont reçu environ un jour après, puis l''offre Plus quelques heures plus tard. Dans Enterprise, l''administrateur doit l''activer. OpenAI ne cite pas les offres Free et Go.',
    revu_le = '2026-10-08'
where slug = 'gpt-6-astra';

update publications
set publie_le = '2026-09-03T08:00:00Z'
where type = 'mise_a_jour' and ref_id = 'gpt-6-astra';

do $controle$
begin
  if (select count(*) from mises_a_jour_ia where slug = 'gpt-6-astra' and annonce_le = '2026-09-03') <> 1 then
    raise exception 'GPT-6 Astra : date non corrigée';
  end if;
  if (select count(*) from publications where type = 'mise_a_jour' and ref_id = 'gpt-6-astra' and publie_le = '2026-09-03T08:00:00Z') <> 1 then
    raise exception 'GPT-6 Astra : publication non corrigée';
  end if;
end
$controle$;

commit;
