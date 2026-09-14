import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Droplets,
  Palette,
  Search,
  ShieldCheck,
  Smartphone,
  Smile,
  Sparkles,
  Truck,
  UserRound,
  Wind,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { ProductGrid, ProductRail } from "@/components/product-card";
import { HERO_PRELOAD, SmartImage } from "@/components/smart-image";
import { SocialFollowCards } from "@/components/social";
import { UmmaMethod } from "@/components/umma-method";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getHomeData } from "@/lib/server/catalog";
import { listMyFavorites, toggleFavorite } from "@/lib/server/profile";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { BRAND } from "@/lib/brand";
import { formatTogoPhone } from "@/lib/format";
import { PayLogo } from "@/components/pay-logo";
import { PayNumbers } from "@/components/pay-numbers";
import { merchantFromSettings } from "@/lib/payments";
import type { Category, ProductCard as Product } from "@/lib/types";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    links: [HERO_PRELOAD],
  }),
});

const CAT_ICON: Record<string, typeof Droplets> = {
  visage: Droplets,
  corps: Sparkles,
  capillaire: Wind,
  maquillage: Palette,
  parfums: Sparkles,
  hommes: UserRound,
  accessoires: Sparkles,
  dentaire: Smile,
  "outils-protection": ShieldCheck,
};

function Home() {
  const { user } = useCurrentUserState();
  const navigate = useNavigate();
  const [data, setData] = useState<Awaited<ReturnType<typeof getHomeData>> | null>(
    null,
  );
  const [fav, setFav] = useState<Set<number>>(new Set());
  const [q, setQ] = useState("");

  useEffect(() => {
    getHomeData().then(setData).catch(() => setData(null));
  }, []);

  useEffect(() => {
    if (!user) return;
    listMyFavorites()
      .then((rows) => setFav(new Set(rows.map((r) => r.product_id))))
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

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    void navigate({
      to: "/catalogue",
      search: q.trim() ? { q: q.trim() } : {},
    });
  };

  const cats = data?.categories ?? [];
  const shopCats = cats.filter((c) =>
    ["visage", "corps", "capillaire", "maquillage", "dentaire", "outils-protection"].includes(c.slug),
  );

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-3 md:hidden">
        <form onSubmit={onSearch} className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Marque, sérum, solaire…"
            className="h-10 rounded-none bg-surface pl-10"
            aria-label="Rechercher"
          />
        </form>
      </div>

      <section className="relative overflow-hidden border-b border-border">
        <div className="relative min-h-[28rem] md:min-h-[36rem]">
          <SmartImage
            src="/hero.jpg"
            alt="Caudalie, La Roche-Posay, Evoluderm et SVR — affiche Skinhealthb"
            variant="hero"
            priority
            className="absolute inset-0 size-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-fg/80 via-fg/20 to-transparent" />
          <div className="relative mx-auto flex min-h-[28rem] max-w-6xl flex-col justify-end px-4 py-8 text-primary-foreground md:min-h-[36rem] md:py-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/80">
              Lomé · Togo
            </p>
            <h1 className="mt-2 max-w-xl font-display text-4xl leading-[1.05] md:text-6xl">
              Beauté authentique, accessible au Togo.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/90 md:text-base">
              Lots photographiés. Flooz et Mixx by Yas. Nagode, Poste, Gozem ou
              retrait boutique.
            </p>
            <a
              href={`mailto:${BRAND.email}`}
              className="mt-3 inline-block text-sm font-medium underline underline-offset-4"
            >
              {BRAND.email}
            </a>
            <form onSubmit={onSearch} className="relative mt-6 max-w-md max-md:hidden">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Marque, sérum, solaire…"
                className="h-12 rounded-none bg-surface pl-10 text-fg"
              />
            </form>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                to="/catalogue"
                className="inline-flex h-11 items-center bg-primary px-5 text-sm font-medium text-primary-foreground"
              >
                Catalogue
              </Link>
              <Link
                to="/tendances"
                className="inline-flex h-11 items-center border border-primary-foreground/50 px-5 text-sm font-medium"
              >
                Tendances
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary">
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-2 px-3 py-3 md:gap-6 md:px-4 md:py-6">
          <Trust
            icon={ShieldCheck}
            title="COA · lot"
            text="Authenticité documentée, DLC contrôlée."
          />
          <Trust
            icon={Smartphone}
            title="Flooz & Mixx by Yas"
            text={`${formatTogoPhone(BRAND.flooz)} · ${formatTogoPhone(BRAND.mixx)}`}
          />
          <Trust
            icon={Truck}
            title="4 livraisons"
            text="Nagode, Poste (Togo + Bénin, CI, Sénégal), Gozem, retrait."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="font-display text-xl md:text-3xl">Payer ici</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Transfert Flooz ou Mixx by Yas vers le numéro boutique — puis capture
          WhatsApp.{" "}
          <Link to="/guide-mixx" className="text-primary">
            Guide Mixx
          </Link>
          {" · "}
          <Link to="/mobile-money" className="text-primary">
            Autres portefeuilles
          </Link>
          .
        </p>
        <div className="mt-4">
          <PayNumbers
            merchant={
              data?.settings ? merchantFromSettings(data.settings) : undefined
            }
          />
        </div>
      </section>

      <HomeRail
        title="Nouveautés"
        products={data?.news}
        favored={fav}
        onToggleFav={onToggleFav}
        toSearch={{ isNew: true }}
      />
      <HomeRail
        title="Tendances"
        products={data?.bestsellers}
        favored={fav}
        onToggleFav={onToggleFav}
        href="/tendances"
        toSearch={{ bestseller: true }}
      />
      <HomeRail
        title="Sélection Corée"
        products={data?.korea}
        favored={fav}
        onToggleFav={onToggleFav}
        toSearch={{ origin: "Corée" }}
      />
      <HomeRail
        title="Maquillage"
        products={data?.makeup}
        favored={fav}
        onToggleFav={onToggleFav}
        toSearch={{ category: "maquillage" }}
      />
      <UmmaMethod />
      <HomeRail
        title="Soins dentaires"
        products={data?.dental}
        favored={fav}
        onToggleFav={onToggleFav}
        toSearch={{ category: "dentaire" }}
      />

      <section className="mx-auto max-w-6xl px-4 py-5">
        <div className="mb-2.5 flex items-end justify-between">
          <h2 className="font-display text-xl md:text-3xl">Par rayon</h2>
          <Link to="/catalogue" className="text-sm text-muted-foreground">
            Tout voir
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden ring-1 ring-border sm:grid-cols-3">
          {(shopCats.length ? shopCats : cats.slice(0, 6)).map((c) => (
            <CategoryRow key={c.slug} category={c} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-5">
        <div className="mb-2.5 flex items-end justify-between">
          <h2 className="font-display text-xl md:text-3xl">Marques</h2>
          <Link to="/marques" className="text-sm text-muted-foreground">
            Toutes
          </Link>
        </div>
        <div className="rail -mx-4 px-4">
          {(data?.brands ?? []).map((b) => (
            <Link
              key={b.slug}
              to="/catalogue"
              search={{ brand: b.slug }}
              className="flex h-16 w-28 shrink-0 snap-start flex-col items-center justify-center rounded-none bg-secondary px-2 text-center ring-1 ring-border sm:h-20 sm:w-36 sm:px-3"
            >
              <span className="text-sm font-semibold leading-tight">{b.name}</span>
              <span className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                {b.country}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-5">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-xl md:text-3xl">Sélection</h2>
          <Link
            to="/catalogue"
            search={{ featured: true }}
            className="text-sm text-muted-foreground"
          >
            Voir tout
          </Link>
        </div>
        {data?.featured ? (
          <ProductGrid
            products={data.featured}
            favored={fav}
            onToggleFav={onToggleFav}
          />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-none" />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 pt-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
          Communauté
        </p>
        <h2 className="mt-1 font-display text-xl md:text-3xl">
          Instagram et TikTok {BRAND.instagramHandle}
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Arrivages, déballages et routines K-beauty — le même handle partout.
        </p>
        <SocialFollowCards className="mt-5" />
        {data?.bestsellers && data.bestsellers.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-none ring-1 ring-border">
            {data.bestsellers.slice(0, 6).map((p) => (
              <Link
                key={p.id}
                to="/produit/$slug"
                params={{ slug: p.slug }}
                className="aspect-square bg-surface-2"
                aria-label={p.name}
              >
                <SmartImage
                  src={p.image_url}
                  alt=""
                  variant="card"
                  className="size-full object-contain p-2"
                />
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function CategoryRow({ category }: { category: Category }) {
  const Icon = CAT_ICON[category.slug] ?? Sparkles;
  return (
    <Link
      to="/catalogue"
      search={{ category: category.slug }}
      className="flex min-h-28 flex-col justify-between bg-secondary p-4"
    >
      <Icon className="size-5 text-primary" />
      <span>
        <span className="block font-display text-xl leading-tight">
          {category.name}
        </span>
        {category.description && (
          <span className="mt-1 line-clamp-2 text-xs text-muted-foreground">
            {category.description}
          </span>
        )}
      </span>
    </Link>
  );
}

function Trust({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof ShieldCheck;
  title: string;
  text: string;
}) {
  const pay = title.includes("Mixx");
  return (
    <div className="flex min-w-0 flex-col items-center gap-1 text-center md:flex-row md:items-start md:gap-3 md:text-left">
      {pay ? (
        <span className="flex h-8 items-center gap-1.5">
          <PayLogo network="FLOOZ" className="h-8 max-w-[64px]" />
          <PayLogo network="TMONEY" className="h-8 max-w-[88px]" />
        </span>
      ) : (
        <Icon className="size-5 shrink-0 text-primary" />
      )}
      <div className="min-w-0">
        <p className="text-[11px] font-semibold leading-tight md:text-sm">{title}</p>
        <p className="mt-0.5 hidden text-xs leading-snug text-muted-foreground sm:block md:text-sm">
          {text}
        </p>
      </div>
    </div>
  );
}

function HomeRail({
  title,
  products,
  favored,
  onToggleFav,
  href,
  toSearch,
}: {
  title: string;
  products?: Product[];
  favored: Set<number>;
  onToggleFav: (id: number) => void;
  href?: "/tendances";
  toSearch: {
    isNew?: boolean;
    bestseller?: boolean;
    category?: string;
    origin?: string;
  };
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-5">
      <div className="mb-3 flex items-end justify-between">
        <h2 className="font-display text-xl md:text-3xl">{title}</h2>
        {href ? (
          <Link to={href} className="text-sm text-muted-foreground">
            Découvrir
          </Link>
        ) : (
          <Link to="/catalogue" search={toSearch} className="text-sm text-muted-foreground">
            Voir tout
          </Link>
        )}
      </div>
      {products ? (
        <ProductRail
          products={products}
          favored={favored}
          onToggleFav={onToggleFav}
        />
      ) : (
        <div className="rail -mx-4 px-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-40 shrink-0 rounded-none sm:w-48" />
          ))}
        </div>
      )}
    </section>
  );
}
