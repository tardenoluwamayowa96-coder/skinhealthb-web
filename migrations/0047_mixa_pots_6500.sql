-- Pots Mixa 6 500 F : Panthenol (prix), Cica crème, baume 10-en-1.

update products set
  image_url = '/products/mixa-panthenol-comfort.jpg?v=38',
  price_xof = 6500,
  is_new = true,
  is_active = true
where slug = 'mixa-panthenol-comfort';

update products set
  name = 'Urea Cica Repair+ crème',
  description = $d$Mixa Urea Cica Repair+, pot 400 ml. 10 % urée + niacinamide. Crème réparatrice 48 h, peaux très sèches, rugueuses, sensibles. Visage et corps. Sous contrôle médical.$d$,
  ingredients = $d$Aqua, urea 10 %, niacinamide, emollients. Liste complète sur le pot.$d$,
  usage_tips = $d$Peaux très sèches, rugueuses. Corps, zones épaisses, visage si toléré. Après la douche.$d$,
  precautions = $d$Usage externe. L'urée peut picoter sur peaux lésées. Éviter les yeux. Ceci n'est pas un médicament.$d$,
  format_label = '400 ml',
  authenticity_note = 'Pot Mixa Urea Cica Repair+ d''origine L''Oréal, lot photographié.',
  price_xof = 6500,
  image_url = '/products/mixa-cica-creme.jpg?v=38',
  skin_types = 'très sèche,rugueuse,sensible',
  is_featured = true,
  is_new = true,
  is_active = true
where slug = 'mixa-cica-creme-400';

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values

(222, 'mixa-cica-balsam', 'Baume 10-en-1 Cica Repair+', 28, 2,
 $d$Mixa 10-in-1 Cica Repair+, baume réparateur 250 ml. 40 % glycérine, urée et allantoïne. Visage, corps, mains. Sans parfum. Post-tatouage possible. Le baume compact du climat sec et du harmattan.$d$,
 $d$Aqua, glycerin, urea, allantoin, emollients. Sans parfum. Liste complète sur le pot.$d$,
 $d$Zones sèches, coudes, genoux, mains, post-tatouage une fois la peau refermée. Fine couche, masser.$d$,
 $d$Usage externe. Ne pas appliquer sur plaie ouverte. Post-tatouage : uniquement après avis du tatoueur / cicatrisation. Éviter les yeux.$d$,
 '250 ml', 'France', 'Pot Mixa 10-in-1 Cica Repair+ Balsam d''origine L''Oréal, lot photographié.',
 6500, null, 24, 'SHB-MX-CB250', '/products/mixa-cica-balsam.jpg?v=38',
 'très sèche,sensible,tous', null, true, true, true, true, 'X26-CB250', '2028-09-30')

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
  skin_types = excluded.skin_types,
  is_featured = true,
  is_new = true,
  is_active = true;

select setval('products_id_seq', (select max(id) from products));
