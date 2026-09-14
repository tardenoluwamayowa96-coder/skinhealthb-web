import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { CitySelect } from "@/components/city-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useCart } from "@/lib/cart-store";
import { BRAND } from "@/lib/brand";
import { formatTogoPhone, formatXof } from "@/lib/format";
import {
  checkoutNetworks,
  DEFAULT_MERCHANT,
  isRemotePay,
  merchantFromSettings,
  type PaymentNetwork,
} from "@/lib/payments";
import { PayLogo } from "@/components/pay-logo";
import { PaymentNb } from "@/components/payment-nb";
import { ShipLogo } from "@/components/ship-logo";
import { getPublicSettings, productsByIds } from "@/lib/server/catalog";
import { createOrder } from "@/lib/server/orders";
import { listMyAddresses } from "@/lib/server/profile";
import type { ProductCard } from "@/lib/types";
import {
  carrierById,
  carrierEta,
  carrierFee,
  carriersForZone,
  type CarrierId,
} from "@/lib/shipping";
import { FREE_SHIPPING_LOME, isIntlZone, zoneById } from "@/lib/zones";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/commande")({ component: Commande });

function Commande() {
  const { user, isPending } = useCurrentUserState();
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductCard[]>([]);
  const [recipient, setRecipient] = useState("");
  const [phone, setPhone] = useState("");
  const [zone, setZone] = useState("lome");
  const [city, setCity] = useState("Lomé");
  const [carrierId, setCarrierId] = useState<CarrierId>("nagode");
  const [details, setDetails] = useState("");
  const [notes, setNotes] = useState("");
  const [network, setNetwork] = useState<PaymentNetwork>("FLOOZ");
  const [payPhone, setPayPhone] = useState("");
  const [saveAddr, setSaveAddr] = useState(true);
  const [busy, setBusy] = useState(false);
  const [merchant, setMerchant] = useState(DEFAULT_MERCHANT);

  useEffect(() => {
    const ids = items.map((i) => i.productId);
    if (ids.length) productsByIds({ data: ids }).then(setProducts).catch(() => {});
  }, [items]);

  useEffect(() => {
    getPublicSettings()
      .then((s) => setMerchant(merchantFromSettings(s)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!user) return;
    listMyAddresses()
      .then((rows) => {
        const d = rows.find((a) => a.is_default) ?? rows[0];
        if (!d) return;
        setRecipient(d.recipient);
        setPhone(d.phone);
        setZone(d.zone);
        setCity(d.city);
        setDetails(d.details);
      })
      .catch(() => {});
  }, [user]);

  const lines = useMemo(
    () =>
      items
        .map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return product ? { item, product } : null;
        })
        .filter(Boolean) as { item: (typeof items)[0]; product: ProductCard }[],
    [items, products],
  );
  const subtotal = lines.reduce((n, l) => n + l.product.price_xof * l.item.qty, 0);
  const options = carriersForZone(zone);
  const carrier = carrierById(
    options.some((c) => c.id === carrierId) ? carrierId : options[0]?.id,
  );
  const ship = carrierFee(carrier.id, zone, subtotal);
  const total = subtotal + ship;
  const zoneMeta = zoneById(zone);
  const intl = isIntlZone(zone);
  const payOptions = checkoutNetworks(intl);
  const networkSafe = payOptions.includes(network) ? network : payOptions[0];
  const selected = merchant[networkSafe];

  useEffect(() => {
    if (intl) {
      setNetwork((n) => (checkoutNetworks(true).includes(n) ? n : "WESTERN_UNION"));
    } else {
      setNetwork((n) => (isRemotePay(n) ? "FLOOZ" : n));
    }
  }, [intl]);

  if (isPending) return <div className="h-40 animate-pulse bg-surface-2" />;
  if (!user) return <RedirectToSignIn />;
  if (!items.length) return <Navigate to="/panier" />;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await createOrder({
        data: {
          items: items.map((i) => ({ productId: i.productId, qty: i.qty })),
          recipient,
          phone,
          zone,
          city,
          address_details: details,
          notes: notes || undefined,
          payment_network: networkSafe,
          payment_phone: isRemotePay(networkSafe)
            ? undefined
            : payPhone || (intl ? "" : phone),
          save_address: saveAddr,
          carrier_id: carrier.id,
        },
      });
      clear();
      toast.success("Commande créée — envoyez le transfert");
      void navigate({
        to: "/paiement/$ref",
        params: { ref: res.public_ref },
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Commande impossible");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="mx-auto grid max-w-6xl gap-10 px-4 py-8 md:grid-cols-[1fr_320px]"
    >
      <div>
        <h1 className="font-display text-4xl">Livraison et paiement</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Togo : Nagode, Poste, Gozem ou retrait. Bénin, Côte d’Ivoire, Sénégal
          : La Poste. Togo = Flooz / Mixx. Hors Togo = Western Union, Ria,
          MoneyGram.
        </p>
        <div className="mt-8 space-y-4">
          <Field label="Destinataire">
            <Input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </Field>
          <Field label="Téléphone destinataire">
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={intl ? "Numéro local (Bénin, CI, Sénégal)" : "90 00 00 00"}
              required
            />
          </Field>
          <CitySelect
            value={city}
            onChange={(c) => {
              setCity(c.name);
              setZone(c.zone);
              const next = carriersForZone(c.zone);
              if (!next.some((x) => x.id === carrierId)) {
                setCarrierId(next[0]?.id ?? "nagode");
              }
            }}
          />
          <Field label="Adresse détaillée">
            <Input
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Rue, repère, immeuble…"
              required
            />
          </Field>
          <Field label="Note (optionnel)">
            <Input value={notes} onChange={(e) => setNotes(e.target.value)} />
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={saveAddr}
              onChange={(e) => setSaveAddr(e.target.checked)}
            />
            Enregistrer cette adresse
          </label>
        </div>

        <div className="mt-8 space-y-2">
          <p className="text-sm font-semibold">Transporteur</p>
          <div className="grid gap-2">
            {options.map((c) => {
              const fee = carrierFee(c.id, zone, subtotal);
              const active = carrier.id === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCarrierId(c.id)}
                  className={cn(
                    "flex items-center gap-3 border px-3 py-3 text-left",
                    active ? "border-primary bg-card" : "border-border bg-transparent",
                  )}
                >
                  <ShipLogo
                    carrierId={c.id}
                    className="h-8 max-w-[120px] shrink-0"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">{c.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {c.blurb} {carrierEta(c.id, zone)}.
                    </span>
                  </span>
                  <span className="text-sm tabular-nums">
                    {fee === 0 ? "Gratuit" : formatXof(fee)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4 rounded-lg border border-border bg-card p-4">
          <ShipLogo carrierId={carrier.id} className="h-12 max-w-[180px] shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-semibold">Expédition {carrier.name}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
              {carrier.blurb}
              {zoneMeta ? ` Délai ${carrierEta(carrier.id, zone)}.` : ""} Suivi
              dès le dépôt.
            </p>
          </div>
        </div>
        {intl ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Colis La Poste. Douane possible à l’arrivée. Paiement : Western
            Union, Ria ou MoneyGram — ou Flooz / Mixx si un proche paie
            au Togo.
          </p>
        ) : null}

        <h2 className="mt-10 font-display text-2xl">Paiement</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {intl ? (
            <>
              Hors Togo : Western Union, Ria ou MoneyGram. Aucun nom
              personnel n’est publié.{" "}
              <Link to="/guide-remise" className="text-primary">
                Guide envoi international
              </Link>
              .
            </>
          ) : (
            <>
              Flooz ou Mixx by Yas seulement.{" "}
              <Link to="/guide-mixx" className="text-primary">
                Comment payer avec Mixx
              </Link>
              .
            </>
          )}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {payOptions.map((id) => {
            const n = merchant[id];
            return (
              <button
                key={id}
                type="button"
                onClick={() => setNetwork(id)}
                className={cn(
                  "rounded-lg border px-4 py-4 text-left",
                  networkSafe === id
                    ? "border-primary bg-surface"
                    : "border-border",
                )}
              >
                <PayLogo network={n} className="mb-3 h-10 max-w-[160px]" />
                <p className="font-semibold">{n.label}</p>
                <p className="text-xs text-muted-foreground">{n.operator}</p>
                <p className="mt-2 text-sm font-medium tabular-nums">
                  {n.kind === "remit"
                    ? "Retrait Lomé"
                    : formatTogoPhone(n.phone)}
                </p>
              </button>
            );
          })}
        </div>
        {selected.kind === "remit" ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Boutique {BRAND.name}, {BRAND.receiverCity}. Le nom d’identité pour
            le retrait n’est pas affiché — il se donne uniquement par WhatsApp.
          </p>
        ) : (
          <>
            <p className="mt-3 text-xs text-muted-foreground">
              Numéro boutique {selected.label} :{" "}
              <span className="font-medium text-fg tabular-nums">
                {formatTogoPhone(selected.phone)}
              </span>
            </p>
            <Field label="Numéro depuis lequel vous envoyez" className="mt-4">
              <Input
                value={payPhone}
                onChange={(e) => setPayPhone(e.target.value)}
                placeholder={phone || "90 00 00 00"}
                required={intl}
              />
            </Field>
          </>
        )}
        <PaymentNb className="mt-4" />
      </div>

      <aside className="h-fit rounded-xl bg-card p-5 shadow-[var(--shadow-soft)]">
        <p className="text-sm font-semibold">Récapitulatif</p>
        <ul className="mt-3 space-y-2 text-sm">
          {lines.map(({ item, product }) => (
            <li key={product.id} className="flex justify-between gap-3">
              <span className="line-clamp-1">
                {item.qty} × {product.name}
              </span>
              <span className="tabular-nums">
                {formatXof(product.price_xof * item.qty)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-1 border-t border-border pt-3 text-sm">
          <Row label="Sous-total" value={formatXof(subtotal)} />
          <Row
            label={zoneMeta ? `${carrier.short} · ${zoneMeta.name}` : "Livraison"}
            value={ship === 0 ? "Offerte" : formatXof(ship)}
          />
          {zone === "lome" && subtotal < FREE_SHIPPING_LOME ? (
            <p className="text-xs text-muted-foreground">
              Livraison offerte à Lomé dès {formatXof(FREE_SHIPPING_LOME)}.
            </p>
          ) : null}
          <Row label="Total" value={formatXof(total)} strong />
        </div>
        <Button type="submit" className="mt-5 w-full" disabled={busy}>
          {busy ? "Création…" : "Confirmer la commande"}
        </Button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          En confirmant, vous acceptez les{" "}
          <Link to="/mentions/cgv" className="underline">
            CGV
          </Link>
          .
        </p>
      </aside>
    </form>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className={cn("flex justify-between", strong && "font-semibold")}>
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
