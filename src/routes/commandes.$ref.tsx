import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/smart-image";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { formatDate, formatXof } from "@/lib/format";
import { getMyOrder } from "@/lib/server/orders";
import { statusLabel, zoneById } from "@/lib/zones";
import { carrierById } from "@/lib/shipping";
import { ShipLogo } from "@/components/ship-logo";
import { CopyRow } from "@/components/copy-row";
import { nagodeStatusLabel } from "@/lib/nagode";

export const Route = createFileRoute("/commandes/$ref")({
  component: CommandeDetail,
});

function CommandeDetail() {
  const { ref } = Route.useParams();
  const { user, isPending } = useCurrentUserState();
  const [data, setData] = useState<Awaited<ReturnType<typeof getMyOrder>>>(null);

  useEffect(() => {
    if (!user) return;
    getMyOrder({ data: ref }).then(setData).catch(() => setData(null));
  }, [user, ref]);

  if (isPending) return <div className="h-40 animate-pulse bg-surface-2" />;
  if (!user) return <RedirectToSignIn />;
  if (!data) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="font-display text-3xl">Commande introuvable</h1>
        <Button asChild className="mt-6">
          <Link to="/commandes">Retour</Link>
        </Button>
      </div>
    );
  }

  const { order, items, events } = data;
  const zone = zoneById(order.zone);
  const carrier = carrierById(order.carrier_id);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <p className="text-xs text-muted-foreground">
        <Link to="/commandes">Commandes</Link> / {order.public_ref}
      </p>
      <h1 className="mt-2 font-display text-4xl">{order.public_ref}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {statusLabel(order.status)} · {formatDate(order.created_at)}
      </p>

      {order.status === "pending_payment" && (
        <Button asChild className="mt-4">
          <Link to="/paiement/$ref" params={{ ref: order.public_ref }}>
            {order.payment_status === "transferred"
              ? "Voir le paiement"
              : "Finaliser le paiement"}
          </Link>
        </Button>
      )}

      <ul className="mt-8 divide-y divide-border">
        {items.map((it) => (
          <li key={it.id} className="flex gap-3 py-3">
            {it.image_url && (
              <SmartImage
                src={it.image_url}
                alt=""
                variant="thumb"
                className="size-16 rounded-md bg-surface object-contain p-0.5"
              />
            )}
            <div className="flex-1">
              <p className="text-sm font-medium">{it.name}</p>
              <p className="text-xs text-muted-foreground">
                {it.brand_name} · ×{it.qty}
              </p>
            </div>
            <p className="text-sm tabular-nums">
              {formatXof(it.unit_price_xof * it.qty)}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-4 space-y-1 text-sm">
        <p className="flex justify-between">
          <span>Sous-total</span>
          <span className="tabular-nums">{formatXof(order.subtotal_xof)}</span>
        </p>
        <p className="flex justify-between">
          <span>{carrier.short} {zone ? `(${zone.name})` : ""}</span>
          <span className="tabular-nums">{formatXof(order.delivery_xof)}</span>
        </p>
        <p className="flex justify-between font-semibold">
          <span>Total</span>
          <span className="tabular-nums">{formatXof(order.total_xof)}</span>
        </p>
      </div>

      <div className="mt-8 rounded-lg bg-card p-4 text-sm">
        <ShipLogo carrierId={carrier.id} className="mb-3 h-10 max-w-[160px]" />
        <p className="font-medium">Livraison {carrier.name}</p>
        <p className="mt-1 text-muted-foreground">
          {order.recipient} · {order.phone}
          <br />
          {order.address_details}, {order.city}
        </p>
        {zone && (
          <p className="mt-2 text-xs text-muted-foreground">
            Délai estimé {zone.eta}. Colis remis à {carrier.name}.
          </p>
        )}
        {order.nagode_tracking ? (
          <div className="mt-4 space-y-2">
            <CopyRow label={`Suivi ${carrier.short}`} value={order.nagode_tracking} />
            <p className="text-sm">
              {nagodeStatusLabel(order.nagode_status ?? "booked")}
              {order.nagode_mode === "api" ? " · API" : " · agence"}
            </p>
            <Link
              to="/suivi/$code"
              params={{ code: order.nagode_tracking }}
              className="text-sm font-medium text-primary"
            >
              Suivre le colis →
            </Link>
          </div>
        ) : (
          <p className="mt-3 text-xs text-muted-foreground">
            Le numéro de suivi {carrier.short} apparaît dès que le colis part.
          </p>
        )}
      </div>

      <ol className="mt-8 space-y-3 border-l border-border pl-4">
        {events.map((ev) => (
          <li key={ev.id}>
            <p className="text-sm font-medium">{statusLabel(ev.status)}</p>
            <p className="text-xs text-muted-foreground">
              {formatDate(ev.created_at)}
              {ev.note ? ` · ${ev.note}` : ""}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
