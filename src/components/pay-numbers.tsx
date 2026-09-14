import { CopyRow } from "@/components/copy-row";
import { PayLogo } from "@/components/pay-logo";
import { formatTogoPhone } from "@/lib/format";
import {
  DEFAULT_MERCHANT,
  type MerchantNetwork,
  type PaymentNetwork,
} from "@/lib/payments";

export function PayNumbers({
  merchant = DEFAULT_MERCHANT,
}: {
  merchant?: Record<PaymentNetwork, MerchantNetwork>;
}) {
  return (
    <div className="grid gap-px overflow-hidden ring-1 ring-border sm:grid-cols-2">
      {(["FLOOZ", "TMONEY"] as const).map((id) => {
        const n = merchant[id];
        return (
          <div key={id} className="bg-card p-4">
            <PayLogo network={n} className="h-9 max-w-[140px]" />
            <CopyRow
              className="mt-3 rounded-none bg-secondary"
              label={`Transfert ${n.label}`}
              value={n.phone.replace(/\s/g, "")}
              display={formatTogoPhone(n.phone)}
            />
          </div>
        );
      })}
    </div>
  );
}
