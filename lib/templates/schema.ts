// lib/templates/schema.ts
// Builds a Zod schema from a template's fields, at runtime.
// The form (TemplateForm) is drawn from the same fields, so form and rules always match.

import { z } from "zod";
import type { TemplateField } from "./types";

const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const REQUIRED = "Câmp obligatoriu";

// One field → one Zod rule. Input is always a string (that's what forms send).
// Output: string | number | Date | null, depending on the field type.
function fieldToZod(field: TemplateField): z.ZodType {
  // Start: trimmed string. Required → must not be empty.
  const base = field.required
    ? z.string().trim().min(1, REQUIRED)
    : z.string().trim();

  switch (field.type) {
    case "text":
    case "textarea": {
      const max = field.max ?? 500;
      return base
        .max(max, `Maximum ${max} caractere`)
        .transform((value) => value || null);
    }

    case "number":
      return base
        // Accept "1,5" as well as "1.5" (Romanian decimal comma)
        .transform((value) => (value === "" ? null : Number(value.replace(",", "."))))
        .refine((value) => value === null || !Number.isNaN(value), "Introdu un număr")
        .refine(
          (value) => value === null || field.min === undefined || value >= field.min,
          `Minimum ${field.min}`
        )
        .refine(
          (value) => value === null || field.max === undefined || value <= field.max,
          `Maximum ${field.max}`
        );

    case "date":
      return base
        .refine((value) => value === "" || isoDate.test(value), "Alege o dată validă")
        .transform((value) => (value ? new Date(value) : null));

    case "select": {
      // Only values from the template's options are allowed (someone could edit the HTML)
      const allowed = (field.options ?? []).map((option) => option.value);
      return base
        .refine((value) => value === "" || allowed.includes(value), "Alege o opțiune din listă")
        .transform((value) => value || null);
    }
  }
}

// All fields → one z.object, e.g. { trainingType: ..., date: ..., durationHours: ... }
export function buildTemplateSchema(fields: TemplateField[]) {
  const shape: Record<string, z.ZodType> = {};
  for (const field of fields) {
    shape[field.key] = fieldToZod(field);
  }
  return z.object(shape);
}

// Read the raw text of every template field from a submitted form.
// Used to validate AND to refill the form after errors.
export function readTemplateValues(fields: TemplateField[], formData: FormData) {
  const values: Record<string, string> = {};
  for (const field of fields) {
    values[field.key] = String(formData.get(field.key) ?? "");
  }
  return values;
}