create table if not exists shipment_items (
  id uuid primary key default gen_random_uuid(),
  shipment_id uuid not null references shipments(id) on delete cascade,
  material_id uuid not null references materials(id) on delete restrict,
  quantity numeric(14,3) not null,
  unit_price numeric(14,2) not null default 0,
  total_price numeric(14,2) not null default 0,
  location_id uuid references inventory_locations(id) on delete set null,
  notes text
);

create index if not exists shipment_items_shipment_idx on shipment_items (shipment_id);
create index if not exists shipment_items_material_idx on shipment_items (material_id);
create index if not exists shipment_items_location_idx on shipment_items (location_id);
