-- Pique-dents Dontodent Ungewachst 40 p. — photo réelle, tarif 1 500 F.

insert into products (
  id, slug, name, brand_id, category_id, description, ingredients, usage_tips, precautions,
  format_label, origin, authenticity_note, price_xof, compare_at_xof, stock, sku, image_url,
  skin_types, hair_types, is_featured, is_new, is_bestseller, is_active, lot_number, expires_on
) values
(73, 'dontodent-pique-ungewachst', 'Pique-dents fil non ciré', 33, 9,
 $d$Pique-dents Dontodent Zahnseide-Sticks Ungewachst, 40 pièces. Fil dentaire non ciré d'un côté, cure-dent dépliable de l'autre. Étui de voyage inclus — le sachet que l'on glisse dans le sac. Import dm Allemagne, lot photographié à Lomé.$d$,
 $d$Fil nylon non ciré, manche plastique. Sans fluorure. Liste sur l'emballage.$d$,
 $d$Glisser le fil entre les dents par mouvements doux. Déplier le cure-dent pour les restes alimentaires. Usage unique, jeter après. L'étui range quelques bâtonnets pour la journée.$d$,
 $d$Usage unique. Ne pas forcer le fil. Tenir hors de portée des enfants de moins de 3 ans (risque d'ingestion).$d$,
 '40 pièces', 'Allemagne', 'Sachet Dontodent dm d''origine Ungewachst, étui voyage, photographié à Lomé.',
 1500, 2000, 48, 'SHB-DD-PK40U', '/products/dontodent-pique-ungewachst.jpg?v=10',
 null, null, true, true, true, true, 'D26-410', '2029-03-31')
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  price_xof = 1500,
  compare_at_xof = 2000,
  image_url = excluded.image_url,
  authenticity_note = excluded.authenticity_note,
  is_featured = true,
  is_new = true,
  is_bestseller = true,
  is_active = true,
  stock = excluded.stock;

select setval('products_id_seq', (select max(id) from products));
