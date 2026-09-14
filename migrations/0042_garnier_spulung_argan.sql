-- Après-shampoings Garnier Wahre Schätze : packshots + Argan & camélia 2 500 F.

update products set
  image_url = '/products/garnier-ws-traube-spulung.jpg?v=34',
  price_xof = 2500,
  is_new = true,
  is_active = true
where slug = 'garnier-ws-traube-spulung';

update products set
  image_url = '/products/garnier-ws-reiswasser.jpg?v=34',
  price_xof = 2500,
  is_new = true,
  is_active = true
where slug = 'garnier-ws-reiswasser';

update products set
  image_url = '/products/garnier-ws-avocado.jpg?v=34',
  price_xof = 2500,
  is_new = true,
  is_active = true
where slug = 'garnier-ws-avocado';

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values

(218, 'garnier-ws-argan-spulung', 'Après-shampoing Argan & camélia', 30, 3,
 $d$Garnier Wahre Schätze Pflegende Spülung Argan & Camelia-Öl, 200 ml. Sans silicone, 97 % d'origine naturelle. Démêle, brillance, souplesse — cheveux secs, ternes. Duo du masque 1 minute Argan.$d$,
 $d$Aqua, cetearyl alcohol, argania spinosa kernel oil, camellia oleifera seed oil, parfum. Sans silicones. 97 % d'ingrédients d'origine naturelle. Liste complète sur le flacon.$d$,
 $d$Après le shampoing, cheveux essorés, longueurs et pointes. 2–3 min, rincer. 2 à 3 fois par semaine.$d$,
 $d$Usage externe. Éviter les yeux. Rincer abondamment.$d$,
 '200 ml', 'Allemagne', 'Flacon Garnier Wahre Schätze Argan & Camelia-Öl Spülung d''origine, lot photographié.',
 2500, null, 24, 'SHB-GA-WAR200', '/products/garnier-ws-argan-spulung.jpg?v=34',
 null, 'sec,terne,tous', true, true, true, true, 'G26-WAR200', '2028-06-30')

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
