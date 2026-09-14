-- Shampoing Détox Evoluderm Pluie de Coco 1 L — tarif boutique 8 000 F.

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values
(72, 'evoluderm-detox-1l', 'Shampoing Détox Pluie de Coco', 31, 3,
 $d$Shampoing Evoluderm Détox Pluie de Coco 1 litre, flacon pompe. Eau de coco et extrait de thé vert. 96 % d'origine naturelle, végan, sans silicone. Tous types de cheveux — le format familial qui tient plusieurs semaines. Fabriqué en France.$d$,
 $d$Aqua, sodium laureth sulfate, sodium chloride, glycerin, cocamidopropyl betaine, cocos nucifera water, camellia sinensis leaf extract, citrus aurantifolia fruit extract, squalane, tocopherol. Liste complète sur le flacon.$d$,
 $d$Sur cheveux humides, masser des racines aux pointes par mouvements circulaires. Rincer abondamment. Renouveler si besoin.$d$,
 $d$Éviter les yeux. En cas de contact, rincer à l'eau claire. Tenir hors de portée des enfants. Ceci n'est pas un médicament.$d$,
 '1 L', 'France', 'Flacon pompe Evoluderm d''origine, fabrication France, lot et DLC contrôlés à Lomé.',
 8000, null, 24, 'SHB-EV-DT1000', '/products/evoluderm-detox-1l.jpg?v=9',
 null, 'tous,normaux,gras,mixtes,fins', true, true, true, true, 'C26-112', '2028-09-30')
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  ingredients = excluded.ingredients,
  usage_tips = excluded.usage_tips,
  precautions = excluded.precautions,
  format_label = excluded.format_label,
  price_xof = 8000,
  compare_at_xof = null,
  stock = excluded.stock,
  sku = excluded.sku,
  image_url = excluded.image_url,
  hair_types = excluded.hair_types,
  is_featured = true,
  is_new = true,
  is_bestseller = true,
  is_active = true;

select setval('products_id_seq', (select max(id) from products));
