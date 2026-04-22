insert into material_categories (
  id, organization_id, name, code, is_active
) values
(
  '55555555-5555-5555-5555-555555555555',
  '11111111-1111-1111-1111-111111111111',
  'Plásticos',
  'PLAST',
  true
),
(
  '66666666-6666-6666-6666-666666666666',
  '11111111-1111-1111-1111-111111111111',
  'Metais',
  'METAIS',
  true
)
on conflict do nothing;

insert into materials (
  id, organization_id, category_id, code, name, unit_of_measure, is_active
) values
(
  '77777777-7777-7777-7777-777777777777',
  '11111111-1111-1111-1111-111111111111',
  '55555555-5555-5555-5555-555555555555',
  'PET-PRENSADO',
  'PET Prensado',
  'kg',
  true
),
(
  '88888888-8888-8888-8888-888888888888',
  '11111111-1111-1111-1111-111111111111',
  '66666666-6666-6666-6666-666666666666',
  'ALUMINIO',
  'Alumínio',
  'kg',
  true
)
on conflict do nothing;
