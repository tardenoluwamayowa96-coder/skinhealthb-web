#!/usr/bin/env bash
# Enregistre les secrets Skinhealthb dans le projet Vercel lié (jamais dans git).
# Prérequis : `npm i -g vercel` puis `vercel login` et `vercel link`.
set -euo pipefail

if ! command -v vercel >/dev/null 2>&1; then
  echo "Installer le CLI : npm i -g vercel" >&2
  exit 1
fi

if [[ ! -f .vercel/project.json ]]; then
  echo "Lier le projet d’abord : vercel link" >&2
  exit 1
fi

echo "Projet :"
cat .vercel/project.json
echo
echo "Pour chaque variable : coller la valeur, Entrée, puis choisir le scope proposé."
echo "Ne jamais committer ces valeurs."
echo

add_both() {
  local key="$1"
  echo "—— $key · Production ——"
  vercel env add "$key" production || true
  echo "—— $key · Preview ——"
  vercel env add "$key" preview || true
}

add_both DATABASE_URL
add_both BETTER_AUTH_SECRET
add_both BETTER_AUTH_URL

echo
echo "OK. Vérifier : vercel env ls"
echo
echo "IDs à coller dans GitHub → Settings → Secrets → Actions :"
python3 - <<'PY'
import json
p=json.load(open(".vercel/project.json"))
print("VERCEL_ORG_ID     =", p.get("orgId",""))
print("VERCEL_PROJECT_ID =", p.get("projectId",""))
PY
echo "VERCEL_TOKEN      = (Account Settings → Tokens, créer un jeton)"
echo "DATABASE_URL      = même chaîne Neon que ci-dessus"
