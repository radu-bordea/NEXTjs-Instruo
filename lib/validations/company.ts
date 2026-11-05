// lib/validations/company.ts
// The rules for a client company. Used by the server action (and could reuse in the browser later).
// Error messages in Romanian, show under each field.

import { z } from "zod";

export const companySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Numele trebuie sa aiba cel putin 2 caractere")
    .max(120, "Numele este prea lung"),
  // Optional fields: an empty input arrives as "" -> we allow it
  cui: z.string().trim().max(20, "CUI-ul este prea lung"),
  address: z.string().trim().max(200, "Adresa este prea lunga"),
});

// TypeScript type generated from the schema: {name: string, cui: string; address: string}
export type CompanyInput = z.infer<typeof companySchema>;
