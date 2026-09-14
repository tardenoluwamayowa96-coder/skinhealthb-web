import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { MfdsMark } from "@/components/mfds-mark";
import { MFDS_CHECKS, MFDS_DISCLAIMER, MFDS_PILLARS } from "@/lib/korea-norms";

export const Route = createFileRoute("/normes-coree")({
  component: Page,
});

function Page() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
        Rayon Corée
      </p>
      <h1 className="mt-1 font-display text-4xl">Normes coréennes MFDS</h1>
      <div className="mt-4">
        <MfdsMark />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {MFDS_DISCLAIMER}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Référence : Cosmetics Act + règlements MFDS (안전 기준, 기능성화장품
        심사). Mis à jour 2025–2026.{" "}
        <Link to="/catalogue" search={{ origin: "Corée" }} className="text-primary">
          Voir la sélection Corée
        </Link>
        .
      </p>

      <div className="mt-8 space-y-3">
        {MFDS_PILLARS.map((n) => (
          <section key={n.code} className="bg-card p-4 ring-1 ring-border">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              <ShieldCheck className="size-3.5" />
              {n.code}
            </p>
            <h2 className="mt-1 font-display text-2xl">{n.title}</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {n.use}
            </p>
          </section>
        ))}
      </div>

      <section className="mt-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
          Contrôle à Lomé
        </p>
        <h2 className="mt-1 font-display text-3xl">Ce qu’on photographie</h2>
        <div className="mt-6 grid gap-px overflow-hidden ring-1 ring-border sm:grid-cols-2">
          {MFDS_CHECKS.map((c) => (
            <div key={c.title} className="bg-secondary p-4">
              <p className="font-medium">{c.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {c.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
