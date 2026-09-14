/** Catalogue des variables d’environnement — jamais de valeurs ici. */

export type EnvGroup = "boutique" | "auth" | "plateforme" | "pipeline";

export type EnvVarDef = {
  key: string;
  group: EnvGroup;
  label: string;
  description: string;
  secret: boolean;
  /** Obligatoire une fois le site en ligne (Neon / Vercel). */
  requiredOnDeploy: boolean;
  /** Visible dans le navigateur (préfixe VITE_ uniquement). */
  client: boolean;
  /** Où coller la valeur — jamais dans le dépôt. */
  setIn: ("Vercel" | "GitHub Actions" | "Plateforme Grok")[];
  /** Présente seulement dans GitHub Actions, pas au runtime boutique. */
  pipelineOnly?: boolean;
};

export const ENV_CATALOG: EnvVarDef[] = [
  {
    key: "DATABASE_URL",
    group: "boutique",
    label: "Base Postgres (Neon)",
    description: "Catalogue, commandes, comptes. Absent = aperçu PGLite.",
    secret: true,
    requiredOnDeploy: true,
    client: false,
    setIn: ["Vercel", "GitHub Actions"],
  },
  {
    key: "NAGODE_API_URL",
    group: "boutique",
    label: "Nagode API (URL)",
    description: "Base REST Nagode Transfert, ex. https://api.nagodetransfert.com. Vide = bordereau + WhatsApp agence.",
    secret: false,
    requiredOnDeploy: false,
    client: false,
    setIn: ["Vercel"],
  },
  {
    key: "NAGODE_API_KEY",
    group: "boutique",
    label: "Nagode API (clé)",
    description: "Jeton Bearer fourni par Nagode. Ne jamais coller dans le dépôt.",
    secret: true,
    requiredOnDeploy: false,
    client: false,
    setIn: ["Vercel"],
  },
  {
    key: "POSTE_API_URL",
    group: "boutique",
    label: "La Poste du Togo (URL)",
    description: "API colis Poste si un contrat existe. Vide = dépôt bureau + suivi LPT-.",
    secret: false,
    requiredOnDeploy: false,
    client: false,
    setIn: ["Vercel"],
  },
  {
    key: "POSTE_API_KEY",
    group: "boutique",
    label: "La Poste du Togo (clé)",
    description: "Jeton Bearer Poste. Jamais dans le dépôt.",
    secret: true,
    requiredOnDeploy: false,
    client: false,
    setIn: ["Vercel"],
  },
  {
    key: "GOZEM_API_URL",
    group: "boutique",
    label: "Gozem (URL)",
    description: "API coursier Gozem Business. Vide = dispatch WhatsApp boutique.",
    secret: false,
    requiredOnDeploy: false,
    client: false,
    setIn: ["Vercel"],
  },
  {
    key: "GOZEM_API_KEY",
    group: "boutique",
    label: "Gozem (clé)",
    description: "Jeton Gozem Business. Jamais dans le dépôt.",
    secret: true,
    requiredOnDeploy: false,
    client: false,
    setIn: ["Vercel"],
  },
  {
    key: "BETTER_AUTH_SECRET",
    group: "auth",
    label: "Secret de session",
    description: "Signe les cookies de connexion. Générer avec openssl rand -base64 32.",
    secret: true,
    requiredOnDeploy: true,
    client: false,
    setIn: ["Vercel", "GitHub Actions"],
  },
  {
    key: "BETTER_AUTH_URL",
    group: "auth",
    label: "URL publique",
    description: "Origine du site, ex. https://skinhealthb.com",
    secret: false,
    requiredOnDeploy: true,
    client: false,
    setIn: ["Vercel", "GitHub Actions"],
  },
  {
    key: "VITE_AUTH_ENABLED",
    group: "auth",
    label: "Comptes clients",
    description: "false = aperçu sans connexion. true en production.",
    secret: false,
    requiredOnDeploy: false,
    client: true,
    setIn: ["Vercel", "Plateforme Grok"],
  },
  {
    key: "GROK_AUTH_ISSUER",
    group: "plateforme",
    label: "Courtier d’auth Grok",
    description: "Injecté au publish. Inutile sur un Vercel autonome.",
    secret: false,
    requiredOnDeploy: false,
    client: false,
    setIn: ["Plateforme Grok"],
  },
  {
    key: "GROK_AUTH_CLIENT_ID",
    group: "plateforme",
    label: "Client OAuth",
    description: "Injecté au publish Grok.",
    secret: false,
    requiredOnDeploy: false,
    client: false,
    setIn: ["Plateforme Grok"],
  },
  {
    key: "GROK_AUTH_CLIENT_SECRET",
    group: "plateforme",
    label: "Secret OAuth",
    description: "Injecté au publish Grok.",
    secret: true,
    requiredOnDeploy: false,
    client: false,
    setIn: ["Plateforme Grok"],
  },
  {
    key: "GROK_PROJECT_ID",
    group: "plateforme",
    label: "Identifiant projet",
    description: "Présent uniquement sur un déploiement Grok App Builder.",
    secret: false,
    requiredOnDeploy: false,
    client: false,
    setIn: ["Plateforme Grok"],
  },
  {
    key: "VERCEL_TOKEN",
    group: "pipeline",
    label: "Jeton Vercel",
    description: "Déploiement GitHub Actions. vercel.com/account/tokens",
    secret: true,
    requiredOnDeploy: false,
    client: false,
    setIn: ["GitHub Actions"],
    pipelineOnly: true,
  },
  {
    key: "VERCEL_ORG_ID",
    group: "pipeline",
    label: "ID équipe Vercel",
    description: "Lu dans .vercel/project.json après vercel link.",
    secret: false,
    requiredOnDeploy: false,
    client: false,
    setIn: ["GitHub Actions"],
    pipelineOnly: true,
  },
  {
    key: "VERCEL_PROJECT_ID",
    group: "pipeline",
    label: "ID projet Vercel",
    description: "Lu dans .vercel/project.json après vercel link.",
    secret: false,
    requiredOnDeploy: false,
    client: false,
    setIn: ["GitHub Actions"],
    pipelineOnly: true,
  },
];

export const ENV_GROUP_LABEL: Record<EnvGroup, string> = {
  boutique: "Boutique",
  auth: "Comptes",
  plateforme: "Plateforme Grok",
  pipeline: "Déploiement (GitHub)",
};

export function isEnvSet(key: string): boolean {
  const v = process.env[key];
  return typeof v === "string" && v.trim().length > 0;
}
