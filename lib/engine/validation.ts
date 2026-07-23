import { z, type ZodTypeAny } from "zod";
import type { Question, QuestionGroup } from "@/types/simulator";

/** Construit un schéma Zod pour une question selon son type. */
function schemaForQuestion(q: Question): ZodTypeAny {
  switch (q.type) {
    case "radio":
    case "select": {
      const ids = q.options.map((o) => o.id);
      const base = z.string().refine((v) => ids.includes(v), { message: "Choix invalide" });
      return q.optional ? base.optional() : base;
    }
    case "checkbox": {
      const ids = q.options.map((o) => o.id);
      return z.array(z.string().refine((v) => ids.includes(v))).default([]);
    }
    case "slider": {
      return z.number().min(q.min).max(q.max);
    }
    case "number": {
      let n = z.number();
      if (q.min !== undefined) n = n.min(q.min);
      if (q.max !== undefined) n = n.max(q.max);
      return q.optional ? n.optional() : n;
    }
    case "text": {
      let s = z.string();
      if (q.maxLength) s = s.max(q.maxLength);
      return q.optional ? s.optional() : s.min(0);
    }
  }
}

/** Dérive un schéma Zod complet à partir des groupes de questions. */
export function buildSchema(groups: QuestionGroup[]) {
  const shape: Record<string, ZodTypeAny> = {};
  for (const group of groups) {
    for (const q of group.questions) {
      shape[q.id] = schemaForQuestion(q);
    }
  }
  return z.object(shape);
}
