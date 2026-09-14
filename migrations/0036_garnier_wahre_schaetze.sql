-- Garnier Wahre Schätze (Ultimate Blends DE) — 3 500 F l'unité.

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values

(202, 'garnier-ws-kokos', 'Après-shampoing Lait de coco & macadamia', 30, 3,
 $d$Garnier Wahre Schätze Pflegende Spülung Kokosmilch & Macadamia, 200 ml. Après-shampoing sans silicone, 97 % d'origine naturelle. Démêle, nourrit, souplesse — cheveux normaux à secs, climat de Lomé.$d$,
 $d$Aqua, cetearyl alcohol, behentrimonium chloride, coconut milk, macadamia seed oil, parfum. Sans silicones. 97 % d'ingrédients d'origine naturelle. Liste complète sur le flacon.$d$,
 $d$Après le shampoing, appliquer sur cheveux essorés, des longueurs aux pointes. 2–3 min, rincer. 2 à 3 fois par semaine.$d$,
 $d$Usage externe. Éviter les yeux. Rincer abondamment. Ceci n'est pas un médicament.$d$,
 '200 ml', 'Allemagne', 'Flacon Garnier Wahre Schätze Kokosmilch & Macadamia d''origine, lot photographié.',
 3500, null, 24, 'SHB-GA-WK200', '/products/garnier-ws-kokos.jpg?v=28',
 null, 'normal,sec,tous', true, true, true, true, 'G26-WK200', '2028-06-30'),

(203, 'garnier-ws-traube', 'Shampoing Raisin Hydraboost', 30, 3,
 $d$Garnier Wahre Schätze Traube Hydraboost, shampoing 250 ml. Eau de raisin + huile de pépins de raisin. Jusqu'à 4 jours d'hydratation, cheveux assoiffés. Flacon 100 % plastique recyclé.$d$,
 $d$Aqua, sodium laureth sulfate, grape water, grape seed oil, glycerin, parfum. Liste complète sur le flacon.$d$,
 $d$Cheveux mouillés, faire mousser, rincer. Enchaîner avec l'après-shampoing coco-macadamia si longueurs sèches.$d$,
 $d$Usage externe. Éviter les yeux. Rincer abondamment.$d$,
 '250 ml', 'Allemagne', 'Flacon Garnier Wahre Schätze Traube Hydraboost d''origine, lot photographié.',
 3500, null, 24, 'SHB-GA-WT250', '/products/garnier-ws-traube.jpg?v=28',
 null, 'sec,assoiffé,tous', true, true, true, true, 'G26-WT250', '2028-06-30')

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
