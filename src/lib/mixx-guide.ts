import { BRAND } from "@/lib/brand";
import { formatTogoPhone } from "@/lib/format";

/** Parcours Mixx by Yas (Togo) — source yas.tg/mixx-by-yas. Pas un paiement marchand *145*5#. */

export const MIXX = {
  label: "Mixx by Yas",
  operator: "Yas Togo",
  phone: BRAND.mixx,
  phoneDisplay: formatTogoPhone(BRAND.mixx),
  local: BRAND.mixx.replace(/\D/g, "").slice(-8),
  menu: "*145#",
  transfer: "*145*1#",
  withdraw: "*145*2#",
  merchant: "*145*5#",
  selfcare: "*145*8#",
  support: "888",
  site: "https://yas.tg/mixx-by-yas/",
} as const;

export const MIXX_STEPS = [
  {
    title: "Ouvrir Mixx",
    text: "Composez *145*1# (transfert) depuis la puce Yas, ou ouvrez l’application Mixx by Yas.",
  },
  {
    title: "Numéro boutique",
    text: `Saisissez ${formatTogoPhone(BRAND.mixx)} — 8 chiffres : ${BRAND.mixx.replace(/\D/g, "").slice(-8)}. Vérifiez le nom affiché.`,
  },
  {
    title: "Montant exact",
    text: "Entrez le montant de la commande, en francs CFA, sans arrondi. Les 6 premiers transferts du jour sont souvent gratuits (grille Yas, susceptible de changer).",
  },
  {
    title: "Code secret",
    text: "Confirmez avec votre PIN Mixx. Ne l’envoyez jamais à Skinhealthb, ni par WhatsApp.",
  },
  {
    title: "Preuve",
    text: `Capture du SMS / écran Mixx + confirmation d’achat, envoyées au WhatsApp ${formatTogoPhone(BRAND.whatsapp)} avec la référence de commande.`,
  },
] as const;

export const MIXX_FAQ = [
  {
    q: "C’est encore TMoney ?",
    a: "Oui. Mixx by Yas est le nouveau nom de TMoney (Yas, ex-Togocom). Le menu USSD officiel est *145#, plus *110#.",
  },
  {
    q: "Dois-je utiliser Paiement marchand (*145*5#) ?",
    a: "Non. Chez Skinhealthb on paie par transfert vers le numéro boutique, comme un envoi à un proche.",
  },
  {
    q: "Mauvais numéro ?",
    a: "Composez vite *145*8*4# (selfcare) avec la référence SMS, ou le 888. Prévenez aussi WhatsApp boutique.",
  },
  {
    q: "Quand part la commande ?",
    a: "Dès que le montant exact arrive et que la capture est reçue. Sans preuve, la commande reste en attente.",
  },
] as const;
