-- Demandes envoyées depuis les formulaires "Systèmes IA" et "Transformation IA".
-- Chaque demande est enregistrée ici AVANT l'envoi de l'email : si l'email
-- échoue (clé Resend absente, panne...), la demande n'est pas perdue et reste
-- consultable dans Supabase (Table Editor > demandes_contact).
-- Écriture uniquement par la route serveur /api/contact (clé service_role) :
-- RLS activé sans aucune politique, donc aucun accès depuis le navigateur.

create table if not exists demandes_contact (
  id uuid primary key default gen_random_uuid(),
  cree_le timestamptz not null default now(),
  user_id uuid references auth.users (id) on delete set null,
  formulaire text not null check (formulaire in ('systemes-ia', 'transformation-ia')),
  nom text not null,
  email text not null,
  entreprise text,
  fonction text,
  reponses jsonb not null default '{}'::jsonb,
  email_envoye boolean not null default false
);

create index if not exists demandes_contact_cree_le_idx
  on demandes_contact (cree_le desc);
create index if not exists demandes_contact_user_idx
  on demandes_contact (user_id, cree_le desc);

alter table demandes_contact enable row level security;
