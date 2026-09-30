-- Formule d'abonnement « à vie » (95 000 FCFA, paiement unique).
-- Elle se range dans la même table que les formules mensuelle et annuelle :
-- periode = 'a_vie' et fin_le très lointaine (1er janvier 2100), pour que la
-- règle « actif tant que fin_le n'est pas dépassée » reste la même partout.
-- Sans effet si la migration est exécutée une seconde fois.

alter table abonnements drop constraint if exists abonnements_periode_check;
alter table abonnements
  add constraint abonnements_periode_check
  check (periode in ('mensuel', 'annuel', 'a_vie'));
