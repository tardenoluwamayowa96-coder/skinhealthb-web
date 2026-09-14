-- Rayon photographié : compléments Mivolis / altapharma 800 F,
-- crèmes douche Balea 1 500 F, Tesori d'Oriente 4 500 F, déo Balea 1 000 F.

insert into brands (id, slug, name, country, verified) values
  (55, 'mivolis', 'Mivolis', 'Allemagne', true),
  (56, 'altapharma', 'altapharma', 'Allemagne', true),
  (57, 'tesori-d-oriente', 'Tesori d''Oriente', 'Italie', true)
on conflict (slug) do nothing;

insert into categories (id, slug, name, description, sort_order) values
  (10, 'complements', 'Compléments alimentaires', 'Comprimés effervescents Mivolis (dm) et altapharma (Rossmann) — 800 F le tube.', 10)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  sort_order = excluded.sort_order;

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values

(144, 'mivolis-multimineral', 'Multiminéral orange-maracuja', 55, 10,
 $d$Comprimés effervescents Mivolis Multimineral, goût orange-maracuja. 20 comprimés. Complément alimentaire dm Allemagne — minéraux du quotidien, 800 F le tube.$d$,
 $d$Minéraux (magnésium, calcium, fer, zinc…), vitamine C, acidifiants, arôme orange-maracuja. Voir tableau nutritionnel sur le tube.$d$,
 $d$1 comprimé par jour dans un grand verre d'eau (200 ml), de préférence au petit-déjeuner.$d$,
 $d$Complément alimentaire. Ne se substitue pas à une alimentation variée et à un mode de vie sain. Ne pas dépasser la dose journalière. Tenir hors de portée des enfants. Déconseillé aux enfants et aux femmes enceintes sans avis d'un professionnel de santé. Ceci n'est pas un médicament.$d$,
 '20 comprimés', 'Allemagne', 'Tube Mivolis dm d''origine, lot photographié, DLC contrôlée.',
 800, null, 48, 'SHB-MV-MM20', '/products/mivolis-multimineral.jpg?v=20',
 null, null, false, true, true, true, 'M26-401', '2027-12-31'),

(145, 'mivolis-eisen-vitc', 'Fer + Vitamine C cassis', 55, 10,
 $d$Comprimés effervescents Mivolis Eisen + Vitamin C, goût cassis. 20 comprimés. Fer associé à la vitamine C pour une meilleure assimilation. 800 F le tube.$d$,
 $d$Fer, vitamine C, acidifiants, arôme cassis (Johannisbeere). Voir tableau nutritionnel sur le tube.$d$,
 $d$1 comprimé par jour dans 200 ml d'eau. De préférence en dehors des repas riches en thé ou café.$d$,
 $d$Complément alimentaire. Ne se substitue pas à une alimentation variée. Ne pas dépasser la dose. Tenir hors de portée des enfants. Le fer en excès est dangereux pour les jeunes enfants. Ceci n'est pas un médicament.$d$,
 '20 comprimés', 'Allemagne', 'Tube Mivolis Eisen + Vitamin C d''origine dm, lot photographié.',
 800, null, 48, 'SHB-MV-EC20', '/products/mivolis-eisen-vitc.jpg?v=20',
 null, null, false, true, false, true, 'M26-402', '2027-12-31'),

(146, 'mivolis-multivitamin', 'Multivitamines tropic', 55, 10,
 $d$Comprimés effervescents Mivolis Multivitamin, goût tropic. 20 comprimés. Spectre de vitamines du quotidien, 800 F le tube.$d$,
 $d$Vitamines A, B, C, D, E, acidifiants, arôme tropical. Voir tableau nutritionnel sur le tube.$d$,
 $d$1 comprimé par jour dans 200 ml d'eau, au petit-déjeuner.$d$,
 $d$Complément alimentaire. Ne se substitue pas à une alimentation variée. Ne pas dépasser la dose. Tenir hors de portée des enfants. Ceci n'est pas un médicament.$d$,
 '20 comprimés', 'Allemagne', 'Tube Mivolis Multivitamin tropic d''origine dm, lot photographié.',
 800, null, 48, 'SHB-MV-TV20', '/products/mivolis-multivitamin.jpg?v=20',
 null, null, false, true, true, true, 'M26-403', '2027-12-31'),

(147, 'altapharma-multi-mineral', 'Multivitamines + minéraux mangue', 56, 10,
 $d$Comprimés effervescents altapharma Multivitamin + Mineral, goût mangue. 20 comprimés. Marque Rossmann — 800 F le tube.$d$,
 $d$Vitamines A, B, C, D, E, minéraux, acidifiants, arôme mangue. Voir tableau nutritionnel sur le tube.$d$,
 $d$1 comprimé par jour dans 200 ml d'eau, au petit-déjeuner.$d$,
 $d$Complément alimentaire. Ne se substitue pas à une alimentation variée. Ne pas dépasser la dose. Tenir hors de portée des enfants. Ceci n'est pas un médicament.$d$,
 '20 comprimés', 'Allemagne', 'Tube altapharma Rossmann d''origine, lot photographié, DLC contrôlée.',
 800, null, 48, 'SHB-AP-MM20', '/products/altapharma-multi-mineral.jpg?v=20',
 null, null, false, true, false, true, 'R26-411', '2027-12-31'),

(148, 'altapharma-multivitamin', 'Multivitamines orange', 56, 10,
 $d$Comprimés effervescents altapharma Multivitamin, goût orange. 20 comprimés. 800 F le tube.$d$,
 $d$Vitamines A, B, C, D, E, acidifiants, arôme orange. Voir tableau nutritionnel sur le tube.$d$,
 $d$1 comprimé par jour dans 200 ml d'eau.$d$,
 $d$Complément alimentaire. Ne se substitue pas à une alimentation variée. Ne pas dépasser la dose. Tenir hors de portée des enfants. Ceci n'est pas un médicament.$d$,
 '20 comprimés', 'Allemagne', 'Tube altapharma Multivitamin orange d''origine Rossmann, lot photographié.',
 800, null, 48, 'SHB-AP-MV20', '/products/altapharma-multivitamin.jpg?v=20',
 null, null, false, true, false, true, 'R26-412', '2027-12-31'),

(149, 'altapharma-vitamin-c', 'Vitamine C citron', 56, 10,
 $d$Comprimés effervescents altapharma Vitamine C, goût citron. 20 comprimés. 800 F le tube.$d$,
 $d$Vitamine C (acide ascorbique), acidifiants, arôme citron, édulcorants. Voir tableau nutritionnel sur le tube.$d$,
 $d$1 comprimé par jour dans 200 ml d'eau.$d$,
 $d$Complément alimentaire. Ne se substitue pas à une alimentation variée. Ne pas dépasser la dose. Tenir hors de portée des enfants. Ceci n'est pas un médicament.$d$,
 '20 comprimés', 'Allemagne', 'Tube altapharma Vitamin C d''origine Rossmann, DLC contrôlée.',
 800, null, 48, 'SHB-AP-VC20', '/products/altapharma-vitamin-c.jpg?v=20',
 null, null, false, true, true, true, 'R26-413', '2027-12-31'),

(150, 'altapharma-vitamin-b12', 'Vitamine B12 mangue-abricot', 56, 10,
 $d$Comprimés effervescents altapharma Vitamin B12 haut dosage, goût mangue-abricot. 20 comprimés, végan. 800 F le tube.$d$,
 $d$Vitamine B12 (hochdosiert), acidifiants, arôme mangue-abricot. Végan. Voir tableau nutritionnel sur le tube.$d$,
 $d$1 comprimé par jour dans 200 ml d'eau.$d$,
 $d$Complément alimentaire. Ne se substitue pas à une alimentation variée. Ne pas dépasser la dose. Tenir hors de portée des enfants. Ceci n'est pas un médicament.$d$,
 '20 comprimés', 'Allemagne', 'Tube altapharma Vitamin B12 d''origine Rossmann, lot photographié.',
 800, null, 40, 'SHB-AP-B12', '/products/altapharma-vitamin-b12.jpg?v=20',
 null, null, false, true, false, true, 'R26-414', '2027-12-31'),

(151, 'altapharma-magnesium', 'Magnésium pamplemousse', 56, 10,
 $d$Comprimés effervescents altapharma Magnesium, goût pamplemousse. 20 comprimés. 800 F le tube.$d$,
 $d$Magnésium, acidifiants, arôme pamplemousse. Voir tableau nutritionnel sur le tube.$d$,
 $d$1 comprimé par jour dans 200 ml d'eau, de préférence le soir.$d$,
 $d$Complément alimentaire. Ne se substitue pas à une alimentation variée. Ne pas dépasser la dose. Tenir hors de portée des enfants. Ceci n'est pas un médicament.$d$,
 '20 comprimés', 'Allemagne', 'Tube altapharma Magnesium d''origine Rossmann, DLC contrôlée.',
 800, null, 48, 'SHB-AP-MG20', '/products/altapharma-magnesium.jpg?v=20',
 null, null, false, true, false, true, 'R26-415', '2027-12-31'),

(152, 'balea-buttermilk-lemon', 'Crème douche Babeurre & citron', 29, 2,
 $d$Crème douche Balea Buttermilk & Lemon 300 ml. Formule AquaCellSoft : hydrate pendant la douche, parfum babeurre-citron. Végan, import dm Allemagne.$d$,
 $d$Aqua, sodium laureth sulfate, cocamidopropyl betaine, glycerin, parfum agrumes, formule AquaCellSoft. Liste complète sur le flacon.$d$,
 $d$Mouiller, faire mousser, rincer. Visage déconseillé. Compléter avec un lait si peau sèche.$d$,
 $d$Usage externe. Éviter les yeux. Tenir hors de portée des enfants.$d$,
 '300 ml', 'Allemagne', 'Flacon Balea Buttermilk & Lemon d''origine dm, lot photographié.',
 1500, null, 36, 'SHB-BL-BL300', '/products/balea-buttermilk-lemon.jpg?v=20',
 'normale,sèche,tous', null, false, true, true, true, 'B26-501', '2028-06-30'),

(153, 'balea-pure-softness', 'Crème douche Pure Softness', 29, 2,
 $d$Crème douche Balea Pure Softness 300 ml, édition limitée. Parfum fleur de pommier et jasmin, formule AquaCellSoft, végan.$d$,
 $d$Aqua, tensioactifs doux, glycerin, parfum fleur de pommier et jasmin, formule AquaCellSoft. Végan. Liste complète sur le flacon.$d$,
 $d$Mouiller, faire mousser, rincer. Le geste doux du soir.$d$,
 $d$Usage externe. Édition limitée : stock photographié, à renouveler selon arrivage. Éviter les yeux.$d$,
 '300 ml', 'Allemagne', 'Flacon Balea Pure Softness Limited Edition d''origine dm, lot photographié.',
 1500, null, 24, 'SHB-BL-PS300', '/products/balea-pure-softness.jpg?v=20',
 'normale,sensible,tous', null, true, true, false, true, 'B26-502', '2028-06-30'),

(154, 'balea-mandel-magnolie', 'Crème douche Amandier & magnolia', 29, 2,
 $d$Crème douche Balea Mandelblüte & Magnolie 300 ml. Fleur d'amandier et magnolia, formule AquaCellSoft, végan. Le classique fleuri du rayon dm.$d$,
 $d$Aqua, tensioactifs doux, glycerin, parfum fleur d'amandier et magnolia, formule AquaCellSoft. Végan. Liste complète sur le flacon.$d$,
 $d$Mouiller, faire mousser, rincer. Corps.$d$,
 $d$Usage externe. Éviter les yeux.$d$,
 '300 ml', 'Allemagne', 'Flacon Balea Mandelblüte & Magnolie d''origine dm, lot photographié.',
 1500, null, 36, 'SHB-BL-MM300', '/products/balea-mandel-magnolie.jpg?v=20',
 'normale,sèche,tous', null, false, true, true, true, 'B26-503', '2028-06-30'),

(155, 'balea-milch-honig', 'Crème douche Lait & miel', 29, 2,
 $d$Crème douche Balea Milch & Honig 300 ml. Lait et miel, formule AquaCellSoft : confort des peaux qui tirent après la douche.$d$,
 $d$Aqua, tensioactifs doux, glycerin, extraits lait-miel, formule AquaCellSoft. Liste complète sur le flacon.$d$,
 $d$Mouiller, faire mousser, rincer. Suivre d'un lait si peau très sèche.$d$,
 $d$Usage externe. Éviter les yeux. Contient des extraits lait / miel : déconseillé en cas d'allergie connue.$d$,
 '300 ml', 'Allemagne', 'Flacon Balea Milch & Honig d''origine dm, lot photographié.',
 1500, null, 36, 'SHB-BL-MH300', '/products/balea-milch-honig.jpg?v=20',
 'sèche,normale,tous', null, false, true, false, true, 'B26-504', '2028-06-30'),

(156, 'balea-sweet-embrace', 'Crème douche Sweet Embrace', 29, 2,
 $d$Crème douche Balea Sweet Embrace 300 ml, édition limitée. Vanille et bois de santal, formule AquaCellSoft, végan.$d$,
 $d$Aqua, tensioactifs doux, glycerin, parfum vanille et santal, formule AquaCellSoft. Végan. Liste complète sur le flacon.$d$,
 $d$Mouiller, faire mousser, rincer. Parfum gourmand du soir.$d$,
 $d$Usage externe. Édition limitée. Éviter les yeux.$d$,
 '300 ml', 'Allemagne', 'Flacon Balea Sweet Embrace Limited Edition d''origine dm, lot photographié.',
 1500, null, 24, 'SHB-BL-SE300', '/products/balea-sweet-embrace.jpg?v=20',
 'normale,sèche,tous', null, true, true, false, true, 'B26-505', '2028-06-30'),

(157, 'balea-vanille-kokos', 'Crème douche Vanille & coco', 29, 2,
 $d$Crème douche Balea Vanille & Kokos 300 ml. Vanille et noix de coco, formule AquaCellSoft, végan.$d$,
 $d$Aqua, tensioactifs doux, glycerin, parfum vanille-coco, formule AquaCellSoft. Végan. Liste complète sur le flacon.$d$,
 $d$Mouiller, faire mousser, rincer. Corps.$d$,
 $d$Usage externe. Éviter les yeux.$d$,
 '300 ml', 'Allemagne', 'Flacon Balea Vanille & Kokos d''origine dm, lot photographié.',
 1500, null, 36, 'SHB-BL-VK300', '/products/balea-vanille-kokos.jpg?v=20',
 'normale,sèche,tous', null, false, true, true, true, 'B26-506', '2028-06-30'),

(158, 'balea-sensitive-aloe', 'Crème douche Sensitive Aloe Vera', 29, 2,
 $d$Crème douche Balea Sensitive 300 ml à l'aloe vera. Formule AquaCellSoft, végan, pensée pour les peaux sensibles. Flacon rechargeable côté dm.$d$,
 $d$Aqua, tensioactifs doux, glycerin, aloe barbadensis leaf juice, formule AquaCellSoft. Végan. Liste complète sur le flacon.$d$,
 $d$Mouiller, faire mousser, rincer. Convient aux peaux sensibles. Visage déconseillé.$d$,
 $d$Usage externe. Éviter les yeux. Patch-test si peau très réactive.$d$,
 '300 ml', 'Allemagne', 'Flacon Balea Sensitive Aloe Vera d''origine dm, lot photographié.',
 1500, null, 36, 'SHB-BL-SA300', '/products/balea-sensitive-aloe.jpg?v=20',
 'sensible,normale,tous', null, false, true, false, true, 'B26-507', '2028-06-30'),

(159, 'tesori-hammam-douche', 'Crème douche Hammam argan & oranger', 57, 2,
 $d$Crème douche Tesori d'Oriente Hammam 250 ml. Huile d'argan et fleur d'oranger : rituel hammam, mousse crémeuse, sillage oriental. Import Italie.$d$,
 $d$Aqua, tensioactifs, argania spinosa kernel oil, parfum fleur d'oranger. Liste complète sur le tube.$d$,
 $d$Mouiller, une noisette, faire mousser, rincer. Corps. Le rituel : gommage Hammam puis crème douche.$d$,
 $d$Usage externe. Éviter les yeux. Tenir hors de portée des enfants.$d$,
 '250 ml', 'Italie', 'Tube Tesori d''Oriente Hammam d''origine, lot photographié.',
 4500, null, 20, 'SHB-TO-HD250', '/products/tesori-hammam-douche.jpg?v=20',
 'normale,sèche,tous', null, true, true, true, true, 'T26-601', '2028-08-31'),

(160, 'tesori-hammam-peeling', 'Gommage corps Hammam argan & oranger', 57, 2,
 $d$Gommage corps Tesori d'Oriente Hammam 300 g. Microbilles d'amande, huile d'argan et fleur d'oranger : peeling aromatique du rituel hammam, peau lisse, sillage oriental.$d$,
 $d$Sucre / sel, huile d'argan, fragments d'amande, parfum fleur d'oranger. Liste complète sur le pot.$d$,
 $d$1 à 2 fois par semaine, sur peau humide, masser en cercles, rincer. Suivre de la crème douche Hammam.$d$,
 $d$Usage externe. Éviter le visage et les zones lésées. Contient des fruits à coque (amande). Éviter les yeux.$d$,
 '300 g', 'Italie', 'Pot Tesori d''Oriente Hammam Körperpeeling d''origine, lot photographié.',
 4500, null, 16, 'SHB-TO-HP300', '/products/tesori-hammam-peeling.jpg?v=20',
 'normale,sèche,tous', null, true, true, false, true, 'T26-602', '2028-08-31'),

(161, 'balea-deo-sensitive', 'Déodorant Sensitive 24h Aloe Vera', 29, 2,
 $d$Déodorant bille Balea Sensitive 24h 50 ml. 0 % aluminium, 0 % alcool, à l'aloe vera. Pensé pour peaux sensibles, y compris après le rasage. Import dm.$d$,
 $d$Aqua, aloe barbadensis leaf juice, sans sels d'aluminium, sans alcool. Liste complète sur le flacon.$d$,
 $d$Appliquer sur aisselles propres et sèches. Renouveler au besoin. Convient après le rasage.$d$,
 $d$Usage externe. 0 % aluminium (ACH). Éviter les plaies ouvertes.$d$,
 '50 ml', 'Allemagne', 'Bille Balea Sensitive 24h d''origine dm, lot photographié.',
 1000, null, 40, 'SHB-BL-DS50', '/products/balea-deo-sensitive.jpg?v=20',
 'sensible,normale,tous', null, false, true, true, true, 'B26-508', '2028-04-30')

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

update site_settings
set value = 'Nouveau rayon · compléments 800 F · crèmes douche Balea 1 500 F · Tesori Hammam'
where key = 'announcement';

select setval('brands_id_seq', (select max(id) from brands));
select setval('products_id_seq', (select max(id) from products));
select setval('categories_id_seq', (select max(id) from categories));
