-- Owner asked to drop the previous Weleda / lavera packshots.

delete from products
where slug in (
  'weleda-skin-food',
  'weleda-granatapfel',
  'lavera-hydro',
  'lavera-basis'
);

delete from brands
where slug in ('weleda', 'lavera')
  and not exists (
    select 1 from products p where p.brand_id = brands.id
  );

update site_settings
set value = 'Nouveau rayon dm · Acnemy, INAO, Nø, nerds, G&G, Nivea Q10 · tarif web x 656 F'
where key = 'announcement';
