-- Laneige (La Neige) UMMA + maquillage K-beauty. Hausse ~8 % du rayon Corée.

update products
set price_xof = (round(price_xof * 1.08 / 100.0) * 100)::int
where origin ilike '%Corée%'
  and is_active = true;

update products
set compare_at_xof = (round(compare_at_xof * 1.08 / 100.0) * 100)::int
where origin ilike '%Corée%'
  and compare_at_xof is not null
  and is_active = true;

insert into brands (id, slug, name, country, verified) values
  (64, 'laneige', 'Laneige', 'Corée', true)
on conflict (slug) do update set name = excluded.name, country = excluded.country, verified = true;

update categories
set description = 'Cushions, tints et lèvres — Laneige, TIRTIR, rom&nd. Teintes mates / médium.'
where slug = 'maquillage';

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values

(223, 'laneige-lip-sleeping-mask', 'Lip Sleeping Mask Berry', 64, 4,
 $d$Masque de nuit pour les lèvres Laneige, teinte Berry, 20 g. Beurre de murumuru, karité, vitamine C : lèvres plus souples au réveil, tenue chaleur Lomé. Le best-seller UMMA « La Neige » — pot rose + spatule.$d$,
 $d$Diisostearyl malate, hydrogenated polyisobutene, phytosteryl/isostearyl/cetyl/stearyl/behenyl dimer dilinoleate, shea, murumuru, berry complex, tocopherol. Liste complète sur le pot.$d$,
 $d$Soir, une noisette à la spatule sur lèvres propres. Le matin, l’excédent se retire. Peut se porter en baume le jour.$d$,
 $d$Parfum fruité : patch-test si lèvres très sensibles. Usage externe. Ceci n'est pas un médicament.$d$,
 '20 g', 'Corée', 'Pot Laneige Lip Sleeping Mask Berry d''origine Amorepacific, spatule, lot photographié. Circuit UMMA.',
 15900, null, 28, 'SHB-LN-LSM20', '/products/laneige-lip-sleeping-mask.jpg?v=55',
 null, null, true, true, true, true, 'L26-BER', '2028-08-31'),

(224, 'laneige-lip-glowy-balm', 'Lip Glowy Balm Berry', 64, 4,
 $d$Baume teinté Laneige Lip Glowy Balm, Berry, 10 g. Beurre de karité et murumuru : hydratation, brillance non collante, teinte fruits rouges portable peaux mates. Le tube du sac, jour.$d$,
 $d$Shea butter, murumuru seed butter, emollients, pigments. Liste complète sur le tube.$d$,
 $d$Jour, une couche sur lèvres. Recharger. Se superpose au Lip Sleeping Mask le soir.$d$,
 $d$Usage externe. Éviter les lèvres abîmées.$d$,
 '10 g', 'Corée', 'Tube Laneige Lip Glowy Balm Berry d''origine, lot photographié. Circuit UMMA.',
 9900, null, 32, 'SHB-LN-LGB10', '/products/laneige-lip-glowy-balm.jpg?v=55',
 null, null, true, true, true, true, 'L26-LGB', '2028-09-30'),

(225, 'laneige-water-sleeping-mask', 'Water Sleeping Mask', 64, 1,
 $d$Masque de nuit Laneige Water Sleeping Mask, 70 ml. Acide hyaluronique + niacinamide : hydratation de nuit, éclat au réveil, barrière. Gel-crème bleu, non gras — climat chaud. Le relais visage du Lip Sleeping Mask.$d$,
 $d$Aqua, hydroxyethyl urea, glycerin, niacinamide, hyaluronic acid, beta-glucan. Liste complète sur le pot.$d$,
 $d$Soir, dernière étape, une noisette sur visage. 2 à 4 soirs par semaine, ou tous les soirs si peau sèche harmattan.$d$,
 $d$Usage externe. Éviter les yeux. Patch-test. Ceci n'est pas un médicament.$d$,
 '70 ml', 'Corée', 'Pot Laneige Water Sleeping Mask d''origine Amorepacific, lot photographié. Circuit UMMA.',
 26900, null, 18, 'SHB-LN-WSM70', '/products/laneige-water-sleeping-mask.jpg?v=55',
 'sèche,normale,mixte,terne,sensible', null, true, true, true, true, 'L26-WSM', '2028-07-31'),

(226, 'laneige-cream-skin', 'Cream Skin Toner & Moisturizer', 64, 1,
 $d$Laneige Cream Skin, 150 ml. Toner-crème 2-en-1 : hydratation laiteuse, White Tea Complex, barrière. Remplace toner + crème légère les matins chauds. Texture lait, flacon pompe.$d$,
 $d$Aqua, glycerin, butylene glycol, white tea, ceramides, panthenol. Liste complète sur le flacon.$d$,
 $d$Matin et soir, 2 pompes dans les mains, presser sur visage et cou. Seul ou sous un SPF / crème plus riche.$d$,
 $d$Usage externe. Patch-test. Ceci n'est pas un médicament.$d$,
 '150 ml', 'Corée', 'Flacon Laneige Cream Skin d''origine, lot photographié. Circuit UMMA.',
 24900, null, 16, 'SHB-LN-CS150', '/products/laneige-cream-skin.jpg?v=55',
 'sèche,normale,mixte,sensible', null, false, true, false, true, 'L26-CS1', '2028-06-30'),

(227, 'tirtir-mask-fit-40n', 'Mask Fit Red Cushion — 40N Cinnamon', 12, 4,
 $d$Cushion TIRTIR Mask Fit Red, teinte 40N Cinnamon. Couvrance modulable, fini satiné, tenue chaleur et masque. Teinte plus profonde que le 33N — peaux mates à foncées de Lomé.$d$,
 $d$Water, titanium dioxide, iron oxides, film formers. Liste complète sur le boîtier.$d$,
 $d$Tapoter l'éponge, estomper du centre vers l'extérieur. Recharger midi. Démaquiller le soir (huile + second nettoyant).$d$,
 $d$Essai de teinte au poignet / mâchoire. Non comédogène n'est pas une garantie individuelle.$d$,
 '18 g · 40N', 'Corée', 'Boîtier rouge TIRTIR scellé, 40N Cinnamon, lot et DLC contrôlés. Circuit UMMA.',
 26900, null, 14, 'SHB-TT-MFRC40', '/products/tirtir-mask-fit-40n.jpg?v=55',
 'normale,mixte,grasse', null, true, true, true, true, 'T26-40N', '2028-04-30'),

(228, 'romand-juicy-figfig', 'Juicy Lasting Tint — FigFig', 25, 4,
 $d$Tint rom&nd Juicy Lasting Tint, teinte FigFig. Fini juteux, tenue chaleur, prune lumineux portable peaux mates. Complète le Bare Grape déjà au rayon.$d$,
 $d$Emollients, pigments, film formers. Liste complète sur le tube.$d$,
 $d$Une couche ou deux, estomper le cœur des lèvres. Démaquiller le soir.$d$,
 $d$Usage externe. Éviter les lèvres abîmées.$d$,
 '5,5 g', 'Corée', 'Tube rom&nd Juicy Lasting Tint FigFig d''origine, lot contrôlé. Circuit UMMA.',
 9600, null, 24, 'SHB-RM-JLTFF', '/products/romand-juicy-figfig.jpg?v=55',
 null, null, false, true, true, true, 'R26-FIG', '2028-10-31')

on conflict (slug) do update set
  name = excluded.name,
  brand_id = excluded.brand_id,
  category_id = excluded.category_id,
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
  is_featured = excluded.is_featured,
  is_new = true,
  is_bestseller = excluded.is_bestseller,
  is_active = true;

select setval('products_id_seq', (select max(id) from products));
select setval('brands_id_seq', (select max(id) from brands));
