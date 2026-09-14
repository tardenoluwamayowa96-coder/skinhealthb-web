/** Lockup typographique NF — pas le logo AFNOR officiel. */

export function NfMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 ${className}`}
      title="Certification NF — AFNOR"
    >
      <span className="inline-flex size-8 items-center justify-center rounded-sm border-2 border-fg text-[11px] font-bold leading-none tracking-tight text-fg">
        NF
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        AFNOR
      </span>
    </span>
  );
}
