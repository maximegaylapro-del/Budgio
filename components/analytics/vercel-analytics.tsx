"use client";

import Script from "next/script";

/**
 * Vercel Web Analytics — chargé via le script natif de Vercel (sans le paquet
 * @vercel/analytics, dont les dépendances optionnelles entrent en conflit avec
 * notre version de Vite).
 *
 * Cookieless et respectueux de la vie privée : aucun consentement requis, donc
 * rendu inconditionnellement (hors du gating RGPD). Nécessite d'activer
 * « Web Analytics » dans le dashboard Vercel du projet pour collecter les données.
 */
export function VercelAnalytics() {
  return <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />;
}
