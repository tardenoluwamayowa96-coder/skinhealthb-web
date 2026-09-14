insert into site_settings (key, value) values
  ('flooz_number', '+22896836021'),
  ('tmoney_number', '+22892907501')
on conflict (key) do update set value = excluded.value;
