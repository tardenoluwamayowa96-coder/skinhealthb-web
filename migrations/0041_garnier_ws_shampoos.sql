-- Shampoing Coco & macadamia 3 500 F (l'après-shampoing reste garnier-ws-kokos).
-- Packshot Raisin Hydraboost rafraîchi.

update products
set image_url = '/products/garnier-ws-traube.jpg?v=33',
    is_new = true,
    is_active = true,
    price_xof = 3500
where slug = 'garnier-ws-traube';

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values

(217, 'garnier-ws-kokos-shampoo', 'Shampoing Lait de coco & macadamia', 30, 3,
 $d$Garnier Wahre Schätze Pflegendes Shampoo Kokosmilch & Macadamia, 250 ml. Sans silicone. Lait de coco + huile de macadamia : souplesse, nutrition — cheveux normaux à secs, climat de Lomé. Flacon 100 % plastique recyclé. Duo de l'après-shampoing coco.$d$,
 $d$Aqua, surfactants, coconut milk, macadamia seed oil, parfum. Sans silicones. Huiles naturelles. Liste complète sur le flacon.$d$,
 $d$Cheveux mouillés, faire mousser, rincer. Enchaîner avec l'après-shampoing ou le masque 1 minute coco-macadamia.$d$,
 $d$Usage externe. Éviter les yeux. Rincer abondamment.$d$,
 '250 ml', 'Allemagne', 'Flacon Garnier Wahre Schätze Kokosmilch & Macadamia Shampoo d''origine, lot photographié.',
 3500, null, 24, 'SHB-GA-WKS250', '/products/garnier-ws-kokos-shampoo.jpg?v=33',
 null, 'normal,sec,tous', true, true, true, true, 'G26-WKS250', '2028-06-30')

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
