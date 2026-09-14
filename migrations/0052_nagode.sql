-- Intégration colis Nagode Transfert : suivi + mode API ou dispatch agence.

alter table orders add column if not exists nagode_tracking text;
alter table orders add column if not exists nagode_status text;
alter table orders add column if not exists nagode_mode text;
alter table orders add column if not exists nagode_booked_at timestamptz;

create unique index if not exists orders_nagode_tracking_uidx
  on orders (nagode_tracking)
  where nagode_tracking is not null;
