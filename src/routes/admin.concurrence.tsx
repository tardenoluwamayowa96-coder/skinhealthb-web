import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Copy, MapPin, ShieldAlert, Swords } from "lucide-react";
import { toast } from "sonner";
import { AdminBar } from "@/components/admin-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { formatXof } from "@/lib/format";
import {
  COMPETITORS,
  PLAYBOOK,
  SKU_FIGHTS,
  THREAT_LABEL,
  briefingText,
  type Threat,
} from "@/lib/lome-competition";
import { getMyProfile } from "@/lib/server/profile";

export const Route = createFileRoute("/admin/concurrence")({
  component: AdminConcurrence,
});

function threatTone(t: Threat): "default" | "gold" | "outline" | "muted" {
  if (t === "direct") return "default";
  if (t === "informal" || t === "avoid") return "gold";
  if (t === "mass") return "outline";
  return "muted";
}

function AdminConcurrence() {
  const { user, isPending } = useCurrentUserState();
  const [ok, setOk] = useState(false);
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState<Threat | "all">("all");

  useEffect(() => {
    if (!user) return;
    getMyProfile().then((p) => {
      if (p.role !== "admin") return;
      setOk(true);
    });
  }, [user]);

  if (isPending) return <div className="h-32 animate-pulse bg-surface-2" />;
  if (!user) return <RedirectToSignIn />;
  if (!ok) return <p className="p-8 text-sm">Accès refusé.</p>;

  const rows =
    filter === "all"
      ? COMPETITORS
      : COMPETITORS.filter((c) => c.threat === filter);

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(briefingText());
      setCopied(true);
      toast.success("Briefing copié");
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
          Commercial · interne
        </p>
        <h1 className="mt-1 font-display text-4xl">Concurrence Lomé</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Carte des acteurs qui touchent le même client que Skinhealthb — taches,
          acné, solaire, hydratation. Pas une vitrine : un brief d’équipe.
          Prix et stocks à revérifier en boutique avant une décision tarifaire.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {(
            [
              ["all", "Tous"],
              ["direct", "Direct"],
              ["adjacent", "Voisins"],
              ["mass", "Volume"],
              ["informal", "Gris"],
              ["avoid", "Hors jeu"],
            ] as const
          ).map(([id, label]) => (
            <Button
              key={id}
              size="sm"
              variant={filter === id ? "default" : "outline"}
              onClick={() => setFilter(id)}
            >
              {label}
            </Button>
          ))}
          <Button size="sm" variant="gold" onClick={copyBrief}>
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            Copier le briefing
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label="Direct" value="1" hint="RA'AM Shop" />
          <Stat label="Pharmacies" value="~44" hint="Para, peu formées" />
          <Stat label="SKU en collision" value={String(SKU_FIGHTS.length)} hint="Fiches lancement" />
          <Stat label="Hors jeu" value="Éclaircir" hint="Ne jamais y aller" />
        </div>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          {PLAYBOOK.map((p) => (
            <div
              key={p.title}
              className="rounded-lg bg-card p-5 shadow-[var(--shadow-soft)]"
            >
              <h2 className="font-display text-2xl">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-12">
          <h2 className="flex items-center gap-2 font-display text-2xl">
            <MapPin className="size-5 text-primary" />
            Acteurs
          </h2>
          <div className="mt-4 space-y-4">
            {rows.map((c) => (
              <article
                key={c.id}
                className="rounded-lg bg-card p-5 shadow-[var(--shadow-soft)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-2xl">{c.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{c.area}</p>
                    {c.hours ? (
                      <p className="text-xs text-muted-foreground">{c.hours}</p>
                    ) : null}
                    {c.contact ? (
                      <p className="text-xs text-muted-foreground">{c.contact}</p>
                    ) : null}
                  </div>
                  <Badge tone={threatTone(c.threat)}>{THREAT_LABEL[c.threat]}</Badge>
                </div>
                <dl className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                  <Field label="Marques" value={c.brands} />
                  <Field label="Chevauchement" value={c.overlap} />
                  <Field label="Prix" value={c.prices} />
                  <Field label="Force" value={c.strength} />
                  <Field label="Faille" value={c.weakness} />
                  <Field label="Notre geste" value={c.move} />
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="flex items-center gap-2 font-display text-2xl">
            <Swords className="size-5 text-primary" />
            SKU contre SKU
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Prix catalogue Skinhealthb. Canaux Lomé connus — pas des relevés
            datés rayon par rayon.
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg bg-card">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-3 py-3">Produit</th>
                  <th className="px-3 py-3">Notre prix</th>
                  <th className="px-3 py-3">Où ailleurs</th>
                  <th className="px-3 py-3">Consigne</th>
                </tr>
              </thead>
              <tbody>
                {SKU_FIGHTS.map((s) => (
                  <tr
                    key={s.slug}
                    className="border-b border-border align-top last:border-0"
                  >
                    <td className="px-3 py-3">
                      <Link
                        to="/produit/$slug"
                        params={{ slug: s.slug }}
                        className="font-medium text-primary"
                      >
                        {s.name}
                      </Link>
                    </td>
                    <td className="px-3 py-3 tabular-nums">{formatXof(s.ours)}</td>
                    <td className="px-3 py-3 text-muted-foreground">{s.channels}</td>
                    <td className="px-3 py-3">{s.stance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <p className="mt-8 flex gap-2 text-xs leading-relaxed text-muted-foreground">
          <ShieldAlert className="mt-0.5 size-4 shrink-0 text-gold" />
          Page interne. Ne pas publier les noms concurrents sur Instagram. Un
          Snail 96 trop bon marché détruit la marque plus vite qu’une rupture.
        </p>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 leading-relaxed">{value}</dd>
    </div>
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
    <div className="rounded-lg bg-card px-4 py-3 shadow-[var(--shadow-soft)]">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl">{value}</p>
      <p className="text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}
