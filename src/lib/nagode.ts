import { carrierById, trackingFromRef, type CarrierId } from "@/lib/shipping";
import { zoneById } from "@/lib/zones";

export const NAGODE_STATUSES = [
  { id: "booked", label: "Colis créé" },
  { id: "agence", label: "Chez le transporteur" },
  { id: "in_transit", label: "En route" },
  { id: "arrived", label: "Arrivé à destination" },
  { id: "delivered", label: "Remis au destinataire" },
  { id: "exception", label: "Incident" },
] as const;

export type NagodeStatus = (typeof NAGODE_STATUSES)[number]["id"];

export function nagodeStatusLabel(id: string): string {
  return NAGODE_STATUSES.find((s) => s.id === id)?.label ?? id;
}

export function nagodeTrackingFromRef(publicRef: string, carrierId: string = "nagode"): string {
  return trackingFromRef(carrierId, publicRef);
}

export function nagodeDispatchWhatsApp(input: {
  tracking: string;
  publicRef: string;
  recipient: string;
  phone: string;
  city: string;
  address: string;
  pieces: number;
  valueXof: number;
  zone: string;
  carrierId?: string;
}): string {
  const carrier = carrierById(input.carrierId);
  const zone = zoneById(input.zone);
  const text = [
    `Skinhealthb — colis ${carrier.name}`,
    `Suivi: ${input.tracking}`,
    `Commande: ${input.publicRef}`,
    `Destinataire: ${input.recipient} · ${input.phone}`,
    `Ville: ${input.city}${zone ? ` (${zone.name})` : ""}`,
    `Adresse: ${input.address}`,
    `Pièces: ${input.pieces} · Valeur: ${input.valueXof} F`,
  ].join("\n");
  const digits = (carrier.phone ?? "+22892907501").replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function isTrackingCode(code: string): boolean {
  return /^(NGD|LPT|GZM|RET)-/i.test(code);
}

export type { CarrierId };
