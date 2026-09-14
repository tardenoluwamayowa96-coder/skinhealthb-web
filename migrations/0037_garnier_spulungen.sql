-- Après-shampoings Garnier Wahre Schätze — 2 500 F l'unité.
-- Coco déjà en 0036 à 3 500 F : aligné ici.

update products
set price_xof = 2500,
    image_url = '/products/garnier-ws-kokos.jpg?v=29'
where slug = 'garnier-ws-kokos';

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values

(204, 'garnier-ws-traube-spulung', 'Après-shampoing Raisin Hydraboost', 30, 3,
 $d$Garnier Wahre Schätze Traube Hydraboost, après-shampoing 200 ml. Eau de raisin + huile de pépins. Démêle, hydrate, éclat — cheveux assoiffés. Duo du shampoing Hydraboost.$d$,
 $d$Aqua, cetearyl alcohol, grape water, grape seed oil, parfum. Liste complète sur le flacon.$d$,
 $d$Après le shampoing Raisin Hydraboost, appliquer sur cheveux essorés, 2–3 min, rincer.$d$,
 $d$Usage externe. Éviter les yeux. Rincer abondamment.$d$,
 '200 ml', 'Allemagne', 'Flacon Garnier Wahre Schätze Traube Hydraboost Spülung d''origine, lot photographié.',
 2500, null, 24, 'SHB-GA-WTS200', '/products/garnier-ws-traube-spulung.jpg?v=29',
 null, 'sec,assoiffé,tous', true, true, true, true, 'G26-WTS200', '2028-06-30'),

(205, 'garnier-ws-reiswasser', 'Après-shampoing Eau de riz & force', 30, 3,
 $d$Garnier Wahre Schätze Reiswasser Ritual & Stärke, après-shampoing lissant 200 ml. Sans silicone, 97 % d'origine naturelle. Brillance jusqu'à 72 h, cheveux mi-longs à longs.$d$,
 $d$Aqua, cetearyl alcohol, rice water, parfum. Sans silicones. 97 % d'ingrédients d'origine naturelle. Liste complète sur le flacon.$d$,
 $d$Après le shampoing, longueurs et pointes, 2–3 min, rincer. Cheveux moyens à longs.$d$,
 $d$Usage externe. Éviter les yeux. Rincer abondamment.$d$,
 '200 ml', 'Allemagne', 'Flacon Garnier Wahre Schätze Reiswasser Ritual Spülung d''origine, lot photographié.',
 2500, null, 24, 'SHB-GA-WR200', '/products/garnier-ws-reiswasser.jpg?v=29',
 null, 'mi-long,long,tous', true, true, false, true, 'G26-WR200', '2028-06-30'),

(206, 'garnier-ws-avocado', 'Après-shampoing Avocat & karité', 30, 3,
 $d$Garnier Wahre Schätze Pures Avocado-Öl & Shea Butter, après-shampoing nourrissant 200 ml. Sans silicone. Cheveux très secs, ondulés, bouclés ou épais — le soin du climat de Lomé.$d$,
 $d$Aqua, cetearyl alcohol, avocado oil, shea butter, parfum. Sans silicones. Liste complète sur le flacon.$d$,
 $d$Après le shampoing, cheveux essorés, longueurs et pointes. 2–3 min, rincer. 2 à 3 fois par semaine.$d$,
 $d$Usage externe. Éviter les yeux. Contient du beurre de karité : patch-test si allergie connue.$d$,
 '200 ml', 'Allemagne', 'Flacon Garnier Wahre Schätze Avocado-Öl & Shea Spülung d''origine, lot photographié.',
 2500, null, 24, 'SHB-GA-WA200', '/products/garnier-ws-avocado.jpg?v=29',
 null, 'très sec,bouclé,épais', true, true, true, true, 'G26-WA200', '2028-06-30')

on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  ingredients = excluded.ingredients,
  usage_tips = excluded.usage_tips,
  precautions = excluded.precautions,
  format_label = excluded.format_label,
  origin = excluded.origin,
  authenticity_note = excluded.authenticity_note,
  price_xof = excluded.price_xof,
  stock = excluded.stock,
  sku = excluded.sku,
  image_url = excluded.image_url,
  hair_types = excluded.hair_types,
  is_featured = true,
  is_new = true,
  is_active = true;

select setval('products_id_seq', (select max(id) from products));
