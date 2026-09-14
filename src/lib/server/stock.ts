import type { Sql } from "@/lib/db";

/** Commande impayée : le rayon reprend le stock après 48 h. */
export const STOCK_HOLD_HOURS = 48;

export async function takeStock(
  sql: Sql,
  productId: number,
  qty: number,
  reason: string,
  orderId?: number,
) {
  const rows = await sql.query<{ stock: number }>(
    `update products set stock = stock - $2
     where id = $1 and stock >= $2
     returning stock`,
    [productId, qty],
  );
  if (!rows[0]) return false;
  await sql`
    insert into stock_movements (product_id, qty, reason, order_id)
    values (${productId}, ${-qty}, ${reason}, ${orderId ?? null})
  `;
  return true;
}

export async function restoreStock(
  sql: Sql,
  productId: number,
  qty: number,
  reason: string,
  orderId?: number,
) {
  await sql`update products set stock = stock + ${qty} where id = ${productId}`;
  await sql`
    insert into stock_movements (product_id, qty, reason, order_id)
    values (${productId}, ${qty}, ${reason}, ${orderId ?? null})
  `;
}

export async function releaseOrderStock(
  sql: Sql,
  orderId: number,
  reason: string,
) {
  const orders = await sql<{ stock_held: boolean }>`
    select stock_held from orders where id = ${orderId}
  `;
  if (!orders[0]?.stock_held) return;
  const items = await sql<{ product_id: number | null; qty: number }>`
    select product_id, qty from order_items where order_id = ${orderId}
  `;
  for (const item of items) {
    if (item.product_id) {
      await restoreStock(sql, item.product_id, item.qty, reason, orderId);
    }
  }
  await sql`update orders set stock_held = false, updated_at = now() where id = ${orderId}`;
}

export async function expireUnpaidHolds(sql: Sql) {
  const stale = await sql.query<{ id: number }>(
    `select id from orders
     where stock_held = true
       and status = 'pending_payment'
       and created_at < now() - interval '48 hours'`,
  );
  for (const row of stale) {
    await releaseOrderStock(sql, row.id, "expire");
    await sql`
      update orders
      set status = 'cancelled', payment_status = 'expired', updated_at = now()
      where id = ${row.id}
    `;
    await sql`
      insert into order_events (order_id, status, note)
      values (
        ${row.id},
        'cancelled',
        ${`Stock rendu — pas de paiement sous ${STOCK_HOLD_HOURS} h`}
      )
    `;
  }
  return stale.length;
}
