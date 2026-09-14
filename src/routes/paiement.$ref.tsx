import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { CopyRow } from "@/components/copy-row";
import { PayLogo } from "@/components/pay-logo";
import { Button } from "@/components/ui/button";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { BRAND } from "@/lib/brand";
import { formatTogoPhone, formatXof } from "@/lib/format";
import { PaymentNb } from "@/components/payment-nb";
import { PayNumbers } from "@/components/pay-numbers";
import {
  DEFAULT_MERCHANT,
  isRemit,
  merchantFromSettings,
  paymentProofWhatsApp,
  REMIT_RECEIVER,
  telUssd,
  ussdMenu,
  ussdTransfer,
  type PaymentNetwork,
} from "@/lib/payments";
import { getPublicSettings } from "@/lib/server/catalog";
import { getMyOrder, markTransferSent } from "@/lib/server/orders";

export const Route = createFileRoute("/paiement/$ref")({
  component: Paiement,
});

function Paiement() {
  const { ref } = Route.useParams();
  const { user, isPending } = useCurrentUserState();
  const [total, setTotal] = useState(0);
  const [network, setNetwork] = useState<PaymentNetwork>("FLOOZ");
  const [status, setStatus] = useState("pending_payment");
  const [payStatus, setPayStatus] = useState("pending");
  const [busy, setBusy] = useState(false);
  const [merchant, setMerchant] = useState(DEFAULT_MERCHANT);

  useEffect(() => {
    getPublicSettings()
      .then((s) => setMerchant(merchantFromSettings(s)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!user) return;
    getMyOrder({ data: ref })
      .then((d) => {
        if (!d) return;
        setTotal(d.order.total_xof);
        setNetwork((d.order.payment_network as PaymentNetwork) || "FLOOZ");
        setStatus(d.order.status);
        setPayStatus(d.order.payment_status);
      })
      .catch(() => {});
  }, [user, ref]);

  const net = merchant[network] ?? merchant.FLOOZ;
  const remit = isRemit(network);
  const ussd = useMemo(
    () =>
      remit || !total
        ? ussdMenu(network)
        : ussdTransfer(network, net.phone, total),
    [network, net.phone, total, remit],
  );
  const proofUrl = paymentProofWhatsApp({
    ref,
    amount: total,
    networkLabel: net.label,
    remit,
  });

  if (isPending) return <div className="h-40 animate-pulse bg-surface-2" />;
  if (!user) return <RedirectToSignIn />;

  const paid = status !== "pending_payment";
  const waiting = !paid && payStatus === "transferred";

  async function confirmSent() {
    setBusy(true);
    try {
      await markTransferSent({ data: ref });
      setPayStatus("transferred");
      toast.success("Transfert signalé — envoyez la capture WhatsApp");
      window.open(proofUrl, "_blank", "noopener,noreferrer");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Échec");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <PayLogo network={net} className="h-12 max-w-[200px]" />
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
        {net.label} · {net.operator}
      </p>
      <h1 className="mt-2 font-display text-4xl">
        {paid ? "Paiement confirmé" : waiting ? "Transfert en cours" : "Envoyer le paiement"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Commande {ref} · {formatXof(total)}
      </p>

      {paid ? (
        <div className="mt-8 rounded-xl bg-card p-6 shadow-[var(--shadow-soft)]">
          <p className="text-sm leading-relaxed">
            Merci. Le paiement est reçu. La commande passe en préparation.
          </p>
          <Button asChild className="mt-6 w-full">
            <Link to="/commandes/$ref" params={{ ref }}>
              Suivre la commande
            </Link>
          </Button>
        </div>
      ) : waiting ? (
        <div className="mt-8 rounded-xl border border-gold/40 bg-card p-6 shadow-[var(--shadow-soft)]">
          <p className="text-sm leading-relaxed">
            Vous avez signalé le transfert {net.label}. Envoyez maintenant la
            capture d’écran et la confirmation d’achat sur WhatsApp{" "}
            {formatTogoPhone(BRAND.whatsapp)}. Dès réception de{" "}
            <strong className="tabular-nums">{formatXof(total)}</strong>
            {remit ? (
              <>
                {" "}
                via {net.label} (retrait Lomé)
              </>
            ) : (
              <>
                {" "}
                sur{" "}
                <strong className="tabular-nums">{formatTogoPhone(net.phone)}</strong>
              </>
            )}
            , nous validons.
          </p>
          <Button asChild className="mt-6 w-full">
            <a href={proofUrl} target="_blank" rel="noreferrer">
              Envoyer capture et confirmation
            </a>
          </Button>
          <Button asChild variant="outline" className="mt-2 w-full">
            <Link to="/commandes/$ref" params={{ ref }}>
              Voir la commande
            </Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 space-y-3 rounded-xl border border-gold/40 bg-card p-6 shadow-[var(--shadow-soft)]">
          {remit ? (
            <>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Envoyez {formatXof(total)} par {net.label} vers Lomé, Togo.
                Le nom d’identité n’est pas publié : demande-le sur WhatsApp
                avant l’agence, puis envoie le MTCN.
              </p>
              <CopyRow label="Boutique" value={REMIT_RECEIVER.boutique} />
              <CopyRow label="Ville" value={`${REMIT_RECEIVER.city}, ${REMIT_RECEIVER.country}`} />
              <CopyRow
                label="WhatsApp (nom du retrait)"
                value={REMIT_RECEIVER.phone.replace(/\s/g, "")}
                display={formatTogoPhone(REMIT_RECEIVER.phone)}
              />
              <CopyRow label="Montant exact" value={String(Math.round(total))} display={formatXof(total)} />
              <CopyRow label="Référence commande" value={ref} />
              <ol className="mt-4 list-decimal space-y-1.5 pl-5 text-sm text-muted-foreground">
                <li>WhatsApp : demander le nom d’identité (non affiché ici).</li>
                <li>Agence {net.label} : Togo · Lomé.</li>
                <li>Code MTCN / PIN + capture WhatsApp.</li>
              </ol>
            </>
          ) : (
            <>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Payez {formatXof(total)} par {net.label} au numéro Skinhealthb.
                Indiquez {ref} dans le motif.
              </p>
              <PayNumbers merchant={merchant} />
              <CopyRow label="Montant exact" value={String(Math.round(total))} display={formatXof(total)} />
              <CopyRow label="Référence à indiquer" value={ref} />
              <CopyRow label="Code USSD" value={ussd} />
              <ol className="mt-4 list-decimal space-y-1.5 pl-5 text-sm text-muted-foreground">
                <li>
                  Ouvrez {net.label} ({ussdMenu(network)}) ou l’application.
                  {network === "TMONEY" ? " Transfert Mixx : *145*1#." : ""}
                </li>
                <li>Transférez le montant exact au numéro ci-dessus.</li>
                <li>Envoyez la capture et la confirmation d’achat sur WhatsApp.</li>
              </ol>
            </>
          )}

          <PaymentNb className="mt-4" />

          {!remit && ussd ? (
            <Button asChild variant="outline" className="mt-2 w-full">
              <a href={telUssd(ussd)}>Composer {ussd}</a>
            </Button>
          ) : null}
          <Button asChild variant="outline" className="w-full">
            <Link to="/guide-remise">Western Union · Ria · MoneyGram</Link>
          </Button>
          {!remit ? (
            <>
              <Button asChild variant="outline" className="w-full">
                <Link to="/guide-mixx">Guide Mixx by Yas</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/guide-flooz">Guide Flooz</Link>
              </Button>
            </>
          ) : null}
          <Button asChild variant="outline" className="w-full">
            <a href={proofUrl} target="_blank" rel="noreferrer">
              WhatsApp — captures et confirmation
            </a>
          </Button>
          <Button className="w-full" onClick={confirmSent} disabled={busy}>
            {busy ? "Envoi…" : remit ? "J’ai envoyé — transmettre le MTCN" : "J’ai transféré — envoyer la capture"}
          </Button>
        </div>
      )}
    </div>
  );
}
