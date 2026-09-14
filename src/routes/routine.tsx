import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ProductRail } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { CLIMATE_NOTES } from "@/lib/routine";
import { getRoutines } from "@/lib/server/catalog";
import { listMyFavorites, toggleFavorite } from "@/lib/server/profile";

export const Route = createFileRoute("/routine")({
  component: Routine,
});

function Routine() {
  const { user } = useCurrentUserState();
  const [rows, setRows] = useState<Awaited<ReturnType<typeof getRoutines>> | null>(
    null,
  );
  const [fav, setFav] = useState<Set<number>>(new Set());

  useEffect(() => {
    getRoutines().then(setRows).catch(() => setRows([]));
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
            Lomé · climat
          </p>
          <h1 className="mt-1 font-display text-3xl md:text-5xl">
            Routine visage
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Pensée pour la chaleur, les UV et l’harmattan — pas pour Séoul en
            hiver. Cosmétiques, pas médicaments. Un actif le soir, solaire tous
            les matins.
          </p>
          <div className="mt-6 grid gap-px overflow-hidden ring-1 ring-border sm:grid-cols-2 lg:grid-cols-4">
            {CLIMATE_NOTES.map((n) => (
              <div key={n.title} className="bg-card p-4">
                <p className="font-medium">{n.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {n.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {(rows ?? []).map((r) => (
              <a
                key={r.slug}
                href={`#${r.slug}`}
                className="h-9 bg-card px-3 text-xs font-medium leading-9 ring-1 ring-border"
              >
                {r.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {(rows ?? []).map((r) => (
        <section
          key={r.slug}
          id={r.slug}
          className="scroll-mt-16 border-b border-border"
        >
          <div className="mx-auto max-w-6xl px-4 py-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
              {r.kicker}
            </p>
            <h2 className="mt-1 font-display text-2xl md:text-3xl">{r.title}</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {r.why}
            </p>
            <ol className="mt-6 space-y-8">
              {r.steps.map((s, i) => (
                <li key={s.name}>
                  <p className="text-[11px] font-semibold tabular-nums text-primary">
                    {String(i + 1).padStart(2, "0")} · {s.name}
                  </p>
                  <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                    {s.text}
                  </p>
                  {s.products.length ? (
                    <div className="mt-3">
                      <ProductRail
                        products={s.products}
                        favored={fav}
                        onToggleFav={onToggleFav}
                      />
                    </div>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </section>
      ))}

      {!rows ? (
        <div className="mx-auto max-w-6xl px-4 py-8">
          <Skeleton className="h-8 w-40 rounded-none" />
          <Skeleton className="mt-4 h-40 rounded-none" />
        </div>
      ) : null}

      <p className="mx-auto max-w-6xl px-4 py-8 text-xs leading-relaxed text-muted-foreground">
        Les produits cosmétiques ne sont pas des médicaments et ne prétendent
        pas traiter, guérir ou prévenir une maladie. Patch-test. Enceinte :
        éviter rétinal et peels.
      </p>
    </div>
  );
}
