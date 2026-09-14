-- Vague 2 UMMA : best-sellers taches / solaire / nettoyage + hausse légère Caudalie/SVR.

insert into brands (id, slug, name, country, verified) values
  (16, 'some-by-mi', 'Some By Mi', 'Corée', true),
  (17, 'haruharu-wonder', 'Haruharu Wonder', 'Corée', true),
  (18, 'goodal', 'Goodal', 'Corée', true),
  (19, 'numbuzin', 'numbuzin', 'Corée', true),
  (20, 'torriden', 'Torriden', 'Corée', true),
  (21, 'manyo', 'ma:nyo', 'Corée', true),
  (22, 'biodance', 'Biodance', 'Corée', true),
  (23, 'purito', 'Purito Seoul', 'Corée', true),
  (24, 'iunik', 'iUNIK', 'Corée', true),
  (25, 'romand', 'rom&nd', 'Corée', true)
on conflict (slug) do nothing;

update products set price_xof = 41500, compare_at_xof = 45500
where slug = 'caudalie-vinoperfect' and price_xof < 41500;
update products set price_xof = 20500 where slug = 'caudalie-vinohydra' and price_xof < 20500;
update products set price_xof = 17500 where slug = 'svr-sebiaclear' and price_xof < 17500;
update products set price_xof = 17900 where slug = 'svr-topialyse-huile' and price_xof < 17900;

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values
(32, 'skin1004-hyalu-cica-sun', 'Hyalu-Cica Water-Fit Sun Serum SPF50+', 9, 1,
 $d$Sérum solaire SKIN1004 SPF50+ PA++++, fini eau, sans film blanc. Centella + acide hyaluronique : le solaire « second peau » pour la chaleur de Lomé, sous le maquillage.$d$,
 $d$Centella asiatica extract, hyaluronic acid, UV filters. Liste complète sur l'emballage.$d$,
 $d$Dernière étape du matin, quantité généreuse. Renouveler toutes les 2 heures en exposition.$d$,
 $d$Usage externe. La protection solaire ne remplace pas l'ombre ni le chapeau.$d$,
 '50 ml', 'Corée', 'Tube SKIN1004 d''origine, fini fluide, contrôle white-cast sur peau foncée.',
 16900, null, 26, 'SHB-S1-HCS', '/products/skin1004-hyalu-cica-sun.jpg?v=5',
 'mixte,grasse,normale,sensible', null, true, true, true, true, 'K25-118', '2027-09-15'),

(33, 'skin1004-cleansing-oil', 'Madagascar Centella Light Cleansing Oil', 9, 1,
 $d$Huile démaquillante légère à l'huile de centella. Dissout SPF, sébum et pollution, s'émulsionne à l'eau. Best-seller UMMA du double nettoyage.$d$,
 $d$Centella oil, sunflower, olive, jojoba. Liste complète sur l'emballage.$d$,
 $d$Sur peau sèche, masser 30 secondes, ajouter de l'eau, rincer, puis second nettoyant.$d$,
 $d$Éviter les yeux. Usage externe.$d$,
 '200 ml', 'Corée', 'Pompe SKIN1004, huile ambrée claire qui s''émulsionne, lot contrôlé.',
 18900, null, 16, 'SHB-S1-LCO', '/products/skin1004-cleansing-oil.jpg?v=5',
 'mixte,grasse,normale,sensible', null, false, true, false, true, 'K25-122', '2027-12-01'),

(34, 'boje-glow-deep', 'Glow Deep Serum Rice + Alpha-Arbutin', 4, 1,
 $d$Sérum taches Beauty of Joseon : riz + alpha-arbutine. Aide à unifier le teint et à estomper les marques, texture miel fluide. Complète le Glow Serum propolis.$d$,
 $d$Oryza sativa extract, alpha-arbutin, niacinamide. Liste complète sur l'emballage.$d$,
 $d$Soir, 3 à 4 gouttes. Toujours un SPF le jour. Introduire progressivement si peau sensible.$d$,
 $d$Ceci n'est pas un médicament. Les taches demandent de la constance et un solaire.$d$,
 '30 ml', 'Corée', 'Compte-gouttes Beauty of Joseon d''origine, sérum ambré, lot photographié.',
 17900, null, 18, 'SHB-BJ-GDS', '/products/boje-glow-deep.jpg?v=5',
 'normale,mixte,sèche,taches', null, false, true, true, true, 'J25-201', '2027-10-12'),

(35, 'goodal-vita-c', 'Green Tangerine Vita C Dark Spot Serum', 18, 1,
 $d$Sérum vitamine C à la mandarine verte de Jeju. Cible taches et teint terne, texture gel. Viral UMMA — à conserver à l'abri de la chaleur.$d$,
 $d$Citrus tangerine fruit extract, 3-O-ethyl ascorbic acid. Liste complète sur l'emballage.$d$,
 $d$Soir, 2 pompes sur visage propre. SPF indispensable le lendemain.$d$,
 $d$Vitamine C : peut piquer. Éviter les yeux. Ceci n'est pas un traitement médical.$d$,
 '40 ml', 'Corée', 'Flacon Goodal jaune, pompe verte, lot et DLC contrôlés.',
 19900, null, 14, 'SHB-GD-VTC', '/products/goodal-vita-c.jpg?v=5',
 'normale,mixte,terne,taches', null, false, true, true, true, 'G25-044', '2027-08-20'),

(36, 'somebymi-miracle-serum', 'AHA BHA PHA 30 Days Miracle Serum', 16, 1,
 $d$Sérum acné Some By Mi : AHA/BHA/PHA + 10 000 ppm de centella. Aide à lisser le grain et les imperfections, sans décaper. Best-seller UMMA « 30 days ».$d$,
 $d$AHA, BHA, PHA, centella asiatica, niacinamide. Liste complète sur l'emballage.$d$,
 $d$Soir, 3 gouttes. Débuter un soir sur deux. SPF le lendemain.$d$,
 $d$Ne pas superposer un rétinoïde le même soir. Pas un médicament anti-acné.$d$,
 '50 ml', 'Corée', 'Flacon vert Some By Mi, pipette noire, lot scellé.',
 16500, null, 16, 'SHB-SM-MS50', '/products/somebymi-miracle-serum.jpg?v=5',
 'grasse,acneique,mixte', null, false, true, false, true, 'S25-077', '2027-11-02'),

(37, 'manyo-cleansing-oil', 'Pure Cleansing Oil', 21, 1,
 $d$Huile démaquillante ma:nyo, 22 000 ppm d'huile d'argan. Le double nettoyage coréen par excellence : SPF, maquillage, sébum, sans film gras.$d$,
 $d$Ethylhexyl palmitate, argan oil, botanical oils. Liste complète sur l'emballage.$d$,
 $d$Sur peau sèche, masser, émulsionner, rincer, puis gel nettoyant.$d$,
 $d$Éviter les yeux. Usage externe.$d$,
 '200 ml', 'Corée', 'Flacon ma:nyo ambre, pompe blanche, huile dorée, lot contrôlé.',
 23500, null, 12, 'SHB-MY-PCO', '/products/manyo-cleansing-oil.jpg?v=5',
 'normale,sèche,mixte,grasse', null, false, true, false, true, 'Y25-019', '2027-12-08'),

(38, 'haruharu-black-rice-toner', 'Black Rice Hyaluronic Toner', 17, 1,
 $d$Lotion essence haruharu au riz noir et acide hyaluronique. Sans alcool, sans parfum : hydrate, prépare, calme. Format 150 ml, pH doux, climat chaud.$d$,
 $d$Oryza sativa extract, sodium hyaluronate, panthenol. Liste complète sur l'emballage.$d$,
 $d$Après le nettoyage, avec les mains ou un coton. Matin et soir.$d$,
 $d$Usage externe. Conserver à l'abri de la chaleur.$d$,
 '150 ml', 'Corée', 'Flacon haruharu dégradé, bouchon prune, lot et DLC enregistrés.',
 16900, null, 18, 'SHB-HH-BRT', '/products/haruharu-black-rice-toner.jpg?v=5',
 'sensible,sèche,normale,mixte', null, false, true, false, true, 'H25-061', '2028-01-18'),

(39, 'purito-soft-sun', 'Daily Soft Touch Sunscreen SPF50+', 23, 1,
 $d$Crème solaire Purito SPF50+ PA++++ aux céramides, fini voile. Sans parfum agressif, pensée peaux sensibles. Alternative au Relief Sun.$d$,
 $d$UV filters, ceramides, panthenol. Liste complète sur l'emballage.$d$,
 $d$Dernière étape du matin. Renouveler en exposition.$d$,
 $d$Usage externe. Ne remplace pas l'ombre.$d$,
 '60 ml', 'Corée', 'Tube Purito blanc/orange d''origine, lot photographié.',
 16500, null, 20, 'SHB-PR-DST', '/products/purito-soft-sun.jpg?v=5',
 'sensible,normale,mixte,sèche', null, false, true, false, true, 'P25-033', '2027-09-28'),

(40, 'romand-juicy-tint', 'Juicy Lasting Tint — Bare Grape', 25, 4,
 $d$Tint rom&nd, fini juteux, tenue chaleur. Teinte Bare Grape : raisin lumineux, portable sur peaux mates. Le SKU lèvres n°1 UMMA.$d$,
 $d$Emollients, pigments, film formers. Liste complète sur l'emballage.$d$,
 $d$Une couche ou deux, estomper le cœur des lèvres. Démaquiller le soir.$d$,
 $d$Usage externe. Éviter les lèvres abîmées.$d$,
 '5,5 g', 'Corée', 'Tube rom&nd dégradé rose, applicateur d''origine, lot contrôlé.',
 8900, null, 24, 'SHB-RM-JLT32', '/products/romand-juicy-tint.jpg?v=5',
 null, null, false, true, true, true, 'R25-210', '2028-03-01'),

(41, 'cosrx-bha-liquid', 'BHA Blackhead Power Liquid', 2, 1,
 $d$Lotion BHA COSRX à l'eau de saule : désincruste les points noirs, affine le grain. Le complément du Low pH Cleanser, 2 à 3 soirs par semaine.$d$,
 $d$Betaine salicylate, salix alba bark water. Liste complète sur l'emballage.$d$,
 $d$Soir, sur peau propre, éviter le contour des yeux. SPF le lendemain.$d$,
 $d$Ne pas superposer un rétinal le même soir. Usage externe.$d$,
 '100 ml', 'Corée', 'Flacon pompe COSRX, liquide incolore, QR Record recommandé.',
 16900, null, 14, 'SHB-CX-BHA', '/products/cosrx-bha-liquid.jpg?v=5',
 'grasse,mixte,acneique', null, false, true, false, true, 'A25-266', '2027-11-20'),

(42, 'biodance-collagen-mask', 'Bio-Collagen Real Deep Mask', 22, 1,
 $d$Masque hydrogel collagène bas poids moléculaire. Une nuit, peau plus rebondie au réveil. Le masque UMMA le plus demandé — boîte 4 pièces.$d$,
 $d$Hydrolyzed collagen, hyaluronic acid, ceramides. Liste complète sur l'emballage.$d$,
 $d$Soir, sur peau propre, 3 heures ou toute la nuit. Une à deux fois par semaine.$d$,
 $d$Usage externe. Ne pas réutiliser. Tenir hors de portée des enfants.$d$,
 '4 masques', 'Corée', 'Boîte Biodance rose, sachets d''origine, DLC contrôlée.',
 19500, null, 12, 'SHB-BD-BCM', '/products/biodance-collagen-mask.jpg?v=5',
 'normale,sèche,mixte', null, false, true, false, true, 'B25-088', '2027-07-22'),

(43, 'torriden-dive-in', 'DIVE-IN Low Molecular Hyaluronic Acid Serum', 20, 1,
 $d$Sérum Torriden 5 acides hyaluroniques bas poids. Hydrate en profondeur sans coller — le réflexe « peau qui tire » sous clim et harmattan.$d$,
 $d$Sodium hyaluronate (multi-poids), panthenol. Liste complète sur l'emballage.$d$,
 $d$Sur peau humide, 3 gouttes, puis crème. Matin et/ou soir.$d$,
 $d$Toujours sceller avec une crème en climat très sec.$d$,
 '50 ml', 'Corée', 'Flacon Torriden bleu, pipette blanche, lot scellé.',
 17500, null, 16, 'SHB-TD-DI50', '/products/torriden-dive-in.jpg?v=5',
 'sèche,normale,mixte,sensible', null, false, true, false, true, 'T25-055', '2028-02-10'),

(44, 'numbuzin-no5', 'No.5 Glutathione Vitamin Concentrated Serum', 19, 1,
 $d$Sérum taches numbuzin n°5 : glutathion, vitamine C, acide tranexamique 4 %. Cible le teint inégal et les marques, texture concentrée. Best-seller UMMA « dark spot ».$d$,
 $d$Glutathione, 3-O-ethyl ascorbic acid, tranexamic acid, niacinamide. Liste complète sur l'emballage.$d$,
 $d$Soir, 3 gouttes. SPF le jour, sans exception.$d$,
 $d$Peut piquer. Ceci n'est pas un médicament. Consulter un dermatologue si taches persistantes.$d$,
 '30 ml', 'Corée', 'Flacon noir numbuzin 5+, pipette, hologramme lot photographié.',
 21900, null, 12, 'SHB-NB-N5', '/products/numbuzin-no5.jpg?v=5',
 'mixte,normale,taches,terne', null, true, true, true, true, 'N25-091', '2027-10-30'),

(45, 'iunik-beta-glucan', 'Beta-Glucan Power Moisture Serum', 24, 1,
 $d$Sérum iUNIK 400 000 ppm de bêta-glucane + centella. Hydrate, calme, répare la barrière. Sans parfum, vegan — family brand UMMA.$d$,
 $d$Beta-glucan, centella asiatica extract, peptides. Liste complète sur l'emballage.$d$,
 $d$Matin et soir, 3 gouttes après le toner, avant la crème.$d$,
 $d$Usage externe. Patch-test si peau très réactive.$d$,
 '50 ml', 'Corée', 'Flacon iUNIK bleu ciel, pipette argent, lot contrôlé.',
 15500, null, 14, 'SHB-IU-BG50', '/products/iunik-beta-glucan.jpg?v=5',
 'sèche,sensible,normale,mixte', null, false, true, false, true, 'I25-014', '2028-01-05')
on conflict (slug) do nothing;

select setval('brands_id_seq', (select max(id) from brands));
select setval('products_id_seq', (select max(id) from products));
