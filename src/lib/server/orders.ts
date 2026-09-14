import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { carrierById, carrierFee, carriersForZone } from "@/lib/shipping";
import { isDeliveryPhone, isTogoMobile, normalizeDeliveryPhone, normalizeTogoPhone } from "@/lib/format";
import { resolveZone } from "@/lib/togo-cities";
import { isIntlZone, zoneById } from "@/lib/zones";
import { isRemotePay } from "@/lib/payments";
import { ensureProfile } from "./profile";
import { expireUnpaidHolds, takeStock, restoreStock } from "./stock";

function publicRef(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `skinhealthb-${y}${m}${day}-${rand}`;
}

export type OrderRow = {
  id: number;
  public_ref: string;
  status: string;
  payment_network: string | null;
  payment_phone: string | null;
  payment_status: string;
  subtotal_xof: number;
  delivery_xof: number;
  total_xof: number;
  zone: string;
  recipient: string;
  phone: string;
  city: string;
  address_details: string;
  notes: string | null;
  created_at: string;
  paid_at: string | null;
  nagode_tracking: string | null;
  nagode_status: string | null;
  nagode_mode: string | null;
  carrier_id: string;
};

export type OrderItem = {
  id: number;
  product_id: number | null;
  name: string;
  brand_name: string | null;
  qty: number;
  unit_price_xof: number;
  image_url: string | null;
};

export type OrderEvent = {
  id: number;
  status: string;
  note: string | null;
  created_at: string;
};

const checkoutSchema = z.object({
  items: z
    .array(z.object({ productId: z.number(), qty: z.number().int().min(1).max(20) }))
    .min(1)
    .max(40),
  recipient: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(8).max(32),
  zone: z.string(),
  city: z.string().trim().min(2).max(80),
  address_details: z.string().trim().min(4).max(240),
  notes: z.string().trim().max(400).optional(),
  payment_network: z.enum([
    "FLOOZ",
    "TMONEY",
    "WESTERN_UNION",
    "RIA",
    "MONEYGRAM",
  ]),
  payment_phone: z.string().trim().max(32).optional(),
  save_address: z.boolean().optional(),
  carrier_id: z.enum(["nagode", "poste", "gozem", "retrait"]).optional(),
});

export const createOrder = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(checkoutSchema)
  .handler(async ({ context, data }) => {
    const remote = isRemotePay(data.payment_network);
    const sender = data.payment_phone?.trim() || (remote ? "" : data.phone);
    if (!remote && !isTogoMobile(sender)) {
      throw new Error(
        "Paiement Flooz ou Mixx : indique un numéro togolais (8 chiffres).",
      );
    }
    const zoneId = resolveZone(data.city, data.zone);
    if (!zoneById(zoneId)) {
      throw new Error("Ville de livraison inconnue.");
    }
    if (remote && !isIntlZone(zoneId)) {
      throw new Error(
        "Western Union, Ria et MoneyGram : commandes hors Togo.",
      );
    }
    if (!isDeliveryPhone(data.phone, zoneId)) {
      throw new Error("Numéro du destinataire invalide pour ce pays.");
    }
    const carrierId = data.carrier_id ?? (isIntlZone(zoneId) ? "poste" : "nagode");
    if (isIntlZone(zoneId) && carrierId !== "poste") {
      throw new Error("Bénin, Côte d’Ivoire et Sénégal : La Poste uniquement.");
    }
    if (!carriersForZone(zoneId).some((c) => c.id === carrierId)) {
      throw new Error(
        `${carrierById(carrierId).name} ne dessert pas cette zone. Choisissez Nagode ou La Poste.`,
      );
    }
    await ensureProfile(context.userId);
    const sql = await getSql();
    await expireUnpaidHolds(sql);
    const ids = [...new Set(data.items.map((i) => i.productId))];
    const products = await sql.query<{
      id: number;
      name: string;
      brand_name: string;
      price_xof: number;
      stock: number;
      image_url: string;
      is_active: boolean;
    }>(
      `select p.id, p.name, b.name as brand_name, p.price_xof, p.stock, p.image_url, p.is_active
       from products p join brands b on b.id = p.brand_id
       where p.id = any($1::int[])`,
      [ids],
    );
    const byId = new Map(products.map((p) => [p.id, p]));
    const qtyById = new Map<number, number>();
    for (const item of data.items) {
      qtyById.set(item.productId, (qtyById.get(item.productId) ?? 0) + item.qty);
    }
    let subtotal = 0;
    const lines: {
      product_id: number;
      name: string;
      brand_name: string;
      qty: number;
      unit_price_xof: number;
      image_url: string;
    }[] = [];
    for (const [productId, qty] of qtyById) {
      const p = byId.get(productId);
      if (!p || !p.is_active) throw new Error("Un produit n'est plus disponible.");
      if (p.stock < qty) {
        throw new Error(`Stock insuffisant pour ${p.name} (${p.stock} restant).`);
      }
      subtotal += p.price_xof * qty;
      lines.push({
        product_id: p.id,
        name: p.name,
        brand_name: p.brand_name,
        qty,
        unit_price_xof: p.price_xof,
        image_url: p.image_url,
      });
    }
    const ship = carrierFee(carrierId, zoneId, subtotal);
    const total = subtotal + ship;
    const ref = publicRef();
    const phone = normalizeDeliveryPhone(data.phone, zoneId);
    const payPhone = remote
      ? null
      : normalizeTogoPhone(sender);

    const orderRows = await sql<{ id: number }>`
      insert into orders (
        public_ref, user_id, status, payment_network, payment_phone,
        paygate_identifier, payment_status, subtotal_xof, delivery_xof, total_xof,
        zone, recipient, phone, city, address_details, notes, carrier_id, stock_held
      ) values (
        ${ref}, ${context.userId}, 'pending_payment', ${data.payment_network}, ${payPhone},
        ${ref}, 'pending', ${subtotal}, ${ship}, ${total},
        ${zoneId}, ${data.recipient}, ${phone}, ${data.city}, ${data.address_details},
        ${data.notes ?? null}, ${carrierId}, false
      )
      returning id
    `;
    const orderId = orderRows[0].id;
    const taken: { product_id: number; qty: number }[] = [];
    try {
      for (const line of lines) {
        await sql`
          insert into order_items (order_id, product_id, name, brand_name, qty, unit_price_xof, image_url)
          values (
            ${orderId}, ${line.product_id}, ${line.name}, ${line.brand_name},
            ${line.qty}, ${line.unit_price_xof}, ${line.image_url}
          )
        `;
        const ok = await takeStock(sql, line.product_id, line.qty, "reserve", orderId);
        if (!ok) {
          throw new Error(`Stock insuffisant pour ${line.name}.`);
        }
        taken.push({ product_id: line.product_id, qty: line.qty });
      }
    } catch (err) {
      for (const t of taken) {
        await restoreStock(sql, t.product_id, t.qty, "rollback", orderId);
      }
      await sql`update orders set stock_held = false, status = 'cancelled', updated_at = now() where id = ${orderId}`;
      throw err;
    }
    await sql`update orders set stock_held = true, updated_at = now() where id = ${orderId}`;
    await sql`
      insert into order_events (order_id, status, note)
      values (${orderId}, 'pending_payment', 'Commande créée — transfert Flooz/TMoney en attente')
    `;

    if (data.save_address) {
      await sql`update addresses set is_default = false where user_id = ${context.userId}`;
      await sql`
        insert into addresses (user_id, label, recipient, phone, zone, city, details, is_default)
        values (
          ${context.userId}, 'Livraison', ${data.recipient}, ${phone},
          ${zoneId}, ${data.city}, ${data.address_details}, true
        )
      `;
    }

    const modeRows = await sql<{ value: string }>`
      select value from site_settings where key = 'paygate_test_mode'
    `;
    const testMode = modeRows[0]?.value !== "false";
    return {
      public_ref: ref,
      total_xof: total,
      test_mode: testMode,
      payment_network: data.payment_network,
    };
  });

export const listMyOrders = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql<OrderRow>`
      select id, public_ref, status, payment_network, payment_phone, payment_status,
             subtotal_xof, delivery_xof, total_xof, zone, recipient, phone,
             city, address_details, notes, created_at::text as created_at,
             paid_at::text as paid_at,
             nagode_tracking, nagode_status, nagode_mode,
             coalesce(carrier_id, 'nagode') as carrier_id
      from orders where user_id = ${context.userId}
      order by id desc
    `;
  });

export const getMyOrder = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((ref: string) => ref)
  .handler(async ({ context, data: ref }) => {
    const sql = await getSql();
    const orders = await sql<OrderRow>`
      select id, public_ref, status, payment_network, payment_phone, payment_status,
             subtotal_xof, delivery_xof, total_xof, zone, recipient, phone,
             city, address_details, notes, created_at::text as created_at,
             paid_at::text as paid_at,
             nagode_tracking, nagode_status, nagode_mode,
             coalesce(carrier_id, 'nagode') as carrier_id
      from orders where public_ref = ${ref} and user_id = ${context.userId}
      limit 1
    `;
    const order = orders[0];
    if (!order) return null;
    const items = await sql<OrderItem>`
      select id, product_id, name, brand_name, qty, unit_price_xof, image_url
      from order_items where order_id = ${order.id}
    `;
    const events = await sql<OrderEvent>`
      select id, status, note, created_at::text as created_at
      from order_events where order_id = ${order.id} order by id
    `;
    return { order, items, events };
  });

export async function markPaid(orderId: number, txRef: string, note: string) {
  const sql = await getSql();
  const current = await sql<{ status: string }>`
    select status from orders where id = ${orderId}
  `;
  if (!current[0] || current[0].status !== "pending_payment") return;
  await sql`
    update orders
    set status = 'paid',
        payment_status = 'success',
        paygate_tx_reference = ${txRef},
        paid_at = now(),
        updated_at = now()
    where id = ${orderId}
  `;
  await sql`
    insert into order_events (order_id, status, note)
    values (${orderId}, 'paid', ${note})
  `;
}

export const markTransferSent = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((ref: string) => ref)
  .handler(async ({ context, data: ref }) => {
    const sql = await getSql();
    const orders = await sql<{ id: number; status: string; payment_status: string }>`
      select id, status, payment_status from orders
      where public_ref = ${ref} and user_id = ${context.userId}
      limit 1
    `;
    const order = orders[0];
    if (!order) throw new Error("Commande introuvable.");
    if (order.status !== "pending_payment") {
      return { ok: true, payment_status: "success" as const };
    }
    await sql`
      update orders
      set payment_status = 'transferred', updated_at = now()
      where id = ${order.id}
    `;
    if (order.payment_status !== "transferred") {
      await sql`
        insert into order_events (order_id, status, note)
        values (
          ${order.id},
          'pending_payment',
          'Client a déclaré avoir transféré via Flooz ou TMoney'
        )
      `;
    }
    return { ok: true, payment_status: "transferred" as const };
  });

export const confirmTestPayment = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((ref: string) => ref)
  .handler(async ({ context, data: ref }) => {
    const sql = await getSql();
    const mode = await sql<{ value: string }>`
      select value from site_settings where key = 'paygate_test_mode'
    `;
    if (mode[0]?.value === "false") {
      throw new Error("Le mode test PayGate est désactivé.");
    }
    const orders = await sql<{ id: number }>`
      select id from orders
      where public_ref = ${ref} and user_id = ${context.userId}
      limit 1
    `;
    if (!orders[0]) throw new Error("Commande introuvable.");
    await markPaid(
      orders[0].id,
      `TEST-${ref}`,
      "Paiement test confirmé — aucun débit réel Flooz/TMoney",
    );
    return { ok: true };
  });

export async function markOrderPaidByRef(identifier: string, txRef: string) {
  const sql = await getSql();
  const rows = await sql<{ id: number }>`
    select id from orders where public_ref = ${identifier} or paygate_identifier = ${identifier}
    limit 1
  `;
  if (!rows[0]) return false;
  await markPaid(rows[0].id, txRef, "Paiement PayGate confirmé (callback)");
  return true;
}
