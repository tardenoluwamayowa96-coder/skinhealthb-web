import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mentions/cgv")({
  component: Page,
});

function Page() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-display text-4xl">Conditions générales de vente</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Les présentes conditions régissent les ventes de produits cosmétiques
          proposés par Skinhealthb au Togo. Les prix sont indiqués en francs
          CFA (XOF), toutes taxes comprises selon la réglementation applicable.
        </p>
        <p>
          La commande n’est validée qu’après confirmation du transfert Flooz
          (Moov) ou Mixx by Yas (ex-TMoney) reçu sur les numéros boutique
          Skinhealthb. NB : envoyez la capture d’écran du paiement et la
          confirmation d’achat (reçu ou SMS) sur WhatsApp +228 92 90 75 01.
          Sans ces pièces, la commande reste en attente. Chaque commande est
          accompagnée de la note d’authenticité (lot photographié, circuit
          Corée — méthode UMMA, pas de carton gris).
        </p>
        <p>
          Contact :{" "}
          <a href="mailto:skinhealth63@gmail.com" className="text-fg">
            skinhealth63@gmail.com
          </a>
          .
        </p>
        <p>
          Les délais de livraison sont communiqués avant validation, selon la
          zone : Lomé, Grand Lomé, Maritime, Plateaux, Centrale, Kara ou
          Savanes — toutes les villes du Togo. L’expédition hors Lomé commune
          est confiée à Nagode Transfert (colis). Un retard indépendant de
          notre volonté (accès, intempéries, opérateur) ne constitue pas un
          défaut de conformité.
        </p>
        <p>
          Les fiches produits sont informatives. Les cosmétiques ne sont pas des
          médicaments et ne prétendent pas traiter, guérir ou prévenir une
          maladie. En cas de réaction, cessez l’usage et consultez un
          professionnel de santé.
        </p>
      </div>
    </article>
  );
}
