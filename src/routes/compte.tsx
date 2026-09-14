import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CitySelect } from "@/components/city-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUser, useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  getMyProfile,
  listMyAddresses,
  saveAddress,
  deleteAddress,
  type Address,
} from "@/lib/server/profile";
import { SocialFollowCards } from "@/components/social";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/compte")({ component: Compte });

function Compte() {
  const { user, isPending } = useCurrentUserState();
  const display = useCurrentUser();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("customer");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [form, setForm] = useState({
    recipient: "",
    phone: "",
    zone: "lome",
    city: "Lomé",
    details: "",
  });

  useEffect(() => {
    if (!user) return;
    getMyProfile()
      .then((p) => {
        setName(p.full_name ?? display?.displayName ?? "");
        setPhone(p.phone ?? "");
        setRole(p.role);
      })
      .catch(() => {});
    listMyAddresses().then(setAddresses).catch(() => {});
  }, [user, display]);

  if (isPending) return <div className="h-40 animate-pulse bg-surface-2" />;
  if (!user) return <RedirectToSignIn />;

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="font-display text-4xl">Mon compte</h1>
      <p className="mt-1 text-sm text-muted-foreground">{display?.primaryEmail}</p>
      {role === "admin" && (
        <Button asChild className="mt-4">
          <Link to="/admin">Ouvrir l’espace administrateur</Link>
        </Button>
      )}

      <div className="mt-8 space-y-3">
        <div className="space-y-1.5">
          <Label>Nom</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Téléphone</Label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <Button
          type="button"
          onClick={async () => {
            try {
              const { updateMyProfile } = await import("@/lib/server/profile");
              await updateMyProfile({ data: { full_name: name, phone } });
              toast.success("Profil enregistré");
            } catch (e) {
              toast.error(e instanceof Error ? e.message : "Erreur");
            }
          }}
        >
          Enregistrer
        </Button>
      </div>

      <div className="mt-6 flex gap-3 text-sm">
        <Link to="/commandes" className="underline-offset-4 hover:underline">
          Mes commandes
        </Link>
        <Link to="/favoris" className="underline-offset-4 hover:underline">
          Favoris
        </Link>
      </div>

      <h2 className="mt-12 font-display text-2xl">Adresses</h2>
      <ul className="mt-4 space-y-3">
        {addresses.map((a) => (
          <li key={a.id} className="rounded-lg bg-card p-4 text-sm">
            <p className="font-medium">
              {a.recipient} {a.is_default ? "· par défaut" : ""}
            </p>
            <p className="text-muted-foreground">
              {a.details}, {a.city} · {a.phone}
            </p>
            <button
              type="button"
              className="mt-2 text-xs text-destructive"
              onClick={async () => {
                await deleteAddress({ data: a.id });
                setAddresses((prev) => prev.filter((x) => x.id !== a.id));
              }}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      <form
        className="mt-6 space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await saveAddress({
              data: { ...form, is_default: addresses.length === 0 },
            });
            const rows = await listMyAddresses();
            setAddresses(rows);
            toast.success("Adresse ajoutée");
          } catch (err) {
            toast.error(err instanceof Error ? err.message : "Erreur");
          }
        }}
      >
        <p className="text-sm font-medium">Nouvelle adresse</p>
        <Input
          placeholder="Destinataire"
          value={form.recipient}
          onChange={(e) => setForm({ ...form, recipient: e.target.value })}
          required
        />
        <Input
          placeholder="Téléphone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
        <CitySelect
          value={form.city}
          onChange={(c) => setForm({ ...form, city: c.name, zone: c.zone })}
        />
        <Input
          placeholder="Détails"
          value={form.details}
          onChange={(e) => setForm({ ...form, details: e.target.value })}
          required
        />
        <Button type="submit" variant="outline">
          Ajouter l’adresse
        </Button>
      </form>

      <h2 className="mt-12 font-display text-2xl">Nous suivre</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Instagram et TikTok {BRAND.instagramHandle}
      </p>
      <SocialFollowCards className="mt-4" />
    </div>
  );
}
