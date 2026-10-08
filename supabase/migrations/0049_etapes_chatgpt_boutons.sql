-- Les 14 configurations ChatGPT : noms des boutons relevés sur Android le 9 octobre 2026.
-- Le bouton qui crée le projet s'appelle « Créer un projet » ; les instructions se gardent avec la coche en haut à droite.
-- Ne touche qu'aux étapes 2 et 3 de la partie « chatgpt » du champ installation. Rejouable.
begin;

update ressources
set installation = jsonb_set(
      jsonb_set(installation, '{chatgpt,etapes,1}',
        to_jsonb('Dans ChatGPT, touchez Projets, puis le + en haut à droite. Donnez au projet le nom « '
          || substring(installation #>> '{chatgpt,etapes,1}' from 'le nom « (.+) », puis') || ' », puis touchez Créer un projet.'::text)),
      '{chatgpt,etapes,2}',
      to_jsonb('Dans le projet, touchez les trois points en haut à droite, puis Modifier les instructions. Collez le texte, puis touchez la coche en haut à droite.'::text)),
    revu_le = '2026-10-09'
where type = 'configuration'
  and installation #>> '{chatgpt,etapes,1}' like 'Dans ChatGPT, touchez Projets, puis le + en haut à droite.%';

do $controle$
declare n int;
begin
  select count(*) into n from ressources
  where type = 'configuration' and installation ? 'chatgpt'
    and installation #>> '{chatgpt,etapes,1}' ~ '^Dans ChatGPT, touchez Projets, puis le \+ en haut à droite\. Donnez au projet le nom « [^»]+ », puis touchez Créer un projet\.$'
    and installation #>> '{chatgpt,etapes,2}' = 'Dans le projet, touchez les trois points en haut à droite, puis Modifier les instructions. Collez le texte, puis touchez la coche en haut à droite.'
    and jsonb_array_length(installation #> '{chatgpt,etapes}') = 3;
  if n <> 14 then raise exception 'Configurations ChatGPT : % sur 14 corrigées', n; end if;
end
$controle$;

commit;
