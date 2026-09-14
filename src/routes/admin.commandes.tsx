import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminBar } from "@/components/admin-bar";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { formatDate, formatXof } from "@/lib/format";
import { adminListOrders, adminSetOrderStatus } from "@/lib/server/admin";
import { adminBookNagode } from "@/lib/server/nagode";
import { getMyProfile } from "@/lib/server/profile";
import { carrierById } from "@/lib/shipping";
import { ORDER_STATUSES, statusLabel } from "@/lib/zones";

export const Route = createFileRoute("/admin/commandes")({
  component: AdminCommandes,
});

function AdminCommandes() {
  const { user, isPending } = useCurrentUserState();
  const [ok, setOk] = useState(false);
  const [rows, setRows] = useState<Awaited<ReturnType<typeof adminListOrders>>>([]);

  useEffect(() => {
    if (!user) return;
    getMyProfile().then((p) => {
      if (p.role !== "admin") return;
      setOk(true);
      adminListOrders().then(setRows).catch(() => {});
    });
  }, [user]);

  if (isPending) return <div className="h-32 animate-pulse bg-surface-2" />;
  if (!user) return <RedirectToSignIn />;
  if (!ok) return <p className="p-8 text-sm">Accès refusé.</p>;

  return (
    <div>
      <AdminBar />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="font-display text-4xl">Commandes</h1>
        <div className="mt-6 overflow-x-auto rounded-lg bg-card">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="border-b border-border text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-3 py-3">Réf.</th>
                <th className="px-3 py-3">Client</th>
                <th className="px-3 py-3">Total</th>
                <th className="px-3 py-3">Paiement</th>
                <th className="px-3 py-3">Statut</th>
                <th className="px-3 py-3">Nagode</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((o) => (
                <tr key={o.public_ref} className="border-b border-border last:border-0">
                  <td className="px-3 py-3">
                    <p className="font-medium">{o.public_ref}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(o.created_at)}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {carrierById(o.carrier_id).short}
                    </p>
                  </td>
                  <td className="px-3 py-3">
                    {o.recipient}
                    <span className="block text-xs text-muted-foreground">
                      {o.phone} · {o.city}
                    </span>
                  </td>
                  <td className="px-3 py-3 tabular-nums">{formatXof(o.total_xof)}</td>
                  <td className="px-3 py-3">
                    {o.payment_network ?? "—"}
                    <span className="block text-xs text-muted-foreground">
                      {o.payment_status === "transferred"
                        ? "Transfert déclaré — à confirmer"
                        : o.payment_status}
                      {o.payment_phone ? ` · ${o.payment_phone}` : ""}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <select
                      className="h-10 rounded-md border border-input bg-surface px-2 text-sm"
                      defaultValue={o.status}
                      onChange={async (e) => {
                        try {
                          await adminSetOrderStatus({
                            data: {
                              public_ref: o.public_ref,
                              status: e.target.value as (typeof ORDER_STATUSES)[number]["id"],
                            },
                          });
                          toast.success("Statut mis à jour");
                        } catch (err) {
                          toast.error(err instanceof Error ? err.message : "Erreur");
                        }
                      }}
                    >
                      {ORDER_STATUSES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {statusLabel(s.id)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-3">
                    {o.nagode_tracking ? (
                      <p className="font-medium tabular-nums">{o.nagode_tracking}</p>
                    ) : (
                      <button
                        type="button"
                        className="text-sm font-medium text-primary"
                        onClick={async () => {
                          try {
                            const r = await adminBookNagode({
                              data: { public_ref: o.public_ref },
                            });
                            toast.success(`Colis ${r.tracking}`);
                            if (r.dispatchUrl) window.open(r.dispatchUrl, "_blank");
                            adminListOrders().then(setRows).catch(() => {});
                          } catch (err) {
                            toast.error(
                              err instanceof Error ? err.message : "Nagode",
                            );
                          }
                        }}
                      >
                        Créer le colis
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
