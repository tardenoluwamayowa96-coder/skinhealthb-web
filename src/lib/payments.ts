import { BRAND } from "@/lib/brand";
import { formatTogoPhone, localTogoDigits } from "@/lib/format";

export type WalletNetwork = "FLOOZ" | "TMONEY";
export type RemitNetwork = "WESTERN_UNION" | "RIA" | "MONEYGRAM";
export type PaymentNetwork = WalletNetwork | RemitNetwork;

export type MerchantNetwork = {
  id: PaymentNetwork;
  label: string;
  operator: string;
  phone: string;
  logo?: string;
  logoAlt: string;
  kind: "wallet" | "remit";
};

export const WALLET_IDS: WalletNetwork[] = ["FLOOZ", "TMONEY"];
export const REMIT_IDS: RemitNetwork[] = ["WESTERN_UNION", "RIA", "MONEYGRAM"];

export function isRemit(id: string): id is RemitNetwork {
  return (REMIT_IDS as string[]).includes(id);
}

export function isWallet(id: string): id is WalletNetwork {
  return (WALLET_IDS as string[]).includes(id);
}

export function isRemotePay(id: string): boolean {
  return isRemit(id);
}

/** Ville et contact seulement — aucun nom personnel publié. */
export const REMIT_RECEIVER = {
  boutique: BRAND.name,
  city: BRAND.receiverCity,
  country: BRAND.receiverCountry,
  phone: BRAND.whatsapp,
  email: BRAND.email,
} as const;

/** Numéros boutique Skinhealthb — transfert direct Flooz / Mixx by Yas. */
export const DEFAULT_MERCHANT: Record<PaymentNetwork, MerchantNetwork> = {
  FLOOZ: {
    id: "FLOOZ",
    label: "Flooz",
    operator: "Moov Africa",
    phone: BRAND.flooz,
    logo: "/pay/flooz.png?v=2",
    logoAlt: "Flooz · Moov Money",
    kind: "wallet",
  },
  TMONEY: {
    id: "TMONEY",
    label: "Mixx by Yas",
    operator: "Yas Togo",
    phone: BRAND.mixx,
    logo: "/pay/mixx-by-yas.png?v=2",
    logoAlt: "Mixx by Yas",
    kind: "wallet",
  },
  WESTERN_UNION: {
    id: "WESTERN_UNION",
    label: "Western Union",
    operator: "Envoi international",
    phone: BRAND.whatsapp,
    logoAlt: "Western Union",
    kind: "remit",
  },
  RIA: {
    id: "RIA",
    label: "Ria",
    operator: "Envoi international",
    phone: BRAND.whatsapp,
    logoAlt: "Ria Money Transfer",
    kind: "remit",
  },
  MONEYGRAM: {
    id: "MONEYGRAM",
    label: "MoneyGram",
    operator: "Envoi international",
    phone: BRAND.whatsapp,
    logoAlt: "MoneyGram",
    kind: "remit",
  },
};

export function merchantFromSettings(settings: {
  flooz_number?: string;
  tmoney_number?: string;
}): Record<PaymentNetwork, MerchantNetwork> {
  return {
    ...DEFAULT_MERCHANT,
    FLOOZ: {
      ...DEFAULT_MERCHANT.FLOOZ,
      phone: settings.flooz_number?.trim() || DEFAULT_MERCHANT.FLOOZ.phone,
    },
    TMONEY: {
      ...DEFAULT_MERCHANT.TMONEY,
      phone: settings.tmoney_number?.trim() || DEFAULT_MERCHANT.TMONEY.phone,
    },
  };
}

export function checkoutNetworks(intl: boolean): PaymentNetwork[] {
  return intl ? [...REMIT_IDS, ...WALLET_IDS] : [...WALLET_IDS];
}

export function displayMerchantPhone(phone: string): string {
  return formatTogoPhone(phone);
}

export function ussdMenu(network: PaymentNetwork): string {
  if (network === "FLOOZ") return "*155#";
  if (network === "TMONEY") return "*145#";
  return "";
}

export function ussdTransfer(
  network: PaymentNetwork,
  phone: string,
  amount: number,
): string {
  const n = localTogoDigits(phone);
  const a = Math.round(amount);
  if (network === "FLOOZ") return `*155*1*${n}*${a}#`;
  if (network === "TMONEY") return `*145*1*${n}*${a}#`;
  return "";
}

export function telUssd(code: string): string {
  return `tel:${code.replace(/#/g, "%23")}`;
}

export function paymentProofWhatsApp(input: {
  ref: string;
  amount: number;
  networkLabel: string;
  remit?: boolean;
}): string {
  const text = input.remit
    ? [
        `Skinhealthb — preuve envoi international`,
        `Commande : ${input.ref}`,
        `Réseau : ${input.networkLabel}`,
        `Montant : ${input.amount} F`,
        ``,
        `NB : j’envoie le code MTCN / référence, la capture et la confirmation.`,
      ].join("\n")
    : [
        `Skinhealthb — preuve de paiement`,
        `Commande : ${input.ref}`,
        `Réseau : ${input.networkLabel}`,
        `Montant : ${input.amount} F`,
        ``,
        `NB : j’envoie la capture du paiement et la confirmation d’achat.`,
      ].join("\n");
  const digits = BRAND.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
