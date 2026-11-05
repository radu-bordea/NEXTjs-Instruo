// lib/validations/company.ts
// Rules for a client company. Error messages in Romanian, shown under each field.

import { z } from "zod";

// Reusable rule for an optional text input:
// trims spaces, checks max length, and turns an empty input ("") into null.
// Export it so other schemas (employees, entries) can reuse it.
export const optionalText = (max: number, message: string) =>
  z
    .string()
    .trim()
    .max(max, message)
    .transform((value) => value || null);

export const companySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Numele trebuie să aibă cel puțin 2 caractere")
    .max(120, "Numele este prea lung"),
  // CUI: remove spaces, uppercase, drop the "RO" prefix → "ro 123 45" becomes "12345".
  // Then check it's digits only (Romanian CUI: 2–10 digits).
  cui: z
    .string()
    .transform((value) =>
      value.replace(/\s/g, "").toUpperCase().replace(/^RO/, ""),
    )
    .refine(
      (value) => value === "" || /^\d{2,10}$/.test(value),
      "CUI-ul trebuie să conțină doar cifre (2–10)",
    )
    .transform((value) => value || null),
  address: optionalText(200, "Adresa este prea lungă"),
});

// After validation: { name: string; cui: string | null; address: string | null }
export type CompanyInput = z.infer<typeof companySchema>;
