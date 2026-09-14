-- Shampoings + leave-in Garnier Wahre Schätze — 3 500 F.
-- Traube Hydraboost shampoo déjà en 0036 à 3 500 F.

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values

(213, 'garnier-ws-kohle', 'Shampoing Charbon & nigelle', 30, 3,
 $d$Garnier Wahre Schätze Ausgleichendes Shampoo Aktivkohle & Schwarzkümmelöl, 250 ml. Sans silicone. Cuir chevelu à tendance grasse, longueurs sèches : dégraisse, hydrate jusqu'à 3 jours.$d$,
 $d$Aqua, surfactants, charcoal, nigella sativa seed oil, parfum. Sans silicones. 95 % d'ingrédients d'origine naturelle. Liste complète sur le flacon.$d$,
 $d$Cheveux mouillés, masser le cuir chevelu, rincer. 2 à 3 fois par semaine. Compléter avec un après-shampoing sur les longueurs.$d$,
 $d$Usage externe. Éviter les yeux. Rincer abondamment.$d$,
 '250 ml', 'Allemagne', 'Flacon Garnier Wahre Schätze Aktivkohle d''origine, lot photographié.',
 3500, null, 24, 'SHB-GA-WKH250', '/products/garnier-ws-kohle.jpg?v=32',
 null, 'gras,mixte,longueurs sèches', true, true, true, true, 'G26-WKH250', '2028-06-30'),

(214, 'garnier-ws-avocado-shampoo', 'Shampoing Avocat & karité', 30, 3,
 $d$Garnier Wahre Schätze Intensiv nährendes Shampoo Avocado-Öl & Shea, 250 ml. Sans silicone. Cheveux très secs, ondulés, bouclés ou épais.$d$,
 $d$Aqua, surfactants, avocado oil, shea butter, parfum. Sans silicones. Liste complète sur le flacon.$d$,
 $d$Cheveux mouillés, faire mousser, rincer. Enchaîner avec l'après-shampoing ou le masque avocat.$d$,
 $d$Usage externe. Éviter les yeux. Contient du beurre de karité.$d$,
 '250 ml', 'Allemagne', 'Flacon Garnier Wahre Schätze Avocado Shampoo d''origine, lot photographié.',
 3500, null, 24, 'SHB-GA-WAS250', '/products/garnier-ws-avocado-shampoo.jpg?v=32',
 null, 'très sec,bouclé,épais', true, true, true, true, 'G26-WAS250', '2028-06-30'),

(215, 'garnier-ws-leavein-honig', 'Crème leave-in 2-en-1 3 miels', 30, 3,
 $d$Garnier Wahre Schätze Honig Schätze, crème leave-in 2-en-1 soin & coiffage, 200 ml. Anti-frisottis, réparation, protection chaleur 230 °C. Cheveux abîmés, cassants. Acacia, manuka, lavande.$d$,
 $d$Aqua, honey (acacia, manuka, lavender), styling agents, parfum. Liste complète sur le flacon.$d$,
 $d$Sur cheveux essorés ou secs, noix de crème, longueurs et pointes. Ne pas rincer. Avant brushing ou lisseur (230 °C max).$d$,
 $d$Usage externe. Contient du miel : déconseillé en cas d'allergie aux produits de la ruche. Éviter les yeux.$d$,
 '200 ml', 'Allemagne', 'Flacon Garnier Wahre Schätze Honig Leave-in d''origine, lot photographié.',
 3500, null, 20, 'SHB-GA-WLH200', '/products/garnier-ws-leavein-honig.jpg?v=32',
 null, 'abîmé,cassant,frisottis', true, true, true, true, 'G26-WLH200', '2028-06-30'),

(216, 'garnier-ws-leavein-avocado', 'Crème leave-in 2-en-1 Avocat & karité', 30, 3,
 $d$Garnier Wahre Schätze Avocado-Öl & Shea, crème leave-in 2-en-1 boucles, 200 ml. Sans silicone, protection chaleur 230 °C. Cheveux très secs, ondulés et bouclés.$d$,
 $d$Aqua, avocado oil, shea butter, styling agents, parfum. Sans silicones. Liste complète sur le flacon.$d$,
 $d$Sur cheveux essorés, noix de crème, scrunch sur les boucles. Ne pas rincer. Avant chaleur (230 °C max).$d$,
 $d$Usage externe. Contient du beurre de karité. Éviter les yeux.$d$,
 '200 ml', 'Allemagne', 'Flacon Garnier Wahre Schätze Avocado Leave-in d''origine, lot photographié.',
 3500, null, 20, 'SHB-GA-WLA200', '/products/garnier-ws-leavein-avocado.jpg?v=32',
 null, 'très sec,ondulé,bouclé', true, true, true, true, 'G26-WLA200', '2028-06-30')

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
  hair_types = excluded.hair_types,
  is_featured = true,
  is_new = true,
  is_active = true;

select setval('products_id_seq', (select max(id) from products));
