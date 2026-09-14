import { Logo } from "@/components/logo";

/** @deprecated Prefer <Logo variant="mark" />. Kept so older imports keep working. */
export function Mark({ className }: { className?: string }) {
  return <Logo variant="mark" className={className} priority />;
}
