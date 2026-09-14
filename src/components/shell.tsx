import { Link, useRouterState } from "@tanstack/react-router";
import {
  Heart,
  Home,
  LayoutGrid,
  Menu,
  Search,
  ShoppingBag,
  Tag,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { PayLogo } from "@/components/pay-logo";
import { ShipLogo } from "@/components/ship-logo";
import { SocialLinks } from "@/components/social";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { BRAND } from "@/lib/brand";
import { cartCount, useCart } from "@/lib/cart-store";
import { getPublicSettings } from "@/lib/server/catalog";
import { getMyProfile } from "@/lib/server/profile";
import { formatTogoPhone } from "@/lib/format";
import { DEFAULT_MERCHANT } from "@/lib/payments";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Accueil" },
  { to: "/catalogue", label: "Catalogue" },
  { to: "/marques", label: "Marques" },
  { to: "/assistance", label: "Assistance" },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = useCart((s) => s.items);
  const count = cartCount(items);
  const { user, isPending } = useCurrentUserState();
  const [open, setOpen] = useState(false);
  const [banner, setBanner] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    getPublicSettings()
      .then((s) => setBanner(s.announcement))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    getMyProfile()
      .then((p) => setIsAdmin(p.role === "admin"))
      .catch(() => setIsAdmin(false));
  }, [user]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const hideChrome = pathname.startsWith("/login");

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      {!hideChrome && banner && (
        <p className="truncate bg-secondary px-3 py-1.5 text-center text-[11px] font-medium tracking-wide text-fg">
          {banner}
        </p>
      )}
      {!hideChrome && (
        <header className="ios-chrome sticky top-0 z-40 border-b border-border bg-bg pt-[env(safe-area-inset-top)] md:backdrop-blur-md">
          <div className="mx-auto flex h-12 max-w-6xl items-center gap-1 px-2 sm:h-14 sm:gap-3 sm:px-4">
            <button
              type="button"
              className="grid size-10 shrink-0 place-items-center rounded-md md:hidden"
              aria-label="Menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="size-5" />
            </button>
            <Link
              to="/"
              className="min-w-0 flex-1 overflow-hidden md:flex-none"
              aria-label={BRAND.name}
            >
              <Logo variant="header" priority />
            </Link>
            <nav className="ml-8 hidden items-center gap-6 text-sm md:flex">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "text-muted-foreground transition-colors hover:text-fg",
                    pathname === n.to && "text-fg",
                  )}
                >
                  {n.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-gold transition-colors hover:text-fg"
                >
                  Admin
                </Link>
              )}
            </nav>
            <div className="ml-auto flex shrink-0 items-center">
              <Link
                to="/catalogue"
                search={{ q: "" }}
                aria-label="Recherche"
                className="grid size-10 place-items-center rounded-md"
              >
                <Search className="size-5" />
              </Link>
              <Link
                to="/favoris"
                aria-label="Favoris"
                className="hidden size-10 place-items-center rounded-md sm:grid"
              >
                <Heart className="size-5" />
              </Link>
              <Link
                to="/panier"
                aria-label="Panier"
                className="relative grid size-10 place-items-center rounded-md"
              >
                <ShoppingBag className="size-5" />
                {count > 0 && (
                  <span className="absolute right-1 top-1 grid min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                    {count}
                  </span>
                )}
              </Link>
              {isPending ? (
                <div className="hidden size-10 animate-pulse rounded-full bg-surface-2 md:block" />
              ) : user ? (
                <>
                  <Link
                    to="/compte"
                    aria-label="Compte"
                    className="hidden size-10 place-items-center rounded-md md:grid"
                  >
                    <User className="size-5" />
                  </Link>
                  <div className="hidden items-center md:flex">
                    <UserButton />
                  </div>
                </>
              ) : (
                <Link
                  to="/login"
                  className="hidden rounded-md px-3 py-2 text-sm font-medium md:inline"
                >
                  Connexion
                </Link>
              )}
            </div>
          </div>
        </header>
      )}

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-fg/40"
            aria-label="Fermer"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[82%] max-w-sm flex-col bg-surface p-6 pt-8 shadow-xl">
            <div className="mb-8 flex items-center justify-between">
              <Logo variant="lockup" className="h-8" priority />
              <button
                type="button"
                className="grid size-11 place-items-center"
                onClick={() => setOpen(false)}
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 text-lg">
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} className="rounded-md py-3">
                  {n.label}
                </Link>
              ))}
              <Link to="/commandes" className="rounded-md py-3">
                Mes commandes
              </Link>
              {isAdmin && (
                <Link to="/admin" className="rounded-md py-3 text-gold">
                  Espace admin
                </Link>
              )}
              {!user && (
                <Link to="/login" className="rounded-md py-3">
                  Connexion
                </Link>
              )}
            </nav>
            <div className="mt-auto space-y-3 pt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Nous suivre
              </p>
              <SocialLinks />
              <a href={`mailto:${BRAND.email}`} className="block text-sm text-fg">
                {BRAND.email}
              </a>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 pb-20 md:pb-0">{children}</main>

      {!hideChrome && (
        <footer className="mt-16 hidden border-t border-border bg-secondary md:block">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <Link to="/" aria-label={BRAND.name}>
                <Logo variant="lockup" className="h-10" />
              </Link>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                La beauté authentique, accessible au Togo. Marques vérifiées,
                paiement Flooz et Mixx by Yas, expédition Nagode, Poste, Gozem
                ou retrait boutique
                dans toutes les villes du Togo.
              </p>
              <p className="mt-3 text-sm tabular-nums text-fg">
                Flooz {formatTogoPhone(DEFAULT_MERCHANT.FLOOZ.phone)}
                <span className="mx-2 text-muted-foreground">·</span>
                Mixx by Yas {formatTogoPhone(DEFAULT_MERCHANT.TMONEY.phone)}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <PayLogo network="FLOOZ" className="h-9 max-w-[72px]" />
                <PayLogo network="TMONEY" className="h-9 max-w-[120px]" />
                <ShipLogo className="h-9 max-w-[130px]" />
              </div>
              <a
                href={`mailto:${BRAND.email}`}
                className="mt-2 inline-block text-sm text-fg"
              >
                {BRAND.email}
              </a>
              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block text-sm tabular-nums text-fg"
              >
                WhatsApp {formatTogoPhone(BRAND.whatsapp)}
              </a>
              <SocialLinks className="mt-3" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Boutique
              </p>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link to="/catalogue">Catalogue</Link>
                <Link to="/tendances">Tendances beauté</Link>
                <Link to="/routine">Routine climat</Link>
                <Link to="/marques">Marques</Link>
                <Link to="/catalogue" search={{ category: "visage" }}>
                  Soins du visage
                </Link>
                <Link to="/catalogue" search={{ category: "corps" }}>
                  Corps
                </Link>
                <Link to="/catalogue" search={{ category: "outils-protection" }}>
                  EPI — NF
                </Link>
                <Link to="/epi">Certification NF</Link>
                <Link to="/normes-coree">Normes Corée MFDS</Link>
                <Link to="/guide-remise">Western Union · Ria · MoneyGram</Link>
                <Link to="/guide-mixx">Guide Mixx by Yas</Link>
                <Link to="/guide-flooz">Guide Flooz</Link>
                <Link to="/mobile-money">Mobile Money Togo</Link>
                <Link to="/domaine">Nom de domaine</Link>
                <Link to="/assistance">Assistance</Link>
                <Link to="/suivi">Suivi colis</Link>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Informations
              </p>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link to="/mentions/confidentialite">Confidentialité</Link>
                <Link to="/mentions/cgv">Conditions de vente</Link>
                <Link to="/mentions/retours">Retours</Link>
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noreferrer me"
                >
                  Instagram {BRAND.instagramHandle}
                </a>
                <a href={BRAND.tiktokUrl} target="_blank" rel="noreferrer me">
                  TikTok {BRAND.tiktokHandle}
                </a>
              </div>
            </div>
          </div>
          <p className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} {BRAND.name} · Lomé, Togo ·{" "}
            <a href={`mailto:${BRAND.email}`} className="text-fg">
              {BRAND.email}
            </a>
          </p>
        </footer>
      )}

      {!hideChrome && (
        <nav className="ios-chrome-secondary fixed inset-x-0 bottom-0 z-40 border-t border-border bg-secondary md:hidden">
          <div className="grid grid-cols-5 pb-[env(safe-area-inset-bottom)]">
            <TabLink to="/" icon={Home} label="Accueil" active={pathname === "/"} />
            <TabLink
              to="/catalogue"
              icon={LayoutGrid}
              label="Rayon"
              active={
                pathname.startsWith("/catalogue") ||
                pathname.startsWith("/produit")
              }
            />
            <TabLink
              to="/marques"
              icon={Tag}
              label="Marques"
              active={pathname.startsWith("/marques")}
            />
            <TabLink
              to="/panier"
              icon={ShoppingBag}
              label="Panier"
              active={
                pathname.startsWith("/panier") ||
                pathname.startsWith("/commande")
              }
              badge={count}
            />
            <TabLink
              to={user ? "/compte" : "/login"}
              icon={User}
              label="Compte"
              active={
                pathname.startsWith("/compte") ||
                pathname.startsWith("/commandes")
              }
            />
          </div>
        </nav>
      )}
    </div>
  );
}

function TabLink({
  to,
  icon: Icon,
  label,
  active,
  badge,
}: {
  to: string;
  icon: typeof Home;
  label: string;
  active: boolean;
  badge?: number;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "relative flex flex-col items-center gap-0.5 py-1.5 text-[10px] leading-none",
        active ? "text-primary" : "text-muted-foreground",
      )}
    >
      <span className="relative">
        <Icon className="size-5" />
        {!!badge && badge > 0 && (
          <span className="absolute -right-2 -top-1 grid min-w-4 place-items-center rounded-full bg-primary px-1 text-[9px] text-primary-foreground">
            {badge}
          </span>
        )}
      </span>
      {label}
    </Link>
  );
}
