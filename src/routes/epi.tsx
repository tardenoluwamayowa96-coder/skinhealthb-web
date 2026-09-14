import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { NfMark } from "@/components/nf-mark";
import {
  EN374_CHEMICALS,
  EN374_LEVELS,
  EN374_PARTS,
  EN374_TYPES,
  EPI_NORMS,
} from "@/lib/epi-norms";

export const Route = createFileRoute("/epi")({
  component: Page,
});

function Page() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
        Rayon protection
      </p>
      <h1 className="mt-1 font-display text-4xl">Certification NF pour EPI</h1>
      <div className="mt-4">
        <NfMark />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Chaque lot d’EPI Skinhealthb doit porter le sigle <strong>NF</strong>{" "}
        (AFNOR Certification) et le marquage <strong>CE</strong>, photographiés
        avec la référence de norme et la DLC s’il y en a. Ce n’est pas un
        dispositif médical sauf mention contraire sur l’emballage.
      </p>

      <div className="mt-8 space-y-3">
        {EPI_NORMS.map((n) => (
          <section
            key={n.code}
            className="rounded-lg bg-card p-4 shadow-[var(--shadow-soft)]"
          >
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              <ShieldCheck className="size-3.5" />
              {n.code}
            </p>
            <h2 className="mt-1 font-display text-2xl">{n.title}</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {n.use}
            </p>
            {n.code === "NF EN 374" ? (
              <a
                href="#nf-en-374"
                className="mt-2 inline-block text-sm font-medium text-primary"
              >
                Préciser NF EN 374 →
              </a>
            ) : null}
          </section>
        ))}
      </div>

      <section id="nf-en-374" className="mt-12 scroll-mt-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
          Gants
        </p>
        <h2 className="mt-1 font-display text-3xl">NF EN ISO 374</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Famille de normes pour les gants de protection contre les produits
          chimiques et les micro-organismes. Sur la boîte, on photographie :
          type A, B ou C, lettres des produits (A à T), pictogramme bécher, et
          le pictogramme virus seulement s’il est imprimé.
        </p>

        <div className="mt-6 space-y-3">
          {EN374_PARTS.map((p) => (
            <div
              key={p.code}
              className="rounded-lg bg-card p-4 shadow-[var(--shadow-soft)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                {p.code}
              </p>
              <h3 className="mt-1 font-display text-xl">{p.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {p.use}
              </p>
            </div>
          ))}
        </div>

        <h3 className="mt-10 font-display text-2xl">Types A, B, C</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Le type est imprimé sous le pictogramme bécher. Type C = protection
          minimale. Pour colorations, acides, soude : viser A ou B.
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg bg-card">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-3 py-3">Type</th>
                <th className="px-3 py-3">Produits testés</th>
                <th className="px-3 py-3">Perméation mini</th>
              </tr>
            </thead>
            <tbody>
              {EN374_TYPES.map((t) => (
                <tr key={t.type} className="border-b border-border last:border-0">
                  <td className="px-3 py-3 font-medium">Type {t.type}</td>
                  <td className="px-3 py-3 text-muted-foreground">{t.rule}</td>
                  <td className="px-3 py-3 text-muted-foreground">{t.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-10 font-display text-2xl">Niveaux de perméation</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Temps avant que le produit chimique traverse le gant (breakthrough).
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {EN374_LEVELS.map((l) => (
            <div
              key={l.level}
              className="rounded-lg bg-card px-3 py-3 text-center shadow-[var(--shadow-soft)]"
            >
              <p className="font-display text-2xl">{l.level}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{l.minutes}</p>
            </div>
          ))}
        </div>

        <h3 className="mt-10 font-display text-2xl">Lettres des produits</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Elles apparaissent sous le bécher. K (soude) et L (acide sulfurique)
          sont les plus utiles en salon et laboratoire.
        </p>
        <ul className="mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {EN374_CHEMICALS.map((c) => (
            <li
              key={c.letter}
              className="flex items-baseline gap-2 rounded-md bg-card px-3 py-2 text-sm"
            >
              <span className="w-5 font-semibold text-fg">{c.letter}</span>
              <span className="text-muted-foreground">{c.name}</span>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
          Consigne rayon : sans type A/B/C et sans au moins une lettre, le lot
          NF EN 374 est refusé. Le pictogramme virus n’est pas un argument
          marketing — il n’est valable que s’il est imprimé après test ISO
          16604.
        </p>
      </section>

      <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
        Un gant « nitrile » sans NF EN 374 / NF EN 455 n’est pas un EPI. Un
        masque sans NF EN 149 ou NF EN 14683 n’est pas un appareil de
        protection. CE sans NF : on refuse le lot.
      </p>

      <p className="mt-6">
        <Link
          to="/catalogue"
          search={{ category: "outils-protection" }}
          className="text-sm font-medium text-primary"
        >
          Voir le rayon EPI →
        </Link>
      </p>
    </article>
  );
}
