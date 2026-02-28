# RapidAssur Copilote v3.0

> Le cerveau prescriptif du courtier en assurance dommages — Québec

## Stack Technique

| Élément | Version |
|---------|---------|
| Framework | Next.js 14 + App Router |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 3.4 |
| IA | Genkit 0.5.0 + Gemini 2.5 Flash |
| Backend | Firebase (Auth, Firestore, Hosting, Functions) |
| Projet Firebase | `rapidassur-copilote-21` |

## Architecture

```
RAPIDASSUR NE CONSERVE RIEN — SAUF :
  ✉️ Courriel prospect + ✅ Autorisation sollicitation (Loi 25)
  TOUT LE RESTE → PDF → EPIC. POINT.

JotForm = MOTEUR (collecte + scoring + routing + PDF)
Site    = VITRINE (embeds + AI enrichissement)
Epic    = ARCHIVE (seule source permanente)
```

## Structure

```
src/
├── app/                    ← Pages Next.js (App Router)
│   ├── page.tsx            ← Accueil public
│   ├── layout.tsx          ← Layout racine
│   ├── globals.css         ← Tailwind + brand tokens
│   └── internal/           ← Espace courtier (auth requis)
│       ├── dashboard/      ← Tableau de bord
│       └── propositions-nouvelles-affaires/  ← Fiche Nominative SOCLE
├── components/             ← 38 composants React réutilisables
├── lib/
│   └── extractors/         ← 10 extracteurs IA (RBQ, GCR, CTQ...)
└── ai/
    └── flows/              ← Genkit AI flows
```

## Démarrage Firebase Studio

1. Importer depuis GitHub : `https://github.com/erickdecarufel-cmd/Rapidassur1`
2. Firebase Studio crée le workspace avec `.idx/dev.nix` (stable-24.05 ✅)
3. `npm run dev` démarre automatiquement au port $PORT

## 10 Forms JotForm — IDs

| Form | ID | Champs |
|------|----|--------|
| CONSTRUCTION | 260507298912260 | 208 |
| FLOTTE | 260512085208248 | 187 |
| IMMOBILIER | 260512137678257 | 190 |
| PRO | 260512255889262 | 252 |
| COMMERCIAL | 260522507223043 | 99 |
| HOSPITALITE | 260522506728052 | 75 |
| FABRICATION | 260522561165048 | 84 |
| AGRICOLE | 260523334001036 | 88 |
| SANTE | 260523349099059 | 78 |
| SECURITE | 260522729700049 | 56 |

## Contact

Erick de Carufel · erick.decarufel@rapidassur.com · 514-622-2163
