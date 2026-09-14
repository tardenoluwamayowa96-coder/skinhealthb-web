-- Shampoings miel + eau de riz 2 500 F.
-- Charbon et avocat : packshots + alignés à 2 500 F (lot photo).

update products set
  image_url = '/products/garnier-ws-kohle.jpg?v=36',
  price_xof = 2500,
  is_new = true,
  is_active = true
where slug = 'garnier-ws-kohle';

update products set
  image_url = '/products/garnier-ws-avocado-shampoo.jpg?v=36',
  price_xof = 2500,
  is_new = true,
  is_active = true
where slug = 'garnier-ws-avocado-shampoo';

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values

(219, 'garnier-ws-honig-shampoo', 'Shampoing réparateur 3 miels', 30, 3,
 $d$Garnier Wahre Schätze Honig Schätze, shampoing réparateur 250 ml. Acacia, manuka, lavande. 94 % d'origine naturelle. Répare cassures, fourches, brosse — cheveux abîmés, cassants. Duo du masque et du leave-in 3 miels.$d$,
 $d$Aqua, surfactants, honey (acacia, manuka, lavender), parfum. 94 % d'ingrédients d'origine naturelle. Liste complète sur le flacon.$d$,
 $d$Cheveux mouillés, faire mousser, rincer. Enchaîner avec le masque 1 minute 3 miels ou le leave-in.$d$,
 $d$Usage externe. Contient du miel : déconseillé en cas d'allergie aux produits de la ruche. Éviter les yeux.$d$,
 '250 ml', 'Allemagne', 'Flacon Garnier Wahre Schätze Honig Schätze Shampoo d''origine, lot photographié.',
 2500, null, 24, 'SHB-GA-WHS250', '/products/garnier-ws-honig-shampoo.jpg?v=36',
 null, 'abîmé,cassant,fourches', true, true, true, true, 'G26-WHS250', '2028-06-30'),

(220, 'garnier-ws-reiswasser-shampoo', 'Shampoing Eau de riz & force', 30, 3,
 $d$Garnier Wahre Schätze Reiswasser Ritual & Stärke, shampoing lissant 250 ml. Sans silicone, 94 % d'origine naturelle. Brillance jusqu'à 72 h, cheveux mi-longs à longs. Duo de l'après-shampoing eau de riz.$d$,
 $d$Aqua, surfactants, rice water, parfum. Sans silicones. 94 % d'ingrédients d'origine naturelle. Liste complète sur le flacon.$d$,
 $d$Cheveux mouillés, faire mousser, rincer. Enchaîner avec l'après-shampoing ou le masque 1 minute eau de riz.$d$,
 $d$Usage externe. Éviter les yeux. Rincer abondamment.$d$,
 '250 ml', 'Allemagne', 'Flacon Garnier Wahre Schätze Reiswasser Ritual Shampoo d''origine, lot photographié.',
 2500, null, 24, 'SHB-GA-WRS250', '/products/garnier-ws-reiswasser-shampoo.jpg?v=36',
 null, 'mi-long,long,tous', true, true, true, true, 'G26-WRS250', '2028-06-30')

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
