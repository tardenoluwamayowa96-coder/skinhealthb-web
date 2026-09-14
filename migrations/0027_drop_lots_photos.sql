-- Retirer les lots photographiés récemment : vitamines, crèmes douche Balea,
-- Tesori Hammam, déo, savons, Dontodent Kräuter/Clear Fresh, cire tiède.

delete from products
where slug in (
  'mivolis-multimineral',
  'mivolis-eisen-vitc',
  'mivolis-multivitamin',
  'altapharma-multi-mineral',
  'altapharma-multivitamin',
  'altapharma-vitamin-c',
  'altapharma-vitamin-b12',
  'altapharma-magnesium',
  'balea-buttermilk-lemon',
  'balea-pure-softness',
  'balea-mandel-magnolie',
  'balea-milch-honig',
  'balea-sweet-embrace',
  'balea-vanille-kokos',
  'balea-sensitive-aloe',
  'tesori-hammam-douche',
  'tesori-hammam-peeling',
  'balea-deo-sensitive',
  'balea-seife-milch-honig',
  'balea-seife-sensitive',
  'dontodent-krauter',
  'dontodent-clear-fresh',
  'balea-warmwachs-perlen'
);

delete from brands
where slug in ('mivolis', 'altapharma', 'tesori-d-oriente')
  and not exists (
    select 1 from products p where p.brand_id = brands.id
  );

delete from categories
where slug = 'complements'
  and not exists (
    select 1 from products p where p.category_id = categories.id
  );

update site_settings
set value = 'Rayon Lomé · LRP, Tiam, Althea, Avène, Medicube PDRN · prix sourcés'
where key = 'announcement';
