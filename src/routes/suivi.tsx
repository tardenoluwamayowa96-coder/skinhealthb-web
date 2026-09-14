import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShipLogo } from "@/components/ship-logo";
import { CARRIER } from "@/lib/shipping";

export const Route = createFileRoute("/suivi")({
  component: SuiviHome,
});

function SuiviHome() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const c = code.trim().toUpperCase();
    if (!c) return;
    void navigate({ to: "/suivi/$code", params: { code: c } });
  };

  return (
    <article className="mx-auto max-w-lg px-4 py-10">
      <ShipLogo className="h-10 max-w-[160px]" />
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
        {CARRIER.name}
      </p>
      <h1 className="mt-1 font-display text-4xl">Suivi de colis</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Code NGD- (Nagode), LPT- (Poste), GZM- (Gozem) ou RET- (retrait).
      </p>
      <form onSubmit={onSubmit} className="mt-6 flex gap-2">
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="NGD-…"
          className="flex-1"
          aria-label="Code de suivi"
        />
        <Button type="submit">Suivre</Button>
      </form>
    </article>
  );
}
