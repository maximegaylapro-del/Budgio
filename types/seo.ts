/** Configuration SEO d'un simulateur — transformée en Metadata Next. */
export interface SeoConfig {
  /** <title> de la page (sans le suffixe de marque). */
  title: string;
  /** meta description (~155 caractères). */
  description: string;
  /** Mots-clés éditoriaux (usage interne / maillage). */
  keywords?: string[];
  /** Chemin canonique relatif, ex. "/simulateurs/cout-enfant". */
  canonicalPath: string;
  /** Titre OpenGraph si différent du title. */
  ogTitle?: string;
  ogDescription?: string;
}

/** Source officielle citée (crédibilité + JSON-LD). */
export interface Source {
  name: string;
  scope?: string;
  url?: string;
}

/** Entrée de FAQ — alimente aussi le schema FAQPage. */
export interface Faq {
  question: string;
  answer: string;
}
