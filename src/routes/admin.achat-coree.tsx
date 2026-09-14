import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Check,
  Copy,
  Plane,
  ShieldCheck,
  Ship,
  TriangleAlert,
} from "lucide-react";
import { toast } from "sonner";
import { AdminBar } from "@/components/admin-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { formatXof } from "@/lib/format";
import {
  BUY_WAVE_1,
  BUY_WAVE_2,
  PRIORITY_LABEL,
  RECEIVING_CHECKS,
  RISK_LABEL,
  SOURCES,
  USD_TO_XOF,
  type BuyLine,
  type FakeRisk,
  landedXof,
  purchaseOrderText,
  waveTotals,
} from "@/lib/korea-buy-list";
import { getMyProfile } from "@/lib/server/profile";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/achat-coree")({
  component: AdminAchatCoree,
});

function AdminAchatCoree() {
  const { user, isPending } = useCurrentUserState();
  const [ok, setOk] = useState(false);
  const [mode, setMode] = useState<"air" | "sea">("air");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) return;
    getMyProfile().then((p) => {
      if (p.role !== "admin") return;
      setOk(true);
    });
  }, [user]);

  const totals = useMemo(() => waveTotals(BUY_WAVE_1, mode), [mode]);

  if (isPending) return <div className="h-32 animate-pulse bg-surface-2" />;
  if (!user) return <RedirectToSignIn />;
  if (!ok) return <p className="p-8 text-sm">Accès refusé.</p>;

  async function copyOrder() {
    try {
      await navigator.clipboard.writeText(purchaseOrderText(mode));
      setCopied(true);
      toast.success("Bon de commande copié");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Impossible de copier");
    }
  }

  return (
    <div>
      <AdminBar />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-xs uppercase tracking-[0.18em] text-gold">
          Approvisionnement
        </p>
        <h1 className="mt-1 font-display text-4xl">Liste d’achat Corée</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Bon de commande opérationnel pour le K-beauty authentique, sourcé
          UMMA. Vague 1 = les 9 SKU de lancement. Vague 2 = désormais en
          boutique (prix catalogue + ~8 %). Taux indicatif{" "}
          {USD_TO_XOF} F CFA / USD — à recalculer le jour de l’achat.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant={mode === "air" ? "default" : "outline"}
            onClick={() => setMode("air")}
          >
            <Plane className="size-4" />
            Test aérien
          </Button>
          <Button
            size="sm"
            variant={mode === "sea" ? "default" : "outline"}
            onClick={() => setMode("sea")}
          >
            <Ship className="size-4" />
            Réassort mer
          </Button>
          <Button size="sm" variant="gold" onClick={copyOrder}>
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            Copier le bon de commande
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat
            label="Unités vague 1"
            value={String(totals.units)}
            hint={mode === "air" ? "4–8 semaines" : "8–12 semaines"}
          />
          <Stat
            label="FOB Corée"
            value={`${Math.round(totals.fobUsd).toLocaleString("fr-FR")} USD`}
            hint="Hors fret"
          />
          <Stat
            label="Coût posé Lomé"
            value={formatXof(totals.landed)}
            hint={mode === "air" ? "coeff. 2,05" : "coeff. 1,55"}
          />
          <Stat
            label="Valeur vente"
            value={formatXof(totals.retail)}
            hint="Prix catalogue actuel"
          />
        </div>

        <section className="mt-10">
          <h2 className="font-display text-2xl">Vague 1 — déjà au catalogue</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Tête de gondole : Relief Sun, Low pH, Heartleaf. Le Snail 96 se
            commande, il ne se brade pas.
          </p>
          <BuyTable lines={BUY_WAVE_1} mode={mode} />
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl">Vague 2 — au catalogue</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            SKIN1004, Anua TXA, Round Lab, d’Alba — sourcés UMMA, prix Lomé
            légèrement au-dessus du FOB posé.
          </p>
          <BuyTable lines={BUY_WAVE_2} mode={mode} />
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-card p-5 shadow-[var(--shadow-soft)]">
            <h2 className="flex items-center gap-2 font-display text-2xl">
              <ShieldCheck className="size-5 text-primary" />
              Où acheter
            </h2>
            <ul className="mt-4 space-y-4">
              {SOURCES.map((s) => (
                <li key={s.name} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="font-medium">{s.name}</p>
                    <Badge tone={s.kind === "Risque" ? "outline" : "gold"}>{s.kind}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{s.when}</p>
                  <p className="mt-1 text-xs text-muted-foreground">MOQ {s.moq}</p>
                  <p
                    className={cn(
                      "mt-2 text-sm",
                      s.kind === "Risque" ? "text-destructive" : "text-fg",
                    )}
                  >
                    {s.caution}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-card p-5 shadow-[var(--shadow-soft)]">
            <h2 className="flex items-center gap-2 font-display text-2xl">
              <TriangleAlert className="size-5 text-gold" />
              À la réception
            </h2>
            <ol className="mt-4 space-y-3">
              {RECEIVING_CHECKS.map((item, i) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-xs text-muted-foreground">
              Règle d’or : un Snail 96 trop bon marché détruit la marque
              Skinhealthb plus vite qu’une rupture de stock.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function BuyTable({
  lines,
  mode,
}: {
  lines: BuyLine[];
  mode: "air" | "sea";
}) {
  return (
    <div className="mt-4 overflow-x-auto rounded-lg bg-card">
      <table className="w-full min-w-[880px] text-left text-sm">
        <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-3 py-3">Produit</th>
            <th className="px-3 py-3">Rôle</th>
            <th className="px-3 py-3">Qté</th>
            <th className="px-3 py-3">FOB</th>
            <th className="px-3 py-3">Posé Lomé</th>
            <th className="px-3 py-3">Vente</th>
            <th className="px-3 py-3">Contrôle</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((l) => {
            const qty = mode === "air" ? l.qtyAir : l.qtySea;
            const landed = landedXof(l.fobUsd, mode);
            const thin = l.retailXof - landed < 2000;
            return (
              <tr key={l.sku} className="border-b border-border last:border-0 align-top">
                <td className="px-3 py-3">
                  <p className="font-medium">{l.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {l.brand} · {l.format} · {l.sku}
                  </p>
                  {l.inCatalog && l.catalogSlug ? (
                    <Link
                      to="/produit/$slug"
                      params={{ slug: l.catalogSlug }}
                      className="mt-1 inline-block text-xs text-primary"
                    >
                      Fiche boutique
                    </Link>
                  ) : (
                    <span className="mt-1 inline-block text-xs text-gold">Pas encore en boutique</span>
                  )}
                  <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground">
                    {l.why}
                  </p>
                </td>
                <td className="px-3 py-3">
                  <Badge tone={l.priority === "tête" ? "default" : "muted"}>
                    {PRIORITY_LABEL[l.priority]}
                  </Badge>
                  <div className="mt-2">
                    <RiskBadge risk={l.fakeRisk} />
                  </div>
                </td>
                <td className="px-3 py-3 tabular-nums">
                  {qty}
                  <p className="text-xs text-muted-foreground">MOQ {l.moq}</p>
                </td>
                <td className="px-3 py-3 tabular-nums">
                  {l.fobUsd.toFixed(2)} USD
                </td>
                <td className="px-3 py-3 tabular-nums">
                  {formatXof(landed)}
                  {thin && (
                    <p className="text-xs text-destructive">Marge aérienne serrée</p>
                  )}
                </td>
                <td className="px-3 py-3 tabular-nums">{formatXof(l.retailXof)}</td>
                <td className="px-3 py-3 text-xs leading-relaxed text-muted-foreground">
                  {l.verify}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function RiskBadge({ risk }: { risk: FakeRisk }) {
  return (
    <Badge
      tone={risk === "critique" || risk === "élevé" ? "outline" : "muted"}
      className={
        risk === "critique" || risk === "élevé"
          ? "border-destructive text-destructive"
          : undefined
      }
    >
      {RISK_LABEL[risk]}
    </Badge>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-lg bg-card px-4 py-4 shadow-[var(--shadow-soft)]">
      <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}
