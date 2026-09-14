-- Rayon bio NATRUE photographié : Weleda, lavera.
-- Prix = tarif dm.de × 656 XOF, arrondi 50 F.

insert into brands (id, slug, name, country, verified) values
  (48, 'weleda', 'Weleda', 'Suisse', true),
  (49, 'lavera', 'lavera', 'Allemagne', true)
on conflict (slug) do nothing;

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values

(130, 'weleda-skin-food', 'Crème Skin Food', 48, 2,
 $d$Weleda Skin Food 75 ml. NATRUE. Calendula, pensée, romarin : nourrit peaux sèches, râpeuses, talons, mains et visages. Multi-usage, sans silicone ni paraffine. Tarif dm.de 8,95 €.$d$,
 $d$Helianthus annuus seed oil*, lanolin, beeswax, calendula officinalis extract*, viola tricolor extract*, rosmarinus officinalis extract*. *issu de l'agriculture bio. Liste complète sur la boîte.$d$,
 $d$Une noisette sur zones sèches : visage, mains, coudes, talons. Seule ou par-dessus un sérum le soir.$d$,
 $d$Usage externe. Contient de la lanoline (origine ovine). Patch-test si peau très réactive. Ceci n'est pas un médicament.$d$,
 '75 ml', 'Suisse / Allemagne', 'Boîte Weleda Skin Food d''origine, NATRUE, import dm.',
 5850, null, 22, 'SHB-WE-SF75', '/products/weleda-skin-food.jpg?v=16',
 'sèche,très sèche,sensible', null, true, true, true, true, 'W26-110', '2028-08-31'),

(131, 'weleda-granatapfel', 'Crème grenade & maca', 48, 1,
 $d$Weleda Straffende Tagespflege Granatapfel & Maca-Peptide 40 ml. NATRUE, vegan. Huile de grenade bio + peptides de maca : fermeté, ridules, éclat. Sans SPF. Tarif dm.de 19,95 €.$d$,
 $d$Aqua, sesame oil*, glycerin, pomegranate seed oil*, hydrolyzed lepidium meyenii root*, sunflower oil*. *bio. Liste complète sur le pot.$d$,
 $d$Matin, une noisette sur visage et cou. Le jour : terminer par un solaire (indispensable au Togo).$d$,
 $d$Usage externe. Pas de protection solaire. Éviter les yeux.$d$,
 '40 ml', 'Suisse / Allemagne', 'Pot Weleda grenade d''origine, NATRUE, import dm.',
 13100, null, 10, 'SHB-WE-GM40', '/products/weleda-granatapfel.jpg?v=16',
 'mature,normale,sèche,mixte', null, true, true, false, true, 'W26-111', '2028-05-31'),

(132, 'lavera-hydro', 'Gel-crème Hydro Refresh', 49, 1,
 $d$lavera Hydro Refresh Creme-Gel 50 ml. NATRUE, vegan. Algue bio + acides hyaluroniques naturels : hydratation légère, fraîcheur, sans silicone. Alternative bio au gel HA. Tarif dm.de 14,95 €.$d$,
 $d$Aqua, alcohol denat.*, glycerin, aloe barbadensis leaf juice*, sodium hyaluronate, cucumber extract*, algae extract*. *bio. Liste complète sur le pot.$d$,
 $d$Matin et/ou soir, une noisette sur peau propre. Seule ou après un sérum. Le jour : SPF par-dessus.$d$,
 $d$Usage externe. Contient de l'alcool végétal : peut piquer sur barrière lésée.$d$,
 '50 ml', 'Allemagne', 'Pot lavera Hydro Refresh d''origine, NATRUE, import dm.',
 9800, null, 16, 'SHB-LV-HR50', '/products/lavera-hydro.jpg?v=16',
 'normale,mixte,déshydratée,sensible', null, true, true, true, true, 'V26-201', '2028-07-31'),

(133, 'lavera-basis', 'Crème Basis Sensitiv', 49, 1,
 $d$lavera Basis Sensitiv Feuchtigkeitscreme 50 ml. NATRUE, vegan. Aloe vera bio + jojoba bio : hydratation quotidienne, peaux normales à mixtes, base maquillage. Sans paraffine. Tarif dm.de 7,95 €.$d$,
 $d$Aqua, aloe barbadensis leaf juice*, simmondsia chinensis seed oil*, shea butter*, glycerin. *bio. Liste complète sur le tube.$d$,
 $d$Matin et soir, une noisette. Le jour : toujours un solaire par-dessus (cette crème n'a pas de LSF).$d$,
 $d$Usage externe. Éviter les yeux.$d$,
 '50 ml', 'Allemagne', 'Tube lavera Basis Sensitiv d''origine, NATRUE, import dm.',
 5200, null, 20, 'SHB-LV-BS50', '/products/lavera-basis.jpg?v=16',
 'normale,mixte,sensible,sèche', null, true, true, true, true, 'V26-202', '2028-08-31')

on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  ingredients = excluded.ingredients,
  usage_tips = excluded.usage_tips,
  precautions = excluded.precautions,
  format_label = excluded.format_label,
  price_xof = excluded.price_xof,
  image_url = excluded.image_url,
  skin_types = excluded.skin_types,
  is_featured = excluded.is_featured,
  is_new = true,
  is_bestseller = excluded.is_bestseller,
  is_active = true,
  stock = excluded.stock;

update site_settings
set value = 'Bio NATRUE · Weleda, lavera · comparé au classique · tarif dm × 656 F'
where key = 'announcement';

select setval('brands_id_seq', (select max(id) from brands));
select setval('products_id_seq', (select max(id) from products));
