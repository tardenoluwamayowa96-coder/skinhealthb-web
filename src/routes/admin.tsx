import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminBar } from "@/components/admin-bar";
import { Button } from "@/components/ui/button";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { formatDate, formatTogoPhone, formatXof } from "@/lib/format";
import { adminOverview } from "@/lib/server/admin";
import { getMyProfile, claimAdmin } from "@/lib/server/profile";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { statusLabel } from "@/lib/zones";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/admin")({ component: AdminHome });

function AdminHome() {
  const { user, isPending } = useCurrentUserState();
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [data, setData] = useState<Awaited<ReturnType<typeof adminOverview>> | null>(
    null,
  );
  const [pin, setPin] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    getMyProfile()
      .then((p) => {
        setAllowed(p.role === "admin");
        if (p.role === "admin") adminOverview().then(setData).catch(() => {});
      })
      .catch(() => setAllowed(false));
  }, [user]);

  if (isPending || allowed === null) {
    return <div className="h-40 animate-pulse bg-surface-2" />;
  }
  if (!user) return <RedirectToSignIn />;
  if (!allowed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <h1 className="font-display text-3xl">Espace boutique</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Connecte-toi avec {BRAND.email}, ou saisis les 8 chiffres de ton
          WhatsApp boutique ({formatTogoPhone(BRAND.whatsapp)}).
        </p>
        <form
          className="mt-6 space-y-3"
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            try {
              await claimAdmin({ data: { pin } });
              toast.success("Accès boutique ouvert");
              window.location.href = "/admin";
            } catch (err) {
              toast.error(err instanceof Error ? err.message : "Code incorrect");
            } finally {
              setBusy(false);
            }
          }}
        >
          <Input
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="92 90 75 01"
            inputMode="numeric"
            autoComplete="off"
            required
          />
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Vérification…" : "Entrer"}
          </Button>
        </form>
        <Button asChild variant="outline" className="mt-3 w-full">
          <Link to="/login">Connexion {BRAND.email}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <AdminBar />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="font-display text-4xl">Administration</h1>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label="Commandes" value={String(data?.orderCount ?? "—")} />
          <Stat label="Chiffre d’affaires" value={data ? formatXof(data.revenue) : "—"} />
          <Stat label="En attente de paiement" value={String(data?.pending ?? "—")} />
          <Stat label="Produits actifs" value={String(data?.productCount ?? "—")} />
        </div>

        <h2 className="mt-10 font-display text-2xl">Stocks bas</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          <Link to="/admin/stocks" className="text-primary">
            Journal automatique
          </Link>
        </p>
        <ul className="mt-3 divide-y divide-border rounded-lg bg-card">
          {(data?.lowStock ?? []).map((p) => (
            <li key={p.id} className="flex justify-between px-4 py-3 text-sm">
              <span>{p.name}</span>
              <span className="tabular-nums text-destructive">{p.stock}</span>
            </li>
          ))}
          {data && data.lowStock.length === 0 && (
            <li className="px-4 py-3 text-sm text-muted-foreground">
              Aucun stock critique.
            </li>
          )}
        </ul>
        <p className="mt-3 text-sm">
          <Link to="/admin/achat-coree" className="text-gold">
            Ouvrir la liste d’achat Corée →
          </Link>
          <span className="mx-2 text-muted-foreground">·</span>
          <Link to="/admin/concurrence" className="text-gold">
            Concurrence Lomé →
          </Link>
        </p>

        <h2 className="mt-10 font-display text-2xl">Dernières commandes</h2>
        <ul className="mt-3 divide-y divide-border rounded-lg bg-card">
          {(data?.recent ?? []).map((o) => (
            <li key={o.public_ref} className="flex justify-between px-4 py-3 text-sm">
              <span>
                {o.public_ref} · {o.recipient}
                <span className="block text-xs text-muted-foreground">
                  {formatDate(o.created_at)} · {statusLabel(o.status)}
                </span>
              </span>
              <span className="tabular-nums">{formatXof(o.total_xof)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-card px-4 py-4 shadow-[var(--shadow-soft)]">
      <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl tabular-nums">{value}</p>
    </div>
  );
}
