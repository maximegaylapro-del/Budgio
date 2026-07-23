"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Consent = "granted" | "denied";

interface ConsentContextValue {
  /** null = pas encore de choix. */
  consent: Consent | null;
  /** false tant que le composant n'est pas monté (évite le mismatch d'hydratation). */
  mounted: boolean;
  grant: () => void;
  deny: () => void;
  /** Réaffiche le bandeau (ex. lien « Gérer mes cookies »). */
  reset: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);
const STORAGE_KEY = "budgio_consent";

/** Fournit l'état de consentement analytics, persisté en localStorage. */
export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "granted" || stored === "denied") setConsent(stored);
    } catch {
      /* stockage indisponible */
    }
  }, []);

  const persist = useCallback((value: Consent | null) => {
    setConsent(value);
    try {
      if (value) localStorage.setItem(STORAGE_KEY, value);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value: ConsentContextValue = {
    consent,
    mounted,
    grant: () => persist("granted"),
    deny: () => persist("denied"),
    reset: () => persist(null),
  };

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent doit être utilisé dans un ConsentProvider");
  return ctx;
}
