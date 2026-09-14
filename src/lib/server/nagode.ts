import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import {
  nagodeDispatchWhatsApp,
  nagodeTrackingFromRef,
  isTrackingCode,
  type NagodeStatus,
} from "@/lib/nagode";
import { carrierById } from "@/lib/shipping";
import { ensureProfile } from "./profile";

export type NagodeMode = "api" | "dispatch";

export function nagodeConfigured(): boolean {
  return Boolean(process.env.NAGODE_API_URL && process.env.NAGODE_API_KEY);
}

function carrierConfigured(carrierId: string): boolean {
  const c = carrierById(carrierId);
  if (!c.envUrl || !c.envKey) return false;
  return Boolean(process.env[c.envUrl] && process.env[c.envKey]);
}

type BookInput = {
  publicRef: string;
  recipient: string;
  phone: string;
  city: string;
  address: string;
  zone: string;
  pieces: number;
  valueXof: number;
  carrierId: string;
};

type BookResult = {
  tracking: string;
  status: NagodeStatus;
  mode: NagodeMode;
  note: string;
};

async function callCarrierApi(
  carrierId: string,
  path: string,
  body: unknown,
): Promise<unknown> {
  const c = carrierById(carrierId);
  const base = process.env[c.envUrl!]!.replace(/\/$/, "");
  const key = process.env[c.envKey!]!;
  const res = await fetch(`${base}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) {
    throw new Error(`${c.short} HTTP ${res.status}`);
  }
  return res.json();
}

async function bookViaApi(input: BookInput): Promise<BookResult> {
  const c = carrierById(input.carrierId);
  const json = (await callCarrierApi(input.carrierId, "/v1/shipments", {
    reference: input.publicRef,
    carrier: c.id,
    recipient: {
      name: input.recipient,
      phone: input.phone,
      city: input.city,
      address: input.address,
    },
    zone: input.zone,
    pieces: input.pieces,
    value_xof: input.valueXof,
  })) as { tracking?: string; status?: string };
  const tracking =
    typeof json.tracking === "string" && json.tracking.trim()
      ? json.tracking.trim()
      : nagodeTrackingFromRef(input.publicRef, c.id);
  return {
    tracking,
    status: "booked",
    mode: "api",
    note: `Colis ${c.name} créé via API · ${tracking}`,
  };
}

function bookViaDispatch(input: BookInput): BookResult {
  const c = carrierById(input.carrierId);
  const tracking = nagodeTrackingFromRef(input.publicRef, c.id);
  const note =
    c.id === "retrait"
      ? `Retrait boutique ${tracking} — à remettre en magasin.`
      : `Bordereau ${c.short} ${tracking} — dispatch WhatsApp.`;
  return { tracking, status: "booked", mode: "dispatch", note };
}

export async function bookNagodeForOrder(orderId: number): Promise<BookResult> {
  const sql = await getSql();
  const rows = await sql<{
    id: number;
    public_ref: string;
    recipient: string;
    phone: string;
    city: string;
    address_details: string;
    zone: string;
    total_xof: number;
    nagode_tracking: string | null;
    nagode_status: string | null;
    nagode_mode: string | null;
    carrier_id: string;
  }>`
    select id, public_ref, recipient, phone, city, address_details, zone, total_xof,
           nagode_tracking, nagode_status, nagode_mode,
           coalesce(carrier_id, 'nagode') as carrier_id
    from orders where id = ${orderId} limit 1
  `;
  const order = rows[0];
  if (!order) throw new Error("Commande introuvable.");
  if (order.nagode_tracking) {
    return {
      tracking: order.nagode_tracking,
      status: (order.nagode_status as NagodeStatus) || "booked",
      mode: (order.nagode_mode as NagodeMode) || "dispatch",
      note: "Colis déjà créé.",
    };
  }
  const piecesRows = await sql<{ n: number }>`
    select coalesce(sum(qty), 0)::int as n from order_items where order_id = ${orderId}
  `;
  const input: BookInput = {
    publicRef: order.public_ref,
    recipient: order.recipient,
    phone: order.phone,
    city: order.city,
    address: order.address_details,
    zone: order.zone,
    pieces: piecesRows[0]?.n ?? 1,
    valueXof: order.total_xof,
    carrierId: order.carrier_id || "nagode",
  };
  const c = carrierById(input.carrierId);
  let result: BookResult;
  if (carrierConfigured(c.id)) {
    try {
      result = await bookViaApi(input);
    } catch {
      result = bookViaDispatch(input);
      result.note = `API ${c.short} indisponible — ${result.note}`;
    }
  } else {
    result = bookViaDispatch(input);
  }
  await sql`
    update orders
    set nagode_tracking = ${result.tracking},
        nagode_status = ${result.status},
        nagode_mode = ${result.mode},
        nagode_booked_at = now(),
        updated_at = now()
    where id = ${orderId}
  `;
  await sql`
    insert into order_events (order_id, status, note)
    values (${orderId}, 'preparing', ${result.note})
  `;
  return result;
}

export const adminBookNagode = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ public_ref: z.string() }))
  .handler(async ({ context, data }) => {
    const profile = await ensureProfile(context.userId);
    if (profile.role !== "admin") throw new Error("Accès administrateur requis.");
    const sql = await getSql();
    const rows = await sql<{ id: number }>`
      select id from orders where public_ref = ${data.public_ref} limit 1
    `;
    if (!rows[0]) throw new Error("Commande introuvable.");
    const booked = await bookNagodeForOrder(rows[0].id);
    const full = await sql<{
      recipient: string;
      phone: string;
      city: string;
      address_details: string;
      zone: string;
      total_xof: number;
      carrier_id: string;
    }>`
      select recipient, phone, city, address_details, zone, total_xof,
             coalesce(carrier_id, 'nagode') as carrier_id
      from orders where id = ${rows[0].id}
    `;
    const o = full[0];
    const pieces = await sql<{ n: number }>`
      select coalesce(sum(qty), 0)::int as n from order_items where order_id = ${rows[0].id}
    `;
    const c = carrierById(o.carrier_id);
    return {
      ...booked,
      configured: carrierConfigured(c.id),
      dispatchUrl: nagodeDispatchWhatsApp({
        tracking: booked.tracking,
        publicRef: data.public_ref,
        recipient: o.recipient,
        phone: o.phone,
        city: o.city,
        address: o.address_details,
        pieces: pieces[0]?.n ?? 1,
        valueXof: o.total_xof,
        zone: o.zone,
        carrierId: c.id,
      }),
    };
  });

export const getNagodeTracking = createServerFn({ method: "GET" })
  .validator((code: string) => code.trim().toUpperCase())
  .handler(async ({ data: code }) => {
    if (!isTrackingCode(code)) return null;
    const sql = await getSql();
    const rows = await sql<{
      public_ref: string;
      city: string;
      zone: string;
      nagode_tracking: string;
      nagode_status: string | null;
      nagode_mode: string | null;
      nagode_booked_at: string | null;
      status: string;
    }>`
      select public_ref, city, zone, nagode_tracking, nagode_status, nagode_mode,
             nagode_booked_at::text as nagode_booked_at, status
      from orders where nagode_tracking = ${code} limit 1
    `;
    const row = rows[0];
    if (!row) return null;
    const events = await sql<{ status: string; note: string | null; created_at: string }>`
      select status, note, created_at::text as created_at
      from order_events
      where order_id = (select id from orders where nagode_tracking = ${code})
      order by id
    `;
    return {
      tracking: row.nagode_tracking,
      nagodeStatus: row.nagode_status,
      mode: row.nagode_mode,
      city: row.city,
      zone: row.zone,
      orderStatus: row.status,
      bookedAt: row.nagode_booked_at,
      events,
    };
  });
