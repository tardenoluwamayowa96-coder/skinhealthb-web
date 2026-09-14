import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

const V = "v=1";

const ASSETS = {
  mark: {
    avif: `/brand/mark.avif?${V}`,
    webp: `/brand/mark.webp?${V}`,
    png: `/brand/mark.png?${V}`,
    w: 1024,
    h: 1024,
  },
  lockup: {
    avif: `/brand/lockup.avif?${V}`,
    webp: `/brand/lockup.webp?${V}`,
    png: `/brand/lockup.png?${V}`,
    w: 1763,
    h: 408,
  },
  stacked: {
    avif: `/brand/stacked.avif?${V}`,
    webp: `/brand/stacked.webp?${V}`,
    png: `/brand/stacked.png?${V}`,
    w: 1006,
    h: 1016,
  },
  "stacked-sm": {
    avif: `/brand/stacked-sm.avif?${V}`,
    webp: `/brand/stacked-sm.webp?${V}`,
    png: `/brand/stacked-sm.png?${V}`,
    w: 638,
    h: 584,
  },
} as const;

export type LogoVariant = keyof typeof ASSETS | "header";

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
};

function Picture({
  variant,
  className,
  priority,
  imgClass,
}: {
  variant: keyof typeof ASSETS;
  className?: string;
  priority?: boolean;
  imgClass?: string;
}) {
  const a = ASSETS[variant];
  return (
    <picture className={cn("inline-block leading-none", className)}>
      <source type="image/avif" srcSet={a.avif} />
      <source type="image/webp" srcSet={a.webp} />
      <img
        src={a.png}
        alt={BRAND.name}
        width={a.w}
        height={a.h}
        className={cn("h-full w-auto object-contain object-left", imgClass)}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        draggable={false}
      />
    </picture>
  );
}

export function Logo({ variant = "lockup", className, priority = false }: LogoProps) {
  if (variant === "header") {
    return (
      <span className={cn("flex min-w-0 items-center overflow-hidden", className)}>
        <span className="truncate font-display text-[1.35rem] leading-none tracking-tight">
          {BRAND.name}
        </span>
      </span>
    );
  }

  const height =
    variant === "mark"
      ? "size-9"
      : variant === "stacked"
        ? "h-36 w-auto sm:h-44"
        : variant === "stacked-sm"
          ? "h-24 w-auto"
          : "h-9 w-auto";

  return <Picture variant={variant} priority={priority} className={cn(height, className)} />;
}
