import type { MerchantNetwork, PaymentNetwork } from "@/lib/payments";
import { DEFAULT_MERCHANT } from "@/lib/payments";
import { cn } from "@/lib/utils";

export function PayLogo({
  network,
  className,
}: {
  network: PaymentNetwork | MerchantNetwork;
  className?: string;
}) {
  const n = typeof network === "string" ? DEFAULT_MERCHANT[network] : network;
  if (!n) return null;
  if (!n.logo) {
    return (
      <span
        className={cn(
          "inline-flex h-9 items-center font-display text-lg leading-none tracking-tight text-fg",
          className,
        )}
      >
        {n.label}
      </span>
    );
  }
  return (
    <img
      src={n.logo}
      alt={n.logoAlt}
      className={cn("h-9 w-auto max-h-10 object-contain object-left", className)}
    />
  );
}
