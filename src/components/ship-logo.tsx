import { carrierById, type CarrierId } from "@/lib/shipping";
import { cn } from "@/lib/utils";

export function ShipLogo({
  variant = "lockup",
  carrierId,
  className,
}: {
  variant?: "lockup" | "mark";
  carrierId?: string | null;
  className?: string;
}) {
  const c = carrierById(carrierId);
  const src = variant === "mark" ? c.mark : c.logo;
  if (src) {
    return (
      <img
        src={src}
        alt={c.name}
        className={cn("h-9 w-auto object-contain object-left", className)}
      />
    );
  }
  return (
    <span
      className={cn(
        "inline-flex items-center border-2 border-fg px-2 py-1 text-[11px] font-bold uppercase tracking-[0.12em]",
        className,
      )}
    >
      {c.short}
    </span>
  );
}

export type { CarrierId };
