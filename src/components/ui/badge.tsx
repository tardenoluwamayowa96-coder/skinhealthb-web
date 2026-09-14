import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Badge({
  className,
  tone = "default",
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "gold" | "outline" | "muted";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-none px-2.5 py-0.5 text-[11px] font-medium tracking-wide",
        tone === "default" && "bg-primary text-primary-foreground",
        tone === "gold" && "bg-gold text-gold-foreground",
        tone === "outline" && "border border-border text-fg",
        tone === "muted" && "bg-secondary text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
