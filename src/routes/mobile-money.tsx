import { createFileRoute, Link } from "@tanstack/react-router";
import { PayLogo } from "@/components/pay-logo";
import { PayNumbers } from "@/components/pay-numbers";
import { BRAND } from "@/lib/brand";
import { formatTogoPhone } from "@/lib/format";
import { MM_NOTES, TOGO_MM } from "@/lib/mobile-money";

export const Route = createFileRoute("/mobile-money")({
  component: MobileMoney,
});

function MobileMoney() {
  return (
    <div>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
            Togo · 2026
          </p>
          <h1 className="mt-1 font-display text-3xl md:text-5xl">
            Mobile Money
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Au Togo : Flooz et Mixx by Yas. Hors Togo : Western Union, Ria,
            MoneyGram (nom privé par WhatsApp).
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <PayLogo network="FLOOZ" className="h-9 max-w-[72px]" />
            <PayLogo network="TMONEY" className="h-9 max-w-[140px]" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="font-display text-2xl">Numéros boutique</h2>
        <div className="mt-4">
          <PayNumbers />
        </div>

        <h2 className="mt-10 font-display text-2xl">Services au Togo</h2>
        <div className="mt-4 grid gap-px overflow-hidden ring-1 ring-border sm:grid-cols-2">
          {TOGO_MM.map((s) => (
            <article key={s.id} className="bg-card p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                {s.accepted ? "Accepté ici" : "Pas encaissé"}
              </p>
              <h3 className="mt-1 font-display text-xl">{s.label}</h3>
              <p className="text-xs text-muted-foreground">{s.operator}</p>
              {s.phone ? (
                <p className="mt-2 text-sm font-medium tabular-nums">
                  {formatTogoPhone(s.phone)}
                </p>
              ) : null}
              {s.transfer ? (
                <p className="mt-1 text-xs tabular-nums text-muted-foreground">
                  USSD {s.transfer}
                </p>
              ) : null}
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.blurb}
              </p>
              {s.href ? (
                <Link to={s.href} className="mt-3 inline-block text-sm text-primary">
                  Guide {s.label}
                </Link>
              ) : null}
            </article>
          ))}
        </div>

        <ul className="mt-8 space-y-2 text-sm text-muted-foreground">
          {MM_NOTES.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>

        <p className="mt-6 text-sm">
          <Link to="/guide-remise" className="text-primary">
            Guide Western Union, Ria, MoneyGram
          </Link>
        </p>
      </div>
    </div>
  );
}
