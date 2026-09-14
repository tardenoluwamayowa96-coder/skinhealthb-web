import { createFileRoute, Link } from "@tanstack/react-router";
import { CopyRow } from "@/components/copy-row";
import { PayLogo } from "@/components/pay-logo";
import { PaymentNb } from "@/components/payment-nb";
import { BRAND } from "@/lib/brand";
import { formatTogoPhone } from "@/lib/format";
import { MIXX, MIXX_FAQ, MIXX_STEPS } from "@/lib/mixx-guide";
import { telUssd } from "@/lib/payments";

export const Route = createFileRoute("/guide-mixx")({
  component: GuideMixx,
});

function GuideMixx() {
  return (
    <div>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-lg px-4 py-8">
          <PayLogo network="TMONEY" className="h-10 max-w-[180px]" />
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
            Paiement · Togo
          </p>
          <h1 className="mt-1 font-display text-3xl md:text-4xl">
            Payer avec Mixx by Yas
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Transfert vers le numéro Skinhealthb — pas un paiement marchand.
            Menu officiel Yas : {MIXX.transfer}.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-lg space-y-3 px-4 py-8">
        <CopyRow
          label="Numéro Mixx boutique"
          value={MIXX.phone.replace(/\s/g, "")}
          display={MIXX.phoneDisplay}
        />
        <CopyRow label="Transfert (USSD)" value={MIXX.transfer} />
        <CopyRow label="Menu Mixx" value={MIXX.menu} />
        <a
          href={telUssd(MIXX.transfer)}
          className="flex h-11 items-center justify-center bg-primary text-sm font-medium text-primary-foreground"
        >
          Composer {MIXX.transfer}
        </a>

        <ol className="mt-6 space-y-5">
          {MIXX_STEPS.map((s, i) => (
            <li key={s.title}>
              <p className="text-[11px] font-semibold tabular-nums text-primary">
                {String(i + 1).padStart(2, "0")} · {s.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </li>
          ))}
        </ol>

        <PaymentNb className="mt-6" />

        <div className="mt-8 space-y-5">
          {MIXX_FAQ.map((f) => (
            <div key={f.q}>
              <p className="font-medium">{f.q}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
          Codes {MIXX.transfer} (transfert) et {MIXX.merchant} (marchand) :{" "}
          <a href={MIXX.site} className="text-primary" target="_blank" rel="noreferrer">
            yas.tg/mixx-by-yas
          </a>
          . Service client Yas : {MIXX.support}. WhatsApp Skinhealthb :{" "}
          {formatTogoPhone(BRAND.whatsapp)}.{" "}
          <Link to="/mobile-money" className="text-primary">
            Autres services Mobile Money
          </Link>
          {" · "}
          <Link to="/guide-flooz" className="text-primary">
            Guide Flooz
          </Link>
          .
        </p>

        <Link to="/catalogue" className="mt-4 inline-block text-sm text-primary">
          Retour au catalogue
        </Link>
      </div>
    </div>
  );
}
