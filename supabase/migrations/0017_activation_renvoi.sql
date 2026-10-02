-- 0017 : renvoi du lien d'activation après un achat (3 octobre 2026, règle C6)
--
-- Avant : quand l'e-mail d'activation ne partait pas (limite d'envoi atteinte
-- pendant un pic de ventes), le webhook supprimait l'accès payé et répondait
-- une erreur à Chariow, qui désactive le Pulse après 5 erreurs.
--
-- Après : l'accès payé reste. L'acheteur peut redemander son lien lui-même
-- (page /activation/renvoi). Cette colonne garde la date de la dernière
-- demande d'envoi : elle sert à limiter les envois à un toutes les 5 minutes
-- par adresse (règle S13).
--
-- Aucune donnée existante n'est modifiée ni supprimée. Les droits de la table
-- ne changent pas : acces_clients reste réservée au serveur (migration 0015).
-- Migration rejouable.

alter table acces_clients add column if not exists activation_demandee_le timestamptz;

comment on column acces_clients.activation_demandee_le is
  'Dernière demande d''envoi du lien d''activation (achat ou renvoi). Limite : un envoi toutes les 5 minutes par adresse.';
