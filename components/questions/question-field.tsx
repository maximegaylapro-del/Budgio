"use client";

import type { Answers } from "@/types/calculation";
import type { Question } from "@/types/simulator";
import { RadioCardField } from "./radio-card-field";
import { SliderField } from "./slider-field";
import { SelectField } from "./select-field";
import { NumberField } from "./number-field";
import { TextField } from "./text-field";
import { CheckboxField } from "./checkbox-field";

interface QuestionFieldProps {
  question: Question;
  value: Answers[string];
  onChange: (value: Answers[string]) => void;
  onAutoAdvance?: () => void;
}

/**
 * Aiguilleur générique : mappe question.type → composant de champ.
 * Ajouter un type = un case ici + un composant. Aucun formulaire codé en dur :
 * les simulateurs déclarent des données, jamais des composants.
 */
export function QuestionField({ question, value, onChange, onAutoAdvance }: QuestionFieldProps) {
  switch (question.type) {
    case "radio":
      return (
        <RadioCardField
          question={question}
          value={value as string}
          onChange={onChange}
          onAutoAdvance={onAutoAdvance}
        />
      );
    case "slider":
      return <SliderField question={question} value={value as number} onChange={onChange} />;
    case "select":
      return <SelectField question={question} value={value as string} onChange={onChange} />;
    case "number":
      return <NumberField question={question} value={value as number} onChange={onChange} />;
    case "text":
      return <TextField question={question} value={value as string} onChange={onChange} />;
    case "checkbox":
      return <CheckboxField question={question} value={value as string[]} onChange={onChange} />;
    default:
      return null;
  }
}
