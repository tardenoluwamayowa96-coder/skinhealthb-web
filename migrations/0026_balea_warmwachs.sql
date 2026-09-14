-- Perles de cire tiède Balea — 1 500 F le pot, lot photographié.

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values

(166, 'balea-warmwachs-perlen', 'Perles de cire tiède amande & baies', 29, 2,
 $d$Perles de cire tiède Balea Warmwachs Perlen. Huile d'amande et parfum baies des bois. Pour micro-ondes. Peau lisse jusqu'à 4 semaines. Épilation à la maison, import dm Allemagne — 1 500 F le pot.$d$,
 $d$Cire (colophane / ester de colophane), paraffinum liquidum, huile d'amande (prunus amygdalus dulcis), parfum baies des bois, colorants. Liste complète sur le pot.$d$,
 $d$Suivre le mode d'emploi du pot : faire fondre au micro-ondes par petites touches, tester la température au poignet, appliquer en couches fines dans le sens du poil, laisser figer, retirer d'un coup sec contre le poil. Peau propre, sèche, sans crème.$d$,
 $d$ATTENTION : cire chaude — risque de brûlure. Toujours tester la température. Ne pas utiliser sur le visage, les muqueuses, grains de beauté, plaies, peau irritée ou cassée. Déconseillé aux peaux très sensibles et en cas d'allergie à la colophane ou aux fruits à coque (amande). Tenir hors de portée des enfants. Usage externe.$d$,
 '250 g', 'Allemagne', 'Pot Balea Warmwachs Perlen d''origine dm, lot photographié.',
 1500, null, 20, 'SHB-BL-WW250', '/products/balea-warmwachs-perlen.jpg?v=23',
 'normale,tous', null, false, true, false, true, 'B26-520', '2028-08-31')

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
  is_new = true,
  is_active = true,
  stock = excluded.stock;

select setval('products_id_seq', (select max(id) from products));
