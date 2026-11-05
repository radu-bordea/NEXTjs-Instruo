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

// What the action sends back to the form when something is wrong
export type CompanyFormState = {
  errors?: Partial<Record<"name" | "cui" | "address", string[]>>; // per-field errors
  message?: string; // general error
};

export async function createCompany(
  _prevState: CompanyFormState, // previous state (required by useActionState, unused here)
  formData: FormData, // everything the user typed, by input "name"
): Promise<CompanyFormState> {
  // 1. Who is this? orgId comes from Clerk, NEVER from the form.
  const { orgId } = await requireOrg();

  // 2. Validate. safeParse doesn't throw; it returns success or error.
  const parsed = companySchema.safeParse({
    name: formData.get("name"),
    cui: formData.get("cui") ?? "",
    address: formData.get("address") ?? "",
  });

  if (!parsed.success) {
    // Turn Zod's error into { name: ["..."], cui: ["..."] } for the form
    return { errors: z.flattenError(parsed.error).fieldErrors };
  }

  // 3. Save. The schema already turned empty fields into null.
  try {
    await db.clientCompany.create({
      data: { orgId, ...parsed.data }, // name, cui, address – already clean
    });
  } catch {
    return { message: "Nu am putut salva firma. Încearcă din nou." };
  }

  // 4. Tell Next.js the list changed, then go back to it.
  // redirect() must be OUTSIDE try/catch: it works by throwing a special signal.
  revalidatePath("/companies");
  redirect("/companies");
}
