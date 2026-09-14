-- Retirer : Fructis Aloe Hydra Bomb, dentifrices Dontodent,
-- Bi-Oil 125 ml, lait corps réparateur Mixa.

delete from products
where slug in (
  'garnier-fructis-aloe',
  'dontodent-dentifrice',
  'dontodent-sensitive',
  'bi-oil-125',
  'mixa-lait-reparateur'
);

delete from brands
where slug = 'bi-oil'
  and not exists (
    select 1 from products p where p.brand_id = brands.id
  );

update categories
set description = 'Pique-dents fil dentaire Dontodent — import dm Allemagne.'
where slug = 'dentaire';
