import { createFileRoute } from "@tanstack/react-router";
import { CopyRow } from "@/components/copy-row";
import { APP_PACKAGE, DNS_RECORDS, SITE_HOST, SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/domaine")({
  component: DomainePage,
  head: () => ({
    meta: [{ title: `Domaine · ${SITE_HOST}` }],
  }),
});

function DomainePage() {
  return (
    <div>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-lg px-4 py-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
            Appilix · DNS
          </p>
          <h1 className="mt-1 font-display text-3xl md:text-4xl">Nom de domaine</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            L’URL est l’adresse du site. Le package est le nom interne de l’app
            téléphone. Ne les inverse pas.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-lg space-y-3 px-4 py-8">
        <CopyRow label="Website URL (Appilix)" value={SITE_URL} />
        <CopyRow label="Package Android / iOS" value={APP_PACKAGE} />

        <h2 className="mt-8 font-display text-2xl">Chez le registrar</h2>
        <p className="text-sm text-muted-foreground">
          Si {SITE_HOST} est à toi : ouvre DNS et colle ces enregistrements.
          SSL (cadenas) se crée tout seul une fois le DNS actif.
        </p>
        <div className="mt-3 overflow-x-auto ring-1 ring-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Type</th>
                <th className="px-3 py-2 font-medium">Hôte</th>
                <th className="px-3 py-2 font-medium">Valeur</th>
              </tr>
            </thead>
            <tbody>
              {DNS_RECORDS.map((r) => (
                <tr key={r.host} className="border-t border-border">
                  <td className="px-3 py-2 tabular-nums">{r.type}</td>
                  <td className="px-3 py-2">{r.host}</td>
                  <td className="px-3 py-2 text-xs">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {DNS_RECORDS.map((r) => (
          <CopyRow
            key={`${r.type}-${r.host}`}
            label={`${r.type} ${r.host}`}
            value={r.value}
            display={`${r.note} · ${r.value}`}
          />
        ))}

        <ol className="mt-6 space-y-4 text-sm text-muted-foreground">
          <li>
            <span className="font-medium text-fg">1 · Acheter</span>
            <span className="mt-1 block">
              {SITE_HOST} chez un registrar (Namecheap, OVH, Google Domains…).
              Aujourd’hui ce nom répond 503 : il n’est pas encore branché.
            </span>
          </li>
          <li>
            <span className="font-medium text-fg">2 · DNS</span>
            <span className="mt-1 block">Les deux lignes du tableau ci-dessus.</span>
          </li>
          <li>
            <span className="font-medium text-fg">3 · Vercel</span>
            <span className="mt-1 block">
              Project → Domains → Add {SITE_HOST} et www.{SITE_HOST}. Variable{" "}
              <code className="text-fg">BETTER_AUTH_URL</code> = {SITE_URL}.
            </span>
          </li>
          <li>
            <span className="font-medium text-fg">4 · Appilix</span>
            <span className="mt-1 block">
              Website URL = {SITE_URL}. Package = {APP_PACKAGE}. Rebuild quand
              le site s’ouvre avec le cadenas.
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
}
