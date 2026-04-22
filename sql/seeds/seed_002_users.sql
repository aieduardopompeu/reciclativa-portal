insert into saas_users (
  id, organization_id, unit_id, name, email, role, is_active
) values
(
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  'Admin Organização',
  'admin@reciclativa-teste.local',
  'org_admin',
  true
),
(
  '44444444-4444-4444-4444-444444444444',
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  'Operador Teste',
  'operador@reciclativa-teste.local',
  'operator',
  true
)
on conflict do nothing;