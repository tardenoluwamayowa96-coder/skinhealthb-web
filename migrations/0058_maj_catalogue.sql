-- 1. Masquer tous les anciens produits
UPDATE products SET is_active = false;

-- 2. Insérer les 14 nouveaux arrivages
INSERT INTO products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) VALUES
(250, 'medicube-deep-vita-c-serum', 'Medicube Deep Vita C Serum', 1, 1, 
 $d$Sérum concentré à la vitamine C pure pour cibler les taches pigmentaires et illuminer le teint.$d$, 
 $d$Vitamine C pure, Niacinamide, Panthénol.$d$, $d$Appliquer quelques gouttes le matin et le soir.$d$, $d$Usage externe. Éviter le contact avec les yeux.$d$, 
 'Flacon 30ml', 'Corée', 'Authenticité vérifiée', 11000, 13000, 12, 'MED-VITA-01', '', 'Tous types de peau', '', true, true, true, true, '', '2028-12-31'),

(251, 'anua-niacinamide-10-txa-4-serum', 'Anua Niacinamide 10% + TXA 4% Serum', 2, 1, 
 $d$Sérum correcteur anti-taches formulé avec 10% de niacinamide et 4% d'acide tranexamique.$d$, 
 $d$Niacinamide 10%, Acide Tranexamique 4%, Arbutine.$d$, $d$Appliquer matin et soir sur peau propre.$d$, $d$Usage externe.$d$, 
 'Flacon 30ml', 'Corée', 'Authenticité vérifiée', 13500, 15000, 12, 'ANU-NIA-01', '', 'Tous types de peau', '', true, true, true, true, '', '2028-12-31'),

(252, 'beauty-of-joseon-relief-sun', 'Beauty of Joseon Sun Relief (Riz + Probiotiques)', 3, 1, 
 $d$Protection solaire bio SPF50+ PA++++ enrichie en extrait de riz et probiotiques.$d$, 
 $d$Extrait de riz 30%, Complexe probiotique.$d$, $d$Appliquer généreusement 15 minutes avant l'exposition.$d$, $d$Renouveler toutes les 2 heures.$d$, 
 'Tube 50ml', 'Corée', 'Authenticité vérifiée', 10000, 12000, 12, 'BOJ-SUN-01', '', 'Tous types de peau', '', true, true, true, true, '', '2028-12-31'),

(253, 'beauty-of-joseon-glow-deep-serum', 'Beauty of Joseon Glow Deep Serum', 3, 1, 
 $d$Sérum éclat et unifiant formulé avec de l'eau de son de riz et de l'alpha-arbutine.$d$, 
 $d$Eau de son de riz 68%, Alpha-Arbutine 2%.$d$, $d$Tapoter délicatement 2-3 gouttes sur le visage.$d$, $d$Usage externe.$d$, 
 'Flacon 30ml', 'Corée', 'Authenticité vérifiée', 10000, 12000, 12, 'BOJ-GLOW-01', '', 'Tous types de peau', '', false, true, true, true, '', '2028-12-31'),

(254, 'skin1004-hyalu-cica-sun-serum', 'SKIN1004 Hyalu-Cica Water-Fit Sun Serum', 4, 1, 
 $d$Sérum solaire SPF50+ hydratant et apaisant à la Centella Asiatica de Madagascar.$d$, 
 $d$Extrait de Centella Asiatica, Acide hyaluronique.$d$, $d$Dernière étape de la routine visage le matin.$d$, $d$Usage externe.$d$, 
 'Tube 50ml', 'Corée', 'Authenticité vérifiée', 11000, 13000, 12, 'SKIN-SUN-01', '', 'Peaux normales à sèches', '', true, true, true, true, '', '2028-12-31'),

(255, 'skin1004-centella-ampoule-foam', 'SKIN1004 Centella Ampoule Foam', 4, 1, 
 $d$Nettoyant visage moussant doux au pH équilibré enrichi en extrait de Centella Asiatica.$d$, 
 $d$Extrait de Centella Asiatica, tensioactifs doux issus de la noix de coco.$d$, $d$Faire mousser sur peau humide et rincer.$d$, $d$Rincer à l'eau claire en cas de contact avec les yeux.$d$, 
 'Tube 125ml', 'Corée', 'Authenticité vérifiée', 9000, 11000, 12, 'SKIN-FOAM-01', '', 'Tous types de peau', '', false, true, false, true, '', '2028-12-31'),

(256, 'haruharu-airyfit-sunscreen', 'Haruharu Wonder Airyfit Sunscreen SPF50+', 5, 1, 
 $d$Protection solaire chimique légère au fini invisible et au riz noir fermenté.$d$, 
 $d$Extrait de riz noir, Huile de son de riz, Céramide NP.$d$, $d$Appliquer uniformément le matin.$d$, $d$Usage externe.$d$, 
 'Tube 50ml', 'Corée', 'Authenticité vérifiée', 9500, 11500, 12, 'HARU-SUN-01', '', 'Tous types de peau', '', false, true, false, true, '', '2028-12-31'),

(257, 'haruharu-hyaluronic-toner', 'Haruharu Wonder Black Rice Hyaluronic Toner', 5, 1, 
 $d$Tonique ultra-hydratant et anti-âge au riz noir fermenté et acide hyaluronique.$d$, 
 $d$Extrait de riz noir fermenté, Acide hyaluronique.$d$, $d$Appliquer à l'aide d'un coton ou directement avec les paumes.$d$, $d$Usage externe.$d$, 
 'Flacon 150ml', 'Corée', 'Authenticité vérifiée', 8500, 10500, 12, 'HARU-TON-01', '', 'Tous types de peau', '', false, true, false, true, '', '2028-12-31'),

(258, 'mixsoon-bean-essence', 'Mixsoon Bean Essence', 6, 1, 
 $d$Essence culte exfoliante douce et hydratante formulée à base de soja fermenté.$d$, 
 $d$Extrait de soja fermenté, Orge, Grenade, Poire.$d$, $d$Masser délicatement en mouvements circulaires.$d$, $d$Usage externe.$d$, 
 'Flacon 50ml', 'Corée', 'Authenticité vérifiée', 15000, 17500, 12, 'MIX-BEAN-01', '', 'Tous types de peau', '', true, true, true, true, '', '2028-12-31'),

(259, 'torriden-dive-in-cream', 'Torriden DIVE-IN Low Molecular Hyaluronic Acid Cream', 7, 1, 
 $d$Crème apaisante gorgée de 5 types d'acide hyaluronique pour une hydratation intense.$d$, 
 $d$Acide hyaluronique multi-moléculaire, Allantoïne.$d$, $d$Appliquer matin et soir sur le visage et le cou.$d$, $d$Usage externe.$d$, 
 'Pot 80ml', 'Corée', 'Authenticité vérifiée', 12000, 14000, 12, 'TOR-CREAM-01', '', 'Tous types de peau', '', false, true, false, true, '', '2028-12-31'),

(260, 'laneige-lip-sleeping-mask-mini', 'Laneige Lip Sleeping Mask Berry', 64, 4, 
 $d$Masque de nuit régénérant pour les lèvres au beurre de karité et complexe de baies.$d$, 
 $d$Complexe de baies, Beurre de karité, Murumuru.$d$, $d$Appliquer une couche généreuse avant de dormir.$d$, $d$Usage externe.$d$, 
 'Mini pot 8g', 'Corée', 'Authenticité vérifiée', 4000, 5000, 12, 'LAN-LIP-01', '', 'Tous types de lèvres', '', true, true, true, true, '', '2028-12-31'),

(261, 'eos-body-wash-coconut', 'EOS Body Wash Coconut Waters', 8, 2, 
 $d$Gel douche hydratant et ultra-nourrissant aux senteurs douces d’eau de coco.$d$, 
 $d$Beurre de karité, Huile de coco, Glycérine.$d$, $d$Appliquer sur peau humide, faire mousser et rincer.$d$, $d$Usage corporel externe.$d$, 
 'Flacon 473ml', 'USA', 'Authenticité vérifiée', 14000, 16000, 12, 'EOS-COCO-01', '', 'Tous types de peau', '', false, true, true, true, '', '2028-12-31'),

(262, 'eos-body-wash-vanilla', 'EOS Body Wash Vanilla Cashmere', 8, 2, 
 $d$Gel douche onctueux parfum vanille gourmande et cachemire pour une peau satinée.$d$, 
 $d$Beurre de karité, Extrait de vanille, Huile d'argan.$d$, $d$Appliquer sur l'ensemble du corps, mousser puis rincer.$d$, $d$Usage corporel externe.$d$, 
 'Flacon 473ml', 'USA', 'Authenticité vérifiée', 14000, 16000, 12, 'EOS-VANI-01', '', 'Tous types de peau', '', true, true, true, true, '', '2028-12-31'),

(263, 'kojie-san-soap-pack-3', 'Savon Kojie San Éclaircissant (Pack 3-en-1)', 9, 2, 
 $d$Pack de 3 savons à base d'acide kojique pur pour unifier le teint et atténuer les taches.$d$, 
 $d$Acide kojique, Huile de noix de coco, Huile d'arbre à thé.$d$, $d$Faire mousser sur peau humide, laisser agir 1 à 2 min puis rincer.$d$, $d$Usage progressif, utiliser une protection solaire en journée.$d$, 
 'Pack 3 x 65g', 'Philippines', 'Authenticité vérifiée', 8000, 9500, 12, 'KOJ-PACK-01', '', 'Peaux hyperpigmentées', '', true, true, true, true, '', '2028-12-31')
ON CONFLICT (id) DO UPDATE SET
  price_xof = EXCLUDED.price_xof,
  compare_at_xof = EXCLUDED.compare_at_xof,
  stock = EXCLUDED.stock,
  is_active = EXCLUDED.is_active;


