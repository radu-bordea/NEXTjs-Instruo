// actions/trainings.ts
"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { requireOrg } from "@/lib/auth";
import { getBuiltInTemplate } from "@/lib/templates/load";
import { buildTemplateSchema, readTemplateValues } from "@/lib/templates/schema";
import type { TemplateFormState } from "@/components/forms/TemplateForm";

export async function createTraining(
  companyId: string,
  employeeId: string,
  _prevState: TemplateFormState,
  formData: FormData
): Promise<TemplateFormState> {
  const { orgId } = await requireOrg();

  // The employee must be in this company of this org
  const employee = await db.employee.findFirst({
    where: { id: employeeId, companyId, orgId },
    select: { id: true },
  });
  if (!employee) return { message: "Angajatul nu a fost găsit." };

  // Load the template ON THE SERVER. Never trust field definitions sent by the browser.
  const template = await getBuiltInTemplate("ssm-training");
  if (!template) return { message: "Șablonul de instruire lipsește. Rulează seed-ul." };

  const values = readTemplateValues(template.fields, formData);
  const parsed = buildTemplateSchema(template.fields).safeParse(values);

  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors, values };
  }

  // DAY 11: save a FormEntry here, then redirect.
  return { success: "Datele sunt valide. Salvarea vine mâine.", values };
}