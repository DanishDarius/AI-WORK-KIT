-- Abonnement Bibliothèque et demandes de « tâche sur mesure ».
--
-- abonnements : une ligne par période payée (mensuelle ou annuelle).
--   Tant qu'aucun prestataire de paiement n'est branché, les lignes sont
--   ajoutées à la main depuis Supabase (Table Editor) :
--     email       = adresse du compte AIW
--     periode     = 'mensuel' ou 'annuel'
--     fin_le      = date de fin de la période payée
--   L'abonnement ouvre la Bibliothèque tant que fin_le n'est pas dépassée.
--   statut = 'resilie' : la personne a résilié, l'accès reste ouvert
--   jusqu'à fin_le puis s'arrête.
--
-- demandes_plans : les tâches décrites par les abonnés depuis une page
--   métier. L'équipe rédige le plan puis remplit « plan » (markdown) et passe
--   « statut » à 'livre' : le plan apparaît alors dans l'app.

create table if not exists abonnements (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  periode text not null check (periode in ('mensuel', 'annuel')),
  statut text not null default 'actif' check (statut in ('actif', 'resilie', 'expire')),
  debut_le timestamptz not null default now(),
  fin_le timestamptz not null,
  fournisseur text,
  reference_paiement text unique,
  cree_le timestamptz not null default now()
);
create index if not exists idx_abonnements_email on abonnements (lower(email));

create table if not exists demandes_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  email text not null,
  metier_slug text not null,
  metier_nom text not null,
  description text not null,
  ias text[] not null default array['chatgpt', 'claude', 'gemini'],
  statut text not null default 'recue' check (statut in ('recue', 'en_cours', 'livre')),
  plan text,
  email_envoye boolean not null default false,
  cree_le timestamptz not null default now(),
  livre_le timestamptz
);
create index if not exists idx_demandes_plans_user on demandes_plans (user_id, metier_slug, cree_le desc);

-- Lecture et écriture uniquement côté serveur (clé service) : aucune policy.
alter table abonnements enable row level security;
alter table demandes_plans enable row level security;
