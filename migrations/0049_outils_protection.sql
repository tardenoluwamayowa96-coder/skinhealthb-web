-- Rayon Outils de protection (gants, bonnets, spatules, UV).

insert into categories (id, slug, name, description, sort_order) values
  (11, 'outils-protection', 'Outils de protection',
   'Gants, bonnets, spatules, protections UV et outils d''application — lots photographiés.', 11)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  sort_order = excluded.sort_order;

select setval('categories_id_seq', (select max(id) from categories));
