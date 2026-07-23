# Budgio — Plateforme de simulateurs

Framework de simulateurs « Combien ça coûte ? » piloté par configuration.
Next.js 15 (App Router, RSC) · TypeScript strict · Tailwind · Recharts · Zod · next-themes.

> Objectif : héberger des centaines de simulateurs sans jamais modifier le noyau.
> Ajouter un simulateur = ajouter **un dossier de configuration**.

## Démarrer

```bash
# Node 22 requis (le node du PATH système est trop ancien)
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production (SSG)
npm run test       # tests Vitest (moteurs & calculateurs)
npm run typecheck  # tsc --noEmit
```

## Architecture (3 couches découplées)

```
CONFIG  config/simulators/<slug>/*   → données pures (ce qu'on ajoute)
ENGINE  lib/engine · lib/calculators → TS pur, 0 React, testable
UI      components/*                 → renderer générique, écrit une fois
```

- **types/** — contrats du framework (`SimulatorConfig`, `Question`, `CalculationResult`…).
- **lib/engine/** — machine à états du wizard (pure), validation Zod, `defineSimulator`.
- **lib/calculators/** — interface `Calculator` (fonction pure), helpers.
- **components/questions/** — `QuestionField` : registre type → composant (aucun formulaire codé en dur).
- **components/simulator/** — `SimulatorRenderer` : orchestrateur générique piloté par la config.
- **config/registry.ts** — registre central ; sitemap, routes et home l'itèrent.

## Ajouter un simulateur (recette)

1. Créer `config/simulators/<slug>/` avec :
   - `assumptions.ts` — toutes les hypothèses chiffrées + type des réponses ;
   - `calculator.ts` — `Calculator` pur (`compute(input) → CalculationResult`) ;
   - `recommendations.ts` — règles de conseils (optionnel) ;
   - `config.ts` — la `SimulatorConfig` (questions, intro, résultat, SEO, FAQ, sources).
2. L'enregistrer dans `config/simulators/index.ts` via `defineSimulator(...)`.
3. Ajouter un test dans `tests/calculators/<slug>.test.ts`.

Aucune autre modification : la route `/simulateurs/[slug]`, le sitemap, les
metadata, le JSON-LD et la home se mettent à jour automatiquement.

## Premier simulateur

`cout-enfant` — « Combien coûte un enfant ? » (modèle porté depuis la maquette,
hypothèses INSEE/CAF externalisées dans `assumptions.ts`).

## Analytics

Google Analytics 4 et Microsoft Clarity sont branchés derrière une abstraction
(`lib/analytics`), **sans dépendance forte** : les scripts ne se chargent que si
leurs IDs sont fournis (`.env`). Copier `.env.example` → `.env.local` et renseigner :

- `NEXT_PUBLIC_GA_ID` (GA4, `G-XXXX`) — mesure quantitative, funnel.
- `NEXT_PUBLIC_CLARITY_ID` — heatmaps et enregistrements de session.

Le simulateur émet des événements de tunnel : `simulator_start`, `simulator_step`
(avec l'étape atteinte), `simulator_complete`, `simulator_restart` — pour voir où
les gens bloquent et jusqu'où ils remplissent.

Conformité RGPD : un **bandeau de consentement** (`components/consent`) bloque le
chargement des scripts tant que l'utilisateur n'a pas accepté. Le choix est
persisté et modifiable depuis la page `/confidentialite`.

## Évolutions prévues (sans refonte)

API (`app/api/` réservé), base PostgreSQL (via accessors `lib/data/`),
comptes & sauvegarde (`Answers` sérialisable), i18n (`locale` déjà dans le moteur),
analytics (abstraction `lib/analytics`).
