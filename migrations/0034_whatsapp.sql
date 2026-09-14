insert into site_settings (key, value) values
  ('whatsapp', '+22892907501')
on conflict (key) do update set value = excluded.value;
