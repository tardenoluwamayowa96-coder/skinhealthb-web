import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminBar } from "@/components/admin-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { formatXof } from "@/lib/format";
import { adminListProducts, adminPatchProduct } from "@/lib/server/admin";
import { getMyProfile } from "@/lib/server/profile";
import type { ProductDetail } from "@/lib/types";

export const Route = createFileRoute("/admin/produits")({
  component: AdminProduits,
});

function AdminProduits() {
  const { user, isPending } = useCurrentUserState();
  const [ok, setOk] = useState(false);
  const [rows, setRows] = useState<ProductDetail[]>([]);

  useEffect(() => {
    if (!user) return;
    getMyProfile().then((p) => {
      if (p.role !== "admin") return;
      setOk(true);
      adminListProducts().then(setRows).catch(() => {});
    });
  }, [user]);

  if (isPending) return <div className="h-32 animate-pulse bg-surface-2" />;
  if (!user) return <RedirectToSignIn />;
  if (!ok) return <p className="p-8 text-sm">Accès refusé.</p>;

  return (
    <div>
      <AdminBar />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="font-display text-4xl">Produits</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Le chiffre descend tout seul à la commande. Ajuste ici seulement un
          inventaire physique.
        </p>
        <div className="mt-6 overflow-x-auto rounded-lg bg-card">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-3 py-3">Produit</th>
                <th className="px-3 py-3">Prix</th>
                <th className="px-3 py-3">Stock</th>
                <th className="px-3 py-3">Actif</th>
                <th className="px-3 py-3" />
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <ProductRow
                  key={p.id}
                  product={p}
                  onSave={async (patch) => {
                    try {
                      await adminPatchProduct({ data: { id: p.id, ...patch } });
                      toast.success("Enregistré");
                    } catch (e) {
                      toast.error(e instanceof Error ? e.message : "Erreur");
                    }
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ProductRow({
  product,
  onSave,
}: {
  product: ProductDetail;
  onSave: (p: { price_xof?: number; stock?: number; is_active?: boolean }) => void;
}) {
  const [price, setPrice] = useState(String(product.price_xof));
  const [stock, setStock] = useState(String(product.stock));
  const [active, setActive] = useState(product.is_active);
  return (
    <tr className="border-b border-border last:border-0">
      <td className="px-3 py-3">
        <p className="font-medium">{product.name}</p>
        <p className="text-xs text-muted-foreground">
          {product.brand_name} · {product.sku}
        </p>
      </td>
      <td className="px-3 py-3">
        <Input
          className="h-9 w-28"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <p className="mt-1 text-[10px] text-muted-foreground">
          {formatXof(Number(price) || 0)}
        </p>
      </td>
      <td className="px-3 py-3">
        <Input
          className="h-9 w-20"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </td>
      <td className="px-3 py-3">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
        />
      </td>
      <td className="px-3 py-3">
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            onSave({
              price_xof: Number(price),
              stock: Number(stock),
              is_active: active,
            })
          }
        >
          Sauver
        </Button>
      </td>
    </tr>
  );
}
