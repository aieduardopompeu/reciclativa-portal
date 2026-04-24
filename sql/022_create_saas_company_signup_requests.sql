create table if not exists saas_company_signup_requests (
  id uuid primary key default gen_random_uuid(),
  cnpj varchar(18) not null,
  cnpj_digits varchar(14) not null,
  legal_name text not null,
  trade_name text,
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
  responsible_name text not null,
  responsible_email text not null,
  responsible_whatsapp text not null,
  operational_city text,
  operational_state varchar(2),
  operation_type text,
  expected_modules text[] not null default '{}',
  message text,
  cnpj_lookup_provider text,
  cnpj_lookup_payload jsonb,
  status text not null default 'pending',
  reviewed_by uuid references saas_users(id) on delete set null,
  reviewed_at timestamptz,
  review_notes text,
  created_organization_id uuid references organizations(id) on delete set null,
  created_user_id uuid references saas_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint saas_company_signup_requests_status_check
    check (status in ('pending', 'pending_cnpj_lookup', 'approved', 'rejected', 'canceled')),
  constraint saas_company_signup_requests_cnpj_digits_check
    check (char_length(cnpj_digits) = 14)
);

create index if not exists saas_company_signup_requests_status_idx
  on saas_company_signup_requests (status, created_at desc);

create index if not exists saas_company_signup_requests_cnpj_digits_idx
  on saas_company_signup_requests (cnpj_digits);

create index if not exists saas_company_signup_requests_responsible_email_idx
  on saas_company_signup_requests (lower(responsible_email));

drop trigger if exists trg_saas_company_signup_requests_updated_at on saas_company_signup_requests;
create trigger trg_saas_company_signup_requests_updated_at
before update on saas_company_signup_requests
for each row execute function set_updated_at();
