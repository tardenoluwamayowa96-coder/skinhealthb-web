-- Retirer : S-O-S Anti-Pickel, toute L'Oréal Paris, vitamines altapharma,
-- shampoings Evoluderm karité/argan, crème douche + gel lavant Mixa,
-- Vaseline Intensive Care, Mixa Urea Cica Repair+ lait corps.

delete from products
where slug in (
  'sos-antipickel',
  'loreal-laser',
  'loreal-filler',
  'loreal-vitc-glow',
  'loreal-age-perfect',
  'rossmann-vit-c',
  'rossmann-magnesium',
  'rossmann-multi',
  'rossmann-calcium',
  'evoluderm-karite',
  'evoluderm-argan',
  'mixa-creme-douche',
  'mixa-gel-bebe',
  'mixa-cica-400',
  'vaseline-cocoa-400',
  'vaseline-advanced-repair'
);

delete from brands
where slug in ('loreal', 'sos', 'rossmann')
  and not exists (
    select 1 from products p where p.brand_id = brands.id
  );

delete from categories
where slug = 'vitamines'
  and not exists (
    select 1 from products p where p.category_id = categories.id
  );

update site_settings
set value = 'Rayon Lomé · LRP, Tiam, Althea, Avène, Medicube PDRN · prix sourcés'
where key = 'announcement';
