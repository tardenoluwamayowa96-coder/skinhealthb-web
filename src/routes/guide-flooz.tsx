import { createFileRoute, Link } from "@tanstack/react-router";
import { CopyRow } from "@/components/copy-row";
import { PayLogo } from "@/components/pay-logo";
import { PaymentNb } from "@/components/payment-nb";
import { BRAND } from "@/lib/brand";
import { formatTogoPhone } from "@/lib/format";
import { FLOOZ, FLOOZ_STEPS, FLOOZ_SEND, FLOOZ_WITHDRAW, FEE_EXAMPLES, MIXX_SEND } from "@/lib/mobile-money";
import { telUssd } from "@/lib/payments";

export const Route = createFileRoute("/guide-flooz")({
  component: GuideFlooz,
});

function GuideFlooz() {
  return (
    <div>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-lg px-4 py-8">
          <PayLogo network="FLOOZ" className="h-10 max-w-[120px]" />
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
            Paiement · Togo
          </p>
          <h1 className="mt-1 font-display text-3xl md:text-4xl">
            Payer avec Flooz
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Transfert Moov vers le numéro Skinhealthb. Menu {FLOOZ.menu},
            envoi {FLOOZ.transfer}.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-lg space-y-3 px-4 py-8">
        <CopyRow
          label="Numéro Flooz boutique"
          value={FLOOZ.phone.replace(/\s/g, "")}
          display={FLOOZ.phoneDisplay}
        />
        <CopyRow label="Transfert (USSD)" value={FLOOZ.transfer} />
        <CopyRow label="Menu Flooz" value={FLOOZ.menu} />
        <a
          href={telUssd(FLOOZ.transfer)}
          className="flex h-11 items-center justify-center bg-primary text-sm font-medium text-primary-foreground"
        >
          Composer {FLOOZ.transfer}
        </a>

        <ol className="mt-6 space-y-5">
          {FLOOZ_STEPS.map((s, i) => (
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

        <h2 className="mt-10 font-display text-2xl">Frais Flooz</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Chez Skinhealthb tu <strong className="font-medium text-fg">transfères</strong> vers
          le numéro boutique — tu ne retires pas. Moov : les{" "}
          {FLOOZ_SEND.freePerDay} premiers transferts du jour sont gratuits. Mixx
          : {MIXX_SEND.freePerDay} gratuits, puis {MIXX_SEND.then}. Recevoir est
          gratuit. TAF 10 % sur les commissions, pas sur le montant.
        </p>

        <div className="mt-4 overflow-x-auto ring-1 ring-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Exemple</th>
                <th className="px-3 py-2 font-medium">Flooz</th>
                <th className="px-3 py-2 font-medium">Mixx</th>
              </tr>
            </thead>
            <tbody>
              {FEE_EXAMPLES.map((r) => (
                <tr key={r.amount} className="border-t border-border">
                  <td className="px-3 py-2">
                    <span className="tabular-nums">{r.amount}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {r.note}
                    </span>
                  </td>
                  <td className="px-3 py-2 tabular-nums">{r.flooz}</td>
                  <td className="px-3 py-2 tabular-nums">{r.mixx}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-8 text-sm font-semibold">Retrait agent Flooz</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Si tu sors du cash chez un PDV — pas le paiement Skinhealthb.
        </p>
        <div className="mt-3 overflow-x-auto ring-1 ring-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Tranche (F CFA)</th>
                <th className="px-3 py-2 font-medium">Frais Flooz</th>
              </tr>
            </thead>
            <tbody>
              {FLOOZ_WITHDRAW.map((r) => (
                <tr key={r.range} className="border-t border-border">
                  <td className="px-3 py-2 tabular-nums">{r.range}</td>
                  <td className="px-3 py-2 tabular-nums">{r.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Mixx, à titre de comparaison : 50 F (≤500), 100 F (≤5 000), 300 F
          (≤20 000), 600 F (≤50 000), 1 000 F (≤100 000). Flooz est un peu moins
          cher entre 5 001 et 15 000 F (280 F vs 300 F).
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          Sources :{" "}
          <a href={FLOOZ_SEND.site} className="text-primary" target="_blank" rel="noreferrer">
            moov-africa.tg
          </a>
          {" · "}
          <a href={MIXX_SEND.site} className="text-primary" target="_blank" rel="noreferrer">
            yas.tg
          </a>
          . Vérifie le frais affiché dans {FLOOZ.menu} avant d’envoyer.
        </p>

        <PaymentNb className="mt-6" />

        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
          WhatsApp {formatTogoPhone(BRAND.whatsapp)}. Autres portefeuilles :{" "}
          <Link to="/mobile-money" className="text-primary">
            Mobile Money Togo
          </Link>
          {" · "}
          <Link to="/guide-mixx" className="text-primary">
            Guide Mixx
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
