// actions/employees.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireOrg } from "@/lib/auth";
import { employeeSchema } from "@/lib/validations/employee";

type Field = "firstName" | "lastName" | "jobTitle" | "hireDate" | "medicalFitUntil";

export type EmployeeFormState = {
  errors?: Partial<Record<Field, string[]>>;
  message?: string;
  values?: Record<Field, string>; // raw input, to refill the form after errors
};

// Read the form once (used by create and update)
function readValues(formData: FormData): Record<Field, string> {
  return {
    firstName: String(formData.get("firstName") ?? ""),
    lastName: String(formData.get("lastName") ?? ""),
    jobTitle: String(formData.get("jobTitle") ?? ""),
    hireDate: String(formData.get("hireDate") ?? ""),
    medicalFitUntil: String(formData.get("medicalFitUntil") ?? ""),
  };
}

export async function createEmployee(
  companyId: string,
  _prevState: EmployeeFormState,
  formData: FormData
): Promise<EmployeeFormState> {
  const { orgId } = await requireOrg();
  const values = readValues(formData);

  const parsed = employeeSchema.safeParse(values);
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors, values };
  }

  // PARENT CHECK: the company must belong to this org.
  // Otherwise someone could put another org's companyId in the URL.
  const company = await db.clientCompany.findFirst({
    where: { id: companyId, orgId },
    select: { id: true },
  });
  if (!company) return { message: "Firma nu a fost găsită.", values };

  try {
    await db.employee.create({
      data: { orgId, companyId, ...parsed.data },
    });
  } catch {
    return { message: "Nu am putut salva angajatul. Încearcă din nou.", values };
  }

  revalidatePath(`/companies/${companyId}`);
  redirect(`/companies/${companyId}`);
}

export async function updateEmployee(
  companyId: string,
  employeeId: string,
  _prevState: EmployeeFormState,
  formData: FormData
): Promise<EmployeeFormState> {
  const { orgId } = await requireOrg();
  const values = readValues(formData);

  const parsed = employeeSchema.safeParse(values);
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors, values };
  }

  try {
    // id + companyId + orgId: the employee must be in THIS company of THIS org
    const result = await db.employee.updateMany({
      where: { id: employeeId, companyId, orgId },
      data: parsed.data,
    });
    if (result.count === 0) return { message: "Angajatul nu a fost găsit.", values };
  } catch {
    return { message: "Nu am putut salva modificările. Încearcă din nou.", values };
  }

  revalidatePath(`/companies/${companyId}`);
  redirect(`/companies/${companyId}`);
}

export async function deleteEmployee(companyId: string, employeeId: string) {
  const { orgId } = await requireOrg();

  await db.employee.deleteMany({ where: { id: employeeId, companyId, orgId } });

  revalidatePath(`/companies/${companyId}`);
  redirect(`/companies/${companyId}`);
}