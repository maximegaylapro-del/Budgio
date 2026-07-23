"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useConsent } from "@/components/consent/consent-provider";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

/**
 * Charge Google Analytics 4 et Microsoft Clarity — uniquement si leurs IDs
 * sont fournis en variables d'environnement. Aucune dépendance forte : sans
 * ID, rien n'est injecté. Les scripts sont chargés après l'hydratation.
 *
 * Note conformité : en France, ces outils requièrent en principe le
 * consentement de l'utilisateur (CNIL). Brancher ici un gestionnaire de
 * consentement avant activation en production.
 */
export function Analytics() {
  const pathname = usePathname();
  const { consent } = useConsent();
  const enabled = consent === "granted";

  // Page view sur navigation SPA (App Router).
  useEffect(() => {
    if (enabled && GA_ID && typeof window.gtag === "function") {
      window.gtag("event", "page_view", { page_path: pathname });
    }
  }, [pathname, enabled]);

  // Aucun script tant que le consentement n'est pas accordé.
  if (!enabled) return null;

  return (
    <>
      {GA_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}

      {CLARITY_ID ? (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      ) : null}
    </>
  );
}
