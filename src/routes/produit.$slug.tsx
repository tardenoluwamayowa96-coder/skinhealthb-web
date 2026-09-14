import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShieldCheck, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MfdsMark } from "@/components/mfds-mark";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SmartImage } from "@/components/smart-image";
import { ProductShare } from "@/components/social";
import { useCart } from "@/lib/cart-store";
import { formatXof } from "@/lib/format";
import { getProduct } from "@/lib/server/catalog";
import { listMyFavorites, toggleFavorite } from "@/lib/server/profile";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import type { ProductDetail } from "@/lib/types";
import { UMMA_SHIP } from "@/lib/umma";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/produit/$slug")({
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const add = useCart((s) => s.add);
  const { user } = useCurrentUserState();
  const [product, setProduct] = useState<ProductDetail | null | undefined>(
    undefined,
  );
  const [qty, setQty] = useState(1);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setProduct(undefined);
    getProduct({ data: slug }).then(setProduct).catch(() => setProduct(null));
  }, [slug]);

  useEffect(() => {
    if (!user || !product) return;
    listMyFavorites()
      .then((rows) => setFav(rows.some((r) => r.product_id === product.id)))
      .catch(() => {});
  }, [user, product]);

  if (product === undefined) {
    return (
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-2">
        <Skeleton className="aspect-square rounded-none" />
        <div className="space-y-3">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }
  if (!product) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl">Produit introuvable</h1>
        <Button asChild className="mt-6">
          <Link to="/catalogue">Retour au catalogue</Link>
        </Button>
      </div>
    );
  }

  const promo =
    product.compare_at_xof && product.compare_at_xof > product.price_xof;
  const skins = (product.skin_types ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const addToCart = () => {
    if (product.stock <= 0) return;
    add(product.id, qty);
    toast.success("Ajouté au panier");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-4 md:py-8">
      <p className="text-xs text-muted-foreground">
        <Link to="/catalogue">Catalogue</Link>
        <span className="mx-2">/</span>
        {product.brand_name}
      </p>
      <div className="mt-3 grid gap-5 md:mt-4 md:grid-cols-2 md:gap-8">
        <div className="overflow-hidden rounded-none bg-card ring-1 ring-border">
          <SmartImage
            src={product.image_url}
            alt={product.name}
            variant="detail"
            priority
            className="mx-auto h-[42vh] w-full object-contain p-2 md:h-auto md:aspect-square md:max-h-none md:p-4"
          />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
            {product.brand_name} · {product.origin}
          </p>
          {/corée/i.test(product.origin ?? "") ? (
            <div className="mt-2">
              <Link to="/normes-coree" className="inline-flex">
                <MfdsMark />
              </Link>
            </div>
          ) : null}
          <h1 className="mt-1 font-display text-[1.75rem] leading-tight md:text-4xl">
            {product.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {product.format_label}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.is_new && <Badge>Nouveau</Badge>}
            {promo && <Badge tone="gold">Promotion</Badge>}
            {product.is_bestseller && <Badge tone="outline">Best-seller</Badge>}
            {skins.map((s) => (
              <Badge key={s} tone="muted">
                {s}
              </Badge>
            ))}
          </div>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-2xl font-semibold tabular-nums">
              {formatXof(product.price_xof)}
            </span>
            {promo && (
              <span className="text-muted-foreground line-through tabular-nums">
                {formatXof(product.compare_at_xof!)}
              </span>
            )}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 bg-secondary p-4 text-sm">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Catégorie
              </dt>
              <dd className="mt-0.5">{product.category_name}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Origine
              </dt>
              <dd className="mt-0.5">{product.origin ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Lot
              </dt>
              <dd className="mt-0.5 tabular-nums">{product.lot_number ?? "photographié à réception"}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                DLC
              </dt>
              <dd className="mt-0.5">{product.expires_on ?? "contrôlée"}</dd>
            </div>
          </dl>

          <div className="mt-5 hidden flex-wrap items-center gap-3 md:flex">
            <div className="flex h-11 items-center rounded-md border border-border">
              <button
                type="button"
                className="size-11"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="w-8 text-center tabular-nums">{qty}</span>
              <button
                type="button"
                className="size-11"
                onClick={() =>
                  setQty((q) => Math.min(product.stock || 1, q + 1))
                }
              >
                +
              </button>
            </div>
            <Button
              className="flex-1"
              disabled={product.stock <= 0}
              onClick={addToCart}
            >
              {product.stock <= 0 ? "Rupture de stock" : "Ajouter au panier"}
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Favori"
              onClick={() => {
                if (!user) {
                  window.location.href = "/login";
                  return;
                }
                setFav((v) => !v);
                toggleFavorite({ data: product.id }).catch(() => {});
              }}
            >
              <Heart className={cn("size-4", fav && "fill-primary text-primary")} />
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {product.stock > 0
              ? `${product.stock} en stock`
              : "Actuellement indisponible"}
            {product.lot_number ? ` · Lot ${product.lot_number}` : ""}
            {product.expires_on ? ` · DLC ${product.expires_on}` : ""}
          </p>

          <ProductShare brand={product.brand_name} name={product.name} />

          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex gap-2">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                {product.authenticity_note ||
                  "COA boutique : lot photographié, circuit Corée, pas de carton gris."}
              </span>
            </li>
            <li className="flex gap-2">
              <Truck className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{UMMA_SHIP}</span>
            </li>
          </ul>

          <details className="mt-8 border-t border-border pt-4">
            <summary className="cursor-pointer text-sm font-medium">
              Ingrédients
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {product.ingredients}
            </p>
          </details>
          <details className="border-t border-border pt-4">
            <summary className="cursor-pointer text-sm font-medium">
              Conseils d’utilisation
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {product.usage_tips}
            </p>
          </details>
          <details className="border-t border-border pt-4">
            <summary className="cursor-pointer text-sm font-medium">
              Précautions
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {product.precautions}
            </p>
          </details>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            Les produits cosmétiques ne sont pas des médicaments et ne
            prétendent pas traiter, guérir ou prévenir une maladie.
          </p>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-[calc(3.15rem+env(safe-area-inset-bottom))] z-30 border-t border-border bg-surface px-3 py-2 md:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-11 items-center rounded-md border border-border">
            <button
              type="button"
              className="size-11"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span className="w-7 text-center text-sm tabular-nums">{qty}</span>
            <button
              type="button"
              className="size-11"
              onClick={() => setQty((q) => Math.min(product.stock || 1, q + 1))}
            >
              +
            </button>
          </div>
          <Button
            className="h-11 flex-1"
            disabled={product.stock <= 0}
            onClick={addToCart}
          >
            {product.stock <= 0
              ? "Rupture"
              : `Ajouter · ${formatXof(product.price_xof * qty)}`}
          </Button>
        </div>
      </div>
    </div>
  );
}
