// actions/companies.ts
// Server actions for client companies. These run ONLY on the server,
// even though the form in the browser calls them.
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireOrg } from "@/lib/auth";
import { companySchema } from "@/lib/validations/company";
import { isUniqueError } from "@/lib/prisma-errors";

// What the action sends back to the form when something is wrong
export type CompanyFormState = {
  errors?: Partial<Record<"name" | "cui" | "address", string[]>>;
  message?: string;
  // What the user typed, so the form can show it again after React resets it
  values?: { name: string; cui: string; address: string };
};

// Created a new company. If there are validation errors, returns them in the same shape as the form expects.
export async function createCompany(
  _prevState: CompanyFormState,
  formData: FormData,
): Promise<CompanyFormState> {
  const { orgId } = await requireOrg();

  // Read the raw input once. We validate it AND send it back on errors.
  const values = {
    name: String(formData.get("name") ?? ""),
    cui: String(formData.get("cui") ?? ""),
    address: String(formData.get("address") ?? ""),
  };

  const parsed = companySchema.safeParse(values);

  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors, values };
  }

  try {
    await db.clientCompany.create({
      data: { orgId, ...parsed.data },
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return { errors: { cui: ["Există deja o firmă cu acest CUI."] }, values };
    }
    return { message: "Nu am putut salva firma. Încearcă din nou.", values };
  }

  revalidatePath("/companies");
  redirect("/companies");
}

// Edit. The company id comes first because we "bind" it in the edit page:
// updateCompany.bind(null, id) → a function with the normal (prevState, formData) shape.
export async function updateCompany(
  id: string,
  _prevState: CompanyFormState,
  formData: FormData,
): Promise<CompanyFormState> {
  const { orgId } = await requireOrg();

  const values = {
    name: String(formData.get("name") ?? ""),
    cui: String(formData.get("cui") ?? ""),
    address: String(formData.get("address") ?? ""),
  };

  const parsed = companySchema.safeParse(values);
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors, values };
  }

  try {
    // updateMany + where { id, orgId }: only updates if the company belongs to THIS org.
    // A changed id in the URL from another org simply matches nothing.
    const result = await db.clientCompany.updateMany({
      where: { id, orgId },
      data: parsed.data,
    });
    if (result.count === 0) {
      return { message: "Firma nu a fost găsită.", values };
    }
  } catch (error) {
    if (isUniqueError(error)) {
      return { errors: { cui: ["Există deja o firmă cu acest CUI."] }, values };
    }
    return {
      message: "Nu am putut salva modificările. Încearcă din nou.",
      values,
    };
  }

  revalidatePath("/companies");
  revalidatePath(`/companies/${id}`);
  redirect(`/companies/${id}`);
}

// Delete. Same safety rule: id AND orgId.
// Its employees and their training entries are deleted too (onDelete: Cascade in the schema).
export async function deleteCompany(id: string) {
  const { orgId } = await requireOrg();

  await db.clientCompany.deleteMany({
    where: { id, orgId },
  });
  revalidatePath("/companies");
  redirect("/companies");
}
