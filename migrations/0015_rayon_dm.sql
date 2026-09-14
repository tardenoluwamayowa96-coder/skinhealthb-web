-- Rayon dm photographié : Mixa pots, Acnemy, Balea MED urée, Garnier Fructis, Neutrogena.
-- Prix = tarif dm.de / Nocibé × 656 XOF, arrondi 50 F.

insert into brands (id, slug, name, country, verified) values
  (34, 'acnemy', 'Acnemy', 'Espagne', true),
  (35, 'neutrogena', 'Neutrogena', 'États-Unis', true)
on conflict (slug) do nothing;

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values

(74, 'mixa-cica-creme-400', 'Crème Urea Cica Repair+', 28, 2,
 $d$Pot Mixa Urea Cica Repair+ 400 ml. Urée 10 % et acides aminés : lisse rugosités, répare et protège jusqu'à 48 h. Visage, corps et mains — peaux sèches à très sèches. Tarif dm / Nocibé 7,95 €.$d$,
 $d$Aqua, glycerin, urea, panthenol, niacinamide, shea butter. Liste complète sur l'emballage.$d$,
 $d$Matin et/ou soir sur zones sèches : talons, coudes, genoux, corps. Une noisette suffit. Convient aussi aux mains.$d$,
 $d$Usage externe. Ceci n'est pas un médicament. Éviter les plaies ouvertes.$d$,
 '400 ml', 'France', 'Pot Mixa rouge d''origine L''Oréal, scellé, lot contrôlé à Lomé.',
 5200, null, 28, 'SHB-MX-CC400', '/products/mixa-cica-creme.jpg?v=12',
 'sèche,très sèche,sensible', null, true, true, true, true, 'L26-210', '2028-06-30'),

(75, 'mixa-niacinamide-400', 'Crème Niacinamide Bright', 28, 2,
 $d$Pot Mixa Niacinamide Bright 400 ml. 9 % karité + niacinamide + vitamine C : hydrate 48 h et aide à estomper les taches. Visage, corps, mains. Peaux mates, sensible. Tarif dm.de 7,95 €.$d$,
 $d$Aqua, glycerin, butyrospermum parkii butter, niacinamide, ascorbyl glucoside. Liste complète sur l'emballage.$d$,
 $d$Matin et soir sur le visage et le corps. Compléter le jour par un solaire.$d$,
 $d$Usage externe. Peut contenir un AHA/salicylique : éviter le contour des yeux. Ceci n'est pas un médicament.$d$,
 '400 ml', 'France', 'Pot Mixa orange d''origine L''Oréal, lot et DLC photographiés.',
 5200, null, 28, 'SHB-MX-NB400', '/products/mixa-niacinamide.jpg?v=12',
 'normale,sèche,mate,sensible', null, true, true, true, true, 'L26-211', '2028-06-30'),

(76, 'acnemy-zitclean', 'Gel nettoyant Zitclean', 34, 1,
 $d$Gel Acnemy Zitclean 150 ml. Nettoie les peaux à tendance acnéique, sans savon, non comédogène. Tarif dm.de 9,45 €.$d$,
 $d$Aqua, mild surfactants, salicylic acid. Sans huile. Liste complète sur l'emballage.$d$,
 $d$Matin et soir, masser sur visage mouillé 30 secondes, rincer. Suivre avec Postzit ou Zitcalm.$d$,
 $d$Usage externe. Éviter les yeux. Peut dessécher en début de routine.$d$,
 '150 ml', 'Espagne', 'Tube Acnemy jaune d''origine Niche Beauty Lab, import dm.',
 6200, null, 24, 'SHB-AC-ZC150', '/products/acnemy-zitclean.jpg?v=12',
 'grasse,mixte,acneique', null, true, true, true, true, 'A26-041', '2028-05-31'),

(77, 'acnemy-postzit', 'Sérum Postzit', 34, 1,
 $d$Sérum Acnemy Postzit 30 ml. Corrige les marques post-boutons (taches, cicatrices plates). Oil-free, non comédogène. Tarif dm.de 15,95 €.$d$,
 $d$Aqua, niacinamide, soothing agents. Sans huile. Liste complète sur l'emballage.$d$,
 $d$Soir, 3 à 4 gouttes sur les zones marquées, après le nettoyage. Ne pas superposer trop d'actifs le même soir.$d$,
 $d$Usage externe. Ceci n'est pas un médicament. Patch-test 24 h.$d$,
 '30 ml', 'Espagne', 'Flacon pipette Acnemy d''origine, boîte jaune, lot contrôlé.',
 10450, null, 18, 'SHB-AC-PZ30', '/products/acnemy-postzit.jpg?v=12',
 'mixte,grasse,acneique,sensible', null, false, true, true, true, 'A26-042', '2028-04-30'),

(78, 'acnemy-zitcontrol', 'Crème Zitcontrol', 34, 1,
 $d$Crème Acnemy Zitcontrol 40 ml. Hydrate et aide à contrôler les imperfections (acide salicylique, niacinamide, zinc PCA). Non comédogène. Tarif rayon dm 18,95 €.$d$,
 $d$Aqua, salicylic acid, niacinamide, zinc PCA. Oil-free. Liste complète sur l'emballage.$d$,
 $d$Matin et/ou soir, une noisette sur le visage après le sérum. Le jour : terminer par un SPF.$d$,
 $d$Usage externe. Éviter le contour des yeux. Ceci n'est pas un médicament.$d$,
 '40 ml', 'Espagne', 'Tube Acnemy Zitcontrol d''origine, import Allemagne.',
 12450, null, 16, 'SHB-AC-ZT40', '/products/acnemy-zitcontrol.jpg?v=12',
 'grasse,mixte,acneique', null, false, true, false, true, 'A26-043', '2028-04-30'),

(79, 'balea-med-urea', 'MED lait 15 % urée', 29, 2,
 $d$Lait Balea MED 15 % urée 250 ml. Soin immédiat 2-en-1 pour peaux extra-sèches, râpeuses, sensibles. Tarif dm ~3,75 €.$d$,
 $d$Aqua, urea 15 %, glycerin, panthenol. Liste complète sur l'emballage.$d$,
 $d$Matin et soir sur les zones très sèches (jambes, coudes, talons).$d$,
 $d$Usage externe. Picotements possibles sur peaux très sèches (urée). Ceci n'est pas un médicament.$d$,
 '250 ml', 'Allemagne', 'Flacon Balea MED d''origine dm, lot photographié.',
 2450, null, 36, 'SHB-BL-UR250', '/products/balea-med-urea.jpg?v=12',
 'très sèche,sèche,sensible', null, false, true, true, true, 'D26-220', '2028-08-31'),

(80, 'garnier-fructis-coco', 'Fructis Coco Water', 30, 3,
 $d$Shampoing Garnier Fructis Coco Water 250 ml. Eau de coco + acide salicylique : racines grasses, pointes sèches, sans silicone. Tarif dm 2,75 €.$d$,
 $d$Aqua, coconut water, salicylic acid, mild surfactants. Liste complète sur l'emballage.$d$,
 $d$Sur cheveux mouillés, masser le cuir chevelu, rincer. Suivre d'un après-shampoing Fructis si besoin.$d$,
 $d$Éviter les yeux. Usage externe.$d$,
 '250 ml', 'France', 'Flacon Garnier Fructis turquoise d''origine, lot contrôlé.',
 1800, null, 40, 'SHB-GA-FC250', '/products/garnier-fructis-coco.jpg?v=12',
 null, 'gras,mixte,normal', false, true, true, true, 'G26-088', '2028-09-30'),

(81, 'neutrogena-hydro-boost', 'Hydro Boost Water Gel', 35, 1,
 $d$Gel Neutrogena Hydro Boost 50 ml à l'acide hyaluronique. Texture eau, hydrate sans graisser — peaux normales à mixtes. Tarif dm ~13,95 €.$d$,
 $d$Aqua, hyaluronic acid, glycerin. Liste complète sur l'emballage.$d$,
 $d$Matin et soir sur peau propre. Une noisette, du centre vers l'extérieur.$d$,
 $d$Usage externe. Éviter les yeux.$d$,
 '50 ml', 'États-Unis', 'Pot Neutrogena Hydro Boost d''origine Johnson & Johnson, scellé.',
 9150, null, 20, 'SHB-NT-HB50', '/products/neutrogena-hydro-boost.jpg?v=12',
 'normale,mixte,grasse,déshydratée', null, true, true, true, true, 'N26-017', '2028-03-31')

on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  price_xof = excluded.price_xof,
  image_url = excluded.image_url,
  is_new = true,
  is_active = true,
  stock = excluded.stock;

select setval('brands_id_seq', (select max(id) from brands));
select setval('products_id_seq', (select max(id) from products));
