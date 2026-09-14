import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { MfdsMark } from "@/components/mfds-mark";
import { Skeleton } from "@/components/ui/skeleton";
import { listBrands } from "@/lib/server/catalog";
import { KOREA_BRAND_NOTES } from "@/lib/korea-norms";
import type { Brand } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/marques")({
  component: Marques,
});

type Row = Brand & { product_count: number };
type Origin = "coree" | "all" | "france" | "allemagne";

function originOf(b: Row): Origin | "autre" {
  if (b.country === "Corée") return "coree";
  if (b.country === "France") return "france";
  if (b.country === "Allemagne") return "allemagne";
  return "autre";
}

function Marques() {
  const [brands, setBrands] = useState<Row[] | null>(null);
  const [origin, setOrigin] = useState<Origin>("coree");

  useEffect(() => {
    listBrands()
      .then((rows) => setBrands(rows as Row[]))
      .catch(() => setBrands([]));
  }, []);

  const koreaCount = brands?.filter((b) => b.country === "Corée").length ?? 0;
  const shown = useMemo(() => {
    if (!brands) return [];
    if (origin === "all") return brands;
    return brands.filter((b) => originOf(b) === origin);
  }, [brands, origin]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-5 md:py-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
        Sélection
      </p>
      <h1 className="mt-1 font-display text-2xl md:text-4xl">
        Marques coréennes
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Circuit UMMA et usines sous Cosmetics Act. Lot photographié à Lomé.
        {koreaCount ? ` ${koreaCount} marques Corée en rayon.` : ""}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <MfdsMark />
        <Link to="/normes-coree" className="text-sm text-primary">
          Normes MFDS
        </Link>
        <Link
          to="/catalogue"
          search={{ origin: "Corée" }}
          className="text-sm text-primary"
        >
          Tout le rayon Corée
        </Link>
      </div>

      <div className="ios-chrome no-scrollbar sticky top-12 z-20 -mx-4 mt-5 flex gap-2 overflow-x-auto bg-bg px-4 py-2 md:static md:mx-0 md:flex-wrap md:bg-transparent md:px-0">
        {(
          [
            ["coree", "Corée"],
            ["all", "Toutes"],
            ["france", "France"],
            ["allemagne", "Allemagne"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setOrigin(id)}
            className={cn(
              "h-9 shrink-0 px-3.5 text-xs font-medium",
              origin === id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden ring-1 ring-border sm:grid-cols-3 lg:grid-cols-4">
        {!brands &&
          Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-none" />
          ))}
        {shown.map((b) => (
          <Link
            key={b.slug}
            to="/catalogue"
            search={{ brand: b.slug }}
            className="flex flex-col bg-card p-4 transition-colors hover:bg-secondary"
          >
            <span className="grid size-11 place-items-center bg-secondary font-display text-lg text-primary">
              {b.name.slice(0, 1)}
            </span>
            <span className="mt-3 flex items-center gap-1.5 text-sm font-semibold">
              {b.name}
              {b.verified && (
                <ShieldCheck className="size-3.5 shrink-0 text-primary" />
              )}
            </span>
            <span className="mt-0.5 text-xs text-muted-foreground">
              {b.country}
              {b.product_count
                ? ` · ${b.product_count} produit${b.product_count > 1 ? "s" : ""}`
                : ""}
            </span>
            {b.country === "Corée" && KOREA_BRAND_NOTES[b.slug] ? (
              <span className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {KOREA_BRAND_NOTES[b.slug]}
              </span>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
