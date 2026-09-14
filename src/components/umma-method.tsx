import { Link } from "@tanstack/react-router";
import { UMMA_STEPS } from "@/lib/umma";

export function UmmaMethod() {
  return (
    <section className="border-y border-border bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
          Méthode
        </p>
        <h2 className="mt-1 font-display text-xl md:text-3xl">
          Circuit Corée, lot contrôlé
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          <Link to="/tendances" className="text-primary">
            Tendances
          </Link>
          {" · "}
          <Link to="/routine" className="text-primary">
            Routine climat
          </Link>
          {" · "}
          <Link to="/marques" className="text-primary">
            Explorer les marques coréennes
          </Link>
          {" · "}
          <Link to="/normes-coree" className="text-primary">
            Normes MFDS
          </Link>
          {" · "}
          Cosmetics Act.
        </p>
        <div className="mt-5 grid gap-px overflow-hidden ring-1 ring-border sm:grid-cols-2 lg:grid-cols-4">
          {UMMA_STEPS.map((s, i) => (
            <div key={s.title} className="bg-card p-4">
              <p className="text-[11px] font-semibold tabular-nums text-primary">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 font-medium">{s.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
