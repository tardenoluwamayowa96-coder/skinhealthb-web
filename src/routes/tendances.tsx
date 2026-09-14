import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ProductGrid } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getTrends } from "@/lib/server/catalog";
import { listMyFavorites, toggleFavorite } from "@/lib/server/profile";

export const Route = createFileRoute("/tendances")({
  component: Tendances,
});

function Tendances() {
  const { user } = useCurrentUserState();
  const [rows, setRows] = useState<Awaited<ReturnType<typeof getTrends>> | null>(
    null,
  );
  const [fav, setFav] = useState<Set<number>>(new Set());

  useEffect(() => {
    getTrends().then(setRows).catch(() => setRows([]));
  }, []);

  useEffect(() => {
    if (!user) return;
    listMyFavorites()
      .then((list) => setFav(new Set(list.map((r) => r.product_id))))
      .catch(() => {});
  }, [user]);

  const onToggleFav = (id: number) => {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    setFav((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    toggleFavorite({ data: id }).catch(() => {});
  };

  return (
    <div>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
            Lomé · 2026
          </p>
          <h1 className="mt-1 font-display text-3xl md:text-5xl">
            Tendances beauté
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Ce qui tourne en Corée et tient la chaleur togolaise : solaire sans
            film blanc, taches sans hydroquinone, lèvres Laneige, double
            nettoyage. Lots photographiés.{" "}
            <Link to="/routine" className="text-primary">
              Routine climat Lomé
            </Link>
            .
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {(rows ?? []).map((t) => (
              <a
                key={t.slug}
                href={`#${t.slug}`}
                className="h-9 bg-card px-3 text-xs font-medium leading-9 ring-1 ring-border"
              >
                {t.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {(rows ?? Array.from({ length: 3 }).map(() => null)).map((t, i) =>
        t ? (
          <section
            key={t.slug}
            id={t.slug}
            className="scroll-mt-16 border-b border-border"
          >
            <div className="mx-auto max-w-6xl px-4 py-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                {t.kicker}
              </p>
              <h2 className="mt-1 font-display text-2xl md:text-3xl">{t.title}</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {t.why}
              </p>
              <div className="mt-5">
                <ProductGrid
                  products={t.products}
                  favored={fav}
                  onToggleFav={onToggleFav}
                />
              </div>
            </div>
          </section>
        ) : (
          <div key={i} className="mx-auto max-w-6xl px-4 py-8">
            <Skeleton className="h-8 w-48 rounded-none" />
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {Array.from({ length: 4 }).map((_, j) => (
                <Skeleton key={j} className="aspect-square rounded-none" />
              ))}
            </div>
          </div>
        ),
      )}
    </div>
  );
}
