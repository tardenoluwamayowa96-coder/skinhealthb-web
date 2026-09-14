-- Savons crème Balea 150 g — 700 F l'unité, lots photographiés.

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values

(162, 'balea-seife-milch-honig', 'Savon crème Lait & miel', 29, 2,
 $d$Savon crème Balea Milch & Honig 150 g. Pain crémeux au lait et au miel : mousse douce, confort des peaux normales à sèches. Import dm Allemagne — 700 F le pain.$d$,
 $d$Sodium palmate, sodium palm kernelate, aqua, glycerin, parfum lait-miel, miel. Liste complète sur l'emballage.$d$,
 $d$Mouiller, frotter le pain, faire mousser, rincer. Visage et corps. Compléter avec un lait si peau sèche.$d$,
 $d$Usage externe. Éviter les yeux. Contient du miel : déconseillé en cas d'allergie connue aux produits de la ruche.$d$,
 '150 g', 'Allemagne', 'Pain Balea Milch & Honig Cremeseife d''origine dm, lot photographié.',
 700, null, 48, 'SHB-BL-SMH150', '/products/balea-seife-milch-honig.jpg?v=21',
 'normale,sèche,tous', null, false, true, true, true, 'B26-511', '2028-06-30'),

(163, 'balea-seife-sensitive', 'Savon crème Sensitive Aloe Vera', 29, 2,
 $d$Savon crème Balea Sensitive 150 g à l'extrait d'aloe vera. Pain végan, pensé pour les peaux sensibles. Import dm — 700 F le pain.$d$,
 $d$Sodium palmate, sodium palm kernelate, aqua, glycerin, aloe barbadensis leaf extract. Végan. Liste complète sur l'emballage.$d$,
 $d$Mouiller, frotter, faire mousser, rincer. Convient aux peaux sensibles. Visage et corps.$d$,
 $d$Usage externe. Éviter les yeux. Patch-test si peau très réactive.$d$,
 '150 g', 'Allemagne', 'Pain Balea Sensitive Cremeseife d''origine dm, lot photographié.',
 700, null, 48, 'SHB-BL-SSA150', '/products/balea-seife-sensitive.jpg?v=21',
 'sensible,normale,tous', null, false, true, true, true, 'B26-512', '2028-06-30')

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
  image_url = excluded.image_url,
  skin_types = excluded.skin_types,
  is_featured = excluded.is_featured,
  is_new = true,
  is_bestseller = excluded.is_bestseller,
  is_active = true,
  stock = excluded.stock;

select setval('products_id_seq', (select max(id) from products));
