import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { BRAND } from "@/lib/brand";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { isWorkspacePreview } from "@/lib/env.server";
import { ENV_CATALOG, isEnvSet } from "@/lib/env-catalog";
import { ensureProfile } from "./profile";
import { markPaid } from "./orders";
import { bookNagodeForOrder } from "./nagode";
import { expireUnpaidHolds, releaseOrderStock } from "./stock";
import type { ProductDetail } from "@/lib/types";

async function requireAdmin(userId: string) {
  const profile = await ensureProfile(userId);
  if (profile.role !== "admin") throw new Error("Accès administrateur requis.");
  return profile;
}

export const adminOverview = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    await expireUnpaidHolds(sql);
    const [orders, products, low, recent] = await Promise.all([
      sql<{
        count: number;
        revenue: number;
        pending: number;
      }>`select
          count(*)::int as count,
          coalesce(sum(total_xof) filter (where status not in ('pending_payment','cancelled')), 0)::int as revenue,
          count(*) filter (where status = 'pending_payment')::int as pending
        from orders`,
      sql<{ count: number }>`select count(*)::int as count from products where is_active = true`,
      sql<{ id: number; name: string; stock: number; sku: string | null }>`
        select id, name, stock, sku from products where is_active = true and stock <= 8 order by stock asc limit 8
      `,
      sql<{
        public_ref: string;
        recipient: string;
        total_xof: number;
        status: string;
        created_at: string;
      }>`
        select public_ref, recipient, total_xof, status, created_at::text as created_at
        from orders order by id desc limit 8
      `,
    ]);
    return {
      orderCount: orders[0]?.count ?? 0,
      revenue: orders[0]?.revenue ?? 0,
      pending: orders[0]?.pending ?? 0,
      productCount: products[0]?.count ?? 0,
      lowStock: low,
      recent,
    };
  });

export const adminListProducts = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    return sql<ProductDetail>`
      select p.id, p.slug, p.name, p.brand_id, b.name as brand_name, b.slug as brand_slug,
             p.category_id, c.slug as category_slug, c.name as category_name,
             p.price_xof, p.compare_at_xof, p.stock, p.image_url, p.format_label,
             p.skin_types, p.is_featured, p.is_new, p.is_bestseller, p.is_active,
             p.description, p.ingredients, p.usage_tips, p.precautions, p.origin,
             p.authenticity_note, p.sku, p.hair_types, p.lot_number,
             p.expires_on::text as expires_on
      from products p
      join brands b on b.id = p.brand_id
      join categories c on c.id = p.category_id
      order by p.id
    `;
  });

const productPatch = z.object({
  id: z.number(),
  name: z.string().trim().min(2).optional(),
  price_xof: z.number().int().min(0).optional(),
  compare_at_xof: z.number().int().min(0).nullable().optional(),
  stock: z.number().int().min(0).optional(),
  is_active: z.boolean().optional(),
  is_featured: z.boolean().optional(),
  is_new: z.boolean().optional(),
  is_bestseller: z.boolean().optional(),
  description: z.string().optional(),
  authenticity_note: z.string().nullable().optional(),
  lot_number: z.string().nullable().optional(),
});

export const adminPatchProduct = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(productPatch)
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    const current = await sql<{ id: number; stock: number }>`
      select id, stock from products where id = ${data.id}
    `;
    if (!current.length) throw new Error("Produit introuvable.");
    await sql.query(
      `update products set
        name = coalesce($2, name),
        price_xof = coalesce($3, price_xof),
        compare_at_xof = case
          when $4::text = '__keep' then compare_at_xof
          when $4::text = '__null' then null
          else $4::int
        end,
        stock = coalesce($5, stock),
        is_active = coalesce($6, is_active),
        is_featured = coalesce($7, is_featured),
        is_new = coalesce($8, is_new),
        is_bestseller = coalesce($9, is_bestseller),
        description = coalesce($10, description),
        authenticity_note = coalesce($11, authenticity_note),
        lot_number = coalesce($12, lot_number)
      where id = $1`,
      [
        data.id,
        data.name ?? null,
        data.price_xof ?? null,
        data.compare_at_xof === undefined
          ? "__keep"
          : data.compare_at_xof === null
            ? "__null"
            : String(data.compare_at_xof),
        data.stock ?? null,
        data.is_active ?? null,
        data.is_featured ?? null,
        data.is_new ?? null,
        data.is_bestseller ?? null,
        data.description ?? null,
        data.authenticity_note ?? null,
        data.lot_number ?? null,
      ],
    );
    if (data.stock !== undefined && data.stock !== current[0].stock) {
      const delta = data.stock - current[0].stock;
      await sql`
        insert into stock_movements (product_id, qty, reason, note)
        values (${data.id}, ${delta}, 'admin', 'Ajustement boutique')
      `;
    }
    return { ok: true };
  });

export const adminListOrders = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    return sql<{
      id: number;
      public_ref: string;
      user_id: string;
      status: string;
      payment_network: string | null;
      payment_phone: string | null;
      payment_status: string;
      total_xof: number;
      recipient: string;
      phone: string;
      zone: string;
      city: string;
      created_at: string;
      nagode_tracking: string | null;
      nagode_status: string | null;
      nagode_mode: string | null;
      carrier_id: string;
    }>`
      select id, public_ref, user_id, status, payment_network, payment_phone, payment_status,
             total_xof, recipient, phone, zone, city, created_at::text as created_at,
             nagode_tracking, nagode_status, nagode_mode,
             coalesce(carrier_id, 'nagode') as carrier_id
      from orders order by id desc
    `;
  });

export const adminSetOrderStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      public_ref: z.string(),
      status: z.enum([
        "pending_payment",
        "paid",
        "preparing",
        "shipped",
        "delivered",
        "cancelled",
      ]),
      note: z.string().trim().max(240).optional(),
    }),
  )
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    const rows = await sql<{ id: number; status: string }>`
      select id, status from orders where public_ref = ${data.public_ref} limit 1
    `;
    if (!rows[0]) throw new Error("Commande introuvable.");
    if (data.status === "paid" && rows[0].status === "pending_payment") {
      await markPaid(
        rows[0].id,
        `BOUTIQUE-${data.public_ref}`,
        data.note ?? "Paiement Flooz/TMoney confirmé par la boutique",
      );
      return { ok: true };
    }
    if (data.status === "cancelled") {
      await releaseOrderStock(sql, rows[0].id, "cancel");
    }
    if (data.status === "shipped") {
      await bookNagodeForOrder(rows[0].id);
    }
    await sql`
      update orders set status = ${data.status}, updated_at = now()
      where id = ${rows[0].id}
    `;
    await sql`
      insert into order_events (order_id, status, note)
      values (${rows[0].id}, ${data.status}, ${data.note ?? "Mise à jour administrateur"})
    `;
    return { ok: true };
  });

export const adminListCustomers = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    return sql.query<{
      id: string;
      email: string;
      name: string;
      role: string | null;
      phone: string | null;
      orders: number;
    }>(
      `select u.id, u.email, u.name, p.role, p.phone,
              coalesce((select count(*) from orders o where o.user_id = u.id),0)::int as orders
       from "user" u
       left join profiles p on p.user_id = u.id
       order by u."createdAt" desc`,
    );
  });

export const adminStockBoard = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    await expireUnpaidHolds(sql);
    const [low, held, moves, zero] = await Promise.all([
      sql<{
        id: number;
        name: string;
        slug: string;
        sku: string | null;
        stock: number;
        brand_name: string;
      }>`
        select p.id, p.name, p.slug, p.sku, p.stock, b.name as brand_name
        from products p
        join brands b on b.id = p.brand_id
        where p.is_active = true and p.stock <= 8
        order by p.stock asc, p.name
        limit 40
      `,
      sql<{
        product_id: number;
        name: string;
        qty: number;
      }>`
        select oi.product_id, max(oi.name) as name, sum(oi.qty)::int as qty
        from order_items oi
        join orders o on o.id = oi.order_id
        where o.stock_held = true and o.status = 'pending_payment'
        group by oi.product_id
        order by sum(oi.qty) desc
      `,
      sql<{
        id: number;
        product_id: number;
        name: string;
        qty: number;
        reason: string;
        order_id: number | null;
        created_at: string;
      }>`
        select m.id, m.product_id, p.name, m.qty, m.reason, m.order_id,
               m.created_at::text as created_at
        from stock_movements m
        join products p on p.id = m.product_id
        order by m.id desc
        limit 40
      `,
      sql<{ count: number }>`
        select count(*)::int as count from products where is_active = true and stock = 0
      `,
    ]);
    return {
      low,
      held,
      moves,
      rupture: zero[0]?.count ?? 0,
    };
  });

export const adminListMessages = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    return sql<{
      id: number;
      name: string;
      phone: string | null;
      email: string | null;
      body: string;
      created_at: string;
    }>`
      select id, name, phone, email, body, created_at::text as created_at
      from messages order by id desc limit 50
    `;
  });

export const adminGetSettings = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    const rows = await sql<{ key: string; value: string }>`select key, value from site_settings`;
    const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    const token = map.paygate_auth_token ?? "";
    return {
      announcement: map.announcement ?? "",
      whatsapp: map.whatsapp ?? "",
      store_phone: map.store_phone ?? "",
      store_email: map.store_email || "skinhealth63@gmail.com",
      flooz_number: map.flooz_number || BRAND.flooz,
      tmoney_number: map.tmoney_number || BRAND.mixx,
      paygate_test_mode: map.paygate_test_mode !== "false",
      paygate_token_set: token.length > 0,
      paygate_token_masked: token ? `${token.slice(0, 4)}…${token.slice(-4)}` : "",
    };
  });

export const adminSaveSettings = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      announcement: z.string().max(200),
      whatsapp: z.string().max(32),
      store_phone: z.string().max(32),
      store_email: z.string().email().max(120),
      flooz_number: z.string().max(32),
      tmoney_number: z.string().max(32),
      paygate_test_mode: z.boolean(),
      paygate_auth_token: z.string().max(200).optional(),
    }),
  )
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    const upsert = async (key: string, value: string) => {
      await sql`
        insert into site_settings (key, value) values (${key}, ${value})
        on conflict (key) do update set value = excluded.value
      `;
    };
    await upsert("announcement", data.announcement);
    await upsert("whatsapp", data.whatsapp);
    await upsert("store_phone", data.store_phone);
    await upsert("store_email", data.store_email);
    await upsert("flooz_number", data.flooz_number);
    await upsert("tmoney_number", data.tmoney_number);
    await upsert("paygate_test_mode", data.paygate_test_mode ? "true" : "false");
    if (data.paygate_auth_token && data.paygate_auth_token.trim()) {
      await upsert("paygate_auth_token", data.paygate_auth_token.trim());
    }
    return { ok: true };
  });

export const adminGetEnvStatus = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const preview = isWorkspacePreview();
    const deployed = !preview;
    const vars = ENV_CATALOG.map((def) => {
      const set = def.pipelineOnly ? false : isEnvSet(def.key);
      const missing = deployed && def.requiredOnDeploy && !def.pipelineOnly && !set;
      return {
        key: def.key,
        group: def.group,
        label: def.label,
        description: def.description,
        secret: def.secret,
        requiredOnDeploy: def.requiredOnDeploy,
        client: def.client,
        setIn: def.setIn,
        pipelineOnly: Boolean(def.pipelineOnly),
        set,
        missing,
      };
    });
    const sql = await getSql();
    const paygate = await sql<{ value: string }>`
      select value from site_settings where key = 'paygate_auth_token' limit 1
    `;
    const token = paygate[0]?.value?.trim() ?? "";
    return {
      preview,
      deployed,
      missingRequired: vars.filter((v) => v.missing).map((v) => v.key),
      vars,
      paygateTokenSet: token.length > 0,
    };
  });
