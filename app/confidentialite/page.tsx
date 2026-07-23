import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/layout/container";
import { ManageConsentButton } from "@/components/consent/manage-consent-button";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Confidentialité & cookies",
  description:
    "Comment Budgio traite vos données : réponses stockées localement dans votre navigateur, mesure d'audience anonymisée chargée uniquement après consentement.",
  canonicalPath: "/confidentialite",
});

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Container className="flex max-w-[760px] flex-col gap-10 py-12 pb-24">
          <header className="flex flex-col gap-3">
            <h1 className="text-[42px] font-semibold tracking-tighter">Confidentialité & cookies</h1>
            <p className="text-[16px] leading-[1.6] text-fg-muted">
              Budgio est conçu pour fonctionner sans collecter vos données personnelles. Voici
              précisément ce qui se passe quand vous utilisez le site.
            </p>
          </header>

          <section className="flex flex-col gap-3">
            <h2 className="text-[22px] font-semibold tracking-tight">Vos réponses restent chez vous</h2>
            <p className="text-[15.5px] leading-[1.65] text-fg-muted">
              Les réponses que vous saisissez dans un simulateur sont enregistrées uniquement dans le
              stockage local de votre navigateur (localStorage), pour vous permettre de reprendre une
              estimation. Elles ne sont <strong className="text-fg">jamais envoyées à un serveur</strong>{" "}
              ni partagées. Vous pouvez les effacer en vidant les données du site dans votre navigateur.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-[22px] font-semibold tracking-tight">Mesure d'audience</h2>
            <p className="text-[15.5px] leading-[1.65] text-fg-muted">
              Pour comprendre comment le site est utilisé et l'améliorer, nous pouvons utiliser Google
              Analytics 4 et Microsoft Clarity (statistiques d'usage anonymisées, cartes de chaleur).
              Ces outils déposent des cookies et ne sont <strong className="text-fg">chargés
              qu'après votre consentement</strong> — si vous refusez, aucun script de mesure n'est exécuté.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-[22px] font-semibold tracking-tight">Gérer votre consentement</h2>
            <p className="text-[15.5px] leading-[1.65] text-fg-muted">
              Vous pouvez modifier votre choix à tout moment.
            </p>
            <ManageConsentButton />
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-[22px] font-semibold tracking-tight">Vos droits</h2>
            <p className="text-[15.5px] leading-[1.65] text-fg-muted">
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et d'effacement.
              Comme aucune donnée personnelle identifiante n'est stockée sur nos serveurs, ces droits
              s'exercent principalement en effaçant les données locales de votre navigateur. Pour toute
              question, contactez-nous à{" "}
              <a href="mailto:contact@budgio.fr" className="underline underline-offset-2 hover:text-fg">
                contact@budgio.fr
              </a>
              .
            </p>
          </section>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
