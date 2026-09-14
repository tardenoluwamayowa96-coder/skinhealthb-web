-- Masques 1 minute Garnier Wahre Schätze — 4 500 F le pot.

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values

(207, 'garnier-ws-kur-kokos', 'Masque 1 minute Coco & macadamia', 30, 3,
 $d$Garnier Wahre Schätze 1-Minute Haarkur Kokosmilch & Macadamia, 300 ml. Masque souplesse, sans silicone, 97 % d'origine naturelle. Cheveux secs à très secs — 1 minute, rincer.$d$,
 $d$Aqua, cetearyl alcohol, coconut milk, macadamia seed oil, parfum. Sans silicones. 97 % d'ingrédients d'origine naturelle. Liste complète sur le pot.$d$,
 $d$Après le shampoing, cheveux essorés, longueurs et pointes. 1 minute, rincer. 1 à 2 fois par semaine.$d$,
 $d$Usage externe. Éviter les yeux. Rincer abondamment.$d$,
 '300 ml', 'Allemagne', 'Pot Garnier Wahre Schätze 1-Minute Haarkur Kokos d''origine, lot photographié.',
 4500, null, 20, 'SHB-GA-KK300', '/products/garnier-ws-kur-kokos.jpg?v=30',
 null, 'sec,très sec,tous', true, true, true, true, 'G26-KK300', '2028-06-30'),

(208, 'garnier-ws-kur-argan', 'Masque 1 minute Argan & camélia', 30, 3,
 $d$Garnier Wahre Schätze 1-Minute Haarkur Argan & Camelia, 300 ml. Masque éclat, 97 % d'origine naturelle. Cheveux secs, ternes — 1 minute pour le brillant.$d$,
 $d$Aqua, cetearyl alcohol, argan oil, camellia oil, parfum. 97 % d'ingrédients d'origine naturelle. Liste complète sur le pot.$d$,
 $d$Après le shampoing, longueurs et pointes. 1 minute, rincer. 1 à 2 fois par semaine.$d$,
 $d$Usage externe. Éviter les yeux. Rincer abondamment.$d$,
 '300 ml', 'Allemagne', 'Pot Garnier Wahre Schätze 1-Minute Haarkur Argan d''origine, lot photographié.',
 4500, null, 20, 'SHB-GA-KA300', '/products/garnier-ws-kur-argan.jpg?v=30',
 null, 'sec,terne,tous', true, true, true, true, 'G26-KA300', '2028-06-30'),

(209, 'garnier-ws-kur-avocado', 'Masque 1 minute Avocat & karité', 30, 3,
 $d$Garnier Wahre Schätze 1-Minute Haarkur Avocado-Öl & Shea, 300 ml. Nutrition intense, sans silicone. Cheveux très secs, bouclés ou épais — le masque express du climat de Lomé.$d$,
 $d$Aqua, cetearyl alcohol, avocado oil, shea butter, parfum. Sans silicones. Liste complète sur le pot.$d$,
 $d$Après le shampoing, longueurs et pointes. 1 minute, rincer. 1 à 2 fois par semaine.$d$,
 $d$Usage externe. Éviter les yeux. Contient du beurre de karité.$d$,
 '300 ml', 'Allemagne', 'Pot Garnier Wahre Schätze 1-Minute Haarkur Avocado d''origine, lot photographié.',
 4500, null, 20, 'SHB-GA-KV300', '/products/garnier-ws-kur-avocado.jpg?v=30',
 null, 'très sec,bouclé,épais', true, true, true, true, 'G26-KV300', '2028-06-30'),

(210, 'garnier-ws-kur-honig', 'Masque 1 minute 3 miels', 30, 3,
 $d$Garnier Wahre Schätze 1-Minute Haarkur 3 Honige, 400 ml. Répare cheveux abîmés et cassants, 97 % d'origine naturelle. Le plus grand pot de la gamme — 4 500 F.$d$,
 $d$Aqua, cetearyl alcohol, honey, parfum. 97 % d'ingrédients d'origine naturelle. Liste complète sur le pot.$d$,
 $d$Après le shampoing, longueurs et pointes. 1 minute, rincer. 1 à 2 fois par semaine.$d$,
 $d$Usage externe. Contient du miel : déconseillé en cas d'allergie connue aux produits de la ruche. Éviter les yeux.$d$,
 '400 ml', 'Allemagne', 'Pot Garnier Wahre Schätze 1-Minute Haarkur 3 Honige d''origine, lot photographié.',
 4500, null, 20, 'SHB-GA-KH400', '/products/garnier-ws-kur-honig.jpg?v=30',
 null, 'abîmé,cassant,tous', true, true, true, true, 'G26-KH400', '2028-06-30')

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
