-- Le compte boutique (e-mail Skinhealthb) est toujours administrateur.

insert into site_settings (key, value) values ('admin_pin', '92907501')
on conflict (key) do nothing;

update profiles p
set role = 'admin'
from "user" u
where u.id = p.user_id
  and lower(u.email) in ('skinhealth63@gmail.com', 'skinhealthb63@gmail.com');

insert into profiles (user_id, role, full_name)
select u.id, 'admin', coalesce(u.name, 'Skinhealthb')
from "user" u
where lower(u.email) in ('skinhealth63@gmail.com', 'skinhealthb63@gmail.com')
  and not exists (select 1 from profiles p where p.user_id = u.id);
