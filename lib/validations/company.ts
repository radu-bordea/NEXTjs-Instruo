// lib/validations/company.ts
// Rules for a client company. Error messages in Romanian, shown under each field.

import { z } from "zod";

// Reusable rule for an optional text input:
// trims spaces, checks max length, and turns an empty input ("") into null.
// Export it so other schemas (employees, entries) can reuse it.
export const optionalText = (max: number, message: string) =>
  z.string().trim().max(max, message).transform((value) => value || null);

export const companySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Numele trebuie să aibă cel puțin 2 caractere")
    .max(120, "Numele este prea lung"),
  cui: optionalText(20, "CUI-ul este prea lung"),
  address: optionalText(200, "Adresa este prea lungă"),
});

// After validation: { name: string; cui: string | null; address: string | null }
export type CompanyInput = z.infer<typeof companySchema>;