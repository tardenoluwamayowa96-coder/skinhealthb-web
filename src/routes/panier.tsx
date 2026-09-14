import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/smart-image";
import { useCart } from "@/lib/cart-store";
import { formatXof } from "@/lib/format";
import { productsByIds } from "@/lib/server/catalog";
import type { ProductCard } from "@/lib/types";

export const Route = createFileRoute("/panier")({ component: Panier });

function Panier() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const [products, setProducts] = useState<ProductCard[]>([]);

  useEffect(() => {
    const ids = items.map((i) => i.productId);
    if (!ids.length) {
      setProducts([]);
      return;
    }
    productsByIds({ data: ids }).then(setProducts).catch(() => setProducts([]));
  }, [items]);

  const lines = useMemo(() => {
    return items
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return product ? { item, product } : null;
      })
      .filter(Boolean) as { item: (typeof items)[0]; product: ProductCard }[];
  }, [items, products]);

  const subtotal = lines.reduce(
    (n, l) => n + l.product.price_xof * l.item.qty,
    0,
  );

  if (!items.length) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-display text-4xl">Votre panier est vide</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ajoutez un soin authentique pour commencer.
        </p>
        <Button asChild className="mt-6">
          <Link to="/catalogue">Voir le catalogue</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-5 md:py-8">
      <h1 className="font-display text-2xl md:text-4xl">Panier</h1>
      <ul className="mt-5 divide-y divide-border">
        {lines.map(({ item, product }) => (
          <li key={product.id} className="flex gap-4 py-5">
            <SmartImage
              src={product.image_url}
              alt=""
              variant="thumb"
              className="size-24 rounded-md bg-surface object-contain p-1"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {product.brand_name}
              </p>
              <Link
                to="/produit/$slug"
                params={{ slug: product.slug }}
                className="font-medium"
              >
                {product.name}
              </Link>
              <p className="text-sm tabular-nums text-muted-foreground">
                {formatXof(product.price_xof)}
              </p>
              <div className="mt-2 flex items-center gap-3">
                <div className="flex h-9 items-center rounded-md border border-border">
                  <button
                    type="button"
                    className="size-9"
                    onClick={() => setQty(product.id, item.qty - 1)}
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm tabular-nums">
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    className="size-9"
                    onClick={() => setQty(product.id, item.qty + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                  onClick={() => remove(product.id)}
                >
                  Retirer
                </button>
              </div>
            </div>
            <p className="text-sm font-semibold tabular-nums">
              {formatXof(product.price_xof * item.qty)}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
        <span className="text-sm text-muted-foreground">Sous-total</span>
        <span className="text-lg font-semibold tabular-nums">
          {formatXof(subtotal)}
        </span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Expédition Nagode Transfert — frais selon la ville, à l’étape suivante.
      </p>
      <Button asChild className="mt-6 w-full">
        <Link to="/commande">Passer commande</Link>
      </Button>
    </div>
  );
}
