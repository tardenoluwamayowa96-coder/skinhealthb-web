import { APP_PACKAGE, SITE_HOST, SITE_URL } from "@/lib/site";

export const BRAND = {
  name: "Skinhealthb",
  handle: "skinhealthb",
  siteHost: SITE_HOST,
  siteUrl: SITE_URL,
  packageName: APP_PACKAGE,
  instagramHandle: "@skinhealthb",
  instagramUrl: "https://www.instagram.com/skinhealthb/",
  tiktokHandle: "@skinhealthb",
  tiktokUrl: "https://www.tiktok.com/@skinhealthb",
  email: "skinhealth63@gmail.com",
  whatsapp: "+22892907501",
  whatsappUrl: "https://wa.me/22892907501",
  flooz: "+22896836021",
  mixx: "+22892907501",
  receiverCity: "Lomé",
  receiverCountry: "Togo",
  tagline: "Beauté authentique, accessible au Togo",
} as const;

/** Comptes qui ouvrent toujours l’espace boutique. */
export const ADMIN_EMAILS = [
  "skinhealth63@gmail.com",
  "skinhealthb63@gmail.com",
] as const;

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return (ADMIN_EMAILS as readonly string[]).includes(email.trim().toLowerCase());
}

export const SOCIAL = [
  {
    id: "instagram",
    label: "Instagram",
    handle: BRAND.instagramHandle,
    href: BRAND.instagramUrl,
    blurb: "Arrivages, routines et lots vérifiés.",
  },
  {
    id: "tiktok",
    label: "TikTok",
    handle: BRAND.tiktokHandle,
    href: BRAND.tiktokUrl,
    blurb: "Déballages et tendances K-beauty au Togo.",
  },
] as const;

export function productShareText(brand: string, name: string) {
  return `${brand} · ${name} — authentique chez ${BRAND.name}. Instagram et TikTok ${BRAND.instagramHandle}`;
}
