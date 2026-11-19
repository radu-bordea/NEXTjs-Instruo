// lib/templates/load.ts
// Reads a built-in template from the database (saved by the seed script).

import "server-only";
import { db } from "@/lib/db";
import type { TemplateField } from "./types";

export async function getBuiltInTemplate(slug: string) {
  // Built-in = orgId null. Newest version first.
  const template = await db.formTemplate.findFirst({
    where: { slug, orgId: null },
    orderBy: { version: "desc" },
  });

  if (!template) return null;

  return {
    id: template.id,
    name: template.name,
    version: template.version,
    // The database stores fields as JSON; we know their shape from types.ts
    fields: template.fields as unknown as TemplateField[],
  };
}