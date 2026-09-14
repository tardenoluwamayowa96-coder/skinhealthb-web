-- Dentifrice Dontodent : tarif boutique demandé 900 F.
-- compare_at 1 500 F = promo lisible.

update products
set price_xof = 900, compare_at_xof = 1500,
    image_url = '/products/dontodent-dentifrice.jpg?v=9'
where slug = 'dontodent-dentifrice';

update products
set price_xof = 900, compare_at_xof = 1500,
    image_url = '/products/dontodent-sensitive.jpg?v=9'
where slug = 'dontodent-sensitive';

update products
set price_xof = 900, compare_at_xof = 1500,
    image_url = '/products/dontodent-brilliant.jpg?v=9'
where slug = 'dontodent-brilliant';

update products
set image_url = '/products/dontodent-bain-bouche.jpg?v=9'
where slug = 'dontodent-bain-bouche';

update products
set image_url = '/products/dontodent-pique-dents.jpg?v=9'
where slug = 'dontodent-pique-dents';

update products
set image_url = '/products/dontodent-bain-sensitive.jpg?v=9'
where slug = 'dontodent-bain-sensitive';
