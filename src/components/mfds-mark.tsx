/** Lockup typographique MFDS — pas le sceau officiel coréen. */

export function MfdsMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 ${className}`}
      title="MFDS — Cosmetics Act Corée"
    >
      <span className="inline-flex h-8 items-center justify-center border-2 border-fg px-1.5 text-[10px] font-bold leading-none tracking-tight text-fg">
        MFDS
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        화장품법
      </span>
    </span>
  );
}
