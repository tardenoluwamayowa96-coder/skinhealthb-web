import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminBar } from "@/components/admin-bar";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { ENV_GROUP_LABEL, type EnvGroup } from "@/lib/env-catalog";
import { adminGetEnvStatus } from "@/lib/server/admin";
import { getMyProfile } from "@/lib/server/profile";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/environnement")({
  component: AdminEnvironnement,
});

type Status = Awaited<ReturnType<typeof adminGetEnvStatus>>;

const GROUP_ORDER: EnvGroup[] = ["boutique", "auth", "plateforme", "pipeline"];

function AdminEnvironnement() {
  const { user, isPending } = useCurrentUserState();
  const [ok, setOk] = useState(false);
  const [data, setData] = useState<Status | null>(null);

  useEffect(() => {
    if (!user) return;
    getMyProfile().then(async (p) => {
      if (p.role !== "admin") return;
      setOk(true);
      const s = await adminGetEnvStatus();
      setData(s);
    });
  }, [user]);

  if (isPending) return <div className="h-32 animate-pulse bg-surface-2" />;
  if (!user) return <RedirectToSignIn />;
  if (!ok) return <p className="p-8 text-sm">Accès refusé.</p>;

  const missing = data?.missingRequired ?? [];

  return (
    <div>
      <AdminBar />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="font-display text-4xl">Variables d’environnement</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Les valeurs secrètes ne s’affichent jamais. Seul l’état présent / manquant
          est visible. Coller les valeurs dans Vercel et GitHub Actions — jamais
          dans le code.
        </p>

        <div className="mt-6 rounded-lg bg-card px-4 py-3 text-sm shadow-[var(--shadow-soft)]">
          <p>
            Contexte :{" "}
            <span className="font-medium">
              {data?.preview ? "aperçu (PGLite)" : "déploiement"}
            </span>
          </p>
          {missing.length > 0 ? (
            <p className="mt-1 text-destructive">
              Manquantes en production : {missing.join(", ")}
            </p>
          ) : (
            <p className="mt-1 text-muted-foreground">
              {data?.preview
                ? "En aperçu, Neon n’est pas requis. Vérifier ces clés avant la mise en ligne."
                : "Clés boutique et session présentes."}
            </p>
          )}
        </div>

        {GROUP_ORDER.map((group) => {
          const rows = (data?.vars ?? []).filter((v) => v.group === group);
          if (rows.length === 0) return null;
          return (
            <section key={group} className="mt-8">
              <h2 className="font-display text-2xl">{ENV_GROUP_LABEL[group]}</h2>
              <ul className="mt-3 divide-y divide-border rounded-lg bg-card">
                {rows.map((v) => (
                  <li key={v.key} className="px-4 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium">{v.label}</p>
                        <p className="font-mono text-xs text-muted-foreground">{v.key}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{v.description}</p>
                        <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">
                          {v.setIn.join(" · ")}
                          {v.secret ? " · secret" : ""}
                          {v.client ? " · navigateur" : ""}
                        </p>
                      </div>
                      <StatusBadge
                        pipelineOnly={v.pipelineOnly}
                        set={v.set}
                        missing={v.missing}
                        required={v.requiredOnDeploy}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <section className="mt-8">
          <h2 className="font-display text-2xl">Réglages boutique</h2>
          <ul className="mt-3 divide-y divide-border rounded-lg bg-card">
            <li className="flex items-center justify-between px-4 py-3 text-sm">
              <div>
                <p className="font-medium">Jeton PayGate</p>
                <p className="text-xs text-muted-foreground">
                  Enregistré dans Réglages, pas dans Vercel.
                </p>
              </div>
              <StatusBadge
                pipelineOnly={false}
                set={Boolean(data?.paygateTokenSet)}
                missing={false}
                required={false}
              />
            </li>
          </ul>
          <p className="mt-3 text-sm">
            <Link to="/admin/reglages" className="text-gold">
              Ouvrir les réglages →
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}

function StatusBadge({
  pipelineOnly,
  set,
  missing,
  required,
}: {
  pipelineOnly: boolean;
  set: boolean;
  missing: boolean;
  required: boolean;
}) {
  if (pipelineOnly) {
    return (
      <span className="shrink-0 rounded-full bg-surface-2 px-2 py-0.5 text-[11px] uppercase tracking-wide text-muted-foreground">
        GitHub
      </span>
    );
  }
  const label = set ? "Présente" : required ? "Manquante" : "Non définie";
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-2 py-0.5 text-[11px] uppercase tracking-wide",
        set && "bg-emerald-500/15 text-emerald-800",
        missing && "bg-destructive/15 text-destructive",
        !set && !missing && "bg-surface-2 text-muted-foreground",
      )}
    >
      {label}
    </span>
  );
}
