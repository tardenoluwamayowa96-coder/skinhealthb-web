import { deliveryFee, isIntlZone, TOGO_ZONE_IDS, zoneById } from "@/lib/zones";

export type CarrierId = "nagode" | "poste" | "gozem" | "retrait";

export type Carrier = {
  id: CarrierId;
  name: string;
  short: string;
  blurb: string;
  logo?: string;
  mark?: string;
  url?: string;
  phone?: string;
  /** Empty = tout le Togo. */
  zones: readonly string[];
  prefix: string;
  envUrl: string;
  envKey: string;
  feeMul: number;
  eta: string;
};

export const CARRIERS: readonly Carrier[] = [
  {
    id: "nagode",
    name: "Nagode Transfert",
    short: "Nagode",
    blurb: "Colis bus — Lomé, Sokodé, Kara, Dapaong et agences sur l’axe.",
    logo: "/ship/nagode.png?v=1",
    mark: "/ship/nagode-mark.png?v=1",
    url: "https://nagodetransfert.com/",
    phone: "+22892194378",
    zones: [...TOGO_ZONE_IDS],
    prefix: "NGD",
    envUrl: "NAGODE_API_URL",
    envKey: "NAGODE_API_KEY",
    feeMul: 1,
    eta: "selon la région",
  },
  {
    id: "poste",
    name: "La Poste du Togo",
    short: "Poste",
    blurb: "Togo et UEMOA : Bénin, Côte d’Ivoire, Sénégal. Plus lent, tarif postal.",
    url: "https://www.laposte.tg/",
    zones: [...TOGO_ZONE_IDS, "benin", "cote-ivoire", "senegal"],
    prefix: "LPT",
    envUrl: "POSTE_API_URL",
    envKey: "POSTE_API_KEY",
    feeMul: 0.7,
    eta: "+1 à 2 jours vs Nagode",
  },
  {
    id: "gozem",
    name: "Gozem",
    short: "Gozem",
    blurb: "Coursier Lomé / Grand Lomé, jour même. Cosmétiques en sac isotherme.",
    url: "https://gozem.co/",
    zones: ["lome", "maritime"],
    prefix: "GZM",
    envUrl: "GOZEM_API_URL",
    envKey: "GOZEM_API_KEY",
    feeMul: 1.15,
    eta: "2–6 h",
  },
  {
    id: "retrait",
    name: "Retrait boutique",
    short: "Retrait",
    blurb: "À récupérer à Skinhealthb, Lomé. Pas de frais de transport.",
    zones: ["lome"],
    prefix: "RET",
    envUrl: "",
    envKey: "",
    feeMul: 0,
    eta: "dès paiement confirmé",
  },
] as const;

/** Compat — Nagode reste le transporteur par défaut. */
export const CARRIER = CARRIERS[0];

export function carrierById(id: string | null | undefined): Carrier {
  return CARRIERS.find((c) => c.id === id) ?? CARRIER;
}

export function carriersForZone(zoneId: string): Carrier[] {
  return CARRIERS.filter((c) => !c.zones.length || c.zones.includes(zoneId));
}

export function carrierFee(
  carrierId: string,
  zoneId: string,
  subtotal: number,
): number {
  const c = carrierById(carrierId);
  if (c.id === "retrait") return 0;
  if (c.zones.length && !c.zones.includes(zoneId)) return deliveryFee(zoneId, subtotal);
  const base = deliveryFee(zoneId, subtotal);
  if (c.id === "poste" && isIntlZone(zoneId)) return base;
  if (c.id === "gozem" && zoneId === "lome") return Math.max(2000, Math.round(base * c.feeMul));
  const n = Math.round(base * c.feeMul);
  if (c.id === "poste") return Math.max(1000, n);
  return n;
}

export function carrierEta(carrierId: string, zoneId: string): string {
  const c = carrierById(carrierId);
  if (c.id === "gozem" || c.id === "retrait") return c.eta;
  const z = zoneById(zoneId);
  if (c.id === "poste" && isIntlZone(zoneId)) return z?.eta ?? "5–15 jours";
  if (c.id === "poste" && z) return `${z.eta} (+Poste)`;
  return z?.eta ?? c.eta;
}

export function trackingFromRef(carrierId: string, publicRef: string): string {
  const c = carrierById(carrierId);
  const rest = publicRef.replace(/^(SHB-|skinhealthb-)/i, "");
  return `${c.prefix}-${rest}`;
}
