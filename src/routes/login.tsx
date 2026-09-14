import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { SocialLinks } from "@/components/social";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  GROK_PROVIDERS,
  authClient,
  authEnabled,
  signIn,
} from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { BRAND, isAdminEmail } from "@/lib/brand";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { user, isPending } = useCurrentUserState();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (isPending) {
    return (
      <div className="grid min-h-[70vh] place-items-center">
        <Logo variant="stacked-sm" className="h-24 opacity-80" priority />
      </div>
    );
  }
  if (user) return <Navigate to="/compte" />;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "up") {
        const res = await authClient.signUp.email({ email, password, name });
        if (res.error) throw new Error(res.error.message ?? "Inscription impossible");
      } else {
        const res = await authClient.signIn.email({ email, password });
        if (res.error) throw new Error(res.error.message ?? "Connexion impossible");
      }
      window.location.href = isAdminEmail(email) ? "/admin" : "/compte";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-12">
      <Link to="/" className="mb-8 flex justify-center" aria-label={BRAND.name}>
        <Logo variant="stacked" className="h-32 sm:h-40" priority />
      </Link>
      <h1 className="font-display text-4xl">
        {mode === "in" ? "Connexion" : "Créer un compte"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Commandes, favoris et suivi. Espace boutique : connectez-vous avec{" "}
        {BRAND.email}.
      </p>

      {authEnabled ? (
        <div className="mt-8 space-y-3">
          {GROK_PROVIDERS.map((p) => (
            <Button
              key={p.providerId}
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => signIn(p.providerId, { callbackURL: "/admin" })}
            >
              Continuer avec {p.label}
            </Button>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-sm text-muted-foreground">
          Connexion temporairement indisponible.
        </p>
      )}

      <div className="my-8 flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        ou par e-mail
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {mode === "up" && (
          <div className="space-y-1.5">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div className="space-y-1.5">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            autoComplete={mode === "up" ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? "Veuillez patienter…" : mode === "in" ? "Se connecter" : "S’inscrire"}
        </Button>
      </form>
      <button
        type="button"
        className="mt-4 text-sm text-muted-foreground underline-offset-4 hover:underline"
        onClick={() => setMode(mode === "in" ? "up" : "in")}
      >
        {mode === "in"
          ? "Pas encore de compte ? Créer un compte"
          : "Déjà inscrite ? Se connecter"}
      </button>
      <SocialLinks className="mt-10 justify-center text-muted-foreground" />
    </main>
  );
}
