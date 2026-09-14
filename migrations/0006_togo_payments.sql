insert into site_settings (key, value) values
  ('flooz_number', '+22896836021'),
  ('tmoney_number', '+22892907501')
on conflict (key) do update set value = excluded.value;

update site_settings
set value = 'Livraison dans tout le Togo · Flooz 96 83 60 21 · TMoney 92 90 75 01'
where key = 'announcement';

insert into site_settings (key, value) values
  ('store_phone', '+22896836021')
on conflict (key) do update set
  value = case when site_settings.value = '' then excluded.value else site_settings.value end;
