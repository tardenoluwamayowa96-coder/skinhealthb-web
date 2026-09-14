-- Relief Sun Aqua-fresh, kit voyage SKIN1004, sérum Medicube TXA 15 %,
-- solaire Anua Heartleaf. Packshot Relief Sun classique rafraîchi.

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values

(194, 'boje-relief-sun-aqua', 'Relief Sun Aqua-fresh Rice + B5 SPF50+', 4, 1,
 $d$Beauty of Joseon Relief Sun Aqua-fresh Rice + B5 SPF50+ PA++++, 50 ml. Version fraîche du Relief Sun : riz + panthénol, dégradé bleu, fini aqueux, zéro film gras. Le solaire du midi à Lomé quand le Relief Sun classique (tube ivoire) est trop riche.$d$,
 $d$Oryza sativa (rice) extract, panthenol (B5), UV filters, aqua. SPF50+ PA++++. Liste complète sur le tube.$d$,
 $d$Dernière étape du matin : 1/3 de cuillère à café visage + cou. Renouveler toutes les 2 h en plein soleil, après transpiration.$d$,
 $d$Usage externe. Distinct du Relief Sun Rice + Probiotics (tube ivoire). La protection solaire ne remplace pas l'ombre ni le chapeau.$d$,
 '50 ml', 'Corée', 'Tube Beauty of Joseon Relief Sun Aqua-fresh d''origine, bouchon bleu, lot photographié.',
 15900, null, 28, 'SHB-BJ-RSA50', '/products/boje-relief-sun-aqua.jpg?v=26',
 'mixte,grasse,normale,sensible,tous', null, true, true, true, true, 'J26-RSA', '2028-04-30'),

(195, 'skin1004-centella-travel', 'Kit voyage Madagascar Centella', 9, 1,
 $d$SKIN1004 Madagascar Centella Travel Kit. Cinq minis de la ligne Centella : crème ampoule, toner, ampoule, crème apaisante, huile démaquillante légère. Le coffret découverte / voyage — pour tester la routine avant les formats 55–400 ml déjà au rayon.$d$,
 $d$Centella asiatica extract (Madagascar) dans chaque référence. Listes complètes sur chaque mini.$d$,
 $d$Routine type : huile puis crème nettoyante, toner, ampoule, crème. Formats voyage : 1 à 2 semaines. Suivre la notice de chaque mini.$d$,
 $d$Usage externe. Vérifier DLC de chaque mini. Pas un médicament. Patch-test si peau très réactive.$d$,
 '5 minis', 'Corée', 'Coffret SKIN1004 Madagascar Centella Travel Kit d''origine, boîte paysage, lot photographié.',
 19900, null, 12, 'SHB-S1-TK5', '/products/skin1004-centella-travel.jpg?v=26',
 'sensible,normale,mixte,tous', null, true, true, true, true, 'S26-TK5', '2028-05-31'),

(196, 'medicube-txa-niacinamide', 'Sérum TXA Niacinamide 15 %', 1, 1,
 $d$Medicube TXA Niacinamide 15 Serum, 30 ml. 15 % d'association acide tranexamique + niacinamide. Cible taches, teint irrégulier, marques post-imperfection — sans hydroquinone. Texture aqueuse rose, pipette 30 ml. Circuit APR / Medicube uniquement.$d$,
 $d$Tranexamic acid, niacinamide, aqua. Total 15 % TXA + niacinamide. Liste complète sur le flacon.$d$,
 $d$Soir, 3 à 4 gouttes sur peau propre. Introduire un soir sur deux. Le jour : SPF 50 obligatoire. Complète l'Anua TXA 10 % déjà au rayon (ne pas superposer les deux).$d$,
 $d$Ne pas présenter comme un éclaircissant. Pas d'hydroquinone. Patch-test. Circuit APR / Medicube uniquement. Ceci n'est pas un médicament.$d$,
 '30 ml', 'Corée', 'Flacon Medicube TXA Niacinamide 15 d''origine, hologramme et lot photographiés. Zéro marketplace gris.',
 19900, null, 14, 'SHB-MD-TX15', '/products/medicube-txa-niacinamide.jpg?v=26',
 'terne,mixte,normale,marques,tous', null, true, true, true, true, 'M26-TX15', '2028-03-31'),

(197, 'anua-heartleaf-sun', 'Solaire Heartleaf Silky SPF50+', 3, 1,
 $d$Anua Heartleaf Silky Moisture Sun Cream SPF50+ PA++++, 50 ml. Heartleaf + panthénol, fini soyeux hydratant, tube vert. Le solaire de la ligne Heartleaf 77 % — plus crème que le Zero-cast (bouchon jaune) déjà au rayon.$d$,
 $d$UV filters, houttuynia cordata extract, panthenol, aqua. SPF50+ PA++++. Liste complète sur le tube.$d$,
 $d$Dernière étape du matin : généreux sur visage et cou. Renouveler toutes les 2 h en exposition. Se porte après le toner Heartleaf 77 %.$d$,
 $d$Usage externe. Distinct du Zero-cast. La protection solaire ne remplace pas l'ombre. Vérifier l'indice et la DLC.$d$,
 '50 ml', 'Corée', 'Tube Anua Heartleaf Silky Moisture Sun Cream d''origine, bouchon vert, lot photographié.',
 15900, null, 22, 'SHB-AN-HS50', '/products/anua-heartleaf-sun.jpg?v=26',
 'sensible,sèche,normale,mixte,tous', null, true, true, true, true, 'N26-HS50', '2028-04-30')

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
  stock = excluded.stock,
  sku = excluded.sku,
  image_url = excluded.image_url,
  skin_types = excluded.skin_types,
  is_featured = true,
  is_new = true,
  is_active = true;

update products
set image_url = '/products/boje-relief-sun.jpg?v=26',
    is_featured = true
where slug = 'boje-relief-sun';

select setval('products_id_seq', (select max(id) from products));
