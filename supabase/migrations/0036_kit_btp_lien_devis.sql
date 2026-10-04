-- 0036 : kit « BTP / Gestion de chantier », nouveau lien du document
-- « Devis quantitatif et estimatif » (4 octobre 2026)
--
-- Avant : le bouton « Faire une copie » de ce document ouvrait un tableau
-- dont les montants s'affichaient sans espace entre les milliers (220000 au
-- lieu de 220 000). Le format des montants s'était perdu à l'envoi du
-- tableau dans le Drive. Les calculs étaient justes, et le fichier
-- téléchargé depuis l'application n'était pas touché.
--
-- Après : le lien pointe vers le tableau corrigé. Rien d'autre ne change :
-- ni le texte de la ressource, ni son fichier à télécharger, ni son
-- rattachement au kit et aux tâches.
--
-- Aucune table créée, aucun droit modifié, aucune donnée supprimée.
-- Migration rejouable.

begin;

update ressources
   set lien_copie = 'https://docs.google.com/spreadsheets/d/1nM3wvNuw455RUd4fG7X8y09A65DEZDr3XZXE-V5l4LU/copy'
 where cle = 'doc-devis-quantitatif';

commit;
