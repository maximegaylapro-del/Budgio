import type { Answers } from "@/types/calculation";

/**
 * Encode/décode les réponses dans un paramètre d'URL, pour qu'un lien partagé
 * reproduise exactement le même résultat chez le destinataire.
 */
export function encodeAnswers(answers: Answers): string {
  try {
    return btoa(encodeURIComponent(JSON.stringify(answers)));
  } catch {
    return "";
  }
}

export function decodeAnswers(param: string): Answers | null {
  try {
    return JSON.parse(decodeURIComponent(atob(param))) as Answers;
  } catch {
    return null;
  }
}
