-- Dentifrices Dontodent Kräuter + Clear Fresh — 900 F le tube, lots photographiés.

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values

(164, 'dontodent-krauter', 'Dentifrice Kräuter (herbes)', 33, 9,
 $d$Dentifrice Dontodent Kräuter 125 ml. Extraits d'herbes naturels : protège contre les caries et fortifie les gencives. Formule dm Allemagne, végan, sans microplastiques. 900 F le tube.$d$,
 $d$Aqua, sorbitol, hydrated silica, aroma, extraits d'herbes, sodium fluoride. Liste complète sur le tube.$d$,
 $d$Brosser 2 minutes, matin et soir, une noisette. Convient en relais du dentifrice antibactérien Dontodent.$d$,
 $d$Usage externe. Ne pas avaler. Tenir hors de portée des enfants. Contient du fluorure de sodium. Ceci n'est pas un médicament.$d$,
 '125 ml', 'Allemagne', 'Tube Dontodent Kräuter d''origine dm, lot photographié.',
 900, 1500, 48, 'SHB-DD-KR125', '/products/dontodent-krauter.jpg?v=22',
 null, null, false, true, true, true, 'D26-421', '2028-06-30'),

(165, 'dontodent-clear-fresh', 'Dentifrice Clear Fresh', 33, 9,
 $d$Dentifrice Dontodent Clear Fresh 125 ml. Rafraîchit l'haleine, protège contre les caries et le tartre. Formule dm Allemagne, végan. 900 F le tube.$d$,
 $d$Aqua, sorbitol, hydrated silica, aroma menthe, sodium fluoride. Liste complète sur le tube.$d$,
 $d$Brosser 2 minutes, matin et soir, une noisette. Le tube frais du quotidien.$d$,
 $d$Usage externe. Ne pas avaler. Tenir hors de portée des enfants. Contient du fluorure de sodium. Ceci n'est pas un médicament.$d$,
 '125 ml', 'Allemagne', 'Tube Dontodent Clear Fresh d''origine dm, lot photographié.',
 900, 1500, 48, 'SHB-DD-CF125', '/products/dontodent-clear-fresh.jpg?v=22',
 null, null, false, true, true, true, 'D26-422', '2028-06-30')

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
  compare_at_xof = excluded.compare_at_xof,
  image_url = excluded.image_url,
  is_featured = excluded.is_featured,
  is_new = true,
  is_bestseller = excluded.is_bestseller,
  is_active = true,
  stock = excluded.stock;

select setval('products_id_seq', (select max(id) from products));
