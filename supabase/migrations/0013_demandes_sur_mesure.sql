-- 0013 : demandes sur mesure de l'abonnement (1er octobre 2026)
--
-- Deux types de demandes, dans la même table que la tâche sur mesure :
--   'tache'  : une tâche plus complexe ou plus spécifique, même dans un
--              métier couvert ; livrée en 30 min à 2 h, 8 par mois.
--   'metier' : un kit complet pour un métier couvert ou non ; livré en
--              8 h à 24 h, 2 par mois.
-- « details » garde les réponses du formulaire (JSON) ; « description »
-- reste le texte lisible envoyé à l'équipe et affiché dans l'app.
-- Migration idempotente : peut être rejouée sans effet.

alter table demandes_plans add column if not exists type text not null default 'tache';
alter table demandes_plans drop constraint if exists demandes_plans_type_check;
alter table demandes_plans add constraint demandes_plans_type_check check (type in ('tache', 'metier'));
alter table demandes_plans add column if not exists details jsonb not null default '{}'::jsonb;

create index if not exists idx_demandes_plans_user_type on demandes_plans (user_id, type, cree_le desc);
