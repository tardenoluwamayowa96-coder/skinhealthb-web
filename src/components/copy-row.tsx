import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function CopyRow({
  label,
  value,
  display,
  className,
}: {
  label: string;
  value: string;
  display?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          toast.success(`${label} copié`);
          window.setTimeout(() => setCopied(false), 1600);
        } catch {
          toast.error("Copie impossible");
        }
      }}
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-lg bg-secondary px-4 py-3 text-left",
        className,
      )}
    >
      <span>
        <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </span>
        <span className="mt-0.5 block font-medium tabular-nums">
          {display ?? value}
        </span>
      </span>
      {copied ? (
        <Check className="size-4 shrink-0 text-primary" />
      ) : (
        <Copy className="size-4 shrink-0 text-muted-foreground" />
      )}
    </button>
  );
}
