/** Western Union Togo — pas de grille unique à l’arrivée. */

export const WU_TOGO = {
  site: "https://www.westernunion.com/tg/fr/home.html",
  locator: "https://www.westernunion.com/global-services/find-locations?WUCountry=tg&WULanguage=fr",
  support: "998 00800",
  operator: "Orabank Togo (WU digital)",
} as const;

/** Envoi depuis le Togo vers UEMOA — guide Orabank WU, HT, août 2025. Indicatif. */
export const WU_TOGO_UEMOA: { range: string; fee: string }[] = [
  { range: "1 – 5 000", fee: "150 F" },
  { range: "5 001 – 15 000", fee: "200 F" },
  { range: "15 001 – 50 000", fee: "450 F" },
  { range: "50 001 – 100 000", fee: "950 F" },
  { range: "100 001 – 200 000", fee: "1 450 F" },
  { range: "200 001 – 300 000", fee: "1 800 F" },
  { range: "300 001 – 850 000", fee: "2 400 F" },
];

export const WU_NOTES = [
  "Payer Skinhealthb : tu envoies le montant exact de la commande. Les frais WU se paient en plus, à l’agence d’envoi (Cotonou, Abidjan, Dakar…).",
  "Réception cash à Lomé : en général sans frais pour le destinataire. Le MTCN suffit, avec le nom d’identité (WhatsApp, non publié).",
  "UEMOA (Bénin, CI, Sénégal, Togo) : même devise XOF, pas de change. Western Union ne publie pas une grille unique pour l’arrivée au Togo — le tarif s’affiche au guichet ou sur westernunion.com.",
  "La grille ci-dessous est l’envoi depuis le Togo (Orabank WU, hors taxe, août 2025). Elle donne un ordre de grandeur, pas le prix de ton agence à l’étranger.",
] as const;
