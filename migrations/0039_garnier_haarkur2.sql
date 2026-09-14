-- Masques 1 minute Reiswasser + Raisin — 4 500 F.

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values

(211, 'garnier-ws-kur-reiswasser', 'Masque 1 minute Eau de riz 72h', 30, 3,
 $d$Garnier Wahre Schätze 1-Minute Haarkur Reiswasser Ritual & Stärke, 300 ml. Lissage jusqu'à 72 h, 97 % d'origine naturelle. Cheveux mi-longs à longs.$d$,
 $d$Aqua, cetearyl alcohol, rice water, parfum. 97 % d'ingrédients d'origine naturelle. Liste complète sur le pot.$d$,
 $d$Après le shampoing, longueurs et pointes. 1 minute, rincer. 1 à 2 fois par semaine.$d$,
 $d$Usage externe. Éviter les yeux. Rincer abondamment.$d$,
 '300 ml', 'Allemagne', 'Pot Garnier Wahre Schätze 1-Minute Haarkur Reiswasser d''origine, lot photographié.',
 4500, null, 20, 'SHB-GA-KR300', '/products/garnier-ws-kur-reiswasser.jpg?v=31',
 null, 'mi-long,long,tous', true, true, true, true, 'G26-KR300', '2028-06-30'),

(212, 'garnier-ws-kur-traube', 'Masque 1 minute Raisin Hydraboost', 30, 3,
 $d$Garnier Wahre Schätze 1-Minute Haarkur Traube Hydraboost, 300 ml. Régénération intense, eau de raisin. Cheveux assoiffés — duo du shampoing Hydraboost.$d$,
 $d$Aqua, cetearyl alcohol, grape water, grape seed oil, parfum. Liste complète sur le pot.$d$,
 $d$Après le shampoing Raisin Hydraboost, longueurs et pointes. 1 minute, rincer.$d$,
 $d$Usage externe. Éviter les yeux. Rincer abondamment.$d$,
 '300 ml', 'Allemagne', 'Pot Garnier Wahre Schätze 1-Minute Haarkur Traube d''origine, lot photographié.',
 4500, null, 20, 'SHB-GA-KT300', '/products/garnier-ws-kur-traube.jpg?v=31',
 null, 'sec,assoiffé,tous', true, true, true, true, 'G26-KT300', '2028-06-30')

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
