/** Constantes globales du site — source unique pour SEO, footer, sitemap. */
export const SITE = {
  name: "Budgio",
  tagline: "Estimez avant de décider",
  description:
    "Budgio transforme vos questions de budget en réponses chiffrées, projetées sur plusieurs années et adaptées à votre situation. Enfant, voiture, maison, énergie…",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://budgio.fr",
  locale: "fr_FR",
  lang: "fr",
} as const;
