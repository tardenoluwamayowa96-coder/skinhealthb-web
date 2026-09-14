import { createFileRoute, Link } from "@tanstack/react-router";
import { CopyRow } from "@/components/copy-row";
import { PaymentNb } from "@/components/payment-nb";
import { BRAND } from "@/lib/brand";
import { formatTogoPhone } from "@/lib/format";
import { DEFAULT_MERCHANT, REMIT_IDS, REMIT_RECEIVER } from "@/lib/payments";
import { WU_NOTES, WU_TOGO, WU_TOGO_UEMOA } from "@/lib/wu-fees";

export const Route = createFileRoute("/guide-remise")({
  component: GuideRemise,
});

function GuideRemise() {
  return (
    <div>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-lg px-4 py-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
            Hors Togo · anonyme
          </p>
          <h1 className="mt-1 font-display text-3xl md:text-4xl">
            Western Union, Ria, MoneyGram
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Aucun nom personnel n’est publié. Pour un retrait en agence, le nom
            d’identité se donne uniquement par WhatsApp.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-lg space-y-3 px-4 py-8">
        <div className="flex flex-wrap gap-2 text-sm font-medium">
          {REMIT_IDS.map((id) => (
            <span key={id} className="bg-card px-3 py-1 ring-1 ring-border">
              {DEFAULT_MERCHANT[id].label}
            </span>
          ))}
        </div>

        <CopyRow label="Boutique" value={REMIT_RECEIVER.boutique} />
        <CopyRow label="Ville" value={REMIT_RECEIVER.city} />
        <CopyRow label="Pays" value={REMIT_RECEIVER.country} />
        <CopyRow
          label="WhatsApp (nom du retrait, privé)"
          value={REMIT_RECEIVER.phone.replace(/\s/g, "")}
          display={formatTogoPhone(REMIT_RECEIVER.phone)}
        />

        <ol className="mt-6 space-y-5">
          <li>
            <p className="text-[11px] font-semibold tabular-nums text-primary">01 · WhatsApp d’abord</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Écris au {formatTogoPhone(BRAND.whatsapp)} pour le nom d’identité.
              Il n’est pas sur le site.
            </p>
          </li>
          <li>
            <p className="text-[11px] font-semibold tabular-nums text-primary">02 · Agence</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Pays Togo, ville Lomé, montant exact de la commande. Frais d’envoi
              à ta charge.
            </p>
          </li>
          <li>
            <p className="text-[11px] font-semibold tabular-nums text-primary">03 · Preuve</p>
            <p className="mt-1 text-sm text-muted-foreground">
              MTCN / PIN + capture + confirmation d’achat sur WhatsApp.
            </p>
          </li>
        </ol>

        <h2 className="mt-10 font-display text-2xl">Tarifs Western Union Togo</h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
          {WU_NOTES.map((n) => (
            <li key={n.slice(0, 24)}>{n}</li>
          ))}
        </ul>

        <div className="mt-5 overflow-x-auto ring-1 ring-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Montant (F CFA)</th>
                <th className="px-3 py-2 font-medium">Frais envoi Togo→UEMOA</th>
              </tr>
            </thead>
            <tbody>
              {WU_TOGO_UEMOA.map((r) => (
                <tr key={r.range} className="border-t border-border">
                  <td className="px-3 py-2 tabular-nums">{r.range}</td>
                  <td className="px-3 py-2 tabular-nums">{r.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Source : {WU_TOGO.operator}. Service WU Togo {WU_TOGO.support}.{" "}
          <a href={WU_TOGO.site} className="text-primary" target="_blank" rel="noreferrer">
            westernunion.com/tg
          </a>
          {" · "}
          <a href={WU_TOGO.locator} className="text-primary" target="_blank" rel="noreferrer">
            Points de vente
          </a>
          .
        </p>

        <PaymentNb className="mt-6" />

        <p className="mt-8 text-xs text-muted-foreground">
          <Link to="/mobile-money" className="text-primary">
            Flooz et Mixx au Togo
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
