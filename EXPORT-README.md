# Skinhealthb — boutique Lomé

Boutique en ligne (TanStack Start, React 19, Tailwind, PGLite / Postgres).
Catalogue K-beauty et para, paiement Flooz / Mixx by Yas.

Identité visuelle : argile `#C24A2A`, fond sable, catalogue **carré / coins nets**.

## Contenu de l’export

- `src/` — application (pages, composants, panier, auth, transporteurs)
- `migrations/` — schéma et catalogue (`0001` → `0053`)
- `public/` — packshots, marque, PWA, logos Flooz / Mixx / Nagode
- `scripts/` — migrations, preview, PWA, `setup-vercel-env.sh`
- `server/` — middleware
- `.github/workflows/` — CI (qualité) et CD (Vercel)
- `package.json` — dépendances

Non inclus : `node_modules`, photos WhatsApp brutes, captures internes, secrets.

## Lancer en local

```bash
npm install
npm run db:migrate
npm run dev
```

Sans `DATABASE_URL`, PGLite WASM est utilisé. Ne pas committer de fichier `.env`.

## Livraison

Quatre connecteurs (`src/lib/shipping.ts`) :

| id | Usage | Variables |
|---|---|---|
| `nagode` | Colis bus tout Togo | `NAGODE_API_URL` + `NAGODE_API_KEY` |
| `poste` | La Poste du Togo | `POSTE_API_URL` + `POSTE_API_KEY` |
| `gozem` | Coursier Lomé / Grand Lomé | `GOZEM_API_URL` + `GOZEM_API_KEY` |
| `retrait` | Magasin Lomé | aucune |

Sans clé : bordereau (`NGD-` / `LPT-` / `GZM-` / `RET-`) + WhatsApp agence.
Contrat API : `POST {URL}/v1/shipments` Bearer.

Suivi public : `/suivi`.

## CI / CD

| Fichier | Quand | Rôle |
|---|---|---|
| `.github/workflows/ci.yml` | chaque push / PR | typecheck, tests, build |
| `.github/workflows/deploy.yml` | `main` → prod, PR → preview | déploiement Vercel |

`npm run ci` · `npm run env:status` · `/admin/environnement`.

## Secrets Vercel

| Variable | Obligatoire |
|---|---|
| `DATABASE_URL` | oui (Neon pooled) |
| `BETTER_AUTH_SECRET` | recommandé |
| `BETTER_AUTH_URL` | recommandé |
| `NAGODE_API_*` / `POSTE_API_*` / `GOZEM_API_*` | non |

```bash
bash scripts/setup-vercel-env.sh
```

## Catalogue

Migrations `0003` puis `0007` → `0053`.
Packshots : `public/products/{slug}.jpg`.
