insert into site_settings (key, value) values
  ('store_email', 'Skinhealthb63@gmail.com')
on conflict (key) do update set value = excluded.value;
