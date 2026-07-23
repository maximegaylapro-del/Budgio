import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main>
        <Container className="flex flex-col items-center py-32 text-center">
          <span className="font-mono text-[13px] text-fg-subtle">Erreur 404</span>
          <h1 className="mt-3 text-[42px] font-semibold tracking-tighter">Page introuvable</h1>
          <p className="mt-3 max-w-[420px] text-[16px] text-fg-muted">
            Cette page n'existe pas ou a été déplacée. Revenez à l'accueil pour retrouver nos simulateurs.
          </p>
          <Link href="/" className={`${buttonVariants()} mt-8`}>
            Retour à l'accueil
          </Link>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
