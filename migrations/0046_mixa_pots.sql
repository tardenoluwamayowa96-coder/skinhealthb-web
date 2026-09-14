-- Pots Mixa 400 ml : Ceramide Protect + Panthenol Comfort, 7 000 F.

update products set
  name = 'Panthenol Comfort crème',
  description = $d$Mixa Panthenol Comfort, pot 400 ml. 13 % panthénol, glycérine, oméga 6 + 9. Visage, corps, mains. Soulage 5 signes de peau sèche sensible, 48 h de confort. Bébé, enfant, adulte. Sous contrôle dermatologique.$d$,
  ingredients = $d$Aqua, panthenol, glycerin, omega 6 + 9, emollients. Liste complète sur le pot.$d$,
  usage_tips = $d$Visage, corps, mains. Après la douche ou au besoin. Peaux très sèches, sensibles. Convient bébés, enfants, adultes.$d$,
  precautions = $d$Usage externe. Éviter les yeux. Tenir hors de portée des enfants. Ceci n'est pas un médicament.$d$,
  format_label = '400 ml',
  authenticity_note = 'Pot Mixa Panthenol Comfort d''origine L''Oréal, lot photographié.',
  price_xof = 7000,
  sku = 'SHB-MX-PC400',
  image_url = '/products/mixa-panthenol-comfort.jpg?v=37',
  skin_types = 'sèche,très sèche,sensible,tous',
  is_featured = true,
  is_new = true,
  is_active = true
where slug = 'mixa-panthenol-comfort';

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values

(221, 'mixa-ceramide-protect', 'Ceramide Protect crème', 28, 2,
 $d$Mixa Ceramide Protect, pot 400 ml. 10 % glycérine, squalane et céramide. Crème renforçante, sans parfum. Visage, corps, mains — barrière, hydratation, peaux sensibles. Sous contrôle dermatologique.$d$,
 $d$Aqua, glycerin, squalane, ceramide, emollients. Sans parfum. Liste complète sur le pot.$d$,
 $d$Visage, corps, mains. Après la douche, sur peau propre. Matin et/ou soir.$d$,
 $d$Usage externe. Éviter les yeux. Sans parfum, pensé peaux sensibles. Ceci n'est pas un médicament.$d$,
 '400 ml', 'France', 'Pot Mixa Ceramide Protect d''origine L''Oréal, lot photographié.',
 7000, null, 24, 'SHB-MX-CP400', '/products/mixa-ceramide-protect.jpg?v=37',
 'sensible,sèche,normale,tous', null, true, true, true, true, 'X26-CP400', '2028-09-30')

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
