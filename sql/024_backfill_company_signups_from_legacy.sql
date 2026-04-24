-- Migração opcional: copiar cadastros antigos da tabela legada
-- saas_company_signup_requests para a nova estrutura company_signups.

insert into company_signups (
  cnpj,
  legal_name,
  trade_name,
  status,
  lookup_mode,
  tax_status,
  opened_at,
  main_activity,
  official_email,
  official_phone,
  official_street,
  official_number,
  official_complement,
  official_district,
  official_city,
  official_state,
  official_zip_code,
  contact_name,
  contact_role,
  contact_email,
  contact_phone,
  contact_whatsapp,
  requested_modules,
  notes_from_applicant,
  admin_notes,
  rejection_reason,
  approved_at,
  rejected_at,
  created_at,
  updated_at,
  last_status_change_at
)
select
  legacy.cnpj_digits as cnpj,
  legacy.legal_name,
  legacy.trade_name,
  case
    when legacy.status = 'pending' then 'pending'
    when legacy.status = 'pending_cnpj_lookup' then 'pending'
    when legacy.status = 'approved' then 'approved'
    when legacy.status = 'rejected' then 'rejected'
    when legacy.status = 'canceled' then 'cancelled'
    else 'pending'
  end as status,
  case
    when coalesce(legacy.cnpj_lookup_provider, '') <> '' then 'public_lookup'
    else 'manual'
  end as lookup_mode,
  legacy.tax_status,
  legacy.opened_at,
  legacy.main_activity,
  legacy.official_email,
  legacy.official_phone,
  legacy.official_street,
  legacy.official_number,
  legacy.official_complement,
  legacy.official_district,
  legacy.official_city,
  legacy.official_state,
  legacy.official_zip_code,
  legacy.responsible_name as contact_name,
  null as contact_role,
  legacy.responsible_email as contact_email,
  null as contact_phone,
  legacy.responsible_whatsapp as contact_whatsapp,
  to_jsonb(coalesce(legacy.expected_modules, '{}'::text[])) as requested_modules,
  legacy.message as notes_from_applicant,
  legacy.review_notes as admin_notes,
  case when legacy.status = 'rejected' then legacy.review_notes else null end as rejection_reason,
  case when legacy.status = 'approved' then legacy.reviewed_at else null end as approved_at,
  case when legacy.status = 'rejected' then legacy.reviewed_at else null end as rejected_at,
  legacy.created_at,
  legacy.updated_at,
  coalesce(legacy.reviewed_at, legacy.updated_at, legacy.created_at) as last_status_change_at
from saas_company_signup_requests legacy
where not exists (
  select 1
  from company_signups current
  where current.cnpj = legacy.cnpj_digits
);
