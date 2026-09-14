import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mentions/confidentialite")({
  component: Page,
});

function Page() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-display text-4xl">Politique de confidentialité</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Skinhealthb, boutique de produits cosmétiques au Togo, collecte les
          données nécessaires à la commande : nom, téléphone, adresse e-mail,
          adresse de livraison et historique d’achat.
        </p>
        <p>
          Ces informations servent à livrer les commandes, à vous contacter, à
          sécuriser la commande et à améliorer le service. Elles ne
          sont pas vendues à des tiers.
        </p>
        <p>
          Le paiement se fait par transfert Flooz ou Mixx by Yas vers les numéros
          boutique affichés au checkout. Skinhealthb ne stocke pas vos codes
          secrets USSD.
        </p>
        <p>
          Vous pouvez demander l’accès, la correction ou la suppression de vos
          données via{" "}
          <a href="mailto:skinhealth63@gmail.com" className="text-fg">
            skinhealth63@gmail.com
          </a>
          , la page Assistance, Instagram ou TikTok{" "}
          <a
            href="https://www.instagram.com/skinhealthb/"
            target="_blank"
            rel="noreferrer me"
            className="text-fg"
          >
            @skinhealthb
          </a>
          . Conservez vos identifiants en lieu sûr.
        </p>
      </div>
    </article>
  );
}
