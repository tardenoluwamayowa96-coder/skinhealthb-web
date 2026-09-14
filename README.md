# Skinhealthb

Boutique cosmétique Lomé — TanStack Start, React 19, Tailwind.

- Site prévu : https://skinhealthb.com
- Appilix package : `com.skinhealthb.app`
- Paiement : Flooz + Mixx by Yas · WU / Ria / MoneyGram à l’international
- WhatsApp boutique : +228 92 90 75 01

## Installer

```bash
npm ci
npm run db:migrate
npm run dev
```

Sans `DATABASE_URL`, PGLite est utilisé. Ne pas committer de `.env`.

## Déploiement

Vercel (`vercel.json`, workflows dans `.github/`).  
Variable `BETTER_AUTH_URL=https://skinhealthb.com` une fois le DNS branché.

Détails : [EXPORT-README.md](EXPORT-README.md)
