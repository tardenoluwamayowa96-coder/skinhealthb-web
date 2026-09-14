-- E-mail boutique : skinhealth63@gmail.com

insert into site_settings (key, value) values
  ('store_email', 'skinhealth63@gmail.com')
on conflict (key) do update set value = excluded.value;
