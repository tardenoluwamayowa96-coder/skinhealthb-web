import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminBar } from "@/components/admin-bar";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { formatDate } from "@/lib/format";
import { adminStockBoard } from "@/lib/server/admin";
import { getMyProfile } from "@/lib/server/profile";

export const Route = createFileRoute("/admin/stocks")({
  component: AdminStocks,
});

const REASON: Record<string, string> = {
  reserve: "Commande",
  cancel: "Annulation",
  expire: "Impayé 48 h",
  rollback: "Échec caisse",
  admin: "Ajustement",
};

function AdminStocks() {
  const { user, isPending } = useCurrentUserState();
  const [ok, setOk] = useState(false);
  const [data, setData] = useState<Awaited<ReturnType<typeof adminStockBoard>> | null>(
    null,
  );

  useEffect(() => {
    if (!user) return;
    getMyProfile().then((p) => {
      if (p.role !== "admin") return;
      setOk(true);
      adminStockBoard().then(setData).catch(() => {});
    });
  }, [user]);

  if (isPending) return <div className="h-32 animate-pulse bg-surface-2" />;
  if (!user) return <RedirectToSignIn />;
  if (!ok) return <p className="p-8 text-sm">Accès refusé.</p>;

  return (
    <div>
      <AdminBar />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
          Automatique
        </p>
        <h1 className="mt-1 font-display text-4xl">Stocks</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Réservé à la commande. Confirmé au paiement. Rendu si tu annules, ou
          après 48 h sans transfert.
        </p>
        <p className="mt-3 text-sm">
          <span className="font-medium">{data?.rupture ?? "—"} rupture</span>
          {" · "}
          <Link to="/admin/produits" className="text-primary">
            Ajuster un SKU
          </Link>
        </p>

        <h2 className="mt-10 font-display text-2xl">Bas (≤ 8)</h2>
        <ul className="mt-3 divide-y divide-border bg-card ring-1 ring-border">
          {(data?.low ?? []).map((p) => (
            <li key={p.id} className="flex justify-between gap-3 px-4 py-3 text-sm">
              <span>
                <span className="font-medium">{p.name}</span>
                <span className="block text-xs text-muted-foreground">
                  {p.brand_name}
                  {p.sku ? ` · ${p.sku}` : ""}
                </span>
              </span>
              <span
                className={
                  p.stock === 0
                    ? "tabular-nums text-destructive"
                    : "tabular-nums text-gold"
                }
              >
                {p.stock}
              </span>
            </li>
          ))}
          {data && data.low.length === 0 && (
            <li className="px-4 py-3 text-sm text-muted-foreground">
              Aucun stock critique.
            </li>
          )}
        </ul>

        <h2 className="mt-10 font-display text-2xl">Tenues (paiement en cours)</h2>
        <ul className="mt-3 divide-y divide-border bg-card ring-1 ring-border">
          {(data?.held ?? []).map((p) => (
            <li key={p.product_id} className="flex justify-between px-4 py-3 text-sm">
              <span>{p.name}</span>
              <span className="tabular-nums">{p.qty}</span>
            </li>
          ))}
          {data && data.held.length === 0 && (
            <li className="px-4 py-3 text-sm text-muted-foreground">
              Rien n’est réservé.
            </li>
          )}
        </ul>

        <h2 className="mt-10 font-display text-2xl">Mouvements</h2>
        <ul className="mt-3 divide-y divide-border bg-card ring-1 ring-border">
          {(data?.moves ?? []).map((m) => (
            <li key={m.id} className="flex justify-between gap-3 px-4 py-3 text-sm">
              <span>
                <span className="font-medium">{m.name}</span>
                <span className="block text-xs text-muted-foreground">
                  {REASON[m.reason] ?? m.reason}
                  {m.created_at ? ` · ${formatDate(m.created_at)}` : ""}
                </span>
              </span>
              <span
                className={
                  m.qty < 0 ? "tabular-nums text-destructive" : "tabular-nums text-primary"
                }
              >
                {m.qty > 0 ? `+${m.qty}` : m.qty}
              </span>
            </li>
          ))}
          {data && data.moves.length === 0 && (
            <li className="px-4 py-3 text-sm text-muted-foreground">
              Pas encore de mouvement.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
