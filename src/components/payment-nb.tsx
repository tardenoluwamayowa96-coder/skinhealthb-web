import { Link } from "@tanstack/react-router";
import { BRAND } from "@/lib/brand";
import { formatTogoPhone } from "@/lib/format";
import { DEFAULT_MERCHANT } from "@/lib/payments";
import { cn } from "@/lib/utils";

export function PaymentNb({ className }: { className?: string }) {
  return (
    <aside className={cn("border border-border bg-surface-2 p-4 text-sm", className)}>
      <p className="font-semibold text-fg">NB — preuve de paiement</p>
      <p className="mt-2 tabular-nums">
        Flooz {formatTogoPhone(DEFAULT_MERCHANT.FLOOZ.phone)}
        <span className="mx-2 text-muted-foreground">·</span>
        Mixx by Yas {formatTogoPhone(DEFAULT_MERCHANT.TMONEY.phone)}
      </p>
      <p className="mt-2 leading-relaxed text-muted-foreground">
        Après le transfert, envoyez sur WhatsApp {formatTogoPhone(BRAND.whatsapp)} :
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-4 text-muted-foreground">
        <li>la capture d’écran du paiement (application ou USSD) ;</li>
        <li>la confirmation d’achat (reçu ou SMS opérateur).</li>
      </ul>
      <p className="mt-2 text-xs text-muted-foreground">
        Hors Togo : Western Union, Ria ou MoneyGram (nom par WhatsApp). Sans
        preuve, la commande reste en attente.{" "}
        <Link to="/guide-mixx" className="text-primary">
          Guide Mixx
        </Link>
        {" · "}
        <Link to="/guide-flooz" className="text-primary">
          Guide Flooz
        </Link>
        {" · "}
        <Link to="/guide-remise" className="text-primary">
          Envoi international
        </Link>
        {" · "}
        <Link to="/mobile-money" className="text-primary">
          Autres services
        </Link>
        .
      </p>
    </aside>
  );
}
