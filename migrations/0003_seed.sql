insert into brands (id, slug, name, country, verified) values
  (1, 'medicube', 'Medicube', 'Corée', true),
  (2, 'cosrx', 'COSRX', 'Corée', true),
  (3, 'anua', 'Anua', 'Corée', true),
  (4, 'beauty-of-joseon', 'Beauty of Joseon', 'Corée', true),
  (5, 'caudalie', 'Caudalie', 'France', true),
  (6, 'the-ordinary', 'The Ordinary', 'Canada', true),
  (7, 'arencia', 'Arencia', 'Corée', true),
  (8, 'svr', 'SVR', 'France', true)
on conflict (slug) do nothing;

insert into categories (id, slug, name, description, sort_order) values
  (1, 'visage', 'Soins du visage', 'Nettoyants, sérums, crèmes, masques et solaires.', 1),
  (2, 'corps', 'Soins du corps', 'Laits, huiles, gommages et soins des mains.', 2),
  (3, 'capillaire', 'Capillaire', 'Shampoings, masques, huiles et densifiants.', 3),
  (4, 'maquillage', 'Maquillage', 'Teints, lèvres et accessoires — bientôt.', 4),
  (5, 'parfums', 'Parfums', 'Parfums, brumes et coffrets — bientôt.', 5),
  (6, 'hommes', 'Hommes', 'Rasage, barbe, visage et parfums.', 6),
  (7, 'accessoires', 'Accessoires', 'Pinceaux, éponges, miroirs et outils de soin.', 7)
on conflict (slug) do nothing;

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values
(1, 'cosrx-snail-96-essence', 'Advanced Snail 96 Mucin Power Essence', 2, 1,
 $d$Essence légère à 96 % de filtrat de mucine d'escargot, pensée pour hydrater, apaiser et soutenir la barrière cutanée. Texture filante, non grasse, adaptée à une routine quotidienne au climat togolais.$d$,
 $d$Snail secretion filtrate, betaine, sodium hyaluronate, panthenol, allantoin. Liste complète sur l'emballage.$d$,
 $d$Après le toner, appliquer 2 à 3 pompes sur peau propre, puis sceller avec une crème. Peut se superposer sous un SPF le matin.$d$,
 $d$Éviter le contour des yeux. En cas d'irritation, cesser l'usage. Patch-test recommandé.$d$,
 '100 ml', 'Corée', 'Lot vérifié — importateur documenté, numéro de lot contrôlé à réception.',
 19900, null, 24, 'SHB-CX-SN96', '/products/cosrx-snail-96-essence.jpg?v=3',
 'sèche,mixte,sensible,normale', null, true, false, true, true, 'A24-118', '2027-11-30'),

(2, 'cosrx-low-ph-cleanser', 'Low pH Good Morning Gel Cleanser', 2, 1,
 $d$Nettoyant gel au pH bas (environ 5,0–6,0) qui retire les impuretés sans décaper. Idéal le matin, seul ou en second nettoyage le soir.$d$,
 $d$Melaleuca alternifolia leaf oil, sodium methyl cocoyl taurate, cocamidopropyl betaine. Liste complète sur l'emballage.$d$,
 $d$Mouiller le visage, faire mousser une noisette, masser 30 secondes, rincer à l'eau tiède.$d$,
 $d$Éviter le contact avec les yeux. Usage externe uniquement.$d$,
 '150 ml', 'Corée', 'Fournisseur agréé — facture d''achat et date d''expiration archivées.',
 12900, null, 30, 'SHB-CX-GMG', '/products/cosrx-low-ph-cleanser.jpg?v=3',
 'grasse,mixte,normale', null, false, true, false, true, 'B24-042', '2028-02-15'),

(3, 'boje-relief-sun', 'Relief Sun Rice + Probiotics SPF50+', 4, 1,
 $d$Écran solaire SPF50+ PA++++ au riz et ferments, fini confortable, peu blanc. Conçu pour une protection quotidienne, y compris sous le maquillage.$d$,
 $d$Oryza sativa (rice) extract, lactobacillus ferment, UV filters. Liste complète sur l'emballage.$d$,
 $d$Dernière étape du matin : 1/3 de cuillère à café pour le visage. Renouveler toutes les 2 heures en exposition.$d$,
 $d$Usage externe. Ne pas appliquer sur plaie. La protection solaire ne remplace pas l'ombre ni le chapeau.$d$,
 '50 ml', 'Corée', 'Contrôle d''authenticité : hologramme / lot photographié à l''arrivée.',
 15900, null, 40, 'SHB-BJ-RS50', '/products/boje-relief-sun.jpg?v=3',
 'normale,sèche,mixte,grasse,sensible', null, true, false, true, true, 'J24-207', '2027-08-01'),

(4, 'boje-glow-serum', 'Glow Serum Propolis + Niacinamide', 4, 1,
 $d$Sérum éclat à la propolis et au niacinamide pour un teint plus lumineux et une peau visiblement plus lisse. Texture miel fluide, non collante.$d$,
 $d$Propolis extract, niacinamide, betaine, panthenol. Liste complète sur l'emballage.$d$,
 $d$Soir, 3 à 4 gouttes sur visage et cou, avant la crème. Introduire progressivement si peau sensible.$d$,
 $d$Contient de la propolis (produit de la ruche) : déconseillé en cas d'allergie aux produits de l'abeille.$d$,
 '30 ml', 'Corée', 'Origine Corée — documents d''importation disponibles sur demande.',
 18900, null, 18, 'SHB-BJ-GS', '/products/boje-glow-serum.jpg?v=3',
 'normale,sèche,mixte,terne', null, true, false, false, true, 'J24-155', '2027-09-20'),

(5, 'anua-heartleaf-toner', 'Heartleaf 77% Soothing Toner', 3, 1,
 $d$Lotion tonique apaisante à 77 % d'extrait de houttuynia (heartleaf). Aide à calmer les rougeurs et à préparer la peau aux sérums.$d$,
 $d$Houttuynia cordata extract, panthenol, hyaluronic acid. Liste complète sur l'emballage.$d$,
 $d$Appliquer avec les mains ou un coton, en tapotant. Peut servir de compresses 5 minutes sur zones sensibles.$d$,
 $d$En cas de réaction, arrêter. Conserver à l'abri de la chaleur.$d$,
 '250 ml', 'Corée', 'Lot scellé, contrôle visuel d''emballage et d''expiration.',
 17900, null, 22, 'SHB-AN-HL77', '/products/anua-heartleaf-toner.jpg?v=3',
 'sensible,grasse,mixte,acneique', null, false, false, true, true, 'N24-088', '2027-12-10'),

(6, 'ordinary-niacinamide', 'Niacinamide 10% + Zinc 1%', 6, 1,
 $d$Sérum concentré de niacinamide et de zinc, destiné aux peaux à pores visibles et à l'excès de sébum. Texture fluide, sèche vite.$d$,
 $d$Niacinamide, zinc PCA, pentylene glycol. Liste complète sur l'emballage.$d$,
 $d$Soir, quelques gouttes sur peau propre. Éviter de superposer le même soir un acide fort si vous débutez.$d$,
 $d$Peut piquer en début d'usage. Ne pas utiliser sur peau lésée. Usage externe.$d$,
 '30 ml', 'Canada', 'Flacon scellé The Ordinary — chaîne d''approvisionnement vérifiée.',
 10900, 13500, 50, 'SHB-TO-N10', '/products/ordinary-niacinamide.jpg?v=3',
 'grasse,mixte,acneique', null, false, false, true, true, 'T24-331', '2028-01-05'),

(7, 'ordinary-hyaluronic', 'Hyaluronic Acid 2% + B5', 6, 1,
 $d$Sérum hydratant multi-poids d'acide hyaluronique et de panthénol. Apporte de l'eau à la peau ; à sceller ensuite avec une crème.$d$,
 $d$Sodium hyaluronate, panthenol, pentylene glycol. Liste complète sur l'emballage.$d$,
 $d$Sur peau encore humide, 2 à 3 gouttes, puis crème. Matin et/ou soir.$d$,
 $d$En climat très sec, toujours recouvrir d'un émollient pour éviter l'effet inverse.$d$,
 '30 ml', 'Canada', 'Authenticité : code de lot The Ordinary contrôlé.',
 11500, null, 45, 'SHB-TO-HA2', '/products/ordinary-hyaluronic.jpg?v=3',
 'sèche,normale,mixte,sensible', null, false, false, false, true, 'T24-290', '2028-03-12'),

(8, 'medicube-zero-pore-pad', 'Zero Pore Pad 2.0', 1, 1,
 $d$Disques exfoliants doux pour affiner visiblement le grain de peau et les pores. Une face texture, une face lisse.$d$,
 $d$Gluconolactone (PHA), cellulose pads, soothing agents. Liste complète sur l'emballage.$d$,
 $d$Soir, 1 disque sur visage en évitant le contour des yeux. 3 à 4 fois par semaine au début.$d$,
 $d$Ne pas superposer le même soir un rétinoïde ou un acide fort. SPF indispensable le lendemain.$d$,
 '70 pads', 'Corée', 'Boîte d''origine Medicube, scellée, lot photographié.',
 23900, null, 16, 'SHB-MD-ZP2', '/products/medicube-zero-pore-pad.jpg?v=3',
 'mixte,grasse,normale', null, true, false, false, true, 'M24-064', '2027-07-18'),

(9, 'caudalie-vinoperfect', 'Vinoperfect Sérum Éclat Anti-Taches', 5, 1,
 $d$Sérum signature Caudalie à la viniférine, destiné à unifier le teint et à atténuer visiblement les taches. Texture soyeuse, parfum discret.$d$,
 $d$Viniferine (palmarosa), aqua, glycerin. Liste complète sur l'emballage.$d$,
 $d$Matin et soir, 3 gouttes avant la crème. Toujours associer un SPF le jour.$d$,
 $d$Les résultats taches nécessitent de la constance et une protection solaire. Ceci n'est pas un médicament.$d$,
 '30 ml', 'France', 'Import France — facture distributeur et n° de lot archivés.',
 41500, 45500, 10, 'SHB-CD-VP', '/products/caudalie-vinoperfect.jpg?v=3',
 'normale,sèche,mixte,taches', null, true, false, true, true, 'C24-019', '2027-10-01'),

(10, 'svr-sebiaclear', 'Sebiaclear Active', 8, 1,
 $d$Soin SVR pour peaux à tendance acnéique : aide à réduire visiblement les imperfections et les marques tout en hydratant.$d$,
 $d$Niacinamide, acids (formule SVR). Liste complète sur l'emballage.$d$,
 $d$Soir, une noisette sur visage propre. Introduire un soir sur deux si peau réactive.$d$,
 $d$Peut provoquer desquamation transitoire. SPF le jour. Consulter un dermatologue si acné sévère — ce n'est pas un médicament.$d$,
 '40 ml', 'France', 'Laboratoire SVR — circuit officinal / distributeur vérifié.',
 17500, null, 20, 'SHB-SV-SA', '/products/svr-sebiaclear.jpg?v=3',
 'grasse,acneique,mixte', null, false, false, false, true, 'S24-112', '2028-04-30'),

(11, 'arencia-rice-mochi', 'Fresh Green Rice Mochi Cleanser', 7, 1,
 $d$Nettoyant mochi au riz, texture unique qui se transforme en lait. Nettoie en douceur, laisse la peau souple, sans tiraillement.$d$,
 $d$Oryza sativa extract, surfactants doux. Liste complète sur l'emballage.$d$,
 $d$Masser 10 secondes sur peau sèche ou humide, émulsionner avec de l'eau, rincer.$d$,
 $d$Usage externe. Éviter les yeux.$d$,
 '120 g', 'Corée', 'Marque Arencia — colis d''origine, contrôle à l''ouverture.',
 20900, null, 14, 'SHB-AR-RM', '/products/arencia-rice-mochi.jpg?v=3',
 'sèche,sensible,normale,mixte', null, false, true, false, true, 'R24-033', '2027-06-22'),

(12, 'medicube-collagen-mask', 'Collagen Night Wrapping Mask', 1, 1,
 $d$Masque de nuit « wrapping » au collagène : film transparent qui se rince le matin. Sensation de peau plus ferme au réveil.$d$,
 $d$Hydrolyzed collagen, film formers. Liste complète sur l'emballage.$d$,
 $d$Soir, couche fine en évitant sourcils et cheveux. Rincer le matin à l'eau tiède.$d$,
 $d$Ne pas utiliser sur peau irritée. Tenir hors de portée des enfants.$d$,
 '75 ml', 'Corée', 'Lot Medicube authentifié, date d''expiration contrôlée.',
 26500, null, 12, 'SHB-MD-CNM', '/products/medicube-collagen-mask.jpg?v=3',
 'normale,sèche,mixte', null, false, true, false, true, 'M24-091', '2027-05-14'),

(13, 'caudalie-vinohydra', 'Vinotherapist Soin Corps Nourrissant', 5, 2,
 $d$Lait hydratant Caudalie au raisin et à l'acide hyaluronique, texture fondante pour le corps. Confort immédiat, parfum frais de vigne.$d$,
 $d$Vitis vinifera fruit water, glycerin, shea. Liste complète sur l'emballage.$d$,
 $d$Après la douche, sur peau encore humide, du cou aux pieds.$d$,
 $d$Usage externe. Éviter les plaies ouvertes.$d$,
 '200 ml', 'France', 'Caudalie France — preuve d''achat fournisseur.',
 20500, null, 18, 'SHB-CD-VH', '/products/caudalie-vinohydra.jpg?v=3',
 'sèche,normale,sensible', null, false, false, false, true, 'C24-044', '2028-01-20'),

(14, 'svr-topialyse-huile', 'Topialyse Huile Lavante', 8, 2,
 $d$Huile lavante relipidante SVR pour peaux sèches à très sèches. Nettoie sans agresser, idéal douche quotidienne.$d$,
 $d$Lipids, mild surfactants. Liste complète sur l'emballage.$d$,
 $d$Sur peau mouillée, une pression, masser, rincer. Peut servir de shampoing doux occasionnel.$d$,
 $d$Sol glissant : attention en baignoire. Usage externe.$d$,
 '400 ml', 'France', 'SVR — circuit vérifié, lot et DLU enregistrés.',
 17900, null, 15, 'SHB-SV-TH', '/products/svr-topialyse-huile.jpg?v=3',
 'sèche,sensible,très sèche', null, false, false, false, true, 'S24-078', '2028-06-01'),

(15, 'boje-red-bean-gel', 'Red Bean Water Gel', 4, 1,
 $d$Gel frais au haricot rouge, hydratation légère idéale par forte chaleur. Fini non gras, confortable sous le SPF.$d$,
 $d$Phaseolus angularis seed extract, hyaluronic acid. Liste complète sur l'emballage.$d$,
 $d$Matin et soir après le sérum, ou seul les jours chauds.$d$,
 $d$Texture gel : secouer légèrement si séparation. Usage externe.$d$,
 '100 ml', 'Corée', 'Beauty of Joseon — emballage d''origine scellé.',
 18500, null, 20, 'SHB-BJ-RB', '/products/boje-red-bean-gel.jpg?v=3',
 'mixte,grasse,normale', null, false, true, false, true, 'J24-241', '2027-12-01'),

(16, 'ordinary-hair-density', 'Multi-Peptide Serum for Hair Density', 6, 3,
 $d$Sérum capillaire peptidique The Ordinary, à masser sur le cuir chevelu pour un aspect de densité. Usage cosmétique, constance requise.$d$,
 $d$Peptide complex, aqua. Liste complète sur l'emballage.$d$,
 $d$Soir, compte-gouttes sur cuir chevelu propre, masser 30 secondes. Ne pas rincer.$d$,
 $d$Éviter le contact oculaire. Ceci n'est pas un traitement médical de l'alopécie.$d$,
 '60 ml', 'Canada', 'The Ordinary — flacon scellé, lot contrôlé.',
 22900, null, 11, 'SHB-TO-HD', '/products/ordinary-hair-density.jpg?v=3',
 null, 'fins,clairsemés,tous', false, false, false, true, 'T24-401', '2028-02-28')
on conflict (slug) do nothing;

select setval('brands_id_seq', (select max(id) from brands));
select setval('categories_id_seq', (select max(id) from categories));
select setval('products_id_seq', (select max(id) from products));

insert into site_settings (key, value) values
  ('announcement', 'Livraison au Togo · Paiement Flooz et TMoney · Produits authentiques vérifiés'),
  ('whatsapp', ''),
  ('paygate_test_mode', 'true'),
  ('paygate_auth_token', ''),
  ('store_phone', ''),
  ('free_shipping_lome', '40000')
on conflict (key) do nothing;
