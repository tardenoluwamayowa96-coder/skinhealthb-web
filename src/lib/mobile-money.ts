import { BRAND } from "@/lib/brand";
import { formatTogoPhone } from "@/lib/format";

/** Paysage Mobile Money Togo. Skinhealthb n’encaisse que Flooz et Mixx. */

export const FLOOZ = {
  id: "flooz",
  label: "Flooz",
  operator: "Moov Africa Togo",
  phone: BRAND.flooz,
  phoneDisplay: formatTogoPhone(BRAND.flooz),
  menu: "*155#",
  transfer: "*155*1#",
  accepted: true,
  site: "https://www.moov-africa.tg/",
} as const;

export const TOGO_MM = [
  {
    id: "mixx",
    label: "Mixx by Yas",
    operator: "Yas Togo · ex-TMoney",
    accepted: true,
    menu: "*145#",
    transfer: "*145*1#",
    phone: BRAND.mixx,
    blurb: "N°1 au Togo. Transfert vers le numéro boutique. Agrément EME BCEAO. Guide détaillé.",
    href: "/guide-mixx" as const,
  },
  {
    id: "flooz",
    label: "Flooz",
    operator: "Moov Africa Togo",
    accepted: true,
    menu: "*155#",
    transfer: "*155*1#",
    phone: BRAND.flooz,
    blurb: "Deuxième réseau. Transfert *155*1# vers le numéro Flooz Skinhealthb.",
    href: "/guide-flooz" as const,
  },
  {
    id: "gozem",
    label: "Gozem Money",
    operator: "Gozem · NSIA Banque",
    accepted: false,
    menu: null,
    transfer: null,
    phone: null,
    blurb: "Lancé oct. 2025. Super-app Lomé. Pas encore encaissé ici : passe par Mixx ou Flooz, ou WhatsApp.",
    href: null,
  },
  {
    id: "coris",
    label: "Coris Money",
    operator: "Coris Bank Togo",
    accepted: false,
    menu: null,
    transfer: null,
    phone: null,
    blurb: "Portefeuille bancaire. Pas un moyen de paiement Skinhealthb.",
    href: null,
  },
] as const;

export const FLOOZ_STEPS = [
  {
    title: "Ouvrir Flooz",
    text: "Composez *155*1# depuis la puce Moov, ou l’application Flooz / Moov.",
  },
  {
    title: "Numéro boutique",
    text: `Saisissez ${formatTogoPhone(BRAND.flooz)} — 8 chiffres : ${BRAND.flooz.replace(/\D/g, "").slice(-8)}. Vérifiez le nom.`,
  },
  {
    title: "Montant exact",
    text: "Le montant de la commande, en F CFA, sans arrondi.",
  },
  {
    title: "Code secret",
    text: "PIN Flooz uniquement. Jamais par WhatsApp, jamais à Skinhealthb.",
  },
  {
    title: "Preuve",
    text: `Capture + confirmation d’achat au WhatsApp ${formatTogoPhone(BRAND.whatsapp)} avec la référence.`,
  },
] as const;

export const MM_NOTES = [
  "Hors Togo : Western Union, Ria, MoneyGram (nom d’identité par WhatsApp, non publié). Au Togo : Flooz et Mixx seulement.",
  "Mixx peut recevoir certains virements UEMOA (PI-SPI) — le paiement boutique reste un transfert vers nos deux numéros.",
  "Payer Skinhealthb = transfert portefeuille, pas un retrait agent. Flooz : 3 envois/jour gratuits. Mixx : 6 puis 1 %.",
] as const;

/** Sources : moov-africa.tg (retrait Flooz), yas.tg (envoi Mixx), presse Mixx 31 janv. 2025. Grilles susceptibles de changer. */
export const FLOOZ_SEND = {
  freePerDay: 3,
  then: "facturé (vérifier *155#)",
  site: "https://moov-africa.tg/moov-money/transfert-flooz/",
} as const;

export const MIXX_SEND = {
  freePerDay: 6,
  then: "1 % dès le 7e",
  site: "https://yas.tg/mixx-by-yas/",
} as const;

export const FLOOZ_WITHDRAW: { range: string; fee: string }[] = [
  { range: "1 – 500", fee: "50 F" },
  { range: "501 – 1 000", fee: "75 F" },
  { range: "1 001 – 5 000", fee: "100 F" },
  { range: "5 001 – 15 000", fee: "280 F" },
  { range: "15 001 – 20 000", fee: "320 F" },
  { range: "20 001 – 50 000", fee: "600 F" },
  { range: "50 001 – 100 000", fee: "1 000 F" },
  { range: "100 001 et +", fee: "≈ 3 169 – 9 788 F" },
];

export const MIXX_WITHDRAW: { range: string; fee: string }[] = [
  { range: "1 – 500", fee: "50 F" },
  { range: "501 – 5 000", fee: "100 F" },
  { range: "5 001 – 20 000", fee: "300 F" },
  { range: "20 001 – 50 000", fee: "600 F" },
  { range: "50 001 – 100 000", fee: "1 000 F" },
];

export const FEE_EXAMPLES: { amount: string; flooz: string; mixx: string; note: string }[] = [
  { amount: "2 500 F", flooz: "0 F", mixx: "0 F", note: "Transfert boutique (quota gratuit)" },
  { amount: "7 000 F", flooz: "0 F", mixx: "0 F", note: "Transfert boutique (quota gratuit)" },
  { amount: "15 000 F", flooz: "0 F", mixx: "0 F", note: "Transfert boutique (quota gratuit)" },
  { amount: "Retrait 7 000 F", flooz: "280 F", mixx: "300 F", note: "Agent — pas le paiement Skinhealthb" },
];

