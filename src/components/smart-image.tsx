import {
  HERO_PRELOAD,
  IMAGE_SIZES,
  productSources,
  type ImageVariant,
} from "@/lib/images";
import { cn } from "@/lib/utils";

export { HERO_PRELOAD };

type Props = {
  src: string;
  alt: string;
  variant: ImageVariant;
  className?: string;
  priority?: boolean;
};

export function SmartImage({
  src,
  alt,
  variant,
  className,
  priority = false,
}: Props) {
  const loading = priority ? "eager" : "lazy";
  const fetchPriority = priority ? "high" : "auto";

  if (variant === "hero") {
    const sizes = IMAGE_SIZES.hero;
    return (
      <picture className="contents">
        <source
          type="image/avif"
          media="(min-width: 768px)"
          srcSet="/hero-sm.avif?v=39 800w, /hero.avif?v=39 1600w"
          sizes={sizes}
        />
        <source
          type="image/webp"
          srcSet="/hero-sm.webp?v=39 800w, /hero.webp?v=39 1600w"
          sizes={sizes}
        />
        <source
          type="image/jpeg"
          srcSet="/hero-sm.jpg?v=39 800w, /hero.jpg?v=39 1600w"
          sizes={sizes}
        />
        <img
          src="/hero.jpg?v=39"
          alt={alt}
          width={1600}
          height={900}
          className={className}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
        />
      </picture>
    );
  }

  const s = productSources(src);
  const sizes = IMAGE_SIZES[variant];
  const isThumb = variant === "thumb";
  const srcSetAvif = isThumb
    ? `${s.thumbAvif} 450w`
    : `${s.thumbAvif} 450w, ${s.avif} 900w`;
  const srcSetWebp = isThumb
    ? `${s.thumbWebp} 450w`
    : `${s.thumbWebp} 450w, ${s.webp} 900w`;
  const srcSetJpeg = isThumb
    ? `${s.thumbJpeg} 450w`
    : `${s.thumbJpeg} 450w, ${s.jpeg} 900w`;
  const fallback = variant === "detail" ? s.jpeg : s.thumbJpeg;
  const width = variant === "detail" ? 900 : 450;
  const height = variant === "detail" ? 1200 : 600;

     const finalSrc =
    (src && src.toLowerCase().includes("kojie")) || (alt && alt.toLowerCase().includes("kojie"))
      ? "/products/Kojie_Lightening_Soap_100g_3pcs__42928.1699407975%20(2).jpg"
      : src;

  return (
    <img
      src={finalSrc}
      alt={alt}
      width={width}
      height={height}
      className={cn(className)}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
    />
  );
}
