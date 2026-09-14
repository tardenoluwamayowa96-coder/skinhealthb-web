import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SocialFollowCards } from "@/components/social";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getPublicSettings } from "@/lib/server/catalog";
import { sendMessage } from "@/lib/server/profile";
import { BRAND } from "@/lib/brand";
import { formatTogoPhone, phoneDigits } from "@/lib/format";
import { DEFAULT_MERCHANT, merchantFromSettings } from "@/lib/payments";
import { PayLogo } from "@/components/pay-logo";

export const Route = createFileRoute("/assistance")({ component: Assistance });

function Assistance() {
  const [whatsapp, setWhatsapp] = useState("");
  const [storeEmail, setStoreEmail] = useState<string>(BRAND.email);
  const [merchant, setMerchant] = useState(DEFAULT_MERCHANT);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getPublicSettings()
      .then((s) => {
        setWhatsapp(s.whatsapp);
        setStoreEmail(s.store_email || BRAND.email);
        setMerchant(merchantFromSettings(s));
      })
      .catch(() => {});
  }, []);

  const wa = phoneDigits(whatsapp);

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
        Service client
      </p>
      <h1 className="mt-2 font-display text-4xl">Assistance</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Une question sur un lot, une livraison ou une routine ? Écrivez-nous —
        une équipe basée au Togo vous répond. Instagram et TikTok @skinhealthb.
      </p>

      {wa && (
        <Button asChild className="mt-6 w-full" variant="gold">
          <a href={`https://wa.me/${wa.startsWith("228") ? wa : `228${wa}`}`} target="_blank" rel="noreferrer">
            Discuter sur WhatsApp
          </a>
        </Button>
      )}

      <Button asChild className={`w-full ${wa ? "mt-3" : "mt-6"}`} variant={wa ? "outline" : "gold"}>
        <a href={`mailto:${storeEmail}`}>
          Écrire à {storeEmail}
        </a>
      </Button>

      <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
        <a
          href={`tel:${merchant.FLOOZ.phone}`}
          className="rounded-lg bg-card p-4"
        >
          <PayLogo network={merchant.FLOOZ} className="mb-2 h-10 max-w-[88px]" />
          <p className="text-xs text-muted-foreground">Flooz · Moov</p>
          <p className="mt-1 font-medium tabular-nums">
            {formatTogoPhone(merchant.FLOOZ.phone)}
          </p>
        </a>
        <a
          href={`tel:${merchant.TMONEY.phone}`}
          className="rounded-lg bg-card p-4"
        >
          <PayLogo network={merchant.TMONEY} className="mb-2 h-8 max-w-[140px]" />
          <p className="text-xs text-muted-foreground">Mixx by Yas · Yas</p>
          <p className="mt-1 font-medium tabular-nums">
            {formatTogoPhone(merchant.TMONEY.phone)}
          </p>
        </a>
      </div>

      <p className="mt-3 text-sm">
        <Link to="/guide-mixx" className="text-primary">
          Guide Mixx by Yas — *145*1#
        </Link>
      </p>

      <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        Nous suivre
      </p>
      <SocialFollowCards className="mt-3" />

      <form
        className="mt-8 space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          try {
            await sendMessage({ data: { name, phone, email, body } });
            setBody("");
            toast.success("Message envoyé");
          } catch (err) {
            toast.error(err instanceof Error ? err.message : "Envoi impossible");
          } finally {
            setBusy(false);
          }
        }}
      >
        <div className="space-y-1.5">
          <Label>Nom</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="space-y-1.5">
          <Label>Téléphone</Label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>E-mail</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Message</Label>
          <Textarea value={body} onChange={(e) => setBody(e.target.value)} required />
        </div>
        <Button type="submit" disabled={busy}>
          {busy ? "Envoi…" : "Envoyer"}
        </Button>
      </form>
    </div>
  );
}
