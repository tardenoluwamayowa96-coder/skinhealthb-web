import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = { productId: number; qty: number };

type CartState = {
  items: CartLine[];
  add: (productId: number, qty?: number) => void;
  setQty: (productId: number, qty: number) => void;
  remove: (productId: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (productId, qty = 1) => {
        const items = [...get().items];
        const i = items.findIndex((x) => x.productId === productId);
        if (i >= 0) items[i] = { ...items[i], qty: items[i].qty + qty };
        else items.push({ productId, qty });
        set({ items });
      },
      setQty: (productId, qty) => {
        if (qty <= 0) {
          set({ items: get().items.filter((x) => x.productId !== productId) });
          return;
        }
        set({
          items: get().items.map((x) =>
            x.productId === productId ? { ...x, qty } : x,
          ),
        });
      },
      remove: (productId) =>
        set({ items: get().items.filter((x) => x.productId !== productId) }),
      clear: () => set({ items: [] }),
    }),
    { name: "skinhealthb-cart" },
  ),
);

export function cartCount(items: CartLine[]): number {
  return items.reduce((n, x) => n + x.qty, 0);
}
