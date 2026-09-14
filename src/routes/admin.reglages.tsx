import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminBar } from "@/components/admin-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { adminGetSettings, adminSaveSettings } from "@/lib/server/admin";
import { getMyProfile } from "@/lib/server/profile";

export const Route = createFileRoute("/admin/reglages")({
  component: AdminReglages,
});

function AdminReglages() {
  const { user, isPending } = useCurrentUserState();
  const [ok, setOk] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [whatsapp, setWhatsapp] = useState("+22892907501");
  const [storePhone, setStorePhone] = useState("");
  const [storeEmail, setStoreEmail] = useState("skinhealth63@gmail.com");
  const [flooz, setFlooz] = useState("+22896836021");
  const [tmoney, setTmoney] = useState("+22892907501");
  const [testMode, setTestMode] = useState(true);
  const [token, setToken] = useState("");
  const [tokenSet, setTokenSet] = useState(false);
  const [masked, setMasked] = useState("");

  useEffect(() => {
    if (!user) return;
    getMyProfile().then(async (p) => {
      if (p.role !== "admin") return;
      setOk(true);
      const s = await adminGetSettings();
      setAnnouncement(s.announcement);
      setWhatsapp(s.whatsapp);
      setStorePhone(s.store_phone);
      setStoreEmail(s.store_email);
      setFlooz(s.flooz_number);
      setTmoney(s.tmoney_number);
      setTestMode(s.paygate_test_mode);
      setTokenSet(s.paygate_token_set);
      setMasked(s.paygate_token_masked);
    });
  }, [user]);

  if (isPending) return <div className="h-32 animate-pulse bg-surface-2" />;
  if (!user) return <RedirectToSignIn />;
  if (!ok) return <p className="p-8 text-sm">Accès refusé.</p>;

  return (
    <div>
      <AdminBar />
      <div className="mx-auto max-w-xl px-4 py-8">
        <h1 className="font-display text-4xl">Réglages</h1>
        <form
          className="mt-8 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await adminSaveSettings({
                data: {
                  announcement,
                  whatsapp,
                  store_phone: storePhone,
                  store_email: storeEmail,
                  flooz_number: flooz,
                  tmoney_number: tmoney,
                  paygate_test_mode: testMode,
                  paygate_auth_token: token || undefined,
                },
              });
              toast.success("Réglages enregistrés");
              setToken("");
            } catch (err) {
              toast.error(err instanceof Error ? err.message : "Erreur");
            }
          }}
        >
          <div className="space-y-1.5">
            <Label>Bandeau d’accueil</Label>
            <Input
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label>WhatsApp (indicatif 228…)</Label>
            <Input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Téléphone boutique</Label>
            <Input
              value={storePhone}
              onChange={(e) => setStorePhone(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label>E-mail boutique</Label>
            <Input
              type="email"
              value={storeEmail}
              onChange={(e) => setStoreEmail(e.target.value)}
              placeholder="skinhealth63@gmail.com"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Numéro Flooz (Moov)</Label>
            <Input
              value={flooz}
              onChange={(e) => setFlooz(e.target.value)}
              placeholder="+228 96 83 60 21"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Numéro Mixx by Yas (ex-TMoney)</Label>
            <Input
              value={tmoney}
              onChange={(e) => setTmoney(e.target.value)}
              placeholder="+228 92 90 75 01"
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={testMode}
              onChange={(e) => setTestMode(e.target.checked)}
            />
            Mode test PayGate (aucun débit réel)
          </label>
          <div className="space-y-1.5">
            <Label>Jeton PayGate (auth_token)</Label>
            <Input
              type="password"
              autoComplete="off"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder={tokenSet ? masked : "Coller le jeton marchand"}
            />
            <p className="text-xs text-muted-foreground">
              Conservé uniquement côté serveur. Laissez vide pour ne pas
              remplacer le jeton actuel.
            </p>
          </div>
          <Button type="submit">Enregistrer</Button>
        </form>
        <p className="mt-8 text-sm">
          <Link to="/admin/environnement" className="text-gold">
            État des variables d’environnement →
          </Link>
        </p>
      </div>
    </div>
  );
}
