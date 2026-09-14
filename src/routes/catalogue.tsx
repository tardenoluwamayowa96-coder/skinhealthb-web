import { Link, createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ProductGrid } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  listBrands,
  listCategories,
  listProducts,
  type CatalogFilters,
} from "@/lib/server/catalog";
import { listMyFavorites, toggleFavorite } from "@/lib/server/profile";
import type { Brand, Category, ProductCard } from "@/lib/types";
import { NfMark } from "@/components/nf-mark";
import { MfdsMark } from "@/components/mfds-mark";

type Search = {
  q?: string;
  category?: string;
  brand?: string;
  skin?: string;
  promo?: boolean;
  available?: boolean;
  featured?: boolean;
  isNew?: boolean;
  bestseller?: boolean;
  origin?: string;
  sort?: CatalogFilters["sort"];
};

export const Route = createFileRoute("/catalogue")({
  validateSearch: (raw: Record<string, unknown>): Search => ({
    q: typeof raw.q === "string" ? raw.q : undefined,
    category: typeof raw.category === "string" ? raw.category : undefined,
    brand: typeof raw.brand === "string" ? raw.brand : undefined,
    skin: typeof raw.skin === "string" ? raw.skin : undefined,
    promo: raw.promo === true || raw.promo === "true" ? true : undefined,
    available: raw.available === true || raw.available === "true" ? true : undefined,
    featured: raw.featured === true || raw.featured === "true" ? true : undefined,
    isNew: raw.isNew === true || raw.isNew === "true" ? true : undefined,
    bestseller: raw.bestseller === true || raw.bestseller === "true" ? true : undefined,
    origin: typeof raw.origin === "string" ? raw.origin : undefined,
    sort:
      raw.sort === "price_asc" || raw.sort === "price_desc" || raw.sort === "new"
        ? raw.sort
        : undefined,
  }),
  component: Catalogue,
});

const SKINS = ["sèche", "grasse", "mixte", "normale", "sensible", "acneique"];

function Catalogue() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { user } = useCurrentUserState();
  const [products, setProducts] = useState<ProductCard[] | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [cats, setCats] = useState<Category[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [q, setQ] = useState(search.q ?? "");
  const [fav, setFav] = useState<Set<number>>(new Set());

  useEffect(() => {
    setQ(search.q ?? "");
    setProducts(null);
    listProducts({ data: search }).then(setProducts).catch(() => setProducts([]));
  }, [search]);

  useEffect(() => {
    listBrands().then(setBrands).catch(() => {});
    listCategories().then(setCats).catch(() => {});
  }, []);

  useEffect(() => {
    if (!user) return;
    listMyFavorites()
      .then((rows) => setFav(new Set(rows.map((r) => r.product_id))))
      .catch(() => {});
  }, [user]);

  const patch = (partial: Search) => {
    void navigate({
      search: (prev) => {
        const next = { ...prev, ...partial };
        for (const k of Object.keys(next) as (keyof Search)[]) {
          if (next[k] === undefined || next[k] === "" || next[k] === false) {
            delete next[k];
          }
        }
        return next;
      },
    });
  };

  const activeFilters = useMemo(() => {
    const bits: string[] = [];
    if (search.category) bits.push(search.category);
    if (search.brand) bits.push(search.brand);
    if (search.skin) bits.push(search.skin);
    if (search.promo) bits.push("promo");
    if (search.available) bits.push("en stock");
    return bits;
  }, [search]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-5 md:py-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
        Boutique
      </p>
      <h1 className="mt-0.5 font-display text-2xl md:text-4xl">Catalogue</h1>
      <p className="mt-1 hidden max-w-xl text-sm text-muted-foreground md:block">
        Sélection Corée (méthode UMMA : lot, DLC, COA), pharmacie dm et bio
        NATRUE. Filtrez par marque, type de peau ou origine.
      </p>

      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          patch({ q: q || undefined });
        }}
      >
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Marque, soin, vitamine…"
          className="h-10 flex-1 rounded-none md:h-11"
        />
        <Button type="submit" className="h-10 px-4 md:h-11">
          OK
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-10 shrink-0 md:hidden"
          onClick={() => setFiltersOpen((v) => !v)}
        >
          <SlidersHorizontal className="size-4" />
        </Button>
      </form>

      <div className="ios-chrome no-scrollbar sticky top-12 z-20 -mx-4 mt-3 flex gap-2 overflow-x-auto bg-bg px-4 py-2 md:static md:mx-0 md:flex-wrap md:bg-transparent md:px-0">
        <button
          type="button"
          onClick={() => patch({ category: undefined, origin: undefined })}
          className={`h-9 shrink-0 rounded-none px-3.5 text-xs font-medium ${
            !search.category && !search.origin
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground"
          }`}
        >
          Tous
        </button>
        <button
          type="button"
          onClick={() =>
            patch({
              origin: search.origin === "Corée" ? undefined : "Corée",
              category: undefined,
            })
          }
          className={`h-9 shrink-0 rounded-none px-3.5 text-xs font-medium ${
            search.origin === "Corée"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground"
          }`}
        >
          Corée
        </button>
        {cats.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() =>
              patch({
                category: search.category === c.slug ? undefined : c.slug,
              })
            }
            className={`h-9 shrink-0 rounded-none px-3.5 text-xs font-medium ${
              search.category === c.slug
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-6 md:mt-8 md:grid-cols-[220px_1fr]">
        <aside
          className={filtersOpen ? "block space-y-6" : "hidden space-y-6 md:block"}
        >
          <FilterBlock title="Catégorie">
            <Link
              to="/catalogue"
              search={{ ...search, category: undefined }}
              className={!search.category ? "font-medium text-primary" : ""}
            >
              Toutes
            </Link>
            {cats.map((c) => (
              <button
                key={c.slug}
                type="button"
                className={`block text-left text-sm ${search.category === c.slug ? "font-medium text-primary" : "text-muted-foreground"}`}
                onClick={() =>
                  patch({
                    category: search.category === c.slug ? undefined : c.slug,
                  })
                }
              >
                {c.name}
              </button>
            ))}
          </FilterBlock>
          <FilterBlock title="Marque">
            {brands.map((b) => (
              <button
                key={b.slug}
                type="button"
                className={`block text-left text-sm ${search.brand === b.slug ? "font-medium text-primary" : "text-muted-foreground"}`}
                onClick={() =>
                  patch({ brand: search.brand === b.slug ? undefined : b.slug })
                }
              >
                {b.name}
              </button>
            ))}
          </FilterBlock>
          <FilterBlock title="Type de peau">
            {SKINS.map((s) => (
              <button
                key={s}
                type="button"
                className={`block text-left text-sm capitalize ${search.skin === s ? "font-medium text-primary" : "text-muted-foreground"}`}
                onClick={() => patch({ skin: search.skin === s ? undefined : s })}
              >
                {s}
              </button>
            ))}
          </FilterBlock>
          <FilterBlock title="Disponibilité">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!!search.available}
                onChange={(e) =>
                  patch({ available: e.target.checked || undefined })
                }
              />
              En stock
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!!search.promo}
                onChange={(e) => patch({ promo: e.target.checked || undefined })}
              />
              Promotions
            </label>
          </FilterBlock>
        </aside>

        <div>
          {search.category === "outils-protection" ? (
            <div className="mb-5 bg-secondary p-4 ring-1 ring-border">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                <ShieldCheck className="size-3.5" />
                EPI · NF
              </p>
              <div className="mt-2">
                <NfMark />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Sigle NF AFNOR + CE photographiés. Gants : NF EN ISO 374 type
                A/B/C —{" "}
                <Link to="/epi" hash="nf-en-374" className="text-primary">
                  préciser NF EN 374
                </Link>
                .
              </p>
            </div>
          ) : null}
          {search.origin === "Corée" ? (
            <div className="mb-5 bg-secondary p-4 ring-1 ring-border">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                <ShieldCheck className="size-3.5" />
                Corée · MFDS
              </p>
              <div className="mt-2">
                <MfdsMark />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Cosmetics Act, lot et DLC photographiés. Solaire = 기능성화장품.{" "}
                <Link to="/normes-coree" className="text-primary">
                  Vérifier les normes
                </Link>
                .
              </p>
            </div>
          ) : null}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              {products
                ? `${products.length} produit${products.length > 1 ? "s" : ""}`
                : "Chargement…"}
              {activeFilters.length ? ` · ${activeFilters.join(" · ")}` : ""}
            </p>
            <select
              className="h-11 rounded-md border border-input bg-surface px-3 text-sm"
              value={search.sort ?? "featured"}
              onChange={(e) =>
                patch({
                  sort:
                    e.target.value === "featured"
                      ? undefined
                      : (e.target.value as Search["sort"]),
                })
              }
            >
              <option value="featured">Sélection</option>
              <option value="new">Nouveautés</option>
              <option value="price_asc">Prix croissant</option>
              <option value="price_desc">Prix décroissant</option>
            </select>
          </div>
          {products ? (
            <ProductGrid
              products={products}
              favored={fav}
              onToggleFav={(id) => {
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
              }}
            />
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-none" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {title}
      </p>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}
