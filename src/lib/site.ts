/** Domaine canonique Skinhealthb — URL Appilix / Auth / SEO. */
export const SITE_HOST = "skinhealthb.com";
export const SITE_WWW = "www.skinhealthb.com";
export const SITE_HOSTS = [SITE_HOST, SITE_WWW] as const;
export const SITE_URL = `https://${SITE_HOST}`;
export const SITE_WWW_URL = `https://${SITE_WWW}`;
export const SITE_ORIGINS = [SITE_URL, SITE_WWW_URL] as const;

/** Identifiant Android / iOS — pas une adresse web. */
export const APP_PACKAGE = "com.skinhealthb.app";

export const DNS_RECORDS = [
  { type: "A", host: "@", value: "76.76.21.21", note: "Racine → Vercel" },
  { type: "CNAME", host: "www", value: "cname.vercel-dns.com", note: "www → Vercel" },
] as const;
