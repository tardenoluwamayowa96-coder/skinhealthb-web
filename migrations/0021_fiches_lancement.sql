-- Fiches produits lancement Skinhealthb (marché togolais).
-- 10 références nouvelles + enrichissement des fiches déjà au catalogue.
-- Prix des nouveautés = tarif estimatif fourni, à confirmer lot par lot.

insert into brands (id, slug, name, country, verified) values
  (50, 'la-roche-posay', 'La Roche-Posay', 'France', true),
  (51, 'dr-althea', 'Dr. Althea', 'Corée', true),
  (52, 'dove', 'Dove', 'Internationale', true),
  (53, 'tiam', 'Tiam', 'Corée', true),
  (54, 'avene', 'Avène', 'France', true)
on conflict (slug) do nothing;

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values

(134, 'lrp-anthelios-uvmune', 'Anthelios UVMune 400 Fluide Invisible SPF50+', 50, 1,
 $d$Protection solaire La Roche-Posay Anthelios UVMune 400 SPF50+. Fluide invisible, fini sec, pensé pour une protection quotidienne contre les UVB, UVA courts et UVA ultra-longs (380–400 nm). Texture légère, adaptée à la chaleur de Lomé, y compris sous le maquillage.$d$,
 $d$Filtres UV Mexoryl 400, aqua, silicas, tocopherol. Sans parfum. Liste complète sur le flacon.$d$,
 $d$Dernière étape du matin : appliquer généreusement sur visage et cou avant l'exposition. Renouveler toutes les 2 heures en plein soleil, après transpiration ou baignade.$d$,
 $d$Usage externe. Vérifier l'indice, le format et l'étiquetage du lot importé. La protection solaire ne remplace pas l'ombre ni le chapeau. Ceci n'est pas un médicament.$d$,
 '50 ml', 'France', 'Flacon La Roche-Posay d''origine, circuit officinal / distributeur vérifié, lot photographié à Lomé.',
 20000, null, 18, 'SHB-LR-UV50', '/products/lrp-anthelios-uvmune.jpg?v=19',
 'tous,sensible,mixte,grasse,normale', null, true, true, true, true, 'L26-401', '2028-04-30'),

(135, 'svr-sebiaclear-serum', 'SEBIACLEAR Sérum', 8, 1,
 $d$Sérum concentré SVR Sebiaclear 30 ml. Duo 14 % gluconolactone + 4 % niacinamide pour les peaux grasses ou à imperfections : affine le grain, aide à réduire visiblement boutons, pores et marques. Texture fluide, fini mat. Complète le Sebiaclear Active déjà au rayon.$d$,
 $d$Aqua, gluconolactone 14 %, niacinamide 4 %, sodium hyaluronate, camellia japonica flower extract, salicylic acid. Liste complète sur le flacon.$d$,
 $d$Matin et/ou soir, sur peau propre, visage, cou et décolleté. Peau mixte : suivre d'une crème. Peau grasse : peut se porter seul. Toujours un SPF le jour.$d$,
 $d$Ne pas présenter comme un médicament ou une promesse de guérison. Peut piquer en début d'usage. Utiliser une protection solaire le jour. Patch-test si peau réactive.$d$,
 '30 ml', 'France', 'Flacon pompe SVR Sebiaclear d''origine, circuit officinal, lot et DLC contrôlés.',
 14000, null, 16, 'SHB-SV-SS30', '/products/svr-sebiaclear-serum.jpg?v=19',
 'grasse,acneique,mixte,sensible', null, true, true, false, true, 'S26-218', '2028-06-30'),

(136, 'medicube-pdrn-exosome', 'PDRN Pink Collagen Exosome Shot', 1, 1,
 $d$Sérum Medicube PDRN Pink Collagen Exosome Shot 7500, 30 ml. Positionné sur l'hydratation, l'éclat et le grain de peau. Texture fluide, flacon pompe rose. Uniquement circuit APR / Medicube — les lots PDRN hors circuit sont à écarter.$d$,
 $d$PDRN (sodium DNA), hydrolyzed collagen, exosomes, aqua. Liste complète sur le flacon.$d$,
 $d$Soir, 2 à 3 pompes sur peau propre après le toner, avant la crème. Suivre strictement la notice officielle. Introduire un soir sur deux si peau sensible.$d$,
 $d$Vérifier les ingrédients, le lot et les conditions de conservation. Uniquement circuit APR / Medicube — pas de PDRN gris. Ceci n'est pas un médicament. Patch-test 24 h.$d$,
 '30 ml', 'Corée', 'Uniquement circuit APR / Medicube officiel. Flacon rose d''origine, hologramme et lot photographiés. Zéro marketplace gris.',
 25000, null, 8, 'SHB-MD-PDRN', '/products/medicube-pdrn-exosome.jpg?v=19',
 'normale,mixte,sèche,terne', null, true, true, false, true, 'M26-088', '2027-12-15'),

(137, 'althea-345-relief', '345 Relief Cream', 51, 1,
 $d$Crème Dr. Althea 345 Relief Cream 50 ml. Céramides, panthénol, niacinamide et centella : destinée aux peaux sensibles ou fragilisées, confort et hydratation en dernière étape. Texture baume-crème, sans parfum agressif.$d$,
 $d$Aqua, panthenol, ceramide NP, niacinamide, centella asiatica leaf water, madecassoside, sodium DNA. Liste complète sur le tube.$d$,
 $d$Dernière étape de la routine, matin et/ou soir, une noisette sur visage et cou. Le jour : toujours un solaire par-dessus.$d$,
 $d$Vérifier la version exacte du produit et sa composition. Usage externe. Éviter les yeux. Patch-test si barrière lésée.$d$,
 '50 ml', 'Corée', 'Tube Dr. Althea 345 d''origine, boîte Pro Lab, lot photographié à réception.',
 22000, null, 12, 'SHB-DA-345', '/products/althea-345-relief.jpg?v=19',
 'sensible,sèche,normale,mixte,fragilisée', null, true, true, true, true, 'A26-345', '2028-03-31'),

(138, 'evoluderm-soin-hydratant', 'Soin de Jour Hydratant', 31, 1,
 $d$Soin de jour hydratant Evoluderm 50 ml, extrait d'aloe vera. Crème accessible, 94 % d'origine naturelle, végan, made in France. Hydrate et rafraîchit les peaux normales à mixtes — la crème visage du quotidien à Lomé.$d$,
 $d$Aqua, aloe barbadensis leaf extract, glycerin, emollients. 94 % d'origine naturelle. Liste complète sur le tube.$d$,
 $d$Matin, une noisette sur visage et cou propres. Seule ou après un sérum. Le jour : terminer par un solaire (cette crème n'a pas de SPF).$d$,
 $d$Usage externe. Éviter le contour des yeux. Référence, ingrédients et format contrôlés à l'arrivée.$d$,
 '50 ml', 'France', 'Tube Evoluderm d''origine, fabrication France, lot et DLC contrôlés à Lomé.',
 8000, null, 24, 'SHB-EV-SJ50', '/products/evoluderm-soin-hydratant.jpg?v=19',
 'normale,mixte,sensible', null, false, true, false, true, 'E26-440', '2028-08-31'),

(139, 'dove-beauty-bar', 'Beauty Bar Original', 52, 2,
 $d$Pain de toilette Dove Beauty Bar Original. ¼ crème hydratante, pH doux, pour le visage et le corps. L'essentiel d'hygiène quotidienne, format voyage ou salle de bain.$d$,
 $d$Sodium palmate, stearic acid, sodium tallowate, glycerin, zinc oxide. Liste complète sur le carton.$d$,
 $d$Mouiller, faire mousser entre les mains, rincer. Visage et corps. Compléter avec un lait si peau sèche.$d$,
 $d$Vérifier le pays de fabrication, le format et le lot. Usage externe. Éviter les yeux.$d$,
 '90 g', 'Internationale', 'Carton Dove d''origine Unilever, pain scellé, lot contrôlé à Lomé.',
 3000, null, 48, 'SHB-DV-BB90', '/products/dove-beauty-bar.jpg?v=19',
 'normale,sèche,sensible,tous', null, false, true, true, true, 'D26-090', '2028-12-31'),

(140, 'mixa-panthenol-comfort', 'Panthenol Comfort lait corps', 28, 2,
 $d$Lait corporel Mixa Panthenol Comfort 400 ml. 10 % glycérine + panthénol : confort immédiat des peaux sèches et sensibles, y compris après le soleil. Texture fondante, absorption rapide.$d$,
 $d$Aqua, glycerin 10 %, panthenol, shea, emollients. Sans parfum agressif. Liste complète sur le flacon.$d$,
 $d$Après la douche, sur peau encore humide, du cou aux pieds. Matin et/ou soir.$d$,
 $d$Usage externe. Éviter le contact avec les yeux. Tenir hors de portée des enfants.$d$,
 '400 ml', 'France', 'Flacon Mixa Panthenol Comfort d''origine L''Oréal, lot photographié.',
 8000, null, 28, 'SHB-MX-PC400', '/products/mixa-panthenol-comfort.jpg?v=19',
 'sèche,sensible,très sèche,normale', null, true, true, true, true, 'X26-118', '2028-07-31'),

(141, 'vaseline-advanced-repair', 'Intensive Care Advanced Repair', 27, 2,
 $d$Lait Vaseline Intensive Care Advanced Repair, sans parfum. Lipides ultra-hydratants pour aider la peau sèche à retrouver du confort jusqu'à 48 h. Le flacon familial harmattan et clim.$d$,
 $d$Aqua, glycerin, stearic acid, glyceryl stearate, petrolatum, mineral oil. Unscented. Liste complète sur le flacon.$d$,
 $d$Appliquer quotidiennement sur peau propre, après la douche. Coudes, genoux, jambes, corps.$d$,
 $d$Usage externe. Vérifier le format et la version avant publication. Éviter les plaies ouvertes.$d$,
 '400 ml', 'Internationale', 'Flacon Vaseline Advanced Repair d''origine Unilever, pompe, lot contrôlé.',
 7000, null, 30, 'SHB-VA-AR400', '/products/vaseline-advanced-repair.jpg?v=19',
 'sèche,très sèche,sensible', null, false, true, true, true, 'V26-204', '2028-09-30'),

(142, 'tiam-b3-source', 'Vita B3 Source', 53, 1,
 $d$Sérum Tiam Vita B3 Source 40 ml. 10 % niacinamide + 2 % arbutine : routine ciblant l'apparence du teint irrégulier, des taches et de l'excès de sébum. Texture aqueuse, non collante, bon rapport qualité-prix K-beauty.$d$,
 $d$Niacinamide 10 %, arbutin 2 %, aqua, pentylene glycol. Liste complète sur le flacon.$d$,
 $d$Après le nettoyage et le toner, 3 à 4 gouttes sur visage et cou, avant la crème. Matin et/ou soir. SPF indispensable le jour.$d$,
 $d$Tester la tolérance (patch-test 24 h). Vérifier la composition exacte du lot. Peut piquer en début d'usage. Ceci n'est pas un médicament.$d$,
 '40 ml', 'Corée', 'Flacon compte-gouttes Tiam jaune d''origine, lot et DLC photographiés.',
 12000, null, 18, 'SHB-TM-B340', '/products/tiam-b3-source.jpg?v=19',
 'mixte,grasse,normale,taches,terne', null, true, true, true, true, 'T26-103', '2028-02-28'),

(143, 'avene-eau-thermale', 'Eau Thermale', 54, 1,
 $d$Brume Avène Eau Thermale 300 ml. Eau thermale d'Avène, minérale, destinée à rafraîchir, apaiser et compléter une routine — chaleur, après-soleil, peaux sensibles. Le geste pharmacy français à Lomé.$d$,
 $d$Avene thermal spring water, nitrogen. Liste complète sur l'aérosol.$d$,
 $d$Vaporiser sur le visage à 20 cm, laisser agir quelques secondes, tamponner doucement si besoin. Matin, soir, ou dans la journée sur peau chaude.$d$,
 $d$Vérifier le format et l'étiquetage du produit importé. Usage externe. Éviter les yeux. Aérosol : ne pas percer, tenir à l'abri de la chaleur.$d$,
 '300 ml', 'France', 'Aérosol Avène d''origine Pierre Fabre, lot et DLC contrôlés à Lomé.',
 12000, null, 20, 'SHB-AV-ET300', '/products/avene-eau-thermale.jpg?v=19',
 'tous,sensible,sèche,mixte,normale', null, true, true, true, true, 'A26-300', '2028-11-30')

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

-- Fiches déjà au catalogue : nom / conseils alignés sur la base commerciale, prix sourcés conservés.
update products set
  name = 'Rice Mucin Face Cleanser',
  description = $d$Nettoyant Arencia à l'eau de riz fermentée (97 500 ppm) et mucine, texture mochi qui se transforme en mousse. Nettoyage quotidien doux, sans tiraillement — le geste K-beauty du matin et du soir.$d$,
  usage_tips = $d$Faire mousser une noisette avec de l'eau, masser le visage, rincer. 1 à 2 fois par semaine, couche plus épaisse en masque à rincer.$d$,
  precautions = $d$Éviter le contact avec les yeux. Usage externe. Patch-test si peau très réactive.$d$,
  is_new = true
where slug = 'arencia-rice-mochi';

update products set
  usage_tips = $d$Après le nettoyage et le tonique, appliquer une petite quantité sur le visage puis tapoter. Peut se superposer sous un SPF le matin.$d$,
  precautions = $d$Éviter le contact avec les yeux. Tester sur une petite zone en cas de peau réactive. Patch-test recommandé.$d$
where slug = 'cosrx-snail-96-essence';

update products set
  usage_tips = $d$Appliquer après le nettoyage avec les mains ou un coton, matin et soir. Peut servir de compresses 5 minutes sur zones sensibles.$d$,
  precautions = $d$Cesser l'utilisation en cas d'irritation persistante. Conserver à l'abri de la chaleur.$d$
where slug = 'anua-heartleaf-toner';

update products set
  usage_tips = $d$Appliquer quelques gouttes après le tonique, puis poursuivre avec une crème. Matin et soir. Se superpose sous un SPF.$d$,
  precautions = $d$Vérifier la composition exacte du lot avant publication. Usage externe. Éviter le contour des yeux. Patch-test si peau très réactive.$d$
where slug = 'skin1004-centella-ampoule';

update products set
  usage_tips = $d$Appliquer matin et soir avant la crème. Toujours associer un SPF le jour.$d$,
  precautions = $d$Ne pas utiliser d'allégations médicales non autorisées. Les taches demandent de la constance et une protection solaire. Ceci n'est pas un médicament.$d$
where slug = 'caudalie-vinoperfect';

update products set
  usage_tips = $d$Appliquer en dernière étape de la routine du matin et renouveler toutes les 2 heures en exposition.$d$,
  precautions = $d$Vérifier l'étiquetage et les exigences réglementaires locales. Usage externe. La protection solaire ne remplace pas l'ombre ni le chapeau.$d$
where slug = 'boje-relief-sun';

update products set
  usage_tips = $d$Appliquer quelques gouttes après le nettoyage, soir. Éviter de superposer le même soir un acide fort si vous débutez.$d$,
  precautions = $d$Ne pas le présenter comme traitement de l'acné. Utiliser une protection solaire le jour. Peut piquer en début d'usage.$d$
where slug = 'ordinary-niacinamide';

update products set
  usage_tips = $d$Appliquer selon le temps recommandé sur l'emballage : 3 heures ou toute la nuit, 1 à 2 fois par semaine. Usage unique si indiqué par le fabricant.$d$,
  precautions = $d$Usage unique. Ne pas réutiliser. Tenir hors de portée des enfants.$d$
where slug = 'biodance-collagen-mask';

update site_settings
set value = 'Fiches lancement · LRP, Tiam, Althea, Avène, Medicube PDRN · prix Lomé'
where key = 'announcement';

select setval('brands_id_seq', (select max(id) from brands));
select setval('products_id_seq', (select max(id) from products));
