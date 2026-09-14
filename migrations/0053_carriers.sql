-- Transporteurs alternatifs : Nagode, Poste, Gozem, retrait boutique.

alter table orders add column if not exists carrier_id text not null default 'nagode';

update orders set carrier_id = 'nagode' where carrier_id is null or carrier_id = '';
