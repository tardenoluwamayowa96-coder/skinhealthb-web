import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { SmartImage } from "@/components/smart-image";
import { useCart } from "@/lib/cart-store";
import { formatXof } from "@/lib/format";
import type { ProductCard as ProductCardType } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  favored,
  onToggleFav,
  priority = false,
  compact = false,
}: {
  product: ProductCardType;
  favored?: boolean;
  onToggleFav?: (id: number) => void;
  priority?: boolean;
  compact?: boolean;
}) {
  const add = useCart((s) => s.add);
  const promo =
    product.compare_at_xof && product.compare_at_xof > product.price_xof;

  const addToCart = () => {
    if (product.stock <= 0) return;
    add(product.id, 1);
    toast.success("Ajouté au panier");
  };

  return (
    <article className="ios-card group relative flex h-full flex-col overflow-hidden rounded-none bg-card">
      <Link
        to="/produit/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-square overflow-hidden bg-surface"
      >
        <SmartImage
          src={product.image_url}
          alt={product.name}
          variant="card"
          priority={priority}
          className="product-media size-full object-contain p-2"
        />
        <div className="absolute left-0 top-0 flex">
          {promo ? (
            <Badge className="rounded-none px-1.5 py-0 text-[10px]">Promo</Badge>
          ) : product.is_new ? (
            <Badge className="rounded-none px-1.5 py-0 text-[10px]">Nouveau</Badge>
          ) : null}
        </div>
      </Link>
      {onToggleFav && (
        <button
          type="button"
          aria-label={favored ? "Retirer des favoris" : "Ajouter aux favoris"}
          onClick={() => onToggleFav(product.id)}
          className="absolute right-1.5 top-1.5 z-10 grid size-9 place-items-center rounded-none bg-surface/95 text-fg"
        >
          <Heart
            className={cn("size-3.5", favored && "fill-primary text-primary")}
          />
        </button>
      )}
      <div
        className={cn(
          "flex flex-1 flex-col border-t border-border",
          compact ? "gap-0.5 p-2 pb-2.5" : "gap-0.5 p-2.5 pb-3",
        )}
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {product.brand_name}
        </p>
        <Link
          to="/produit/$slug"
          params={{ slug: product.slug }}
          className="line-clamp-2 text-[13px] font-medium leading-snug text-fg"
        >
          {product.name}
        </Link>
        <div className="mt-auto flex items-end gap-1.5 pt-1.5">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold tabular-nums leading-none">
              {formatXof(product.price_xof)}
            </p>
            {promo && (
              <p className="mt-0.5 text-[11px] text-muted-foreground line-through tabular-nums">
                {formatXof(product.compare_at_xof!)}
              </p>
            )}
            {product.stock <= 0 && (
              <p className="text-[11px] text-destructive">Rupture</p>
            )}
          </div>
          <button
            type="button"
            disabled={product.stock <= 0}
            onClick={addToCart}
            aria-label="Ajouter au panier"
            className="grid size-9 shrink-0 place-items-center rounded-none bg-primary text-primary-foreground disabled:opacity-40"
          >
            <ShoppingBag className="size-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({
  products,
  favored,
  onToggleFav,
}: {
  products: ProductCardType[];
  favored?: Set<number>;
  onToggleFav?: (id: number) => void;
}) {
  if (!products.length) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">
        Aucun produit pour ces filtres — d’autres références arrivent bientôt.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-px bg-border ring-1 ring-border sm:grid-cols-3 lg:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard
          key={p.id}
          product={p}
          favored={favored?.has(p.id)}
          onToggleFav={onToggleFav}
          priority={i < 2}
        />
      ))}
    </div>
  );
}

export function ProductRail({
  products,
  favored,
  onToggleFav,
}: {
  products: ProductCardType[];
  favored?: Set<number>;
  onToggleFav?: (id: number) => void;
}) {
  return (
    <div className="rail -mx-4 bg-border px-px pb-px">
      {products.map((p, i) => (
        <div
          key={p.id}
          className="w-40 shrink-0 snap-start sm:w-48"
        >
          <ProductCard
            product={p}
            compact
            favored={favored?.has(p.id)}
            onToggleFav={onToggleFav}
            priority={i < 2}
          />
        </div>
      ))}
    </div>
  );
}
