-- 2026-04-23_create_company_signups.sql
-- Estrutura inicial para gestão de cadastros de empresas
-- Projeto: Reciclativa Gestão

create extension if not exists pgcrypto;

create table if not exists company_signups (
  id uuid primary key default gen_random_uuid(),

  cnpj varchar(14) not null,
  legal_name text not null,
  trade_name text,

  status varchar(30) not null default 'pending',
  lookup_mode varchar(20) not null default 'public_lookup',

  tax_status text,
  opened_at date,
  main_activity text,

  official_email text,
  official_phone text,
  official_street text,
  official_number text,
  official_complement text,
  official_district text,
  official_city text,
  official_state varchar(2),
  official_zip_code text,

  contact_name text not null,
  contact_role text,
  contact_email text not null,
  contact_phone text,
  contact_whatsapp text,

  requested_modules jsonb not null default '[]'::jsonb,
  notes_from_applicant text,
  admin_notes text,
  rejection_reason text,

  reviewed_by_user_id uuid,
  approved_at timestamptz,
  rejected_at timestamptz,
  last_status_change_at timestamptz not null default now(),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint company_signups_status_check check (
    status in (
      'pending',
      'under_review',
      'approved',
      'rejected',
      'needs_adjustment',
      'cancelled'
    )
  ),

  constraint company_signups_lookup_mode_check check (
    lookup_mode in ('public_lookup', 'manual')
  ),

  constraint company_signups_cnpj_digits_check check (
    cnpj ~ '^[0-9]{14}$'
  )
);

create index if not exists idx_company_signups_cnpj
  on company_signups (cnpj);

create index if not exists idx_company_signups_status
  on company_signups (status);

create index if not exists idx_company_signups_created_at
  on company_signups (created_at desc);

create index if not exists idx_company_signups_state_city
  on company_signups (official_state, official_city);

create unique index if not exists ux_company_signups_cnpj_active_flow
  on company_signups (cnpj)
  where status in ('pending', 'under_review', 'approved', 'needs_adjustment');

create table if not exists company_signup_history (
  id uuid primary key default gen_random_uuid(),
  signup_id uuid not null references company_signups(id) on delete cascade,

  from_status varchar(30),
  to_status varchar(30) not null,
  action varchar(50) not null,
  note text,

  acted_by_user_id uuid,
  created_at timestamptz not null default now(),

  constraint company_signup_history_to_status_check check (
    to_status in (
      'pending',
      'under_review',
      'approved',
      'rejected',
      'needs_adjustment',
      'cancelled'
    )
  )
);

create index if not exists idx_company_signup_history_signup_id_created_at
  on company_signup_history (signup_id, created_at desc);

create or replace function set_updated_at_company_signups()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_set_updated_at_company_signups on company_signups;

create trigger trg_set_updated_at_company_signups
before update on company_signups
for each row
execute function set_updated_at_company_signups();

comment on table company_signups is 'Solicitações de cadastro de empresas antes da aprovação no sistema.';
comment on table company_signup_history is 'Histórico de transições e ações administrativas sobre solicitações de cadastro.';
