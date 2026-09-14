#!/usr/bin/env node
/**
 * Affiche l’état des variables (présent / absent) — jamais les valeurs.
 * Utile en CI et avant un déploiement Vercel.
 */
const RUNTIME = [
  ["DATABASE_URL", true, "Neon Postgres"],
  ["BETTER_AUTH_SECRET", true, "Secret de session"],
  ["BETTER_AUTH_URL", true, "URL publique"],
  ["VITE_AUTH_ENABLED", false, "Comptes clients"],
  ["GROK_PROJECT_ID", false, "Plateforme Grok"],
];

const PIPELINE = ["VERCEL_TOKEN", "VERCEL_ORG_ID", "VERCEL_PROJECT_ID"];

function set(key) {
  const v = process.env[key];
  return typeof v === "string" && v.trim().length > 0;
}

const deployed = set("GROK_PROJECT_ID") || set("DATABASE_URL");
console.log(deployed ? "[env] déploiement" : "[env] aperçu / CI");

let missing = 0;
for (const [key, required, label] of RUNTIME) {
  const ok = set(key);
  const mark = ok ? "ok " : required && deployed ? "MANQUE" : "—  ";
  if (required && deployed && !ok) missing += 1;
  console.log(`  ${mark}  ${key.padEnd(22)} ${label}`);
}

console.log("[env] pipeline (GitHub Actions seulement)");
for (const key of PIPELINE) {
  console.log(`  ${set(key) ? "ok " : "—  "}  ${key}`);
}

if (missing) {
  console.error(`[env] ${missing} variable(s) obligatoire(s) absente(s).`);
  process.exit(1);
}
console.log("[env] valeurs jamais affichées.");
