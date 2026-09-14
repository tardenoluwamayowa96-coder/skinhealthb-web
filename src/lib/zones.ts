export type DeliveryZone = {
  id: string;
  name: string;
  fee: number;
  eta: string;
  intl?: boolean;
  dial?: string;
};

export const DELIVERY_ZONES: DeliveryZone[] = [
  { id: "lome", name: "Lomé (commune)", fee: 1500, eta: "24–48 h" },
  { id: "maritime", name: "Maritime / Grand Lomé", fee: 2500, eta: "48–72 h" },
  { id: "plateaux", name: "Région des Plateaux", fee: 4000, eta: "3–5 jours" },
  { id: "centrale", name: "Région Centrale", fee: 4500, eta: "3–5 jours" },
  { id: "kara", name: "Région de la Kara", fee: 5000, eta: "4–6 jours" },
  { id: "savanes", name: "Région des Savanes", fee: 5500, eta: "4–7 jours" },
  {
    id: "benin",
    name: "Bénin (La Poste)",
    fee: 12000,
    eta: "5–10 jours",
    intl: true,
    dial: "229",
  },
  {
    id: "cote-ivoire",
    name: "Côte d’Ivoire (La Poste)",
    fee: 18000,
    eta: "7–14 jours",
    intl: true,
    dial: "225",
  },
  {
    id: "senegal",
    name: "Sénégal (La Poste)",
    fee: 25000,
    eta: "8–15 jours",
    intl: true,
    dial: "221",
  },
];

export const FREE_SHIPPING_LOME = 40000;

export const TOGO_ZONE_IDS = [
  "lome",
  "maritime",
  "plateaux",
  "centrale",
  "kara",
  "savanes",
] as const;

export function zoneById(id: string): DeliveryZone | undefined {
  return DELIVERY_ZONES.find((z) => z.id === id);
}

export function isIntlZone(id: string): boolean {
  return Boolean(zoneById(id)?.intl);
}

export function deliveryFee(zoneId: string, subtotal: number): number {
  const zone = zoneById(zoneId);
  if (!zone) return 0;
  if (zoneId === "lome" && subtotal >= FREE_SHIPPING_LOME) return 0;
  return zone.fee;
}

export const ORDER_STATUSES = [
  { id: "pending_payment", label: "Paiement en attente" },
  { id: "paid", label: "Payée" },
  { id: "preparing", label: "En préparation" },
  { id: "shipped", label: "Expédiée" },
  { id: "delivered", label: "Livrée" },
  { id: "cancelled", label: "Annulée" },
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number]["id"];

export function statusLabel(id: string): string {
  return ORDER_STATUSES.find((s) => s.id === id)?.label ?? id;
}