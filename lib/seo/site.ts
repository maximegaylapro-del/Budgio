/**
 * URL publique du site, résolue dans cet ordre :
 *   1. NEXT_PUBLIC_SITE_URL (override manuel — prioritaire)
 *   2. le domaine de production Vercel (VERCEL_PROJECT_PRODUCTION_URL) — il
 *      pointe automatiquement vers le domaine custom (.fr) dès qu'il est branché,
 *      sinon vers l'URL .vercel.app
 *   3. valeur de repli pour le développement local
 * Ainsi le sitemap / canonical / Open Graph sont toujours corrects sans réglage.
 */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "https://budgio.fr";
}

/** Constantes globales du site — source unique pour SEO, footer, sitemap. */
export const SITE = {
  name: "Budgio",
  tagline: "Estimez avant de décider",
  description:
    "Budgio transforme vos questions de budget en réponses chiffrées, projetées sur plusieurs années et adaptées à votre situation. Enfant, voiture, maison, énergie…",
  url: resolveSiteUrl(),
  locale: "fr_FR",
  lang: "fr",
} as const;
