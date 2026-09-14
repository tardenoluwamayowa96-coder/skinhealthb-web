-- Rayon drugstore Europe : Bi-Oil, Vaseline, Mixa, Balea, Garnier, Evoluderm, Rossmann.
-- Prix = tarif site (pharmacie / dm / Nocibé / evoluderm.com) × 656 XOF, arrondi 50 F.
-- Vitamines altapharma : 800 F l'unité, demandé.

insert into brands (id, slug, name, country, verified) values
  (26, 'bi-oil', 'Bi-Oil', 'Afrique du Sud', true),
  (27, 'vaseline', 'Vaseline', 'Royaume-Uni', true),
  (28, 'mixa', 'Mixa', 'France', true),
  (29, 'balea', 'Balea', 'Allemagne', true),
  (30, 'garnier', 'Garnier', 'France', true),
  (31, 'evoluderm', 'Evoluderm', 'France', true),
  (32, 'rossmann', 'Rossmann', 'Allemagne', true)
on conflict (slug) do nothing;

insert into categories (id, slug, name, description, sort_order) values
  (8, 'vitamines', 'Vitamines', 'Comprimés effervescents Rossmann altapharma — 800 F le tube.', 8)
on conflict (slug) do nothing;

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values

(46, 'bi-oil-125', 'Soin de la peau spécialisé', 26, 2,
 $d$Huile Bi-Oil 125 ml au PurCellin Oil. Aide à améliorer l'apparence des vergetures, cicatrices et teint irrégulier. Texture sèche, s'étale sans coller.$d$,
 $d$Paraffinum liquidum, PurCellin Oil, retinyl palmitate, vitamine E, extraits de calendula, lavande, romarin. Liste complète sur l'emballage.$d$,
 $d$Deux fois par jour, masser jusqu'à absorption, pendant au moins 3 mois. Convient au ventre, hanches, cicatrices.$d$,
 $d$Usage externe. Éviter les yeux. Ceci n'est pas un médicament.$d$,
 '125 ml', 'Afrique du Sud', 'Flacon Bi-Oil orange d''origine, lot et DLC contrôlés à Lomé.',
 14500, null, 28, 'SHB-BO-125', '/products/bi-oil-125.jpg?v=6',
 'sèche,normale,vergetures', null, true, true, true, true, 'E26-014', '2028-04-30'),

(47, 'vaseline-original-250', 'Petroleum Jelly Original', 27, 2,
 $d$Vaseline Original 250 ml, gelée de pétrole triple purifiée. Barrière occlusive pour lèvres gercées, talons, cuticules et peaux très sèches — l'essentiel harmattan.$d$,
 $d$Petrolatum 100 %. Liste sur l'emballage.$d$,
 $d$Une noisette sur zones sèches, lèvres ou cuticules, autant que nécessaire.$d$,
 $d$Usage externe. Ne pas avaler. Tenir hors de portée des enfants.$d$,
 '250 ml', 'Inde', 'Pot Vaseline bleu d''origine Unilever, scellé, DLC enregistrée.',
 3300, null, 40, 'SHB-VA-250', '/products/vaseline-original-250.jpg?v=6',
 'sèche,sensible,très sèche', null, false, true, true, true, 'U26-088', '2028-08-01'),

(48, 'vaseline-cocoa-400', 'Intensive Care Cocoa Radiant', 27, 2,
 $d$Lait corps Vaseline Cocoa Radiant 400 ml au beurre de cacao. Hydrate 24 h, laisse un voile lumineux sur peaux mates. Tarif site Unilever 5,10 €.$d$,
 $d$Glycerin, petrolatum, theobroma cacao seed butter. Liste complète sur l'emballage.$d$,
 $d$Après la douche, sur peau encore humide, du cou aux pieds.$d$,
 $d$Usage externe. Éviter le contour des yeux.$d$,
 '400 ml', 'Royaume-Uni', 'Flacon Vaseline brun/or d''origine, pompe, lot contrôlé.',
 3350, null, 32, 'SHB-VA-CR400', '/products/vaseline-cocoa-400.jpg?v=6',
 'sèche,normale,mate', null, true, true, true, true, 'U26-102', '2028-06-15'),

(49, 'vaseline-men-cooling', 'Men Cooling lotion 3-en-1', 27, 2,
 $d$Lotion Vaseline Men Cooling 400 ml. Visage, corps et mains. Menthol frais, absorption rapide — la lotion homme Unilever Afrique de l'Ouest.$d$,
 $d$Aqua, glycerin, petrolatum, menthol. Liste complète sur l'emballage.$d$,
 $d$Après la douche, sur peau encore humide, visage, corps et mains.$d$,
 $d$Usage externe. Éviter les yeux. En cas de contact, rincer abondamment.$d$,
 '400 ml', 'Afrique du Sud', 'Flacon Vaseline Men d''origine Unilever, pompe, lot contrôlé.',
 2900, null, 36, 'SHB-VA-MC400', '/products/vaseline-men-cooling.jpg?v=6',
 'normale,mixte,grasse', null, false, true, false, true, 'U26-141', '2028-05-20'),

(50, 'mixa-lait-reparateur', 'Lait corps réparateur', 28, 2,
 $d$Lait Mixa Réparateur 400 ml : karité, huile d'abricot, allantoïne. Pour peaux abîmées ou extrêmement sèches. Pénètre sans film gras — tarif Nocibé 5,99 €.$d$,
 $d$Aqua, butyrospermum parkii butter, glycerin, apricot kernel oil, allantoin. Liste complète sur l'emballage.$d$,
 $d$Sur le corps, à tout moment. Ne pas appliquer sur le visage.$d$,
 $d$Usage externe. Patch-test si peau très réactive.$d$,
 '400 ml', 'France', 'Flacon pompe Mixa orange d''origine L''Oréal, lot photographié.',
 3900, null, 30, 'SHB-MX-LR400', '/products/mixa-lait-reparateur.jpg?v=6',
 'sèche,très sèche,sensible', null, true, true, true, true, 'L26-033', '2028-03-12'),

(51, 'mixa-cica-400', 'Urea Cica Repair+ lait corps', 28, 2,
 $d$Lait Mixa Urea Cica Repair+ 400 ml : urée, panthénol, centella. Renforce, apaise, protège 48 h. Peaux fragilisées — tarif site 7,58 €.$d$,
 $d$Aqua, glycerin, urea, panthenol, shea butter, centella. Liste complète sur l'emballage.$d$,
 $d$Matin et/ou soir sur corps propre. Deux applications par jour si peau très sèche.$d$,
 $d$Usage externe. Ceci n'est pas un médicament.$d$,
 '400 ml', 'France', 'Flacon Mixa Cica d''origine, pompe, lot et DLC contrôlés.',
 5000, null, 24, 'SHB-MX-CR400', '/products/mixa-cica-400.jpg?v=6',
 'sensible,sèche,très sèche', null, false, true, true, true, 'L26-044', '2028-02-28'),

(52, 'mixa-creme-douche', 'Crème douche surgras karité', 28, 2,
 $d$Crème douche Mixa Surgras 400 ml au beurre de karité. Lave sans décaper les peaux très sèches, préserve le film hydrolipidique. Tarif Nocibé 2,90 €.$d$,
 $d$Aqua, sodium laureth sulfate, glycerin, shea butter, allantoin. Liste complète sur l'emballage.$d$,
 $d$Noisette sur corps mouillé, rincer. Compléter avec le lait Mixa.$d$,
 $d$Éviter les yeux.$d$,
 '400 ml', 'France', 'Flacon Mixa crème douche d''origine, lot contrôlé à Lomé.',
 1900, null, 40, 'SHB-MX-CD400', '/products/mixa-creme-douche.jpg?v=6',
 'sèche,très sèche,sensible', null, false, true, false, true, 'L26-071', '2028-07-01'),

(53, 'mixa-gel-bebe', 'Gel lavant 2-en-1 Bébé', 28, 2,
 $d$Gel lavant Mixa Bébé 2-en-1 corps et cheveux 750 ml. Testé sous contrôle pédiatrique, hypoallergénique. Convient à toute la famille. Tarif 5,95 €.$d$,
 $d$Aqua, mild surfactants, glycerin. Liste complète sur l'emballage.$d$,
 $d$Masser sur peau et cheveux mouillés, rincer abondamment.$d$,
 $d$Éviter les yeux. Usage externe. Tenir hors de portée des enfants sans surveillance.$d$,
 '750 ml', 'France', 'Flacon Mixa Bébé d''origine L''Oréal, lot scellé.',
 3900, null, 28, 'SHB-MX-BB750', '/products/mixa-gel-bebe.jpg?v=6',
 'sensible,normale,sèche', null, false, true, false, true, 'L26-080', '2028-07-01'),

(54, 'balea-soft-creme', 'Gel douche Soft Creme', 29, 2,
 $d$Gel douche Balea Soft Creme 300 ml, micro-baume, peaux sèches. pH neutre, végan. Prix dm.de 0,95 €.$d$,
 $d$Aqua, surfactants doux, glycerin, caring oils. Liste complète sur l'emballage.$d$,
 $d$Masser sur peau mouillée, rincer.$d$,
 $d$Éviter les yeux.$d$,
 '300 ml', 'Allemagne', 'Flacon Balea (dm) d''origine, import Allemagne, DLC contrôlée.',
 650, null, 48, 'SHB-BL-SC300', '/products/balea-soft-creme.jpg?v=6',
 'sèche,normale,sensible', null, false, true, false, true, 'D26-011', '2028-09-01'),

(55, 'balea-mandel', 'Crème douche Fleur d''amandier', 29, 2,
 $d$Crème douche Balea Mandelblüte 300 ml à la fleur d'amandier. Peaux normales à sèches, végan. Prix dm.de 0,95 €.$d$,
 $d$Aqua, mild surfactants, glycerin, almond blossom fragrance. Liste complète sur l'emballage.$d$,
 $d$Masser sur peau mouillée, rincer.$d$,
 $d$Éviter les yeux.$d$,
 '300 ml', 'Allemagne', 'Flacon Balea Mandelblüte d''origine dm, lot photographié.',
 650, null, 48, 'SHB-BL-MB300', '/products/balea-mandel.jpg?v=6',
 'sèche,normale', null, false, true, false, true, 'D26-013', '2028-09-01'),

(56, 'balea-med-ph', 'MED pH 5,5 gel douche', 29, 2,
 $d$Balea MED pH 5,5 Duschgel 300 ml. Ligne pharmacie dm : peaux sensibles, pH de la peau. Prix dm.de 1,25 €.$d$,
 $d$Aqua, allantoin, mild surfactants. Liste complète sur l'emballage.$d$,
 $d$Masser sur peau mouillée, rincer. Convient à un usage quotidien.$d$,
 $d$Sans parfum agressif. Éviter les yeux.$d$,
 '300 ml', 'Allemagne', 'Flacon Balea MED blanc/bleu d''origine, import dm, DLC contrôlée.',
 850, null, 40, 'SHB-BL-MD300', '/products/balea-med-ph.jpg?v=6',
 'sensible,sèche,normale', null, false, true, false, true, 'D26-020', '2028-08-15'),

(57, 'garnier-olive', 'Ultra Doux Olive Mythique', 30, 3,
 $d$Shampoing Garnier Ultra Doux Olive Mythique 250 ml. Huile d'olive vierge, nutrition extrême, sans silicone. Cheveux secs — tarif pharmacie 2,49 €.$d$,
 $d$Aqua, olive oil, mild surfactants. Liste complète sur l'emballage.$d$,
 $d$Sur cheveux mouillés, masser, rincer. Renouveler si besoin.$d$,
 $d$Éviter les yeux. Tenir hors de portée des enfants.$d$,
 '250 ml', 'France', 'Flacon Garnier Ultra Doux vert olive d''origine, lot contrôlé.',
 1650, null, 36, 'SHB-GA-OL250', '/products/garnier-olive.jpg?v=6',
 null, 'secs,abîmés,épais', false, true, true, true, 'G26-201', '2028-06-30'),

(58, 'garnier-avocat', 'Ultra Doux Avocat & karité', 30, 3,
 $d$Shampoing Garnier Ultra Doux huile d'avocat et beurre de karité 600 ml. Nourrit les cheveux secs, sans silicone. Format familial — tarif 4,90 €.$d$,
 $d$Aqua, persea gratissima oil, shea butter, surfactants. Liste complète sur l'emballage.$d$,
 $d$Sur cheveux mouillés, masser les longueurs, rincer.$d$,
 $d$Éviter les yeux.$d$,
 '600 ml', 'France', 'Flacon Garnier Ultra Doux avocat d''origine, lot scellé.',
 3200, null, 28, 'SHB-GA-AV600', '/products/garnier-avocat.jpg?v=6',
 null, 'secs,crépus,bouclés', false, true, false, true, 'G26-202', '2028-06-30'),

(59, 'garnier-miel', 'Ultra Doux Trésors de miel', 30, 3,
 $d$Shampoing Garnier Ultra Doux Trésors de Miel 300 ml. Miel et gelée royale pour cheveux abîmés, sans silicone. Tarif 3,19 €.$d$,
 $d$Aqua, honey, royal jelly, surfactants. Liste complète sur l'emballage.$d$,
 $d$Sur cheveux mouillés, masser, rincer. Idéal après chaleur.$d$,
 $d$Produit de la ruche : déconseillé en cas d'allergie au miel. Éviter les yeux.$d$,
 '300 ml', 'France', 'Flacon Garnier Ultra Doux miel d''origine, lot contrôlé.',
 2100, null, 36, 'SHB-GA-MI300', '/products/garnier-miel.jpg?v=6',
 null, 'abîmés,secs,colorés', false, true, false, true, 'G26-203', '2028-06-30'),

(60, 'evoluderm-argan', 'Shampoing Lissant Argan', 31, 3,
 $d$Shampoing Evoluderm Lissant Argan 400 ml. 96 % d'origine naturelle, végan, sans silicone. Huile d'argan — tarif evoluderm.com 2,25 €.$d$,
 $d$Aqua, argania spinosa kernel oil, mild surfactants. Liste complète sur l'emballage.$d$,
 $d$Sur cheveux humides, masser des longueurs aux pointes, rincer.$d$,
 $d$Éviter les yeux. Fabriqué en France.$d$,
 '400 ml', 'France', 'Flacon Evoluderm Argan d''origine, fabrication France, lot contrôlé.',
 1500, null, 32, 'SHB-EV-AR400', '/products/evoluderm-argan.jpg?v=6',
 null, 'secs,abîmés,très secs', false, true, false, true, 'C26-088', '2028-05-10'),

(61, 'evoluderm-karite', 'Shampoing Nourrissant Karité', 31, 3,
 $d$Shampoing Evoluderm Nourrissant Karité 400 ml. 96 % d'origine naturelle, végan, sans silicone. Beurre de karité — tarif evoluderm.com 2,25 €.$d$,
 $d$Aqua, butyrospermum parkii butter, mild surfactants. Liste complète sur l'emballage.$d$,
 $d$Sur cheveux humides, masser, rincer. Usage fréquent.$d$,
 $d$Éviter les yeux. Fabriqué en France.$d$,
 '400 ml', 'France', 'Flacon Evoluderm Karité d''origine, fabrication France, lot scellé.',
 1500, null, 32, 'SHB-EV-KA400', '/products/evoluderm-karite.jpg?v=6',
 null, 'secs,crépus,abîmés', false, true, false, true, 'C26-090', '2028-05-10'),

(62, 'rossmann-vit-c', 'altapharma Vitamine C effervescent', 32, 8,
 $d$Comprimés effervescents Rossmann altapharma Vitamine C, goût citron. 20 comprimés. Complément alimentaire — 800 F le tube.$d$,
 $d$Acidifiant, vitamine C (acide ascorbique), édulcorants, arôme citron. Voir tableau nutritionnel sur le tube.$d$,
 $d$1 comprimé par jour dans un grand verre d'eau (200 ml).$d$,
 $d$Complément alimentaire. Ne se substitue pas à une alimentation variée. Ne pas dépasser la dose journalière. Tenir hors de portée des enfants. Déconseillé aux enfants et aux femmes enceintes sans avis d'un professionnel de santé.$d$,
 '20 comprimés', 'Allemagne', 'Tube altapharma Rossmann d''origine, DLC contrôlée, scellé.',
 800, null, 60, 'SHB-RM-VC20', '/products/rossmann-vit-c.jpg?v=6',
 null, null, false, true, true, true, 'R26-301', '2027-12-31'),

(63, 'rossmann-magnesium', 'altapharma Magnésium 400 effervescent', 32, 8,
 $d$Comprimés effervescents Rossmann altapharma Magnésium 400 + vitamines C et E, goût pamplemousse. 20 comprimés. 800 F le tube.$d$,
 $d$Magnésium, vitamine C, vitamine E, acidifiants, arôme. Voir tableau sur le tube.$d$,
 $d$1 comprimé par jour dans 200 ml d'eau.$d$,
 $d$Complément alimentaire. Ne se substitue pas à une alimentation variée. Ne pas dépasser la dose. Tenir hors de portée des enfants.$d$,
 '20 comprimés', 'Allemagne', 'Tube altapharma Magnésium d''origine Rossmann, DLC contrôlée.',
 800, null, 60, 'SHB-RM-MG20', '/products/rossmann-magnesium.jpg?v=6',
 null, null, false, true, false, true, 'R26-302', '2027-12-31'),

(64, 'rossmann-multi', 'altapharma Multivitamines effervescent', 32, 8,
 $d$Comprimés effervescents Rossmann altapharma Multivitamin + Mineral. 20 comprimés. 800 F le tube.$d$,
 $d$Vitamines A, B, C, D, E, minéraux. Voir tableau nutritionnel sur le tube.$d$,
 $d$1 comprimé par jour dans 200 ml d'eau, au petit-déjeuner.$d$,
 $d$Complément alimentaire. Ne se substitue pas à une alimentation variée. Ne pas dépasser la dose. Tenir hors de portée des enfants.$d$,
 '20 comprimés', 'Allemagne', 'Tube altapharma Multivitamin d''origine Rossmann, lot photographié.',
 800, null, 60, 'SHB-RM-AZ20', '/products/rossmann-multi.jpg?v=6',
 null, null, false, true, false, true, 'R26-303', '2027-12-31'),

(65, 'rossmann-calcium', 'altapharma Calcium + D3 effervescent', 32, 8,
 $d$Comprimés effervescents Rossmann altapharma Calcium + vitamine D3. 20 comprimés. 800 F le tube.$d$,
 $d$Calcium, vitamine D3, acidifiants, arôme. Voir tableau sur le tube.$d$,
 $d$1 comprimé par jour dans 200 ml d'eau.$d$,
 $d$Complément alimentaire. Ne se substitue pas à une alimentation variée. Ne pas dépasser la dose. Tenir hors de portée des enfants.$d$,
 '20 comprimés', 'Allemagne', 'Tube altapharma Calcium d''origine Rossmann, DLC contrôlée.',
 800, null, 60, 'SHB-RM-CA20', '/products/rossmann-calcium.jpg?v=6',
 null, null, false, true, false, true, 'R26-304', '2027-12-31')

on conflict (slug) do nothing;

select setval('brands_id_seq', (select max(id) from brands));
select setval('products_id_seq', (select max(id) from products));
select setval('categories_id_seq', (select max(id) from categories));
