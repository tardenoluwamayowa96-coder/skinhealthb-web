import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { resolveZone } from "@/lib/togo-cities";
import { isAdminEmail } from "@/lib/brand";

export type Address = {
  id: number;
  label: string | null;
  recipient: string;
  phone: string;
  zone: string;
  city: string;
  details: string;
  is_default: boolean;
};

export async function ensureProfile(userId: string, name?: string) {
  const sql = await getSql();
  const existing = await sql<{
    user_id: string;
    role: string;
    full_name: string | null;
    phone: string | null;
  }>`
    select user_id, role, full_name, phone from profiles where user_id = ${userId}
  `;
  const emails = await sql<{ email: string }>`
    select email from "user" where id = ${userId} limit 1
  `.catch(() => [] as { email: string }[]);
  const owner = userId === "dev-user" || isAdminEmail(emails[0]?.email);

  if (existing[0]) {
    if (owner && existing[0].role !== "admin") {
      await sql`update profiles set role = 'admin' where user_id = ${userId}`;
      return { ...existing[0], role: "admin" };
    }
    return existing[0];
  }
  const role =
    owner ||
    (await sql`select user_id from profiles where role = 'admin' limit 1`)
      .length === 0
      ? "admin"
      : "customer";
  await sql`
    insert into profiles (user_id, role, full_name)
    values (${userId}, ${role}, ${name ?? null})
  `;
  return {
    user_id: userId,
    role,
    full_name: name ?? null,
    phone: null,
  };
}

export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return ensureProfile(context.userId);
  });

export const updateMyProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      full_name: z.string().trim().max(120),
      phone: z.string().trim().max(32),
    }),
  )
  .handler(async ({ context, data }) => {
    await ensureProfile(context.userId, data.full_name);
    const sql = await getSql();
    await sql`
      update profiles
      set full_name = ${data.full_name || null}, phone = ${data.phone || null}
      where user_id = ${context.userId}
    `;
    return { ok: true };
  });

export const listMyAddresses = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql<Address>`
      select id, label, recipient, phone, zone, city, details, is_default
      from addresses where user_id = ${context.userId}
      order by is_default desc, id desc
    `;
  });

export const saveAddress = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      recipient: z.string().trim().min(2).max(80),
      phone: z.string().trim().min(8).max(32),
      zone: z.string(),
      city: z.string().trim().min(2).max(80),
      details: z.string().trim().min(4).max(240),
      is_default: z.boolean().optional(),
    }),
  )
  .handler(async ({ context, data }) => {
    await ensureProfile(context.userId);
    const sql = await getSql();
    const zone = resolveZone(data.city, data.zone);
    if (data.is_default) {
      await sql`update addresses set is_default = false where user_id = ${context.userId}`;
    }
    await sql`
      insert into addresses (user_id, recipient, phone, zone, city, details, is_default)
      values (
        ${context.userId}, ${data.recipient}, ${data.phone}, ${zone},
        ${data.city}, ${data.details}, ${data.is_default ?? false}
      )
    `;
    return { ok: true };
  });

export const deleteAddress = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.number().int())
  .handler(async ({ context, data: id }) => {
    const sql = await getSql();
    await sql`delete from addresses where id = ${id} and user_id = ${context.userId}`;
    return { ok: true };
  });

export const listMyFavorites = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql<{ product_id: number }>`
      select product_id from favorites where user_id = ${context.userId}
      order by created_at desc
    `;
  });

export const toggleFavorite = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.number().int())
  .handler(async ({ context, data: productId }) => {
    await ensureProfile(context.userId);
    const sql = await getSql();
    const existing = await sql<{ product_id: number }>`
      select product_id from favorites
      where user_id = ${context.userId} and product_id = ${productId}
    `;
    if (existing[0]) {
      await sql`
        delete from favorites
        where user_id = ${context.userId} and product_id = ${productId}
      `;
      return { favored: false };
    }
    await sql`
      insert into favorites (user_id, product_id)
      values (${context.userId}, ${productId})
    `;
    return { favored: true };
  });

export const sendMessage = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().trim().min(2).max(80),
      phone: z.string().trim().max(32).optional(),
      email: z.string().trim().email().max(120).optional().or(z.literal("")),
      body: z.string().trim().min(4).max(2000),
    }),
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`
      insert into messages (name, phone, email, body)
      values (
        ${data.name}, ${data.phone || null},
        ${data.email || null}, ${data.body}
      )
    `;
    return { ok: true };
  });

export const claimAdmin = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ pin: z.string().trim().min(4).max(32) }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<{ value: string }>`
      select value from site_settings where key = 'admin_pin' limit 1
    `;
    const expected = (rows[0]?.value || "92907501").replace(/\D/g, "");
    const given = data.pin.replace(/\D/g, "");
    if (!expected || given !== expected) {
      throw new Error("Code boutique incorrect.");
    }
    await sql`
      insert into profiles (user_id, role)
      values (${context.userId}, 'admin')
      on conflict (user_id) do update set role = 'admin'
    `;
    return { ok: true };
  });
