-- Nettoyage typographique des contenus déjà en base (métiers, tâches,
-- exercices, prompts, glossaire) :
--   * suppression des caractères invisibles (espaces de largeur nulle, BOM,
--     tiret conditionnel, marques de direction) et des caractères de contrôle
--     (sauf tabulation et retours à la ligne) ;
--   * espaces insécables et espaces fines remplacés par une espace normale.
-- Les tirets longs ne sont PAS traités ici : ils sont remplacés phrase par
-- phrase, selon le sens (deux-points, virgule, point...), dans une migration
-- dédiée.
-- Sans effet sur un texte déjà propre : peut être exécuté plusieurs fois.

create or replace function pg_temp.nettoyer(t text) returns text
language sql immutable as $$
  select regexp_replace(
    regexp_replace(
      regexp_replace(t, '[\u200B\u200C\u200D\u2060\uFEFF\u00AD\u200E\u200F\u202A-\u202E\u2066-\u2069\u180E]', '', 'g'),
      '[\u0001-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]', '', 'g'),
    '[\u00A0\u202F\u2000-\u200A\u205F\u3000]', ' ', 'g')
$$;

update metiers set
  nom = pg_temp.nettoyer(nom),
  description = pg_temp.nettoyer(description)
where nom is distinct from pg_temp.nettoyer(nom)
   or description is distinct from pg_temp.nettoyer(description);

update taches set
  titre = pg_temp.nettoyer(titre)
where titre is distinct from pg_temp.nettoyer(titre);

update exercices set
  titre = pg_temp.nettoyer(titre),
  contexte = pg_temp.nettoyer(contexte),
  donnees = pg_temp.nettoyer(donnees),
  travail_a_faire = pg_temp.nettoyer(travail_a_faire)
where titre is distinct from pg_temp.nettoyer(titre)
   or contexte is distinct from pg_temp.nettoyer(contexte)
   or donnees is distinct from pg_temp.nettoyer(donnees)
   or travail_a_faire is distinct from pg_temp.nettoyer(travail_a_faire);

update prompts set
  contenu = pg_temp.nettoyer(contenu)
where contenu is distinct from pg_temp.nettoyer(contenu);

update glossaire set
  terme = pg_temp.nettoyer(terme),
  definition = pg_temp.nettoyer(definition)
where terme is distinct from pg_temp.nettoyer(terme)
   or definition is distinct from pg_temp.nettoyer(definition);
