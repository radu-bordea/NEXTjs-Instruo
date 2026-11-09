// lib/validations/company.ts
// Rules for a client company. Error messages in Romanian, shown under each field.

import { z } from "zod";
import { optionalText } from "./common"; // shared helper: lib/validations/common.ts

export const companySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Numele trebuie să aibă cel puțin 2 caractere")
    .max(120, "Numele este prea lung"),
  // 1. clean: remove spaces, uppercase, strip "RO"
  // 2. check: only 2–10 digits (or empty)
  // 3. empty → null
  cui: z
    .string()
    .transform((value) => value.replace(/\s/g, "").toUpperCase().replace(/^RO/, ""))
    .refine(
      (value) => value === "" || /^\d{2,10}$/.test(value),
      "CUI-ul trebuie să conțină doar cifre (2–10)",
    )
    .transform((value) => value || null),
  address: optionalText(200, "Adresa este prea lungă"),
});

// After validation: { name: string; cui: string | null; address: string | null }
export type CompanyInput = z.infer<typeof companySchema>;