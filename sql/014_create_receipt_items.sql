create table if not exists receipt_items (
  id uuid primary key default gen_random_uuid(),
  receipt_id uuid not null references receipts(id) on delete cascade,
  material_id uuid not null references materials(id) on delete restrict,
  quantity numeric(14,3) not null,
  unit_price numeric(14,2) not null default 0,
  total_price numeric(14,2) not null default 0,
  location_id uuid references inventory_locations(id) on delete set null,
  xml_item_ref text,
  notes text
);

create index if not exists receipt_items_receipt_idx on receipt_items (receipt_id);
create index if not exists receipt_items_material_idx on receipt_items (material_id);
create index if not exists receipt_items_location_idx on receipt_items (location_id);
