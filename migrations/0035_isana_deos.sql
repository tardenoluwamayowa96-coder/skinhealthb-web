-- ISANA Rossmann : 4 roll-on 50 ml, 1 000 F l'unité.

insert into brands (id, slug, name, country, verified) values
  (63, 'isana', 'ISANA', 'Allemagne', true)
on conflict (slug) do nothing;

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values

(198, 'isana-classic-dry', 'Anti-transpirant Classic Dry 72h', 63, 2,
 $d$ISANA Anti-Transpirant Classic Dry, roll-on 50 ml. Protection 72 h, sans alcool, fini sec. Le déo Rossmann du quotidien à Lomé — chaleur, journée longue, sans parfum agressif.$d$,
 $d$Aqua, aluminum chlorohydrate, emollients. Sans alcool. Liste complète sur le flacon.$d$,
 $d$Peau propre et sèche, aisselles uniquement. Matin. Laisser sécher avant de s'habiller. Ne pas raser juste avant.$d$,
 $d$Usage externe. Ne pas appliquer sur peau irritée ou lésée. Ceci n'est pas un médicament.$d$,
 '50 ml', 'Allemagne', 'Roll-on ISANA Classic Dry Rossmann d''origine, lot photographié.',
 1000, null, 40, 'SHB-IS-CD50', '/products/isana-classic-dry.jpg?v=27',
 'normale,mixte,tous', null, true, true, true, true, 'I26-CD50', '2028-06-30'),

(199, 'isana-invisible-5in1', 'Anti-transpirant Invisible 5 en 1', 63, 2,
 $d$ISANA Anti-Transpirant Invisible 5 in 1, roll-on 50 ml. 48 h, sans alcool : soin, anti-traces blanches, anti-auréoles jaunes, fini sec. Le déo des T-shirts clairs.$d$,
 $d$Aqua, aluminum salts, soin. Sans alcool. Liste complète sur le flacon.$d$,
 $d$Peau propre et sèche, aisselles. Matin. Laisser sécher. Convient aux textiles clairs.$d$,
 $d$Usage externe. Ne pas appliquer sur peau irritée. Ceci n'est pas un médicament.$d$,
 '50 ml', 'Allemagne', 'Roll-on ISANA Invisible 5 in 1 Rossmann d''origine, flacon lilas, lot photographié.',
 1000, null, 40, 'SHB-IS-IN50', '/products/isana-invisible-5in1.jpg?v=27',
 'normale,mixte,tous', null, true, true, true, true, 'I26-IN50', '2028-06-30'),

(200, 'isana-fresh', 'Déodorant Fresh 24h', 63, 2,
 $d$ISANA Deodorant Fresh 24 h, roll-on 50 ml. 0 % aluminium (ACH), sans alcool. ÖKO-TEST sehr gut (06/2024). Fraîcheur 24 h, sans sels d'aluminium — le déo léger du climat de Lomé.$d$,
 $d$Aqua, parfum, soin. 0 % aluminium chlorohydrate. Sans alcool. Liste complète sur le flacon.$d$,
 $d$Peau propre, aisselles, matin et/ou après la douche. Laisser sécher.$d$,
 $d$Usage externe. Déodorant (pas un anti-transpirant) : n'arrête pas la sueur, masque l'odeur. Éviter les yeux.$d$,
 '50 ml', 'Allemagne', 'Roll-on ISANA Fresh Rossmann d''origine, ÖKO-TEST, lot photographié.',
 1000, null, 40, 'SHB-IS-FR50', '/products/isana-fresh.jpg?v=27',
 'sensible,normale,tous', null, true, true, true, true, 'I26-FR50', '2028-06-30'),

(201, 'isana-soft-blossom', 'Déodorant Soft Blossom 24h', 63, 2,
 $d$ISANA Deodorant Soft Blossom, roll-on 50 ml. Senteur florale douce, 24 h, 0 % aluminium (ACH), sans alcool. Le déo parfumé du rayon Rossmann — 1 000 F.$d$,
 $d$Aqua, parfum floral, soin. 0 % aluminium chlorohydrate. Sans alcool. Liste complète sur le flacon.$d$,
 $d$Peau propre, aisselles. Matin. Laisser sécher avant le textile.$d$,
 $d$Usage externe. Contient du parfum : patch-test si peau très réactive. Déodorant, pas un anti-transpirant.$d$,
 '50 ml', 'Allemagne', 'Roll-on ISANA Soft Blossom Rossmann d''origine, flacon rose, lot photographié.',
 1000, null, 40, 'SHB-IS-SB50', '/products/isana-soft-blossom.jpg?v=27',
 'normale,sèche,tous', null, true, true, false, true, 'I26-SB50', '2028-06-30')

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

update categories
set description = 'Laits, huiles, déodorants, savons et soins des mains.'
where slug = 'corps';

select setval('brands_id_seq', (select max(id) from brands));
select setval('products_id_seq', (select max(id) from products));
