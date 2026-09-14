import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";

const PAY_URL = "https://paygateglobal.com/api/v1/pay";

export const initiatePaygate = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((ref: string) => ref)
  .handler(async ({ context, data: ref }) => {
    const sql = await getSql();
    const orders = await sql<{
      id: number;
      user_id: string;
      total_xof: number;
      payment_network: string | null;
      payment_phone: string | null;
      public_ref: string;
      status: string;
    }>`
      select id, user_id, total_xof, payment_network, payment_phone, public_ref, status
      from orders where public_ref = ${ref} and user_id = ${context.userId}
      limit 1
    `;
    const order = orders[0];
    if (!order) throw new Error("Commande introuvable.");
    if (order.status !== "pending_payment") {
      return { mode: "already" as const };
    }
    const settings = await sql<{ key: string; value: string }>`
      select key, value from site_settings where key in ('paygate_test_mode','paygate_auth_token')
    `;
    const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));
    const testMode = map.paygate_test_mode !== "false";
    const token = map.paygate_auth_token ?? "";
    if (testMode || !token) {
      return { mode: "test" as const, total_xof: order.total_xof };
    }

    const body = {
      auth_token: token,
      phone_number: (order.payment_phone ?? "").replace(/\D/g, "").replace(/^228/, ""),
      amount: order.total_xof,
      description: `Skinhealthb ${order.public_ref}`,
      identifier: order.public_ref,
      network: order.payment_network ?? "FLOOZ",
    };
    const res = await fetch(PAY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = (await res.json().catch(() => ({}))) as {
      tx_reference?: string;
      status?: number;
      message?: string;
    };
    if (json.tx_reference) {
      await sql`
        update orders set paygate_tx_reference = ${json.tx_reference}, updated_at = now()
        where id = ${order.id}
      `;
    }
    return {
      mode: "live" as const,
      tx_reference: json.tx_reference ?? null,
      status: json.status ?? null,
      message: json.message ?? "Validez le paiement sur votre téléphone.",
    };
  });
