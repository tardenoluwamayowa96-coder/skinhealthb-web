create table if not exists profiles (
  user_id text primary key,
  role text not null default 'customer',
  full_name text,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists brands (
  id serial primary key,
  slug text unique not null,
  name text not null,
  country text,
  verified boolean not null default true
);

create table if not exists categories (
  id serial primary key,
  slug text unique not null,
  name text not null,
  description text,
  sort_order int not null default 0
);

create table if not exists products (
  id serial primary key,
  slug text unique not null,
  name text not null,
  brand_id int not null references brands(id),
  category_id int not null references categories(id),
  description text not null,
  ingredients text,
  usage_tips text,
  precautions text,
  format_label text,
  origin text,
  authenticity_note text,
  price_xof int not null,
  compare_at_xof int,
  stock int not null default 0,
  sku text unique,
  image_url text not null,
  skin_types text,
  hair_types text,
  is_featured boolean not null default false,
  is_new boolean not null default false,
  is_bestseller boolean not null default false,
  is_active boolean not null default true,
  lot_number text,
  expires_on date,
  created_at timestamptz not null default now()
);

create index if not exists products_brand_id_idx on products (brand_id);
create index if not exists products_category_id_idx on products (category_id);
create index if not exists products_active_idx on products (is_active);

create table if not exists addresses (
  id serial primary key,
  user_id text not null,
  label text,
  recipient text not null,
  phone text not null,
  zone text not null,
  city text not null,
  details text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists addresses_user_id_idx on addresses (user_id);

create table if not exists favorites (
  user_id text not null,
  product_id int not null references products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

create table if not exists orders (
  id serial primary key,
  public_ref text unique not null,
  user_id text not null,
  status text not null default 'pending_payment',
  payment_network text,
  payment_phone text,
  paygate_identifier text,
  paygate_tx_reference text,
  payment_status text not null default 'pending',
  subtotal_xof int not null,
  delivery_xof int not null,
  total_xof int not null,
  zone text not null,
  recipient text not null,
  phone text not null,
  city text not null,
  address_details text not null,
  notes text,
  created_at timestamptz not null default now(),
  paid_at timestamptz,
  updated_at timestamptz not null default now()
);
create index if not exists orders_user_id_idx on orders (user_id);
create index if not exists orders_status_idx on orders (status);

create table if not exists order_items (
  id serial primary key,
  order_id int not null references orders(id) on delete cascade,
  product_id int,
  name text not null,
  brand_name text,
  qty int not null,
  unit_price_xof int not null,
  image_url text
);

create table if not exists order_events (
  id serial primary key,
  order_id int not null references orders(id) on delete cascade,
  status text not null,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists site_settings (
  key text primary key,
  value text not null
);

create table if not exists messages (
  id serial primary key,
  user_id text,
  name text not null,
  phone text,
  email text,
  body text not null,
  created_at timestamptz not null default now()
);
