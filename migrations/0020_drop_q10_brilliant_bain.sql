-- Retirer : dentifrice Brilliant White, crème Q10 extra-lift, bains de bouche.

delete from products
where slug in (
  'dontodent-brilliant',
  'nivea-q10',
  'dontodent-bain-bouche',
  'dontodent-bain-sensitive'
);

delete from brands
where slug = 'nivea'
  and not exists (
    select 1 from products p where p.brand_id = brands.id
  );

update categories
set description = 'Dentifrice et pique-dents Dontodent — import dm Allemagne.'
where slug = 'dentaire';

update site_settings
set value = 'Nouveau rayon dm · Acnemy, INAO, Nø, nerds, G&G · tarif web x 656 F'
where key = 'announcement';
