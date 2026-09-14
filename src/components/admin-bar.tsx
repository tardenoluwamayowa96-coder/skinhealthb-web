import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/admin", label: "Vue d’ensemble" },
  { to: "/admin/produits", label: "Produits" },
  { to: "/admin/stocks", label: "Stocks" },
  { to: "/admin/commandes", label: "Commandes" },
  { to: "/admin/clients", label: "Clients" },
  { to: "/admin/achat-coree", label: "Achat Corée" },
  { to: "/admin/concurrence", label: "Concurrence" },
  { to: "/admin/reglages", label: "Réglages" },
  { to: "/admin/environnement", label: "Environnement" },
  { to: "/domaine", label: "Domaine" },
] as const;

export function AdminBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4">
        {LINKS.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={cn(
              "shrink-0 border-b-2 px-3 py-3 text-sm",
              pathname === l.to
                ? "border-primary font-medium"
                : "border-transparent text-muted-foreground",
            )}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
