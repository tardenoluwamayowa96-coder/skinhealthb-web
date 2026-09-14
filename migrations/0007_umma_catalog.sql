-- Catalogue UMMA : nouvelles marques K-beauty, 15 références, + ~8 % sur les SKU déjà sourcés.

insert into brands (id, slug, name, country, verified) values
  (9, 'skin1004', 'SKIN1004', 'Corée', true),
  (10, 'round-lab', 'Round Lab', 'Corée', true),
  (11, 'dalba', 'd''Alba', 'Corée', true),
  (12, 'tirtir', 'TIRTIR', 'Corée', true),
  (13, 'axis-y', 'AXIS-Y', 'Corée', true),
  (14, 'mixsoon', 'Mixsoon', 'Corée', true),
  (15, 'vt-cosmetics', 'VT Cosmetics', 'Corée', true)
on conflict (slug) do nothing;

update categories
set description = 'Cushions, teints et fixateurs — sélection K-beauty.'
where slug = 'maquillage';

-- Hausse légère (~8 %) des produits K-beauty déjà au catalogue (circuit UMMA).
update products set price_xof = 19900 where slug = 'cosrx-snail-96-essence' and price_xof < 19900;
update products set price_xof = 12900 where slug = 'cosrx-low-ph-cleanser' and price_xof < 12900;
update products set price_xof = 15900 where slug = 'boje-relief-sun' and price_xof < 15900;
update products set price_xof = 18900 where slug = 'boje-glow-serum' and price_xof < 18900;
update products set price_xof = 17900 where slug = 'anua-heartleaf-toner' and price_xof < 17900;
update products set price_xof = 10900, compare_at_xof = 13500 where slug = 'ordinary-niacinamide' and price_xof < 10900;
update products set price_xof = 11500 where slug = 'ordinary-hyaluronic' and price_xof < 11500;
update products set price_xof = 23900 where slug = 'medicube-zero-pore-pad' and price_xof < 23900;
update products set price_xof = 20900 where slug = 'arencia-rice-mochi' and price_xof < 20900;
update products set price_xof = 26500 where slug = 'medicube-collagen-mask' and price_xof < 26500;
update products set price_xof = 18500 where slug = 'boje-red-bean-gel' and price_xof < 18500;
update products set price_xof = 22900 where slug = 'ordinary-hair-density' and price_xof < 22900;

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values
(17, 'skin1004-centella-ampoule', 'Madagascar Centella Ampoule', 9, 1,
 $d$Ampoule 100 % extrait de centella de Madagascar. Calme les rougeurs, hydrate sans film gras — le réflexe chaleur et acné à Lomé. Texture aqueuse, non collante.$d$,
 $d$Centella asiatica extract (Madagascar). Liste complète sur l'emballage.$d$,
 $d$Après le toner, 3 à 4 gouttes sur visage et cou, matin et soir. Se superpose sous un SPF.$d$,
 $d$Usage externe. Éviter le contour des yeux. Patch-test si peau très réactive.$d$,
 '55 ml', 'Corée', 'SKIN1004 — flacon compte-gouttes d''origine, lot photographié à réception.',
 12900, null, 22, 'SHB-S1-CA55', '/products/skin1004-centella-ampoule.jpg?v=5',
 'sensible,grasse,mixte,acneique,normale', null, true, true, false, true, 'K25-014', '2027-11-30'),

(18, 'anua-pore-cleansing-oil', 'Heartleaf Pore Control Cleansing Oil', 3, 1,
 $d$Huile démaquillante heartleaf qui dissout SPF, sébum et pollution, puis s'émulsionne à l'eau. Premier nettoyage du soir, indispensable sous le soleil de Lomé.$d$,
 $d$Ethylhexyl palmitate, houttuynia cordata extract, surfactants doux. Liste complète sur l'emballage.$d$,
 $d$Sur peau sèche, masser 30 secondes, ajouter de l'eau pour émulsionner, rincer, puis second nettoyant.$d$,
 $d$Éviter les yeux. Rincer abondamment. Usage externe.$d$,
 '200 ml', 'Corée', 'Pompe Anua d''origine — huile claire qui s''émulsionne, lot contrôlé.',
 20500, null, 16, 'SHB-AN-PCO', '/products/anua-pore-cleansing-oil.jpg?v=5',
 'mixte,grasse,normale,sensible', null, false, true, false, true, 'N25-102', '2027-12-15'),

(19, 'round-lab-birch-sun', 'Birch Juice Moisturizing Sunscreen SPF50+', 10, 1,
 $d$Crème solaire hydratante au sève de bouleau, SPF50+ PA++++. Fini fluide, sans film blanc — plan B du Relief Sun pour peaux mixtes et grasses.$d$,
 $d$Betula alba juice, UV filters, hyaluronic acid. Liste complète sur l'emballage.$d$,
 $d$Dernière étape du matin, 1/3 de cuillère à café pour le visage. Renouveler toutes les 2 heures en exposition.$d$,
 $d$Usage externe. La protection solaire ne remplace pas l'ombre ni le chapeau.$d$,
 '50 ml', 'Corée', 'Tube Round Lab d''origine, fini fluide, contrôle white-cast sur peau foncée.',
 15900, null, 28, 'SHB-RL-BJ50', '/products/round-lab-birch-sun.jpg?v=5',
 'mixte,grasse,normale,sensible', null, false, true, true, true, 'R25-061', '2027-09-01'),

(20, 'cosrx-snail-92-cream', 'Advanced Snail 92 All in One Cream', 2, 1,
 $d$Crème-gel à 92 % de filtrat de mucine d'escargot. Hydrate, apaise et scelle la routine Snail 96. Texture riche sans étouffer au climat togolais, le soir.$d$,
 $d$Snail secretion filtrate, betaine, sodium hyaluronate. Liste complète sur l'emballage.$d$,
 $d$Soir, une noisette après l'essence. Peut se porter seul les jours secs.$d$,
 $d$Éviter le contour des yeux. Patch-test. Usage externe.$d$,
 '100 g', 'Corée', 'QR COSRX Record obligatoire — jamais de Snail 92 sans facture coréenne.',
 18900, null, 14, 'SHB-CX-S92', '/products/cosrx-snail-92-cream.jpg?v=5',
 'sèche,normale,mixte,sensible', null, false, true, false, true, 'A25-209', '2027-10-20'),

(21, 'anua-txa-serum', 'Niacinamide 10% + TXA 4% Serum', 3, 1,
 $d$Sérum taches n°1 : niacinamide 10 % et acide tranexamique 4 %. Aide à estomper PIH et teint inégal, sans hydroquinone. Texture aqueuse, sans parfum.$d$,
 $d$Niacinamide, tranexamic acid, hyaluronic acid. Liste complète sur l'emballage.$d$,
 $d$Soir, 3 gouttes sur zones pigmentées, puis crème. Toujours un SPF le jour.$d$,
 $d$Peut piquer en début d'usage. Ceci n'est pas un médicament. Consulter un dermatologue si taches persistantes.$d$,
 '30 ml', 'Corée', 'Flacon Anua 10+ d''origine, sérum fluide rose, lot archivé.',
 20500, null, 20, 'SHB-AN-TXA', '/products/anua-txa-serum.jpg?v=5',
 'mixte,grasse,normale,taches,acneique', null, true, true, true, true, 'N25-088', '2027-11-12'),

(22, 'dalba-first-spray', 'White Truffle First Spray Serum', 11, 1,
 $d$Brume biphasée à la truffe blanche : eau + huile en un spray. Hydrate, illumine, fixe le maquillage. Le best-seller UMMA le plus viral — à agiter avant chaque use.$d$,
 $d$Tuber magnatum extract, oils, aqua. Liste complète sur l'emballage.$d$,
 $d$Agiter 3 secondes, vaporiser yeux fermés à 20 cm, matin et/ou soir, ou pour rafraîchir.$d$,
 $d$Éviter l'inhalation directe. Usage externe. Peut rendre le sol glissant.$d$,
 '100 ml', 'Corée', 'd''Alba Piedmont — spray or d''origine, couches eau/huile visibles.',
 24900, 27900, 18, 'SHB-DA-WTFS', '/products/dalba-first-spray.jpg?v=5',
 'sèche,normale,mixte,terne', null, true, true, true, true, 'D25-033', '2027-08-18'),

(23, 'tirtir-mask-fit-cushion', 'Mask Fit Red Cushion — teinte 33N', 12, 4,
 $d$Cushion viral TIRTIR, couvrance modulable, fini satiné, tenue masque et chaleur. Teinte 33N Natural Beige — adaptée aux peaux mates à médium. Autres teintes sur commande.$d$,
 $d$Water, titanium dioxide, iron oxides, film formers. Liste complète sur l'emballage.$d$,
 $d$Tapoter l'éponge sur le cushion, estomper du centre vers l'extérieur. Recharger midi si besoin.$d$,
 $d$Démaquiller le soir. Faire un essai de teinte au poignet. Non comédogène n'est pas une garantie individuelle.$d$,
 '18 g · 33N', 'Corée', 'Boîtier rouge TIRTIR scellé, teinte 33N, lot et DLC contrôlés.',
 24900, null, 12, 'SHB-TT-MFRC33', '/products/tirtir-mask-fit-cushion.jpg?v=5',
 'normale,mixte,grasse', null, true, true, false, true, 'T25-117', '2027-07-30'),

(24, 'boje-revive-eye', 'Revive Eye Serum Ginseng + Retinal', 4, 1,
 $d$Sérum contour des yeux ginseng + rétinal 2 %. Lisse les ridules, réveille un regard fatigué. Texture miel fluide, best-seller UMMA d'avril.$d$,
 $d$Panax ginseng root extract, retinal, niacinamide, macadamia oil. Liste complète sur l'emballage.$d$,
 $d$Soir, un grain de riz sous chaque œil, en tapotant. Introduire 3 soirs / semaine si vous débutez le rétinal.$d$,
 $d$Rétinal : SPF le lendemain. Ne pas superposer un acide fort le même soir. Grossesse : demander conseil.$d$,
 '30 ml', 'Corée', 'Tube Beauty of Joseon d''origine, texture miel, lot photographié.',
 21500, null, 15, 'SHB-BJ-RES', '/products/boje-revive-eye.jpg?v=5',
 'normale,sèche,mixte', null, false, true, false, true, 'J25-174', '2027-10-05'),

(25, 'skin1004-clay-stick', 'Poremizing Quick Clay Stick Mask', 9, 1,
 $d$Stick d'argile rose + centella : on glisse, on attend 5 minutes, on rince. Pores, sébum, grain de peau — sans saladier ni pinceau. Format voyage, climat chaud.$d$,
 $d$Kaolin, centella asiatica extract, pink clay. Liste complète sur l'emballage.$d$,
 $d$Sur peau propre, zone T et joues. 5 minutes, rincer à l'eau tiède. 2 à 3 fois par semaine.$d$,
 $d$Éviter le contour des yeux. Ne pas laisser sécher trop longtemps. Usage externe.$d$,
 '27 g', 'Corée', 'Stick SKIN1004 rose, capuchon blanc, argile compacte intacte.',
 12900, null, 20, 'SHB-S1-PQCM', '/products/skin1004-clay-stick.jpg?v=5',
 'grasse,mixte,normale', null, false, true, false, true, 'K25-055', '2027-12-01'),

(26, 'anua-peach-70-serum', 'Peach 70 Niacin Serum', 3, 1,
 $d$Sérum éclat 70 % extrait de pêche + 5 % niacinamide. Teint plus lumineux, hydratation légère, fini « peach glow ». Vegan, sans parfum ajouté lourd.$d$,
 $d$Prunus persica fruit extract, niacinamide, hyaluronic acid. Liste complète sur l'emballage.$d$,
 $d$Matin et/ou soir, 3 gouttes après le toner, avant la crème. Se porte sous le SPF.$d$,
 $d$Usage externe. En cas d'irritation, espacer les applications.$d$,
 '30 ml', 'Corée', 'Flacon Anua 70+ rose, sérum pêche, lot scellé.',
 18900, null, 18, 'SHB-AN-P70', '/products/anua-peach-70-serum.jpg?v=5',
 'normale,sèche,mixte,terne', null, false, true, false, true, 'N25-141', '2027-11-08'),

(27, 'axis-y-glow-serum', 'Dark Spot Correcting Glow Serum', 13, 1,
 $d$Sérum taches AXIS-Y au niacinamide 5 % et squalane végétal. Cible le teint inégal et les marques, texture lait léger. Vegan, pensé peaux sensibles.$d$,
 $d$Niacinamide, squalane, papaya extract. Liste complète sur l'emballage.$d$,
 $d$Soir, une pompe sur visage propre. Constancy + SPF = résultats taches.$d$,
 $d$Ceci n'est pas un traitement médical de l'hyperpigmentation. SPF indispensable le jour.$d$,
 '50 ml', 'Corée', 'Tube AXIS-Y blanc/vert d''origine, pompe intacte, lot contrôlé.',
 17900, null, 16, 'SHB-AX-DSG', '/products/axis-y-glow-serum.jpg?v=5',
 'mixte,normale,sensible,taches', null, false, true, false, true, 'Y25-022', '2028-01-15'),

(28, 'mixsoon-bean-essence', 'Bean Essence', 14, 1,
 $d$Essence fermentée au soja mixsoon : hydratation + sébum selon l'usage (sérum ou nettoyage express). Texture fluide, cult favorite UMMA, peu copiée.$d$,
 $d$Glycine soja seed extract, fermented filtrates. Liste complète sur l'emballage.$d$,
 $d$2 à 3 pompes après le toner, ou massez 20 secondes comme second nettoyage puis rincez.$d$,
 $d$Allergie soja : éviter. Usage externe.$d$,
 '50 ml', 'Corée', 'Flacon Mixsoon verre, pompe blanche, liquide ambré clair.',
 22900, null, 12, 'SHB-MX-BE', '/products/mixsoon-bean-essence.jpg?v=5',
 'mixte,grasse,normale,sèche', null, false, true, true, true, 'X25-009', '2027-09-22'),

(29, 'round-lab-dokdo-toner', '1025 Dokdo Toner', 10, 1,
 $d$Lotion tonique minérale 1025 Dokdo, best toner Olive Young. Hydrate, ôte les résidus, prépare aux sérums. Grande contenance, pH doux, zéro parfum agressif.$d$,
 $d$Sea water, panthenol, allantoin. Liste complète sur l'emballage.$d$,
 $d$Avec les mains ou un coton, après le nettoyage. Peut servir de compresses 3 minutes.$d$,
 $d$Usage externe. Conserver à l'abri de la chaleur.$d$,
 '200 ml', 'Corée', 'Flacon Round Lab 1025, liquide incolore, lot et DLC enregistrés.',
 17900, null, 20, 'SHB-RL-DKT', '/products/round-lab-dokdo-toner.jpg?v=5',
 'normale,sèche,mixte,sensible,grasse', null, false, true, false, true, 'R25-090', '2028-02-28'),

(30, 'cosrx-pimple-patch', 'Acne Pimple Master Patch', 2, 1,
 $d$24 patchs hydrocolloïdes COSRX, trois tailles. Isolent le bouton, absorbent de nuit, discrets le jour. Le SKU d'entrée UMMA — à toujours avoir dans le sac.$d$,
 $d$Hydrocolloid dressing. Liste complète sur l'emballage.$d$,
 $d$Peau propre et sèche, un patch par lésion, 6 à 8 heures. Ne pas réutiliser.$d$,
 $d$Ne pas poser sur plaie ouverte profonde. Ceci n'est pas un antibiotique.$d$,
 '24 patchs', 'Corée', 'Sachet COSRX rouge/blanc scellé, 24 patchs, DLC contrôlée.',
 6900, null, 40, 'SHB-CX-PPM', '/products/cosrx-pimple-patch.jpg?v=5',
 'acneique,grasse,mixte,normale', null, false, true, false, true, 'A25-301', '2028-04-10'),

(31, 'vt-collagen-reedle-100', 'Collagen Reedle Shot 100', 15, 1,
 $d$Booster Cica Reedle™ 100 + collagène : micro-aiguilles solubles pour faire pénétrer les actifs. Sensation de picotement courte, peau plus lisse. Best-seller VT chez UMMA.$d$,
 $d$Cica reedle, hydrolyzed collagen, centella, hyaluronic acid. Liste complète sur l'emballage.$d$,
 $d$Première étape du soir sur peau propre, 1 à 2 pompes, laisser 10 minutes avant le sérum. Débuter 2 soirs / semaine.$d$,
 $d$Picotement normal et transitoire. Ne pas utiliser sur peau lésée, lèvres, yeux. SPF le lendemain. Pas un dispositif médical.$d$,
 '50 ml', 'Corée', 'Flacon pompe VT rose gold, circuit officiel, lot photographié.',
 26500, null, 10, 'SHB-VT-RS100', '/products/vt-collagen-reedle-100.jpg?v=5',
 'normale,mixte,sèche', null, false, true, false, true, 'V25-044', '2027-08-12')
on conflict (slug) do nothing;

select setval('brands_id_seq', (select max(id) from brands));
select setval('products_id_seq', (select max(id) from products));
