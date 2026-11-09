// lib/validations/employee.ts
import { z } from "zod";
import { optionalDate, requiredDate } from "./common";

export const employeeSchema = z.object({
  firstName: z.string().trim().min(2, "Prenumele este prea scurt").max(60, "Prenumele este prea lung"),
  lastName: z.string().trim().min(2, "Numele este prea scurt").max(60, "Numele este prea lung"),
  jobTitle: z.string().trim().min(2, "Completează funcția").max(80, "Funcția este prea lungă"),
  hireDate: requiredDate("Alege data angajării"),
  medicalFitUntil: optionalDate("Dată invalidă"),
});