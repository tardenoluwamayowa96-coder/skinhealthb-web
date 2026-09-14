import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mentions/retours")({
  component: Page,
});

function Page() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-display text-4xl">Politique de retour</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Pour des raisons d’hygiène, les produits ouverts, utilisés ou dont le
          sceau de sécurité est brisé ne sont pas repris, sauf défaut avéré
          (emballage endommagé à la livraison, produit non conforme à la
          commande).
        </p>
        <p>
          Signalez un problème dans les 48 heures suivant la réception, photos à
          l’appui, via Assistance, WhatsApp ou{" "}
          <a href="mailto:skinhealth63@gmail.com" className="text-fg">
            skinhealth63@gmail.com
          </a>
          . Après vérification du lot, un échange ou un avoir pourra être
          proposé.
        </p>
        <p>
          Les produits défectueux du fait du transport sont pris en charge
          après constat. Conservez l’emballage jusqu’au traitement du dossier.
        </p>
      </div>
    </article>
  );
}
