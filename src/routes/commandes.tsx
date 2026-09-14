import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { formatDate, formatXof } from "@/lib/format";
import { listMyOrders, type OrderRow } from "@/lib/server/orders";
import { statusLabel } from "@/lib/zones";

export const Route = createFileRoute("/commandes")({ component: Commandes });

function Commandes() {
  const { user, isPending } = useCurrentUserState();
  const [orders, setOrders] = useState<OrderRow[] | null>(null);

  useEffect(() => {
    if (!user) return;
    listMyOrders().then(setOrders).catch(() => setOrders([]));
  }, [user]);

  if (isPending) return <div className="h-40 animate-pulse bg-surface-2" />;
  if (!user) return <RedirectToSignIn />;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-4xl">Mes commandes</h1>
      {!orders?.length && orders !== null && (
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">Aucune commande pour le moment.</p>
          <Button asChild className="mt-4">
            <Link to="/catalogue">Découvrir le catalogue</Link>
          </Button>
        </div>
      )}
      <ul className="mt-8 space-y-3">
        {(orders ?? []).map((o) => (
          <li key={o.public_ref}>
            <Link
              to="/commandes/$ref"
              params={{ ref: o.public_ref }}
              className="flex items-center justify-between rounded-lg bg-card px-4 py-4 shadow-[var(--shadow-soft)]"
            >
              <div>
                <p className="font-medium">{o.public_ref}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(o.created_at)} · {statusLabel(o.status)}
                </p>
              </div>
              <p className="text-sm font-semibold tabular-nums">
                {formatXof(o.total_xof)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
