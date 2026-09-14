-- Tête de gondole para + K-beauty authentique : CeraVe, LRP Cicaplast,
-- Avène Cicalfate+, Bioderma Sensibio, Ordinary Arbutin, BOJ Dynasty, Weleda Skin Food.
-- Packshots officiels. Prix Lomé (circuit officinal / UMMA), arrondis 50 F.

insert into brands (id, slug, name, country, verified) values
  (48, 'weleda', 'Weleda', 'Suisse', true),
  (58, 'cerave', 'CeraVe', 'États-Unis', true),
  (59, 'bioderma', 'Bioderma', 'France', true)
on conflict (slug) do nothing;

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values

(167, 'lrp-cicaplast-b5', 'Cicaplast Baume B5+', 50, 1,
 $d$Baume La Roche-Posay Cicaplast B5+ 40 ml. Panthénol 5 %, madécassoside, shea : répare visiblement les peaux irritées, sèches, abîmées — visage, lèvres, corps. Le réflexe pharmacie après acné, après soleil, après harmattan. Texture occlusive, non parfumée.$d$,
 $d$Aqua, butyrospermum parkii, panthenol 5 %, madecassoside, glycerin, zinc. Sans parfum. Liste complète sur le tube.$d$,
 $d$Soir, une noisette sur zones irritées (visage, lèvres, ailes du nez, cuticules). Peut se porter localement le jour sous le solaire. Ne remplace pas un traitement médical.$d$,
 $d$Usage externe. Éviter les yeux. Ceci n'est pas un médicament. En cas de plaie ouverte, d'infection ou d'eczéma sévère : avis d'un professionnel de santé.$d$,
 '40 ml', 'France', 'Tube La Roche-Posay Cicaplast d''origine, circuit officinal / distributeur vérifié, lot photographié.',
 8900, null, 24, 'SHB-LR-CB40', '/products/lrp-cicaplast-b5.jpg?v=24',
 'sensible,sèche,irritée,tous', null, true, true, true, true, 'L26-510', '2028-06-30'),

(168, 'cerave-moisturizing-cream', 'Crème hydratante céramides', 58, 2,
 $d$CeraVe Moisturising Cream 454 g. 3 céramides essentielles + acide hyaluronique, MVE 24 h. Visage et corps, peaux sèches à très sèches. Sans parfum, non comédogène. Le pot pharmacie qui tient toute la famille — au-dessus du supermarché, pas un lait éclaircissant.$d$,
 $d$Aqua, glycerin, cetearyl alcohol, ceramide NP, ceramide AP, ceramide EOP, hyaluronic acid, petrolatum, dimethicone. Sans parfum. Liste complète sur le pot.$d$,
 $d$Matin et/ou soir, une noisette sur visage, une louche sur le corps encore humide. Convient sous le solaire. Pot 454 g : ~2 mois en usage quotidien corps.$d$,
 $d$Usage externe. Éviter les yeux. Non comédogène, mais patch-test si acné très inflammatoire. Ceci n'est pas un médicament.$d$,
 '454 g', 'États-Unis / UE', 'Pot CeraVe d''origine L''Oréal Dermo, hologramme et lot contrôlés. Pas de copie marché.',
 14500, null, 20, 'SHB-CV-MC454', '/products/cerave-moisturizing-cream.jpg?v=24',
 'sèche,très sèche,sensible,normale,tous', null, true, true, true, true, 'C26-454', '2028-08-31'),

(169, 'cerave-hydrating-cleanser', 'Nettoyant hydratant', 58, 1,
 $d$CeraVe Hydrating Cleanser 236 ml. Gel-crème qui lave sans tirer : 3 céramides + HA, peaux normales à sèches. Le second nettoyage du soir après une huile, ou le seul geste du matin. Sans parfum, non comédogène.$d$,
 $d$Aqua, glycerin, ceramide NP, ceramide AP, ceramide EOP, hyaluronic acid, cholesterol. Sans parfum. Liste complète sur le flacon.$d$,
 $d$Matin et soir, sur peau mouillée, 2 pompes, masser, rincer. Relais du Low pH COSRX si la barrière tire.$d$,
 $d$Usage externe. Éviter les yeux. Peaux grasses : préférer un gel moussant (à sourcer). Ceci n'est pas un médicament.$d$,
 '236 ml', 'États-Unis / UE', 'Flacon pompe CeraVe d''origine L''Oréal Dermo, lot photographié.',
 9500, null, 22, 'SHB-CV-HC236', '/products/cerave-hydrating-cleanser.jpg?v=24',
 'normale,sèche,sensible,mixte', null, true, true, false, true, 'C26-236', '2028-08-31'),

(170, 'ordinary-arbutin', 'Alpha Arbutin 2% + HA', 6, 1,
 $d$Sérum The Ordinary Alpha Arbutin 2 % + acide hyaluronique 30 ml. Cible l'apparence des taches et de l'irrégularité du teint — la demande n°1 à Lomé — sans hydroquinone. Texture aqueuse. Se couple au Niacinamide 10 % déjà au rayon (pas dans le même geste si la peau pique).$d$,
 $d$Aqua, alpha-arbutin 2 %, hyaluronic acid, amino acids. Liste complète sur le flacon.$d$,
 $d$Soir, 3 à 4 gouttes sur peau propre, avant la crème. Le jour : SPF 50 obligatoire (Anthelios, Relief Sun ou Hyalu-Cica). Introduire un soir sur deux.$d$,
 $d$Usage externe. Ne pas présenter comme un éclaircissant. Pas d'hydroquinone. Patch-test. Ceci n'est pas un médicament. Tenir hors de portée des enfants.$d$,
 '30 ml', 'Canada', 'Flacon compte-gouttes The Ordinary d''origine DECIEM, lot et DLC contrôlés. Circuit officiel, pas de copie WhatsApp.',
 11900, 14500, 28, 'SHB-TO-AA30', '/products/ordinary-arbutin.jpg?v=24',
 'terne,mixte,normale,grasse,tous', null, true, true, true, true, 'O26-AR2', '2028-03-31'),

(171, 'boje-dynasty-cream', 'Dynasty Cream', 4, 1,
 $d$Crème Beauty of Joseon Dynasty Cream 50 ml. Riz + ginseng : hydratation dew, barrière, éclat. Texture baume-crème qui fond, sans film gras sous le climat de Lomé. Dernière étape du soir, ou sous le Relief Sun le matin.$d$,
 $d$Oryza sativa (rice) extract, panax ginseng root extract, niacinamide, ceramide NP, squalane. Liste complète sur le pot.$d$,
 $d$Matin et/ou soir, une noisette sur visage et cou. Le jour : solaire par-dessus (Relief Sun). Complète Glow Serum et Glow Deep déjà au rayon.$d$,
 $d$Usage externe. Éviter les yeux. Patch-test si peau très réactive.$d$,
 '50 ml', 'Corée', 'Pot Beauty of Joseon Dynasty d''origine, circuit UMMA, lot photographié à réception.',
 19900, null, 16, 'SHB-BJ-DC50', '/products/boje-dynasty-cream.jpg?v=24',
 'normale,sèche,mixte,sensible,terne', null, true, true, true, true, 'J26-DC50', '2028-04-30'),

(172, 'bioderma-sensibio-h2o', 'Sensibio H2O eau micellaire', 59, 1,
 $d$Eau micellaire Bioderma Sensibio H2O 500 ml. Nettoie et démaquille visage et yeux des peaux sensibles, sans rincer. Le classique pharmacie, micelles D.A.F., sans parfum agressif. Format familial.$d$,
 $d$Aqua, PEG-6 caprylic/capric glycerides, cucumber extract, mannitol, xylitol, rhamnose. Sans parfum. Liste complète sur le flacon.$d$,
 $d$Matin et soir, imprégner un coton, passer sur visage et yeux, pas besoin de rincer. Relais d'une huile démaquillante si SPF très résistant.$d$,
 $d$Usage externe. Convient au contour des yeux. Tenir hors de portée des enfants. Ceci n'est pas un médicament.$d$,
 '500 ml', 'France', 'Flacon Bioderma Sensibio H2O d''origine NAOS, circuit officinal, lot contrôlé.',
 12500, null, 18, 'SHB-BD-H2500', '/products/bioderma-sensibio-h2o.jpg?v=24',
 'sensible,normale,mixte,tous', null, false, true, true, true, 'B26-H250', '2028-07-31'),

(173, 'avene-cicalfate', 'Cicalfate+ crème réparatrice', 54, 1,
 $d$Avène Cicalfate+ Crème réparatrice protectrice 40 ml. Complexe post-biotic + eau thermale d'Avène : aide à réparer les peaux fragilisées, irritées, post-imperfection. Texture riche, le jumeau pharmacie du Cicaplast.$d$,
 $d$Avène thermal spring water, sucralfate, copper sulfate, zinc sulfate, postbiotic complex. Liste complète sur le tube.$d$,
 $d$1 à 2 fois par jour sur zones irritées, visage ou corps. Peut se porter localement sous le solaire. Complète l'Eau Thermale déjà au rayon.$d$,
 $d$Usage externe. Ceci n'est pas un médicament. Plaie ouverte, infection : avis médical. Éviter les yeux.$d$,
 '40 ml', 'France', 'Tube Avène Cicalfate+ d''origine Pierre Fabre, circuit officinal, lot photographié.',
 9900, null, 20, 'SHB-AV-CF40', '/products/avene-cicalfate.jpg?v=24',
 'sensible,irritée,sèche,tous', null, true, true, false, true, 'A26-CF40', '2028-05-31'),

(174, 'weleda-skin-food', 'Crème Skin Food', 48, 2,
 $d$Weleda Skin Food 75 ml. Certifiée NATRUE. Calendula, pensée sauvage, romarin : nourrit peaux sèches, râpeuses, talons, mains et visages. Multi-usage, sans silicone ni paraffine. Le baume bio du soir harmattan.$d$,
 $d$Helianthus annuus seed oil*, lanolin, beeswax, calendula officinalis extract*, viola tricolor extract*, rosmarinus officinalis extract*. *issu de l'agriculture bio. Liste complète sur la boîte.$d$,
 $d$Une noisette sur zones sèches : visage, mains, coudes, talons. Seule ou par-dessus un sérum le soir.$d$,
 $d$Usage externe. Contient de la lanoline (origine ovine). Patch-test si peau très réactive. Ceci n'est pas un médicament.$d$,
 '75 ml', 'Suisse', 'Boîte Weleda Skin Food d''origine, certification NATRUE, lot contrôlé.',
 8500, null, 18, 'SHB-WE-SF75', '/products/weleda-skin-food.jpg?v=24',
 'sèche,très sèche,sensible', null, true, true, false, true, 'W26-110', '2028-08-31')

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
  compare_at_xof = excluded.compare_at_xof,
  image_url = excluded.image_url,
  skin_types = excluded.skin_types,
  is_featured = excluded.is_featured,
  is_new = true,
  is_bestseller = excluded.is_bestseller,
  is_active = true,
  stock = excluded.stock,
  brand_id = excluded.brand_id,
  category_id = excluded.category_id;

update site_settings
set value = 'Authentique · CeraVe, Cicaplast, Cicalfate+, Dynasty Cream, Arbutin · lots vérifiés'
where key = 'announcement';

select setval('brands_id_seq', (select max(id) from brands));
select setval('products_id_seq', (select max(id) from products));
