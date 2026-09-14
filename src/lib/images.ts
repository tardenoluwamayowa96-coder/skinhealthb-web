const CACHE = "v=39";

export type ImageVariant = "card" | "detail" | "thumb" | "hero";

function withCache(path: string) {
  return path.includes("?") ? path : `${path}?${CACHE}`;
}

function stem(url: string) {
  const path = url.split("?")[0] ?? url;
  return path.replace(/\.(jpe?g|png|webp|avif)$/i, "");
}

export function productSources(imageUrl: string) {
  const base = stem(imageUrl);
  return {
    jpeg: withCache(`${base}.jpg`),
    webp: withCache(`${base}.webp`),
    avif: withCache(`${base}.avif`),
    thumbJpeg: withCache(`${base}-thumb.jpg`),
    thumbWebp: withCache(`${base}-thumb.webp`),
    thumbAvif: withCache(`${base}-thumb.avif`),
  };
}

export const IMAGE_SIZES: Record<ImageVariant, string> = {
  card: "(max-width: 639px) 180px, (max-width: 1023px) 220px, 260px",
  detail: "(max-width: 767px) 92vw, 420px",
  thumb: "96px",
  hero: "100vw",
};

export const HERO_PRELOAD = {
  rel: "preload" as const,
  as: "image" as const,
  type: "image/webp",
  href: `/hero-sm.webp?${CACHE}`,
  imageSrcSet: `/hero-sm.webp?${CACHE} 800w, /hero.webp?${CACHE} 1600w`,
  imageSizes: IMAGE_SIZES.hero,
};
