import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ProductGrid } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { productsByIds } from "@/lib/server/catalog";
import { listMyFavorites, toggleFavorite } from "@/lib/server/profile";
import type { ProductCard } from "@/lib/types";

export const Route = createFileRoute("/favoris")({ component: Favoris });

function Favoris() {
  const { user, isPending } = useCurrentUserState();
  const [products, setProducts] = useState<ProductCard[] | null>(null);
  const [fav, setFav] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!user) return;
    listMyFavorites()
      .then(async (rows) => {
        const ids = rows.map((r) => r.product_id);
        setFav(new Set(ids));
        const list = ids.length ? await productsByIds({ data: ids }) : [];
        setProducts(list);
      })
      .catch(() => setProducts([]));
  }, [user]);

  if (isPending) return <div className="h-40 animate-pulse bg-surface-2" />;
  if (!user) return <RedirectToSignIn />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-display text-4xl">Favoris</h1>
      {products && products.length === 0 && (
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Enregistrez un soin pour le retrouver ici.
          </p>
          <Button asChild className="mt-4">
            <Link to="/catalogue">Parcourir</Link>
          </Button>
        </div>
      )}
      {products && (
        <div className="mt-8">
          <ProductGrid
            products={products}
            favored={fav}
            onToggleFav={(id) => {
              setFav((prev) => {
                const next = new Set(prev);
                next.delete(id);
                return next;
              });
              setProducts((prev) => (prev ?? []).filter((p) => p.id !== id));
              toggleFavorite({ data: id }).catch(() => {});
            }}
          />
        </div>
      )}
    </div>
  );
}
