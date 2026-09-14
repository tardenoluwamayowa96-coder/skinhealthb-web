import { createServerFn } from "@tanstack/react-start";
import { BRAND } from "@/lib/brand";
import { getSql } from "@/lib/db";
import { ROUTINES } from "@/lib/routine";
import { TRENDS } from "@/lib/trends";
import type { Brand, Category, ProductCard, ProductDetail, PublicSettings } from "@/lib/types";

const CARD_SELECT = `
  p.id, p.slug, p.name, p.brand_id, b.name as brand_name, b.slug as brand_slug,
  p.category_id, c.slug as category_slug, c.name as category_name,
  p.price_xof, p.compare_at_xof, p.stock, p.image_url, p.format_label, p.skin_types,
  p.is_featured, p.is_new, p.is_bestseller, p.is_active
`;

export type CatalogFilters = {
  q?: string;
  category?: string;
  brand?: string;
  skin?: string;
  promo?: boolean;
  available?: boolean;
  featured?: boolean;
  isNew?: boolean;
  bestseller?: boolean;
  origin?: string;
  sort?: "featured" | "price_asc" | "price_desc" | "new";
};

export const listBrands = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  return sql<Brand & { product_count: number }>`
    select b.id, b.slug, b.name, b.country, b.verified,
           coalesce(count(p.id) filter (where p.is_active), 0)::int as product_count
    from brands b
    left join products p on p.brand_id = b.id
    group by b.id, b.slug, b.name, b.country, b.verified
    having coalesce(count(p.id) filter (where p.is_active), 0) > 0
    order by (b.country = 'Corée') desc, b.name
  `;
});

export const listCategories = createServerFn({ method: "GET" }).handler(
  async () => {
    const sql = await getSql();
    return sql<Category>`
      select id, slug, name, description, sort_order
      from categories
      order by sort_order
    `;
  },
);

export const getPublicSettings = createServerFn({ method: "GET" }).handler(
  async () => {
    const sql = await getSql();
    const rows = await sql<{ key: string; value: string }>`
      select key, value from site_settings
      where key in ('announcement','whatsapp','paygate_test_mode','store_phone','store_email','flooz_number','tmoney_number')
    `;
    const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    const settings: PublicSettings = {
      announcement: map.announcement ?? "",
      whatsapp: map.whatsapp ?? "",
      paygate_test_mode: map.paygate_test_mode !== "false",
      store_phone: map.store_phone ?? "",
      store_email: map.store_email || BRAND.email,
      flooz_number: map.flooz_number || BRAND.flooz,
      tmoney_number: map.tmoney_number || BRAND.mixx,
    };
    return settings;
  },
);

export const listProducts = createServerFn({ method: "GET" })
  .validator((input: CatalogFilters | undefined) => input ?? {})
  .handler(async ({ data }) => {
    const sql = await getSql();
    const where: string[] = ["p.is_active = true"];
    const params: unknown[] = [];
    let i = 1;
    if (data.q) {
      where.push(
        `(p.name ilike $${i} or b.name ilike $${i} or p.description ilike $${i})`,
      );
      params.push(`%${data.q.trim()}%`);
      i += 1;
    }
    if (data.category) {
      where.push(`c.slug = $${i}`);
      params.push(data.category);
      i += 1;
    }
    if (data.brand) {
      where.push(`b.slug = $${i}`);
      params.push(data.brand);
      i += 1;
    }
    if (data.skin) {
      where.push(`p.skin_types ilike $${i}`);
      params.push(`%${data.skin}%`);
      i += 1;
    }
    if (data.promo) where.push("p.compare_at_xof is not null and p.compare_at_xof > p.price_xof");
    if (data.available) where.push("p.stock > 0");
    if (data.featured) where.push("p.is_featured = true");
    if (data.isNew) where.push("p.is_new = true");
    if (data.bestseller) where.push("p.is_bestseller = true");
    if (data.origin) {
      where.push(`p.origin ilike $${i}`);
      params.push(`%${data.origin}%`);
      i += 1;
    }

    let order = "p.is_featured desc, p.is_bestseller desc, p.id asc";
    if (data.sort === "price_asc") order = "p.price_xof asc";
    if (data.sort === "price_desc") order = "p.price_xof desc";
    if (data.sort === "new") order = "p.is_new desc, p.id desc";

    return sql.query<ProductCard>(
      `select ${CARD_SELECT}
       from products p
       join brands b on b.id = p.brand_id
       join categories c on c.id = p.category_id
       where ${where.join(" and ")}
       order by ${order}`,
      params,
    );
  });

export const getProduct = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const sql = await getSql();
    const rows = await sql.query<ProductDetail>(
      `select ${CARD_SELECT},
              p.description, p.ingredients, p.usage_tips, p.precautions,
              p.origin, p.authenticity_note, p.sku, p.hair_types,
              p.lot_number, p.expires_on::text as expires_on
       from products p
       join brands b on b.id = p.brand_id
       join categories c on c.id = p.category_id
       where p.slug = $1 and p.is_active = true
       limit 1`,
      [slug],
    );
    return rows[0] ?? null;
  });

export const getHomeData = createServerFn({ method: "GET" }).handler(
  async () => {
    const sql = await getSql();
    const [featured, news, bestsellers, dental, korea, makeup, categories, brands, settingsRows] =
      await Promise.all([
        sql.query<ProductCard>(
          `select ${CARD_SELECT} from products p
           join brands b on b.id = p.brand_id
           join categories c on c.id = p.category_id
           where p.is_active = true and p.is_featured = true
           order by p.is_new desc, p.id desc limit 12`,
        ),
        sql.query<ProductCard>(
          `select ${CARD_SELECT} from products p
           join brands b on b.id = p.brand_id
           join categories c on c.id = p.category_id
           where p.is_active = true and p.is_new = true
           order by p.is_featured desc, p.id desc limit 12`,
        ),
        sql.query<ProductCard>(
          `select ${CARD_SELECT} from products p
           join brands b on b.id = p.brand_id
           join categories c on c.id = p.category_id
           where p.is_active = true and p.is_bestseller = true
           order by p.id limit 8`,
        ),
        sql.query<ProductCard>(
          `select ${CARD_SELECT} from products p
           join brands b on b.id = p.brand_id
           join categories c on c.id = p.category_id
           where p.is_active = true and c.slug = 'dentaire'
           order by p.is_featured desc, p.id
           limit 8`,
        ),
        sql.query<ProductCard>(
          `select ${CARD_SELECT} from products p
           join brands b on b.id = p.brand_id
           join categories c on c.id = p.category_id
           where p.is_active = true and p.origin ilike '%Corée%'
           order by p.is_bestseller desc, p.is_featured desc, p.id
           limit 8`,
        ),
        sql.query<ProductCard>(
          `select ${CARD_SELECT} from products p
           join brands b on b.id = p.brand_id
           join categories c on c.id = p.category_id
           where p.is_active = true and c.slug = 'maquillage'
           order by p.is_featured desc, p.is_bestseller desc, p.id
           limit 8`,
        ),
        sql<Category>`select id, slug, name, description, sort_order from categories order by sort_order`,
        sql<Brand>`select id, slug, name, country, verified from brands order by name`,
        sql<{ key: string; value: string }>`select key, value from site_settings where key in ('announcement','whatsapp','paygate_test_mode','store_phone','store_email','flooz_number','tmoney_number')`,
      ]);
    const map = Object.fromEntries(settingsRows.map((r) => [r.key, r.value]));
    return {
      featured,
      news,
      bestsellers,
      dental,
      korea,
      makeup,
      categories,
      brands,
      settings: {
        announcement: map.announcement ?? "",
        whatsapp: map.whatsapp ?? "",
        paygate_test_mode: map.paygate_test_mode !== "false",
        store_phone: map.store_phone ?? "",
        store_email: map.store_email || BRAND.email,
        flooz_number: map.flooz_number || BRAND.flooz,
        tmoney_number: map.tmoney_number || BRAND.mixx,
      } satisfies PublicSettings,
    };
  },
);

export const productsByIds = createServerFn({ method: "GET" })
  .validator((ids: number[]) => ids.filter((n) => Number.isInteger(n) && n > 0))
  .handler(async ({ data: ids }) => {
    if (!ids.length) return [] as ProductCard[];
    const sql = await getSql();
    return sql.query<ProductCard>(
      `select ${CARD_SELECT} from products p
       join brands b on b.id = p.brand_id
       join categories c on c.id = p.category_id
       where p.id = any($1::int[]) and p.is_active = true`,
      [ids],
    );
  });

export const productsBySlugs = createServerFn({ method: "GET" })
  .validator((slugs: string[]) => slugs.filter((s) => typeof s === "string" && s.length > 0))
  .handler(async ({ data: slugs }) => {
    if (!slugs.length) return [] as ProductCard[];
    const sql = await getSql();
    return sql.query<ProductCard>(
      `select ${CARD_SELECT} from products p
       join brands b on b.id = p.brand_id
       join categories c on c.id = p.category_id
       where p.slug = any($1::text[]) and p.is_active = true`,
      [slugs],
    );
  });

export const getTrends = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const slugs = [...new Set(TRENDS.flatMap((t) => [...t.slugs]))];
  const rows = slugs.length
    ? await sql.query<ProductCard>(
        `select ${CARD_SELECT} from products p
         join brands b on b.id = p.brand_id
         join categories c on c.id = p.category_id
         where p.slug = any($1::text[]) and p.is_active = true`,
        [slugs],
      )
    : [];
  const bySlug = Object.fromEntries(rows.map((p) => [p.slug, p]));
  return TRENDS.map((t) => ({
    slug: t.slug,
    title: t.title,
    kicker: t.kicker,
    why: t.why,
    products: t.slugs.map((s) => bySlug[s]).filter(Boolean),
  }));
});

export const getRoutines = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const slugs = [
    ...new Set(ROUTINES.flatMap((r) => r.steps.flatMap((s) => [...s.slugs]))),
  ];
  const rows = slugs.length
    ? await sql.query<ProductCard>(
        `select ${CARD_SELECT} from products p
         join brands b on b.id = p.brand_id
         join categories c on c.id = p.category_id
         where p.slug = any($1::text[]) and p.is_active = true`,
        [slugs],
      )
    : [];
  const bySlug = Object.fromEntries(rows.map((p) => [p.slug, p]));
  return ROUTINES.map((r) => ({
    slug: r.slug,
    title: r.title,
    kicker: r.kicker,
    why: r.why,
    steps: r.steps.map((s) => ({
      name: s.name,
      text: s.text,
      products: s.slugs.map((slug) => bySlug[slug]).filter(Boolean),
    })),
  }));
});
