-- Les 14 configurations ChatGPT : étapes écrites d'après les menus relevés sur téléphone le 8 octobre 2026.
-- Les menus relevés sur ordinateur passent dans une note. Ne touche qu'à la partie « chatgpt » du champ installation. Rejouable.
begin;

update ressources
set installation = jsonb_set(
      jsonb_set(
        jsonb_set(
          jsonb_set(installation, '{chatgpt,etapes,1}',
            to_jsonb('Dans ChatGPT, touchez Projets, puis le + en haut à droite. Donnez au projet le nom « '
              || substring(installation #>> '{chatgpt,etapes,1}' from 'le nom « (.+) », puis') || ' », puis touchez Créer le projet.'::text)),
          '{chatgpt,etapes,2}',
          to_jsonb('Dans le projet, touchez les trois points en haut à droite, puis Modifier les instructions. Collez le texte, puis Enregistrer.'::text)),
        '{chatgpt,telephone}',
        to_jsonb('Oui. Les étapes ci-dessus ont été relevées sur un téléphone. Sur iPhone, les menus peuvent différer un peu.'::text)),
      '{chatgpt,notes}',
      jsonb_build_array('Sur ordinateur : ouvrez le menu « … » du projet, puis Paramètres du projet. Collez le texte dans le champ Instructions, puis Enregistrer.'::text)
        || (installation #> '{chatgpt,notes}')),
    revu_le = '2026-10-08'
where type = 'configuration'
  and installation #>> '{chatgpt,etapes,2}' = 'Ouvrez le menu « … » du projet, puis Paramètres du projet. Collez le texte dans le champ Instructions, puis Enregistrer.';

do $controle$
declare n int;
begin
  select count(*) into n from ressources
  where type = 'configuration' and installation ? 'chatgpt'
    and installation #>> '{chatgpt,etapes,1}' ~ '^Dans ChatGPT, touchez Projets, puis le \+ en haut à droite\. Donnez au projet le nom « [^»]+ », puis touchez Créer le projet\.$'
    and installation #>> '{chatgpt,etapes,2}' like 'Dans le projet, touchez les trois points%'
    and jsonb_array_length(installation #> '{chatgpt,etapes}') = 3
    and jsonb_array_length(installation #> '{chatgpt,notes}') = 3
    and installation #>> '{chatgpt,notes,0}' like 'Sur ordinateur%';
  if n <> 14 then raise exception 'Configurations ChatGPT : % sur 14 corrigées', n; end if;
end
$controle$;

commit;
