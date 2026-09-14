-- Rayon soins dentaires Dontodent (dm Allemagne).
-- Coût posé Lomé (dm.de × 656 XOF × 1,55 mer + 400 F colis) :
--   dentifrice 125 ml ~ 1 250 F | bain 500 ml ~ 1 250 F | pique-dents 40 ~ 1 160 F
-- Tarif boutique (avantage vendeur, ~3,1× posé) — voir 0011_dontodent_fix.sql
--   dentifrice 3 900 F | bain 4 500 F | pique-dents 2 900 F

insert into brands (id, slug, name, country, verified) values
  (33, 'dontodent', 'Dontodent', 'Allemagne', true)
on conflict (slug) do nothing;

insert into categories (id, slug, name, description, sort_order) values
  (9, 'dentaire', 'Soins dentaires', 'Dentifrice, bain de bouche et pique-dents Dontodent — import dm Allemagne.', 9)
on conflict (slug) do nothing;

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values

(66, 'dontodent-dentifrice', 'Dentifrice antibactérien', 33, 9,
 $d$Dentifrice Dontodent antibactérien 125 ml, formule dm Allemagne au zinc et fluorure de sodium (1 450 ppm F-). Menthe-herbes, végan, sans microplastiques. Le tube du quotidien — import officiel, pas une copie marché.$d$,
 $d$Aqua, sorbitol, hydrated silica, sodium C14-16 olefin sulfonate, cellulose gum, aroma, sodium fluoride, sodium saccharin, zinc chloride, cetylpyridinium chloride. Liste complète sur le tube.$d$,
 $d$Brosser 2 minutes, matin et soir, avec une noisette. Compléter avec le bain de bouche et les pique-dents Dontodent.$d$,
 $d$Usage externe. Ne pas avaler. Réservé aux adultes. Tenir hors de portée des enfants. Contient du fluorure de sodium (1 450 ppm F-). Ceci n'est pas un médicament.$d$,
 '125 ml', 'Allemagne', 'Tube Dontodent dm d''origine, lot et DLC photographiés à Lomé.',
 3900, 4900, 48, 'SHB-DD-PA125', '/products/dontodent-dentifrice.jpg?v=8',
 null, null, true, true, true, true, 'D26-401', '2028-06-30'),

(67, 'dontodent-bain-bouche', 'Bain de bouche antibactérien', 33, 9,
 $d$Bain de bouche Dontodent antibactérien 500 ml, sans alcool (sans éthanol). Formule 6 protections, arôme menthe-herbes, fluorure 450 ppm F-. Nettoie là où la brosse n'atteint pas — le format familial qui tient 3 à 4 semaines.$d$,
 $d$Aqua, glycerin, sorbitol, sodium benzoate, xylitol, cocamidopropyl betaine, cetylpyridinium chloride, sodium fluoride, extraits de menthe, camomille, myrrhe, sauge. Liste complète sur le flacon.$d$,
 $d$Après le brossage, 10 à 20 ml (bouchon) non dilué pendant 30 secondes. Ne pas rincer à l'eau. Ne pas avaler.$d$,
 $d$NE PAS AVALER. Convient à partir de 12 ans. Tenir hors de portée des enfants. Ceci n'est pas un médicament.$d$,
 '500 ml', 'Allemagne', 'Flacon Dontodent dm d''origine, scellé, DLC contrôlée à Lomé.',
 4500, 5500, 40, 'SHB-DD-MW500', '/products/dontodent-bain-bouche.jpg?v=8',
 null, null, true, true, true, true, 'D26-402', '2028-05-15'),

(68, 'dontodent-pique-dents', 'Pique-dents fil dentaire', 33, 9,
 $d$Pique-dents Dontodent Zahnseide-Sticks Sensitive, 40 pièces. Double usage : fil dentaire d'un côté, cure-dent dépliable de l'autre. Fil extra-doux, étui de voyage inclus — le format que l'on glisse dans le sac.$d$,
 $d$Fil nylon, manche plastique. Sans fluorure. Liste sur l'emballage.$d$,
 $d$Glisser le fil entre les dents par mouvements doux. Déplier le cure-dent pour les restes alimentaires. Usage unique, jeter après.$d$,
 $d$Usage unique. Ne pas forcer le fil. Tenir hors de portée des enfants de moins de 3 ans (risque d'ingestion).$d$,
 '40 pièces', 'Allemagne', 'Sachet Dontodent dm d''origine, étui voyage, lot contrôlé.',
 2900, 3900, 56, 'SHB-DD-PK40', '/products/dontodent-pique-dents.jpg?v=8',
 null, null, true, true, true, true, 'D26-403', '2029-01-31')

on conflict (slug) do nothing;

select setval('brands_id_seq', (select max(id) from brands));
select setval('products_id_seq', (select max(id) from products));
select setval('categories_id_seq', (select max(id) from categories));
