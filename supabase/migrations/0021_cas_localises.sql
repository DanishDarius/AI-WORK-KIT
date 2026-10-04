-- 0021 : les cas localisés des 42 tâches existantes (4 octobre 2026, plan
-- produit, chantier 2)
--
-- Avant : les 42 premières tâches ont des cas écrits pour la France, avec
-- trois prompts par cas. Le site en ligne les affiche encore. Réécrire ces
-- cas sur place les séparerait de leurs prompts, pour les clients du site en
-- ligne, avant la fusion.
--
-- Après : le cas localisé s'écrit à côté de l'ancien, dans quatre colonnes
-- de la table exercices. La description localisée d'un métier s'écrit de la
-- même façon, dans une colonne de la table metiers. La nouvelle interface lit
-- ces colonnes quand elles sont remplies, sinon les anciennes. Le site en
-- ligne ne les lit pas : rien ne change pour lui.
--
-- Droits (règles S4 et B1) : aucune table créée. exercices et metiers gardent
-- leur RLS, leurs politiques et leurs droits : un compte dont l'accès est
-- actif lit ces colonnes comme les autres colonnes de la ligne.
--
-- Aucune donnée existante n'est modifiée ni supprimée. Les cinq colonnes
-- sont vides après cette migration : les kits des métiers existants les
-- rempliront. Migration rejouable. Tout se fait dans une transaction : en cas
-- d'erreur, rien n'est modifié.

begin;

alter table exercices add column if not exists titre_local text;
alter table exercices add column if not exists contexte_local text;
alter table exercices add column if not exists donnees_local text;
alter table exercices add column if not exists travail_local text;

comment on column exercices.titre_local is 'Titre du cas localisé. Quand il est rempli, la nouvelle interface l''affiche à la place de titre.';
comment on column exercices.contexte_local is 'Contexte du cas localisé, à la place de contexte.';
comment on column exercices.donnees_local is 'Données du cas localisé, à la place de donnees.';
comment on column exercices.travail_local is 'Travail à faire du cas localisé, à la place de travail_a_faire.';

alter table metiers add column if not exists description_local text;

comment on column metiers.description_local is 'Description localisée du métier. Quand elle est remplie, la nouvelle interface l''affiche à la place de description.';

commit;
