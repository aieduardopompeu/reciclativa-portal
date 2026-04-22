insert into inventory_locations (
  id, organization_id, unit_id, name, code, is_active
) values (
  '99999999-9999-9999-9999-999999999999',
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  'Pátio Principal',
  'PATIO-01',
  true
)
on conflict do nothing;
