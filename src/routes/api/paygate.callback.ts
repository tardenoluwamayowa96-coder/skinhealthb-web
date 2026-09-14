import { createFileRoute } from "@tanstack/react-router";
import { markOrderPaidByRef } from "@/lib/server/orders";

async function handle(request: Request) {
  let identifier = "";
  let tx = "";
  let status: string | number = "";
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      const body = (await request.json()) as Record<string, unknown>;
      identifier = String(body.identifier ?? body.tx_reference ?? "");
      tx = String(body.tx_reference ?? "");
      status = (body.payment_status ?? body.status ?? "") as string | number;
    } else {
      const text = await request.text();
      const params = new URLSearchParams(text);
      const url = new URL(request.url);
      identifier =
        params.get("identifier") ?? url.searchParams.get("identifier") ?? "";
      tx =
        params.get("tx_reference") ??
        url.searchParams.get("tx_reference") ??
        "";
      status =
        params.get("payment_status") ??
        url.searchParams.get("payment_status") ??
        params.get("status") ??
        "";
    }
  } catch {
    identifier = "";
  }
  const success =
    status === 0 ||
    status === "0" ||
    status === "success" ||
    status === "paid" ||
    status === "1";
  if (identifier && success) {
    await markOrderPaidByRef(identifier, tx || identifier);
  }
  return new Response("ok", { status: 200 });
}

export const Route = createFileRoute("/api/paygate/callback")({
  server: {
    handlers: {
      GET: ({ request }) => handle(request),
      POST: ({ request }) => handle(request),
    },
  },
});
