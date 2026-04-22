insert into organizations (
  id, legal_name, trade_name, cnpj, email, phone, whatsapp, plan_code, status
) values (
  '11111111-1111-1111-1111-111111111111',
  'Reciclativa Gestão Ambiente de Testes Ltda',
  'Reciclativa Teste',
  '12.345.678/0001-90',
  'contato@reciclativa-teste.local',
  '(21) 3000-0000',
  '(21) 99999-0000',
  'starter',
  'active'
)
on conflict do nothing;

insert into organization_units (
  id, organization_id, name, code, phone, whatsapp, email, city, state, is_headquarters, is_active
) values (
  '22222222-2222-2222-2222-222222222222',
  '11111111-1111-1111-1111-111111111111',
  'Matriz',
  'MATRIZ',
  '(21) 3000-0001',
  '(21) 99999-0001',
  'matriz@reciclativa-teste.local',
  'Itaboraí',
  'RJ',
  true,
  true
)
on conflict do nothing;
