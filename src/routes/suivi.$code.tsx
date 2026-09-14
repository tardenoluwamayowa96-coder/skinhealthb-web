import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShipLogo } from "@/components/ship-logo";
import { getNagodeTracking } from "@/lib/server/nagode";
import { nagodeStatusLabel } from "@/lib/nagode";
import { formatDate } from "@/lib/format";
import { statusLabel, zoneById } from "@/lib/zones";
import { carrierById } from "@/lib/shipping";

export const Route = createFileRoute("/suivi/$code")({
  component: Suivi,
});

function Suivi() {
  const { code } = Route.useParams();
  const [data, setData] = useState<
    Awaited<ReturnType<typeof getNagodeTracking>> | null | undefined
  >(undefined);

  useEffect(() => {
    getNagodeTracking({ data: code })
      .then(setData)
      .catch(() => setData(null));
  }, [code]);

  if (data === undefined) {
    return <div className="h-40 animate-pulse bg-surface-2" />;
  }

  if (!data) {
    return (
      <article className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="font-display text-3xl">Suivi introuvable</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Vérifie le code NGD-… sur le bordereau Nagode.
        </p>
        <Link to="/assistance" className="mt-6 inline-block text-sm text-primary">
          Assistance
        </Link>
      </article>
    );
  }

  const zone = zoneById(data.zone);
  const carrier = carrierById(
    data.tracking.startsWith("LPT-")
      ? "poste"
      : data.tracking.startsWith("GZM-")
        ? "gozem"
        : data.tracking.startsWith("RET-")
          ? "retrait"
          : "nagode",
  );

  return (
    <article className="mx-auto max-w-lg px-4 py-10">
      <ShipLogo carrierId={carrier.id} className="h-10 max-w-[160px]" />
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
        {carrier.name}
      </p>
      <h1 className="mt-1 font-display text-4xl">{data.tracking}</h1>
      <p className="mt-2 text-sm">
        {nagodeStatusLabel(data.nagodeStatus ?? "booked")}
        {data.mode === "api" ? " · API" : " · agence"}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        {data.city}
        {zone ? ` · ${zone.name} · ${zone.eta}` : ""}
      </p>
      <ol className="mt-8 space-y-3 border-l border-border pl-4">
        {data.events.map((ev, i) => (
          <li key={`${ev.created_at}-${i}`}>
            <p className="text-sm font-medium">{statusLabel(ev.status)}</p>
            <p className="text-xs text-muted-foreground">
              {formatDate(ev.created_at)}
              {ev.note ? ` · ${ev.note}` : ""}
            </p>
          </li>
        ))}
      </ol>
    </article>
  );
}
