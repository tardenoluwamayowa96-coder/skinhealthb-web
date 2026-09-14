alter table orders add column if not exists stock_held boolean not null default false;

create table if not exists stock_movements (
  id serial primary key,
  product_id int not null references products(id),
  qty int not null,
  reason text not null,
  order_id int references orders(id) on delete set null,
  note text,
  created_at timestamptz not null default now()
);
create index if not exists stock_movements_product_idx on stock_movements (product_id, created_at desc);
create index if not exists stock_movements_order_idx on stock_movements (order_id);
create index if not exists orders_stock_held_idx on orders (stock_held) where stock_held = true;
