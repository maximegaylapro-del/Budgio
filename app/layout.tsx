import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { ConsentProvider } from "@/components/consent/consent-provider";
import { ConsentBanner } from "@/components/consent/consent-banner";
import { Analytics } from "@/components/analytics/analytics";
import { SITE } from "@/lib/seo/site";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s · ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE.name,
    url: SITE.url,
    title: SITE.name,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image", title: SITE.name, description: SITE.description },
  robots: { index: true, follow: true },
  verification: { google: "AKf7fIQ4KKphDMkogWwCXg_n7NjCzqV4WSeeb6h29MM" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafb" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b10" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <ConsentProvider>
            {children}
            <ConsentBanner />
            <Analytics />
          </ConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
